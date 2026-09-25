const CACHE_NAME = "ipt-v4.4.1";
const PRECACHE = [
  "./",
  "./index.html",
  "./wallet-core-v4.4.1.html",
  "./asset-center-v4.4.1.html",
  "./member-assets-v4.4.1.html",
  "./admin-assets-v4.4.1.html",
  "./admin-members-v4.4.1.html",
  "./print-report-v4.4.1.html",
  "./system-info-v4.4.1.html",
  "./manifest.webmanifest",
  "./ipt-icon.svg",
  "./ipt-icon-192.png",
  "./ipt-icon-512.png",
  "./ipt-apple-touch-180.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith("ipt-") && key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Network only for external services (Supabase / RPC / CDN).
  if (url.origin !== self.location.origin) return;

  // Navigation: network first, then cached homepage.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Static assets: cache first, refresh in background.
  event.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
