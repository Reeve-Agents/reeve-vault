---
aliases:
  - Sandbox Security
  - Sandbox Self-Hosting
  - Bring your own storage
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Security
sources:
  - https://createos.sh/docs/Sandbox/Security
  - https://createos.sh/docs/Sandbox/Self-Hosting
  - https://createos.sh/docs/Sandbox/Bring-Your-Own-Storage
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Security and Self-Hosting

> [!summary] Summary
> - Security model: egress enforced on the host outside the sandbox; API key never enters a sandbox; every sandbox is a Firecracker microVM with its own guest kernel; audit events kept 90 days (in-sandbox activity not recorded yet).
> - Self-hosting (own hardware, cloud account or on-premise) is enterprise only, onboarded with the CreateOS team; expect slower boot (6-10x seen with nested virtualization).
> - Bring your own storage (BYOS3): register any S3-compatible bucket as a disk (AWS S3, Cloudflare R2, Tigris, MinIO) and mount it into a sandbox; credentials AES-256-GCM encrypted at rest and never returned.
> - Sources: https://createos.sh/docs/Sandbox/Security , /Self-Hosting , /Bring-Your-Own-Storage

## Security model
- **URL:** https://createos.sh/docs/Sandbox/Security
- **Summary:** The Sandbox security model on one page: what enforces egress, where credentials live, how sandboxes are isolated, what the audit log covers, and what self-hosting offers today.
- **Key points:**

| Boundary | What enforces it | Where it stops |
|---|---|---|
| **Egress** | Rules are enforced on the host, outside the sandbox, so code inside cannot change or bypass them. IP, CIDR and port rules are matched in the host kernel; domain rules are matched on the TLS server name (HTTPS) or `Host` header (HTTP). No rules means open. Once any rule is set, everything not listed is denied. | Domain rules are tight for HTTPS, where TLS verifies the name. For plain HTTP, allow by IP or CIDR instead of by domain. (See Egress REST page.) |
| **Credentials** | Your API key stays on your machine and never enters a sandbox. Hand a worker a scoped access token for one sandbox instead. `envs` and disk credentials are write-only through the API and never returned in any response. Disk credentials are encrypted at rest. | Anything put *into* a sandbox is readable by code running in it: `envs`, files you upload, and the keys of any attached disk (needed to mount the bucket). Give disks bucket keys scoped to that bucket only. |
| **Isolation** | Every sandbox is a Firecracker microVM with its own guest kernel, filesystem and network identity. Sandboxes cannot reach each other unless on the same private network. | Disks are the one thing sandboxes can share. A disk belongs to one account; only that account's sandboxes can attach it. Several of your sandboxes can mount the same disk at once and see the same bucket, with S3's last-write-wins semantics. Bucket contents are governed by your bucket policy. |
| **Audit** | Control-plane actions are recorded as audit events: sandbox create, destroy, pause, resume, fork, resize, egress and SSH-key changes; disk, network, template and device changes. Events cannot be edited or deleted through the API and are kept for 90 days. | Activity *inside* a sandbox is not recorded yet: commands, file reads and writes, processes, and network traffic. |
| **Self-host** | Run sandboxes on your own hardware, cloud account or on-premise, so compute and data stay in your environment. | Enterprise customers only, onboarded with the CreateOS team. |

- Questions or a security review: Discord https://discord.gg/nodeops

