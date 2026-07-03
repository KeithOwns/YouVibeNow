import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useProgress } from '../context/ProgressContext';

const INITIAL_FILES = [
    { id: 'file-1', label: '📄 01_Context_Engineering.md', target: 'folder-concepts' },
    { id: 'file-2', label: '🖼️ Screenshot_Settings.png', target: 'folder-assets' },
    { id: 'file-3', label: '📄 Lesson_00_Primer.md', target: 'folder-lessons' },
    { id: 'file-4', label: '📄 03_Digital_Twin_Theory.md', target: 'folder-concepts' }
];

function Module03() {
    const { markCompleted } = useProgress();
    const [unsorted, setUnsorted] = useState(INITIAL_FILES);
    const [folders, setFolders] = useState({
        'folder-lessons': [],
        'folder-concepts': [],
        'folder-assets': []
    });
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [draggedId, setDraggedId] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const graphRef = useRef(null);

    const handleDragStart = (e, id) => {
        setDraggedId(id);
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e, folderId) => {
        e.preventDefault();
        if (!draggedId) return;

        const file = unsorted.find(f => f.id === draggedId);
        if (!file) return;

        if (file.target === folderId) {
            setUnsorted(prev => prev.filter(f => f.id !== draggedId));
            setFolders(prev => ({
                ...prev,
                [folderId]: [...prev[folderId], file]
            }));

            const totalSorted = Object.values(folders).flat().length + 1;
            if (totalSorted === INITIAL_FILES.length) {
                setFeedback({ text: '<strong>Vault Structured!</strong> Initializing Obsidian Graph View...', type: 'success' });
                markCompleted('module_03');
                setTimeout(() => {
                    setShowGraph(true);
                }, 1500);
            } else {
                setFeedback({ text: 'File categorized correctly!', type: 'success' });
            }
        } else {
            setFeedback({ text: 'Incorrect folder. Think about whether this is a Lesson, Concept, or Asset.', type: 'danger' });
        }
        setDraggedId(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // D3 Graph initialization
    useEffect(() => {
        if (!showGraph || !graphRef.current) return;

        const container = graphRef.current;
        container.innerHTML = ''; // Clear previous if any
        
        const width = container.clientWidth;
        const height = container.clientHeight;

        const data = {
            nodes: [
                { id: "Lesson_00", group: 1, label: "00 Primer" },
                { id: "Lesson_01", group: 1, label: "01 Context Engineering" },
                { id: "Lesson_02", group: 1, label: "02 The Baseline" },
                { id: "Concept_DT", group: 2, label: "Digital Twin Theory" },
                { id: "Concept_TP", group: 2, label: "Thin Prompting" },
                { id: "Asset_SS", group: 3, label: "Settings Screenshot" }
            ],
            links: [
                { source: "Lesson_00", target: "Lesson_01", value: 1 },
                { source: "Lesson_01", target: "Lesson_02", value: 1 },
                { source: "Lesson_01", target: "Concept_TP", value: 2 },
                { source: "Lesson_01", target: "Concept_DT", value: 1 },
                { source: "Concept_DT", target: "Asset_SS", value: 1 }
            ]
        };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.append("g")
            .attr("stroke", "rgba(255,255,255,0.2)")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value) * 1.5);

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 0)
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", 15)
            .attr("fill", d => {
                if (d.group === 1) return "var(--accent-primary)";
                if (d.group === 2) return "var(--accent-secondary)";
                return "var(--accent-tertiary)";
            })
            .style("cursor", "pointer")
            .call(drag(simulation));

        node.append("title")
            .text(d => d.label);

        const labels = svg.append("g")
            .selectAll("text")
            .data(data.nodes)
            .join("text")
            .attr("dy", -20)
            .attr("text-anchor", "middle")
            .style("fill", "var(--text-main)")
            .style("font-size", "12px")
            .style("font-weight", "500")
            .style("pointer-events", "none")
            .text(d => d.label);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x = Math.max(15, Math.min(width - 15, d.x)))
                .attr("cy", d => d.y = Math.max(15, Math.min(height - 15, d.y)));
                
            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });
        
        const defs = svg.append("defs");
        const filter = defs.append("filter").attr("id", "glow");
        filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
        
        node.style("filter", "url(#glow)");

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
        
        return () => {
            simulation.stop();
        };
    }, [showGraph]);

    return (
        <main className="container" style={{ marginTop: '5rem' }}>
            <header className="hero">
                <div className="badge">Module 03</div>
                <h1 className="title">Digital <span className="gradient-text">Twin</span></h1>
                <p className="subtitle">Achieving Symbiosis: Separating the Reasoning Engine from the Storage Engine.</p>
            </header>

            <section className="glass-card main-concept">
                <h2>The Local Storage Engine</h2>
                <p>Relying entirely on ChatGPT to store your complex knowledge locks you into a proprietary system with a weak UI. Power users build a local "Digital Twin" in Obsidian (a markdown editor) to perfectly structure their knowledge, which they then feed into the AI Reasoning Engine when needed.</p>
            </section>

            <section className="content-grid">
                <div className="glass-card success-card">
                    <div className="card-header">
                        <div className="green-dot"></div>
                        <h2>The Canvas (ZUI)</h2>
                    </div>
                    <p>Obsidian offers an infinite Canvas. This provides a Zooming User Interface (ZUI), allowing you to physically map out complex concepts and architectures, zooming out for the big picture and zooming in for the text details.</p>
                </div>
                
                <div className="glass-card practicum-card">
                    <div className="card-header">
                        <div className="practicum-icon">📂</div>
                        <h2>Practicum: Vault Builder</h2>
                    </div>
                    <p>Drag the files into their correct foundational folders to organize your new Obsidian Vault.</p>
                    
                    {!showGraph ? (
                        <>
                            <div className="vault-builder">
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {unsorted.map(file => (
                                        <div 
                                            key={file.id} 
                                            className="file-item" 
                                            draggable="true" 
                                            onDragStart={(e) => handleDragStart(e, file.id)}
                                        >
                                            {file.label}
                                        </div>
                                    ))}
                                </div>

                                <div className="vault-sidebar">
                                    <div className="folder">
                                        <div className="folder-header">📁 01_Lessons</div>
                                        <div className="folder-content" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'folder-lessons')}>
                                            {folders['folder-lessons'].map(file => (
                                                <div key={file.id} className="file-item" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>{file.label}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="folder">
                                        <div className="folder-header">📁 02_Concepts</div>
                                        <div className="folder-content" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'folder-concepts')}>
                                            {folders['folder-concepts'].map(file => (
                                                <div key={file.id} className="file-item" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>{file.label}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="folder">
                                        <div className="folder-header">📁 03_Assets</div>
                                        <div className="folder-content" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'folder-assets')}>
                                            {folders['folder-assets'].map(file => (
                                                <div key={file.id} className="file-item" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>{file.label}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontWeight: 'bold', minHeight: '24px', color: feedback.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                                {feedback.text && <span dangerouslySetInnerHTML={{__html: feedback.text}} />}
                            </div>
                        </>
                    ) : (
                        <div 
                            ref={graphRef} 
                            style={{ width: '100%', height: '400px', borderRadius: '12px', marginTop: '1.5rem', background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(139, 92, 246, 0.3)', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)', animation: 'fadeIn 1s ease-out forwards' }}
                        ></div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Module03;
