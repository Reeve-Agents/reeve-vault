---
aliases:
  - Reeve Executive Summary
  - Reeve one-pager
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - Executive Summary

> [!summary] Summary
> - **Reeve: your operations, run on your behalf.** AI agents that turn a business's SOPs into tested code, connect them to the business's tools, run them, and audit every rule and run before money or data moves.
> - **Status (17 Oct 2026):** concept and full system design done; MVP not built yet. Every market or pricing figure below marked *hypothesis* still needs validation.
> - Use this note as the base for business-plan competitions, pitch decks and application forms ([[Competitions for Reeve]]).

## One-liner

Reeve turns a business's SOPs into software that runs on its own. A **Builder** agent writes each process as tested code and runs it. A separate **Auditor** agent proves it is correct. The owner approves anything that touches money with a passkey.

## Problem

- Small and mid-sized businesses run their operations on habits, WhatsApp and Excel. Billing, reminders, late fees, stock reorders and approvals are done by hand, and mistakes cost money.
- Automation tools (Zapier-style) connect steps but break on real-world edge cases: partial payments, double payments, tolerance for loyal customers, exceptions.
- Handing operations to an AI agent is risky. It can miscalculate, leak sensitive data to an LLM provider, use credentials that are too broad, or act without permission. On Hacker News in 2026, developers named agents acting with broad credentials as the real risk, ahead of sandbox escape ([[Reeve - Credential Broker and Mera]]).

## Solution

Two agents in a **maker-checker** pair (segregation of duties, standard in finance), with the owner as final approver:

| Role | What it does |
|---|---|
| **Builder / Operator** | Takes the SOP from chat, voice, PDF or spreadsheet; asks clarifying questions; classifies each statement as a **rule** (execute), **constraint** (guard) or **KPI** (monitor); writes tested code; simulates end to end; runs it on schedule or on events; proposes tested diffs when rules change |
| **Auditor / Judge** | Reviews every rule and change, plants fake violations (mutation tests) to prove its checks work, audits every run, monitors KPIs live, and issues reproducible receipts |
| **Owner** | Approves rules, changes and every irreversible money action (refund, payout, new subscription) with a passkey |

Details: [[Reeve - Builder Business Flow]] · [[Reeve - Auditor Design]] · [[Reeve - SOP Inputs and Rule Types]].

## Why it is trustworthy (key differentiators)

1. **Code goes to the data.** The LLM sees only rule text, schemas and synthetic samples. Real data stays inside an isolated sandbox with outbound traffic blocked, and only aggregates leave.
2. **Keyless agents.** Real API keys never enter the sandbox. A broker outside it swaps a placeholder for the real key, scoped to approved actions and expiring after a short time.
3. **Proven, not trusted.** Simulations (Stripe test clocks) and mutation tests run before go-live, and every run leaves a receipt (hashes of code, data and result). A daily Merkle root is anchored on-chain so third parties can verify receipts.
4. **Honest about limits.** Targets such as "revenue $100k per month" are classified as KPIs. Reeve measures, projects, alerts and runs approved collection actions. It does not promise outcomes it can't control.
5. **Human authority stays.** Agents never change rules or decide exceptions on their own.

## How it works (technology)

- **Execution:** CreateOS Sandbox (Firecracker microVMs, egress allowlists, pause/resume, wake-on-request).
- **Payments and provisioning:** Stripe (Invoices, test clocks, webhooks), Stripe Projects (provisioning the stack and agent purchases with spend limits), Stripe Machine Payments Protocol (HTTP 402: agents pay and get paid per call).
- **Identity and approvals:** Mera passkeys (PRF-derived keys per namespace: vault, agent identities, spending mandates, re-prompts for irreversible actions).
- **Connectors:** Composio (1,500+ toolkits, including Stripe, Google Sheets, Shopify, Odoo, QuickBooks and Xero), called only through the broker. MCP is used at build time; deterministic API calls at runtime.
- **App:** Vercel (dashboard), Supabase (rulebook, ledger, receipts), Railway (broker and scheduler).
- **Proof layer (on-chain):** daily Merkle-root anchoring of all receipts (Monad/Base), 0G TEE (TeeML) inference with signed attestations, and an ERC-8004 identity for the Auditor. No crypto payments for Indonesian users: Bank Indonesia prohibits crypto as a means of payment ([[Reeve - Sustainability and Crypto Layer]]).

