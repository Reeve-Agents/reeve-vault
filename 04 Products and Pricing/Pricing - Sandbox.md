---
aliases:
  - Sandbox pricing
  - CreateOS Sandbox Pricing
tags:
  - createos/pricing
  - type/page
source: https://createos.sh/pricing/sandbox
sources:
  - https://createos.sh/pricing/sandbox
  - https://createos.sh/docs/Sandbox/Limits
scraped: 2026-10-17
up: "[[Pricing]]"
---

# Pricing - Sandbox

> [!summary] Summary
> - Per-second billing: $0.03616363 per vCPU-hour, $0.01159025 per GiB-hour of memory, $0.0001584 per GB-hour of storage.
> - No egress fees; paused sandboxes are not billed for vCPU (memory and storage still billed); same rate on every plan.
> - 11 shapes from 1 vCPU / 0.25 GB ($29.26/mo always-on) to 8 vCPU / 16 GB ($342.96/mo).
> - Plans (Free, Beginner, Pro, Enterprise) differ in limits and top-up bonus, not in rates. New accounts start with 500 free credits.
> - Sources: https://createos.sh/pricing/sandbox, plan limits table from https://createos.sh/docs/Sandbox/Limits

## Overview

- **Title:** CreateOS Sandbox Pricing (page `<title>`: "CreateOS Sandbox pricing | Simple per-second pricing").
- Firecracker micro-VMs, each with its own kernel. Pay a simple per-second rate for the sandboxes you run, with no egress fees and pause to zero with your state preserved. Model your spend with the calculator on the page.
- **CTAs:** Book a demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · View the Sandbox (view_sandbox) -> https://createos.sh/products/sandbox · Compare alternatives (compare) -> https://createos.sh/alternatives (see [[Alternatives]]) · Deploy your sandbox now
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## Simple per-resource pricing

Pay only while a sandbox runs, billed per second at one published rate on every plan. No minimums. The plan sets your limits: concurrent and daily sandboxes, and the largest size and disk.

| Resource | Rate |
| --- | --- |
| vCPU | $0.03616363 per vCPU-hour |
| Memory | $0.01159025 per GiB-hour |
| Storage | $0.0001584 per GB-hour |
| Egress | Unmetered, any volume ($0.00) |

- Per-second equivalents for the same rates from the docs billing page ([[Docs - Account and Billing]]): vCPU $0.0000100455 /sec · RAM $0.0000032195 GB/sec · Storage $0.000000044 GB/sec.

## Calculator (interactive on the page)

Inputs on the page: 1) pick a shape, 2) hours running per month (1 h to 720 h, "720 h · always on"), 3) disk per sandbox (10 GB default, up to 60 GB, "billed all month"), 4) how many sandboxes.

Default calculator output (1 vCPU / 2 GB, 720 h, 10 GB disk): **$43.87 per month**

| Line | Computation | Cost |
| --- | --- | --- |
| Compute | 720 vCPU-hours x $0.03616363 | $26.04 |
| Memory | 1,440 GiB-hours x $0.01159025 | $16.69 |
| Storage | 10 GB x 720 h x $0.0001584 | $1.14 |
| Egress | Unmetered, any volume | $0.00 |

- Billed per second while running. Pause to stop paying for idle vCPU; memory and storage are still charged, with your state preserved. USD, no egress fees.

## Shapes: pricing at a glance

All figures at 720h/mo (always-on). Interactive calculator at /pricing/sandbox.

| Shape | Price /mo (always-on) |
| --- | --- |
| 1 vCPU / 0.25 GB | $29.26 |
| 0.25 vCPU / 0.5 GB | $31.35 |
| 0.5 vCPU / 1 GB | $35.52 |
| 1 vCPU / 1 GB | $35.52 |
| 1 vCPU / 2 GB | $43.87 |
| 2 vCPU / 2 GB | $69.91 |
| 2 vCPU / 4 GB | $86.60 |
| 4 vCPU / 4 GB | $138.67 |
| 4 vCPU / 8 GB | $172.05 |
| 8 vCPU / 8 GB | $276.20 |
| 8 vCPU / 16 GB | $342.96 |

## Examples (from the page)

Estimates include storage, which bills for the full month whether the sandbox runs or is paused. Pause between runs to stop paying for idle vCPU.

