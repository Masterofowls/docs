#!/usr/bin/env node
/**
 * Local stdio MCP server for Code Reference docs.
 * Cursor / Claude Desktop config:
 *   { "command": "node", "args": ["site/mcp/server.mjs"], "cwd": "<repo>" }
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SITE_ROOT, '..');
const CONTENT = path.join(SITE_ROOT, 'content', 'docs');
const TOPICS = JSON.parse(
  fs.readFileSync(path.join(SITE_ROOT, 'topics.json'), 'utf8'),
);

function walkMarkdown(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(abs, rel));
      continue;
    }
    if (!entry.name.endsWith('.mdx') && !entry.name.endsWith('.md')) continue;
    if (entry.name === 'meta.json') continue;
    out.push({ abs, rel: rel.replace(/\\/g, '/') });
  }
  return out;
}

function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\s+/, '');
}

function listPages() {
  return walkMarkdown(CONTENT).map(({ abs, rel }) => {
    const raw = fs.readFileSync(abs, 'utf8');
    const title =
      raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ||
      raw.match(/^#\s+(.+)$/m)?.[1] ||
      rel;
    const slugs = rel.replace(/\.mdx?$/, '').split('/');
    return { title, rel, slugs, path: abs };
  });
}

function getPage(slugsPath) {
  const clean = slugsPath.replace(/^\/+|\/+$/g, '').replace(/\.mdx?$/, '');
  const candidates = [
    path.join(CONTENT, `${clean}.mdx`),
    path.join(CONTENT, clean, 'index.mdx'),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return stripFrontmatter(fs.readFileSync(file, 'utf8'));
    }
  }
  // fallback: root topic folders
  const topic = TOPICS.find((t) => clean.startsWith(t.slug));
  if (topic) {
    const rest = clean.slice(topic.slug.length).replace(/^\//, '');
    const srcFile = path.join(
      REPO_ROOT,
      topic.src,
      rest ? `${rest.replace(/\//g, path.sep)}.md` : 'README.md',
    );
    if (fs.existsSync(srcFile)) return fs.readFileSync(srcFile, 'utf8');
  }
  throw new Error(`Page not found: ${slugsPath}`);
}

function exportAll() {
  const pages = listPages();
  return pages
    .map((p) => {
      const body = stripFrontmatter(fs.readFileSync(p.path, 'utf8'));
      return `# ${p.title} (/${p.slugs.join('/')})\n\n${body}`;
    })
    .join('\n\n---\n\n');
}

function searchPages(query) {
  const q = query.toLowerCase();
  return listPages()
    .filter((p) => {
      const body = fs.readFileSync(p.path, 'utf8').toLowerCase();
      return p.title.toLowerCase().includes(q) || body.includes(q);
    })
    .slice(0, 25)
    .map((p) => ({ title: p.title, slugs: p.slugs.join('/') }));
}

const TOOLS = [
  {
    name: 'list_topics',
    description: 'List documentation topics',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_pages',
    description: 'List all doc pages',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_page',
    description: 'Get markdown for a page (slugs like python/lists)',
    inputSchema: {
      type: 'object',
      properties: { slugs: { type: 'string' } },
      required: ['slugs'],
    },
  },
  {
    name: 'search_docs',
    description: 'Simple full-text search over local MDX',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
  },
  {
    name: 'export_all_markdown',
    description: 'Export entire library as one markdown string',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_glossaries',
    description: 'List glossary pages (topic/glossary) when present',
    inputSchema: { type: 'object', properties: {} },
  },
];

function listGlossaries() {
  return TOPICS.map((t) => {
    const slugs = `${t.slug}/glossary`;
    let available = false;
    try {
      getPage(slugs);
      available = true;
    } catch {
      available = false;
    }
    return { topic: t.slug, title: t.title, slugs, available };
  });
}

function toolResult(text) {
  return { content: [{ type: 'text', text }] };
}

async function callTool(name, args = {}) {
  switch (name) {
    case 'list_topics':
      return toolResult(JSON.stringify(TOPICS, null, 2));
    case 'list_pages':
      return toolResult(
        JSON.stringify(
          listPages().map((p) => ({ title: p.title, slugs: p.slugs.join('/') })),
          null,
          2,
        ),
      );
    case 'get_page':
      return toolResult(getPage(String(args.slugs || '')));
    case 'search_docs':
      return toolResult(JSON.stringify(searchPages(String(args.query || '')), null, 2));
    case 'export_all_markdown':
      return toolResult(exportAll());
    case 'list_glossaries':
      return toolResult(JSON.stringify(listGlossaries(), null, 2));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function send(msg) {
  process.stdout.write(`${JSON.stringify(msg)}\n`);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }

  const { id, method, params } = req;

  try {
    if (method === 'initialize') {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'code-reference', version: '1.0.0' },
        },
      });
      return;
    }
    if (method === 'notifications/initialized' || method?.startsWith('notifications/')) {
      return;
    }
    if (method === 'tools/list') {
      send({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
      return;
    }
    if (method === 'tools/call') {
      const result = await callTool(params?.name, params?.arguments || {});
      send({ jsonrpc: '2.0', id, result });
      return;
    }
    if (method === 'ping') {
      send({ jsonrpc: '2.0', id, result: {} });
      return;
    }
    send({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (err) {
    send({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32000,
        message: err instanceof Error ? err.message : String(err),
      },
    });
  }
});
