---
aliases:
  - Sandbox SDK How-To
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/SDK/How-To/
sources:
  - https://createos.sh/docs/Sandbox/SDK/How-To/
  - https://createos.sh/docs/Sandbox/SDK/How-To/Files
  - https://createos.sh/docs/Sandbox/SDK/How-To/Lifecycle
  - https://createos.sh/docs/Sandbox/SDK/How-To/Expose-A-Service
  - https://createos.sh/docs/Sandbox/SDK/How-To/Disks-Networks-Templates
  - https://createos.sh/docs/Sandbox/SDK/How-To/Streaming
  - https://createos.sh/docs/Sandbox/SDK/How-To/Error-Handling
  - https://createos.sh/docs/Sandbox/SDK/How-To/Observability
  - https://createos.sh/docs/Sandbox/SDK/How-To/Sandbox-Access-Tokens
scraped: 2026-10-17
up: "[[Docs - Sandbox SDK]]"
---

# Docs - Sandbox SDK - How-To Guides

> [!summary] Summary
> - Task recipes for the TypeScript SDK (`@nodeops-createos/sandbox`): files, pause/fork/auto-pause, expose a service, disks/networks/templates, streaming, error handling, observability hooks, delegated access tokens.
> - Each guide uses `import { createClient } from "@nodeops-createos/sandbox"`; base URL `https://api.sb.createos.sh`; auth via `apiKey` or `CREATEOS_SANDBOX_API_KEY`.
> - Source: https://createos.sh/docs/Sandbox/SDK/How-To/

## How-To Guides (index)
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/
- **Summary:** Index of eight task guides: Upload and Download Files, Pause/Fork/Auto-Pause, Expose a Service, Disks/Networks/Templates, Stream Command Output, Error Handling, Observability, Delegate Access to One Sandbox.

## Upload and Download Files
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Files
- **Summary:** Push files into a running sandbox and pull artifacts back with `sandbox.files`.
- **Key points:**
  - `upload(path, data)`: writes `data` (`BodyInit`: `string`, `Uint8Array`/`Buffer`, `Blob`, `ReadableStream`) to an absolute guest path.
  - `download(path)`: returns an `ArrayBuffer` (decode with `TextDecoder`, or `Buffer.from(buf)` for binary). Both take optional `RequestOptions` (`timeoutMs`, `signal`, etc.).
  - Guest paths must be absolute; parent directories must already exist (`sandbox.runCommand("mkdir", ["-p", "/opt/myapp/data"])`). Relative paths are rejected.
  - One file per call; no directory mirror or watch mode. For bulk: tar on the host, upload the archive, unpack with `runCommand("tar", ["-xzf", "/tmp/bundle.tar.gz", "-C", "/opt/app"])`.
  - Use `/tmp` for ephemeral files; mount a disk for data that must persist.
  - Recipe: upload script and data, `runCommand("python3", ["/tmp/process.py"])`, check `result.exit_code`, download `/tmp/report.json`.

## Pause, Fork and Auto-Pause
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Lifecycle
- **Summary:** Recipes for pausing, resuming, forking, recharging bandwidth and destroying sandboxes.
- **Key points:**
  - Pause: `await sandbox.pause(); await sandbox.waitUntilPaused();` Resume: `await sandbox.resume(); await sandbox.waitUntilRunning();`. Both pollers accept `{ timeoutMs }`. `pause()` throws `CreateosSandboxValidationError` if not pausable.
  - Auto-pause: `auto_pause_after_seconds` at create (range 60 to 86400) or `sandbox.setAutoPause(600)`; `setAutoPause(null)` disables; invalid values raise `CreateosSandboxValidationError`. `sandbox.data.auto_pause_after_seconds` updates in place.
  - Fork: source must be `paused`. `parent.pause(); parent.waitUntilPaused(); const branchA = await parent.fork();` Each `fork()` returns a new independent handle (auto-resumes); `parent.fork({ start_paused: true })` keeps the clone paused. Fork can occasionally stick in `pausing`, so always wait for `paused` first.
  - Bandwidth: `sandbox.getBandwidth()` then `sandbox.rechargeBandwidth(10 * GiB)`; `bandwidth_quota_bytes` is not settable at create (server rejects non-zero with 400). `quota_bytes === -1` means unmetered; recharge is a no-op there.
  - Destroy: `const result = await sandbox.destroy()` (`destroying` or `destroyed`) then `await sandbox.waitUntilDestroyed()`; only `error` and `failed` states make it throw.
  - Pause = same sandbox, same id, stops billing between sessions; fork = new independent sandbox from the paused snapshot, parent stays paused.

