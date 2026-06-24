# Project Context
This project is an LLM-driven workspace designed entirely for local file storage and manipulation. 

## What we are building
- A safe, sandboxed environment for an LLM to read, write, organize, and process local system files securely.

## What good looks like
- Absolute precision in file editing (no broken code syntax or corrupted data formats).
- Complete auditability of all file changes via the `Archive/` folder.
- Efficient tool usage (e.g., using `grep_search` to find specific data rather than reading thousands of lines manually).

## Tech Stack & Architecture

> [!WARNING]
> **The App-Config Anti-Pattern:** Do NOT cram massive, project-specific architecture notes into global application config files (like `~/.claude/CLAUDE.md`). Store your large tech stacks, registry paths, and project topologies *here* in this local `CONTEXT.md` file, preserving your global files exclusively for absolute, non-negotiable safety baselines.

We are working with native Python. The data will be stored in `data/expenses.csv` with columns: `Date, Category, Amount`.
