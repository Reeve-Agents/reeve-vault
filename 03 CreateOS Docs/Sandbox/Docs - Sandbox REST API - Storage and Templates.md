---
aliases:
  - Sandbox REST Storage and Templates
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/REST-API/Disks
sources:
  - https://createos.sh/docs/Sandbox/REST-API/Disks
  - https://createos.sh/docs/Sandbox/REST-API/Templates
  - https://createos.sh/docs/Sandbox/REST-API/Bandwidth-And-Resize
scraped: 2026-10-17
up: "[[Docs - Sandbox REST API]]"
---

# Docs - Sandbox REST API - Storage and Templates

> [!summary] Summary
> - Disks: register an S3-compatible bucket once as a named disk, then mount it on any sandbox at create time or live; credentials are encrypted (AES-256-GCM) and never returned.
> - Templates: build a custom rootfs from a Dockerfile (single-stage, allowlisted `FROM`, no `COPY`/`ADD`, max 64 KiB) and boot sandboxes from it by name.
> - Bandwidth and resize: read/recharge the outbound quota (default 50 GiB) and grow disk online (10240 to 61440 MiB menu).
> - Base URL `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope.

## Disks
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Disks
- **Summary:** REST endpoints to register S3-compatible disks and mount or detach them on running sandboxes.
- **Key points:**
  - Registration probes the bucket with a 3-second HEAD request to catch typos early.
  - `DELETE /v1/disks/{idOrName}` soft-deletes; returns `409` if still attached to any sandbox.
  - Live attach mounts within about 1 second; only works on `status = "running"`. In-VM `mount_status` is polled every 30 seconds.
  - Live detach drops only the in-VM mount; bucket contents are never touched. One disk can be mounted at multiple paths, so `mount_path` is required on detach. Second detach of the same `(disk_id, mount_path)` returns `404`.
  - Rotate credentials with PATCH (both fields required); a successful response does not guarantee every active mount has refreshed. Paused sandboxes use the saved credentials on resume. SDK equivalent: `client.disks.rotateCredentials()`.
  - Cross-tenant lookups return the same `404` body (no existence leak). `503` means disks feature not configured on the cluster.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/disks` | List disks (`limit` default 50 max 500, `offset`); no credentials |
| POST | `/v1/disks` | Register an S3-compatible bucket as a named disk |
| GET | `/v1/disks/{idOrName}` | Get one disk (`disk_<ulid>` or user-scoped name) |
| PATCH | `/v1/disks/{idOrName}` | Replace credentials: `{"credentials": {"access_key": "...", "secret_key": "..."}}` |
| DELETE | `/v1/disks/{idOrName}` | Soft-delete (returns `{"deleted": true}`) |
| GET | `/v1/sandboxes/{id}/disks` | List attached disks with live `mount_status` |
| POST | `/v1/sandboxes/{id}/disks` | Live-attach a disk to a running sandbox |
| DELETE | `/v1/sandboxes/{id}/disks/{disk_id}?mount_path=...` | Live-detach a disk (returns `{"detached": true}`) |

### Register request body (`POST /v1/disks`)
| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | User-scoped; lowercase alphanumeric and dash, 1-63 chars; pattern `^[a-z0-9][a-z0-9-]{0,62}$` |
| `kind` | string | Yes | Must be `"s3"` |
| `config.bucket` | string | Yes | S3 bucket name |
| `config.endpoint` | string | Yes | Full HTTP(S) base URL, e.g. `https://s3.amazonaws.com` |
| `config.region` | string | No | Defaults to `"auto"` for R2/MinIO |
| `config.use_path_style` | boolean | No | Path-style URLs; required for MinIO and most self-hosted S3-compatibles |
| `credentials.access_key` | string | Yes | Write-only, never returned |
| `credentials.secret_key` | string | Yes | Write-only, never returned |

- Errors: `400` malformed name, unsupported `kind`, missing fields, unreachable endpoint or bucket not found; `401`; `409` duplicate name; `503`.

### Attach body (`POST /v1/sandboxes/{id}/disks`)
| Field | Type | Required | Description |
|---|---|---|---|
| `disk_id` | string | Yes | `disk_<ulid>` id or user-scoped name |
| `mount_path` | string | Yes | Absolute path inside the VM, `..` rejected; one path per disk per sandbox (same disk same path is idempotent) |
| `sub_path` | string | No | Prefix inside the bucket (e.g. `team-a/`); defaults to bucket root |

