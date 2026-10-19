---
aliases:
  - createos-cli
  - CreateOS CLI README
tags:
  - hackathon
  - type/page
source: https://github.com/NodeOps-app/createos-cli
sources:
  - https://github.com/NodeOps-app/createos-cli
  - https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/README.md
  - https://api.github.com/repos/NodeOps-app/createos-cli
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Repo - createos-cli

> [!summary] Summary
> - Official CreateOS command-line interface (`createos`), "Your intelligent infrastructure CLI". Written in Go; topics `createos`, `sandbox`; default branch `main`.
> - Install: `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -` or Homebrew (`brew tap nodeops-app/tap` + `brew install createos`).
> - Covers auth, projects, deploy, deployments, environments, env vars, domains, cron jobs, templates, VMs, **sandboxes**, webhooks, OAuth clients.
> - Sandbox commands: create, list, get, edit, pause, resume, fork, rm, exec, shell, process, sync, push, pull, tunnel, shapes, rootfs, setup, run, plus disk, network, firewall and template sub-resources.
> - Source: https://github.com/NodeOps-app/createos-cli

## Installation

| Method | Command |
|---|---|
| Install script (macOS and Linux, recommended) | `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh \| sh -` |
| Homebrew | `brew tap nodeops-app/tap` then `brew install createos` |
| Nightly, script | `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh \| CREATEOS_CHANNEL=nightly sh -` |
| Nightly, Homebrew | `brew install createos --HEAD` |
| Pin a version | `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh \| CREATEOS_VERSION=v0.0.3 sh -` |
| Upgrade | `createos upgrade` or `brew upgrade createos` |
| Build from source (Go 1.26+) | `git clone https://github.com/NodeOps-app/createos-cli` · `cd createos-cli` · `go build -o createos .` |

- Nightly builds come daily from the latest commit on `main` and may contain unreleased features.

## Getting started
1. **Sign in** (pick one):
   - Device code (default): `createos login`; open the link shown. `createos login --device` skips the menu.
   - Browser: run `createos login`, select "Sign in with browser".
   - API token: get it from https://createos.nodeops.network/profile, then `createos login --token <your-api-token>` (or pick "Sign in with API token"). Use `--token` for unattended CI.
2. **Confirm account:** `createos whoami`
3. **Link project:** `createos init`
4. **Explore:** `createos --help`

## Commands

### Authentication
| Command | Description |
|---|---|
| `createos login` | Sign in with browser, device code, or API token |
| `createos logout` | Sign out |
| `createos whoami` | Show the currently authenticated user |

### Projects
| Command | Description |
|---|---|
| `createos projects add` | Create a new project |
| `createos projects list` | List all projects |
| `createos projects get` | Get project details |
| `createos projects delete` | Delete a project |
| `createos projects suspend` | Pause a running project |
| `createos projects unsuspend` | Resume a suspended project |

`projects add` flags: `--name` (display name) · `--unique-name` (lowercase, 4-32 chars) · `--type` (`vcs`, `image`, or `upload`) · `--description` · `--framework` (e.g. `nextjs`, `reactjs-spa`, `vite-spa`) · `--runtime` (e.g. `node:20`, `golang:1.25`, `dockerfile`) · `--port` · `--install-command` (e.g. `npm install`) · `--build-command` (e.g. `npm run build`) · `--run-command` (e.g. `npm run start`) · `--build-dir` · `--build-flag` · `--run-flag` · `--directory-path` (default `.`) · `--github-owner` (VCS, non-interactive) · `--repo` (`owner/repo`, VCS, non-interactive)

### Deploy
- `createos deploy`: deploy the project (auto-detects type).
- Flags: `--project` (auto-detected from `.createos.json`) · `--branch` (VCS/GitHub only) · `--image` (image projects, e.g. `nginx:latest`) · `--dir` (upload projects, default `.`)
- By type: **VCS / GitHub** triggers from the latest commit (prompts for branch if not given); **Upload** zips the local dir (respects `.gitignore`), uploads, streams build logs; **Image** deploys the given Docker image.
- Always excluded from the upload zip: `.env`, `.env.*`, secrets/keys (`*.pem`, `*.key`, `*.p12`, etc.), `node_modules`, build artifacts (`target`, `coverage`, etc.), OS/editor files, anything in `.gitignore`.

### Deployments
`createos deployments` `list` (list for a project) · `logs` (stream runtime logs) · `build-logs` (stream build logs) · `promote` (to an environment) · `retrigger` · `sleep` (put running deployment to sleep) · `wakeup` · `cancel-build`

### Environments and variables
- `createos environments` `list` · `create` · `delete`
- `createos env` `list` · `set` (one or more) · `rm` · `pull` (download to local `.env`) · `push` (upload from local `.env`)

