
const cacheName = 'dnar'
const staticAssets = [
  './',
  './index.html',
  './js/app.js',
  './site.webmanifest',
  './android-chrome-192x192.png',
  // './js/0.js',
  // './js/1.js',
  // './js/2.js',
  // './js/3.js',
  // './js/4.js',
  // './js/5.js',
  './js/home.js',
  './js/business.js',
  './js/settings.js',
  './js/transaction.js',
  './js/transactionReport.js',
  './js/register.js',
  './js/transactionEdit.js',
  './js/login.js',
  './js/chunk-vendors.js',
  '.favicon-16x16.png',
]

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      },
      ),
  )
})
