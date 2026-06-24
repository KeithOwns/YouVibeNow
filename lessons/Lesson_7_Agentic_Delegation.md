# Lesson 7: Agentic Delegation (Sub-Agents)

*How to build a team of specialized AI workers to execute tasks in parallel.*

## Introduction
A single chat thread has limits. If you ask an AI to research an API, rewrite a massive database schema, and update the UI all in one prompt, you will hit context limits, trigger hallucinations, and lose track of the workflow.

The solution is **Agentic Delegation**. Instead of doing the work itself, your primary AI acts as a manager, spinning up "Sub-Agents" to handle chunked tasks in the background.

---

## Key Concepts

### 1. The Manager vs. The Worker
When you use an advanced LLM interface (like Google Antigravity), your primary chat thread is the **Manager**. Its job is to understand your overall goal, plan the architecture, and orchestrate the work.

When a specific, isolated task needs to be done, the Manager invokes a **Worker** (a Sub-Agent) in a completely separate context window.

### 2. Spawning Sub-Agents
You can instruct your AI to spawn sub-agents simply by asking. 
Because of your 3-Tier Hierarchy, you only need a Thin Prompt:

> **"Please spawn a research sub-agent. Have it read the Stripe API documentation and summarize the authentication endpoints in a markdown artifact."**

### 3. Parallel Execution
The greatest benefit of sub-agents is asynchronous execution. You can spin up three different agents to research three different files simultaneously. While they work in the background, your primary chat remains unblocked, allowing you to continue writing code or planning the next steps.

---

## Exercise: The Delegation Prompt
**Your Task:**
Write a Thin Prompt that commands your main AI to spawn a sub-agent. The sub-agent's task should be to search the codebase for all instances of the word "TODO" and compile them into a checklist.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> "Please spawn a research sub-agent in the background. Instruct the sub-agent to search the entire `src/` directory for any lines containing the word 'TODO'. Have the sub-agent output the results as a checklist in a new file called `TODO_List.md`. Please let me know when it finishes so I can review it."

</details>
