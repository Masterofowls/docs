import { gatewayDiscovery } from '@/lib/gateway/catalog';

export const dynamic = 'force-static';
export const revalidate = false;

/** Gateway discovery (nested under /api/v1/* so static export can use a directory). */
export function GET() {
  return Response.json(gatewayDiscovery(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
