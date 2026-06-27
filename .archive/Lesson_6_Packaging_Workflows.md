# Lesson 6: Packaging Workflows (The `skills/` Directory)

*How to save your best Thin Prompts as reusable, automated scripts.*

## Introduction
Once you have mastered the 3-Tier Hierarchy, you will find yourself typing the same Thin Prompts repeatedly. For example: "Please lint this file and format the output as a diff block."

Instead of typing that every time, we can **package** that workflow into a reusable script. In the Vibe Coding framework, we call this a **Skill**.

---

## Key Concepts

### 1. What is a Skill?
A Skill is essentially a pre-packaged Task and Output Format. It is a Markdown file (usually named `SKILL.md`) placed inside a `skills/` directory in your project root.

### 2. Anatomy of a SKILL.md File
A well-written skill file follows the **Agent Skills Open Specification** (adopted by Anthropic, OpenAI, and Microsoft). It contains two main parts:

1. **Frontmatter (YAML):** Metadata describing the skill. The AI reads this *first* to decide if the skill matches your prompt (a process called "progressive disclosure").
   *   `name`: The unique identifier (e.g., `lint-code`).
   *   `description`: What the skill does and what triggers it.
   *   `when_to_use`: (Optional) Specific scenarios when the agent should activate this skill.
2. **Instructions:** The actual steps the AI needs to follow when the skill is invoked.

*Example `skills/lint-code/SKILL.md`:*
```markdown
---
name: lint-code
description: Lints the provided file and outputs a diff block of fixes.
---

## Instructions
1. Run the project's linter on the target file.
2. Identify any syntax or style errors.
3. Output the required fixes exclusively in a Github-flavored Diff block. Do not apply the fixes automatically.
```

### 3. Invoking a Skill
Once the file is saved, you no longer need to type the instructions. Your chat prompt simply becomes the invocation:

> **"Run the `lint-code` skill on `app.py`"**

The AI will locate the skill file, read its instructions, and execute the exact workflow you designed.

---

## Exercise: Write Your First Skill
**Your Task:**
Create a `skills/` folder in your project. Inside, create a folder named `summarize-logs`, and inside that, create a `SKILL.md` file. Write the YAML frontmatter and a 3-step instruction set for reading a log file and summarizing the errors in a table.

<details>
<summary><b>Click to see an Example Solution</b></summary>

**File:** `skills/summarize-logs/SKILL.md`

```markdown
---
name: summarize-logs
description: Reads a local .log file and outputs a summary of errors.
when_to_use: Run this when the user asks to "check the logs" or "summarize errors".
---

## Instructions
1. Read the provided log file.
2. Identify any lines containing the words "ERROR" or "FATAL".
3. Output the exact error messages and their timestamps into a GitHub-flavored Markdown table.
```

</details>
