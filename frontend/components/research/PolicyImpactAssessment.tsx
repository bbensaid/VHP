"use client";

/**
 * Policy Impact Assessment Framework — Research Lab resource.
 *
 * Chapter 3 §3.7.2 defines the framework (exposure mapping, scenario analysis, response
 * strategy, stakeholder communication) and Chapter 12 §12.5 lists it in the HTR Implementation
 * Toolkit as a "structured evaluation tool for new policy developments". This is that
 * structure as a worksheet: the reader supplies the policy and every judgment; the page adds
 * the five-pillar exposure map and assembles a one-page brief. Nothing is pre-filled or stored.
 */

import { useMemo, useState } from "react";

type Level = "none" | "low" | "medium" | "high";
const LEVELS: Level[] = ["none", "low", "medium", "high"];
const LEVEL_SCORE: Record<Level, number> = { none: 0, low: 1, medium: 2, high: 3 };

const PILLARS = [
  { id: "policy", label: "Policy", q: "Is it permissible?" },
  { id: "technology", label: "Technology", q: "Is it possible?" },
  { id: "economics", label: "Economics", q: "Is it sustainable?" },
  { id: "clinical", label: "Clinical", q: "Is it effective?" },
  { id: "operations", label: "Operations", q: "Is it executable?" },
] as const;

const SCENARIOS = [
  { id: "as-proposed", label: "Final rule matches the proposal" },
  { id: "differs", label: "Final rule differs from the proposal" },
  { id: "delayed", label: "Implementation is delayed" },
  { id: "parameters", label: "Model parameters change after launch" },
] as const;

const RESPONSES = ["Compliance roadmap", "Comment letter participation", "CMMI model application", "Advocacy engagement"] as const;
const AUDIENCES = ["Board", "Executive team", "Clinical leadership", "Financial team"] as const;

const field = "w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm";

