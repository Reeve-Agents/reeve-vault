---
aliases:
  - Customer service blueprints
  - Contact centre blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Customer Service

> [!summary] Summary
> - 4 bank customer-service blueprints (slug prefix `cs-`) for a "mid-size retail bank": containment, agent assist, kill-switch controls on money movement, and a staged read-only-first rollout.
> - All figures are **modelled**, not measured, even though the pages are written in past tense; CreateOS labels blueprints as designed-but-not-delivered. Shared baseline: ~5 million contacts a year, $25M contact-centre base, ~6 minutes average handle time, ~$5 per contact, 30% containment, ~79% satisfaction.
> - Shared design: per-session Firecracker micro-VM, kernel (eBPF) egress allowlist to sanctioned core-banking APIs, separate answering and acting agents, grounded content only, self-hosted in the bank's region.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## Routine Questions Make Up Most of the Contact Volume
- **URL:** https://createos.sh/case-studies/cs-01-containment-without-risk
- **Persona:** Mid-size retail bank. Tags: Customer Service, Containment.
- **Problem:**
  - Roughly 5 million contacts a year across voice, chat and messaging, mostly routine; $25M a year at about six minutes handle time and $25 to $50 an hour fully loaded (~$5 per contact).
  - Containment near 30% leaves ~3.5 million contacts reaching a person; ACSI Finance Study 2025 bank satisfaction at 80 on a 100-point index.
  - Risks: a hallucinated answer is the bank's official position (unfair-and-deceptive-practices exposure), cross-session leakage, actions outside policy; risk function vetoed twice.
- **Proposed workflow:**
  - Agent workforce deployed inside the bank's boundary; no single agent both invents an answer and acts on it.
  - Answers strictly from the bank's grounded content; customer authenticated before anything account-specific.
  - Per-session micro-VM with own guest kernel; sanctioned core-banking paths allowlisted in the kernel; frustration read in real time to hand off to a person; all interactions logged.
  - Live read-only first (three weeks on informational intents), then transactional intents one at a time, each egress-gated and confirmation-gated.
