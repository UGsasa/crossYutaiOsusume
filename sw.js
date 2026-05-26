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
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache).catch(err => console.log('Cache failed', err))));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

// プッシュ通知の受信イベント
self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '通知', body: event.data.text() };
    }
  }

  const title = data.title || '通知があります';
  const options = {
    body: data.body || '詳細はこちらをご確認ください。',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: data.url || './'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 通知がクリックされたときの動作
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const targetUrl = event.notification.data || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // 既にアプリのウィンドウが開いている場合はフォーカスする
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      // 開いていなければ新規で開く
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
