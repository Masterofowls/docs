'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'coderef-pwa-install-dismissed';

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // iOS Safari
      ('standalone' in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));

    if (standalone) {
      setInstalled(true);
      return;
    }

    if (localStorage.getItem(DISMISS_KEY) === '1') return;

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || !visible || !deferred) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Code Reference"
      className="fixed right-4 bottom-4 z-50 max-w-sm rounded-2xl border border-fd-border bg-fd-popover p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl bg-fd-primary/10 p-2 text-fd-primary">
          <Download className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Install Code Reference</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            Add to your home screen for quick access and offline reading.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-fd-primary px-4 py-1.5 text-sm font-medium text-fd-primary-foreground"
              onClick={async () => {
                await deferred.prompt();
                const choice = await deferred.userChoice;
                if (choice.outcome === 'accepted') {
                  setVisible(false);
                }
                setDeferred(null);
              }}
            >
              Install
            </button>
            <button
              type="button"
              className="rounded-full border border-fd-border px-4 py-1.5 text-sm"
              onClick={() => {
                localStorage.setItem(DISMISS_KEY, '1');
                setVisible(false);
              }}
            >
              Not now
            </button>
          </div>
        </div>
        <button
          type="button"
          className="rounded-md p-1 text-fd-muted-foreground hover:bg-fd-accent"
          aria-label="Dismiss install prompt"
          onClick={() => {
            localStorage.setItem(DISMISS_KEY, '1');
            setVisible(false);
          }}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
