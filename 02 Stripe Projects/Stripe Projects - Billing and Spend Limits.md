---
aliases:
  - Stripe Projects Billing
  - Stripe Projects Spend Limits
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/projects
sources:
  - https://docs.stripe.com/projects
  - https://docs.stripe.com/cli/projects/billing
  - https://docs.stripe.com/cli/projects/spend
  - https://docs.stripe.com/cli/projects/upgrade
  - https://projects.dev/llms.txt
  - https://projects.dev/index.html.md
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Billing and Spend Limits

> [!summary] Summary
> - Payment methods belong to your **Stripe account**. Add one once with `stripe projects billing add`; it is required before any paid plan tier.
> - Paid upgrades use a **Shared Payment Token**: the provider charges the token, and your underlying payment credentials aren't shared.
> - Spend caps: `stripe projects billing update --limit <amount> [--provider <provider>]`, monthly, in USD. Per-provider limits override the global one.
> - `stripe projects spend` shows spend by provider; default range is the past 6 months.
> - Paid tiers are limited to [[Stripe Projects - Paid Tier Countries]].
> - Source: https://docs.stripe.com/projects

## Cost model

- projects.dev: "Free to use. You pay providers directly at their standard rates."
- projects.dev "Billing in one place": set up billing once and share it across your stack; upgrade or downgrade tiers, monitor usage, and manage subscriptions from the CLI, with spend limits you control.

## Payment method

Payment methods are associated with your Stripe account.

| Action | Command |
| --- | --- |
| View the payment method on file | `stripe projects billing show` |
| Add a payment method or replace the existing one | `stripe projects billing add` |
| Set or update spend limits | `stripe projects billing update` |

- `billing add` is required before you can provision any paid plan tier (CLI reference).
- projects.dev describes `billing update` as "Modify payment method or adjust spend limit".
- Agent tip (docs): add a payment method with `stripe projects billing add` before starting an agent session, to avoid browser pop-ups.

## Upgrade a service tier

```bash
stripe projects upgrade <provider> | <provider>/<service> | <resource_name>
```

- Upgrade when a service needs more capacity, features, or limits than the current tier provides.
- Review the current tier in `stripe projects status` or the provider dashboard first.
- The CLI prompts you to select a plan and confirm billing with the payment method on file.
- You only add your payment method to Stripe once.
- When you select a paid plan in the CLI:
  1. Stripe tokenizes your payment credentials into a [Shared Payment Token](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens).
  2. Stripe grants the provider a payment credential for that upgrade.
  3. The provider charges using that token.
  4. Your underlying payment credentials aren't shared.
- Countries that support paid services: [[Stripe Projects - Paid Tier Countries]].
- projects.dev also lists `stripe projects downgrade <provider>/<service>` ("Downgrade to a lower tier or free plan") and `stripe projects update <provider>/<service>` ("Modify a resource within the same provider").

## View your spend

```bash
stripe projects spend
```

Output covers:

- **Current month**: spend to date, by provider.
- **Previous months**: total spend, by provider.

Time range flags:

| Flag | Format | Notes |
| --- | --- | --- |
| (none) | — | Default: spend from the past 6 months |
| `--duration` | Positive whole number of months or days: `3m`, `12m`, `90d`; or `all` | `all` shows charges since January 1, 2026 |
| `--since` | `YYYY-MM-DD` | Includes the full calendar month containing the date (`--since 2026-01-15` includes all of January) |
| `--until` | `YYYY-MM-DD` | Includes the full calendar month containing the date (`--until 2026-03-10` includes all of March) |

- `--since` and `--until` work alone or together.
- You can't combine `--duration` with `--since` or `--until`.

```bash
stripe projects spend --duration 3m
stripe projects spend --since 2026-01-15 --until 2026-03-10
stripe projects spend [provider]
```

Sample output (CLI reference):

```
PROVIDER      THIS MONTH   LAST MONTH
vercel        0.00 USD     0.00 USD
supabase      0.00 USD     0.00 USD
openrouter    1.24 USD     3.87 USD
────────────────────────────────────
TOTAL         1.24 USD     3.87 USD
```

## Set a spend limit

- Spend limits apply to your payment method.
- Two kinds: a **global** limit across all providers, or a **per-provider** limit.
- Interactive: `stripe projects billing update` asks for the limit type and values.
- `--limit` skips the prompts.

```bash
stripe projects billing update                                   # interactive
stripe projects billing update --limit <amount>                  # global limit
stripe projects billing update --limit <amount> --provider <provider>   # one provider
```

| Flag | Meaning |
| --- | --- |
| `--limit <amount>` | Monthly spend cap in USD. Applies globally unless `--provider` is also set |
| `--provider <provider>` | Scope the limit to one provider |

- Per-provider limits take precedence over a global limit when both are set.
- Run the command once per provider you want to cap.

Examples (CLI reference):

```sh
stripe projects billing update --limit 50                      # global 50 USD per month
stripe projects billing update --limit 20 --provider supabase  # 20 USD per month for Supabase only
```

## Tax handling

- In [[Stripe Projects - Facilitator Countries]], Stripe or its affiliates act as marketplace facilitator / operator / electronic interface solely to calculate, collect, and remit indirect taxes.

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Paid Tier Countries]]: where paid tiers are available
- [[Stripe Projects - Facilitator Countries]]: indirect tax coverage
- [[Stripe Projects - Commands]]: `billing`, `spend`, `upgrade` syntax
- [[CreateOS on Stripe Projects]]: CreateOS plans and prices
- [[Integration - Stripe]]: CreateOS Stripe integration page
