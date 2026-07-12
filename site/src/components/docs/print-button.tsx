'use client';

import { Printer } from 'lucide-react';
import { useCheatMode } from '@/components/cheat/cheat-mode-provider';

export function PrintPageButton() {
  const { cheatMode } = useCheatMode();

  const handlePrint = () => {
    const root = document.documentElement;
    root.dataset.print = '1';
    if (!cheatMode) {
      root.dataset.printCheat = '1';
    }
    const cleanup = () => {
      delete root.dataset.print;
      delete root.dataset.printCheat;
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-accent print:hidden"
      title="Print or save as PDF (compact cheat-sheet layout)"
    >
      <Printer className="size-4" />
      Print / PDF
    </button>
  );
}