### Domains
`createos domains` `list` · `create` · `verify` (check DNS propagation, wait for verification) · `delete`

### Cron jobs
- `createos cronjobs` `list` · `create` (new HTTP cron job) · `get` (path, method, headers, body) · `update` (name, schedule, HTTP settings) · `suspend` · `unsuspend` · `activities` (recent execution history) · `delete`
- HTTP flags for `create`/`update`: `--path` (must start with `/`) · `--method` (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`) · `--header` (`Key=Value`, repeatable) · `--body` (JSON; POST, PUT, PATCH only)

### Templates
`createos templates` `list` (browse) · `info` · `use` (download and scaffold)

### VMs
`createos vms` `list` · `get` · `deploy` · `ssh` · `reboot` · `resize` (to a different plan) · `terminate` (permanently destroy)

### Sandboxes
- Sandboxes are fast-booting VMs: exec into them, sync files, tunnel ports, snapshot at will.
- Any sandbox argument accepts the full ID, the name, or a unique prefix of either (like Docker). Ambiguous input lists matches and asks for more characters.

```bash
createos sandbox rm sb-01243e     # enough of the ID to be unique
createos sandbox get my-box       # the name you gave it
createos sandbox exec my-b -- ls  # enough of the name to be unique
```

| Command | Description |
|---|---|
| `createos sandbox create` | Create a new sandbox |
| `createos sandbox list` | List your sandboxes |
| `createos sandbox get` | Show details for one sandbox |
| `createos sandbox edit` | Change settings (public URL, SSH keys, auto-pause) |
| `createos sandbox pause` | Snapshot a running sandbox to resume later |
| `createos sandbox resume` | Bring a paused sandbox back |
| `createos sandbox fork` | Clone a paused sandbox into a new one |
| `createos sandbox rm` | Delete one or more sandboxes |
| `createos sandbox exec` | Run a command inside a sandbox |
| `createos sandbox shell` | Open an interactive shell |
| `createos sandbox process` | Manage reconnectable processes and shell sessions |
| `createos sandbox sync` | Two-way file sync between laptop and sandbox |
| `createos sandbox push` | Copy a local file into a sandbox |
| `createos sandbox pull` | Copy a file out of a sandbox |
| `createos sandbox tunnel` | Forward a local port to a port inside a sandbox |
| `createos sandbox shapes` | List sandbox sizes (vCPU / RAM / disk) |
| `createos sandbox rootfs` | List built-in OS images |
| `createos sandbox setup` | Connect a coding harness so its workspaces run on a sandbox |
| `createos sandbox run <image> [args…]` | Create a devbox sandbox and run a Docker image inside it |

**`sandbox create` flags**

| Flag | Description |
|---|---|
| `--shape` | Size (see `createos sandbox shapes`) |
| `--name` | Friendly name |
| `--rootfs` | Base image or custom template |
| `--disk-mib` | Disk size in MiB (default: the shape's standard disk) |
| `--ssh-key` | Path to an SSH public key file (repeatable) |
| `--env` | Env var for every exec (repeatable): `KEY=VALUE` |
| `--egress` | Allowed outbound host/IP (repeatable). Empty = unrestricted. |
| `--network` | Private network to join at creation (repeatable): `<name\|id>` |
| `--disk` | S3 disk to mount at creation (repeatable): `<name\|id>:/mount/path` |
| `--ingress` | Give the sandbox a public HTTPS URL |
| `--auto-pause` | Auto-pause after inactivity (e.g. `10m`, `1h`). Omit to keep running. |

**`sandbox setup` (Orca)**
- `createos sandbox setup orca` connects Orca (https://orca.dev) so each workspace runs on its own disposable sandbox.
- `createos sandbox setup orca --doctor` checks prerequisites, changes nothing; `createos sandbox setup orca` prints plugin install steps.
- Workspace checkout is pushed, not cloned: no git token reaches the box; private repos work.
- `CREATEOS_AGENTS` installs coding agents at create time, e.g. `CREATEOS_AGENTS=claude,codex`.
- Plugin lives in `NodeOps-app/createos-plugins` under `packages/orca-plugin`.

**When to use which**
- `sandbox exec`: quick non-interactive one-shot commands.
- `sandbox run`: fresh devbox sandbox that runs a Docker image.
- `sandbox shell`: immediate interactive terminal, no reconnect needed.
- `sandbox process`: manageable after start (list, reconnect, send input, wait, signal, stop). Add `--pty`/`--tty`/`-t` to `process run` or `process start` for terminal behaviour.

**`sandbox process` subcommands**
`process run <sb> -- <cmd>` (managed command, stream output, return exit code) · `process start <sb> -- <cmd>` (print process ID) · `process shell <sb>` (persistent, reattachable shell) · `process attach <sb> <proc>` · `process attach <sb>` (pick one) · `process list <sb>` · `process get <sb> <proc>` · `process input <sb> <proc>` · `process close-stdin <sb> <proc>` · `process resize <sb> <proc>` · `process signal <sb> <proc> <signal>` (e.g. `SIGINT`, `SIGTERM`) · `process wait <sb> <proc>` · `process stop <sb> <proc>`
- Managed shell shortcuts: `Ctrl-]` detaches, `Ctrl-N` new shell, `Ctrl-P` process picker.

**Sub-resources**

| Command | Description |
|---|---|
| `createos sandbox disk create` | Register an S3 bucket as a mountable disk |
| `createos sandbox disk ls` / `show <name\|id>` | List / show disks |
| `createos sandbox disk attach <sb> <disk> <path>` | Mount into a running sandbox |
| `createos sandbox disk detach <sb> <disk> <path>` | Unmount |
| `createos sandbox disk rm <name\|id>` | Delete (auto-detaches first) |
| `createos sandbox network create <name>` | Create a private network |
| `createos sandbox network ls` / `show <name\|id>` | List / show network and members |
| `createos sandbox network attach <net> <sb\|device>` | Add a sandbox or device |
| `createos sandbox network detach <net> <sb\|device>` | Remove a sandbox or device |
| `createos sandbox network rm <name\|id>` | Delete (auto-detaches first) |
| `createos sandbox firewall show <sandbox>` | Show what the sandbox may reach |
| `createos sandbox firewall set <sb> <host…>` | Replace the outbound allowlist |
| `createos sandbox firewall clear <sandbox>` | Allow all outbound traffic |
| `createos sandbox template submit <name>` | Build a Dockerfile into a sandbox image |
| `createos sandbox template ls` / `show <name\|id>` | List / show custom images |
| `createos sandbox template logs <name\|id>` | Show (or follow) build output |
| `createos sandbox template rm <name\|id>` | Delete a custom image |

### Webhooks
`createos webhooks` `list` · `get` · `create` · `delete` · `suspend` · `resume`

### Quick actions
`createos init` (link current dir to a project) · `createos status` (health and deployment status) · `createos open` (open live URL) · `createos scale` (replicas and resources for an environment)

### OAuth clients and Me
- `createos oauth-clients` `list` · `create` · `instructions` · `delete`
- `createos me oauth-consents` `list` · `revoke`

### Other
`createos ask` (AI assistant for infrastructure) · `createos upgrade` · `createos version`

## Sandbox examples (non-interactive / CI)
Destructive commands need `--force` to skip confirmation.

```bash
createos sandbox create --shape s-1vcpu-1gb --name my-box --ssh-key ~/.ssh/id_ed25519.pub
createos sandbox create --shape s-1vcpu-512mb --ingress --auto-pause 1h
createos sandbox list
createos sandbox list --all
createos sandbox list --wide
createos sandbox list --status paused --quiet | xargs createos sandbox rm --force
createos sandbox get <id>
createos sandbox exec my-box -- uname -a
createos sandbox exec my-box --stream -- pip install requests
createos sandbox shell my-box
createos sandbox shell my-box --ssh
createos sandbox process run my-box -- npm test
createos sandbox process start my-box -- python -m http.server 8000
createos sandbox process shell my-box
createos sandbox process attach my-box proc_abc123
createos sandbox process attach my-box        # pick a running process or shell session
createos sandbox process ps my-box
createos sandbox process input my-box proc_abc123 --text "hello\n"
createos sandbox process signal my-box proc_abc123 SIGINT
createos sandbox process wait my-box proc_abc123 --all
createos sandbox process stop my-box proc_abc123 --grace 1s
createos sandbox push my-box ./script.py /root/script.py
createos sandbox pull my-box /root/output.csv ./output.csv
createos sandbox tunnel my-box --local 8080 --remote 8000
createos sandbox pause my-box
createos sandbox resume my-box
createos sandbox fork my-box
createos sandbox edit my-box --ingress on
createos sandbox edit my-box --auto-pause 30m
createos sandbox rm my-box --force
createos sandbox shapes
createos sandbox rootfs

