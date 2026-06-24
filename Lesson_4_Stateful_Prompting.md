# Lesson 4: Stateful Prompting (The Folder Architecture)

*Stop repeating yourself and let your file system do the heavy lifting.*

## Introduction
If you are constantly copy-pasting the same instructions ("You are an expert coder," "Write in plain English," "Don't use corporate jargon") into every single chat window, you are wasting an enormous amount of time and token bandwidth. 

This repetitive cycle is a symptom of **Stateless Prompting**. The AI essentially has amnesia; it forgets who it is the moment you close the browser tab. 

The ultimate evolution of prompt engineering is **Stateful Prompting**. Instead of writing massive paragraphs in the chat box, we offload all of our static, unchanging instructions directly into the project's file structure. By turning the *physical environment* into the prompt, your daily chat instructions become incredibly fast, reliable, and lightweight.

---

## Key Concepts

### 1. The Persistent Identity (`AGENTS.md`)
Instead of telling the AI who it is in the chat box, we create a file called `AGENTS.md` in the root of our project. Inside this file, we define the AI's exact persona and set non-negotiable global rules (e.g., "Always backup files before editing"). Because modern AI agents read the workspace files automatically, its identity is permanently locked in before you even type a single word.

### 2. The Project Context (`CONTEXT.md` & `MEMORY.md`)
You shouldn't have to re-explain your business goals, target audience, or tech stack every time you start a new task. 
*   We use `CONTEXT.md` to permanently store the project's background and definitions of "what good looks like."
*   We use `MEMORY.md` to store dynamic, learned constraints over time (e.g., "We learned yesterday that the system breaks if we use commas in the CSV. Never use commas").

### 3. The Automation Layer (`skills/` Folder)
The most powerful element of Stateful Prompting is the `skills/` folder. Instead of typing out a complex, 5-step workflow every time you want to do a repetitive task, we package that workflow into a single `SKILL.md` file. 
When you need that workflow done, you simply type: *"Run the blog-post-writer skill."* The AI reads the local file, loads the 5-step process into its context, and executes it flawlessly.

### 4. The "Thin Prompt" Workflow
Because 80% of your prompt (Identity, Context, Constraints) is now handled autonomously by the file system, your actual chat messages become "Thin Prompts." You only need to provide the immediate **Task** and the desired **Output Format**. 
*Example Thin Prompt:* "Look at `draft.txt`. Find the three spelling errors. Output the fixes in a markdown table."

---

## Exercise: The Architect's Blueprint

**Your Task:**
You are starting a brand new project to build a Python web scraper for an e-commerce client. You want to use Stateful Prompting so the AI remembers the project details. 

Write out the exact names of the 4 core standard files you would create in the root folder, and write one sentence explaining what you would put inside each one for this specific Python project.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> 1. **`AGENTS.md`**: "You are a senior Python data engineer. Global Rule: Never write code without writing unit tests first."
> 2. **`CONTEXT.md`**: "We are building a Python web scraper to pull daily pricing data from competitor websites for our enterprise e-commerce client."
> 3. **`MEMORY.md`**: "Decision Log: The client's server crashed when we used Scrapy. We must always use the BeautifulSoup library moving forward."
> 4. **`TASKS.md`**: "Active Sprint: 1. Build the HTTP request function. 2. Build the HTML parser. 3. Build the CSV export function."

</details>
