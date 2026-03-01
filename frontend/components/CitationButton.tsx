"use client";

import React, { useState } from "react";
import { ClipboardDocumentListIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CitationButtonProps {
  title: string;
  publishedAt: string;
}

export default function CitationButton({ title, publishedAt }: CitationButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const getCitation = (format: "APA" | "MLA") => {
    const date = new Date(publishedAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (format === "APA") {
      // HTR Intelligence. (2023, October 24). Title. Health Transformation Review. URL
      return `HTR Intelligence. (${year}, ${month} ${day}). ${title}. Health Transformation Review. ${url}`;
    } else {
      // "Title." Health Transformation Review, Day Mon. Year, URL.
      return `HTR Intelligence. "${title}." Health Transformation Review, ${day} ${month.slice(0, 3)}. ${year}, ${url}.`;
    }
  };

  const handleCopy = (format: "APA" | "MLA") => {
    const text = getCitation(format);
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => {
      setCopied(null);
      setShowMenu(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
        title="Cite Article"
      >
        <ClipboardDocumentListIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Cite</span>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 border-b border-slate-100 mb-1">
              Copy Citation
            </div>
            {["APA", "MLA"].map((format) => (
              <button
                key={format}
                onClick={() => handleCopy(format as "APA" | "MLA")}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded flex items-center justify-between"
              >
                <span>{format} Format</span>
                {copied === format && <CheckIcon className="w-3 h-3 text-emerald-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}