---
aliases:
  - Sandbox REST Lifecycle and Execution
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/REST-API/Sandboxes
sources:
  - https://createos.sh/docs/Sandbox/REST-API/Sandboxes
  - https://createos.sh/docs/Sandbox/REST-API/Execution-And-Files
  - https://createos.sh/docs/Sandbox/REST-API/Access-Tokens
  - https://createos.sh/docs/Sandbox/REST-API/Managed-Processes
  - https://createos.sh/docs/Sandbox/REST-API/Pause-Resume-Fork
  - https://createos.sh/docs/Sandbox/REST-API/Self-Signal
scraped: 2026-10-17
up: "[[Docs - Sandbox REST API]]"
---

# Docs - Sandbox REST API - Lifecycle and Execution

> [!summary] Summary
> - Create, list, inspect, patch and destroy sandboxes (`/v1/sandboxes`); run commands (buffered or NDJSON-streamed) and move files (up to 10 GiB per file).
> - Managed processes give reconnectable commands and PTYs with retained output (1 MiB per process, 32 MiB per sandbox).
> - Pause/resume/fork are async (202 plus `X-Poll-After`); delegated per-sandbox tokens start with `skp_sb_`; in-sandbox self-signal at `http://127.0.0.1:1029`.
> - Base URL for all but Self-Signal: `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope.

## Sandboxes
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Sandboxes
- **Summary:** Core CRUD and lookup for sandbox microVMs: create with shape, rootfs, egress, ingress, disks, networks and auto-pause; list, get, patch, destroy, and look up by IP.
- **Key points:**
  - Status lifecycle: `creating` (spawn in progress), `running` (can exec and transfer files), `pausing`, `paused` (snapshotted, host freed), `resuming`, `forking` (source stays paused), `error` (resume/fork exhausted retries; POST `/resume` to retry), `destroying`, `destroyed`, `failed` (terminal).
  - `bandwidth_quota_bytes` is not settable at create time; software default allowance is 50 GiB; read `/bandwidth`, then `POST /v1/sandboxes/{id}/bandwidth/recharge`.
  - Notable errors: `400` invalid body or disabled rootfs, `503` no host capacity, `404` not found.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes` | Create a sandbox |
| GET | `/v1/sandboxes` | List caller's sandboxes (paginated; `status` filter) |
| GET | `/v1/sandboxes/{id}` | Get one sandbox |
| PATCH | `/v1/sandboxes/{id}` | Partial update (ingress, auto-pause) |
| DELETE | `/v1/sandboxes/{id}` | Destroy permanently (idempotent) |
| GET | `/v1/sandboxes/by-ip/{ip}` | Look up a sandbox by VM IP |

### Create request body (`POST /v1/sandboxes`)
| Field | Type | Required | Description |
|---|---|---|---|
| `shape` | string | Yes | VM shape; see `GET /v1/shapes`. Example `s-1vcpu-256mb` |
| `rootfs` | string | No | Rootfs catalog name; omit for host default; see `GET /v1/rootfs`. Disabled names rejected with 400 |
| `name` | string | No | Unique per user among non-terminal sandboxes; auto-generated `<adjective>-<animal>`; used as hostname and in-network DNS name |
| `disk_mib` | integer | No | Disk size in MiB; `0` = shape default (10 GiB) |
| `ssh_pubkeys` | string[] | No | OpenSSH public keys; default CLI shell and tunnel use API-key auth and need no SSH keys |
| `envs` | object | No | Exported into every `exec`; keys match `^[A-Za-z_][A-Za-z0-9_]*$`; up to 64 entries, 4 KiB per value, 64 KiB total; values never returned by GET (key names only) |
| `ingress_enabled` | boolean | No | When `true`, reachable at `<ulid>-<port>.<domain>`; off by default |
| `networks` | object[] | No | Entry `{"id": "<name or net-ulid>"}` |
| `disks` | object[] | No | Entry `{"disk_id": "<name or id>", "mount_path": "/mnt/data", "sub_path": "optional/prefix"}`; disk pre-registered via `POST /v1/disks` |
| `egress` | string[] | No | `host[:port]`, `ip[:port]`, `cidr[:port]`, or `*`. Omit / empty / `["*"]` = allow all |
| `auto_pause_after_seconds` | integer | No | Idle pause after N seconds (no exec, file transfer or tunnel). Range 60-86400; null/omitted = never |
| `host_id` | string | No | Pin to a host; 503 if it cannot fit |
| `region` | string | No | Placement region; omit for the receiving API's default; unavailable region returns 503, unreachable regional service 502 |

