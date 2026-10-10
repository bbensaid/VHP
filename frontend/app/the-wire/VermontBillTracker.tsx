import { ArrowTopRightOnSquareIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import type { BillStatus } from "@/lib/wire/vt-bills";

// Server component: renders the tracked Vermont bills fetched by
// lib/wire/vt-bills.ts. No client JS — statuses change at most daily.

function checkedOn(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

function statusTone(action: string | null) {
  const a = (action ?? "").toLowerCase();
  if (a.includes("veto")) return "bg-rose-50 text-rose-700 border-rose-200";
  if (a.includes("signed") || a.includes("approved")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

export default function VermontBillTracker({ bills }: { bills: BillStatus[] }) {
  if (bills.length === 0) return null;
  return (
    <section aria-labelledby="vt-bills-heading"
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center gap-2 mb-1">
        <BuildingLibraryIcon className="w-4 h-4 text-green-700" />
        <h2 id="vt-bills-heading" className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
          Vermont Legislature — Health-Reform Bill Tracker
        </h2>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-snug">
        Bills that amend or implement Act 68, change the Green Mountain Care Board&apos;s duties, or shift its
        enforcement posture — the early-warning signals Chapter 14 names.
      </p>

      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {bills.map(b => {
          const known = !!(b.title && b.lastAction);
          return (
            <li key={`${b.session}/${b.bill}`} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100">{b.bill}</span>
                    {b.act && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border bg-slate-50 text-slate-600 border-slate-200">
                        {b.act}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">{b.session - 1}–{b.session} session</span>
                  </div>
                  {b.title && <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 leading-snug">{b.title}</p>}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{b.why}</p>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    {known ? (
                      <>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${statusTone(b.lastAction)}`}>
                          {b.lastAction}
                        </span>
                        {b.lastActionDate && <span className="text-[10px] text-slate-500">{b.lastActionDate}</span>}
                        {b.fetchedAt && <span className="text-[10px] text-slate-400">· checked {checkedOn(b.fetchedAt)}</span>}
                      </>
                    ) : (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-slate-50 text-slate-500 border-slate-200">
                        {b.attemptedAt ? "Status unavailable — see link" : "Status pending — see link"}
                      </span>
                    )}
                  </div>
                </div>
                <a href={b.url} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                  aria-label={`${b.bill} status on legislature.vermont.gov`}>
                  Status <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-[10px] text-slate-400 mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 leading-snug">
        Read from the Legislature&apos;s public bill status pages (legislature.vermont.gov/bill/status), at most once per
        bill per day and within its robots.txt crawl delay. The Legislature publishes no feed, so the list is curated;
        the official page is always the authority.
      </p>
    </section>
  );
}
