'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-provider';

export function SignInForm() {
  const { signIn, signOut, user, status, error } = useAuth();
  const [token, setToken] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalError(null);
    setBusy(true);
    try {
      await signIn(token);
      setToken('');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  }

  if (status === 'authenticated' && user) {
    return (
      <div className="space-y-4 rounded-2xl border border-fd-border p-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar_url}
            alt=""
            className="size-12 rounded-full"
            width={48}
            height={48}
          />
          <div>
            <p className="font-semibold">{user.name ?? user.login}</p>
            <a
              href={user.html_url}
              className="text-sm text-fd-muted-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              @{user.login}
            </a>
          </div>
        </div>
        <p className="text-sm text-fd-muted-foreground">
          Bookmarks on this device are stored under your GitHub login. The PAT never
          leaves this browser except for GitHub API calls to{' '}
          <code className="text-xs">api.github.com/user</code>.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/bookmarks"
            className="rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
          >
            View bookmarks
          </Link>
          <button
            type="button"
            className="rounded-full border border-fd-border px-4 py-2 text-sm hover:bg-fd-accent"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-fd-border p-6">
      <div>
        <label htmlFor="gh-pat" className="text-sm font-medium">
          GitHub personal access token
        </label>
        <input
          id="gh-pat"
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_… or github_pat_…"
          className="mt-2 w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-primary"
          required
        />
      </div>
      <div className="rounded-xl bg-fd-muted/40 p-3 text-sm text-fd-muted-foreground">
        <p className="font-medium text-fd-foreground">How to create a token</p>
        <ol className="mt-2 list-decimal space-y-1 ps-4">
          <li>
            Open{' '}
            <a
              className="underline underline-offset-4"
              href="https://github.com/settings/tokens?type=beta"
              target="_blank"
              rel="noreferrer"
            >
              GitHub → Settings → Fine-grained tokens
            </a>{' '}
            (or classic PATs).
          </li>
          <li>
            Grant only <code className="text-xs">read:user</code> (classic) or Account
            permissions → Profile: Read (fine-grained).
          </li>
          <li>Paste the token here. It is stored in <code className="text-xs">localStorage</code> on this device.</li>
        </ol>
        <p className="mt-2 text-amber-700 dark:text-amber-300">
          Do not use tokens with write/admin scopes. Revoke the token anytime from GitHub.
        </p>
      </div>
      {(localError || error) && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {localError || error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || status === 'loading'}
        className="rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground disabled:opacity-60"
      >
        {busy || status === 'loading' ? 'Verifying…' : 'Sign in with token'}
      </button>
    </form>
  );
}
