---
aliases:
  - Stripe Projects Quickstart
  - Install Stripe Projects
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/projects
sources:
  - https://docs.stripe.com/projects
  - https://docs.stripe.com/cli/projects
  - https://docs.stripe.com/cli/projects/init
  - https://projects.dev/llms.txt
  - https://projects.dev/index.html.md
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Getting Started

> [!summary] Summary
> - Stripe Projects is a **plugin for the Stripe CLI** that provisions third-party services (hosting, databases, auth, AI, observability, …) from the terminal and syncs their credentials to `.env`.
> - Install: Stripe CLI **1.40.0 or later**, then `stripe plugin install projects`.
> - Quickstart: `stripe projects init` → `stripe projects add <provider>/<service>` → `stripe projects env --pull`.
> - Status: **developer preview**; commands and flags might change.
> - "Free to use. You pay providers directly at their standard rates." (projects.dev)
> - Source: https://docs.stripe.com/projects

## What it is

- Provisions and manages third-party services (hosting, databases, auth, AI, observability) from the terminal.
- One command creates your provider accounts, syncs credentials to your `.env`, and handles billing through Stripe.
- Three headline capabilities (docs.stripe.com):
  - **Provision** services from 60+ providers. No separate dashboards.
  - **Sync** credentials to `.env` automatically. No copy-pasting API keys.
  - **Manage** plans, billing, environments, and keys from the CLI or your coding agent.
- Extra points from projects.dev:
  - It does not generate an application or write code. It supplies the infrastructure under your existing stack.
  - Services are created in provider accounts that you own. You can leave at any time and keep everything ("No vendor lock-in").
  - Every operation is a single command with structured output, so a person or an agent can drive it the same way.
  - Feature list: Programmatic, Secure credentials, Portable, Billing in one place, No vendor lock-in.
  - Pricing: "Free to use. You pay providers directly at their standard rates."
- CLI reference notice: "Stripe Projects is currently in developer preview. Commands and flags might change." Run `stripe projects --help` or `stripe projects <command> --help` for the reference of your installed version.

## Install the Stripe CLI and the plugin

Check the Stripe CLI (agent bootstrap step 1 in the docs):

```bash
which stripe && stripe --version
```

If the CLI is missing or below **1.40.0**:

| Platform | Command or action |
| --- | --- |
| macOS (Homebrew) | `brew install stripe/stripe-cli/stripe` (or `brew upgrade stripe/stripe-cli/stripe`) |
| Any platform with Node (projects.dev) | `npm install -g @stripe/cli@latest` |
| Windows, Linux, Docker, other | https://docs.stripe.com/stripe-cli/install |

Install or upgrade the Projects plugin:

```sh
stripe plugin install projects
```

```sh
stripe plugin upgrade projects
```

One-line installs published on projects.dev:

```bash
# CLI + plugin
npm install -g @stripe/cli@latest && stripe plugin install projects

# macOS Homebrew
brew install stripe/stripe-cli/stripe && stripe plugin install projects

# CLI + plugin + agent skill
npm install -g @stripe/cli@latest && stripe plugin install projects && npx skills add https://github.com/stripe/ai --skill stripe-projects -y -g
```

## Install the agent skill

Two published skill install commands (both name the skill `stripe-projects`):

| Source | Command |
| --- | --- |
| docs.stripe.com/projects ("Start with a coding agent") | `npx skills add https://docs.stripe.com --skill stripe-projects -g -y` |
| projects.dev/llms.txt | `npx skills add https://github.com/stripe/ai --skill stripe-projects -y -g` |

- Works in Claude Code, Cursor, Codex, or any MCP-compatible coding agent.
- Manual alternative (projects.dev): fetch https://projects.dev/skill.md and save it as `SKILL.md` inside `.claude/skills/stripe-projects-provision/` (or your agent's equivalent skills directory).
- Then describe the stack to your agent, for example:

```
"Use Stripe Projects to set up a Next.js app with Supabase, Vercel, and PostHog."
```

- The agent installs the CLI plugin, runs `stripe projects init`, adds your services, and syncs credentials automatically.
- Details: [[Stripe Projects - Agent Integration]].

## Quickstart

Install the plugin, create a project, add services, and pull credentials to your local environment:

```bash
stripe plugin install projects
stripe projects init
stripe projects add supabase/project
stripe projects add vercel/project
stripe projects env --pull
```

projects.dev variant of the same flow:

```bash
stripe projects init                 # Create a project and sign in
stripe projects catalog              # Find a service
stripe projects search <keyword>
stripe projects add neon/postgres    # Services are addressed as <provider>/<service>
stripe projects env --pull           # Pull generated credentials into .env
```

## How it works

A Stripe project represents a single app or codebase. It groups a provider account's services and resources.

