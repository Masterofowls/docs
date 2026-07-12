import type { MethodDiffPair } from '@/lib/method-diff/config';
import type { MethodEntry } from '@/lib/method-diff/parser';
import { normalizeMethodName } from '@/lib/method-diff/parser';

export type DiffRowKind = 'match' | 'left-only' | 'right-only';

export type MethodDiffRow = {
  kind: DiffRowKind;
  left: MethodEntry | null;
  right: MethodEntry | null;
  note?: string;
};

function buildRightIndex(right: MethodEntry[]) {
  const byNorm = new Map<string, MethodEntry>();
  for (const entry of right) {
    byNorm.set(normalizeMethodName(entry.name), entry);
  }
  return byNorm;
}

function resolveAlias(
  leftNorm: string,
  pair: MethodDiffPair | undefined,
  rightIndex: Map<string, MethodEntry>,
): MethodEntry | undefined {
  const aliasTarget = pair?.aliases?.[leftNorm] ?? pair?.aliases?.[leftNorm.replace(/_/g, '')];
  if (aliasTarget) {
    const hit = rightIndex.get(normalizeMethodName(aliasTarget));
    if (hit) return hit;
  }

  // Heuristic: shared substring (e.g. startswith ↔ startsWith)
  for (const [norm, entry] of rightIndex) {
    if (norm.includes(leftNorm) || leftNorm.includes(norm)) {
      if (leftNorm.length >= 4 || norm.length >= 4) return entry;
    }
  }

  return undefined;
}

export function buildMethodDiff(
  left: MethodEntry[],
  right: MethodEntry[],
  pair?: MethodDiffPair,
): MethodDiffRow[] {
  const rightIndex = buildRightIndex(right);
  const usedRight = new Set<string>();
  const rows: MethodDiffRow[] = [];

  for (const l of left) {
    const leftNorm = normalizeMethodName(l.name);
    let match =
      rightIndex.get(leftNorm) ??
      resolveAlias(leftNorm, pair, rightIndex) ??
      resolveAlias(l.name, pair, rightIndex);

    if (match) {
      usedRight.add(normalizeMethodName(match.name));
      const sameName = normalizeMethodName(match.name) === leftNorm;
      rows.push({
        kind: 'match',
        left: l,
        right: match,
        note: sameName ? undefined : 'Equivalent',
      });
    } else {
      rows.push({ kind: 'left-only', left: l, right: null });
    }
  }

  for (const r of right) {
    const norm = normalizeMethodName(r.name);
    if (!usedRight.has(norm)) {
      rows.push({ kind: 'right-only', left: null, right: r });
    }
  }

  const order: Record<DiffRowKind, number> = { match: 0, 'left-only': 1, 'right-only': 2 };
  rows.sort((a, b) => order[a.kind] - order[b.kind]);

  return rows;
}
