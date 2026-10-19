---
aliases:
  - Sandbox Integrations
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Integrations/
sources:
  - https://createos.sh/docs/Sandbox/Integrations/
  - https://createos.sh/docs/Sandbox/Integrations/Overview
  - https://createos.sh/docs/Sandbox/Integrations/Claude-Code
  - https://createos.sh/docs/Sandbox/Integrations/Codex
  - https://createos.sh/docs/Sandbox/Integrations/OpenCode
  - https://createos.sh/docs/Sandbox/Integrations/Pi
  - https://createos.sh/docs/Sandbox/Integrations/Herdr
  - https://createos.sh/docs/Sandbox/Integrations/DeepSeek-Harness
  - https://createos.sh/docs/Sandbox/Integrations/Orca
  - https://createos.sh/docs/Sandbox/Integrations/n8n
  - https://createos.sh/docs/Sandbox/Integrations/Langflow
  - https://createos.sh/docs/Sandbox/Integrations/AgentBox
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Integrations

> [!summary] Summary
> - Ten integrations run coding agents, harnesses or workflow steps on CreateOS Sandbox microVMs: Claude Code (18 slash commands), Codex (skill + `cos` driver), OpenCode (33 tools), Pi (34 sandbox tools + 7 replacements), Herdr, Orca, DeepSeek Harness, AgentBox, n8n, Langflow.
> - Most drive the `createos` CLI: install `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -`, then `createos login` or `export CREATEOS_API_KEY=<key>`.
> - Exceptions with their own credentials: DeepSeek Harness (`CREATEOS_SANDBOX_API_KEY`), n8n (CreateOS API credential), Langflow (`CREATEOS_SANDBOX_API_KEY`), AgentBox (prompted key or `CREATEOS_API_KEY`).
> - Egress is unrestricted by default in every integration; presets (`python-uv`, `rust-cargo`, `npm`, `github`) exist in the Claude Code / Codex plugins.
> - Source: https://createos.sh/docs/Sandbox/Integrations/ and sub-pages. Plugin repo: [[Repo - createos-claude-plugins]].

## Integrations (section index page)
- **URL:** https://createos.sh/docs/Sandbox/Integrations/
- **Summary:** Each guide runs a coding agent or agent harness inside its own CreateOS Sandbox microVM, so the agent gets a real machine with its own kernel and an egress allowlist instead of your laptop or a shared container.
- **Key points:**
  - Overview explains the common pattern: create a sandbox, install the tool, point it at the repo, restrict egress. Per-tool pages cover install commands and quirks.
  - Pages listed: Overview, Claude Code, Codex, OpenCode, Pi, Herdr, DeepSeek Harness, Orca (n8n, Langflow and AgentBox are listed in the docs index).

## Integrations Overview
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Overview
- **Summary:** CreateOS ships plugins for seven coding agents and terminal tools, plus nodes for two workflow builders (n8n, Langflow) and a provider for AgentBox. They differ in where the agent itself runs.
- **Key points:**
  - Shapes: (1) agent runs locally and calls out to a sandbox: Claude Code, Codex, OpenCode. (2) agent runs locally but its tools are remote: Pi. (3) agent runs inside the sandbox: Herdr, Orca. (4) DeepSeek Harness replaces the harness's filesystem and subprocess layers. (5) AgentBox swaps its box for a microVM. (6) No agent at all: n8n, Langflow.

| Integration | Agent runs | How you reach the sandbox |
|---|---|---|
| Claude Code | Locally | 18 slash commands, plus a skill that offers to offload heavy work |
| Codex | Locally | A skill that teaches the `createos` CLI |
| OpenCode | Locally | 33 sandbox tools |
| Pi | Locally | 34 sandbox tools, and optionally every built-in tool |
| Herdr | In the sandbox | A terminal pane per sandbox |
| Orca | In the sandbox | A whole workspace on a microVM |
| DeepSeek Harness | Locally | Filesystem and subprocess layers replaced |
| AgentBox | In the sandbox | A provider plugin, selected per box |
| n8n | No agent | A workflow node that runs one command |
| Langflow | No agent | A sandbox backend, a canvas node, or the whole flow |

- Guidance: slow/risky command or long build or script you did not write -> integration for the agent you already use. Whole session off your machine -> Pi remote-tools mode, Herdr, Orca. No agent, command from an automation -> n8n node, or Langflow plugin for a Langflow flow.

### Setting up (common)
- Every integration except DeepSeek Harness, n8n, Langflow and AgentBox drives the `createos` CLI underneath and holds no credentials of its own.
- Install the CLI:
```bash
curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
```
- Authenticate at a terminal (opens a browser; needs a real terminal, run it yourself rather than asking an agent):
```bash
createos login
```
- In CI, a devcontainer, or anywhere headless, set an API key (takes precedence when both are present; export in your shell, do not paste into a conversation with an agent):
```bash
export CREATEOS_API_KEY=<key>
```
- Exceptions: DeepSeek Harness uses the sandbox SDK with `CREATEOS_SANDBOX_API_KEY` plus a shape. n8n holds its own **CreateOS API** credential. Langflow reads `CREATEOS_SANDBOX_API_KEY` from its environment. AgentBox holds its own key (prompted on first use or `CREATEOS_API_KEY`) and attaches to boxes over an authenticated websocket rather than SSH.
- Herdr and Orca involve two credential sets: your CreateOS credentials (on your machine; create the sandbox) and the agent's own provider credentials (Anthropic, OpenAI, etc.), which belong inside the sandbox where you sign the agent in.
- Every integration gets the platform capabilities: private networks, public HTTPS URLs, port tunnels to `localhost`, S3 disk mounts, custom images from a Dockerfile, egress allowlists, pause/resume/fork.
- **Egress is unrestricted by default.** Every integration exposes a way to restrict it; presets cover common package registries. To genuinely prevent exfiltration prefer IP and CIDR rules over domain rules (domain allowlists: strong for HTTPS, weak for cleartext HTTP).
- **Cleanup differs.** One-shot commands destroy their box on the way out. Reusable boxes stay until destroyed or paused; a paused box is charged for memory and storage but not vCPU. Each page says whether quitting a session destroys anything.

