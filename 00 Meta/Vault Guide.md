---
aliases:
  - Vault conventions
tags:
  - meta
  - type/hub
scraped: 2026-10-17
up: "[[Home]]"
---

# Vault Guide

> [!summary] What this vault is
> A scraped knowledge base for the **Build Agents That Run Code: CreateOS × Stripe Projects Hackathon** (Sat 17 Oct 2026, online). Sources: createos.sh, createos.sh/docs, docs.stripe.com/projects. The content is extracted, not analysed. Scraped 2026-10-17.
> Built per the Obsidian Help conventions: [Internal links](https://obsidian.md/help/links), [Properties](https://obsidian.md/help/properties), [Tags](https://obsidian.md/help/tags), [Aliases](https://obsidian.md/help/aliases), [Callouts](https://obsidian.md/help/callouts), [Canvas](https://obsidian.md/help/plugins/canvas).

## Folder map

| Folder | Content |
|---|---|
| `00 Meta` | This guide |
| `01 Hackathon` | Event page, schedule, ideas, setup, resources, FAQ, repos |
| `02 Stripe Projects` | docs.stripe.com/projects and sub-pages |
| `03 CreateOS Docs` | createos.sh/docs, as executive summaries plus URLs (subfolders: Platform, Sandbox, Studio, Services and MPP) |
| `04 Products and Pricing` | Product pages, pricing, security, networking, self-host |
| `05 Services` | CreateOS AI build services (AI Agents, RAG, …) |
| `06 Industries` | Industry hubs plus their use-case pages |
| `07 Integrations and Comparisons` | Integration pages, `vs` pages, alternatives |
| `08 Company` | Homepage, about, brand, careers, partners, contact, … |
| `09 Case Studies` | Customer stories plus solution blueprints |
| `10 Blog` | Blog and guides index |
| `11 Spike Testing` | The user's own trial runs (Stripe CLI test); not notes |
| `13 Pitch Deck` | One markdown file per slide (14) plus the deck brief and design system |
| `13 visuals` | Visual references (colour palettes) |
| `14 Design Resources` | Design references, UI pattern libraries (MCP), component/motion libraries and agent skills used for Reeve's visuals |
| `12 Brainstorm` | Brainstorm session log: research report, idea evolution, the Reeve design, plan constraints, Monad tools |

Root files: [[Home]] (entry point / master MOC) and `Mind Map.canvas` (visual map).

## Note rules

1. **Note names are unique across the vault.** Link by name only: `[[Note Name]]`, with no folder path. Use display text with `[[Note Name|text]]` and headings with `[[Note Name#Heading]]`.
2. **Filenames** never contain `# | ^ : %% [[ ]] / \ ? * " < >`. Use ` - ` as the separator, and write "and" instead of `&`.
3. **Only link to notes that exist**: notes from the registry below, or notes you created yourself. Do not invent link targets.
4. Content language follows the source (English). Keep code, commands, flags, endpoints, numbers, prices and product names **verbatim**. Condense prose into bullets and do not copy long passages verbatim. Add no opinions or analysis.
5. Every fact must be traceable. Every note has `source`/`sources`, and every docs entry carries its own URL.

## Properties (frontmatter)

```yaml
---
aliases:            # optional, a list
  - Short name
tags:               # a list, nested tags allowed
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/...      # primary URL
sources:                              # optional, when a note covers several URLs
  - https://...
scraped: 2026-10-17
up: "[[Parent Hub Note]]"
---
```

## Tag taxonomy

- Domain: `hackathon`, `hackathon/idea`, `stripe/projects`, `createos/docs`, `createos/docs/platform`, `createos/docs/sandbox`, `createos/docs/studio`, `createos/docs/services`, `createos/docs/mpp`, `createos/product`, `createos/pricing`, `createos/service`, `createos/industry`, `createos/use-case`, `createos/integration`, `createos/comparison`, `createos/company`, `createos/case-study`, `createos/blueprint`, `createos/blog`, `partner`, `brainstorm`, `reeve`, `design`
- Kind: `type/hub` (MOC / index of other notes), `type/page` (content from 1–few pages), `type/index` (list of many links with short descriptions)

## Body template

```markdown
# <Note Name>

> [!summary] Summary
> - 2–5 key facts
> - Source: <url>

## <Sections mirroring the source structure>

## Related
- Up: [[Parent Hub]]
- [[Sibling or cross-topic note]]: why it is related
```

Docs entry format (one H2 per docs page):

```markdown
## <Page title>
- **URL:** https://createos.sh/docs/...
- **Summary:** 1–2 sentences.
- **Key points:**
  - limits / defaults / commands / endpoints verbatim
```

## Registry of fixed note names

Notes listed here MUST exist, under exactly these names. Other agents link to them. Owners may add extra notes using the listed prefix.

### 01 Hackathon
- `Hackathon Overview` (hub) · `Hackathon Schedule` · `Hackathon Ideas` (hub) · `Ideas - Builders` · `Ideas - Money` · `Ideas - Safe` · `Ideas - Computer Use` · `Ideas - Always On` · `Ideas - Stretch` · `Hackathon Setup Guide` · `Hackathon Resources and Tools` · `Hackathon FAQ` · `Hackathon Partner Services` · `Repo - createos-cli` · `Repo - createos-claude-plugins`

### 02 Stripe Projects
- `Stripe Projects` (hub) · `Stripe Projects - Templates` · `Stripe Projects - Paid Tier Countries` · `Stripe Projects - Providers` · extra notes: prefix `Stripe Projects - `

### 03 CreateOS Docs
- Root: `CreateOS Docs` (hub, built last)
- Services and MPP: `Docs - Services` (hub) · `CreateOS on Stripe Projects` · `Docs - MPP`
- Sandbox: `Docs - Sandbox` (hub) · `Docs - Sandbox Overview and Concepts` · `Docs - Sandbox Quickstart` · `Docs - Sandbox Limits` · `Docs - Sandbox Security and Self-Hosting` · `Docs - Sandbox CLI` · `Docs - Sandbox Integrations` · `Docs - Sandbox Claude Managed Agents` · `Docs - Sandbox REST API` (hub) · `Docs - Sandbox SDK` (hub) · extra notes: prefixes `Docs - Sandbox REST API - `, `Docs - Sandbox SDK - `
- Platform: `Docs - About CreateOS` · `Docs - Get Started` · `Docs - CLI` · `Docs - Build and Deploy` · `Docs - API and MCP` · `Docs - Migrations` · `Docs - Account and Billing` · `Docs - Resources` · `Docs - Integrations`
- Studio: `Docs - Studio` (hub) · `Docs - Studio Agent Builder` · `Docs - Studio APIs and SDKs` · `Docs - Studio Enterprise Use Cases` · extra notes: prefix `Docs - Studio `

### 04 Products and Pricing
- `Products` (hub) · `Product - Gateway` · `Product - Sandbox` · `Product - Sandbox Reliability` · `Product - Agents` · `Product - CLI` · `Pricing` (hub) · `Pricing - Sandbox` · `Pricing - Gateway` · `Security` · `Sandbox Networking` · `Egress Governance` · `Self-Host` · `For Agents` · `For SAP` · `AI Readiness` · `Studio Early Access`

### 05 Services
- `Services` (hub) · `Service - AI Agents` · `Service - Generative AI` · `Service - Computer Vision` · `Service - AI Strategy` · `Service - LLM Integration` · `Service - RAG` · `Service - Data and ML`

### 06 Industries
- `Industries` (hub) · `Industry - Legal` · `Industry - Manufacturing` · `Industry - Healthcare` · `Industry - Financial Services` · `Industry - Telecom` · `Industry - Marketing` · `Industry - Technology` · extra notes: prefix `Use Cases - `

### 07 Integrations and Comparisons
- `Integrations` (hub) · `Integration - Stripe` · `Integration - Salesforce` · `Integration - SAP` · `Integration - Snowflake` · `Integration - Workday` · `Integration - NetSuite` · `Integration - Okta` · `Integration - Vanta` · `Integration - DocuSign` · `Integration - Slack` · `Integration - GitHub` · `Integration - Notion` · `Comparisons` (hub) · `Alternatives` · `vs - AWS Lambda MicroVMs` · `vs - E2B` · `vs - Daytona` · `vs - Modal` · `vs - Vercel` · `vs - Runloop` · `vs - Cloudflare` · `vs - Perplexity`

### 08 Company
- `CreateOS Homepage` · `About CreateOS` · `Partners` · `Newsroom` · `Brand Handbook` · `Careers` · `Schools` · `Amazon Sellers` · `SF Tech Week` · `Examples` · `Contact and Community` · `Privacy and Terms` · `CreateOS llms.txt`

### 09 Case Studies
- `Case Studies` (hub) · `Customer Stories` · `Solution Blueprints` (hub) · extra notes: prefix `Blueprints - `

### 10 Blog
- `Blog` (hub) · `Guides Blog Index` · `Guides FAQ` · extra notes: prefix `Blog Index - `

### 12 Brainstorm
- `Brainstorm` (hub) · `Partnership Analysis Report` · `Brainstorm - Idea Evolution` · `Brainstorm - Open Questions and Risks` · `Plan Constraints - Free vs Beginner` · `Monad Tools Evaluation` · `Reeve - Overview` · `Reeve - Builder Business Flow` · `Reeve - Auditor Design` · `Reeve - SOP Inputs and Rule Types` · `Reeve - Connectors and Composio` · `Reeve - Credential Broker and Mera` · `Reeve - Agent Payments` · `Reeve - Architecture and Stack` · `Reeve - Screens Demo and MVP` · `Reeve - Executive Summary` · `Competitions for Reeve` · `Reeve - Payment Rails Indonesia` · `Reeve - Sustainability and Crypto Layer` · `Reeve - Sustainability Summary and SDGs` · `Reeve - Owner App PWA` · `Reeve - Domain Packs`

### 14 Design Resources
- `Design Resources` (hub) · `Design Reference Sites` · `UI Pattern Libraries - Mobbin and ScreensDesign` · `Component and Motion Libraries - React Bits and Hairline` · `Agent Skills - genjutsu and motionmaxxing` · `Reeve - Landing Page`

## Related
- Up: [[Home]]
- [[Hackathon Overview]]
- [[CreateOS Docs]]
