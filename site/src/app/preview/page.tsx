import type { Metadata } from 'next';
import { UrlPreviewPanel } from '@/components/preview/url-preview-panel';
import { listPageSummaries } from '@/lib/gateway/catalog';

export const metadata: Metadata = {
  title: 'Live preview',
  description: 'Realtime iframe preview of docs pages by URL.',
};

export default function PreviewPage() {
  const pages = listPageSummaries().map((p) => ({
    title: p.title,
    url: p.url,
    topic: p.topic,
  }));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Live page preview</h1>
        <p className="text-fd-muted-foreground">
          Pick any docs URL and preview it in a live iframe — useful for checking layout,
          links, and cheat mode without leaving the hub.
        </p>
      </header>
      <UrlPreviewPanel pages={pages} />
    </main>
  );
}
