"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-6xl font-black text-slate-200 mb-4">500</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-8">
          An unexpected error occurred. Our team has been notified.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Go home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-slate-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
