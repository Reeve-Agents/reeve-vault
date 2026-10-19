---
aliases:
  - Sandbox SDK API Reference
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/SDK/Reference/
sources:
  - https://createos.sh/docs/Sandbox/SDK/Reference/
  - https://createos.sh/docs/Sandbox/SDK/Reference/Overview
  - https://createos.sh/docs/Sandbox/SDK/Reference/Client
  - https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox
  - https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox-Files
  - https://createos.sh/docs/Sandbox/SDK/Reference/Sub-APIs
  - https://createos.sh/docs/Sandbox/SDK/Reference/Errors
  - https://createos.sh/docs/Sandbox/SDK/Reference/Helpers
  - https://createos.sh/docs/Sandbox/SDK/Reference/Types
  - https://createos.sh/docs/Sandbox/SDK/Reference/Managed-Processes
  - https://createos.sh/docs/Sandbox/SDK/Reference/Computer
scraped: 2026-10-17
up: "[[Docs - Sandbox SDK]]"
---

# Docs - Sandbox SDK - API Reference

> [!summary] Summary
> - Public surface of `@nodeops-createos/sandbox`: the `CreateosSandboxClient` (via `createClient`), the stateful `Sandbox` handle, `sandbox.files`, `sandbox.processes`, `sandbox.computer`, sub-APIs (`templates`, `networks`, `disks`), the error hierarchy, helpers and wire types.
> - ESM-only, zero runtime dependencies, hand-written `fetch` client; runs on Node 20+, Bun, Deno, Cloudflare Workers, Vercel Edge and the browser.
> - Optional fields use `?` not `| null`; list methods fetch all pages (`iterate*` variants are async generators; server clamps page size to 500).
> - Source: https://createos.sh/docs/Sandbox/SDK/Reference/

## API Reference (index) and Overview
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/ and https://createos.sh/docs/Sandbox/SDK/Reference/Overview
- **Summary:** Entry points to the reference; everything documented is exported from the package root. Generated from the same source as https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/docs/reference.
- **Key points:**
  - Two stateful objects: `CreateosSandboxClient` (catalog, identity, factory, sub-APIs) and `Sandbox` (one sandbox id; every per-sandbox operation). A `Sandbox` holds the transport, not the client, so it outlives the client; reconnect with `client.getSandbox(id)`.
  - Sandboxes bill while running; examples tear down in `try { ... } finally { await sandbox.destroy(); }` or use `setAutoPause`.
  - Pages: Client, Sandbox, Sandbox Files, Sub-APIs, Errors, Helpers, Types, Managed Processes, Computer.

## Client
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Client
- **Summary:** SDK entry point owning transport config (auth, base URL, timeouts, retries); exposes catalog and identity calls, the sandbox factory and the `templates`/`networks`/`disks` sub-APIs.
- **Key points:**
  - Construction: `createClient(options?: CreateosSandboxClientOptions): CreateosSandboxClient` is exactly `new CreateosSandboxClient(options)`. Throws `CreateosSandboxError` synchronously for invalid `baseUrl`, both `apiKey` and `authHeaders`, or no `fetch`.
  - Options: `baseUrl` (env `CREATEOS_SANDBOX_BASE_URL`, then production default), `apiKey` (env `CREATEOS_SANDBOX_API_KEY`, sent as `X-Api-Key`; exclusive with `authHeaders`), `authHeaders`, `timeoutMs` (default `60000`, `0` disables), `retry` (`RetryOptions | false`; default 2 retries, 500 ms base, 30 s ceiling), `headers`, `hooks` (`ClientHooks`), `fetch`, `userAgent`.
  - `RetryOptions`: `maxRetries` (2), `baseDelayMs` (500), `maxDelayMs` (30000). Idempotent (`GET`/`HEAD`/`PUT`/`DELETE`) retry on network errors and `408/500/502/503/504`; non-idempotent only on `429/503`; streaming never retried.
  - Accessors: `box.http` (`CreateosSandboxHttp`), `box.baseUrl`, `box.templates` (`TemplatesApi`), `box.networks` (`NetworksApi`), `box.disks` (`DisksApi`).
  - `RequestOptions` (last argument of every method): `signal`, `headers`, `timeoutMs`, `retry`.
  - `CreateSandboxRequest` fields: `shape` (required), `rootfs`, `name`, `networks` (`NetworkEntry[]`), `disk_mib`, `egress`, `envs`, `ssh_pubkeys`, `host_id`, `region`, `auto_pause_after_seconds` (60-86400). `bandwidth_quota_bytes` is not settable at create.
  - `CreateSandboxOptions` extends `RequestOptions`: `wait` (default `true`), `waitTimeoutMs` (default `120000`). Internally issues `POST /v1/sandboxes` then `GET /v1/sandboxes/:id`.

