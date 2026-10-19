---
aliases:
  - Reeve
  - FinAgent
  - Finance Agent
tags:
  - brainstorm
  - reeve
  - type/hub
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Brainstorm]]"
---

# Reeve - Overview

> [!summary] Summary
> - **Reeve** is the chosen hackathon idea: AI agents that **run any business flow as a living SOP on the owner's behalf**. Two agents with separate roles (maker-checker): **Builder/Operator** compiles an SOP into code, connects it to tools, runs it and maintains it; **Auditor/Judge** audits and judges every rule, change and run, and monitors it live. The **Owner** holds final approval through a passkey (Mera).
> - **Not only finance.** Positioning covers any business flow with clear triggers, conditions and actions. **Finance (billing) is the demo vertical**, because Stripe is the sponsor.
> - Former working name: **FinAgent** (renamed because "Fin" sounds finance-only). See [[#Name - Reeve]].
> - Origin: a merge of brainstorm Idea 1 (SOP-to-Agent / Ops Twin) and Ideas 2+3 (Compliance-as-Code + Confidential Data Room). See [[Brainstorm - Idea Evolution]].
> - Theme fit: the agent **writes code and runs it in a CreateOS sandbox**, with the stack provisioned through [[Stripe Projects]]. The marketplace/payment layers sit on top, so the core must not drift away from sandbox code execution. See [[Hackathon Overview]] and [[Hackathon FAQ]].
> - Stack: CreateOS Free + Stripe (test mode, MPP) + Mera + Vercel + Supabase + Railway + Composio. Payments are Web2 (rupiah rails); the **crypto proof layer is core** (receipt anchoring, 0G TEE inference, ERC-8004). See [[Reeve - Sustainability and Crypto Layer]].

## Name - Reeve

- **Reeve** (pronounced /riv/, one syllable) was a medieval official who **ran an estate on the lord's behalf**.
- The name was chosen because it fits all five requirements:

| Requirement | Meaning in "reeve" | Reeve (product) |
|---|---|---|
| **Agent** | Acted *on behalf of* the owner | AI agents acting for the business owner |
| **Build SOP** | Organised daily work according to the estate's rules and customs | Builder compiles the SOP into code + tests |
| **Audit** | His accounts were audited every year | Auditor judges every rule, change and run; receipts |
| **Monitor** | Supervised workers in the field | Live monitoring, KPI monitors, glass box |
| **Bridge to tools** | Liaison between the owner, tenants and the market | Connectors to Stripe, Sheets, Shopify… (Composio, broker) |

- Pitch bonus: the word *sheriff* comes from *shire-reeve*.
- Rejected candidates and why (user feedback): SOPilot ("kurang keren"), Janus / Golem / Edict / Axiom / Writ, Tandem (about two agents, not SOP building/auditing/monitoring/bridging), Praxis (good, but weak "agent" meaning; Praxent/Praxia were hard to say), Enact / Actum / Agera / Praxa ("jelek"), Marshal / Conductor / Foreman, Vizier / Majordomo / Bosun. See [[Brainstorm - Idea Evolution#Stage 6 - Naming]].

## Tagline

> *"Your operations, run on your behalf."*

Old FinAgent tagline (finance-only, kept for history): *"SOP keuanganmu, ditulis jadi kode, dijalankan, dan diaudit oleh AI agent, tanpa uang bergerak tanpa izinmu."* Closing line: *"Agent yang bukan cuma bisa nulis kode, tapi bisa dipercaya pegang uang."*

## Registration answer - What will you build

Long version:

> We're building **Reeve**, AI agents that run your business SOPs on your behalf. A business owner describes how a process works in plain language: chat, voice, a PDF SOP, or a spreadsheet. Reeve's **Builder** agent asks clarifying questions and classifies each statement as a rule to execute, a constraint to guard, or a KPI to monitor. It writes the rules as tested code, connects them to the business's tools, simulates the flow end to end in a CreateOS sandbox, then runs and maintains it, proposing a tested diff whenever a rule changes.
>
> A separate **Auditor** agent is the checker in a maker-checker pair. It reviews every rule and change, plants fake violations to prove its checks really catch them, monitors runs live, and issues a reproducible receipt for each one. Sensitive data never goes to the LLM: the code goes to the data, inside a sandbox with egress locked down, and API keys stay in a broker outside the sandbox. Irreversible actions such as refunds, payouts, or new subscriptions need the owner's passkey.
>
> We'll demo it on a real billing flow (a 30-room boarding house: invoices, reminders, late fees, exceptions) using Stripe test mode, with the stack provisioned through Stripe Projects. The same engine runs inventory reordering, procurement approvals, HR leave policies, or support SLAs: any process with clear triggers, conditions, and actions.

Short version (about 60 words):

> **Reeve** runs your business SOPs on your behalf. A Builder agent turns plain-language processes into tested code, connects them to your tools, and runs them in a CreateOS sandbox. A separate Auditor agent verifies every rule and run with mutation tests and receipts, and monitors it live. Data never reaches the LLM; money actions need the owner's passkey. Demo: billing on Stripe.

## Pitch narrative (about 2 minutes)

1. **Problem.** Millions of small businesses (kos, private tutoring, gyms, catering) manage billing via WhatsApp and Excel. Automation tools (Zapier and similar) are too rigid for edge cases: partial payments, double payments, tolerance for long-term tenants. Trusting money to an AI agent is scary: it can miscalculate, leak data, or act on its own.
2. **Insight.** Don't have the agent run the money directly. Have the agent **write code for your rules, prove it with a simulation, then let a second agent audit it**. This is the finance-world maker-checker principle, applied to agents.
3. **Solution: Reeve.**
   - **Builder** compiles the SOP into code plus tests, runs it and maintains it ([[Reeve - Builder Business Flow]]).
   - **Auditor** judges every rule and change with mutation tests and receipts ([[Reeve - Auditor Design]]).
   - **Owner** approves with a passkey.
4. **Why it is safe.**
   - Code runs in an isolated CreateOS sandbox, with egress limited to `api.stripe.com`.
   - Data is never sent to the LLM: the code goes to the data.
   - API keys never enter the sandbox; a broker injects them ([[Reeve - Credential Broker and Mera]]).
   - Every money action needs Face ID / Touch ID (Mera).
5. **Why CreateOS × Stripe.** Stripe Projects provisions the whole stack in one command. Stripe is the billing rail, and MPP lets agents pay and get paid ([[Reeve - Agent Payments]]). CreateOS is the safe place where agent-written code runs.
6. **Close.** *"Reeve: your operations, run on your behalf."* Show that the same engine also runs inventory, HR and CS SOPs ([[Reeve - SOP Inputs and Rule Types]]).

## Why the fusion works (maker-checker)

- **Builder/Operator** owns the workflow: SOP to code, run, maintain.
- **Auditor/Judge** is the checker. It does not write business rules; it only tests and judges the Builder's output.
- Mirrors **maker-checker / segregation of duties**, standard in finance: the rule maker and the checker are deliberately separated, so no one judges their own work. In Reeve both are agents, and the **Owner stays the final approver**.
- The Auditor can also be used **standalone** (audit another company's data, investor due diligence), so the fusion does not limit it.

## Positioning

- **Positioning: any business flow → a living SOP.** The **demo vertical is finance (billing)**, even though the engine is generic. Reasons for that demo choice:
  1. **The sponsor is Stripe.** Money flow is where Stripe is strongest (Invoice, MPP, test clocks).
  2. **High risk.** Wrong billing or a wrong refund is expensive, so the Auditor and passkey approval are clearly necessary, not decoration.
  3. **Focus wins hackathons.** One vertical done well beats a shallow general platform.
- **Long-term narrative:** finance is the entry point (wedge). The final pitch slide shows the same engine running other SOPs.
- Brainstorm note: this is positioned as **business-process digitalisation**, unlike most of the 30 official ideas, which are developer tools and infra ([[Hackathon Ideas]]). Only *Pay-per-run code runner* touches the agent economy.

## Map of Reeve notes

| Note | Content |
|---|---|
| [[Reeve - Builder Business Flow]] | Stakeholders, phases 1–4 (Compile, Simulate and approve, Operate, Maintain), inputs, processing and outputs per stakeholder |
| [[Reeve - Auditor Design]] | "Code goes to data", leak mitigations, mutation tests, receipts, Audit mode vs Diligence mode |
| [[Reeve - SOP Inputs and Rule Types]] | Multi-source input, rule vs constraint vs KPI (the $100k revenue example), non-finance domains |
| [[Reeve - Connectors and Composio]] | Connector layer, inventory, MCP at build time vs runtime, Composio facts |
| [[Reeve - Credential Broker and Mera]] | Credentials outside the guest (HN), broker flow, Mera namespaces, spending mandate |
| [[Reeve - Agent Payments]] | Agent purchases via Stripe Projects + approval, Stripe MPP (verified), x402, payment directions |
| [[Reeve - Architecture and Stack]] | Vercel/Supabase/Railway/CreateOS, Free plan feasibility, Web2 vs Web3 (receipt anchoring) |
| [[Reeve - Screens Demo and MVP]] | 9 screens, demo order, MVP scope for 5.5 hours |
| [[Reeve - Domain Packs]] | One pipeline, many kinds of SOP: rent collection (pack 1), minimarket stock and expiry (pack 2) |
| [[Reeve - Model Providers]] | Choosing the model that reads the SOP: Claude Opus/Sonnet/Haiku, OpenRouter, Gemini, Groq, DeepSeek, OpenAI, Ollama |
| [[Plan Constraints - Free vs Beginner]] | Plan differences, prices, Indonesian account limits |
| [[Monad Tools Evaluation]] | Mera, Dynamic, ERC-8004, Envio, Cleanverse, MetaMask Agent Wallet, Chainlink CRE |
| [[Brainstorm - Open Questions and Risks]] | Things still unverified, risks, security warnings |

## Related
- Up: [[Brainstorm]]
- [[Partnership Analysis Report]]: the research that drives the "trust layer for agents" direction
- [[Hackathon Overview]] · [[Hackathon Ideas]] · [[Stripe Projects]] · [[Docs - Sandbox]]
