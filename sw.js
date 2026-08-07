const CACHE='soilution-v1.1.0';
const CORE=['./','./index.html','./manifest.json','./assets/logo-soilution.png','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
    const clone=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,clone)); return resp;
  }).catch(()=>caches.match('./index.html'))));
});
