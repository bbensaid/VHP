"use client";

import { PrinterIcon } from "@heroicons/react/24/outline";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
      aria-label="Print Article"
    >
      <PrinterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Print</span>
    </button>
  );
}