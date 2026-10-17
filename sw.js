// EVA PWA v2: network-only, no offline storage of client or booking data.
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('eva-static-')).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  const title = 'EVA MAKEUP STUDIO';
  event.waitUntil(self.registration.showNotification(title, {
    body: 'Новое сообщение в переписке',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'eva-chat-' + (data.message_id || Date.now()),
    data: { url: './?open=messages' },
    vibrate: [180, 90, 180]
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || './', self.registration.scope).href;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const found = windows.find(w => w.url.startsWith(self.registration.scope));
    if (found) { await found.focus(); if ('navigate' in found) await found.navigate(url); }
    else await clients.openWindow(url);
  })());
});
