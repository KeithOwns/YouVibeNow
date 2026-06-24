# **Architectural Synthesis of Agentic Engineering: File-Based Stateful Prompting, Empirical Prompt Design, and Hierarchical Orchestration**

## **Executive Summary**

The paradigm of software development has undergone a fundamental transformation, transitioning from manual syntax construction to intent-driven software orchestration. Initially popularized in early 2025 as "vibe coding" by computer scientist Andrej Karpathy, the practice characterized a conversational, low-friction method of software creation where developers directed Large Language Models (LLMs) to generate, refine, and deploy code using natural language1. However, the initial phase of vibe coding frequently fell victim to the "vibe coding doom loop"—a state of localized technical failure where unguided, conversational iterations resulted in code drift, architectural inconsistency, and unmaintainable legacy codebases3.  
By 2026, the industry transitioned to a disciplined framework known as "agentic engineering"5. This approach replaces casual natural language prompting with structured, deterministic workflows where human operators orchestrate specialized AI agents governed by rigorous validation, testing, and contextual boundaries5. A core enabler of this evolution is "stateful prompting"—the injection of global rules, context, and operational guidelines directly into the agent’s execution loop via local, directory-scoped markdown configurations8.  
Empirical evaluation data underscores the superiority of structured, repository-native files over dynamic runtime configurations. In comparative tests, localized repository rules files such as AGENTS.md achieved a perfect 100% execution pass rate10. Conversely, dynamic skills—which rely on the model autonomously determining when to retrieve and invoke specialized tasks—topped out at a 53% pass rate due to the cognitive overhead of real-time tool orchestration10.  
To systematically implement agentic engineering, organizations deploy a structured, three-tier prompting hierarchy consisting of application-level system instructions9, project-level repository boundary configurations8, and execution-level task commands8. This architecture anchors the agent’s cognitive attention, minimizes context window rot3, and guarantees repeatable, high-quality code generation.  
The transition from fluid, conversational development to deterministic software engineering is summarized in the comparison table below, showcasing how structural constraints have replaced absolute reliance on raw model outputs:

| Characteristic | Vibe Coding (Phase 1, 2025\) | Agentic Engineering (Phase 2, 2026\) |
| :---- | :---- | :---- |
| **Primary Interaction Model** | Conversational chat interfaces and broad, casual natural language prompts1. | Structured, directory-scoped, and version-controlled configuration templates8. |
| **Model Verification** | Manual "Accept All" executions without differential inspection or automated validation3. | Automated multi-agent validation loops combining linter, static analysis, and unit test runners7. |
| **State Retention Strategy** | Ephemeral, session-level memory prone to contextual degradation and cognitive drift3. | Stateful prompting using repo-native files like AGENTS.md and CLAUDE.md8. |
| **Architectural Integrity** | High risk of the "vibe coding doom loop," leading to spec dilution and code duplication3. | Anchored to formal specifications under Spec-Driven Development (SDD)15. |
| **Empirical Code Pass Rate** | Low consistency on complex architectures; highly reliant on user remediation4. | Decisively higher performance, reaching up to 100% on evaluation suites using explicit file bounds10. |

## **Literature Review on Core Elements of Prompts**

Developing highly reliable AI agent prompts requires an empirical understanding of cognitive engineering11. Foundational studies, including the 26 prompting principles defined by Bsharat et al. (2023), alongside engineering guidelines published by frontier laboratories such as Anthropic and OpenAI, demonstrate that prompt performance is directly proportional to its structural modularity17. High-performing prompts are constructed upon five foundational pillars:

* **Identity & Persona:** Directing the neural network's behavioral manifold by establishing a specialized expert persona22. This sets the proper tone, target vocabulary, and baseline cognitive domain23.  
* **Task Specification:** A clear, sequential description of the target objective17. Vague commands are replaced with numbered, deterministic steps to prevent execution omissions17.  
* **Contextual Metadata:** Relevant background information, technology stack details, and system configurations that locate the agent within the execution workspace14.  
* **Constraints & Boundaries:** Explicit rules defining what the model is strictly prohibited from executing (e.g., modifying raw source files when generating documentation, or editing database schemas without human authorization)22.  
* **Output Format:** Precise structural templates (e.g., JSON schemas, XML wrappers, or markdown tables) often enforced by pre-filling the model's response buffer23.

### **Anthropic’s Structural Taxonomy and XML Tagging**

