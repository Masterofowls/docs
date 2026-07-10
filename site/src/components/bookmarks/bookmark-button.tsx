'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/components/bookmarks/bookmarks-provider';

type Props = {
  url: string;
  title: string;
  description?: string;
};

export function BookmarkButton({ url, title, description }: Props) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(url);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
      aria-pressed={active}
      onClick={() => toggleBookmark({ url, title, description })}
    >
      {active ? (
        <BookmarkCheck className="size-4 text-fd-primary" aria-hidden />
      ) : (
        <Bookmark className="size-4" aria-hidden />
      )}
      {active ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
