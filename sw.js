// EVA PWA v2: network-only, no offline storage of client or booking data.
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('eva-static-')).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
