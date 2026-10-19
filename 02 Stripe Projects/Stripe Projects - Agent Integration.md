---
aliases:
  - Stripe Projects agent skill
  - Stripe Projects for coding agents
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/projects
sources:
  - https://docs.stripe.com/projects
  - https://projects.dev/skill.md
  - https://projects.dev/llms.txt
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Agent Integration

> [!summary] Summary
> - Install the agent skill: `npx skills add https://docs.stripe.com --skill stripe-projects -g -y` (docs) or `npx skills add https://github.com/stripe/ai --skill stripe-projects -y -g` (projects.dev).
> - `stripe projects init` writes a local `stripe-projects-cli` skill into the project; agents hand off to it after init.
> - Agents use the same CLI commands, with `--json` (all commands except `init`) and `--no-interactive --auto-confirm` for unattended runs.
> - Rules: never display env var values; never fabricate providers or commands; never hand-edit `.projects/` or `.env`.
> - Source: https://docs.stripe.com/projects

## Use a coding agent

- After `init`, Stripe Projects writes coding agent skills into the local project directory. They give the agent context and actions for the Stripe Projects workflow.
- Example requests from the docs:
  - "Link my existing Neon account and provision a database."
  - "Add Turso auth and PostHog on the free tier."
  - "Set up the services this repo needs and explain what changed."
- The agent uses the same CLI commands. Provisioning, upgrades, configuration, and credential sync follow the same deterministic, auditable path as the CLI.

### Avoid browser pop-ups

To avoid browser pop-ups during provisioning and credential exchange:

1. Sign in to your Stripe account.
2. Associate your existing provider account (or create a new one) with `stripe projects link`.
3. Add a payment method with `stripe projects billing add`.
4. Start the agent session.

## Agent integration guide (docs.stripe.com)

### When to use Stripe Projects

Use it when the user asks to:

- Provision a database, cache, auth service, hosting, analytics, observability, or any third-party infrastructure.
- Get an API key, credentials, secret, or token for a third-party service.
- Sign up for or connect a service like Neon, Supabase, PlanetScale, Upstash, Clerk, Auth0, WorkOS, Vercel, Netlify, Railway, Render, Fly.io, Cloudflare, PostHog, Mixpanel, Amplitude, OpenRouter, Elevenlabs, Twilio, Resend, Algolia, Chroma, Turso, Inngest, Browserbase, Daytona, Privy, Squarespace, GitLab, AgentMail.
- Set up an LLM provider, model provider, vector database, message queue, object storage, email sending, search, or feature flags.
- Browse available services, check project status, list provisioned resources, or view environment variables.
- Anything mentioning projects.dev, Stripe Projects, the Stripe Projects catalog, or adding/provisioning/connecting a cloud service.

The guide says not to tell the user to sign up manually for these services: check the Projects catalog first and provision programmatically.

### Bootstrap workflow

| Step | Action | Commands |
| --- | --- | --- |
| 1 | Verify the Stripe CLI is installed (needs 1.40.0 or later) and install the plugin | `which stripe && stripe --version`; macOS `brew install stripe/stripe-cli/stripe` (or `brew upgrade stripe/stripe-cli/stripe`); other platforms https://docs.stripe.com/stripe-cli/install; then `stripe plugin install projects` |
| 2 | Search the catalog to confirm the service exists; browse the full catalog if the request is vague | `stripe projects search <query> --json`; `stripe projects catalog --json` |
| 3 | Initialize if not already | `stripe projects status --json`; `stripe projects init --yes` |
| 4 | Hand off to the locally installed `stripe-projects-cli` skill for `add`, `link`, `env`, `rotate`, `upgrade`, `remove` | — |

- If the CLI opens a browser for authentication, stop and tell the user to complete sign-in. Run no further commands until they confirm.
- Skill location after init:
  - docs.stripe.com: `.skills/stripe-projects-cli/`
  - projects.dev skill: `.claude/skills/stripe-projects-cli` (check with `test -f .claude/skills/stripe-projects-cli/SKILL.md && echo "OK" || echo "MISSING"`; if `MISSING`, re-run `stripe projects init --yes`)

### Rules

