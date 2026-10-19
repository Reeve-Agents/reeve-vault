---
aliases:
  - Slack integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/slack
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - Slack

> [!summary] Summary
> - "Slack integration for AI agents". Category: Collaboration.
> - Agents in Slack answer from approved sources and act on requests, with responses validated, PII masked, a clean handoff to a person, and every message logged.
> - Source: https://createos.sh/integrations/slack

## Overview

- Category: Collaboration. Hub listing: "Governed AI where work happens."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- A bot in Slack with broad access is a fast way to leak data to the wrong channel or act on an injected instruction.
- Slack is where people move quickly, which is where an ungoverned agent does the most damage.

## What governed agents do

- CreateOS routes Slack interactions through the governed layer.
- Agents answer questions from approved sources, trigger governed workflows and respond in channel.
- Output validation and PII masking run before anything posts, with a clean handoff when a person should take over.

## What agents do in Slack

- Answer questions from approved sources in channel.
- Trigger governed workflows from a request.
- Validate and mask responses before they post.
- Scope channel and data access per agent.
- Hand off cleanly to a person when needed.
- Log every message and action to the audit trail.

## Runs on the unified AI execution layer

- Channel and data access is scoped per agent.
- Every response is validated and PII-masked before it posts.
- Prompt-injection checks run on inbound requests.
- Every interaction is logged.

## Common questions

- **How do you stop an agent from leaking data in Slack?** Responses are validated and PII-masked before they post, channel and data access is scoped per agent, and prompt-injection checks run on inbound messages so an agent cannot be talked into oversharing.
- **Can the agent take actions, or just chat?** Agents can trigger governed workflows from a Slack request, but those actions run through the same policy and approval gates as anywhere else, and each is logged.
- **What happens when the agent should not answer?** It hands off to a person rather than guessing. Autonomy thresholds decide when an agent answers, suggests or escalates.

## Related integrations (as linked on the page)

- Salesforce: https://createos.sh/integrations/salesforce
- SAP: https://createos.sh/integrations/sap
- Snowflake: https://createos.sh/integrations/snowflake

## Related
- Up: [[Integrations]]
- [[Integration - Salesforce]]: related integration linked on the page
- [[Integration - SAP]]: related integration linked on the page
- [[Integration - Snowflake]]: related integration linked on the page
- [[Contact and Community]]: CreateOS community channels
