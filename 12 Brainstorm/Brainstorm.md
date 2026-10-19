---
aliases:
  - Brainstorm hub
tags:
  - brainstorm
  - type/hub
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Home]]"
---

# Brainstorm

> [!summary] Summary
> - End-to-end log of the brainstorm session on 17 Oct 2026: from deep research on the Stripe × CreateOS partnership, through plan limits and Indonesian accounts, credentials outside the guest, Mera, Monad tools and the agentic economy, to the final idea **Reeve**.
> - **Final idea: [[Reeve - Overview]]**, AI agents that run any business flow as a living SOP on the owner's behalf, built from two agents (Builder/Operator + Auditor/Judge, maker-checker); finance billing is the demo vertical. Former working name: FinAgent. The Owner approves with a passkey. Core is Web2, on CreateOS Free + Stripe test mode/MPP + Mera.
> - Read in order: Overview → Builder Business Flow → Auditor Design → the remaining notes.

## Reading path

1. [[Partnership Analysis Report]]: research context. Why "a trust layer for agents" is the strongest direction.
2. [[Brainstorm - Idea Evolution]]: from the 7 report ideas → Keyless Agent → Tukang → 4 alternatives → Reeve.
3. [[Reeve - Overview]]: concept, maker-checker, narrative and pitch, positioning.
4. [[Reeve - Builder Business Flow]]: stakeholders, phases 1–4, inputs/processing/outputs.
5. [[Reeve - Auditor Design]]: code goes to data, mutation tests, receipts, Audit vs Diligence.
6. [[Reeve - SOP Inputs and Rule Types]]: multi-source input, rule/constraint/KPI, other domains.
7. [[Reeve - Connectors and Composio]]: connectors, MCP at build time vs runtime, Composio.
8. [[Reeve - Credential Broker and Mera]]: credentials outside the guest, broker, Mera.
9. [[Reeve - Agent Payments]]: Stripe Projects purchases, Stripe MPP, x402, mandates.
10. [[Reeve - Architecture and Stack]]: Vercel/Supabase/Railway/CreateOS/Composio, Free plan, Web2 vs Web3.
11. [[Reeve - Screens Demo and MVP]]: 9 screens, demo order, MVP for 5.5 hours.

## Reference

- [[Reeve - Executive Summary]]: one-pager for business-plan competitions and pitches
- [[Reeve - Payment Rails Indonesia]]: can Reeve pay automatically, Stripe in Indonesia, adapter vs migration
- [[Reeve - Sustainability and Crypto Layer]]: Energy SOP, Green Auditor, efficient AI; crypto for proof (anchoring, ERC-8004, 0G TEE), not payment (BI prohibition)
- [[Reeve - Sustainability Summary and SDGs]]: 16 aligned innovations, the measured-only data-trust rule, Green Rewards, the BCA green-loan bridge, SDG mapping (6, 7, 8, 9, 11, 12, 13, 15)
- [[Competitions for Reeve]]: competitions open now plus the 2027 watchlist (prizes, deadlines, eligibility, fit)
- [[Plan Constraints - Free vs Beginner]]: Free vs Beginner, prices, Indonesian accounts, VPN, legitimate options, idea list by plan
- [[Monad Tools Evaluation]]: Mera, Dynamic, ERC-8004, Envio, Cleanverse, MetaMask Agent Wallet, Chainlink CRE
- [[Brainstorm - Open Questions and Risks]]: open questions, demo risks, `.env` warning

## Key decisions

| Decision | Choice | Reason |
|---|---|---|
| Idea | Reeve (Builder/Operator + Auditor/Judge) | Business-process digitalisation, maker-checker, unlike the devtools-heavy official ideas |
| Name | **Reeve** (formerly FinAgent) | A medieval estate official acting for the owner: covers agent, build SOP, audit, monitor, bridge to tools |
| Positioning | Any business flow → living SOP; finance billing as the demo vertical | Not finance-only; Stripe sponsor, high risk justifies the Auditor, focus |
| Plan | CreateOS Free | Indonesia cannot upgrade via Stripe Projects; Reeve fits with sandboxes used in turn |
| Payments | Stripe Projects + SPT (purchases), Stripe MPP test mode (402), Mera mandates | All Web2; MPP is not limited by the Free plan |
| Web3 / crypto | **Crypto proof layer in the core** (on-chain receipt anchoring, 0G TEE inference, ERC-8004 Auditor identity). **No crypto payments** for Indonesian users | User decision 18 Oct 2026 ("gas, not roadmap"); BI prohibits crypto as a means of payment, but proof carries no money ([[Reeve - Sustainability and Crypto Layer]]) |
| Credentials | Broker outside the sandbox (Railway) + Mera vault | Real keys never enter the guest |
| Connectors | Stripe direct now; Composio as the connector layer | `COMPOSIO_API_KEY` only in the broker |
| Stack | Vercel + Supabase + Railway + CreateOS + Composio, all via Stripe Projects | Free tiers, adds to Stripe's metric |
| Not used | Dynamic, ERC-8004, Envio, Cleanverse, MetaMask, Chainlink | No role in Reeve's MVP |

## Related
- Up: [[Home]]
- [[Hackathon Overview]] · [[Hackathon Ideas]] · [[Stripe Projects]] · [[CreateOS Docs]]
