---
aliases:
  - Auditor v2
  - Planted defects
  - Mutation testing
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-11-13
source: reeve-api/README.md (Auditor: planted defects), reeve-api/packages/auditor/src/operators.ts
up: "[[Reeve - Overview]]"
---

# Reeve - Auditor Planted Defects

> [!summary]
> - The Auditor checks its own test spec by planting defects in the Builder's code. Since 13 Nov 2026 **every** defect must be caught; one survivor blocks the owner's approval. Before, 80% was enough, so about 5 of 29 could slip through.
> - Six kinds of defect instead of two: boundary, policy, formula, logic, missing step, safety guard.
> - Live on CreateOS (13 Nov 2026): Kos Melati **61/61**, Minimarket **67/67**, Bimbel Cerdas **70/70**. All PASS.
> - Twice the defects at the same speed: a Kos Melati run takes 3.7 to 4.4 s (18 Oct, 29 defects: 3.9 s).

## Why 29 was not enough

The old set only changed numbers and comparison signs (`>=` to `>`, a threshold plus one). It could not plant a wrong formula, a skipped step, an inverted condition or a switched-off approval. Those are the bugs an AI Builder actually makes. And the bar was 80%, so a spec that missed a fifth of them still passed.

## The six kinds

| Kind | What the defect changes | Real example from the generated set |
|---|---|---|
| boundary | a number or comparison, off by one | Kos: late fee after 8 days instead of 7 |
| policy | a business choice | Kos: overpayment refunded instead of credited to the next invoice |
| formula | an arithmetic operator, or a dropped minus | Minimarket: markdown price divides by the discount instead of multiplying |
| logic | an inverted condition, `and`/`or` swapped, a rule that always fires | Kos: the late fee charged again every day |
| missing | a step that never happens, an amount always 0 | Kos: the first reminder dropped; Minimarket: order quantity always 0 |
| safety | an approval or "never" guard switched off | Minimarket: a purchase order above the limit sent without the owner's approval |

## What makes it hard to beat

- **100% rule.** `MUTANT_SURVIVED` is a blocker. The owner never sees an approve button while one defect survives.
- **No free kills.** Every defect must parse as Python and differ from the real code (tested). A crash or a 5 s timeout counts as caught, because the owner would notice that too.
- **Honest equivalents.** A defect no input can tell apart from the real code is left out and reported with the reason (for example, an approval limit no order size can hit exactly). A "never" card that no record can trigger is reported to the owner as `GUARD_UNREACHABLE`: the owner thinks it protects them, but it cannot.
- **Cheap.** All defect sources travel in one file, so a run uploads 15 files instead of 76. Upload went from about 11 s to about 2 s. Running 61 defects adds about 0.1 s of compute.
- **No silent pass from a stale sandbox.** The runtime must confirm it read the defect sources; otherwise the verdict fails. Deploy `reeve-runtime` before `reeve-api`.

## Pitch line

"Auditor kami sengaja menanam 61 bug ke kode Builder: rumus salah, langkah terlewat, persetujuan dimatikan. Semua harus tertangkap. Satu saja lolos, tombol setuju tidak muncul."

## Not changed by this

- The demo video still shows the 12 Nov 2026 take (29/29, "Lulus 47 dari 47"). Re-recording is a separate decision.
- The Proof section of the landing page still shows the 18 Oct 2026 ledger, labelled with its date.
