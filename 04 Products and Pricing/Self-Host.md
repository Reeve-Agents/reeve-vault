---
aliases:
  - Run on your own infrastructure
tags:
  - createos/product
  - type/page
source: https://createos.sh/self-host
scraped: 2026-10-17
up: "[[Product - Sandbox]]"
---

# Self-Host

> [!summary] Summary
> - Enterprise customers only: the CreateOS team onboards your hardware, cloud account or on-prem machines into the CreateOS data plane.
> - Sandboxes, compute and data stay in your environment; CreateOS runs the control plane and manages the platform.
> - Not self-serve: "There is no downloadable control plane to run yourself today."
> - Bring your own S3-compatible storage (S3, R2, Tigris, MinIO), with or without your own machines.
> - Source: https://createos.sh/self-host

## Overview

- **Title:** Run on your own infrastructure.
- Enterprise customers only. The team onboards your own hardware, cloud account, or on-premise machines into the CreateOS data plane, so sandboxes, compute, and data stay in your environment. CreateOS runs the control plane and manages the platform. Onboarding is gated and done with the team directly.
- **CTAs:** sandbox -> https://createos.sh/products/sandbox · examples -> https://createos.sh/examples · book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## The blocker is rarely the isolation model

- For a regulated, security-first team, the blocker is usually the sentence: "our security team will not let us send code to someone else's cloud."
- Running sandboxes on your own machines answers that for compute: the micro-VMs, and the code and data inside them, run on hardware you own or a cloud account you control.

## How it works

- You bring the machines: bare metal, a cloud account, or on-premise. CreateOS connects them to the CreateOS data plane and manages the platform, including the control plane. Sandboxes scheduled onto your machines run there.
- Separately, bring your own S3-compatible storage (S3, R2, Tigris, or MinIO) and mount your buckets into sandboxes, with or without your own machines.
- Performance follows your hardware. Where nested virtualization is in the path (as on tier-1 cloud instances), expect boot and resume to be several times slower than on CreateOS-managed infrastructure; bare metal avoids that.
- The docs Limits page quantifies this: boot and resume are 6-10x slower on tier-1 cloud instances ([[Docs - Sandbox Limits]]).

## How you get access

- Access is gated and handled as an enterprise engagement, not self-serve.
- There is no downloadable control plane to run yourself today.
- If you need specific controls sequenced for your environment, the team works through them with you directly.

## Proof

- Sandboxes run on your hardware, cloud account, or on-premise.
- Enterprise only: onboarded and managed by the CreateOS team.
- Bring your own object storage: S3, R2, Tigris, or MinIO.

## Common questions

| Question | Answer |
| --- | --- |
| Can I self-host a code execution sandbox in my own cloud? | Yes, for enterprise customers only. Our team onboards your machines into the CreateOS data plane so sandboxes run in your environment, and we run the control plane and manage the platform. It is not a self-serve, run-it-yourself install today. |
| Is this a self-hosted E2B alternative? | It runs sandboxes on infrastructure you own, managed by us, for enterprise customers. The differentiator is the combination: per-VM kernel isolation, sandbox networking, and kernel-level egress governance together. |
| Where does my data live? | Sandbox compute runs on your machines. Data you mount from your own buckets (S3, R2, Tigris, or MinIO) stays in storage you control. Talk to us about snapshot location and retention if you have residency requirements. |

## Related
- Up: [[Product - Sandbox]]
- [[Docs - Sandbox Security and Self-Hosting]]: self-hosting documentation
- [[Docs - Sandbox Limits]]
- [[Security]]: certifications, deployment modes
- [[Egress Governance]] · [[Sandbox Networking]]: the other two differentiators named on this page
- [[vs - E2B]]: E2B comparison
- [[Comparisons]] · [[Alternatives]]
- [[Contact and Community]]
- [[Products]]
