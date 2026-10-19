---
aliases:
  - Okta integration
tags:
  - createos/integration
  - type/page
source: https://createos.sh/integrations/okta
scraped: 2026-10-17
up: "[[Integrations]]"
---

# Integration - Okta

> [!summary] Summary
> - "Okta integration for AI agents". Category: Identity.
> - Makes each AI agent a first-class identity Okta can govern: agents authenticate as scoped principals, access is mediated by Okta groups and policies, and provisioning actions run behind approval.
> - Source: https://createos.sh/integrations/okta

## Overview

- Category: Identity. Hub listing: "Every agent, a governed identity."
- Calls to action: book a demo, all integrations (https://createos.sh/integrations), platform (https://createos.sh/products).

## The ungoverned risk

- Most agents run on a shared service account, so you cannot tell which agent did what, and you cannot revoke one without breaking the rest.
- Identity is the missing control that makes agent access governable at all.

## What governed agents do

- CreateOS treats every agent as a governed principal with its own identity.
- Agents authenticate through Okta and inherit the groups and policies already managed.
- Any provisioning or deprovisioning action runs behind approval and is logged.

## What agents do in Okta

- Give each agent its own scoped identity.
- Authenticate agents through Okta groups and policies.
- Mediate every system access through identity.
- Run provisioning and deprovisioning behind approval.
- Revoke or suspend a single agent instantly.
- Log every identity event to the audit trail.

## Runs on the unified AI execution layer

- Each agent is a distinct, revocable principal.
- Access is mediated by the Okta groups and policies already managed.
- Every authentication and provisioning event is logged for identity and security review.

## Common questions

- **Why give an AI agent its own identity?** So you can govern it. A distinct identity per agent means you can scope its access, see what it did, and revoke it on its own without breaking other agents, none of which is possible on a shared service account.
- **Does this use our existing Okta policies?** Yes. Agents authenticate through Okta and inherit the groups and policies already managed, so access control for agents lives in the same place as access control for people.
- **Can agents manage Okta itself?** Provisioning and deprovisioning actions are supported but gated. Any change to identity routes through approval and is logged with the agent, the input and the approver.

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
