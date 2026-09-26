const CACHE_NAME="ipt-v4.10.0";
const PRECACHE=[
  "./",
  "./index.html",
  "./i18n-v4.10.js",
  "./wallet-core-v4.10.html",
  "./asset-center-v4.10.html",
  "./member-assets-v4.10.html",
  "./admin-assets-v4.10.html",
  "./admin-members-v4.10.html",
  "./print-report-v4.10.html",
  "./system-info-v4.10.html",
  "./maintenance-v4.10.html",
  "./update-center-v4.10.html",
  "./security-center-v4.10.html",
  "./security-ops-v4.10.html",
  "./event-center-v4.10.html",
  "./release.json",
  "./release-history.json",
  "./update-manifest-v4.10.json",
  "./manifest.webmanifest",
  "./ipt-icon.svg",
  "./ipt-icon-192.png",
  "./ipt-icon-512.png",
  "./ipt-apple-touch-180.png"
];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("ipt-")&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{const req=event.request;if(req.method!=="GET")return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(req.mode==="navigate"){event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy)).catch(()=>{});return res}).catch(()=>caches.match(req).then(hit=>hit||caches.match("./index.html"))));return}event.respondWith(caches.match(req).then(hit=>{const net=fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy)).catch(()=>{});return res}).catch(()=>hit);return hit||net}))});
self.addEventListener("notificationclick",event=>{event.notification.close();const target=event.notification?.data?.url||"./event-center-v4.10.html?v=4100";event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if("focus" in c){c.navigate(target).catch(()=>{});return c.focus()}}return clients.openWindow?clients.openWindow(target):undefined}))});
