import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/app-providers';
import { PwaShell } from '@/components/pwa/pwa-shell';
import { SEARCH_TOPIC_TAGS } from '@/lib/search/config';
import { appName } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const basePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath
    ? `https://masterofowls.github.io${basePath}`
    : 'http://localhost:3000');

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description:
    'Cheat-sheet library for web and app development — Python, JavaScript, React, testing, and more. Installable PWA with offline reading.',
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

export default function Layout({ children }: LayoutProps<'/'>) {
  const searchApi = `${basePath}/api/search`;

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            options: {
              type: 'static',
              api: searchApi,
              allowClear: true,
              tags: SEARCH_TOPIC_TAGS.map((t) => ({
                name: t.name,
                value: t.value,
              })),
              links: [
                ['Open full search', `${basePath}/search/`],
                ['Bookmarks', `${basePath}/bookmarks/`],
                ['Docs home', `${basePath}/docs/`],
              ],
            },
          }}
        >
          <AppProviders>
            {children}
            <PwaShell />
          </AppProviders>
        </RootProvider>
      </body>
    </html>
  );
}