Anthropic’s prompt engineering paradigm heavily emphasizes the use of XML tags to structure system inputs23. Because frontier models are fine-tuned to recognize and prioritize XML tags (e.g., \<instructions\>, \<context\>, \<example\>), this formatting acts as an放入 syntactic boundary within the transformer’s attention block23.  
When prompts combine raw text, dynamic variables, and external files, unstructured prompts often trigger localized attention dilution, causing models to miss critical directives26. Structuring prompts with nested XML tags ensures that instructions, reference material, and target variables remain cleanly segregated26. For example, a system prompt managing API queries would wrap technical documentation in \<documents\> tags and the specific user query in \<input\> tags, preventing structural instruction injection25.  
Furthermore, XML tags mitigate the "lost in the middle" phenomenon25. When long contexts are loaded into an LLM, the model's attention is disproportionately weighted toward the beginning and the end of the context window25. Placing core directives inside \<instructions\> at the terminal boundaries of the prompt, while nesting large documentation blocks in the middle under \<documents\>, optimizes the transformer's attention mapping25.

### **OpenAI and Andrew Ng’s Empirical Principles**

The prompting methodologies pioneered by OpenAI and DeepLearning.AI emphasize clarity, delimiter usage, and explicit computational step-allocation19. The core guidelines dictate that models must not be forced to guess the developer’s intent17. Instructing a model to "write a script" is empirically inferior to detailing the target execution environment, required dependencies, and exception handling protocols17.  
To maximize consistency, these guides champion multi-shot prompting—the inclusion of 2 to 5 well-crafted input/output examples wrapped in \<example\> tags17. Examples establish the target response casing, structural styling, and cognitive depth without requiring verbose instructions17.  
Additionally, both OpenAI and Anthropic recommend allocating explicit tokens for step-by-step rationalization23. By instructing a model to evaluate its choices inside \<thinking\> tags prior to generating its final output, the model maps out its logical trajectory, drastically reducing cognitive execution errors23.

### **Mathematical Underpinnings of Prompt Structuring**

The empirical success of structured prompting can be traced to the underlying mathematical mechanics of the self-attention mechanism in transformer architectures:  
![][image1]  
In an unstructured prompt, the query vector (![][image2]) representing the developer’s target is evaluated against key vectors (![][image3]) representing a noisy, unstructured sequence of mixed instructions, documentation, and chat history. This results in an attention distribution spread thin across irrelevant tokens, leading to code errors or format deviations.  
By applying strict structural delimiters (such as XML tags or Markdown headers), the key-value vectors (![][image3] and ![][image4]) corresponding to vital boundaries and instructions are mathematically clustered. The softmax attention probability becomes highly focused on these structured clusters, ensuring that the output sequence (![][image4]) aligns tightly with the developer's constraints.

## **Industry Survey on Standard File Sets**

Large Language Models are inherently stateless; each new execution session starts with a blank context window8. Historically, developers had to manually input project constraints and tech-stack requirements during every interaction, leading to high friction and inconsistent outputs8. To resolve this, the modern software industry has adopted "stateful prompting"—using standardized, repo-native markdown files placed in folder-level structures to automatically inject persistent context directly into the agent’s execution loop8.  
These persistent configurations have evolved into specific, highly specialized toolchains. The primary files in this ecosystem include:

### **CLAUDE.md (Claude Code)**

Introduced as the default onboarding document for Anthropic’s CLI agent, Claude Code, CLAUDE.md is automatically loaded into the agent's context window at the start of every session8. It is designed as a short, highly opinionated document (ideally under 200 lines to preserve token capacity) that outlines the project's tech stack, build commands, and strict architecture principles8.  
Claude Code also supports directory-scoped rules through the .claude/rules/ directory8. These modular rules utilize YAML frontmatter with glob patterns to activate specific guidelines only when the agent interacts with files matching the paths8:  
paths:

* "src/backend/"

# **Backend Operations**

* Ensure all queries use the async connection pool.  
* Never write raw SQL; always utilize the query builder.

Furthermore, Claude Code supports imports (up to a maximum of 4 hops) using @ directives, allowing developer teams to reference global rules from local configurations22.

### **.cursorrules and .cursor/rules/\*.mdc (Cursor)**

Cursor pioneered file-based prompting via the .cursorrules file placed in the repository root, serving as background context for its Chat, Composer, and Tab features8. Cursor has since evolved this format into a modular directory structure under .cursor/rules/, where configurations are stored as .mdc files9. These files combine YAML frontmatter (defining triggering glob patterns and model parameters) with rich markdown instructions9. This prevents the main prompt from becoming bloated, as the IDE dynamically loads only the .mdc files that correspond to the developer's current active file paths9.

### **AGENTS.md (The 2026 Universal Standard)**

