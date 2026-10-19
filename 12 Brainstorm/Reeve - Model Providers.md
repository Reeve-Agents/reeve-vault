---
aliases:
  - Model providers
  - LLM providers
  - Cheaper models
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: reeve/README.md (Choosing the model), reeve/packages/llm
up: "[[Reeve - Overview]]"
---

# Reeve - Model Providers

> [!summary] Summary
> - Request from the owner on 18 Oct 2026: the AI provider should not be Anthropic only, so an owner with a small budget can choose.
> - Reeve's model only turns the SOP into rule cards. The Builder's code, the sandbox run and the Auditor's checks are the same whichever model reads it, and a card that does not fit the schema is rejected before anything runs. So a cheaper model can be offered without lowering the safety bar.
> - Built: the studio has a **"Who reads your SOP"** picker. Claude Opus 5.5, Sonnet 5.5 and Haiku 5.5 go through the official Anthropic SDK; OpenRouter, Google Gemini, Groq, DeepSeek, OpenAI, Ollama (on the owner's own computer) and any OpenAI-compatible server go through one adapter; a free offline sample replays the hand-written rule cards.
> - Verified live on 18 Oct 2026: Opus 5.5 and **Haiku 5.5** each read both sample SOPs (Kos Melati, Minimarket Berkah) into the same 8 cards as the hand-written rulebooks, and every one of those rulebooks passed the Auditor. The other providers are tested against a fake server only: no key for them is set up yet.

## The choice

| Parser | Price (per million tokens, in / out) | What the owner gets |
|---|---|---|
| Claude Opus 5.5 | $4 / $20 | Most accurate; 8 clarifying questions on the minimarket SOP. The default |
| Claude Sonnet 5.5 | $2 / $10 | Half the price of Opus |
| Claude Haiku 5.5 | $0.10 / $0.50 | About 1/40 of Opus. Same cards on both sample SOPs; fewer clarifying questions (4 instead of 8 on the minimarket SOP) |
| OpenRouter, Gemini, Groq, DeepSeek, OpenAI | The service's price; several have free tiers | Owner brings a key and names the model |
| Ollama on the owner's computer | Free | The SOP never leaves the machine. Needs a capable local model |
| Sample rulebook | Free | Demo only: replays the hand-written cards and ignores the SOP text |

Prices for Claude are the Claude API list prices. Model ids for the other services come from the owner's `.env`, exactly as the service lists them, because those catalogues change too often to hard-code.

## How a cheaper model is kept honest

1. **One schema per domain pack.** The model must answer in the same flat JSON schema whichever provider it is (rent cards for a kos, stock cards for a minimarket). See [[Reeve - Domain Packs]].
2. **Strict output first.** Claude uses structured outputs. The other services are asked for strict JSON Schema; a server that rejects it is retried in plain JSON mode with the schema in the prompt.
3. **One repair turn.** If the reply does not fit (for example a reorder rule without its level), the model is told exactly what is wrong once. A second miss is a clear error, never half-formed cards.
4. **Same Auditor.** Every rulebook, from any model, still goes through Builder tests, the Auditor's independent spec, mutation testing and the constraint check before the owner can approve it. See [[Reeve - Auditor Design]].
5. **Keys stay on the server.** The studio only learns which parsers are set up and what is missing (for example "add GROQ_MODEL").

## What the first live parse taught

Claude Opus 5.5 wrote the supplier as "Supplier A" where the shop's supplier list says "A", and the simulated month crashed on the unknown name. The converter now normalises "Supplier A" / "pemasok B" to the id, and the engine names an unknown supplier instead of crashing. Every number in the cards was right the first time.

## Still open

- Run each OpenAI-compatible provider once against the real service (needs a key; Gemini and Groq have free tiers).
- Show the owner a per-SOP cost estimate next to the picker.
- 0G TEE inference with signed attestations as another provider ([[Reeve - Sustainability and Crypto Layer]]).

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Domain Packs]] · [[Reeve - Auditor Design]] · [[Reeve - Architecture and Stack]]
