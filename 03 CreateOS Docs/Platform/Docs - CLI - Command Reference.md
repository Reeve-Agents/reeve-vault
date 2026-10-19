---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/CLI/Command-Reference
scraped: 2026-10-17
up: "[[Docs - CLI]]"
---

# Docs - CLI - Command Reference

> [!summary] Summary
> - Complete list of `createos` CLI commands, grouped by area, with global flags.
> - Global flags: `--output json` / `-o json`, `--debug` / `-d`, `--api-url`, `--help` / `-h`.
> - Sandbox commands live under `createos sandbox` (alias `createos sb`), powered by fc-spawn.
> - Source: https://createos.sh/docs/CLI/Command-Reference

## CLI Command Reference
- **URL:** https://createos.sh/docs/CLI/Command-Reference
- **Summary:** Reference of all CreateOS CLI commands. Commands below are verbatim from the page.
- **Key points:** see sections below.

### Global Flags

| Flag | Description |
|---|---|
| `--output json`, `-o json` | Output results as JSON (supported on most commands) |
| `--debug`, `-d` | Print HTTP request/response details (tokens are masked) |
| `--api-url` | Override the API base URL |
| `--help`, `-h` | Show help for any command |

### Authentication

| Command | Description |
|---|---|
| `createos login` | Sign in via browser (OAuth) or API token |
| `createos logout` | Sign out and clear stored credentials |
| `createos whoami` | Show the currently authenticated user |

### Project Management

| Command | Description |
|---|---|
| `createos init` | Link the current directory to a CreateOS project |
| `createos projects list` | List all your projects |
| `createos projects get` | Show details for a specific project |
| `createos projects delete` | Delete a project |

### Deployments

| Command | Description |
|---|---|
| `createos deploy` | Deploy your project (auto-detects type) |
| `createos deploy --branch <name>` | Deploy from a specific branch (VCS projects) |
| `createos deploy --image <ref>` | Deploy a Docker image (image projects) |
| `createos deployments list` | List deployments for a project |
| `createos deployments logs` | View runtime logs |
| `createos deployments logs -f` | Tail logs in real-time |
| `createos deployments build-logs` | View build-time logs |
| `createos deployments retrigger` | Redeploy an existing deployment |
| `createos deployments cancel` | Cancel a running deployment |
| `createos deployments wakeup` | Wake up a sleeping deployment |

### Environment Variables

| Command | Description |
|---|---|
| `createos env list` | List environment variables (masked by default) |
| `createos env set KEY=value` | Set one or more variables |
| `createos env rm KEY` | Remove a variable |
| `createos env pull` | Download variables to a local `.env` file |
| `createos env push` | Upload variables from a local `.env` file |

```bash
# Set multiple variables at once
createos env set DATABASE_URL=postgres://... API_KEY=sk-xxx

# Pull to local file for development
createos env pull

# Push from local file to remote
createos env push --force
```

Note: this page says `env list` is masked by default, while the [[Docs - CLI]] Environment Variables page says values are shown in full by default and `--hide` masks them.

### Scaling

| Command | Description |
|---|---|
| `createos scale --show` | View current resource allocation |
| `createos scale --replicas N` | Set number of replicas (1 to 3) |
| `createos scale --cpu N` | Set CPU in millicores (200 to 500) |
| `createos scale --memory N` | Set memory in MB (500 to 1024) |

```bash
createos scale --replicas 2 --cpu 300 --memory 512
```

### Cron Jobs

| Command | Description |
|---|---|
| `createos cronjobs list` | List all cron jobs |
| `createos cronjobs create` | Create a new cron job |
| `createos cronjobs get` | Show details for a cron job |
| `createos cronjobs update` | Update a cron job |
| `createos cronjobs delete` | Delete a cron job |
| `createos cronjobs suspend` | Pause a cron job |
| `createos cronjobs unsuspend` | Resume a paused cron job |
| `createos cronjobs activities` | View execution history |

```bash
createos cronjobs create \
  --name "nightly-cleanup" \
  --schedule "0 0 * * *" \
  --path /api/cleanup \
  --method POST
```

### Custom Domains

| Command | Description |
|---|---|
| `createos domains list` | List custom domains |
| `createos domains add <domain>` | Add a domain (shows DNS records) |
| `createos domains verify` | Check DNS propagation and wait |
| `createos domains delete` | Remove a domain |

```bash
# Add a domain: shows required DNS records
createos domains add api.myapp.com

# After configuring DNS, verify propagation
createos domains verify

# Or check once without waiting
createos domains verify --no-wait
```

### Templates

| Command | Description |
|---|---|
| `createos templates list` | Browse available templates |
| `createos templates info <id>` | Show template details |
| `createos templates use <id>` | Download and scaffold a project |

### Status and Open

| Command | Description |
|---|---|
| `createos status` | Project health dashboard |
| `createos open` | Open project URL in browser |
| `createos open --dashboard` | Open the CreateOS dashboard |

