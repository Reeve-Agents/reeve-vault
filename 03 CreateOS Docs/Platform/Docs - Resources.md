---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Resources
sources:
  - https://createos.sh/docs/Resources
  - https://createos.sh/docs/Resources/LLM-Resources
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Resources

> [!summary] Summary
> - Machine-readable entry points for AI tools and agents: `llms.txt`, `llms-full.txt`, per-page Markdown (append `.md` to any docs URL) and the MCP endpoint.
> - `llms.txt`: https://docs.createos.sh/llms.txt ; `llms-full.txt`: https://docs.createos.sh/llms-full.txt ; sitemap: https://docs.createos.sh/sitemap.xml
> - MCP endpoint: `https://api-createos.nodeops.network/mcp`; skill: `npx skills add https://github.com/NodeOps-app/skills --skill createos`
> - Source: https://createos.sh/docs/Resources/LLM-Resources

## Resources
- **URL:** https://createos.sh/docs/Resources
- **Summary:** Section index; one page.
- **Key points:**
  - Lists `llms.txt`, `llms-full.txt`, the per-page Markdown routes (append `.md` to any docs URL) and the MCP endpoints so an assistant can read the docs without scraping HTML.

## LLM and AI Resources
- **URL:** https://createos.sh/docs/Resources/LLM-Resources
- **Summary:** Structured resources by NodeOps for LLMs and agents: llms.txt files, the CreateOS skill and the MCP server.
- **Key points:**
  - `llms.txt` is an emerging standard (spec: https://llmstxt.org ); the page cites 844,000+ sites using it by 2026, including Anthropic, Cloudflare, Stripe, Vercel and Coinbase.
  - `llms.txt`: https://docs.createos.sh/llms.txt ; overview of NodeOps, CreateOS and key resources; about 3KB; updated weekly; Markdown (text/plain).
  - `llms-full.txt`: https://docs.createos.sh/llms-full.txt ; deeper context (architecture, use cases, technical capabilities); stated size about 2KB; updated weekly; Markdown (text/plain).
  - `llms.txt` contents: site overview, products (CreateOS, Console, $NODE Token), features, audiences, documentation links, comparison information, social and community links.
  - `llms-full.txt` contents: three-layer architecture (Power, Creation, Economic), technical capabilities, use cases, integration ecosystem, pricing model, security and trust.
  - Technical details: root-level location, UTF-8, no authentication required, proper Content-Type and caching headers.
  - Skills install (Claude Code, GitHub Copilot, Gemini CLI, OpenCode, Codex, Amp, Kimi CLI):
    ```bash
    npx skills add https://github.com/NodeOps-app/skills --skill createos
    ```
  - MCP: connect to the CreateOS MCP server for 75+ deployment tools at `https://api-createos.nodeops.network/mcp` (repos: https://github.com/NodeOps-app/createos-mcp , https://github.com/NodeOps-app/skills ).
  - Recommended developer resources: CreateOS API docs, MCP Operations, CreateOS Skills, integration guides.
  - Sitemap: https://docs.createos.sh/sitemap.xml ; page last updated February 2026.

## Related
- Up: [[CreateOS Docs]]
- [[CreateOS llms.txt]]: the CreateOS llms.txt note
- [[Docs - API and MCP]]: API, MCP and Skills detail
- [[Docs - Integrations]]: per-tool MCP setup
