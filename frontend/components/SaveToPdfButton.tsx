"use client";

import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface SaveToPdfButtonProps {
  elementId: string;
  filename: string;
}

export default function SaveToPdfButton({ filename }: SaveToPdfButtonProps) {
  const handleSave = () => {
    const prevTitle = document.title;
    document.title = filename;
    window.print();
    document.title = prevTitle;
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
      title="Save as PDF"
    >
      <ArrowDownTrayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">PDF</span>
    </button>
  );
}
