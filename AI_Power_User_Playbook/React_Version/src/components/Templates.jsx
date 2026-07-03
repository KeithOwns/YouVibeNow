import React, { useState } from 'react';

function Templates() {
    const [copiedId, setCopiedId] = useState(null);
    const [exportedId, setExportedId] = useState(null);

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleExport = (id, filename, text) => {
        const dateStr = new Date().toISOString().split('T')[0];
        const frontmatter = `---
type: template
tags: [ai-playbook, context-engineering]
date: ${dateStr}
---

`;
        const content = frontmatter + text;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setExportedId(id);
        setTimeout(() => setExportedId(null), 2000);
    };

    const identityText = `I am an IT Consultant and AI Power User.
I value extreme efficiency, clear reasoning, and pragmatic solutions.
My work involves organizing complex structures, building Digital Twins in Obsidian, and leveraging Context Engineering principles over legacy Prompt Engineering.
I do not need basic explanations unless I explicitly ask for them. Treat me as an advanced user who understands the underlying mechanics of LLMs.`;

    const formatText = `1. Adhere to Adam's Law: Prioritize natural language understanding over rigid adherence to minor constraints.
2. Be concise and direct. Do not apologize. Do not use corporate jargon or filler phrases like "Certainly!" or "As an AI...".
3. When providing code or file structures, always output in clean, standard formats (like Markdown) ready for direct integration into an Obsidian vault.
4. If a prompt is ambiguous, ask a clarifying question rather than guessing.
5. If a request is too broad, suggest a structured approach (like breaking it down into a Concept and a Lesson).`;

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Resources</div>
                <h1 className="title">Custom <span className="gradient-text">Templates</span></h1>
                <p className="subtitle">Actionable configurations to establish your Baseline Context.</p>
            </header>

            <section className="glass-card main-concept">
                <h2>Setting the Persona</h2>
                <p>Paste this directly into the first box of your ChatGPT Custom Instructions: <em>"What would you like ChatGPT to know about you to provide better responses?"</em></p>
                
                <div className="template-block">
                    <div className="template-header">
                        <span>Identity Configuration</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                className={`copy-btn ${copiedId === 'identity' ? 'copied' : ''}`}
                                onClick={() => handleCopy('identity', identityText)}
                            >
                                {copiedId === 'identity' ? 'Copied!' : 'Copy'}
                            </button>
                            <button 
                                className={`export-btn ${exportedId === 'identity' ? 'copied' : ''}`}
                                onClick={() => handleExport('identity', 'Identity_Configuration.md', identityText)}
                            >
                                {exportedId === 'identity' ? 'Exported!' : 'Export to Vault'}
                            </button>
                        </div>
                    </div>
                    <pre className="template-content" id="identity-text">
                        {identityText}
                    </pre>
                </div>
            </section>

            <section className="glass-card main-concept" style={{ marginTop: '2rem' }}>
                <h2>Setting the Format</h2>
                <p>Paste this directly into the second box of your ChatGPT Custom Instructions: <em>"How would you like ChatGPT to respond?"</em></p>
                
                <div className="template-block">
                    <div className="template-header">
                        <span>Output Configuration</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                className={`copy-btn ${copiedId === 'format' ? 'copied' : ''}`}
                                onClick={() => handleCopy('format', formatText)}
                            >
                                {copiedId === 'format' ? 'Copied!' : 'Copy'}
                            </button>
                            <button 
                                className={`export-btn ${exportedId === 'format' ? 'copied' : ''}`}
                                onClick={() => handleExport('format', 'Output_Configuration.md', formatText)}
                            >
                                {exportedId === 'format' ? 'Exported!' : 'Export to Vault'}
                            </button>
                        </div>
                    </div>
                    <pre className="template-content" id="format-text">
                        {formatText}
                    </pre>
                </div>
            </section>
        </main>
    );
}

export default Templates;
