---
aliases:
  - Sandbox CLI
  - createos sandbox
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/CLI/Commands
sources:
  - https://createos.sh/docs/Sandbox/CLI/
  - https://createos.sh/docs/Sandbox/CLI/Overview
  - https://createos.sh/docs/Sandbox/CLI/Commands
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox CLI

> [!summary] Summary
> - `createos sandbox <subcommand> [flags]` (alias `createos sb`) creates, execs into, syncs, tunnels to and destroys sandboxes; talks to `https://api.sb.createos.sh`.
> - Install: `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -` or `brew tap nodeops-app/tap && brew install createos`; sign in with `createos login` or `createos login --token <token>`.
> - Command groups: lifecycle (create, list, get, edit, pause, resume, fork, rm), run (exec, shell, process, editor), files (push, pull, sync), networking (tunnel, network, firewall), disk, template, catalog (shapes, rootfs), plus top-level `createos webhooks`.
> - CI: use `--output json`, pass `--force` (or `-y`) to `sandbox rm`.
> - Sources: https://createos.sh/docs/Sandbox/CLI/ , /CLI/Overview , /CLI/Commands

## CLI (section index page)
- **URL:** https://createos.sh/docs/Sandbox/CLI/
- **Summary:** The `createos sandbox` command group (alias `sb`) creates, execs into, syncs files with, tunnels to and tears down sandboxes from a terminal or CI job. Same control plane as the REST API and SDK.
- **Key points:**
  - Install and sign-in steps are in the Overview; every flag is in the Command Reference.

## CreateOS Sandbox CLI (Overview)
- **URL:** https://createos.sh/docs/Sandbox/CLI/Overview
- **Summary:** Install and sign in to the CreateOS CLI, then create, exec into, sync, tunnel to and destroy sandboxes from a terminal or CI job.
- **Key points:**
  - Binary `createos`; sandbox commands live under `sandbox`, aliased to `sb`:
    ```bash
    createos sandbox <subcommand> [flags]
    # or the shorter alias
    createos sb <subcommand> [flags]
    ```
  - At a glance: Binary `createos` (sandbox commands aliased to `sb`); Install `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -`; Auth `createos login` (browser) or `createos login --token <token>`; Sandbox API `https://api.sb.createos.sh`.

### Installation
- Command availability depends on your CLI version. Check `createos version` and `createos sandbox --help` before using newer groups such as `process`, `editor`, `setup`, or `devices`. If your installation lacks a command, update the CLI or use its documented REST/SDK equivalent.
- curl (Linux / macOS):
  ```bash
  curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
  ```
- Homebrew (macOS):
  ```bash
  brew tap nodeops-app/tap
  brew install createos
  ```
- Upgrade:
  ```bash
  createos upgrade
  ```

### Authentication
- Browser login (recommended); opens browser for OAuth sign-in; session saved to `~/.createos/`:
  ```bash
  createos login
  ```
