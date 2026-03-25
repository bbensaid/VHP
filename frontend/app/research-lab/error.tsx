"use client";
import Link from "next/link";
export default function ResearchLabError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-2xl p-12 shadow-sm">
        <p className="text-4xl mb-4">⚠️</p>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Research Lab unavailable</h1>
        <p className="text-slate-500 text-sm mb-6">The Research Lab is temporarily unavailable. Our team has been notified.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors">Try again</button>
          <Link href="/" className="border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">Home</Link>
        </div>
      </div>
    </div>
  );
}
