---
aliases:
  - Studio Enterprise Use-Cases
  - Studio industry patterns
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Enterprise-Use-Cases
sources:
  - https://createos.sh/docs/studio/Enterprise-Use-Cases
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Manufacturing
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Healthcare
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Finance
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Legal
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Operations-And-Management
  - https://createos.sh/docs/studio/Enterprise-Use-Cases/Marketing
scraped: 2026-10-17
up: "[[Docs - Studio]]"
---

# Docs - Studio Enterprise Use Cases

> [!summary] Summary
> - Worked patterns (not products) showing how Studio building blocks combine for six areas: Manufacturing, Healthcare, Finance, Legal, Operations and Management, Marketing.
> - Each use case lists settings (Goal, Knowledge base, Tools, Output, Instructions, Memory, Guardrail), then a governance table.
> - Regulated areas (Finance, Healthcare, Legal) state agents draft, extract and check; a qualified human approves.
> - Source: https://createos.sh/docs/studio/Enterprise-Use-Cases

## Enterprise Use-Cases
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases
- **Summary:** Index of industry patterns. Every page follows one shape: the problem (manual process today), the agent (goal and instructions), what it needs (knowledge, tools, memory, guardrails), how it runs (trigger and output), what to watch (governance and metrics).
- **Key points:**
  - **Common building blocks:** Knowledge base (SOPs, policies, contracts, manuals, regulatory texts); Skills (house style, escalation rules, report formats); Tools (Gmail, Slack, Notion, Google Workspace, Salesforce, SAP SuccessFactors); Memory (per-customer or per-case context); Guardrails (PII redaction, prohibited-topic blocking, output review); RBAC + sharing (separating who builds, runs, audits); Traces + audit log (evidence for internal review and regulators).
  - Pages: Manufacturing, Healthcare, Finance, Legal, Operations and Management, Marketing (sections below).
  - Tip: start narrow; agents that succeed in production do one job for one team. Pick the single most repetitive step, automate it, then widen.

## Manufacturing
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Manufacturing
- **Summary:** Agents make documents nobody has time to read (SOPs, maintenance manuals, quality specs, supplier contracts) answerable. Four use cases.
- **Key points:**
  - **1. Shop floor SOP assistant:** answer machine operation, maintenance and safety questions using only approved manuals. Instructions: answer only from attached documents, always cite document and page, if not found say so and refer to the shift supervisor, never improvise a safety procedure. Knowledge base: equipment manuals, SOPs, safety data sheets, lockout tagout procedures. Tools: none (read only). Guardrail: both directions. Output: text. Warning: keep only approved, current documents.
  - **2. Quality deviation triage:** read a deviation report, classify, rate severity, identify the spec clause. Knowledge base: quality specifications, past deviation records, corrective action library. Output JSON: `category`, `severity`, `specClause`, `suggestedAction`, `requiresHumanReview`. Tools: Google Sheets (append to deviation register). Tip: set `requiresHumanReview` true above a severity threshold.
  - **3. Supplier document review:** compare a supplier document against specification and list discrepancies. Knowledge base: material specifications, approved supplier list, incoming inspection criteria. Output JSON list of `{ field, expected, found, withinTolerance }`. Tools: Gmail (read only), Slack (notify quality channel).
  - **4. Maintenance planning assistant:** draft a maintenance plan from manual and service history. Knowledge base: equipment manuals, service history exports, spare parts catalogue. Tools: Google Calendar (propose windows), Google Docs (write plan). Memory: on.
  - **Governance:** one knowledge base per document family (uploads, deletions, retries audited); every answer has an exportable trace showing passages used; quality owns the knowledge base as Admin and operators are Viewers on the agent only; publish, pause, archive and restore are audited events.
  - Page contains a video placeholder (2 min) on building the shop floor SOP assistant.

## Healthcare
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Healthcare
- **Summary:** Administrative and information tasks only. The page opens with a danger notice: nothing is clinical advice, no configuration makes an agent a medical device, any output touching patient care needs a qualified human in the loop, and the regulatory position must be confirmed before deployment.
- **Key points:**
  - **1. Clinical policy and protocol lookup:** answer staff questions about internal policies and protocols, citing document title, version and page. Never give clinical advice, a diagnosis or a dosage recommendation. Knowledge base: clinical policies, care protocols, formulary documents, infection control procedures. Guardrail: both directions with a template configured to block personal health information. Tools: none. Memory: **off** (memory stores content with a third-party provider).
  - **2. Prior authorisation drafting:** draft a request from a clinician's summary and the payer's published criteria. Knowledge base: payer coverage criteria, internal templates, past approved submissions with identifiers removed. Output text in a fixed template. Mark unevidenced fields `[NEEDS REVIEW]`; never assert a clinical fact not in the input.
  - **3. Patient communication drafting:** rewrite approved clinical information in plain language at a reading age of twelve. Skills: a "Plain language rules" skill shared across patient-facing agents. Rewrite only; a clinician reviews every draft before sending. Guardrail: both directions.
  - **4. Coding and documentation support:** suggest candidate codes for a de-identified encounter summary with reasoning. Knowledge base: coding guidelines, internal coding policy. Output JSON list `{ code, description, confidence, rationale }`. Suggestions only; a certified coder decides.
  - **Governance:** guardrail on both input and output to block or redact personal health information; keep `trace: read_payloads` with a very small group and give clinical ops `trace: read` only; traces record exact documents used and are exportable; instruct agents to pause and ask before consequential steps; monthly audit-log review filtered to denials and sharing events; deleting a user removes identity while the audit trail keeps a pseudonymous identifier.

