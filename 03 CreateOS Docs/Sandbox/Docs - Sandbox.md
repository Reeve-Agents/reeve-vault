---
aliases:
  - Sandbox Docs
  - CreateOS Sandbox docs
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/hub
source: https://createos.sh/docs/Sandbox/
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Sandbox

> [!summary] Summary
> - CreateOS Sandbox runs untrusted, AI-generated and interactive workloads in Firecracker microVMs: one kernel per sandbox, in-kernel egress allowlists, pause/resume/fork of full VM state, private networks between sandboxes, per-second billing.
> - Control plane: `https://api.sb.createos.sh`. Three surfaces over one REST API: REST API, TypeScript SDK (`@nodeops-createos/sandbox`), `createos sandbox` CLI (alias `sb`).
> - This hub indexes all 73 `/Sandbox/*` docs pages and links every Sandbox docs note.
> - Source: https://createos.sh/docs/Sandbox/

## Intro
- Docs section start points: Overview, Quickstart, then Limits and defaults before sizing a workload.
- Product page: https://createos.sh/products/sandbox. Pricing: https://createos.sh/pricing/sandbox.
- Docs index page lists: Overview, Quickstart, Concepts, Limits and defaults, REST API, SDK, CLI, Integrations, Claude Managed Agents, Bring your own storage, Run on your own infrastructure.

## Sandbox docs notes
- [[Docs - Sandbox Overview and Concepts]]: Sandbox index page, Overview, Concepts (vocabulary, lifecycle, base images, exec vs process vs PTY).
- [[Docs - Sandbox Quickstart]]: CLI, SDK and REST steps to create, run a command in, and destroy a sandbox.
- [[Docs - Sandbox Limits]]: shapes, images, lifetime, per-plan concurrency (Free, Beginner, Pro, Enterprise), network, secrets, regions, billing.
- [[Docs - Sandbox Security and Self-Hosting]]: security model table, enterprise self-hosting, bring your own S3-compatible storage.
- [[Docs - Sandbox CLI]]: CLI overview and full `createos sandbox` command reference.
- [[Docs - Sandbox Integrations]]: Claude Code, Codex, OpenCode, Pi, Herdr, DeepSeek Harness, Orca, n8n, Langflow, AgentBox.
- [[Docs - Sandbox Claude Managed Agents]]: running Anthropic Claude Managed Agents on CreateOS Sandbox (self-hosted environment, sandbox as a tool).
- [[Docs - Sandbox REST API]]: REST API reference hub.
- [[Docs - Sandbox SDK]]: SDK reference hub.

## Index of all Sandbox docs pages (73)
Titles, URLs and one-line descriptions as listed in the docs index (`llms.txt`).

### Core pages (9)

| Title | URL | Description | Note |
|---|---|---|---|
| Sandbox | https://createos.sh/docs/Sandbox/ | Run untrusted code, AI-generated workloads, development environments, and automation inside isolated CreateOS microVM sandboxes. | [[Docs - Sandbox Overview and Concepts]] |
| Overview | https://createos.sh/docs/Sandbox/Overview | Learn how CreateOS Sandbox runs disposable Linux microVMs for untrusted code, AI agents, CI jobs, previews, networking, persistence, and forking. | [[Docs - Sandbox Overview and Concepts]] |
| Quickstart | https://createos.sh/docs/Sandbox/Quickstart | Create your first CreateOS Sandbox, run a command in it and tear it down, with the CLI, the TypeScript SDK and the REST API side by side. | [[Docs - Sandbox Quickstart]] |
| Concepts | https://createos.sh/docs/Sandbox/Concepts | The vocabulary of CreateOS Sandbox: sandboxes, shapes, root filesystems, the lifecycle state machine, pause and fork, private networks, egress rules, disks and templates. | [[Docs - Sandbox Overview and Concepts]] |
| Limits & defaults | https://createos.sh/docs/Sandbox/Limits | Reference the CreateOS Sandbox limits and defaults for shapes, disks, networks, timeouts, and quotas. | [[Docs - Sandbox Limits]] |
| Claude Managed Agents | https://createos.sh/docs/Sandbox/Claude-Managed-Agents | Run Claude Managed Agents inside CreateOS Sandbox microVMs so each agent gets its own kernel, filesystem and egress allowlist; setup, credentials and cleanup. | [[Docs - Sandbox Claude Managed Agents]] |
| Bring your own storage | https://createos.sh/docs/Sandbox/Bring-Your-Own-Storage | Keep CreateOS Sandbox snapshots and disks in S3-compatible object storage you control (Amazon S3, Cloudflare R2, MinIO, Tigris): setup, credentials and what stays in your boundary. | [[Docs - Sandbox Security and Self-Hosting]] |
| Security model | https://createos.sh/docs/Sandbox/Security | The CreateOS Sandbox security model on one page: what enforces egress, where credentials live, how sandboxes are isolated, what the audit log covers, and what self-hosting offers today. | [[Docs - Sandbox Security and Self-Hosting]] |
| Run on your own infrastructure | https://createos.sh/docs/Sandbox/Self-Hosting | Run CreateOS Sandbox on your own hardware, cloud account or on-premise (enterprise only): how machines are onboarded into the data plane and what stays in your environment. | [[Docs - Sandbox Security and Self-Hosting]] |

