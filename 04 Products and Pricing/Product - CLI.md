---
aliases:
  - CreateOS CLI
tags:
  - createos/product
  - type/page
source: https://createos.sh/products/cli
scraped: 2026-10-17
up: "[[Products]]"
---

# Product - CLI

> [!summary] Summary
> - Deploy AI agents, MCP servers, APIs, bots and static sites from the terminal: `createos init` then `createos deploy`.
> - Install on macOS/Linux with a one-line script or Homebrew tap; authenticate with `createos login` and an API token.
> - Ships from a directory, a GitHub repo or a Docker image to CreateOS cloud, your VPC, or on-prem.
> - `createos skill install` lets coding agents deploy in natural language; MCP endpoint needs no API key.
> - Source: https://createos.sh/products/cli

## Overview

- **Title:** CreateOS CLI.
- Deploy AI agents, MCP servers, APIs, bots, and static sites straight from your terminal. Scaffold a project, ship from a directory, a GitHub repo, or a Docker image, and manage it all from the command line.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · start_building -> https://createos.sh/app · github -> https://github.com/NodeOps-app/createos-cli (see [[Repo - createos-cli]]) · docs -> https://createos.sh/docs/CLI (see [[Docs - CLI]]) · product -> https://createos.sh/products
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## Install and ship in four commands

Install the CLI on macOS or Linux, authenticate with a token from your dashboard, scaffold a project, and deploy it to a live URL.

```
# install (macOS / Linux)
curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh | sh -
# or with Homebrew
brew tap nodeops-app/tap && brew install createos

# authenticate with an API token from your dashboard
createos login

# scaffold a project, then deploy from a directory, a GitHub repo, or a Docker image
createos init
createos deploy
```

- **Links:** CLI on GitHub -> https://github.com/NodeOps-app/createos-cli · Read the docs -> https://createos.sh/docs/CLI

## How the CLI works

| Step | What happens |
| --- | --- |
| Install and log in | Install with the one-line script or the Homebrew tap, then authenticate with createos login and an API token from your dashboard. |
| Init and deploy | Run createos init to scaffold an agent, MCP server, API, or bot, then createos deploy to ship from a directory, a GitHub repo, or a Docker image. You get a live URL on its own domain. |
| Manage in production | Tail runtime and build logs, set environment variables, add custom domains, and manage deployments, all from the terminal. |

## What the CLI gives you

| Capability | Detail |
| --- | --- |
| Deploy from anywhere | Ship from a local directory, a GitHub repo and branch, or a Docker image, to CreateOS cloud, your VPC, or on-prem. |
| Project scaffolds | createos init scaffolds AI agents, MCP servers, APIs, and bots, with quick-deploy shortcuts like createos agent <name> -r org/repo. |
| Full lifecycle management | Deployments, runtime and build logs, environment variables, and custom domains, all from the terminal. |
| Any runtime or framework | Node.js, Python, Go, Rust, Bun, and static sites, with supported frameworks including Next.js, FastAPI, and Django. |
| Agent-native | createos skill install lets AI coding agents deploy in natural language, and the MCP endpoint lets agents operate CreateOS directly with no API key. |

## Runtimes and frameworks

- **Runtimes:** Node.js · Python · Go · Rust · Bun · Static sites · Docker images
- **Supported frameworks:** Next.js, React, Vue, Nuxt, Astro, Express, FastAPI, Flask, Django, and Gin.
- Install with the one-line script or the Homebrew tap.

## Common questions

| Question | Answer |
| --- | --- |
| How do I install the CreateOS CLI? | On macOS or Linux, install with the one-line script (curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh \| sh -) or the Homebrew tap (brew tap nodeops-app/tap && brew install createos), then run createos login with an API token from your CreateOS dashboard. |
| What can I deploy with the CLI? | AI agents, MCP servers, APIs, bots, and static sites, from a local directory, a GitHub repo, or a Docker image. createos init scaffolds the project type for you, and each deploy returns a live URL on its own domain. |
| Which runtimes and frameworks are supported? | Node.js, Python, Go, Rust, Bun, and static sites. Frameworks like Next.js, React, Vue, Nuxt, Astro, Express, FastAPI, Flask, Django, and Gin are supported. |
| Can AI agents use the CLI? | Yes. createos skill install lets an AI coding agent deploy in natural language, and the MCP endpoint at api-createos.nodeops.network/mcp lets agents create projects, deploy, and manage them directly, with no API key required. |

## Ship from your terminal

- See the CLI scaffold and deploy one of your apps to a live URL.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · start_building -> https://createos.sh/app

## Related
- Up: [[Products]]
- [[Docs - CLI]]: CLI documentation (platform)
- [[Docs - Sandbox CLI]]: CLI commands for Sandbox
- [[Repo - createos-cli]]: CLI repository
- [[Repo - createos-claude-plugins]]: Claude plugins repository
- [[Docs - API and MCP]]: MCP endpoint and API docs
- [[Hackathon Setup Guide]]: hackathon environment setup
- [[Product - Sandbox]]
- [[Products]]
