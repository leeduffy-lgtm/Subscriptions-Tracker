/* Name of the cache */
const CACHE_NAME = "subtracker-cache-v5";

/* Files to cache (GitHub Pages absolute paths) */
const FILES_TO_CACHE = [
  "/Subscriptions-Tracker/",
  "/Subscriptions-Tracker/home.html",
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

/* Activate – clean old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

/* Fetch – network first, then cache fallback */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
