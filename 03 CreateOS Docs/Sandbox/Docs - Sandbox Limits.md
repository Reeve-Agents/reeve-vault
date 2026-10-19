---
aliases:
  - Sandbox Limits
  - Sandbox limits and defaults
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Limits
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Limits

> [!summary] Summary
> - Concurrent sandboxes per plan: Free 1, Beginner 5, Pro 20, Enterprise 30. Per day (rolling 24h): 10 / 50 / 200 / 300. Paused sandboxes count toward the cap; a create over the cap fails with `429` (no queue).
> - Default egress is open when the rule list is empty; once any rule exists, everything not listed is dropped. Ingress is closed by default. No lifetime cap; auto-pause is off by default.
> - Images: `devbox:1` (Ubuntu 24.04, Python 3.12, Node.js 24, Bun, Go, Rust, Docker, five coding agents) and `desktop:1` (XFCE + Chrome + computer-use APIs, same five agents). Catalog default when `rootfs` is omitted: `alpine:3.20`.
> - Billing per second: $0.03616363 per vCPU-hour, $0.01159025 per GiB-RAM-hour, $0.0001584 per GB-hour storage; new accounts start with 500 free credits.
> - Source: https://createos.sh/docs/Sandbox/Limits (values read from the live control plane on 2026-09-07, re-verified 2026-09-08, per the page).

## Limits and defaults
- **URL:** https://createos.sh/docs/Sandbox/Limits
- **Summary:** One-page reference of the numbers needed before choosing CreateOS Sandbox for a workload, each with the API field it comes from. Read back from the live control plane (`https://api.sb.createos.sh`) on 2026-09-07, re-verified 2026-09-08; per-account values say which call returns yours.
- **Key points:** tables below, reproduced in full.

## Sizes (shapes)
`GET /v1/shapes` is public and is the source of truth. As of 2026-09-07:

| Shape | vCPU | Memory | Default disk |
|---|---|---|---|
| `s-0.25vcpu-512mb` | 1 (25% quota) | 512 MiB | 10 GiB |
| `s-0.5vcpu-1gb` | 1 (50% quota) | 1 GiB | 10 GiB |
| `s-1vcpu-256mb` | 1 | 256 MiB | 10 GiB |
| `s-1vcpu-1gb` | 1 | 1 GiB | 10 GiB |
| `s-1vcpu-2gb` | 1 | 2 GiB | 10 GiB |
| `s-2vcpu-2gb` | 2 | 2 GiB | 10 GiB |
| `s-2vcpu-4gb` | 2 | 4 GiB | 10 GiB |
| `s-4vcpu-4gb` | 4 | 4 GiB | 10 GiB |
| `s-4vcpu-8gb` | 4 | 8 GiB | 10 GiB |

- Disk can be raised per sandbox with `disk_mib` at create time, up to the plan's maximum disk.
- The largest shapes (4 vCPU / 8 GB and 8 vCPU / 8 GB on Pro, 8 vCPU / 16 GB on Enterprise) unlock with the plan. No GPU shapes are offered.

## Images (rootfs)
`GET /v1/rootfs` is public. Five first-party images are kept warm on every host:

| Image | What is in it |
|---|---|
| `devbox:1` | Ubuntu 24.04 LTS; Python 3.12 with `pip` and `uv` and the common data and AI packages preinstalled (verified by exec on 2026-09-08: pandas 2.3, numpy 2.4, scipy 1.17, matplotlib 3.10, pyarrow 21, openpyxl, scikit-learn 1.8, plus openai, anthropic, langchain, llama-index, transformers, requests; 374 packages in total); Node.js 24; Bun 1.4; Go 1.26; Rust 1.83; Docker 29; SSH; five preinstalled coding agents, each on `PATH`: OpenCode (`opencode`), Claude Code (`claude`), Pi coding agent (`pi`), Cursor CLI (`agent`, also `cursor-agent`), Codex (`codex`). PyPI is reachable under the default egress policy for anything else. |
| `desktop:1` | Graphical desktop with XFCE, Google Chrome, remote desktop and computer-use APIs. The same five preinstalled coding agents as `devbox:1`. |
| `ubuntu:26.04` | Ubuntu 26.04 LTS, minimal. |
| `debian:13` | Debian 13, minimal. |
| `alpine:3.20` | Alpine 3.20, minimal. **This is the catalog default** when `rootfs` is omitted; pass `devbox:1` explicitly for a development toolchain. |

