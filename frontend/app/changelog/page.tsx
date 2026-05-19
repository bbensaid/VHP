import Link from "next/link";
import { CHANGELOG, type ChangelogCategory } from "@/lib/data/changelog";

export const metadata = {
  title: "Changelog | HTR",
  description: "Platform updates: what's shipped on the Health Transformation Review.",
};

const CATEGORY_LABEL: Record<ChangelogCategory, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
  infra: "Infra",
};

const CATEGORY_COLOR: Record<ChangelogCategory, string> = {
  added:   "bg-emerald-100 text-emerald-800 border-emerald-200",
  changed: "bg-sky-100 text-sky-800 border-sky-200",
  fixed:   "bg-amber-100 text-amber-800 border-amber-200",
  removed: "bg-rose-100 text-rose-800 border-rose-200",
  infra:   "bg-slate-100 text-slate-700 border-slate-200",
};

const CATEGORY_ORDER: ChangelogCategory[] = ["added", "changed", "fixed", "removed", "infra"];

function fmtDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Hero */}
      <header className="mb-12">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Changelog</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
          What&apos;s shipped on HTR
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Platform updates in reverse-chronological order. For raw commit history see GitHub. Significant changes — new routes, refactors, behavior changes — are listed here for users.
        </p>
        <p className="text-xs text-slate-400 mt-3">
          Have feedback? <Link href="/advisory/contact" className="text-indigo-600 hover:underline">Tell us</Link>.
        </p>
      </header>

      {/* Entries */}
      <ol className="space-y-12 relative" aria-label="Release history">
        {CHANGELOG.map((entry, idx) => (
          <li key={`${entry.version}-${idx}`} className="relative pl-6 border-l-2 border-slate-200">
            {/* Marker */}
            <span
              className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h2 className="text-lg font-black text-slate-900 leading-tight">{entry.version}</h2>
              <time
                dateTime={entry.date}
                className="text-xs font-medium text-slate-400"
              >
                {fmtDate(entry.date)}
              </time>
            </div>
            {entry.summary && (
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{entry.summary}</p>
            )}

            <div className="space-y-4">
              {CATEGORY_ORDER.map((cat) => {
                const items = entry.changes[cat];
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat}>
                    <span
                      className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mb-2 ${CATEGORY_COLOR[cat]}`}
                    >
                      {CATEGORY_LABEL[cat]}
                    </span>
                    <ul className="space-y-1.5">
                      {items.map((it, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                          <span className="text-slate-300 shrink-0 mt-1.5">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
