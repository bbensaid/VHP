"use client";
// Sortable 50-state table for /rht-review. Data comes in as props (CMS documents only).
import Link from "next/link";
import { useMemo, useState } from "react";
import type { RhtState } from "@/lib/rht-review";

type Key = "state" | "fy2026" | "fy2027" | "change" | "ptw" | "commit";

const m = (n: number) => `$${(n / 1e6).toFixed(1)}M`;

export default function RhtStatesTable({ states }: { states: RhtState[] }) {
  const [key, setKey] = useState<Key>("state");
  const [desc, setDesc] = useState(false);
  const rows = useMemo(() => {
    const val = (s: RhtState): number | string => {
      switch (key) {
        case "state": return s.state;
        case "fy2026": return s.fy2026;
        case "fy2027": return s.fy2027;
        case "change": return (s.fy2027 - s.fy2026) / s.fy2026;
        case "ptw": return (s.putToWork ?? 0) / s.fy2026;
        case "commit": return s.policyActions.filter((a) => a.committed).length;
      }
    };
    return [...states].sort((a, b) => {
      const x = val(a), y = val(b);
      const c = typeof x === "string" ? x.localeCompare(y as string) : (x as number) - (y as number);
      return desc ? -c : c;
    });
  }, [states, key, desc]);

  const H = ({ k, children, right = true }: { k: Key; children: React.ReactNode; right?: boolean }) => (
    <th className={`py-2 pr-3 ${right ? "text-right" : "text-left"}`}>
      <button
        type="button"
        onClick={() => { if (k === key) setDesc(!desc); else { setKey(k); setDesc(k !== "state"); } }}
        className="uppercase tracking-wide hover:text-teal-700"
        aria-label={`Sort by ${typeof children === "string" ? children : k}`}
      >
        {children}{key === k ? (desc ? " ↓" : " ↑") : ""}
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-[10px] text-slate-500">
            <H k="state" right={false}>State</H>
            <H k="fy2026">Year 1</H>
            <H k="fy2027">Year 2</H>
            <H k="change">Change</H>
            <H k="ptw">Put to work (Jul 31)</H>
            <H k="commit">Commitments</H>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((s) => {
            const ch = (s.fy2027 - s.fy2026) / s.fy2026 * 100;
            const committed = s.policyActions.filter((a) => a.committed);
            const np = committed.filter((a) => a.status === "No Progress").length;
            return (
              <tr key={s.slug}>
                <td className="py-2 pr-3">
                  <Link href={`/rht-review/${s.slug}`} className="font-semibold text-teal-700 hover:underline">{s.state}</Link>
                  {s.slug === "vermont" && <span className="ml-2 text-[10px] font-black uppercase text-amber-700">Full review</span>}
                </td>
                <td className="py-2 pr-3 text-right">{m(s.fy2026)}</td>
                <td className="py-2 pr-3 text-right">{m(s.fy2027)}</td>
                <td className={`py-2 pr-3 text-right ${ch >= 0 ? "text-emerald-700" : "text-red-700"}`}>{ch >= 0 ? "+" : ""}{ch.toFixed(1)}%</td>
                <td className="py-2 pr-3 text-right">{s.putToWork != null ? `${m(s.putToWork)} · ${(s.putToWork / s.fy2026 * 100).toFixed(0)}%` : "—"}</td>
                <td className="py-2 pr-3 text-right">{committed.length}{np ? <span className="text-red-700"> ({np} no progress)</span> : null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