```ts
createClient(options?: CreateosSandboxClientOptions): CreateosSandboxClient
createSandbox(request: CreateSandboxRequest, options?: CreateSandboxOptions): Promise<Sandbox>
getSandbox(id: string, options?: RequestOptions): Promise<Sandbox>
getSandboxByIP(ip: string, options?: RequestOptions): Promise<Sandbox>
listSandboxes(options?: ListSandboxesOptions): Promise<Sandbox[]>
iterateSandboxes(options?: ListSandboxesOptions): AsyncGenerator<Sandbox>
whoami(options?: RequestOptions): Promise<WhoAmIView>
listShapes(options?: RequestOptions): Promise<Shape[]>
listRootfs(options?: RequestOptions): Promise<RootfsData>
listHosts(options?: RequestOptions): Promise<HostPublic[]>
iterateHosts(options?: RequestOptions): AsyncGenerator<HostPublic>
healthz(options?: RequestOptions): Promise<HealthzResponse>
readyz(options?: RequestOptions): Promise<ReadyzResponse>
```

- `ListSandboxesOptions`: `limit`, `status` (`"running" | "creating" | "destroyed" | "failed"`).
- `whoami` returns `{ user_id, stats }`; `listShapes` (no auth) returns `Shape` with `id`, `vcpu`, `mem_mib`, `default_disk_mib`, optional `cpu_quota_pct`; `listRootfs` (no auth) returns `{ rootfs: string[]; default: string; entries?: RootfsEntry[] }`; `readyz` returns `{ ready: false, reason }` instead of throwing on 503 (retries disabled).

## Sandbox
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox
- **Summary:** Stateful handle owning one sandbox id: commands, file transfer, lifecycle, ingress, egress, bandwidth, networks, disks and SSH.
- **Key points:**
  - Mutating calls refresh the cached projection in place; read via `data` or getters `id`, `status`, `ip` (undefined while `creating`), `name`, `files`.
  - `SandboxStatus`: `creating | running | pausing | paused | resuming | forking | error | destroying | destroyed | failed`.
  - `SandboxView` extras: `vcpu`, `mem_mib`, `disk_mib`, `created_at`, `ingress_enabled`, `ingress_url_template?`, `running_at?`, `destroyed_at?`, `spawn_ms?`, `shape?`, `rootfs?`, `region?`, `egress?`, `envs?`, `ssh_pubkeys?`, `created_by?`, `bandwidth_ingress_bytes?`, `paused_at?`, `last_resumed_at?`, `forked_from?`, `auto_pause_after_seconds?`.
  - `runCommand` returns `ExecResponse` = `{ result: { stdout, stderr, exit_code, error? }, exec_ms }`. `ExecOptions` is an alias for `RequestOptions`.
  - `sh(script)` runs `bash -lc` and throws `CreateosSandboxError` on non-zero exit (message includes optional `label`, exit code, duration, stdout/stderr tail).
  - `fork` request (`ForkSandboxRequest`, all optional): `start_paused`, `ssh_pubkeys`, `egress`, `ingress_enabled`, `envs`. Server rejects `bandwidth_quota_bytes` on fork (400); forks do not inherit S3 disks.
  - `resize(diskMib)` only grows; `destroy` returns `{ id, status: "destroying" | "destroyed" }`.
  - `waitUntilRunning`/`waitUntilPaused` abort on `error`, `failed`, `destroying`, `destroyed`; `waitUntilDestroyed` aborts on `failed`. `WaitOptions`: `timeoutMs` (default 120000), `signal`, `request`.
  - For reconnectable commands use `sandbox.processes`; for desktop control use `sandbox.computer` with a desktop-capable image.

