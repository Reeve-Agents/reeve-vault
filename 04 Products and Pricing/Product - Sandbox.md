---
aliases:
  - CreateOS Sandbox
  - Sandbox product
tags:
  - createos/product
  - type/page
source: https://createos.sh/products/sandbox
scraped: 2026-10-17
up: "[[Products]]"
---

# Product - Sandbox

> [!summary] Summary
> - Firecracker micro-VMs, each with its own kernel; spawn in EU or USA; pause/resume; private networks between sandboxes; disk sync to your own object storage.
> - `devbox:1` image: Ubuntu 24.04, Python 3.12 + data/AI packages, Node.js 24, Bun, Go 1.26, Rust, Docker.
> - Open-sandbox caps by plan: 1 Free, 5 Beginner, 20 Pro, 30 Enterprise.
> - Driven from the TypeScript SDK, CLI, MCP or REST API; no Python SDK yet.
> - Source: https://createos.sh/products/sandbox

## Overview

- **Title:** CreateOS Sandbox.
- Run agents and code in Firecracker micro-VMs, each with its own kernel for true isolation. Spawn in EU or USA, pause and resume to save cost, connect sandboxes over a private network, and sync the disk to your own object storage.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · Transparent pricing -> https://createos.sh/pricing/sandbox (see [[Pricing - Sandbox]]) · github -> https://github.com/NodeOps-app/createos-sandbox-sdk · docs -> https://createos.sh/docs/Sandbox/Overview (see [[Docs - Sandbox]]) · product -> https://createos.sh/products
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## How the Sandbox works

| Step | What happens |
| --- | --- |
| Spawn a micro-VM | Create a Firecracker micro-VM with a shape and rootfs in an EU or USA region, from the TypeScript SDK, the CLI, or MCP. Each sandbox gets its own kernel, so a guest compromise never reaches the host or another workload. |
| Run, expose, connect | Run commands and code, expose HTTP services to the internet, and connect sandboxes together over a private network. Outbound egress is firewalled and inbound ingress is closed, so the sandbox reaches out but nothing reaches in. |
| Pause, sync, or tear down | Pause idle sandboxes to stop compute billing and resume in place, sync the disk to S3, MinIO, or Cloudflare R2 to keep your work, then destroy on demand. |

## What the Sandbox gives you

| Capability | Detail |
| --- | --- |
| Micro-VM isolation | Every sandbox is a Firecracker micro-VM with its own kernel, not a shared-kernel container. A guest kernel compromise cannot reach the host or other sandboxes. |
| Pause and resume | Pause idle sandboxes to stop paying for compute, then resume in place. Set auto-pause after a period of inactivity. |
| Sandbox networking | Connect multiple sandboxes over a private network for multi-agent and multi-service workloads. Few sandbox providers offer this. |
| Firewall and egress control | Manage outbound egress with firewall rules; inbound ingress is closed by default, so the sandbox stays isolated from external systems while still reaching out. |
| Disk sync and mounts | Ephemeral disk that syncs to Amazon S3, MinIO, or Cloudflare R2, so work persists past the VM. Mount your own object storage. |
| Preinstalled and templated | The devbox:1 image ships Ubuntu 24.04 with Python 3.12 and the common data and AI packages preinstalled (pandas, numpy, scipy, matplotlib, pyarrow, scikit-learn, openai, anthropic, langchain), plus Node.js 24, Bun, Go 1.26, Rust and Docker. Bake a pinned set into a template from a Dockerfile if you need one. |

## Storage and regions

- **Storage:** Amazon S3 · MinIO (self-host) · Cloudflare R2
- **Regions:** EU region · USA region
- Ephemeral disk with optional sync to your object storage.
- The devbox:1 image is Ubuntu 24.04 with Python 3.12 and the common data and AI packages preinstalled (pandas, numpy, scipy, matplotlib, pyarrow, scikit-learn, openai, anthropic, langchain), plus Node.js 24, Bun, Go 1.26, Rust and Docker; minimal Ubuntu, Debian and Alpine images and a desktop image are also in the catalog.
- Drive it from the TypeScript SDK, the CLI, MCP, or the REST API from any language.

## Common questions

