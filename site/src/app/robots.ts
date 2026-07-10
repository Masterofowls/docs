import type { MetadataRoute } from 'next';

const basePath = process.env.BASE_PATH || '';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (basePath ? `https://masterofowls.github.io${basePath}` : 'http://localhost:3000');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