- `mount_status` values: `pending` (recorded, not yet mounted), `mounted`, `failed` (`mount_error` has truncated agent error, about 1 KiB).
- Attach errors: `400` empty `disk_id` / bad `mount_path`; `404`; `409` sandbox not `running` or `mount_path` used by a different disk.

## Templates
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Templates
- **Summary:** Build a custom container image from a Dockerfile asynchronously and use it as the rootfs for any sandbox once it reaches `ready`.
- **Key points:**
  - Dockerfile rules: single-stage (exactly one `FROM`); `FROM` base must be in the operator allowlist (e.g. `nodeops/sandbox:debian`, `nodeops/sandbox:alpine`); no `COPY` or `ADD`; no `ARG`-substituted `FROM` (e.g. `FROM ${BASE}`); at most 64 KiB. Violations return `400` at submit time.
  - Per-user concurrent build limit defaults to 2; exceeding it returns `429`.
  - `name`: 1-63 chars, lowercase alphanumeric and dash. `rootfs=<name>` resolves to the latest `ready` template with that name, so re-submitting the same name makes new sandboxes pick up the latest version.
  - Status values: `pending` (queued), `building`, `ready` (usable as `rootfs`), `failed` (check logs).
  - Template fields: `id` (`tpl_<ulid>`), `name`, `base`, `status`, `ext4_size_bytes`, `created_at`, `built_at`; `?include=dockerfile` adds `dockerfile`.
  - Build logs: NDJSON, each line `{ "stream": "Step 1/3 : FROM nodeops/sandbox:debian\n" }`, ending when the build completes.
  - A custom template is slower the first time on a given host (host fetches it before first boot); first-party base images are kept warm.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/templates` | List templates (`limit`, `offset`) |
| POST | `/v1/templates` | Submit a Dockerfile for async build; body `name`, `dockerfile`; returns `pending` |
| GET | `/v1/templates/{id}` | Get template (id or friendly name; `?include=dockerfile`) |
| GET | `/v1/templates/{id}/logs` | Stream build log as NDJSON |
| DELETE | `/v1/templates/{id}` | Delete (returns `status: "destroyed"`) |

- Use it: `curl -X POST https://api.sb.createos.sh/v1/sandboxes ... -d '{"shape": "s-1vcpu-1gb", "rootfs": "my-python-env"}'`.

## Bandwidth and Resize
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Bandwidth-And-Resize
- **Summary:** Check and recharge a sandbox's outbound bandwidth budget and grow its disk online.
- **Key points:**
  - Each sandbox starts with a deployment-configured allowance; software default is 50 GiB. When exhausted, outbound traffic stops until you top up.
  - `capped: true` means outbound traffic is currently dropped in-kernel; clears within about 5 seconds of a successful recharge.
  - Recharge is additive, needs the sandbox running, and consumes account credit. `add_bytes` is positive, at most 100 GiB (`107374182400`) per call.
  - `used_bytes` is cumulative outbound bytes including across pause/resume; recharge does not reset it. `ingress_bytes` is observation only and does not consume the quota.
  - Resize grows disk online (no restart; may take a few seconds on large changes). Disk can only increase; `disk_mib` must be one of `10240`, `20480`, `30720`, `40960`, `51200`, `61440` and larger than current.
  - Recharge errors: `400` invalid `add_bytes`, `402` insufficient credit, `404`, `409` not running, `502` billing service unavailable. Resize errors: `400` (not in menu or smaller than current), `404`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/sandboxes/{id}/bandwidth` | Read quota and usage: `quota_bytes`, `used_bytes`, `ingress_bytes`, `remaining_bytes`, `capped` |
| POST | `/v1/sandboxes/{id}/bandwidth/recharge` | Add bytes to the quota; body `{"add_bytes": 10737418240}` |
| POST | `/v1/sandboxes/{id}/resize` | Grow disk; body `{"disk_mib": 20480}` |

## Related
- Up: [[Docs - Sandbox REST API]]
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: create body `disks`, `disk_mib`, `rootfs`; fork does not carry disks
- [[Docs - Sandbox REST API - Networking and Egress]]: outbound policy (egress) separate from bandwidth quota
- [[Docs - Sandbox SDK - How-To Guides]]: Disks, Networks and Templates SDK recipe; lifecycle recipe (bandwidth)
- [[Docs - Sandbox SDK - API Reference]]: `DisksApi`, `TemplatesApi`, `rechargeBandwidth`, `resize`
- [[Docs - Sandbox Limits]]: disk sizes, bandwidth defaults and per-plan caps
- [[Docs - Sandbox Security and Self-Hosting]]: bring-your-own-storage and security model context
