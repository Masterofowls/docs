import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are offline. Cached pages may still be available.',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium tracking-wide text-fd-muted-foreground uppercase">
        Offline
      </p>
      <h1 className="text-3xl font-bold tracking-tight">No network connection</h1>
      <p className="text-fd-muted-foreground">
        Code Reference works offline for pages you have already opened. Reconnect to
        browse the full library, or open a cached topic from the home screen.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/docs"
          className="rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
        >
          Docs home
        </Link>
        <Link
          href="/"
          className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
        >
          Site home
        </Link>
      </div>
    </main>
  );
}
