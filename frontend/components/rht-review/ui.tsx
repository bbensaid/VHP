// Small presentational pieces shared by the RHT review pages.
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 underline underline-offset-2">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3 h-3 shrink-0" />
    </a>
  );
}

export function Section({ id, label, title, children }: { id?: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <span className="text-xs font-black uppercase tracking-widest text-teal-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1 mb-5">{title}</h2>
      {children}
    </section>
  );
}

export function Stat({ value, label, sub }: { value: string; label: string; sub?: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
      <div className="text-2xl font-black text-teal-700 mb-1">{value}</div>
      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-500 mt-1 leading-snug">{sub}</div>}
    </div>
  );
}

export function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">{children}</p>;
}

export function StatusPill({ status }: { status: string | null }) {
  const s = status ?? "Not stated";
  const cls =
    s === "Complete" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : s === "In Progress" ? "bg-sky-50 text-sky-700 border-sky-200"
    : s === "No Progress" ? "bg-red-50 text-red-700 border-red-200"
    : s === "Mixed" ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-slate-50 text-slate-600 border-slate-200";
  return <span className={`inline-block text-[10px] font-bold uppercase tracking-wide border rounded px-2 py-0.5 ${cls}`}>{s === "N/A" ? "No commitment" : s}</span>;
}
