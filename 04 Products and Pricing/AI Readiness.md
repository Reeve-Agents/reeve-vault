---
aliases:
  - AI readiness assessment
  - Are you AI ready
tags:
  - createos/product
  - type/page
source: https://createos.sh/ai-readiness
scraped: 2026-10-17
up: "[[Products]]"
---

# AI Readiness

> [!summary] Summary
> - 3-minute AI readiness assessment: 10 questions, 5 dimensions, shown in 3 parts; each answer 0-4 points, max 40, reported as a percentage.
> - Bands: Early (0-39), Stalled (40-74), Production-ready (75-100).
> - Two rules outrank the total: last agent stopped by security/compliance review proves the need; no owner for getting agents to production blocks everything else.
> - Source: https://createos.sh/ai-readiness

## Overview

- **Title:** Are you AI ready?
- Premise: "Most enterprise AI does not fail in the model. It fails at the review gate, on the integration, or because nobody owns the outcome."
- **CTA:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The site-wide banner links here: "Is your organization AI ready? Take the 3-minute test".

## How it scores

- 10 questions across 5 dimensions, shown to people in 3 parts.
- Each answer carries 0 to 4 points, for a maximum of 40, reported as a percentage.
- Two questions reward the harder position on purpose: an agent stopped by compliance review scores higher than one that never existed, and regulated data scores higher than low-sensitivity data, because both are where a governed execution layer earns its place.

## Bands

| Score | Band | What it means |
| --- | --- | --- |
| 0 to 39 | Early | No agents in flight, and no one owning the outcome yet. The useful next step is not a proof of concept, it is deciding which workflow is worth one and who would own it. Read how other teams picked their first, then come back to this. |
| 40 to 74 | Stalled | Agents exist and something specific is stopping them, usually review rather than engineering. This is the most common position among the enterprises CreateOS works with, and it is the one a governed execution layer is built for: the agent does not change, the boundary around it does. |
| 75 to 100 | Production-ready | The blocker is real, owned and funded, and it is the one CreateOS removes. Worth a scoping conversation now rather than more evaluation: routing, policy enforcement, audit trail, and a deployment boundary you choose. |

## Dimensions

| Dimension | What it measures |
| --- | --- |
| Agents in production | Whether agents exist and what happens when they try to ship. The gap between a working demo and a production deployment is the gap CreateOS closes. |
| Governance and control | Whether policy, access and audit are enforced by a platform or by people remembering to check. Manual enforcement is what review boards reject. |
| Data and context | What your agents can actually see, and how sensitive it is. An agent reasoning over a stale extract is confidently wrong rather than useful. |
| Integration and boundary | How many systems a workflow crosses and where it is allowed to run. Both decide whether an architecture survives its own security review. |
| Ownership and funding | Whether one person owns getting agents to production and whether money exists. Neither is a technical problem, and both stop more projects than technology does. |

## Questions

### Dimension: Agents in production

**1. Where are your AI agents today?**
Agents here means AI that acts in your systems (raises tickets, updates records, runs jobs), not a chatbot.

| Answer | Points |
| --- | --- |
| Several run in production, with more waiting behind them | 4 |
| One or two are live, in controlled conditions | 3 |
| Demos and proofs of concept exist, none has passed review | 1 |
| Nothing built yet, we are still evaluating | 0 |

**2. What stopped the last agent that did not ship?**
Think of the most recent agent that was built but never made it into everyday use. (Blocked by review scores highest: the agent exists and the obstacle is specific.)

| Answer | Points |
| --- | --- |
| Security, risk or compliance review | 4 |
| Infrastructure, cost, or unclear ownership | 2 |
| Nothing has stalled, our agents ship | 1 |
| Nothing has been tried, so nothing has failed | 0 |

### Dimension: Governance and control

**3. How are AI policies, access control and audit enforced today?**
Who may use which AI with which data, and is that enforced by software, a document, or nobody?

| Answer | Points |
| --- | --- |
| Enforced by the platform, with a complete audit trail | 4 |
| Documented, but enforcement is manual | 2 |
| Handled case by case as issues surface | 1 |
| No formal framework yet | 0 |

**4. When do security and compliance enter an AI project?**
When do security, risk or compliance teams first get involved in an AI build?

| Answer | Points |
| --- | --- |
| From day one. Their requirements shape the design | 4 |
| Before any major deployment | 3 |
| Late, which causes delays or rollbacks | 1 |
| Not yet involved | 0 |

### Dimension: Data and context

**5. Can your agents reach live operational state, not just static extracts?**
Can an agent read today's data straight from your CRM, ERP or ticketing tool, or only earlier exports?

| Answer | Points |
| --- | --- |
| Yes, directly from the systems of record | 4 |
| Partly. Some live, some batched or delayed | 2 |
| No. Static datasets and periodic snapshots | 1 |
| Agents are not connected to operational data at all | 0 |

**6. What kind of data would your agents touch in production?**
Regulated means data a law or regulator governs: customer, patient or payment records. (Regulated data scores highest: it is where a governed execution layer earns its place.)

| Answer | Points |
| --- | --- |
| Regulated: personal, health, payment or client records | 4 |
| Confidential business data | 2 |
| Internal, low sensitivity | 1 |
| Not established yet | 0 |

### Dimension: Integration and boundary

**7. How many enterprise systems does a typical agent workflow touch?**
Count the applications one agent task reads from or writes to. CRM, email, warehouse and ticketing is four.

| Answer | Points |
| --- | --- |
| More than ten, across fragmented environments | 4 |
| Six to ten, spanning departments | 3 |
| Three to five | 2 |
| One or two, self-contained | 1 |

**8. Where do these workloads have to run?**
Any rules on where AI may run and data may go: your own cloud, your own servers, one country, anywhere?

| Answer | Points |
| --- | --- |
| Hard requirement: our VPC, on premise, or a sovereign boundary | 4 |
| A preference for regional or VPC control, still forming | 3 |
| Public cloud is fine and unquestioned | 1 |
| Not decided | 0 |

### Dimension: Ownership and funding

**9. Who owns getting agents into production?**
If an agent is stuck, whose job is it to unstick it, and is that written into their goals?

| Answer | Points |
| --- | --- |
| An executive owns the blocker and is measured on it | 4 |
| A named leader owns AI delivery, alongside other priorities | 2 |
| Owned informally, by whoever has capacity | 1 |
| Nobody. AI is an experiments budget | 0 |

**10. What is the funding position?**
Is money set aside to take agents into production, and is there a decision deadline?

| Answer | Points |
| --- | --- |
| A funded initiative with a decision window inside two quarters | 4 |
| Proof-of-concept budget findable inside an existing line | 2 |
| Being built into next cycle's planning | 1 |
| None. Exploratory interest | 0 |

## Two rules that outrank the total

- If the last agent was stopped by security or compliance review, the need is proven whatever the total says: the agent worked and the boundary around it did not.
- If nobody owns getting agents into production, no score elsewhere compensates, and that is worth settling before any proof of concept.

## Book a demo

- **CTA:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile

## Related
- Up: [[Products]]
- [[Service - AI Strategy]]: readiness assessment and stuck-pilot audit service
- [[Services]]: forward-deployed engineering services
- [[Security]]: governance and zero data retention
- [[Product - Agents]]: governed agents runtime
- [[Case Studies]]
- [[Industries]]
- [[CreateOS Homepage]]
