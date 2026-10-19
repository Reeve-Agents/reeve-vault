---
tags:
  - createos/docs
  - createos/docs/platform
  - type/hub
source: https://createos.sh/docs/CLI
sources:
  - https://createos.sh/docs/CLI
  - https://createos.sh/docs/CLI/Overview
  - https://createos.sh/docs/CLI/Getting-Started
  - https://createos.sh/docs/CLI/Deployments
  - https://createos.sh/docs/CLI/Environment-Variables
  - https://createos.sh/docs/CLI/Domains
  - https://createos.sh/docs/CLI/Scaling
  - https://createos.sh/docs/CLI/Cron-Jobs
  - https://createos.sh/docs/CLI/Sandbox
  - https://createos.sh/docs/CLI/CI-CD
  - https://createos.sh/docs/CLI/Troubleshooting
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - CLI

> [!summary] Summary
> - The `createos` CLI deploys projects, manages environments and domains, schedules cron jobs, scales workloads and drives sandboxes (alias `createos sb`) from a terminal or CI.
> - Install: `brew tap nodeops-app/tap && brew install createos` or `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -`.
> - Quick start: `createos login`, `createos init`, `createos deploy`, `createos status`.
> - Open source (Go, MIT): https://github.com/NodeOps-app/createos-cli
> - Every command and flag: [[Docs - CLI - Command Reference]]. Source: https://createos.sh/docs/CLI

## CLI
- **URL:** https://createos.sh/docs/CLI
- **Summary:** Section index for the CLI docs.
- **Key points:**
  - Pages: Overview, Getting Started, Deployments, Environment Variables, Custom Domains, Scaling, Cron Jobs, Sandboxes, CI/CD Usage, Command Reference (see [[Docs - CLI - Command Reference]]), Troubleshooting.
  - Source repo: https://github.com/NodeOps-app/createos-cli (see [[Repo - createos-cli]]).