- Need a package set beyond `devbox:1` or a pinned one: build once from a Dockerfile with Templates (REST `/Sandbox/REST-API/Templates`) and boot every sandbox from it.

> [!warning] Source inconsistency (recorded as stated)
> The Concepts page lists `devbox:1` as Debian and "Default". This Limits page lists `devbox:1` as Ubuntu 24.04 LTS and `alpine:3.20` as the catalog default. The CLI `sandbox create` page says `--rootfs` takes a base OS image or template name. See [[Docs - Sandbox Overview and Concepts]].

## Lifetime, idle and cleanup
| Behaviour | Value | Field |
|---|---|---|
| Maximum session length | **None.** A sandbox runs until you destroy it, pause it, or it auto-pauses. There is no lifetime cap to fit a job inside. | — |
| Auto-pause on idle | **Off by default.** Set `auto_pause_after_seconds` (60–86,400) to pause after that long with no exec, file transfer or tunnel activity. | `auto_pause_after_seconds` |
| What "pause" means | A Firecracker snapshot to durable storage: memory, registers and device state. Compute billing stops; the sandbox is not destroyed and keeps its disk. | Pause, Resume and Fork REST page |
| Destroy | Explicit `DELETE /v1/sandboxes/{id}`. Idempotent on an already-terminal sandbox. For one-sandbox-per-run workloads, call it in a `finally` block; do not rely on idle pause as cleanup. | `DELETE /v1/sandboxes/{id}` |
| Time to interactive | ~210 ms median, ~250 ms p95 (create plus first command), on CreateOS-managed infrastructure. | Sandboxes REST page |

> [!info] Self-hosted note (from the page)
> These figures hold on CreateOS infrastructure. If you run on your own infrastructure, boot and resume are slower: 6–10x on tier-1 cloud instances, where nested virtualization is in the path.

