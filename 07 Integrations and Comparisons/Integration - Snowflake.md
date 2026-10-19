---
aliases:
  - Snowflake integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/snowflake
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - Snowflake

> [!summary] Summary
> - "Snowflake integration for AI agents". Category: Data warehouse.
> - Agents query Snowflake through a governed path that respects row-access and masking policies, generate analyses and reports from warehouse data, validate and cite results, and exfiltrate nothing.
> - Source: https://createos.sh/integrations/snowflake

## Overview

- Category: Data warehouse. Hub listing: "Governed AI on your warehouse."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- An agent pointed at Snowflake with a service account can read far more than the question needs.
- Raw rows flow into a model, row-access policies get bypassed, and a hallucinated number can land in a board report with no source.

## What governed agents do

- CreateOS routes Snowflake queries through the governed layer.
- Agents run scoped queries to build analyses, forecasts and reports, honoring Snowflake row-access and column-masking policies.
- Output is validated and cited back to the query that produced it.

## What agents do in Snowflake

- Run scoped, governed queries against the warehouse.
- Honor Snowflake row-access and masking policies.
- Generate analyses, forecasts and report drafts.
- Cite every figure back to its source query.
- Validate outputs before they reach a person.
- Log every query to the audit trail.

## Runs on the unified AI execution layer

- Agents inherit your Snowflake row-access and column-masking policies.
- Queries are scoped to least privilege.
- Outputs are validated and cited.
- Every query is logged so analysts can trace any number to its source.

## Common questions

- **Does this respect our Snowflake row-access policies?** Yes. Agents query under policies already enforced in Snowflake, so row-access and column masking apply to agent queries as they do to a person. CreateOS adds scoping, validation and audit on top.
- **How do we trust a number an agent reports?** Every figure is cited back to the query that produced it, and outputs run through validation before they reach a person. An analyst can open the source query for any number in a report.
- **Can agents write to Snowflake?** By default agents read for analysis. Where a write is in scope, it is governed like any other action: least-privilege access, optional approval, and a full log of the statement that ran.

## Related integrations (as linked on the page)

- Salesforce: https://createos.sh/integrations/salesforce
- SAP: https://createos.sh/integrations/sap
- Workday: https://createos.sh/integrations/workday

## Related
- Up: [[Integrations]]
- [[Integration - Salesforce]]: related integration linked on the page
- [[Integration - SAP]]: related integration linked on the page
- [[Integration - Workday]]: related integration linked on the page
- [[Security]]: CreateOS security posture
