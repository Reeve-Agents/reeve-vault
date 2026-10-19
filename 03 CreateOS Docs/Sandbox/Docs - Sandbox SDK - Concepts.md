---
aliases:
  - Sandbox SDK Concepts
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/SDK/Explanation/
sources:
  - https://createos.sh/docs/Sandbox/SDK/Explanation/
  - https://createos.sh/docs/Sandbox/SDK/Explanation/VM-Sandboxes
  - https://createos.sh/docs/Sandbox/SDK/Explanation/Handle-Model
  - https://createos.sh/docs/Sandbox/SDK/Explanation/Lifecycle
  - https://createos.sh/docs/Sandbox/SDK/Explanation/Reliability
scraped: 2026-10-17
up: "[[Docs - Sandbox SDK]]"
---

# Docs - Sandbox SDK - Concepts

> [!summary] Summary
> - Each sandbox is a Firecracker microVM with its own Linux kernel on KVM hardware virtualization, not a container; the blast radius of a compromised sandbox is the sandbox.
> - The `Sandbox` handle caches a server view and holds the transport (not the client); `waitUntil*` helpers poll for transitions.
> - Lifecycle states: `creating`, `running`, `pausing`, `paused`, `resuming`, `forking`, `destroying`, `destroyed`, `error`, `failed`.
> - Reliability defaults: 2 retries, 500 ms base, 30 s ceiling, 60 s request timeout, 120 s wait timeout; streaming never retried.
> - Source: https://createos.sh/docs/Sandbox/SDK/Explanation/

## Concepts (index)
- **URL:** https://createos.sh/docs/Sandbox/SDK/Explanation/
- **Summary:** Design background for the SDK: VM sandboxes, the handle model, the lifecycle state machine and reliability behaviour. Children: VM Sandboxes, The Handle Model, Sandbox Lifecycle, Reliability.

## VM Sandboxes
- **URL:** https://createos.sh/docs/Sandbox/SDK/Explanation/VM-Sandboxes
- **Summary:** Why each sandbox is a real virtual machine with its own kernel on KVM rather than a container, and what that means for isolation, rootfs, shapes and the create flow.
- **Key points:**
  - Containers share the host kernel, so a kernel exploit can escape; a VM has its own kernel and memory, so the blast radius stays inside the sandbox. This makes it safe to run untrusted or model-generated code.
  - **Rootfs:** a read-only base image (kernel, init, tooling) plus a writable overlay for changes. Pick from the built-in catalog (`client.listRootfs()` returns `RootfsData` with the default; entries carry `name`, optional `description`, deprecation flag with recommended `successor`) or build a custom template from a Dockerfile (`client.templates.create()`, ext4 image; use its id or name as `rootfs` once `status` is `"ready"`).
  - **Shapes:** a sizing preset of `vcpu`, `mem_mib`, `default_disk_mib`, named like `s-4vcpu-4gb`; `client.listShapes()` returns the live catalog (some shapes carry `cpu_quota_pct`, a cgroup v2 `cpu.max` soft cap); override disk with `disk_mib`. Read the catalog instead of hardcoding ids.
  - **Guest environment:** a normal Linux system; env vars via `envs`, SSH keys via `ssh_pubkeys`; private IP `ip`; overlay networks via `networks`; HTTP ingress is opt-in via `ingress_enabled: true`. Do not assume a default working directory (set by the rootfs).
  - **Create flow:** Schedule (host with enough free memory) then Boot (rootfs, overlay, kernel, in-VM agent) then Assign (record private IP, status `running`) then Poll (`GET /v1/sandboxes/:id` with adaptive backoff until `running` or `failed`) then Return a `Sandbox` handle. Typically completes in seconds.

## The Handle Model
- **URL:** https://createos.sh/docs/Sandbox/SDK/Explanation/Handle-Model
- **Summary:** How the stateful `Sandbox` handle mirrors control-plane state, what it caches, when it refreshes, and how `waitUntil*` helpers observe transitions.
- **Key points:**
  - `CreateosSandboxClient` is the entry point and factory (config, catalog, cross-sandbox operations); `Sandbox` owns exactly one sandbox id and every per-sandbox operation.
  - Data flow: client constructs `CreateosSandboxHttp` (transport: URL building, API key injection, JSend unwrapping, exponential backoff with jitter, `Retry-After`, per-request timeouts, `AbortSignal` composition) and returns handles that hold the transport, not the client. Handles outlive the client, are cheap to pass around and add no circular dependency.
  - Getting a handle: `client.createSandbox(request, options)` (POST then follow-up GET for the full `SandboxView`); `client.getSandbox(id, options)` (single GET); static `Sandbox.create(...)` and `Sandbox.connect(...)`.
  - Cached view: `sandbox.status`, `ip`, `data` are last-known values, not live calls. Updated by `sandbox.refresh()` (GET, returns `this`), by mutating calls (`pause()`, `resume()`, `fork()`, `destroy()`, `resize()` replace the cache with the server response), and by each `waitUntil*` poll iteration. `toJSON()` returns the same cached object (treat as read-only).
  - `waitUntilRunning`, `waitUntilPaused`, `waitUntilDestroyed` embed polling with adaptive backoff (250 ms start, ramps after 5 s, 2 s cap) and a timeout budget; no id strings or hand-written poll loops.

