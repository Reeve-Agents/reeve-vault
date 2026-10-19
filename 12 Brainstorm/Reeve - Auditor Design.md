---
aliases:
  - Autonomous Auditor
  - Compliance-as-Code
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - Auditor Design

> [!summary] Summary
> - The Auditor is an **autonomous auditor whose audit runs from code the agent writes itself**. It is the checker in the maker-checker pair.
> - The answer to the biggest risk, an external LLM leaking data, is the core principle: **the code goes to the data; the data is never sent to the LLM.**
> - The biggest risk is **false assurance** (a wrong check that lulls you into feeling safe). It is mitigated with **mutation tests**: plant known fake violations, and a check is valid only if it catches them.
> - Two modes on one engine: **Audit mode** (compliance, pass/fail, periodic) and **Diligence mode** (investor/startup analysis, one-off). Former Idea 3 merged in here.

## Principle: the code goes to the data

```text
LLM (eksternal) melihat:            Sandbox CreateOS (egress diblokir total):
- teks aturan                        - data asli (transaksi, data pelanggan)
- skema tabel (nama kolom, tipe)     - kode audit buatan LLM dijalankan di sini
- data sintetis/palsu untuk contoh   - output keluar hanya agregat:
                                       "1.204 cek, 3 pelanggaran, row id #88, #91, #340"
```

## Flow

1. The auditor enters rules, e.g. "refunds above Rp5 million need approval from 2 people", "customer ID-card data must not be kept for more than 5 years", "no transactions to entities on the sanctions list".
2. The LLM receives **only the schema and synthetic examples**, then writes `check_refund_approval.py` and so on.
3. The code runs in a sandbox **with no internet access at all**. Even if the code tries to send data out, the connection is refused ([[Docs - Sandbox REST API - Networking and Egress]], [[Egress Governance]]).
4. Only violation counts and row IDs leave the sandbox. Raw values and PII stay inside.
5. The agent builds the report and control matrix from those aggregates. A human auditor opens the flagged rows directly in the internal system.

## Remaining risks and mitigations

| Risk | Mitigation |
|---|---|
| The schema or column names are themselves sensitive | Alias the column names before they go to the LLM |
| **The agent writes a wrong check → false assurance** (the biggest risk) | **Mutation test**: plant known fake violations in the data; a check is valid only if it catches them |
| Aggregate results can reveal information when a group is small | A minimum group size before a result is reported |
| The LLM provider stores prompts | The prompts already contain no data. For enterprise: zero-retention contracts or a local model. CreateOS's Gateway claims ZDR, but that is a CreateOS claim, unverified ([[Product - Gateway]]) |
| Composio as connector: payloads pass through Composio's servers | For the Auditor, pull data into the egress-blocked sandbox; Composio only fetches, it does not analyse. ZDR is a Pro add-on. See [[Reeve - Connectors and Composio]] |

## Receipts

- Every run produces a **receipt** containing the code hash, data hash, result and time.
- Anyone can re-run the audit and get the same result (reproducible).
- Optional Web3: a daily Merkle root of the receipts anchored on-chain, so a third party can verify that no report was changed afterwards. See [[Reeve - Architecture and Stack]].
- This matches CreateOS's enterprise narrative (audit trail, egress allowlist, isolation), which barely appears in the hackathon ideas.

## Two modes

| | **Audit mode** (former Idea 2) | **Diligence mode** (former Idea 3) |
|---|---|---|
| Question | "Are the rules being followed?" | "Is the business healthy?" |
| Output | Pass/fail, list of violations, control matrix | Analysis: churn, cohorts, unit economics, memo + reproducible code |
| Frequency | Periodic (monthly, per change) | Usually one-off |
| User | Owner, accountant, internal auditor | Investor (data room), startup founder |
| Protection | Egress blocked, aggregates only | Egress blocked, data and memory encrypted per deal (Mera `client:<id>:memory`), sandbox destroyed when done |

Product story: one platform to analyse confidential data without an AI ever seeing that data.

## Role in Reeve (checker)

| Phase | What the Auditor checks |
|---|---|
| Phase 2 Simulate | Rulebook vs the original SOP, mutation tests (e.g. long-term tenant tolerance) |
| Phase 3 Operate | Monthly check of all transactions against the rules |
| Phase 4 Maintain | Whether a change request breaks other rules or policy |
| KPI monitors | Revenue definition calculated correctly; synthetic $90k must trigger the alarm and $105k must not ([[Reeve - SOP Inputs and Rule Types]]) |

## Why this matters to CreateOS

- Egress allowlist is the feature named most on the official idea cards (7 of 30) ([[Hackathon Ideas]]).
- It ties to CreateOS's core business (regulated enterprise), which is almost absent from the hackathon ideas ([[Partnership Analysis Report]]).
- Strong demo: agent-written code tries to send data out and is blocked; mutation tests catch the fake violations; receipts can be re-verified.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Builder Business Flow]]: the maker the Auditor checks
- [[Docs - Sandbox Security and Self-Hosting]]: isolation model
- [[Industry - Financial Services]] · [[Blueprints - AML]] · [[Blueprints - Reconciliation]]: CreateOS's own enterprise framing of similar workflows