- API token (get from https://createos.sh/app/profile):
  ```bash
  createos login --token <your-api-token>
  ```
- CI / non-interactive: pass `--token` directly (browser login is not available headless).
  ```bash
  # Set token as an environment variable and reference it
  createos login --token "$CREATEOS_TOKEN"
  ```
- Commands that normally prompt for confirmation (like `sandbox rm`) require `--force` in non-interactive mode.
- Verify login:
  ```bash
  createos whoami
  ```

### Quickstart
```bash
# 1. Sign in
createos login

# 2. List available sizes
createos sandbox shapes

# 3. Create a sandbox
createos sandbox create --shape s-1vcpu-1gb --name my-box

# 4. Run a command
createos sandbox exec my-box -- uname -a

# 5. Open a shell
createos sandbox shell my-box

# 6. Delete when done
createos sandbox rm my-box --force
```

### `exec`, `shell`, `process`, and `PTY`
| Need | Command |
|---|---|
| Quick non-interactive command | `createos sandbox exec <sb> -- <cmd>` |
| Immediate interactive shell, no reconnect needed | `createos sandbox shell <sb>` |
| Managed command with retained output and controls | `createos sandbox process run <sb> -- <cmd>` |
| Background command you will inspect later | `createos sandbox process start <sb> -- <cmd>` |
| Persistent shell you can detach from and reattach to | `createos sandbox process shell <sb>` |
| REPL, curses app, or terminal-aware command | `createos sandbox process run --pty <sb> -- <cmd>` |

- `sandbox exec`: one-shot automation; buffered output capped at 1 MiB; use `--stream` for larger output.
- `sandbox process`: commands that should have a process ID (attach, list, input, wait, signal, stop). Retained process output bounded to 1 MiB per process and 32 MiB per sandbox. Add `--pty` only when the command needs terminal behavior; default pipe process keeps stdout and stderr separate.

### Global flags (accepted by every `createos` command)
| Flag | Short | Description |
|---|---|---|
| `--output <fmt>` | `-o` | Output format: `json` or `table` (default). Auto-switches to JSON when stdout is not a terminal. |
| `--debug` | `-d` | Print HTTP request/response details (token is masked). |
| `--api-url <url>` | | Override the main API base URL. |
| `--sandbox-api-url <url>` | | Override the sandbox API base URL (default: `https://api.sb.createos.sh`). |
| `--sandbox-gateway <host:port>` | | SSH gateway address used by `sandbox shell --ssh` (default: `gateway.sb.createos.sh:2222`). |

### Non-interactive / CI usage
- Use `--output json` for machine-readable output.
- Pass `--force` (or `-y`) to commands that prompt for confirmation (e.g. `sandbox rm`).
- Set `CREATEOS_TOKEN` and authenticate with `createos login --token "$CREATEOS_TOKEN"` before other commands.
  ```bash
  # Example: list running sandboxes as JSON in CI
  createos sandbox list --output json

  # Delete all failed sandboxes non-interactively
  createos sandbox list --status failed --quiet | xargs createos sandbox rm --force
  ```

## Sandbox Command Reference
- **URL:** https://createos.sh/docs/Sandbox/CLI/Commands
- **Summary:** Every `createos sandbox` (alias `createos sb`) subcommand with flag tables and examples, plus the top-level `createos webhooks` group. Arguments in `[brackets]` are optional; those without brackets are required. Many commands prompt interactively when a required argument is omitted and stdin is a terminal.
- **Key points:** sections below, commands and flags verbatim.

### Lifecycle

#### `sandbox create`
Create a new sandbox VM. **Alias:** `createos sb c`
```bash
createos sandbox create --shape s-1vcpu-1gb --name my-box
```
| Flag | Description |
|---|---|
| `--shape <id>` | VM size (run `createos sandbox shapes` to list). Required unless using interactive mode. |
| `--name <name>` | Friendly name (auto-generated if omitted). |
| `--rootfs <image>` | Base OS image or template name (run `createos sandbox rootfs` to list built-ins). |
| `--disk-mib <n>` | Root disk size in MiB (defaults to the shape's standard size). |
| `--ssh-key <path>` | Path to an SSH public key file to authorize (repeatable). |
| `--env KEY=VALUE` | Environment variable available to every exec inside the sandbox (repeatable). |
| `--ingress` | Give the sandbox a public HTTPS URL for HTTP services. |
| `--network <name\|id>` | Join a private network at creation (repeatable). |
| `--disk <name\|id>:/mount/path` | Mount an S3 disk at creation (repeatable). |
| `--egress <host>` | Outbound allowlist entry (repeatable). Empty = allow all. |
| `--auto-pause <duration>` | Auto-pause after inactivity, e.g. `10m`, `1h`. Omit to disable. |

```bash
# Smallest sandbox
createos sandbox create --shape s-1vcpu-256mb

# With SSH key and public HTTPS URL
createos sandbox create --shape s-1vcpu-1gb \
  --name demo --ssh-key ~/.ssh/id_ed25519.pub --ingress

# Attach an S3 disk and join a private network
createos sandbox create --shape s-1vcpu-1gb \
  --disk my-bucket:/mnt/data --network my-net

# Auto-pause after 30 minutes of inactivity
createos sandbox create --shape s-1vcpu-1gb --auto-pause 30m
```

#### `sandbox list`
List sandboxes; shows running sandboxes by default. **Alias:** `createos sb list`
```bash
createos sandbox list
createos sandbox list --all
createos sandbox list --status paused
```
| Flag | Description |
|---|---|
| `--all` | Show every sandbox regardless of status. |
| `--status <state>` | Filter to a specific state: `running`, `creating`, `paused`, `failed`, `destroyed`. |
| `--limit <n>` | Maximum number of results (default: 50). |
| `--offset <n>` | Skip the first N results (for paging). |
| `--quiet` | Print IDs only (one per line). Useful for scripting with `xargs`. |

#### `sandbox get`
Show details for a single sandbox. Pass a sandbox name or ID; runs interactively (picker) when no argument is given on a terminal.
```bash
createos sandbox get my-box
createos sandbox get sb-01k...
```

#### `sandbox edit`
Change a running sandbox's settings.
```bash
createos sandbox edit my-box --ingress on
createos sandbox edit my-box --add-ssh-key ~/.ssh/id_ed25519.pub
createos sandbox edit my-box --auto-pause 30m
createos sandbox edit my-box --auto-pause off
```
| Flag | Description |
|---|---|
| `--ingress on\|off` | Enable or disable the public HTTPS URL. |
| `--add-ssh-key <path>` | Path to a public key file to add (repeatable). |
| `--auto-pause <duration\|off>` | Set or disable the auto-pause timeout (e.g. `10m`, `1h`, `off`). |

- Run with no flags on a terminal for an interactive settings menu.

#### `sandbox pause`
Snapshot and pause a running sandbox. Pass name or ID; prompts interactively with no argument on a terminal. The sandbox can be resumed or forked from its paused snapshot.
```bash
createos sandbox pause my-box
```

#### `sandbox resume`
Resume a paused sandbox.
```bash
createos sandbox resume my-box
```

#### `sandbox fork`
Clone a paused sandbox into a new sandbox.
```bash
createos sandbox fork my-box
createos sandbox fork my-box --paused
```
| Flag | Description |
|---|---|
| `--paused` | Leave the new sandbox paused instead of auto-resuming. |
| `--ssh-key <path>` | Override SSH public key file for the fork (repeatable). |
| `--egress <host>` | Override the egress allowlist for the fork (repeatable). |

- The source sandbox must be paused. Run with no argument on a terminal to pick from paused sandboxes.

#### `sandbox rm`
Delete one or more sandboxes. Irreversible.
```bash
createos sandbox rm my-box
createos sandbox rm sb-01k... sb-02k...
createos sandbox rm my-box --force
```
| Flag | Description |
|---|---|
| `--force`, `-y` | Skip the confirmation prompt. Required in non-interactive mode. |
```bash
# Delete all failed sandboxes non-interactively
createos sandbox list --status failed --quiet | xargs createos sandbox rm --force
```

### Run

#### `sandbox exec`
Run a one-shot command inside a sandbox.
```bash
createos sandbox exec <sandbox> -- <cmd> [args...]
```
- The literal `--` separator is required. The command's exit code is forwarded to the CLI process.
- For reconnectable output, background jobs, later input, signals, wait/stop controls, or PTY behavior use `sandbox process`.
- Buffered `exec` output is capped at 1 MiB. Use `--stream` for larger output.

| Flag | Description |
|---|---|
| `--stream`, `-s` | Stream stdout/stderr live as the command runs. Default is buffered (output arrives when the command finishes). |
| `--env KEY=VALUE` | Override an environment variable for this exec (repeatable). The key must have been declared at create time with `--env`. |

```bash
createos sandbox exec my-box -- uname -a
createos sandbox exec my-box --stream -- pip install requests
createos sandbox exec my-box -- python3 -c 'print("hello")'
```

#### `sandbox shell`
Open an interactive shell inside a sandbox. **Alias:** `createos sb sh`
```bash
createos sandbox shell [<sandbox>]
```
- By default opens a keyless PTY through the control plane; your API token is the only authentication needed.

| Flag | Description |
|---|---|
| `--ssh` | Use the SSH path instead of the keyless PTY (also implied by `-i`). Requires an SSH key in the sandbox. |
| `-i <path>` | Path to your SSH private key. Implies `--ssh`. |
| `--user <name>` | Username to log in as (default: `root`). |

```bash
createos sandbox shell my-box            # keyless PTY (default)
createos sandbox shell my-box --ssh      # SSH path, auto-detect ~/.ssh key
createos sandbox shell my-box -i ~/.ssh/id_ed25519
createos sandbox shell my-box --user app
```

#### `sandbox process`
Manage long-running and reconnectable sandbox processes. **Alias:** `createos sandbox proc`
- Use when a command should keep running independently of your CLI, or when you want to list it, reconnect to output, send input, wait for it, signal it, or stop it later.
- Use `--pty` (`--tty`, `-t`) when the managed command needs terminal behavior.
- Retained process output bounded to 1 MiB per managed process and 32 MiB total per sandbox; oldest output discarded first; attaching from an expired sequence reports that the output offset has expired.

| Need | Command |
|---|---|
| Run a managed command, stream output, and return its exit code | `createos sandbox process run <sandbox> -- <cmd> [args...]` |
| Start a managed command and print its process ID | `createos sandbox process start <sandbox> -- <cmd> [args...]` |
| Start a persistent shell session and attach to it | `createos sandbox process shell <sandbox>` |
| Reconnect to process output or a shell session | `createos sandbox process attach <sandbox> <process-id>` |
| Pick a running process or shell session interactively | `createos sandbox process attach <sandbox>` |
| List managed processes and shell sessions | `createos sandbox process list <sandbox>` |
| Show details for one managed process | `createos sandbox process get <sandbox> <process-id>` |
| Write input to a process or shell session | `createos sandbox process input <sandbox> <process-id>` |
| Close stdin for a pipe process | `createos sandbox process close-stdin <sandbox> <process-id>` |
| Resize a managed PTY shell/session | `createos sandbox process resize <sandbox> <process-id>` |
| Send a signal such as `SIGINT` or `SIGTERM` | `createos sandbox process signal <sandbox> <process-id> <signal>` |
| Wait for a managed process to exit | `createos sandbox process wait <sandbox> <process-id>` |
| Stop a process and anything it started | `createos sandbox process stop <sandbox> <process-id>` |

##### `sandbox process run`
Run a command as a managed process, attach to output, wait for exit, return its exit code.
```bash
createos sandbox process run my-box -- npm test
createos sandbox process run my-box -- bash -lc 'npm install && npm test'
createos sandbox process run --pty my-box -- python3
```
| Flag | Description |
|---|---|
| `--cwd <path>` | Working directory inside the sandbox. |
| `--env KEY=VALUE` | Environment variable override (repeatable). |
| `--pty`, `--tty`, `-t` | Create a managed PTY instead of separate stdout/stderr pipes. |
| `--rows <n>` | Initial PTY rows. |
| `--cols <n>` | Initial PTY columns. |
| `--after <seq>` | When following output, replay after this sequence number. |
| `--no-follow` | Do not attach to output after creating. |
| `--all` | Wait for the command and anything it started. |
| `--timeout <duration>` | Stop waiting after this long. |

##### `sandbox process start`
Start a managed command without attaching by default. Use for background work to inspect later with `process list`, `process attach`, `process wait`, `process signal`, or `process stop`.
```bash
createos sandbox process start my-box -- python -m http.server 8000
createos sandbox process start --follow my-box -- npm run dev
```
| Flag | Description |
|---|---|
| `--cwd <path>` | Working directory inside the sandbox. |
| `--env KEY=VALUE` | Environment variable override (repeatable). |
| `--pty`, `--tty`, `-t` | Create a managed PTY instead of separate stdout/stderr pipes. |
| `--rows <n>` | Initial PTY rows. |
| `--cols <n>` | Initial PTY columns. |
| `--after <seq>` | When following output, replay after this sequence number. |
| `--follow` | Attach to output after starting. |

##### `sandbox process shell`
Start a managed PTY shell session. Does not replace `sandbox shell`; use when the shell should survive detach and be reattached later. Creates a process ID, appears in `process list`, supports switching between running shell sessions from attach.
```bash
createos sandbox process shell my-box
createos sandbox process shell my-box --no-attach
```
| Flag | Description |
|---|---|
| `--cwd <path>` | Working directory inside the sandbox. |
| `--env KEY=VALUE` | Environment variable override (repeatable). |
| `--rows <n>` | Initial PTY rows. |
| `--cols <n>` | Initial PTY columns. |
| `--cmd <path>` | Explicit shell executable. The backend picks a default shell when omitted. |
| `--no-attach` | Create the shell session and print the process ID without attaching. |

##### `sandbox process attach`
Reconnect to a managed process or shell session.
```bash
createos sandbox process attach my-box proc_abc123
createos sandbox process attach my-box
```
- PTY shell sessions: attach is interactive. Pipe processes: attach follows retained stdout/stderr. Omitting the process ID in an interactive terminal shows a picker of running managed processes.
- Inside a managed PTY shell session:

| Shortcut | Action |
|---|---|
| `Ctrl-]` | Detach from the local attach session. |
| `Ctrl-N` | Create a new shell and switch to it. |
| `Ctrl-P` | Open the process picker. |

| Flag | Description |
|---|---|
| `--after <seq>` | Replay output after this sequence number. |
| `--no-follow` | Replay retained output and exit. |
| `--stdin` | Send local stdin to the process. Default for PTYs. |
| `--raw` | Print raw output bytes. |

##### Other process controls
```bash
createos sandbox process list my-box
createos sandbox process get my-box proc_abc123
createos sandbox process input my-box proc_abc123 --text "hello\n"
createos sandbox process close-stdin my-box proc_abc123
createos sandbox process resize my-box proc_abc123 --rows 40 --cols 120
createos sandbox process signal my-box proc_abc123 SIGINT
createos sandbox process wait my-box proc_abc123 --all
createos sandbox process stop my-box proc_abc123 --grace 1s
```
- `process input` accepts exactly one of `--text`, `--file <path|->`, or `--base64 <bytes>`.
- `process close-stdin` only applies to pipe processes; PTYs have no separate stdin-close.
- `process resize` only applies to PTYs.
- `process wait --all` waits for the command and anything it started.
- `process stop` sends `SIGTERM`, waits for the grace period, then force-kills remaining descendants.

#### `sandbox editor`
Connect a remote editor (Zed, Cursor, or VS Code) to a sandbox over SSH.
```bash
createos sandbox editor [<sandbox>]
```
- In one command: registers your local SSH key on the sandbox, starts `sshd` inside it, writes a `~/.ssh/config` entry so plain `ssh <sandbox-id>` works, launches your editor with the remote pre-selected. Each sandbox gets a dedicated throwaway keypair stored under `~/.config/createos/keys`; never touches your `~/.ssh/` keys.
- Requirements:
  - The sandbox must be `running`.
  - The sandbox image must ship `sshd` (the `devbox:1` rootfs does).
  - The shape needs more than 2 GiB of memory (e.g. `s-4vcpu-4gb`). Remote editor language servers OOM on 1 GiB shapes.
- Transports (`--via`):

| Mode | Description |
|---|---|
| `tunnel` | SSH through the gateway using OpenSSH `ProxyJump`. Works anywhere. Default when the VPN is down. |
| `vpn` | Direct connection to the sandbox's overlay IP via the CreateOS VPN. Full network access. Default when the VPN is already up. Requires `createos sandbox vpn up` and a shared network. |

| Flag | Description |
|---|---|
| `--via <tunnel\|vpn>` | Transport to use. Auto-picks based on VPN state when omitted. |
| `--editor <name>` | Editor to launch after connect: `zed`, `cursor`, `code` (VS Code), or `none` (write SSH config only). Auto-detects an installed editor when omitted. |
| `--user <name>`, `-u` | Username inside the sandbox (default: `root`). |
| `--yes`, `-y` | Skip prompts; accept smart defaults. Required in non-interactive mode. |
| `--no-launch` | Wire up the SSH config but don't launch the editor. |
| `--remove` | Remove this sandbox's `~/.ssh/config` entry and local key, then exit. |
| `--no-sweep` | Skip auto-cleanup of `~/.ssh/config` entries for sandboxes that no longer exist. |

- Interactive by default (prompts for sandbox, transport, editor). Pass a sandbox plus `--via`, `--editor`, and `--yes` to run without prompts. Flag options must appear **before** the sandbox positional argument.
```bash
# Interactive: pick sandbox, transport, and editor
createos sandbox editor

# Non-interactive: Zed over the gateway tunnel
createos sandbox editor my-box --via tunnel --editor zed --yes

# Write the SSH config entry without launching an editor
createos sandbox editor my-box --editor none

# Remove the SSH config entry and dedicated key
createos sandbox editor --remove my-box
```
- After connecting, reach the sandbox with any SSH-based tool:
```bash
ssh my-box
zed ssh://my-box/root
code --remote ssh-remote+my-box /root
cursor --folder-uri vscode-remote://ssh-remote+my-box/root
```

### Files

#### `sandbox push`
Copy a local file into a sandbox. **Aliases:** `upload`, `cp-up`
```bash
createos sandbox push <sandbox> <local-path> <remote-path>
```
- Remote path must be absolute. Parent directories created automatically. Max 500 MB per file. Pass `-` as `<local-path>` to read from stdin.
```bash
# Upload a single file
createos sandbox push my-box ./main.py /workspace/main.py

# Stream a tarball from stdin
tar -c mydir | createos sandbox push my-box - /tmp/bundle.tar
```

#### `sandbox pull`
Copy a file out of a sandbox. **Aliases:** `download`, `cp-down`
```bash
createos sandbox pull <sandbox> <remote-path> <local-path|->
```
- Remote path must be absolute. Pass `-` as `<local-path>` to stream to stdout.
```bash
# Download to a file
createos sandbox pull my-box /workspace/result.csv ./result.csv

# Stream to stdout
createos sandbox pull my-box /workspace/result.csv - | head -5
```

#### `sandbox sync`
Two-way file sync between local machine and a sandbox. Runs in the foreground; `Ctrl+C` to stop.
```bash
createos sandbox sync [<sandbox>]
```
- Built on Mutagen (https://mutagen.io). Downloads Mutagen on first use. Uses the SSH path (requires an SSH key in the sandbox).

| Flag | Description |
|---|---|
| `--local <path>` | Local directory to sync (prompts interactively if omitted on a terminal; defaults to current directory). |
| `--remote <path>` | Absolute path inside the sandbox to sync to/from. |
| `-i <path>`, `--identity <path>` | Path to your SSH private key (auto-detected from `~/.ssh/` if omitted). |
| `--user <name>`, `-u` | Username inside the sandbox (default: `root`). |
| `--exclude <pattern>` | Glob pattern to skip; repeatable (e.g. `--exclude '*.log' --exclude node_modules`). |
| `--mode <mode>` | Sync direction: `two-way` (default), `one-way` (laptop wins, keeps extra files on the sandbox), or `mirror` (one-way and deletes extra files on the sandbox). |
| `--quiet`, `-q` | Don't print status; run silently until `Ctrl+C`. |
| `--no-ignore-vcs` | Sync VCS directories too (`.git`, `.hg`, …); skipped by default. |
| `--force` | Bypass the local path safety check (syncing from `$HOME`, `/`, `.ssh`, `.aws`, etc. is refused by default). The remote check is always enforced. |

```bash
createos sandbox sync my-box --local ~/work/project --remote /root/work
createos sandbox sync my-box -i ~/.ssh/id_ed25519 --local . --remote /app

# Skip files you don't want synced (repeatable)
createos sandbox sync my-box --exclude '*.log' --exclude node_modules

# Push-only: laptop wins, never pull changes back
createos sandbox sync my-box --mode one-way

# Mirror: make the sandbox identical, deleting extra files there
createos sandbox sync my-box --mode mirror

# Run silently until Ctrl+C
createos sandbox sync my-box --quiet
```

### Networking

#### `sandbox tunnel`
Forward a local TCP port to a port inside the sandbox. No SSH key required. **Alias:** `tun`. `Ctrl+C` to stop.
```bash
createos sandbox tunnel [<sandbox>]
```
| Flag | Description |
|---|---|
| `--remote <port>` | Port inside the sandbox to forward to. |
| `--local <port>` | Local port to listen on (defaults to `--remote` value). |
| `--bind <addr>` | Local bind address (default: `127.0.0.1`). Use `0.0.0.0` to expose to your network. |

```bash
# Forward localhost:8080 → sandbox:8000
createos sandbox tunnel my-box --local 8080 --remote 8000

# Mirror the remote port (local = remote = 5432)
createos sandbox tunnel my-box --remote 5432

# Expose to the local network
createos sandbox tunnel my-box --remote 80 --bind 0.0.0.0
```

#### `sandbox network`
Manage private overlay networks that let sandboxes reach each other by IP. **Aliases:** `net`, `networks`

| Subcommand | Description |
|---|---|
| `network create <name>` | Create a new private network. |
| `network ls` | List your networks. |
| `network show <name\|id>` | Show a network and its attached sandboxes. |
| `network attach <sandbox> <network>` | Add a sandbox to a network. |
| `network detach <sandbox> <network>` | Remove a sandbox from a network. |
| `network rm <name\|id>` | Delete a network. |

```bash
createos sandbox network create prod-net
createos sandbox network ls
createos sandbox network attach my-box prod-net
createos sandbox network show prod-net
createos sandbox network detach my-box prod-net
createos sandbox network rm prod-net
```

### Firewall (egress)

#### `sandbox firewall`
Control what a sandbox can reach on the internet (egress allowlist). Rules update live without restarting. **Alias:** `fw`

| Subcommand | Description |
|---|---|
| `firewall show <sandbox>` | Show the current egress allowlist. |
| `firewall set <sandbox> <host> [<host>...]` | Replace the allowlist with the given hosts/IPs. |
| `firewall clear <sandbox>` | Remove all restrictions (sandbox can reach anything). |

```bash
# See what the sandbox is allowed to reach
createos sandbox firewall show my-box

# Lock down to specific destinations
createos sandbox firewall set my-box api.github.com pypi.org

# Open the firewall completely
createos sandbox firewall clear my-box
```
- `firewall set` accepts hostnames, IP addresses, and CIDR ranges. An empty list or `firewall clear` allows all outbound traffic.

### Disks

#### `sandbox disk`
Manage S3-compatible buckets registered as mountable disks. **Alias:** `disks`

| Subcommand | Description |
|---|---|
| `disk create [<name>]` | Register an S3 bucket as a disk. |
| `disk ls` | List your registered disks. |
| `disk show <name\|id>` | Show details for one disk. |
| `disk attach <sandbox> <disk> <mount-path>` | Mount a disk into a running sandbox. |
| `disk detach <sandbox> <disk> <mount-path>` | Unmount a disk from a sandbox. |
| `disk rm <name\|id>` | Delete a disk registration (does not affect the bucket). |

`disk create` flags:

| Flag | Description |
|---|---|
| `--bucket <name>` | S3 bucket name. |
| `--endpoint <url>` | S3 endpoint URL (e.g. `https://s3.amazonaws.com`, `https://your-minio:9000`). |
| `--access-key <key>` | Access key ID. |
| `--secret-key <key>` | Secret access key. |
| `--region <name>` | S3 region (optional). |
| `--path-style` | Force path-style addressing (required for MinIO and some S3-compatible stores). |

- Run interactively (prompts for missing fields, masks the secret key) or pass all flags directly.
```bash
# Register a bucket interactively
createos sandbox disk create my-data

# Register non-interactively
createos sandbox disk create my-data \
  --bucket my-bucket \
  --endpoint https://s3.amazonaws.com \
  --access-key AKIAIOSFODNN7EXAMPLE \
  --secret-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Mount into a running sandbox
createos sandbox disk attach my-box my-data /mnt/data

# Unmount
createos sandbox disk detach my-box my-data /mnt/data
```

### Custom images

#### `sandbox template`
Build custom sandbox images from a Dockerfile. The Dockerfile must use a base image from the operator's allowlist (e.g. `nodeops/sandbox:debian`), must be single-stage, and must not use `COPY` or `ADD`. **Aliases:** `templates`, `tpl`

| Subcommand | Description |
|---|---|
| `template submit <name>` | Submit a Dockerfile to build a new image. |
| `template ls` | List your templates. |
| `template show <name\|id>` | Show details for one template. |
| `template logs <name\|id>` | Stream build logs. |
| `template rm <name\|id>` | Delete a template. |

`template submit` flags:

| Flag | Description |
|---|---|
| `-f <path>`, `--file <path>` | Path to the Dockerfile (default: `./Dockerfile`). |
| `--no-follow` | Submit and exit immediately; don't stream build logs. |

```bash
# Submit and stream build logs until done
createos sandbox template submit my-image

# Submit using a custom Dockerfile path
createos sandbox template submit my-image -f docker/Sandbox.dockerfile

# Submit without waiting for the build
createos sandbox template submit my-image --no-follow

# Use a template when creating a sandbox
createos sandbox create --shape s-1vcpu-1gb --rootfs my-image

# Watch logs for an in-progress build
createos sandbox template logs my-image --follow
```
- Once a template's status is `ready`, use its name as `--rootfs` when creating a sandbox.

### Catalog

#### `sandbox shapes`
List available sandbox sizes; prints a table of shape IDs with vCPU count, RAM and default disk size. Pass the shape ID to `sandbox create --shape`.
```bash
createos sandbox shapes
createos sandbox shapes --output json
```

#### `sandbox rootfs`
List built-in OS images available for new sandboxes; pass a name to `sandbox create --rootfs`. User-built templates (from `sandbox template submit`) are listed separately.
```bash
createos sandbox rootfs
createos sandbox rootfs --output json
```

### Webhooks
Register HTTPS endpoints that receive a signed `POST` on sandbox, disk, network and template lifecycle events. These live under the top-level `createos webhooks` group (not `createos sandbox`). Event catalog, delivery payload and signature verification are on the REST API Webhooks page ([[Docs - Sandbox REST API]]). Endpoint-targeting commands accept the endpoint ID as a positional argument or `--endpoint <id>`, and prompt interactively when omitted on a terminal.

#### `webhooks create`
Create a webhook endpoint. Omit `--event` to subscribe to every action; repeat `--event` to filter. The signing `secret` is printed once, save it.
```bash
# Subscribe to all events
createos webhooks create --url https://example.com/webhook

# Subscribe to specific events
createos webhooks create --url https://example.com/webhook \
  --event sandbox.create --event sandbox.destroy

# Interactive (TTY): prompts for URL and events
createos webhooks create
```
| Flag | Description |
|---|---|
| `--url <url>` | HTTPS URL to receive events. Required (prompted on a TTY). |
| `--event <action>` | Event to subscribe to; repeatable. Omit for all events. |

#### `webhooks list`
List your webhook endpoints. **Alias:** `createos webhooks ls`
```bash
createos webhooks list
```

#### `webhooks get`
Show one endpoint's config plus recent deliveries (status, attempts, timestamps).
```bash
createos webhooks get <endpoint-id>
createos webhooks get --endpoint <endpoint-id>
```

#### `webhooks suspend`
Stop deliveries without deleting the endpoint.
```bash
createos webhooks suspend <endpoint-id>
```

#### `webhooks resume`
Reactivate a suspended endpoint and reset its failure count. Endpoints are auto-suspended after repeated delivery failures.
```bash
createos webhooks resume <endpoint-id>
```

#### `webhooks delete`
Delete an endpoint and all its pending deliveries.
```bash
createos webhooks delete <endpoint-id>
createos webhooks delete <endpoint-id> --force   # skip confirmation (alias: -f)
```

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - CLI]]: platform-wide `createos` CLI docs (deploy, projects, logs, sandbox commands)
- [[Product - CLI]]: CLI product page
- [[Repo - createos-cli]]: CLI source repository
- [[Docs - Sandbox Quickstart]]: CLI quickstart steps
- [[Docs - Sandbox Integrations]]: plugins that drive this CLI
- [[Docs - Sandbox Limits]]: shapes, images and plan caps for `--shape` and `--rootfs`
