# The Vibe Coding Quick Reference Cheat Sheet

Keep this guide handy when building autonomous AI workflows or debugging agentic systems.

---

## The 3-Tier Hierarchy
*Never start Prompt Engineering in a blank chat box.*

1.  **Tier 1: Application-Level (Global Settings)**
    *   *What it is:* Your absolute baseline identity and non-negotiable safety rules (e.g., "Always backup files").
    *   *Where it lives:* Your LLM's global configuration settings (e.g., Google Antigravity config, ChatGPT Custom Instructions).
2.  **Tier 2: Project-Level (The Folder Architecture)**
    *   *What it is:* The files in your project root that automatically anchor the AI to your current context.
    *   *Where it lives:* `AGENTS.md` (Identity/Rules), `CONTEXT.md` (Project Background), `MEMORY.md` (Decision Log).
3.  **Tier 3: Execution-Level (The Chat Box)**
    *   *What it is:* Your daily "Thin Prompts" that rely on the previous two tiers to do the heavy lifting.
    *   *Where it lives:* The active chat session.

---

## The 5-Part Prompt Framework
*Eliminate guesswork to get production-ready results on the first try.*

1.  **Identity:** Who is the AI right now? (e.g., "You are a Senior Python Developer.")
2.  **Task:** What exactly needs to get done? (e.g., "Write a data parsing script.")
3.  **Context:** What background info is needed? (e.g., "The data is coming from a legacy SQL database.")
4.  **Constraints:** What should the AI avoid doing? (e.g., "Do not use third-party libraries, only use the standard library.")
5.  **Output Format:** What should the physical result look like? (e.g., "Output the code in a single Python file and provide a markdown table of the functions.")

> **Type them in this order.** Each element narrows the AI's interpretation before the next adds detail (outside-in). LLM accuracy drops 15–25% for information placed in the middle of a prompt — front-load Identity and Task so all subsequent tokens are interpreted under the correct frame. *(Liu et al., 2023 — "Lost in the Middle," arXiv:2307.03172)*

---

## The InfoSec Triad (CIA)
*Safety rules for deploying autonomous agents on your local machine.*

1.  **Confidentiality:** Never pass unredacted API keys, `.env` files, or proprietary data into the AI's context window. Use `.gitignore` aggressively.
2.  **Integrity:** Never allow the AI to run destructive commands or overwrite source code without first duplicating the original file into an `Archive/` folder.
3.  **Availability:** Maintain a `HISTORY.md` audit log or use `MEMORY.md` so that if an agent breaks a system, its decision-making process is fully auditable.

---

## Advanced Workflows
*Moving from single tasks to continuous automation.*

*   **Task Chunking:** Never ask an AI to "build the whole app." Always ask for a blueprint/outline first, approve it, and then prompt it to build one chunk at a time.
*   **Skills:** Package your best, repetitive Thin Prompts into a `SKILL.md` file so you never have to type them again.
*   **Continuous Validation:** Force the AI to test its own code in a sandboxed terminal before it hands the final product back to you.
*   **Multi-Agent Orchestration:** Use a Manager Agent to spawn an assembly line of specialized Sub-Agents (e.g., an Architect passing context to a Developer, passing context to a QA tester).
