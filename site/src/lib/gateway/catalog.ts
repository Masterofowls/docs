import { getLLMText, source } from '@/lib/source';
import { TOPICS, topicBySlug } from './topics';

export type PageSummary = {
  id: string;
  title: string;
  description?: string;
  url: string;
  slugs: string[];
  topic: string | null;
  markdownUrl: string;
};

function basePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';
}

export function absoluteApi(path: string): string {
  const base = basePath();
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function listPageSummaries(): PageSummary[] {
  return source.getPages().map((page) => {
    const topic = page.slugs[0] ?? null;
    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      slugs: page.slugs,
      topic,
      markdownUrl: absoluteApi(
        `/llms.mdx/docs/${page.slugs.join('/')}/content.md`,
      ),
    };
  });
}

export async function buildFullMarkdownExport(): Promise<string> {
  const header = [
    `# Code Reference — full export`,
    ``,
    `_Generated for LLM / offline use. Topics: ${TOPICS.map((t) => t.title).join(', ')}_`,
    ``,
    `---`,
    ``,
  ].join('\n');

  const parts = await Promise.all(source.getPages().map((p) => getLLMText(p)));
  return `${header}${parts.join('\n\n---\n\n')}\n`;
}

export async function buildTopicMarkdownExport(topicSlug: string): Promise<string> {
  const topic = topicBySlug(topicSlug);
  const pages = source
    .getPages()
    .filter((p) => p.slugs[0] === topicSlug)
    .sort((a, b) => a.url.localeCompare(b.url));

  if (pages.length === 0) {
    throw new Error(`Unknown or empty topic: ${topicSlug}`);
  }

  const header = [
    `# Code Reference — ${topic?.title ?? topicSlug}`,
    ``,
    `_${pages.length} pages_`,
    ``,
    `---`,
    ``,
  ].join('\n');

  const parts = await Promise.all(pages.map((p) => getLLMText(p)));
  return `${header}${parts.join('\n\n---\n\n')}\n`;
}

export function coverageReport() {
  const pages = listPageSummaries();
  const byTopic = TOPICS.map((t) => {
    const topicPages = pages.filter((p) => p.topic === t.slug || p.slugs[0] === t.slug);
    const glossary = topicPages.some(
      (p) => p.slugs[p.slugs.length - 1] === 'glossary',
    );
    const gettingStarted = topicPages.some((p) =>
      p.slugs.includes('getting-started') || p.slugs.includes('getting_started'),
    );
    // Heuristic stubs: very short titles + missing description often indicate thin pages
    const thin = topicPages.filter(
      (p) => !p.description || p.description.length < 24,
    );
    return {
      slug: t.slug,
      title: t.title,
      count: topicPages.length,
      glossary,
      gettingStarted,
      thinCount: thin.length,
      thinSamples: thin.slice(0, 5).map((p) => ({ title: p.title, url: p.url })),
      url: absoluteApi(`/docs/${t.slug}/`),
      exportUrl: absoluteApi(`/api/v1/topic-export/${t.slug}`),
    };
  });

  return {
    totalPages: pages.length,
    topics: byTopic,
    generatedAt: new Date().toISOString(),
  };
}

export function gatewayDiscovery() {
  const base = basePath();
  return {
    name: 'Code Reference API Gateway',
    version: '1.0.0',
    baseUrl: base || '/',
    endpoints: [
      {
        method: 'GET',
        path: `${base}/api/v1/discovery`,
        description: 'Gateway discovery (this document)',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/topics`,
        description: 'List documentation topics',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/pages`,
        description: 'List all pages (metadata)',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/export`,
        description: 'Download full library as one Markdown file',
        contentType: 'text/markdown',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/topic-export/{topic}`,
        description: 'Download one topic as Markdown',
        contentType: 'text/markdown',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/coverage`,
        description: 'Per-topic note counts and thin-page samples',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/openapi`,
        description: 'OpenAPI 3.1 schema for the HTTP API',
      },
      {
        method: 'GET',
        path: `${base}/api/v1/glossaries`,
        description: 'Glossary page URLs for every topic',
      },
      {
        method: 'GET',
        path: `${base}/api/search`,
        description: 'Static Orama search index',
      },
      {
        method: 'GET',
        path: `${base}/api/mcp`,
        description: 'MCP tools & resources manifest (web HTTP + local stdio)',
      },
      {
        method: 'GET',
        path: `${base}/llms-full.txt`,
        description: 'LLM-oriented full text dump',
      },
      {
        method: 'GET',
        path: `${base}/llms.mdx/docs/{slugs}/content.md`,
        description: 'Per-page Markdown',
      },
    ],
    ui: {
      gateway: `${base}/gateway/`,
      export: `${base}/export/`,
      coverage: `${base}/coverage/`,
      preview: `${base}/preview/`,
      newNote: `${base}/notes/new/`,
      search: `${base}/search/`,
    },
  };
}
