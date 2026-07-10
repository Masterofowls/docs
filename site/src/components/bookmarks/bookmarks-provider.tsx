'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import {
  loadBookmarks,
  saveBookmarks,
  type Bookmark,
} from '@/lib/bookmarks/storage';

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  isBookmarked: (url: string) => boolean;
  toggleBookmark: (input: {
    url: string;
    title: string;
    description?: string;
  }) => void;
  removeBookmark: (url: string) => void;
  clearBookmarks: () => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { user, status } = useAuth();
  const login = user?.login ?? null;
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    setBookmarks(loadBookmarks(login));
  }, [login, status]);

  const persist = useCallback(
    (next: Bookmark[]) => {
      setBookmarks(next);
      saveBookmarks(login, next);
    },
    [login],
  );

  const isBookmarked = useCallback(
    (url: string) => bookmarks.some((b) => b.url === url),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (input: { url: string; title: string; description?: string }) => {
      const exists = bookmarks.find((b) => b.url === input.url);
      if (exists) {
        persist(bookmarks.filter((b) => b.url !== input.url));
        return;
      }
      persist([
        {
          id: `${Date.now()}-${input.url}`,
          url: input.url,
          title: input.title,
          description: input.description,
          createdAt: new Date().toISOString(),
        },
        ...bookmarks,
      ]);
    },
    [bookmarks, persist],
  );

  const removeBookmark = useCallback(
    (url: string) => persist(bookmarks.filter((b) => b.url !== url)),
    [bookmarks, persist],
  );

  const clearBookmarks = useCallback(() => persist([]), [persist]);

  const value = useMemo(
    () => ({
      bookmarks,
      isBookmarked,
      toggleBookmark,
      removeBookmark,
      clearBookmarks,
    }),
    [bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks],
  );

  return (
    <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
  );
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarksProvider');
  return ctx;
}
