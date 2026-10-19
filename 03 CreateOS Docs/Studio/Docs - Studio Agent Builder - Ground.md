---
aliases:
  - Studio Ground
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Agent-Builder/Ground
sources:
  - https://createos.sh/docs/studio/Agent-Builder/Ground
  - https://createos.sh/docs/studio/Agent-Builder/Ground/Knowledge-Base
  - https://createos.sh/docs/studio/Agent-Builder/Ground/Memory
scraped: 2026-10-17
up: "[[Docs - Studio Agent Builder]]"
---

# Docs - Studio Agent Builder - Ground

> [!summary] Summary
> - **Ground** answers "what does this agent know?" with two mechanisms: a Knowledge base (uploaded documents) and Memory (facts from past conversations).
> - Knowledge base: PDF, DOCX/DOC, TXT, MD; up to 20 files at a time; default 5 passages per attached knowledge base per question.
> - Memory is fully automatic via Mem0, Supermemory or MaxiMem; scoped per organization, agent and user.
> - Source: https://createos.sh/docs/studio/Agent-Builder/Ground

## Ground
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Ground
- **Summary:** Stage overview. A model alone knows the general internet up to its training date, not your pricing, policies, customers or yesterday's conversation.
- **Key points:**
  - Knowledge base vs Memory:

    | | Knowledge base | Memory |
    |---|---|---|
    | Holds | Documents you upload | Facts learned from past conversations |
    | Written by | You, deliberately | The agent, automatically |
    | Changes | When you upload or delete a file | After every successful turn |
    | Good for | Policies, manuals, contracts, SOPs | Preferences, ongoing context |
    | Shared across agents | Yes, one knowledge base can attach to many agents | Scoped per organization, agent and user |

  - Use both: knowledge bases make an agent correct, memory makes it feel like it knows you.

## Knowledge base
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Ground/Knowledge-Base
- **Summary:** A collection of documents an agent can search while answering, so it answers from your material instead of guessing.
- **Key points:**
  - **Pipeline (automatic):** upload -> Parse -> Chunk -> Embed -> Index -> **Ready**. At question time the agent searches the index and relevant passages go to the model.
  - **Create:** sidebar **Knowledge Base** -> **Create a knowledge base** -> name -> **Create** -> upload documents on the knowledge base page.
  - **Supported files:** **PDF** (including scanned PDFs, text extracted), **DOCX / DOC**, **TXT**, **MD**. Drag or click to upload, up to **20 files at a time**.
  - **Document status:** **Uploading** (not searchable), **Uploaded** (stored, queued), **Processing** (parsed, chunked, embedded, indexed), **Ready** (searchable), **Failed** (failing stage shown). Failures retry automatically with back-off; a **Retry** button exists; a repeatedly failing file is usually a corrupt or password-protected PDF.
  - **Attach to an agent:** agent -> **Knowledge** -> **Add knowledge** -> pick one or more. Needs **Editor** on the agent and at least **Viewer** on the knowledge base. The agent searches automatically when a question calls for it.
  - Tip: add "Answer only from the attached documents. If the answer is not there, say you do not know." to the instructions.
  - **Search behaviour:** each attached knowledge base contributes up to **5 passages** per question by default; results include the source document and page range; search is strictly scoped to your organization on every query (not influenceable by a prompt or tool argument).
  - **Searchable only when all are true:** it is a vector knowledge base (the default); a vector store is configured; its embedding model is one Studio can query; at least one document is **Ready**. Otherwise the agent is simply not offered that knowledge base.
  - **Sharing:** Viewer (read documents, search, attach to agents they can edit), Editor (upload, delete, retry documents; rename), Admin (delete and share). Sharing a knowledge base shares its contents, since anyone who can attach it can read from it through an agent.
  - **Good practice:** one knowledge base per topic; keep documents current; prefer text-native files; use descriptive filenames (they appear in citations and traces); delete superseded versions.

## Memory
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Ground/Memory
- **Summary:** Lets an agent carry useful facts from one conversation into the next. Fully automatic: the agent has no memory tools and makes no decisions about it.
- **Key points:**
  - **Flow:** before the agent thinks, Studio retrieves relevant memories from the memory provider and adds them to what the agent sees; after a successful turn, the exchange is written back. No "agentic memory" mode exists.
  - Example contrast: knowledge base holds "The refund policy is 30 days."; memory holds "This customer is on the Enterprise plan and prefers email."
  - **Supported providers (all API key):** **Mem0**, **Supermemory**, **MaxiMem**.
  - **Set up:** (1) admin connects a provider: needs `connector_memory: create` (admin and built-in **AIOps Manager**); sidebar **Memory** -> **Connect provider** -> choose provider -> paste API key -> save (key encrypted, never returned). (2) Agent Builder -> **Memory** section -> pick the connection; needs only **Editor** on the agent. Every member can read memory connections by default. Clear the selection to turn memory off.
  - **Scope:** memories are separated by organization, agent and user; one person's memories do not leak into another person's conversations with the same agent.
  - **Outage behaviour:** if the provider is slow or down the run still goes ahead without memory and a warning is recorded on the run (visible in Audit traces).
  - **Good fit:** assistants used repeatedly by the same person, customer-facing agents recalling context, long-running projects and cases. **Poor fit:** one-shot extraction agents, runs that must be identical and reproducible, authoritative policy (use a Knowledge base).
  - **Warning:** memory stores conversation content with a third-party provider; before enabling for personal or regulated data, confirm the provider is approved under your data-processing policy and consider a Guardrails connection that redacts PII.

## Related
- Up: [[Docs - Studio Agent Builder]]
- [[Docs - Studio Agent Builder - Define]]: previous stage (goal, skills, model)
- [[Docs - Studio Agent Builder - Act]]: next stage (tools)
- [[Docs - Studio Agent Builder - Govern]]: Audit traces (retrieval steps, memory warnings), Guardrails (PII redaction), RBAC
- [[Docs - Studio Enterprise Use Cases]]: knowledge-base and memory settings per industry
