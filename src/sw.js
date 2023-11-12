const CACHE_NAME = "2023-11-13 00:25";
const urlsToCache = [
  "/siminym-zh/",
  "/siminym-zh/index.js",
  "/siminym-zh/sql.js-httpvfs/sql-wasm.wasm",
  "/siminym-zh/sql.js-httpvfs/sqlite.worker.js",
  "/siminym-zh/favicon/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