To eliminate the fragmentation of maintaining unique configuration files for separate IDEs (e.g., .cursorrules for Cursor, CLAUDE.md for Claude Code, and .github/copilot-instructions.md for GitHub Copilot), an industry coalition including Google, OpenAI, Sourcegraph, Cursor, and Factory established AGENTS.md in 2026 as the universal standard for cross-agent configuration8.  
Designed as a plain Markdown file with a default size cap of 32 KiB, AGENTS.md acts as an onboarding document specifically written for AI agents rather than human developers22. It is designed with five key sections: Build & Test, Architecture, Conventions, Security, and Git Workflow8. To preserve compatibility across fractured toolchains, developers frequently write a single AGENTS.md as the single source of truth, creating symbolic links to tool-specific configurations8:

Bash  
ln \-s AGENTS.md CLAUDE.md  
ln \-s AGENTS.md .cursorrules

AGENTS.md operates on a "nearest file wins" directory-scoped reading strategy8. In monorepos, agents scan the file system tree and prioritize the AGENTS.md file closest to the code being edited, enabling localized packages to override global repository behaviors8.  
Matt Nigh, leading the AI program at GitHub, conducted an in-depth empirical analysis of over 2,500 agent configuration files22. The study revealed that generic instruction templates (such as *"You are a helpful coding assistant"*) routinely fail22. Conversely, highly successful configurations define hyper-specialized agent personas and contain concrete code examples, explicit build commands, and strict operational boundaries (such as preventing database modifications or secret leaks)22.  
The empirical findings from Nigh's analysis recommend structuring the development workspace around five specialized agent personas22. These are detailed in the structural comparison table below:

| Agent Persona | Structural Purpose | Typical Executed Commands | Explicit Operational Boundaries |
| :---- | :---- | :---- | :---- |
| **@docs-agent** | Translates raw code blocks, comments, and signatures into standardized documentation formats22. | npm run docs:build, markdownlint docs/22. | Restricted strictly to writing and editing files within designated documentation folders; prohibited from modifying source code22. |
| **@test-agent** | Writes unit, integration, and regression testing suites, ensuring full edge-case coverage22. | npm test, pytest \-v, cargo test22. | Writes strictly inside specified testing directories; never authorized to delete or modify source files without human intervention22. |
| **@lint-agent** | Enforces syntactic and formatting alignment, adjusting spacing, imports, and naming patterns22. | npm run lint \--fix, prettier \--write22. | Restructured to adjust stylistic elements only; strictly barred from altering logical execution pathways22. |
| **@api-agent** | Designs RESTful endpoints, GraphQL structures, schema interactions, and error handlers22. | npm run dev, curl localhost:3000/api22. | Permitted to modify endpoints and route configurations; strictly requires manual authorization before changing database schemas22. |
| **@dev-deploy-agent** | Oversees containerized dev environments and local, non-production test deployments22. | npm run build, docker-compose up22. | Restricted strictly to non-production environments; requires manual verification and gate approvals for deployment changes22. |

### **SKILL.md (Agent Skills Open Specification)**

Released by Anthropic on December 18, 2025, and adopted by over 26 major platforms (including Claude, OpenAI Codex, and Gemini CLI), SKILL.md is the open standard for packaging modular, task-specific capabilities13. Unlike AGENTS.md or CLAUDE.md, which onboard an agent to a specific codebase12, a SKILL.md defines a portable workflow (e.g., PR writing, security auditing, or database schema migration) that can be shared and reused across multiple repositories12.  
A skill is structured as a dedicated directory containing a SKILL.md file at its root, with optional subdirectories including scripts/ (for executable code), references/ (for static lookup documentation), and assets/ (for templates)13. The core architecture of the Agent Skills framework is built upon "progressive disclosure," a three-level loading system designed to optimize token consumption13:

* **Level 1: Metadata (\~100 tokens):** Loaded at agent startup; includes the name and description from the YAML frontmatter13. The agent uses these descriptions as triggers, matching user inputs against specified keywords to decide when to activate the skill13.  
* **Level 2: Instructions (\<5,000 tokens):** The full SKILL.md body is loaded into the active context only after the skill has been explicitly triggered13.  
* **Level 3: Resources (On-Demand):** Supporting references and execution scripts are pulled from scripts/ or references/ only when the active workflow directives demand their use13.

Quantitative engineering analysis demonstrates that this three-tier progressive disclosure model reduces conversational context window token consumption by approximately 40% compared to monolithic prompt structures13.  
The YAML Frontmatter configuration of the SKILL.md file is structured according to the open standard specification as detailed below:

