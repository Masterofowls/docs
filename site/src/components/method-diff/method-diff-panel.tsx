'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { MethodDiffBundle, MethodPageData } from '@/lib/method-diff/catalog';
import type { MethodDiffPair } from '@/lib/method-diff/config';
import { buildMethodDiff } from '@/lib/method-diff/matcher';

type Props = {
  bundles: MethodDiffBundle[];
  pages: MethodPageData[];
  pairs: MethodDiffPair[];
  initialPairId: string;
};

function DiffTable({ bundle }: { bundle: MethodDiffBundle }) {
  return (
    <div className="method-diff-table-wrap overflow-x-auto rounded-xl border border-fd-border">
      <table className="method-diff-table w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-fd-border bg-fd-muted/40 text-left">
            <th className="px-3 py-2 font-medium">Match</th>
            <th className="px-3 py-2 font-medium">{bundle.left.label}</th>
            <th className="px-3 py-2 font-medium">{bundle.right.label}</th>
          </tr>
        </thead>
        <tbody>
          {bundle.rows.map((row, i) => {
            const rowClass =
              row.kind === 'match'
                ? 'bg-emerald-500/5'
                : row.kind === 'left-only'
                  ? 'bg-amber-500/5'
                  : 'bg-sky-500/5';

            return (
              <tr key={i} className={`border-b border-fd-border/60 ${rowClass}`}>
                <td className="px-3 py-2 align-top text-xs uppercase tracking-wide text-fd-muted-foreground">
                  {row.kind === 'match' ? (row.note ?? 'Same') : row.kind.replace('-', ' ')}
                </td>
                <td className="px-3 py-2 align-top">
                  {row.left ? (
                    <>
                      <code className="text-xs">{row.left.signature}</code>
                      <p className="mt-1 text-xs text-fd-muted-foreground">{row.left.description}</p>
                    </>
                  ) : (
                      <span className="text-fd-muted-foreground">—</span>
                    )}
                </td>
                <td className="px-3 py-2 align-top">
                  {row.right ? (
                    <>
                      <code className="text-xs">{row.right.signature}</code>
                      <p className="mt-1 text-xs text-fd-muted-foreground">
                        {row.right.description}
                      </p>
                    </>
                  ) : (
                    <span className="text-fd-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function MethodDiffPanel({ bundles, pages, pairs, initialPairId }: Props) {
  const searchParams = useSearchParams();
  const pairFromUrl = searchParams.get('pair');
  const resolvedInitial =
    pairFromUrl && pairs.some((p) => p.id === pairFromUrl) ? pairFromUrl : initialPairId;

  const [pairId, setPairId] = useState(resolvedInitial);
  const [leftId, setLeftId] = useState(
    () => pairs.find((p) => p.id === resolvedInitial)?.leftId ?? pages[0]?.id ?? '',
  );
  const [rightId, setRightId] = useState(
    () => pairs.find((p) => p.id === resolvedInitial)?.rightId ?? pages[1]?.id ?? '',
  );

  const presetBundle = bundles.find((b) => b.pair.id === pairId) ?? bundles[0];

  const customBundle = useMemo(() => {
    const left = pages.find((p) => p.id === leftId);
    const right = pages.find((p) => p.id === rightId);
    if (!left || !right) return presetBundle;

    const pair = pairs.find((p) => p.leftId === leftId && p.rightId === rightId);
    const rows = buildMethodDiff(left.methods, right.methods, pair);
    const matches = rows.filter((r) => r.kind === 'match').length;
    const leftOnly = rows.filter((r) => r.kind === 'left-only').length;
    const rightOnly = rows.filter((r) => r.kind === 'right-only').length;

    return {
      pair: pair ?? {
        id: 'custom',
        label: `${left.label} ↔ ${right.label}`,
        leftId,
        rightId,
      },
      left,
      right,
      rows,
      stats: { matches, leftOnly, rightOnly },
    } satisfies MethodDiffBundle;
  }, [leftId, rightId, pages, pairs, presetBundle]);

  const active = leftId === presetBundle.left.id && rightId === presetBundle.right.id
    ? presetBundle
    : customBundle;

  return (
    <div className="method-diff-root space-y-6">
      <div className="print-only method-diff-print-header">
        <strong>Code Reference — Method diff</strong>
        <div>{active.pair.label}</div>
      </div>

      <div className="flex flex-wrap gap-3 print:hidden">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-fd-muted-foreground">Preset pair</span>
          <select
            className="rounded-lg border border-fd-border bg-fd-background px-3 py-2"
            value={pairId}
            onChange={(e) => {
              const next = pairs.find((p) => p.id === e.target.value);
              setPairId(e.target.value);
              if (next) {
                setLeftId(next.leftId);
                setRightId(next.rightId);
              }
            }}
          >
            {pairs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-fd-muted-foreground">Left</span>
          <select
            className="rounded-lg border border-fd-border bg-fd-background px-3 py-2"
            value={leftId}
            onChange={(e) => setLeftId(e.target.value)}
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-fd-muted-foreground">Right</span>
          <select
            className="rounded-lg border border-fd-border bg-fd-background px-3 py-2"
            value={rightId}
            onChange={(e) => setRightId(e.target.value)}
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-emerald-500/10 px-3 py-1">
          {active.stats.matches} matched
        </span>
        <span className="rounded-full bg-amber-500/10 px-3 py-1">
          {active.stats.leftOnly} left only
        </span>
        <span className="rounded-full bg-sky-500/10 px-3 py-1">
          {active.stats.rightOnly} right only
        </span>
        <Link href={active.left.docUrl} className="underline underline-offset-4 print:hidden">
          {active.left.label} doc
        </Link>
        <Link href={active.right.docUrl} className="underline underline-offset-4 print:hidden">
          {active.right.label} doc
        </Link>
      </div>

      <DiffTable bundle={active} />
    </div>
  );
}
