---
aliases:
  - Sandbox Overview
  - Sandbox Concepts
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Overview
sources:
  - https://createos.sh/docs/Sandbox/
  - https://createos.sh/docs/Sandbox/Overview
  - https://createos.sh/docs/Sandbox/Concepts
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Overview and Concepts

> [!summary] Summary
> - Each sandbox is a Firecracker microVM with its own kernel, root filesystem and network identity; docs state boot in ~30ms (p90).
> - One REST API at `https://api.sb.createos.sh`, reachable via REST, the TypeScript SDK `@nodeops-createos/sandbox`, or the `createos sandbox` CLI (alias `sb`); auth is the `X-Api-Key` header.
> - Concepts: sandbox, shape, rootfs, snapshot/pause/resume, fork, network, disk, template, ingress, egress, SSH gateway, exec/process/PTY, bandwidth, host/region, JSend envelope.
> - Sources: https://createos.sh/docs/Sandbox/ , https://createos.sh/docs/Sandbox/Overview , https://createos.sh/docs/Sandbox/Concepts

## Sandbox (docs index page)
- **URL:** https://createos.sh/docs/Sandbox/
- **Summary:** Landing page for the Sandbox docs section. CreateOS Sandbox runs untrusted, AI-generated and interactive workloads in Firecracker microVMs.
- **Key points:**
  - One kernel per sandbox, in-kernel egress allowlists, pause/resume/fork of full VM state, private networks between sandboxes, per-second billing.
  - Start with Overview, run the first sandbox in the Quickstart, check Limits and defaults before sizing a workload.
  - Product page: https://createos.sh/products/sandbox . Pricing: https://createos.sh/pricing/sandbox
  - Section pages: Overview, Quickstart, Concepts, Limits and defaults, REST API, SDK, CLI, Integrations, Claude Managed Agents, Bring your own storage, Run on your own infrastructure. See [[Docs - Sandbox]] for the full page index.

## Overview
- **URL:** https://createos.sh/docs/Sandbox/Overview
- **Summary:** What CreateOS Sandbox is, what workloads it fits, the capability list, which execution surface to use, the three ways to use it, and authentication.
- **Key points:**
  - Full Linux VMs that boot in ~30ms (p90). Each is a Firecracker microVM with its own kernel, root filesystem and network identity.
  - Workloads: running untrusted or AI-generated code; ephemeral development environments (clean box per branch, task or user); CI and batch jobs; interactive sessions (shells, notebooks, preview servers over SSH or HTTPS).

### Capabilities ("What you get")
| Capability | Description |
|---|---|
| **Fast boot** | Ready to run commands within seconds of creation. |
| **Pause, resume, fork** | Snapshot a running VM to durable storage, restore it later, or clone it into independent copies. |
| **Idle auto-pause** | Timeout from 1 minute to 24 hours; sandbox pauses itself once both API calls and network traffic go quiet. |
| **Wake on request** | Hitting a paused sandbox's HTTPS URL resumes it; browsers get a waiting page that reloads until the app answers. |
| **Self-signal** | Code inside the sandbox can pause or delete its own box with a POST to `127.0.0.1:1029`, no API key needed. |
| **Run commands** | Execute commands and stream output over API, SDK or CLI. No SSH key required. |
| **Sandbox access tokens** | Give a worker access to operate one sandbox without sharing your account API key. |
| **Managed processes** | Reconnectable commands and shell sessions with retained output, stdin, signals, wait, stop and PTY resize. Retained output bounded to 1 MiB per process and 32 MiB per sandbox. |
| **Computer use** | Drive a desktop-capable sandbox: screenshots, mouse and keyboard input, window control, extra screens watchable in a browser. |
| **File transfer** | Upload and download individual files, or copy directories in and out. |
| **Private networks** | Sandboxes reach each other over a p2p encrypted network, isolated from other tenants. |
| **VPN access** | Join your own machine to a sandbox private network over an encrypted WireGuard tunnel; register the device once, then connect. |
| **S3 disks** | Mount S3-compatible buckets into a running sandbox and detach them live. |
| **Custom images** | Build your own root filesystem from a Dockerfile and boot sandboxes from it. |
| **Preinstalled coding agents** | Five coding agents ship in the `devbox:1` and `desktop:1` images. |
| **Public ingress** | Expose an HTTP service on a per-sandbox HTTPS URL. |
| **Egress control** | Restrict outbound traffic to an allowlist of hosts, IPs or CIDRs. |
| **SSH gateway** | SSH into a sandbox with keys you attach; open a shell or an `ssh -L` port-forward through the gateway. |
| **Port forwarding** | Forward a local port to a service inside a running sandbox through the control plane, no SSH key required. |
| **Live directory sync** | Continuous two-way sync of a local directory with one inside the sandbox; one-way and mirror modes too. |

