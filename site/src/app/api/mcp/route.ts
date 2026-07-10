import { absoluteApi, gatewayDiscovery, listPageSummaries } from '@/lib/gateway/catalog';
import { TOPICS } from '@/lib/gateway/topics';

export const dynamic = 'force-static';
export const revalidate = false;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'public, max-age=3600',
};

/** Web + local MCP-compatible manifest (HTTP tools work on GitHub Pages). */
export function GET() {
  const discovery = gatewayDiscovery();
  const pages = listPageSummaries();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';

  const tools = [
    {
      name: 'list_topics',
      description: 'List documentation topics (Python, React, …)',
      inputSchema: { type: 'object', properties: {} },
      http: { method: 'GET', path: absoluteApi('/api/v1/topics') },
    },
    {
      name: 'list_pages',
      description: 'List all documentation pages with URLs',
      inputSchema: { type: 'object', properties: {} },
      http: { method: 'GET', path: absoluteApi('/api/v1/pages') },
    },
    {
      name: 'export_all_markdown',
      description: 'Download the entire library as one Markdown document',
      inputSchema: { type: 'object', properties: {} },
      http: { method: 'GET', path: absoluteApi('/api/v1/export') },
    },
    {
      name: 'get_page_markdown',
      description: 'Fetch Markdown for a page by slugs joined with /',
      inputSchema: {
        type: 'object',
        properties: {
          slugs: {
            type: 'string',
            description: 'e.g. python/lists or react/useState',
          },
        },
        required: ['slugs'],
      },
      http: {
        method: 'GET',
        pathTemplate: absoluteApi('/llms.mdx/docs/{slugs}/content.md'),
      },
    },
    {
      name: 'search_docs',
      description:
        'Search docs via page index (use /gateway playground or filter /api/v1/pages)',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
          tag: { type: 'string', description: 'Optional topic slug filter' },
        },
        required: ['query'],
      },
      http: {
        method: 'GET',
        path: absoluteApi('/api/v1/pages'),
        note: 'Filter client-side or use the /gateway playground',
      },
    },
    {
      name: 'list_glossaries',
      description: 'List glossary page URLs for every topic',
      inputSchema: { type: 'object', properties: {} },
      http: { method: 'GET', path: absoluteApi('/api/v1/glossaries') },
    },
  ];

  return Response.json(
    {
      protocol: 'mcp-http-gateway',
      version: '2025-07',
      transport: {
        web: {
          type: 'http-static',
          description:
            'All tools map to CORS-enabled GET endpoints. Use from browsers, agents, or the /gateway playground — no local Node process required.',
          manifestUrl: absoluteApi('/api/mcp'),
          playgroundUrl: absoluteApi('/gateway/'),
          openApiStyle: absoluteApi('/api/v1/discovery'),
        },
        local: {
          type: 'stdio',
          command: 'node',
          args: ['site/mcp/server.mjs'],
          cwd: 'repository root',
        },
      },
      server: {
        name: 'code-reference',
        title: 'Code Reference Docs',
        description:
          'Cheat-sheet library. Prefer HTTP tools on the deployed site; use stdio MCP only for offline/local agent setups.',
        websiteUrl: base
          ? `https://masterofowls.github.io${base}/`
          : 'http://localhost:3000/',
      },
      tools,
      resources: pages.map((p) => ({
        uri: `docs://${p.slugs.join('/')}`,
        name: p.title,
        description: p.description,
        mimeType: 'text/markdown',
        httpUrl: p.markdownUrl,
      })),
      topics: TOPICS.map((t) => t.slug),
      discovery,
      usage: {
        curl: `curl -sL ${absoluteApi('/api/v1/topics')}`,
        fetch: `await fetch('${absoluteApi('/api/v1/pages')}').then(r => r.json())`,
        getPage: `await fetch('${absoluteApi('/llms.mdx/docs/python/glossary/content.md')}').then(r => r.text())`,
      },
    },
    { headers: cors },
  );
}
