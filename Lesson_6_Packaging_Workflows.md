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
A well-written skill file contains:
1. **Frontmatter (YAML):** Metadata describing the skill's name and purpose. This is how the AI discovers it.
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
