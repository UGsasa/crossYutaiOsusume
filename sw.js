const CACHE_NAME = 'kashikabu-v1';
const urlsToCache = [
  './',
  './index.html',
  './forRakutenMukigen.html',
  './forSmbc.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // キャッシュに失敗してもインストールを中断させないようにcatchする
        return cache.addAll(urlsToCache).catch(err => console.log('Cache failed', err));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返し、なければネットワークから取得する
        return response || fetch(event.request);
      })
  );
});
