---
aliases:
  - Docs Index
  - CreateOS Documentation
tags:
  - createos/docs
  - type/hub
source: https://createos.sh/docs
sources:
  - https://createos.sh/docs
  - https://createos.sh/docs/llms.txt
  - https://createos.sh/docs/llms-full.txt
  - https://createos.sh/docs/sitemap.xml
scraped: 2026-10-17
up: "[[Home]]"
---

# CreateOS Docs

> [!summary] Summary
> - Root map of the CreateOS documentation (createos.sh/docs). The sitemap lists 171 URLs and `llms.txt` 171 entries, covering Platform, Sandbox, Studio, Services and MPP.
> - The docs notes hold **executive summaries plus the URL of every page**, not full copies. Open the URL for the full page.
> - Machine-readable sources: index `https://createos.sh/docs/llms.txt`, full corpus `https://createos.sh/docs/llms-full.txt` (about 1 MB). Append `.md` to any docs URL to get Markdown.
> - Source: https://createos.sh/docs

## Hackathon-critical path

1. [[Docs - Sandbox Quickstart]]: create a sandbox, exec, tear down
2. [[Docs - Sandbox Limits]]: shapes, images (`devbox:1`, `desktop:1`), Free vs Beginner plan limits
3. [[Docs - Sandbox CLI]]: `createos sandbox …` command reference
4. [[Docs - Sandbox SDK]]: SDKs in six languages, then [[Docs - Sandbox SDK - Quickstart and Tutorial]]
5. [[Docs - Sandbox REST API]]: every endpoint, grouped
6. [[CreateOS on Stripe Projects]]: plans, credentials in `.env`, `stripe projects add createos/project`
7. [[Docs - MPP]]: Machine Payments Protocol (the pay-per-run stretch idea)

## Sandbox (73 pages)

- Hub: [[Docs - Sandbox]] (index table of all 73 pages)
- Core: [[Docs - Sandbox Overview and Concepts]] · [[Docs - Sandbox Quickstart]] · [[Docs - Sandbox Limits]] · [[Docs - Sandbox Security and Self-Hosting]] · [[Docs - Sandbox Claude Managed Agents]]
- CLI: [[Docs - Sandbox CLI]]
- Integrations (Claude Code, Codex, OpenCode, Pi, Herdr, DeepSeek Harness, Orca, n8n, Langflow, AgentBox): [[Docs - Sandbox Integrations]]
- REST API (19 pages): [[Docs - Sandbox REST API]]
  - [[Docs - Sandbox REST API - Lifecycle and Execution]]
  - [[Docs - Sandbox REST API - Networking and Egress]]
  - [[Docs - Sandbox REST API - Storage and Templates]]
  - [[Docs - Sandbox REST API - Computer Use and Devices]]
  - [[Docs - Sandbox REST API - Observability and Webhooks]]
- SDK (30 pages): [[Docs - Sandbox SDK]]
  - [[Docs - Sandbox SDK - Quickstart and Tutorial]]
  - [[Docs - Sandbox SDK - How-To Guides]]
  - [[Docs - Sandbox SDK - API Reference]]
  - [[Docs - Sandbox SDK - Concepts]]
  - [[Docs - Sandbox SDK - Examples]]

## Platform (56 pages)

- [[Docs - About CreateOS]]: docs home, what CreateOS is
- [[Docs - Get Started]]: create a project, deploy from GitHub, database, app, rent a server
- [[Docs - CLI]], then [[Docs - CLI - Command Reference]]
- [[Docs - Build and Deploy]]
- [[Docs - API and MCP]], then [[Docs - API and MCP - MCP Operations]]
- [[Docs - Integrations]], then [[Docs - Integrations - Coding Tools]] · [[Docs - Integrations - Other Tools]]
- [[Docs - Migrations]]: from Vercel, Replit, Netlify, Railway, Render
- [[Docs - Account and Billing]]
- [[Docs - Resources]]

## Studio (30 pages)

- Hub: [[Docs - Studio]]
- [[Docs - Studio Agent Builder]]: [[Docs - Studio Agent Builder - Define]] · [[Docs - Studio Agent Builder - Ground]] · [[Docs - Studio Agent Builder - Act]] · [[Docs - Studio Agent Builder - Operate]] · [[Docs - Studio Agent Builder - Govern]]
- [[Docs - Studio APIs and SDKs]]
- [[Docs - Studio Enterprise Use Cases]]

## Services and MPP (12 pages)

- [[Docs - Services]]: Supabase, managed database, cache, message queue, Stripe Projects
- [[CreateOS on Stripe Projects]]
- [[Docs - MPP]]: Machine Payments Protocol, then [[Docs - MPP - Authentication]] · [[Docs - MPP - Deploy Flow]] · [[Docs - MPP - API Reference]] · [[Docs - MPP - Example]]

## Related
- Up: [[Home]]
- [[Hackathon Overview]]: why these docs matter for the event
- [[Hackathon Resources and Tools]]: links the hackathon page points to
- [[Stripe Projects]]: the other half of the hackathon stack
- [[Products]]: product pages for Sandbox, Gateway, Agents and CLI
- [[Pricing - Sandbox]]: per-second rates behind the plan limits
