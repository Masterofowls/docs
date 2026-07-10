import type { MetadataRoute } from 'next';
import { appName } from '@/lib/shared';

const basePath = process.env.BASE_PATH || '';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const start = `${basePath}/docs/`;
  const scope = `${basePath}/` || '/';

  return {
    id: `${basePath}/`,
    name: appName,
    short_name: 'CodeRef',
    description:
      'Cheat-sheet library for web and app development — offline-capable docs.',
    start_url: start,
    scope,
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'browser'],
    orientation: 'any',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    lang: 'en',
    dir: 'ltr',
    categories: ['education', 'developer', 'reference'],
    icons: [
      {
        src: `${basePath}/icons/icon-72.png`,
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-96.png`,
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-128.png`,
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-144.png`,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-152.png`,
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/icons/icon-384.png`,
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/icons/maskable-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Python',
        short_name: 'Python',
        description: 'Python cheat sheets',
        url: `${basePath}/docs/python/`,
        icons: [{ src: `${basePath}/icons/icon-96.png`, sizes: '96x96' }],
      },
      {
        name: 'JavaScript',
        short_name: 'JS',
        description: 'JavaScript cheat sheets',
        url: `${basePath}/docs/javascript/`,
        icons: [{ src: `${basePath}/icons/icon-96.png`, sizes: '96x96' }],
      },
      {
        name: 'React',
        short_name: 'React',
        description: 'React cheat sheets',
        url: `${basePath}/docs/react/`,
        icons: [{ src: `${basePath}/icons/icon-96.png`, sizes: '96x96' }],
      },
    ],
  };
}
