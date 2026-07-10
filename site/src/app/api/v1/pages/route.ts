import { listPageSummaries } from '@/lib/gateway/catalog';

export const revalidate = false;

export function GET() {
  const pages = listPageSummaries();
  return Response.json(
    {
      count: pages.length,
      pages,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
