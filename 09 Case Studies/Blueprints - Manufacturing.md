---
aliases:
  - Manufacturing blueprints
  - Industrial AI blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Manufacturing

> [!summary] Summary
> - 13 manufacturing solution blueprints (slug prefix `mfg-`), tagged "Industrial AI", for different manufacturer types: agent order checkpoints, procurement mandate limits, work-order validation, regulated quality evidence, in-country runtime, rescheduling, engineering change, line sign-off, stalled pilots, spend control, replenishment, inspection and a multi-vendor control tower.
> - All are **modelled / not delivered**: each page states its figures are "targets and instrumentation, not results already delivered", so these blueprints carry no dollar outcomes, only pilot design and a few cited market figures.
> - Shared pilot shape on every page: 60 to 90 day pilot on a single line, cell, category or product family; baseline captured in weeks 1-2; watch-only in weeks 3-6 (every action scored, nothing blocked); then enforce; then a readout against one agreed number.
> - Shared design: a checkpoint on the write path beneath the agent, run inside the manufacturer's environment; CreateOS builds no planning, procurement or negotiation engine, so its verdict is independent.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## One Bad Automatic Order Eats a Week of Margin
- **URL:** https://createos.sh/case-studies/mfg-01-order-checkpoint
- **Persona:** Discrete manufacturer, multi-plant. Tags: Supply Chain, Purchase Orders.
- **Problem:**
  - Planning and procurement tools cut real purchase orders, move inventory and rewrite production orders on their own; a wrong one costs expedite freight or a missed ship date.
  - Most such tools never reach production (McKinsey 2025 State of AI survey cited); no vendor governs actions across the tools an operation runs.
- **Proposed workflow:**
  - A checkpoint on the write path re-reads stock, lead time and open commitments at the moment of write before an order is allowed through.
  - Reads on-hand and in-transit stock, supplier standing, quoted lead time, open orders or reservations; writes the purchase order unchanged once it passes; no write path to master data, supplier records or contract pricing.
  - Holds go to the buyer who owns the category with approve or reject in one action; timestamped reads fail on stale data; an unanswered hold stays held; every decision recorded.
- **Assumptions:** value bands, supplier status and exception types are the customer's thresholds; named approver and escalation clock agreed before go-live.
- **Proof plan:** 60 to 90 day pilot; baseline weeks 1-2; watch-only weeks 3-6; enforce; readout against one agreed number; runs with zero data egress inside the manufacturer's environment including at the plant.
- **Modelled metrics (pilot targets, not results):** expedite spend avoided against the weeks 1-2 baseline; orders stopped before commit, each logged with its rule; a decision record per action.

## An AI Agent for Procurement, Bounded by Mandate
- **URL:** https://createos.sh/case-studies/mfg-02-negotiation-limits
- **Persona:** Manufacturer, indirect and tail spend. Tags: Procurement, Supplier Negotiation.
- **Problem:**
  - Agents negotiate price, payment terms and volume with suppliers; a signed term binds the company; mandate limits that live in a prompt are not a control.
  - Market evidence cited: Walmart's agent rollout closed with 68% of suppliers approached at about 3% average saving (Harvard Business Review), "cited as market evidence rather than a CreateOS result".
- **Proposed workflow:**
  - Agent negotiates inside a mandate enforced beneath it: price floors, term ranges, volume ceilings from the customer's authority matrix (spend limits by category, supplier risk tiers, payment-term and rebate boundaries, indexation rules).
  - Out-of-band terms stop for a one-click approve or reject with the exchange attached; supplier-side claims checked against the buyer's contract history; pre-signature check compares the deal to open contracts and the demand plan.
  - Full negotiation retained where the negotiating tool cannot edit it; mandate changes happen above the agent, versioned.
- **Assumptions:** CreateOS builds no negotiation agent and takes no share of the gain; savings recomputed against the category's prior terms and actual invoices; silence never closes a deal.
- **Proof plan:** 60 to 90 day pilot on one spend category: baseline, watch-only, enforce, readout.
- **Modelled metrics (pilot targets, not results):** terms outside mandate blocked at source; savings measured against own baseline; complete exchange record per deal.

## Bad Work Orders Pull Crews and Parts You Don't Need
- **URL:** https://createos.sh/case-studies/mfg-03-work-order-validation
- **Persona:** Process manufacturer, continuous operations. Tags: Maintenance, Reliability.
- **Problem:**
  - Machine-health tools write work orders directly into SAP PM, Maximo or MaintainX; some are duplicates, pull parts for faults that never existed or send a crew to the wrong asset.
  - ~42% of unplanned downtime incidents are equipment failure (Siemens, True Cost of Downtime, vendor-reported); signals may be stale before they are acted on.
