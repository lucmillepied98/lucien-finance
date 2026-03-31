var CACHE = ‘koinonia-v3’;
var FILES = [’/’, ‘/index.html’, ‘/manifest.json’, ‘/icon.png’];

self.addEventListener(‘install’, function(e) {
self.skipWaiting();
e.waitUntil(
caches.open(CACHE).then(function(cache) {
return cache.addAll(FILES).catch(function(){});
})
);
});

self.addEventListener(‘activate’, function(e) {
e.waitUntil(
caches.keys().then(function(keys) {
return Promise.all(
keys.filter(function(k) { return k !== CACHE; })
.map(function(k) { return caches.delete(k); })
);
}).then(function() {
return self.clients.claim();
})
);
});

self.addEventListener(‘fetch’, function(e) {
e.respondWith(
fetch(e.request).catch(function() {
return caches.match(e.request);
})
);
});
