const KEY = 'coderef:reading-history';
const MAX = 24;

export type ReadingEntry = {
  url: string;
  title: string;
  description?: string;
  topic?: string | null;
  visitedAt: string;
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadReadingHistory(): ReadingEntry[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ReadingEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReadingHistory(entries: ReadingEntry[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
}

export function pushReadingEntry(entry: Omit<ReadingEntry, 'visitedAt'>) {
  const next: ReadingEntry = {
    ...entry,
    visitedAt: new Date().toISOString(),
  };
  const prev = loadReadingHistory().filter((e) => e.url !== entry.url);
  const merged = [next, ...prev].slice(0, MAX);
  saveReadingHistory(merged);
  return merged;
}

export function clearReadingHistory() {
  if (!canUseStorage()) return;
  localStorage.removeItem(KEY);
}
