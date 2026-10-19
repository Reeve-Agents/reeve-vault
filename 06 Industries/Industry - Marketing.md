---
tags:
  - createos/industry
  - createos/use-case
  - type/page
source: https://createos.sh/industries/marketing
sources:
  - https://createos.sh/industries/marketing
  - https://createos.sh/industries/use-cases/content-calendar-planning
  - https://createos.sh/industries/use-cases/brand-voice-drafting
  - https://createos.sh/industries/use-cases/launch-orchestration
  - https://createos.sh/industries/use-cases/performance-reporting
  - https://createos.sh/industries/use-cases/inbound-engagement-routing
  - https://createos.sh/industries/use-cases/competitive-signal-synthesis
scraped: 2026-10-17
up: "[[Industries]]"
---

# Industry - Marketing

> [!summary] Summary
> - Focus: Content, launches, and demand operations.
> - Hub headline: Marketing agents, governed the way regulated teams work.
> - 6 use-case pages for Marketing (listed in this note below).
> - Source: https://createos.sh/industries/marketing

## Overview
- **Headline:** Marketing agents, governed the way regulated teams work
- **Pitch:** The system CreateOS runs on its own marketing. Every workflow has a written human gate, and nothing publishes or goes outbound without a named approver.
- **Industry focus (hub overview):** Content, launches, and demand operations
- **Use-case pages:** 6 under `/industries/use-cases/`
- Page also carries the CreateOS Skills block (see [[Industries#CreateOS Skills block shown on every page]]).

## Metrics
| Metric | Detail |
|---|---|
| 26 | Shipped workflows across 6 archetypes, in use since May 2026 |
| 44 | Readiness checks in the 8-phase launch cycle |
| 0 | Outbound actions without a named human approver |

## Problems and solutions
- The hub has no standalone problems section. Each use case states its own **Problem** and what the **Agent** does; see the use-case entries below.
- Hub pitch (solution framing): The system CreateOS runs on its own marketing. Every workflow has a written human gate, and nothing publishes or goes outbound without a named approver.

## Workflow
- Every artifact traces to the workflow that made it, the inputs it read, and the person who approved it. The approval bar is written down per workflow: under ten minutes of edits, or it goes back.

## FAQ
- **Do you have marketing customers running this?** No. This is the system CreateOS runs on its own marketing, shipped and in use by its team since May 2026. It proves orchestration and governance across 26 workflows. It does not prove regulated-industry production, and CreateOS says it will not claim it does.
- **What stops an agent posting something embarrassing?** Publishing, launch-day actions, and public replies all pause at an approval gate with a written criterion. Auto-publish is not the starting state. Content workflows also stop rather than draft when the brand-voice file is missing, so nothing generic ships by accident.
- **Can an agent spend our ad budget?** No. Money never leaves human approval. An agent can prepare campaigns and report on results, but it cannot commit budget, raise a bid, or launch paid spend on its own.

## Proof
- [See how the platform works](https://createos.sh/products)

## CTAs
- `book_a_demo`: https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- `all_industries`: https://createos.sh/industries

## Use cases

Autonomy levels used on the pages: **Suggest** (it proposes, and a person approves before anything commits), **Watch** (it flags and records, and takes no action itself), **Execute** (it acts inside set limits, and every call is logged).

| Use case | Autonomy | Reads from |
|---|---|---|
| Content calendar planning | Suggest | Content archive, Release notes, Analytics |
| Brand-voice drafting | Suggest | Brand-voice file, Content archive, CMS |
| Launch orchestration | Suggest | Content archive, Scheduler, Analytics |
| Performance reporting | Watch | Your analytics, Your event data, Content archive |
| Inbound engagement routing | Suggest | Social channels, Your CRM, Shared inbox |
| Competitive signal synthesis | Watch | Public web, Customer call notes, Positioning file |

### Content calendar planning

URL: https://createos.sh/industries/use-cases/content-calendar-planning

- **Problem:** The AI-generated calendar dies in week two because nobody wired it to what actually shipped.
- **Agent:** The agent sets quarterly themes and measurable objectives, then builds the weekly calendar from what the product actually shipped. A named human approves the plan before any drafter works from it.
- **Outputs:** Quarterly themes; A weekly calendar tied to real releases; Objectives each workflow measures against
- **Runs:** starts when a planning cycle opens, or a release lands that needs coverage. Mode: Suggest.

### Brand-voice drafting

URL: https://createos.sh/industries/use-cases/brand-voice-drafting

- **Problem:** One-off chats do not compound. Every prompt starts from zero, and the draft sounds like everyone else's.
- **Agent:** The agent reads your brand-voice file before it writes, drafts the artifact, checks whether you have said it before, and adapts the approved piece into each channel's native shape. A person approves before anything is scheduled.
- **Outputs:** Drafts in your voice; A repetition check against past work; Channel-adapted versions of one source
- **Runs:** starts when a release ships, or the calendar calls for a piece. Mode: Suggest.

### Launch orchestration

URL: https://createos.sh/industries/use-cases/launch-orchestration

- **Problem:** The launch checklist lives in someone's head until that someone is on leave on launch day.
- **Agent:** The agent builds the dated sequence back from launch day, tracks the launch cycle's 44 readiness checks across its eight phases until each one closes, and stages the launch-day artifacts in the scheduler, queued and unsent. The go is a gate: the sequence stops for a named human before anything publishes.
- **Outputs:** A dated launch sequence; Readiness checks tracked to close; Launch-day artifacts assembled
- **Runs:** starts when a launch date is set. Mode: Suggest.

### Performance reporting

URL: https://createos.sh/industries/use-cases/performance-reporting

- **Problem:** Nobody can answer why a piece was posted, or whether anything it did was worth repeating.
- **Agent:** The agent reads your existing analytics and funnel events, attributes what moved, and writes the weekly digest naming what to continue and what to stop. It reads your data where it already lives.
- **Outputs:** A weekly performance digest; Funnel attribution on real events; A named stop list
- **Runs:** starts when the reporting week closes. Mode: Watch.

### Inbound engagement routing

URL: https://createos.sh/industries/use-cases/inbound-engagement-routing

- **Problem:** Public replies are the highest reputation risk in marketing, and speed is exactly what makes them risky.
- **Agent:** The agent triages public replies and inbound form fills, drafts a response in your voice, and routes qualified leads into the CRM you already run. Every outbound reply queues behind an approval gate.
- **Outputs:** Triaged inbound; Drafted replies in your voice; Leads routed to your CRM
- **Runs:** starts when someone replies in public, or an inbound form is submitted. Mode: Suggest.

### Competitive signal synthesis

URL: https://createos.sh/industries/use-cases/competitive-signal-synthesis

- **Problem:** Competitive research either does not happen or arrives as an unreadable dump nobody acts on.
- **Agent:** The agent runs research in sandboxed execution, separated from anything that can publish, and lands a short brief with what changed and what it means for positioning. A person decides what to do with it.
- **Outputs:** A short competitive brief; What changed since the last run; Positioning implications for a human to weigh
- **Runs:** starts when a research cycle opens, or a competitor ships something. Mode: Watch.

## Related
- Up: [[Industries]]
- [[Services]]: CreateOS AI build services hub
- [[Service - AI Agents]]: AI agent build service
- [[Case Studies]]: customer case studies and proof
- [[Customer Stories]]: customer story pages
- [[Solution Blueprints]]: solution blueprints hub
- [[Docs - Studio Enterprise Use Cases]]: Studio enterprise use cases (docs)
- [[Products]]: CreateOS products hub
