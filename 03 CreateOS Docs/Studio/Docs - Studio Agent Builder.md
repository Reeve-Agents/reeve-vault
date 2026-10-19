---
aliases:
  - Studio Agent Builder
  - Agent Builder
tags:
  - createos/docs
  - createos/docs/studio
  - type/hub
source: https://createos.sh/docs/studio/Agent-Builder
scraped: 2026-10-17
up: "[[Docs - Studio]]"
---

# Docs - Studio Agent Builder

> [!summary] Summary
> - The Agent Builder is where a Studio agent is created and changed: a two-pane screen with Configuration on the left and a live Playground on the right.
> - Docs are organised by the five stages: Define, Ground, Act, Govern, Operate. Each stage has its own note (links below).
> - Publishing needs a name, goal, instructions, model and valid output format; sharing has three levels (Viewer, Editor, Admin).
> - Source: https://createos.sh/docs/studio/Agent-Builder

## Stage notes

| Stage | Note | Pages covered |
|---|---|---|
| Define | [[Docs - Studio Agent Builder - Define]] | Define, Goals and Instructions, Model Gateway, Skills |
| Ground | [[Docs - Studio Agent Builder - Ground]] | Ground, Knowledge base, Memory |
| Act | [[Docs - Studio Agent Builder - Act]] | Act, Tools |
| Govern | [[Docs - Studio Agent Builder - Govern]] | Govern, Guardrails, Audit logs, Audit traces, Usage, RBAC teams and permissions |
| Operate | [[Docs - Studio Agent Builder - Operate]] | Operate, Sandbox |

## Agent Builder
- **URL:** https://createos.sh/docs/studio/Agent-Builder
- **Summary:** Describes the builder layout, the agent lifecycle, the sharing levels and where each builder section is documented. Sub-pages cover each section in depth.
- **Key points:**
  - **Layout:** two panes. Left = **Configuration** (everything about the agent, in order). Right = **Playground** (live chat with the agent as currently configured). A sticky section bar jumps between sections.
  - **Builder sections to docs:**

    | Builder section | Stage | What you set | Docs |
    |---|---|---|---|
    | Identity | Define | Name, goal | Goals and Instructions |
    | Instructions | Define | How the agent behaves | Goals and Instructions |
    | Model and Output | Define | Which model answers | Model Gateway |
    | Skills | Define | Reusable instruction blocks | Skills |
    | Knowledge | Ground | Documents the agent can search | Knowledge base |
    | Memory | Ground | What it remembers between conversations | Memory |
    | Tools | Act | Apps it may use | Tools |
    | Guardrails | Govern | Safety checks on input and output | Guardrails |
    | Share with | Govern | Who can view, edit or administer it | RBAC, teams and permissions |

  - **Saving and publishing:**
    - Changes are saved on the agent, not on a draft copy; leaving with unsaved edits triggers a warning.
    - **Publish** validates the agent and moves it to **Active**.
    - **Pause**, **Archive** and **Restore** are in the agent's menu.
  - **Lifecycle (state diagram):** create -> Draft; Draft -> Active (publish); Active -> Paused (pause); Paused -> Active (resume); Active -> Archived (archive); Paused -> Archived (archive); Archived -> Active (restore).
  - **Publishing requires:** a name, a goal, instructions, a model and a valid output format. Anything missing blocks the publish with a message.
  - **Who can change what (sharing levels):**
    - **Viewer**: open the agent, run it, see its sessions.
    - **Editor**: everything a viewer can, plus edit configuration, attach knowledge/skills/tools, publish, pause, archive.
    - **Admin**: everything an editor can, plus delete the agent and re-share it.
    - Share with a **person**, a **group**, or the **whole organization**.
  - **Suggested build order:** 1) goal and instructions, 2) model (try a smaller model first, move up only if quality demands it), 3) knowledge, 4) tools (one at a time, test after each), 5) guardrails (before sharing widely), 6) share (start with a small group).
  - **In this section:** Define (Goals and Instructions, Skills, Model Gateway); Ground (Knowledge base, Memory); Act (Tools); Govern (Guardrails, Audit logs, Audit traces, Usage, RBAC); Operate (Sandbox).

## Related
- Up: [[Docs - Studio]]
- [[Docs - Studio Agent Builder - Define]]: Define stage
- [[Docs - Studio Agent Builder - Ground]]: Ground stage
- [[Docs - Studio Agent Builder - Act]]: Act stage
- [[Docs - Studio Agent Builder - Govern]]: Govern stage
- [[Docs - Studio Agent Builder - Operate]]: Operate stage
- [[Product - Agents]]: CreateOS agents product page
- [[Studio Early Access]]: request access to Studio
