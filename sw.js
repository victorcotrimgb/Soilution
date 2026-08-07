const CACHE='soilution-v1.3.0-logo-extrator';
const CORE=[
  './',
  './index.html',
  './manifest.json',
  './assets/logo-soilution-extrator-v3.png',
  './assets/icon-192-v3.png',
  './assets/icon-512-v3.png',
  './assets/apple-touch-icon-v3.png',
  './assets/favicon-32-v3.png'
];
self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(resp=>{
      const clone=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,clone));
      return resp;
    }).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./index.html')))
  );
});
