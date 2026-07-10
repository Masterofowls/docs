import { absoluteApi, listPageSummaries } from '@/lib/gateway/catalog';
import { TOPICS } from '@/lib/gateway/topics';

export const dynamic = 'force-static';
export const revalidate = false;

/** Glossary pages across all topics (after sync). */
export function GET() {
  const pages = listPageSummaries().filter(
    (p) => p.slugs.length >= 2 && p.slugs[p.slugs.length - 1] === 'glossary',
  );

  const byTopic = TOPICS.map((t) => {
    const page = pages.find((p) => p.slugs[0] === t.slug);
    return {
      topic: t.slug,
      title: t.title,
      url: page?.url ?? absoluteApi(`/docs/${t.slug}/glossary/`),
      markdownUrl:
        page?.markdownUrl ??
        absoluteApi(`/llms.mdx/docs/${t.slug}/glossary/content.md`),
      available: Boolean(page),
    };
  });

  return Response.json(
    {
      count: byTopic.filter((g) => g.available).length,
      glossaries: byTopic,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
