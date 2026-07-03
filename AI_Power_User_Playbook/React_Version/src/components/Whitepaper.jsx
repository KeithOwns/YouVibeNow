import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

function Whitepaper() {
    const articleRef = useRef(null);

    const downloadPDF = () => {
        if (!articleRef.current) return;
        const opt = {
            margin:       1,
            filename:     'The_Symbiosis_Protocol_Whitepaper.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(articleRef.current).save();
    };

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <div className="print-btn-container" style={{ textAlign: 'right', marginBottom: '2rem' }}>
                <button onClick={downloadPDF} className="primary-btn">⬇️ Download as PDF</button>
            </div>

            <article className="academic-paper" ref={articleRef}>
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>The Symbiosis Protocol</h1>
                    <p style={{ fontSize: '1.2rem', color: '#555' }}>Shifting from Prompt Engineering to Context Engineering in LLM Workflows</p>
                    <p><strong>Author:</strong> Keith Tibbitts | <strong>Date:</strong> July 2026</p>
                </header>

                <h2>Abstract</h2>
                <p>As Large Language Models (LLMs) evolve from brittle text-generators into highly capable reasoning engines, the user paradigms for interacting with them must fundamentally shift. This paper proposes a formal departure from the legacy practice of "Prompt Engineering"—characterized by thick, constraint-heavy instructional blocks—toward a methodology defined as <strong>Context Engineering</strong>. By separating the LLM (the Reasoning Engine) from a local, structured knowledge graph (the Storage Engine), and relying on persistent identity states, users can achieve a state of "Symbiosis." This paper outlines the theoretical framework of Context Engineering, introduces "Adam's Law" of natural language interaction, and provides a structural architecture for building a personal "Digital Twin" to optimize AI workflows.</p>

                <h2>1. Introduction: The Fallacy of Prompt Engineering</h2>
                <p>In the early iterations of generative AI (circa GPT-3), models were easily confused by ambiguity. To extract high-quality outputs, users developed "Prompt Engineering." This practice required users to inject all elements of a task—the Persona, the Context, the Formatting constraints, and the Task itself—into a single, monolithic chat prompt.</p>
                <p>As models like GPT-4 and o1 emerged with vastly superior internal reasoning capabilities, these legacy "best practices" became anti-patterns. In modern AI interactions, attempting to micromanage a highly intelligent model with rigid constraints actively limits its reasoning capacity. We term these outdated habits "AI Fallacies." Using the educational principle of <em>Via Negativa</em> (teaching by subtraction), the first step to mastering modern AI is unlearning the instinct to micromanage.</p>

                <h2>2. Context Engineering: The New Paradigm</h2>
                <p>In 2023, Andrej Karpathy famously noted that "the hottest new programming language is English," eventually endorsing the shift toward <strong>Context Engineering</strong> in 2025.</p>
                <p>Context Engineering is the architectural practice of filling the AI's context window with exact background information <em>before</em> a task is assigned. Instead of treating the AI as a blank slate in every interaction, the user engineers a persistent background identity (via features like Custom Instructions and Memory) and a highly structured external database.</p>
                <p>This shifts the cognitive load. The user is no longer responsible for writing complex constraints; they are responsible for maintaining a clean, optimized context.</p>

                <h2>3. Thin Prompting and Adam's Law</h2>
                <p>When context is properly engineered, it enables <strong>Thin Prompting</strong>—the practice of giving the AI brief, high-level, goal-oriented instructions.</p>
                <p>This mechanism is governed by <strong>Adam's Law</strong>, which states:</p>
                <blockquote>
                    Prompts crafted with simple, natural language yield smarter and more effective results from modern LLMs than overly complex, rigid constraints.
                </blockquote>
                <p>Because the AI already knows <em>who</em> it is acting as (Persona) and <em>how</em> to format the output (Format) through its engineered baseline settings, the active prompt is reduced solely to the <em>Task</em>. This results in a highly efficient, frictionless interaction model.</p>

                <h2>4. Architectural Symbiosis (The Digital Twin)</h2>
                <p>The ultimate execution of Context Engineering is the separation of compute and storage. Relying entirely on an LLM platform to store complex project data traps the user in a proprietary, chronological UI that cannot support hierarchical thought.</p>
                <p>To solve this, we introduce the concept of <strong>Symbiosis</strong>.</p>
                <ul>
                    <li><strong>The Reasoning Engine (LLM):</strong> Handles dynamic cognitive lifting and execution.</li>
                    <li><strong>The Storage Engine (Digital Twin):</strong> A locally hosted, Markdown-based file structure (such as an Obsidian Vault) that acts as a structured knowledge graph.</li>
                </ul>

                <h3>4.1 File Structure Optimization</h3>
                <p>The Digital Twin must utilize a Zooming User Interface (ZUI), such as Obsidian Canvas, to map knowledge spatially. By organizing data into discrete, semantic markdown files (e.g., separating theoretical Concepts from practical Lessons), the user can inject perfectly isolated, highly relevant context nodes directly into the Reasoning Engine on demand. This ensures the LLM is never polluted by irrelevant data, preventing hallucinations and maintaining a pristine context window.</p>

                <h2>5. Conclusion</h2>
                <p>Prompt Engineering was a temporary bridge used to communicate with early, flawed AI models. Context Engineering is the permanent architecture for collaborating with advanced reasoning engines. By establishing a baseline identity and building a local Digital Twin, users transition from micromanaging algorithms to directing intelligent, symbiotic agents.</p>
            </article>
        </main>
    );
}

export default Whitepaper;
