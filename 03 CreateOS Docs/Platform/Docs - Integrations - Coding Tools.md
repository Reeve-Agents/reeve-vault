---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Integrations/Integration-Claude-Code
sources:
  - https://createos.sh/docs/Integrations/Integration-Claude-Code
  - https://createos.sh/docs/Integrations/Integration-Cursor
  - https://createos.sh/docs/Integrations/Integration-Gemini-CLI
  - https://createos.sh/docs/Integrations/Integration-Gemini-Code-Assist
  - https://createos.sh/docs/Integrations/Integration-VS-Code
  - https://createos.sh/docs/Integrations/Integration-Opencode
  - https://createos.sh/docs/Integrations/Integration-Windsurf
  - https://createos.sh/docs/Integrations/Integration-Antigravity
scraped: 2026-10-17
up: "[[Docs - Integrations]]"
---

# Docs - Integrations - Coding Tools

> [!summary] Summary
> - Setup of the CreateOS MCP server in coding tools: Claude Code, Cursor, Gemini CLI, Gemini Code Assist, VS Code with Copilot, Opencode, Windsurf, Antigravity.
> - Server URL `https://api-createos.nodeops.network/mcp`; API key in header `X-Api-Key`; replace `CREATEOS_API_KEY` with the key from Profile Settings.
> - Claude Code one-liner: `claude mcp add createos-mcp --transport http https://api-createos.nodeops.network/mcp --header "X-API-Key: CREATEOS_API_KEY"`
> - Source: https://createos.sh/docs/Integrations

