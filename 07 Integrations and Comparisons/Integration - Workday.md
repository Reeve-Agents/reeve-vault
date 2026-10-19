---
aliases:
  - Workday integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/workday
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - Workday

> [!summary] Summary
> - "Workday integration for AI agents". Category: HR and finance.
> - Governed path built for sensitive HR and finance data: agents answer headcount and policy questions and draft summaries, with PII masked and access read-only by default.
> - Source: https://createos.sh/integrations/workday

## Overview

- Category: HR and finance. Hub listing: "Governed AI on sensitive people data."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- Workday holds the most sensitive data in the company: compensation, performance, personal records.
- An ungoverned agent is a privacy incident waiting to happen; the smallest over-scoped read can expose an employee's pay or status.

## What governed agents do

- CreateOS routes Workday calls through the governed layer.
- Agents answer headcount, org and policy questions and draft summaries from Workday data.
- PII is masked before it reaches a model, access is scoped per role, and reads default to least privilege.

## What agents do in Workday

- Answer headcount, org and policy questions.
- Draft summaries from HR and finance data.
- Mask compensation and personal fields by default.
- Scope access per role to least privilege.
- Keep access read-only unless a write is approved.
- Log every Workday call to the audit trail.

## Runs on the unified AI execution layer

- Compensation and personal fields are masked by default.
- Access is read-only unless a write is explicitly approved.
- Scoping is per role.
- Every Workday call is logged for HR and privacy review.

## Common questions

- **How is sensitive employee data protected?** Personal and compensation fields are masked before anything reaches a model, access is scoped per role to least privilege, and zero data retention means records are processed in-session and not stored.
- **Can agents change Workday records?** Access is read-only by default. Any write, such as updating a record or initiating a process, requires explicit approval and is logged with the agent, the input and the approver.
- **Who can see what an agent did in Workday?** Every call is captured in the audit trail, so HR, privacy and security teams can review which records an agent read, what was masked, and what, if anything, changed.

## Related integrations (as linked on the page)

- Salesforce: https://createos.sh/integrations/salesforce
- SAP: https://createos.sh/integrations/sap
- Snowflake: https://createos.sh/integrations/snowflake

## Related
- Up: [[Integrations]]
- [[Integration - Salesforce]]: related integration linked on the page
- [[Integration - SAP]]: related integration linked on the page
- [[Integration - Snowflake]]: related integration linked on the page
- [[Security]]: CreateOS security posture
