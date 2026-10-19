---
aliases:
  - Investment research blueprints
  - Private equity research blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Investment Research

> [!summary] Summary
> - 4 investment-research solution blueprints (slug prefix `ir-`), listed by the site for a "middle-market private equity firm": CIM-to-memo, full research memo production, wider coverage, and keeping research inside the firm's walls. The page bodies describe a PE firm (ir-01), an analyst bench of forty (ir-02) and a fund with fifteen analysts (ir-03).
> - All figures are **modelled**, not measured; stated assumptions are replaced with the client's measured baseline.
> - Shared design: agent crew gathers, extracts, models and drafts; analyst owns judgment; every claim grounded and traceable; MNPI screened inline; research environment forks per deal or name; eBPF egress allowlist; Firecracker micro-VM per workstream; self-hosted.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## Every CIM Read in Full Before Anyone Can Decline
- **URL:** https://createos.sh/case-studies/ir-01-from-cim-to-memo
- **Persona:** Middle-market private equity firm with twelve investment professionals receiving roughly 200 confidential information memoranda (CIMs) a year. Tags: Investment Research, Deal Memo.
- **Problem:**
  - Every CIM must be read before anyone can decline: 1,200 analyst hours, thirty working weeks, at six hours a document across 200 documents.
  - 35% of deal-team capacity goes to memo assembly rather than analysis (median PE firm); tight banker processes punish a three-day turnaround.
  - Tools wanted the CIM in a vendor cloud, despite NDAs.
- **Proposed workflow:**
  - Crew takes a CIM from received to a sourced, structured preliminary memo in the firm's template, every number traceable to its page.
  - Working corpus assembled from CIM, data room, market data, filings, news and internal notes; financials spread, comparables built, scenarios run in a contained environment.
  - MNPI screened inline against the firm's information-barrier policies; research environment forks per deal (a Friday batch of six CIMs runs in parallel); pause on data refresh.
  - Control plane in the firm's infrastructure; egress allowlisted in the kernel; deal workstreams walled in their own guest kernel.
- **Assumptions:** $300,000 fully loaded analyst cost; conservative 60% to 70% of assembly capacity reclaimed; scales linearly with deal flow and headcount; "3% to 5% higher annualized returns" for generative-AI adopters is context (an association), not priced.
- **Proof plan:**
  - Weeks 1 to 2: baseline memo production time, assembly share, screening coverage.
  - Weeks 2 to 6: build and integrate along allowlisted paths, encode information-barrier policies, self-host, scoped to one coverage area.
  - Weeks 6 to 9: augmented run alongside normal process; compare quality and time; confirm grounding and MNPI controls.
  - Week 9 onward: controlled rollout across coverage areas.
  - Success criteria: memo production time down at least 50%, assembly capacity materially reclaimed, 100% claims grounded and traceable, zero MNPI or data-leakage incidents, 100% source-and-step audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Preliminary memo production | 4 to 8 hours | Under 90 minutes |
| Document data extraction | Baseline | 3x to 5x faster |
| Deal-team capacity on assembly | 35% | Most of it reclaimed |
| CIMs screened per week | Limited by analyst hours | Limited by deal flow |
| Analyst hours returned a year | N/A | Roughly 1,100 to 1,300 (720 to 840 directly) |
| Capacity value, screening alone | N/A | $165,000 to $195,000 |
| Claim grounding | Inconsistent, manual check | 100% cited and traceable |
| MNPI and data-leakage incidents | Open risk | Zero, enforced in-kernel and self-hosted |

## Twenty Hours Pass Before the Thinking Starts
- **URL:** https://createos.sh/case-studies/ir-02-twenty-hours-to-eight
- **Persona:** Middle-market investment firm with forty analysts at $300,000 each (page framing); listed as a middle-market private equity firm. Tags: Investment Research.
- **Problem:**
  - A memo that reaches the investment committee takes 20 to 40 hours, mostly gathering, extracting, spreading, modelling, formatting and checking before the analyst forms a view.
  - 35% of capacity ($4.2M of the $12.0M analyst base) is spent on assembly; memos take three to five working days, so analysts cover fewer names and react slowly.
  - Confidentiality killed the first attempt (what a firm is looking at is itself alpha); accuracy killed the second (an ungrounded model inventing a figure).
- **Proposed workflow:**
  - Crew does gathering, extraction, modelling and first-draft synthesis, handing the analyst a sourced memo in house format.
  - Filings, transcripts, market data, news and internal research collected into one corpus; models, comparables and scenarios run in a contained environment.
  - Ungrounded generation on numerical content not permitted; MNPI screened on corpus and draft; separation of duties (gather, analyse, draft, MNPI-check).
  - Control plane and storage in the firm's infrastructure; egress allowlisted in the kernel; each workstream in its own guest kernel.
- **Assumptions:** 40 analysts at $300,000 is $12.0M; 35% on assembly is $4.2M; conservative 60% to 70% reclaimed; the 3% to 5% return association is not priced; reclaimed time is redeployed, not removed.
- **Proof plan:**
  - Weeks 1 to 2: baseline memo production time, assembly share, coverage.
  - Weeks 2 to 6: build and integrate, scoped to one defined coverage area, self-hosted.
  - Weeks 6 to 9: augmented run; proving accuracy and confidentiality is "the whole game".
  - Week 9 onward: controlled rollout.
  - Success criteria: memo production time down at least 50%, assembly capacity materially reclaimed, 100% claims grounded, zero MNPI or leakage incidents, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Full memo production time | 20 to 40 hours | Under 8 hours |
