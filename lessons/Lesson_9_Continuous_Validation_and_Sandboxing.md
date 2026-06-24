# Lesson 9: Continuous Validation & Sandboxing

*Never trust AI-generated code blindly. Build environments that test it automatically.*

## Introduction
As you delegate larger tasks to AI (like writing entire features or scripts), the risk of silent failures increases. An AI might write code that looks perfectly logical but fails to compile or throws runtime errors. 

To prevent broken code from polluting your project, we employ **Continuous Validation**. This means designing workflows where the AI writes code and then immediately tests it in a sandboxed environment *before* finalizing the task.

---

## Key Concepts

### 1. The Trust but Verify Principle
In Agentic Engineering, we assume all LLM output is fundamentally flawed until proven otherwise. A robust workflow requires the AI to prove its code works by executing it against a test suite.

### 2. Sandboxing
A sandbox is an isolated testing environment. When an AI writes a destructive script (e.g., a script that deletes old database records), it should never run it in production. 
Your `CONTEXT.md` should clearly define the sandbox:
> *"All generated data-processing scripts must first be tested against the dummy CSV files located in `tests/sandbox_data/` before they are applied to the main dataset."*

### 3. Test-Driven AI (TDAI)
Borrowing from Test-Driven Development (TDD), you can instruct your AI to write the tests *first*.
1. **Prompt 1:** "Write a unit test for a function that parses date strings into ISO format."
2. **Prompt 2:** "Now write the function, run the unit test in the terminal, and do not stop until it passes."

By forcing the AI to validate its own output, you drastically reduce the manual debugging burden on yourself.

---

## Exercise: The Validation Skill

**Your Task:**
You want to package a workflow into a reusable skill (`SKILL.md`). The goal is to have the AI write a Python script, but refuse to hand it over until it passes a basic execution test. Write the 3-step instructions for this skill.

<details>
<summary><b>Click to see an Example Solution</b></summary>

**File:** `skills/write-and-test/SKILL.md`

```markdown
---
name: write-and-test
description: Writes a Python script and executes it locally to verify it works.
---

## Instructions
1. Write the requested Python script and save it to the `tests/` directory.
2. Automatically run the script in the terminal using `python [filename]`.
3. If it throws an error, analyze the error, rewrite the code, and run it again. Do not output the final code to me until the terminal execution is successful.
```

</details>