## Expose a Service
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Expose-A-Service
- **Summary:** Give an HTTP server running inside a sandbox a public preview URL.
- **Key points:**
  - Recipe: create with `ingress_enabled: true`; start server bound to `0.0.0.0:<port>` (not `127.0.0.1`); `sandbox.waitForPortReady(port, { timeoutMs: 15_000 })`; `sandbox.previewUrl(port, { scheme: "http" })`.
  - Ingress routes to the VM's `eth0`, not loopback; a server on `127.0.0.1` is unreachable even though `waitForPortReady` (which probes from inside) succeeds.
  - Background pattern: `nohup setsid <server> >/tmp/server.log 2>&1 &` (`nohup` ignore SIGHUP, `setsid` new session, redirect stdio or `runCommand` blocks, `&` background).
  - `previewUrl` defaults to `https`; use `{ scheme: "http" }` unless the ingress wildcard domain has TLS.
  - Enable later: `await sandbox.setIngress(true)` (chainable, refreshes `ingress_url_template`); `await sandbox.setIngress(false)` revokes; `previewUrl` then throws until re-enabled.

## Disks, Networks and Templates
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Disks-Networks-Templates
- **Summary:** Three independent recipes using `client.disks`, `client.networks`, `client.templates`.
- **Key points:**
  - **S3 disk:** `client.disks.create({ name, kind: "s3", config: { bucket, endpoint, region?, use_path_style? }, credentials: { access_key, secret_key } })`; mount at boot via `createSandbox({ ..., disks: [{ disk_id, mount_path, sub_path? }] })` or live `sandbox.attachDisk({ diskId, mountPath })`; `sandbox.detachDisk({ diskId, mountPath })` returns `{ detached: boolean }`; `client.disks.delete(disk.name)`.
  - Gotchas: `detachDisk` needs the `disk_<ulid>` id, not the name (capture `disk.id` after create); `mountPath` required on detach; bucket must be reachable from the sandbox agent's network; check `mount_status` via `sandbox.listDisks()`.
  - **Overlay network:** `client.networks.create({ name: "backend" })`; join with `networks: [{ id: network.id }]` at create or `sandbox.attachNetwork(network.id)` on a running sandbox; overlay IPs come from `client.networks.get(id).members[].ip`, not `SandboxView.ip` (management address); `sandbox.detachNetwork(network.id)`; `networks.delete` may fail briefly after destroy, so retry (uncleaned networks count against quota).
  - **Custom template:** `client.templates.create({ name, dockerfile })` (single `FROM` on an allowlisted base such as `nodeops/sandbox:debian`; no `COPY`/`ADD`); follow with `client.templates.followLogs(id, { timeoutMs: 600_000 })` (events have `line`, `final`, `status`); then poll `client.templates.get(id)` with `pollUntil` for `status === "ready"` (the log stream may close before the final event); boot with `createSandbox({ shape, rootfs: tmpl.id })` (id or name).
  - Template statuses: `"pending"`, `"building"`, `"ready"`, `"failed"`. Also `client.templates.logs(id)` (plain text) and `client.templates.get(id, { include: "dockerfile" })`.

## Stream Command Output
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Streaming
- **Summary:** Stream live stdout/stderr from a long-running command with `sandbox.streamCommand`.
- **Key points:**
  - Availability caveat: on some control-plane versions the streaming exec endpoint returns 404; `runCommand` (buffered) is the reliable default. On `CreateosSandboxNotFoundError` at first iteration, fall back to `runCommand`.
  - `streamCommand` is an async generator yielding `ExecStreamEvent`: `stdout`/`stderr` (`data: string`), `exit` (`exitCode: number`), `error` (`message: string`), `heartbeat` (about every 5 s).
  - Bail out early by throwing inside the loop, or pass `{ signal: ac.signal }` (`AbortController`).
  - Raw frames escape hatch: `client.http.stream<ExecStreamFrame>("POST", "/v1/sandboxes/${id}/exec", { query: { stream: true }, body: { cmd, args, stream: true } })`; wire fields `stdout`, `stderr`, `exit_code`, `error`, `hb`.
  - Streaming requests are never retried by the SDK; `runCommand` is retried on network errors and 500/502/503/504.

