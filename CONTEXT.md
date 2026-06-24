# Current Project: YouVibeNow

## What we are building
We are building a comprehensive "Vibe Coding Course" that includes a foundational "Prompt Engineering Introduction" module. This project serves as both the curriculum material and a living demonstration of the "Stateful Prompting" methodology.

## What good looks like
- Course content that is structured, engaging, and highly actionable.
- A repository architecture that offloads static prompting elements (Identity, Context, Constraints) into these persistent files, enabling "thin" daily prompts.
- Workflows that effectively bridge Prompt Engineering with Information Security (Availability, Integrity, Auditability).

## Architecture & Data
- The meta-system is governed by global configuration files (e.g., `GEMINI.md`).
- We use the `skills/` folder to package reusable tasks and output formats.
- Tabular data and deep specs should remain in raw structured formats (like CSV or Markdown tables) for token efficiency.