| Document data extraction | Baseline | 3x to 5x faster |
| Analyst capacity spent on assembly | 35% | Most of it reclaimed |
| Analyst capacity returned | N/A | $2.5M to $3.0M a year; eight to ten analysts' worth |
| Names covered per analyst | Constrained by memo time | Increased |
| Claim grounding | Inconsistent | 100% cited and traceable |
| MNPI and data-leakage incidents | Open risk | Zero |
| Audit coverage of sources and steps | Partial | 100% logged |

## An Analyst Wanting a Thirteenth Name Had to Drop One
- **URL:** https://createos.sh/case-studies/ir-03-covering-more-names
- **Persona:** Fund with fifteen analysts covering 180 names (12 per analyst); listed as a middle-market private equity firm. Tags: Investment Research, Coverage.
- **Problem:**
  - Synthesis time is the constraint: a full research note takes 20 to 40 hours and a quarterly refresh a working day or more, so a thirteenth name means dropping one.
  - Earnings season compresses 180 transcripts into a few weeks; theses run in sequence so only one scenario (bull, bear, management's case) gets a model.
  - Good tools could not touch the data that mattered; vendor clouds would broadcast the fund's intentions.
- **Proposed workflow:**
  - Research agent crew inside the fund's own infrastructure, pointed at real coverage, internal notes and live names.
  - Bull, bear and management's case built in parallel (a configured research environment forks); each name opens its own environment during earnings season.
  - One configured analytical environment runs consistently so quarterly refreshes are reproduced not re-derived; pause on data release.
  - Claims grounded to traceable sources; MNPI screened against information barriers; egress allowlisted in the kernel; each mandate in its own guest kernel.
- **Assumptions:** synthesis time falls 60% to 70% but judgment does not compress; the 3% to 5% return association is not priced or modelled; coverage ranges as stated.
- **Proof plan:**
  - Weeks 1 to 2: baseline note production time, quarterly refresh load, names per analyst, time-to-view on events.
  - Weeks 2 to 6: build and integrate, self-host, scoped to one coverage area.
  - Weeks 6 to 9: augmented run through a full earnings cycle if the calendar allows.
  - Week 9 onward: controlled rollout.
  - Success criteria: note production time down at least 50%, names per analyst materially increased, 100% claims grounded, zero MNPI or leakage incidents, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Research note production | 20 to 40 hours | Under 8 hours |
| Quarterly refresh per name | A working day or more | Same-day, drafted and sourced |
| Names under active coverage | 180 (12 per analyst) | 250 to 290 (17 to 19 per analyst) |
| Coverage | Baseline | Up roughly 40% to 60% on the same fifteen analysts |
| Scenarios modelled per name | 1, sometimes 2 | Bull, bear and base, in parallel |
| Time to a sourced view on an event | Days | Same session |
| Claim grounding | Inconsistent | 100% cited and traceable |

## Running Research Agents Inside the Firm's Own Walls
- **URL:** https://createos.sh/case-studies/ir-04-alpha-stays-inside-the-walls
- **Persona:** Middle-market private equity firm (page frames a firm with a private side and a public side and a CCO). Tags: Investment Research, Sovereignty.
- **Problem:**
  - Both earlier pilots died at compliance review for architectural reasons: using tools properly meant sending internal research, notes, models and the list of names under work to a vendor cloud.
  - Approved for public data only, adoption collapsed in a quarter; one invented number is a fiduciary event; the information barrier cannot rest on policy ("we told the tool not to").
- **Proposed workflow:**
  - Research agent crew deployed inside the firm's boundary on infrastructure the firm hosts; controls are architecture, not settings.
  - Data stays in: self-hosted control plane and storage; egress is a route absent from the kernel (approved data providers only).
  - Every claim grounded or it does not enter the memo; information barrier enforced at the hypervisor with a guest kernel per workstream; MNPI screened on corpus and draft.
  - Misbehaving agent suspended through the VM lifecycle; every source, model and step logged.
- **Assumptions:** page notes no percentage headline ("The value here is not a percentage. It is that the project happened at all"); efficiency numbers in the other ir- blueprints are available only if agents can be pointed at real data.
- **Proof plan:**
  - Weeks 1 to 2: baseline current controls, information-barrier policy and data classes in scope.
  - Weeks 2 to 6: build and integrate along allowlisted paths, encode barrier policies, self-host.
  - Weeks 6 to 9: augmented run to confirm grounding, MNPI controls and egress behaviour.
  - Week 9 onward: controlled rollout, eventually the private side.
  - Success criteria: 100% claims grounded and traceable, zero MNPI or data-leakage incidents, 100% source-and-step audit coverage, egress record matching the allowlist exactly.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Research, notes and names under review | Sent to vendor cloud, or tool unused | Never leave the firm's boundary |
| Data egress | Vendor policy and trust | Allowlisted in-kernel with eBPF |
| Claim grounding | Analyst checks the model's work | 100% cited and traceable at source |
| Information barrier | Enforced by policy and instruction | Enforced at the hypervisor, per workstream |
| MNPI screening | Manual, after the fact | Inline, on corpus and draft |
| Audit trail | Partial, reconstructed | 100% of sources and steps, replayable |
| MNPI or data-leakage incidents | Open risk | Zero |
| Certifications | Vendor-dependent | SOC 2 Type II, ISO 27001 |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Regulatory Reporting]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Service - RAG]]: retrieval-grounded research is the nearest services topic
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