## Finance
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Finance
- **Summary:** High-volume, rule-bound, heavily audited work. Page warns that nothing is financial or investment advice; agents draft, extract and check, and a qualified human approves. Four use cases.
- **Key points:**
  - **1. Invoice and receipt extraction:** output JSON `supplier`, `invoiceNumber`, `issueDate`, `dueDate`, `currency`, `lineItems[]`, `subtotal`, `tax`, `total`. Return only fields present, never infer, set null rather than guess, flag when line items do not sum to the total. Tools: Google Drive or Gmail to fetch, Google Sheets to write. A smaller model is usually enough.
  - **2. Policy and control question answering:** answer questions on finance policy, spend approval thresholds and expense rules. Knowledge base: finance policy, delegation of authority matrix, expense policy, procurement rules. Answer only from policy, quote the clause, route specific-transaction questions to the finance team. Tools: Slack.
  - **3. Contract and pricing review:** compare a customer contract against standard commercial terms, list deviations. Knowledge base: standard terms, approved discount bands, revenue recognition policy. Output JSON list `{ clause, standard, proposed, risk, requiresApproval }`.
  - **4. Month end variance narrative:** turn a variance table into management-pack commentary. Skills: "Management reporting style". Tools: Google Sheets to read, Google Docs to write. Explain only variances above the materiality threshold; never speculate on a cause not in supporting notes.
  - **Governance:** segregation of duties (builders create; a separate approver group holds Admin on production agents); immutable evidence (append-only audit log with actor role at the time); cost control (model allowlist plus per-run cost in traces); four eyes on payments; quarterly access review (export audit log filtered to sharing and role changes).
  - Danger notice: never give an agent a tool that moves money; draft the payment, produce the file, notify a human; execution stays with a person.

## Legal
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Legal
- **Summary:** Agents do not give legal advice; configure them to draft, extract and compare, never advise, with a qualified lawyer reviewing output. Four use cases.
- **Key points:**
  - **1. Contract review against a playbook:** compare an incoming contract against the playbook and list every deviation with risk level. Knowledge base: contract playbook, standard clause library, fallback positions, approved precedents. Output JSON list `{ clause, ourStandard, theirVersion, deviation, risk, fallbackAvailable }`. Quote exact text of both versions, never paraphrase, never recommend acceptance, flag anything not in the playbook as `UNCOVERED`. Tools: Google Drive (read), Google Docs (review note).
  - **2. Obligation and date extraction:** extract every obligation, deadline, renewal date and notice period from an executed agreement. Output JSON list `{ obligation, party, dueDate, noticePeriod, sourceClause }`. Tools: Google Sheets (obligations register), Google Calendar (reminders). Cite the clause; for relative dates state the trigger rather than computing a date.
  - **3. Legal front door:** answer routine internal questions on company policy and standard terms; route everything else to a lawyer. Knowledge base: company policies, standard terms, published guidance notes. State in every answer that it is information, not legal advice; route disputes, regulators and specific negotiations to the legal team. Tools: Slack.
  - **4. Discovery and disclosure triage:** classify documents by relevance to defined issues and flag potentially privileged material. Output JSON `{ relevance, issues[], potentiallyPrivileged, rationale }`. Err heavily towards flagging privilege (false positive costs a review; false negative costs a waiver).
  - **Governance:** one knowledge base per matter shared with a matter-specific group; keep `trace: read_payloads` with the legal team only; put the disclaimer in a shared skill; traces record which passages produced each answer and are exportable; deletes are soft so activity records survive.
  - Tip: create one shared skill "Legal output rules" (disclaimer, citation format, escalation list) and attach it to every legal agent.

