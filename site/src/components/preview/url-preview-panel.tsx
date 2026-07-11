'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, RefreshCw } from 'lucide-react';

function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function UrlPreviewPanel({
  initialUrl = '/docs/python/getting-started/',
  pages = [],
}: {
  initialUrl?: string;
  pages?: { title: string; url: string; topic?: string | null }[];
}) {
  const [url, setUrl] = useState(initialUrl);
  const [key, setKey] = useState(0);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return pages.slice(0, 40);
    return pages
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.url.toLowerCase().includes(q) ||
          (p.topic || '').toLowerCase().includes(q),
      )
      .slice(0, 40);
  }, [pages, filter]);

  const previewSrc = withBase(url.startsWith('/') ? url : `/${url}`);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
      <div className="space-y-3">
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Page path</span>
          <input
            className="w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 font-mono text-xs"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            spellCheck={false}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
            onClick={() => setKey((k) => k + 1)}
          >
            <RefreshCw className="size-3.5" />
            Reload
          </button>
          <a
            href={previewSrc}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
          >
            <ExternalLink className="size-3.5" />
            Open
          </a>
        </div>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Filter pages</span>
          <input
            className="w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="python glossary…"
          />
        </label>
        <ul className="max-h-80 space-y-1 overflow-auto text-sm">
          {filtered.map((p) => (
            <li key={p.url}>
              <button
                type="button"
                className="w-full rounded-lg px-2 py-1.5 text-left hover:bg-fd-accent"
                onClick={() => {
                  setUrl(p.url);
                  setKey((k) => k + 1);
                }}
              >
                <span className="font-medium">{p.title}</span>
                <span className="block truncate font-mono text-[11px] text-fd-muted-foreground">
                  {p.url}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-fd-muted-foreground">
          Also try the{' '}
          <Link href="/coverage" className="underline underline-offset-4">
            coverage dashboard
          </Link>
          .
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card">
        <div className="border-b border-fd-border px-3 py-2 font-mono text-xs text-fd-muted-foreground">
          {previewSrc}
        </div>
        <iframe
          key={key}
          title="Live page preview"
          src={previewSrc}
          className="h-[70vh] w-full bg-fd-background"
        />
      </div>
    </div>
  );
}