| Example | Shape and runtime | Est. / month |
| --- | --- | --- |
| Quick agent task | 2 vCPU / 4 GB, 10 h/mo, 10 GB disk | $2.33 |
| Always-on dev box | 4 vCPU / 8 GB, 720 h/mo, 10 GB disk | $172.05 |
| Burst agent fleet | 1 vCPU / 2 GB x 50, 20 h/mo, 10 GB disk | $116.37 |

## What you are not charged for

- **No egress fees:** data leaving a sandbox is never metered. You pay for compute, not for moving your own data.
- **No vCPU charge for paused sandboxes:** paused sandboxes are billed for memory and storage only. State is preserved.
- **Same per-second rate on every plan:** every plan pays the published per-second rate. Plans differ only in limits and top-up bonus credits.
- **No minimums or monthly commitment:** no floor, no overage, no annual lock-in required to access the published rate.

## Plans and limits (from the docs Limits page)

The pricing page states that plans differ only in limits and top-up bonus credits. The plan table below is from the docs Limits page (https://createos.sh/docs/Sandbox/Limits; control-plane plan table read 2026-09-08). See [[Docs - Sandbox Limits]] for the full page.

| Plan | Concurrent sandboxes | Sandboxes per day | Networks (concurrent / day) | Disks (concurrent / day) | Templates (concurrent / day) | Max disk | Largest shape |
|---|---:|---:|---|---|---|---|---|
| Free | 1 | 10 | 1 / 10 | 0 / 0 | 0 / 0 | 10 GiB | 1 vCPU / 1 GB |
| Beginner | 5 | 50 | 5 / 50 | 5 / 50 | 5 / 50 | 30 GiB | 4 vCPU / 4 GB |
| Pro | 20 | 200 | 20 / 200 | 20 / 200 | 20 / 200 | 50 GiB | 8 vCPU / 8 GB |
| Enterprise | 30 | 300 | 30 / 300 | 30 / 300 | 30 / 300 | 60 GiB | 8 vCPU / 16 GB |

- The concurrent cap counts every sandbox that is not destroyed or failed: paused ones count, only destroying one frees a slot. A create over the cap fails with `429`; there is no queue and no burst pool.
- The per-day cap counts sandboxes created in the rolling last 24 hours, destroyed ones included.
- Rule of thumb: ten concurrent five-minute runs need Pro. Free is for trying the API; Beginner covers a small service; Enterprise caps are the starting point for a negotiated limit, not a ceiling.
- New accounts start with 500 free credits.

### Shape catalog (`GET /v1/shapes`, from the docs Limits page, as of 2026-09-07)

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

- The largest shapes (4 vCPU / 8 GB and 8 vCPU / 8 GB on Pro, 8 vCPU / 16 GB on Enterprise) unlock with the plan. No GPU shapes are offered.
- Disk can be raised per sandbox with `disk_mib` at create time, up to the plan's maximum disk.

## Common questions

| Question | Answer |
| --- | --- |
| How is CreateOS Sandbox priced? | You pay a simple per-second rate for the vCPU and memory of each running sandbox. Use the calculator to estimate monthly spend by shape, runtime, and count. There are no minimums and no monthly commitment. |
| Do you charge for egress or paused sandboxes? | No egress fees. Paused sandboxes are not billed for vCPU; memory and storage are still charged, with your state preserved so you can resume in place. |
| Can I lower cost by pausing? | Yes. Pause a sandbox to stop paying for idle vCPU; memory and storage are still charged. Set auto-pause after a period of inactivity and resume in place when you need it again. |
| Can I bring my own storage? | Yes. Sync the ephemeral disk to Amazon S3, MinIO, or Cloudflare R2, or mount your own object storage, so your work persists past the VM. |

## Run sandboxes without the surprises

- Book a demo, or see how CreateOS Sandbox compares.
- **CTAs:** Book a demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile · Compare alternatives -> https://createos.sh/alternatives

## Related
- Up: [[Pricing]]
- [[Product - Sandbox]]: product page
- [[Docs - Sandbox Limits]]: limits and defaults
- [[Docs - Account and Billing]]: tiers, credits, top-ups
- [[Product - Sandbox Reliability]]: pause, fork, quota behaviour
- [[Comparisons]] · [[Alternatives]]: pricing and feature comparisons with other sandboxes
- [[For Agents]]: per-second pricing cited for agent workloads
- [[Hackathon Overview]]