## CreateOS CLI (Overview)
- **URL:** https://createos.sh/docs/CLI/Overview
- **Summary:** Official command-line interface for CreateOS: deploy, manage and scale from the terminal.
- **Key points:**
  - Command categories:
    - Deploy: `deploy`
    - Manage: `env`, `domains`, `cronjobs`
    - Monitor: `status`, `deployments logs`
    - Scale: `scale`
    - Sandboxes: `sandbox` (create, exec, shell, sync, destroy)
    - Scaffold: `templates`, `init`
    - Automate: `--output json`, `--force`
  - Requirements: macOS (Intel or Apple Silicon) or Linux (x86_64 or ARM64); a CreateOS account (https://createos.sh/app/signup); an existing project.
  - Install:
    ```bash
    brew tap nodeops-app/tap
    brew install createos
    ```
    ```bash
    curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
    ```
  - Quick start:
    ```bash
    createos login          # sign in via browser
    createos init           # link to your project
    createos deploy         # deploy
    createos status         # check health
    ```
  - Open source, built in Go, license MIT: https://github.com/NodeOps-app/createos-cli

## Getting Started
- **URL:** https://createos.sh/docs/CLI/Getting-Started
- **Summary:** Install, authenticate, link a project and deploy in under 2 minutes.
- **Key points:**
  - Windows: download a binary from https://github.com/NodeOps-app/createos-cli/releases
  - Verify install: `createos version` (prints version, channel, commit; example `CreateOS CLI (version: v0.0.7)`).
  - Login (browser OAuth, session auto-refreshes): `createos login`
  - Login with API token (CI and headless): `createos login --token` (paste key; get it from **Profile Settings > API Keys** in the dashboard).
  - Check identity: `createos whoami` (ID, Email, Created At).
  - Link project: `createos init` (interactive) or `createos init --project <project-id>`; creates `.createos.json` (auto-added to `.gitignore`); later commands auto-detect the project.
  - Deploy: `createos deploy`. Auto-detected project types: VCS (GitHub) triggers deployment from latest commit; Upload zips the local directory and uploads; Docker image deploys the specified image.
  - Variants: `createos deploy --branch staging`, `createos deploy --image myapp:v1.0`.
  - Verify: `createos status`, `createos open`, `createos deployments logs -f`.
  - Next steps table: `createos env set KEY=value`, `createos domains add myapp.com`, `createos scale --replicas 2`, `createos cronjobs create`, `createos deploy --project $ID`, `createos --help`.
  - Update: `createos upgrade` or `brew tap nodeops-app/tap` then `brew upgrade createos`. The CLI checks for updates automatically.

## Deployments
- **URL:** https://createos.sh/docs/CLI/Deployments
- **Summary:** Deploy, list, view logs, retrigger, cancel and wake up deployments from the terminal.
- **Key points:**
  - `createos deploy` flags: `--project <id>` (auto-detected from `.createos.json`), `--branch <name>` (VCS projects only), `--image <ref>` (image projects only), `--dir <path>` (upload projects, default `.`).
  - Examples: `createos deploy --branch staging`, `createos deploy --image myapp:v2.0`, `createos deploy --project abc-123-def`.
  - `createos deployments list` (version, status, URL, timestamp).
  - Logs: `createos deployments logs` (runtime); `createos deployments logs -f` (real-time, polls every 2 seconds, `Ctrl+C` to stop); `createos deployments logs -f --interval 5s`; `createos deployments build-logs` (build-time output).
  - `createos deployments retrigger` re-deploys from the same source.
  - `createos deployments cancel` stops a running deployment (`--force` in CI skips confirmation).
  - `createos deployments wakeup` resumes a sleeping deployment.
  - With no deployment ID the CLI lists deployments interactively; in non-interactive mode pass the ID positionally or use `--project` and `--deployment`.

## Environment Variables
- **URL:** https://createos.sh/docs/CLI/Environment-Variables
- **Summary:** List, set, remove, pull and push environment variables between local files and CreateOS.
- **Key points:**
  - `createos env list` (full values by default); `createos env list --hide` masks values.
  - Set: `createos env set DATABASE_URL=postgres://localhost:5432/mydb`; multiple: `createos env set API_KEY=sk-xxx SECRET=my-secret NODE_ENV=production`.
  - Remove: `createos env rm API_KEY`.
  - `createos env pull` writes `.env.<environment-name>` (for example `.env.production`); the CLI auto-adds `.env.*` to `.gitignore`.
  - `createos env push` reads `.env.<environment-name>`, shows the diff, asks confirmation; `--force` skips it in CI.
  - Custom file: `createos env pull --file .env.local`, `createos env push --file .env.staging`.
  - CI: `createos env set DATABASE_URL=$DB_URL --project <id> --environment <id>`; `createos env pull --project <id> --environment <id> --force`.

## Custom Domains
- **URL:** https://createos.sh/docs/CLI/Domains
- **Summary:** Add, verify, list and delete custom domains for a project.
- **Key points:**
  - `createos domains add api.myapp.com` prints required DNS records (example: A record to an IP, TXT `_verify.api` with `createos-verify=<token>`).
  - `createos domains verify` polls every 10 seconds until verified; `createos domains verify --no-wait` checks once.
  - `createos domains list` shows domain, environment, status, message.
  - `createos domains delete` requires confirmation; `--force` in CI.

## Scaling
- **URL:** https://createos.sh/docs/CLI/Scaling
- **Summary:** Adjust replicas, CPU and memory for project environments.
- **Key points:**
  - View: `createos scale --show` (example output: Replicas 1, CPU 200m, Memory 512MB).
  - Scale: `createos scale --replicas 2 --cpu 300 --memory 512` (shows before/after).
  - Limits (validated by the CLI): Replicas 1 to 3; CPU 200m to 500m; Memory 500MB to 1024MB. Higher limits: contact support or use the Enterprise plan.
  - One dimension at a time: `createos scale --replicas 3`, `createos scale --cpu 500`, `createos scale --memory 1024`.

## Cron Jobs
- **URL:** https://createos.sh/docs/CLI/Cron-Jobs
- **Summary:** Create and manage HTTP cron jobs that call API endpoints on a schedule.
- **Key points:**
  - Create interactively: `createos cronjobs create`.
  - Create non-interactively:
    ```bash
    createos cronjobs create \
      --name "nightly-cleanup" \
      --schedule "0 0 * * *" \
      --path /api/cleanup \
      --method POST
    ```
  - Other subcommands: `createos cronjobs list`, `createos cronjobs get` (name, schedule, HTTP settings, status, last and next run), `createos cronjobs update --name "new-name" --schedule "*/30 * * * *"` (only given fields change), `createos cronjobs suspend`, `createos cronjobs unsuspend`, `createos cronjobs activities` (recent runs with status, duration, HTTP codes), `createos cronjobs delete` (`--force` skips prompt).
  - Cron syntax examples: `* * * * *` every minute; `*/5 * * * *` every 5 minutes; `0 * * * *` every hour; `0 0 * * *` daily at midnight; `0 0 * * 1` every Monday at midnight; `0 0 1 * *` first day of every month.

## Sandboxes
- **URL:** https://createos.sh/docs/CLI/Sandbox
- **Summary:** Stub page: the sandbox CLI docs moved to the dedicated Sandbox section.
- **Key points:**
  - Sandbox Overview: https://createos.sh/docs/Sandbox/Overview
  - CLI Overview (installation, authentication, global flags, quickstart): https://createos.sh/docs/Sandbox/CLI/Overview
  - Command Reference (every subcommand, flag table, usage example): https://createos.sh/docs/Sandbox/CLI/Commands
  - Sandbox command alias: `createos sb`; sandbox subcommands are listed in [[Docs - CLI - Command Reference]] and covered in [[Docs - Sandbox CLI]].

## CI/CD Usage
- **URL:** https://createos.sh/docs/CLI/CI-CD
- **Summary:** Every CLI command works non-interactively using flags, `--output json` and `--force`.
- **Key points:**
  - Auth in CI: `createos login --token` (API token via environment variable or piped; key from **Profile Settings > API Keys**).
  - Deploy: `createos deploy --project $CREATEOS_PROJECT_ID`
  - Env from CI secrets:
    ```bash
    createos env set \
      DATABASE_URL=$DB_URL \
      API_KEY=$API_KEY \
      --project $CREATEOS_PROJECT_ID \
      --environment $CREATEOS_ENV_ID
    ```
  - Push a .env file: `createos env push --file .env.production --project $ID --environment $ID --force`
  - Status as JSON: `createos status --project $ID --output json`
  - Delete without prompts:
    ```bash
    createos domains delete --project $ID --domain $DOMAIN_ID --force
    createos deployments cancel --project $ID --deployment $DEPLOY_ID --force
    createos cronjobs delete --project $ID --cronjob $CRON_ID --force
    ```
  - JSON output: `--output json` or `-o json` on list/get commands; examples: `createos projects list --output json`, `createos status --output json | jq '.project.status'`, `DEPLOY_URL=$(createos deployments list -o json | jq -r '.[0].extra.endpoint')`.
  - GitHub Actions example:
    ```yaml
    name: Deploy to CreateOS
    on:
      push:
        branches: [main]

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4

          - name: Install CreateOS CLI
            run: curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -

          - name: Authenticate
            run: createos login --token
            env:
              CREATEOS_API_KEY: ${{ secrets.CREATEOS_API_KEY }}

          - name: Deploy
            run: createos deploy --project ${{ vars.PROJECT_ID }}
    ```
  - CLI environment variables: `CREATEOS_API_URL` (override API base URL; default `https://api-createos.nodeops.network`), `CREATEOS_DEBUG` (`true` enables debug logging), `CREATEOS_OUTPUT` (`json` for JSON output on all commands).
  - Non-TTY behaviour: skips prompts, requires explicit flags for project, environment and deployment, returns clear errors when missing, outputs JSON by default when piped. Example error: `Error: non-interactive mode: use --project and --environment flags`.

## Troubleshooting
- **URL:** https://createos.sh/docs/CLI/Troubleshooting
- **Summary:** Common CLI errors with causes and fixes.
- **Key points:**
  - "you're not signed in": run `createos login` (CI: `createos login --token`).
  - "no project linked to this directory": no `.createos.json` found; run `createos init` or `createos deploy --project <your-project-id>`; find IDs with `createos projects list`.
  - "command not found: createos": Homebrew install, run `brew link createos`; curl install places the binary in `/usr/local/bin` (check `ls -la /usr/local/bin/createos`, else reinstall with the curl installer).
  - Deploy hangs or times out: `createos deployments build-logs`; then `createos deployments cancel` and `createos deploy`; use `createos --debug deploy` to see HTTP requests.
  - Interactive prompts not working (non-TTY): pass explicit flags, for example `createos env list --project <id> --environment <id>`, and `--force` for confirmations.
  - "environment not found": `createos environments list`; use `createos env list --environment <env-id>`; re-link with `createos init --project <project-id>`.
  - Update: `createos upgrade` or `brew upgrade createos`; check `createos version`.
  - Debug: `createos --debug status` (tokens are masked).
  - Help: `createos <command> --help`; bugs: https://github.com/NodeOps-app/createos-cli/issues

## Related
- Up: [[CreateOS Docs]]
- [[Docs - CLI - Command Reference]]: every command and flag (split from this note)
- [[Docs - Sandbox CLI]]: sandbox subcommands in the Sandbox docs
- [[Docs - Sandbox]]: Sandbox docs hub
- [[Product - CLI]]: CLI product page
- [[Repo - createos-cli]]: source repository
- [[Hackathon Setup Guide]]: hackathon setup
- [[Docs - Get Started]]: dashboard tutorials
- [[Docs - API and MCP]]: API and MCP alternatives to the CLI
