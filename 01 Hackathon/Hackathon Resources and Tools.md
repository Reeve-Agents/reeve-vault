---
tags:
  - hackathon
  - type/index
source: https://createos.sh/hackathon
sources:
  - https://createos.sh/hackathon
  - https://createos.sh/hackathon.md
  - https://github.com/NodeOps-app/createos-cli
  - https://github.com/NodeOps-app/createos-claude-plugins
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Hackathon Resources and Tools

> [!summary] Summary
> - Every link on the hackathon page, grouped: event, CreateOS docs, Stripe docs, CLIs and repos, community and contact.
> - "Docs for your agent": https://createos.sh/docs/llms-full.txt (every CreateOS docs page in one file).
> - Contact: hello@createos.sh. Discord (site footer): https://discord.gg/nodeops
> - Source: https://createos.sh/hackathon

## Event
| Resource | URL |
|---|---|
| Hackathon page | https://createos.sh/hackathon |
| Hackathon page, Markdown | https://createos.sh/hackathon.md |
| Register on Luma | https://luma.com/6stm74wk |
| Add to calendar (.ics) | https://createos.sh/hackathon/createos-stripe-hackathon.ics |
| Setup section anchor | https://createos.sh/hackathon#start |
| Schedule section anchor | https://createos.sh/hackathon#schedule |
| Stripe Projects leaderboard | Submission target; no URL given on the page |
| Event Discord | Link shared after Luma approval |

Share buttons on the page: LinkedIn (`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcreateos.sh%2Fhackathon`), X (`https://x.com/intent/post?...`), WhatsApp (`https://wa.me/?text=...`), Copy link.

## CreateOS Sandbox docs and product
| Resource | Description | URL | Note |
|---|---|---|---|
| Sandbox quickstart | Create a sandbox, run a command, tear it down. | https://createos.sh/docs/Sandbox/Quickstart | [[Docs - Sandbox Quickstart]] |
| Sandbox SDKs | TypeScript, Python, Go, Rust, C# and Java. | https://createos.sh/docs/Sandbox/SDK/Overview | [[Docs - Sandbox SDK]] |
| Limits and plans | What the Free plan runs, and what needs Beginner. | https://createos.sh/docs/Sandbox/Limits | [[Docs - Sandbox Limits]] |
| CreateOS on Stripe Projects | Plans, credentials and the commands you'll use. | https://createos.sh/docs/Services/Stripe-Projects | [[CreateOS on Stripe Projects]] |
| Docs for your agent | Every CreateOS docs page in one file. | https://createos.sh/docs/llms-full.txt | [[CreateOS llms.txt]] |
| About CreateOS Sandbox / Everything CreateOS Sandbox can do | Product page | https://createos.sh/products/sandbox | [[Product - Sandbox]] |
| CreateOS MCP docs | MCP server docs | https://createos.sh/docs/API-MCP/CreateOS-MCP | [[Docs - API and MCP]] |

### Markdown docs URLs named in the coding-agent prompt
- https://docs.stripe.com/projects.md
- https://createos.sh/docs/Services/Stripe-Projects.md
- https://createos.sh/docs/Sandbox/Quickstart.md
- https://createos.sh/docs/Sandbox/SDK/Overview.md

## Stripe
| Resource | Description | URL / command | Note |
|---|---|---|---|
| Stripe Projects docs | Add services, sync credentials, share your stack. | https://docs.stripe.com/projects | [[Stripe Projects]] |
| Stripe CLI | npm package | `npm install -g @stripe/cli` | |
| Stripe Projects plugin | CLI plugin | `stripe plugin install projects` | |
| Stripe Projects skill | For any coding agent | `npx skills add https://docs.stripe.com --skill stripe-projects -g -y` | |
| Provider catalog | Lists every provider you can add | `stripe projects catalog` | [[Stripe Projects - Providers]] |

## CLIs, plugins and repos
| Resource | URL / command | Note |
|---|---|---|
| CreateOS CLI repo | https://github.com/NodeOps-app/createos-cli | [[Repo - createos-cli]] |
| CreateOS CLI install script | `curl -sfL https://raw.githubusercontent.com/NodeOps-app/createos-cli/main/install.sh \| sh -` | |
| CreateOS Sandbox plugin (Claude Code) | `/plugin marketplace add NodeOps-app/createos-claude-plugins` then `/plugin install createos-sandbox@createos` | [[Repo - createos-claude-plugins]] |
| Plugins repo (redirect target) | https://github.com/NodeOps-app/createos-plugins | [[Repo - createos-claude-plugins]] |
| CreateOS Skills repo | https://github.com/NodeOps-app/skills (`npx skills add https://github.com/NodeOps-app/skills --skill createos`) | [[Hackathon Setup Guide]] |
| NodeOps GitHub org (site footer) | https://github.com/NodeOps-app | |

### CreateOS Sandbox family (listed in both repo READMEs)
| Repo | What it is | Package |
|---|---|---|
| https://github.com/nodeops-app/fc-sdk | TypeScript SDK + `examples/` | `@nodeops-createos/sandbox` |
| https://github.com/NodeOps-app/createos-go-sdk | Go SDK | `github.com/NodeOps-app/createos-go-sdk` |
| https://github.com/NodeOps-app/createos-python-sdk | Python SDK | `createos-sandbox` |
| https://github.com/nodeops-app/createos-cli | Go CLI (`createos`) | — |
| https://github.com/NodeOps-app/createos-v2-landing | Public docs (`apps/docs/src/pages/Sandbox/`) | — |
| https://github.com/NodeOps-app/createos-plugin | Integrations monorepo, plugins for 8 agent hosts | — |

## CreateOS account and API
| Resource | Value |
|---|---|
| CreateOS app | https://createos.sh/app |
| Account sign-up (CreateOS Skills section) | `createos.nodeops.network` |
| Dashboard profile (API token) | https://createos.nodeops.network/profile |
| REST auth header | `X-Api-Key: <key>` |
| MCP endpoint | `https://api-createos.nodeops.network/mcp` |

## Community and contact
| Channel | Value |
|---|---|
| Email | hello@createos.sh ("Something else? Write to hello@createos.sh.") |
| Discord (site footer) | https://discord.gg/nodeops |
| X | https://x.com/createosai |
| LinkedIn | https://linkedin.com/company/nodeops |
| GitHub | https://github.com/NodeOps-app |

## Partner services named in the ideas
Sentry, PostHog, AgentMail, Neon, Clerk, Turso, PlanetScale, OpenRouter, Supermemory, GitLab, Stripe MPP. URLs in [[Hackathon Partner Services]].

## Related
- Up: [[Hackathon Overview]]
- [[Hackathon Setup Guide]]: the commands behind these links
- [[Hackathon Partner Services]]: partner URLs
- [[Docs - Sandbox]]: CreateOS Sandbox docs hub
- [[Docs - Sandbox REST API]]: REST endpoints
- [[Docs - Sandbox Integrations]]: agent and framework integrations
- [[Contact and Community]]: CreateOS contact channels
