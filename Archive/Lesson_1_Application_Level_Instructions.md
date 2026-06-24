# Lesson 1: Application-Level Global Instructions (The Stateful Baseline)

*Before you type a single chat message, you must build your safety net.*

## Introduction
The biggest mistake beginners make in Prompt Engineering is starting in the chat box. If you open a new chat and immediately type "Act like an expert coder," you have already failed. 

To build autonomous, safe AI workflows, we use a **3-Tier Hierarchy** for our prompts. The absolute first tier is the **Application-Level Stateful Prompt**. This involves adjusting the global settings within your AI application (like Google Antigravity, Claude Code, or ChatGPT's Custom Instructions) to set non-negotiable rules that apply to *every single project* you work on. This is your baseline identity and your ultimate safety net.

---

## Key Concepts

### 1. The 3-Tier Hierarchy
A professional "Stateful Prompt" is distributed across three levels:
*   **Tier 1: Application-Level (Global Customizations):** The absolute baseline. This sets universal rules (e.g., "Always backup files before editing") that the AI must follow on your machine, regardless of the project.
*   **Tier 2: Project-Level (The Folder Architecture):** We use files like `AGENTS.md` and `CONTEXT.md` inside a specific project folder to *specialize* the AI for that specific codebase.
*   **Tier 3: Execution-Level (The Chat Box):** Your day-to-day chat messages, which only need to provide the immediate Task and Output Format.

### 2. Global Customizations (The Safety Net)
Modern LLM IDEs like Google Antigravity and Claude Code allow you to set global rules. These are usually stored in a root configuration folder on your hard drive (e.g., `~/.gemini/config/AGENTS.md`). 
By writing a rule here like *"NEVER overwrite a file without making a copy in the Archive folder,"* you ensure that even if you write a terrible, dangerous prompt in Tier 3 (the chat box), the AI will refuse to destroy your data because the Tier 1 Application setting permanently overrides it.

### 3. The Baseline Identity
In addition to safety rules, you can set your AI's default personality. If you prefer concise, jargon-free answers, you don't need to ask for it every time. Set a global rule: *"Always write in plain, direct English. Never use corporate buzzwords."* From that moment on, the AI's default "state" perfectly matches your vibe.

---

## Exercise: Building the Baseline

**Your Task:**
Open the Global Customization settings in your LLM application (e.g., Google Antigravity's config folder or ChatGPT's "Custom Instructions" menu). Write exactly two sentences: One that defines the AI's baseline Identity, and one that sets an absolute, non-negotiable safety constraint.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> **Identity:** "You are an expert, senior-level AI pair programmer who communicates in concise, plain English."
> 
> **Constraint:** "Security Rule: You must always create a backup copy of a file before you run any command to modify it."

</details>