## Operations & Management
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Operations-And-Management
- **Summary:** The widest range of agents, because operations has the most repetitive reading and writing. Five use cases.
- **Key points:**
  - **1. Support triage:** read a support email, classify, rate urgency, draft a first reply. Knowledge base: product documentation, known issues, refund and SLA policy. Skills: brand voice, escalation policy. Tools: Gmail (read only), Slack (notify on High urgency). Output JSON `category`, `urgency`, `draftReply`, `needsHuman`. Guardrail: both directions. Tip: draft, do not send; move to auto-send only for a category with weeks of measured quality.
  - **2. Internal helpdesk:** answer employee questions on IT, HR and facilities policy. Knowledge base: employee handbook, IT policy, travel and expense policy, benefits guide. Tools: Slack, SAP SuccessFactors (read only). Tool mode **Sign in individually** so each employee reaches only their own record; a shared account would let any employee reach any record.
  - **3. Meeting notes to actions:** turn raw notes into a decision log and owned actions with dates. Output JSON `decisions[]`, `actions[] { what, owner, due }`, `openQuestions[]`. Tools: Notion, Google Calendar. Only record an action if an owner was named; otherwise put it in open questions.
  - **4. Vendor and procurement intake:** check a purchase request against procurement policy and produce a routing decision. Knowledge base: procurement policy, approved vendor list, delegation of authority matrix. Output JSON `route`, `approver`, `policyChecks[]`, `blockers[]`. Tools: Slack, Google Sheets.
  - **5. Weekly operations digest:** read this week's operational data and write a one-page leadership digest. Tools: Google Sheets (read), Google Docs or Notion (write), Slack (post). Memory: on. Skills: Management reporting style.
  - **Governance:** agent sprawl (grant `agent: create` via a Builder role); consistency (shared skills); accidental sends (tick read-only actions unless writing is required); onboarding/offboarding (share with groups); cost visibility (give ops leads `trace: read`).

## Marketing
- **URL:** https://createos.sh/docs/studio/Enterprise-Use-Cases/Marketing
- **Summary:** Marketing agents succeed or fail on whether output sounds like the brand, which the page frames as a skills problem rather than a model problem. Five use cases plus a starter brand-voice skill.
- **Key points:**
  - **Brand voice skill (build first, attach to all):** tone direct and warm, short sentences; banned words (leverage, synergy, revolutionary, game changing, seamless, unlock); rules: address the reader as "you", lead with the outcome, one call to action per piece, numbers under ten as words, never claim an unpublished benchmark.
  - **1. Campaign copy generation:** product brief to email, social and landing page copy. Skills: brand voice, channel formats. Knowledge base: positioning documents, product one-pagers, past high-performing campaigns, claims and legal wording. Output JSON `subjectLines[]`, `emailBody`, `socialPosts[]`, `landingHeadline`, `cta`. Never invent a statistic, customer name or benchmark.
  - **2. Content repurposing:** one long piece to channel-specific assets. Tools: Notion or Google Docs. Introduce no fact not in the source; preserve legal disclaimers word for word.
  - **3. Competitive and market briefing:** summarise what changed this month and what it means for positioning. Knowledge base: competitor teardown notes, win-loss analysis, positioning documents. Tools: Google Drive, Slack. Memory: on.
  - **4. Inbound lead qualification:** score an inbound enquiry and draft a first response. Knowledge base: ideal customer profile, qualification framework, objection handling notes. Tools: Salesforce (read and update lead), Gmail (draft). Output JSON `score`, `segment`, `reasons[]`, `draftReply`, `route`.
  - **5. Localisation:** adapt approved copy for another market. Knowledge base: per-market glossary, regional legal requirements. Adapt rather than translate literally; never change a legal disclaimer; flag claims that may not be permitted in the target market.
  - **Governance:** one shared brand voice skill with a single owner; keep every approved claim in the knowledge base; reproduce disclaimers verbatim and review before publishing; nothing publishes itself (write access to drafting destinations only); cost (test a smaller model first, compare in the sandbox).
  - Page contains a video placeholder (2 min) on the campaign copy agent and the brand voice skill.

## Related
- Up: [[Docs - Studio]]
- [[Industries]]: CreateOS industry hubs
- [[Industry - Manufacturing]]: manufacturing industry page
- [[Industry - Healthcare]]: healthcare industry page
- [[Industry - Financial Services]]: financial services industry page
- [[Industry - Legal]]: legal industry page
- [[Industry - Marketing]]: marketing industry page
- [[Docs - Studio Agent Builder - Govern]]: RBAC, guardrails, audit logs and traces used in the governance tables
- [[Docs - Studio Agent Builder - Define]]: Skills (brand voice, plain language rules, legal output rules)
- [[Docs - Studio Agent Builder - Act]]: Tools and the Sign in individually / Shared modes
- [[Product - Agents]]: CreateOS agents product page
- [[Studio Early Access]]: request access to Studio
