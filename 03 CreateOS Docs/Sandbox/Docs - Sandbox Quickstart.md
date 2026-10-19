---
aliases:
  - Sandbox Quickstart
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Quickstart
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Quickstart

> [!summary] Summary
> - Create a sandbox, run a command, tear it down: CLI (7 steps), SDK, or plain REST. All need a CreateOS API token from https://createos.sh/app/profile
> - CLI: `createos login`, `createos sandbox create --shape s-1vcpu-1gb --name my-box`, `createos sandbox exec my-box -- uname -a`, `createos sandbox rm my-box --force`.
> - Free plan runs one sandbox at a time, Pro runs twenty; egress is open until you pass an allowlist.
> - Source: https://createos.sh/docs/Sandbox/Quickstart

## Quickstart
- **URL:** https://createos.sh/docs/Sandbox/Quickstart
- **Summary:** Create your first sandbox, run a command in it, and tear it down, with CLI and SDK side by side, plus the REST equivalent. Both CLI and SDK authenticate with a CreateOS API token (generate from the dashboard: https://createos.sh/app/profile).
- **Key points:** steps below, commands verbatim.

### CLI

#### 1. Install
```bash
curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
# or with Homebrew
brew tap nodeops-app/tap && brew install createos
```

#### 2. Sign in
```bash
createos login
```
- Opens a browser to sign in. For CI, pass a token instead: `createos login --token <your-token>`.

#### 3. Create a sandbox
```bash
# See available sizes
createos sandbox shapes

# Create one
createos sandbox create --shape s-1vcpu-1gb --name my-box
```

#### 4. Run a command
```bash
createos sandbox exec my-box -- uname -a
```

#### 5. Start a reconnectable process
- Use `process` when you want a command to keep a process ID so you can attach, wait, signal, or stop it later.
```bash
createos sandbox process start my-box -- python -m http.server 8000
createos sandbox process list my-box
```
- For a quick one-shot command, stay with `exec`. For a persistent shell you can detach from and reattach to, use `createos sandbox process shell my-box`. Add `--pty` to `process run` or `process start` for REPLs, curses apps, or other terminal-aware commands.

#### 6. Open a shell
```bash
createos sandbox shell my-box
```

#### 7. Clean up
```bash
createos sandbox rm my-box --force
```
- Full command set: [[Docs - Sandbox CLI]].

### SDK

#### 1. Install
```bash
npm install @nodeops-createos/sandbox
```

#### 2. Create, run, destroy
```ts
import { createClient } from "@nodeops-createos/sandbox";

const client = createClient({
  apiKey: process.env.CREATEOS_SANDBOX_API_KEY!,
  // baseUrl defaults to https://api.sb.createos.sh
});

const sandbox = await client.createSandbox({ shape: "s-1vcpu-1gb" });

const { result } = await sandbox.runCommand("uname", ["-a"]);
console.log(result.stdout);

await sandbox.destroy();
```
- Go further: SDK quickstart and tutorial ([[Docs - Sandbox SDK]]).

### REST API
Every operation is also a plain HTTP call:
```bash
# Create
curl -X POST https://api.sb.createos.sh/v1/sandboxes \
  -H "X-Api-Key: $CREATEOS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"shape": "s-1vcpu-1gb"}'

# Run a command (replace :id with the returned sandbox id)
curl -X POST https://api.sb.createos.sh/v1/sandboxes/:id/exec \
  -H "X-Api-Key: $CREATEOS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"cmd": "uname", "args": ["-a"]}'
```
- Every endpoint: [[Docs - Sandbox REST API]].

### Next (as listed on the page)
- Before a real workload read [[Docs - Sandbox Limits]]: the free plan runs one sandbox at a time, Pro runs twenty, and egress is open until you pass an allowlist.
- Lock outbound traffic with two rules for a Python job: see the Egress REST page ([[Docs - Sandbox REST API]]).
- Rate card and credits: https://createos.sh/pricing/sandbox . SDK source: https://github.com/NodeOps-app/createos-sandbox-sdk . npm: https://www.npmjs.com/package/@nodeops-createos/sandbox

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox Limits]]: sizes, plan caps and defaults before a real workload
- [[Docs - Sandbox Overview and Concepts]]: vocabulary and capabilities
- [[Docs - Sandbox CLI]]: CLI install, auth and commands
- [[Docs - CLI]]: platform-wide `createos` CLI docs
- [[Hackathon Setup Guide]]: hackathon setup steps
- [[Pricing - Sandbox]]: rate card and credits
