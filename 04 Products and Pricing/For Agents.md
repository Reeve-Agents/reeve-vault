---
aliases:
  - A safe computer for your agents
tags:
  - createos/product
  - type/page
source: https://createos.sh/for-agents
scraped: 2026-10-17
up: "[[Product - Sandbox]]"
---

# For Agents

> [!summary] Summary
> - CreateOS Sandbox as "a safe computer for AI agents": each agent's code runs in its own Firecracker micro-VM with its own kernel, an eBPF egress allowlist, and no ingress.
> - Agent primitives: fork a running agent to branch state, network agents together, pause idle ones to stop paying.
> - Driven from a TypeScript SDK (`@nodeops-createos/sandbox`), the CLI, or MCP; ComputeSDK provider available.
> - Pricing: $0.03616363 per vCPU-hour, $0.01159025 per GiB-RAM-hour, $0 egress; 500 free credits for new accounts.
> - Source: https://createos.sh/for-agents

## Overview

- **Title:** A safe computer for your agents.
- Each agent's code runs in its own Firecracker micro-VM with its own kernel, an eBPF egress allowlist, and no ingress. Fork a running agent to branch its state, network agents together, and pause idle ones to stop paying. Drive it from a TypeScript SDK, the CLI, or MCP.
- **CTAs:** sandbox -> https://createos.sh/products/sandbox · examples -> https://createos.sh/examples · book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## Agents write code, then run it

- That is the new normal, and the code nobody reviewed has to run somewhere safe.
- An agent platform needs a computer it can hand to generated code: isolated by default, able to network when the work is more than one box, and cheap to fork and pause as the agent explores.
- CreateOS Sandbox maps to how agents actually behave, not to how you run a single snippet.

## The primitives that match how agents work

- **Isolation per agent:** each agent's code runs in its own micro-VM with its own kernel, so one agent's run cannot reach another's or the host.
- **Fork for rollouts:** pause a running agent and fork its full state into N branches, run them in parallel, keep the winner.
- **Networking:** put agents on a private network to build multi-agent systems inside isolation ([[Sandbox Networking]]).
- **Pause for idle:** an agent waiting on a human or a slow job pauses and stops paying for compute, then resumes warm.
- **Egress governance:** allowlist exactly what the agent's code can reach, enforced in the kernel ([[Egress Governance]]).

## Drop it into your stack

- Drive sandboxes from a TypeScript SDK, the CLI, or MCP, so an agent can provision its own compute through a tool call.
- **Published SDK:** `@nodeops-createos/sandbox`; the same platform is available through the ComputeSDK provider for teams already standardized on it.
- Pricing is per-second with zero egress fees, and pause stops the compute bill. New accounts start with 500 free credits.

## Proof

- Per-VM kernel isolation for every agent run.
- Fork, pause, resume as first-class agent primitives.
- TypeScript SDK, CLI, and MCP. ComputeSDK provider available.

## Common questions

| Question | Answer |
| --- | --- |
| Where can I safely run AI-generated code? | In CreateOS Sandbox. Each run gets its own Firecracker micro-VM with its own guest kernel, an egress allowlist enforced in the kernel via eBPF, and no ingress, so model-generated code cannot reach your host or the open internet unless you allow it. |
| How do I sandbox an autonomous agent's code execution? | Give each agent run its own sandbox through the SDK, CLI, or MCP. The agent provisions compute with a tool call, runs its code inside the micro-VM, and you tear it down or pause it when the step is done. |
| What is the best sandbox for an SWE agent or code interpreter? | One that isolates every run by default, lets you fork state for parallel attempts, networks sandboxes for multi-step work, and bills per second with no egress fees. CreateOS Sandbox does all four, which is the combination most platforms do not. |
| How do I fork a running sandbox to branch agent state? | Pause the sandbox to snapshot its state, then fork it into as many branches as you want. Each fork carries the full memory and working state of the parent, so you run parallel rollouts and keep the winner. |
| What is the cheapest code execution API with free egress? | CreateOS Sandbox bills per second at $0.03616363 per vCPU-hour and $0.01159025 per GiB-RAM-hour with $0 egress. Storage is $0.0001584 per GB-hour, and a paused sandbox is still charged for memory and storage but not for vCPU. New accounts start with 500 free credits. |

## Related
- Up: [[Product - Sandbox]]
- [[Product - Sandbox Reliability]]: fork, pause and failure semantics
- [[Pricing - Sandbox]]: per-second rates and plan limits
- [[Docs - Sandbox]] · [[Docs - Sandbox Quickstart]]: SDK and quickstart docs
- [[Docs - Sandbox Claude Managed Agents]]: Claude Managed Agents with Sandbox
- [[Product - Agents]]: the CreateOS multi-agent runtime
- [[Ideas - Computer Use]] · [[Ideas - Builders]]: hackathon ideas that run agent code
- [[Hackathon Overview]]
- [[Products]]