## Concurrency and plan limits
- Caps are set by plan (source: the control plane's plan table, 2026-09-08).
- The concurrent cap counts every sandbox that is not destroyed or failed: **paused ones count**, and only destroying one frees a slot. `GET /v1/whoami` returns `running`, `paused` and `other` counts, together measured against the cap.
- A create over the cap fails with `429` rather than queueing. No queue, no burst pool: size the plan to your peak.
- The per-day cap counts sandboxes created in the rolling last 24 hours, destroyed ones included.
- Plans also set the largest shape and disk, and how many disks and templates you can hold. Per-second rates are the same on every plan; plans differ in top-up bonus credits (Account and Billing, Pricing).

| Plan | Concurrent sandboxes | Sandboxes per day | Networks (concurrent / day) | Disks (concurrent / day) | Templates (concurrent / day) | Max disk | Largest shape |
|---|---:|---:|---|---|---|---|---|
| Free | 1 | 10 | 1 / 10 | 0 / 0 | 0 / 0 | 10 GiB | 1 vCPU / 1 GB |
| Beginner | 5 | 50 | 5 / 50 | 5 / 50 | 5 / 50 | 30 GiB | 4 vCPU / 4 GB |
| Pro | 20 | 200 | 20 / 200 | 20 / 200 | 20 / 200 | 50 GiB | 8 vCPU / 8 GB |
| Enterprise | 30 | 300 | 30 / 300 | 30 / 300 | 30 / 300 | 60 GiB | 8 vCPU / 16 GB |

- Sizing rule of thumb (from the page): ten concurrent five-minute runs needs Pro. Free is for trying the API (one sandbox at a time, no disks or templates); Beginner covers a small service; Enterprise caps are the starting point for a negotiated limit, not a ceiling.
- Plan prices: https://createos.sh/pricing/sandbox (see [[Pricing - Sandbox]]).

## Network
| Behaviour | Default | Field |
|---|---|---|
| Inbound (ingress) | **Closed.** Nothing reaches a sandbox unless `ingress_enabled: true`, which exposes one HTTPS URL per sandbox. | `ingress_enabled` |
| Outbound (egress) | **Open** when the rule list is empty: the sandbox can reach any external host. **Set an allowlist before running untrusted or model-generated code.** Once any rule is present, only listed destinations pass; everything else is dropped in-kernel on the host, outside the VM, and cannot be changed from inside it. Rules take `host`, `host:port`, `*.host`, `ip`, `ip:port` and `cidr[:port]`, and apply live. | `egress` on create, Egress REST page |
| Sandbox-to-sandbox | Private overlay networks, opt-in per sandbox. | `networks` |
| Bandwidth budget | 50 GiB per sandbox by default; grow it with `POST /v1/sandboxes/{id}/bandwidth/recharge`. | `bandwidth_quota_bytes` |

A deny-by-default Python job needs exactly two rules:
```json
{ "shape": "s-1vcpu-1gb", "rootfs": "devbox:1",
  "egress": ["pypi.org:443", "*.pythonhosted.org:443"] }
```

## Secrets and environment
- `envs` at create time: up to 64 keys, 4 KiB per value, 64 KiB total.
- Values are write-only (`GET` returns key names).
- Per-exec overrides may change a declared key's value but cannot introduce new keys, so a sandbox can never receive a secret you did not declare at creation.
- Keep production credentials on the caller's side; the sandbox only needs the data file and non-secret configuration.

## Regions and residency
- `region` at create time: `eu` or `us`; must match the control plane you are talking to.
- For data that must not leave your boundary: run on your own infrastructure and bring your own storage ([[Docs - Sandbox Security and Self-Hosting]]).

## Billing
- Per-second, while running: $0.03616363 per vCPU-hour plus $0.01159025 per GiB-RAM-hour and $0.0001584 per GB-hour of storage; no egress fees.
- A paused sandbox is still charged for memory and storage, but not for vCPU.
- New accounts start with 500 free credits. Full rate card: https://createos.sh/pricing/sandbox

## Status and compliance
- ISO 27001 and SOC 2 Type II certified.
- For regulated workloads that need data to stay in your environment, use self-hosting.
- Reliability behaviour under OOM, CPU spin and runaway processes: https://createos.sh/products/sandbox/reliability

## Other limits stated on other Sandbox pages
Recorded for convenience; each is stated on the page named.
- Buffered `exec` output capped at 1 MiB (Overview, Concepts, CLI).
- Managed process retained output: 1 MiB per process, 32 MiB per sandbox (Overview, Concepts, CLI).
- Idle auto-pause timeout range stated on Overview: 1 minute to 24 hours.
- CLI `sandbox push`: max 500 MB per file (CLI Commands page). Claude Code / Codex plugin pages state the API accepts uploads up to 10 GiB.
- Plugin pages (Claude Code, Codex): clusters up to 8 boxes; templates: one `FROM`, no `COPY` or `ADD`, 64 KiB of Dockerfile, 2 concurrent builds per account.
- Langflow component: at most 5 MiB and 256 files returned from `/workspace/artifacts`.
- Retained process output and file sync details: see [[Docs - Sandbox CLI]] and [[Docs - Sandbox Integrations]].

## Related
- Up: [[Docs - Sandbox]]
- [[Pricing - Sandbox]]: plan prices and per-second rate card
- [[Docs - Sandbox Overview and Concepts]]: vocabulary behind these numbers
- [[Docs - Sandbox Security and Self-Hosting]]: egress, credentials, self-host, bring your own storage
- [[Docs - Sandbox REST API]]: Egress, Pause/Resume/Fork and Templates endpoints referenced by the fields above
- [[Egress Governance]]: product view of egress allowlists
- [[Product - Sandbox Reliability]]: reliability behaviour under OOM, CPU spin and runaway processes
- [[Hackathon Setup Guide]]: hackathon setup steps
- [[Hackathon Ideas]]: hackathon project ideas
