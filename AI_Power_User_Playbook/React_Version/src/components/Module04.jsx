import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

const INITIAL_VAULT = [
    { id: 'file-template', label: '📄 Whitepaper Template.md' },
    { id: 'file-theory', label: '📄 Symbiosis Theory Notes.md' },
    { id: 'file-grocery', label: '🛒 Grocery List.md' },
    { id: 'file-code', label: '💻 app.js (legacy)' }
];

function Module04() {
    const { markCompleted } = useProgress();
    const [vault, setVault] = useState(INITIAL_VAULT);
    const [attached, setAttached] = useState([]);
    
    const [project, setProject] = useState('none');
    const [promptText, setPromptText] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    
    const [isExecuting, setIsExecuting] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [draggedId, setDraggedId] = useState(null);

    const handleDragStart = (e, id) => {
        setDraggedId(id);
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDropOnChat = (e) => {
        e.preventDefault();
        if (!draggedId) return;
        const file = vault.find(f => f.id === draggedId);
        if (file) {
            setVault(prev => prev.filter(f => f.id !== draggedId));
            setAttached(prev => [...prev, file]);
        }
        setDraggedId(null);
    };

    const handleDropOnVault = (e) => {
        e.preventDefault();
        if (!draggedId) return;
        const file = attached.find(f => f.id === draggedId);
        if (file) {
            setAttached(prev => prev.filter(f => f.id !== draggedId));
            setVault(prev => [...prev, file]);
        }
        setDraggedId(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async () => {
        const attachedIds = attached.map(f => f.id);

        if (project !== 'writing_project') {
            setFeedback({ text: '<strong>Error:</strong> You need to select the correct Project Workspace to set the baseline persona.', type: 'danger' });
            return;
        }

        if (!attachedIds.includes('file-template') || !attachedIds.includes('file-theory')) {
            setFeedback({ text: '<strong>Error:</strong> You are missing key context files from your vault (Template or Theory).', type: 'danger' });
            return;
        }

        if (attachedIds.includes('file-grocery') || attachedIds.includes('file-code')) {
            setFeedback({ text: '<strong>Error:</strong> You attached irrelevant files. This pollutes the context window and can cause hallucinations.', type: 'danger' });
            return;
        }

        if (promptText.length < 5) {
            setFeedback({ text: '<strong>Error:</strong> You must type a thin prompt instructing the model on what to do with the context.', type: 'danger' });
            return;
        }

        if (promptText.length > 100) {
            setFeedback({ text: '<strong>Almost:</strong> Your prompt is too long. The context is already provided via the attached files and the Project. Try a "Thin Prompt" like "Draft the whitepaper".', type: 'warning' });
            return;
        }

        if (apiKey) {
            setFeedback({ text: '<strong>Executing Live Call...</strong> Sending Context to OpenAI...', type: 'primary' });
            setIsExecuting(true);
            
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [
                            { role: "system", content: "You are an AI assistant. Output your response as clean Markdown. You have been provided context files." },
                            { role: "user", content: `Context Files Provided: Whitepaper_Template.md, Symbiosis_Theory_Notes.md.\n\nTask: ${promptText}` }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error("API Request Failed. Check your API key.");
                }

                const data = await response.json();
                setAiResponse(data.choices[0].message.content);
                setFeedback({ text: '<strong>Live API Success!</strong> Course Complete!', type: 'success' });
                markCompleted('module_04');
            } catch (err) {
                setFeedback({ text: `<strong>API Error:</strong> ${err.message}`, type: 'danger' });
            } finally {
                setIsExecuting(false);
            }
            return;
        }

        // Simulator mode
        setFeedback({ text: '<strong>Congratulations!</strong> You have successfully orchestrated a Symbiotic AI workflow. (Add an API key to run this for real!). Course Complete!', type: 'success' });
        markCompleted('module_04');
    };

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Module 04</div>
                <h1 className="title">The <span className="gradient-text">Capstone</span></h1>
                <p className="subtitle">Bring it all together: Digital Twin + Engineered Context + Thin Prompt</p>
            </header>

            <section className="glass-card main-concept">
                <h2>The Final Challenge</h2>
                <p>Your goal is to draft a whitepaper. To do this, you must set your AI to the correct <strong>Project Context</strong>, drag the <strong>Whitepaper Template</strong> and the <strong>Theory Notes</strong> from your Vault into the chat, and type a <strong>Thin Prompt</strong> to execute the task.</p>
            </section>

            <section className="capstone-layout" style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div className="glass-card vault-pane">
                        <div className="card-header">
                            <div className="practicum-icon">🗂️</div>
                            <h2>Your Vault</h2>
                        </div>
                        <div 
                            className="vault-files" 
                            style={{ minHeight: '150px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}
                            onDragOver={handleDragOver}
                            onDrop={handleDropOnVault}
                        >
                            {vault.map(file => (
                                <div 
                                    key={file.id} 
                                    className="draggable-item" 
                                    draggable="true" 
                                    onDragStart={(e) => handleDragStart(e, file.id)}
                                    style={{ margin: '0.5rem 0' }}
                                >
                                    {file.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card chat-pane chat-interface">
                        <div className="card-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="practicum-icon">🤖</div>
                                <h2>Reasoning Engine</h2>
                            </div>
                            <input 
                                type="password" 
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="OpenAI API Key (Optional for Live Mode)" 
                                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '4px', padding: '0.5rem', width: '250px', fontSize: '0.8rem' }} 
                            />
                        </div>
                        
                        <div className="chat-header-bar" style={{ marginBottom: '1rem' }}>
                            <select 
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', outline: 'none' }}
                            >
                                <option value="none" style={{ background: '#111' }}>Default Workspace</option>
                                <option value="book_club" style={{ background: '#111' }}>Book Club</option>
                                <option value="writing_project" style={{ background: '#111' }}>Writing Project</option>
                            </select>
                        </div>

                        <div className="chat-window">
                            <div 
                                className="dropzone capstone-dropzone" 
                                onDragOver={handleDragOver}
                                onDrop={handleDropOnChat}
                                style={{ minHeight: '100px', display: 'flex', flexWrap: 'wrap' }}
                            >
                                {attached.length === 0 && <span className="dropzone-label">Drop Context Files Here 📎</span>}
                                {attached.map(file => (
                                    <div 
                                        key={file.id} 
                                        className="draggable-item" 
                                        draggable="true" 
                                        onDragStart={(e) => handleDragStart(e, file.id)}
                                        style={{ margin: '0.5rem' }}
                                    >
                                        {file.label}
                                    </div>
                                ))}
                            </div>

                            <div className="chat-input-area" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <input 
                                    type="text" 
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    placeholder="Type your thin prompt here..." 
                                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '24px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    disabled={isExecuting}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                />
                                <button onClick={handleSubmit} disabled={isExecuting} className="primary-btn" style={{ padding: '0.5rem 1.25rem', borderRadius: '100px' }}>Send</button>
                            </div>
                        </div>

                        {feedback.text && (
                            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontWeight: 'bold', minHeight: '24px', color: feedback.type === 'danger' ? 'var(--danger)' : feedback.type === 'warning' ? 'var(--warning)' : feedback.type === 'primary' ? 'var(--accent-primary)' : 'var(--success)' }}>
                                <span dangerouslySetInnerHTML={{__html: feedback.text}} />
                            </div>
                        )}

                        {aiResponse && (
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>ChatGPT:</strong><br/><br/>
                                <div style={{ whiteSpace: 'pre-wrap' }}>{aiResponse}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Module04;
