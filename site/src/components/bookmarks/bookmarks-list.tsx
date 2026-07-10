'use client';

import Link from 'next/link';
import { BookmarkX, Trash2 } from 'lucide-react';
import { useBookmarks } from '@/components/bookmarks/bookmarks-provider';
import { useAuth } from '@/components/auth/auth-provider';

export function BookmarksList() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const { user } = useAuth();

  if (bookmarks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-fd-border p-8 text-center">
        <BookmarkX className="mx-auto size-8 text-fd-muted-foreground" aria-hidden />
        <p className="mt-3 font-medium">No bookmarks yet</p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          Open any docs page and click <strong>Bookmark</strong>.
          {user
            ? ` Saved for @${user.login} on this device.`
            : ' Sign in to keep bookmarks under your GitHub account on this device.'}
        </p>
        <Link
          href="/docs"
          className="mt-4 inline-flex rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
        >
          Browse docs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-fd-muted-foreground">
          {bookmarks.length} saved
          {user ? ` · @${user.login}` : ' · anonymous (this browser)'}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
          onClick={() => {
            if (confirm('Clear all bookmarks on this device?')) clearBookmarks();
          }}
        >
          <Trash2 className="size-4" aria-hidden />
          Clear all
        </button>
      </div>
      <ul className="divide-y divide-fd-border rounded-2xl border border-fd-border">
        {bookmarks.map((b) => (
          <li
            key={b.id}
            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <Link href={b.url} className="font-medium hover:underline">
                {b.title}
              </Link>
              {b.description ? (
                <p className="mt-0.5 line-clamp-2 text-sm text-fd-muted-foreground">
                  {b.description}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-fd-muted-foreground">{b.url}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
              onClick={() => removeBookmark(b.url)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