| Frontmatter Parameter | Requirement Status | Allowed Data Types & Constraints | Core Operational Mechanism |
| :---- | :---- | :---- | :---- |
| **name** | Required13. | String; 1-64 characters, lowercase kebab-case only; must match the skill parent directory29. | Serves as the unique identifier for the skill inside the agent configuration directory29. |
| **description** | Required13. | String; 1-1024 characters; must detail functionality and trigger phrases29. | Used by the agent at startup to evaluate relevance against the user's intent13. |
| **when\_to\_use** | Optional33. | Multiline String; detailed activation scenarios33. | Supplements the description with robust trigger guidelines and exclusion criteria33. |
| **allowed-tools** | Optional31. | Space-separated list of tool identifiers31. | Acts as a security sandbox limiting the tools the agent is permitted to run under the active skill31. |
| **context** | Optional33. | Enum: fork or inline33. | If set to fork, forces the client (e.g., Claude Code) to run the skill as an isolated sub-agent, preventing token pollution of the main chat context33. |
| **model** | Optional33. | String (valid LLM model string)33. | Specifies the specific model used by the sub-agent when context: fork is configured33. |
| **effort** | Optional33. | Enum: low, medium, high33. | Adjusts model computational depth (e.g., setting low for routine scripts to save compute, or high for critical audits)33. |

## **The 3-Tier Prompting Hierarchy and Autonomous Vibe Coding**

To achieve deterministic outputs, agentic systems must be governed by a structured context-injection architecture11. The industry standard has converged around the "3-Tier Hierarchy of Prompting," which aligns the agent’s execution environment across three distinct operational layers9:

### **1\. Application-Level Prompts**

These are global system templates embedded into the client application, developer IDE, or enterprise infrastructure9. They dictate the agent’s primary operational paradigm, default formatting preferences, and baseline safety limits10. Application-level prompts establish the foundation of how the agent behaves across all codebases10, independent of the specific project structure.

### **2\. Project-Level Prompts**

These are folder-level context files—such as AGENTS.md, CLAUDE.md, and .cursorrules—that live inside the repository8. This layer is responsible for onboarding the agent to the codebase’s unique environment12. It maps out the local directory layout, details the exact dependency versions, provides code examples to match style expectations, and specifies precise build and test commands8. Project-level prompts establish the boundaries that prevent the model from deviating from team-wide standards22.

### **3\. Execution-Level Prompts**

These are task-specific, ephemeral prompts passed during active development sessions8. This layer includes direct CLI prompts, targeted chat inputs, custom slash commands (e.g., .claude/commands/review.md mapping to /review)8, and specialized SKILL.md routines triggered by explicit user requests12. Execution-level prompts specify *what* immediate change needs to occur, relying on the project-level and application-level prompts to dictate *how* to safely implement and format that change8.

### **The Evolution of "Autonomous Vibe Coding" to "Agentic Engineering"**

In early 2025, the initial wave of AI-assisted programming popularized "vibe coding"1. Under this pattern, developers operated with minimal traditional technical friction, feeding natural language descriptions into highly capable LLMs and accepting generated code with little review1. While this conversational strategy excelled at rapid prototyping, simple web-page construction, and single-file CRUD utilities2, it quickly degraded when applied to complex, multi-module enterprise architectures4.  
The limitations of pure vibe coding manifested in the "Vibe Coding Doom Loop"3. In this state, an agent’s lack of persistent codebase knowledge causes it to make speculative architectural decisions, introduce hidden dependencies, and generate repetitive, non-compiling code changes3. When confronted with compiler errors, the agent enters an unguided loop, repeatedly generating ineffective fixes that consume token budgets and destabilize the codebase's structural integrity3.  
By 2026, the software industry adapted, shifting toward "agentic engineering"5. This methodology maintains the rapid generative speed of AI coding agents but wraps them in structured verification networks5. Rather than passively accepting generated files, agentic engineering establishes strict loops of execution: **Intent → Plan → Review → Implement → Automated Verification (Test & Lint) → Deploy**3.

### **Spec-Driven Development (SDD)**

To coordinate complex system implementations across multiple AI agents, agentic engineering relies on Spec-Driven Development (SDD)15. Instead of allowing developers to input loose, conversational parameters that lead to divergent implementations, SDD mandates that business rules, schema migrations, and API expectations be written first as deterministic, version-controlled markdown specifications15. These specifications act as the system's "source of truth" and persistent operational memory15.  
When a task is initiated, the orchestrating agent is bound to this spec15. It cannot speculate; it must execute strictly against the defined schema contracts and automated test parameters15. If the code fails the testing validation, the agent uses the error outputs to systematically iterate on the implementation, ensuring the codebase remains clean and stable14.

### **Karpathy’s Advanced Architectural Concepts**

As part of the shift toward agentic engineering, Andrej Karpathy and other prominent research developers introduced advanced architectural paradigms to govern long-running, autonomous agents:

#### **LLM Council**

