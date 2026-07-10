import { buildFullMarkdownExport } from '@/lib/gateway/catalog';

export const revalidate = false;

export async function GET() {
  const markdown = await buildFullMarkdownExport();
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'attachment; filename="code-reference-full.md"',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
