/**
 * Shared pieces for the Medicare for All hub and the Act 48 case page.
 * Citations are numbered per page in order of first use, and resolve to M4A_SOURCES.
 */
import { M4A_SOURCES, type GateStatus } from "@/lib/data/medicare-for-all";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

/** Builds a per-page citation numbering. Call cite(ids) while rendering; then render <SourceList order={order} />. */
export function makeCiter() {
  const order: string[] = [];
  const cite = (ids: string[]) => (
    <sup className="ml-0.5 text-[10px] font-bold text-blue-700 whitespace-nowrap">
      {ids.map((id, i) => {
        if (!M4A_SOURCES[id]) throw new Error(`Unknown M4A source: ${id}`);
        if (!order.includes(id)) order.push(id);
        const n = order.indexOf(id) + 1;
        return (
          <a key={id} href={`#src-${id}`} className="hover:underline">
            {i > 0 ? "," : ""}[{n}]
          </a>
        );
      })}
    </sup>
  );
  return { cite, order };
}

export function SourceList({ order }: { order: string[] }) {
  return (
    <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-5">
      {order.map((id) => {
        const s = M4A_SOURCES[id];
        return (
          <li key={id} id={`src-${id}`}>
            {s.publisher}, <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2 inline-flex items-center gap-0.5">{s.title}<ArrowTopRightOnSquareIcon className="w-3 h-3" /></a>, {s.date}.{s.note ? ` ${s.note}.` : ""}
          </li>
        );
      })}
    </ol>
  );
}

export function SectionHeader({ label, title, id }: { label: string; title: string; id?: string }) {
  return (
    <div className="mb-6" id={id}>
      <span className="text-xs font-black uppercase tracking-widest text-blue-700">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

const GATE_STYLE: Record<GateStatus, string> = {
  CLOSED: "bg-red-50 text-red-800 border-red-200",
  "CONDITIONALLY OPEN": "bg-amber-50 text-amber-800 border-amber-200",
  "NOT YET TESTABLE": "bg-slate-100 text-slate-700 border-slate-300",
  OPEN: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export function GateBadge({ status }: { status: GateStatus }) {
  return (
    <span className={`inline-block border text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${GATE_STYLE[status]}`}>
      {status}
    </span>
  );
}

export function Analysis({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-slate-700 leading-relaxed border-l-4 border-blue-200 pl-4 my-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 mr-2">HTR analysis</span>
      {children}
    </p>
  );
}