# Sandbox run
createos sandbox run nginx --local 8080 --remote 80 --rm
createos sandbox run postgres \
  --disk pg-data,/data:/var/lib/postgresql/data \
  --local 5432 --remote 5432 \
  --env POSTGRES_PASSWORD=secret \
  --rm
createos sandbox run my-app:local --push-local --env NODE_ENV=development --rm
createos sandbox run nginx \
  --sync ./site,/workspace:/usr/share/nginx/html \
  --local 8080 --remote 80 \
  --rm

# Sandbox sync
createos sandbox sync my-box --local ~/work/project --remote /root/work
createos sandbox sync my-box --exclude '*.log' --exclude node_modules
createos sandbox sync my-box --mode one-way   # push-only: laptop wins, keep extra remote files
createos sandbox sync my-box --mode mirror    # make sandbox identical, delete extra remote files
createos sandbox sync my-box --quiet

# Sandbox disks
createos sandbox disk create my-data --bucket my-bucket --endpoint https://s3.amazonaws.com \
  --access-key AKID... --secret-key ...
createos sandbox disk attach my-box my-data /mnt/data
createos sandbox disk detach my-box my-data /mnt/data --yes
createos sandbox disk rm my-data --yes

# Sandbox networks
createos sandbox network create my-net
createos sandbox network attach my-net my-box
createos sandbox network attach my-net <device-id>
createos sandbox network detach my-net my-box --yes
createos sandbox network rm my-net --yes