## Claude Code
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Claude-Code
- **Summary:** The CreateOS Sandbox plugin gives Claude Code a skill and slash commands that run work in disposable sandboxes. Claude runs on your machine; the build, test suite or untrusted script runs on a throwaway Linux box that destroys itself when finished.
- **Key points:**
  - Marketplace `createos` (from NodeOps-app/createos-claude-plugins); plugin `createos-sandbox`; 18 commands namespaced `/createos-sandbox:<verb>`; auth `createos login` or `CREATEOS_API_KEY`; engine is the `cos` shell driver wrapping the `createos` CLI.
  - Prerequisites: CLI install (plugin installs it on first need) and `createos login` / `export CREATEOS_API_KEY=<key>` as above. `cos auth` reports which method is in effect.
  - Install:
```
/plugin marketplace add NodeOps-app/createos-claude-plugins
/plugin install createos-sandbox@createos
```
- Optional: put `cos` on PATH (symlinks the driver to `~/.local/bin/cos`):
```bash
/path/to/createos-claude-plugins/packages/claude-code-plugin/scripts/cos install
```

**One-shot work**
| Command | What it does |
|---|---|
| `/createos-sandbox:offload <dir> <cmd>` | Stage a directory, run a command, optionally pull artifacts back, destroy the box |
| `/createos-sandbox:fanout <dir> <cmd1> [cmd2 …]` | Run each command in its own box, in parallel |
| `/createos-sandbox:shell` | An instant throwaway Linux shell, destroyed when you exit |

- `offload` uploads the directory (`.git`, `node_modules`, `target` etc. excluded automatically), runs the command, tears the box down whether it passed or failed:
```
/createos-sandbox:offload . "npm ci && npm test"
```

| Flag | Effect |
|---|---|
| `-o <dir>` | Pull artifacts back to this local directory |
| `-p <preset>` | Restrict egress to a named preset |
| `-e <domain>` | Allow one extra host (repeatable, composes with `-p`) |
| `-E` | Keep egress explicitly unrestricted and silence the warning |
| `-x <glob>` | Add an upload exclude |
| `-s <shape>` | Pick a machine size |
| `-K` | Keep the box if the command fails, so you can inspect it |

- `shell` is interactive, so Claude hands it back to you to run in your own terminal.

**A reusable box**
| Command | What it does |
|---|---|
| `/createos-sandbox:up` | Create or reuse a box for this repo |
| `/createos-sandbox:run <cmd>` | Run a command on it, keeping state between calls |
| `/createos-sandbox:sync <local-dir> [remote-dir]` | Sync files in the background |
| `/createos-sandbox:status` | Show the box, sync, tunnels, and cluster |
| `/createos-sandbox:down` | Stop sync and destroy the box |

- Box is keyed to your repository; `up` twice reuses the first box. If a box exists under the expected name but this machine has no record, `up` refuses unless `-a` (adopt); an adopted box is never destroyed by `down`.

**Networking**
| Command | What it does |
|---|---|
| `/createos-sandbox:tunnel <remote-port> [local-port]` | Forward a box port to `127.0.0.1` |
| `/createos-sandbox:expose <port>` | Serve a box port on a public HTTPS URL |
| `/createos-sandbox:unexpose` | Turn that URL off |
| `/createos-sandbox:cluster up <N>` | N boxes on one private network, addressable by name |
| `/createos-sandbox:vpn` | WireGuard access from your machine into a private network |

- `tunnel` keeps the service private; `expose` puts it on the public internet with no authentication in front. A service must bind `0.0.0.0` rather than `127.0.0.1` to be reachable either way. In a cluster, boxes resolve each other by fully-qualified name `<box-name>.fc.local`; a bare short name does not resolve.

**Storage, images, snapshots**
| Command | What it does |
|---|---|
| `/createos-sandbox:disk create \| attach \| detach \| ls \| show \| rm` | Mount your own S3 bucket into the box |
| `/createos-sandbox:template submit \| ls \| show \| logs \| rm` | Build a custom image from a Dockerfile |
| `/createos-sandbox:fork` | Snapshot the box into an independent clone |
| `/createos-sandbox:pause` · `/createos-sandbox:resume` | Park a warm box at zero vCPU cost, then restore it |

- `pause` tears down sync and tunnels first. A fork is independent: own ID and address, survives `down`, counts against your running-box limit; mounted disks do not carry over to a fork.

**Defaults**
| Setting | Default |
|---|---|
| Shape (`offload`, `fanout`, `shell`) | `s-1vcpu-1gb` |
| Shape (`up`) | `s-2vcpu-2gb` |
| Root filesystem | `devbox:1` |
| Egress | Unrestricted |
| Idle auto-pause | 30 minutes |

- If you ask for a shape your account cannot use, the error lists the shapes you can.

**Egress presets** (`-p` selects a preset; `-e` adds hosts)
| Preset | Hosts |
|---|---|
| `python-uv` | `astral.sh`, `releases.astral.sh`, `pypi.org`, `files.pythonhosted.org` |
| `rust-cargo` | `crates.io`, `static.crates.io`, `index.crates.io`, `static.rust-lang.org`, `cdn.pyke.io` |
| `npm` | `registry.npmjs.org` |
| `github` | `github.com`, `objects.githubusercontent.com`, `raw.githubusercontent.com`, `codeload.github.com` |

