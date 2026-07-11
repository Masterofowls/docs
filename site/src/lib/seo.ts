import type { Metadata } from 'next';
import { appName, gitConfig } from '@/lib/shared';

const basePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefer explicit env; else GH Pages when basePath set; else Cloudflare production; else localhost. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (basePath) {
    return `https://masterofowls.github.io${basePath}`.replace(/\/$/, '');
  }
  if (process.env.STATIC_EXPORT === 'true') {
    return 'https://code-reference-docs.pages.dev';
  }
  return 'http://localhost:3000';
}

export const SITE_DESCRIPTION =
  'Cheat-sheet library for web and app development — Python, JavaScript, React, Next.js, Postgres, Redis, glossaries, and more. Installable PWA with offline reading.';

export const SITE_TITLE_DEFAULT =
  'Code Reference — Python, JavaScript, React cheat sheets';

export function absoluteUrl(path = '/'): string {
  const site = getSiteUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${site}/`;
  // Keep asset/API paths without forced trailing slash; pages get one for consistency with trailingSlash export.
  if (/\.[a-z0-9]+$/i.test(normalized) || normalized.includes('/api/') || normalized.includes('/og/')) {
    return `${site}${normalized}`;
  }
  return `${site}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

export function defaultOpenGraph(overrides?: {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
  type?: 'website' | 'article';
}): NonNullable<Metadata['openGraph']> {
  return {
    type: overrides?.type ?? 'website',
    locale: 'en_US',
    siteName: appName,
    title: overrides?.title ?? SITE_TITLE_DEFAULT,
    description: overrides?.description ?? SITE_DESCRIPTION,
    url: overrides?.url ?? absoluteUrl('/'),
    images: (overrides?.images ?? ['/icons/icon-512.png']).map((url) => ({
      url,
      width: url.includes('image.png') ? 1200 : 512,
      height: url.includes('image.png') ? 630 : 512,
      alt: appName,
    })),
  };
}

export function defaultTwitter(overrides?: {
  title?: string;
  description?: string;
  images?: string[];
}): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: overrides?.title ?? SITE_TITLE_DEFAULT,
    description: overrides?.description ?? SITE_DESCRIPTION,
    images: overrides?.images ?? ['/icons/icon-512.png'],
  };
}

export function rootMetadata(): Metadata {
  const site = getSiteUrl();
  return {
    metadataBase: new URL(`${site}/`),
    applicationName: appName,
    title: {
      default: SITE_TITLE_DEFAULT,
      template: `%s | ${appName}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'cheat sheets',
      'Python',
      'JavaScript',
      'React',
      'TypeScript',
      'Next.js',
      'Postgres',
      'Redis',
      'glossary',
      'developer docs',
    ],
    authors: [{ name: gitConfig.user }],
    creator: gitConfig.user,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: absoluteUrl('/'),
    },
    openGraph: defaultOpenGraph(),
    twitter: defaultTwitter(),
    manifest: `${basePath}/manifest.webmanifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'CodeRef',
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: `${basePath}/icons/icon-32.png`, sizes: '32x32', type: 'image/png' },
        { url: `${basePath}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${basePath}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: `${basePath}/icons/icon-152.png`, sizes: '152x152', type: 'image/png' }],
      shortcut: [`${basePath}/icons/icon-192.png`],
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#0f172a',
      'msapplication-config': `${basePath}/browserconfig.xml`,
    },
  };
}

export function websiteJsonLd() {
  const site = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appName,
    alternateName: 'CodeRef',
    url: `${site}/`,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  const site = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: appName,
    url: `${site}/`,
    logo: absoluteUrl('/icons/icon-512.png'),
    sameAs: [`https://github.com/${gitConfig.user}/${gitConfig.repo}`],
  };
}

export function techArticleJsonLd(input: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  topic?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: input.title,
    description: input.description || SITE_DESCRIPTION,
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: gitConfig.user,
      url: `https://github.com/${gitConfig.user}`,
    },
    publisher: {
      '@type': 'Organization',
      name: appName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icons/icon-512.png'),
      },
    },
    ...(input.image
      ? { image: [input.image.startsWith('http') ? input.image : absoluteUrl(input.image)] }
      : {}),
    ...(input.topic ? { about: input.topic } : {}),
    isPartOf: {
      '@type': 'WebSite',
      name: appName,
      url: absoluteUrl('/'),
    },
  };
}