## Error Handling
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Error-Handling
- **Summary:** Branch on the failure cause with `instanceof` narrowing; never parse error messages.
- **Key points:**
  - Hierarchy: `CreateosSandboxError` > `CreateosSandboxApiError` (non-2xx) > `CreateosSandboxAuthError` 401, `CreateosSandboxPermissionError` 403, `CreateosSandboxNotFoundError` 404, `CreateosSandboxPaymentRequiredError` 402, `CreateosSandboxValidationError` 400/409/422, `CreateosSandboxRateLimitError` 429, `CreateosSandboxServerError` 5xx; plus `CreateosSandboxConnectionError` and `CreateosSandboxTimeoutError`.
  - 401 = key missing/malformed/unknown (check `CREATEOS_SANDBOX_API_KEY`); 403 = valid key but no access (wrong tenant, ACL, quota).
  - Rate limit: SDK auto-retries 429 first; at the catch, use `err.retryAfterSeconds ?? 2 ** attempt` seconds (parsed from `Retry-After`, delta-seconds or HTTP-date).
  - Logging fields on `CreateosSandboxApiError`: `statusCode`, `method`, `endpoint`, `resourceId`, `requestId` (from `X-Request-Id` then `X-Fc-Request-Id`; quote in support tickets), `code`, `envelope?.data`.
  - `CreateosSandboxConnectionError` and `CreateosSandboxTimeoutError` do not extend `CreateosSandboxApiError`; underlying error on `err.cause`.

## Observability
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Observability
- **Summary:** Structured logs, metrics and traces of every SDK HTTP call via client hooks, with credentials pre-redacted.
- **Key points:**
  - `createClient({ apiKey, hooks: { onRequest, onResponse, onRetry } })`; hooks fire around every non-streaming request, are awaited in the request path, and a throw inside a hook is swallowed.
  - `RequestHookContext`: `method`, `url` (userinfo stripped, sensitive query redacted), `headers` (credentials `"redacted"`), `attempt`. `ResponseHookContext` adds `status`, `durationMs`, `requestId`. `RetryHookContext` adds `reason` (`"network"`, `"status"`, `"rate-limit"`), `status`, `delayMs`.
  - Retryable status: `408/500/502/503/504` on idempotent methods; `"rate-limit"` = `429` or `503` with `Retry-After`.
  - Redaction: headers in `SENSITIVE_HEADER_NAMES` (`authorization`, `cookie`, `set-cookie`, `x-api-key`, `x-access-token`, `x-auth-token`, `x-csrf-token`, `proxy-authorization`) plus names ending `-token` or `-key`; query keys in `SENSITIVE_QUERY_PARAMS` (`token`, `api_key`, `apikey`, `access_token`, `auth_token`, `password`, `secret`). Exported helpers: `redactHeaders`, `redactUrl`, `redactQuery`.
  - Recipes: JSON log line per request, retry counter metric, OpenTelemetry span per request (key on `method + url + attempt`).
  - Streaming (`Sandbox.streamCommand`, `TemplatesApi.followLogs`) bypasses hooks.

## Delegate Access to One Sandbox
- **URL:** https://createos.sh/docs/Sandbox/SDK/How-To/Sandbox-Access-Tokens
- **Summary:** Give a worker control of one sandbox without sharing the account API key; owner manages the token through the REST API, the worker uses it as `apiKey` in the SDK.
- **Key points:**
  - Owner creates: `curl -X POST "https://api.sb.createos.sh/v1/sandboxes/$SANDBOX_ID/access-token" -H "X-Api-Key: $CREATEOS_API_KEY"`; token begins `skp_sb_`, shown only on create/rotate; one enabled token per sandbox (second create returns `409`).
  - Worker: `const sandbox = await Sandbox.connect(id, { apiKey: token });` then `sandbox.runCommand("echo", ["hello"])`.
  - Worker can inspect status, exec, transfer files, use managed processes/computer APIs, read metrics, pause/resume/destroy; cannot create or list sandboxes, change network/security settings, manage billing or tokens. Other sandbox `404`; out-of-scope `403`.
  - Rotate: `POST .../access-token/rotate`; inspect: `GET .../access-token`; revoke: `DELETE .../access-token`. Runnable SDK workflow in example 57 uses `createAccessToken()` and `withAccessToken()`.
  - REST detail: [[Docs - Sandbox REST API - Lifecycle and Execution]].

## Related
- Up: [[Docs - Sandbox SDK]]
- [[Docs - Sandbox SDK - API Reference]]: full method signatures used in these recipes
- [[Docs - Sandbox SDK - Concepts]]: lifecycle and reliability background
- [[Docs - Sandbox SDK - Quickstart and Tutorial]]: introductory walkthroughs
- [[Docs - Sandbox SDK - Examples]]: runnable programs for these patterns
- [[Docs - Sandbox REST API - Storage and Templates]]: REST equivalents for disks and templates
- [[Docs - Sandbox REST API - Networking and Egress]]: REST equivalents for networks and egress
- [[Docs - Sandbox Limits]]: network, disk and sandbox caps by plan