- Example create body: `{"shape": "s-1vcpu-1gb", "rootfs": "devbox:1", "name": "my-sandbox", "ingress_enabled": true, "auto_pause_after_seconds": 600, "egress": ["pypi.org", "1.1.1.1:53"]}`.
- Example response `data` fields: `id`, `name`, `ip`, `shape`, `rootfs`, `vcpu`, `mem_mib`, `disk_mib`, `spawn_ms`, `egress`, `bandwidth_quota_bytes` (53687091200 = 50 GiB).

### List and patch parameters
- `GET /v1/sandboxes` query: `limit` (default 50, max 500), `offset` (default 0), `status` (any lifecycle status).
- `PATCH /v1/sandboxes/{id}` body: `ingress_enabled` (boolean), `auto_pause_after_seconds` (integer, 60-86400), `disable_auto_pause` (boolean; takes precedence when both sent). Returns the full `SandboxView`.
- `DELETE` returns `status: "destroying"` for a fresh delete, `"destroyed"` if already gone; completes within a few seconds.

## Execution and Files
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Execution-And-Files
- **Summary:** Run commands inside a running sandbox (buffered by default, or streamed as NDJSON) and upload/download files.
- **Key points:**
  - Use `/exec` for quick one-shot commands; use Managed Processes when you need to list, reattach, send input, signal, wait or terminal semantics.
  - Buffered exec output is capped at 1 MiB (truncation notice included); use streaming for larger output.
  - Background processes must detach (redirect stdio plus `&`) or exec blocks until they exit; prefer a managed process for background work.
  - Streaming heartbeat `{"hb":true}` every 5 s; a dead client is detected and the in-VM command killed within about 5 s of disconnect.
  - Upload limit **10 GiB** per file. File paths must be absolute; `..` rejected; parent directories auto-created on upload. Relative paths return 400.
  - Directory transfer tip: tar on the client, `PUT` the bundle to `/tmp/bundle.tar`, then `POST /exec` with `tar -C /workspace -xf /tmp/bundle.tar`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes/{id}/exec` | Run a command (buffered; `?stream=true` for NDJSON) |
| PUT | `/v1/sandboxes/{id}/files?path=<abs path>` | Upload raw bytes (`application/octet-stream`) |
| GET | `/v1/sandboxes/{id}/files?path=<abs path>` | Download file bytes |

- Exec request body: `cmd` (string, required; absolute path or PATH-resolved), `args` (string[]), `stdin` (string), `env` (object; keys must have been declared in the sandbox's `envs` at create time, undeclared keys return `400`), `stream` (boolean, same as `?stream=true`).
- Buffered response `data`: `{"result": {"stdout": "2\n", "stderr": "", "exit_code": 0}, "exec_ms": 124.7}`.
- Notable errors: `404` sandbox not found or not running, `400` undeclared env key / invalid path / file too large.

## Sandbox access tokens
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Access-Tokens
- **Summary:** An owner can create one access token per sandbox for a worker or client. The token starts with `skp_sb_`, is sent in `X-Api-Key`, and operates only its own sandbox.
- **Key points:**
  - Plaintext token is returned only once (create or rotate). Do not put it in `X-Access-Token`, `X-Auth-Token` or a URL query parameter.
  - All four management calls need the **owner's** API key; a sandbox access token cannot manage itself.
  - Allowed on the bound sandbox: status; run and stream commands; file transfer; managed processes, PTYs, shell and tunnels; computer APIs; metrics and bandwidth reads; pause, resume or destroy.
  - Requires owner key: create or list sandboxes; fork; manage tokens, networks, disks, templates, devices, ingress, egress, SSH keys, size or bandwidth quota; account and billing APIs.
  - Another sandbox returns `404`; a disallowed operation on the bound sandbox returns `403`. Disable and rotate take effect immediately in the home region; other regions asynchronously.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes/{id}/access-token` | Create (plaintext once; `409` if already enabled or lifecycle blocks) |
