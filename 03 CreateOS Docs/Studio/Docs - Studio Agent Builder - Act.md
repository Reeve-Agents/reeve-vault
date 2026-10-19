---
aliases:
  - Studio Act
  - Studio Tools
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Agent-Builder/Act
sources:
  - https://createos.sh/docs/studio/Agent-Builder/Act
  - https://createos.sh/docs/studio/Agent-Builder/Act/Tools
scraped: 2026-10-17
up: "[[Docs - Studio Agent Builder]]"
---

# Docs - Studio Agent Builder - Act

> [!summary] Summary
> - **Act** answers "what can this agent actually do?": tools let an agent read and change things in real systems (email, Slack, Notion, Salesforce).
> - Nine toolkits are listed: Gmail, Google Calendar, Google Drive, Google Docs, Google Sheets, Slack, Notion, Salesforce, SAP SuccessFactors.
> - Each toolkit on an agent runs in one of two modes: **Sign in individually** (default) or **Shared**.
> - Source: https://createos.sh/docs/studio/Agent-Builder/Act

## Act
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Act
- **Summary:** Stage overview. Up to this stage an agent can only talk; tools let it send an email, post to Slack, create a Notion page or update a Salesforce record.
- **Key points:**
  - Contains one page, Tools: connect an app once with your own account, choose exactly which actions are exposed, decide whether the agent uses your account or a shared one.
  - Warning: this is the stage that changes the outside world (a sent email is not reversible). Read Guardrails and RBAC before giving an agent write access to a production system.

## Tools
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Act/Tools
- **Summary:** Connect Gmail, Slack, Notion, Salesforce and more, and control exactly what an agent may do with them.
- **Key points:**
  - **Vocabulary:** **Toolkit** (a connected app), **Action** (one thing a toolkit can do, e.g. "send email"), **Account** (your login to that app, connected once and reusable across agents), **Binding** (link between one agent and one account).
  - **Available toolkits:**

    | Toolkit | Typical use |
    |---|---|
    | Gmail | Read, search, draft and send email |
    | Google Calendar | Read availability, create events |
    | Google Drive | Find and read files |
    | Google Docs | Create and edit documents |
    | Google Sheets | Read and write spreadsheet data |
    | Slack | Post messages, read channels |
    | Notion | Search, read and create pages |
    | Salesforce | Read and update CRM records |
    | SAP SuccessFactors | Read HR data |

  - **Connect an app:** sidebar **Tools** -> pick a toolkit -> **Connect** -> sign in and approve at the provider -> back in Studio choose which actions the account exposes -> label the account (e.g. "Support inbox") -> save. The account is connected under your user and not reachable by other members unless you share it with an agent.
  - **Choosing actions:** only ticked actions can ever be used (the narrowest, most important control); tick the fewest that do the job (a read-only agent should not get "send email"). The action list is **frozen at connect time**; new provider actions are not added silently, re-open the account and save again to pick them up.
  - **Attach to an agent:** Agent Builder -> **Tools** -> **Add tool** -> pick a toolkit -> pick which of your accounts.
  - **Whose account:**

    | Mode | Account used | Use when |
    |---|---|---|
    | **Sign in individually** (default) | The account of whoever is running the agent | Personal assistants; each person's agent touches only their own inbox, calendar or workspace |
    | **Shared** | One bound account for every runner | Team mailboxes, service accounts, a shared Slack bot |

  - **Shared means:** everyone who runs the agent acts as the bound account, their actions appear in the app as that account, and teammates' personal bindings for that toolkit become dormant (redirected to the shared account). Setting **Shared** requires **Editor** on the agent; binding your own personal account requires only **Viewer**; the mode change gets its own audit row. A binding arriving without a mode isolates the credential rather than sharing it.
  - **Reach:** an agent's reach through a tool is the intersection of the actions ticked on the account and what the provider allows that account to do. Two agents on the same account have the same reach; for different reach, connect the app twice with different action sets.
  - **Disconnecting:** from the Tools page; Studio removes its record and asks the provider to revoke the grant; agents bound to it lose that toolkit.
  - **What gets recorded:** connecting, changing exposed actions, disconnecting, binding an account to an agent, and changing shared/individual mode (own row) go to Audit logs; each individual tool call in a run goes to Audit traces with arguments, result and duration.
  - **Safety checklist before going live:** only necessary actions ticked; write actions (send, delete, update) genuinely needed; mode is Sign in individually unless shared is intended; agent shared with the smallest sensible group; a Guardrails connection attached; instructions tell the agent to ask before any irreversible action; tested in the Sandbox against a test account first.
  - Page contains a video placeholder (60 sec) on connecting Gmail end to end.

## Related
- Up: [[Docs - Studio Agent Builder]]
- [[Docs - Studio Agent Builder - Ground]]: previous stage
- [[Docs - Studio Agent Builder - Govern]]: Guardrails, RBAC, Audit logs and Audit traces referenced by the Tools page
- [[Docs - Studio Agent Builder - Operate]]: Sandbox, where tools are tested
- [[Docs - Studio Enterprise Use Cases]]: tool choices per industry
- [[Product - Agents]]: CreateOS agents product page