| Concept | Meaning | Examples |
| --- | --- | --- |
| **Provider account** | Your account with the provider | Vercel, Supabase, Clerk, PostHog |
| **Service** | The provider's product offering | database, authorization, analytics |
| **Resource** | An instance of the service for your account, with its credentials and environment variables | `test-db-1`, `auth`, `test-analytics-1` |

A project lets you:

- Associate an existing provider account or create a new one.
- Provision resources, such as databases, authorization instances, and analytics projects.
- Store credentials in the vault and sync them to your environment (`.env`) as environment variables.
- Manage named environments, such as `development`, `staging`, and `production`, each with its own output file and set of resources.
- Manage upgrades and rotate credentials.

Account association rules:

- A provider account associated with your Stripe account stays authorized until you explicitly remove the association.
- You can reuse a provider account for new projects with the same Stripe account.
- A different Stripe account requires associating the provider account again.

When you provision a service, Stripe Projects (projects.dev):

1. Creates the resource in the provider account you own.
2. Generates credentials.
3. Syncs credentials to your local environment (`.env`).
4. Stores configuration in `.projects/`.

## Create a project

```bash
stripe projects init [name]
```

- Initializes a Stripe project for the current directory. Without a name, the folder name is used.
- Works in a new directory or an existing codebase. In an existing codebase, new credentials and environment variables merge with the existing `.env` and project configuration.
- Writes project state under `.projects/`. `.projects/state.json` shows the tools your project uses.
- `.projects/state.local.json` holds the resource IDs your team needs to share the same project state.
- Adds credential paths to `.gitignore` automatically.
- Also creates `AGENTS.md`, an LLM context file listing provider docs and env var names (CLI reference).
- Writes coding agent skills into the local project directory (see [[Stripe Projects - Agent Integration]]).
- Agent form used in the bootstrap workflow: `stripe projects init --yes`.
- `--from <url>` initializes from a shared stack URL (see [[Stripe Projects - Commands]]).

### File reference

| File or folder | Purpose | Commit to version control? |
| --- | --- | --- |
| `state.json` | Shared project state: services, resources, environment definitions, output file paths, and configuration your team uses | Yes |
| `state.local.json` | Local overrides and machine-specific settings: associations between project resources and your personal provider accounts, backend resource IDs, and the active environment on this machine | Yes (see note 1) |
| `.projects/vault/` | Encrypted credential cache written by the CLI after provisioning or `env --pull` | No, added to `.gitignore` automatically (see note 2) |
| `.projects/cache/` | CLI metadata cache used for performance | No, added to `.gitignore` automatically |
| `.env`, `.env.*` | Plaintext credentials for local development, written by `env --pull` for the active environment | No, added to `.gitignore` automatically |

1. Despite the `.local` name, you commit `state.local.json`. Teammates need it to link their own accounts with `stripe projects link`. Without it, teammates get an error when they try to link. The active environment stays local to each checkout.
2. The vault is a local credential cache, not a shared secrets distribution system. Each teammate runs `stripe projects env --pull` to fetch their own credentials from the Stripe Secret Store.

> [!note] Source difference
> The CLI reference page for `projects init` lists `.projects/state.local.json` as "Local machine associations (do not commit)". The main docs page and projects.dev list it as committed ("Yes").

Files that `stripe projects init` creates (CLI reference):

- `.projects/state.json`: Shared project state (safe to commit)
- `.projects/state.local.json`: Local machine associations
- `.projects/vault/vault.json`: Encrypted credential cache (do not commit)
- `.env`: Plaintext environment variables for local development (do not commit)
- `AGENTS.md`: LLM context file listing provider docs and env var names

## Integrate projects into your workflow

| Scenario | What to do |
| --- | --- |
| Start a new project | Create a project, associate or create provider accounts, provision resources (database, authorization, analytics). |
| Add services to an existing codebase | Run `init` in the existing app directory. New credentials and variables merge into the existing `.env` and project configuration. Useful when an app already has hosting but needs a database, auth, analytics, feature flags, or other managed infrastructure. |
| Manage an existing setup | Associate provider accounts you already use with your Stripe account. The project is represented in one place, and you can associate existing resources and add their environment variables. |

## Set up an existing project on another machine

```bash
stripe projects list
stripe projects pull <projectID>
```

- Run `pull` from an empty directory.
- It creates `.projects/state.json` and `.projects/state.local.json`, then writes `.env` by running `env --pull`.
- It connects to the project's existing service instances. It does not provision new ones.

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Commands]]: full command and flag reference
- [[Stripe Projects - Environments and Credentials]]: vault, `.env`, named environments
- [[Stripe Projects - Agent Integration]]: skills and the agent bootstrap workflow
- [[Stripe Projects - Providers]]: what you can add
- [[Hackathon Setup Guide]]: hackathon setup steps
- [[CreateOS on Stripe Projects]]: adding CreateOS with `stripe projects add createos/project`