```ts
static async create(request: CreateSandboxRequest, options?: CreateosSandboxClientOptions & CreateSandboxOptions): Promise<Sandbox>
static async connect(id: string, options?: CreateosSandboxClientOptions & RequestOptions): Promise<Sandbox>
async runCommand(cmd: string, args?: string[], options?: ExecOptions): Promise<ExecResponse>
async *streamCommand(cmd: string, args?: string[], options?: ExecOptions): AsyncGenerator<ExecStreamEvent>
async sh(script: string, options?: ExecOptions & { label?: string }): Promise<ExecResponse>
async pause(options?: RequestOptions): Promise<this>
async resume(options?: RequestOptions): Promise<this>
async fork(request?: ForkSandboxRequest, options?: RequestOptions): Promise<Sandbox>
async destroy(options?: RequestOptions): Promise<DestroyedResponse>
async resize(diskMib: number, options?: RequestOptions): Promise<ResizeSandboxResponse>
async setAutoPause(seconds: number | null, options?: RequestOptions): Promise<this>
async waitUntilRunning(options?: WaitOptions): Promise<this>
async waitUntilPaused(options?: WaitOptions): Promise<this>
async waitUntilDestroyed(options?: WaitOptions): Promise<this>
async setIngress(enabled: boolean, options?: RequestOptions): Promise<this>
async waitForPortReady(port: number, options?: WaitOptions & { intervalMs?: number; host?: string }): Promise<this>
previewUrl(port: number, options?: { scheme?: "http" | "https" }): string
getEgress(options?: RequestOptions): Promise<EgressView>
setEgress(rules: string[] | null, options?: RequestOptions): Promise<EgressView>
getBandwidth(options?: RequestOptions): Promise<BandwidthView>
rechargeBandwidth(addBytes: number, options?: RequestOptions): Promise<BandwidthView>
attachNetwork(networkId: string, options?: RequestOptions): Promise<OKResponse>
detachNetwork(networkId: string, options?: RequestOptions): Promise<OKResponse>
listDisks(options?: RequestOptions): Promise<SandboxDiskView[]>
iterateDisks(options?: RequestOptions): AsyncGenerator<SandboxDiskView>
attachDisk(opts: AttachDiskOptions, options?: RequestOptions): Promise<OKResponse>
detachDisk(opts: DetachDiskOptions, options?: RequestOptions): Promise<DiskDetachedResponse>
addSSHPubkeys(keys: string[], options?: RequestOptions): Promise<AddSSHPubkeysResponse>
async refresh(options?: RequestOptions): Promise<this>
toJSON(): SandboxView
```

- `ExecStreamEvent` union: `{ type: "stdout"; data: string } | { type: "stderr"; data: string } | { type: "exit"; exitCode: number } | { type: "error"; message: string } | { type: "heartbeat" }`.
- Other self-signal helpers (exported from the package root, used inside a sandbox): `selfPause(reason?)`, `selfDelete(reason?)`; token helpers referenced in example 57: `createAccessToken()`, `withAccessToken()`.

## Sandbox Files
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox-Files
- **Summary:** `SandboxFiles` (via `sandbox.files`) handles raw file transfer between your process and the sandbox filesystem.
- **Key points:**
  - `upload` writes raw bytes to an absolute path; destination directories must already exist; overwrites an existing file. `data` types: `string`, `Blob`, `ArrayBuffer`, `ReadableStream`, `FormData`, `URLSearchParams`.
  - `download` returns raw bytes as `ArrayBuffer`.

```ts
async upload(path: string, data: BodyInit, options?: RequestOptions): Promise<void>
async download(path: string, options?: RequestOptions): Promise<ArrayBuffer>
```

## Sub-APIs
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Sub-APIs
- **Summary:** `TemplatesApi`, `NetworksApi`, `DisksApi`: cross-sandbox catalog sub-APIs reached as `client.templates`, `client.networks`, `client.disks`.
- **Key points:**
  - `DiskCredentials` = `{ access_key, secret_key }`; `DiskKind` = `"s3"`; `NetworkCreateRequest` = `{ name }`; `TemplateStatus` = `"pending" | "building" | "ready" | "failed"`; `TemplateLogsOptions.attempt` filters one build attempt.
  - `GetTemplateOptions.include = "dockerfile"` adds the Dockerfile source to the response.

