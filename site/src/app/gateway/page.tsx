import type { Metadata } from 'next';
import Link from 'next/link';
import { ExportMarkdownButton } from '@/components/gateway/export-button';
import { GatewayPanel } from '@/components/gateway/gateway-panel';

export const metadata: Metadata = {
  title: 'API & MCP Gateway',
  description: 'HTTP API discovery, MCP tools, and export endpoints for Code Reference.',
};

export default function GatewayPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">API & MCP Gateway</h1>
        <p className="text-fd-muted-foreground">
          HTTP API and web MCP tools work on the live site (no local Node). Optional
          stdio MCP for offline agents. Export the library or add notes from the UI.
        </p>
        <div className="flex flex-wrap gap-2">
          <ExportMarkdownButton />
          <Link
            href="/export"
            className="inline-flex items-center rounded-full border border-fd-border px-4 py-2 text-sm hover:bg-fd-accent"
          >
            Export page
          </Link>
          <Link
            href="/notes/new"
            className="inline-flex items-center rounded-full border border-fd-border px-4 py-2 text-sm hover:bg-fd-accent"
          >
            New note
          </Link>
        </div>
      </header>
      <GatewayPanel />
    </main>
  );
}