### `exec` vs `process` vs `PTY`
| Need | Use | Why |
|---|---|---|
| Run a quick command and get its exit code | `exec` | Simple, stateless, returns buffered or live output for one command. Buffered output is capped at 1 MiB; use streaming `exec` for larger output. |
| Run a command you may need to inspect later | `process` | Creates a process ID, retains output, lets you attach, wait, send input, signal, or stop it later. |
| Start background work without keeping your CLI attached | `process start` | Returns immediately with a process ID you can reconnect to later. |
| Run a command and follow retained output until it exits | `process run` | Behaves like a foreground command but leaves a managed record behind. |
| Open a disposable interactive shell right now | `sandbox shell` | Immediate terminal; does not create a reconnectable managed session. |
| Open a shell you can detach from and reattach to | `process shell` | Creates a managed PTY shell with a process ID. |
| Run a REPL, curses app, full-screen tool, or anything that checks for a TTY | `process ... --pty` | PTY mode gives terminal behavior, combines output into a terminal stream, supports resize. |

- Use `exec` for scripts, tests, package installs, simple automation. Use `process` for long-running servers, agent jobs, background tasks, reconnectable logs, commands you may need to control after they start.
- Add `--pty` only when the program needs terminal semantics; otherwise the default pipe process keeps stdout and stderr separate.

### Three ways to use it
All talk to the same control plane at `https://api.sb.createos.sh`.
- **REST API:** source of truth; use directly from languages with no SDK or for endpoints SDKs/CLI do not wrap yet. TypeScript, Go and Python teams are pointed to the SDKs instead.
- **TypeScript SDK:** `@nodeops-createos/sandbox`, zero-dependency; runs on Node 20+, Bun, Deno, edge runtimes and the browser; typed handles, streaming, retries, typed errors.
  ```bash
  npm install @nodeops-createos/sandbox
  ```
- **CLI:** `createos` binary; `sandbox` command group aliased to `sb`.
  ```bash
  createos sandbox create --shape s-1vcpu-1gb --name my-box
  ```

### Authentication
- All three surfaces authenticate with a CreateOS API token sent as the `X-Api-Key` header. Generate a token at https://createos.sh/app/profile
- Delegated access to one sandbox: a sandbox access token, created and managed by its owner with an account API key.
  ```bash
  curl -H "X-Api-Key: $CREATEOS_API_KEY" https://api.sb.createos.sh/v1/whoami
  ```
