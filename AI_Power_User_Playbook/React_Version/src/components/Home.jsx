import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

const MAX_WORD_COUNT = 30;
const LEGACY_KEYWORDS = [
    "act as", "roleplay", "format as", "xml", "json", "do not apologize", 
    "constraint", "rule", "guideline", "you are a", "ignore previous"
];

function Home() {
    const { markCompleted } = useProgress();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'system', content: 'System context loaded. Memory active. Awaiting your thin prompt...' }
    ]);
    const [isThinking, setIsThinking] = useState(false);

    const handleSubmit = () => {
        const input = inputValue.trim();
        if (!input) return;

        // Add user message
        const newMessages = [...messages, { id: Date.now(), type: 'user', content: input }];
        setMessages(newMessages);
        setInputValue('');
        setIsThinking(true);

        setTimeout(() => {
            const words = input.split(/\s+/).filter(w => w.length > 0);
            const wordCount = words.length;
            const lowerInput = input.toLowerCase();

            const foundLegacyWords = LEGACY_KEYWORDS.filter(word => lowerInput.includes(word));
            
            let isThick = false;
            let warningReason = "";

            if (foundLegacyWords.length > 0) {
                isThick = true;
                warningReason = `<strong>Thick Prompt Warning:</strong> You used legacy keywords ("${foundLegacyWords.join('", "')}"). Under the Context Engineering paradigm, the AI's persona and formatting should already be handled by your Custom Instructions and Memory.`;
            } else if (wordCount > MAX_WORD_COUNT) {
                isThick = true;
                warningReason = `<strong>Thick Prompt Warning:</strong> Your prompt is ${wordCount} words long. You are likely over-explaining or micromanaging the AI. Try to state just your final goal (Thin Prompting).`;
            }

            if (isThick) {
                setMessages(prev => [...prev, { 
                    id: Date.now(), 
                    type: 'warning', 
                    content: warningReason + "<br><br><em>Try again. Tell the AI to summarize the article in 10 words or less.</em>" 
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    id: Date.now(), 
                    type: 'success', 
                    content: `<strong>Thin Prompt Success!</strong><br><br>Excellent. Because your context is pre-engineered, you only needed ${wordCount} words to state your goal. The AI easily parses this without tripping over constraints.<br><br><em>Module 00 Complete!</em>` 
                }]);
                markCompleted('module_00');
            }
            setIsThinking(false);
        }, 1000);
    };

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Module 00</div>
                <h1 className="title">Primer: <span className="gradient-text">Unlearning AI Myths</span></h1>
                <p className="subtitle">The fastest way to learn how to use modern AI is to unlearn the habits of the past.</p>
            </header>

            <section className="glass-card main-concept">
                <div className="icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h2>Via Negativa</h2>
                <p>In education, this is known as teaching by subtraction. Just as learning logical fallacies is the best primer for critical thinking, learning "AI Fallacies" is the best primer for AI mastery.</p>
            </section>

            <section className="content-grid">
                <div className="glass-card danger-card">
                    <div className="card-header">
                        <div className="red-dot"></div>
                        <h2>The Myth of Prompt Engineering</h2>
                    </div>
                    <p>When early LLMs (like GPT-3) were released, they were easily confused. Users had to invent complex workarounds to get good results:</p>
                    <ul className="styled-list">
                        <li>Writing massive paragraphs of constraints.</li>
                        <li>Forcing the AI to use specific XML or JSON formats just to parse basic text.</li>
                        <li>Using psychological tricks (e.g., "I will tip you $100").</li>
                    </ul>
                    <div className="alert-box warning">
                        <strong>Warning:</strong> Because AI models update at a blistering pace, these early vulnerabilities have been patched. Today, these old "best practices" are actively harmful.
                    </div>
                </div>

                <div className="glass-card success-card">
                    <div className="card-header">
                        <div className="green-dot"></div>
                        <h2>The Unintuitive Reality</h2>
                    </div>
                    <p>The most unintuitive truth about modern AI is that <strong className="highlight">giving up control yields better results.</strong></p>
                    <p>Humans naturally want to micromanage tasks when they are unsure. With AI, trying to micromanage every step of a process usually causes the AI to trip over your constraints.</p>
                    
                    <div className="takeaway-box">
                        <h3>To be a power user, you must:</h3>
                        <ol className="numbered-list">
                            <li>State your goal clearly.</li>
                            <li>Provide the right context.</li>
                            <li><strong>Step out of the way.</strong></li>
                        </ol>
                    </div>
                </div>
            </section>

            <section className="glass-card practicum-card" id="practicum">
                <div className="card-header">
                    <div className="practicum-icon">🎓</div>
                    <h2>Practicum: The Prompting Simulator</h2>
                </div>
                <p>Let's put this into practice. Your task is to ask the AI to <strong>"summarize a long article."</strong> Type your prompt below. Remember: rely on Context Engineering, not Prompt Engineering.</p>
                
                <div className="simulator-container">
                    <div className="chat-area" id="chatHistory">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.type === 'user' ? 'user-msg' : msg.type === 'system' ? 'system-msg' : msg.type === 'warning' ? 'ai-warning' : 'ai-success'}`}>
                                {msg.type === 'user' ? msg.content : <span dangerouslySetInnerHTML={{__html: msg.content}} />}
                            </div>
                        ))}
                    </div>
                    
                    <div className="input-area">
                        <textarea 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit();
                            }}
                            placeholder="Type your prompt here..." 
                            rows="3"
                            disabled={isThinking}
                        ></textarea>
                        <button onClick={handleSubmit} disabled={isThinking || !inputValue.trim()} className="primary-btn">Submit to AI</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
