---
aliases:
  - CreateOS Integrations
tags:
  - createos/integration
  - type/hub
source: https://createos.sh/integrations
sources:
  - https://createos.sh/integrations
  - https://createos.sh/integrations/stripe
scraped: 2026-10-17
up: "[[Home]]"
---

# Integrations

> [!summary] Summary
> - Headline: "Governed AI agents across your enterprise systems". CreateOS connects AI agents to the systems work lives in through governed connectors on the unified AI execution layer.
> - Agents read and write across CRM, ERP, data, identity and more, scoped to least-privilege access and logged on every call.
> - 12 enterprise system pages (Salesforce, SAP, NetSuite, Snowflake, Workday, Okta, Vanta, DocuSign, Slack, GitHub, Stripe, Notion) plus two developer integrations (CreateOS MCP, CreateOS Skills).
> - Source: https://createos.sh/integrations

## Enterprise system integrations

Pages grouped by category exactly as listed on the integrations page.

| Category | System | Role (as stated on the page) | Note |
|---|---|---|---|
| CRM | Salesforce | Governed AI across your CRM. | [[Integration - Salesforce]] |
| ERP | SAP | Governed AI on your system of record. | [[Integration - SAP]] |
| ERP | NetSuite | Governed AI on your books. | [[Integration - NetSuite]] |
| Data warehouse | Snowflake | Governed AI on your warehouse. | [[Integration - Snowflake]] |
| HR and finance | Workday | Governed AI on sensitive people data. | [[Integration - Workday]] |
| Identity | Okta | Every agent, a governed identity. | [[Integration - Okta]] |
| Compliance | Vanta | Governed AI for continuous compliance. | [[Integration - Vanta]] |
| Agreements | DocuSign | Governed AI across your agreements. | [[Integration - DocuSign]] |
| Collaboration | Slack | Governed AI where work happens. | [[Integration - Slack]] |
| Developer | GitHub | Governed AI across your codebase. | [[Integration - GitHub]] |
| Payments | Stripe | Governed AI on payments data. | [[Integration - Stripe]] |
| Knowledge | Notion | Governed AI on your knowledge base. | [[Integration - Notion]] |

URLs: https://createos.sh/integrations/<name> for each system (salesforce, sap, netsuite, snowflake, workday, okta, vanta, docusign, slack, github, stripe, notion).

## Connect your IDE and AI coding tools

Integrations are not only enterprise systems. CreateOS plugs into the tools developers and agents already use, through the official MCP server and a universal deployment Skill. No new IDE, no workflow change.

| Integration | Connects | Links |
|---|---|---|
| CreateOS MCP | Cursor, VS Code Copilot, Claude Code, Gemini CLI, Gemini Code Assist, Windsurf, Opencode, Zapier, ElevenLabs | GitHub: https://github.com/NodeOps-app/createos-mcp · Docs: https://createos.sh/docs/API-MCP/CreateOS-MCP |
| CreateOS Skills | Claude Code, GitHub Copilot, Gemini CLI, OpenCode, Codex, Amp, Kimi CLI | GitHub: https://github.com/NodeOps-app/skills · Docs: https://createos.sh/docs/API-MCP/CreateOS-Skills |

## CreateOS Skills (block repeated on every createos.sh page)

- Purpose: lets AI coding agents deploy applications directly from the development environment. Push apps live, publish to the marketplace, and earn revenue, all through natural language.
- Install:

```
npx skills add https://github.com/NodeOps-app/skills --skill createos
```

- Supported AI tools: Claude Code · GitHub Copilot · Gemini CLI · OpenCode · Codex · Amp · Kimi CLI

Core commands:

| Group | Commands |
|---|---|
| Project | CreateProject() · ListProjects() · UpdateProjectSettings() · DeleteProject() |
| Deployment | CreateDeployment() · TriggerLatestDeployment() · UploadDeploymentFiles() · GetBuildLogs() · GetDeploymentLogs() |
| Environment | CreateProjectEnvironment() · UpdateProjectEnvironmentEnvironmentVariables() · UpdateProjectEnvironmentResources() |
| Domains | CreateDomain() · RefreshDomain() · UpdateDomainEnvironment() |
| GitHub | ListConnectedGithubAccounts() · ListGithubRepositories() · ListGithubRepositoryBranches() · InstallGithubApp() |

Authentication:
1. Create an account at `createos.nodeops.network`.
2. Generate an API key from your profile.
3. For REST: header `X-Api-Key: <key>`. For MCP: no key required for basic operations.

- MCP endpoint: `https://api-createos.nodeops.network/mcp`
- Docs: https://createos.sh/docs/API-MCP/CreateOS-MCP

## Common questions

- **What is a governed AI agent integration?** A connection between an AI agent and an enterprise system that runs through a policy layer instead of straight to the API. CreateOS scopes access to least privilege, masks sensitive data, gates writes behind approval, validates outputs and logs every call.
- **How is this different from an API gateway or an iPaaS?** An API gateway or iPaaS moves data between systems. CreateOS governs what an AI agent is allowed to do inside those systems: which fields it reads, what it can write, when a human must approve, and what gets logged. Integrations are governed connectors on the execution layer, not a standalone integration product.
- **Do we have to rebuild our integrations to use CreateOS?** No. CreateOS governs the agents that talk to your systems. Bring agents built on any framework; they inherit routing, policy enforcement, data masking and audit across every connected system without a rebuild.
- **Can agents write to our systems, or only read?** Both, but writes are governed. Reads are scoped to least privilege, and any action that changes a record routes through a human approval gate and is logged. The exact posture depends on the system, which each integration page describes.
- **Can developers use CreateOS from their IDE?** Yes. The CreateOS MCP server connects Cursor, VS Code Copilot, Claude Code, Gemini, Windsurf and more, so you can manage and deploy projects in natural language. The CreateOS Skill adds one-command deploy to any AI coding tool. Both are open source.

## Do not see your system?

- CreateOS connects to enterprise systems through one governed integration layer. Book a demo and the team will scope it: https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile

## Other integration listings (from llms.txt, self-serve surface)

- Self-serve integrations list: Stripe, OpenAI, Anthropic, Supabase, Clerk, and more: https://createos.nodeops.network/integrations
- Platform page: https://createos.sh/products

## Related
- Up: [[Home]]
- [[Integration - Stripe]]: payments integration, most relevant to the hackathon
- [[Stripe Projects]]: Stripe Projects documentation hub
- [[CreateOS on Stripe Projects]]: CreateOS as a Stripe Projects provider
- [[Docs - Integrations]]: integrations in the CreateOS docs
- [[Docs - API and MCP]]: CreateOS MCP and API docs
- [[Products]]: product overview
- [[Contact and Community]]: how to reach the team
