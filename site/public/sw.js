/* Code Reference PWA service worker — basePath-aware (GitHub Pages + local). */
/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'coderef-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const SW_PATH = self.location.pathname;
const BASE = SW_PATH.replace(/\/sw\.js$/i, '');

function url(path) {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${BASE}${path}`;
}

const PRECACHE = [
  url('/'),
  url('/docs/'),
  url('/offline/'),
  url('/manifest.webmanifest'),
  url('/icons/icon-192.png'),
  url('/icons/icon-512.png'),
  url('/icons/maskable-512.png'),
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        PRECACHE.map(async (req) => {
          try {
            await cache.add(req);
          } catch {
            // optional during first install / missing routes
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('coderef-') && !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isNavigation(request) {
  return (
    request.mode === 'navigate' ||
    (request.method === 'GET' &&
      request.headers.get('accept')?.includes('text/html'))
  );
}

function isStaticAsset(pathname) {
  return /\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|map|webmanifest)$/i.test(
    pathname,
  );
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw new Error('offline');
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => undefined);
  return cached || (await networkPromise) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isNavigation(request)) {
    event.respondWith(
      (async () => {
        try {
          return await networkFirst(request, PAGES_CACHE);
        } catch {
          const offline = await caches.match(url('/offline/'));
          return (
            offline ||
            new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            })
          );
        }
      })(),
    );
    return;
  }

  if (isStaticAsset(url.pathname) || url.pathname.includes('/_next/')) {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
