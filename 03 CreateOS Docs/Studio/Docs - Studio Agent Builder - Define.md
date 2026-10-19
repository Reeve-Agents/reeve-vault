---
aliases:
  - Studio Define
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Agent-Builder/Define
sources:
  - https://createos.sh/docs/studio/Agent-Builder/Define
  - https://createos.sh/docs/studio/Agent-Builder/Define/Goals-And-Instructions
  - https://createos.sh/docs/studio/Agent-Builder/Define/Model-Gateway
  - https://createos.sh/docs/studio/Agent-Builder/Define/Skills
scraped: 2026-10-17
up: "[[Docs - Studio Agent Builder]]"
---

# Docs - Studio Agent Builder - Define

> [!summary] Summary
> - **Define** answers "who is this agent?": the job description (goal, instructions, skills) and the model it thinks with.
> - Goal = what the agent is for (one sentence); Instructions = how it behaves; Skills = rules shared by several agents; Model = how much thinking power.
> - Model IDs are three-part (`openrouter/openai/gpt-4o-mini`); credentials are encrypted with AES-256-GCM and never returned.
> - Source: https://createos.sh/docs/studio/Agent-Builder/Define

## Define
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Define
- **Summary:** Stage overview. Before an agent knows anything about the company or touches any app, it needs a job description and a model.
- **Key points:**
  - Covers three pages: Goals and Instructions (name, goal, instructions; agents answer as text), Skills (reusable instruction blocks written once, attached to many agents), Model Gateway (connect providers, choose a model, control which models the team may use).
  - Rule of thumb: Goal = what, one sentence. Instructions = how, as long as needed. Skills = rules shared by several agents. Model = how much thinking power.

## Goals & Instructions
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Define/Goals-And-Instructions
- **Summary:** The Identity and Instructions sections of the builder; described as the single highest-leverage screen in Studio (most agent problems are instruction problems).
- **Key points:**
  - **Identity fields:** **Name** (required; shown in the Agent Hub and in traces). **Goal** (required to publish; one sentence stating the job; the agent does read it).
  - **Good goal:** names the job, the input and the output. Example: "Read an incoming support email, decide its category and urgency, and draft a first reply." (vs vague "Help with support.")
  - **Instructions:** the operating manual (goal = what, instructions = how). No length limit; a full-screen editor is available.
  - **Structure that works:** sections `ROLE`, `STEPS` (numbered), `RULES`, `WHEN YOU ARE UNSURE`, `FORMAT` (example given: support triage assistant for B2B customers; Category, Urgency Low/Medium/High, draft reply of at most 150 words).
  - **Six habits:** be specific about the negative; give it a way out when unsure; number the steps; show the output shape with a worked example; put rules where they apply; change one thing at a time and re-test in the sandbox.
  - If a block applies to more than one agent (brand voice, escalation policy, report format), move it into a Skill.
  - **Troubleshooting:**
    - Answers too long: state a hard limit ("at most 150 words", "exactly three bullets").
    - It invents facts: attach a Knowledge base and add "Answer only from the provided documents. If the answer is not there, say so."
    - It ignores a rule: move the rule into its own `RULES` section, phrased as a prohibition.
    - Tone inconsistent: put tone rules in a skill attached to every agent that needs them.
    - Answer shape drifts: put the format in its own `FORMAT` section with a worked example.
  - Page contains a video placeholder (2 min) on turning a vague instruction into a specific one.

## Model Gateway
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Define/Model-Gateway
- **Summary:** How Studio talks to AI providers. An admin connects a provider once; everyone else picks a model from a list. One connection point means one place to rotate a key, set an allowlist and see spend.
- **Key points:**
  - **Supported providers:** **OpenAI** (API key), **Anthropic** (API key), **AWS Bedrock** (Bedrock API key and an AWS region, e.g. `us-east-1`), **OpenRouter** (API key).
  - **Connect a provider:** requires `connector_model: create`, held by **admin** and the built-in **AIOps Manager** role. Sidebar **Models** -> **Connect provider** -> choose provider -> paste credential, add a label (e.g. "Production OpenAI"), save.
  - Studio then validates the credential against the provider, encrypts it with **AES-256-GCM** in the internal vault, registers the provider with the gateway and marks it **Connected**. The credential is never returned (not by UI, API or to an agent); it can be replaced but not read back.
  - **Model IDs** are three-part: `openrouter/openai/gpt-4o-mini` = gateway provider / vendor / model. Studio stores and sends the full ID unchanged.
  - **Allowlist:** per provider, an admin controls which models appear in the agent model picker (keep expensive frontier models off limits, standardise on one or two models, retire a model centrally).
  - **Per-member keys:** each member gets their own scoped gateway key on joining, used only server-to-server and never sent to the browser, so model spend is attributable to the person who ran the agent (basis for per-run cost in traces and Usage).
  - **Managing connections:** Update (replace credential or change configuration); Disconnect (provider unusable, agents pointing at its models fail to resolve a model); Reconnect; Delete. Each writes an audit row.
  - **Troubleshooting:**
    - "Agent model could not be resolved": no connected provider serves the model or it is not allowlisted; reconnect the provider or add the model to the allowlist.
    - Model picker is empty: no provider connected; ask an admin.
    - Retryable conflict on save: two admins edited the same provider at once; wait and retry.
    - Credential rejected: check the key (and the region for Bedrock).

## Skills
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Define/Skills
- **Summary:** A skill is a named block of instructions written once and attached to many agents; editing it updates every agent that uses it.
- **Key points:**
  - **Good candidates:** brand voice and tone, escalation policy, report or email templates, compliance wording, citation formatting. **Keep in instructions:** anything unique to one agent, its step-by-step job, one-off phrasing tweaks.
  - **Three parts (all required):** **Name** (short, e.g. "Acme brand voice"), **Description** (one line), **Content** (instructions in Markdown). Studio records each skill's size.
  - **Create:** sidebar **Skills** -> **Create skill** -> fill in name, description, content -> save. The builder's Skills section also has a **Create skill** shortcut.
  - **Attach:** Agent Builder -> **Skills** -> **Add skill**. Needs **Editor** on the agent and at least **Viewer** on the skill. Detaching affects only that agent.
  - **Sharing levels:** Viewer (read and attach to agents they can edit), Editor (change name, description, content), Admin (delete and share). Share with a person, a group or the whole organization.
  - **Warning:** editing a skill changes every agent using it, immediately; check the sharing list first.

## Related
- Up: [[Docs - Studio Agent Builder]]
- [[Docs - Studio Agent Builder - Ground]]: next stage (knowledge base and memory)
- [[Docs - Studio Agent Builder - Govern]]: audit of connector changes, RBAC permissions such as `connector_model`
- [[Docs - Studio Agent Builder - Operate]]: Sandbox for re-testing instruction changes
- [[Docs - Studio]]: Studio hub (Getting Started covers connecting a model provider)
- [[Product - Gateway]]: CreateOS gateway product page