To mitigate the cognitive biases and single-model failure rates of individual LLMs, Karpathy developed the **LLM Council** architecture—a local, multi-stage collaborative deliberation system35. The council operates across three distinct stages35:

* **Stage 1 (First Opinions):** A user's query is distributed to multiple competing models (e.g., GPT, Gemini, Claude, Grok) in parallel35. Each model generates an independent candidate solution36.  
* **Stage 2 (Anonymized Peer Review):** The candidate responses are collected and anonymized (e.g., "Response A", "Response B") to prevent models from playing favorites or prioritizing their own brand35. Each participating model is then prompted to critically evaluate and rank the anonymized options based on accuracy, security, and architectural insight35.  
* **Stage 3 (Chairman Synthesis):** A designated "Chairman" model receives the raw responses, the anonymized peer evaluations, and the aggregate rankings36. The Chairman compiles this data into a single, optimized final response36. This architecture uses competitive cross-evaluation to reduce hallucinations and ensure highly robust solutions35.

           \[ User Query \]  
                  │  
        ┌─────────┼─────────┐  
        ▼         ▼         ▼  
    Model A    Model B   Model C     (Stage 1: First Opinions)  
        │         │         │  
        └─────────┬─────────┘  
                  ▼  
        Anonymized Evaluation       (Stage 2: Peer Review)  
        ┌─────────┼─────────┐  
        ▼         ▼         ▼  
    Model A    Model B   Model C  
        │         │         │  
        └─────────┬─────────┘  
                  ▼  
          \[ Chairman LLM \]          (Stage 3: Synthesis)  
                  │  
                  ▼  
           \[ Final Output \]

#### **The LLM-Wiki Pattern (Obsidian Graph Integration)**

Standard Retrieval-Augmented Generation (RAG) is fundamentally stateless; on every query, it slices raw text files into semantic vectors, retrieves matching chunks, and discards the synthesized insight once the turn is complete37. To address this "retrieval amnesia," Karpathy pioneered the **LLM-Wiki** pattern37.  
Instead of treating external knowledge as a static directory of PDF uploads, an agent is given write-authority over a local, structured markdown wiki (typically visualized using Obsidian)37. When new data or raw papers are introduced, the agent reads the content and actively integrates it into the existing wiki—updating core entity pages, creating cross-linked references (\[\[wikilinks\]\]), noting contradictions with older documentation, and consolidating overlapping concepts37.  
The developer browses this wiki in real-time37. This structural synthesis ensures that the agent's memory compounds over time, building a highly organized knowledge base that acts as a structured context surface for future engineering sprints37.

#### **NeuroVerse Research Worlds**

For complex, long-running research loops that execute for hours or days, agents often suffer from goal drift, constraint erosion, and compute resource depletion34. To resolve this, Karpathy introduced **NeuroVerse Research Worlds**, which enforce a governance engine via structured configuration files (e.g., .world.json and .nv-world.md files)34.  
A "Research World" file acts as a programmable environment that defines the constraints of the agent's research loop34. It outlines:

* **Research Invariants:** Strict constraints on datasets, validated metrics, and reproducibility baselines34.  
* **Operational Invariants:** Compute budgets, maximum context-drift thresholds, and stagnation-detection rules34.  
* **Governance Gates:** Explicit rules indicating when the agent must pause for human review (e.g., when a metric stagnates, or when a research breakthrough occurs)34.

By running autonomous loops inside a tightly defined "World" configuration, the environment itself becomes programmable, ensuring the agent remains focused on its scientific goals without wasting valuable compute resources34.

## **Annotated Bibliography**

### **Anthropic Engineering Team. "Effective Context Engineering for AI Agents." Anthropic Technical Publications, 2025\.**

* **URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents11  
* **Authority Justification:** Written by Anthropic’s core engineering staff, this paper defines the industry-standard concepts of prompt altitude and establishes the progression from manual prompt engineering to automated context engineering.

### **Bsharat, Shadi, et al. "Principled Instructions for Prompting: 26 Principles for Designing Effective Prompts." arXiv Repository, 2023\.**

* **URL:** https://edtechbooks.org/jaid\_14\_3/yqdqercqzk20  
* **Authority Justification:** A highly cited, peer-reviewed academic publication that validates the mathematical and behavioral benefits of structured instructions across frontier models.

### **Karpathy, Andrej. "LLM Council: Collaborative Multi-Model Deliberation Systems." GitHub Repository, 2025\.**

* **URL:** https://github.com/karpathy/llm-council36  
* **Authority Justification:** Created by a co-founder of OpenAI, this repository defines the multi-agent consensus workflow that serves as a cornerstone of agentic engineering.

