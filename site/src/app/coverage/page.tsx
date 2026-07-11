import type { Metadata } from 'next';
import Link from 'next/link';
import { coverageReport } from '@/lib/gateway/catalog';

export const metadata: Metadata = {
  title: 'Coverage',
  description: 'Notes per topic, glossaries, and thin-page samples.',
};

export default function CoveragePage() {
  const report = coverageReport();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Coverage dashboard</h1>
        <p className="text-fd-muted-foreground">
          {report.totalPages} pages across {report.topics.length} topics. Thin samples are pages
          with very short descriptions — candidates to expand.
        </p>
        <p className="text-sm text-fd-muted-foreground">
          API:{' '}
          <Link href="/api/v1/coverage" className="underline underline-offset-4">
            /api/v1/coverage
          </Link>
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-fd-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-fd-border bg-fd-secondary/40">
            <tr>
              <th className="px-3 py-2 font-semibold">Topic</th>
              <th className="px-3 py-2 font-semibold">Notes</th>
              <th className="px-3 py-2 font-semibold">Glossary</th>
              <th className="px-3 py-2 font-semibold">Start</th>
              <th className="px-3 py-2 font-semibold">Thin</th>
              <th className="px-3 py-2 font-semibold">Export</th>
            </tr>
          </thead>
          <tbody>
            {report.topics.map((t) => (
              <tr key={t.slug} className="border-b border-fd-border/70">
                <td className="px-3 py-2">
                  <Link href={`/docs/${t.slug}`} className="font-medium underline-offset-4 hover:underline">
                    {t.title}
                  </Link>
                </td>
                <td className="px-3 py-2 tabular-nums">{t.count}</td>
                <td className="px-3 py-2">{t.glossary ? 'yes' : '—'}</td>
                <td className="px-3 py-2">{t.gettingStarted ? 'yes' : '—'}</td>
                <td className="px-3 py-2">
                  {t.thinCount > 0 ? (
                    <details>
                      <summary className="cursor-pointer tabular-nums">{t.thinCount}</summary>
                      <ul className="mt-1 space-y-0.5 text-xs text-fd-muted-foreground">
                        {t.thinSamples.map((s) => (
                          <li key={s.url}>
                            <Link href={s.url} className="hover:underline">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    '0'
                  )}
                </td>
                <td className="px-3 py-2">
                  <a
                    href={t.exportUrl}
                    className="text-xs underline underline-offset-4"
                  >
                    .md
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
