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
import {
  clearReadingHistory,
  loadReadingHistory,
  pushReadingEntry,
  type ReadingEntry,
} from '@/lib/progress/storage';

type ProgressContextValue = {
  history: ReadingEntry[];
  trackPage: (input: {
    url: string;
    title: string;
    description?: string;
    topic?: string | null;
  }) => void;
  clearHistory: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ReadingEntry[]>([]);

  useEffect(() => {
    setHistory(loadReadingHistory());
  }, []);

  const trackPage = useCallback(
    (input: {
      url: string;
      title: string;
      description?: string;
      topic?: string | null;
    }) => {
      setHistory(pushReadingEntry(input));
    },
    [],
  );

  const clearHistory = useCallback(() => {
    clearReadingHistory();
    setHistory([]);
  }, []);

  const value = useMemo(
    () => ({ history, trackPage, clearHistory }),
    [history, trackPage, clearHistory],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
