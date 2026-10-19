---
aliases:
  - Get started with CreateOS on Stripe Projects
  - createos/project
tags:
  - createos/docs
  - createos/docs/services
  - stripe/projects
  - type/page
source: https://createos.sh/docs/Services/Stripe-Projects
sources:
  - https://createos.sh/docs/Services/Stripe-Projects
  - https://projects.dev/providers/
  - https://docs.stripe.com/projects
scraped: 2026-10-17
up: "[[Docs - Services]]"
---

# CreateOS on Stripe Projects

> [!summary] Summary
> - Add CreateOS to a Stripe project with `stripe projects add createos/project`: it creates your CreateOS account and injects credentials into `.env`. "No signup and no manual setup."
> - Plans: **Free $0**, **Beginner $10/month**, **Pro $75/month**, **Enterprise $200/month**.
> - Change plan with `stripe projects update createos-plan --service <plan>`; upgrades are prorated.
> - The CreateOS CLI reads the `.env` credentials automatically: `createos whoami`, `createos projects list`, `createos deploy`.
> - Source: https://createos.sh/docs/Services/Stripe-Projects

## Catalog entry

| Field | Value | Source |
| --- | --- | --- |
| Provider | CreateOS | projects.dev, docs.stripe.com |
| Service slug | `createos/project` | projects.dev |
| Categories | Sandbox, Hosting | projects.dev |
| Primary category | Compute | docs.stripe.com provider table |
| Description | "Compute infrastructure for AI workloads. Provision and manage GPU and CPU resources on demand." | projects.dev |
| Install command | `stripe projects add createos/project` | projects.dev, CreateOS docs |

## 1. Add CreateOS to your project

```bash
stripe projects add createos/project
```

- Creates your CreateOS account.
- Injects credentials into your `.env` automatically.
- Stripe docs quickstart order: `stripe plugin install projects` → `stripe projects init` → `stripe projects add …`. See [[Stripe Projects - Getting Started]].

## 2. Check your account

```bash
createos whoami
```

```text
Hey, you@example.com!

  Email         you@example.com
  Plan          free-plan
  Member since  July 10, 2026
```

- The sample output shows `Plan  free-plan`.

## 3. Pick a plan

| Plan | Price |
| --- | --- |
| Free | $0 |
| Beginner | $10/month |
| Pro | $75/month |
| Enterprise | $200/month |

Subscribe to a paid plan directly:

```bash
stripe projects add createos/pro-monthly
```

- Plan service names used in the docs commands: `free`, `beginner-monthly`, `pro-monthly`, `enterprise-monthly`.
- Paid tiers need a payment method on file (`stripe projects billing add`) and a supported country. See [[Stripe Projects - Billing and Spend Limits]] and [[Stripe Projects - Paid Tier Countries]].

## 4. Upgrade or downgrade anytime

```bash
# Upgrade
stripe projects update createos-plan --service enterprise-monthly

# Downgrade
stripe projects update createos-plan --service beginner-monthly

# Switch to free
stripe projects update createos-plan --service free
```

- "Upgrades are prorated, so you only pay the difference for the remaining days."
- The resource name used in these commands is `createos-plan`.

## 5. Start building

Credentials are already in `.env`. The CreateOS CLI picks them up automatically:

```bash
createos projects list
createos deploy
```

- CLI details: [[Docs - CLI]].

## Useful commands

| What | Command |
| --- | --- |
| Browse plans | `stripe projects catalog createos` |
| Check status | `stripe projects status` |
| View credentials | `stripe projects env` |
| Open dashboard | `stripe projects open createos` |
| Cancel plan | `stripe projects remove createos-plan --yes` |

Related generic Stripe Projects commands (from docs.stripe.com):

| What | Command |
| --- | --- |
| Re-sync credentials to `.env` | `stripe projects env --pull` |
| Rotate CreateOS credentials | `stripe projects rotate <resource_name>` |
| Cap CreateOS spend per month (USD) | `stripe projects billing update --limit <amount> --provider <provider>` |
| View spend by provider | `stripe projects spend [provider]` |

## How it works

1. Run `stripe projects add createos/pro-monthly`.
2. Stripe handles billing and creates your account.
3. Credentials are injected into `.env`.
4. The CreateOS CLI reads these automatically, so no config is needed.

- "That's it. From zero to deployed in under a minute."

> [!note] Credential variable names
> The page says credentials are injected into `.env` but lists no variable names (the list after "Credentials are injected into `.env`:" is empty in both the HTML and the `.md` version on 2026-10-17). Use `stripe projects env` to list the names.

## Limits and credits

- The Stripe Projects page itself states no resource limits per plan.
- CreateOS deployments consume resource credits from your account balance (Services pages: "Credits are consumed based on compute resources, disk size, and running time"). See [[Docs - Services]].
- Per-plan sandbox limits and pricing: [[Pricing - Sandbox]] and [[Docs - Sandbox]].

## Related
- Up: [[Docs - Services]]
- [[Stripe Projects]]: the Stripe Projects hub
- [[Stripe Projects - Providers]]: CreateOS in the provider catalog
- [[Stripe Projects - Commands]]: `add`, `update`, `remove`, `env`, `open`
- [[Docs - CLI]]: the `createos` CLI that reads the credentials
- [[Pricing - Sandbox]]: CreateOS sandbox pricing
- [[Docs - Sandbox]]: CreateOS Sandbox docs
- [[Hackathon Setup Guide]]: hackathon setup steps
- [[Hackathon Overview]]: the CreateOS × Stripe Projects hackathon
- [[Integration - Stripe]]: CreateOS Stripe integration page
