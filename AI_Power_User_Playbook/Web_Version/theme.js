// theme.js - Handles dark/light mode toggle and persistent state
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Load saved theme
    const currentTheme = localStorage.getItem('aiPlaybookTheme');
    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        toggleBtn.innerText = '🌙'; // Switch icon to moon
    } else {
        toggleBtn.innerText = '🌓'; // Default sun/moon
    }

    // Toggle event
    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.documentElement.classList.contains('light-mode')) {
            theme = 'light';
            toggleBtn.innerText = '🌙';
        } else {
            toggleBtn.innerText = '🌓';
        }
        localStorage.setItem('aiPlaybookTheme', theme);
    });
});
