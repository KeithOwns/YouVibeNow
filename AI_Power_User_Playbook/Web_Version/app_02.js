document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.toggle-btn');
    const startBtn = document.getElementById('startChatBtn');
    const feedbackMsg = document.getElementById('feedback-msg');
    const attachmentBtn = document.getElementById('attachment-btn');
    const attachmentSheet = document.getElementById('attachment-sheet');
    const projectSelector = document.getElementById('project-selector');
    const memoryPill = document.getElementById('memory-pill');
    
    // Attachment Sheet Toggle
    let sheetOpen = false;
    attachmentBtn.addEventListener('click', () => {
        sheetOpen = !sheetOpen;
        if (sheetOpen) {
            attachmentSheet.style.display = 'block';
            attachmentBtn.style.transform = 'rotate(45deg)';
        } else {
            attachmentSheet.style.display = 'none';
            attachmentBtn.style.transform = 'rotate(0deg)';
        }
    });

    // Close sheet when clicking outside
    document.addEventListener('click', (e) => {
        if (sheetOpen && !attachmentSheet.contains(e.target) && e.target !== attachmentBtn) {
            sheetOpen = false;
            attachmentSheet.style.display = 'none';
            attachmentBtn.style.transform = 'rotate(0deg)';
        }
    });

    // Toggle button logic
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentState = toggle.getAttribute('data-state');
            if (currentState === 'off') {
                toggle.setAttribute('data-state', 'on');
                toggle.classList.add('active');
            } else {
                toggle.setAttribute('data-state', 'off');
                toggle.classList.remove('active');
            }

            // Sync memory pill with memory toggle
            if (toggle.id === 'toggle-memory') {
                const isOn = toggle.getAttribute('data-state') === 'on';
                if (isOn) {
                    memoryPill.style.background = 'var(--success-bg)';
                    memoryPill.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    memoryPill.style.color = '#a7f3d0';
                    memoryPill.innerHTML = 'Memory on ℹ️';
                } else {
                    memoryPill.style.background = 'var(--danger-bg)';
                    memoryPill.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    memoryPill.style.color = '#fca5a5';
                    memoryPill.innerHTML = 'Memory off ℹ️';
                }
            }
        });
    });

    startBtn.addEventListener('click', () => {
        const isCiOn = document.getElementById('toggle-ci').getAttribute('data-state') === 'on';
        const isMemoryOn = document.getElementById('toggle-memory').getAttribute('data-state') === 'on';
        const isHiOn = document.getElementById('toggle-hi').getAttribute('data-state') === 'on';
        const isTempOn = document.getElementById('toggle-temp').getAttribute('data-state') === 'on';
        const project = projectSelector.value;

        // Evaluation Logic for "Main Software Project" scenario
        if (isTempOn) {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Incorrect:</strong> You turned on Temporary Chat. This isolates the chat, meaning it can't access your Custom Instructions or Memory for your main project!";
            return;
        }

        if (project === 'main_software') {
            if (!isHiOn) {
                feedbackMsg.style.color = "var(--danger)";
                feedbackMsg.innerHTML = "<strong>Almost:</strong> You selected the right project context, but coding requires Higher Intelligence (advanced reasoning models) turned ON.";
                return;
            }
            feedbackMsg.style.color = "var(--success)";
            feedbackMsg.innerHTML = "<strong>Perfect!</strong> By selecting the Project context directly, you don't even need generic memory turned on. The project itself provides the isolated context. Ready to thin-prompt!";
            if (typeof markCompleted === 'function') markCompleted('module_02');
            return;
        }

        if (!isCiOn || !isMemoryOn || !isHiOn) {
            feedbackMsg.style.color = "var(--danger)";
            feedbackMsg.innerHTML = "<strong>Incorrect:</strong> Since you haven't selected a specific Project workspace, you need Custom Instructions, Memory, and Higher Intelligence all turned ON to properly engineer the baseline context.";
            return;
        }

        feedbackMsg.style.color = "var(--success)";
        feedbackMsg.innerHTML = "<strong>Module 02 Complete!</strong> Good baseline configuration. (Tip: Try selecting the 'Main Software' project from the dropdown above to see how Projects replace global memory!)";
        if (typeof markCompleted === 'function') markCompleted('module_02');
    });
});
