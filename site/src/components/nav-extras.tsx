'use client';

import Link from 'next/link';
import { Bookmark, LogIn, UserRound } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useBookmarks } from '@/components/bookmarks/bookmarks-provider';

export function NavExtras() {
  const { user, status } = useAuth();
  const { bookmarks } = useBookmarks();

  return (
    <div className="ms-auto flex items-center gap-1 sm:gap-2">
      <Link
        href="/bookmarks"
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        title="Bookmarks"
      >
        <Bookmark className="size-4" aria-hidden />
        <span className="hidden sm:inline">Bookmarks</span>
        {bookmarks.length > 0 ? (
          <span className="rounded-full bg-fd-primary/15 px-1.5 text-xs font-medium text-fd-primary">
            {bookmarks.length}
          </span>
        ) : null}
      </Link>
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        title={user ? `Signed in as ${user.login}` : 'Sign in with GitHub token'}
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
        <span className="hidden sm:inline">
          {user?.login ?? 'Account'}
        </span>
      </Link>
    </div>
  );
}
