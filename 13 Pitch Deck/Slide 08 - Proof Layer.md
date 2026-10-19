---
tags:
  - pitch-deck
  - reeve
  - type/page
slide: 8
source: brainstorm session 2026-10-18
up: "[[Pitch Deck Brief]]"
---

# Slide 08 - Proof Layer

> [!summary] Purpose
> Show that Reeve's work is verifiable by third parties. Every run leaves a receipt, receipts are anchored on-chain as a permanent track record, and private inference is attested in a TEE.

## On-slide copy (≤35%)

- Eyebrow: `PROOF, NOT PROMISES`
- Headline: **Every run leaves a receipt. *Every receipt has a history.***
- Three labels:
  - `Receipts anchored on-chain`
  - `Private AI in TEE (0G)`
  - `Auditor identity (ERC-8004)`
- Footnote (mono, small): `No crypto payments — proof only. Payments stay in rupiah.`

## Visual (≥65%)

- **Concept:** a left-to-right **proof chain**:
  1. **Receipt cards** (code hash · data hash · result · time), each in `ink` with a `trust` blue edge, stacking into
  2. a **Merkle tree** whose root lights up, which drops into
  3. a **block timeline** (daily blocks = the **track record**), with one block expanded to show "Oct 2026 · KPI met · reward issued".
- **Above the chain:** a small "TEE" chip with a shield + signature glyph → "prompt attested (TeeML)".
- **Right edge:** an **identity card** for "Reeve Auditor" (ERC-8004) with a reputation meter.
- Palette: `trust` blue dominant, `white` lines, `signal` for the lit root.

## Layout

- Chain spans ≈ 70% horizontally. Headline top; footnote bottom.

## Assets needed

- Receipt card UI, Merkle tree illustration, block timeline, TEE badge, identity card

## Speaker notes

"Trust needs proof. Every run produces a receipt: hashes of the code, the data and the result. Every day we anchor the root of those receipts on-chain, so the history can't be rewritten or back-dated. That is a track record a lender or buyer can check. When the agents use an LLM, it runs inside a hardware enclave with a signed attestation. Crypto here is proof only; payments stay in rupiah, because Bank Indonesia prohibits crypto as a means of payment."

## Sources
- [[Reeve - Sustainability and Crypto Layer#Part B: Crypto layer]] · [[Reeve - Sustainability Summary and SDGs#2. Data manipulation: keep it in scope]]
