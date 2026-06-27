# Lesson 5: InfoSec & Prompt Engineering

*Because giving an autonomous AI unrestricted access to your files is a terrible idea.*

## Introduction
As you transition from casually chatting with an AI in a browser window to granting it read/write access to your local file system, the stakes become exponentially higher. You are no longer just dealing with "bad text outputs"—you are dealing with the potential for deleted data, corrupted repositories, and leaked API keys. 

To safely build alongside autonomous agents, you must adopt a strict Information Security (InfoSec) mindset. Specifically, you must integrate the core InfoSec triad directly into your prompt engineering: **Confidentiality**, **Integrity**, and **Availability** (The CIA Triad).

---

## Key Concepts

### 1. Confidentiality (Protecting Secrets)
Never upload `.env` files, hardcoded API keys, or proprietary client data into an AI's context window.
When building your `CONTEXT.md` files or running skills, ensure you are utilizing `.gitignore` files aggressively. If you must feed an AI a script that contains sensitive data, you must explicitly instruct it to use placeholder variables (e.g., `API_KEY="insert_key_here"`) and redact the real keys before passing the text to the model.

### 2. Integrity (Protecting Data Accuracy)
Integrity means ensuring your files are not unintentionally altered, corrupted, or deleted by an over-eager AI hallucination. 
This is exactly why our `AGENTS.md` file must contain a strict Global Rule: *"Never modify a file without backing it up first."* Before the AI executes a command to rewrite a massive code file, it must be forced to duplicate that file into an `Archive/` folder. This guarantees you always have a pristine copy of the project's exact state before the AI intervened.

### 3. Availability (Protecting Workflow Continuity)
Availability ensures that your project history and decisions are always accessible and auditable. 
If an AI goes rogue or breaks a feature, you need to know exactly *what* it did and *why* it did it. By maintaining a `HISTORY.md` file inside your `Archive/` folder, you force the AI to document every action it takes. If something breaks, you don't have to guess what happened—you just read the audit log.

---

## Exercise: The InfoSec Auditor

**Your Task:**
You have a new employee who wrote the following prompt for an AI coding agent: 

*"Here is the code for our database login script, including our root AWS credentials. Please rewrite this script so it runs faster, and immediately overwrite the existing file on our live server so we can test it."*

Using the CIA Triad (Confidentiality, Integrity, Availability), write out the three critical InfoSec violations in this prompt.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> 1. **Confidentiality Violation:** Passing root AWS credentials into the AI's context window. The keys should have been redacted or hidden locally in a `.env` file.
> 2. **Integrity Violation:** Instructing the AI to "immediately overwrite the existing file" without asking for a backup or creating a duplicate in an `Archive/` folder first.
> 3. **Availability Violation:** Deploying and testing unverified, AI-generated code directly on a "live server" instead of a sandboxed testing environment, risking massive system downtime.

</details>