### REST API pages (19)

| Title | URL | Description | Note |
|---|---|---|---|
| REST API | https://createos.sh/docs/Sandbox/REST-API/ | Reference for the CreateOS Sandbox REST API: sandboxes, execution and files, egress, pause/resume/fork, networks, disks, templates, metrics, webhooks and more. | [[Docs - Sandbox REST API]] |
| Overview | https://createos.sh/docs/Sandbox/REST-API/Overview | The CreateOS Sandbox REST API at a glance: base URL, X-Api-Key authentication, the JSend envelope, rate behaviour, and every resource group with links. | [[Docs - Sandbox REST API]] |
| Sandboxes | https://createos.sh/docs/Sandbox/REST-API/Sandboxes | REST endpoints to create, list, inspect and destroy sandboxes: shapes, rootfs images, egress at create time, auto-pause, envs, ingress, regions and the status lifecycle. | [[Docs - Sandbox REST API]] |
| Execution & Files | https://createos.sh/docs/Sandbox/REST-API/Execution-And-Files | REST endpoints to run commands inside a sandbox (buffered or streamed) and to upload and download files and directories, with examples and errors. | [[Docs - Sandbox REST API]] |
| Sandbox access tokens | https://createos.sh/docs/Sandbox/REST-API/Access-Tokens | Create, inspect, rotate, and disable a delegated credential for one CreateOS sandbox. | [[Docs - Sandbox REST API]] |
| Managed Processes | https://createos.sh/docs/Sandbox/REST-API/Managed-Processes | Use the CreateOS Sandbox REST API managed process endpoints to start, supervise, and stop long-running processes. | [[Docs - Sandbox REST API]] |
| Networks | https://createos.sh/docs/Sandbox/REST-API/Networks | REST endpoints to create private overlay networks and join sandboxes to them for sandbox-to-sandbox traffic, with DNS names, limits and examples. | [[Docs - Sandbox REST API]] |
| Pause, Resume & Fork | https://createos.sh/docs/Sandbox/REST-API/Pause-Resume-Fork | Use the CreateOS Sandbox REST API to pause, resume, and fork sandboxes, including request fields, responses, errors, and examples. | [[Docs - Sandbox REST API]] |
| Egress | https://createos.sh/docs/Sandbox/REST-API/Egress | How CreateOS Sandbox egress works: open with no rules, deny-by-default with any rule, enforced in-kernel outside the VM. Rule formats, the two-rule Python recipe, and the REST endpoints. | [[Docs - Sandbox REST API]] |
| Disks | https://createos.sh/docs/Sandbox/REST-API/Disks | REST endpoints to register S3-compatible disks and mount or detach them on running sandboxes, with request fields, responses and errors. | [[Docs - Sandbox REST API]] |
| Templates | https://createos.sh/docs/Sandbox/REST-API/Templates | Build a custom root filesystem from a Dockerfile with the Templates API and boot sandboxes from it; build status, limits and examples. | [[Docs - Sandbox REST API]] |
| Bandwidth & Resize | https://createos.sh/docs/Sandbox/REST-API/Bandwidth-And-Resize | REST endpoints to check and recharge a sandbox's bandwidth budget and to resize its shape, with request fields, responses and errors. | [[Docs - Sandbox REST API]] |
| Catalog & Identity | https://createos.sh/docs/Sandbox/REST-API/Catalog-And-Identity | Use the CreateOS Sandbox REST API for catalog and identity operations, including shapes, root filesystems, authentication, and examples. | [[Docs - Sandbox REST API]] |
| Self-Signal (In-Sandbox) | https://createos.sh/docs/Sandbox/REST-API/Self-Signal | Use the CreateOS Sandbox REST API for self Signal (In Sandbox), including endpoints, request fields, responses, errors, and examples. | [[Docs - Sandbox REST API]] |
| Metrics | https://createos.sh/docs/Sandbox/REST-API/Metrics | REST endpoints for per-sandbox CPU, memory, disk and network metrics, with response fields and sampling behaviour. | [[Docs - Sandbox REST API]] |
| Webhooks | https://createos.sh/docs/Sandbox/REST-API/Webhooks | Subscribe to sandbox lifecycle events over webhooks: event types, payload shape, delivery, retries and signature verification. | [[Docs - Sandbox REST API]] |
| Computer | https://createos.sh/docs/Sandbox/REST-API/Computer | Use the CreateOS Sandbox REST API computer endpoints for screenshots, input events, and desktop control. | [[Docs - Sandbox REST API]] |
| Devices & VPN | https://createos.sh/docs/Sandbox/REST-API/Devices | Use the CreateOS Sandbox REST API device and VPN endpoints to attach sandboxes to private networks. | [[Docs - Sandbox REST API]] |
| Shell & Tunnels | https://createos.sh/docs/Sandbox/REST-API/Connections | Use the CreateOS Sandbox REST API shell and tunnel endpoints to open interactive sessions and expose services. | [[Docs - Sandbox REST API]] |