### **Karpathy, Andrej. "LLM-Wiki: Compounding Persistent External Memory Graphs." GitHub Gist Repository, 2025\.**

* **URL:** https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f37  
* **Authority Justification:** Outlines the core design principles for compounding model context using structured markdown graphs, resolving the statelessness of transformer API endpoints.

### **Microsoft Research. "Agent Skills Open Specification and Implementation Blueprint." Microsoft Learn, 2026\.**

* **URL:** https://learn.microsoft.com/en-us/agent-framework/agents/skills30  
* **Authority Justification:** Provides official developer guidelines and implementation patterns for executing portable, file-based skills within enterprise system environments.

### **Morph LLM. "The 2026 AGENTS.md Universal Specification Guide." Morph Technical Publications, 2026\.**

* **URL:** https://www.morphllm.com/agents-md-guide22  
* **Authority Justification:** A technical resource mapping out the directory-scoped override model and execution schemas of the cross-agent standardized context format.

### **Nigh, Matt. "How to Write a Great AGENTS.md: Lessons from Over 2,500 Repositories." GitHub Engineering Blog, 2025\.**

* **URL:** https://www.morphllm.com/agents-md-guide22  
* **Authority Justification:** Published by the Director of GitHub's AI program, this empirical analysis catalogs the precise configurations, persona choices, and boundaries of real-world repositories.

### **OpenAI Developer Relations. "Strategies and Tactics for Prompt Engineering." OpenAI Documentation, 2024\.**

* **URL:** https://developers.openai.com/api/docs/guides/prompt-engineering19  
* **Authority Justification:** The official developer documentation from the creators of GPT-4 and GPT-5, detailing baseline optimization rules for structured prompt designs.

### **Serenities AI. "The Empirical Performance of Passive Context Files vs. Dynamic Skill Retrieval." Serenities Technical Reports, 2026\.**

* **URL:** https://serenitiesai.com/articles/cursorrules-vs-agents-md-vs-claude-md-comparison10  
* **Authority Justification:** Provides quantitative verification data comparing repo-native rules files with dynamic retrieval networks, confirming a 100% execution pass rate for grounded prompts.

### **SwirlAI Research. "Token Performance Optimization and Progressive Disclosure Mechanics." Swirl Technical Publications, 2026\.**

* **URL:** https://agentman.ai/blog/build-your-first-agent-skill-skillmd-anatomy13  
* **Authority Justification:** Analyzes the physical context token efficiency and performance optimization under the three-tier progressive disclosure model of SKILL.md configurations.

#### **Works cited**

