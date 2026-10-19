---
aliases:
  - Sandbox SDK
  - CreateOS Sandbox SDKs
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/hub
source: https://createos.sh/docs/Sandbox/SDK/
sources:
  - https://createos.sh/docs/Sandbox/SDK/
  - https://createos.sh/docs/Sandbox/SDK/Overview
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox SDK

> [!summary] Summary
> - SDKs exist for TypeScript, Go, Python, Rust, C# and Java; TypeScript (`@nodeops-createos/sandbox`) is the one with Quickstart, Tutorial, How-To, Reference and Concepts docs.
> - TypeScript reads `CREATEOS_SANDBOX_API_KEY`; Go, Python, Rust, C# and Java read `CREATEOS_API_KEY`; all six accept optional `CREATEOS_SANDBOX_BASE_URL`.
> - Every SDK call maps to one documented REST endpoint at `https://api.sb.createos.sh`.
> - Source: https://createos.sh/docs/Sandbox/SDK/

## SDK (section index)
- **URL:** https://createos.sh/docs/Sandbox/SDK/
- **Summary:** CreateOS Sandbox SDKs for TypeScript, Go, Python, Rust, C# and Java. Start with the language examples (Overview) to install, create a sandbox, run commands and clean up; the Quickstart, Tutorial, guides and reference cover the TypeScript SDK in more detail.
- **Key points:**
  - Children: Overview, Quickstart, Tutorial, Examples, How-To Guides, API Reference, Concepts.

