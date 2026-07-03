// search_settings.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Modals into the DOM
    const modalHTML = `
        <div id="search-modal" class="modal-overlay" style="display:none;">
            <div class="modal-content glass-card">
                <h2>Search Playbook</h2>
                <input type="text" id="search-input" placeholder="Search concepts (e.g. Adam's Law)..." autocomplete="off">
                <div id="search-results"></div>
                <button class="close-modal" data-target="search-modal">Close</button>
            </div>
        </div>
        <div id="settings-modal" class="modal-overlay" style="display:none;">
            <div class="modal-content glass-card">
                <h2>Settings</h2>
                <div style="margin: 1.5rem 0;">
                    <button id="export-save-btn" class="export-btn" style="width:100%; margin-bottom:1rem;">⬇️ Export Progress Data</button>
                    <label class="export-btn" style="width:100%; display:block; text-align:center; cursor:pointer;">
                        ⬆️ Import Progress Data
                        <input type="file" id="import-save-input" accept=".json" style="display:none;">
                    </label>
                </div>
                <button class="close-modal" data-target="settings-modal">Close</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. Add Styles dynamically for modals
    const style = document.createElement('style');
    style.innerHTML = `
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center; }
        .modal-content { padding: 2rem; width: 90%; max-width: 500px; display: flex; flex-direction: column; }
        .modal-content h2 { margin-top: 0; margin-bottom: 1rem; color: var(--accent-primary); }
        #search-input { width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: var(--text-main); border-radius: 4px; margin-bottom: 1rem; }
        :root.light-mode #search-input { background: #fff; }
        #search-results { max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; }
        .search-result-item { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 4px; text-decoration: none; color: var(--text-main); border: 1px solid transparent; transition: 0.2s; }
        .search-result-item:hover { border-color: var(--accent-primary); background: rgba(124, 58, 237, 0.1); }
        .search-result-title { font-weight: bold; margin-bottom: 0.25rem; }
        .search-result-snippet { font-size: 0.8rem; color: var(--text-muted); }
        .close-modal { margin-top: 1rem; padding: 0.5rem; background: transparent; border: 1px solid var(--text-muted); color: var(--text-muted); border-radius: 4px; cursor: pointer; }
        .close-modal:hover { background: rgba(255,255,255,0.1); color: var(--text-main); }
    `;
    document.head.appendChild(style);

    // 3. Setup Modal Triggers
    const searchBtn = document.getElementById('nav-search-btn');
    const settingsBtn = document.getElementById('nav-settings-btn');
    
    if (searchBtn) searchBtn.addEventListener('click', () => document.getElementById('search-modal').style.display = 'flex');
    if (settingsBtn) settingsBtn.addEventListener('click', () => document.getElementById('settings-modal').style.display = 'flex');
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.getElementById(e.target.getAttribute('data-target')).style.display = 'none';
        });
    });

    // 4. Setup Fuse.js Search
    if (typeof Fuse !== 'undefined' && typeof PLAYBOOK_SEARCH_INDEX !== 'undefined') {
        const fuse = new Fuse(PLAYBOOK_SEARCH_INDEX, {
            keys: ['title', 'content'],
            threshold: 0.3,
            ignoreLocation: true
        });

        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchResults.innerHTML = '';
            if (query.length < 2) return;

            const results = fuse.search(query);
            results.forEach(res => {
                const item = res.item;
                const div = document.createElement('a');
                div.href = item.url;
                div.className = 'search-result-item';
                div.innerHTML = `
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-snippet">${item.content.substring(0, 80)}...</div>
                `;
                searchResults.appendChild(div);
            });
            if (results.length === 0) {
                searchResults.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">No results found.</div>';
            }
        });
    }

    // 5. Setup Save/Import Logic
    const exportBtn = document.getElementById('export-save-btn');
    const importInput = document.getElementById('import-save-input');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const progress = localStorage.getItem('aiPlaybookProgress');
            if (!progress) {
                alert('No progress data found to export!');
                return;
            }
            const blob = new Blob([progress], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'AI_Playbook_SaveData.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    // Validate it looks like our save array
                    if (Array.isArray(data)) {
                        localStorage.setItem('aiPlaybookProgress', JSON.stringify(data));
                        alert('Progress successfully imported! Page will reload.');
                        window.location.reload();
                    } else {
                        alert('Invalid save file format.');
                    }
                } catch (err) {
                    alert('Error parsing save file.');
                }
            };
            reader.readAsText(file);
        });
    }
});
