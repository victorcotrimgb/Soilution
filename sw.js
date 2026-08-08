const CACHE='soilution-v6.0.0-relatorios';
const CORE=['./','./index.html?v=6.0.0','./manifest.json?v=6.0.0','./logo-soilution.png?v=6.0.0','./icon-192.png?v=6.0.0','./icon-512.png?v=6.0.0','./icon-maskable-192.png?v=6.0.0','./icon-maskable-512.png?v=6.0.0','./apple-touch-icon.png?v=6.0.0','./favicon-32.png?v=6.0.0'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp;}).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./index.html?v=6.0.0')||caches.match('./index.html'))));});
