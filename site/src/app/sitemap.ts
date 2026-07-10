import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const basePath = process.env.BASE_PATH || '';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath ? `https://masterofowls.github.io${basePath}` : 'http://localhost:3000');

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}${page.url.endsWith('/') ? '' : '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.slugs.length <= 1 ? 0.9 : 0.6,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/docs/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...pages,
  ];
}
