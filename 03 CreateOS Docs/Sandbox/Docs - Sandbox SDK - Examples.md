---
aliases:
  - Sandbox SDK Examples
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/index
source: https://createos.sh/docs/Sandbox/SDK/Examples/
sources:
  - https://createos.sh/docs/Sandbox/SDK/Examples/
scraped: 2026-10-17
up: "[[Docs - Sandbox SDK]]"
---

# Docs - Sandbox SDK - Examples

> [!summary] Summary
> - 55 runnable, self-contained TypeScript programs, one per directory under `examples/`, grouped in 5 categories (AI agents and frameworks, dev servers and preview URLs, code execution and data, disks/networks/templates, lifecycle/snapshots/cost).
> - Each example ships an `.env.example` listing its keys; copy to `.env`, fill in, run the entry file with `bun`.
> - The index follows the SDK's `examples/manifest.json`, the source of truth for names, summaries and setup requirements.
> - Source: https://createos.sh/docs/Sandbox/SDK/Examples/

## Examples (catalog)
- **URL:** https://createos.sh/docs/Sandbox/SDK/Examples/
- **Summary:** Runnable TypeScript examples for CreateOS Sandbox: code execution for agents, fork-based parallel rollouts, multi-sandbox networks and services.
- **Key points:**
  - Package `@nodeops-createos/sandbox`; import `import { createClient } from "@nodeops-createos/sandbox"`; base URL `https://api.sb.createos.sh` (override `CREATEOS_SANDBOX_BASE_URL`); auth via `apiKey` or `CREATEOS_SANDBOX_API_KEY`.
  - Source repository for examples and SDK: https://github.com/NodeOps-app/createos-sandbox-sdk
  - "Setup" column: `None` or `extra setup` (see Notes at the end).

### AI agents and frameworks
| # | Example | What it shows | Setup |
|---|---|---|---|
| 04 | `04-ai-code-agent` | Use a sandbox as the code-execution environment for a Claude agent | None |
| 06 | `06-openai-agents-fc-tools` | Expose sandbox operations as tools to the OpenAI Agents SDK | None |
| 09 | `09-mcp-claude-code` | Run the Claude Code CLI inside a sandbox | None |
| 10 | `10-mcp-browserbase` | Run the Browserbase MCP server in a sandbox, driven by Claude | extra setup |
| 12 | `12-radicle-multi-agent` | Three networked sandboxes running a Radicle p2p git mesh with role-specialized agents | None |
| 13 | `13-llamaindex-rag` | Build a LlamaIndex vector index; persist it across pause/resume | None |
| 15 | `15-acp-hello-world` | Run an Agent Client Protocol agent in a sandbox over JSON-RPC | None |
| 16 | `16-firecrawl-scrape-analyze` | Scrape pages with Firecrawl, have Claude write analysis code, run it, pull the chart | None |
| 17 | `17-analyze-data-with-ai` | Upload a CSV, have Claude write the analysis from its schema, read back the chart | None |
| 18 | `18-text-embeddings-server` | Serve a CPU embeddings model as a long-lived service over ingress | None |
| 19 | `19-batch-inference-fanout` | Shard a classification job across many sandboxes in parallel | None |
| 20 | `20-google-adk-agent` | Drive a Google ADK agent whose tools run inside a VM | None |
| 32 | `32-langgraph-sandbox-orchestrator` | Model sandbox operations as LangGraph nodes with an OpenAI LLM | None |
| 33 | `33-codex-cli` | Run the OpenAI Codex CLI in a sandbox to execute a task | None |
| 34 | `34-openclaw-gateway` | Run the OpenClaw gateway over ingress and verify `/v1/models` | None |
| 35 | `35-aio-sandbox` | All-in-one tour exercising every core primitive in one run | None |
| 36 | `36-self-hosted-agent-worker` | Back a Claude Managed Agent with one persistent VM for tool execution | extra setup |
| 37 | `37-self-hosted-sandbox-per-session` | Back a Claude Managed Agent with a fresh VM per session | extra setup |
| 44 | `44-claude-changelog-generator` | Clone a public git repo in a sandbox, run the commit log through the Claude Messages API, download the generated `CHANGELOG.md` | extra setup |
| 45 | `45-claude-github-wiki` | Clone a public GitHub repo into a sandbox and run a Claude tool-use agent that reads the file tree to answer questions about the codebase | None |
| 46 | `46-mastra-agent` | Install the Mastra TypeScript agent framework in a VM, upload an agent script, run it against an OpenAI-compatible provider, capture the response | None |
| 47 | `47-effective-agents-patterns` | Run three LLM agent patterns (prompt-chaining, routing, parallelization) with the Vercel AI SDK inside a sandbox, using an OpenAI-compatible model proxy | None |
| 48 | `48-agent-governance-mesh` | Enforce agent policies across networked sandboxes with egress controls, prompt defense, an audit log, a dashboard and a kill switch | extra setup |
| 49 | `49-egress-locked-agent-worker` | Run a Claude Managed Agent in a persistent sandbox with egress restricted to an allowlist | extra setup |
| 50 | `50-cloud-agent-sandbox-tool` | Give a cloud-hosted Claude Managed Agent a sandbox-backed command tool that reuses one sandbox for the session | extra setup |
| 51 | `51-cloud-agent-sandbox-per-call` | Give each cloud Managed Agent command call a fresh disposable sandbox | extra setup |
| 53 | `53-anchor-browser-scrape` | Let an OpenAI agent scrape a public page through an Anchor Browser tool backed by a sandbox | extra setup |

