import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { MethodDiffPanel } from '@/components/method-diff/method-diff-panel';
import { PrintPageButton } from '@/components/docs/print-button';
import { buildMethodDiffCatalog, bundleByPairId } from '@/lib/method-diff/catalog';
import { absoluteUrl, defaultOpenGraph, defaultTwitter, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Method diff',
  description:
    'Side-by-side method comparison across stacks — Python str vs JavaScript String, list vs Array, and more.',
  alternates: { canonical: absoluteUrl('/method-diff') },
  openGraph: defaultOpenGraph({
    title: 'Method diff — Code Reference',
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/method-diff'),
  }),
  twitter: defaultTwitter({
    title: 'Method diff — Code Reference',
    description: SITE_DESCRIPTION,
  }),
};

type PageProps = {
  searchParams?: Promise<{ pair?: string }>;
};

export default async function MethodDiffPage(_props: PageProps) {
  const catalog = buildMethodDiffCatalog();
  const initialPairId = catalog.pairs[0]?.id ?? 'str-string';
  const bundle = bundleByPairId(catalog, initialPairId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <header className="method-diff-page-header space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide text-fd-muted-foreground uppercase">
              Cross-stack reference
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Method diff</h1>
            <p className="max-w-2xl text-fd-muted-foreground">
              Compare method tables side-by-side — matched equivalents, left-only, and right-only
              APIs. Defaults to {bundle.pair.label}.
            </p>
          </div>
          <PrintPageButton />
        </div>
        <Link href="/docs" className="text-sm underline underline-offset-4 print:hidden">
          ← Back to docs
        </Link>
      </header>

      <Suspense fallback={<p className="text-sm text-fd-muted-foreground">Loading comparison…</p>}>
        <MethodDiffPanel
          bundles={catalog.bundles}
          pages={catalog.pages}
          pairs={catalog.pairs}
          initialPairId={initialPairId}
        />
      </Suspense>
    </main>
  );
}
