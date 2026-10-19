---
aliases:
  - Set up in five minutes
tags:
  - hackathon
  - type/page
source: https://createos.sh/hackathon#start
sources:
  - https://createos.sh/hackathon
  - https://createos.sh/hackathon.md
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Hackathon Setup Guide

> [!summary] Summary
> - "Set up in Five Minutes": three steps by hand to a running sandbox, or one prompt that has a coding agent do the setup.
> - Tools: Stripe CLI (`@stripe/cli`) + its `projects` plugin, and the CreateOS CLI (`createos`).
> - `stripe projects add createos/project` creates the CreateOS account; credentials land in `.env`.
> - Free plan: one sandbox of up to 1 vCPU. If the CLI asks you to sign in, run `createos login`.
> - Source: https://createos.sh/hackathon#start

## By hand

### 1. Install the CLIs
```sh
npm install -g @stripe/cli
stripe plugin install projects
curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
```
- The last command is the CreateOS CLI install script. See [[Repo - createos-cli]] for Homebrew, nightly and pinned-version installs.

### 2. Create the project and add CreateOS
```sh
stripe projects init my-agent
stripe projects add createos/project
```
- `init` opens a browser to sign in to Stripe.
- The CreateOS account is created and its credentials land in `.env`.
- See [[CreateOS on Stripe Projects]] and [[Stripe Projects]].

### 3. Run code in a sandbox
```sh
createos sandbox create --shape s-1vcpu-1gb --name agent-1
createos sandbox exec agent-1 -- python3 -c 'print("hello")'
```
- The Free plan runs one sandbox of up to 1 vCPU.
- If the CLI asks you to sign in, run `createos login`.
- See [[Docs - Sandbox Quickstart]], [[Docs - Sandbox CLI]], [[Docs - Sandbox Limits]].

### Other commands shown on the page
- Start directory: `mkdir my-agent && cd my-agent`
- Run the agent's code: `createos sandbox exec agent-1 -- python3 main.py`
- Hero terminal example (uses the `devbox:1` image):
```sh
stripe projects init my-agent
stripe projects add createos/project
createos sandbox create --name agent-1 --shape s-1vcpu-1gb --rootfs devbox:1
createos sandbox exec agent-1 -- python3 -c 'print(sum(range(10)))'
# 45
```
- List every provider you can add (database, search, email): `stripe projects catalog`

## Or let your coding agent do it
Paste into Claude Code, Codex, Cursor or any coding agent:

```
I'm building for the CreateOS × Stripe Projects hackathon: an AI agent that writes code and runs it in a CreateOS sandbox.

Read these first:
- https://docs.stripe.com/projects.md
- https://createos.sh/docs/Services/Stripe-Projects.md
- https://createos.sh/docs/Sandbox/Quickstart.md
- https://createos.sh/docs/Sandbox/SDK/Overview.md

Then set me up in this directory:
1. Install the Stripe CLI (npm install -g @stripe/cli), its Projects plugin (stripe plugin install projects) and the CreateOS CLI.
2. Run stripe projects init, then stripe projects add createos/project. Stop and tell me whenever I need to sign in.
3. Create a sandbox with createos sandbox create --shape s-1vcpu-1gb and check it works with createos sandbox exec.
4. Scaffold the agent with the CreateOS Sandbox SDK: it takes a task, writes code, runs it in the sandbox, reads stdout and the exit code, and fixes its code until it works.

My idea: [describe it here]

Ask me before choosing a paid plan or anything else that costs money.
```

## Give your coding agent the skills

### Stripe Projects skill, for any coding agent
```sh
npx skills add https://docs.stripe.com --skill stripe-projects -g -y
```

### CreateOS Sandbox plugin, for Claude Code
```
/plugin marketplace add NodeOps-app/createos-claude-plugins
/plugin install createos-sandbox@createos
```
- The `.md` page joins both with `&&`: `/plugin marketplace add NodeOps-app/createos-claude-plugins && /plugin install createos-sandbox@createos`
- The repo README uses `NodeOps-app/createos-plugin` as the marketplace path; `createos-claude-plugins` redirects to `NodeOps-app/createos-plugins`. See [[Repo - createos-claude-plugins]].

### CreateOS Skills (deploy from your coding agent)
Section on the `.md` version of the page.
- Lets AI coding agents deploy applications from the dev environment: push apps live, publish to the marketplace, earn revenue, via natural language.
- Install:
```sh
npx skills add https://github.com/NodeOps-app/skills --skill createos
```
- Supported AI tools: Claude Code · GitHub Copilot · Gemini CLI · OpenCode · Codex · Amp · Kimi CLI
- Core commands:

| Group | Commands |
|---|---|
| Project | `CreateProject()` · `ListProjects()` · `UpdateProjectSettings()` · `DeleteProject()` |
| Deployment | `CreateDeployment()` · `TriggerLatestDeployment()` · `UploadDeploymentFiles()` · `GetBuildLogs()` · `GetDeploymentLogs()` |
| Environment | `CreateProjectEnvironment()` · `UpdateProjectEnvironmentEnvironmentVariables()` · `UpdateProjectEnvironmentResources()` |
| Domains | `CreateDomain()` · `RefreshDomain()` · `UpdateDomainEnvironment()` |
| GitHub | `ListConnectedGithubAccounts()` · `ListGithubRepositories()` · `ListGithubRepositoryBranches()` · `InstallGithubApp()` |

- Authentication:
  1. Create an account at `createos.nodeops.network`.
  2. Generate an API key from your profile.
  3. REST: header `X-Api-Key: <key>`. MCP: no key required for basic operations.
- MCP endpoint: `https://api-createos.nodeops.network/mcp`
- MCP docs: https://createos.sh/docs/API-MCP/CreateOS-MCP (see [[Docs - API and MCP]])

## Setup docs (resource cards)
| Card | Description | URL |
|---|---|---|
| Sandbox quickstart | Create a sandbox, run a command, tear it down. | https://createos.sh/docs/Sandbox/Quickstart |
| Sandbox SDKs | TypeScript, Python, Go, Rust, C# and Java. | https://createos.sh/docs/Sandbox/SDK/Overview |
| Limits and plans | What the Free plan runs, and what needs Beginner. | https://createos.sh/docs/Sandbox/Limits |
| CreateOS on Stripe Projects | Plans, credentials and the commands you'll use. | https://createos.sh/docs/Services/Stripe-Projects |
| Stripe Projects docs | Add services, sync credentials, share your stack. | https://docs.stripe.com/projects |
| Docs for your agent | Every CreateOS docs page in one file. | https://createos.sh/docs/llms-full.txt |

## Related
- Up: [[Hackathon Overview]]
- [[Docs - Sandbox Quickstart]]: full quickstart
- [[Docs - Sandbox SDK]]: SDK used to scaffold the agent
- [[Docs - Sandbox CLI]]: `createos sandbox` command reference
- [[Docs - Sandbox Limits]]: Free plan limit of one 1 vCPU sandbox
- [[CreateOS on Stripe Projects]]: `createos/project` provider details
- [[Stripe Projects]]: `stripe projects` CLI
- [[Repo - createos-cli]]: CLI install and commands
- [[Repo - createos-claude-plugins]]: Claude Code plugin commands
- [[Hackathon Resources and Tools]]: all links