## Sandbox Lifecycle
- **URL:** https://createos.sh/docs/Sandbox/SDK/Explanation/Lifecycle
- **Summary:** The lifecycle state machine and what each SDK method requests; `waitUntil*` observes the transition.
- **Key points:**
  - States: `creating` (provisioning), `running` (live; compute billed), `pausing` (snapshot in progress), `paused` (suspended; compute billing stopped), `resuming`, `forking`, `destroying` (async reclaim), `destroyed` (terminal), `error` (non-fatal; may be recoverable), `failed` (terminal).
  - Transitions: `creating` to `running`; `running` to `pausing` to `paused` (`pause()`); `paused` to `resuming` to `running` (`resume()`); `paused` to `forking` (new child to `running`, `fork()`); `running`/`paused`/`error` to `destroying` to `destroyed` (`destroy()`); `creating`/`running` to `failed`; `running` to `error`.
  - Pause snapshots memory and disk; resume restores in place with the same sandbox id, memory contents and filesystem (unlike a fresh boot). Always pair `pause()` with `waitUntilPaused()` before relying on `paused` (e.g. before `fork()`).
  - Fork requires a `paused` (or `pausing`) source; calling it on a `running` sandbox throws `CreateosSandboxValidationError`. Parent stays paused; child is independent; `start_paused: true` keeps the child paused.
  - Auto-pause: `auto_pause_after_seconds` (range 60-86400) at create or `setAutoPause(300)` / `setAutoPause(null)`; control plane pauses exactly like `pause()`.
  - `waitUntil*`: `waitUntilRunning` and `waitUntilPaused` abort on `error`, `failed`, `destroying`, `destroyed`; `waitUntilDestroyed` aborts on `failed`. Poll every 250 ms for the first 5 s, then grow by x1.25 per iteration capped at 2 s. `timeoutMs` exceeded throws `CreateosSandboxTimeoutError`.
  - `destroy()` returns when accepted (may still be `destroying`); no undo.

| Operation | Effect | Sandbox id | Memory | Disk | Billing |
|---|---|---|---|---|---|
| `pause()` | Suspend same sandbox | unchanged | preserved | preserved | stops |
| `resume()` | Restore same sandbox | unchanged | restored | restored | resumes |
| `fork()` | Branch into new sandbox | new child id | copied at fork point | copied at fork point | child billed separately |
| `destroy()` | Permanent reclaim | terminal | lost | lost | stops |

## Reliability
- **URL:** https://createos.sh/docs/Sandbox/SDK/Explanation/Reliability
- **Summary:** How the SDK handles transient failures, retries, timeouts, cancellation and partial state, and what your code must still handle itself.
- **Key points:**
  - Idempotent methods (`GET`, `HEAD`, `PUT`, `DELETE`) retry on network errors and `408/500/502/503/504`, and on `429`/`503`. Non-idempotent (`POST`, `PATCH`) retry only on `429` and `503`. Streaming-body requests and the `stream` method are never retried.
  - Backoff: `delay = min(baseDelayMs x 2^attempt + Math.random() x baseDelayMs, maxDelayMs)`. Defaults: `maxRetries` 2 (3 attempts total), `baseDelayMs` 500, `maxDelayMs` 30000. Overrides at client or per request (merged, not replaced); `retry: false` disables for one call.
  - `Retry-After` (delta-seconds or HTTP-date) on 429/503 replaces the computed delay; after exhaustion `CreateosSandboxRateLimitError.retryAfterSeconds` carries the last value.
  - Timeouts: per-request `60000` ms (`timeoutMs`, `0` disables), applied per dispatch attempt; wait loops `120000` ms (`waitTimeoutMs` on `createSandbox`, `timeoutMs` on `waitUntil*`). A wait timeout does not destroy the sandbox; create with `{ wait: false }` to keep the handle and call `destroy()` on timeout.
  - Cancellation: pass an `AbortSignal` (composed with the timeout via `AbortSignal.any`). User-signal abort re-throws the runtime `AbortError` as-is; timeout wraps as `CreateosSandboxTimeoutError`. Signals also cancel retry backoff sleeps.
  - `pollUntil` is exported for custom loops with the same adaptive backoff (250 ms for first 5 s, then x1.25 capped at 2000 ms).
  - Failure surface after retries: `CreateosSandboxConnectionError`, `CreateosSandboxTimeoutError`, `CreateosSandboxRateLimitError`, `CreateosSandboxServerError`; not retried: `CreateosSandboxAuthError` (401), `CreateosSandboxNotFoundError` (404), `CreateosSandboxValidationError` (400/409/422), `CreateosSandboxPaymentRequiredError` (402).

## Related
- Up: [[Docs - Sandbox SDK]]
- [[Docs - Sandbox Overview and Concepts]]: platform-level concepts (shapes, rootfs, lifecycle, networks)
- [[Docs - Sandbox SDK - API Reference]]: method signatures for the handle and client
- [[Docs - Sandbox SDK - How-To Guides]]: lifecycle, error-handling and observability recipes
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: wire-level statuses and async operations
- [[Docs - Sandbox Security and Self-Hosting]]: isolation and security model
- [[Docs - Sandbox Limits]]: plan caps and defaults
