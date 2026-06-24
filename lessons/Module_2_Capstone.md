# Module 2 Capstone: The Automated File Processor

*Combine everything you've learned to build an automated, agentic workflow.*

## The Objective
You need to build a reusable Skill that automatically lints and formats a file, and then instruct a Sub-Agent to execute that skill across multiple files in the background.

## The Requirements

### Step 1: Create the Skill
1. Inside your `New Project folder`, navigate to the `skills/` directory.
2. Create a folder named `auto-formatter`.
3. Create a `SKILL.md` file inside `auto-formatter/`.
4. Write the YAML frontmatter (name, description).
5. Write the instructions:
   > "1. Read the target file. 2. Identify syntax errors or messy formatting. 3. Automatically apply fixes and save the file. 4. Output a summary of what was changed."

### Step 2: Delegate to a Sub-Agent
1. Create two messy, poorly formatted dummy text files in your project.
2. Open your chat interface in the project root.
3. Write a Thin Prompt invoking a sub-agent:
   > "Please spawn a sub-agent. Instruct it to run the `auto-formatter` skill on both of my dummy text files. Let me know when it finishes."

## Passing the Capstone
You pass this capstone if:
1. The AI successfully locates and reads your `SKILL.md` file.
2. The AI successfully spawns a background sub-agent.
3. The sub-agent successfully applies formatting fixes to both files without requiring any further input from you.
4. Your main chat window remained unblocked while the sub-agent worked.
