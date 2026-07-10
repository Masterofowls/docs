'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { oramaStaticClient } from 'fumadocs-core/search/client/orama-static';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { SEARCH_TOPIC_TAGS, searchApiUrl } from '@/lib/search/config';

export function GlobalSearchPanel() {
  const [tag, setTag] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  const client = useMemo(
    () =>
      oramaStaticClient({
        from: searchApiUrl(),
        tag,
      }),
    [tag],
  );

  const { search, setSearch, query } = useDocsSearch({
    client,
    delayMs: 200,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  const results = query.data !== 'empty' && Array.isArray(query.data) ? query.data : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fd-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all cheat sheets…"
          className="w-full rounded-2xl border border-fd-border bg-fd-background py-3 ps-10 pe-4 text-base outline-none focus:ring-2 focus:ring-fd-primary"
          autoFocus
        />
        {query.isLoading ? (
          <Loader2 className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-fd-muted-foreground" />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTag(undefined)}
          className={`rounded-full px-3 py-1 text-sm ${
            !tag
              ? 'bg-fd-primary text-fd-primary-foreground'
              : 'border border-fd-border hover:bg-fd-accent'
          }`}
        >
          All
        </button>
        {SEARCH_TOPIC_TAGS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTag(t.value)}
            className={`rounded-full px-3 py-1 text-sm ${
              tag === t.value
                ? 'bg-fd-primary text-fd-primary-foreground'
                : 'border border-fd-border hover:bg-fd-accent'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {!ready ? (
        <p className="text-sm text-fd-muted-foreground">Loading search index…</p>
      ) : null}

      {search.trim().length === 0 ? (
        <p className="text-sm text-fd-muted-foreground">
          Tip: press <kbd className="rounded border border-fd-border px-1">Ctrl</kbd>+
          <kbd className="rounded border border-fd-border px-1">K</kbd> anywhere for the
          quick search dialog.
        </p>
      ) : results.length === 0 && !query.isLoading ? (
        <p className="text-sm text-fd-muted-foreground">No results for “{search}”.</p>
      ) : (
        <ul className="divide-y divide-fd-border overflow-hidden rounded-2xl border border-fd-border">
          {results.map((item) => (
            <li key={`${item.type}-${item.id}`}>
              <Link
                href={item.url}
                className="block p-4 transition-colors hover:bg-fd-accent"
              >
                <p className="font-medium">{item.content}</p>
                <p className="mt-0.5 text-xs text-fd-muted-foreground">{item.url}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