### SDK pages (30)

| Title | URL | Description | Note |
|---|---|---|---|
| SDK | https://createos.sh/docs/Sandbox/SDK/ | CreateOS Sandbox SDKs for TypeScript, Go, Python, Rust, C# and Java: examples, quickstart, tutorial, guides and API reference. | [[Docs - Sandbox SDK]] |
| SDKs | https://createos.sh/docs/Sandbox/SDK/Overview | CreateOS Sandbox SDK examples for TypeScript, Go, Python, Rust, C# and Java: install, create a sandbox, run commands, move files and clean up. | [[Docs - Sandbox SDK]] |
| Quickstart | https://createos.sh/docs/Sandbox/SDK/Quickstart | Install @nodeops-createos/sandbox, create a sandbox, run a command and destroy it in under five minutes of TypeScript. | [[Docs - Sandbox SDK]] |
| Tutorial | https://createos.sh/docs/Sandbox/SDK/Tutorial | Build a working code-execution service on CreateOS Sandbox step by step with the TypeScript SDK: create, restrict egress, run untrusted code, collect output, clean up. | [[Docs - Sandbox SDK]] |
| Examples | https://createos.sh/docs/Sandbox/SDK/Examples/ | Runnable TypeScript examples for CreateOS Sandbox: code execution for agents, fork-based parallel rollouts, multi-sandbox networks and services. | [[Docs - Sandbox SDK]] |
| How-To Guides | https://createos.sh/docs/Sandbox/SDK/How-To/ | Task guides for CreateOS Sandbox: files, lifecycle, service exposure, delegation, disks and networks, streaming, errors, and observability. | [[Docs - Sandbox SDK]] |
| Upload & Download Files | https://createos.sh/docs/Sandbox/SDK/How-To/Files | Follow the CreateOS Sandbox SDK guide for uploading and downloading files, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Pause, Fork & Auto-Pause | https://createos.sh/docs/Sandbox/SDK/How-To/Lifecycle | Follow the CreateOS Sandbox SDK guide for pause, fork, and auto-pause workflows, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Expose a Service | https://createos.sh/docs/Sandbox/SDK/How-To/Expose-A-Service | Follow the CreateOS Sandbox SDK guide for expose a Service, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Disks, Networks & Templates | https://createos.sh/docs/Sandbox/SDK/How-To/Disks-Networks-Templates | Follow the CreateOS Sandbox SDK guide for disks, networks, and templates, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Stream Command Output | https://createos.sh/docs/Sandbox/SDK/How-To/Streaming | Follow the CreateOS Sandbox SDK guide for stream Command Output, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Error Handling | https://createos.sh/docs/Sandbox/SDK/How-To/Error-Handling | Follow the CreateOS Sandbox SDK guide for error Handling, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Observability | https://createos.sh/docs/Sandbox/SDK/How-To/Observability | Follow the CreateOS Sandbox SDK guide for observability, with practical TypeScript examples and operational notes. | [[Docs - Sandbox SDK]] |
| Delegate access to one sandbox | https://createos.sh/docs/Sandbox/SDK/How-To/Sandbox-Access-Tokens | Create a sandbox access token for a worker, use it from TypeScript, then rotate or disable it. | [[Docs - Sandbox SDK]] |
| API Reference | https://createos.sh/docs/Sandbox/SDK/Reference/ | API reference for @nodeops-createos/sandbox: Client, Sandbox, Sandbox Files, sub-APIs for disks, networks and templates, Errors, Helpers and Types. | [[Docs - Sandbox SDK]] |
| API Reference | https://createos.sh/docs/Sandbox/SDK/Reference/Overview | Entry point to the CreateOS Sandbox SDK API reference: Client, Sandbox handle, files, sub-APIs, errors, helpers and exported types. | [[Docs - Sandbox SDK]] |
| Client | https://createos.sh/docs/Sandbox/SDK/Reference/Client | Reference the CreateOS Sandbox SDK Client API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Sandbox | https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox | Reference the CreateOS Sandbox SDK Sandbox API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Sandbox Files | https://createos.sh/docs/Sandbox/SDK/Reference/Sandbox-Files | Reference the CreateOS Sandbox SDK Sandbox Files API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Sub-APIs | https://createos.sh/docs/Sandbox/SDK/Reference/Sub-APIs | Reference the CreateOS Sandbox SDK Sub APIs API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Errors | https://createos.sh/docs/Sandbox/SDK/Reference/Errors | Reference the CreateOS Sandbox SDK Errors API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Helpers | https://createos.sh/docs/Sandbox/SDK/Reference/Helpers | Reference the CreateOS Sandbox SDK Helpers API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Types | https://createos.sh/docs/Sandbox/SDK/Reference/Types | Reference the CreateOS Sandbox SDK Types API, including methods, options, return types, errors, and usage notes. | [[Docs - Sandbox SDK]] |
| Managed Processes | https://createos.sh/docs/Sandbox/SDK/Reference/Managed-Processes | Reference the CreateOS Sandbox SDK managed process API, including methods, options, return types, and usage notes. | [[Docs - Sandbox SDK]] |
| Computer | https://createos.sh/docs/Sandbox/SDK/Reference/Computer | Reference the CreateOS Sandbox SDK computer API, including methods, options, return types, and usage notes. | [[Docs - Sandbox SDK]] |
| Concepts | https://createos.sh/docs/Sandbox/SDK/Explanation/ | Design background for the CreateOS Sandbox SDK: VM sandboxes, the handle model, the lifecycle state machine and reliability behaviour. | [[Docs - Sandbox SDK]] |
| VM Sandboxes | https://createos.sh/docs/Sandbox/SDK/Explanation/VM-Sandboxes | Why each CreateOS Sandbox is a Firecracker microVM with its own kernel rather than a container, and what that means for isolation, startup and cost. | [[Docs - Sandbox SDK]] |
| The Handle Model | https://createos.sh/docs/Sandbox/SDK/Explanation/Handle-Model | How the SDK's stateful Sandbox handle mirrors control-plane state, what it caches, when it refreshes, and how waitUntil helpers observe lifecycle transitions. | [[Docs - Sandbox SDK]] |
| Sandbox Lifecycle | https://createos.sh/docs/Sandbox/SDK/Explanation/Lifecycle | The sandbox lifecycle state machine (creating, running, pausing, paused, resuming, forking, destroying) and what each SDK method requests and guarantees. | [[Docs - Sandbox SDK]] |
| Reliability | https://createos.sh/docs/Sandbox/SDK/Explanation/Reliability | How the SDK handles transient failures, retries, timeouts and partial state, and what your code must still handle itself. | [[Docs - Sandbox SDK]] |

