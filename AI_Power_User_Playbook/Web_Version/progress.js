// progress.js - Handles global progress tracking via localStorage

function markCompleted(moduleId) {
    let progress = JSON.parse(localStorage.getItem('aiPlaybookProgress')) || {};
    progress[moduleId] = true;
    localStorage.setItem('aiPlaybookProgress', JSON.stringify(progress));
    updateNavigation();
}

function updateNavigation() {
    let progress = JSON.parse(localStorage.getItem('aiPlaybookProgress')) || {};
    const navLinks = document.querySelectorAll('.nav-bar .nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        let isCompleted = false;
        
        if (href.includes('module_01') && progress['module_01']) {
            isCompleted = true;
        } else if (href.includes('module_02') && progress['module_02']) {
            isCompleted = true;
        } else if (href.includes('module_03') && progress['module_03']) {
            isCompleted = true;
        }

        // Add checkmark if completed and not already present
        if (isCompleted && !link.innerHTML.includes('✅')) {
            link.innerHTML += ' <span style="font-size: 0.9em; text-shadow: 0 0 5px rgba(16, 185, 129, 0.5);">✅</span>';
        }
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', updateNavigation);
