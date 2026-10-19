---
aliases:
  - CreateOS Products
  - CreateOS Platform Overview
tags:
  - createos/product
  - type/hub
source: https://createos.sh/products
scraped: 2026-10-17
up: "[[Home]]"
---

# Products

> [!summary] Summary
> - CreateOS positions itself as "The Unified AI Execution Layer for the Enterprise": every agent and model call runs through one governed path (Route, Govern, Validate, Observe).
> - Six live components to build on: AI Gateway, Sandbox, Agents, CLI, Skills, MCP.
> - Certifications and posture: ISO 27001 certified, SOC 2 Type II certified, zero data retention, sovereign infrastructure.
> - Pricing is fixed, agreed in writing: platform subscription + deployment tier + optional forward-deployed engineering.
> - Source: https://createos.sh/products

## Hero

- **Headline:** The Unified AI Execution Layer for the Enterprise.
- **Pitch:** run every agent and model call through one governed path, routed to the right model, policy-enforced, validated, and logged with an audit trail regulators accept.
- **Badges:** ISO 27001 certified · SOC 2 Type II certified · Zero data retention · Sovereign infrastructure
- **CTAs:** request early access (https://createos.sh/early-access, see [[Studio Early Access]]) · contact (mailto:hello@createos.sh)

## Product notes (components you build on)

The execution layer is a set of live components, each governed by the same policy and audit path. Build on them directly, or let CreateOS compose them.

| Component | What it is | Note |
| --- | --- | --- |
| CreateOS AI Gateway | The LLM router. Every model call goes to the right provider by task, cost, and latency, with automatic failover. Model-agnostic, governed on the way through. | [[Product - Gateway]] |
| CreateOS Sandbox | An isolated, benchmarked runtime where agents and code execute. DevSecOps controls on every run, so nothing touches your systems ungoverned. | [[Product - Sandbox]] (failure modes: [[Product - Sandbox Reliability]]) |
| CreateOS Agents | The multi-agent runtime. Specialist agents plan and execute in parallel, each scoped to an autonomy level and checked against policy. | [[Product - Agents]] |
| CreateOS CLI | Ship from your terminal. Deploy apps and agents straight from your development environment, with the same governance applied. | [[Product - CLI]] |
| Skills | Deploy from your coding agent. Push apps live in natural language from Claude Code, Copilot, Gemini CLI, and more. | see section below |
| MCP | An agent-native control surface. AI agents operate CreateOS directly over MCP to create projects, deploy, and manage, governed like every other call. | see section below |

- Same governed layer, whether you build on it yourself or CreateOS forward-deploys engineers to do it with you.
- **CTA:** start_building -> https://createos.sh/app

Other product-area pages: [[Pricing]] · [[Security]] · [[Sandbox Networking]] · [[Egress Governance]] · [[Self-Host]] · [[For Agents]] · [[For SAP]] · [[AI Readiness]] · [[Studio Early Access]]

## CreateOS Skills (banner shown on every product and pricing page)

CreateOS Skills lets AI coding agents deploy applications directly from your development environment. Push apps live, publish to the marketplace, and earn revenue, all through natural language.

### Install

```
npx skills add https://github.com/NodeOps-app/skills --skill createos
```

### Supported AI tools

Claude Code · GitHub Copilot · Gemini CLI · OpenCode · Codex · Amp · Kimi CLI

### Core commands

| Group | Commands |
| --- | --- |
| Project | CreateProject() · ListProjects() · UpdateProjectSettings() · DeleteProject() |
| Deployment | CreateDeployment() · TriggerLatestDeployment() · UploadDeploymentFiles() · GetBuildLogs() · GetDeploymentLogs() |
| Environment | CreateProjectEnvironment() · UpdateProjectEnvironmentEnvironmentVariables() · UpdateProjectEnvironmentResources() |
| Domains | CreateDomain() · RefreshDomain() · UpdateDomainEnvironment() |
| GitHub | ListConnectedGithubAccounts() · ListGithubRepositories() · ListGithubRepositoryBranches() · InstallGithubApp() |

### Authentication

1. Create an account at `createos.nodeops.network`
2. Generate an API key from your profile
3. For REST: header `X-Api-Key: <key>`. For MCP: no key required for basic operations.

- **MCP endpoint:** `https://api-createos.nodeops.network/mcp`
- **Docs link (createos_mcp_docs):** https://createos.sh/docs/API-MCP/CreateOS-MCP (see [[Docs - API and MCP]])

## One governed path from request to response

Every call, from every agent and every team, runs the same four stages. No side doors, no ungoverned paths.

| Stage | What runs |
| --- | --- |
| Route | Every request goes to the right model by task, cost, and latency, with automatic failover across providers. Model-agnostic, no lock-in. |
| Govern | Prompt-injection checks, policy validation, access controls, and autonomy thresholds run before a model sees the request. |
| Validate | Hallucination checks, PII masking, and content filtering run on every response before it reaches a user or a system. |
| Observe | Decision lineage, execution logs, cost telemetry, and a full audit trail with SOC visibility across every agent and workflow. |

## No agent yet? Start from an outcome

Describe what you need in plain language. CreateOS plans the work, runs it through the same governed path, and ships a deployed result.

| Stage | What runs |
| --- | --- |
| Describe | State the outcome in plain language, or start from a blueprint. |
| Plan and approve | CreateOS decomposes the work, selects the right models and connectors, and waits for your approval before it acts. |
| Agents build | A team of specialist agents executes in parallel, each governed by its autonomy level and checked against policy. |
| Ship and run | Review the result, deploy it to your environment, and run it with a full audit trail. |

## Describe the outcome, ship the work

| Output | Detail |
| --- | --- |
| Internal apps and tools | Dashboards, admin panels, and portals, built and deployed to your environment. |
| Reports and analytics | Board packs, forecasts, and KPI summaries pulled from your systems of record. |
| Document and data workflows | Contract intelligence, reconciliations, and evidence bundles, traced to source. |
| Automations | Scheduled, multi-step work that runs across your connected systems. |

## Governed by default

| Control | What it does |
| --- | --- |
| Task-aware routing | Every request goes to the right model by task, cost, and latency, with automatic failover across providers. |
| Policy and approvals | Prompt-injection checks, policy validation, and human approval gates run before an agent acts. |
| Autonomy controls | Set each agent to watch, suggest, or execute, with budgets and access scoped per workflow. |
| Output validation | Hallucination checks, PII masking, and content filtering run before any response reaches a user. |
| Observability and audit | Decision lineage, execution logs, and a full audit trail with SOC visibility a regulator will accept. |
| Model-agnostic | Any model: OpenAI, Anthropic, Google, Mistral, Meta, open-source, or sovereign. No lock-in. |

## Connect your models, tools, and systems

- **Route across models:** OpenAI · Anthropic · Gemini · Meta AI · Open-source
- **Works with the AI tools your teams use:** Cursor · Claude Code · ChatGPT · Gemini CLI · VS Code Copilot · Windsurf · Opencode · Antigravity · Zapier · ElevenLabs
- **Connects to your enterprise systems:** Salesforce · SAP · Snowflake · Workday · NetSuite · Okta · Vanta · DocuSign · Slack · GitHub · Stripe · Notion
- Agents read and write across CRM, ERP, data, and identity systems, scoped to least-privilege access and logged on every call.
- **CTA:** all_integrations -> https://createos.sh/integrations (see [[Integrations]])

## One layer, every team's work

| Team | Work |
| --- | --- |
| Revenue | Deal prep and proposals grounded in your CRM, every claim cited and logged. |
| Finance | Board packs, forecasts, and close summaries from systems of record, traced to source. |
| Legal | Contract and document intelligence, clauses surfaced with citations, every review on the record. |
| Support | Customer operations with governed responses, PII masked, clean handoff to a human. |
| Knowledge | Internal answers from approved sources, scoped to each role, every query logged. |
| Compliance | Continuous policy checks with findings packaged for audit. |

- **Built for regulated industries:** Financial services (https://createos.sh/industries) · Legal (https://createos.sh/industries/legal) · Healthcare (https://createos.sh/industries/healthcare) · Manufacturing (https://createos.sh/industries/manufacturing)
- **CTA:** Explore use cases by industry -> https://createos.sh/industries (see [[Industries]])

## Deploy anywhere, run where your data lives

- Ship from a repo, an image, or an upload. Run on CreateOS cloud, your VPC, or on-prem, with region-aware compute and zero data retention.
- **Methods:** From a GitHub repo · From a Docker image · From an upload
- ISO 27001 certified · SOC 2 Type II certified · Zero data retention · Region-aware compute

## How pricing works

Fixed pricing, agreed in writing before we start. Three parts, scoped to what you actually run.

| Component | What it covers |
| --- | --- |
| Platform | An annual subscription scoped to the workflows and agents you run in production. |
| Deployment | Priced by where it runs: CreateOS cloud, your VPC, or fully on-prem. |
| Forward-deployed engineering | A fixed-scope engagement that takes your first workflow to governed production. |

- Book a demo for a tailored quote on your first workflow.
- Usage-based product pricing: see [[Pricing]].

## Common questions

| Question | Answer |
| --- | --- |
| What is a unified AI execution layer? | The governed middle layer between the agents an enterprise builds and the models they run on. CreateOS routes every request to the right model, enforces security policy before the model sees it, validates every output, and logs the full decision trail for audit. One path for every agent, instead of a separate stack per team. |
| Can we bring agents we already built? | Yes. Any framework, low-code builders, or fully custom agents run through the governed path and inherit routing, policy enforcement, output validation, and audit without a rebuild. |
| Which models does CreateOS support? | OpenAI, Anthropic, Google, Mistral, Meta, open-source, and sovereign models. Routing is task-aware and model-agnostic, so you can switch providers without re-architecting, and failover is automatic when a provider goes down. |
| Where does CreateOS run? | Three deployment modes: CreateOS cloud, your VPC, or fully on-prem. Compute is region-aware with zero data retention by default, so regulated data never crosses a border you didn't approve. |
| How does it connect to our enterprise systems? | Through governed connectors to systems like Salesforce, SAP, Snowflake, Workday, and Okta. Agents read and write with least-privilege access, and every call is logged. |
| How fast can we get to production? | The standard rollout is 12 weeks across three gated phases of escalating autonomy. The fastest comparable deployment went from pilot to full production in 75 days across four states. Start with one stuck workflow and CreateOS forward-deploys engineers to get it live. |
| How does pricing work? | Platform subscription plus deployment tier plus an optional fixed-scope forward-deployed engineering engagement. Deliverables, timeline, and cost are agreed in writing before work starts. |

## Put one stalled workflow into governed production

- Bring one workflow that stalled on security review. CreateOS will route it, govern it, and stand it up in your environment.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · contact_sales -> mailto:hello@createos.sh
- Footer line: "CreateOS is the unified AI execution layer for the enterprise. Route, govern, validate, observe."

## Related
- Up: [[Home]]
- [[CreateOS Homepage]]: company homepage for the same platform
- [[Pricing]]: usage-based pricing for Gateway and Sandbox
- [[Services]]: forward-deployed engineering services on the platform
- [[Industries]]: industry use cases
- [[Integrations]]: integration pages
- [[Comparisons]]: how CreateOS compares with alternatives
- [[Case Studies]]: customer stories
- [[Docs - CLI]]: CLI documentation
- [[Docs - Sandbox]]: Sandbox documentation hub
- [[Docs - Studio]]: Studio documentation hub
- [[Hackathon Overview]]: the hackathon this vault supports
