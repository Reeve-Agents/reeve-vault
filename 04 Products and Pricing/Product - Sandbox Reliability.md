---
aliases:
  - Sandbox reliability and failure modes
tags:
  - createos/product
  - type/page
source: https://createos.sh/products/sandbox/reliability
scraped: 2026-10-17
up: "[[Product - Sandbox]]"
---

# Product - Sandbox Reliability

> [!summary] Summary
> - Each failure (OOM, CPU spin, infinite loop, fork bomb) stays inside one micro-VM: "the VM is the blast radius".
> - Egress denials are enforced in-kernel via eBPF outside the VM; widen the allowlist deliberately.
> - Fork copies a paused sandbox (memory, overlay, working files, loaded context) but not in-flight external connections.
> - No create/resume/fork latency numbers are published; "Sandboxes start in seconds via snapshot restore."
> - Source: https://createos.sh/products/sandbox/reliability

## Overview

- **Title:** CreateOS Sandbox reliability and failure modes.
- Untrusted, agent-generated code fails constantly: it OOMs, spins the CPU, loops forever, or tries to phone home. The Sandbox is built so each failure stays inside one micro-VM.
- The page documents what happens when code misbehaves, how egress denials and timeouts surface, and what survives a fork.
- The sandbox is the unit of isolation and the unit of failure. The VM is the blast radius, so a misbehaving run cannot reach the host, another tenant, or the network you did not allow.
- **CTAs:** sandbox -> https://createos.sh/products/sandbox · examples -> https://createos.sh/examples (see [[Examples]]) · book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## What happens when code fails

| Failure mode | What happens |
| --- | --- |
| When untrusted code misbehaves | OOM, CPU spin, an infinite loop, a fork bomb. Each sandbox is a micro-VM with its own kernel and fixed resources for its shape, so misbehavior is contained to that VM. The VM is the blast radius. The run fails inside the boundary, the caller sees the failure, and you pause or destroy to reclaim the sandbox. |
| Egress denials | When code tries to reach a host outside the allowlist, the call fails because the policy is enforced in the kernel via eBPF, outside the VM. Read the denial, then widen the allowlist deliberately. This is the teaching moment that proves the enforcement is real: the code inside cannot route around a rule it cannot see. |
| Timeouts and bandwidth quotas | Set command timeouts in your agent loop, and let each sandbox carry a bandwidth quota. When a quota is exhausted, egress is capped and the SDK surfaces it; recharge when a workload needs more. Handle both as typed failures the loop can branch on. |
| Pause, resume, and fork edge cases | Resuming a sandbox restores it where it paused. Forking copies a paused sandbox, so memory and working state carry over but in-flight external connections do not. Pause before you fork, size the shape for the heaviest branch up front since there is no live resize, and re-establish external sessions in the child. |
| Retries and idempotency | The SDK retries idempotent requests on transient failures with backoff, jitter, and Retry-After, and exposes a typed error hierarchy. Make agent-driven runs idempotent so a retried create or command does not double-spend, and let the SDK absorb the transient failures for you. |
| Measured, not asserted | We do not publish create, resume, or fork latency numbers we have not measured. Sandboxes start in seconds via snapshot restore. |

## Build against CreateOS Sandbox with an AI assistant

A ready-made prompt for scaffolding code against the Sandbox (verbatim):

```
You are scaffolding code against CreateOS Sandbox, a Firecracker micro-VM
platform for running untrusted, AI-generated, and agentic code.

Core facts to build against:
- Each sandbox is an isolated micro-VM with its own guest kernel.
- Primary interface: the published TypeScript SDK "@nodeops-createos/sandbox"
  (npm), client class CreateosSandboxClient, method createSandbox(). It reads
  CREATEOS_SANDBOX_BASE_URL and CREATEOS_SANDBOX_API_KEY from the environment.
  Also available via the ComputeSDK provider "@computesdk/createos-sandbox",
  and via the CLI and MCP as secondary interfaces.
- Shapes are s-1vcpu-256mb, s-1vcpu-1gb, s-2vcpu-2gb, s-4vcpu-4gb. Pass one as
  "shape". Query client.listShapes() for the current catalog. rootfs "devbox:1".
- Egress is an allowlist (the "egress" option, host:port entries). No ingress by
  default. It is enforced in-kernel via eBPF; code inside the VM cannot bypass it.
- Sandboxes can join a private overlay network ("networks": [{ id }]) and reach
  each other by their address on that network. Use this for multi-node setups.
- Primitives: runCommand, pause (stop paying compute, resume warm later),
  resume, fork (pause first, then fork to branch state), destroy.

Constraints:
- Do not invent latency numbers; CreateOS Sandbox has not published measured
  create, resume, or fork latency.
- Lead with the SDK. There is no Python SDK; do not generate one.

Build a [DESCRIBE THE THING] that runs its untrusted code inside CreateOS Sandbox.
```

## Reliability questions

| Question | Answer |
| --- | --- |
| What happens when AI-generated code OOMs or loops forever in a sandbox? | The sandbox is a Firecracker micro-VM with fixed CPU and memory for its shape, so a memory blowout, a CPU spin, an infinite loop, or a fork bomb is contained to that VM. The VM is the blast radius. The run fails inside the boundary and the caller gets the failure, and you pause or destroy the sandbox to reclaim it. Nothing reaches the host or another tenant. |
| What does my code see when it hits an egress denial? | The connection to a host that is not on the allowlist fails the way any blocked network call fails, because the policy is enforced in the kernel via eBPF outside the VM. You read the denial, then widen the allowlist deliberately by adding the host. There is no ingress by default, so nothing reaches in unless you turn it on. |
| How do timeouts and bandwidth quotas surface to the caller? | Each sandbox carries a bandwidth quota, and you set command timeouts in your own agent loop. When a quota is exhausted, egress is capped and the SDK surfaces it; you can recharge the quota when a workload needs more. Handle these as normal typed failures in the loop that drives the sandbox. |
| What state survives a fork, and what does not? | Fork copies a paused sandbox into a new one, so the memory, the overlay, the working files, and the loaded context all carry over. In-flight external connections do not survive a snapshot and restore. Pause before you fork, and treat external sessions as something to re-establish in the child. |
| How does the SDK handle transient failures? | Idempotent requests retry automatically with backoff, jitter, and Retry-After, and errors are a typed hierarchy you can branch on. Make agent-driven runs idempotent so a retried create or command does not double-spend, and let the SDK absorb the transient ones. |

## Related
- Up: [[Product - Sandbox]]
- [[Egress Governance]]: kernel-enforced egress allowlist in depth
- [[Sandbox Networking]]: overlay networks referenced in the prompt
- [[For Agents]]: fork/pause primitives for agents
- [[Pricing - Sandbox]]: per-second billing and pause behaviour
- [[Docs - Sandbox Limits]]: limits and defaults (shapes, quotas, lifetime)
- [[Docs - Sandbox Security and Self-Hosting]]
- [[Docs - Sandbox]]: Sandbox documentation hub
- [[Products]]
