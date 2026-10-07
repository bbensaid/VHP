"use client";

/**
 * Pillar ownership check — does every pillar have a named organizational owner?
 *
 * Chapter 16 §16.8 sends readers to the Five-Pillar Map to "map the redesigned AHS
 * operating model onto the five pillars and check for uncovered functions", looking for
 * "a pillar with no named organizational owner in the restructuring." The map shows the
 * dependencies; this worksheet lets a reader assign owners and see what is uncovered.
 *
 * No owners are pre-filled: the book does not assign AHS units to pillars one-to-one, so
 * any preset would be invented. Nothing is stored.
 */

import { useState } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER, PILLAR_CURRENCY, outbound } from "@/lib/framework/dependencies";

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};

const QUESTION: Record<PillarId, string> = {
  policy: "Is it permissible?",
  technology: "Is it possible?",
  economics: "Is it sustainable?",
  clinical: "Is it effective?",
  operations: "Is it executable?",
};

type Row = PillarId | "equity";

export default function PillarOwnershipCheck() {
  const [owners, setOwners] = useState<Record<Row, string>>({
    policy: "",
    technology: "",
    economics: "",
    clinical: "",
    operations: "",
    equity: "",
  });

  const rows: Row[] = [...BUILD_ORDER, "equity"];
  const uncovered = rows.filter((r) => owners[r].trim() === "");
  const shared = Object.entries(
    rows.reduce<Record<string, Row[]>>((acc, r) => {
      const k = owners[r].trim().toLowerCase();
      if (k) (acc[k] ??= []).push(r);
      return acc;
    }, {}),
  ).filter(([, rs]) => rs.length > 1);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-testid="pillar-ownership-check">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <header className="bg-slate-900 px-6 py-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Ownership check</p>
          <h2 className="text-xl font-black text-white">Does every pillar have a named owner?</h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Map an operating model — your organization&apos;s, or the AHS restructuring in Chapter 16 — onto the five pillars by
            naming the unit or role accountable for each. A pillar with no named owner is an uncovered function: its currency is
            not being issued to the pillars downstream of it.
          </p>
        </header>
        <div className="p-6 space-y-3">
          {rows.map((r) => {
            const isEquity = r === "equity";
            const downstream = isEquity ? [] : outbound(r).filter((d) => !d.feedback).map((d) => LABEL[d.to]);
            const empty = owners[r].trim() === "";
            return (
              <div key={r} className={`rounded-xl border p-3 ${empty ? "border-rose-200 bg-rose-50/50" : "border-slate-200"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`w-40 text-sm font-black ${isEquity ? "text-violet-700" : "text-slate-900"}`}>
                    {isEquity ? "Equity Imperative" : `${LABEL[r]} — ${QUESTION[r]}`}
                  </span>
                  <input
                    value={owners[r]}
                    onChange={(e) => setOwners((o) => ({ ...o, [r]: e.target.value }))}
                    placeholder="Named unit or role"
                    className="flex-1 min-w-48 border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
                    aria-label={`Owner for ${isEquity ? "the Equity Imperative" : LABEL[r]}`}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isEquity
                    ? "Not a sixth pillar — a test every pillar must pass. Someone still has to own asking it in each pillar."
                    : `Issues ${PILLAR_CURRENCY[r]}${downstream.length ? ` to ${downstream.join(", ")}` : ""}.`}
                  {empty && <strong className="text-rose-700"> Uncovered.</strong>}
                </p>
              </div>
            );
          })}
          <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
            {uncovered.length === 0 ? (
              <>Every pillar and the Equity Imperative has a named owner.</>
            ) : (
              <>
                <strong className="text-white">{uncovered.length}</strong> uncovered:{" "}
                {uncovered.map((r) => (r === "equity" ? "Equity Imperative" : LABEL[r])).join(", ")}.
              </>
            )}
            {shared.length > 0 && (
              <span className="block text-[11px] text-slate-400 mt-1">
                One owner holds several pillars: {shared.map(([k, rs]) => `"${k}" → ${rs.map((r) => (r === "equity" ? "Equity" : LABEL[r])).join(" + ")}`).join("; ")}.
                Check that it has the capacity the pillars downstream need.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
