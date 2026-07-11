'use client';

import { AuthProvider } from '@/components/auth/auth-provider';
import { BookmarksProvider } from '@/components/bookmarks/bookmarks-provider';
import { CheatModeProvider } from '@/components/cheat/cheat-mode-provider';
import { ProgressProvider } from '@/components/progress/progress-provider';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <ProgressProvider>
          <CheatModeProvider>{children}</CheatModeProvider>
        </ProgressProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}
