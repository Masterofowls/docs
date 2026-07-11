import { coverageReport } from '@/lib/gateway/catalog';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return Response.json(coverageReport(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
