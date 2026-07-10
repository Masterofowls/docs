'use client';

import { AuthProvider } from '@/components/auth/auth-provider';
import { BookmarksProvider } from '@/components/bookmarks/bookmarks-provider';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BookmarksProvider>{children}</BookmarksProvider>
    </AuthProvider>
  );
}
