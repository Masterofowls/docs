import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

/** Static indexes for GitHub Pages / `output: 'export'`. */
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.slugs[0] ?? 'docs',
    };
  },
});
