---
aliases:
  - SOP Compiler
  - Builder Operator Flow
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - Builder Business Flow

> [!summary] Summary
> - Builder/Operator is **not a personal assistant** that answers one command at a time. It is an **"SOP compiler"**: it turns business rules written in plain language into a program that runs on its own, complete with tests, then maintains that program.
> - Four phases: **Compile → Simulate & approve → Operate → Maintain**. Each phase has explicit inputs and outputs per stakeholder.
> - Four trust principles: the agent never changes rules on its own; the agent never decides exceptions; money actions need a passkey; every run leaves a receipt.
> - Running example: **a 30-room kos (boarding house)**.

## Persona

The owner of a 30-room kos, with monthly billing, many late-paying tenants, and records kept manually in WhatsApp and Excel.

## Difference from Zapier

Zapier connects steps. Reeve **writes the logic and its tests**, and proves the rules are correct with a simulation before real money moves.

## Stakeholders

| Stakeholder | Role |
|---|---|
| **Owner** (business owner) | Defines business rules, approves changes |
| **Admin / Finance staff** | Runs daily operations, handles exceptions |
| **Customer** (tenant) | The party billed and paying |
| **Accountant / human auditor** | Needs reports and evidence for bookkeeping and tax |
| **Reeve Builder** | Compiles, runs, maintains |
| **Reeve Auditor** | Checks ([[Reeve - Auditor Design]]) |
| **Stripe** | Billing and payment rail (Customer, Invoice, webhook) |

## Phase 1: Compile (SOP → executable rules)

| Stakeholder | Input | What the agent processes | Output |
|---|---|---|---|
| Owner | SOP in plain language (chat, voice note or document): "Rent Rp1.5 million, bill on the 1st, day+3 reminder, day+7 fine 5%, day+14 notice to vacate. Tenants of more than 1 year get 3 days' tolerance." | Parses the SOP into entities (tenants, rates, schedule) and rules (trigger → condition → action); finds ambiguity | **Clarifying questions**: "Is the 5% fine on rent or on total arrears?", "On partial payment, do reminders continue?", "Does the 3-day tolerance shift the fine too?" |
| Admin | Tenant data (CSV/Excel): name, room, rate, move-in date, contact | Validates data (duplicates, missing rates) and maps it to Stripe Customers | **Data quality report**: "2 tenants without email, 1 rate does not match the SOP" |
| Owner | Answers to the questions | Writes **rule cards** (a human-readable version of each rule), `rules.py`, and tests | **Rulebook v1**: numbered, human-readable rules |

## Phase 2: Simulate & approve (prove the rules before real money moves)

| Stakeholder | Input | What the agent processes (in the sandbox) | Output |
|---|---|---|---|
| Builder (itself) | Rulebook v1 | Writes test scenarios (pays on time, 8 days late, partial payment, double payment, long-term tenant) and runs a **60-day simulation** with Stripe test mode / **test clocks** | Simulation timeline per tenant: which day gets the invoice, reminder, fine, notice |
| **Auditor** | Rulebook, code, simulation results | Checks the code against the original SOP and injects trap cases (**mutation tests**), e.g. a long-term tenant 2 days late must not be fined yet | **Verdict**: pass, or fail with a reason, e.g. "Rule #4 fines long-term tenants on day+7; tolerance should push it to day+10" |
| Owner | Simulation timeline + Auditor verdict | — | Approval (Mera passkey for money actions), then the rules go live |

## Phase 3: Operate (runs automatically every day)

| Trigger | What the agent processes | Output per stakeholder |
|---|---|---|
| Cron on the 1st | The sandbox wakes (wake-on-request) and creates Stripe invoices for 30 tenants | **Customer:** invoice + payment link. **Admin:** summary "30 invoices sent, total Rp45 million" |
| Webhook `invoice.paid` | Records the payment and closes the receivable | **Customer:** receipt. **Accountant:** ledger updated |
| Day+3 unpaid | Sends a reminder per the rules | **Customer:** reminder. **Admin:** arrears list |
| Day+7 | Calculates the fine and adds an invoice item | **Customer:** bill + fine. **Owner:** notification "5 tenants fined, total Rp375k" |
| Case outside the rules (double payment, request to pay in instalments) | **Does not decide.** Flags it as an exception | **Admin:** exception queue with action options (refund / credit to next month / approve instalments) |
| Month end | Monthly recap | **Accountant:** monthly report (revenue, receivables, fines, refunds) + run receipts. **Auditor:** automatic check of all of this month's transactions against the rules |

Between triggers the sandbox auto-pauses, so compute cost is close to zero. Egress is allowed only to `api.stripe.com` and the messaging service. See [[Docs - Sandbox REST API - Networking and Egress]] and [[Docs - Sandbox REST API - Lifecycle and Execution]].

> [!warning] Free plan
> On Free, a paused sandbox still counts toward the 1-sandbox cap. For the demo, do not keep the Operator always on. The trigger (scheduler) creates a sandbox, runs the job, then destroys it. See [[Reeve - Architecture and Stack]].

## Phase 4: Maintain (rules change)

| Stakeholder | Input | What the agent processes | Output |
|---|---|---|---|
| Owner | "From next month rent rises to Rp1.6 million; existing tenants stay at Rp1.5 million until their contract ends" | Builds a rule diff, updates the code, adds new tests, and **re-runs every old test** (regression) | **Change request**: readable diff, test results, impact ("18 tenants increase, 12 stay; revenue +Rp1.8 million/month") |
| Admin | Recurring exception report: "every month someone pays twice" | Proposes a new rule: "double payments automatically become credit for next month" | Rule proposal, awaiting approval |
| **Auditor** | Change request | Checks whether the change breaks other rules or policy (e.g. the maximum fine) | Pass/fail verdict |
| Owner | Change request + Auditor verdict | — | Passkey approval → Rulebook v2 goes live, old version archived |

## End-to-end diagram

```text
Owner ──SOP──▶ [Builder: compile → test → simulate] ──▶ [Auditor: judge] ──▶ Owner approve (passkey)
                                                                                   │
Admin ──data penghuni──▶                                                           ▼
                                                  [Operator: jalan otomatis di sandbox]
Customer ◀── invoice / pengingat / kuitansi ──────────┤ ◀── webhook Stripe
Admin ◀── tunggakan / pengecualian ───────────────────┤
Accountant ◀── ledger + laporan bulanan + receipt ────┘──▶ [Auditor: cek berkala]
Owner ──"aturan berubah"──▶ [Builder: diff + test ulang] ──▶ [Auditor] ──▶ approve ──▶ v2
```

## Trust principles

1. The agent **never changes rules on its own**: every change goes through Owner approval.
2. The agent **never decides exceptions**: they go to the Admin.
3. **Money actions** (refunds, fine waivers) need a passkey ([[Reeve - Credential Broker and Mera]]).
4. **Every run leaves a receipt**, so the Auditor and Accountant can trace it ([[Reeve - Auditor Design]]).

## Hackathon scope (5.5 hours)

Demo Phase 1, Phase 2 (simulation with Stripe test clocks) and one Phase 4 example. Show Phase 3 with one `invoice.paid` webhook and one exception case. See [[Reeve - Screens Demo and MVP]].

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - SOP Inputs and Rule Types]]: the input sources and rule types the Builder handles
- [[Reeve - Auditor Design]]: the checker in Phases 2–4
- [[Ideas - Money]]: the official ideas closest to this (payout reconciler, timesheet to invoice)
