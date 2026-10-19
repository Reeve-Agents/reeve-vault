---
aliases:
  - createos-claude-plugins
  - createos-plugins
  - CreateOS Integrations
tags:
  - hackathon
  - type/page
source: https://github.com/NodeOps-app/createos-claude-plugins
sources:
  - https://github.com/NodeOps-app/createos-claude-plugins
  - https://github.com/NodeOps-app/createos-plugins
  - https://raw.githubusercontent.com/NodeOps-app/createos-claude-plugins/main/README.md
  - https://raw.githubusercontent.com/NodeOps-app/createos-claude-plugins/main/.claude-plugin/marketplace.json
  - https://raw.githubusercontent.com/NodeOps-app/createos-claude-plugins/main/packages/claude-code-plugin/.claude-plugin/plugin.json
  - https://api.github.com/repos/NodeOps-app/createos-claude-plugins/git/trees/main?recursive=1
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Repo - createos-claude-plugins

> [!summary] Summary
> - `NodeOps-app/createos-claude-plugins` redirects to **`NodeOps-app/createos-plugins`**. README title: **CreateOS Integrations**. Language TypeScript; topics `createos`, `sandbox`.
> - Plugins for Claude Code, Codex, Pi, OpenCode and DeepSeek Harness that run code off your machine in disposable CreateOS Sandboxes (~200 ms from create to first command).
> - Marketplace `createos` ships 2 plugins: `createos-sandbox` (Claude Code, v0.8.0) and `createos-sandbox-codex` (Codex, v0.2.0).
> - Claude Code plugin: 22 slash commands, 1 skill (`using-createos-sandbox`), 2 hooks (SessionStart, PreToolUse on Bash).
> - Hackathon install: `/plugin marketplace add NodeOps-app/createos-claude-plugins` then `/plugin install createos-sandbox@createos`.
> - Source: https://github.com/NodeOps-app/createos-claude-plugins

## Why (README)
- **Disposable:** one-shot offload stages a dir, runs, pulls artifacts, then auto-destroys. Box-side changes never touch local unless asked.
- **Fast:** ~200 ms from create to first command; parallel fanout across N boxes for matrix builds and split test suites.
- **Isolated:** untrusted code runs in a disposable Sandbox; egress can be locked to an exact allowlist.
- **Live loops:** reusable per-repo box with file sync, port tunnels, public HTTPS expose.
- **Cheap to keep:** `pause` snapshots a warm box at zero compute cost; `resume` restores it in a handful of seconds.

## Quick start per host

### Claude Code
```bash
/plugin marketplace add NodeOps-app/createos-plugin
/plugin install createos-sandbox@createos
/createos-sandbox:offload . "npm ci && npm test"
```
- Hackathon page variant: `/plugin marketplace add NodeOps-app/createos-claude-plugins` + `/plugin install createos-sandbox@createos`.
- Local checkout: `git clone https://github.com/NodeOps-app/createos-plugin` · `/plugin marketplace add /path/to/createos-plugin` · `/plugin install createos-sandbox@createos`
- Dev, no install: `claude --plugin-dir /path/to/createos-plugin/packages/claude-code-plugin`; `/reload-plugins` after edits.

### Claude Desktop (Code tab)
- Code tab, **Local** environment only (plugin runs `bash` + `createos` locally; not in Chat or remote/cloud sessions).
- Run the two `/plugin` commands above, or **+ → Plugins → Add marketplace** with `NodeOps-app/createos-plugin`, install **createos-sandbox**.
- New session: installs the `createos` CLI if missing, opens CreateOS sign-in if signed out. Desktop shares `~/.claude` with the CLI.

