---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Integrations/Integration-Claude-ai
sources:
  - https://createos.sh/docs/Integrations/Integration-Claude-ai
  - https://createos.sh/docs/Integrations/Integration-ChatGPT
  - https://createos.sh/docs/Integrations/Integration-Zapier
  - https://createos.sh/docs/Integrations/Integration-ElevenLabs
  - https://createos.sh/docs/Integrations/Integration-Google-Workspace-CLI
  - https://createos.sh/docs/Integrations/Integration-One-Click-Deploy
scraped: 2026-10-17
up: "[[Docs - Integrations]]"
---

# Docs - Integrations - Other Tools

> [!summary] Summary
> - Claude.ai or Desktop and ChatGPT connect with an MCP URL plus OAuth login; Zapier and ElevenLabs use Streamable HTTP with the API key.
> - Google Workspace CLI: `npm install -g @googleworkspace/cli` gives the `gws` command.
> - One Click Deploy: deploy a public GitHub repo from https://createos.sh/app/deploy/github or add a "Deploy on CreateOS" README badge.
> - MCP URL: `https://api-createos.nodeops.network/mcp`. Source: https://createos.sh/docs/Integrations

## Claude.ai or Claude Desktop Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-Claude-ai
- **Summary:** Add CreateOS as a custom connector in Claude.ai (settings), then log in with CreateOS credentials.
- **Key points:**
  - Prerequisites: Claude account (Pro, Max or any subscription), CreateOS account.
  - Path: profile icon (bottom left), **Settings**, **Connectors** (https://claude.ai/settings/connectors ), **Add a custom connector** (https://claude.ai/settings/connectors?modal=add-custom-connector ).
  - Fields: **Name:** CreateOS (or your preferred name); **MCP URL:** `https://api-createos.nodeops.network/mcp`.
  - Click **Add**, click **Connect** for CreateOS, log in with CreateOS credentials.

## ChatGPT Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-ChatGPT
- **Summary:** Create a ChatGPT app with Developer Mode, point it at the CreateOS MCP URL, authenticate with OAuth.
- **Key points:**
  - Prerequisites: ChatGPT account (https://chatgpt.com ), CreateOS account.
  - Path: profile icon, **Settings**, **Apps, Advanced Settings** (https://chatgpt.com/#settings/Connectors/Advanced ), toggle **Developer Mode** on.
  - **Create app**: Name `CreateOS` (or preferred), Description `CreateOS deployment service` (as you wish), MCP URL `https://api-createos.nodeops.network/mcp`, **Authentication: OAuth**, **Create**; then log in with your CreateOS account.

## Zapier MCP Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-Zapier
- **Summary:** Use "MCP Client by Zapier" as an app connection to the CreateOS MCP server to automate workflows.
- **Key points:**
  - Prerequisites: Zapier account with admin permissions, CreateOS account with API key.
  - Path: Zapier web portal, **App Connections** (bottom left), **Add Connection** (top right), search "MCP Client by Zapier".
  - Fields:

    | Field | Value |
    |---|---|
    | Server URL | `https://api-createos.nodeops.network/mcp` |
    | Transport | Streamable HTTP |
    | OAuth | No |
    | Bearer Token | Your CreateOS API Key |

  - Click **Test** or **Save**; the connection appears in the App Connections list.

## ElevenLabs Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-ElevenLabs
- **Summary:** Add CreateOS as a Custom MCP Server integration in ElevenLabs with an `X-API-Key` header.
- **Key points:**
  - Prerequisites: ElevenLabs account, CreateOS account with API key, access to ElevenLabs Integration settings (https://elevenlabs.io/app/integrations ).
  - Path: **Integration** (left sidebar), **Add Integration**, **Custom MCP Server**.
  - Basic info: Name `CreateOS` (or custom), Description (your choice).
  - Server settings: Server type `Streamable HTTP`; URL `https://api-createos.nodeops.network/mcp`.
  - HTTP header: Type `Value`; Name `X-API-Key`; Value = your CreateOS API key.
  - Check **I trust this server**, click **Add Server**.
  - Troubleshooting: URL without trailing spaces, valid API key, "I trust this server" checked.

## Google Workspace CLI Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-Google-Workspace-CLI
- **Summary:** Install and authenticate the Google Workspace CLI (`gws`) to script Gmail, Docs, Sheets and Drive from the terminal; usable by agents.
- **Key points:**
  - Prerequisites: Node.js and npm, a Google account with Workspace access, a Google OAuth application (Google Cloud Console https://console.cloud.google.com/ ), a terminal.
  - Install:
    ```bash
    npm install -g @googleworkspace/cli
    ```
  - Auth setup: `gws auth setup` (credentials typically at `~/.config/gws/client_secret.json`; may need a Google OAuth client).
  - Login: `gws auth login --account your_email_here@gmail.com`
  - Verify:
    ```bash
    gws drive files list --params '{"pageSize": 5}'
    gws gmail +send --to your_email_here@gmail.com --subject 'from terminal' --body 'hello! from the terminal!'
    ```
  - Auth troubleshooting: `gws auth list`; if empty, export manually:
    ```bash
    gws auth export --unmasked > ~/gws-credentials.json
    export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=~/gws-credentials.json
    ```
  - More: `gws --help`; 100+ prebuilt skills (list https://github.com/googleworkspace/cli/blob/main/docs/skills.md ); example `gws gmail users getProfile --params '{"userId": "me"}'`.
  - Use cases listed: automated email workflows, AI agents that use Workspace tools, scripts that read or update Google Sheets, internal tools on Workspace APIs.
  - Demo: https://ik.imagekit.io/4v04d3yhr/CreateOS/gws%20cli.mov

## One Click Deploy Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-One-Click-Deploy
- **Summary:** Deploy a public GitHub repository from a URL with AI-assisted build configuration, or add a "Deploy on CreateOS" badge to a README.
- **Key points:**
  - Prerequisites: public GitHub repository URL, CreateOS account, knowledge of the project framework (for URL parameters).
  - Steps: open https://createos.sh/app/deploy/github ; **Deploy from URL**; paste repo URL (example `https://github.com/Paddyislw/himachal-crash-landing`); **Build with AI** (detection may take a few minutes); enter project name, review framework and settings; **Deploy Project**; open the live URL.
  - README badge markdown (from the page):
    ```markdown
    [![Deploy on CreateOS](https://img.shields.io/badge/Deploy%20on-CreateOS-D4703A?style=for-the-badge&logo=rocket&logoColor=white)](https://createos.sh/app/deploy/github?repo=https://github.com/Paddyislw/himachal-crash-landing&framework=vanilla-js&projectName=himachal-paraglider)
    ```
  - Custom deploy link pattern:
    ```bash
    https://createos.sh/app/deploy/github?repo=<your_github_repo_url>&framework=<framework_here>&projectName=<your_project_name>
    ```
  - Supported `framework` values: `vanilla-js`, `angular-spa`, `vite-ssr`, `vite-spa`, `nextjs`, `reactjs-spa`, `reactjs-ssr`, `vue-spa`.
  - If deployment fails: repo is public, repo URL valid, framework matches the project, retry Build with AI.
  - Video: https://www.youtube.com/embed/RuJ3isPLPrI

## Related
- Up: [[Docs - Integrations]]
- [[Docs - Integrations - Coding Tools]]: IDE and CLI agent setups
- [[Docs - API and MCP]]: MCP server and Skills
- [[Docs - Build and Deploy]]: deploy flows behind One Click Deploy
- [[Docs - Sandbox Integrations]]: Sandbox integrations
