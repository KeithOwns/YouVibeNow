# Analysis: The 6 Types of Markdown Files in Your Workspace

> **Provenance:** Transcribed 2026-06-29 directly from the original PDF (1 page) via visual
> reading — the file has no extractable text layer (confirmed: 0 characters via text extraction),
> but renders as a legible image. This supersedes an earlier version of this file reconstructed
> only from the Gemini chat-log narrative; the text below is the verbatim original content,
> including its file citations.

## Original analysis

*"An audit of your files reveals that the concept of '6 types of markdown files' appears in two
highly structured ways within your codebase:"*

### 1. The 6 Dashboard Categories (By Agent Utility)

*As recorded in `project_ai_context_tree.md` (File `f20`) and rendered dynamically by your
`ai_context_tree.html` dashboard, your files are aggregated into 6 core types based on how LLMs
ingest them:*

1. **`CLAUDE.md`** — Dedicated directory rules auto-loaded specifically by the Claude Code CLI.
2. **`GEMINI.md`** — Rules and instructions auto-loaded by the Gemini CLI and Antigravity IDE.
3. **`AGENTS.md`** — Universal multi-agent boundary systems compatible with Codex CLI and open
   standard tools.
4. **`SKILL.md`** — Packaged, reusable workflows loaded on-demand via progressive disclosure.
5. **`memory` (auto-mem .md)** — Claude Code's per-directory memory files tracking dynamic lessons
   across sessions.
6. **`Other .md`** — Static documentation (READMEs, logs, manuals) that are not auto-loaded but
   read by the AI on demand.

### 2. The 6 Standard Project-Level Files (Vibe Coding Starter Kit)

*As documented in the `YouVibeNow` course curriculum and chat history logs
(`YouVibeNow/.archive/chat_history.md` — File `f64`), you define a standard set of 6 essential
files that every codebase or workspace folder should contain to maximize stateful prompting
performance:*

1. **`AGENTS.md`** — Anchors the agent's identity, role, and absolute safety constraints (e.g.,
   backup requirements).
2. **`CONTEXT.md`** — Outlines the project background, tech stack, directory layouts, and "what
   good looks like" definitions.
3. **`TASKS.md`** — Keeps track of the active sprint with structured Markdown checklists
   (`- [ ]`, `- [/]`, `- [x]`).
4. **`MEMORY.md`** — Acts as the dynamic brain, logging learned preferences, self-corrections, and
   design pivots.
5. **`SKILL.md`** (inside `skills/`) — Packages repetitive, complex multi-step execution tasks into
   single-command automation macros.
6. **`README.md`** — Serves as the human-facing front-door introducing the repository.

## Reconciling the two framings (added during review, not in the original)

These are genuinely two different axes, not a contradiction:

- **Framing 1** = *what a tool auto-loads, by filename* — the dashboard's actual `TYPE`/`scope`
  taxonomy (`gen_tree.ps1`/`ai_context_tree.html`).
- **Framing 2** = *what a new project should scaffold* — a content-authoring checklist for the
  YouVibeNow curriculum's "vibe coding starter kit," largely orthogonal to auto-load behavior
  (e.g. `CONTEXT.md`/`TASKS.md`/`README.md` are never auto-loaded by any tool; they're read only
  because an `AGENTS.md`/`CLAUDE.md` instruction or the user points the agent at them).

Only Framing 1's filenames are confirmed auto-loaded by real tools (per the dashboard's own
Filename/Auto-loaded-by table): `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`/`*.mdc`,
`.windsurfrules`, `.clinerules`, `copilot-instructions.md`. `README.md` is never auto-loaded.

## See also

- [[Stateful_Prompting_Hierarchy]] — the folder/file system these types plug into
- `resources/Cheat_Sheet.md`, `resources/Prompt Engineering Frameworks Research.md`
