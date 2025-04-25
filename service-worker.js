const CACHE_NAME = 'spectrum-ipad-cache-v1';

const urlsToCache = [
  '/spectrum_ipad/',
  '/spectrum_ipad/index.html',
  '/spectrum_ipad/style.css',
  '/spectrum_ipad/script.js',
  '/spectrum_ipad/icon.png',
  '/spectrum_ipad/offline-test.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});