## Run on your own infrastructure (enterprise only)
- **URL:** https://createos.sh/docs/Sandbox/Self-Hosting
- **Summary:** Enterprise-only option to run sandboxes on your own hardware, cloud account or on-premise; CreateOS onboards your machines into its data plane.
- **Key points:**
  - Enterprise customers only; onboarding is done directly with the CreateOS team as part of an enterprise engagement (contact via https://discord.gg/nodeops).
  - Sandboxes run on your infrastructure, so compute and data stay in your environment. Fits teams with compliance, data-residency or air-gap requirements.
  - Performance caveat (page warning): figures in the Limits page are measured on CreateOS-managed infrastructure. On your machines, boot, snapshot and resume speed follow your hardware, storage and network; sandboxes will be slower. Where nested virtualization is in the path (tier-1 cloud instances), 6-10x slowdowns have been seen. Bare metal avoids that. Benchmark the fleet before committing.
  - Onboarding is gated: you bring the machines; CreateOS connects them and manages the platform.
  - Only need data in your own bucket? Not required: see Bring your own storage below.
  - Product page: https://createos.sh/self-host . Region list (`eu`, `us` of the managed control plane) is on the Limits page.

## Bring your own storage (BYOS3)
- **URL:** https://createos.sh/docs/Sandbox/Bring-Your-Own-Storage
- **Summary:** Mount your own S3-compatible bucket into a sandbox as a filesystem path; you retain control of the bucket, its region and its objects.
- **Key points:**
  - Bucket location is one part of data residency. Choose the sandbox compute region too: data read from the bucket can enter sandbox memory or be copied to its root filesystem. Pause snapshots preserve memory and root-disk state in separate platform storage; discuss snapshot location and retention with the CreateOS team if you have residency requirements.

### Works with any S3-compatible store
A disk is registered with an endpoint, bucket, region and credentials.

| Provider | Notes |
|---|---|
| **AWS S3** | `endpoint: https://s3.amazonaws.com`, set your `region`. |
| **Cloudflare R2** | `region` defaults to `auto`. |
| **Tigris** | S3-compatible endpoint; set `region` per your bucket. |
| **MinIO** (self-hosted) | Set `use_path_style: true`. |

- Credentials are encrypted at rest (AES-256-GCM), write-only, and **never returned** in any API response.

### Storage ownership and location
- **Your bucket, your region:** you choose the bucket location for objects written through the mount; this does not determine the location of compute, copies, or snapshots.
- **Your provider, your controls:** bucket policies, versioning, encryption keys and audit logging stay under your account.
- **Detach preserves objects:** detaching removes the mount without deleting the bucket or its objects.

### How to mount a bucket
1. Register the bucket as a disk:
```bash
curl -X POST https://api.sb.createos.sh/v1/disks \
  -H "X-Api-Key: $CREATEOS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "eu-data",
    "kind": "s3",
    "config": {
      "bucket": "my-eu-bucket",
      "endpoint": "https://s3.eu-central-1.amazonaws.com",
      "region": "eu-central-1"
    },
    "credentials": {
      "access_key": "AKIA…",
      "secret_key": "wJalrX…"
    }
  }'
```
   - The API probes the bucket at registration time to catch typos early. For MinIO and most self-hosted S3 stores add `"use_path_style": true` to `config`.

2. Attach it to a sandbox (at create time, or live to a running sandbox):
```bash
curl -X POST https://api.sb.createos.sh/v1/sandboxes/$SANDBOX_ID/disks \
  -H "X-Api-Key: $CREATEOS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"disk_id": "eu-data", "mount_path": "/mnt/data"}'
```
   - The in-VM agent mounts it within ~1 second. Files written under `/mnt/data` land in your bucket. Use `sub_path` to mount only a prefix (e.g. `"sub_path": "team-a/"`).

3. Detach when done:
```bash
curl -X DELETE \
  "https://api.sb.createos.sh/v1/sandboxes/$SANDBOX_ID/disks/$DISK_ID?mount_path=/mnt/data" \
  -H "X-Api-Key: $CREATEOS_API_KEY"
```
   - Only the mount is dropped; the bucket and its contents remain.

- Full reference: Disks REST API and the SDK how-to "Disks, networks and templates" ([[Docs - Sandbox REST API]], [[Docs - Sandbox SDK]]). CLI equivalent: `createos sandbox disk` ([[Docs - Sandbox CLI]]).

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox Limits]]: egress defaults, secrets limits, regions, plan caps
- [[Docs - Sandbox Overview and Concepts]]: egress, disk and SSH gateway concepts
- [[Self-Host]]: product page for running Sandbox on your own infrastructure
- [[Egress Governance]]: product view of egress allowlists
- [[Security]]: CreateOS security page
- [[Sandbox Networking]]: private networks between sandboxes
