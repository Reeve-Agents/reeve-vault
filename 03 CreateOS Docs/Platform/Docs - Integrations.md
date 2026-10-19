---
tags:
  - createos/docs
  - createos/docs/platform
  - type/hub
source: https://createos.sh/docs/Integrations
sources:
  - https://createos.sh/docs/Integrations
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Integrations

> [!summary] Summary
> - 14 integration guides for connecting AI tools to CreateOS, mostly through the CreateOS MCP server.
> - MCP URL (all guides): `https://api-createos.nodeops.network/mcp`; auth header `X-Api-Key: CREATEOS_API_KEY` (some clients use OAuth or a bearer token).
> - API key: log in to CreateOS, **Profile Settings**, copy from the **API Key** section (https://createos.sh/app/profile ).
> - Full setup commands and configs are in the two part notes below.
> - Source: https://createos.sh/docs/Integrations

## Integrations
- **URL:** https://createos.sh/docs/Integrations
- **Summary:** Index of integration guides.
- **Key points:**
  - Claude Code, Claude.ai or Desktop, ChatGPT, Cursor, Gemini CLI, Gemini Code Assist, Google Workspace CLI, VS Code with Copilot, Opencode, Windsurf, Antigravity, Zapier, ElevenLabs, One Click Deploy.

## Common values across guides
- MCP server URL: `https://api-createos.nodeops.network/mcp`
- Header: `X-Api-Key` with your CreateOS API key (Claude Code uses `--header "X-API-Key: CREATEOS_API_KEY"`; ElevenLabs uses `X-API-Key`).
- OAuth variants: Claude.ai (custom connector), ChatGPT (Developer Mode app, Authentication OAuth), VS Code install button (OAuth login).
- Zapier uses Streamable HTTP with the API key as Bearer Token.
- Resources repeated on pages: MCP server https://github.com/NodeOps-app/createos-mcp ; Skills https://github.com/NodeOps-app/skills ; MCP Operations (75+ tools) in [[Docs - API and MCP - MCP Operations]].
- Security note on every page: keep the API key confidential.

## Guide map

| Guide | Page URL | Part note |
|---|---|---|
| Claude Code | https://createos.sh/docs/Integrations/Integration-Claude-Code | [[Docs - Integrations - Coding Tools]] |
| Cursor | https://createos.sh/docs/Integrations/Integration-Cursor | [[Docs - Integrations - Coding Tools]] |
| Gemini CLI | https://createos.sh/docs/Integrations/Integration-Gemini-CLI | [[Docs - Integrations - Coding Tools]] |
| Gemini Code Assist | https://createos.sh/docs/Integrations/Integration-Gemini-Code-Assist | [[Docs - Integrations - Coding Tools]] |
| VS Code with Copilot | https://createos.sh/docs/Integrations/Integration-VS-Code | [[Docs - Integrations - Coding Tools]] |
| Opencode | https://createos.sh/docs/Integrations/Integration-Opencode | [[Docs - Integrations - Coding Tools]] |
| Windsurf | https://createos.sh/docs/Integrations/Integration-Windsurf | [[Docs - Integrations - Coding Tools]] |
| Antigravity | https://createos.sh/docs/Integrations/Integration-Antigravity | [[Docs - Integrations - Coding Tools]] |
| Claude.ai or Desktop | https://createos.sh/docs/Integrations/Integration-Claude-ai | [[Docs - Integrations - Other Tools]] |
| ChatGPT | https://createos.sh/docs/Integrations/Integration-ChatGPT | [[Docs - Integrations - Other Tools]] |
| Zapier | https://createos.sh/docs/Integrations/Integration-Zapier | [[Docs - Integrations - Other Tools]] |
| ElevenLabs | https://createos.sh/docs/Integrations/Integration-ElevenLabs | [[Docs - Integrations - Other Tools]] |
| Google Workspace CLI | https://createos.sh/docs/Integrations/Integration-Google-Workspace-CLI | [[Docs - Integrations - Other Tools]] |
| One Click Deploy | https://createos.sh/docs/Integrations/Integration-One-Click-Deploy | [[Docs - Integrations - Other Tools]] |

## Related
- Up: [[CreateOS Docs]]
- [[Docs - Integrations - Coding Tools]]: Claude Code, Cursor, Gemini CLI, Gemini Code Assist, VS Code, Opencode, Windsurf, Antigravity
- [[Docs - Integrations - Other Tools]]: Claude.ai, ChatGPT, Zapier, ElevenLabs, Google Workspace CLI, One Click Deploy
- [[Docs - API and MCP]]: MCP server, API, Skills
- [[Docs - Sandbox Integrations]]: integrations for Sandbox
- [[Docs - Sandbox Claude Managed Agents]]: Claude Managed Agents with Sandbox
- [[Hackathon Setup Guide]]: hackathon setup
