# Change History (HISTORY.md)

> **Format:** [Keep a Changelog](https://keepachangelog.com) style — newest first; changes grouped under `### Added / Changed / Fixed / Removed`. Entries from **2026-06-29** onward follow this convention; earlier entries use the legacy `Goal / Completed Changes` style and are kept as-is (historical record, not rewritten).
>
> **Division of labor (added 2026-06-29):** entries here stay terse — *what* shipped, not why. Day-to-day specifics live in git commit history; decision rationale and rejected alternatives for anything with real tradeoffs live in [`docs/adr/`](docs/adr/) (empty so far — nothing here has met that bar yet).

## [2026-07-10] - Squarespace Reference Update

### Added
- Added Squarespace site manager reference to `README.md` (moved from placeholder home folder).

## [2026-07-02] - Search, Data Sync, & Live AI

Finalized the Web Playbook with search capabilities, save state syncing, and live API execution for the Capstone simulator.

### Added
- `AI_Power_User_Playbook/Web_Version/search_index.js` and `search_settings.js` for Fuse.js client-side search.
- Added `localStorage` Import/Export functionality in a new Settings modal.
- Added a "Bring Your Own Key" (BYOK) OpenAI API input to `module_04.html`.
- Updated `app_04.js` to execute real `fetch()` calls to `api.openai.com` if an API key is provided, replacing the simulated success message with genuine LLM output.

## [2026-07-02] - Export to Obsidian

Added direct `.md` export capabilities to the templates page, reinforcing the playbook's goal of building a Digital Twin.

### Added
- "Export to Vault" buttons in `templates.html`.
- Export logic in `app_templates.js` that automatically prepends YAML frontmatter and triggers a file download for `.md` files.

## [2026-07-02] - PWA Integration and Theme Engine

Upgraded the web playbook to a Progressive Web App (PWA) with offline support and added a dynamic theme toggle.

### Added
- `AI_Power_User_Playbook/Web_Version/manifest.json` and `icon.jpg` for PWA installation and branding.
- `AI_Power_User_Playbook/Web_Version/sw.js` (Service Worker) for aggressive offline caching of all assets.
- `AI_Power_User_Playbook/Web_Version/theme.js` for handling Light/Dark mode state via `localStorage`.

### Changed
- `AI_Power_User_Playbook/Web_Version/styles.css` (Added `.light-mode` overrides for a high-contrast daytime theme).
- Injected PWA tags, Service Worker registration, and a theme toggle button (`🌓`) into the navigation bar of all HTML files.

## [2026-07-02] - Web Playbook Finalization (D3 Graph, Capstone, Gamification)

Finalized the interactive web application version of the AI Power User Playbook.

### Added
- `AI_Power_User_Playbook/Web_Version/progress.js` (Global progression tracking using `localStorage`).
- `AI_Power_User_Playbook/Web_Version/module_04.html` and `app_04.js` (Capstone Simulator).
- `.github/workflows/deploy-pages.yml` (GitHub Actions workflow for deploying the playbook).
- `d3.js` integration in Module 03 for rendering the Obsidian Graph View physics simulation.
- PDF Export capability in `whitepaper.html` using `html2pdf.js`.

### Changed
- `AI_Power_User_Playbook/Web_Version/styles.css` (Added styles for Module 04 dual-pane layout, mobile responsiveness, and new interactive states).
- `AI_Power_User_Playbook/Web_Version/app_*.js` files (Hooked into `markCompleted()` for gamified progression badges in the nav).
- Updated all HTML file navigation bars to dynamically show completion state and include a link to Module 04.

## [2026-06-29] - Prompt-Engineering Analyses Re-exported as Markdown

Converted the four Gemini-generated analyses (originally vector-outline PDFs with no extractable text) into machine-readable, indexable Markdown so they become first-class nodes in the ai_context_tree dashboard.

### Added
- `resources/Analysis_6_Markdown_File_Types.md`
- `resources/Analysis_5_Core_Elements_High_Fidelity_Prompt.md`
- `resources/Analysis_Mathematical_Mechanics_High_Fidelity.md`
- `resources/Stateful_Prompting_Hierarchy.md`

### Changed
- Re-transcribed 3 of the 4 analyses directly from their original PDFs (`High-Fidelity Hooks`, `Analysis_The 6 Types of Markdown Files`, `Technical Brief_The Mathematical Mechanics`) — they have no extractable text layer but render as legible images, which a dedicated PDF tool's text-extraction pass had missed. Initial "PDFs are unrecoverable" assessment was wrong; only `Technical Analysis_The 5 Core Elements` is genuinely empty (1.9 KB, 0 characters, confirmed blank) — that file's content is now cross-sourced from the matching section in the Mathematical Mechanics brief instead.

### Notes
- Each file carries a provenance header, `[[wikilink]]` cross-references, and inline technical corrections — most notably that "Lost in the Middle" is driven by pre-training data distribution and RLHF, not RoPE positional decay, and that the Q/K/V→files mapping is metaphor, not literal math. The Mathematical Mechanics file's source table (page 3) is cut off at the page margin in the original; truncated cells are marked rather than guessed.

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