- IP and CIDR rules take effect immediately; domain rules take about 30 seconds to propagate. Domain allowlist is strong for HTTPS, weak for cleartext HTTP. A blocked host still resolves in DNS; the connection fails at connect time.

**What the plugin adds**
- A skill `using-createos-sandbox` (when to offload; one-shot `offload` vs reusable `up`/`run`); loads egress/networking/image reference on demand.
- Two hooks: `SessionStart` resolves the driver's absolute path into context; `PreToolUse` watches Bash commands and suggests offload for heavy builds/tests (`npm ci`, `cargo build`, `pytest`, `make`, ...). The hint never blocks; `COS_NO_HINT=1` turns it off.
- State: `${XDG_CACHE_HOME:-$HOME/.cache}/createos-sandbox`, keyed by a hash of the repo root; `COS_STATE_DIR` moves it. Long commands run detached in the box with heartbeat and reattach on dropped connection.

**Limits**
- Bandwidth: 50 GiB outbound per box by default, extendable; exec, file transfer and tunnels keep working after it runs out.
- Clusters: up to 8 boxes.
- Env vars: declared at creation; 64 entries, 4 KiB per value, 64 KiB total.
- File transfer: API accepts uploads up to 10 GiB; CLI buffering, memory and timeouts can impose lower practical limits.
- Templates: one `FROM`, no `COPY` or `ADD`, 64 KiB of Dockerfile, 2 concurrent builds per account.
- Swap: `-w` is best-effort; default `devbox:1` cannot enable swap today; an out-of-memory build needs a larger shape.
- Concurrency: account cap on open boxes (paused count) and creations per day. Check limits against your own account.

## Codex
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Codex
- **Summary:** The CreateOS plugin for Codex (OpenAI) teaches the agent to drive the `createos` CLI via a skill; no custom tools.
- **Key points:**
  - Marketplace `createos`; auth `createos login` or `CREATEOS_API_KEY`; a skill plus the `cos` driver.
  - Prerequisites: same CLI install and auth as above (plugin installs CLI on first need).
  - Install:
```bash
codex plugin marketplace add NodeOps-app/createos-claude-plugins
codex plugin add createos-sandbox-codex@createos
```
- Skill `using-createos-sandbox` triggers on sandbox-shaped requests (offload heavy build, untrusted code, disposable Linux box, multi-node cluster). Session hook resolves the `cos` driver and puts its path into context; warns if missing. `cos` is the same engine as the Claude Code plugin.
```bash
cos offload . "npm ci && npm test"     # one-shot: stage, run, pull, destroy
cos up && cos run "cargo build"        # reusable box, state persists
cos pause                              # park it at zero vCPU cost
cos down                               # destroy it
```
- `cos offload` for work with a finish line; `cos up` / `cos run` for sessions spanning many commands (box persists until `cos down` or `cos pause`).
- Egress unrestricted by default; restrict with a preset and add hosts:
```bash
cos offload -p npm -e internal.example.com . "npm ci && npm test"
```
- Presets: `python-uv`, `rust-cargo`, `npm`, `github`. IP/CIDR rules apply immediately; domain rules about 30 seconds.
- Limits: bandwidth 50 GiB outbound per box (extendable); clusters up to 8 boxes; env vars 64 entries / 4 KiB per value / 64 KiB total; uploads up to 10 GiB via API; templates single-stage, no `COPY` or `ADD`, 64 KiB source, 2 concurrent builds per account; account caps on open boxes (paused count) and creations per day.

## OpenCode
- **URL:** https://createos.sh/docs/Sandbox/Integrations/OpenCode
- **Summary:** The CreateOS plugin for OpenCode adds 33 `sandbox_*` tools. OpenCode keeps running locally; the tools give it a remote Linux box.
- **Key points:**
  - Package `@createos/opencode`; 33 tools all prefixed `sandbox_`; auth `createos login`; sandbox created on first tool call, destroyed when the session is deleted.
  - Prerequisites: CLI install and auth as above; the plugin holds no credentials and shells out to the CLI.
  - Install:
```bash
opencode plugin @createos/opencode --global
```
- Does not replace OpenCode's built-in `bash`, `read`, `write`; adds parallel `sandbox_*` tools. Tell the agent where to run ("Run the test suite in the sandbox").
- Lazy creation defaults: shape `s-2vcpu-2gb` (or `CREATEOS_SHAPE`); root filesystem `CREATEOS_ROOTFS` otherwise the CLI default; networks `CREATEOS_NETWORKS` (comma-separated); working directory `/root/workspace`; public HTTPS URL enabled.

| Group | Tools |
|---|---|
| **Lifecycle** (8) | `sandbox_create`, `sandbox_exec`, `sandbox_info`, `sandbox_list`, `sandbox_pause`, `sandbox_resume`, `sandbox_fork`, `sandbox_destroy` |
| **Configuration** (5) | `sandbox_ingress`, `sandbox_firewall`, `sandbox_bandwidth`, `sandbox_shapes`, `sandbox_images` |
| **Ports and sync** (3) | `sandbox_preview_url`, `sandbox_tunnel`, `sandbox_sync` |
| **Networks** (6) | `sandbox_network_create`, `sandbox_network_list`, `sandbox_network_show`, `sandbox_network_attach`, `sandbox_network_detach`, `sandbox_network_delete` |
| **Disks** (6) | `sandbox_disk_create`, `sandbox_disk_list`, `sandbox_disk_show`, `sandbox_disk_delete`, `sandbox_disk_attach`, `sandbox_disk_detach` |
| **Device VPN** (5) | `sandbox_device_register`, `sandbox_device_status`, `sandbox_vpn_up`, `sandbox_device_attach`, `sandbox_device_detach` |

