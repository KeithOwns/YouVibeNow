document.addEventListener('DOMContentLoaded', () => {
    const files = document.querySelectorAll('.file-item');
    const folders = document.querySelectorAll('.folder-content');
    const feedbackMsg = document.getElementById('feedback-msg');
    
    let totalFiles = files.length;
    let correctlyPlaced = 0;

    files.forEach(file => {
        file.addEventListener('dragstart', () => {
            file.classList.add('dragging');
        });

        file.addEventListener('dragend', () => {
            file.classList.remove('dragging');
            checkCompletion();
        });
    });

    folders.forEach(folder => {
        folder.addEventListener('dragover', e => {
            e.preventDefault();
            folder.classList.add('drag-over');
        });

        folder.addEventListener('dragleave', () => {
            folder.classList.remove('drag-over');
        });

        folder.addEventListener('drop', e => {
            e.preventDefault();
            folder.classList.remove('drag-over');
            
            const file = document.querySelector('.dragging');
            if (!file) return;

            const acceptedIds = folder.getAttribute('data-accept').split(',');
            if (acceptedIds.includes(file.id)) {
                folder.appendChild(file);
                file.style.background = "rgba(16, 185, 129, 0.2)";
                file.setAttribute('draggable', 'false'); // Lock it in
                feedbackMsg.style.color = "var(--success)";
                feedbackMsg.innerText = "File categorized correctly!";
                correctlyPlaced++;
            } else {
                feedbackMsg.style.color = "var(--danger)";
                feedbackMsg.innerText = "Incorrect folder. Think about whether this is a Lesson, Concept, or Asset.";
                
                // Shake effect
                file.style.transform = "translateX(5px)";
                setTimeout(() => file.style.transform = "translateX(-5px)", 100);
                setTimeout(() => file.style.transform = "translateX(0)", 200);
            }
        });
    });

    function checkCompletion() {
        if (correctlyPlaced === totalFiles) {
            feedbackMsg.innerHTML = "<strong>Vault Structured!</strong> Initializing Obsidian Graph View...";
            feedbackMsg.style.color = "var(--success)";
            if (typeof markCompleted === 'function') markCompleted('module_03');
            
            setTimeout(() => {
                feedbackMsg.style.display = 'none';
                document.querySelector('.vault-builder').style.display = 'none';
                const graphContainer = document.getElementById('graph-container');
                graphContainer.style.display = 'block';
                // Trigger animation
                graphContainer.style.animation = 'fadeIn 1s ease-out forwards';
                renderGraph();
            }, 1500);
        }
    }

    function renderGraph() {
        const container = document.getElementById('graph-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Data for the graph
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

        const svg = d3.select("#graph-container")
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
                if (d.group === 1) return "var(--accent-primary)"; // Lesson
                if (d.group === 2) return "var(--accent-secondary)"; // Concept
                return "var(--accent-tertiary)"; // Asset
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
        
        // Add glowing filter
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
    }
});
