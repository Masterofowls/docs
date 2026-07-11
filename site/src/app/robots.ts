import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/offline/', '/account/'],
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
