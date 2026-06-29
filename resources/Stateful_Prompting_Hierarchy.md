# Stateful Prompting Hierarchy

> **Provenance:** Reconstructed 2026-06-29 from the Gemini chat log ("Stateful Prompting Hook
> Options" + the surrounding code-review conversation; originals were vector-outline PDFs with no
> extractable text). Concept preserved; marketing framing trimmed.

## Definition

A **Stateful Prompting Hierarchy** is a folder-and-markdown-file organization system that holds an
AI agent's durable context **in the file tree** rather than in each chat message. Because the
context is stored (stateful), the live prompt can stay **thin** — it only carries the immediate
task, while the hierarchy supplies role, standards, history, and project knowledge automatically.

It is the system the `ai_context_tree.html` dashboard exists to visualize.

## The layers (what gets injected, in order)

1. **Global** — `~/.claude/CLAUDE.md`, `~/.gemini/GEMINI.md`. Always loaded, every project.
2. **Project root** — `CLAUDE.md` / `GEMINI.md` / `AGENTS.md` at a repo root. Loaded when the
   session's working directory is at or under that folder.
3. **Nested** — the same files in a subfolder. Loaded only when the cwd is at/under *that* subfolder.
4. **Auto-memory** — Claude Code's per-directory memory, written across sessions and re-injected
   when you work in that directory.
5. **On-demand** — `SKILL.md` skills: name + description listed upfront, full body loaded only when
   invoked (not part of the always-on prompt).

The dashboard's **"⛓ combined"** button on any project-root file shows the literal concatenation
(global + project + auto-memory) that would be prepended to a new chat started there.

## Hook options (for articulating it)

Completing *"This is my Stateful Prompting Hierarchy, which …"*:

- **Curriculum framing:** "…turns my file tree into the agent's long-term memory, so every prompt
  starts with full project context and I never re-explain myself."
- **Short-form / punchy:** "…so my AI already knows the rules before I say a word."
- **Repo-doc framing:** "…a file-based context system where durable instructions live in the
  hierarchy and daily prompts stay thin."

## Honest caveats

- **Cascading overrides get complex.** Global → project → nested → memory can conflict; tracing
  *which* instruction won requires care (the dashboard's combined view helps).
- **Tool-specific syntax drift.** `CLAUDE.md`, `GEMINI.md`, and `AGENTS.md` don't share identical
  loading rules; the same file (`GEMINI.md`) is shared by Gemini CLI *and* Antigravity and can
  conflict between them.
- **Files must stay machine-readable.** Export supporting analyses as `.md`, not image-style PDFs —
  otherwise the agents this system feeds can't actually read them.

## See also

- [[Analysis_6_Markdown_File_Types]] — the file types this hierarchy is built from
- [[Analysis_5_Core_Elements_High_Fidelity_Prompt]] — how a thin prompt is structured
- [[Analysis_Mathematical_Mechanics_High_Fidelity]] — why boundary placement matters