## Claude Code Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-Claude-Code
- **Summary:** Connect Claude Code to CreateOS over MCP using `claude mcp add`, for deployment workflows from the command line.
- **Key points:**
  - Prerequisites: Claude Code installed (install docs https://code.claude.com/docs/en/mcp ), CreateOS account with API key, a terminal.
  - Verify install: `claude --version`
  - Authenticate: `claude auth login`, then `claude auth status`.
  - Add the MCP server:
    ```powershell
    claude mcp add createos-mcp --transport http https://api-createos.nodeops.network/mcp --header "X-API-Key: CREATEOS_API_KEY"
    ```
  - Restart Claude Code (close active sessions and reopen).
  - Verify: `claude mcp list`; inside a running session use `/mcp`. Expected: `✓ createos-mcp connected`.
  - Troubleshooting: Claude Code installed and authenticated; API key valid with proper permissions; command syntax has no extra spaces; Claude Code fully restarted.
  - Demo: https://ik.imagekit.io/nodeops/No%20Sound/Claude%20Code%20MCP%20Demo.mp4

## Cursor MCP Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-Cursor
- **Summary:** Add CreateOS to Cursor through `mcp.json` (Settings, MCP, New MCP Server). The page also shows a one-click `cursor://anysphere.cursor-deeplink/mcp/install?...` link.
- **Key points:**
  - Prerequisites: Cursor IDE, CreateOS account with API key, Git configured and connected to Cursor, latest changes committed and pushed.
  - Config for `mcp.json`:
    ```json
    {
      "mcpServers": {
        "createos": {
          "url": "https://api-createos.nodeops.network/mcp",
          "type": "http",
          "headers": {
            "X-Api-Key": "CREATEOS_API_KEY"
          },
          "inputs": []
        }
      }
    }
    ```
  - Save and restart Cursor. Verify under **Settings, Tools and MCP** > Installed MCP Servers > "createos" (enable if needed).
  - If missing: check `mcp.json` syntax, API key validity, full Cursor restart, Git configuration.
  - Demo: https://ik.imagekit.io/nodeops/No%20Sound/Cursor%20MCP%20Demo.mp4

## Gemini CLI MCP Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-Gemini-CLI
- **Summary:** Configure CreateOS MCP in Gemini CLI via `.gemini/settings.json`. Gemini CLI and Gemini Code Assist share the same configuration.
- **Key points:**
  - Prerequisites: Gemini CLI installed (`gemini --version`), CreateOS account with API key.
  - Config file: `<project-root>\.gemini\settings.json` (create the `.gemini` directory if missing):
    ```json
    {
      "mcpServers": {
        "createos": {
          "url": "https://api-createos.nodeops.network/mcp",
          "headers": {
            "X-Api-Key": "CREATEOS_API_KEY"
          }
        }
      }
    }
    ```
  - Restart: `exit`, then `gemini`.
  - Verify: `gemini mcp list`; the page shows expected output `✓ user-autogen  connected`.
  - Sample task: tell Gemini CLI to deploy `<repo_name>` through NodeOps MCP.
  - Demo: https://ik.imagekit.io/nodeops/No%20Sound/Gemini%20MCP%20Demo.mp4

## Gemini Code Assist MCP Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-Gemini-Code-Assist
- **Summary:** Same configuration as Gemini CLI; once set up, Gemini Code Assist connects to CreateOS MCP automatically.
- **Key points:**
  - Prerequisites: Gemini CLI installed (`gemini --version`), CreateOS account with API key.
  - Same `<project-root>\.gemini\settings.json` content as the Gemini CLI guide (`mcpServers.createos` with `url` `https://api-createos.nodeops.network/mcp` and header `X-Api-Key`).
  - Restart with `exit` then `gemini`; verify with `gemini mcp list` (page shows `✓ user-autogen  connected`).
  - Sample task: tell Gemini Code Assist to deploy `<repo_name>` through NodeOps MCP.
  - Tutorial: https://drive.google.com/file/d/1kxZMaN6SKEIV0pAKlY3aZT5rsZm-wpEx/view?usp=sharing

## VS Code with Copilot MCP Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-VS-Code
- **Summary:** Add CreateOS to VS Code through the install button (OAuth) or a `.vscode/mcp.json` file with an API key.
- **Key points:**
  - Install button (`vscode:mcp/install?...`): click Install, allow when prompted, log in with CreateOS credentials on the OAuth page.
  - Prerequisites: VS Code, CreateOS account with API key, GitHub connected to VS Code.
  - Create `.vscode/mcp.json` in the workspace root:
    ```json
    {
      "servers": {
        "createos": {
          "url": "https://api-createos.nodeops.network/mcp",
          "type": "http",
          "headers": {
            "X-Api-Key": "CREATEOS_API_KEY"
          }
        }
      },
      "inputs": []
    }
    ```
  - Save and restart VS Code.
  - Demo: https://ik.imagekit.io/nodeops/No%20Sound/VS%20Code%20Copilot%20Demo.mp4

## Opencode Desktop Integration Guide
- **URL:** https://createos.sh/docs/Integrations/Integration-Opencode
- **Summary:** Configure CreateOS as a remote MCP server in Opencode Desktop via `opencode.json` in the project root.
- **Key points:**
  - Prerequisites: Opencode Desktop, CreateOS account with API key, project directory open in Opencode.
  - Create `<project-directory>/opencode.json`:
    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "createos": {
          "type": "remote",
          "url": "https://api-createos.nodeops.network/mcp",
          "headers": {
            "X-Api-Key": "CREATEOS_API_KEY"
          }
        }
      }
    }
    ```
  - Save, fully restart Opencode Desktop, click the MCP connection indicator and check that "createos" is enabled.
  - Troubleshooting: file in project root, valid JSON (no trailing commas), active API key, full restart.

## Windsurf MCP Integration
- **URL:** https://createos.sh/docs/Integrations/Integration-Windsurf
- **Summary:** Add CreateOS to Windsurf via Cascade MCP settings and `mcp.json`.
- **Key points:**
  - Path: **Windsurf Settings, Cascade, MCP Servers, Open Marketplace**, then the settings icon for Installed MCPs opens `mcp.json`.
  - Config:
    ```json
    {
      "mcpServers": {
        "createos": {
          "url": "https://api-createos.nodeops.network/mcp",
          "headers": {
            "X-Api-Key": "CREATEOS_API_KEY"
          }
        }
      },
      "inputs": []
    }
    ```
  - Save, then verify "createos" is listed as installed and connected under Cascade, MCP Servers. Open chat via the Windsurf logo and prompt Cascade to deploy.

## CreateOS MCP Integration with Antigravity
- **URL:** https://createos.sh/docs/Integrations/Integration-Antigravity
- **Summary:** Add CreateOS to Antigravity through the agent chat's MCP Servers menu and `mcp_config.json`.
- **Key points:**
  - Path: Agent chat window, "..." menu (top right), **MCP Servers**, **Manage MCP Servers**, **View raw config** (opens `mcp_config.json`).
  - Config (note the key `serverUrl`):
    ```json
    {
        "mcpServers": {
            "createos": {
                "serverUrl": "https://api-createos.nodeops.network/mcp",
                "headers": {
                    "X-Api-Key": "CREATEOS_API_KEY"
                }
            }
        },
        "inputs": []
    }
    ```
  - Save and restart Antigravity completely; verify by asking the agent to list CreateOS projects or run a deployment action.

## Related
- Up: [[Docs - Integrations]]
- [[Docs - Integrations - Other Tools]]: chat apps, automation and deploy tools
- [[Docs - API and MCP]]: MCP server and Skills
- [[Docs - API and MCP - MCP Operations]]: the tools these clients can call
- [[Docs - Sandbox Integrations]]: Sandbox integrations
- [[Hackathon Setup Guide]]: hackathon setup
