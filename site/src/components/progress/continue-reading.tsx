'use client';

import Link from 'next/link';
import { useProgress } from '@/components/progress/progress-provider';

export function ContinueReading({ limit = 8 }: { limit?: number }) {
  const { history, clearHistory } = useProgress();
  const items = history.slice(0, limit);

  if (items.length === 0) {
    return (
      <p className="text-sm text-fd-muted-foreground">
        Pages you open will show up here for quick resume.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="flex flex-col rounded-xl border border-fd-border px-3 py-2 hover:bg-fd-accent"
            >
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-fd-muted-foreground">
                {item.topic ? `${item.topic} · ` : ''}
                {new Date(item.visitedAt).toLocaleString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={clearHistory}
        className="text-xs text-fd-muted-foreground underline underline-offset-4"
      >
        Clear history
      </button>
    </div>
  );
}
