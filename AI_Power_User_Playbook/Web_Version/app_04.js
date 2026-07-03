document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropzone = document.getElementById('chat-attachment-zone');
    const submitBtn = document.getElementById('capstone-submit');
    const projectSelect = document.getElementById('capstone-project');
    const promptInput = document.getElementById('capstone-prompt');
    const feedbackMsg = document.getElementById('feedback-msg');
    const apiKeyInput = document.getElementById('openai-api-key');

    // Drag and Drop Logic
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
            e.dataTransfer.setData('text/plain', draggable.id);
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        
        if (draggable) {
            dropzone.appendChild(draggable);
            draggable.style.margin = "0.5rem";
        }
    });

    const vaultPool = document.getElementById('vault-pool');
    vaultPool.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    vaultPool.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        if (draggable) {
            vaultPool.appendChild(draggable);
            draggable.style.margin = "0.5rem 0";
        }
    });

    // Verification Logic
    submitBtn.addEventListener('click', async () => {
        const project = projectSelect.value;
        const promptText = promptInput.value.trim();
        const attachedItems = Array.from(dropzone.querySelectorAll('.draggable-item')).map(el => el.id);

        if (project !== 'writing_project') {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Error:</strong> You need to select the correct Project Workspace to set the baseline persona.";
            return;
        }

        if (!attachedItems.includes('file-template') || !attachedItems.includes('file-theory')) {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Error:</strong> You are missing key context files from your vault (Template or Theory).";
            return;
        }

        if (attachedItems.includes('file-grocery') || attachedItems.includes('file-code')) {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Error:</strong> You attached irrelevant files. This pollutes the context window and can cause hallucinations.";
            return;
        }

        if (promptText.length < 5) {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Error:</strong> You must type a thin prompt instructing the model on what to do with the context.";
            return;
        }

        if (promptText.length > 100) {
            feedbackMsg.style.color = "var(--warning)";
            feedbackMsg.innerHTML = "<strong>Almost:</strong> Your prompt is too long. The context is already provided via the attached files and the Project. Try a 'Thin Prompt' like 'Draft the whitepaper'.";
            return;
        }

        // Live API Execution
        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        if (apiKey) {
            feedbackMsg.style.color = "var(--accent-primary)";
            feedbackMsg.innerHTML = "<strong>Executing Live Call...</strong> Sending Context to OpenAI...";
            
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
                            { role: "user", content: `Context Files Provided: Whitepaper_Template.md, LLM_Theory_Notes.md.\n\nTask: ${promptText}` }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error("API Request Failed. Check your API key.");
                }

                const data = await response.json();
                const aiResponse = data.choices[0].message.content;
                
                // Display in chat
                const chatInterface = document.querySelector('.chat-interface');
                const aiBubble = document.createElement('div');
                aiBubble.style.background = 'rgba(255,255,255,0.1)';
                aiBubble.style.padding = '1rem';
                aiBubble.style.borderRadius = '8px';
                aiBubble.style.marginTop = '1rem';
                aiBubble.innerHTML = `<strong>ChatGPT:</strong><br><br>${aiResponse.replace(/\\n/g, '<br>')}`;
                chatInterface.appendChild(aiBubble);

                feedbackMsg.style.color = "var(--success)";
                feedbackMsg.innerHTML = "<strong>Live API Success!</strong> Course Complete!";
                if (typeof markCompleted === 'function') markCompleted('module_04');
                return;

            } catch (err) {
                feedbackMsg.style.color = "var(--danger)";
                feedbackMsg.innerHTML = `<strong>API Error:</strong> ${err.message}`;
                return;
            }
        }

        // Success Simulator (No API Key)
        feedbackMsg.style.color = "var(--success)";
        feedbackMsg.innerHTML = "<strong>Congratulations!</strong> You have successfully orchestrated a Symbiotic AI workflow. (Add an API key to run this for real!). Course Complete!";
        
        if (typeof markCompleted === 'function') {
            markCompleted('module_04');
        }
    });
});
