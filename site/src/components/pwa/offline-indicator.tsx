'use client';

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    return () => {
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center gap-2 bg-amber-600 px-3 py-1.5 text-sm font-medium text-white"
    >
      <WifiOff className="size-4 shrink-0" aria-hidden />
      You are offline — showing cached content when available
    </div>
  );
}
