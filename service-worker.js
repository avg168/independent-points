const CACHE_NAME = "ipt-v4.4.0";
const PRECACHE = [
  "./",
  "./index.html",
  "./wallet-core-v4.4.html",
  "./asset-center-v4.4.html",
  "./member-assets-v4.4.html",
  "./admin-assets-v4.4.html",
  "./admin-members-v4.4.html",
  "./print-report-v4.4.html",
  "./system-info-v4.4.html",
  "./manifest.webmanifest",
  "./ipt-icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith("ipt-") && key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Supabase / blockchain / external API requests must stay network-first.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
  );
});
