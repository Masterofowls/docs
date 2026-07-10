import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/bookmarks-list';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Your saved cheat sheets on this device.',
};

export default function BookmarksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-fd-muted-foreground">
          Saved locally in your browser. Sign in with a GitHub token to namespace them under
          your account on this device.
        </p>
      </header>
      <BookmarksList />
    </main>
  );
}
