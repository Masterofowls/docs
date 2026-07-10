import type { Metadata } from 'next';
import { GlobalSearchPanel } from '@/components/search/global-search-panel';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the entire Code Reference library.',
};

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-fd-muted-foreground">
          Full-library search powered by the static Orama index. Filter by topic or use
          Ctrl+K for the dialog.
        </p>
      </header>
      <GlobalSearchPanel />
    </main>
  );
}
