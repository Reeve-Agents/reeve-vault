---
aliases:
  - Free vs Beginner
  - Indonesia plan limits
tags:
  - brainstorm
  - createos/pricing
  - type/page
scraped: 2026-10-17
source: https://docs.stripe.com/projects/paid-tier-countries
sources:
  - https://docs.stripe.com/projects/paid-tier-countries
  - https://createos.sh/docs/Sandbox/Limits
  - https://createos.sh/docs/Account-Billing/Pricing
  - https://createos.sh/docs/Services/Stripe-Projects
up: "[[Brainstorm]]"
---

# Plan Constraints - Free vs Beginner

> [!summary] Summary
> - **Indonesia (`ID`) is NOT in the Stripe Projects paid-tier country list** (checked live on 17 Oct 2026). Upgrading to Beginner through Stripe Projects is refused, and the user confirmed it by running it ("Iya gabisa").
> - **A VPN (including Cloudflare WARP) does not help.** The check uses the Stripe account country and the card-issuing country, not the IP. Faking the account country breaks Stripe's terms and risks a block on the same account used for leaderboard submission. Do not do it.
> - **The plan is with CreateOS**; Stripe Projects is only the payment path. A direct path through the CreateOS dashboard (createos.sh/app) is worth checking (unverified).
> - **The Free plan is enough for 19 of 30 official ideas**, and for Reeve (sandboxes used in turn).
> - Free vs Beginner differ in **limits and credits, not rates and not features**.

## Stripe Projects paid-tier countries (live, 17 Oct 2026)

Asia Pacific on the list: `AF AU BN HK KR LK MN MO MV NF NZ PG SG TM`. Not included: `ID`, `MY`, `TH`, `JP`, `IN`. See [[Stripe Projects - Paid Tier Countries]].

## Plan prices

| Plan | Price through Stripe Projects | Notes |
|---|---|---|
| Free | $0 | 500 initial credits |
| Beginner | **$10/month** (prorated mid-period) | The docs Pricing page writes a range of $10–$50 |
| Pro | $75/month | Docs range $75–$200 |
| Enterprise | $200/month | Docs "$200+" |

Service names: `free`, `beginner-monthly`, `pro-monthly`, `enterprise-monthly`. Resource: `createos-plan` ([[CreateOS on Stripe Projects]]).

**Plans only raise limits.** Sandbox usage is billed per second at the same rate on every plan: vCPU $0.0362/hour, RAM $0.0116/GiB/hour. E.g. `s-1vcpu-1gb` running for 1 hour ≈ $0.048. Pause stops CPU billing, but memory and disk are still billed ([[Pricing - Sandbox]]).

Some CreateOS pages write the plan prices differently (as ranges, or as "no monthly commitment"). The $10 figure is the one listed on the Stripe Projects path.

## Free vs Beginner differences

**Sandbox** ([[Docs - Sandbox Limits]]):

| | Free | Beginner |
|---|---|---|
| Concurrent sandboxes | 1 | 5 |
| Sandboxes created per day | 10 | 50 |
| Largest shape | 1 vCPU / 1 GB | 4 vCPU / 4 GB |
| Max disk | 10 GiB | 30 GiB |
| Private networks (concurrent / day) | 1 / 10 | 5 / 50 |
| Separate disks | 0 | 5 / 50 |
| Templates (custom image from a Dockerfile) | 0 | 5 / 50 |

**Credits and billing** ([[Docs - Account and Billing]]):

| | Free | Beginner |
|---|---|---|
| Price | $0 | $10 (docs range $10–$50) |
| Initial credits | 500 | 1,000–5,000 |
| Top-up multiplier | 1.2x | 1.2x |
| Initial token top-up | $1 | $2.5 |

**App deploy** (the CreateOS platform outside the sandbox):

| | Free | Beginner |
|---|---|---|
| Deploy/build compute | 1 core / 2 GB | 48 cores / 48 GB |
| Environment replicas | 1 | 2 |
| Parallel builds | No | Yes |

