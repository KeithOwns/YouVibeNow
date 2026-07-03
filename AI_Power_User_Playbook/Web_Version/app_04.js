document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropzone = document.getElementById('chat-attachment-zone');
    const submitBtn = document.getElementById('capstone-submit');
    const projectSelect = document.getElementById('capstone-project');
    const promptInput = document.getElementById('capstone-prompt');
    const feedbackMsg = document.getElementById('feedback-msg');

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
    submitBtn.addEventListener('click', () => {
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

        // Success
        feedbackMsg.style.color = "var(--success)";
        feedbackMsg.innerHTML = "<strong>Congratulations!</strong> You have successfully orchestrated a Symbiotic AI workflow. Course Complete!";
        
        if (typeof markCompleted === 'function') {
            markCompleted('module_04');
        }
    });
});
