/* Name of the cache */
const CACHE_NAME = "subtracker-cache-clean";

/* Files to cache (minimal!) */
const FILES_TO_CACHE = [
  "/Subscriptions-Tracker/index.html",
  "/Subscriptions-Tracker/manifest.json",
  "/Subscriptions-Tracker/icons/icon-192.png",
  "/Subscriptions-Tracker/icons/icon-512.png"
];

/* Install – cache required files */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* Activate – delete all old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

/* Fetch – always try network first */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
