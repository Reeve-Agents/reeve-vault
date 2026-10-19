---
aliases:
  - Networking between sandboxes
tags:
  - createos/product
  - type/page
source: https://createos.sh/sandbox-networking
scraped: 2026-10-17
up: "[[Product - Sandbox]]"
---

# Sandbox Networking

> [!summary] Summary
> - CreateOS Sandbox lets sandboxes network together over private overlay networks with default-deny between networks.
> - Each sandbox gets its own address on the overlay; peers reach each other by that address; nothing off the network can reach in.
> - Enables multi-node clusters (k3s, Nomad), distributed evals and multi-agent systems inside isolation.
> - The page states E2B, Declaw and Daytona do not offer inter-sandbox networking.
> - Source: https://createos.sh/sandbox-networking

## Overview

- **Title:** Networking between sandboxes.
- Yes: CreateOS Sandbox lets sandboxes network together. Each network is a private overlay with default-deny between networks, so you can run multi-node clusters of untrusted code inside isolation and have one sandbox reach another by its address on the network. Most sandbox platforms run one isolated box at a time and cannot do this.
- **CTAs:** sandbox -> https://createos.sh/products/sandbox · examples -> https://createos.sh/examples · book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## The limitation that defines snippets, not systems

- Most sandbox platforms give you one isolated box and stop. There is no supported way for one sandbox to talk to another.
- E2B does not offer inter-sandbox networking. Neither does Declaw. Daytona has no multi-node networking story either.
- When an agent's workload is three services that need to find each other, you are stuck stuffing them into one box or wiring something brittle yourself. Real systems need more than one machine that can talk to the others.

## How it works

- Create a private overlay network, then join sandboxes to it at create time.
- Within a network, each sandbox gets its own address on the overlay; the others reach it there while nothing off the network can reach in. Between networks the default is deny.
- Look a peer up from the network's member list and talk to it by address.
- Routing is enforced below the guest, so the isolation boundary stays drawn around every node even as they communicate.

## What you can build

- A multi-node k3s or Nomad cluster across several sandboxes, each its own micro-VM with its own kernel, on a default-deny private network under an egress allowlist.
- A distributed evaluation across many nodes.
- A multi-agent system where each agent runs in its own isolated sandbox and coordinates over the overlay.
- A real distributed system an agent can spin up, exercise, and tear down, with the isolation boundary around the whole cluster and between every node.

## Two sandboxes on one private network

```
import { CreateosSandboxClient } from "@nodeops-createos/sandbox";

const client = new CreateosSandboxClient();

// one private overlay network, two sandboxes joined to it
const net = await client.networks.create({ name: "team-eval" });

const api = await client.createSandbox({
  shape: "s-1vcpu-1gb",
  rootfs: "devbox:1",
  networks: [{ id: net.id }],
});
const worker = await client.createSandbox({
  shape: "s-1vcpu-1gb",
  rootfs: "devbox:1",
  networks: [{ id: net.id }],
});

// look up the worker's address on the overlay, then reach it from `api`
const { members } = await client.networks.get(net.id);
const workerIp = members?.find((m) => m.sandbox_id === worker.id)?.ip;
await api.runCommand("curl", [`http://${workerIp}:8080/health`]);
```

## Proof

- Private overlay networks that span hosts, default-deny between networks.
- Join networks at create, or attach a running sandbox to a network.
- Each sandbox is still a Firecracker micro-VM with its own guest kernel.

## Common questions

| Question | Answer |
| --- | --- |
| Can two sandboxes talk to each other? | Yes. Join them to the same private overlay network and each one gets an address on that network. They reach each other by that address, and nothing outside the network can reach in. |
| How do I run a multi-node cluster inside a sandbox? | Create a private network, launch several sandboxes joined to it, and stand up k3s or Nomad across them. Each node is its own micro-VM with its own kernel, on a default-deny network under an egress allowlist. |
| Which sandbox platform supports networking between sandboxes? | CreateOS Sandbox does. E2B, Daytona, and Declaw run one isolated sandbox at a time and do not offer supported inter-sandbox networking, so multi-node workloads inside isolation are the differentiator here. |
| Is the traffic between sandboxes isolated? | Yes. Networks are private overlays with default-deny between them, and each sandbox remains a Firecracker micro-VM with its own guest kernel. You connect specific sandboxes deliberately; nothing else can see the traffic. |

## Related
- Up: [[Product - Sandbox]]
- [[Egress Governance]]: egress allowlist applied to the cluster
- [[For Agents]]: networking agents together
- [[Product - Sandbox Reliability]]
- [[Docs - Sandbox]]: Sandbox documentation hub
- [[Docs - Sandbox Limits]]: network caps per plan
- [[vs - E2B]] · [[vs - Daytona]]: comparison pages
- [[Comparisons]]
- [[Examples]]
- [[Products]]
