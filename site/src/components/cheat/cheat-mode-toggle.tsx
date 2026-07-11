'use client';

import { BookOpen, Rows3 } from 'lucide-react';
import { useCheatMode } from '@/components/cheat/cheat-mode-provider';

export function CheatModeToggle() {
  const { cheatMode, toggleCheatMode } = useCheatMode();

  return (
    <button
      type="button"
      onClick={toggleCheatMode}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
      title={cheatMode ? 'Exit cheat mode' : 'Cheat mode: compact tables, less prose'}
      aria-label={cheatMode ? 'Exit cheat mode' : 'Enable cheat mode'}
      aria-pressed={cheatMode}
    >
      {cheatMode ? <Rows3 className="size-4" /> : <BookOpen className="size-4" />}
    </button>
  );
}
