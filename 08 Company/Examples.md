---
aliases:
  - CreateOS Sandbox examples
  - Sandbox SDK examples
tags:
  - createos/company
  - type/index
source: https://createos.sh/examples
sources:
  - https://createos.sh/examples
  - https://github.com/NodeOps-app/createos-sandbox-sdk
scraped: 2026-10-17
up: "[[Home]]"
---

# Examples

> [!summary] Summary
> - "CreateOS Sandbox examples": runnable examples from the SDK repo (run untrusted code, fork agent state, network sandboxes together, fan out across many, self-host the worker, and more). Each one is a complete program.
> - 45 examples in 7 groups: Core and lifecycle, AI agents and frameworks, Networking and scale, Dev servers and environments, Browser and scraping, Data/files/storage, Self-host.
> - All examples live in https://github.com/NodeOps-app/createos-sandbox-sdk under `examples/<NN-name>`.
> - Source: https://createos.sh/examples

## Page header

- Links: sandbox https://createos.sh/products/sandbox · all examples on GitHub https://github.com/NodeOps-app/createos-sandbox-sdk · book a demo https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile

## Core and lifecycle

- Create, run, snapshot, pause, and fork: the primitives every workload is built on.

| Example | What it does | URL |
|---|---|---|
| Hello world | Smoke test: create a sandbox, run one buffered command, destroy it. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/01-hello-world |
| Code interpreter | Upload a Python script, run it, capture stdout/stderr. Includes a streaming variant. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/02-code-interpreter |
| Dev server preview URL | Bind an HTTP server and reach it via a per-sandbox ingress preview URL. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/03-dev-server-preview-url |
| Filesystem snapshots | Snapshot/branch a sandbox: pause, fork, resume the clone. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/05-filesystem-snapshots |
| All-in-one tour | All-in-one tour exercising every core primitive in one run. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/35-aio-sandbox |
| Bandwidth recharge | Read a sandbox's bandwidth quota and grow it after create with rechargeBandwidth (create no longer accepts bandwidth_quota_bytes). | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/39-bandwidth-recharge |
| Idle auto-pause | Set an idle auto-pause timeout at create with auto_pause_after_seconds and change it live with setAutoPause(seconds \| null) so an idle sandbox stops compute billing. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/40-idle-auto-pause |

## AI agents and frameworks

- Drive agents and agent frameworks whose code runs inside an isolated VM.

| Example | What it does | URL |
|---|---|---|
| AI code agent | Use a sandbox as the code-execution environment for a Claude agent. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/04-ai-code-agent |
| OpenAI Agents tools | Expose sandbox operations as tools to the OpenAI Agents SDK. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/06-openai-agents-fc-tools |
| MCP: Claude Code | Run the Claude Code CLI inside a sandbox. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/09-mcp-claude-code |
| LlamaIndex RAG | Build a LlamaIndex vector index; persist it across pause/resume. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/13-llamaindex-rag |
| ACP hello world | Run an Agent Client Protocol agent in a sandbox over JSON-RPC. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/15-acp-hello-world |
| Google ADK agent | Drive a Google ADK agent whose tools run inside a VM. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/20-google-adk-agent |
| LangGraph orchestrator | Model sandbox operations as LangGraph nodes with an OpenAI LLM. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/32-langgraph-sandbox-orchestrator |
| OpenAI Codex CLI | Run the OpenAI Codex CLI in a sandbox to execute a task. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/33-codex-cli |
| Claude changelog generator | Clone a public git repo inside a sandbox, run the commit log through the Claude Messages API, and download the generated CHANGELOG.md. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/44-claude-changelog-generator |
| Claude agent GitHub wiki Q&A | Clone a public GitHub repo into a sandbox and run a Claude tool-use agent that reads the file tree to answer questions about the codebase. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/45-claude-github-wiki |
| Mastra agent in a sandbox | Install the Mastra TypeScript agent framework inside a createos-sandbox VM, upload an agent script, run it against an OpenAI-compatible provider, and capture the response. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/46-mastra-agent |
| Effective agent patterns | Run three LLM agent patterns (prompt-chaining, routing, parallelization) using the Vercel AI SDK inside a createos-sandbox sandbox, with an OpenAI-compatible model proxy. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/47-effective-agents-patterns |

## Networking and scale

- Multiple sandboxes on a private network, and fan-out across many at once.

| Example | What it does | URL |
|---|---|---|
| Radicle multi-agent | Three networked sandboxes running a Radicle p2p git mesh with role-specialized agents. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/12-radicle-multi-agent |
| Batch inference fan-out | Shard a classification job across many sandboxes in parallel. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/19-batch-inference-fanout |