- `sandbox_exec` requires a sandbox ID (call `sandbox_info` or `sandbox_list` first). `sandbox_vpn_up` is advisory (returns the command; WireGuard needs `sudo`). Move files via `sandbox_exec` or `sandbox_sync`.
- Config variables: `CREATEOS_ENABLED` (plugin on/off), `CREATEOS_SHAPE`, `CREATEOS_ROOTFS`, `CREATEOS_NETWORKS`.
- `sandbox_sync` mirrors a local directory into the box for the session; takes local and remote directory, optional mode (two-way, one-way, mirror) and exclude globs. No exclusions of its own: pass excludes for large or sensitive files (`node_modules`, build output, `.env`).

## Pi
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Pi
- **Summary:** The CreateOS extension for the Pi coding agent adds sandbox tools to any Pi session and, on request, redirects Pi's built-in tools so reading, writing and running commands happen inside a remote sandbox.
- **Key points:**
  - Package `@createos/pi`; activation flag `--inside-createos-sandbox`; 41 tools (7 built-in replacements plus 34 sandbox tools); commands `/sandbox`, `/network`, `/device`; auth `createos login`.
  - Prerequisites: CLI install and auth as above.
  - Install (from the repository root; the root manifest exposes the extension):
```bash
pi install git:github.com/NodeOps-app/createos-claude-plugins
```
- Tools only: start Pi normally; 34 `sandbox_*` tools are available, Pi's own `bash`, `read`, `write` still act on your machine. Everything remote:
```bash
pi --inside-createos-sandbox
```
- A sandbox is created at session start; built-in `bash`, `read`, `write`, `edit`, `ls`, `find`, `grep` operate inside it. Working directory `/root/workspace`.

| Flag | Purpose |
|---|---|
| `--inside-createos-sandbox` | Run Pi's built-in tools inside a sandbox |
| `--createos-shape <shape>` | Machine size (default `s-2vcpu-2gb`) |
| `--createos-rootfs <name>` | Base image or template |
| `--createos-network <names>` | Private networks to join, comma-separated |
| `--createos-sync-once` | Copy the project to `/root/workspace` before Pi starts |
| `--createos-watch` | Keep the project and `/root/workspace` in sync all session |
| `--createos-avoid-git-ignore` | Include gitignored files in `--createos-sync-once` |

- The `--createos-*` flags only take effect alongside `--inside-createos-sandbox`. `--createos-sync-once` and `--createos-watch` cannot be combined.
- `--createos-sync-once`: archives and unpacks at `/root/workspace` once before the agent starts; VCS dirs always skipped; gitignored files skipped unless `--createos-avoid-git-ignore`; only adds, sandbox-only files survive. `--createos-watch`: continuous two-way sync, no default exclusions. Neither syncs your home directory, filesystem root, or sensitive dirs (`.ssh`, `.aws`, `.gnupg`, `.kube`, `.docker`).
- Seven built-in replacements keep original names (`bash`, `read`, `write`, `edit`, `ls`, `find`, `grep`) and route to the sandbox when active.

| Group | Tools |
|---|---|
| **Lifecycle** (8) | `sandbox_create`, `sandbox_exec`, `sandbox_info`, `sandbox_list`, `sandbox_pause`, `sandbox_resume`, `sandbox_fork`, `sandbox_destroy` |
| **Configuration** (5) | `sandbox_ingress`, `sandbox_firewall`, `sandbox_bandwidth`, `sandbox_shapes`, `sandbox_images` |
| **Ports and sync** (3) | `sandbox_preview_url`, `sandbox_tunnel`, `sandbox_sync` |
| **Networks** (6) | `sandbox_network_create`, `sandbox_network_list`, `sandbox_network_show`, `sandbox_network_attach`, `sandbox_network_detach`, `sandbox_network_delete` |
| **Disks** (6) | `sandbox_disk_create`, `sandbox_disk_list`, `sandbox_disk_show`, `sandbox_disk_delete`, `sandbox_disk_attach`, `sandbox_disk_detach` |
| **Device VPN** (5) | `sandbox_device_register`, `sandbox_device_status`, `sandbox_vpn_up`, `sandbox_device_attach`, `sandbox_device_detach` |
| **Fan-out** (1) | `sandbox_fanout` |

- Most tools take an optional sandbox ID and fall back to the active sandbox; `sandbox_resume` and `sandbox_destroy` require an explicit ID. `sandbox_vpn_up` is advisory (needs `sudo`).
- `sandbox_fanout`: several scenarios at once, each in its own sandbox, up to three in parallel; each gets a copy of the project and runs its command in `/root/workspace`. A scenario naming a port is a service: starts under `tmux`, gets a public HTTPS URL, health-checked up to 15 attempts one second apart (optionally requiring a string in the body). Sandbox destroyed when the scenario ends, including on failure.

| Command | What it does |
|---|---|
| `/sandbox` | Show the active sandbox — ID, status, working directory, public URL |
| `/network create \| ls \| show \| rm \| attach \| detach` | Manage private networks |
| `/device status \| attach \| detach` | Manage device VPN access |

- `/network` also accepts `list` and `delete` aliases; `/device` defaults to `status`.
- Session lifecycle: sandbox created at session start with `/root/workspace`. A persisted session leaves the sandbox running and prints its ID (resuming the session reattaches, and resumes a paused box). An ephemeral session destroys the sandbox on exit. A persisted session's box keeps billing until paused or destroyed; the exit message includes the `createos sandbox rm` command. New/resumed/forked sessions leave existing sandboxes untouched.