- **Proposed workflow:**
  - Each work order is validated before it is written: open order on the asset, asset state (in service, changeover, already down, contractor), reading current and in range, parts and skills available, priority against the plant's criticality matrix.
  - Technician receives the reasoning with the job; no-fault-found closures recorded against the raising signal; critical assets stay behind a person; record kept in the plant's environment.
- **Assumptions:** hard limits per asset class set before go-live; plant boundary deployment, machine data never leaves.
- **Proof plan:** 60 to 90 day pilot on one asset class: baseline, shadow, enforce, readout.
- **Modelled metrics (pilot targets, not results):** duplicate and false-fault orders stopped; technician hours returned; parts consumption against real faults only.

## The AI Drafted the Deviation, the 483 Lands on You
- **URL:** https://createos.sh/case-studies/mfg-04-regulated-quality-evidence
- **Persona:** Regulated manufacturer, GxP environment. Tags: Quality, Regulatory.
- **Problem:**
  - Quality teams use AI to draft deviations, investigations and batch records while a person signs the release; the signature carries the liability (the "483" in the title refers to an inspection finding).
  - A draft without provenance is not evidence; model behaviour changes underneath old records.
- **Proposed workflow:**
  - Sources attached to every assertion (batch data, procedure version, prior investigation); agent-drafted and human-edited content stored separately; model and prompt version pinned to each record; approvals follow the site's SOP and are e-signed in order.
  - Unfamiliar deviations flagged and routed to a person before entering the QMS; disposition and batch release are outside what the agent may do.
- **Assumptions:** "Designed to map" to the evidence expectations of a regulated quality system; "not a shipped certification claim"; escalation window named in advance.
- **Proof plan:** 60 to 90 day pilot on one document type: baseline, shadow drafting, live with sign-off, readout; decisive artifact is one sample audit package reviewed with quality and regulatory leads.
- **Modelled metrics (pilot targets, not results):** records reproducible at inspection; draft-to-approval time against baseline; no certification claimed.

## HQ's AI Has Never Seen Your Line or Your Yields
- **URL:** https://createos.sh/case-studies/mfg-05-in-country-runtime
- **Persona:** Regional plant of a global manufacturer. Tags: Data Residency, Plant Operations.
- **Problem:**
  - Headquarters signs a global AI agreement and hands the tool to a plant to run on local data; bad calls land as scrap and missed ship dates on the plant.
  - The tool does not know the line's yields; residency rules may prohibit the data transfer the tool assumes; accountability and control are separated.
- **Proposed workflow:**
  - Control plane and storage inside the plant's jurisdiction (site environment, national cloud tenancy or plant hardware); inference location pinned and documented; kernel egress allowlist; micro-VM per run.
  - Local rules bind the global tool: the plant sets what the agent may touch and has a veto on the live plan; HQ keeps the platform, agreement and group reporting subject to a classification rule set once.
  - Every action logged locally.
- **Assumptions:** classification (what stays on the floor, what may leave the country, what an outside model may see) decided once as a rule.
- **Proof plan:** 60 to 90 day pilot on one line: baseline, watch-only, local enforcement, readout.
- **Modelled metrics (pilot targets, not results):** data crossing the border structurally prevented; local overrides recorded; scrap, expedite and schedule adherence against the site's baseline.

## Every Reschedule Bleeds Expedite Freight
- **URL:** https://createos.sh/case-studies/mfg-06-reschedule-expedite
- **Persona:** Discrete manufacturer, multi-line. Tags: Production Planning, Scheduling.
- **Problem:**
  - Planning tools rewrite the schedule on their own; each rewrite can cost expedite freight, an unnecessary changeover or a missed customer promise, visible only at month end.
  - Changes compound and nobody sees the cumulative pattern.
- **Proposed workflow:**
  - Bounds set once (changeover limits, date-commit rules, cost thresholds); checks against physical material arrival, downstream operations, freeze windows, top-tier customer protection and the week's earlier changes.
  - Costly changes are held for the planner who owns the line with projected freight premium, overtime and changeover cost attached; routine resequences flow untouched; every hold has an owner and an escalation clock.
