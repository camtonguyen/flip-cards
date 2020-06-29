const staticFlipCard = "flip-card-site-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
]

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticFlipCard).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticFlipCard)
        .map(key => caches.delete(key))
      );
    })
  );
});// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});