```ts
// TemplatesApi
list(options?: RequestOptions): Promise<TemplateView[]>
iterate(options?: RequestOptions): AsyncGenerator<TemplateView>
create(request: TemplateCreateRequest, options?: RequestOptions): Promise<TemplateView>
get(id: string, options?: GetTemplateOptions): Promise<TemplateView>
delete(id: string, options?: RequestOptions): Promise<OKResponse>
logs(id: string, options?: TemplateLogsOptions): Promise<string>
followLogs(id: string, options?: TemplateLogsOptions): AsyncGenerator<TemplateLogEvent>
// NetworksApi
list(options?: RequestOptions): Promise<Network[]>
iterate(options?: RequestOptions): AsyncGenerator<Network>
create(request: NetworkCreateRequest, options?: RequestOptions): Promise<Network>
get(id: string, options?: RequestOptions): Promise<Network>
delete(id: string, options?: RequestOptions): Promise<OKResponse>
// DisksApi
list(options?: RequestOptions): Promise<DiskView[]>
iterate(options?: RequestOptions): AsyncGenerator<DiskView>
create(request: DiskCreateRequest, options?: RequestOptions): Promise<DiskView>
get(idOrName: string, options?: RequestOptions): Promise<DiskView>
delete(idOrName: string, options?: RequestOptions): Promise<DiskDeletedResponse>
rotateCredentials(idOrName: string, credentials: DiskCredentials, options?: RequestOptions): Promise<DiskView>
```

## Errors
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Errors
- **Summary:** Every failure is a subclass of `CreateosSandboxError`; errors surface only after the built-in retry policy is exhausted.
- **Key points:**
  - Status mapping: 401 `CreateosSandboxAuthError`; 402 `CreateosSandboxPaymentRequiredError`; 403 `CreateosSandboxPermissionError`; 404 `CreateosSandboxNotFoundError`; 400/409/422 `CreateosSandboxValidationError`; 429 `CreateosSandboxRateLimitError`; 5xx `CreateosSandboxServerError`; other non-2xx `CreateosSandboxApiError`; network failure `CreateosSandboxConnectionError`; deadline `CreateosSandboxTimeoutError`.
  - Base fields: `message`, `name`, `cause`. `CreateosSandboxApiError` adds `statusCode`, `response`, `envelope`, `requestId`, `resourceId`, `code`, `endpoint`, `method`.
  - `CreateosSandboxRateLimitError.retryAfterSeconds?: number` (from `Retry-After`).
  - 402 is thrown when account credit is insufficient (sandbox create, resume, fork, bandwidth recharge, disk/network/template creation are gated on positive balance).
  - `ErrorRequestContext`: `{ endpoint?: string; method?: string }`.

## Helpers
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Helpers
- **Summary:** Polling, runtime detection, redaction helpers, `VERSION` and the `CreateosSandboxHttp` escape hatch.
- **Key points:**
  - `pollUntil<T>(options: PollOptions<T>): Promise<T>` with `poll`, `done`, `failed?`, `timeoutMs`, `signal?`; `sleep(ms: number, signal?: AbortSignal): Promise<void>`.
  - `detectRuntime(): Runtime` (`"node" | "bun" | "deno" | "workerd" | "edge-light" | "browser" | "react-native" | "unknown"`), `runtimeTag(): string`.
  - `redactHeaders(headers: Headers | HeadersInit): Record<string, string>`, `redactQuery(query: URLSearchParams): URLSearchParams`, `redactUrl(url: string): string`, constants `SENSITIVE_HEADER_NAMES`, `SENSITIVE_QUERY_PARAMS`; `VERSION`.
  - `CreateosSandboxHttp` (via `client.http`): `request<T>(method, path, options?): Promise<T>`, `requestRaw(method, path, options?): Promise<Response>`, `stream<T>(method, path, options?): AsyncGenerator<T>`, `fetchAllPages<T>(method, path, options?): Promise<T[]>`.

