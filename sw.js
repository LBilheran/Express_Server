// sw.js

// install event
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('nom_du_cache')
        .then((cache) => {
          return cache.addAll([
            './',
            'index.html',
            'stylesheets/index.css',
            'manifest.json',
            'images/a.jpg',
            'images/b.jpg',
            'images/c.jpg',
            'images/d.jpg',
            'images/fond_ecran.png'
         ]);
        })
        .then(() => {
          return self.skipWaiting();
        })
    );
  });
  
  // fetch event
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