# Sandbox firewall
createos sandbox firewall show my-box
createos sandbox firewall set my-box pypi.org github.com
createos sandbox firewall clear my-box --yes

# Sandbox templates (custom images)
createos sandbox template submit my-rails -f Dockerfile
createos sandbox template ls
createos sandbox template logs my-rails --follow
createos sandbox template rm my-rails --yes

# Webhooks
createos webhooks create --url https://example.com/webhook \
  --event sandbox.create --event sandbox.destroy
```

- `--disk <disk>,<sandbox-path>:<container-path>` attaches the disk at the sandbox path, then mounts it into the Docker container.
- `--sync <local-dir>,<sandbox-path>:<container-path>` syncs a local dir to the sandbox first, then mounts that path into the container.

## Other CI examples (selection)
```bash
createos deploy                                      # upload project — zips current dir
createos deploy --dir ./dist
createos deploy --branch main                        # VCS project
createos deploy --image nginx:latest                 # image project
createos projects add --name "My API" --unique-name my-api --type image --port 8080
createos projects add --name "My App" --unique-name my-app --type upload --framework nextjs --runtime node:20
createos env set KEY=value --project <id> --environment <id>
createos env pull --project <id> --environment <id> --force
createos cronjobs create --project <id> --environment <id> \
  --name "Cleanup job" --schedule "0 * * * *" \
  --path /api/cleanup --method GET
createos vms deploy --zone nyc3 --size 1 --name "my-vm" --ssh-key "ssh-ed25519 ..."
```

## JSON output and options
- List/get commands output JSON automatically when stdout is a pipe (`| jq` works with no flags), e.g. `createos projects list | jq '.[].id'`.
- Force JSON in a TTY: `--output json` or `-o json`.

| Flag | Description |
|---|---|
| `--output, -o <fmt>` | `json` or `table` (default). Auto-json when piped. |
| `--debug, -d` | Print HTTP request/response details (token masked) |
| `--api-url` | Override the API base URL |
| `--sandbox-api-url` | Override the sandbox API base URL |
| `--sandbox-gateway` | SSH gateway (`host:port`) used by `sandbox shell --ssh` |

## Contributing
- Pre-commit setup: `pip install pre-commit detect-secrets` · `pre-commit install` · `detect-secrets scan > .secrets.baseline`
- Hooks: `detect-secrets` (secrets scan), `go-vet` (`go vet ./...`), `go-build-tmp` (clean build). False positives: `detect-secrets audit .secrets.baseline`.

## Security
- API token stored at `~/.createos/.token`, permissions `600`.
- OAuth session tokens at `~/.createos/.oauth`, permissions `600`.
- Debug mode masks the token: only the first 6 and last 4 characters show.
- Never share the token or commit it to version control.

## CreateOS Sandbox family (from README)
| Repo | What it is | Package |
|---|---|---|
| fc-sdk | TypeScript SDK + `examples/` | `@nodeops-createos/sandbox` |
| createos-go-sdk | Go SDK | `github.com/NodeOps-app/createos-go-sdk` |
| createos-python-sdk | Python SDK | `createos-sandbox` |
| createos-v2-landing | Public docs, `apps/docs/src/pages/Sandbox/` | — |
| createos-plugin | Integrations monorepo, plugins for 8 agent hosts | — |

## Related
- Up: [[Hackathon Overview]]
- [[Hackathon Setup Guide]]: the CLI commands used at the hackathon
- [[Docs - Sandbox CLI]]: sandbox CLI docs
- [[Docs - CLI]]: platform CLI docs
- [[Product - CLI]]: CLI product page
- [[Repo - createos-claude-plugins]]: plugins that wrap this CLI
- [[Docs - Sandbox SDK]]: SDKs in the same family
