const CACHE_NAME = 'ai-playbook-v1';
const ASSETS = [
    './',
    './index.html',
    './module_01.html',
    './module_02.html',
    './module_03.html',
    './module_04.html',
    './templates.html',
    './whitepaper.html',
    './styles.css',
    './app_01.js',
    './app_02.js',
    './app_03.js',
    './app_04.js',
    './app_templates.js',
    './progress.js',
    './theme.js',
    './manifest.json',
    './icon.jpg',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap',
    'https://d3js.org/d3.v7.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
