import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

/** Static indexes for GitHub Pages / `output: 'export'`. */
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
});
