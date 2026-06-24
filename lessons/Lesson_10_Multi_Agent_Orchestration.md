# Lesson 10: Multi-Agent Orchestration

*Scaling up: Building an assembly line of specialized AI workers.*

## Introduction
In Lesson 7, we learned how to spawn a single sub-agent to handle an isolated task. But what happens when you want to build an entire software application autonomously?

A single sub-agent will get overwhelmed. Instead, we use **Multi-Agent Orchestration**—creating a sequential "assembly line" where multiple highly-specialized agents pass their work down the chain. 

---

## Key Concepts

### 1. The Assembly Line Architecture
In a multi-agent system, agents are defined by their specific roles. A common software development assembly line looks like this:
*   **The Architect (Agent 1):** Reads the user's requirements, researches the tech stack, and outputs a detailed `implementation_plan.md`.
*   **The Developer (Agent 2):** Reads the `implementation_plan.md` and writes the actual source code.
*   **The Reviewer (Agent 3):** Reads the source code, runs the tests, and fixes any bugs.

### 2. Context Handoffs (The Artifact)
Agents in different context windows cannot "talk" to each other directly in a reliable way. To pass information down the assembly line, they use **Artifacts** (Markdown files).
When Agent 1 finishes its job, it saves its output to a file. Agent 2 is then instructed to read that specific file to begin its work. The file system acts as the shared brain.

### 3. Orchestration Prompts
As the "Manager", your job is to orchestrate this handoff. You don't do the work; you just direct traffic.
> *"Spawn an Architect agent to draft a plan for a login page and save it to `plan.md`. When it finishes, spawn a Developer agent to read `plan.md` and build the UI components."*

---

## Exercise: The Pipeline

**Your Task:**
You want to translate a massive English document into three different languages (Spanish, French, Japanese) and then have a final agent compile them into a single PDF. Write the Thin Prompt that orchestrates this multi-agent assembly line.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> "Please spawn three separate translation sub-agents in parallel. Instruct Agent 1 to translate `doc.txt` to Spanish (`es.txt`), Agent 2 to French (`fr.txt`), and Agent 3 to Japanese (`jp.txt`). Once all three agents have successfully saved their files, spawn a final formatting agent to read all three text files and compile them into a single `final_translations.md` file."

</details>
