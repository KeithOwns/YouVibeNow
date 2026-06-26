# Lesson 2: The Anatomy of a Perfect Prompt (The 5-Part Framework)

*The core lesson on structuring instructions to get useful results on the first try.*

## Introduction
The difference between a frustrating AI experience and a magical one usually comes down to one thing: structure. Most people treat AI like a search engine or a text message conversation. They write things like:
> *"Write a blog post about AI."*

This is called an **Unstructured Prompt**. It forces the AI to guess who it is, who the audience is, what the tone should be, and what the final product should look like. When you force an AI to guess, it resorts to average, generic training data.

To eliminate guesswork and get production-ready results on the first try, we use the **5-Part Prompt Framework**.

---

## The 5 Core Elements

### 1. Identity
**Who is the AI right now?**
Before you ask the AI to do anything, you must tell it what "role" to play. This anchors the model, narrowing down its trillions of parameters to focus only on the tone and knowledge relevant to that persona.
*   *Weak:* (No identity given)
*   *Strong:* "You are a senior content marketing manager specializing in B2B SaaS."

### 2. Task
**What exactly needs to get done?**
Define the action, the scope, and the specific details of the request. Be as explicit as possible.
*   *Weak:* "Write a blog post."
*   *Strong:* "Draft a 500-word blog post explaining how artificial intelligence is streamlining supply chain logistics."

### 3. Context
**What background information does the AI need to know?**
The AI doesn't know your business, your current project, or your target audience unless you tell it. Context bridges the gap between the AI's general knowledge and your specific situation.
*   *Weak:* "Make it sound professional."
*   *Strong:* "Our target audience is supply chain executives at Fortune 500 companies who are skeptical of new technology but care deeply about cost reduction."

### 4. Constraints
**What should the AI *avoid* doing?**
This is the most frequently skipped, yet most valuable step. Telling an AI what *not* to do is often more powerful than telling it what to do. It establishes the "guardrails" for the task.
*   *Weak:* (No constraints given)
*   *Strong:* "Do not use corporate jargon like 'synergy' or 'paradigm shift'. Do not mention our competitors."

### 5. Output Format
**What should the physical result look like?**
If you want a table, ask for a table. If you want a markdown file, ask for a markdown file. If you don't specify the format, the AI will guess (and usually default to a wall of text).
*   *Weak:* "Give me the results."
*   *Strong:* "Format the output as a Markdown table with three columns: Concept, Definition, and Real-World Example."

---

## Why Order Matters: The Outside-In Principle

The 5 parts above are listed in the order you should **type them**. This sequence is not arbitrary — it is grounded in how transformer-based LLMs process information at inference time.

### The Outside-In Logic

Each element narrows the model's interpretation space before the next one adds detail:

| Order | Element | Why it goes here |
| :---: | :--- | :--- |
| 1 | **Identity** | Establishes role before the model reads anything else. Every subsequent token is weighted against this frame. |
| 2 | **Task** | States the goal while the identity is fresh — the model now scans everything that follows with purpose. |
| 3 | **Context** | Background material is interpreted through the combined lens of role + task simultaneously, not neutrally. |
| 4 | **Constraints** | Applied to a solution the model is already forming, making guardrails more binding than if placed earlier. |
| 5 | **Output Format** | A final narrowing at the moment of generation — collapses the solution space last, not first. |

### The Research Backing: "Lost in the Middle"

LLMs do not read prompts linearly — they weight tokens by **position**. A landmark study by Liu et al. (2023), published in *Transactions of the Association for Computational Linguistics*, demonstrated that models perform **15–25 percentage points worse** when critical information is placed in the middle of a long context. Accuracy holds at the start and end of the context window but collapses in the middle — a **U-shaped performance curve**.

The root cause is structural. The attention mechanism in modern transformers uses Rotary Position Embedding (RoPE), which causes attention scores to decay naturally for tokens far apart in the sequence. Initial tokens accumulate attention influence across every subsequent layer — a phenomenon called **attention sinks**. Earlier tokens carry disproportionately more interpretive weight.

**The practical rule:** Put your most important framing — Identity and Task — at the very top. The model encodes everything that follows against what it has already seen.

> **Source:** Liu et al., "Lost in the Middle: How Language Models Use Long Contexts." *Transactions of the Association for Computational Linguistics*, 2024. arXiv:2307.03172.

---

### Reference Card: The Prompt Structure Framework
![Prompt Structure Framework](assets/prompt_structure_framework.png)

#### Prompt Strategy Table
*A quick reference guide for when to use which elements:*

| Task Type | Required Prompt Elements |
| :--- | :--- |
| **Simple task** | Task only. |
| **Creative** | Identity + Task + Constraints + Format. |
| **Complex** | All five. |
| **Ongoing project** | Identity and Context in files, Task and Constraints in each prompt. |

---

## Exercise: The Rewrite

**Your Task:**
Look at the following poorly written, unstructured prompt:
> *"Write me an email to the team about the new software update."*

Rewrite this prompt so that it explicitly utilizes all 5 parts of the framework.

<details>
<summary><b>Click to see an Example Solution</b></summary>

> **[Identity]** You are a friendly but direct Technical Project Manager.
> 
> **[Task]** Write an email to the engineering team announcing the successful deployment of the v2.0 software update.
> 
> **[Context]** The team has been working overtime for three weeks to get this done, and morale is a bit low. This update fixes the critical database latency issues we've been experiencing for the past month.
> 
> **[Constraints]** Do not make the email longer than three short paragraphs. Do not focus on future bugs or upcoming sprints; only celebrate the current win.
> 
> **[Output Format]** Format the output with a clear Subject Line, use bullet points to highlight the 3 key features included in the update, and include a professional sign-off.

</details>
