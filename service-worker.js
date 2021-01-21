var dataCacheName = 'andreMueller-v1'
var cacheName = 'andreMueller-final-1'
var filesToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/fonts.css'
]

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request)
      }
      )
  )
})
