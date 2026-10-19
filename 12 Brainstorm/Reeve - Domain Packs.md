---
aliases:
  - Domain packs
  - SOP packs
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: reeve/docs/PACKS.md
up: "[[Reeve - Overview]]"
---

# Reeve - Domain Packs

> [!summary] Summary
> - Question from the owner on 18 Oct 2026: the mobile app only speaks "kos"; is the front end still relevant for other businesses, processes and companies?
> - Answer: Approvals, Ledger and the Builder → Auditor → Owner pipeline were already generic; the Today and Rooms tabs and the engine's card types were rent-only.
> - Fix: a **domain pack** contract (`@reeve/core/packs`). Each kind of SOP declares its entity, statuses, KPIs, plain-language lines, exceptions, connectors and egress. The owner app renders only the contract. **Rent collection** is pack 1; a generic fallback keeps unknown SOPs readable.
> - **Pack 2, minimarket stock and expiry, is built** and passed the Auditor on a real CreateOS sandbox on 18 Oct 2026: 8/8 Builder tests, 10/10 spec cases, 30/30 planted defects caught, no constraint violations. The same owner app shows it with its own nouns (Stock, items, "expiring within 30 days").

## Any SOP: the generic pack (19 Oct 2026)

Question from the owner: why only kos and minimarket, when Reeve should run almost any SOP and connect to almost anything through Composio (and hunt for other MCP servers where Composio has nothing)?

Answer: the packs were hand-built shortcuts. There is now a **generic pack** that follows [[Reeve - SOP Inputs and Rule Types]] directly. A rule is a trigger, a condition and an action:

- **Rule:** on a schedule, for every record whose conditions hold, run one connector tool.
- **Constraints:** "never run X for records like these", and "above an amount, wait for the owner's passkey".
- **KPI:** a sum or count over the records against a threshold.
- **Records:** come from the owner's own data (CSV from Sheets or Excel today).
- **Actions:** go through [[Reeve - Connectors and Composio]]: Composio, any MCP server, or a log until something is connected.

| Check (Bimbel Cerdas sample: 12 students, 6 SOP lines) | Result |
|---|---|
| Hand-written rulebook, local sandbox | PASS: 3/3 Builder tests, 13/13 spec cases, 24/24 planted defects |
| Claude Opus 5.5 reading the SOP (it saw only field names and category labels) | PASS. Its decisions matched the hand-written rulebook: 23 actions, 7 waiting for approval, 5 blocked by "never", 5 KPI alerts |
| Claude Haiku 5.5 | **Blocked by the Auditor:** it left out the amount the Rp2 jt limit is about, so the limit could never trigger |
| Builder that forgets the "never" rule | FAIL: spec mismatch and constraint violation |

What made the model reliable: giving it the **category labels** of short columns (`lunas/belum`, `aktif/berhenti`). Without them, Haiku put "berhenti" in the wrong column. Names, phones and emails are never shown.

The rent and minimarket packs stay as tuned verticals with nicer owner views.

## The contract

| Field | Rent collection (pack 1) | Minimarket (pack 2) |
|---|---|---|
| Status | Live, CreateOS PASS | **Live, CreateOS PASS** (receipt `5d1fba6f…`) |
| Entity | Room / Rooms | Item (SKU) / Stock |
| Statuses | paid · part paid · unpaid · exit notice | in stock · low · out of stock · low with an order on the way · marked down before expiry · slow mover, not reordered |
| KPIs | Collected vs monthly target | Stock expiring within 30 days (at cost) vs the Rp1 jt limit |
| Lines | "6 exit notices sent" | "1 order placed (1 with Supplier A), Rp799,500" · "Rp1,007,600 of stock expiring soon, owner alerted" |
| Exceptions (Reeve never decides) | KPI miss on the 15th; refund above the limit (passkey) | PO above the limit (passkey); expiring stock above the limit on the check day |
| Connectors | Stripe / Xendit / Midtrans, WhatsApp, Sheets | POS (Moka, Majoo, Loyverse via Composio), Sheets, supplier email/WA |
| Egress | api.stripe.com, api.xendit.co, api.midtrans.com | sheets.googleapis.com, the POS API host |

The three statement types from [[Reeve - SOP Inputs and Rule Types]] map onto the view: rules become what Reeve did and how each entity stands, constraints become flagged exceptions, KPIs become monitors with an honesty note.

## Other packs the same contract covers

| Pack | Entity | Example SOP (from the vault) |
|---|---|---|
| HR leave | Employee | "Leave longer than 3 days needs manager approval; balance never negative" |
| Customer service | Ticket | "High priority answered within 1 hour; past 4 hours escalate" |
| Procurement | Purchase order | "Above Rp10 million needs 3 quotes and director approval" |
| Logistics | Parcel | "Not delivered by day+2 → contact courier; day+5 → resend and claim" |
| Green mode | Meter / unit | Energy and water SOPs from [[Reeve - Sustainability Summary and SDGs]] |

## Pack 2: what the first real month showed

From the CreateOS run (Minimarket Berkah, 24 items, 30 days from Monday 2 Nov 2026, two suppliers):

| What happened | Count |
|---|---|
| Purchase orders placed | 38, Rp12.9 jt |
| Waiting for the owner (above Rp2 jt) | 1: beras 5kg, 49 bags, Rp3.0 jt |
| Late Supplier A, moved to Supplier B | 4 orders |
| Markdowns before expiry (H-30 20%, H-14 50%, never below cost) | 8 |
| Written off at expiry | Rp64,800 (susu kental manis) |
| Slow movers no longer reordered | 2 |
| Monday expiring-stock alert | Nov 9: Rp1,007,600 > Rp1,000,000 |

The Auditor also caught a deliberately broken Builder that forgot "never below cost": 4 spec mismatches and 6 constraint violations, verdict FAIL.

## Pack 2 build steps (done)

1. `Rulebook.pack` and engine dispatch in `job.py` (rent stays the default).
2. Card types: `reorder_point`, `supplier_fallback`, `expiry_markdown`, `slow_mover_stop` (rules); `po_approval_threshold`, `markdown_floor` (constraints); `expiring_value_limit` (KPI), with their own flat LLM schema.
3. Scenario (24 items, 30 days of sales, Supplier A 4 days late on orders placed 10–13 Nov) and `runtime/reeve_runtime/stock_engine.py`, with `dispatch.py` choosing the engine by pack.
4. Auditor spec (10 cases): reorder only below the point and up to the target; stock on order counts; PO over the limit becomes an approval request; switch supplier on the day it is 3 days late; markdowns at H-30 and H-14 only; never below cost; write-off on the expiry date; slow movers stop; the Monday alert. Mutation testing extended to the new constants and comparisons; a threshold mutant no order size can reach is reported as equivalent.
5. `minimarketPack` owner view on the real run events: the app picks it up with no UI change.
6. Only after a real CreateOS PASS does the landing show minimarkets as a second live example. (PASS done; landing not changed yet.)

Model parsing, 18 Oct 2026: Claude Opus 5.5 and Haiku 5.5 each read the minimarket SOP into the same 8 cards as the hand-written rulebook, and both passed the Auditor. The studio now picks the business type and the model, and compiles and audits a minimarket SOP end to end. See [[Reeve - Model Providers]].

Full detail, including which pieces are still rent-only: `reeve/docs/PACKS.md`.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Owner App PWA]] · [[Reeve - Model Providers]] · [[Reeve - Connectors and Composio]] · [[Reeve - SOP Inputs and Rule Types]] · [[Reeve - Connectors and Composio]] · [[Reeve - Sustainability and Crypto Layer]]
