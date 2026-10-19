---
aliases:
  - CreateOS case studies
tags:
  - createos/case-study
  - createos/blueprint
  - type/hub
source: https://createos.sh/case-studies
scraped: 2026-10-17
up: "[[Home]]"
---

# Case Studies

> [!summary] Summary
> - createos.sh/case-studies lists 62 case-study pages of two kinds: 10 delivered customer stories and 52 solution blueprints.
> - Customer stories are real deployments or builds; blueprints are workflows CreateOS has designed but not yet delivered. Their figures are **modelled, not measured**, and carry assumptions and a proof plan on the page.
> - The listing page has sections: "Deployed in production" intro, "CreateOS Skills", "Enterprise deployments" (55 entries: 52 blueprints plus 3 delivered), and "Built in minutes" (7 single-builder apps).
> - Source: https://createos.sh/case-studies (blueprint filter: https://createos.sh/case-studies?kind=blueprint)

## The two kinds

| Kind | Count | Note | What it is |
|---|---|---|---|
| Delivered customer stories | 10 | [[Customer Stories]] | 3 enterprise deployments (Davalogy, Indian textile CCTV pilot, litigation intelligence) and 7 "Built in minutes" apps |
| Solution blueprints | 52 | [[Solution Blueprints]] | Modelled workflows for banks, insurers, financial institutions and manufacturers, each with assumptions and a proof plan |

## Customer stories (10)
- Enterprise deployments: Davalogy (healthcare operating system), createos-industrial-ai-textile (CCTV oversight pilot across four Indian states, 75 days, 50,000+ hours, 750+ TB), createos-litigation-intelligence (Timeline Brief for law firms).
- Built in minutes: Justref, TACboard, Agent Blaster, Riyasat, AnyWhereGYM, Distraction Tracker, Creator Flow.
- Details and URLs for each: [[Customer Stories]].
- The site's llms.txt lists 8 customer stories (it omits Davalogy and Creator Flow, which appear on the listing page).

## Solution blueprints (52 in 11 groups)

| Group | Blueprints | Note |
|---|---|---|
| AML | 4 | [[Blueprints - AML]] |
| KYC | 4 | [[Blueprints - KYC]] |
| Fraud | 4 | [[Blueprints - Fraud]] |
| Customer Service | 4 | [[Blueprints - Customer Service]] |
| Lending | 3 | [[Blueprints - Lending]] |
| Reconciliation | 4 | [[Blueprints - Reconciliation]] |
| Investment Research | 4 | [[Blueprints - Investment Research]] |
| Regulatory Reporting | 4 | [[Blueprints - Regulatory Reporting]] |
| Claims | 4 | [[Blueprints - Claims]] |
| Underwriting | 4 | [[Blueprints - Underwriting]] |
| Manufacturing | 13 | [[Blueprints - Manufacturing]] |

- Full table of titles, domains and URL paths: [[Solution Blueprints]].
- Six of the blueprints are the ones llms.txt highlights: aml-02, kyc-02, uw-02, claims-01, mfg-13 and mfg-07.

## CreateOS Skills block (shown on every case-study page)
- **What it is:** lets AI coding agents deploy applications directly from the development environment; push apps live, publish to the marketplace, earn revenue, via natural language.
- **Install:** `npx skills add https://github.com/NodeOps-app/skills --skill createos`
- **Supported AI tools:** Claude Code, GitHub Copilot, Gemini CLI, OpenCode, Codex, Amp, Kimi CLI.
- **Core command groups:** Project (CreateProject, ListProjects, UpdateProjectSettings, DeleteProject); Deployment (CreateDeployment, TriggerLatestDeployment, UploadDeploymentFiles, GetBuildLogs, GetDeploymentLogs); Environment (CreateProjectEnvironment, UpdateProjectEnvironmentEnvironmentVariables, UpdateProjectEnvironmentResources); Domains (CreateDomain, RefreshDomain, UpdateDomainEnvironment); GitHub (ListConnectedGithubAccounts, ListGithubRepositories, ListGithubRepositoryBranches, InstallGithubApp).
- **Authentication:** account at `createos.nodeops.network`, API key from profile; REST header `X-Api-Key: <key>`; MCP needs no key for basic operations.
- **MCP endpoint:** `https://api-createos.nodeops.network/mcp`

## Related
- Up: [[Home]]
- [[Customer Stories]]
- [[Solution Blueprints]]
- [[Industries]]
- [[Industry - Legal]]: litigation intelligence story
- [[Industry - Manufacturing]]: textile pilot and 13 manufacturing blueprints
- [[Industry - Financial Services]]: banking, insurance and reporting blueprints
- [[Industry - Healthcare]]: Davalogy story
- [[Services]]
- [[Service - AI Agents]]
- [[Products]]
- [[Docs - API and MCP]]: CreateOS MCP documentation