- Next steps listed: Quickstart, Concepts, Limits and defaults, REST API / SDK / CLI references.
- Related links listed on the page: Egress (open with no rules, deny-by-default with any rule, two-rule Python recipe); product pages createos.sh/products/sandbox, /pricing/sandbox, /egress-governance, /sandbox-networking, /self-host; comparisons /vs/e2b, /vs/modal, /vs/daytona, /vs/vercel; independent benchmarks ComputeSDK sandbox benchmark (https://www.computesdk.com/benchmarks/sandboxes/) and awesome-ai-coding-sandboxes (https://github.com/fhiltscher/awesome-ai-coding-sandboxes); blog https://createos.sh/blogs/microvm-isolation-for-ai-agents

## Concepts
- **URL:** https://createos.sh/docs/Sandbox/Concepts
- **Summary:** Vocabulary used across the API, SDK and CLI.
- **Key points:**

### Sandbox
- A single Firecracker microVM: the unit you create, run commands in, and destroy. Has a stable id, a name, a status, an IP on its network, and a shape and rootfs chosen at creation.
- Lifecycle:
  ```
  creating → running → pausing → paused → resuming → running → destroying → destroyed
  ```
- Can also enter `error`, and `forking` while a clone is being made.

### Shape
- Compute size (vCPU count and RAM). Fixed catalog, e.g. `s-1vcpu-1gb`. List with `GET /v1/shapes`, the SDK, or `createos sandbox shapes`. Chosen at creation.

### Rootfs
- Root filesystem image a sandbox boots from (Linux userland plus preinstalled tooling). Built-in catalog: `GET /v1/rootfs`. Build your own with a template. Choose with the `rootfs` field at creation, or accept the default.
- Built-in base images (first-party, as listed on the Concepts page):

| Name | Base | Notes |
|---|---|---|
| `devbox:1` | Debian | Default. Batteries-included dev environment. |
| `ubuntu:26.04` | Ubuntu 26.04 LTS | Minimal; APT familiarity. |
| `debian:13` | Debian 13 (trixie) | Minimal; APT familiarity. |
| `alpine:3.20` | Alpine 3.20 | Minimal (musl + busybox); ~5x smaller. |

- First-party images are kept warm on the hosts, so a sandbox on a built-in base boots immediately with no image pull. A custom template is slower the first time it is used on a host (host must fetch it); subsequent boots are cached and fast. Start from a built-in base and layer dependencies via a template for first-launch speed.

> [!warning] Source inconsistency (recorded as stated)
> The Concepts page lists `devbox:1` as Debian and the default image. The Limits page lists `devbox:1` as Ubuntu 24.04 LTS and states `alpine:3.20` is the catalog default when `rootfs` is omitted. See [[Docs - Sandbox Limits]].

### Snapshot, pause, resume
- **Snapshot:** captures full state (memory and disk) to durable storage.
- **Pause:** snapshots a running sandbox and tears down the live VM, so it stops consuming compute while keeping identity, disks, networks and environment.
- **Resume:** restores onto a compatible host. Resume time depends on snapshot size, host load, and whether that host has a cached copy. Applications should reconnect external connections after resume.

### Fork
- Clones a paused sandbox into a brand-new sandbox: byte-identical copy of the snapshot, own id, IP, placement and bandwidth quota. Original untouched. Used to fan out many identical environments from one prepared base.

### Network
- Private overlay network connecting sandboxes. Sandboxes on the same network reach each other by name; isolated from other networks and other tenants. Attach at creation or live-attach later.

### Disk
- An S3-compatible bucket registered as a mountable volume. Holds bucket and endpoint config; credentials encrypted at rest and never returned by the API. Attach to a running sandbox and detach live; mount appears in the guest within about a second.

### Template
- Custom rootfs built from a Dockerfile you submit. Build runs asynchronously and streams logs; once ready, usable as `rootfs` for new sandboxes.

### Ingress
- Opt-in public HTTPS URL so an HTTP service inside is reachable from the internet. Enable at creation (`ingress_enabled`) or later. Certificates managed for you.

### Egress
- Outbound traffic policy: allowlist of hosts, IPs or CIDRs (optionally with ports). Empty allowlist = all outbound allowed. Rules apply live, no restart.

### SSH gateway
- `gateway.sb.createos.sh:2222` accepts SSH authenticated by public keys you attach to a sandbox. Use with SSH tooling such as `ssh -L`. Default CLI `tunnel` and `shell` commands use the API with your account credentials; `shell --ssh` selects SSH access.

### `exec`, managed `process`, and `PTY`
- `exec`: one-shot command API; starts, waits, returns buffered or live output. For short scripts, probes, tests, installs. Buffered output capped at 1 MiB; use streaming `exec` for larger output.
- Managed `process`: command with a durable process ID; keeps running after the client disconnects, retains replayable output, accepts later input, can be inspected, waited on, signaled, or stopped as a complete process tree. Replay retention bounded to 1 MiB per process and 32 MiB total per sandbox; oldest output discarded first.
- `PTY`: managed `process` with terminal semantics (shells, REPLs, curses/full-screen apps); output combined into one terminal stream; can be resized. Pipe processes keep stdout and stderr separate; prefer pipe mode for non-interactive commands.

### Bandwidth
- Each sandbox has a bandwidth quota; read usage and recharge (top up). Networking pauses when exhausted until recharged.

### Host and region
- Sandboxes run on hosts that may be in different regions; placement handled for you; resume and fork pick a fresh host automatically.

### Response envelope
- REST responses use a JSend envelope:
  ```json
  { "status": "success", "data": { } }
  ```
- `status` is `success`, `fail` (input/validation problem), or `error` (server-side). List endpoints page their results.
- Related links on page: Limits and defaults; Firecracker (https://firecracker-microvm.github.io/); gVisor (https://gvisor.dev/docs/) as the user-space kernel some other providers use; Egress and Networks REST pages; product views egress governance and sandbox networking.

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox Limits]]: numbers behind shapes, images, plan caps, bandwidth, envs
- [[Docs - Sandbox Quickstart]]: first sandbox step by step
- [[Docs - Sandbox CLI]]: CLI commands for these concepts
- [[Docs - Sandbox REST API]]: REST endpoints
- [[Docs - Sandbox SDK]]: TypeScript SDK
- [[Product - Sandbox]]: product page
- [[Sandbox Networking]]: private networks, product view
- [[Egress Governance]]: egress allowlists, product view
