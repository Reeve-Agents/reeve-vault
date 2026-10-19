---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Account-Billing
sources:
  - https://createos.sh/docs/Account-Billing
  - https://createos.sh/docs/Account-Billing/Account-Management
  - https://createos.sh/docs/Account-Billing/Pricing
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Account and Billing

> [!summary] Summary
> - Account docs: login methods (email OTP, Google, GitHub, wallet), mandatory GitHub connection for deploys, API keys in Profile.
> - Pricing docs: consumption-based billing; tiers Free, Beginner, Pro, Enterprise; top-up multipliers 1.2x, 1.2x, 1.5x, 5x.
> - Compute rates: vCPU `$0.0000100455` per second, RAM `$0.0000032195` per GB per second, Storage `$0.000000044` per GB per second.
> - Public rate card: https://createos.sh/pricing (see [[Pricing]]). Source: https://createos.sh/docs/Account-Billing/Pricing

## Account and Billing
- **URL:** https://createos.sh/docs/Account-Billing
- **Summary:** Index for account (not workload) topics.
- **Key points:**
  - Pages: Account Management (API keys, teams, profile) and Pricing (tiers, credits, top-ups, usage-based costs).
  - Sandbox caps per plan are in [[Docs - Sandbox Limits]]; the public rate card is at https://createos.sh/pricing .

## Authentication and Account Management
- **URL:** https://createos.sh/docs/Account-Billing/Account-Management
- **Summary:** How identity connects to infrastructure: login methods, GitHub linking, wallet connectivity.
- **Key points:**
  - Login at https://createos.sh/app/ via passwordless email OTP, one-click Google, or GitHub (preferred for developers).
  - Users can permanently delete their account and workspace data at any time.
  - GitHub connection is mandatory to move from repository to production; it unlocks the Deploy Flow (AI-driven packaging, zero-config CI/CD). Multiple GitHub accounts can be connected and switched.
  - Wallet login: any EVM-compatible wallet; gives access to decentralized CPU/GPU compute and the NodeOps DeFi Portal.
  - Create and Deploy flows still require a linked Email or GitHub account (for repository hosting and build logs); pairing a wallet with GitHub or email is recommended for the full flow.

## Pricing
- **URL:** https://createos.sh/docs/Account-Billing/Pricing
- **Summary:** Consumption-based billing with subscription tiers (bonus multipliers) or pure top-up credits.
- **Key points:**
  - Tier structure:

    | Tier | Monthly Cost | Top-up Multiplier | Initial Credits | Initial Token Top-Up |
    |---|---|---|---|---|
    | Free | Free | 1.2x | 500 | `$1` |
    | Beginner | `$10 - $50` | 1.2x | 1,000 - 5,000 | `$2.5` |
    | Pro | `$75 - $200` | 1.5x | 7,500 - 20,000 | `$10` |
    | Enterprise | `$200+` | 5x | 20,000+ | `$50` |

  - Compute pricing: vCPU `$0.0000100455` /sec; RAM `$0.0000032195` GB/sec; Storage `$0.000000044` GB/sec.
  - Create and Deploy projects: unlimited on every tier.
  - Compute limits for deployments and builds: Free up to 1 core and 2 GB RAM; Beginner up to 48 cores and 48 GB; Pro up to 1,000 cores and 1,000 GB; Enterprise up to 2,000 cores and 1 TB.
  - Environment replicas: Free 1; Beginner 2; Pro 10; Enterprise (included, no number given). Max Parallel Builds: N/A on Free, available on other tiers.
  - Included on all tiers: Domains (5 per domain), Security Scan (480 CC per deployment), Logs, Analytics, AI Sandbox, Template Listing (50 CC per listing).
  - Services (pricing based on the service providers): Database (DB), Cache, Message Queue, Virtual Machines (Coming Soon).
  - Payment types: Subscription (monthly tier, initial monthly credits, top-ups get the tier multiplier) or Pure Top-Up (no subscription, standard rate, no multiplier).
  - Accepted methods, all with auto-pay: fiat (credit card, bank transfer, etc.), cryptocurrency, NODE token.
  - AI Credits (Create): initial credits are allocated for the Create feature; if they run out while Deploy credits remain, Deploy credits can be transferred to top up AI credits; custom consumption limits can be set.
  - Credit limit management: monitor consumption, set per-service spending limits, transfer credits between pools, real-time balance.
  - Billing model: consumption-based, calculated per second for CPU, RAM and disk; detailed usage reports.
  - Getting started: choose tier or pure top-up, select payment method, enable auto-pay (optional), set limits for Create, start building.

## Related
- Up: [[CreateOS Docs]]
- [[Pricing]]: pricing hub (public rate card)
- [[Pricing - Sandbox]]: sandbox pricing
- [[Docs - Sandbox Limits]]: sandbox limits and defaults per plan
- [[Docs - Build and Deploy]]: credits used by Create, templates and apps
- [[Docs - API and MCP]]: API keys and MCP
