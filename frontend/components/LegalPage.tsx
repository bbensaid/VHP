import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared layout for legal pages (Terms, Privacy, Disclaimer, Billing Policy).
 * Keeps the existing /terms + /privacy visual style in one place.
 */
export default function LegalPage({
  title,
  lastUpdated = "2026",
  children,
}: {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-policy mb-3">Legal</p>
        <h1 className="ty-h1 font-black text-slate-900 mb-4">{title}</h1>
        <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-brand-policy">
        {children}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm font-bold text-brand-policy hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