| Question | Answer |
| --- | --- |
| How is the CreateOS Sandbox isolated? | Each sandbox is a Firecracker micro-VM with its own kernel. Unlike shared-kernel containers, a vulnerability in one guest kernel cannot propagate to the host or to other sandboxes, so workloads stay isolated. |
| Can I connect sandboxes together? | Yes. CreateOS Sandbox supports private networking between sandboxes, so you can run multi-agent or multi-service workloads that talk to each other while staying closed to the outside. |
| Does my work persist when a sandbox stops? | The disk is ephemeral, but you can sync it to Amazon S3, MinIO, or Cloudflare R2 to keep your work. Pause and resume preserves a running sandbox without paying for idle compute. |
| Where do sandboxes run, and what is preinstalled? | In EU or USA regions. The devbox:1 image is Ubuntu 24.04 with Python 3.12 and the common data and AI packages preinstalled: pandas, numpy, scipy, matplotlib, pyarrow, openpyxl, scikit-learn, openai, anthropic, langchain, llama-index, transformers (verified 8 September 2026). Node.js 24, Bun, Go 1.26, Rust and Docker are there too. Anything else installs from PyPI under the default egress policy, or bake a pinned set into a template built from a Dockerfile. Drive everything from the TypeScript SDK, the CLI, MCP, or the REST API from any language. |
| How many sandboxes can I run at once, and how long can one run? | Open sandboxes are capped by plan: 1 on Free, 5 on Beginner, 20 on Pro, 30 on Enterprise (and 10 / 50 / 200 / 300 sandboxes created per rolling 24 hours). Paused sandboxes count toward the cap; destroying one frees the slot. GET /v1/whoami returns your running, paused and other counts, and a create over the cap fails with 429 rather than queueing; ten concurrent five-minute runs need Pro. There is no maximum session length: a sandbox runs until you destroy it, pause it, or it auto-pauses on idle. The full list of limits and defaults, with the API field each comes from, is on the docs Limits page ([[Docs - Sandbox Limits]]). |
| What happens when a sandbox times out or goes idle? | Nothing is destroyed on a timer. Auto-pause is off by default; set auto_pause_after_seconds (60 to 86,400) and the sandbox snapshots its full state after that long with no activity, compute billing stops, and resume restores it in place. Cleanup is an explicit destroy call, so one-sandbox-per-run workloads should destroy in a finally block rather than rely on idle pause. |
| Is outbound network access open or closed by default? | Open when no egress rules are set, closed to everything except the listed destinations once any rule is set. Pass the allowlist at create time so it is in force before the first command runs; rules take host, host:port, wildcard subdomains, IPs and CIDRs, and are enforced in-kernel on the host where code inside the VM cannot reach them. Inbound is closed unless you enable ingress. A deny-by-default Python job needs two rules: pypi.org:443 and *.pythonhosted.org:443. |
| Is there a Python SDK? | Not yet. The REST API is the source of truth and a Python integration is two calls: POST /v1/sandboxes to create and POST /v1/sandboxes/{id}/exec to run; the TypeScript SDK, the CLI and MCP wrap the same API. A Python client is on the roadmap. |

## Run agents where nothing leaks

- See a Firecracker micro-VM spin up, run, and pause in your environment.
- **CTAs:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · Transparent pricing -> https://createos.sh/pricing/sandbox

## Related
- Up: [[Products]]
- [[Product - Sandbox Reliability]]: what happens on OOM, CPU spin, egress denial, fork
- [[Pricing - Sandbox]]: per-second rates, shapes, plan limits
- [[Sandbox Networking]]: private overlay networks between sandboxes
- [[Egress Governance]]: kernel-enforced eBPF egress allowlist
- [[Self-Host]]: enterprise-only run on your own infrastructure
- [[For Agents]]: the Sandbox as a safe computer for agents
- [[Docs - Sandbox]]: Sandbox documentation hub
- [[Docs - Sandbox Limits]]: limits and defaults
- [[Docs - Sandbox Security and Self-Hosting]]: security and self-hosting docs
- [[Comparisons]] · [[Alternatives]]: how Sandbox compares with E2B, Daytona, Modal and others
- [[Hackathon Overview]]: Sandbox is the hackathon's execution runtime
