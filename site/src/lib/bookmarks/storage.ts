export type Bookmark = {
  id: string;
  url: string;
  title: string;
  description?: string;
  createdAt: string;
};

export function bookmarksStorageKey(login: string | null): string {
  return `coderef-bookmarks:${login ?? 'anonymous'}`;
}

export function loadBookmarks(login: string | null): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(bookmarksStorageKey(login));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Bookmark[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(login: string | null, items: Bookmark[]): void {
  localStorage.setItem(bookmarksStorageKey(login), JSON.stringify(items));
}
