'use client';

import Link from 'next/link';
import { Bookmark, LogIn, UserRound } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useBookmarks } from '@/components/bookmarks/bookmarks-provider';
import { CheatModeToggle } from '@/components/cheat/cheat-mode-toggle';

/**
 * Compact icon-only extras for the docs sidebar header so they fit beside
 * "Code Reference" when the sidebar is narrow or collapsed.
 */
export function NavExtras() {
  const { user, status } = useAuth();
  const { bookmarks } = useBookmarks();

  return (
    <div className="ms-auto flex max-w-full shrink-0 items-center gap-0.5 overflow-hidden">
      <CheatModeToggle />
      <Link
        href="/bookmarks"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        title={`Bookmarks${bookmarks.length ? ` (${bookmarks.length})` : ''}`}
        aria-label="Bookmarks"
      >
        <span className="relative inline-flex">
          <Bookmark className="size-4" aria-hidden />
          {bookmarks.length > 0 ? (
            <span className="absolute -top-1.5 -end-1.5 min-w-3.5 rounded-full bg-fd-primary px-0.5 text-center text-[9px] leading-3.5 font-semibold text-fd-primary-foreground">
              {bookmarks.length > 9 ? '9+' : bookmarks.length}
            </span>
          ) : null}
        </span>
      </Link>
      <Link
        href="/account"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        title={user ? `Signed in as ${user.login}` : 'Sign in with GitHub token'}
        aria-label="Account"
      >
        {status === 'authenticated' && user ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar_url}
            alt=""
            className="size-5 rounded-full"
            width={20}
            height={20}
          />
        ) : status === 'authenticated' ? (
          <UserRound className="size-4" aria-hidden />
        ) : (
          <LogIn className="size-4" aria-hidden />
        )}
      </Link>
    </div>
  );
}