Details: [[Reeve - Architecture and Stack]] · [[Reeve - Agent Payments]] · [[Reeve - Connectors and Composio]].

## Target market

- **Beachhead:** Indonesian SMEs with recurring billing and repetitive back-office rules: boarding houses (kos), private tutoring, gyms, clinics, catering, rentals, subscription services.
- **Expansion:** the same engine for inventory reordering, procurement approvals, HR leave policies and support SLAs: any process with clear triggers, conditions and actions.
- **Later:** regulated companies (Audit mode for compliance-as-code) and investors (Diligence mode for confidential data-room analysis).
- *Hypothesis to validate:* market size and willingness to pay among Indonesian SMEs. Use official MSME statistics (Kemenkop UKM / BPS) in any submission, with citations.

## Business model (*hypothesis*)

| Stream | Model |
|---|---|
| Subscription | Monthly tiers by number of active SOPs and connectors |
| Usage | Per-run pass-through of compute and LLM cost, plus margin (sandbox compute is billed per second) |
| Auditor as a service | Pay-per-audit over HTTP 402 (Stripe MPP) for other companies and agents |
| Enterprise | Audit/Diligence mode, self-hosted or zero-data-retention deployments |

## Why now

- Agents can now write and run code, but businesses don't trust them with money and data. The trust layer (isolation, scoped credentials, approvals, audit) is the missing piece.
- The infrastructure arrived in 2026: per-second microVM sandboxes, Stripe Projects (agent-provisioned stacks), Stripe MPP (machine payments, launched Mar 2026), and passkey-derived keys.

## Competition and positioning

| Alternative | Gap Reeve fills |
|---|---|
| Manual (WhatsApp + Excel) | Error-prone, doesn't scale |
| Zapier / Make / n8n | Wire steps together but don't write logic with tests, simulate, or audit |
| General AI agents / copilots | Act directly with broad credentials, with no maker-checker and no proof |
| Accounting / billing software | Fixed workflows, not the business's own SOP |

## Status and roadmap

1. **Now:** concept and system design (vault `12 Brainstorm`).
2. **MVP (about 5.5 build hours):** billing SOP for a 30-room kos: compile → simulate (Stripe test clocks) → Auditor verdict → passkey approval → one live webhook and one exception → one rule change. See [[Reeve - Screens Demo and MVP]].
3. **Pilot:** 3–5 real SMEs (kos and tutoring) in Indonesia; measure time saved, billing errors avoided, collection rate.
4. **Next:** connector registry (Sheets, Shopify, Jurnal/Accurate), inventory and HR SOP templates, Audit mode for companies.

## Key metrics to track (once piloting)

Time to the first live SOP · Auditor catch rate (mutation tests) · billing errors avoided · days-to-collect / collection rate · active SOPs per business · monthly retention.

## Risks

| Risk | Mitigation |
|---|---|
| A wrong rule passes as correct (false assurance) | Mutation tests, simulations, human approval |
| Data leaks to the LLM provider or the connector platform | Code goes to data; aggregates only; ZDR / self-host for enterprise |
| SMEs record too little data to automate | Start with Stripe/Sheets-based flows; add a lightweight recording form |
| Payment rails limited by country (e.g. Stripe paid tiers are not available in Indonesia) | Test mode for demos; local payment connectors on the roadmap ([[Plan Constraints - Free vs Beginner]]) |

## Team and ask

- **Team:** *(fill in: names, roles, relevant experience)*
- **Ask:** *(fill in per competition: funding, mentoring, pilot partners, cloud credits)*

## Related
- Up: [[Reeve - Overview]]
- [[Competitions for Reeve]]: where to submit this
- [[Partnership Analysis Report]]: market and partner research behind the idea