export default function PolicyImpactAssessment() {
  const [policy, setPolicy] = useState("");
  const [kind, setKind] = useState("Proposed rule");
  const [deadline, setDeadline] = useState("");
  const [exposure, setExposure] = useState<Record<string, Level>>({ financial: "none", operational: "none", compliance: "none" });
  const [pillarHit, setPillarHit] = useState<Record<string, Level>>(Object.fromEntries(PILLARS.map((p) => [p.id, "none"])));
  const [equityNote, setEquityNote] = useState("");
  const [scenario, setScenario] = useState<Record<string, { changes: boolean; note: string }>>(
    Object.fromEntries(SCENARIOS.map((s) => [s.id, { changes: false, note: "" }])),
  );
  const [responses, setResponses] = useState<string[]>([]);
  const [audience, setAudience] = useState<Record<string, string>>(Object.fromEntries(AUDIENCES.map((a) => [a, ""])));
  const [copied, setCopied] = useState(false);

  const firstUpstream = PILLARS.find((p) => pillarHit[p.id] !== "none");
  const maxExposure = Math.max(...Object.values(exposure).map((l) => LEVEL_SCORE[l]));

  const brief = useMemo(() => {
    const lines = [
      `POLICY IMPACT ASSESSMENT — ${policy || "(policy not named)"}`,
      `Type: ${kind}${deadline ? ` · Key date: ${deadline}` : ""}`,
      "",
      "1. Exposure mapping",
      ...Object.entries(exposure).map(([k, v]) => `   ${k}: ${v}`),
      `   Pillars touched: ${PILLARS.filter((p) => pillarHit[p.id] !== "none").map((p) => `${p.label} (${pillarHit[p.id]})`).join(", ") || "none"}`,
      firstUpstream ? `   Most upstream pillar touched: ${firstUpstream.label} — everything downstream of it inherits the change.` : "",
      `   Equity test: ${equityNote || "(not answered)"}`,
      "",
      "2. Scenario analysis — does our strategic position change?",
      ...SCENARIOS.map((s) => `   ${s.label}: ${scenario[s.id].changes ? "YES" : "no"}${scenario[s.id].note ? ` — ${scenario[s.id].note}` : ""}`),
      "",
      `3. Response strategy: ${responses.join("; ") || "(none selected)"}`,
      "",
      "4. Stakeholder communication — decision required",
      ...AUDIENCES.map((a) => `   ${a}: ${audience[a] || "—"}`),
    ];
    return lines.filter((l, i) => l !== "" || lines[i - 1] !== "").join("\n");
  }, [policy, kind, deadline, exposure, pillarHit, firstUpstream, equityNote, scenario, responses, audience]);

  const levelSelect = (value: Level, onChange: (l: Level) => void, label: string) => (
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value as Level)} className="border border-slate-200 rounded-lg px-2 py-1 text-xs">
      {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
    </select>
  );

  return (
    <div className="space-y-5" data-testid="policy-impact-assessment">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-sm text-slate-700">
          When a proposed rule, a new CMMI model or a state legislative development appears, work it through the four phases
          of Chapter 3 §3.7.2. The page assembles your answers into a one-page brief.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <input className={field} placeholder="Policy (e.g. a named proposed rule)" value={policy} onChange={(e) => setPolicy(e.target.value)} aria-label="Policy" />
          <select className={field} value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Policy type">
            {["Proposed rule", "Final rule", "New CMMI model", "State legislation", "Other"].map((k) => <option key={k}>{k}</option>)}
          </select>
          <input className={field} placeholder="Comment deadline / effective date" value={deadline} onChange={(e) => setDeadline(e.target.value)} aria-label="Key date" />
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-black text-slate-900 mb-1">1 · Exposure mapping</h3>
        <p className="text-xs text-slate-500 mb-3">What does this require of us, and where does it land in the five pillars?</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.keys(exposure).map((k) => (
            <label key={k} className="flex items-center gap-2 text-xs font-semibold text-slate-600 capitalize">
              {k} {levelSelect(exposure[k], (l) => setExposure((x) => ({ ...x, [k]: l })), `${k} exposure`)}
            </label>
          ))}
        </div>
        <div className="grid sm:grid-cols-5 gap-2">
          {PILLARS.map((p) => (
            <div key={p.id} className={`rounded-lg border p-2 ${pillarHit[p.id] !== "none" ? "border-indigo-300 bg-indigo-50" : "border-slate-200"}`}>
              <p className="text-xs font-black text-slate-800">{p.label}</p>
              <p className="text-[10px] text-slate-500 mb-1">{p.q}</p>
              {levelSelect(pillarHit[p.id], (l) => setPillarHit((x) => ({ ...x, [p.id]: l })), `${p.label} impact`)}
            </div>
          ))}
        </div>
        {firstUpstream && (
          <p className="text-xs text-indigo-700 mt-2">
            Most upstream pillar touched: <strong>{firstUpstream.label}</strong>. In the execution sequence, every pillar
            downstream of it inherits the change — assess those next.
          </p>
        )}
        <label className="block mt-3 text-xs font-semibold text-violet-700">
          Equity Imperative — does this change who is served, or how fairly?
          <input className={`${field} mt-1`} value={equityNote} onChange={(e) => setEquityNote(e.target.value)} />
        </label>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-black text-slate-900 mb-3">2 · Scenario analysis — under which outcomes does our position change?</h3>
        <div className="space-y-2">
          {SCENARIOS.map((s) => (
            <div key={s.id} className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 w-72 text-xs text-slate-700">
                <input type="checkbox" checked={scenario[s.id].changes} onChange={(e) => setScenario((x) => ({ ...x, [s.id]: { ...x[s.id], changes: e.target.checked } }))} />
                {s.label}
              </label>
              <input className={`${field} flex-1 min-w-48`} placeholder="How it changes" value={scenario[s.id].note} onChange={(e) => setScenario((x) => ({ ...x, [s.id]: { ...x[s.id], note: e.target.value } }))} aria-label={`${s.label} note`} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-black text-slate-900 mb-3">3 · Response strategy</h3>
        <div className="flex flex-wrap gap-2">
          {RESPONSES.map((r) => {
            const on = responses.includes(r);
            return (
              <button key={r} type="button" onClick={() => setResponses((x) => (on ? x.filter((y) => y !== r) : [...x, r]))}
                className={`px-3 py-1.5 rounded-full border text-xs font-bold ${on ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"}`}>
                {r}
              </button>
            );
          })}
        </div>
        {maxExposure >= 2 && responses.length === 0 && (
          <p className="text-xs text-amber-700 mt-2">Medium-or-higher exposure with no response selected.</p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-black text-slate-900 mb-3">4 · Stakeholder communication — what decision does each group need to make?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {AUDIENCES.map((a) => (
            <label key={a} className="text-xs font-semibold text-slate-600">
              {a}
              <input className={`${field} mt-1`} value={audience[a]} onChange={(e) => setAudience((x) => ({ ...x, [a]: e.target.value }))} />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-black text-white">Assessment brief</h3>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(brief).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {}); }}
            className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold text-white hover:bg-white/20">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">{brief}</pre>
      </section>
    </div>
  );
}
