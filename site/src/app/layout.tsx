import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/app-providers';
import { PwaShell } from '@/components/pwa/pwa-shell';
import { rootMetadata } from '@/lib/seo';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const basePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';

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

export const metadata = rootMetadata();

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
              // Topic tag chips stay on /search — omit here so Cmd+K has no
              // full-width Python/JS/… footer strip on docs pages.
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
