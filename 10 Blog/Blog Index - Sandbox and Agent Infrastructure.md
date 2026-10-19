---
tags:
  - createos/blog
  - type/index
source: https://createos.sh/blogs
scraped: 2026-10-17
up: "[[Blog]]"
---

# Blog Index - Sandbox and Agent Infrastructure

> [!summary] Summary
> - 13 posts from the CreateOS blog, dated 2026-06-22 to 2026-09-30, newest first.
> - Scope: Sandbox isolation (Firecracker microVM, gVisor, container), computer-use and browser agents, fork and pause, the Jenkins plugin, Anchor.
> - Descriptions are the posts' meta descriptions; entries ending in "…" are truncated at the source.
> - Source: https://createos.sh/blogs

## Posts

| Date | Post | Author | Description |
|---|---|---|---|
| 2026-09-30 | [CreateOS Sandbox Jenkins plugin: ephemeral microVMs as build agents](https://createos.sh/blogs/jenkins-createos-sandbox-plugin) | CreateOS | Run Jenkins builds in ephemeral CreateOS Sandbox microVM agents. Learn how the plugin works, what it requires, and how to install it from the Jenkins… |
| 2026-09-29 | [CreateOS and Anchor: Browser Access for AI Agents](https://createos.sh/blogs/createos-anchor-browser-ai-agents) | CreateOS | The CreateOS and Anchor integration gives AI agents browser access inside Sandbox, with isolated execution, authentication, and persistent sessions. |
| 2026-09-25 | [Cloud Development Environment for AI Agents: What It Needs in 2026](https://createos.sh/blogs/cloud-development-environment-ai-agents) | CreateOS | A cloud development environment for AI agents needs its own kernel, egress control, pause and fork. Docker, DigitalOcean, Prime and CreateOS compared. |
| 2026-09-10 | [How to Give Your AI Agent a Computer: A Computer Use Agent Setup Guide](https://createos.sh/blogs/give-ai-agent-a-computer) | CreateOS | Give a computer use agent its own desktop VM in one API call, then watch Claude Opus 5 use it to pick a cafe. Timings, memory floor, cost, recorded run. |
| 2026-09-07 | [When Coding Agents Need Firecracker (Not a Shared Kernel)](https://createos.sh/blogs/when-coding-agents-need-firecracker) | CreateOS | If a coding agent writes and runs code you did not review, a shared kernel is the wrong default. Why Firecracker microVMs match that threat model. |
| 2026-09-06 | [Isolation Primitives for AI Agents: MicroVM, gVisor, or Container?](https://createos.sh/blogs/isolation-primitives-ai-agents-microvm-gvisor-container) | CreateOS | Pick an AI agent isolation primitive from the threat model: shared-kernel container, gVisor, or Firecracker microVM. One-screen decision tree included. |
| 2026-08-11 | [AI Agent Security After the OpenAI Sandbox Escape](https://createos.sh/blogs/ai-agent-security-sandbox-escape) | CreateOS | An AI model escaped its test sandbox and reached production infrastructure. What the OpenAI and Hugging Face incident says about isolating agents. |
| 2026-08-09 | [Browser Sandboxes for Computer-Use Agents](https://createos.sh/blogs/browser-sandboxes-computer-use-agents) | Naman Kabra | A production guide to isolating browser agents with scoped credentials, network controls, disposable state, approvals, and auditable execution. |
| 2026-08-05 | [Firecracker Sandboxes for AI Agents: What Happens After Isolation](https://createos.sh/blogs/firecracker-sandbox-for-ai-agents) | CreateOS | Most Firecracker guides stop at isolating the process. This one covers agent state — pause, fork, resume — and what a sandboxed agent can reach. |
| 2026-07-07 | [MicroVM Isolation for AI Agents: Why Containers Fall Short](https://createos.sh/blogs/microvm-isolation-for-ai-agents) | Naman Kabra | AI agents run untrusted, model-generated code, so they need VM-level isolation, not container isolation. Here is why, using AWS Lambda's Firecracker as… |
| 2026-06-25 | [What Is an AI Agent Sandbox? Safe Testing Before Production](https://createos.sh/blogs/what-is-ai-agent-sandbox) | Naman Kabra | An AI agent sandbox is an isolated runtime for safe testing before production. Learn how filesystem isolation, network controls, state forking, and… |
| 2026-06-22 | [Fork Your Agent's State: Parallel Rollouts, Pause for Idle](https://createos.sh/blogs/createos-sandbox-fork-agent-state) | Pratik Balar | Fork a running agent's full state into N branches, keep the winner, and pause idle sandboxes to stop paying. How fork and pause map to how agents work. |
| 2026-06-22 | [Isolation, Networked: Untrusted Code as Systems](https://createos.sh/blogs/createos-sandbox-isolation-networked) | Pratik Balar | Per-VM kernel isolation, kernel-level egress control, and real sandbox-to-sandbox networking. How CreateOS Sandbox runs untrusted code as systems. |

## Related
- Up: [[Blog]]
- [[Guides Blog Index]]: the separate /guides/blog/* posts
- [[Product - Sandbox]]
- [[Docs - Sandbox]]
- [[Products]]
- [[Comparisons]]
- [[Sandbox Networking]]
- [[Egress Governance]]
- [[Docs - Sandbox Integrations]]