### VMs

| Command | Description |
|---|---|
| `createos vms list` | List VM instances |
| `createos vms get` | VM details |
| `createos vms deploy` | Deploy a new VM |
| `createos vms ssh` | SSH into a VM |
| `createos vms reboot` | Reboot a VM |
| `createos vms resize` | Change VM size |
| `createos vms terminate` | Destroy a VM |

### Sandboxes

Alias: `createos sb`. MicroVM sandboxes powered by fc-spawn. The page points to the Sandboxes guide (`/CLI/Sandbox`, which now redirects to the Sandbox section; see [[Docs - Sandbox CLI]]).

**Lifecycle**

| Command | Description |
|---|---|
| `createos sandbox create` | Create a new sandbox |
| `createos sandbox list` | List sandboxes (default: running only) |
| `createos sandbox get <sandbox>` | Show sandbox details |
| `createos sandbox edit <sandbox>` | Change settings (ingress, SSH keys, auto-pause) |
| `createos sandbox pause <sandbox>` | Snapshot and pause a running sandbox |
| `createos sandbox resume <sandbox>` | Resume a paused sandbox |
| `createos sandbox fork <sandbox>` | Clone a paused sandbox |
| `createos sandbox rm <sandbox>` | Delete one or more sandboxes |

**Execution and files**

| Command | Description |
|---|---|
| `createos sandbox exec <sandbox> -- <cmd>` | Run a one-shot command |
| `createos sandbox shell <sandbox>` | Open an interactive shell |
| `createos sandbox push <sandbox> <local> <remote>` | Upload a file |
| `createos sandbox pull <sandbox> <remote> <local>` | Download a file |
| `createos sandbox sync <sandbox>` | Two-way directory sync |

**Networking**

| Command | Description |
|---|---|
| `createos sandbox tunnel <sandbox>` | Forward a local port to the sandbox |
| `createos sandbox network create <name>` | Create a private network |
| `createos sandbox network ls` | List networks |
| `createos sandbox network attach <sandbox> <network>` | Attach sandbox to network |
| `createos sandbox network detach <sandbox> <network>` | Detach sandbox from network |
| `createos sandbox firewall show <sandbox>` | Show egress allowlist |
| `createos sandbox firewall set <sandbox> <host>` | Set egress allowlist |
| `createos sandbox firewall clear <sandbox>` | Allow all outbound traffic |

**Disks and images**

| Command | Description |
|---|---|
| `createos sandbox disk create <name>` | Register an S3 bucket as a mountable disk |
| `createos sandbox disk ls` | List disks |
| `createos sandbox disk attach <sandbox> <disk>:/path` | Attach disk to running sandbox |
| `createos sandbox template submit <name>` | Build a custom image from a Dockerfile |
| `createos sandbox template ls` | List custom templates |
| `createos sandbox shapes` | List available sandbox sizes |
| `createos sandbox rootfs` | List built-in OS images |

**Examples**

```bash
# Create and run a command
createos sandbox create --shape s-1vcpu-256mb --name dev
createos sandbox exec dev -- python3 --version

# Public URL for demos
createos sandbox create --shape s-1vcpu-1gb --ingress

# Port-forward a dev server
createos sandbox tunnel dev --local 8080 --remote 3000

# Script-friendly cleanup
createos sandbox list --quiet --status failed | xargs createos sandbox rm --force
```

### Skills Marketplace

| Command | Description |
|---|---|
| `createos skills catalog` | Browse the skills marketplace (interactive TUI) |
| `createos skills purchased` | List your purchased skills |

### OAuth Clients

| Command | Description |
|---|---|
| `createos oauth-clients list` | List your OAuth clients |
| `createos oauth-clients create` | Create a new OAuth client |
| `createos oauth-clients delete` | Delete an OAuth client |
| `createos oauth-clients instructions` | Setup instructions for a client |

### Other

| Command | Description |
|---|---|
| `createos upgrade` | Self-update to the latest version |
| `createos version` | Print version, channel, and commit |
| `createos ask` | Open AI assistant for infrastructure management |

### Non-Interactive / CI Usage

```bash
# Authenticate with token
createos login --token

# Deploy with explicit project
createos deploy --project <project-id>

# Set env vars
createos env set KEY=value --project <id> --environment <id>

# Delete with force (skip confirmation)
createos domains delete --project <id> --domain <id> --force
createos deployments cancel --project <id> --deployment <id> --force

# JSON output for scripting
createos projects list --output json
createos status --output json | jq .
```

## Related
- Up: [[Docs - CLI]]
- [[Docs - Sandbox CLI]]: sandbox CLI in the Sandbox docs
- [[Docs - Sandbox]]: Sandbox docs hub
- [[Product - CLI]]: CLI product page
- [[Repo - createos-cli]]: source repository
