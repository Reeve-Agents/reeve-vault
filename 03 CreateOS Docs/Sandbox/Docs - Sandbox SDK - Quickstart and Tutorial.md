---
aliases:
  - Sandbox SDK Quickstart and Tutorial
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/SDK/Quickstart
sources:
  - https://createos.sh/docs/Sandbox/SDK/Quickstart
  - https://createos.sh/docs/Sandbox/SDK/Tutorial
scraped: 2026-10-17
up: "[[Docs - Sandbox SDK]]"
---

# Docs - Sandbox SDK - Quickstart and Tutorial

> [!summary] Summary
> - Quickstart: install `@nodeops-createos/sandbox`, authenticate, `createSandbox`, `runCommand`, `destroy` in under five minutes of TypeScript.
> - Tutorial: build an AI app generator (Claude writes a Node server, the sandbox runs it, ingress serves it at a preview URL), about 20 minutes.
> - SDK is ESM-only with zero runtime dependencies; runs on Node 20+, Bun, Deno, Cloudflare Workers, Vercel Edge and the browser.
> - Source: https://createos.sh/docs/Sandbox/SDK/Quickstart and https://createos.sh/docs/Sandbox/SDK/Tutorial

## Quickstart
- **URL:** https://createos.sh/docs/Sandbox/SDK/Quickstart
- **Summary:** The 30-second tour: install, authenticate, spawn a sandbox, run a command and tear it down.
- **Key points:**
  - Package `@nodeops-createos/sandbox`; import `import { createClient } from "@nodeops-createos/sandbox"`.
  - Base URL `https://api.sb.createos.sh` (override with `CREATEOS_SANDBOX_BASE_URL`); auth via `apiKey` option or `CREATEOS_SANDBOX_API_KEY`.
  - Install: `bun add @nodeops-createos/sandbox` or `npm install @nodeops-createos/sandbox`.
  - The API key is per-user; treat it like a database password and keep it out of source control.
  - Env setup: `export CREATEOS_SANDBOX_BASE_URL="https://api.sb.createos.sh"` and `export CREATEOS_SANDBOX_API_KEY="sk_…"`.
  - Client: `createClient()` reads env, or `createClient({ baseUrl: "https://…", apiKey: "sk_…" })`. Verify with `console.log(await client.whoami())`.
  - Spawn: `client.createSandbox({ shape: "s-4vcpu-4gb", rootfs: "devbox:1" })`; blocks until `running` by default; pass `{ wait: false }` to return early and poll with `waitUntilRunning`. Choose a shape from `client.listShapes()` and rootfs from `client.listRootfs()`.
  - Run: `sandbox.runCommand("uname", ["-a"])`, read `result.result.stdout`. For long-running commands, stream (see How-To Guides note).
  - Tear down: `await sandbox.destroy()`; async on the server, call `sandbox.waitUntilDestroyed()` to block until reclaimed.
  - Wrap in `try / finally` so `destroy()` always runs. A forgotten sandbox keeps billing; alternative: `createSandbox({ …, auto_pause_after_seconds: 300 })`.
  - Troubleshooting: `CreateosSandboxAuthError` (missing/wrong key; check `client.whoami()`), `CreateosSandboxConnectionError` (check `CREATEOS_SANDBOX_BASE_URL`, proxy/firewall), `CreateosSandboxTimeoutError` from `createSandbox` (raise `waitTimeoutMs` or `{ wait: false }`), `CreateosSandboxServerError` status 503 (host pool saturated; SDK already retried; honour `Retry-After`).

## Tutorial: build an AI app generator
- **URL:** https://createos.sh/docs/Sandbox/SDK/Tutorial
- **Summary:** Build a script that takes a plain-English prompt, asks Claude for a web app, uploads it into a live VM sandbox, starts it and returns a public preview URL: LLM generates, VM runs, ingress serves.
- **Key points:**
  - Prerequisites: Node 20+ or Bun; a createos-sandbox API key and control-plane URL; an Anthropic API key. Estimated time 20 minutes.
  - Packages: `bun add @nodeops-createos/sandbox @anthropic-ai/sdk`. Env: `CREATEOS_SANDBOX_BASE_URL`, `CREATEOS_SANDBOX_API_KEY`, `ANTHROPIC_API_KEY`; optional `ANTHROPIC_MODEL` (tutorial default `claude-sonnet-4-6`).
  - File `ai-app-gen.ts`; run with `bun ai-app-gen.ts`.

| Step | What it does | Key calls |
|---|---|---|
| 1 Set up | Install, export credentials, verify connectivity | `createClient()`, `client.whoami()` |
| 2 Spawn with ingress | `ingress_enabled: true` provisions the public hostname; resolve preview URL early | `client.createSandbox({ shape: "s-4vcpu-4gb", rootfs: "devbox:1", ingress_enabled: true })`, `sandbox.previewUrl(3000, { scheme: "http" })` |
| 3 Ask Claude | Generate a single-file Node HTTP server binding `0.0.0.0:3000` | `anthropic.messages.create({ model, max_tokens: 2048, messages })` |
| 4 Upload | Guest paths must be absolute; parent dirs must exist (`mkdir -p` via `runCommand`) | `sandbox.files.upload("/root/app.js", code)` |
| 5 Run | Background the server; wait for the port | `sandbox.runCommand("sh", ["-c", "nohup setsid node /root/app.js >/tmp/app.log 2>&1 &"])`, `sandbox.waitForPortReady(3000, { timeoutMs: 15_000 })` |
| 6 Preview | Fetch the URL to confirm HTTP 200, open in a browser | `fetch(previewUrl)` |
| 7 Iterate (optional) | Ask Claude for a change, re-upload, `pkill`, restart | `sandbox.files.upload`, then `pkill -f 'node /root/app.js'` and restart |
| 8 Tear down | Destroy in `finally`; `.catch` so destroy failure does not mask the original error | `sandbox.destroy().catch(...)` |

- Daemonise pattern: `nohup` (ignore SIGHUP) + `setsid` (new session) + `>/tmp/app.log 2>&1` (detach stdio) + `&`. `runCommand` waits for exit, so an undetached server blocks forever.
- Use `scheme: "http"` until the ingress domain has a TLS certificate.
- Takeaways: ingress sandbox gets a public hostname at create time; Anthropic Messages API is just a call from the same script; the loop (re-upload, restart, re-fetch) is repeatable.

## Related
- Up: [[Docs - Sandbox SDK]]
- [[Docs - Sandbox SDK - How-To Guides]]: files, lifecycle, expose a service, streaming
- [[Docs - Sandbox SDK - API Reference]]: full signatures for `createSandbox`, `runCommand`, `files`, `previewUrl`, `waitForPortReady`, `destroy`
- [[Docs - Sandbox SDK - Concepts]]: VM sandboxes, lifecycle, reliability
- [[Docs - Sandbox SDK - Examples]]: runnable examples (including 03 dev-server-preview-url)
- [[Docs - Sandbox Quickstart]]: CLI, SDK and REST quickstart
- [[Hackathon Setup Guide]]: hackathon environment setup
- [[Hackathon Ideas]]: ideas that reuse the generate-run-preview loop
