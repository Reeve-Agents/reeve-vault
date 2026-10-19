---
aliases:
  - CreateOS Sandbox vs Perplexity Sandbox (SPACE)
  - vs Perplexity SPACE
tags:
  - createos/comparison
  - type/page
source: https://createos.sh/vs/perplexity
scraped: 2026-10-17
up: "[[Comparisons]]"
---

# vs - Perplexity

> [!summary] Summary
> - "CreateOS Sandbox vs Perplexity Sandbox (SPACE)". SPACE is the Firecracker-based runtime behind Perplexity Computer; developers reach it as a Python and bash sandbox tool inside the Agent API, with a standalone Sandbox API on the roadmap.
> - Perplexity pricing: $0.03 per session (up to a 20-minute billing window) + tokens; $0.0025 per search from inside the sandbox. CreateOS: $0.03616363/vCPU-hr + $0.01159025/GiB-hr, per second.
> - The page cites CreateOS creation latency of 0.18 s median TTI on ComputeSDK's burst benchmark (11 Sep 2026, rank 2 of 29) and Perplexity's self-reported 60 ms median and 89 ms p90.
> - Source: https://createos.sh/vs/perplexity

## Where CreateOS Sandbox wins

- A sandbox you call directly: REST, TypeScript, Go and Python SDKs, a CLI and an MCP server. Perplexity's sandbox is a tool the model decides to invoke inside an Agent API request; the standalone Sandbox API is listed as upcoming on their roadmap (September 2026).
- Any root filesystem, including a full desktop with Chrome and a computer-use API. Perplexity's developer-facing sandbox runs Python and bash in a Linux container.
- Deny-by-default egress once a rule exists, enforced in the host kernel outside the VM. Perplexity's sandbox tool docs state the container has network access; no allowlist is documented.
- Pause, resume and fork exposed as API calls on a running microVM, plus private sandbox-to-sandbox networks and S3-backed disks. Perplexity describes pause, resume and branching for sessions inside its own products.
- Run sandboxes on your own hardware, cloud account or on-prem (enterprise only, onboarded and managed by the CreateOS team). SPACE runs inside Perplexity.

## Where Perplexity Sandbox (SPACE) is strong

- Scale proven in production: Perplexity reports millions of sandbox creations in launch week and 100% of Computer sessions on SPACE.
- Self-reported 60 ms median and 89 ms p90 creation inside their infrastructure.
- Credentials injected at the network layer so secrets never enter the sandbox.
- A flat $0.03 per 20-minute session that is simple to budget for short jobs.

## Head-to-head comparison

| Dimension | CreateOS Sandbox | Perplexity Sandbox (SPACE) |
|---|---|---|
| Isolation | Firecracker micro-VM, own guest kernel | Firecracker microVM internally (SPACE); developer-facing sandbox tool documented as an isolated Linux container |
| How you call it | REST, TypeScript/Go/Python SDKs, CLI, MCP | Tool inside Agent API requests; the model decides when to run code; standalone Sandbox API upcoming |
| Runtimes | Any image: Alpine, Debian, Ubuntu, devbox, desktop with Chrome; bring a Dockerfile | Python and bash |
| Pricing | $0.03616363/vCPU-hr + $0.01159025/GiB-hr, per second; 1 vCPU / 1 GB for 20 min ≈ $0.016 | $0.03 per session (≤ 20-minute billing window) + tokens; $0.0025 per search from inside the sandbox |
| Egress control | Kernel-level allowlist; deny-by-default with any rule | Container has network access; no allowlist documented |
| Pause / resume / fork | API calls on a running sandbox; fork copies diverged state | Sessions pause, resume and branch inside Perplexity products; Sandbox API roadmap lists pause/resume |
| Computer use | desktop:1 image + Computer API (screenshot, mouse, keyboard, noVNC) | Perplexity Computer is a product, not an API surface for your agents |
| Self-host | Your hardware, cloud account, or on-prem (enterprise only, managed by us) | Runs inside Perplexity |
| Creation latency | 0.18 s median TTI, 100% success, ComputeSDK burst benchmark 11 Sep 2026 (rank 2 of 29); 31 ms to 2.3 s spawn_ms observed over the public API | 60 ms median, 89 ms p90, self-reported, measured inside Perplexity; not on any third-party benchmark |

Rates: CreateOS Sandbox: $0.03616363/vCPU-hr, $0.01159025/GiB-hr. Perplexity Sandbox (SPACE): not applicable, not applicable.

## Common questions

- **Is Perplexity's Sandbox API a CreateOS Sandbox alternative?** Not yet as a direct call. As of September 2026 Perplexity's sandbox is a tool the model invokes inside an Agent API request, running Python and bash in a container for $0.03 per 20-minute session; the standalone Sandbox API is on their roadmap. CreateOS Sandbox is a microVM you create, exec into, pause, fork and destroy yourself over REST, SDKs, CLI or MCP, with any image.
- **Is SPACE faster than CreateOS Sandbox?** Perplexity reports 60 ms median and 89 ms p90 sandbox creation, measured inside its own infrastructure and not exposed to developers as a raw create call. CreateOS measured 0.18 s median time-to-interactive at 100% success on ComputeSDK's public burst benchmark on 11 September 2026, and 31 ms to 2.3 s spawn_ms over the public API depending on warm pool. The two numbers are not the same measurement; SPACE is not on any third-party benchmark the page can cite.
- **Which is cheaper?** For a short job they are close: Perplexity charges $0.03 per session up to 20 minutes plus model tokens; the page states a 1 vCPU / 1 GB CreateOS sandbox for 20 minutes is about $0.022 with no token charge, billed per second, and pausing stops compute billing. (The comparison table on the same page gives ≈ $0.016 for the same workload.) For long-running or larger sandboxes CreateOS bills only the seconds and resources used.

Rates verified June 2026.

## Calls to action on the page

- Book a demo: https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- Sandbox: https://createos.sh/products/sandbox
- Sandbox pricing: https://createos.sh/pricing/sandbox
- Compare all: https://createos.sh/alternatives

## Related
- Up: [[Comparisons]]
- [[Alternatives]]: index of all sandbox comparisons
- [[Product - Sandbox]]: the CreateOS Sandbox product
- [[Product - Sandbox Reliability]]: benchmark and reliability data
- [[Pricing - Sandbox]]: sandbox pricing
- [[Sandbox Networking]]: private networks and egress allowlist
- [[Self-Host]]: self-host option
- [[Docs - Sandbox]]: sandbox documentation, including the Computer API and SDKs
