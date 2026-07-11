import { buildTopicMarkdownExport } from '@/lib/gateway/catalog';
import { TOPICS } from '@/lib/gateway/topics';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ topic: string }> },
) {
  const { topic } = await context.params;
  try {
    const markdown = await buildTopicMarkdownExport(topic);
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="code-reference-${topic}.md"`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } },
    );
  }
}
