---
aliases:
  - Stripe Projects Credentials
  - Stripe Projects Environments
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/projects
sources:
  - https://docs.stripe.com/projects
  - https://docs.stripe.com/cli/projects/env
  - https://projects.dev/llms.txt
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Environments and Credentials

> [!summary] Summary
> - Credentials are fetched from each provider, encrypted in `.projects/vault/vault.json`, and stored in the Stripe **Secret Store**.
> - Local output: `.env` for the default environment, or a configured file such as `.env.dev` / `.env.production` for named environments. Files are created with `600` permissions.
> - `stripe projects env --pull` syncs the active environment; it runs automatically after provision, rotate, upgrade, or membership changes.
> - Production hosts are **not** configured automatically. Copy credentials into your host's env settings yourself.
> - Source: https://docs.stripe.com/projects

## How credentials work

- Stripe Projects fetches credentials from each provider on your behalf.
- It encrypts them in `.projects/vault/vault.json` and stores them in the Stripe [Secret Store](https://docs.stripe.com/stripe-apps/store-secrets).
- **Local files**
  - `.projects/vault/vault.json`: encrypted copy of your credentials.
  - `.env`: default output for local development.
  - Named environments write to their configured output file, such as `.env.dev` or `.env.production`.
  - Output files are created with `600` permissions, so only you can read them on your machine.
  - Do not commit credential files. `stripe projects init` adds them to `.gitignore` automatically.
- **On removal**
  - `stripe projects remove <service>` deprovisions the resource and removes it from project state.
  - The CLI does not delete credentials already written to `.env` or `.projects/vault/`.
  - Remove them manually, or run `stripe projects env --pull` to overwrite them with the current set.
- Each teammate runs `stripe projects env --pull` on their own machine to fetch their own credentials from the Stripe Secret Store. The vault is "a local credential cache, not a shared secrets distribution system".

## List variables

```bash
stripe projects env
```

- Displays all project environment variables. Values are not revealed.
- Environment variables also sync automatically after resource provisioning.

## Sync variables

```bash
stripe projects env --pull
```

- Updates the active environment's output file and replenishes the credentials vault.
- Default environment: writes to `.env` unless you configured a different output path.
- Named environments: writes to the output file set when you created or updated the environment.

### When to run env --pull

Runs automatically after you:

- provision a service
- rotate credentials
- upgrade a resource
- change environment membership

Run it manually when:

- You set up the project on a new machine or after cloning the repo.
- A teammate provisioned or rotated a resource and you need the updated credentials.
- Your `.env` was deleted or corrupted and you need to restore it.
- You want to verify that local credentials match the current project state.
- You switched environments with `stripe projects env use` and need that environment's credentials locally.
- A project variable changed remotely and you want to update its local output file.

## Project variables

Project variables hold environment variables that do not come from a provisioned provider resource, such as app URLs, feature flags, or API keys you manage yourself.

| Action | Command |
| --- | --- |
| Set a variable and bind it to the active environment | `stripe projects variables set <name> --env-key <ENV_KEY> --value <value>` |
| List variables and their local bindings | `stripe projects variables list` |
| Delete a variable and remove its local bindings | `stripe projects variables delete <name>` |
| Bind an existing variable to the active environment | `stripe projects env add <name> --variable --env-key <ENV_KEY>` |
| Unbind from the active environment (keep the stored variable) | `stripe projects env remove <name> --variable` |

- The variable **name** identifies the stored value in Stripe Projects.
- `--env-key` is the key written to the active environment's output file.
- `variables set` syncs the output immediately.
- Omitting `--value` in interactive mode prompts for the value securely.
- Stripe Projects preserves local environment keys that it does not manage.

Example: different stored values per environment, same env key:

```bash
stripe projects env create development --output .env.dev
stripe projects variables set api-url-dev --env-key API_URL --value https://dev.example.com

stripe projects env create production --output .env.production
stripe projects variables set api-url-prod --env-key API_URL --value https://api.example.com
```

## Multiple environments

Each environment has:

- A name, such as `default`, `development`, `staging`, or `production`.
- An output file, such as `.env`, `.env.dev`, or `.env.production`.
- A set of project resources whose credentials are written to that output file.

Local commands use the **active environment**. Commands that add resources or sync credentials target it. The active environment is local to each checkout; switching does not change it for teammates.

| Action | Command |
| --- | --- |
| List environments | `stripe projects env list` |
| Show the active environment | `stripe projects env show` |
| Create an environment and make it active | `stripe projects env create development --output .env.dev` |
| Switch the active environment | `stripe projects env use default` / `stripe projects env use development` |
| Rename the active environment | `stripe projects env update --name staging` |
| Change the active environment's output file | `stripe projects env update --output .env.staging` |
| Delete an environment | `stripe projects env delete staging` |

- You can't delete the last environment or the virtual `default` environment.
- After switching, `stripe projects add` provisions into the active environment, and `env --pull` writes that environment's output file.

```bash
# Add a database to the active development environment
stripe projects env use development
stripe projects add neon/postgres --name dev-db
stripe projects env --pull

# Switch back to the default environment and pull its credentials
stripe projects env use default
stripe projects env --pull
```

### Environment resources

Membership controls which project resources contribute credentials to the active environment's output file.

```bash
stripe projects env add <resource_name>      # add an existing resource to the active environment
stripe projects env remove <resource_name>   # remove a resource from the active environment
```

- These commands only change membership. They don't provision, remove, or rotate provider resources.
- To remove a provider resource from the project, use `stripe projects remove`.
- Find resource names with `stripe projects status` or `stripe projects services list`.

## Production environment variables

- `stripe projects env --pull` writes credentials only to the active environment's local output file. It doesn't write variables to your production host.
- To use the same credentials in production, add them to your host's environment variable settings. "Stripe Projects doesn't automate this step."
- Many providers have their own CLI tools that can read a `.env` file. Check your provider's docs for the import workflow.
- projects.dev "Deployment" section: to deploy a project provisioned with Stripe Projects, make these available on the remote host:
  - `.projects/state.json`
  - `.projects/state.local.json`
  - Credentials from `stripe projects env --pull` (or the `.env` file)
- projects.dev: deploying may require provisioning a compute provider (for example Vercel or Railway) first.

## Credential rules for agents

- Never display environment variable values, only names (docs agent rules).
- Don't hand-edit `.projects/` or `.env`; the CLI is authoritative.
- projects.dev: never read the `.env` file directly to discover what's available; use `stripe projects env` instead. Never read or edit files in `.projects/` directly.

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Commands]]: `env` and `variables` syntax
- [[Stripe Projects - Getting Started]]: file reference and `.gitignore` rules
- [[Stripe Projects - Agent Integration]]: agent rules
- [[CreateOS on Stripe Projects]]: CreateOS credentials injected into `.env`
