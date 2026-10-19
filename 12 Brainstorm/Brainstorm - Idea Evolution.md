---
aliases:
  - Idea Evolution
  - Tukang
  - Naming
tags:
  - brainstorm
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Brainstorm]]"
---

# Brainstorm - Idea Evolution

> [!summary] Summary
> - The path to the final idea: **7 ideas from the report** → **Keyless Agent + Mera** → **Tukang** (agent freelance marketplace, agentic economy) → **4 alternative ideas in different categories** → **merge Idea 1 + Ideas 2+3 = Reeve**.
> - The user's key observation: almost every official idea is **tools & infra for developers**; none represents **business-process digitalisation / the agentic economy**. That became the differentiation angle.
> - Hackathon theme (the hard constraint): **"Build Agents That Run Code"**. The agent must write code and run it in a CreateOS sandbox.

## Stage 0: hackathon theme

- Brief: start from an empty directory → set up the stack with Stripe Projects → the agent writes and runs code in a CreateOS sandbox → submit to the Stripe Projects leaderboard → demo at 6 PM PT.
- FAQ: any agent that writes and runs code in a CreateOS sandbox fits; the 30 ideas are "starting points, not tracks". See [[Hackathon FAQ]] and [[Hackathon Overview]].
- Consequence: marketplace/payment layers are fine, **as long as the core is code execution in the sandbox**.

## Stage 1: the 7 ideas from the research report

From [[Partnership Analysis Report]]; most fit the Free plan:
1. **Keyless Agent** (credential broker)
2. **Agent Budget Guard** (one budget per agent across Projects + compute + LLM tokens)
3. **Pay-per-run runner** (MPP + x402)
4. **Egress Truth Test** (verifies that egress rules really hold)
5. **Run Diff & Replay**
6. **Issue-to-PR background agent**
7. **`agent-runs-code` template** in Stripe Projects

## Stage 2: Keyless Agent + Mera

- The user proposed injecting credentials using Mera. Evaluation: fits on the **broker/user side**, not inside the sandbox. See [[Reeve - Credential Broker and Mera]].

## Stage 3: Tukang, an AI agent freelance marketplace (agentic economy)

The user's example: run AI agents as freelancers / economic units that do paid tasks, generating income for the agent and its owner.

```text
Klien (manusia/agent) ──post task + budget──▶ Tukang
        │                                         │ match ke agent (skill, harga, reputasi)
        │ bayar ke escrow (HTTP 402 / MPP)        ▼
        │                              Agent "worker" (identitas dari Mera)
        │                                         │
        │                         CreateOS sandbox baru per job
        │                         egress allowlist + key via broker
        │                                         │ hasil + test acceptance
        ◀──── hasil + receipt bertanda tangan ────┘
   Test lolos → escrow cair → split: owner / biaya compute / fee platform
```

| Component | Use |
|---|---|
| CreateOS Sandbox | 1 job = 1 fresh microVM, self-signal destroy; egress allowlist; ingress/preview URL; exec + file transfer; per-second rate for job cost |
| Stripe Projects | Provisions Tukang's stack; `--json --no-interactive` lets agents provision services themselves; spend limits per agent |
| Stripe MPP (test mode) | A client agent pays for a task via 402 |
| CreateOS MPP (optional) | The agent pays for its own deploys in USDC on Base |
| Mera | `owner:vault`, `agent:<id>` identity signing receipts, `client:<id>:memory`, passkey re-prompt for escrow release |

**Agent P&L (the "economic unit" core):**

```text
Agent "recon-bot" — Oktober
Pendapatan task      $42.00   (14 task)
− Compute sandbox    $ 0.31   (dihitung dari detik × $0.0362/vCPU-jam + RAM)
− Token LLM          $ 3.90
− Fee platform 10%   $ 4.20
= Net ke owner       $33.59   (task ditolak: 2, refund: $0)
```

