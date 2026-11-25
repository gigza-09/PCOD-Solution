/* Kahani offline worker: lets the app open without a connection once installed.
   Network first, so updates show up straight away; the cache is only a fallback. */
const CACHE = 'kahani-v2';
const FILES = ['./', 'index.html', 'css/styles.css', 'js/data.js', 'js/story.js', 'js/app.js', 'icon.svg', 'manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const own = new URL(e.request.url).origin === location.origin;
  e.respondWith(
    /* no-cache: always ask the server whether there's a newer version, so updates show on the next load */
    fetch(e.request, own ? { cache: 'no-cache' } : undefined)
      .then((res) => {
        if (res.ok && own) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('index.html')))
  );
});