## SDKs (language examples)
- **URL:** https://createos.sh/docs/Sandbox/SDK/Overview
- **Summary:** One page of side-by-side examples (language tabs) for TypeScript, Go, Python, Rust, C# and Java: install, create a sandbox, run commands, stream output, upload files, publish a preview, managed processes, interactive terminal and cloud desktop.
- **Key points:**
  - Always destroy the sandbox when done (`try`/`finally`, `defer`, `with`, etc.).
  - Examples create and destroy their own sandbox; run inside a project with the SDK installed (Go/Rust/C#/Java need a module, Cargo package, .NET console project or Java 17 Maven project first).

### Languages, packages and install
| Language | Package | Requirements | Install |
|---|---|---|---|
| TypeScript | `@nodeops-createos/sandbox` | Node.js 20+, Bun, Deno, edge runtimes, or a browser | `npm install @nodeops-createos/sandbox` (also `bun add @nodeops-createos/sandbox`) |
| Go | `github.com/NodeOps-app/createos-go-sdk` | Go 1.25+ | `go get github.com/NodeOps-app/createos-go-sdk` |
| Python | `createos-sandbox` | Python 3.10+ | `pip install createos-sandbox` |
| Rust | `createos` | Rust and Tokio | `cargo add createos` and `cargo add tokio --features macros,rt-multi-thread,time` |
| C# | `CreateOS.Sandbox` | .NET 8+ | `dotnet add package CreateOS.Sandbox` |
| Java | `sh.createos:createos-java-sdk` | Java 17+ | Maven dependency `groupId sh.createos`, `artifactId createos-java-sdk`, `version 0.1.1` |

- Java Maven snippet pieces: `<dependency><groupId>sh.createos</groupId><artifactId>createos-java-sdk</artifactId><version>0.1.1</version></dependency>`, `maven.compiler.release` 17, plugins `maven-compiler-plugin` 3.13.0 and `exec-maven-plugin` 3.6.3.
- Environment: TypeScript reads `CREATEOS_SANDBOX_API_KEY`. Go, Python, Rust, C# and Java read `CREATEOS_API_KEY`. All six accept optional `CREATEOS_SANDBOX_BASE_URL`.

### Run file and command per language
| Language | File | Run |
|---|---|---|
| TypeScript | `example.ts` | `bun example.ts` |
| Go | `main.go` | `go run main.go` |
| Python | `main.py` | `python main.py` |
| Rust | `src/main.rs` | `cargo run` |
| C# | `Program.cs` | `dotnet run` |
| Java | `src/main/java/Main.java` | `mvn compile exec:java -Dexec.mainClass=Main` |

### Client construction and create call per language (verbatim)
| Language | Client | Create sandbox |
|---|---|---|
| TypeScript | `createClient()` | `client.createSandbox({ shape: "s-1vcpu-1gb", rootfs: "devbox:1" })` |
| Go | `sandbox.NewClient()` (package `github.com/NodeOps-app/createos-go-sdk/sandbox`, types in `.../structs`) | `client.CreateSandbox(ctx, structs.CreateSandboxRequest{Shape: "s-1vcpu-1gb", RootFS: "devbox:1"})` |
| Python | `Client()` (`from createos import Client, CreateSandboxRequest, RunCommandRequest`), used as a context manager | `client.create_sandbox(CreateSandboxRequest(shape="s-1vcpu-1gb", rootfs="devbox:1"))` |
| Rust | `Client::from_env()?` (`use createos::{Client, CreateSandboxRequest, RunCommandRequest}`; `#[tokio::main]`) | `client.create_sandbox(CreateSandboxRequest { shape: "s-1vcpu-1gb".into(), rootfs: Some("devbox:1".into()), ..Default::default() }).await?` |
| C# | `new SandboxClient()` (`using CreateOS.Sandbox;`) | `await client.CreateSandboxAsync(new CreateSandboxRequest { Shape = "s-1vcpu-1gb", RootFileSystem = "devbox:1" })` |
| Java | `CreateOsClient.builder().build()` (`sh.createos.CreateOsClient`) | `client.createSandbox(CreateSandboxRequest.builder("s-1vcpu-1gb").rootFileSystem("devbox:1").build())` |

### Example topics on the page (each shown in all six languages)
| Topic | TypeScript call |
|---|---|
| Create a sandbox and run a command | `sandbox.runCommand("echo", ["Hello from CreateOS"])` then `response.result.stdout`; `sandbox.destroy()` |
| Stream command output | `for await (const event of sandbox.streamCommand("sh", ["-c", command]))` with `event.type === "stdout"` and `event.data` |
| Upload files | `sandbox.files.upload("/workspace/hello.txt", "...")`, `sandbox.files.download("/workspace/hello.txt")` |
| Publish a live preview | create with `ingress_enabled: true`; `sandbox.processes.create({ cmd: "python3", args: ["-m", "http.server", "8080", "--bind", "0.0.0.0"] })`; `sandbox.waitForPortReady(8080)`; `sandbox.previewUrl(8080)` |
| Run managed processes | `sandbox.processes.create({ cmd, args })`; `sandbox.processes.wait(process.process_id, { scope: "tree" })` |
| Spawn an interactive terminal | `sandbox.processes.create({ cwd: "/workspace", pty: { rows: 24, cols: 80 } })`; `processes.resize`, `processes.input`, `processes.wait`, `processes.connect` |
| Automate a cloud desktop | rootfs `desktop:1`, shape `s-2vcpu-4gb`; `sandbox.computer.screen`, `computer.open`, `computer.screenshot` |

- Equivalent names in other languages (from the examples): Go `instance.Files().Upload/Download`, `instance.Processes().Create/Wait`, `instance.WaitForPort`, `instance.PreviewURL(8080)`, `instance.StreamCommand`; Python `sandbox.run_command`, `sandbox.stream_command`, `sandbox.files.upload/download`, `sandbox.processes.create/wait`, `sandbox.wait_for_port(8080, timeout=15)`, `sandbox.preview_url(8080)`; Rust `sandbox.run_command`, `sandbox.stream_command`, `sandbox.files().upload/download`, `sandbox.processes().create/wait`, `sandbox.wait_for_port`, `sandbox.preview_url(8080)?`; C# `sandbox.RunCommandAsync`, `StreamCommandAsync`, `Files.UploadAsync/DownloadAsync`, `Processes.CreateAsync`, `WaitForPortAsync`, `GetPreviewUri(8080)`, `DestroyAsync`; Java `sandbox.runCommand(RunCommandRequest.of(...))`, `streamCommand`, `files().upload/download`, `processes().create`, `waitForPort`, `previewUrl(8080)`, `destroy`.

### Source and API reference links (as listed on the page)
- TypeScript: https://github.com/NodeOps-app/createos-sandbox-sdk (reference: https://github.com/NodeOps-app/createos-sandbox-sdk/tree/main/docs/reference); npm: https://www.npmjs.com/package/@nodeops-createos/sandbox
- Go: https://github.com/NodeOps-app/createos-go-sdk (reference: https://pkg.go.dev/github.com/NodeOps-app/createos-go-sdk)
- Python: https://github.com/NodeOps-app/createos-python-sdk (reference: README)
- Rust: https://github.com/NodeOps-app/createos-rust-sdk/tree/main/examples (reference: https://docs.rs/createos/latest/createos/)
- C#: https://github.com/NodeOps-app/createos-csharp-sdk/tree/main/examples
- Java: https://github.com/NodeOps-app/createos-java-sdk/tree/main/examples (Maven Central: https://central.sonatype.com/artifact/sh.createos/createos-java-sdk)
- Provider-agnostic use through ComputeSDK (`@computesdk/createos-sandbox`): https://github.com/computesdk/computesdk

## Group notes
| Note | Covers |
|---|---|
| [[Docs - Sandbox SDK - Quickstart and Tutorial]] | `/Sandbox/SDK/Quickstart`, `/Sandbox/SDK/Tutorial` |
| [[Docs - Sandbox SDK - Examples]] | `/Sandbox/SDK/Examples/` catalog (55 numbered runnable TypeScript examples in 5 categories) |
| [[Docs - Sandbox SDK - How-To Guides]] | `/Sandbox/SDK/How-To/` plus 8 guides |
| [[Docs - Sandbox SDK - API Reference]] | `/Sandbox/SDK/Reference/` plus Overview, Client, Sandbox, Sandbox Files, Sub-APIs, Errors, Helpers, Types, Managed Processes, Computer |
| [[Docs - Sandbox SDK - Concepts]] | `/Sandbox/SDK/Explanation/` plus VM Sandboxes, Handle Model, Lifecycle, Reliability |

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox REST API]]: every SDK call is one documented endpoint
- [[Docs - Sandbox CLI]]: terminal client
- [[Docs - Sandbox Quickstart]]: CLI, SDK and REST first-sandbox steps
- [[Docs - Sandbox Limits]]: what `createSandbox` can ask for on each plan
- [[Hackathon Setup Guide]]: hackathon environment setup
- [[Hackathon Ideas]]: project ideas to build with the SDK
- [[CreateOS Docs]]: docs root hub