### Codex (CLI and Desktop)
```bash
codex plugin marketplace add NodeOps-app/createos-plugin
codex plugin add createos-sandbox-codex --marketplace createos
codex
```
- Codex Desktop shares `~/.codex` with the CLI; or **Plugins → Add marketplace** → `NodeOps-app/createos-plugin` → install **createos-sandbox-codex**. Use a **local** project (cloud tasks can't reach the `createos` login).

### Pi
```bash
pi install git:github.com/NodeOps-app/createos-plugin
pi
pi --inside-sandbox
pi --inside-sandbox --sandbox-sync-once
pi --inside-sandbox --sandbox-watch
```

### OpenCode V2
- `bun install --cwd packages/opencode-plugin`
- Add `"plugins": ["./packages/opencode-plugin"]` to `opencode.jsonc`. Remote routing: plugin options `mode: "remote"`, `sync: "once"`.

### DeepSeek Harness
```bash
dsh plugin --profile web add /path/to/createos-plugin/packages/dsh-createos
export CREATEOS_SANDBOX_API_KEY='...'
export CREATEOS_SANDBOX_SHAPE='s-2vcpu-2gb'
dsh web
```

### Shared behaviour
- Claude Code, Codex, Pi and OpenCode use the `createos` CLI; they install or upgrade it at session start.
- If signed out and `tmux` is available, `createos login` starts in a hidden tmux session and the browser opens sign-in.
- `CREATEOS_API_KEY=<key>` skips browser sign-in. `COS_NO_AUTOINSTALL=1` skips the install.
- DeepSeek Harness uses `@nodeops-createos/sandbox` and `CREATEOS_SANDBOX_*` env vars.

## Marketplace and plugins

`.claude-plugin/marketplace.json`: name `createos`, owner NodeOps (https://createos.sh).

| Plugin | Source | Version | Description |
|---|---|---|---|
| `createos-sandbox` | `./packages/claude-code-plugin` | 0.8.0 | Run ad-hoc/heavy/untrusted code in disposable CreateOS Sandboxes: offload, fanout, scratch shell, reusable box with sync, tunnel, expose, clusters, S3 disks, WireGuard VPN, fork, pause/resume, custom images; desktop with computer use and live noVNC link; run another coding agent inside a box. |
| `createos-sandbox-codex` | `./packages/codex-plugin` | 0.2.0 | Codex plugin: the `cos` driver, the `using-createos-sandbox` skill, session-start / offload-hint hooks. Same engine as the Claude Code plugin. |

`createos-sandbox` keywords: `sandbox`, `createos`, `firecracker`, `remote-exec`, `isolation`, `microvm`, `computer-use`, `vnc`, `desktop`, `coding-agent`, `openrouter`.

## Packages in the repo

| Package | What it does |
|---|---|
| `claude-code-plugin` | Hooks-based Claude Code plugin: offload, fanout, scratch shell, reusable box with sync, tunnel, public HTTPS expose, private-network clusters, BYO-S3 disks, WireGuard VPN, snapshot/fork; drives the `createos` CLI |
| `pi-extension` | Pi extension with all 33 `sandbox_*` tools; built-in tools route remotely only with `--inside-sandbox` |
| `createos-sandbox-codex` (`codex-plugin`) | Codex plugin; same engine as the Claude Code plugin |
| `@createos/opencode` (`opencode-plugin`) | Native OpenCode V2 plugin, 54 sandbox tools, opt-in remote shell/file routing, managed processes, public RPC contract |
| `@nodeops-createos/dsh-createos` | DeepSeek Harness bundle replacing `ctx.fs` and `ctx.subprocess` with one CreateOS sandbox |
| `createos.sandbox` (`herdr-plugin`) | Herdr plugin running Claude Code, Codex, OpenCode, Pi or Cursor inside a sandbox, PTY attached to a Herdr pane |
| `langflow-sandbox-createos` | Langflow integration (pip): sandbox backend, CreateOS Sandbox component, flow executor in a microVM |
| `createos-orca-plugin` | Separate repo (https://github.com/NodeOps-app/createos-orca-plugin): runs an Orca workspace on a disposable microVM |
| `@createos/n8n-nodes-createos` | Separate repo (https://github.com/NodeOps-app/n8n-nodes-createos): n8n community node using the REST API |

Other folders: `.opencode/plugins/createos.ts`, `packages/shared` (shared `sandbox-engine.ts`, `onboard.ts`), `packages/orca-plugin` (README only), `apps/` (future starter templates), `docs/`.

Orca install: Settings > Plugins > Install from git URL `https://github.com/NodeOps-app/createos-orca-plugin.git#v0.1.0`; pick Per-Workspace Environment > CreateOS Sandbox; `CREATEOS_AGENTS=claude,codex`. Needs a git remote; suspend/resume not supported yet.

## Claude Code plugin contents

### Skill
- **`using-createos-sandbox`** (`skills/using-createos-sandbox/SKILL.md`): when to run code off the user's machine (untrusted code, ad-hoc scripts, heavy builds, test matrices, tunnels, preview URLs, clusters, VPN, S3 data, handing work to another coding agent, desktop/computer use). Also answers questions about CreateOS Sandbox (REST API, SDKs in TypeScript, Go, Python, Rust, C#, Java, CLI, limits, lifecycle, egress, networks, disks, templates, webhooks) by fetching live docs.
- Everything goes through the `cos` driver; the session-start hook prints its absolute path. Do not write `${CLAUDE_PLUGIN_ROOT}` into a Bash command (unset there; path collapses to `/scripts/cos`, exit 127).
- If `cos` is missing, stop; do not improvise with raw `createos sandbox create/push/exec` (drops egress restriction, keepalive, auto-destroy, auth preflight).
- `cos install` symlinks into `~/.local/bin`. Needs `jq`, `tar`, `perl`, `curl`.
- References: `coding-agents.md`, `docs.md`, `lifecycle-and-images.md`, `networking.md`, `offload-and-egress.md`.

### Hooks (`hooks/hooks.json`)
- `SessionStart`: `"${CLAUDE_PLUGIN_ROOT}/scripts/session-start.sh"`
- `PreToolUse` (matcher `Bash`): `"${CLAUDE_PLUGIN_ROOT}/scripts/offload-hint.sh"`
- Scripts: `scripts/cos` (CLI driver), `scripts/session-start.sh`, `scripts/offload-hint.sh`.

### Slash commands (22, prefix `/createos-sandbox:`)

| Command | Arguments | What it does |
|---|---|---|
| `agent` | `[-P provider] [-m model] [-k KEYVAR] [-o .] [-p preset] [-s shape] <claude\|codex\|opencode\|pi\|cursor> <dir> <prompt>` | Run another coding agent on your code in a throwaway box (OpenRouter or any OpenAI-/Anthropic-compatible provider) |
| `cluster` | `up <N> [-s shape] [-e dom\|-p preset\|-E] \| run [<name\|idx>\|-a] <cmd> \| ls \| down` | N boxes on one private network, name-addressable |
| `computer` | `screenshot \| screen \| click <x> <y> \| type <text> \| key <k>... \| open <url> \| windows` | Drive the desktop in the active box (computer use) |
| `desktop` | `[-s shape] [-S screen-N]` | Bring up a graphical box (`desktop:1`, XFCE + Chrome) and print a live noVNC URL |
| `disk` | `create <name> --bucket … \| ls \| show <name> \| attach <disk> <mount> \| detach <disk> <mount> \| rm <name>` | BYO S3 bucket mounts for the project box |
| `down` | — | Stop sync and destroy the project box |
| `exec` | `[-l lang] [-i stdin-file] [-t secs] [-N] [-p preset] [-e dom] <file> [args...]` | Run one untrusted/ad-hoc file (py, js, mjs, cjs, ts, go, sh, rb, c, cpp, rs) in a throwaway box; timeout, stdin, real exit code, auto-destroy |
| `expose` | `<port>` | Public HTTPS URL for one box port |
| `fanout` | `[-j N] [-e dom\|-p preset\|-E] [-s shape] [-x glob] <dir> <cmd1> [cmd2] ...` | Each command in its own throwaway box, in parallel |
| `fork` | — | Snapshot the project box and fork an independent clone |
| `offload` | `[-p preset] [-e dom] [-E] [-x glob] [-o out] [-w GB] [-K] [-s shape] <dir> <cmd>` | One-shot: stage dir, run (keepalive-protected), pull artifacts, auto-destroy |
| `pause` | — | Snapshot disk + memory; idle box costs nothing |
| `resume` | — | Restore a paused box (measured ~7 s); also after the 30 m idle auto-pause |
| `run` | `<cmd>` | Run a command in the persistent project box |
| `shell` | `[-s shape] [-r rootfs] [-e dom\|-p preset\|-E]` | Instant throwaway interactive Linux, destroyed on exit |
| `status` | — | Show active box and sync state |
| `sync` | `[-2\|-M] [-x glob] <local-dir> [remote-dir]` | Background file sync, default one-way laptop→box |
| `template` | `submit <name> [-f Dockerfile] \| ls \| show <name> \| logs [-f] <name> \| rm <name>` | Build a custom rootfs image from a Dockerfile |
| `tunnel` | `<remote-port> [local-port]` | Forward a box port to local `127.0.0.1` |
| `unexpose` | — | Revoke the public HTTPS URL (disable ingress) |
| `up` | `[-s shape] [-r rootfs] [-n name] [-P auto-pause] [-d disk-mib] [-e dom\|-p preset\|-E]` | Create or reuse the persistent project box (one per git root) |
| `vpn` | `[register <name> \| up]` | WireGuard L3 VPN from this machine into private networks; needs `wg-quick` + sudo |

## Pi commands and flags
- Commands: `/sandbox` · `/network create <name>` · `/network ls` · `/network show <name>` · `/network attach <name>` · `/network detach <name>` · `/network rm <name>` · `/device status` · `/device attach <network>` · `/device detach <network>`
- Flags: `--inside-sandbox` · `--sandbox-shape <shape>` (default `s-2vcpu-2gb`) · `--sandbox-rootfs <name>` · `--sandbox-network <name>` · `--sandbox-sync-once` (copy to `/root/workspace` once) · `--sandbox-avoid-git-ignore` · `--sandbox-watch` (two-way sync). Sync flags are mutually exclusive.

## OpenCode V2 tools (54)
| Category | Tools |
|---|---|
| Execute and Files | `sandbox_exec`, `sandbox_run_code`, `sandbox_offload`, `sandbox_fanout`, `sandbox_read/write/edit/patch/glob/grep`, `sandbox_pull`, `sandbox_push` |
| Lifecycle | `sandbox_create`, `sandbox_list`, `sandbox_info`, `sandbox_pause`, `sandbox_resume`, `sandbox_fork`, `sandbox_destroy` |
| Config | `sandbox_ingress`, `sandbox_firewall`, `sandbox_bandwidth`, `sandbox_shapes`, `sandbox_images` |
| Ports and Sync | `sandbox_preview_url`, `sandbox_tunnel`, `sandbox_sync`, `sandbox_transport_stop` |
| Networks | `sandbox_network_create/list/show/attach/detach/delete` |
| Disks | `sandbox_disk_create/list/show/delete/attach/detach` |
| Device VPN | `sandbox_device_register/status`, `sandbox_vpn_up` |
| Processes | `sandbox_process_start/list/get/output/stop/input/close_stdin` |
| Desktop | `sandbox_desktop`, `sandbox_computer`, `sandbox_screenshot` |
| Session | `sandbox_status`, `/sandbox`, `/sandbox-release` |

## DeepSeek Harness surfaces
- `ctx.fs`: read, write, edit, glob, search, atomic writes.
- `ctx.subprocess`: one-shot Bash commands and managed process waits.
- PTY terminals: persistent sessions via managed PTYs.

## Requirements
- CreateOS account; the `SessionStart` hook runs `cos setup` (installs or upgrades `createos`; opt out `COS_NO_AUTOINSTALL=1`).
- Sign-in: hidden tmux `createos login` if `tmux` exists, else run `createos login` yourself; `export CREATEOS_API_KEY=<key>` skips it; `cos auth` reports which is active.
- DeepSeek Harness env: `CREATEOS_SANDBOX_API_KEY`, `CREATEOS_SANDBOX_SHAPE`; optional `CREATEOS_SANDBOX_BASE_URL`, `CREATEOS_SANDBOX_ROOTFS`.
- Host tools: `jq`, `tar`, `bash`, `base64`; `perl`; `curl`; `tmux` optional.

## Safety
- One-way by default: uploads and sync go laptop → box; opt in to write-back with `-2`.
- Excludes `.git`, `node_modules`, `target`, `.venv` and other regenerable dirs from uploads.
- Scoped: `cos` only touches boxes it created (`cos-*`) or the project box in its statefile.
- Quota (observed, not published policy): external keys allow 2 boxes running at once, with a daily creation cap; excess `cluster`/`fanout` jobs queue.

## Related
- Up: [[Hackathon Overview]]
- [[Hackathon Setup Guide]]: plugin install commands for the hackathon
- [[Repo - createos-cli]]: the CLI these plugins drive
- [[Docs - Sandbox Integrations]]: integration docs
- [[Docs - Sandbox Claude Managed Agents]]: Claude-specific sandbox docs
- [[Docs - Sandbox Limits]]: plan limits
