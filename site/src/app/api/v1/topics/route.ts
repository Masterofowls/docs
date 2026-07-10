import { TOPICS } from '@/lib/gateway/topics';

export const revalidate = false;

export function GET() {
  return Response.json(
    {
      count: TOPICS.length,
      topics: TOPICS,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
