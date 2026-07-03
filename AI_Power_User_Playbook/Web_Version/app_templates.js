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
});