- **Assumptions:** handle time, hourly cost and cost per contact are inputs replaced with client actuals in Phase 0; no portable industry containment band (depends on intent mix).
- **Proof plan:** Phase 0 baseline (cost per contact, containment, handle time, satisfaction); read-only live period; actions enabled one at a time (page has no separate proof-plan section; see [[#Earning Each Permission Before Taking the Next One]] for the four phases).
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Containment rate | 30% | 60% (1.5 million contacts a year taken off the queue) |
| Live-agent contact volume | 3.5M/year | 2.0M/year |
| Average handle time, assisted | ~6 minutes | Minus 20% |
| Resolution time, contained | Minutes | Seconds |
| Customer satisfaction | ~79% | Maintained or improved |
| Annual operating cost | $25M | $15M to $17.5M ($7.5M to $10M saved, a 30% to 40% cut) |
| Saving split | N/A | Roughly $7.5M from containment, ~$2.0M from handle-time reduction |
| Unauthorized actions | Risk | Zero, enforced in-kernel |
| Cross-customer data leakage | Risk | Zero, per-session isolation |
| Audit coverage | Partial | 100% |

## Deflection Leaves the Hard Calls for a Human
- **URL:** https://createos.sh/case-studies/cs-02-agent-assist-handle-time
- **Persona:** Mid-size retail bank. Tags: Customer Service, Agent Assist.
- **Problem:**
  - After containment, the 2 million contacts still reaching a human are the hard residue (disputed charges, fraud claims, complex accounts), so handle time would rise.
  - Much of handle time is searching across core banking, policy library, CRM and wikis to assemble context.
  - Two prior automation pushes were framed as headcount reduction and were resisted by the floor.
- **Proposed workflow:**
  - Two agents that never speak to the customer and have no authority; they retrieve and draft only.
  - Context pre-assembled when the conversation opens (customer history, policy, disputed transaction, prior contacts); drafts to approve, edit or discard; next-best action from the bank's rules.
  - Frustration and urgency read in real time for supervisor escalation.
  - Rollout suggest-only with volunteers who can ignore it; same isolation, egress control and audit logging as the customer-facing crew.
- **Assumptions:** onshore agent time $25 to $50 an hour fully loaded; ~6 minute average handle time; 20% reduction is the conservative committed figure ("not the 50% some vendors claim").
- **Proof plan:** adoption measured before reaching the floor; handle time measured against the bank's Phase 0 baseline; human keeps decision authority on every escalated contact.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Contacts reaching a human | 3.5M/year | 2.0M/year |
| Average handle time, assisted | ~6 minutes | Minus 20% |
| Context assembly time per contact | Material | Near zero |
| Cost recovered, assist layer | N/A | ~$2.0M/year |
| Cost recovered, full program | $25M base | $7.5M to $10M/year |
| Customer satisfaction | ~79% | Maintained or improved |
| Human decision authority on escalations | 100% | 100% |
| Audit coverage of assist suggestions | N/A | 100% logged |

## A Hallucinated Answer Is the Bank's Official Position
- **URL:** https://createos.sh/case-studies/cs-03-agent-cannot-move-money
- **Persona:** Mid-size retail bank. Tags: Customer Service, Controls.
- **Problem:**
  - A conversational agent speaks in the bank's voice and can act on the account: hallucinated answers, cross-customer leakage in shared-runtime chatbots, and actions outside policy that move real money (the exposure that ended both prior evaluations).
  - Vendors answered with prompts, fine-tuning and policy layers, which are requests made of a model, not controls; vendors own the conversation and rent the runtime.
- **Proposed workflow:**
  - Unauthorized action made impossible: the only agent touching core banking has kernel egress allowlisted to approved core-banking APIs.
  - Cross-customer leakage made impossible by construction: own micro-VM and guest kernel per session, destroyed when the conversation ends.
  - Hallucination designed out by separation of duties: answering agent uses grounded content and cannot act; acting agent cannot compose answers.
  - Irreversible actions need explicit customer confirmation and, if the bank chooses, a named human; kill switch is the VM lifecycle; every interaction logged.
  - Read-only on real traffic first, transactional intents one at a time; control plane in the bank's region; SOC 2 Type II and ISO 27001 (card and payment intents in scope).
- **Assumptions:** same $25M base and containment baseline as the other cs- blueprints.
- **Proof plan:** read-only phase on production traffic demonstrates grounded accuracy and session isolation before the agent can move money; risk function sign-off table (see metrics).
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Unauthorized action | Model is instructed not to | Network path does not exist (eBPF, in-kernel) |
| Cross-customer isolation | Application-layer, code-dependent | Per-session Firecracker micro-VM, own guest kernel |
| Hallucinated answers | Prompt and fine-tuning | Grounded content only; answering agent cannot act |
| Data residency | Vendor cloud | Self-hosted in the bank's region and boundary |
| Kill switch | Redeploy | VM lifecycle, instant suspension |
| Audit trail | Partial | 100% of interactions and actions, replayable |
| Containment lift | 30% | 60%, deflecting 1.5 million contacts a year |
| Annual savings | $25 million contact-center base | $7.5M to $10M |

## Earning Each Permission Before Taking the Next One
- **URL:** https://createos.sh/case-studies/cs-04-read-only-before-money
- **Persona:** Mid-size retail bank. Tags: Customer Service, Shadow Mode.
- **Problem:**
  - Pilots die twice: in procurement (data residency, network reach, isolation as code versus machine) and by moving too fast against containment numbers of 70% to 90% sold from a deck.
  - One bad transcript can pull a programme for two years; the previous pilot had no measured baseline, so nobody could prove it worked.
- **Proposed workflow (four phases, sequencing is the product):**
  - Phase 0 baseline, weeks 1 to 2: measure actual cost, containment, handle time, satisfaction; baseline written into the contract.
  - Phase 1 build, weeks 2 to 6: integrate core, knowledge base, authentication and voice/chat/messaging channels along allowlisted paths, self-hosted, deliberately narrow intents.
  - Phase 2 read-only live, weeks 6 to 9: three weeks of real traffic on balances, FAQs, product questions and card status with no ability to move money.
  - Phase 3 controlled actions, week 9 onward: transactional intents one at a time, each egress-gated and confirmation-gated.
- **Assumptions:** commits to a containment lift into the 50% to 60% range on the right intent mix and "would not promise 90%"; $25M base; 79% satisfaction baseline.
- **Proof plan:** every number has a measured before agreed in writing; read-only phase generates evidence rather than value; programme described as live in nine weeks.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Containment | 30% | 60% (1.5 million contacts a year deflected) |
| Average handle time, assisted | Baseline | Down 20% |
| Customer satisfaction | 79% baseline | Maintained and improved |
| Annual cost reduction | $25 million base | $7.5 million to $10 million (30% to 40% cut) |
| Unauthorized actions | Risk | Zero, enforced in the kernel |
| Cross-customer data leakage | Risk | Zero, per-session isolation |
| Audit coverage | Partial | 100% of every interaction and action |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Fraud]]: same kernel-level money-movement controls
- [[Blueprints - Lending]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