## Types
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Types
- **Summary:** All wire types and option interfaces (JSON request/response shapes).
- **Key points:**
  - JSend: `SuccessEnvelope<T>`, `FailEnvelope`, `ErrorEnvelope`, `JSendEnvelope<T>`.
  - Client/request: `RetryOptions`, `RetryReason` (`"network" | "status" | "rate-limit"`), `RequestHookContext`, `ResponseHookContext`, `RetryHookContext`, `ClientHooks`, `CreateosSandboxClientOptions`, `RequestOptions`, `ExecOptions`.
  - Catalog: `Shape`, `RootfsEntry`, `RootfsData`, `HostStatus`, `HostPublic`, `WhoAmIStatsView`, `WhoAmIView`.
  - Sandbox: `NetworkEntry`, `CreateSandboxRequest`, `CreateSandboxResponse`, `SandboxStatus`, `SandboxView`, `ListSandboxesOptions`, `ForkSandboxRequest`, `PatchSandboxRequest`, `AddSSHPubkeysRequest/Response`, `DestroyedResponse`, `SetEgressRequest`, `EgressView`, `BandwidthView`, `RechargeBandwidthRequest` (`add_bytes`), `ResizeSandboxRequest` (`disk_mib`), `ResizeSandboxResponse`.
  - `BandwidthView`: `id`, `quota_bytes` (`-1` unmetered), `used_bytes`, `ingress_bytes`, `remaining_bytes`, `capped`.
  - Exec: `ExecRequest`, `ExecResult` (`stdout`, `stderr`, `exit_code`, `error?`), `ExecResponse` (`result`, `exec_ms`), `ExecStreamEvent`, `ExecStreamFrame` (wire: `stdout`, `stderr`, `exit_code`, `error`, `hb`).
  - Templates: `TemplateStatus`, `TemplateCreateRequest`, `TemplateView` (`id`, `name`, `base`, `status`, `ext4_size_bytes`, `created_at`, `built_at?`, `dockerfile?`), `GetTemplateOptions`, `TemplateLogEvent` (`ts?`, `level?`, `line?`, `attempt?`, `final?`, `status?`), `TemplateLogsOptions`.
  - Disks: `DiskKind`, `DiskConfig`, `DiskCredentials`, `DiskCreateRequest`, `DiskView`, `DiskMountStatus` (`"pending" | "mounted" | "error" | "unmounting"`), `DiskAttachment`, `SandboxDiskView`, `AttachDiskOptions` (`diskId`, `mountPath`, `subPath?`), `DetachDiskOptions` (`diskId`, `mountPath`), `DiskDeletedResponse`, `DiskDetachedResponse`.
  - Networks: `NetworkCreateRequest`, `NetworkMember` (`sandbox_id`, `status`, `ip?`, `name?`), `Network`. Misc: `OKResponse` (`ok`), `HealthzResponse` (`up`), `ReadyzResponse` (`ready`, `reason?`, `scheduler_last_ok_ms_ago?`). Handle options: `CreateSandboxOptions`, `WaitOptions`.

## Managed Processes
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Managed-Processes
- **Summary:** `sandbox.processes` for commands you need to reconnect to, send input to, or stop later; sandbox must be running; needs an SDK version exporting `SandboxProcesses`.
- **Key points:**
  - `ManagedProcessCreateRequest` accepts `cmd`, `args`, `cwd`, `env`, `pty`; interactive default shell: `{ pty: { rows: 24, cols: 80 } }`. PTY output arrives on the `pty` stream; pipe processes keep `stdout` and `stderr` separate.
  - Connect events: `{ type: "data", seq, stream, data }` (base64 decoded to UTF-8 by the SDK), `exit` (`exitCode`, `signal`), `heartbeat`, `error` (`message`, optional `oldestAvailableSeq`). Reconnect with `{ after: lastSeq }`.
  - Retention: 1 MiB per process, 32 MiB per sandbox; evicted offset returns HTTP 410.
  - `wait()` options: `scope: "leader"` (default) or `"tree"`; `waitTimeoutMs` up to 30000 (0 or omitted = 30000); 408 means expired, wait again; `timeoutMs` is separate client transport timeout. `delete()` option `graceMs` default 1000, range 0 to 60000.
  - Disconnecting from output does not stop the command; use `delete()` or destroy the sandbox.

