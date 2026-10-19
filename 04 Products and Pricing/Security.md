---
aliases:
  - CreateOS Security
tags:
  - createos/product
  - type/page
source: https://createos.sh/security
scraped: 2026-10-17
up: "[[Products]]"
---

# Security

> [!summary] Summary
> - "Security is the product, not a setting": every request is governed before it reaches a model and every response is validated before it reaches a user.
> - ISO 27001 certified · SOC 2 Type II certified · Zero data retention · No training on your data.
> - Encryption: TLS in transit, AES-256 at rest; SAML/SSO, role-based access, per-team scoping.
> - Vulnerability reports: security@nodeops.xyz (acknowledged within two business days; safe harbor for good-faith research).
> - Source: https://createos.sh/security

## Security is the product, not a setting

- CreateOS governs every request before it reaches a model and validates every response before it reaches a user. Sovereign, zero data retention, secure from the first call.
- **Badges:** ISO 27001 certified · SOC 2 Type II certified · Zero data retention · No training on your data
- **CTA:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- The page also carries the shared CreateOS Skills banner; details in [[Products]].

## Controls on every request and every response

| Control | What it does |
| --- | --- |
| Governed inference | Prompt-injection checks, policy validation, and access controls run before the model sees a request. |
| Output validation | Hallucination checks, PII masking, and content filtering run before any response reaches a user. |
| Zero data retention | Prompts and documents are processed in-session. Nothing is stored by default. |
| Full audit trail | Every call is logged with execution traces and SOC visibility across agents and workflows. |
| Sovereign deployment | Run in CreateOS cloud, your VPC, or fully on-prem. Region-aware compute, no cross-border exposure. |
| No training on your data | Your prompts, documents, and outputs are never used to train models, ours or a provider's. |

## Built to the standards regulated enterprises require

| Standard | Status | Detail |
| --- | --- | --- |
| ISO 27001 | Certified | Information security management certified to the global standard. |
| SOC 2 Type II | Certified | Independently verified controls for enterprise data protection. |
| Zero Data Retention | Privacy | In-session processing. Nothing stored by default. |
| Sovereign Infrastructure | Residency | Region-aware compute with no cross-border data exposure. |

## Where your data lives and how it moves

| Area | How it works |
| --- | --- |
| Encrypted in transit and at rest | TLS in transit, AES-256 at rest, across every deployment mode. |
| Region residency | Pin processing to a region. No cross-border data exposure. |
| Access controls | SAML/SSO, role-based access, and per-team scoping on every workflow. |
| Subprocessor transparency | A current list of subprocessors and a DPA are available on request. |

## Report a vulnerability

- Security researchers are welcome to report issues: email the details to the security team.
- Acknowledgement within two business days; CreateOS works with the reporter on a fix; safe harbor for good-faith research.
- **Contact:** security@nodeops.xyz (mailto:security@nodeops.xyz)

## Security questions, answered

| Question | Answer |
| --- | --- |
| Do you train models on our data? | No. Your prompts, documents, and outputs are never used to train CreateOS models or any provider's models. Data is processed in-session and not retained by default. |
| Where is our data processed? | You choose. CreateOS runs in our cloud, inside your VPC, or fully on-premise. Compute is region-aware, so you can pin processing to a region with no cross-border exposure. |
| What certifications do you hold? | ISO 27001 and SOC 2 Type II certified. Reports and controls documentation can be shared under NDA. Operates on zero-data-retention, sovereign infrastructure. |
| How do you handle PII? | Output validation masks PII and filters content before any response reaches a user. You can configure policies per workflow and per team. |
| Can we use our own SSO and access controls? | Yes. CreateOS supports SAML/SSO and role-based access controls, scoped per team and per workflow. |
| Can we get a DPA and subprocessor list? | Yes. A Data Processing Agreement and a current subprocessor list are available on request. Email hello@nodeops.xyz. |

## Talk to security

- **CTA:** book_a_demo -> https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile

## Related
- Up: [[Products]]
- [[Egress Governance]]: kernel-enforced egress for sandboxed code
- [[Sandbox Networking]]: private overlay networks, default-deny between networks
- [[Self-Host]]: enterprise-only run on your own infrastructure
- [[Docs - Sandbox Security and Self-Hosting]]: Sandbox security docs
- [[Product - Sandbox Reliability]]: failure containment
- [[Privacy and Terms]]: privacy policy and terms
- [[Contact and Community]]
- [[Industries]]: regulated-industry use cases
- [[CreateOS Homepage]]
