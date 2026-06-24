# Dynamic Constraints & Memory

This file serves as the long-term brain for the project. Log newly learned user preferences, repeated mistakes to avoid, and major architectural decisions here.

## Learned Preferences
- *[Example]* Keep all markdown tables to a maximum of 4 columns to avoid horizontal scrolling issues.
- *[Example]* Always use GitHub style alerts (e.g., `> [!IMPORTANT]`) when documenting critical InfoSec constraints.

## Decision Log
- **[2026-06-24]:** Analyzed global agent configs (`~/.gemini/GEMINI.md`). Established that global system files act exclusively as Tier 1 "Application-Level Prompts," dictating strict Operational Constraints and Boundaries (e.g., mandating file backups) rather than Persona or Task assignments.
- **[Date]:** Transitioned from monolithic prompts to stateful prompting using the folder architecture.
- **[Date]:** Established the 5-Part Prompt Framework (Identity, Task, Context, Constraints, Format) as the core pedagogical tool for the Prompt Engineering Introduction module.