- Never display environment variable values, only names.
- Never fabricate provider names or commands not in the catalog output.
- Don't hand-edit `.projects/` or `.env`; the CLI is authoritative.
- Use `--json` on all commands except `init`.

### Error recovery

| Error | Recovery |
| --- | --- |
| `PROVIDER_NOT_LINKED` | Run `stripe projects link <provider>` (may open a browser; provider requires OAuth linking) |
| `UNKNOWN_ERROR` | Show the full error; suggest `--debug` |
| Service not in catalog | Inform the user; suggest browsing the catalog (`stripe projects catalog --json`) |
| CLI not found | Install per the platform instructions (Homebrew on macOS, or https://docs.stripe.com/stripe-cli/install) |

## The stripe-projects skill (projects.dev/skill.md)

- Frontmatter: `name: stripe-projects`, `user-invocable: true`.
- `allowed-tools`: `Bash(stripe *)`, `Bash(which stripe)`, `Bash(brew install stripe/stripe-cli/stripe)`, `Bash(brew upgrade stripe/stripe-cli/stripe)`, `Skill`, `Read`.
- Trigger phrases include: "I need a database", "set up auth", "add caching", "give me a Postgres", "provision Redis", "I need hosting", "add a vector DB", "get me an API key for X", "show me the catalog", "add an LLM provider", "add email sending", "add a message queue", "set up object storage", "add feature flags".
- Workflow: verify provider → install CLI → install plugin → search catalog → init project → add service → hand off.
- Step 1 install options: `npm install -g @stripe/cli@latest` (any platform with Node); `brew install stripe/stripe-cli/stripe` (macOS); docs link for Windows, Linux, Docker.
- Step 2: if `result_count` is 0, report that the service was not found and stop.
- Step 3: `stripe projects init --yes` (no `--json`).
- Step 5 summary format after adding a service:

| Field | Value |
|-------|-------|
| Provider | `<provider name>` |
| Service | `<service type>` |
| Tier | `<tier>` |
| Env vars | `<variable names only — never values>` |

- Then suggest 3–5 complementary services from other catalog categories, only ones present in `stripe projects catalog --json`.

### CLI as source of truth

| Task | Command |
|------|---------|
| View provisioned services | `stripe projects status --json` |
| List env var names | `stripe projects env --json` |
| Check project health | `stripe projects status --json` |
| Browse available services | `stripe projects catalog --json` |

- Inspect `.projects/` or `.env` directly only if the user explicitly asks.

## Agent usage (projects.dev/llms.txt)

1. Run `stripe projects status` to inspect project state.
2. Use `stripe projects catalog` to discover services.
3. Provision with `stripe projects add <provider>/<service>`.
4. Access credentials via `stripe projects env` or the synced `.env`.
5. Use `--json` on any command for structured output.
6. Use `--no-interactive --auto-confirm` in automated workflows.

Rules:

- Never read or edit files in `.projects/` directly.
- Never read `.env` directly to discover what's available; use `stripe projects env`.
- Commands work from the project root or any nested directory.

## LLM context file

```bash
stripe projects llm-context
```

- Writes a combined file of project context plus all provider-supplied LLM context files.
- CLI reference: the file is `AGENTS.md` with provider documentation, quickstart instructions, and environment variable names, for Claude, Codex, Gemini, Cursor, and similar tools.

## Machine-readable resources on projects.dev

| URL | Purpose |
| --- | --- |
| `https://projects.dev/llms.txt` | Curated overview for LLMs |
| `https://projects.dev/skill.md` | Stripe Projects agent skill |
| `https://projects.dev/.well-known/agent-skills/index.json` | Agent skill discovery document |
| `https://projects.dev/index.html.md` | Markdown rendering of the home page (also served for `/` with `Accept: text/markdown`) |
| `https://projects.dev/api/openapi.json` | OpenAPI 3.1 of the read-only public site API (not the product API; provisioning happens in the CLI) |
| `https://projects.dev/api/health` | Health check |

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Getting Started]]: install commands
- [[Stripe Projects - Commands]]: global flags and full command list
- [[Stripe Projects - Environments and Credentials]]: credential handling rules
- [[Hackathon Setup Guide]]: hackathon environment setup
- [[Hackathon Overview]]: event built around agents that run code
