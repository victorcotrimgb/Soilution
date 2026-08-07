const CACHE = 'soilution-v4.0.0-logo-inline';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './logo-soilution.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const isNav = req.mode === 'navigate';
  if (isNav) {
    event.respondWith(
      fetch(req, {cache:'no-store'})
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return resp;
    }))
  );
});
