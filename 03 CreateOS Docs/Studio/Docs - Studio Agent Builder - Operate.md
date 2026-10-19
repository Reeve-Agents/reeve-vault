---
aliases:
  - Studio Operate
  - Studio Sandbox
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Agent-Builder/Operate
sources:
  - https://createos.sh/docs/studio/Agent-Builder/Operate
  - https://createos.sh/docs/studio/Agent-Builder/Operate/Sandbox
scraped: 2026-10-17
up: "[[Docs - Studio Agent Builder]]"
---

# Docs - Studio Agent Builder - Operate

> [!summary] Summary
> - **Operate** answers "is this agent working?": test changes, let the team use the agent, publish/pause/archive/restore, investigate bad answers, watch cost.
> - The Studio **Sandbox** is where you talk to an agent: the builder's **Playground** pane and the Agent Hub full-screen run view.
> - Core loop: change one thing, run in the sandbox, read the answer, open the trace if wrong, publish when right.
> - Source: https://createos.sh/docs/studio/Agent-Builder/Operate

## Operate
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Operate
- **Summary:** Stage overview. Building an agent is one afternoon; operating it is every day after.
- **Key points:**
  - What operating looks like:
    - Test a change before it ships: the **Playground** in the builder (see Sandbox).
    - Let your team use the agent: Agent Hub -> open the agent -> Run.
    - Publish, pause, archive or restore: the agent's menu in the builder or hub.
    - Investigate a bad answer: Audit traces.
    - Watch cost and volume: Usage.
  - Contains one page: Sandbox.

## Sandbox
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Operate/Sandbox
- **Summary:** Short overview of the Studio sandbox, where you talk to an agent and test changes.- **Key points:**
  - **Where it appears:** inside the Agent Builder as the right-hand pane labelled **Playground**; and in the Agent Hub as a full-screen run view for everyday use of a published agent.
  - **The loop:** change one thing -> run it in the sandbox -> read the answer -> open the trace if wrong -> change again; publish when right.
  - **What you can do:** send a message and watch the answer stream; queue a follow-up while it is working; stop a run; answer a question the agent asks and let it continue; start, rename and delete sessions; clear the Playground conversation.
  - **Good habits:**
    - Change one thing per run.
    - Keep a set of test questions and rerun after every meaningful edit.
    - Include awkward cases: empty input, wrong language, off-topic question, an attempt to make it break a rule.
    - Test tools against a test account first (a sent email cannot be unsent).
    - Open the trace when something is odd; it shows what actually happened.

## Related
- Up: [[Docs - Studio Agent Builder]]
- [[Docs - Studio Agent Builder - Govern]]: Audit traces and Usage, referenced for investigation and cost
- [[Docs - Studio APIs and SDKs]]: the Studio runtime API (Sandbox SDK page) is what the sandbox uses
- [[Docs - Sandbox SDK]]: CreateOS Sandbox product SDK docs (separate section of the docs)
- [[Product - Agents]]: CreateOS agents product page
