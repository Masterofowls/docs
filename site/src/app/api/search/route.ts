import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

type Structured = {
  headings?: { id: string; content: string }[];
  contents?: { heading?: string; content: string }[];
};

/**
 * Keep the static Orama index under Cloudflare Pages' 25 MiB file limit.
 * Index titles, descriptions, and headings — skip full body `contents`.
 */
function slimStructuredData(data: Structured | undefined) {
  const headings = (data?.headings ?? []).map((h) => ({
    id: h.id,
    content: h.content.slice(0, 160),
  }));
  return {
    headings,
    // Empty contents: title/description/headings still searchable.
    contents: [] as { heading: string; content: string }[],
  };
}

/** Static indexes for Cloudflare Pages / `output: 'export'`. */
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description ?? '',
      url: page.url,
      id: page.url,
      structuredData: slimStructuredData(
        page.data.structuredData as Structured | undefined,
      ),
      tag: page.slugs[0] ?? 'docs',
    };
  },
});
