import fs from 'node:fs';
import path from 'node:path';
import {
  METHOD_DIFF_PAIRS,
  METHOD_PAGES,
  type MethodDiffPair,
  type MethodPageRef,
} from '@/lib/method-diff/config';
import { buildMethodDiff, type MethodDiffRow } from '@/lib/method-diff/matcher';
import { parseMethodsMarkdown, type MethodEntry } from '@/lib/method-diff/parser';

export type MethodPageData = MethodPageRef & {
  methods: MethodEntry[];
};

export type MethodDiffBundle = {
  pair: MethodDiffPair;
  left: MethodPageData;
  right: MethodPageData;
  rows: MethodDiffRow[];
  stats: { matches: number; leftOnly: number; rightOnly: number };
};

function repoRoot(): string {
  return path.resolve(process.cwd(), '..');
}

function readMethodPage(ref: MethodPageRef): MethodPageData {
  const filePath = path.join(repoRoot(), ref.topicDir, ref.file);
  const content = fs.readFileSync(filePath, 'utf8');
  return {
    ...ref,
    methods: parseMethodsMarkdown(content),
  };
}

export function buildMethodDiffCatalog(): {
  pages: MethodPageData[];
  pairs: MethodDiffPair[];
  bundles: MethodDiffBundle[];
} {
  const pages = METHOD_PAGES.map(readMethodPage);
  const pageMap = new Map(pages.map((p) => [p.id, p]));

  const bundles: MethodDiffBundle[] = METHOD_DIFF_PAIRS.map((pair) => {
    const left = pageMap.get(pair.leftId);
    const right = pageMap.get(pair.rightId);
    if (!left || !right) {
      throw new Error(`Method diff pair ${pair.id} references missing page`);
    }

    const rows = buildMethodDiff(left.methods, right.methods, pair);
    const matches = rows.filter((r) => r.kind === 'match').length;
    const leftOnly = rows.filter((r) => r.kind === 'left-only').length;
    const rightOnly = rows.filter((r) => r.kind === 'right-only').length;

    return { pair, left, right, rows, stats: { matches, leftOnly, rightOnly } };
  });

  return { pages, pairs: METHOD_DIFF_PAIRS, bundles };
}

export function bundleByPairId(catalog: ReturnType<typeof buildMethodDiffCatalog>, id: string) {
  return catalog.bundles.find((b) => b.pair.id === id) ?? catalog.bundles[0];
}
