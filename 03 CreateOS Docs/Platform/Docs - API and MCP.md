---
tags:
  - createos/docs
  - createos/docs/platform
  - type/hub
source: https://createos.sh/docs/API-MCP
sources:
  - https://createos.sh/docs/API-MCP
  - https://createos.sh/docs/API-MCP/CreateOS-API
  - https://createos.sh/docs/API-MCP/CreateOS-MCP
  - https://createos.sh/docs/API-MCP/CreateOS-Skills
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - API and MCP

> [!summary] Summary
> - MCP server endpoint: `https://api-createos.nodeops.network/mcp` (Streamable HTTP, MCP Authorization spec); 75+ tools, open source at https://github.com/NodeOps-app/createos-mcp
> - Auth: API key header `X-Api-Key: <your-api-key>` (key from https://createos.sh/app/profile ); OAuth also works for some clients.
> - Skill install: `npx skills add https://github.com/NodeOps-app/skills --skill createos`
> - API base URL default (from CLI docs): `https://api-createos.nodeops.network`
> - Full tool list: [[Docs - API and MCP - MCP Operations]]. Source: https://createos.sh/docs/API-MCP

## APIs and MCPs
- **URL:** https://createos.sh/docs/API-MCP
- **Summary:** Index of three integration routes: platform APIs, MCP servers, and CreateOS Skills; MCP Operations lists every MCP tool.
- **Key points:**
  - Pages: CreateOS APIs, CreateOS MCPs, MCP Operations ([[Docs - API and MCP - MCP Operations]]), CreateOS Skills.
  - Sandbox has its own REST API and SDK: [[Docs - Sandbox REST API]], [[Docs - Sandbox SDK]].

## CreateOS API Operations
- **URL:** https://createos.sh/docs/API-MCP/CreateOS-API
- **Summary:** Operation groups of the platform API: projects, GitHub app installations, environments, deployments, API keys, users. The page lists operation names only (no base URL or auth detail on the page).
- **Key points:**
  - **Projects:** create a new project; list all projects; get supported project types; check if project unique name is available; get project by ID; update project; delete project; update project settings; trigger latest deployment.
  - **App Installations (GitHub App):** install GitHub App; list connected GitHub accounts; list GitHub repositories; get repository content; list repository branches.
  - **Project Environments:** list, create, update, delete environments; check if environment unique name is available; update environment variables; update environment resources; assign deployment to environment; get environment logs; get environment analytics; overall request statistics; request distribution by status; RPM statistics; success percentage; top 10 hit paths; top 10 error paths.
  - **Deployments:** create, list, get, delete deployment; get build logs; get deployment logs; cancel; retrigger; wake up.
  - **API Keys:** list; create; check if API key name is available; update; revoke.
  - **Users:** get current user.
  - Related defaults from other pages: CLI `CREATEOS_API_URL` default `https://api-createos.nodeops.network`; REST header `X-Api-Key: <your-api-key>` (from the Skills page).

## CreateOS Model Context Protocol (MCP)
- **URL:** https://createos.sh/docs/API-MCP/CreateOS-MCP
- **Summary:** Official CreateOS MCP server that lets AI assistants access and deploy projects: manage, deploy and retrigger projects, analyze logs and request stats, manage GitHub repos, automate deployments.
- **Key points:**
  - Implements the latest MCP Authorization and Streamable HTTP specifications.
  - GitHub: https://github.com/NodeOps-app/createos-mcp (75+ MCP tools, open source).
  - Prerequisites: account at https://createos.sh/app and a CreateOS API key from https://createos.sh/app/profile (video: https://ik.imagekit.io/nodeops/No%20Sound/API%20Key%20Retrieval.mp4 ).
  - Endpoint (from other docs pages): `https://api-createos.nodeops.network/mcp`
  - Supported clients: Cursor, VS Code Copilot, Claude Code, Gemini CLI, Gemini Code Assist, Windsurf, Opencode, Zapier, ElevenLabs (setup in [[Docs - Integrations]]).
  - Resources: Skills repo https://github.com/NodeOps-app/skills ; MCP Operations (full list of 75+ tools); Discord https://discord.gg/nodeops

## CreateOS Skills
- **URL:** https://createos.sh/docs/API-MCP/CreateOS-Skills
- **Summary:** Universal deployment skill for AI coding tools: deploy, publish and manage apps via natural language from the existing IDE or CLI agent.
- **Key points:**
  - Install:
    ```bash
    npx skills add https://github.com/NodeOps-app/skills --skill createos
    ```
  - Supported tools: Claude Code, GitHub Copilot, Gemini CLI, OpenCode, Codex, Amp, Kimi CLI.
  - MCP endpoint: `https://api-createos.nodeops.network/mcp`. Through MCP no API key is required for basic operations (the server handles authentication). Direct REST calls use header `X-Api-Key: <your-api-key>`.
  - Skill commands by area:
    - Project management: `CreateProject()`, `ListProjects()`, `UpdateProjectSettings()`, `DeleteProject()`.
    - Deployment: `CreateDeployment()` (Docker images), `TriggerLatestDeployment()` (GitHub builds), `UploadDeploymentFiles()` (file upload), `GetBuildLogs()`, `GetDeploymentLogs()`.
    - Environment: `CreateProjectEnvironment()`, `UpdateProjectEnvironmentEnvironmentVariables()`, `UpdateProjectEnvironmentResources()`.
    - Domains: `CreateDomain()`, `RefreshDomain()`, `UpdateDomainEnvironment()`.
    - GitHub: `ListConnectedGithubAccounts()`, `ListGithubRepositories()`, `ListGithubRepositoryBranches()`, `InstallGithubApp()`.
  - Deployment methods: (1) Quick Deploy by file upload: `CreateProject()` as upload project then `UploadDeploymentFiles()`; (2) GitHub auto-deploy: `InstallGithubApp()`, `CreateProject()` with VCS type, each push deploys; (3) Docker: `CreateProject()` with image type, then `CreateDeployment()`.
  - Supported runtimes: Node.js 18, 20, 22; Python 3.11, 3.12; Go 1.22, 1.25; Rust 1.75; Bun 1.1, 1.3; static sites (HTML, CSS, JS).
  - Frameworks: Next.js, React, Vue, Nuxt, Astro, Remix, Express; FastAPI, Flask, Django; Gin, Fiber; Actix.
  - Best practices listed: never hardcode secrets (use env var tool), enable security scanning at project creation, set API key expiry; use at least 2 replicas in production, monitor analytics, separate dev/staging/prod; match runtime version, configure CPU and memory, enable caching.
  - Example workflows: deploy a Next.js app from GitHub (list accounts, list repos, create project VCS, trigger latest deployment); scale an app (`ListProjects()` then `UpdateProjectEnvironmentResources()`); add a custom domain (`CreateDomain()`, `RefreshDomain()`, `UpdateDomainEnvironment()`).
  - Links: Skills repo https://github.com/NodeOps-app/skills ; directory https://skills.sh/nodeops-app/skills/createos ; Discord https://discord.gg/nodeops

## Related
- Up: [[CreateOS Docs]]
- [[Docs - API and MCP - MCP Operations]]: all 73 MCP tools (split from this note)
- [[Docs - Integrations]]: client-by-client MCP setup
- [[Docs - Resources]]: llms.txt and MCP endpoint resources
- [[Docs - CLI]]: CLI equivalent of these operations
- [[Docs - Sandbox REST API]]: separate Sandbox REST API
- [[Docs - Sandbox SDK]]: separate Sandbox SDK
- [[Hackathon Setup Guide]]: hackathon setup
