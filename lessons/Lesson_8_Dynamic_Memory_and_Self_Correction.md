# Lesson 8: Dynamic Memory & Self-Correction

*How to program an AI to autonomously document its failures and learn from them.*

## Introduction
One of the most frustrating experiences in Prompt Engineering is correcting an AI, only for it to make the exact same mistake the next day. If an AI doesn't have a system to learn from its failures, you are essentially training a goldfish.

In Lesson 4, we introduced the `MEMORY.md` file as part of the Folder Architecture. Now, we will explore **Dynamic Memory**—the practice of instructing the AI to actively manage and update its own constraints based on what works and what doesn't.

---

## Key Concepts

### 1. The Decision Log (`MEMORY.md`)
Your `MEMORY.md` is not just a passive reference document; it is an active decision log. Every time you encounter a persistent bug, a framework limitation, or a stylistic preference change, it should be recorded here.
A good memory entry should include:
- The context (What were we trying to do?)
- The failure (What went wrong?)
- The resolution (How do we avoid this in the future?)

### 2. Auto-Documentation Prompts
Instead of updating `MEMORY.md` manually, you can instruct the AI to do it. When you finally solve a complex problem after multiple chat turns, you can issue a Thin Prompt to lock in the learning:
> *"We finally got the deployment script working. Please analyze why the previous three versions failed, extract the core rule we learned, and append it to our `MEMORY.md` file."*

### 3. The Self-Correction Loop
Advanced agentic systems don't wait for you to ask. By combining a global Tier 1 setting with your `MEMORY.md`, you can create a self-correction loop. 
For example, if your `AGENTS.md` contains the rule: *"If a Python script you wrote throws a syntax error, immediately document the cause of the error in `MEMORY.md` before attempting a fix."*

---

## Exercise: The Memory Update

**Your Task:**
Imagine you are building a React application. For the past hour, the AI kept trying to use standard CSS, but your project strictly requires TailwindCSS. You finally got it working. Write a Thin Prompt instructing the AI to update its own memory so this never happens again.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> "Please update our `MEMORY.md` file. Add a new rule under 'Styling Constraints' stating that we strictly use TailwindCSS for all styling, and standard CSS or inline styles should never be generated."

</details>
