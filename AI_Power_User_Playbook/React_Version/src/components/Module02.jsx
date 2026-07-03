import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';

function Module02() {
    const { markCompleted } = useProgress();
    
    const [project, setProject] = useState('none');
    const [toggles, setToggles] = useState({
        ci: false,
        memory: false,
        hi: false,
        temp: false
    });
    const [sheetOpen, setSheetOpen] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    
    const sheetRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sheetOpen && sheetRef.current && !sheetRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
                setSheetOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sheetOpen]);

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleStartChat = () => {
        const { ci, memory, hi, temp } = toggles;

        if (temp) {
            setFeedback({ 
                text: "<strong>Incorrect:</strong> You turned on Temporary Chat. This isolates the chat, meaning it can't access your Custom Instructions or Memory for your main project!", 
                type: 'danger' 
            });
            return;
        }

        if (project === 'main_software') {
            if (!hi) {
                setFeedback({ 
                    text: "<strong>Almost:</strong> You selected the right project context, but coding requires Higher Intelligence (advanced reasoning models) turned ON.", 
                    type: 'danger' 
                });
                return;
            }
            setFeedback({ 
                text: "<strong>Perfect!</strong> By selecting the Project context directly, you don't even need generic memory turned on. The project itself provides the isolated context. Ready to thin-prompt!", 
                type: 'success' 
            });
            markCompleted('module_02');
            return;
        }

        if (!ci || !memory || !hi) {
            setFeedback({ 
                text: "<strong>Incorrect:</strong> Since you haven't selected a specific Project workspace, you need Custom Instructions, Memory, and Higher Intelligence all turned ON to properly engineer the baseline context.", 
                type: 'danger' 
            });
            return;
        }

        setFeedback({ 
            text: "<strong>Module 02 Complete!</strong> Good baseline configuration. (Tip: Try selecting the 'Main Software' project from the dropdown above to see how Projects replace global memory!)", 
            type: 'success' 
        });
        markCompleted('module_02');
    };

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Module 02</div>
                <h1 className="title">The <span className="gradient-text">Baseline</span></h1>
                <p className="subtitle">Turning a generic reasoning engine into your personalized AI.</p>
            </header>

            <section className="glass-card main-concept">
                <h2>Configuring Your Vibe</h2>
                <p>To enable Thin Prompting, you must establish a baseline context in ChatGPT. This involves Custom Instructions (your identity), Memory (dynamic context), and Higher Intelligence (smart routing).</p>
            </section>

            <section className="content-grid">
                <div className="glass-card danger-card">
                    <div className="card-header">
                        <div className="red-dot"></div>
                        <h2>Protecting The Context</h2>
                    </div>
                    <p>If you ask a highly engineered AI to "write a birthday poem for my dog," it will pollute your Memory and Custom Instructions.</p>
                    <div className="alert-box warning">
                        <strong>Rule:</strong> Always use <em>Temporary Chat</em> for one-off tasks and random queries to protect your baseline context.
                    </div>
                </div>
                
                <div className="glass-card practicum-card">
                    <div className="card-header">
                        <div className="practicum-icon">⚙️</div>
                        <h2>Practicum: Settings Simulator</h2>
                    </div>
                    <p><strong>Scenario:</strong> You are about to ask ChatGPT to write a Python script for your main software project. Configure your settings correctly below, then click "Start Chat".</p>
                    
                    <div className="simulator-wrapper" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '1rem' }}>
                        
                        <div className="mock-chat-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                            <select 
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                            >
                                <option value="none" style={{ background: '#111' }}>Project: None</option>
                                <option value="main_software" style={{ background: '#111' }}>Project: Main Software</option>
                                <option value="youtube" style={{ background: '#111' }}>Project: AI YouTube Channel</option>
                            </select>
                            <div 
                                className="memory-pill" 
                                style={{ 
                                    background: toggles.memory ? 'var(--success-bg)' : 'var(--danger-bg)', 
                                    border: `1px solid ${toggles.memory ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, 
                                    color: toggles.memory ? '#a7f3d0' : '#fca5a5', 
                                    padding: '0.35rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, cursor: 'default', transition: '0.3s' 
                                }}
                            >
                                Memory {toggles.memory ? 'on' : 'off'} ℹ️
                            </div>
                        </div>

                        <div className="settings-simulator">
                            <div className="settings-row">
                                <div className="settings-info">
                                    <h4>Custom Instructions</h4>
                                    <p>Sets persistent persona and formatting rules.</p>
                                </div>
                                <div className={`toggle-btn ${toggles.ci ? 'active' : ''}`} onClick={() => handleToggle('ci')}></div>
                            </div>
                            <div className="settings-row">
                                <div className="settings-info">
                                    <h4>Memory</h4>
                                    <p>Allows AI to remember details across chats.</p>
                                </div>
                                <div className={`toggle-btn ${toggles.memory ? 'active' : ''}`} onClick={() => handleToggle('memory')}></div>
                            </div>
                            <div className="settings-row">
                                <div className="settings-info">
                                    <h4>Higher Intelligence</h4>
                                    <p>Uses advanced reasoning models for complex tasks.</p>
                                </div>
                                <div className={`toggle-btn ${toggles.hi ? 'active' : ''}`} onClick={() => handleToggle('hi')}></div>
                            </div>
                            <div className="settings-row">
                                <div className="settings-info">
                                    <h4>Temporary Chat</h4>
                                    <p>Isolates the chat from memory and history.</p>
                                </div>
                                <div className={`toggle-btn ${toggles.temp ? 'active' : ''}`} onClick={() => handleToggle('temp')}></div>
                            </div>
                        </div>

                        <div className="chat-input-mock" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                            <button 
                                ref={btnRef}
                                onClick={() => setSheetOpen(!sheetOpen)}
                                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', color: 'white', cursor: 'pointer', transition: '0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: sheetOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                            >
                                +
                            </button>
                            <div style={{ flex: 1, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Message ChatGPT...</div>
                            <button onClick={handleStartChat} className="primary-btn" style={{ padding: '0.5rem 1.25rem', borderRadius: '100px', fontSize: '0.9rem' }}>Start Chat</button>
                        </div>

                        {sheetOpen && (
                            <div ref={sheetRef} style={{ position: 'absolute', bottom: '-10px', left: '-10px', right: '-10px', background: 'rgba(20,20,25,0.95)', backdropFilter: 'blur(10px)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '2rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10, boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div className="sheet-item" style={{ textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 0.5rem auto' }}>📷</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Camera</div>
                                    </div>
                                    <div className="sheet-item" style={{ textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 0.5rem auto' }}>🖼️</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Photos</div>
                                    </div>
                                    <div className="sheet-item" style={{ textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 0.5rem auto' }}>📁</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Files</div>
                                    </div>
                                    <div className="sheet-item" style={{ textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 0.5rem auto' }}>🔌</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Plugins</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <div style={{ marginTop: '1rem', fontWeight: 'bold', minHeight: '24px', color: feedback.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                            {feedback.text && <span dangerouslySetInnerHTML={{__html: feedback.text}} />}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Module02;
