const V = "socialens-v1";
const SHELL = ["/", "/core/", "/blog/", "/support/", "/logo.png", "/manifest.json"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((k) => Promise.all(k.filter((x) => x !== V).map((x) => caches.delete(x)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || u.pathname.startsWith("/downloads/") || u.pathname.startsWith("/video/")) return;
  const put = (res) => { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); return res; };
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(put).catch(() => caches.match(r).then((m) => m || caches.match("/"))));
    return;
  }
  e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => (res.ok ? put(res) : res))));
});
