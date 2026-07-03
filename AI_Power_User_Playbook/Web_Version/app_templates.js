document.addEventListener('DOMContentLoaded', () => {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const contentToCopy = document.getElementById(targetId).innerText;

            navigator.clipboard.writeText(contentToCopy).then(() => {
                // Visual feedback
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    const exportBtns = document.querySelectorAll('.export-btn');

    exportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const filename = btn.getAttribute('data-filename');
            let content = document.getElementById(targetId).innerText;
            
            // Inject YAML Frontmatter
            const dateStr = new Date().toISOString().split('T')[0];
            const frontmatter = ---
type: template
tags: [ai-playbook, context-engineering]
date:  + dateStr + 
---

;
            content = frontmatter + content;

            // Create Blob and trigger download
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Visual feedback
            const originalText = btn.innerText;
            btn.innerText = 'Exported!';
            btn.classList.add('copied');

            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('copied');
            }, 2000);
        });
    });
});