---
aliases:
  - CreateOS AI Gateway
  - AI Gateway
tags:
  - createos/product
  - type/page
source: https://createos.sh/products/gateway
scraped: 2026-10-17
up: "[[Products]]"
---

# Product - Gateway

> [!summary] Summary
> - Unified, OpenAI-compatible AI gateway: one endpoint, one API key, one bill, dozens of models from eleven providers.
> - Routes each request to the cheapest available upstream source for that model, with automatic failover.
> - Cost = upstream token price + flat 2.5% platform fee; no minimums, no monthly commitment.
> - ZDR-compliant models available on request: no data stored, no training on your data.
> - Source: https://createos.sh/products/gateway

## Overview

- **Title:** CreateOS AI Gateway.
- Send one request to one endpoint; the Gateway routes it to the cheapest available source for that model, with automatic failover.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · View pricing -> https://createos.sh/pricing/gateway (see [[Pricing - Gateway]]) · product -> https://createos.sh/products (see [[Products]])
- The page also carries the shared CreateOS Skills banner (install, supported tools, core commands, auth, MCP endpoint); details in [[Products]].

## Call any model from one endpoint

- The Gateway is OpenAI-compatible: point any OpenAI client or curl at the base URL, pass the model by name, and switch providers without touching code.
- **Base URL:** `https://createosllm.nodeops.xyz/v1/chat/completions`
- **Auth:** `Authorization: Bearer $CREATEOS_LLM_API_KEY`

```
export CREATEOS_LLM_API_KEY=...

curl https://createosllm.nodeops.xyz/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CREATEOS_LLM_API_KEY" \
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{ "role": "user", "content": "Hello from CreateOS" }]
  }'

# swap "model" to gpt-4o-mini, claude-haiku-4-5, or any supported model. Same endpoint, same key.
```

## How the Gateway works

| Step | What happens |
| --- | --- |
| Send one request | Call one endpoint with one API key. Switch models by changing the model name, with no new SDK and no code changes. |
| Route to the cheapest source | The same model is sold by more than one upstream source, often at different prices. The Gateway compares the live rate across all of them and sends each request to the cheapest. You pay that upstream token price plus a flat 2.5% platform fee, and nothing else. |
| Fail over automatically | Upstream health is monitored in real time. If a source degrades, requests reroute to the next cheapest available one. Built-in redundancy at no extra cost. |

## What the Gateway gives you

| Capability | Detail |
| --- | --- |
| Cheapest-price routing | Every request is priced across all available upstream sources and sent to the lowest, so you never overpay for a model. |
| One API, every model | Dozens of models from eleven providers through a single endpoint. Switch models by changing the model name, with no code changes. |
| Automatic failover | Real-time upstream health monitoring reroutes to the next cheapest available source on an outage. Redundancy at no extra cost. |
| Zero Data Retention | ZDR-compliant models are available on request: the Gateway does not store your data and does not train on it. |

## Route across eleven providers

- Provider line on the page: Anthropic (Claude) · OpenAI (GPT, o-series) · Google (Gemini) · Alibaba (Qwen) · Zhipu AI (GLM) · Moonshot AI (Kimi) · MiniMax · Mistral · DeepSeek
- The pricing table lists models from these providers plus xAI and Xiaomi (see [[Pricing - Gateway]]).
- Dozens of models through one endpoint, priced at the cheapest available source plus a flat 2.5% platform fee. No minimums, no monthly commitment.
- Live model pricing and a cost calculator are on the pricing page.

## Common questions

| Question | Answer |
| --- | --- |
| What is the CreateOS AI Gateway? | A unified API gateway that routes every model request to the cheapest available upstream source. You reach dozens of models from eleven providers through one endpoint, with one API key and one bill, and switch models by changing the model name. |
| How does pricing work? | You pay the base upstream token price plus a flat 2.5% platform fee. The Gateway finds the cheapest available source for every request, so you always pay the lowest rate. No hidden fees, no minimums, and no monthly commitment. Live model pricing and a cost calculator are on the pricing page. |
| Can I switch models without changing code? | Yes. Every model is available through the same endpoint, so switching is as simple as changing the model name in your request. No new SDK and no code changes. |
| What happens if a provider goes down? | The Gateway monitors upstream health in real time. If a source has an outage, requests reroute automatically to the next cheapest available source, so you get built-in redundancy at no extra cost. |

## One API for every model, at the cheapest price

- See live model pricing, or book a demo to route your workloads through the Gateway.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · View pricing -> https://createos.sh/pricing/gateway

## Related
- Up: [[Products]]
- [[Pricing - Gateway]]: full model price table and blended-price formula
- [[Pricing]]: pricing hub
- [[Product - Agents]]: the multi-agent runtime that routes calls through the same governed path
- [[Security]]: governance, zero data retention, certifications
- [[Comparisons]]: how CreateOS compares with alternatives
- [[Integration - Stripe]]: Stripe integration
- [[CreateOS Homepage]]
- [[Hackathon Overview]]
