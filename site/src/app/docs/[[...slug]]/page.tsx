import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { BookmarkButton } from '@/components/bookmarks/bookmark-button';
import { PrintPageButton } from '@/components/docs/print-button';
import { TrackReading } from '@/components/progress/track-reading';
import { JsonLd } from '@/components/seo/json-ld';
import { gitConfig } from '@/lib/shared';
import {
  absoluteUrl,
  defaultOpenGraph,
  defaultTwitter,
  SITE_DESCRIPTION,
  techArticleJsonLd,
} from '@/lib/seo';
import { topicBySlug } from '@/lib/gateway/topics';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const canonical = absoluteUrl(page.url);
  const ogImage = getPageImage(page).url;
  const topic = page.slugs[0] ? topicBySlug(page.slugs[0]) : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd
        data={techArticleJsonLd({
          title: page.data.title,
          description: page.data.description,
          url: canonical,
          image: ogImage,
          topic: topic?.title ?? page.slugs[0] ?? null,
        })}
      />
      <TrackReading
        url={page.url}
        title={page.data.title}
        description={page.data.description}
        topic={page.slugs[0] ?? null}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="print-only docs-print-header mb-4 border-b border-fd-border pb-3 text-sm">
        <strong>{page.data.title}</strong>
        {topic ? <div className="text-fd-muted-foreground">{topic.title} cheat sheet</div> : null}
        <div className="text-xs text-fd-muted-foreground">{canonical}</div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-2 border-b pb-6 print:hidden">
        <BookmarkButton
          url={page.url}
          title={page.data.title}
          description={page.data.description}
        />
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <PrintPageButton />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <div className="docs-cheat-root">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description || SITE_DESCRIPTION;
  const canonical = absoluteUrl(page.url);
  const ogImage = getPageImage(page).url;
  const topic = page.slugs[0] ? topicBySlug(page.slugs[0]) : undefined;
  const enrichedTitle = topic ? `${title} — ${topic.title} cheat sheet` : title;

  return {
    title,
    description,
    keywords: [
      title,
      topic?.title,
      'cheat sheet',
      'reference',
      ...(page.slugs ?? []),
    ].filter(Boolean) as string[],
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: defaultOpenGraph({
      title: enrichedTitle,
      description,
      url: canonical,
      images: [ogImage],
      type: 'article',
    }),
    twitter: defaultTwitter({
      title: enrichedTitle,
      description,
      images: [ogImage],
    }),
  };
}
