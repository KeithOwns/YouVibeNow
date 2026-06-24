# Module 3 Capstone: The AI Software Factory

*Combine continuous validation and multi-agent orchestration to build a fully autonomous development pipeline.*

## The Objective
You need to orchestrate a multi-agent system that autonomously plans, writes, and tests a small Python application without your manual intervention.

## The Requirements

### Step 1: The Workspace Setup
1. Create a new project folder named `Factory_Project`.
2. Inside, create a `tests/` directory and a `src/` directory.
3. Establish your Tier 2 architecture (Create an `AGENTS.md` and `CONTEXT.md`).
   *   In `CONTEXT.md`, establish the sandbox constraint: *"All code must be saved to `src/` and tested in `tests/`."*

### Step 2: The Orchestration Prompt
Open your chat interface in the root of the project. Write a single orchestration prompt that spins up an assembly line to build a Python "Password Generator" script.

Your prompt must instruct the main AI to:
1. **Spawn an Architect Agent:** Instruct it to write a 3-step technical plan for the password generator and save it as `plan.md`.
2. **Spawn a Developer Agent (after the Architect finishes):** Instruct it to read `plan.md` and write the actual Python code in `src/password_gen.py`.
3. **Spawn a QA Agent (after the Developer finishes):** Instruct it to read the source code, write a unit test in `tests/test_password_gen.py`, and run the test in the terminal using `pytest` or `python`. If the test fails, the QA agent must rewrite the source code until it passes.

## Passing the Capstone
You pass this capstone if:
1. The main chat window successfully spins up the agents in the correct sequential order.
2. The context is successfully handed off via the `plan.md` file.
3. The QA agent successfully runs a terminal command to validate the code.
4. You end up with a fully working, tested Python script without having written a single line of code yourself.
