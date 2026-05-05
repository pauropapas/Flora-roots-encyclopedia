// ============================================================
// Flora & Roots — Service Worker
// Full offline support for GitHub Pages PWA
// ============================================================

const CACHE_NAME = 'flora-roots-v1.0.0';
const OFFLINE_URL = './index.html';

// All files to cache for offline use
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  // Google Fonts (cached on first load)
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Cinzel+Decorative:wght@400;700&display=swap'
];

// ---- INSTALL: cache all core assets ----
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Flora & Roots service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell...');
      // Cache what we can; don't fail if external fonts are blocked
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn(`[SW] Could not cache: ${url}`, err))
        )
      );
    }).then(() => {
      console.log('[SW] Installation complete.');
      return self.skipWaiting();
    })
  );
});

// ---- ACTIVATE: clean old caches ----
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Flora & Roots service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log(`[SW] Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Now controlling all clients.');
      return self.clients.claim();
    })
  );
});

// ---- FETCH: serve from cache, fall back to network ----
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip browser extension and non-http(s) requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve from cache immediately
        // Also update cache in background (stale-while-revalidate)
        event.waitUntil(
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            })
            .catch(() => {}) // Fail silently when offline
        );
        return cachedResponse;
      }

      // Not in cache — try network
      return fetch(event.request).then((networkResponse) => {
        // Cache the new response for future use
        if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Both cache and network failed — serve offline fallback
        console.log('[SW] Offline fallback for:', event.request.url);
        return caches.match(OFFLINE_URL);
      });
    })
  );
});

// ---- BACKGROUND SYNC (for future note saving) ----
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    console.log('[SW] Background sync: notes');
  }
});

// ---- PUSH NOTIFICATIONS (scaffold for future use) ----
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Flora & Roots', {
    body: data.body || 'New botanical discovery!',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || './' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});

console.log('[SW] Flora & Roots service worker loaded.');
