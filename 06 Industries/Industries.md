---
aliases:
  - Industries hub
tags:
  - createos/industry
  - type/hub
source: https://createos.sh/industries
sources:
  - https://createos.sh/industries
  - https://createos.sh/industries/legal
  - https://createos.sh/industries/manufacturing
  - https://createos.sh/industries/healthcare
  - https://createos.sh/industries/financial-services
  - https://createos.sh/industries/telecom
  - https://createos.sh/industries/marketing
  - https://createos.sh/industries/technology
scraped: 2026-10-17
up: "[[Home]]"
---

# Industries

> [!summary] Summary
> - CreateOS goes deep in a few high-stakes verticals and puts governed agents into production, with every output cited and every action logged.
> - 7 industry hub pages; the main page table lists 6 (Technology has its own hub page but is not in that table).
> - 96 use-case pages under `/industries/use-cases/`: Legal 36, Manufacturing 16, Healthcare 15, Financial Services 13, Telecom 10, Marketing 6, Technology 0.
> - Source: https://createos.sh/industries

## Overview
- **Headline:** Built for industries that can't afford a wrong answer.
- **Pitch:** a few high-stakes verticals, governed agents in production, every output cited, every action logged. The page lists the agents CreateOS deploys, by industry.
- **Common last mile (all industries):** governance, audit, data residency, and the engineering to get an agent from pilot into production on one operating system.
- **Tagline in footer:** CreateOS is the unified AI execution layer for the enterprise. Route, govern, validate, observe.

## Industries

| Industry | Focus | Use-case pages | Note |
|---|---|---|---|
| Legal | Litigation and compliance | 36 | [[Industry - Legal]] |
| Manufacturing | Industrial and edge operations | 16 | [[Industry - Manufacturing]] |
| Healthcare | Clinical and payer operations | 15 | [[Industry - Healthcare]] |
| Financial Services | Banking, insurance, capital markets, and fintech operations | 13 | [[Industry - Financial Services]] |
| Telecom | Wireline network engineering and operations | 10 | [[Industry - Telecom]] |
| Marketing | Content, launches, and demand operations | 6 | [[Industry - Marketing]] |
| Technology | Ship AI features faster, safely (hub headline; not in the main page table) | 0 | [[Industry - Technology]] |
| **Total** | | **96** | |

- Industry hub URLs: https://createos.sh/industries/legal, https://createos.sh/industries/manufacturing, https://createos.sh/industries/healthcare, https://createos.sh/industries/financial-services, https://createos.sh/industries/telecom, https://createos.sh/industries/marketing, https://createos.sh/industries/technology
- Use-case entries: Legal in [[Use Cases - Legal]]; the other industries list theirs inside their own industry note.

## Every industry, same last mile
| Capability | What it means |
|---|---|
| Data residency | Region-aware compute with no cross-border exposure. |
| Governed inference | Policy validation and access controls on every call. |
| Decision lineage | Every action logged with a full audit trail, ready for review. |
| Forward-deployed engineers | We get your first production agent live, then scale it with you. |

## CTAs
- `book_a_demo`: https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- `see_case_studies`: https://createos.sh/case-studies (see [[Case Studies]])
- Hub ebooks: Legal https://createos.sh/industries/legal-ebook, Healthcare https://createos.sh/industries/healthcare-ebook, Telecom https://createos.sh/industries/telecom-ebook

## CreateOS Skills block shown on every page
- **What:** CreateOS Skills lets AI coding agents deploy applications from the development environment, push apps live, publish to the marketplace, and earn revenue, through natural language.
- **Install:**

```
npx skills add https://github.com/NodeOps-app/skills --skill createos
```

- **Supported AI tools:** Claude Code · GitHub Copilot · Gemini CLI · OpenCode · Codex · Amp · Kimi CLI
- **Core commands:**

| Group | Commands |
|---|---|
| Project | CreateProject() · ListProjects() · UpdateProjectSettings() · DeleteProject() |
| Deployment | CreateDeployment() · TriggerLatestDeployment() · UploadDeploymentFiles() · GetBuildLogs() · GetDeploymentLogs() |
| Environment | CreateProjectEnvironment() · UpdateProjectEnvironmentEnvironmentVariables() · UpdateProjectEnvironmentResources() |
| Domains | CreateDomain() · RefreshDomain() · UpdateDomainEnvironment() |
| GitHub | ListConnectedGithubAccounts() · ListGithubRepositories() · ListGithubRepositoryBranches() · InstallGithubApp() |

- **Authentication:** create an account at `createos.nodeops.network`, generate an API key from your profile. REST uses header `X-Api-Key: <key>`. MCP needs no key for basic operations.
- **MCP endpoint:** `https://api-createos.nodeops.network/mcp`
- **MCP docs:** https://createos.sh/docs/API-MCP/CreateOS-MCP

## Related
- Up: [[Home]]
- [[Industry - Legal]]: Litigation and compliance, 36 use-case pages
- [[Industry - Manufacturing]]: Industrial and edge operations, 16 use-case pages
- [[Industry - Healthcare]]: Clinical and payer operations, 15 use-case pages
- [[Industry - Financial Services]]: Banking, insurance, capital markets, and fintech operations, 13 use-case pages
- [[Industry - Telecom]]: Wireline network engineering and operations, 10 use-case pages
- [[Industry - Marketing]]: Content, launches, and demand operations, 6 use-case pages
- [[Industry - Technology]]: Ship AI features faster, safely, 0 use-case pages
- [[Use Cases - Legal]]: the 36 legal use-case entries
- [[Services]]: CreateOS AI build services hub
- [[Service - AI Agents]]: AI agent build service
- [[Case Studies]]: customer case studies and proof
- [[Customer Stories]]: customer story pages
- [[Solution Blueprints]]: solution blueprints hub
- [[Docs - Studio Enterprise Use Cases]]: Studio enterprise use cases (docs)
- [[Products]]: CreateOS products hub
