import type { Metadata } from 'next';
import Link from 'next/link';
import { ExportMarkdownButton } from '@/components/gateway/export-button';
import { TopicExportPanel } from '@/components/gateway/topic-export-panel';

export const metadata: Metadata = {
  title: 'Export Markdown',
  description: 'Download the full library or a single topic as Markdown / ZIP.',
};

export default function ExportPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Export</h1>
        <p className="text-fd-muted-foreground">
          Full library, per-topic Markdown, ZIP of pages, or Print → Save as PDF on any note.
        </p>
      </header>

      <div className="space-y-4 rounded-2xl border border-fd-border p-6">
        <h2 className="text-lg font-semibold">Entire library</h2>
        <ExportMarkdownButton label="Download code-reference-full.md" />
        <p className="text-sm text-fd-muted-foreground">
          Direct link:{' '}
          <Link href="/api/v1/export" className="underline underline-offset-4">
            /api/v1/export
          </Link>{' '}
          ·{' '}
          <Link href="/llms-full.txt" className="underline underline-offset-4">
            /llms-full.txt
          </Link>
        </p>
      </div>

      <TopicExportPanel />

      <p className="text-sm text-fd-muted-foreground">
        OpenAPI:{' '}
        <Link href="/api/v1/openapi" className="underline underline-offset-4">
          /api/v1/openapi
        </Link>{' '}
        · Gateway:{' '}
        <Link href="/gateway" className="underline underline-offset-4">
          /gateway
        </Link>
      </p>
    </main>
  );
}
