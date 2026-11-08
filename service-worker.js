const CACHE_NAME="ipt-v4.14.2-hf21-member-report-return";
const PRECACHE=["./", "./index.html", "./i18n-v4.10.js", "./auth-guard-v4.12.js", "./wallet-core-v4.12.html", "./asset-center-v4.12.html", "./member-assets-v4.12.html", "./admin-assets-v4.12.html", "./admin-members-v4.12.html", "./print-report-v4.12.html", "./system-info-v4.12.html", "./maintenance-v4.12.html", "./update-center-v4.12.html", "./security-center-v4.12.html", "./security-ops-v4.12.html", "./event-center-v4.12.html", "./release.json", "./release-history.json", "./update-manifest-v4.12.json", "./manifest.webmanifest", "./ipt-icon.svg", "./ipt-icon-192.png", "./ipt-icon-512.png", "./ipt-apple-touch-180.png", "./wallet-dual-v4.14.2.html", "./auth-security-v4.14.2.html", "./change-password-v4.14.2.html", "./device-security-v4.14.2.html", "./pay-v4.14.2.html", "./withdrawal-v4.14.2.html", "./withdrawal-mfa-v4.14.2.html", "./withdrawal-admin-v4.14.2.html"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("ipt-")&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const destination = new URL("./event-center-v4.12.html", self.registration.scope);

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({type: "window", includeUncontrolled: true});
    const eventCenter = windows.find(client => {
      const url = new URL(client.url);
      return url.origin === destination.origin && url.pathname === destination.pathname;
    });
    if (eventCenter) {
      try {
        return await eventCenter.focus();
      } catch {
        // The event center may have been closed since matchAll.
      }
    }
    return self.clients.openWindow(destination.href);
  })());
});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp)).catch(()=>{});return res}).catch(()=>caches.match(r).then(h=>h||caches.match("./index.html"))));return}e.respondWith(caches.match(r).then(h=>h||fetch(r)))});
