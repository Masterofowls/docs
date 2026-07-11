'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
}

type McpTool = {
  name: string;
  description?: string;
  inputSchema?: {
    type?: string;
    properties?: Record<string, { type?: string; description?: string }>;
    required?: string[];
  };
  http?: {
    method?: string;
    path?: string;
    pathTemplate?: string;
    note?: string;
  };
};

type McpManifest = {
  tools?: McpTool[];
  transport?: { web?: { description?: string } };
};

const DEFAULT_ARGS: Record<string, string> = {
  get_page_markdown: '{"slugs":"python/glossary"}',
  search_docs: '{"query":"async","tag":"python"}',
  export_topic_markdown: '{"topic":"nextjs"}',
};

async function runWebTool(
  tool: McpTool,
  argsJson: string,
): Promise<{ ok: boolean; status: number; body: string }> {
  let args: Record<string, string> = {};
  if (argsJson.trim()) {
    try {
      args = JSON.parse(argsJson) as Record<string, string>;
    } catch {
      return { ok: false, status: 0, body: 'Invalid JSON arguments' };
    }
  }

  const name = tool.name;

  if (name === 'list_topics') {
    const r = await fetch(withBase('/api/v1/topics'));
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (name === 'list_pages') {
    const r = await fetch(withBase('/api/v1/pages'));
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (name === 'list_glossaries') {
    const r = await fetch(withBase('/api/v1/glossaries'));
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (name === 'get_coverage') {
    const r = await fetch(withBase('/api/v1/coverage'));
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (name === 'export_topic_markdown') {
    const topic = String(args.topic || '').trim();
    if (!topic) {
      return { ok: false, status: 0, body: 'Missing topic slug' };
    }
    const r = await fetch(withBase(`/api/v1/topic-export/${topic}`));
    const text = await r.text();
    return {
      ok: r.ok,
      status: r.status,
      body: text.length > 8000 ? `${text.slice(0, 8000)}\n\n… truncated for UI …` : text,
    };
  }
  if (name === 'export_all_markdown') {
    const r = await fetch(withBase('/api/v1/export'));
    const text = await r.text();
    return {
      ok: r.ok,
      status: r.status,
      body: text.length > 8000 ? `${text.slice(0, 8000)}\n\n… truncated for UI …` : text,
    };
  }
  if (name === 'get_page_markdown') {
    const slugs = String(args.slugs || '').replace(/^\/+|\/+$/g, '');
    if (!slugs) {
      return { ok: false, status: 0, body: 'Missing slugs (e.g. python/lists)' };
    }
    const r = await fetch(withBase(`/llms.mdx/docs/${slugs}/content.md`));
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (name === 'search_docs') {
    const query = String(args.query || '').toLowerCase().trim();
    const tag = String(args.tag || '').toLowerCase().trim();
    if (!query) {
      return { ok: false, status: 0, body: 'Missing query' };
    }
    const r = await fetch(withBase('/api/v1/pages'));
    if (!r.ok) {
      return { ok: false, status: r.status, body: await r.text() };
    }
    const data = (await r.json()) as {
      pages?: Array<{
        title: string;
        description?: string;
        slugs: string[];
        topic?: string | null;
        url: string;
      }>;
    };
    const hits = (data.pages || [])
      .filter((p) => {
        if (tag && (p.topic || p.slugs[0] || '').toLowerCase() !== tag) return false;
        const hay = `${p.title} ${p.description || ''} ${p.slugs.join(' ')}`.toLowerCase();
        return hay.includes(query);
      })
      .slice(0, 25)
      .map((p) => ({
        title: p.title,
        slugs: p.slugs.join('/'),
        url: p.url,
      }));
    return {
      ok: true,
      status: 200,
      body: JSON.stringify({ query, tag: tag || null, count: hits.length, hits }, null, 2),
    };
  }

  // Generic HTTP path from manifest
  if (tool.http?.path) {
    const r = await fetch(tool.http.path);
    return { ok: r.ok, status: r.status, body: await r.text() };
  }
  if (tool.http?.pathTemplate && args.slugs) {
    const path = tool.http.pathTemplate.replace('{slugs}', String(args.slugs));
    const r = await fetch(path);
    return { ok: r.ok, status: r.status, body: await r.text() };
  }

  return { ok: false, status: 0, body: `No web runner for tool: ${name}` };
}

export function McpPlayground() {
  const [manifest, setManifest] = useState<McpManifest | null>(null);
  const [toolName, setToolName] = useState('list_topics');
  const [argsJson, setArgsJson] = useState('{}');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    fetch(withBase('/api/mcp'))
      .then((r) => r.json())
      .then((data: McpManifest) => {
        setManifest(data);
        const first = data.tools?.[0]?.name;
        if (first) setToolName(first);
      })
      .catch(() => setManifest({ tools: [] }));
  }, []);

  const tools = useMemo(() => manifest?.tools ?? [], [manifest]);
  const selected = tools.find((t) => t.name === toolName) ?? null;

  useEffect(() => {
    if (!selected) return;
    const needsArgs = Boolean(selected.inputSchema?.required?.length);
    setArgsJson(needsArgs ? DEFAULT_ARGS[selected.name] || '{}' : '{}');
  }, [selected]);

  const run = useCallback(async () => {
    if (!selected) return;
    setRunning(true);
    setResult('');
    try {
      const out = await runWebTool(selected, argsJson);
      setResult(
        `HTTP ${out.status || '—'} ${out.ok ? 'OK' : 'ERROR'}\n\n${out.body}`,
      );
    } catch (err) {
      setResult(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  }, [selected, argsJson]);

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">MCP (web / HTTP)</h2>
      <p className="text-sm text-fd-muted-foreground">
        {manifest?.transport?.web?.description ||
          'Call the same MCP tools over HTTP from the browser — no local Node process.'}{' '}
        Manifest:{' '}
        <a className="underline underline-offset-4" href={withBase('/api/mcp')}>
          /api/mcp
        </a>
      </p>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Tool</span>
          <select
            className="w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
          >
            {tools.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="button"
            disabled={running || !selected}
            onClick={run}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground disabled:opacity-50 sm:w-auto"
          >
            {running ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            Run tool
          </button>
        </div>
      </div>

      {selected ? (
        <p className="text-sm text-fd-muted-foreground">{selected.description}</p>
      ) : null}

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Arguments (JSON)</span>
        <textarea
          className="min-h-20 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 font-mono text-xs"
          value={argsJson}
          onChange={(e) => setArgsJson(e.target.value)}
          spellCheck={false}
        />
      </label>

      <pre className="max-h-96 overflow-auto rounded-2xl border border-fd-border bg-fd-card p-4 text-xs whitespace-pre-wrap">
        {result || 'Result appears here after Run.'}
      </pre>
    </section>
  );
}