## Dev servers and environments

- Long-lived services and dev environments reached over a per-sandbox ingress URL.

| Example | What it does | URL |
|---|---|---|
| Dev server + git preview | Clone a repo, start a dev server, expose it via a live ingress URL. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/08-dev-server-git-preview |
| Jupyter singleton kernel | Keep a persistent Python kernel over a socket; pause and fork two branches. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/14-jupyter-singleton |
| Text embeddings server | Serve a CPU embeddings model as a long-lived service over ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/18-text-embeddings-server |
| Astro in a sandbox | Scaffold an Astro site, run `astro dev`, reach it via ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/21-astro-sandbox |
| OpenCode server | Run the OpenCode headless HTTP server over ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/22-opencode-server |
| Prometheus Pushgateway | Run a Prometheus Pushgateway, push a metric, scrape it via ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/25-prometheus-pushgateway |
| FastAPI app | Serve a FastAPI app over ingress and verify its routes. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/27-fastapi-app |
| code-server (VS Code) | Run code-server (VS Code in the browser) over ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/28-code-server-vscode |
| Headless Chromium DevTools | Run headless Chrome with the CDP port exposed via ingress. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/30-headless-chromium-devtools |
| OpenClaw gateway | Run the OpenClaw gateway over ingress and verify /v1/models. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/34-openclaw-gateway |

## Browser and scraping

- Headless browsers and crawlers running inside the isolation boundary.

| Example | What it does | URL |
|---|---|---|
| MCP: Browserbase | Run the Browserbase MCP server in a sandbox, driven by Claude. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/10-mcp-browserbase |
| Firecrawl scrape + analyze | Scrape pages with Firecrawl, have Claude write analysis code, run it, pull the chart. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/16-firecrawl-scrape-analyze |
| Playwright headless browser | Run Playwright + headless Chromium to scrape and extract the DOM. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/29-playwright-headless-browser |
| Crawl4AI web crawler | Install Crawl4AI and Playwright/Chromium inside a VM, crawl a public URL to Markdown, download the output to the host. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/43-crawl4ai-crawler |

## Data, files, and storage

- Bring your own storage, custom images, and file-in file-out data jobs.

| Example | What it does | URL |
|---|---|---|
| Docker custom template | Build a custom rootfs template from a Dockerfile, then run containers inside the VM. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/07-docker-custom-template |
| TigerFS + Postgres | Run PostgreSQL on a TigerFS filesystem layer in one VM. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/11-tigerfs-postgres-filesystem |
| Analyze data with AI | Upload a CSV, have Claude write the analysis from its schema, read back the chart. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/17-analyze-data-with-ai |
| S3 bucket query | Query a public S3 bucket via DuckDB httpfs inside a sandbox. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/26-s3-bucket-mount |
| Git clone + TypeScript LSP | Clone a TS repo and drive typescript-language-server over stdio. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/31-git-clone-lsp-typescript |
| S3-disk ffmpeg transcode | Register an S3-backed disk, mount at boot, transcode with ffmpeg, detach, destroy. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/38-s3-disk-ffmpeg-transcode |
| Python PDF form extractor | Upload a fillable PDF into a sandbox, pip-install PyMuPDF, extract every form-field name and value to JSON, and download the result, no external API required. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/41-python-pdf-extractor |
| Python doc to Markdown converter | Upload a local document (HTML, DOCX, PDF, …) into a createos-sandbox sandbox, convert it to Markdown with Microsoft MarkItDown (pip-installed inside the guest), and download the result. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/42-doc-to-markdown |

## Self-host

- Back agents with VMs you run in your own boundary.

| Example | What it does | URL |
|---|---|---|
| Self-hosted agent worker | Back a Claude Managed Agent with one persistent VM for tool execution. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/36-self-hosted-agent-worker |
| Self-hosted sandbox per session | Back a Claude Managed Agent with a fresh VM per session. | https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/examples/37-self-hosted-sandbox-per-session |

## Related
- Up: [[Home]]
- [[Product - Sandbox]]: the CreateOS Sandbox product
- [[Docs - Sandbox]]: sandbox documentation hub
- [[Docs - Sandbox SDK]]: TypeScript SDK docs
- [[Docs - Sandbox Quickstart]]: sandbox quickstart
- [[Docs - Sandbox Claude Managed Agents]]: self-hosted Claude Managed Agents backing
- [[Docs - Sandbox Integrations]]: sandbox integrations
- [[Repo - createos-cli]]: related repository
- [[Hackathon Resources and Tools]]: hackathon resources