## Herdr
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Herdr
- **Summary:** Herdr is a terminal workspace manager. The plugin runs the agent itself inside a sandbox and attaches its terminal to a Herdr pane (one pane = one sandbox).
- **Key points:**
  - Plugin `createos.sandbox`; agents: Claude Code, Codex, OpenCode, Pi, Cursor; requires Herdr 0.7.5 or newer, Bun, a git worktree; auth `createos login`, and the agent signs in inside its own sandbox.
  - Prerequisites: CLI install and auth as above, plus Herdr 0.7.5+, Bun, a git worktree.
  - Two credential sets: CreateOS credentials on your machine; the agent's provider credentials inside the sandbox (sign in within the pane on first start; do not put them in the plugin `config.json` or export them expecting them to reach the box).
  - Install (if `createos sandbox --help` lists `setup`):
```bash
createos sandbox setup herdr
```
- `--doctor` checks without changing anything. Manual install:
```bash
herdr plugin install NodeOps-app/createos-claude-plugins/packages/herdr-plugin
```
- Local development (link, then build; linking alone does not run the build):
```bash
herdr plugin link /path/to/packages/herdr-plugin
sh /path/to/packages/herdr-plugin/build.sh
```
- Pane to sandbox: opens a new pane, creates a sandbox, uploads the worktree, makes a baseline git commit in the box, installs the agent, starts it under a PTY attached to the pane. If anything fails after creation, the sandbox is deleted (on cleanup failure you get the `createos sandbox rm` command). Provisioning takes around twenty seconds; a second key press is ignored. Herdr restores panes on restart but not processes; use the attach action to reconnect (resumes a paused box, restarts a dead agent). Pane-to-sandbox mapping is keyed by pane ID.
- Config in `config.json` (print dir with `herdr plugin config-dir createos.sandbox`); unrecognised key is an error:

| Key | Default | Purpose |
|---|---|---|
| `agent` | `claude-code` | Which agent to run in the box |
| `shape` | `s-2vcpu-4gb` | Machine size |
| `rootfs` | — | Base image or template |
| `autoPause` | `30m` | Idle timeout before the box pauses itself |
| `remoteRoot` | `/workspace` | Where the worktree lands inside the box |
| `egress` | — | Allowed hosts; empty means unrestricted |
| `excludes` | — | Paths to leave out of the upload |
| `syncExcludes` | — | Paths to leave out of file sync |

- Upload: files git knows about, then filtered (submodules, your excludes, a built-in deny-list, anything git ignores). Deny-list: `.env` files (templates like `.env.example` allowed), SSH and GPG directories, cloud credentials for AWS, GCP, Azure, Kubernetes and Docker, `.netrc`, `.npmrc`, `.pypirc`, `.git-credentials`, private keys and certificate bundles, Terraform state. Matches names, not contents.
- Sync action needs an SSH key in the sandbox and downloads Mutagen on first run; the start action needs neither.
- Known issues: on `createos` CLI v0.0.24 and earlier, `pause` and `resume` fail with `Content-Length is required` (rely on `autoPause` or upgrade). The CLI resolves a sandbox by scanning only the first 200 rows of your sandbox list; a box outside that window reports as missing even with its full ID.

## DeepSeek Harness
- **URL:** https://createos.sh/docs/Sandbox/Integrations/DeepSeek-Harness
- **Summary:** Moves the DeepSeek Harness execution layer into a CreateOS sandbox by replacing the harness's filesystem and subprocess providers together; both are backed by the same sandbox.
- **Key points:**
  - Package `@nodeops-createos/dsh-createos`; Node `^22.19` or `>=24`; auth `CREATEOS_SANDBOX_API_KEY`; sandbox lifetime 5 minutes by default.
  - Requirements: Node.js `^22.19` or `>=24`; a CreateOS API key and a compute shape; an image providing GNU `base64`, `find`, `realpath`, `stat`, plus `/bin/sh`.
  - Configuration:
```bash
export CREATEOS_SANDBOX_API_KEY='...'
export CREATEOS_SANDBOX_SHAPE='...'
export CREATEOS_SANDBOX_BASE_URL='https://your-createos-control-plane'
export CREATEOS_SANDBOX_ROOTFS='...'
```

| Variable | Required | Purpose |
|---|---|---|
| `CREATEOS_SANDBOX_API_KEY` | Yes | Authentication |
| `CREATEOS_SANDBOX_SHAPE` | Yes | Compute shape |
| `CREATEOS_SANDBOX_BASE_URL` | No | Control plane URL |
| `CREATEOS_SANDBOX_ROOTFS` | No | Base image or template |

- Does not use the `createos` CLI; talks to the control plane through the sandbox SDK, so `createos login` has no effect. `CREATEOS_SANDBOX_BASE_URL` can point at a self-hosted control plane.
- Install from a checkout of the repository:
```bash
dsh plugin --profile web add /path/to/createos-claude-plugins/packages/dsh-createos
```
- `--profile headless` for headless runs; once published, by name:
```bash
dsh plugin --profile headless add @nodeops-createos/dsh-createos
```
- Run the web profile, then open `http://127.0.0.1:3080`; ask for `hostname` or `uname -a` to confirm the sandbox's Linux hostname. `Ctrl+C` stops the web server and destroys the sandbox.
```bash
cd /path/to/workspace
dsh web
```
- Workspace is not copied into the sandbox; a different absolute workspace path must exist inside the sandbox or subprocess creation fails.
- Sandbox lasts five minutes by default (timer destroys it; also destroyed on plugin unload). Raise `lifetimeMs` in the plugin configuration. One mounted runtime = one sandbox shared by every session in that web process.
- Installing disables the harness's local filesystem and subprocess providers and its host-kernel sandbox and permission presets. Persistent processes and terminals use the managed-process API; one-shot commands and file transfers use the sandbox SDK.
- Limits: bounded output journal for managed processes (aged-out output is gone); atomic writes need GNU userland and destination plus temp sibling on one filesystem; S3 disk mounts get no separate filesystem namespace; ambiguous operations (allocation, input, resize, signal, stdin close) are never retried.

