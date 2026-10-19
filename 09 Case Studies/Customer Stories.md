---
aliases:
  - CreateOS customer stories
  - Delivered case studies
tags:
  - createos/case-study
  - type/page
source: https://createos.sh/case-studies
scraped: 2026-10-17
up: "[[Case Studies]]"
---

# Customer Stories

> [!summary] Summary
> - 10 delivered or real customer stories on CreateOS: 3 enterprise deployments (Davalogy, Indian textile CCTV pilot, litigation intelligence) and 7 "Built in minutes" single-builder apps (Justref, TACboard, Agent Blaster, Riyasat, AnyWhereGYM, Distraction Tracker, Creator Flow).
> - Unlike the [[Solution Blueprints]] (modelled, not measured), these are labelled by the site as real deployments.
> - Source: https://createos.sh/case-studies (listing, sections "Enterprise deployments" and "Built in minutes"). Each H2 below carries its own page URL.

## Index

| Story | Type | Customer or persona |
|---|---|---|
| [[#Davalogy - healthcare operating system]] | Enterprise deployment | Davalogy (doctor-led practice) |
| [[#Indian textiles - CCTV to real-time oversight]] | Enterprise pilot | Cotton processing MSMEs |
| [[#Litigation intelligence - Timeline Brief]] | Enterprise deployment | Law firms |
| [[#Justref - affiliate platform]] | Built in minutes | Kalash Vasaniya, Bangalore |
| [[#TACboard - custom task board]] | Built in minutes | Stefania, TAC, Rome |
| [[#Agent Blaster - agent benchmarking game]] | Built in minutes | Pratyush, AGI House India, Delhi |
| [[#Riyasat - wedding platform]] | Built in minutes | Gunjan, Amazon, Bangalore |
| [[#AnyWhereGYM - travel gym tracker]] | Built in minutes | Ankit, HBO Max, Delhi |
| [[#Distraction Tracker - context switch tracker]] | Built in minutes | Michele, TAC, Rome |
| [[#Creator Flow - AI brand and community team]] | Built in minutes | Wanlin Guo, Rome |

## Davalogy - healthcare operating system
- **URL:** https://createos.sh/case-studies/davalogy
- **Page title:** From Manual Patient Coordination to a Live Healthcare Operating System
- **Customer:** Davalogy, a doctor-led practice (Healthcare AI). Tags: Healthcare AI, Patient Records, HMS Portal, Doctor Portal, WhatsApp Alerts.
- **Problem:**
  - Patient information, vitals, reports, appointment updates and follow-ups lived in manual records and staff updates across separate channels.
  - PA/staff captured vitals, updated notes and traced past history before a consultation could begin; doctors waited on assistants to compile the case.
  - Follow-ups slipped through silent handoffs.
- **What was built:**
  - Public website (doctor-led positioning, services, report upload, consultation CTA, WhatsApp access).
  - Patient portal (profile, vitals, history, treatment, prescriptions, reports, appointments, payments, consultation updates).
  - Doctor portal (track cases, review records and uploaded reports, manage care, document teleconsultation notes).
  - Admin portal for staff/PA (enter vitals, update records, manage appointments, payments, follow-ups).
  - Integrated care record that builds over time with each visit, upload, note and update.
  - WhatsApp alert layer (confirmations, payment links, reminders, shared notes, patient communication).
- **Stack or features:**
  - 3 role-based views (patient, doctor, admin) into one live case record per patient; the portal is the system of record, WhatsApp is the real-time alert layer.
  - Six-step patient journey: patient starts, unique account, vitals entered, doctor reviews, appointment and pay, notes shared; WhatsApp alert at each step.
  - Trust and security: role-based access, confidential records, consent-led flow, zero-retention processing (CreateOS / AI processing does not retain data outside agreed boundaries), required records retained inside the Davalogy system.
- **Timeline:** not stated on the page.
- **Results:**
  - At a glance: 3 portals, 1 live case history per patient, Real-time WhatsApp alerts, Zero-retention processing.
  - Qualitative only, no numeric metrics: manual assistant-led coordination moves into a structured patient account; PA/staff update vitals in real time; doctors less dependent on assistants; reports, prescriptions, payments and notes in one workflow; improved continuity of care.

## Indian textiles - CCTV to real-time oversight
- **URL:** https://createos.sh/case-studies/createos-industrial-ai-textile
- **Page title:** Inside an Early CreateOS Pilot: CCTV to Real-Time Oversight in Indian Textiles
- **Customer:** Cotton processing MSMEs (Industrial AI), facilities in Maharashtra, Tamil Nadu, Telangana and Gujarat.
- **Problem:**
  - CCTV runs constantly but is checked rarely and reviewed only after a crisis; the gap is usable data, not cameras.
  - Three friction points: remote locations, unreliable local storage, fragmented oversight.
- **What was built:**
  - Step 1: live recording systems pointed at cloud buckets integrated with CreateOS (removes the single point of failure of on-site DVRs).
  - Step 2: monitoring dashboards showing camera feeds alongside basic status indicators.
  - Step 3: simplified surface for non-technical owners and supervisors.
- **Stack or features:** CreateOS workspace, cloud storage buckets, hybrid compute; no in-house DevOps team required. Focus of phase one was visibility, not complex AI modelling.
- **Next phase (planned detection):** unauthorised access to restricted zones; irregular material handling or routing errors; equipment stoppages and extended idle time; line-level malfunctions or blockages.
- **Timeline:** 75-day pilot. The page states CreateOS launched on February 4, 2026.
- **Results:**
  - 75 days across 4 states.
  - 50,000+ hours of CCTV footage ingested, indexed and searchable.
  - 750+ TB moved into a unified CreateOS workspace.
  - Outcomes named: traceability (time-aligned records for buyers or auditors), accountability, continuous improvement.

## Litigation intelligence - Timeline Brief
- **URL:** https://createos.sh/case-studies/createos-litigation-intelligence
- **Page title:** From Matter Files to Strategy-Ready Briefs: How CreateOS Powers Litigation Intelligence
- **Customer:** Law firms and litigation teams (commercial disputes, regulatory proceedings, arbitration, constitutional matters, complex advisory). Tags: Legal AI, Matter File Intelligence, Timeline Brief, OCR, On-Prem. Quoted voice: Sheena Kohli, Legal and Investor Relations Lead, CreateOS.
- **Problem:**
  - Matter files (contracts, notices, emails, handwritten notes, photographs, scanned annexures) must be read before strategy begins; the intake-to-workspace step is manual.
  - Chronology built date by date, clauses searched manually, visual exhibits flattened or missed, missing documents surface late, new team members rebuild history.
- **What was built:** an AI intelligence layer producing one source-cited Timeline Brief per matter, with three layers:
  - Narrative Intelligence: all document types ingested, structured narrative, every fact cited, page-level context and layout retained.
  - Timeline Intelligence: automatic chronology across hundreds of pages, entries linked to source page, undated documents / broken sequences / missing replies flagged.
  - Clause Intelligence: 400+ page contracts reduced to the dozen relevant clauses with surrounding context; cross-referencing across documents.
- **Stack or features:** ingests PDFs, scans, paperbooks, annexures, emails, screenshots; OCR; modes: CreateOS cloud, firm environment, or fully on-premise; mutual NDA, zero data retention by default, unique login per user, full audit log.
- **Timeline (engagement structure):** 2 weeks free beta on one live matter under NDA; 4 to 6 week pilot on 2 to 3 active matters with baselines agreed in writing; then production (monthly subscription or annual licence).
- **Results:**
  - 40% less manual Timeline Brief preparation time (designed target, subject to matter complexity, document quality and review protocol).
  - 12 relevant clauses surfaced from a 400+ page contract.
  - 3 deployment modes; 2 weeks free beta.
  - Roadmap items: client-facing legal dashboard, document request workflows, auto-drafted missing-document emails, calendar integration for notice dates and hearings.

## Justref - affiliate platform
- **URL:** https://createos.sh/case-studies/justref
- **Page title:** An entrepreneur shipped a full-stack affiliate platform in hours
- **Customer:** Kalash Vasaniya, entrepreneur in affiliate marketing, Bangalore. Tags: Affiliate Marketing, Backend Services, Database.
- **Problem:** an affiliate platform needs registration, unique referral links, conversion tracking, payout logic and background jobs; hiring a team adds cost, solo build is months of work.
- **What was built:** full-stack affiliate platform (Justref) with backend services, database schema, messaging queues and scheduled (cron) jobs, deployed in one flow.
- **Stack or features:** backend services, database, messaging queues, scheduled jobs; deployed on CreateOS with no separate DevOps setup.
- **Timeline:** built in "four to five hours" per the builder quote; session came together five days after a chance meeting at an airport. Version one in active refinement, public launch planned in the coming weeks.
- **Results:** complete full-stack app live in a few hours; no numeric metrics beyond the hours.

## TACboard - custom task board
- **URL:** https://createos.sh/case-studies/tacboard
- **Page title:** A designer replaced six tools with one custom task board
- **Customer:** Stefania, runs the graphics department at TAC, Rome; no prior coding experience. Tags: Task Management, No-Code, Productivity.
- **Problem:** juggled Trello (tasks), Notion (notes), Todoist (reminders) and occasionally Figma (mood board), four to six tabs with no integration; wanted one place for tasks, priority, reference images, status and deadlines.
- **What was built:** TACboard, a custom task board with priority levels, status tracking (in-progress / done), notes and image attachments; image attachments added mid-conversation and shipped within seconds.
- **Stack or features:** deployed through GitHub; stays editable as requirements shift.
- **Timeline:** built, named and deployed to a live URL within one session.
- **Results:** six tools replaced by one app; runs the department's daily workload.

## Agent Blaster - agent benchmarking game
- **URL:** https://createos.sh/case-studies/agent-blaster
- **Page title:** An AI engineer deployed an agent benchmarking game in under an hour
- **Customer:** Pratyush, Applied AI Engineer at AGI House India, Delhi. Tags: AI Research, Agent Benchmarking, Gaming.
- **Problem:** wanted two LLMs navigating a puzzle maze to observe reasoning under constraint (paths picked, stalls, adaptation), but deployment was the blocker.
- **What was built:** Agent Blaster, two AI agents pitted against each other in a live puzzle maze, observable in real time; used as a research tool.
- **Stack or features:** no server config or hosting decisions; GitHub took the build live.
- **Timeline:** under an hour, built and deployed during a chance conversation at the AI Impact Summit in Delhi.
- **Results:** live environment for watching model behaviour; "whole flow finished before a coffee order arrived".

## Riyasat - wedding platform
- **URL:** https://createos.sh/case-studies/riyasat
- **Page title:** A Key Account Manager at Amazon launched a wedding platform without writing code
- **Customer:** Gunjan, Key Account Manager at Amazon, Bangalore; no engineering background. Tags: Wedding Planning, No-Code, Marketplace.
- **Problem:** destination weddings and inter-caste marriages need coordination across cultures, vendors, locations and logistics; her own estimate was a week minimum to get a first version via developers.
- **What was built:** Riyasat, a curated wedding experience platform organised by state and cultural context, deployed through GitHub.
- **Timeline:** deployed the same day the idea was first described; built in one session at a Bangalore cafe; estimated a week of work, finished in a couple of hours.
- **Results:** version one live and in use.

## AnyWhereGYM - travel gym tracker
- **URL:** https://createos.sh/case-studies/anywheregym
- **Page title:** A data scientist built a travel gym tracker from one conversation
- **Customer:** Ankit, Data Scientist at HBO Max, Delhi ("converted vibe coder"). Tags: Health, Travel, Fitness.
- **Problem:** staying consistent at the gym while travelling (finding a gym near the hotel, Wi-Fi, how busy it is, accountability); wanted crowd levels from traffic data and workout-tied notifications.
- **What was built:** AnyWhereGYM, a gym finder with real-time crowd alerts; fully responsive mobile and desktop layouts generated together.
- **Stack or features:** GitHub deployment button from the first preview; deployed to a live URL.
- **Timeline:** one conversation, deployed at the AI Impact Summit in Delhi.
- **Results:** 500+ lines of functional code written through natural language; live and in use by the builder.

## Distraction Tracker - context switch tracker
- **URL:** https://createos.sh/case-studies/distraction-tracker
- **Page title:** A mobile developer built a distraction tracker that keeps him accountable at work
- **Customer:** Michele, mobile developer at TAC (owns the app development and release cycle), Rome. Tags: Productivity, Focus Tracking, Developer Tools.
- **Problem:** context switches during the workday go untracked; wanted real-time counts, an alert on return from a distracting tab and an end-of-day picture of focus breaks.
- **What was built:** Context Switch Tracker, a browser-based tool with an audio alert each time the user navigates back from a distracting tab, plus session controls (start, pause, resume).
- **Stack or features:** deployed to a live shareable or private URL via CreateOS.
- **Timeline:** one session, "built and deployed in minutes".
- **Results:** already part of the builder's workday; no numeric metrics.

## Creator Flow - AI brand and community team
- **URL:** https://createos.sh/case-studies/creator-flow
- **Page title:** A product manager shipped an AI brand-and-community team without writing code
- **Customer:** Wanlin Guo, senior product manager at TikTok building Creator Flow as a founder on the side, Rome. Tags: Creative AI, Brand, Community.
- **Problem:** small businesses and micro-creators need creative direction, branding and community support but lack budget for a team; tooling is fragmented across point tools.
- **What was built:** Creator Flow, one AI platform acting as creative director, brand manager and community manager.
- **Stack or features:** front end and back end shipped together in one flow with no hand-written code.
- **Timeline:** first version from idea to deployed in under an hour.
- **Results:** working product giving a one-person team the output of a creative department; builder quote: "unique value proposition" versus other tools.

## Related
- Up: [[Case Studies]]
- [[Solution Blueprints]]: modelled workflows, not delivered customer results
- [[Industry - Healthcare]]: Davalogy context
- [[Industry - Legal]]: litigation intelligence context
- [[Industry - Manufacturing]]: textile CCTV pilot context
- [[Industries]]
- [[Service - AI Agents]]
- [[Services]]
- [[Products]]