| GET | `/v1/sandboxes/{id}/access-token` | Inspect: `enabled`, redacted `token_hint`, `created_at`, `rotated_at`; `{"enabled":false}` if none |
| POST | `/v1/sandboxes/{id}/access-token/rotate` | Replace token, new plaintext once (`404` if none, `409` if lifecycle blocks) |
| DELETE | `/v1/sandboxes/{id}/access-token` | Disable; returns `{"enabled":false}`; repeat is safe |

## Managed Processes
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Managed-Processes
- **Summary:** `process` resources keep a process ID inside a sandbox so a command can be listed, inspected, reattached to, sent input, waited on, signaled, resized (PTY) and stopped later.
- **Key points:**
  - Choose: `exec` for quick one-shot; `process` (no `pty`) for reconnectable output and background jobs; `PTY` (include `pty` object) for shells, REPLs, curses apps.
  - `cmd` is one executable plus `args`; no implicit shell parsing. For pipes or redirects run `{"cmd": "/bin/bash", "args": ["-lc", "echo hello > /tmp/out.txt"]}`.
  - Pipe processes keep stdout and stderr separate; PTY merges into one `pty` stream and supports resize.
  - Output retention limits: 1 MiB per process journal; 32 MiB aggregate per sandbox; 32 KiB max single output event. Oldest output discarded first.
  - `/connect` with an evicted `after` sequence returns `410 Gone` with `output_offset_expired` and the oldest available sequence.
  - States: `starting`, `running`, `terminating`, `exited`, `failed`. Signal exit has `exit_code` null and a `signal` name.
  - Supported signals: `SIGHUP`, `SIGINT`, `SIGQUIT`, `SIGKILL`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `SIGWINCH`.
  - Common errors: `400`, `404`, `408` (wait timed out), `409`, `410`, `429` (per-sandbox process limit), `502`; codes `process_not_found`, `wrong_process_kind`, `process_exited`, `stdin_closed`, `process_limit_reached`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes/{id}/processes` | Create pipe process or PTY |
| GET | `/v1/sandboxes/{id}/processes` | List processes and PTYs |
| GET | `/v1/sandboxes/{id}/processes/{process_id}` | Inspect one process |
| GET | `/v1/sandboxes/{id}/processes/{process_id}/connect` | Replay and follow ordered output (NDJSON; `?after=<seq>`) |
| POST | `/v1/sandboxes/{id}/processes/{process_id}/input` | Write bytes to stdin or PTY input (`{"data_base64": "..."}`, max 256 KiB decoded; returns `input_seq`) |
| POST | `/v1/sandboxes/{id}/processes/{process_id}/stdin/close` | Close stdin (pipe only; PTY returns `409 wrong_process_kind`) |
| POST | `/v1/sandboxes/{id}/processes/{process_id}/resize` | Resize PTY (`{"rows": 40, "cols": 120}`; pipe returns `409`) |
| POST | `/v1/sandboxes/{id}/processes/{process_id}/signal` | Send signal (`{"signal": "SIGINT"}`) |
| GET | `/v1/sandboxes/{id}/processes/{process_id}/wait` | Wait for exit; `scope=leader` (default) or `tree`; `timeout_ms` max 30000 (default 30 s) |
| DELETE | `/v1/sandboxes/{id}/processes/{process_id}` | Terminate process tree; `grace_ms` default 1000, range 0 to 60000 |

- Create request fields: `cmd` (required for pipe; PTY default starts `/bin/bash -i -l`, else `/bin/sh -l`), `args`, `cwd`, `env`, `pty` object with `pty.rows` (default 24) and `pty.cols` (default 80).
- Connect events: `{"type":"data","seq":1,"stream":"stdout","data_base64":"..."}`, `{"type":"exit","exit_code":0}`, `{"type":"heartbeat"}`; PTY uses `"stream":"pty"`.
- Process record fields: `process_id` (`proc_...`), `kind` (`process` or `pty`), `pid`, `state`, `leader_exited`, `tree_exited`, `created_at`, `finished_at`, `exit_code`, `output` (`oldest_seq`, `newest_seq`, `bytes`).

## Pause, Resume and Fork
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Pause-Resume-Fork
- **Summary:** Snapshot a sandbox to free its host, restore it later, or clone a paused sandbox into a new independent identity.
- **Key points:**
  - Pause snapshots disk, full RAM image (processes, open files, connections) and CPU state to object storage; resume can use the same or another compatible host; reconnect external connections after resume.
  - All three ops are async: return **202 Accepted** with `X-Poll-After` header; poll `GET /v1/sandboxes/{id}` until `running` / `paused`.
  - Pause: sandbox must be `running` (`409` otherwise, including already paused).
  - Resume: sandbox must be `paused` or `error`; server retries on different hosts, then goes to `error`; POST `/resume` again to retry. Resume checks quota excluding itself; other non-terminal sandboxes (including paused) count; cap hit returns `429`.
  - Fork: source must be `paused`; creates new sandbox with separate id, IP, bandwidth ledger and placement; auto-resumes to `running` unless `start_paused: true`.
  - Fork request fields (all optional): `start_paused` (default `false`), `ssh_pubkeys`, `egress`, `ingress_enabled`, `envs` (a nonempty map replaces the inherited map; omit or empty = inherit). Supplying `bandwidth_quota_bytes` returns `400` (even zero). S3 disk attachments do not carry over; attach after the child is running.
  - Errors: pause `409`; resume `409`, `429`, `402` (insufficient credit), `503`; fork `400`, `409`, `402`, `429`, `503`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes/{id}/pause` | Pause a running sandbox (returns `pausing`) |
