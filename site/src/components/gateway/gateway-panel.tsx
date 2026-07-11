'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { McpPlayground } from '@/components/gateway/mcp-playground';

function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
}

const MCP_SNIPPET = `{
  "mcpServers": {
    "code-reference": {
      "command": "node",
      "args": ["site/mcp/server.mjs"],
      "cwd": "C:/Users/mrdan/Downloads/docs"
    }
  }
}`;

const WEB_FETCH_SNIPPET = `// Web MCP / HTTP API — no local server
const base = location.origin + '/docs'; // omit '/docs' on localhost
const manifest = await fetch(base + '/api/mcp').then(r => r.json());
const topics = await fetch(base + '/api/v1/topics').then(r => r.json());
const glossaries = await fetch(base + '/api/v1/glossaries').then(r => r.json());
const page = await fetch(base + '/llms.mdx/docs/python/glossary/content.md').then(r => r.text());`;

export function GatewayPanel() {
  const [discovery, setDiscovery] = useState<unknown>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch(withBase('/api/v1/discovery'))
      .then((r) => r.json())
      .then(setDiscovery)
      .catch(() => setDiscovery({ error: 'Failed to load gateway discovery' }));
  }, []);

  async function copy(label: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH || '')
      : '';

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">HTTP API</h2>
        <p className="text-sm text-fd-muted-foreground">
          Static JSON/Markdown endpoints — works on GitHub Pages. CORS open for easy
          scripting from any origin.
        </p>
        <ul className="space-y-2 font-mono text-sm">
          {[
            ['GET', '/api/v1/discovery', 'Discovery'],
            ['GET', '/api/v1/topics', 'Topics'],
            ['GET', '/api/v1/pages', 'Page index'],
            ['GET', '/api/v1/glossaries', 'Topic glossaries'],
            ['GET', '/api/v1/coverage', 'Coverage report'],
            ['GET', '/api/v1/openapi', 'OpenAPI 3.1'],
            ['GET', '/api/v1/export', 'Full Markdown export'],
            ['GET', '/api/v1/topic-export/{topic}', 'Per-topic Markdown'],
            ['GET', '/api/mcp', 'MCP tools manifest (web)'],
            ['GET', '/api/search', 'Orama search index'],
            ['GET', '/llms-full.txt', 'LLM full dump'],
          ].map(([method, path, label]) => (
            <li
              key={path}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-fd-border px-3 py-2"
            >
              <span className="rounded bg-fd-primary/15 px-1.5 text-xs font-semibold text-fd-primary">
                {method}
              </span>
              <a className="underline-offset-4 hover:underline" href={withBase(path)}>
                {path}
              </a>
              <span className="text-fd-muted-foreground">— {label}</span>
              <button
                type="button"
                className="ms-auto inline-flex items-center gap-1 rounded-full border border-fd-border px-2 py-0.5 text-xs"
                onClick={() => copy(path, `${origin}${path}`)}
              >
                {copied === path ? <Check className="size-3" /> : <Copy className="size-3" />}
                Copy URL
              </button>
            </li>
          ))}
        </ul>
        <pre className="overflow-x-auto rounded-2xl border border-fd-border bg-fd-card p-4 text-xs">
          {WEB_FETCH_SNIPPET}
        </pre>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
          onClick={() => copy('web', WEB_FETCH_SNIPPET)}
        >
          {copied === 'web' ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy web fetch snippet
        </button>
      </section>

      <McpPlayground />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">MCP (local stdio, optional)</h2>
        <p className="text-sm text-fd-muted-foreground">
          Prefer the web tools above on the deployed site. Local stdio is only for offline
          Cursor/Claude Desktop. Tools: <code>list_topics</code>, <code>list_pages</code>,{' '}
          <code>get_page</code>, <code>search_docs</code>, <code>export_all_markdown</code>,{' '}
          <code>list_glossaries</code>.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-fd-border bg-fd-card p-4 text-xs">
          {MCP_SNIPPET}
        </pre>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
          onClick={() => copy('mcp', MCP_SNIPPET)}
        >
          {copied === 'mcp' ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy Cursor MCP config
        </button>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Discovery payload</h2>
        <pre className="max-h-80 overflow-auto rounded-2xl border border-fd-border bg-fd-card p-4 text-xs">
          {discovery ? JSON.stringify(discovery, null, 2) : 'Loading…'}
        </pre>
      </section>
    </div>
  );
}
