'use client';

import { Printer } from 'lucide-react';

export function PrintPageButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent"
      title="Print or save as PDF"
    >
      <Printer className="size-4" />
      Print / PDF
    </button>
  );
}
