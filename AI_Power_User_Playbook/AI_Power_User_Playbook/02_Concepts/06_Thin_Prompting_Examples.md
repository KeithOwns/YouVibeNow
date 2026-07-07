# Concept: Thin Prompting Cheat Sheet

Thin Prompting is the ultimate goal of **Context Engineering** (defined in [[01_Context_Engineering]]). When your baseline identity (Custom Instructions) and external memory (Obsidian Digital Twin) are configured, you no longer need to write constraint-heavy, essay-length prompts. 

Here are three side-by-side examples illustrating the difference between legacy **Thick Prompting** and modern **Thin Prompting**.

---

## Example 1: Code Refactoring

### Legacy Thick Prompt (Brittle & Constrained)
> *"Act as an expert Python developer. I want you to look at the code below and find any database connection leaks. Only fix the connection leak; do not change any other lines of code or refactor the other helper functions. Return the entire corrected file. Do not write any conversational intro or apologies, just output the code."*
> 
> `[Pasted Python code here]`

### Modern Thin Prompt (Smarter & Clearer)
*Relying on Custom Instructions knowing your technical level, and the LLM's native reasoning capability.*
> *Fix the database connection leak in this code:*
> 
> `[Pasted Python code here]`

---

## Example 2: Drafting a Project Roadmap

### Legacy Thick Prompt (Over-engineered)
> *"I need to build a project roadmap for a new client project. My client is a small clinic that needs a basic appointment scheduler web app. I am an IT consultant. Please act as a project manager. Create a markdown table showing the timeline, phase, tasks, and dependencies. Keep the tasks very short and technical. Use a dark/neon theme if you are showing design ideas."*

### Modern Thin Prompt (Leveraging Background Context)
*Relying on Custom Instructions knowing you are an IT consultant who prefers structured tables and minimalist setups.*
> *Draft a roadmap for the clinic's appointment scheduler web app.*

---

## Example 3: Synthesizing Complex Research

### Legacy Thick Prompt (Monolithic)
> *"I am pasting my notes below. Read all these notes carefully. Based on these notes, write a 3-bullet summary of the main architectural decisions we made. Adopt a professional architect persona. Make sure the bullets are clear, direct, and contain no introductory text like 'Here is your summary'. Keep each bullet under 15 words."*
> 
> `[Pasted 3 pages of Obsidian vault notes]`

### Modern Thin Prompt (Symbiotic Context Delivery)
*Pasting the exact context nodes from your vault and letting the Reasoning Engine deduce formatting rules from the baseline.*
> *Summarize the core architectural decisions from these notes into 3 short bullets:*
> 
> `[Pasted Obsidian notes]`

---

## The Rule of Thumb: Subtract Constraints
If you find yourself writing instructions like *"Be concise,"* *"Don't apologize,"* or *"Act as a [Persona]"*, stop and delete them. If the AI is not responding correctly without those constraints, your **Custom Instructions** need tuning—do not pollute your active prompts with them.