- **Assumptions:** thresholds and escalation agreed before go-live; plant's own rules (freeze windows, expedite ceilings) used.
- **Proof plan:** 60 to 90 day pilot on one line: baseline, watch-only against a safe copy of the live schedule (weeks 3-6), enforce, readout; commits to a single measure before it starts.
- **Modelled metrics (pilot targets, not results):** expedite dollars avoided; on-time delivery movement; changeovers not incurred.

## Engineering Change Management That Stops Scrap
- **URL:** https://createos.sh/case-studies/mfg-07-engineering-change-gate
- **Persona:** Discrete manufacturer, automotive and aerospace. Tags: Engineering Change, Operations.
- **Problem:**
  - An incomplete, out-of-sequence or unauthorised engineering change reaches the line as scrap, rework, a slipped launch or warranty exposure; PLM, ERP and MES are each authoritative for a slice and blind to the rest.
- **Proposed workflow:**
  - A gate checks every dependent BOM line, routing, work instruction and supplier order; effectivity against open and in-transit orders; superseded revisions still in circulation; release authority.
  - The gate does not author changes or edit drawings and has no write path into PLM, ERP or MES beyond recording its verdict; full audit trail per change.
- **Assumptions:** change cycle time measured to ensure the gate does not delay compliant changes; watch-only first.
- **Proof plan:** 60 to 90 day pilot on one product family: baseline, watch-only (weeks 3-6, touches no system of record), gate live, readout.
- **Modelled metrics (pilot targets, not results):** scrap and rework tied to change error against baseline; change cycle time; a complete release trail.

## A Wrong Call on a Running Line Costs a Shift
- **URL:** https://createos.sh/case-studies/mfg-08-line-decision-signoff
- **Persona:** Process and discrete manufacturer. Tags: Plant Operations, Shop Floor.
- **Problem:**
  - One bad automated call on a running line can cost a shift of output or a batch; ~42% of unplanned downtime is equipment failure (Siemens, True Cost of Downtime, vendor-reported); alarm fatigue; thin night-shift staffing.
- **Proposed workflow:**
  - A sign-off desk between call and line with three tiers: routine acts, sign-off tier waits for a supervisor (slowing or stopping a line, holding a batch, changing a critical setpoint), never tier (no automatic action at any confidence).
  - Signal checked for currency, range, cross-source agreement and actual machine state; escalation path agreed in advance; plain-language record for shift handover.
- **Assumptions:** never-tier limits set per asset before go-live.
- **Proof plan:** 60 to 90 day pilot on one line or cell, starting in shadow mode (weeks 3-6) at zero production risk.
- **Modelled metrics (pilot targets, not results):** wrong calls prevented with the check that caused each hold; supervisor hours returned from false alerts; handover and root cause read from the record.

## Your AI Pilot Is Frozen in Security Review
- **URL:** https://createos.sh/case-studies/mfg-09-stalled-pilot-rescue
- **Persona:** Mid-size manufacturer with a stalled pilot. Tags: AI Deployment, Risk and Security.
- **Problem:**
  - The pilot works but is held by risk, audit and security objections the tool's vendor cannot answer because they are architectural; most organisations remain in pilot rather than production (McKinsey 2025 State of AI survey cited); objections are rarely written down as a list.
- **Proposed workflow:**
  - Objections enumerated first, then closed; pilot runs inside the customer's environment so data does not leave; watch-only before acting.
  - Four controls switched on together: nobody approves a bad action (decisions set per workflow and enforced beneath the pilot), every action checked before it happens against live plant state, everything logged in language an auditor accepts, a committed change can be backed out.
  - Stated plainly: reversal is of the record, not the world (a scrapped part cannot be un-scrapped).
- **Assumptions:** nothing here claims a delivered result.
- **Proof plan:** 60 to 90 day engagement: baseline the objections, deploy watch-only (weeks 3-6), enforce, then read out to the risk owners matching each original block to its control.
- **Modelled metrics (pilot targets, not results):** each objection closed and shown closed; time from frozen to live measured from the stall date; the dollar outcome the pilot promised reported alongside.

## Price Leakage Commits Before Anyone Sees It
- **URL:** https://createos.sh/case-studies/mfg-10-spend-before-commit
- **Persona:** Manufacturer, direct and indirect spend. Tags: Procurement, Spend Control.
- **Problem:**
  - Off-contract buying and price leakage are found in spend analysis after the money is committed; leakage is distributed across many small orders; policy lives in a document not on the order path.
