# Change History (HISTORY.md)

> **Format:** [Keep a Changelog](https://keepachangelog.com) style — newest first; changes grouped under `### Added / Changed / Fixed / Removed`. Entries from **2026-06-29** onward follow this convention; earlier entries use the legacy `Goal / Completed Changes` style and are kept as-is (historical record, not rewritten).
>
> **Division of labor (added 2026-06-29):** entries here stay terse — *what* shipped, not why. Day-to-day specifics live in git commit history; decision rationale and rejected alternatives for anything with real tradeoffs live in [`docs/adr/`](docs/adr/) (empty so far — nothing here has met that bar yet).

## [2026-06-29] - Prompt-Engineering Analyses Re-exported as Markdown

Converted the four Gemini-generated analyses (originally vector-outline PDFs with no extractable text) into machine-readable, indexable Markdown so they become first-class nodes in the ai_context_tree dashboard.

### Added
- `resources/Analysis_6_Markdown_File_Types.md`
- `resources/Analysis_5_Core_Elements_High_Fidelity_Prompt.md`
- `resources/Analysis_Mathematical_Mechanics_High_Fidelity.md`
- `resources/Stateful_Prompting_Hierarchy.md`

### Notes
- Reconstructed from the Gemini chat-log narrative (the PDFs were unrecoverable). Each carries a provenance header, `[[wikilink]]` cross-references, and inline technical corrections — most notably that "Lost in the Middle" is driven by pre-training data distribution and RLHF, not RoPE positional decay, and that the Q/K/V→files mapping is metaphor, not literal math.

## [2026-06-15] - Module 2 Completion & Memory Sync
- **Goal**: Complete Module 2 and update project progress states.
- **Completed Changes**:
  - Integrated empirical frameworks into Lesson 4.
  - Completed Module 2 drafts with lesson exercises and example solutions.
  - Logged Tier-1 application level settings in `MEMORY.md`.
  - Updated `TASKS.md` for Module 1/2 completion.

## [2026-06-14] - Restructuring, Capstone, & Open Source Polish
- **Goal**: Restructure curriculum, draft Module 1 Capstone, configure test environments, and open-source the project.
- **Completed Changes**:
  - Restructured the curriculum: shifted lesson indexes and drafted new Lesson 1 covering 3-Tier Hierarchy (Application, Project, Execution).
  - Refactored templates to enforce inheritance warnings and avoid redundant rule repetition.
  - Created Module 1 Capstone (`Module_1_Capstone.md` / Thin Prompt Exam) and drafted Module 2 outline.
  - Created `Expense_Calculator` folder as a test capstone target, generating `expense_calculator.py` using a Thin Prompt.
  - Added `CONTRIBUTING.md`, `LICENSE` (MIT), and `init.ps1` to open-source the template.
  - Added `chunking-architect` skill under `skills/` to automate task decomposition.
  - Overhauled `Stateful_Prompting_Structure.html` reference card design with JetBrains Mono and glowing dark theme layouts.
  - Logged logout of old Google account devices in the next-action checklists.

## [2026-06-13] - Visual Upgrades, Vercel Rewrite, & Lock Screen Security
- **Goal**: Add visual enhancements, deploy portfolios, and build lock screen recovery features.
- **Completed Changes**:
  - Linked `mylife` webpage to `aiit.support/mylife` via Vercel proxy rewrite.
  - Configured Vercel routing rules to load `Life_Organizer.html` as the entrypoint.
  - Fixed unhandled key syntax issue in PowerShell profile.
  - Prioritized and implemented dark theme glassmorphic visual upgrades for `index.html`.
  - Cleaned up Venture Lab dataset by removing pressure washing and pooper scooper.
  - Created a new Portfolio & Resume tab with a Trajectory timeline in `index.html`.
  - Added security recovery flow, password question resets, and recovery key persistence to `Life_Organizer.html` lock screen.

## [2026-06-12] - Sandbox Research, Nerd Font, & Prompt Framework Scaffolding
- **Goal**: Investigate agentic memory, install developer environments, and scaffold prompt engineering framework files.
- **Completed Changes**:
  - Researched AGY CLI Admin vs User Mode sandboxing.
  - Identified the location and conventional use cases of `MEMORY.md` inside project and global directories.
  - Clarified difference between static rules/instructions and session transcript logs.
  - Reviewed differences between Windows Terminal and PowerShell console for AGY execution.
  - Patched Nerd Font installation steps for developer glyphs.
  - Researched LLM Wiki and Markdown conventions (Karpathy) vs HTML semantic advantages.
  - Created the initial `HISTORY.md` and `HISTORY.html` to record session history.
  - Optimized system instructions in `GEMINI.md` to clarify workspace and file backup rules.
  - Created `TUTORIAL.md` mapping the 5 configuration steps and conceptualizing prompt engineering within InfoSec CIA pillars (Availability/Integrity).
  - Initialized Git repository, added `.gitignore`, created a draft course structure, and scaffolded standard markdown templates (`AGENTS.md`, `CONTEXT.md`, `MEMORY.md`, `TASKS.md`, and `skills/template-skill/SKILL.md`).
