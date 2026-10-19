---
aliases:
  - Rule Types
  - SOP Inputs
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - SOP Inputs and Rule Types

> [!summary] Summary
> - **Chat alone is not enough.** Chat is the interface, but input must come from many sources: documents, data, past cases, agent interviews, and a rule-card editor.
> - The Builder must **classify every SOP statement**: **Rule** (gets executed), **Constraint** (guarded and audited), **Goal/KPI** (monitored, projected, alarmed).
> - Example: "revenue must reach $100k per month" is a **KPI, not a rule**. The agent cannot create revenue, but it can measure it, project it, raise alarms, and run the collection actions the Owner approves.
> - The engine is generic: any process with a **clear trigger, condition and action** fits. The hackathon stays in finance.

## Input sources

| Input source | Example | Purpose |
|---|---|---|
| Chat / voice | "Day+7 fine 5%" | Intent and rules in everyday language |
| Documents | PDF SOP, lease contract, price list | Official rules; the agent cites the source clause on each rule card |
| Data | Stripe account, tenant CSV/Sheets | Facts currently in force (rates, move-in dates) |
| Past cases | "Last month A paid twice and I credited them" | Captures unwritten habits |
| Agent interview | Clarifying questions | Closes ambiguity |
| Rule card editor | Structured form | Owner confirms or edits rules precisely, not only through chat |

## Three statement types

| Type | Signature | Example | Treated as |
|---|---|---|---|
| **Rule** | Trigger → condition → action | "Day+7 unpaid → 5% fine" | Code that is **executed** |
| **Constraint** | "must never …" | "Refunds above $500 must be approved by the Owner" | An invariant that is **guarded and audited** |
| **Goal/KPI** | Target outcome | "Revenue $100k per month" | A **monitor**: measured, projected, alarmed, with action options |

## Example: the "revenue $100k per month" KPI

The Builder will:

1. **Ask for the definition.** Gross or net after refunds? Cash collected or invoiced?
2. **Ask what to do on a miss.** "If on the 15th the projection is below $100k, what should I do?"
3. **Write monitor code:**
   - Every day, pull month-to-date revenue from Stripe and compute an end-of-month projection (run rate).
   - If the projection is below target: alert the Owner, with a list of actions **within the agent's control**, e.g. "$8.2k in arrears from 6 customers; send reminders now?". Actions run only after the Owner approves.
4. **The Auditor tests the monitor:**
   - Is the revenue definition calculated correctly (refunds subtracted)?
   - Mutation test: synthetic data with $90k revenue must trigger the alarm; $105k must not.

The Builder writes honestly in the rulebook:

> *"Rule #7 is a KPI. I can't guarantee it. I measure, project, warn, and run the collection actions you approve."*

This is a strong demo moment: the agent understands the limits of what it can do.

## Domains outside finance

The engine is the same: **SOP → rules → code → tests/simulation → audit → run → maintain**. It fits any process with a **clear trigger, condition and action**.

| Process | SOP example | What changes compared with Fin |
|---|---|---|
| Inventory | "Stock below 20 → raise a PO to supplier A; supplier A 3 days late → switch to B" | Integration with the stock system and supplier email |
| HR | "Leave longer than 3 days needs manager approval; leave balance must not go negative" | Integration with HRIS and calendar |
| Customer service | "High-priority tickets must be answered within 1 hour; past 4 hours, escalate to a supervisor" | Integration with the helpdesk |
| Procurement | "Purchases above Rp10 million need 3 quotes and director approval" | Integration with e-procurement |
| Logistics | "Parcel not delivered by day+2 → contact the courier; day+5 → resend and file a claim" | Integration with the courier API |

- **Not a fit:** processes that need subjective judgement or creativity (design, negotiation, strategic decisions).
- Technically, only the **integration (connector)** and the **egress allowlist** change per domain (e.g. `api.stripe.com` becomes the helpdesk or courier API). Builder, Auditor, sandbox, broker and passkey stay the same. See [[Reeve - Connectors and Composio]].
- **The hackathon stays in finance** (Stripe sponsor, high risk, focus). Generalisation is the roadmap and the final pitch slide.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Builder Business Flow]]: Phase 1 Compile, where these inputs are processed
- [[Reeve - Auditor Design]]: how KPI monitors and constraints are tested
