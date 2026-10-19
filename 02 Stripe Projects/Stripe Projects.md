---
aliases:
  - Stripe Projects CLI
  - projects.dev
tags:
  - stripe/projects
  - type/hub
source: https://docs.stripe.com/projects
sources:
  - https://docs.stripe.com/projects
  - https://docs.stripe.com/cli/projects
  - https://docs.stripe.com/projects/templates
  - https://docs.stripe.com/projects/paid-tier-countries
  - https://docs.stripe.com/projects/facilitator-countries
  - https://docs.stripe.com/projects/provider-intake
  - https://docs.stripe.com/provisioning
  - https://projects.dev/llms.txt
scraped: 2026-10-17
up: "[[Home]]"
---

# Stripe Projects

> [!summary] Summary
> - **Stripe Projects** is a Stripe CLI plugin that provisions and manages third-party services (hosting, databases, auth, AI, analytics, observability) from the terminal, syncs their credentials to `.env`, and handles billing through Stripe.
> - Install: `stripe plugin install projects` (Stripe CLI 1.40.0+). Agent skill: `npx skills add https://docs.stripe.com --skill stripe-projects -g -y`.
> - 66 providers on docs.stripe.com, 68 on projects.dev, including **CreateOS** (`createos/project`).
> - Developer preview: commands and flags might change. Free to use; you pay providers at their standard rates (projects.dev).
> - Source: https://docs.stripe.com/projects

## What it is

- Docs page title: "Stripe Projects CLI". Tagline: "Add third-party services to your app, sync credentials to your project, and manage upgrades."
- Run one command to create your provider accounts, sync credentials to your `.env`, and handle billing through Stripe.
- A **project** represents one app or codebase. It groups **provider accounts**, their **services**, and the **resources** (instances plus credentials) you provision.
- Credentials are encrypted in `.projects/vault/vault.json` and stored in the Stripe Secret Store; plaintext copies go to `.env` (or a named environment's file).
- Services live in provider accounts you own; paid upgrades use Stripe Shared Payment Tokens.
- Website: https://projects.dev · Provider catalog: https://projects.dev/providers · Template catalog: https://projects.dev/templates/

## Workflow

```bash
stripe plugin install projects        # 1. install the plugin
stripe projects init                  # 2. create a project (and sign in)
stripe projects catalog               # 3. discover services
stripe projects add supabase/project  # 4. provision resources
stripe projects add vercel/project
stripe projects env --pull            # 5. sync credentials to .env
stripe projects billing add           # 6. add a payment method (paid tiers)
stripe projects upgrade <provider>    # 7. move to a paid tier when needed
```

- Or start from a starter app: `stripe projects build my-app`.
- Or let a coding agent drive it: describe the stack, the agent runs the same commands.

## Notes in this section

| Note | Covers |
| --- | --- |
| [[Stripe Projects - Getting Started]] | Install (CLI, plugin, skill), quickstart, concepts, `.projects/` file reference, workflow scenarios |
| [[Stripe Projects - Commands]] | Every command, argument, flag and example; global flags; projects.dev-only commands |
| [[Stripe Projects - Environments and Credentials]] | Vault and Secret Store, `env --pull`, project variables, named environments, production env vars |
| [[Stripe Projects - Billing and Spend Limits]] | Payment method, upgrades and Shared Payment Tokens, `spend`, spend limits |
| [[Stripe Projects - Agent Integration]] | Coding-agent use, bootstrap workflow, rules, error recovery, the `stripe-projects` skill |
| [[Stripe Projects - Providers]] | Full provider lists (docs and projects.dev with service slugs), category counts, provider intake |
| [[Stripe Projects - Templates]] | `stripe projects build`, manifest format, registry, tier plans, current template catalog |
| [[Stripe Projects - Paid Tier Countries]] | Countries where paid tiers are supported |
| [[Stripe Projects - Facilitator Countries]] | Countries where Stripe handles indirect taxes |
| [[Stripe Projects - Provisioning API]] | Platform-side `/v2/provisioning` API (private preview) |

## Source pages

| Page | URL |
| --- | --- |
| Stripe Projects CLI (main docs) | https://docs.stripe.com/projects |
| CLI reference (one page per command under `/cli/projects/`) | https://docs.stripe.com/cli/projects |
| Create a build template | https://docs.stripe.com/projects/templates |
| Paid tier countries | https://docs.stripe.com/projects/paid-tier-countries |
| Facilitator countries | https://docs.stripe.com/projects/facilitator-countries |
| Provider intake | https://docs.stripe.com/projects/provider-intake |
| Integrate the Provisioning API | https://docs.stripe.com/provisioning |
| projects.dev llms.txt | https://projects.dev/llms.txt |
| projects.dev agent skill | https://projects.dev/skill.md |

## Contacts

- Provider requests and partnerships: provider-request@stripe.com
- Provisioning API private preview: provisioning-preview@stripe.com

## Related
- Up: [[Home]]
- [[CreateOS on Stripe Projects]]: CreateOS as a Stripe Projects provider (plans, commands)
- [[Hackathon Overview]]: the CreateOS × Stripe Projects hackathon
- [[Hackathon Setup Guide]]: setup steps for the event
- [[Integration - Stripe]]: CreateOS Stripe integration page
- [[Docs - Services]]: CreateOS docs Services section, which includes Stripe Projects
- [[Ideas - Stretch]]: stretch ideas for the hackathon
