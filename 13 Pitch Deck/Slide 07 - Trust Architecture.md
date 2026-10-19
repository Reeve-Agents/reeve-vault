---
tags:
  - pitch-deck
  - reeve
  - type/page
slide: 7
source: brainstorm session 2026-10-18
up: "[[Pitch Deck Brief]]"
---

# Slide 07 - Trust Architecture

> [!summary] Purpose
> Prove Reeve is safe by design: data never goes to the LLM, keys never enter the sandbox, and money needs a passkey.

## On-slide copy (≤35%)

- Eyebrow: `TRUST BY DESIGN`
- Headline: **Code goes to the data. *Keys never enter the box.***
- Four short labels on the diagram:
  - `LLM sees schema only`
  - `Sandbox: egress locked`
  - `Broker holds keys`
  - `Passkey for money`

## Visual (≥65%)

- **Concept:** an isometric architecture diagram:
  1. **Left cloud (LLM)**, outlined, receiving only a small card labelled "rules + schema + synthetic sample".
  2. **Centre: a glowing box** = CreateOS sandbox (Firecracker microVM). Inside: real data cylinders + generated code. The box edges carry a lock pattern; an outbound arrow to "evil.com" is cut.
  3. **Right: the Broker vault** (`trust` blue) holding real keys. A placeholder token from the sandbox is swapped for the real key only toward allowed hosts (Stripe / Xendit / Midtrans icons).
  4. **Bottom: a phone** with a passkey (Mera) between the broker and "money".
- Only aggregates leave the box (a small output card "3 violations · rows #88 #91 #340").

## Layout

- Diagram ≈ 70%, centred. Headline top. Labels are short call-outs attached to the diagram parts.

## Assets needed

- Isometric box, cloud, vault and phone shapes; lock and broken-arrow glyphs; provider logos (Stripe, Xendit, Midtrans)

## Speaker notes

"Three guarantees. First, the code goes to the data: the LLM only sees rules, schemas and synthetic samples, and the real data stays inside an isolated CreateOS sandbox with outbound traffic locked. Second, the agent never holds a real key: a broker outside the sandbox swaps a placeholder for a short-lived, narrowly scoped key, only for allowed hosts. Third, anything irreversible needs the owner's passkey."

## Sources
- [[Reeve - Auditor Design#Principle: the code goes to the data]] · [[Reeve - Credential Broker and Mera]] · [[Docs - Sandbox REST API - Networking and Egress]]
