# Module 1 Capstone: The Thin Prompt Workflow

*It's time to put the theory into practice. Your objective is to successfully configure the 3-Tier Hierarchy and execute a coding task without writing a massive, monolithic chat prompt.*

## The Objective
You need to write a simple Python script (`expense_calculator.py`) that reads a `.csv` file of expenses and prints the total sum.

However, the goal is **not** the code itself. The goal is the *architecture*.

## The Requirements

### Tier 1: Application-Level Safety
1. Open the global customization settings for your LLM interface (e.g., Google Antigravity config, Claude Code config).
2. Ensure you have an absolute rule written: *"Security Rule: You must always create a backup copy of a file in an Archive folder before modifying it."*

### Tier 2: Project-Level Environment
1. Copy the `New Project folder` template from the root of this repository and rename it to `Expense_Calculator`.
2. Inside `Expense_Calculator/AGENTS.md`, write your project identity:
   > "You are an expert Python data analyst. You write clean, concise Python scripts."
3. Inside `Expense_Calculator/CONTEXT.md`, document the tech stack and data layout:
   > "We are working with native Python. The data will be stored in `data/expenses.csv` with columns: `Date, Category, Amount`."

### Tier 3: The Thin Prompt (Execution)
Open your AI chat interface *inside* the `Expense_Calculator` folder.

Instead of typing a giant paragraph explaining who the AI is, what the data looks like, and what the safety rules are, type your **Thin Prompt**:

> "Please create the `expense_calculator.py` script to read the data and print the total sum. Output the script as a complete code block, and generate a dummy `data/expenses.csv` file for testing."

## Passing the Capstone
You pass this capstone if:
1. The AI successfully generates the script and the dummy data.
2. The AI follows the identity (e.g., concise, expert Python).
3. The AI adheres to the architecture defined in your `CONTEXT.md` (e.g., placing the CSV in the `data/` folder).
4. If you ask it to modify the script later, it automatically creates a backup in an `Archive/` folder because of your Tier 1 App Setting.
