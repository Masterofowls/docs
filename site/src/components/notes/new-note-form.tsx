'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-provider';
import { TOPICS } from '@/lib/gateway/topics';
import {
  buildNoteMarkdown,
  createNoteOnGitHub,
  noteRepoPath,
} from '@/lib/notes/create-note';

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\.md$/i, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_-]/g, '');
}

export function NewNoteForm() {
  const { token, status, user } = useAuth();
  const [topicSlug, setTopicSlug] = useState(TOPICS[0]?.slug ?? 'python');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const topic = useMemo(
    () => TOPICS.find((t) => t.slug === topicSlug) ?? TOPICS[0],
    [topicSlug],
  );

  const fileSlug = slugify(slug || title);
  const previewPath = topic && fileSlug ? noteRepoPath(topic, fileSlug) : '';
  const markdown = topic
    ? buildNoteMarkdown(title || 'Untitled', topic.title, body || undefined)
    : '';

  function downloadLocal() {
    if (!topic || !fileSlug) return;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileSlug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function publishToGitHub(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResultUrl(null);
    if (!token) {
      setError('Sign in with a GitHub PAT first (Contents: write on this repo).');
      return;
    }
    if (!topic || !fileSlug || !title.trim()) {
      setError('Topic, title, and slug are required.');
      return;
    }
    setBusy(true);
    try {
      const created = await createNoteOnGitHub({
        token,
        topic,
        fileSlug,
        title: title.trim(),
        markdown,
      });
      setResultUrl(created.htmlUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={publishToGitHub} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">Topic</span>
          <select
            className="mt-1.5 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2"
            value={topicSlug}
            onChange={(e) => setTopicSlug(e.target.value)}
          >
            {TOPICS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">Title</span>
          <input
            className="mt-1.5 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
            placeholder="Suspense boundaries"
            required
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium">File slug</span>
        <input
          className="mt-1.5 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 font-mono text-sm"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="suspense_boundaries"
          required
        />
        <span className="mt-1 block text-xs text-fd-muted-foreground">
          Writes to <code>{previewPath || '…'}</code>
        </span>
      </label>

      <label className="block text-sm">
        <span className="font-medium">Body (optional — leave empty for template)</span>
        <textarea
          className="mt-1.5 min-h-48 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 font-mono text-sm"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Paste full markdown or leave blank to use the cheat-sheet template"
        />
      </label>

      <div className="rounded-xl border border-fd-border bg-fd-muted/30 p-3 text-sm text-fd-muted-foreground">
        {status === 'authenticated' && user ? (
          <p>
            Signed in as <strong>@{user.login}</strong>. Publishing uses the GitHub Contents
            API — token needs <strong>Contents: Read and write</strong> on{' '}
            <code>Masterofowls/docs</code>.
          </p>
        ) : (
          <p>
            <Link href="/account" className="underline underline-offset-4">
              Sign in with a GitHub PAT
            </Link>{' '}
            to publish, or download the file and commit locally / run{' '}
            <code className="text-xs">node site/scripts/new-note.mjs</code>.
          </p>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {resultUrl ? (
        <p className="text-sm text-green-700 dark:text-green-400">
          Created:{' '}
          <a href={resultUrl} className="underline underline-offset-4" target="_blank" rel="noreferrer">
            {resultUrl}
          </a>
          . Site updates after sync/deploy.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={busy || !token}
          className="rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground disabled:opacity-60"
        >
          {busy ? 'Publishing…' : 'Publish to GitHub'}
        </button>
        <button
          type="button"
          onClick={downloadLocal}
          className="rounded-full border border-fd-border px-4 py-2 text-sm hover:bg-fd-accent"
        >
          Download .md
        </button>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(markdown);
          }}
          className="rounded-full border border-fd-border px-4 py-2 text-sm hover:bg-fd-accent"
        >
          Copy markdown
        </button>
      </div>
    </form>
  );
}
