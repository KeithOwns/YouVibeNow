---
name: template-skill
description: A template for packaging reusable tasks and output formats.
---

# Template Skill Workflow

This file demonstrates how to package a complex **Task** and its expected **Output Format** into a reusable skill.

## Task
When this skill is invoked, follow these steps exactly:
1. Analyze the provided context or input data.
2. Identify the top 3 key themes.
3. Generate a structured outline based on those themes.

## Constraints
- Do not hallucinate data that isn't in the provided input.
- Keep the generated outline under 500 words.

## Output Format
Return the result as a strictly formatted markdown document using the following structure:

```markdown
# [Theme 1 Title]
- Point A
- Point B

# [Theme 2 Title]
...
```
