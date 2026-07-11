import { absoluteApi } from '@/lib/gateway/catalog';
import { TOPICS } from '@/lib/gateway/topics';

export const dynamic = 'force-static';
export const revalidate = false;

/** OpenAPI 3.1 document for the static HTTP gateway. */
export function GET() {
  const base = absoluteApi('');
  const topicEnum = TOPICS.map((t) => t.slug);

  const doc = {
    openapi: '3.1.0',
    info: {
      title: 'Code Reference API',
      version: '1.0.0',
      description:
        'Static JSON/Markdown endpoints for the cheat-sheet library. Works on GitHub Pages with CORS *.',
    },
    servers: [{ url: base || '/' }],
    paths: {
      '/api/v1/discovery': {
        get: {
          summary: 'Gateway discovery',
          operationId: 'getDiscovery',
          responses: { '200': { description: 'Discovery document' } },
        },
      },
      '/api/v1/topics': {
        get: {
          summary: 'List topics',
          operationId: 'listTopics',
          responses: { '200': { description: 'Topic list' } },
        },
      },
      '/api/v1/pages': {
        get: {
          summary: 'List pages',
          operationId: 'listPages',
          responses: { '200': { description: 'Page index' } },
        },
      },
      '/api/v1/glossaries': {
        get: {
          summary: 'List glossaries',
          operationId: 'listGlossaries',
          responses: { '200': { description: 'Glossary URLs' } },
        },
      },
      '/api/v1/coverage': {
        get: {
          summary: 'Coverage report',
          operationId: 'getCoverage',
          responses: { '200': { description: 'Per-topic counts' } },
        },
      },
      '/api/v1/export': {
        get: {
          summary: 'Export full library Markdown',
          operationId: 'exportAll',
          responses: {
            '200': {
              description: 'text/markdown',
              content: { 'text/markdown': { schema: { type: 'string' } } },
            },
          },
        },
      },
      '/api/v1/topic-export/{topic}': {
        get: {
          summary: 'Export one topic Markdown',
          operationId: 'exportTopic',
          parameters: [
            {
              name: 'topic',
              in: 'path',
              required: true,
              schema: { type: 'string', enum: topicEnum },
            },
          ],
          responses: {
            '200': {
              description: 'text/markdown',
              content: { 'text/markdown': { schema: { type: 'string' } } },
            },
            '404': { description: 'Unknown topic' },
          },
        },
      },
      '/api/v1/openapi': {
        get: {
          summary: 'This OpenAPI document',
          operationId: 'getOpenApi',
          responses: { '200': { description: 'OpenAPI 3.1 JSON' } },
        },
      },
      '/api/mcp': {
        get: {
          summary: 'MCP HTTP tool manifest',
          operationId: 'getMcpManifest',
          responses: { '200': { description: 'MCP tools + HTTP mappings' } },
        },
      },
      '/api/search': {
        get: {
          summary: 'Static search index',
          operationId: 'getSearchIndex',
          responses: { '200': { description: 'Orama/static index payload' } },
        },
      },
      '/llms.mdx/docs/{slugs}/content.md': {
        get: {
          summary: 'Per-page Markdown',
          operationId: 'getPageMarkdown',
          parameters: [
            {
              name: 'slugs',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Slash-joined slugs, e.g. python/lists',
            },
          ],
          responses: {
            '200': {
              description: 'Markdown',
              content: { 'text/markdown': { schema: { type: 'string' } } },
            },
          },
        },
      },
    },
  };

  return Response.json(doc, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