- **MVP:** one task type ("reconcile a Stripe payout CSV vs the bank" (#6) or "fix the function until the tests are green"), a job queue (Free = 1 sandbox), escrow as a DB record + MPP test mode, broker + Mera approval, P&L dashboard.
- **Demo (2 minutes):** post task + 402 payment → sandbox comes up, `printenv` placeholder, egress blocked → tests green, signed receipt → passkey releases escrow, P&L ticks up → fresh browser, identity reconstructs.
- **Optional Web3 tools:** MetaMask Agent Wallet (x402 + ERC-8004 reputation), Dynamic (agent wallets + delegated access), Chainlink CRE (escrow release), Envio (indexing receipts), Cleanverse (owner KYC). See [[Monad Tools Evaluation]].
- **Risk:** Stripe MPP runs on Tempo, while CreateOS "MPP" uses USDC on Base/Arbitrum; they are different protocols.

## Stage 4: four alternative ideas at the same level, in different categories

| Idea | Category | Core | Sandbox features | Stripe angle |
|---|---|---|---|---|
| **1. SOP-to-Agent (Ops Twin)** | SME business-process digitalisation | The owner uploads an SOP in plain language; the agent writes automation code, tests it, runs it on a schedule | Auto-pause + wake-on-request, egress only to `api.stripe.com` | Stripe Invoicing/dunning, Stripe Projects for DB/email |
| **2. Compliance-as-Code** | Enterprise regulation/governance | Regulation text → agent writes checks → run against company data → reproducible audit report | Egress fully blocked, fork per regulation version, receipts per run | Subscription per auditor; fits CreateOS's enterprise narrative |
| **3. Confidential Data Room Analyst** | Privacy / confidential compute | Investor uploads a startup data room; agent writes analyses (cohorts, unit economics); output = memo + reproducible code | No egress, data + memory encrypted with Mera per deal, sandbox destroyed when done | Pay per analysis via Checkout; Stripe metrics data |
| **4. Claim Checker** | Media / public | A claim ("rice prices up 20% in a year") → agent writes code to pull public datasets and compute → verdict + code as proof | Egress only to official dataset domains, `devbox:1` pandas, public URL for the report | Media/newsroom subscription |

User feedback and the decision:
- Idea 1's agent positioning was unclear ("personal assistant integrated with Stripe?"). It was reframed as an **SOP compiler + operator + maintainer** ([[Reeve - Builder Business Flow]]).
- Idea 2 "jujur bagus" (an autonomous auditor), but the big risk is data leaking to an external LLM. Answered with "the code goes to the data" ([[Reeve - Auditor Design]]).
- Idea 3 is similar to Idea 2 (an auditor for startups), so it was **merged as Diligence mode** in Idea 2.

## Stage 5: merge → FinAgent (later renamed Reeve)

- The user: "gabung ide 1 dan ide 2+3 … personal FinAgent (Finance Agent): 1 as SOP builder, operator and maintenance; 2 as auditor and judger".
- Recognised as a **maker-checker fusion**. See [[Reeve - Overview]].
- Decisions afterwards: core Web2 ([[Reeve - Architecture and Stack]]); payments via Stripe Projects + Stripe MPP + Mera mandates ([[Reeve - Agent Payments]]); connectors via Composio ([[Reeve - Connectors and Composio]]); SOP input from many sources, plus a rule/constraint/KPI classification ([[Reeve - SOP Inputs and Rule Types]]).

## Stage 6 - Naming

- **FinAgent** → renamed, because "Fin" (finance) is too narrow. Positioning became **any business flow turned into an SOP**; finance stays the demo.
- Requirement from the user: the name must carry an **agent** meaning and cover **build SOP, audit, monitor, bridge to tools**, and be **easy to pronounce**.

| Round | Candidates | User verdict |
|---|---|---|
| 1 | SOPilot, OpsTwin, Rulewright, Checkmate, Procedo | "kurang keren" |
| 2 | Janus, Golem, Edict, Axiom, Writ | "coba yg lain" |
| 3 | Tandem, Bureau, Keel, Steward, Kairo, Mandor | Tandem liked, but it tells the "two agents" story, not SOP building/auditing/monitoring/bridging |
| 4 | Praxis, Opsmith, Governor, Codify, Conduit | Praxis liked; then: "narasi ke AI agentnya?" (Praxis ← *prassein*, to act; agent ← *agere*, to act). Praxent / Praxia offered |
| 5 | Enact, Actum, Agera, Praxa | "jelek" |
| 6 | Marshal, Conductor, Foreman | "lainnya" |
| 7 | **Reeve**, Vizier, Majordomo, Bosun | **"GAS REEVE MANTAP"** |

- Final: **Reeve**. See [[Reeve - Overview#Name - Reeve]].

## Related
- Up: [[Brainstorm]]
- [[Hackathon Ideas]]: the official 30 ideas (mostly devtools/infra)
- [[Ideas - Money]] · [[Ideas - Stretch]]
