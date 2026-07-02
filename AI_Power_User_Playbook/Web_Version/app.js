document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('promptInput');
    const submitBtn = document.getElementById('submitBtn');
    const chatHistory = document.getElementById('chatHistory');

    // Adaptive Logic Settings
    const MAX_WORD_COUNT = 30; // Threshold for a "Thick Prompt"
    const LEGACY_KEYWORDS = [
        "act as", "roleplay", "format as", "xml", "json", "do not apologize", 
        "constraint", "rule", "guideline", "you are a", "ignore previous"
    ];

    submitBtn.addEventListener('click', analyzePrompt);
    
    // Allow Ctrl+Enter to submit
    promptInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            analyzePrompt();
        }
    });

    function analyzePrompt() {
        const userInput = promptInput.value.trim();
        
        if (!userInput) return;

        // 1. Render User Message
        appendMessage('user', userInput);
        promptInput.value = '';
        promptInput.disabled = true;
        submitBtn.disabled = true;

        // Simulate thinking delay
        setTimeout(() => {
            evaluateInput(userInput);
        }, 1000);
    }

    function evaluateInput(input) {
        const words = input.split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;
        const lowerInput = input.toLowerCase();

        // Check for legacy prompt engineering keywords
        const foundLegacyWords = LEGACY_KEYWORDS.filter(word => lowerInput.includes(word));

        let isThick = false;
        let warningReason = "";

        if (foundLegacyWords.length > 0) {
            isThick = true;
            warningReason = `<strong>Thick Prompt Warning:</strong> You used legacy keywords ("${foundLegacyWords.join('", "')}"). Under the Context Engineering paradigm, the AI's persona and formatting should already be handled by your Custom Instructions and Memory.`;
        } else if (wordCount > MAX_WORD_COUNT) {
            isThick = true;
            warningReason = `<strong>Thick Prompt Warning:</strong> Your prompt is ${wordCount} words long. You are likely over-explaining or micromanaging the AI. Try to state just your final goal (Thin Prompting).`;
        }

        if (isThick) {
            appendMessage('warning', warningReason + "<br><br><em>Try again. Tell the AI to summarize the article in 10 words or less.</em>");
            resetInput();
        } else {
            // Success: Thin Prompt
            const successMsg = `<strong>Thin Prompt Success!</strong><br><br>Excellent. Because your context is pre-engineered, you only needed ${wordCount} words to state your goal. The AI easily parses this without tripping over constraints.<br><br><em>Module 00 Complete!</em>`;
            appendMessage('success', successMsg);
            
            // Re-enable input for play, but module is passed
            resetInput();
        }
    }

    function appendMessage(type, htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        
        if (type === 'user') {
            msgDiv.classList.add('user-msg');
            msgDiv.textContent = htmlContent; // text content for safety
        } else if (type === 'warning') {
            msgDiv.classList.add('ai-warning');
            msgDiv.innerHTML = htmlContent;
        } else if (type === 'success') {
            msgDiv.classList.add('ai-success');
            msgDiv.innerHTML = htmlContent;
        }

        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function resetInput() {
        promptInput.disabled = false;
        submitBtn.disabled = false;
        promptInput.focus();
    }
});