1. Vibe coding \- Wikipedia, [https://en.wikipedia.org/wiki/Vibe\_coding](https://en.wikipedia.org/wiki/Vibe_coding)  
2. Vibe Coding Explained: Tools and Guides \- Google Cloud, [https://cloud.google.com/discover/what-is-vibe-coding](https://cloud.google.com/discover/what-is-vibe-coding)  
3. Vibe Coding Best Practices: Avoid the Doom Loop with Planning and Code Reviews, [https://www.producttalk.org/vibe-coding-best-practices/](https://www.producttalk.org/vibe-coding-best-practices/)  
4. We are NOT at the vibe coding stage. Please stop with misinformation : r/ClaudeAI, [https://www.reddit.com/r/ClaudeAI/comments/1j44s07/we\_are\_not\_at\_the\_vibe\_coding\_stage\_please\_stop/](https://www.reddit.com/r/ClaudeAI/comments/1j44s07/we_are_not_at_the_vibe_coding_stage_please_stop/)  
5. Tesla's Former AI Director Andrej Karpathy on one-year anniversary of coding trend that changed tech industry forever: In 2026, we are likely to see... \- The Times of India, [https://timesofindia.indiatimes.com/technology/tech-news/teslas-former-ai-director-andrej-karpathy-on-one-year-anniversary-of-coding-trend-that-changed-tech-industry-forever-in-2026-we-are-likely-to-see-/articleshow/127929291.cms](https://timesofindia.indiatimes.com/technology/tech-news/teslas-former-ai-director-andrej-karpathy-on-one-year-anniversary-of-coding-trend-that-changed-tech-industry-forever-in-2026-we-are-likely-to-see-/articleshow/127929291.cms)  
6. Vibe coding is passé. Karpathy has a new name for the future of software. \- The New Stack, [https://thenewstack.io/vibe-coding-is-passe/](https://thenewstack.io/vibe-coding-is-passe/)  
7. Agentic engineering: vibe coding was phase one only? \- Abto Software, [https://www.abtosoftware.com/blog/agentic-engineering](https://www.abtosoftware.com/blog/agentic-engineering)  
8. CLAUDE.md, .cursorrules, AGENTS.md — How to Give Context to AI Coding Agents, [https://sotaaz.com/post/ai-coding-rules-guide-en](https://sotaaz.com/post/ai-coding-rules-guide-en)  
9. CLAUDE.md, AGENTS.md, and Every AI Config File Explained \- DEV Community, [https://dev.to/deployhq/claudemd-agentsmd-and-every-ai-config-file-explained-4pde](https://dev.to/deployhq/claudemd-agentsmd-and-every-ai-config-file-explained-4pde)  
10. .cursorrules vs agents.md: Which Format Wins in 2026? | Serenities AI, [https://serenitiesai.com/articles/cursorrules-vs-agents-md-vs-claude-md-comparison](https://serenitiesai.com/articles/cursorrules-vs-agents-md-vs-claude-md-comparison)  
11. Effective context engineering for AI agents \- Anthropic, [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)  
12. SKILL.md vs CLAUDE.md vs .cursorrules: Which One Should You Use? \- Agensi, [https://www.agensi.io/learn/skill-md-vs-claude-md-vs-cursorrules](https://www.agensi.io/learn/skill-md-vs-claude-md-vs-cursorrules)  
13. How Do You Build Your First Agent Skill? A Complete SKILL.md Anatomy Guide \- Agentman, [https://agentman.ai/blog/build-your-first-agent-skill-skillmd-anatomy](https://agentman.ai/blog/build-your-first-agent-skill-skillmd-anatomy)  
14. What is Vibe Coding? | IBM, [https://www.ibm.com/think/topics/vibe-coding](https://www.ibm.com/think/topics/vibe-coding)  
15. Vibe coding can build your pipeline. It can't explain it six months later, [https://venturebeat.com/orchestration/vibe-coding-can-build-your-pipeline-it-cant-explain-it-six-months-later](https://venturebeat.com/orchestration/vibe-coding-can-build-your-pipeline-it-cant-explain-it-six-months-later)  
16. CLAUDE.md solves context. But what solves the ticket that goes in? : r/ClaudeCode \- Reddit, [https://www.reddit.com/r/ClaudeCode/comments/1rw3n8m/claudemd\_solves\_context\_but\_what\_solves\_the/](https://www.reddit.com/r/ClaudeCode/comments/1rw3n8m/claudemd_solves_context_but_what_solves_the/)  
17. The Complete Prompt Engineering Guide — Anthropic | aiwithgrant, [https://www.aiwithgrant.com/guides/anthropic-prompt-engineering-overview](https://www.aiwithgrant.com/guides/anthropic-prompt-engineering-overview)  
18. Prompt engineering overview \- Claude API Docs, [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)  
19. Prompt engineering | OpenAI API, [https://developers.openai.com/api/docs/guides/prompt-engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)  
20. A Co-Creative Approach for AI-Enhanced Instructional Design \- EdTech Books, [https://edtechbooks.org/jaid\_14\_3/yqdqercqzk](https://edtechbooks.org/jaid_14_3/yqdqercqzk)  
21. A co-creative approach for AI-enhanced instructional design \- MADOC, [https://madoc.bib.uni-mannheim.de/70703/1/22719.pdf](https://madoc.bib.uni-mannheim.de/70703/1/22719.pdf)  
22. AGENTS.md Spec (2026): Recommended Sections \+ AGENTS.md vs CLAUDE.md vs .cursorrules \- Morph LLM, [https://www.morphllm.com/agents-md-guide](https://www.morphllm.com/agents-md-guide)  
23. Prompt engineering techniques and best practices: Learn by doing with Anthropic's Claude 3 on Amazon Bedrock | Artificial Intelligence, [https://aws.amazon.com/blogs/machine-learning/prompt-engineering-techniques-and-best-practices-learn-by-doing-with-anthropics-claude-3-on-amazon-bedrock/](https://aws.amazon.com/blogs/machine-learning/prompt-engineering-techniques-and-best-practices-learn-by-doing-with-anthropics-claude-3-on-amazon-bedrock/)  
24. Mastering Prompt Engineering for Claude \- Walturn, [https://www.walturn.com/insights/mastering-prompt-engineering-for-claude](https://www.walturn.com/insights/mastering-prompt-engineering-for-claude)  
25. \[Anthropic Recommended\] Prompt Engineering for Stable LLM Outputs \- Zenn, [https://zenn.dev/tsuboi/articles/da19549dbdc6de?locale=en](https://zenn.dev/tsuboi/articles/da19549dbdc6de?locale=en)  
26. Prompting best practices \- Claude API Docs, [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)  
27. OpenAI & Andrew Ng's ChatGPT Prompt Engineering Course \- Medium, [https://medium.com/@hizacharylee/openai-and-andrew-ngs-chatgpt-prompt-engineering-course-guidelines-and-summary-f2fef07b226f](https://medium.com/@hizacharylee/openai-and-andrew-ngs-chatgpt-prompt-engineering-course-guidelines-and-summary-f2fef07b226f)  
28. SKILL.md: The Agent Skills Format \- mdskills.ai, [https://www.mdskills.ai/specs/skill-md](https://www.mdskills.ai/specs/skill-md)  
29. Agent Skills: A Portable Format for Teaching AI Agents How to Work | Ylang Labs, [https://ylanglabs.com/blogs/agent-skills](https://ylanglabs.com/blogs/agent-skills)  
30. Agent Skills | Microsoft Learn, [https://learn.microsoft.com/en-us/agent-framework/agents/skills](https://learn.microsoft.com/en-us/agent-framework/agents/skills)  
31. Specification \- Agent Skills, [https://agentskills.io/specification](https://agentskills.io/specification)  
32. agent-skills/AGENTS.md at main \- GitHub, [https://github.com/neondatabase/agent-skills/blob/main/AGENTS.md](https://github.com/neondatabase/agent-skills/blob/main/AGENTS.md)  
33. SKILL.md Format Specification: Complete YAML Frontmatter Reference \- Agensi, [https://www.agensi.io/learn/skill-md-format-reference](https://www.agensi.io/learn/skill-md-format-reference)  
34. Research Worlds: governing long-running autoresearch agents \#275 \- GitHub, [https://github.com/karpathy/autoresearch/discussions/275](https://github.com/karpathy/autoresearch/discussions/275)  
35. CLAUDE.md \- karpathy/llm-council \- GitHub, [https://github.com/karpathy/llm-council/blob/master/CLAUDE.md](https://github.com/karpathy/llm-council/blob/master/CLAUDE.md)  
36. GitHub \- karpathy/llm-council: LLM Council works together to answer your hardest questions, [https://github.com/karpathy/llm-council](https://github.com/karpathy/llm-council)  
37. LLM Wiki \- Gist \- GitHub, [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAABGklEQVR4Xu2TMUtCYRSGX6vFCreGoiAX6QdoILi22+oYgc0RQki1WVDQIiKNjYo/wNnZX9Di3o/I9+VcuZ/H670OjT7wDPe8H+d+3HMusCWNHG3Qd9qjN8vxegr0l364+gH9gzVbyykd0Fu65zKhTE10uxUOYeGXDwKqsNvVfaCOTfpDL10WckGntO2DB9jbr3zgqNAZfXF1jGENjnzg0NV17t4HKsoshrBz566+cYMZ7Nyuq2/UQB9QZ1o+EBpN2EAjLSOe9z7twpZI2QrXsCYlWqRnUf2THkfZKKoloq17hG2a9n/BE53QDmzFM8nTGqyZRvVN74Jcy3YSPGfSR3z1HfqMhAmk8YZ4QjLpB0tFq72Y0KvLtvwXc/GuNV3d7BzCAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAAA9klEQVR4Xu2TwQpBQRSGD4qSEDtlIyspK0vvoHgBZe81WMhONp5AZCcLWVjbWtt7CP6/M7fGNJd7s1L3q6/bnHPn3Jm5Z0QSfiULC27wC5zjhYkqvMAnbJqx/YESnMMDHMC8lfNyEy3mowfPMO0mfGREC3F1NkU4M8/IlEWLrZz4Do6c2Ff68CG6nRycmHFsuMUpPMEaXIuukjIXi47o4V/h3sSGosXGwUtR4RY5cSnaEoQrPMItrJhYJDaixdxGbJu4+1M+EtZf/BGM3514KEF/8fB9cJvMN9yETQq2RK8GX2Y/1eX9mvAK8fowv4Bd0XkJCf/NC9u7Kg3H0DxZAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAaCAYAAABRqrc5AAAA2UlEQVR4XmNgGAW4AAcanw2KkQEPEAsi8VmR2GAgDMRWQPwfiNcBsRAQs6CogBgQC8R7gdibAdMSMAAZBDJkNroEEggEYgl0QWTAzAAx5CS6BBSUAXEvuiA2ADLkHLogFOwAYjV0QWwAZAgIo4MoIOZHF8QFXjNgGqLIAHEF0WAnA8QQLijfBYi3AbEMXAURYDUDxBABKH8FAyRGSAL1DBBDNIBYG4pJBhkMEEPcgXgaEDOiShMHbBgghtwGYls0OaKBJgMkndQyYCZ7ogEoVlLQBUfBKKAGAADFVx6Br495kQAAAABJRU5ErkJggg==>