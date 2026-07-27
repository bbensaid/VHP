"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ExclamationTriangleIcon, BookOpenIcon } from "@heroicons/react/24/outline";

/**
 * Reader Mode error boundary. The most likely failure mode is the narration
 * .txt file not being present (the chapter exists in taxonomy but the
 * transcript was never written). We log the error and offer the user a path
 * forward — back to the chapter browser, or download the full PDF.
 */
export default function ReaderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("/read/[slug] error:", error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <ExclamationTriangleIcon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
      <h1 className="text-2xl font-black text-slate-900 mb-3">
        We couldn&apos;t load this chapter
      </h1>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto">
        Something went wrong while preparing the reader. The transcript file may be missing from this deployment. You can download the full book PDF or return to the chapter browser.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          Try again
        </button>
        <Link
          href="/book#chapters"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <BookOpenIcon className="w-4 h-4" />
          All chapters
        </Link>
        <a
          href="/HTR_Book_v42.pdf"
          download
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