- **Proposed workflow:**
  - A checkpoint reads contract coverage (not catalogue availability), line price against negotiated tolerance, duplicate commitments across sites and supplier standing at that moment; allows, holds for the buyer with the deviation named, or hands back.
  - Never changes a price, chooses a supplier or edits a contract; every action and prevented order recorded.
- **Assumptions:** CreateOS sells no procurement suite, sourcing platform or negotiation agent.
- **Proof plan:** 60 to 90 day pilot on one spend category: baseline, watch-only (every action scored, nothing blocked), enforce, readout in committed dollars ("CFO-legible").
- **Modelled metrics (pilot targets, not results):** off-contract spend stopped before commit; price variance against contract on the pilot category; spend under management as share of actions through the checkpoint.

## Reorders That Freeze Cash or Empty the Shelf
- **URL:** https://createos.sh/case-studies/mfg-11-replenishment-control
- **Persona:** Make-to-stock manufacturer, consumer goods. Tags: Supply Chain, Demand Planning.
- **Problem:**
  - Automated replenishment fails both ways: overstock freezes working capital, understock empties the shelf or forces margin-destroying expedite; reorders run overnight unchecked and forecast errors multiply across thousands of items.
- **Proposed workflow:**
  - Each reorder checked before commit against today's on-hand, in-transit and committed stock; the coverage band (minimum and maximum weeks); duplicate or overlapping purchase orders; supplier minimums, dock and storage capacity, launch and discontinuation dates, working-capital ceiling.
  - Out-of-bounds or large reorders wait for a planner with projected position attached; routine restocking flows through; every reorder and hold recorded.
- **Assumptions:** CreateOS builds no forecasting engine (independence); both failure directions reported together on the same category and window.
- **Proof plan:** 60 to 90 day pilot on one category or region: baseline, watch-only (weeks 3-6, nothing blocked), enforce, readout.
- **Modelled metrics (pilot targets, not results):** working capital released against baseline inventory; stockout rate movement; reorders held and why.

## Catching the Escape Before It Becomes a Recall
- **URL:** https://createos.sh/case-studies/mfg-12-inspection-escape
- **Persona:** Discrete manufacturer, high-volume line. Tags: Quality, Inspection.
- **Problem:**
  - A defect missed at inspection ships and the cost multiplies, ending as a customer escape, warranty claim or recall; inspection models drift quietly; a hold is a production decision.
  - A vision model shown an unfamiliar defect returns the closest answer it holds, usually a pass.
- **Proposed workflow:**
  - Inspection calls checked before they act (image quality, exposure, focus, model confidence, station state); unfamiliarity is its own verdict and the part is held for an inspector.
  - Holds routed for sign-off with evidence; drift compared continuously against sampled ground truth; every call retained with its image and verdict.
  - Escapes and false rejects counted together so the gain is not just a more cautious line.
- **Assumptions:** false-reject baseline measured in the shadow phase before anything is enforced.
- **Proof plan:** 60 to 90 day pilot on one line: baseline, shadow, live with sign-off on holds, readout.
- **Modelled metrics (pilot targets, not results):** escapes caught before shipment against the escape baseline; false holds not incurred; a retrievable record per unit.

## One Off-Switch for Every Vendor's Agents on the Factory Floor
- **URL:** https://createos.sh/case-studies/mfg-13-agent-control-tower
- **Persona:** Manufacturer running multi-vendor agents (page refers to four vendors' agents). Tags: Operations, Agent Governance.
- **Problem:**
  - Agents from several vendors already act on the factory, each governed by its own console; no single view of what they do and no single way to stop them; interactions between agents are nobody's responsibility.
- **Proposed workflow:**
  - One record of every agent action across vendors; one rulebook written once per system of record and action type, enforced beneath the agents (new agents inherit the rules).
  - One control to pause one agent or all of them, scopable by system, site or action class; stopped actions held and recorded with originating vendor and reason; in-flight state agreed per system before go-live.
- **Assumptions:** the layer must compete with none of the vendors; stop-state defined in advance.
- **Proof plan:** 60 to 90 day pilot across two agent groups already running: baseline, watch-only (both groups observed, every action scored, nothing held), take control, readout.
- **Modelled metrics (pilot targets, not results):** risky actions caught before the floor across both groups with originating vendor recorded; one record spanning vendors; time to stop all agent action.

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Industry - Manufacturing]]: manufacturing industry hub
- [[Industries]]
- [[Customer Stories]]: delivered Indian textile CCTV pilot
- [[Service - AI Agents]]
- [[Product - Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Security]]