**The same on both:**
- Every sandbox feature: exec, file upload/download, egress allowlist, ingress/public URL, pause/resume, auto-pause, fork, self-signal, secrets (up to 64 keys).
- Unlimited projects and deploys, domains, security scans, logs, analytics.
- No session time limit; 50 GiB bandwidth per sandbox.
- Images: `devbox:1` (Python 3.12, pandas/numpy/scikit-learn/matplotlib, openai/anthropic SDKs, coding agents), plus `ubuntu`, `debian`, `alpine`.

**What is practically impossible on Free:**
- More than 1 sandbox at a time (fork in parallel, swarm, red team with 2 sandboxes).
- Disks and templates (quota 0).
- Computer use with `desktop:1` (Chrome). All those ideas are tagged Beginner, probably because 1 GB is not enough for a desktop.
- Shapes above 1 vCPU / 1 GB.

> [!warning] Egress is open by default
> Set an allowlist before running model-written code, e.g. `"egress": ["api.stripe.com:443"]`.

## The 30 official ideas by plan

**Free plan (19):** #1 Stripe webhook fixer · #2 Sentry error to reproduction · #3 Docs snippet tester · #4 Client landing page in 10 minutes · #5 Stripe revenue analyst · #6 Payout reconciler · #8 Timesheet to invoice · #9 "Should I install this?" package check · #11 Refund agent with guardrails · #15 Founder's morning KPI email · #16 Receipts inbox · #18 Alert responder · #19 Code Mode for Stripe · #20 An agent that sets up its own stack · #21 Stack bake-off · #22 Pay-per-run code runner · #23 Autoresearch in an afternoon · #24 An agent that writes its own tools · #25 Eval builder

**Needs Beginner (11):** #7 CS assignment grader (fork from snapshot) · #10 Phishing link opener (desktop) · #12 Accessibility auditor (desktop) · #13 New user onboarding tester (desktop + live view) · #14 Docs screenshot refresher (desktop) · #17 Fork my analysis (pause with memory + fork) · #26 Fork-and-race fixer (4 parallel forks) · #27 Red team with proof (2 sandboxes) · #28 Swarm scored by a test suite (many sandboxes) · #29 Computer use on an app with no API (desktop) · #30 Bug fixer that reproduces first (Docker)

The pattern: Beginner ideas need **more than one sandbox at a time**, **a desktop**, or **a bigger machine**. Details in [[Hackathon Ideas]].

## Upgrade commands (for reference)

```bash
npm install -g @stripe/cli
stripe plugin install projects
stripe projects init test-upgrade
stripe projects add createos/project
stripe projects update createos-plan --service beginner-monthly
```

If the upgrade succeeds, the card is charged $10/month. From Indonesia it is refused.

## Legitimate options from Indonesia

1. **Use Free.** Reeve and most ideas fit.
2. **A teammate in a supported country** creates a Stripe account in their own name and pays for Beginner.
3. **Buy directly at https://createos.sh/app** (profile/billing, https://createos.sh/app/profile), not through Stripe Projects. The docs mention card, bank transfer, crypto and NODE token, and a **Pure Top-Up** option without a subscription (it does not unlock Beginner limits, but adds credits). Unverified whether this works from Indonesia.
4. **Ask the organisers** at hello@createos.sh or on Discord: say you are an Indonesian participant who cannot upgrade through Stripe Projects, and ask for credits or another payment path ([[Contact and Community]]).

## MPP is not affected by these limits

MPP is a Stripe account feature, unrelated to the CreateOS Free plan or the Stripe Projects paid tier.

| | What it limits | Effect on MPP |
|---|---|---|
| CreateOS Free plan | Sandbox: 1 concurrent, 1 vCPU / 1 GB | None |
| Stripe Projects paid tier (81 countries, no Indonesia) | Provider upgrades through `stripe projects upgrade` | None; MPP is not part of Stripe Projects |
| MPP | Stripe account feature | Test mode (`sk_test_...`) works with any Stripe account; country limits only in live mode |

The one open question is whether a Stripe account can be created with Indonesia as the country. See [[Reeve - Agent Payments]].

## Related
- Up: [[Brainstorm]]
- [[Pricing - Sandbox]] · [[Docs - Account and Billing]] · [[Stripe Projects - Billing and Spend Limits]]
- [[Reeve - Architecture and Stack]]: how Reeve fits on Free
