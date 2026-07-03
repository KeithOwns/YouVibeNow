import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

const INITIAL_ITEMS = [
    { id: 'item-persona', label: 'Persona (Who you are)', targetZone: 'zone-custom-instructions' },
    { id: 'item-context', label: 'Context (Background Data)', targetZone: 'zone-memory' },
    { id: 'item-format', label: 'Format (Output Style)', targetZone: 'zone-custom-instructions' },
    { id: 'item-task', label: 'The Task (What to do)', targetZone: 'zone-chat' }
];

function Module01() {
    const { markCompleted } = useProgress();
    const [pool, setPool] = useState(INITIAL_ITEMS);
    const [zones, setZones] = useState({
        'zone-custom-instructions': [],
        'zone-memory': [],
        'zone-chat': []
    });
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [draggedId, setDraggedId] = useState(null);

    const handleDragStart = (e, id) => {
        setDraggedId(id);
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e, zoneId) => {
        e.preventDefault();
        if (!draggedId) return;

        const item = pool.find(i => i.id === draggedId);
        if (!item) return;

        if (item.targetZone === zoneId) {
            // Correct placement
            setPool(prev => prev.filter(i => i.id !== draggedId));
            setZones(prev => ({
                ...prev,
                [zoneId]: [...prev[zoneId], item]
            }));
            
            const newTotal = Object.values(zones).flat().length + 1;
            if (newTotal === INITIAL_ITEMS.length) {
                setFeedback({ text: 'Module 01 Complete! You have successfully separated your persona/context into settings and built a Thin Prompt.', type: 'success' });
                markCompleted('module_01');
            } else {
                setFeedback({ text: 'Correct placement!', type: 'success' });
            }
        } else {
            setFeedback({ text: 'Incorrect. Think about where this belongs in Context Engineering.', type: 'danger' });
        }
        setDraggedId(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Module 01</div>
                <h1 className="title">Context <span className="gradient-text">Engineering</span></h1>
                <p className="subtitle">"The hottest new programming language is English." – Andrej Karpathy</p>
            </header>

            <section className="glass-card main-concept">
                <h2>The Paradigm Shift</h2>
                <p>Prompt Engineering is about forcing a blank-slate AI to do something complex in a single chat box. Context Engineering is about building a background identity so your daily prompts can be thin and natural.</p>
            </section>

            <section className="content-grid">
                <div className="glass-card success-card">
                    <div className="card-header">
                        <div className="green-dot"></div>
                        <h2>Thin Prompting</h2>
                    </div>
                    <p>When your context is engineered properly, you enable Thin Prompting. Instead of micromanaging the AI, you simply state your goal.</p>
                    <div className="takeaway-box">
                        <h3>Adam's Law</h3>
                        <p>Prompts crafted with simple, natural language yield smarter and more effective results from modern LLMs than overly complex, rigid prompts.</p>
                    </div>
                </div>
                
                <div className="glass-card practicum-card">
                    <div className="card-header">
                        <div className="practicum-icon">🧠</div>
                        <h2>Practicum: The Context Sorter</h2>
                    </div>
                    <p>Drag the 4 core elements of a conventional prompt into their correct locations in the <strong>Context Engineering</strong> framework.</p>
                    
                    <div className="dnd-container">
                        <div className="draggables" id="draggable-pool">
                            {pool.map(item => (
                                <div 
                                    key={item.id} 
                                    className="draggable-item" 
                                    draggable="true" 
                                    onDragStart={(e) => handleDragStart(e, item.id)}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        
                        <div className="dropzones">
                            <div className="dropzone" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'zone-custom-instructions')}>
                                <span className="dropzone-label">Custom Instructions (Settings)</span>
                                {zones['zone-custom-instructions'].map(item => (
                                    <div key={item.id} className="draggable-item" style={{ background: 'var(--success-bg)', borderColor: 'var(--success)' }}>{item.label}</div>
                                ))}
                            </div>
                            <div className="dropzone" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'zone-memory')}>
                                <span className="dropzone-label">Memory / Obsidian Digital Twin</span>
                                {zones['zone-memory'].map(item => (
                                    <div key={item.id} className="draggable-item" style={{ background: 'var(--success-bg)', borderColor: 'var(--success)' }}>{item.label}</div>
                                ))}
                            </div>
                            <div className="dropzone" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'zone-chat')}>
                                <span className="dropzone-label">The Chat Box (Thin Prompt)</span>
                                {zones['zone-chat'].map(item => (
                                    <div key={item.id} className="draggable-item" style={{ background: 'var(--success-bg)', borderColor: 'var(--success)' }}>{item.label}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontWeight: 'bold', minHeight: '24px', color: feedback.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                        {feedback.text && <span dangerouslySetInnerHTML={{__html: feedback.text}} />}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Module01;
