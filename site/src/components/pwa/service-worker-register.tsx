'use client';

import { useEffect, useState } from 'react';

type SwState = 'unsupported' | 'pending' | 'registered' | 'error';

function swUrl() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}/sw.js`;
}

export function ServiceWorkerRegister() {
  const [state, setState] = useState<SwState>('pending');

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setState('unsupported');
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.register(swUrl(), {
          scope: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`,
          updateViaCache: 'none',
        });

        if (cancelled) return;
        setState('registered');

        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (
              worker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              worker.postMessage('SKIP_WAITING');
            }
          });
        });
      } catch (err) {
        console.warn('[pwa] service worker registration failed', err);
        if (!cancelled) setState('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (process.env.NODE_ENV === 'development' && state === 'error') {
    return (
      <span className="sr-only" data-sw-state={state}>
        Service worker error
      </span>
    );
  }

  return <span className="sr-only" data-sw-state={state} />;
}
