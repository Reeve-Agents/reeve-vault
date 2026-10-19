---
aliases:
  - Salesforce integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/salesforce
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - Salesforce

> [!summary] Summary
> - "Salesforce integration for AI agents". Category: CRM.
> - Agents read and act on Salesforce data through one governed path: record access scoped to least privilege, every write waits for approval, outputs validated before they reach a rep or a customer.
> - Source: https://createos.sh/integrations/salesforce

## Overview

- Category: CRM. Hub listing: "Governed AI across your CRM."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- Wiring an agent straight to the Salesforce API hands it broad org access with no policy layer.
- One prompt injection or a careless write can corrupt pipeline data or expose customer records, and nothing logs what the agent touched.

## What governed agents do

- CreateOS routes Salesforce calls through the governed layer.
- Agents pull account, opportunity and contact context to draft proposals, summarize deals and flag pipeline risk.
- They write back only what policy allows, with a person approving anything that changes a record.

## What agents do in Salesforce

- Read accounts, opportunities and activity history.
- Draft and summarize deal notes grounded in CRM data.
- Flag stale or at-risk pipeline with citations.
- Write record updates behind a human approval gate.
- Mask PII before any field reaches a model.
- Log every read and write to the audit trail.

## Runs on the unified AI execution layer

- Field-level access is scoped per agent.
- Writes require human approval.
- Every Salesforce call is captured in an audit trail that RevOps and security teams can review.

## Common questions

- **Can AI agents write to Salesforce, or only read?** Both, but writes are gated. Read access is scoped to the fields an agent needs. Any write that changes a record routes through a human approval gate before it commits, and the change is logged with the agent, the prompt and the approver.
- **How does CreateOS keep customer data from leaking into a model?** PII is masked before a field is sent to a model, access is scoped per agent to least privilege, and zero data retention means prompts and records are processed in-session, not stored.
- **Do we need to rebuild our Salesforce integration?** No. CreateOS governs the agents that talk to Salesforce. Agents built on any framework inherit routing, policy enforcement, PII masking and audit without a rebuild.

## Related integrations (as linked on the page)

- SAP: https://createos.sh/integrations/sap
- Snowflake: https://createos.sh/integrations/snowflake
- Workday: https://createos.sh/integrations/workday

## Related
- Up: [[Integrations]]
- [[Integration - SAP]]: related integration linked on the page
- [[Integration - Snowflake]]: related integration linked on the page
- [[Integration - Workday]]: related integration linked on the page
- [[Security]]: CreateOS security posture