| Method | Returns | Use |
|---|---|---|
| `create(request, options?)` | `Promise<ManagedProcess>` | Start a pipe process or PTY |
| `list(options?)` | `Promise<{ processes: ManagedProcess[] }>` | List retained process records |
| `get(processId, options?)` | `Promise<ManagedProcess>` | Read state and retained output window |
| `connect(processId, options?)` | `AsyncGenerator<ManagedProcessConnectEvent>` | Replay and follow output; `after` selects greater sequence numbers |
| `input(processId, text, options?)` | `Promise<{ input_seq: number }>` | Send UTF-8 input |
| `inputBytes(processId, bytes, options?)` | `Promise<{ input_seq: number }>` | Send a `Uint8Array` |
| `closeStdin(processId, options?)` | `Promise<OKResponse>` | Close a pipe process's stdin (PTY rejects) |
| `resize(processId, { rows, cols }, options?)` | `Promise<OKResponse>` | Resize a PTY (pipe rejects) |
| `signal(processId, signal, options?)` | `Promise<OKResponse>` | Send e.g. `SIGINT` or `SIGTERM` |
| `wait(processId, options?)` | `Promise<ManagedProcess>` | Wait for leader or complete tree |
| `delete(processId, options?)` | `Promise<ManagedProcess>` | Stop the process tree with a grace period |

## Computer
- **URL:** https://createos.sh/docs/Sandbox/SDK/Reference/Computer
- **Summary:** `sandbox.computer` captures screenshots and controls a desktop; choose a desktop-capable image such as `desktop:1` when listed in `client.listRootfs()`; needs an SDK version exporting `SandboxComputer`.
- **Key points:**
  - Most methods take `ComputerScreenOptions` last: `{ screenId?, ...requestOptions }`; omit for primary screen; IDs `screen-0` to `screen-7`.
  - Windows via `computer.windows`: `list({ application?, screenId? })`, `current`, `get(windowId)`, `geometry(windowId)`, `focus`, `move(windowId, { x, y })`, `resize(windowId, { width, height })`, `maximize`, `minimize`, `restore`, `close`.
  - `screens.connect()` needs `await sandbox.setIngress(true)` first (409 if ingress disabled); tokens expire; each new request replaces the previous token for new connections; treat token URLs as credentials.
  - Example: `const dimensions = await sandbox.computer.screen(); await sandbox.computer.open("https://example.com"); const png = await sandbox.computer.screenshot();` with `createSandbox({ shape: "s-4vcpu-4gb", rootfs: "desktop:1" })`.

| Method | Result |
|---|---|
| `screenshot(options?)` | PNG bytes as `Promise<ArrayBuffer>`; options add `windowId` or rectangle (`x`, `y`, `width`, `height`) |
| `screen(options?)` | `{ width, height }` |
| `cursor(options?)` | `{ x, y }` |
| `clipboard(options?)` | `{ text }` |
| `setClipboard(textOrObject, options?)` | Replace clipboard text with a string or `{ text }` |
| `open(targetOrObject, options?)` | Open a URL or target (string or `{ target }`) |
| `launch({ application, uri? }, options?)` | Launch an installed application |
| `mouse.move({ x, y })` | Cursor coordinates |
| `mouse.click(request?)` | Optional `button` (`left`, `middle`, `right`), `count`, paired `x`/`y` |
| `mouse.scroll(request?)` | Optional `direction` (`up`, `down`) and `amount` |
| `mouse.drag({ from, to })` | Each endpoint `{ x, y }` |
| `mouse.down(request?)`, `mouse.up(request?)` | Optional `{ button }` |
| `keyboard.type(textOrObject)` | String or `{ text, delay_in_ms? }` |
| `keyboard.press(keysOrObject)` | Key array such as `["ctrl", "a"]`, or `{ keys: [...] }` |
| `keyboard.down(keysOrObject)`, `keyboard.up(keysOrObject)` | Hold or release keys |
| `screens.list()` | `ComputerScreen[]` |
| `screens.create({ width?, height? }?)` | New `ComputerScreen` (default 1280 x 800) |
| `screens.get(screenId)` | One `ComputerScreen` |
| `screens.resize(screenId, { width, height })` | Updated `ComputerScreen` |
| `screens.delete(screenId)` | `OKResponse` (primary cannot be deleted) |
| `screens.connect(screenId)` | `screen_id`, `port`, `path`, `token`, `expires_at`, optional `url` |

## Related
- Up: [[Docs - Sandbox SDK]]
- [[Docs - Sandbox REST API]]: the REST endpoints every method wraps
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: managed process and exec wire formats
- [[Docs - Sandbox REST API - Computer Use and Devices]]: computer endpoint paths and errors
- [[Docs - Sandbox SDK - How-To Guides]]: task recipes using these methods
- [[Docs - Sandbox SDK - Concepts]]: handle model, lifecycle, reliability
- [[Docs - Sandbox Limits]]: plan caps
