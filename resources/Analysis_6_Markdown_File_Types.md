# Analysis: The 6 Types of Markdown Files in a Workspace

> **Provenance:** Reconstructed 2026-06-29 from the Gemini "Webapp Code Review and Optimization"
> chat log. The original was exported as a vector-outline PDF (no extractable text), so this is a
> faithful re-creation of the *substance*, not a byte copy. Claims have been checked against the
> live `ai_context_tree.html` dashboard and corrected where they diverged — see **Corrections**.

## The six tool-loaded context-file types

These are the files an AI coding tool reads **automatically**, keyed by filename:

| # | File | Loaded by | Reach |
|---|------|-----------|-------|
| 1 | `CLAUDE.md` | Claude Code | Global (`~/.claude/`) or project-root |
| 2 | `GEMINI.md` | Gemini CLI + Antigravity IDE | Global or project-root |
| 3 | `AGENTS.md` | Codex CLI, Antigravity, other open-standard tools | Project-level |
| 4 | `.cursorrules` / `*.mdc` | Cursor | Global or directory-level |
| 5 | `.windsurfrules` | Windsurf | Directory-level |
| 6 | `.clinerules` | Cline / Roo Code | Directory-level |

A seventh signal, `copilot-instructions.md` (GitHub Copilot), is tracked by the dashboard but sits
outside the "6 standard files" framing.

## The thin-prompt principle

The pedagogy: keep **daily execution prompts "thin"** (only the immediate task) and let the
**folder + file architecture carry durable context**. The six files do the heavy lifting so the
active prompt stays small. This is exactly what the `ai_context_tree.html` dashboard visualizes —
every auto-loaded file, where it lives, and what session it would inject into.

## Two ways "6 types" appears in this workspace

1. **Tool-loaded context files** — the table above (what a tool reads without being told to).
2. **Project folder-template categories** — the standard doc set a new project scaffolds
   (README, CONTEXT, TASKS, etc.), which are *content* docs, not tool-loaded rules.

These are different axes and were occasionally conflated in the source material.

## Corrections vs. the original Gemini analysis

- **Anything not in the table is never auto-loaded.** Plain `*.md` (README, notes, logs) is only
  read if a rule file or the user explicitly points the agent at it. The dashboard renders these
  gray as `(Other_.md)`.
- The original claimed the dashboard's memory color was `#ffaa3b` (gold). The live file actually
  uses `#ff8b38` (orange) for auto-memory. Claude `#ff6b35`, Gemini `#a78bfa`, Agents `#22c55e`
  are correct.

## See also

- [[Stateful_Prompting_Hierarchy]] — the folder/file system these types plug into
- `resources/Cheat_Sheet.md`, `resources/Prompt Engineering Frameworks Research.md`