### Dev servers and preview URLs
| # | Example | What it shows | Setup |
|---|---|---|---|
| 03 | `03-dev-server-preview-url` | Bind an HTTP server and reach it via a per-sandbox ingress preview URL | None |
| 08 | `08-dev-server-git-preview` | Clone a repo, start a dev server, expose it via a live ingress URL | None |
| 21 | `21-astro-sandbox` | Scaffold an Astro site, run `astro dev`, reach it via ingress | None |
| 22 | `22-opencode-server` | Run the OpenCode headless HTTP server over ingress | None |
| 25 | `25-prometheus-pushgateway` | Run a Prometheus Pushgateway, push a metric, scrape it via ingress | None |
| 27 | `27-fastapi-app` | Serve a FastAPI app over ingress and verify its routes | None |
| 28 | `28-code-server-vscode` | Run code-server (VS Code in the browser) over ingress | None |
| 30 | `30-headless-chromium-devtools` | Run headless Chrome with the CDP port exposed via ingress | None |

### Code execution and data
| # | Example | What it shows | Setup |
|---|---|---|---|
| 01 | `01-hello-world` | Smoke test: create a sandbox, run one buffered command, destroy it | None |
| 02 | `02-code-interpreter` | Upload a Python script, run it, capture stdout/stderr; includes a streaming variant | None |
| 11 | `11-tigerfs-postgres-filesystem` | Run PostgreSQL on a TigerFS filesystem layer in one VM | None |
| 26 | `26-s3-bucket-mount` | Query a public S3 bucket via DuckDB httpfs inside a sandbox | None |
| 29 | `29-playwright-headless-browser` | Run Playwright + headless Chromium to scrape and extract the DOM | None |
| 31 | `31-git-clone-lsp-typescript` | Clone a TS repo and drive typescript-language-server over stdio | None |
| 41 | `41-python-pdf-extractor` | Upload a fillable PDF, pip-install PyMuPDF, extract every form-field name and value to JSON, download the result (no external API) | None |
| 42 | `42-doc-to-markdown` | Upload a document (HTML, DOCX, PDF, …), convert to Markdown with Microsoft MarkItDown (pip-installed in the guest), download the result | None |
| 43 | `43-crawl4ai-crawler` | Install Crawl4AI and Playwright/Chromium in a VM, crawl a public URL to Markdown, download the output | None |
| 52 | `52-self-signal-pause-delete` | Pause or delete a sandbox from a workload running inside it, without passing in client credentials | extra setup |
| 54 | `54-managed-process-lifecycle` | Start and control long-running processes and interactive PTYs: input, output replay, wait, termination | extra setup |
| 55 | `55-desktop-vnc-connect` | Create a desktop sandbox, use computer controls, capture screenshots, open a noVNC connection | extra setup |
| 56 | `56-remote-code-execution` | Run Go, Python and JavaScript submissions and collect output, exit code and duration | extra setup |
| 57 | `57-sandbox-access-token` | Delegate one sandbox to a worker, inspect and rotate its token, then revoke it | None |

