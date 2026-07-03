document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropzones = document.querySelectorAll('.dropzone');
    const feedbackMsg = document.getElementById('feedback-msg');
    
    let totalItems = draggables.length;
    let correctlyPlaced = 0;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            checkCompletion();
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const draggable = document.querySelector('.dragging');
            if (!draggable) return;

            // Check if this dropzone accepts this item
            const acceptedIds = zone.getAttribute('data-accept').split(',');
            if (acceptedIds.includes(draggable.id)) {
                zone.appendChild(draggable);
                draggable.style.background = "var(--success-bg)";
                draggable.style.borderColor = "var(--success)";
                draggable.setAttribute('draggable', 'false'); // Lock it in
                feedbackMsg.style.color = "var(--success)";
                feedbackMsg.innerText = "Correct placement!";
                correctlyPlaced++;
            } else {
                feedbackMsg.style.color = "var(--danger)";
                feedbackMsg.innerText = "Incorrect. Think about where this belongs in Context Engineering.";
                
                // Visual shake feedback
                draggable.style.transform = "translateX(5px)";
                setTimeout(() => draggable.style.transform = "translateX(-5px)", 100);
                setTimeout(() => draggable.style.transform = "translateX(0)", 200);
            }
        });
    });

    function checkCompletion() {
        if (correctlyPlaced === totalItems) {
            feedbackMsg.innerHTML = "<strong>Module 01 Complete!</strong> You have successfully separated your persona/context into settings and built a Thin Prompt.";
            feedbackMsg.style.color = "var(--success)";
            if (typeof markCompleted === 'function') markCompleted('module_01');
        }
    }
});