### CLI pages (3)

| Title | URL | Description | Note |
|---|---|---|---|
| CLI | https://createos.sh/docs/Sandbox/CLI/ | The CreateOS Sandbox CLI: install, sign in, create and manage Firecracker microVM sandboxes from a terminal or CI pipeline, with a full command reference. | [[Docs - Sandbox CLI]] |
| Overview | https://createos.sh/docs/Sandbox/CLI/Overview | Install and sign in to the CreateOS CLI, then create, exec into, sync, tunnel to and destroy sandboxes from a terminal or CI job. | [[Docs - Sandbox CLI]] |
| Command Reference | https://createos.sh/docs/Sandbox/CLI/Commands | Use the CreateOS Sandbox CLI for command Reference, including commands, options, examples, and sandbox operations. | [[Docs - Sandbox CLI]] |

### Integrations pages (12)

| Title | URL | Description | Note |
|---|---|---|---|
| Integrations | https://createos.sh/docs/Sandbox/Integrations/ | Run coding agents and AI harnesses inside CreateOS Sandbox microVMs, with setup guides for each supported tool. | [[Docs - Sandbox Integrations]] |
| Overview | https://createos.sh/docs/Sandbox/Integrations/Overview | Run coding agents and AI harnesses inside CreateOS Sandbox microVMs, with links to per-tool integration guides. | [[Docs - Sandbox Integrations]] |
| Claude Code | https://createos.sh/docs/Sandbox/Integrations/Claude-Code | Run Claude Code inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| Codex | https://createos.sh/docs/Sandbox/Integrations/Codex | Run OpenAI Codex inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| OpenCode | https://createos.sh/docs/Sandbox/Integrations/OpenCode | Run OpenCode inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| Pi | https://createos.sh/docs/Sandbox/Integrations/Pi | Run the Pi agent inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| Herdr | https://createos.sh/docs/Sandbox/Integrations/Herdr | Run Herdr inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| DeepSeek Harness | https://createos.sh/docs/Sandbox/Integrations/DeepSeek-Harness | Run the DeepSeek harness inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| Orca | https://createos.sh/docs/Sandbox/Integrations/Orca | Run Orca inside a CreateOS Sandbox microVM, including setup, credentials, and session workflow. | [[Docs - Sandbox Integrations]] |
| n8n | https://createos.sh/docs/Sandbox/Integrations/n8n | Run a shell command on a disposable CreateOS microVM from an n8n workflow, and branch on the result. | [[Docs - Sandbox Integrations]] |
| Langflow | https://createos.sh/docs/Sandbox/Integrations/Langflow | Move Langflow's Python nodes, a canvas node, or a whole flow onto disposable CreateOS microVMs. | [[Docs - Sandbox Integrations]] |
| AgentBox | https://createos.sh/docs/Sandbox/Integrations/AgentBox | Run AgentBox coding agents on CreateOS Firecracker microVMs using the provider plugin. | [[Docs - Sandbox Integrations]] |

## Related
- Up: [[CreateOS Docs]]
- [[Product - Sandbox]]: product page for CreateOS Sandbox
- [[Pricing - Sandbox]]: sandbox rate card and plans
- [[Sandbox Networking]]: product view of private networks between sandboxes
- [[Egress Governance]]: product view of egress allowlists
- [[Self-Host]]: product page for running Sandbox on your own infrastructure
- [[Docs - CLI]]: platform-wide `createos` CLI docs
- [[Hackathon Setup Guide]]: hackathon setup steps
- [[Hackathon Ideas]]: hackathon project ideas