### Disks, networks and templates
| # | Example | What it shows | Setup |
|---|---|---|---|
| 07 | `07-docker-custom-template` | Build a custom rootfs template from a Dockerfile, then run containers inside the VM | None |
| 38 | `38-s3-disk-ffmpeg-transcode` | Register an S3-backed disk, mount at boot, transcode with ffmpeg, detach, destroy | extra setup |

### Lifecycle, snapshots and cost
| # | Example | What it shows | Setup |
|---|---|---|---|
| 05 | `05-filesystem-snapshots` | Snapshot/branch a sandbox: pause, fork, resume the clone | None |
| 14 | `14-jupyter-singleton` | Keep a persistent Python kernel over a socket; pause and fork two branches | None |
| 39 | `39-bandwidth-recharge` | Read a sandbox's bandwidth quota and grow it after create with `rechargeBandwidth` (create no longer accepts `bandwidth_quota_bytes`) | None |
| 40 | `40-idle-auto-pause` | Set an idle auto-pause timeout at create with `auto_pause_after_seconds` and change it live with `setAutoPause(seconds or null)`; an idle sandbox stops vCPU billing | None |

### Notes (from the catalog)
- **02 code-interpreter:** streaming exec currently 404s on the control plane; the buffered path is the default.
- **03 dev-server-preview-url:** use `http://` previews unless your ingress wildcard has a real TLS cert.
- **10 mcp-browserbase:** needs a Browserbase account.
- **14 jupyter-singleton:** fork can occasionally stick in `pausing` on the control plane.
- **36 / 37 self-hosted-*:** need Anthropic managed-agents access.
- **38 s3-disk-ffmpeg-transcode:** needs an S3-compatible bucket reachable from the createos-sandbox agent.
- **43 crawl4ai-crawler:** heavy install step (about 600 s); needs shape `s-4vcpu-4gb` for Chromium headroom.
- **44 claude-changelog-generator:** needs `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_BASE_URL` (or `ANTHROPIC_API_KEY`) for the Claude Messages API inside the sandbox.
- **46 mastra-agent:** requires an OpenAI-compatible provider (`OPENAI_API_URL` + `OPENAI_API_KEY` + `OPENAI_MODEL`); `OTEL_SDK_DISABLED=true` is injected into the sandbox to prevent Mastra's OpenTelemetry flush from blocking exit.
- **47 effective-agents-patterns:** `ai` and `@ai-sdk/openai` are installed inside the sandbox, not on the host; needs an external LLM proxy.
- **48 agent-governance-mesh:** needs an S3-compatible bucket and an Anthropic-compatible LLM proxy.
- **49 / 50 / 51:** need Anthropic Managed Agents access.
- **52 self-signal-pause-delete:** its in-sandbox worker needs an SDK release with `selfPause()` and `selfDelete()`.
- **53 anchor-browser-scrape:** needs an OpenAI API key; an Anchor API key is optional.
- **54 managed-process-lifecycle:** needs a control plane with managed process API support.
- **55 desktop-vnc-connect:** needs `desktop:1` and a control plane with computer and VNC API support.
- **56 remote-code-execution:** needs Go, Python and JavaScript runtimes in `devbox:1` and exec stdin support.

## Related
- Up: [[Docs - Sandbox SDK]]
- [[Docs - Sandbox SDK - Quickstart and Tutorial]]: guided starting points
- [[Docs - Sandbox SDK - How-To Guides]]: recipes behind many of these examples
- [[Docs - Sandbox SDK - API Reference]]: method signatures used by the examples
- [[Docs - Sandbox Claude Managed Agents]]: the Managed Agents setups referenced by examples 36, 37, 49 to 51
- [[Docs - Sandbox Integrations]]: coding-agent and harness integrations
- [[Hackathon Ideas]]: project ideas that map onto these patterns
- [[Hackathon Setup Guide]]: hackathon environment setup
