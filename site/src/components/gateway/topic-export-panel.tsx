'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { TOPICS } from '@/lib/gateway/topics';

function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
}

export function TopicExportPanel() {
  const [topic, setTopic] = useState(TOPICS[0]?.slug ?? 'python');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function downloadMd() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(withBase(`/api/v1/topic-export/${topic}`));
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-reference-${topic}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    setBusy(true);
    setError(null);
    try {
      const pagesRes = await fetch(withBase('/api/v1/pages'));
      if (!pagesRes.ok) throw new Error('Failed to load pages');
      const data = (await pagesRes.json()) as {
        pages: { title: string; slugs: string[]; topic: string | null; markdownUrl: string }[];
      };
      const topicPages = data.pages.filter((p) => p.topic === topic || p.slugs[0] === topic);
      if (topicPages.length === 0) throw new Error('No pages for topic');

      const files: { name: string; body: string }[] = [];
      for (const page of topicPages) {
        const mdRes = await fetch(page.markdownUrl);
        const body = mdRes.ok ? await mdRes.text() : `# ${page.title}\n\n(missing)\n`;
        const name = `${page.slugs.join('/')}.md`;
        files.push({ name, body });
      }

      // Minimal ZIP (store only) without deps
      const zip = buildStoreZip(files);
      const copy = new Uint8Array(zip.byteLength);
      copy.set(zip);
      const url = URL.createObjectURL(new Blob([copy], { type: 'application/zip' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-reference-${topic}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    setError(null);
  }, [topic]);

  return (
    <div className="space-y-3 rounded-2xl border border-fd-border p-5">
      <h2 className="text-lg font-semibold">Export one topic</h2>
      <p className="text-sm text-fd-muted-foreground">
        Download a single topic as one Markdown file, a ZIP of per-page files, or use Print /
        PDF on any docs page.
      </p>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Topic</span>
        <select
          className="w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {TOPICS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={downloadMd}
          className="inline-flex items-center gap-1.5 rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground disabled:opacity-50"
        >
          <Download className="size-4" />
          Download .md
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={downloadZip}
          className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-4 py-2 text-sm disabled:opacity-50"
        >
          <Download className="size-4" />
          Download .zip
        </button>
      </div>
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Tiny ZIP builder (STORE method only). */
function buildStoreZip(files: { name: string; body: string }[]): Uint8Array {
  const enc = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = enc.encode(file.name.replace(/\\/g, '/'));
    const data = enc.encode(file.body);
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length + data.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(8, 0, true); // method store
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    local.set(nameBytes, 30);
    local.set(data, 30 + nameBytes.length);
    localParts.push(local);

    const central = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(10, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint32(42, offset, true);
    central.set(nameBytes, 46);
    centralParts.push(central);
    offset += local.length;
  }

  const centralSize = centralParts.reduce((n, p) => n + p.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  const total =
    localParts.reduce((n, p) => n + p.length, 0) + centralSize + end.length;
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of localParts) {
    out.set(p, o);
    o += p.length;
  }
  for (const p of centralParts) {
    out.set(p, o);
    o += p.length;
  }
  out.set(end, o);
  return out;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
