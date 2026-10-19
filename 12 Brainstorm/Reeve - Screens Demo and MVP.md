---
aliases:
  - Reeve Demo
  - Reeve MVP
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - Screens Demo and MVP

> [!summary] Summary
> - Product form: **a web app on Vercel** with 9 screens for the business team. The customer (tenant) sees only Stripe invoices and emails.
> - **Screen 8 (Agent glass box) is the demo weapon**: judges see the agent write and run code in the sandbox (the brief), plus the leak attempts that get blocked (CreateOS's selling point).
> - MVP for 5.5 hours: Phase 1 + Phase 2 (Stripe test clock simulation) + one Phase 4 example, plus one `invoice.paid` webhook and one exception.

## Screens

| # | Screen | For | Content |
|---|---|---|---|
| 1 | **Onboarding chat** | Owner | "Tell me your billing SOP" (text/voice), upload tenant CSV; the agent asks clarifying questions |
| 2 | **Rulebook** | Owner | Numbered human-readable rule cards; status draft / audited / approved; version history with diffs; type label (Rule / Constraint / KPI) |
| 3 | **Simulation timeline** | Owner | Tenant × day grid (invoice, reminder, fine, notice); scenario toggle (late, partial, double payment) |
| 4 | **Auditor verdict** | Owner, Accountant | Pass/fail checks, mutation results ("12/12 fake violations caught"), "view receipt" button |
| 5 | **Approval modal** | Owner | Impact summary ("18 tenants increase, +Rp1.8 million/month") → passkey prompt |
| 6 | **Operations** | Admin | Today's runs, arrears list, **exception queue** with action buttons (refund / credit / approve instalments) |
| 7 | **Ledger & reports** | Accountant | Ledger, monthly report, receipt verifier (code hash + data hash + result) |
| 8 | **Agent glass box** | Everyone, judges | Live log of every sandbox run: code written, command executed, **"egress blocked: evil.com"**, duration, cost per run |
| 9 | **Purchase requests** | Owner | Agent requests ("needs Sentry $26/mo, reason …") → approve (passkey) / decline; remaining mandate |

## Demo order on screen

1 (SOP input) → 2 (rulebook done) → 3 (simulation) → 4 (Auditor finds the tolerance bug) → Builder fixes it → 5 (passkey approval) → 6 (one `invoice.paid` webhook arrives plus one double-payment exception) → 8 (glass box throughout)

## Extra demo moments

- **KPI honesty:** the rulebook shows "Rule #7 is a KPI. I can't guarantee it…" ([[Reeve - SOP Inputs and Rule Types]]).
- **Keyless:** `printenv` in the sandbox shows only placeholders. A Stripe read succeeds; a refund triggers the passkey; declining blocks it ([[Reeve - Credential Broker and Mera]]).
- **Code goes to data:** Auditor code tries an outbound call and is blocked; the result leaves only as aggregates ([[Reeve - Auditor Design]]).
- **Cross-device:** open the dashboard in a fresh browser; agent identities and the vault reconstruct from the passkey.
- **Final pitch slide:** the same engine running inventory, HR and CS SOPs.

## MVP scope (5.5 hours of build, CreateOS Free plan)

**Build:**
1. Phase 1 Compile: chat + CSV → clarifying questions → rule cards + `rules.py` + tests.
2. Phase 2: 60-day simulation with Stripe test clocks; Auditor verdict with mutation tests; passkey approval.
3. Phase 3 (minimal): one `invoice.paid` webhook + one double-payment exception. *Built 18 Oct 2026 on Stripe and Xendit test mode (studio section "06 · Run"); see [[Reeve - Payment Rails Indonesia]] §11.*
4. Phase 4: one rule change (rent increase) → diff + regression tests + Auditor + approval. *Built 19 Oct 2026: "Change a rule" in the studio. A revised SOP becomes a new version with a card-level diff. The same audit runs, and an impact panel compares the same simulated month under both versions. Approval with the passkey supersedes the old version, and a live run can switch to the new rules from the next business day. Example checked: fee 5% → 8% raised late fees from Rp1.275.000 to Rp2.040.000 across 11 rooms. Rent itself is tenant data, not a rule card, so a rent increase needs the tenant import first.*
5. Broker with placeholder key + an egress allowlist to the broker only.
6. Glass box log.

**Cut first:** multi-agent matching, on-chain reputation, crypto, receipt anchoring (bonus only if time remains), extra connectors besides Stripe.

**Sandbox budget:** about 4–6 sandboxes per demo, used one at a time (Builder → destroy → Auditor). See [[Reeve - Architecture and Stack]].

## Hackathon submission checklist (from the hackathon notes)

- Start from an empty directory; stack via `stripe projects init` + `stripe projects add createos/project` ([[Hackathon Setup Guide]]).
- The agent writes code and runs it in a CreateOS sandbox.
- Submit to the Stripe Projects leaderboard. Prepare your Stripe account ID (`acct_...`), following the precedent of earlier Stripe Projects events. The leaderboard's exact rules are unknown.
- Demos and awards 6:00 PM PT = 08:00 WIB Sunday ([[Hackathon Schedule]]).

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Builder Business Flow]]: the phases these screens represent
- [[Brainstorm - Open Questions and Risks]]: what may break the demo
