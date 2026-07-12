import type { Metadata } from 'next';
import Link from 'next/link';
import { ContinueReading } from '@/components/progress/continue-reading';
import { JsonLd } from '@/components/seo/json-ld';
import { FEATURED_PATHS } from '@/lib/featured-paths';
import { coverageReport, listPageSummaries } from '@/lib/gateway/catalog';
import { TOPICS } from '@/lib/gateway/topics';
import {
  absoluteUrl,
  defaultOpenGraph,
  defaultTwitter,
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
  websiteJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE_DEFAULT,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: defaultOpenGraph({
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
  }),
  twitter: defaultTwitter({
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const coverage = coverageReport();
  const pages = listPageSummaries();

  const highlights = pages
    .filter(
      (p) =>
        p.slugs.includes('getting-started') ||
        p.slugs[p.slugs.length - 1] === 'glossary' ||
        p.slugs[0] === 'global-glossary' ||
        p.slugs[0] === 'comparisons',
    )
    .slice(0, 9);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-14">
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <header className="space-y-4">
        <p className="text-sm font-medium tracking-wide text-fd-muted-foreground uppercase">
          Personal cheat-sheet library
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Code Reference</h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          {coverage.totalPages} notes across {TOPICS.length} topics — syntax tables, examples,
          glossaries, and vs-comparisons. Installable PWA with search, bookmarks, and HTTP/MCP
          gateway.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/docs"
            className="rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          >
            Open docs
          </Link>
          <Link
            href="/docs/global-glossary/global-glossary"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Global glossary
          </Link>
          <Link
            href="/method-diff"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Method diff
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Search
          </Link>
          <Link
            href="/coverage"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Coverage
          </Link>
          <Link
            href="/preview"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Live preview
          </Link>
          <Link
            href="/export"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            Export
          </Link>
          <Link
            href="/gateway"
            className="rounded-full border border-fd-border px-5 py-2.5 text-sm font-medium"
          >
            API / MCP
          </Link>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Continue reading</h2>
          <ContinueReading limit={6} />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Library pulse</h2>
          <ul className="space-y-2 text-sm">
            <li className="rounded-xl border border-fd-border px-3 py-2">
              <span className="font-medium">{coverage.totalPages}</span> pages ·{' '}
              <span className="font-medium">{TOPICS.length}</span> topics
            </li>
            <li className="rounded-xl border border-fd-border px-3 py-2">
              Glossaries:{' '}
              {coverage.topics.filter((t) => t.glossary).length}/{TOPICS.length}
            </li>
            <li className="rounded-xl border border-fd-border px-3 py-2">
              <Link href="/coverage" className="underline underline-offset-4">
                Open coverage dashboard
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Featured paths</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FEATURED_PATHS.map((path) => (
            <article
              key={path.id}
              className="rounded-2xl border border-fd-border bg-fd-card p-4"
            >
              <h3 className="font-semibold">{path.title}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{path.description}</p>
              <ol className="mt-3 list-decimal space-y-1 ps-4 text-sm">
                {path.steps.map((step) => (
                  <li key={step.href}>
                    <Link href={step.href} className="underline-offset-4 hover:underline">
                      {step.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold">Topics</h2>
          <Link href="/docs" className="text-sm underline underline-offset-4">
            Browse all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coverage.topics.map((t) => (
            <Link
              key={t.slug}
              href={`/docs/${t.slug}`}
              className="rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-accent"
            >
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {TOPICS.find((x) => x.slug === t.slug)?.description}
              </p>
              <p className="mt-2 text-xs text-fd-muted-foreground">
                {t.count} notes
                {t.glossary ? ' · glossary' : ''}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {highlights.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Highlights</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((p) => (
              <Link
                key={p.url}
                href={p.url}
                className="rounded-xl border border-fd-border px-3 py-2 text-sm hover:bg-fd-accent"
              >
                <span className="font-medium">{p.title}</span>
                <span className="mt-0.5 block text-xs text-fd-muted-foreground">
                  {p.slugs.join(' / ')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