## Orca
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Orca
- **Summary:** A recipe that runs a whole Orca workspace on a disposable microVM instead of your laptop; can optionally install Claude Code, Codex, Cursor, OpenCode or Pi into that workspace.
- **Key points:**
  - Own repository: https://github.com/NodeOps-app/createos-orca-plugin
  - Prerequisites:
```bash
curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
createos login
```
- Use `export CREATEOS_API_KEY=<key>` instead of signing in for CI or headless. Two credential sets as with Herdr (yours on your machine; the agent's provider credentials inside the workspace).
- Install (if `createos sandbox --help` lists `setup`):
```bash
createos sandbox setup orca
```
- Manual: Orca **Settings → Plugins → Install from git URL** with:
```
https://github.com/NodeOps-app/createos-orca-plugin.git#v0.1.0
```
- Separate repository because Orca installs a plugin by cloning an entire repository and reading its manifest from the root, and refuses symlinks anywhere in plugin content.

## n8n
- **URL:** https://createos.sh/docs/Sandbox/Integrations/n8n
- **Summary:** The CreateOS community node for n8n puts a sandbox inside a workflow: a step runs a shell command on a disposable Linux microVM and returns stdout, stderr and exit code as n8n data.
- **Key points:**
  - Package `@nodeops-createos/n8n-nodes-sandbox`; resources Code, Sandbox, File, Template, Network, Disk, System; auth a CreateOS API credential sent as `X-Api-Key`; sandbox created for the run and destroyed afterwards by default; usable as an AI agent tool.
  - Requires a **self-hosted n8n** (community nodes do not apply to n8n Cloud's managed node set) and a CreateOS API key (https://createos.sh/app/profile). Does not use the `createos` CLI.
  - Install: n8n **Settings → Community nodes → Install**, enter:
```text
@nodeops-createos/n8n-nodes-sandbox
```
- Add a **CreateOS API** credential: API Token = your key; API Base URL = `https://api.sb.createos.sh`. Saving tests it against `GET /v1/whoami`.
- Prompt for the n8n AI workflow builder (verbatim):
```text
Build a workflow that runs a shell command in a CreateOS sandbox.
Trigger it with an n8n Form that has one field named "command".
Then add the CreateOS node, resource Code, operation Run Command.
Set Sandbox to Create On Demand and leave Destroy Sandbox After Run on.
Map the node's Command field to the form's "command" value.
End with a node that returns stdout, stderr and exitCode.
```
- **Code → Run Command**: Sandbox field is **Create On Demand** (default; fresh microVM per run) or **Use Existing** (by ID). Create Sandbox Options defaults:

| Option | Default |
|---|---|
| Shape | `s-1vcpu-256mb` |
| Rootfs | `devbox:1` |
| Disk Size MiB | 10 GB |
| Ingress Enabled | Off |
| Auto Pause After Seconds | 0, meaning no auto-pause |
| Egress, Networks, Disks | Empty |

- **Destroy Sandbox After Run** on by default; applies only to boxes the node created; runs on success or failure; a sandbox passed by ID is never destroyed. Command runs through `/bin/sh -lc`; **Environment Variables** takes a JSON object; **Stdin** is fed to the process; **Timeout** caps the request at 30 seconds by default (covers the whole API call, including provisioning).
- Output fields (one item per input item): `success` (true when `exitCode` is 0), `exitCode`, `stdout`, `stderr`, `sandboxId`, `createdSandbox`, `destroyedAfterRun`, `destroyError` (only on cleanup failure), `execMs`, `executionTimeMs` (total including provisioning). Branch on `success`, not `stderr`. A fan-out over a list gets one sandbox per item by default.
- **File → Upload** / **File → Download** move binary data (sandbox ID, remote path, binary field name, default `data`); download attaches the file as binary with `sizeBytes` on the JSON; pair with **Use Existing**.
- Other resources:

| Resource | Operations |
|---|---|
| **Sandbox** | Create, Get, Get By IP, Get Many, Destroy, Pause, Resume, Fork, Patch, Metrics, Bandwidth, Recharge Bandwidth, Resize |
| **Template** | Create, Get, Get Many, Delete, Get Logs |
| **Network** | Create, Get, Get Many, Delete, Attach, Detach |
| **Disk** | Create, Get, Get Many, Delete, List Attachments, Attach, Detach |
| **System** | Whoami, List Shapes, List Rootfs |

- **Pause does not finish immediately** (returns while `pausing`); a Resume right after fails with `sandbox is pausing, expected paused or error`. Add a Wait node or poll **Sandbox → Get** until `paused`. Destroy returns `destroying`.
- Use **Sandbox → Create** when a box must outlive a single step.
- Node sets `usableAsTool`, so it attaches to an n8n AI Agent node. Egress default is unrestricted; the **Egress** field takes the platform's rules; prefer IP and CIDR rules when preventing exfiltration.

## Langflow
- **URL:** https://createos.sh/docs/Sandbox/Integrations/Langflow
- **Summary:** The CreateOS plugin for Langflow moves Langflow's Python nodes, a canvas node, or a whole flow onto disposable CreateOS microVMs. One `pip install` ships three separate surfaces.
- **Key points:**
  - Package `langflow-sandbox-createos` (PyPI), Python 3.10 or newer; auth a CreateOS API key sent as `X-Api-Key`; hardware-virtualized isolation, one throwaway VM per execution; no local hypervisor needed (works on managed platforms, containers with no `/dev/kvm`, Apple Silicon CI).

| Surface | What moves into a microVM | How you turn it on |
|---|---|---|
| **Sandbox backend** | The **Python Interpreter** node's code | Two environment variables |
| **CreateOS Sandbox component** | Whatever you put in the node | Drag it onto the canvas |
| **Whole-flow executor** | An entire flow graph | One environment variable |

- Setup in six lines:
```bash
pip install langflow-sandbox-createos
export LANGFLOW_SANDBOX_BACKEND_PLUGINS=createos
export LANGFLOW_SANDBOX_BACKEND=createos
export CREATEOS_SANDBOX_API_KEY='your-key-here'
langflow run
# then drop a Python Interpreter node on the canvas and press play
```
- Install into the same environment Langflow runs in. API key from https://createos.sh/app/profile; if `CREATEOS_SANDBOX_API_KEY` is unset the plugin falls back to `CREATEOS_API_KEY`.

| | `none` (default) | `exec-sandbox` (built in) | `createos` |
|---|---|---|---|
| Where code runs | The Langflow process | A microVM on the Langflow host | A microVM on CreateOS |
| Needs a local hypervisor | No | Yes | **No** |
| Isolation | None | Hardware-virtualized | Hardware-virtualized |
| Cold start | Not applicable | Seconds, longer on first run | About 200 ms to first command |

- `exec-sandbox` filters DNS inside the guest and can enforce a domain allowlist; CreateOS cannot (see Network rules).

**Sandbox backend** (two variables: the first is Langflow's trust gate, the second selects it):
```bash
export LANGFLOW_SANDBOX_BACKEND_PLUGINS=createos
export LANGFLOW_SANDBOX_BACKEND=createos
```
- A backend that cannot do its job refuses to run; it never falls back to running code in the Langflow process.

| Setting | Default | What it does here |
|---|---|---|
| `LANGFLOW_SANDBOX_TIMEOUT_SECONDS` | `30` | Wall clock for the guest program, enforced inside the VM |
| `LANGFLOW_SANDBOX_MEMORY_MB` | `192` | A **floor**, not the VM size |
| `LANGFLOW_SANDBOX_ALLOW_NETWORK` | `false` | `false` blocks egress; `true` is completely unrestricted |
| `LANGFLOW_SANDBOX_ALLOWED_DOMAINS` | empty | **Refused.** Setting it makes every run fail |

| Variable | Default | What it does |
|---|---|---|
| `CREATEOS_SANDBOX_API_KEY` | none | **Required.** Falls back to `CREATEOS_API_KEY` |
| `CREATEOS_SANDBOX_BASE_URL` | `https://api.sb.createos.sh` | Control-plane endpoint |
| `CREATEOS_SANDBOX_ROOTFS` | `devbox:1` | Guest image |
| `CREATEOS_SANDBOX_SHAPE` | auto | Pin an exact shape instead of letting it choose |
| `LANGFLOW_SANDBOX_CREATEOS_ACCEPT_EGRESS_EXCEPTIONS` | `false` | Needed to run with egress off |

- Shapes/memory: plugin picks the smallest shape in the catalog with at least `max(LANGFLOW_SANDBOX_MEMORY_MB, 4096)` MiB; never rounds down; a pinned `CREATEOS_SANDBOX_SHAPE` smaller than the floor is refused.
- Backend protocol carries only "run this code, give me stdout, stderr and an exit code": no guest reuse and no returned files (those are in the component).

**CreateOS Sandbox component** (search the component list for **CreateOS Sandbox**):

| Input | Default | What it does |
|---|---|---|
| **Python Code** | `print('hello from a microVM')` | Python to run. Ignored when Command is set |
| **Command** | empty | A shell command to run instead of the Python |
| **Guest Reuse** | `off` | `flow` keeps one guest across runs of this component |
| **Return Files** | off | Read `/workspace/artifacts` back after the run |
| **Allow Network** | off | Off blocks egress. On is completely unrestricted |
| **Timeout (seconds)** | `60` | Wall clock, enforced inside the VM |
| **Shape** | `s-2vcpu-4gb` | VM size. Falls back to `CREATEOS_SANDBOX_SHAPE` |

- Outputs: **Results** (`result` = stdout trimmed; `stderr`, `exit_code`; `sandbox_id`; `reused_guest`; `artifact_count`) and **Files** (anything written to `/workspace/artifacts`, a table with path, size, and `text` or `base64`). At most 5 MiB and 256 files come back, limit applied during transfer.
- Guest Reuse: guest outlives the flow run (reap leftover `lf-c-*` sandboxes); an idled-out guest is resumed first; two workers running the same flow share one guest and filesystem; changing Allow Network gets a different guest.

**Whole-flow executor**: serializes the graph, rebuilds it inside a guest, runs it, sends per-vertex events back.
```bash
export LANGFLOW_EXECUTOR_KIND=createos
```
- Does not cover the canvas: covers `/api/v1/run`, the `lfx` command line, and Loop subgraphs; Langflow's UI build endpoint never enters this path, so the playground still runs in the server process.

| Variable | Default | What it does |
|---|---|---|
| `CREATEOS_EXECUTOR_ROOTFS` | image default | **The supported path.** A template with Langflow and your components already installed |
| `CREATEOS_EXECUTOR_SHAPE` | `s-4vcpu-8gb` | Guest size |
| `CREATEOS_EXECUTOR_TIMEOUT_SECONDS` | `600` | Wall clock, enforced inside the VM |
| `CREATEOS_EXECUTOR_EGRESS` | `*` | Comma-separated address rules. Open by default, because flows call model providers |
| `CREATEOS_EXECUTOR_INSTALL_LFX` | `false` | Install dependencies per run instead. For a first experiment, not for production |
| `CREATEOS_EXECUTOR_PIP` | empty | Extra packages for that fallback |

- The guest needs every dependency your components use (build a template image). Results are not live (events arrive when the guest command finishes). A failed run in the guest makes the stream raise instead of ending normally.

**Network rules**
  - Domain allowlists are refused, not honoured: CreateOS does not enforce hostname rules (its API accepts and echoes them), so the plugin refuses any run that asks for one. Only address and CIDR rules reach the real policy. Resolving domains to addresses yourself is not a fix (rotating DNS, shared CDN addresses).
  - Turning the network on means completely on (no package-registry-only default).
  - Turning it off still leaves `169.254.0.0/16` (link-local, VM metadata service) reachable (accepted before the deny-all rule); the backend refuses to run with egress off until you acknowledge:
```bash
export LANGFLOW_SANDBOX_CREATEOS_ACCEPT_EGRESS_EXCEPTIONS=true
```
- For a real domain allowlist today use `exec-sandbox`. The executor defaults the opposite way: open, with no refusal and no warning.

**How one execution works**
```
POST   /v1/sandboxes                       shape, image, environment, egress, auto-pause
PUT    /v1/sandboxes/{id}/files?path=...   the program
POST   /v1/sandboxes/{id}/exec             run it under a timeout
DELETE /v1/sandboxes/{id}                  always, even when the run failed
```
- The guest's own timeout is the authoritative clock; a timed-out run still returns produced output. Deleting the VM stops runaway code; an undeleted VM is bounded by auto-pause (always longer than one execution). No retries anywhere: rate-limit or server errors surface as a failed run.

## AgentBox
- **URL:** https://createos.sh/docs/Sandbox/Integrations/AgentBox
- **Summary:** AgentBox runs coding agents in disposable boxes (workspace, file sync, services). The CreateOS plugin adds a provider so those boxes become Firecracker microVMs instead of the built-in cloud options.
- **Key points:**
  - Package `@nodeops-createos/agentbox`; requires AgentBox with provider plugin support and Node 20.10 or newer; auth a CreateOS API key, prompted on first use; default box 2 vCPU, 2 GB memory, 20 GB disk; pause and resume native with an inactivity timeout.
  - Setup in four lines (the first is AgentBox itself; the plugin does not bring it):
```bash
npm install -g @madarco/agentbox
npm install -g @nodeops-createos/agentbox
agentbox plugin add @nodeops-createos/agentbox
agentbox create --provider createos
```
- `plugin add` asks you to confirm, then reports the provider as `createos`. The first box prompts for your API key (https://createos.sh/app/profile).
- On a machine that has never run AgentBox, the first command opens AgentBox's own setup, listing only built-in providers; escape cancels the command. Either finish it once with an existing provider, or skip the terminal prompt:
```bash
agentbox plugin add @nodeops-createos/agentbox < /dev/null
agentbox create --provider createos < /dev/null
```
- The first `create` in a new folder asks whether to run its in-box setup (writes `agentbox.yaml`, installs dependencies); answer **No** for just a box.
- `agentbox plugin list` should show the plugin once added. Does not use the `createos` CLI; calls the control-plane API directly and attaches over an authenticated websocket shell (no SSH key).

| Where | When to use it |
|---|---|
| The prompt on first `create` | Normal interactive use |
| `CREATEOS_API_KEY` in the environment | CI and scripts |
| `~/.agentbox/secrets.env` | Keeping it out of your shell history |

- `CREATEOS_SANDBOX_URL` points the plugin at a different control plane. Also accepted but unadvertised: `AGENTBOX_CREATEOS_API_KEY` and `AGENTBOX_CREATEOS_API_URL`.
- Use per command:
```bash
agentbox create --provider createos
agentbox codex --provider createos
```
- Optional credential/asset check:
```bash
agentbox prepare --provider createos
```
- Gets: public preview URLs, a remote desktop over VNC, Docker inside the box, workspace resync and a direct git mode, orphan pruning.
- Pause/resume: `agentbox pause <box>`; an inactivity timeout pauses idle boxes; paused box charged for memory and storage, not vCPU. No `resume` command (a paused box comes back on next use). Pausing takes around two minutes (box archived); waking about fifteen seconds.
- No checkpoints: CreateOS has no matching snapshot feature yet; the plugin reports checkpoints as unsupported.
- No prepare step: CreateOS cannot currently build the AgentBox runtime image from a local runtime, so each box installs the runtime while provisioning; the first command in a fresh box waits for that install.

## Related
- Up: [[Docs - Sandbox]]
- [[Repo - createos-claude-plugins]]: source repository for the Claude Code, Codex, OpenCode, Pi, Herdr and DeepSeek plugins
- [[Repo - createos-cli]]: CLI these plugins drive
- [[Docs - Sandbox CLI]]: commands the integrations call underneath
- [[Docs - Sandbox Claude Managed Agents]]: Anthropic-orchestrated agents on your own sandboxes
- [[Docs - Sandbox Limits]]: shapes, images, plan caps, egress defaults
- [[Docs - Sandbox Overview and Concepts]]: sandboxes, networks, ingress, snapshots
- [[Docs - Sandbox Quickstart]]: a sandbox from scratch, no agent involved
- [[Hackathon Resources and Tools]]: hackathon tools list
- [[Hackathon Ideas]]: hackathon project ideas
