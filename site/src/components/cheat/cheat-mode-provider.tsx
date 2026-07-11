'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const KEY = 'coderef:cheat-mode';

type CheatModeContextValue = {
  cheatMode: boolean;
  setCheatMode: (value: boolean) => void;
  toggleCheatMode: () => void;
};

const CheatModeContext = createContext<CheatModeContextValue | null>(null);

function applyDom(cheat: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.cheat = cheat ? '1' : '0';
}

export function CheatModeProvider({ children }: { children: ReactNode }) {
  const [cheatMode, setCheatModeState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) === '1';
    setCheatModeState(stored);
    applyDom(stored);
  }, []);

  const setCheatMode = useCallback((value: boolean) => {
    setCheatModeState(value);
    localStorage.setItem(KEY, value ? '1' : '0');
    applyDom(value);
  }, []);

  const toggleCheatMode = useCallback(() => {
    setCheatMode(!cheatMode);
  }, [cheatMode, setCheatMode]);

  const value = useMemo(
    () => ({ cheatMode, setCheatMode, toggleCheatMode }),
    [cheatMode, setCheatMode, toggleCheatMode],
  );

  return (
    <CheatModeContext.Provider value={value}>{children}</CheatModeContext.Provider>
  );
}

export function useCheatMode(): CheatModeContextValue {
  const ctx = useContext(CheatModeContext);
  if (!ctx) throw new Error('useCheatMode must be used within CheatModeProvider');
  return ctx;
}
