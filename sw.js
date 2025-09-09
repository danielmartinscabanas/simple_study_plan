const ASSETS = [
  '/simple_study_plan/',
  '/simple_study_plan/index.html',
  '/simple_study_plan/assets/css/styles.css',
  '/simple_study_plan/404.html',
  '/simple_study_plan/manifest.webmanifest',
  '/simple_study_plan/assets/icons/icon.svg',
  '/simple_study_plan/assets/icons/icon-192.png',
  '/simple_study_plan/assets/icons/icon-512.png',
  '/simple_study_plan/assets/icons/copy-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // For top-level navigations (HTML), use network-first to mirror browser behavior.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        // Cache only the core HTML pages
        if ([
          '/simple_study_plan/',
          '/simple_study_plan/index.html',
          '/simple_study_plan/404.html'
        ].includes(url.pathname)) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return res;
      }).catch(() => caches.match('/simple_study_plan/index.html'))
    );
    return;
  }

  // Static assets: cache-first, but only for known assets.
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (ASSETS.includes(url.pathname)) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        });
      })
    );
  }
});
