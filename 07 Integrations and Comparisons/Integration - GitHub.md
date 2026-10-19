---
aliases:
  - GitHub integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/github
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - GitHub

> [!summary] Summary
> - "GitHub integration for AI agents". Category: Developer.
> - Agents read repositories to triage issues and draft pull requests; writes land behind review, secrets are never exposed, and every action is logged.
> - Deployment is handled through CreateOS rather than raw push access.
> - Source: https://createos.sh/integrations/github

## Overview

- Category: Developer. Hub listing: "Governed AI across your codebase."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- Broad GitHub access lets an agent read private code, leak secrets, or push changes no one reviewed.
- The codebase is intellectual property and a supply-chain surface, so ungoverned access is a security problem, not a convenience.

## What governed agents do

- CreateOS routes GitHub calls through the governed layer.
- Agents read repositories to triage issues, summarize changes and draft pull requests.
- Writes land as proposals for human review, secrets are masked, and deployment goes through CreateOS rather than raw push access.

## What agents do in GitHub

- Read repositories to triage and summarize.
- Draft pull requests as proposals for review.
- Summarize changes and surface risk in a diff.
- Mask secrets so they never reach a model.
- Scope repository access per agent.
- Log every GitHub action to the audit trail.

## Runs on the unified AI execution layer

- Repository access is scoped per agent.
- Writes land as pull requests for human review rather than direct pushes.
- Secrets are masked before anything reaches a model.
- Every action is logged.

## Common questions

- **Can an agent merge code on its own?** No. Agent writes land as pull requests for human review. A person approves and merges, and the agent's contribution is logged with the diff and the reviewer.
- **How are secrets protected?** Secrets are masked before any content reaches a model, and repository access is scoped per agent to least privilege, so an agent cannot read or leak credentials it does not need.
- **Can agents deploy from GitHub?** Yes, through CreateOS rather than raw push access. Deployment runs on the governed layer, so each ship is policy-checked and logged.

## Related integrations (as linked on the page)

- Salesforce: https://createos.sh/integrations/salesforce
- SAP: https://createos.sh/integrations/sap
- Snowflake: https://createos.sh/integrations/snowflake

## Related
- Up: [[Integrations]]
- [[Integrations]]: CreateOS Skills and MCP developer integrations (GitHub repos NodeOps-app/skills and NodeOps-app/createos-mcp)
- [[Integration - Salesforce]]: related integration linked on the page
- [[Integration - SAP]]: related integration linked on the page
- [[Integration - Snowflake]]: related integration linked on the page
- [[Contact and Community]]: CreateOS GitHub organisation https://github.com/NodeOps-app
