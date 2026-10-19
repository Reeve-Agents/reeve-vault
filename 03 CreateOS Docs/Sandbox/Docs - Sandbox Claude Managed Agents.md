---
aliases:
  - Claude Managed Agents on CreateOS Sandbox
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/Claude-Managed-Agents
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox Claude Managed Agents

> [!summary] Summary
> - With Claude Managed Agents, Anthropic runs the agent loop (model, context, tool choice); you supply the machine that runs the tool calls. CreateOS Sandbox is that machine.
> - Two wirings: **self-hosted environment** (`self_hosted`; worker `ant beta:worker poll` inside your sandbox runs the agent's built-in toolset) and **sandbox as a tool** (`cloud` environment; one custom `run_command` tool your orchestrator answers via CreateOS).
> - Cold start per fresh sandbox per call measured at 0.7 to 1.0 s (create, run, destroy).
> - Source: https://createos.sh/docs/Sandbox/Claude-Managed-Agents

## Run Claude Managed Agents on CreateOS Sandbox
- **URL:** https://createos.sh/docs/Sandbox/Claude-Managed-Agents
- **Summary:** Run Claude Managed Agents inside CreateOS Sandbox microVMs so each agent gets its own kernel, filesystem and egress allowlist; setup, credentials and cleanup.
- **Key points:**
  - Anthropic docs referenced: https://platform.claude.com/docs/en/managed-agents/overview and https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes
  - Anthropic keeps the orchestration; you keep the execution boundary: filesystem, network and logs. Sandbox boots in about a second, holds state as long as you keep it alive, egress controlled from outside.

### Two ways to wire it up
| | **Self-hosted environment** | **Sandbox as a tool** |
|---|---|---|
| Who runs the agent's bash | a worker **inside your sandbox** | your orchestrator, in a sandbox it owns |
| Anthropic environment type | `self_hosted` | `cloud` |
| Agent's tools | the built-in agent toolset (bash, file edit, …) | one custom tool you define |
| Credentials on your host | org key **+ environment key** | org key only |
| Who reaches out to whom | your worker polls Anthropic's work queue | Anthropic streams you a tool call; you answer it |
| Best for | full agentic coding, where the agent needs a real filesystem across a session | a narrow, auditable execution surface: the agent runs *this*, and nothing else |

#### Self-hosted environment
- Agent's own toolset runs in your sandbox. Anthropic hands work to a queue; a worker process inside the sandbox claims it, runs the tool call, posts the result back. No state leaves the sandbox.
```
Claude Managed Agent (Anthropic)   ──▶  work queue  ◀── worker polls
                                                          │
                                          ┌───────────────┴───────────────┐
                                          │  CreateOS sandbox             │
                                          │  ant beta:worker poll         │
                                          │  → the agent's bash runs here │
                                          └───────────────────────────────┘
```

#### Sandbox as a tool
- Anthropic hosts the agent loop (`cloud` environment); CreateOS is a discrete tool. The agent emits a `run_command` tool call; your orchestrator runs it in a sandbox it owns and hands output back.
```
Claude Managed Agent (Anthropic)
        │  agent.custom_tool_use  { command: "…" }
        ▼
your orchestrator  (holds the CreateOS API key — the agent never sees it)
        │  sandbox.runCommand("bash", ["-lc", command])
        ▼
CreateOS sandbox   ──── output ────▶  user.custom_tool_result
```
- Give the agent **only** the custom tool and omit the built-in agent toolset: CreateOS becomes its single execution path. The control-plane key stays on your host; every command passes through your code (log, rewrite or refuse).

### Prerequisites
- A CreateOS Sandbox API key and control-plane URL.
- An Anthropic **organization API key** with the Managed Agents beta enabled (Console → API keys).
- Self-hosted environment only: an **environment** and an **environment key** (Console → Environments → Generate environment key). The environment key authenticates the worker to its queue; separate credential from the org key, different auth scheme. A `cloud` environment needs neither.

### Set up a self-hosted environment
Anthropic side: create a `self_hosted` environment and generate an environment key.
```ts
const environment = await anthropic.beta.environments.create({
  name: "createos-workers",
  config: { type: "self_hosted" },
});
```
CreateOS side: boot a sandbox with the environment credentials in its environment, install the `ant` CLI, start the worker as a daemon (polls until you tear the sandbox down).
```ts
const sandbox = await Sandbox.create({
  shape: "s-4vcpu-4gb",
  rootfs: "devbox:1",
  envs: {
    ANTHROPIC_BASE_URL: "https://api.anthropic.com",
    ANTHROPIC_ENVIRONMENT_ID: environment.id,
    ANTHROPIC_ENVIRONMENT_KEY: environmentKey, // never the org key
  },
});

await sandbox.sh(`curl -fsSL "$ANT_RELEASE_URL" | tar -xz -C /usr/local/bin ant`);
await sandbox.sh(
  "nohup setsid ant beta:worker poll --workdir /workspace > /tmp/worker.log 2>&1 &",
);
```
Every session pointed at that environment now executes inside the sandbox:
```ts
const agent = await anthropic.beta.agents.create({
  name: "createos-worker",
  model: "claude-haiku-4-5",
  tools: [{ type: "agent_toolset_20260401" }],
});
const session = await anthropic.beta.sessions.create({
  agent: agent.id,
  environment_id: environment.id,
});
```
- Only the **environment key** sits inside the sandbox. The org key stays on your host, so a prompt injection that compromises the agent cannot spend your organization's credits or read your other sessions.

### Set up sandbox-as-a-tool
Create a `cloud` environment and an agent whose only tool is yours.
```ts
const environment = await anthropic.beta.environments.create({
  name: "createos-tool",
  config: { type: "cloud", networking: { type: "unrestricted" } },
});

const agent = await anthropic.beta.agents.create({
  name: "createos-tool-agent",
  model: "claude-haiku-4-5",
  system:
    "Your only way to run anything is the run_command tool, which runs a shell " +
    "command on a remote Linux machine. Report its output verbatim.",
  // No agent_toolset: the agent has no bash of its own, so every command it
  // wants to run must go through CreateOS.
  tools: [
    {
      type: "custom",
      name: "run_command",
      description: "Run a shell command on the remote Linux machine.",
      input_schema: {
        type: "object",
        properties: { command: { type: "string" } },
        required: ["command"],
      },
    },
  ],
});
```
Then run the loop. Open the event stream **before** sending the task (events emitted in between are lost) and answer every tool call.
```ts
const session = await anthropic.beta.sessions.create({
  agent: agent.id,
  environment_id: environment.id,
});

const stream = await anthropic.beta.sessions.events.stream(session.id);
await anthropic.beta.sessions.events.send(session.id, {
  events: [{ type: "user.message", content: [{ type: "text", text: task }] }],
});

for await (const event of stream) {
  if (event.type === "agent.custom_tool_use") {
    const output = await runInSandbox(String(event.input.command));
    await anthropic.beta.sessions.events.send(session.id, {
      events: [
        {
          type: "user.custom_tool_result",
          custom_tool_use_id: event.id,
          content: [{ type: "text", text: output }],
        },
      ],
    });
  } else if (event.type === "session.status_idle") {
    // `requires_action` means the agent is idle *waiting on your tool result* —
    // the run is not over. Only a real stop reason ends it.
    if (event.stop_reason?.type === "requires_action") continue;
    break;
  }
}
```

#### Sandbox lifecycle: per session, or per call
`runInSandbox` is where you choose the agent's world.
- **One sandbox per session:** create before the session starts, reuse for every tool call, destroy at the end. State persists (a file written in one call is there in the next).
- **A fresh sandbox per call:** create, run, destroy every time. Nothing carries between calls; blast radius is a sandbox already thrown away. Cold start per call measured on CreateOS at **0.7 to 1.0 s** end to end (create, run, destroy).
- Pick per-call for untrusted or one-shot work, per-session for anything that needs to accumulate.

### Why CreateOS (as listed)
- **Egress you control from outside the sandbox:** `setEgress` locks a sandbox to an allowlist enforced outside it. Hostname rules cover HTTP/HTTPS; use IP/CIDR rules for other ports. Verify the workload's required network access before starting it.
- **Hardware isolation:** each sandbox runs its own kernel rather than sharing one across containers.
- **~1 s cold start:** fresh sandbox per tool call costs 0.7 to 1.0 s.
- **State when you want it:** pause and resume, snapshot, or reattach a disk, so a session survives an idle user without burning compute.
- **Your keys stay yours:** in both topologies the CreateOS API key lives on your host; in sandbox-as-a-tool every command passes through your code first.

### Gotchas
- **An empty tool result is rejected.** Managed Agents rejects a tool result with no content; send something, even `(no output)`.
- **Report command failures, do not throw them.** `Sandbox.sh` throws on a non-zero exit, which breaks the run inside a tool body. Use `runCommand` and hand back the exit code with the output:
```ts
const { result } = await sandbox.runCommand("bash", ["-lc", command]);
const output = `${result.stdout}${result.stderr}`.trim() || "(no output)";
return result.exit_code === 0 ? output : `exit ${result.exit_code}\n${output}`;
```
- **Hold the stream open.** In sandbox-as-a-tool the agent blocks on your tool result; if the orchestrator drops the stream mid-call, the session strands. A single-shot script works as written; a long-lived service needs reconnect handling.
- **`session.status_idle` does not mean the run is over.** It fires with `stop_reason.type: "requires_action"` while the agent waits on you. Break only on a real stop reason.
- **Anthropic does not stage files for you.** A self-hosted sandbox starts empty (no repo, no session files). Pass what the agent needs through `session.metadata` and have your worker fetch it.

### Working examples
All five run end to end against a live control plane (repo: https://github.com/NodeOps-app/createos-sandbox-sdk).

| Example | Topology | What it shows |
|---|---|---|
| 36: self-hosted agent worker (`examples/36-self-hosted-agent-worker`) | self-hosted | one persistent sandbox running the worker |
| 37: sandbox per session (`examples/37-self-hosted-sandbox-per-session`) | self-hosted | a fresh sandbox and worker per session |
| 49: egress-locked worker (`examples/49-egress-locked-agent-worker`) | self-hosted | the agent reaches a private service but cannot exfiltrate |
| 50: sandbox as a tool, per session (`examples/50-cloud-agent-sandbox-tool`) | sandbox-as-a-tool | one sandbox for the session; state survives between tool calls |
| 51: sandbox as a tool, per call (`examples/51-cloud-agent-sandbox-per-call`) | sandbox-as-a-tool | a disposable sandbox per call; the same task, and the state is gone |

- Examples 50 and 51 run the same two-step task (write a file, then read it back in a separate tool call) so the two lifecycles can be compared.

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox SDK]]: SDK used in the TypeScript snippets (`Sandbox.create`, `runCommand`, `setEgress`)
- [[Docs - Sandbox Integrations]]: other agents and harnesses run on Sandbox
- [[Docs - Sandbox Limits]]: shapes, images, egress defaults
- [[Egress Governance]]: product view of egress allowlists
- [[Hackathon Ideas]]: hackathon project ideas
