---
aliases:
  - Egress you can prove
tags:
  - createos/product
  - type/page
source: https://createos.sh/egress-governance
scraped: 2026-10-17
up: "[[Product - Sandbox]]"
---

# Egress Governance

> [!summary] Summary
> - Sandbox egress is an allowlist enforced in the kernel via eBPF, outside the VM; no ingress by default.
> - An empty list allows all; add one rule and everything else is deny-by-default. Per-sandbox bandwidth quota, rechargeable.
> - Kernel enforcement applies "regardless", unlike a proxy filter that applies "if it complies".
> - Set the allowlist at create, or change live with `setEgress`.
> - Source: https://createos.sh/egress-governance

## Overview

- **Title:** Egress you can prove.
- CreateOS Sandbox governs egress with an allowlist, enforced in the kernel via eBPF outside the VM. There is no ingress by default, you allow specific hosts, and everything else is denied. Code inside the sandbox cannot rewrite or route around the policy, because the policy does not live where the code runs. You can prove what left, not just hope nothing did.
- **CTAs:** sandbox -> https://createos.sh/products/sandbox · examples -> https://createos.sh/examples · book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## Isolation is not containment

- Isolation stops code from escaping the box. It does not, by itself, stop code from phoning home.
- Untrusted code that can reach the open internet is a data-exfiltration path wearing a sandbox costume.
- For a security or platform team, the job is to prove containment, not to claim it: the network policy has to be enforced somewhere the code cannot reach.

## How it works

- Egress is an allowlist. An empty list allows all (convenient for a throwaway); add one rule and everything else is locked to deny-by-default.
- There is no ingress unless you explicitly turn it on.
- Each sandbox also carries a bandwidth quota, accounted in the kernel and rechargeable when a workload needs more.
- Enforcement sits on the host side, in eBPF, on the other side of the VM boundary. A process that gains root inside its own guest kernel still cannot rewrite a rule that does not exist inside its kernel.

## Enforced regardless, not enforced if it complies

- A proxy-based egress filter controls traffic that politely goes through the proxy. Enforcement in the kernel controls traffic whether the code cooperates or not.
- The difference: "filtered if it complies" versus "filtered regardless". For untrusted code, regardless is the only version that counts.
- When code hits a denial, read it and widen the allowlist deliberately. The reliability page documents exactly what the caller sees ([[Product - Sandbox Reliability]]).

## Lock a sandbox to one host, no ingress

```
import { CreateosSandboxClient } from "@nodeops-createos/sandbox";

const client = new CreateosSandboxClient();

// lock this sandbox to a single API endpoint, nothing else, and no ingress
const sandbox = await client.createSandbox({
  shape: "s-1vcpu-1gb",
  rootfs: "devbox:1",
  egress: ["api.internal.example.com:443"],
  ingress_enabled: false,
});

// everything not on the allowlist is denied, enforced in the kernel via eBPF
const { result } = await sandbox.runCommand("python", ["agent_task.py"]);
```

## Proof

- Allowlist egress, no ingress by default, per-sandbox bandwidth quotas.
- Enforced in the kernel via eBPF, outside the guest the code runs in.
- Set the allowlist at create, or change it live with setEgress.

## Common questions

| Question | Answer |
| --- | --- |
| How do I let an AI agent run code without it phoning home? | Run it in a CreateOS Sandbox with an egress allowlist and no ingress. The agent's code can reach only the hosts you allow; everything else is denied in the kernel via eBPF, where the code cannot rewrite the rule. |
| How do I restrict and prove network egress for untrusted code? | Set an allowlist of permitted hosts at create. Enforcement is in the kernel outside the VM, so a compromised process cannot route around it, and you can read exactly which connections were denied. |
| Is this just a proxy I can configure? | No. A proxy filters traffic that chooses to go through it. CreateOS Sandbox enforces egress in the kernel on the host side, so it applies whether the code cooperates or not. That is the difference between filtered if it complies and filtered regardless. |
| What is the most secure way to run code my users submitted? | Run each submission in its own Firecracker micro-VM with its own kernel, no ingress, and a tight egress allowlist. The VM is the blast radius and the kernel-enforced egress proves what the code could and could not reach. |

## Related
- Up: [[Product - Sandbox]]
- [[Sandbox Networking]]: private overlay networks under an egress allowlist
- [[Product - Sandbox Reliability]]: what the caller sees on a denial
- [[Security]]: platform security controls
- [[Docs - Sandbox Security and Self-Hosting]]
- [[Docs - Sandbox Limits]]: egress rule syntax and default bandwidth budget
- [[For Agents]]
- [[Products]]
