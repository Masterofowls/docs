import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/bookmarks-list';
import { ContinueReading } from '@/components/progress/continue-reading';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Saved cheat sheets and continue reading history.',
};

export default function BookmarksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks & history</h1>
        <p className="text-fd-muted-foreground">
          Saved notes and your last visited pages (localStorage on this device).
        </p>
      </header>

      <section className="mb-10 space-y-3">
        <h2 className="text-lg font-semibold">Continue reading</h2>
        <ContinueReading limit={10} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bookmarks</h2>
        <BookmarksList />
      </section>
    </main>
  );
}
