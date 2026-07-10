import type { Metadata } from 'next';
import Link from 'next/link';
import { ExportMarkdownButton } from '@/components/gateway/export-button';

export const metadata: Metadata = {
  title: 'Export Markdown',
  description: 'Download the entire Code Reference library as one Markdown file.',
};

export default function ExportPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Export</h1>
        <p className="text-fd-muted-foreground">
          One-click download of every cheat sheet as a single <code>.md</code> file — ideal
          for LLMs, backups, and offline reading.
        </p>
      </header>

      <div className="space-y-4 rounded-2xl border border-fd-border p-6">
        <ExportMarkdownButton label="Download code-reference-full.md" />
        <p className="text-sm text-fd-muted-foreground">
          Direct link:{' '}
          <Link href="/api/v1/export" className="underline underline-offset-4">
            /api/v1/export
          </Link>{' '}
          · also{' '}
          <Link href="/llms-full.txt" className="underline underline-offset-4">
            /llms-full.txt
          </Link>
        </p>
        <p className="text-sm text-fd-muted-foreground">
          Prefer API docs? See the{' '}
          <Link href="/gateway" className="underline underline-offset-4">
            gateway
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