| POST | `/v1/sandboxes/{id}/resume` | Resume a paused or errored sandbox (returns `resuming`) |
| POST | `/v1/sandboxes/{id}/fork` | Clone a paused sandbox (returns new id with `forking`, `forked_from`) |

## Self-Signal (In-Sandbox)
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Self-Signal
- **Summary:** A workload can pause or delete its own sandbox from the inside without an API key, via a loopback-only endpoint, a FIFO, or the TypeScript SDK helpers.
- **Key points:**
  - Base URL `http://127.0.0.1:1029` (loopback only); no auth; `POST` only (other methods `405`, unknown paths `404`).
  - Returns **202 Accepted** with `{"status": "accepted", "action": "pause"}` or `"delete"`.
  - Optional `reason` query parameter, truncated to 128 characters, control characters stripped.
  - `/self/delete` is irreversible. Resume later with `POST /v1/sandboxes/{id}/resume` or `createos sandbox resume`.
  - FIFO at `/run/self`: write `park` or `pause` to pause; `retire`, `delete`, `rm` or `destroy` to delete; lines starting with `#` ignored (for example `echo park > /run/self`).
  - SDK: `import { selfPause, selfDelete } from "@nodeops-createos/sandbox"`; `await selfPause("job-complete")`, `await selfDelete()`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/self/pause` | Pause the current sandbox (`running` to `paused`) |
| POST | `/self/delete` | Destroy the current sandbox (irreversible) |

## Related
- Up: [[Docs - Sandbox REST API]]
- [[Docs - Sandbox REST API - Networking and Egress]]: egress and private networks
- [[Docs - Sandbox REST API - Storage and Templates]]: disks, templates, bandwidth, resize
- [[Docs - Sandbox SDK - How-To Guides]]: SDK equivalents (files, lifecycle, access tokens)
- [[Docs - Sandbox SDK - API Reference]]: `runCommand`, `streamCommand`, `processes`, `pause`, `fork`
- [[Docs - Sandbox Limits]]: plan caps for sandbox counts, lifetime and idle behaviour
- [[Docs - Sandbox CLI]]: `createos sandbox` commands for the same endpoints
- [[Hackathon Ideas]]: build ideas that use fork and pause
