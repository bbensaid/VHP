"use client";

/**
 * HCC Gap Closure Playbook — Research Lab resource.
 *
 * Chapter 12 §12.5 lists it in the HTR Implementation Toolkit: "Methodology guide for
 * retrospective HCC gap analysis, including coding education materials and AWV completion
 * program design." Grounded in the book's own text — Chapter 1 Key Concepts ("the highest-ROI
 * pre-global-budget analytics investment"), Chapter 3 §3.9 and Chapter 9 §9.5 (the three most
 * common Vermont documentation opportunities) — and in public CMS / ICD-10-CM sources cited
 * on the page. The gap calculator runs on the reader's own numbers; its starting values are
 * placeholders to overwrite, not Vermont data.
 */

import { useState } from "react";

const usd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n).toLocaleString()}`;

function Num({ label, value, set, step = 1, hint }: { label: string; value: number; set: (v: number) => void; step?: number; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))}
        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800"
      />
      {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
    </label>
  );
}

const DOC_OPPORTUNITIES = [
  {
    title: "Chronic kidney disease staging",
    why: "CKD is documented as present but the stage is often not specified; CKD stage 3 and above carry distinct HCCs with progressively higher RAF values.",
    codes: "ICD-10-CM N18.1–N18.2 (stages 1–2), N18.30–N18.32 (stage 3, 3a, 3b), N18.4, N18.5, N18.6 (ESRD).",
    action: "Pull the latest eGFR into pre-visit planning; document the stage, not just 'CKD'.",
  },
  {
    title: "Diabetes complications",
    why: "Nephropathy, neuropathy and retinopathy are often managed by a specialist and so go undocumented at the primary care encounter.",
    codes: "ICD-10-CM E11.21 / E11.22 (type 2 DM with nephropathy / with CKD), E11.40-series (neuropathy), E11.3-series (retinopathy).",
    action: "Link the complication to the diabetes in the assessment ('type 2 diabetes with diabetic CKD'), at every appropriate encounter.",
  },
  {
    title: "Morbid obesity",
    why: "BMI over 40 has its own HCC; capturing it needs both a measured BMI and a structured EHR entry.",
    codes: "ICD-10-CM E66.01 (morbid obesity due to excess calories) with Z68.41–Z68.45 (BMI 40.0 and over).",
    action: "Make measured height/weight a required AWV field and carry the clinician's diagnosis, not just the BMI value.",
  },
];

export default function HCCGapClosurePlaybook() {
  const [patients, setPatients] = useState(5000);
  const [hccsPerPatient, setHccsPerPatient] = useState(1.5);
  const [recapturePct, setRecapturePct] = useState(70);
  const [rafPerHcc, setRafPerHcc] = useState(0.25);
  const [pmpm, setPmpm] = useState(950);

  const priorYearHccs = patients * hccsPerPatient;
  const uncaptured = priorYearHccs * (1 - recapturePct / 100);
  const rafGapPerPatient = patients > 0 ? (uncaptured * rafPerHcc) / patients : 0;
  const annualDollars = uncaptured * rafPerHcc * pmpm * 12;

  return (
    <div className="space-y-6" data-testid="hcc-gap-playbook">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-700 leading-relaxed">
          Under a global budget, the benchmark is set on your attributed population&apos;s risk scores. A condition that is real
          but undocumented this year is not in the score — so the budget is set for a healthier population than the one you
          treat. The book calls HCC gap closure the highest-return analytics investment to complete before Act 68&apos;s hospital
          global budgets take effect in FY2028 (Chapter 1 Key Concepts; Chapter 3 §3.9). This playbook is the method in
          three steps.
        </p>
      </div>

      {/* STEP 1 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Step 1</p>
        <h3 className="text-base font-black text-slate-900 mb-2">Retrospective gap analysis</h3>
        <ol className="list-decimal ml-5 space-y-1 text-sm text-slate-700 mb-4">
          <li>Build the attributed Medicare list — the same attribution list a TCOC budget is set on (Risk Stratification Engine, Population Segmentation).</li>
          <li>From last year&apos;s claims (VHCURES, Medicare claims feeds, or your own billing), list every HCC each patient carried.</li>
          <li>Compare against diagnoses documented so far this calendar year. Risk-adjustment diagnoses reset every January and must come from an acceptable face-to-face encounter, so anything not yet re-documented is a recapture gap.</li>
          <li>Add clinical &quot;suspects&quot; with no prior code: eGFR results consistent with CKD stage 3+, recorded BMI ≥ 40, diabetes with specialist notes describing complications.</li>
          <li>Route each gap to the patient&apos;s next visit (Step 3) — never code from the list itself. Every diagnosis must be supported by that encounter&apos;s documentation.</li>
        </ol>
        <div className="grid sm:grid-cols-5 gap-3">
          <Num label="Attributed Medicare patients" value={patients} set={setPatients} />
          <Num label="HCCs per patient last year" value={hccsPerPatient} set={setHccsPerPatient} step={0.1} />
          <Num label="Recaptured so far (%)" value={recapturePct} set={(v) => setRecapturePct(Math.min(100, v))} />
          <Num label="Avg RAF per missed HCC" value={rafPerHcc} set={setRafPerHcc} step={0.01} hint="Your assumption" />
          <Num label="Base PMPM ($)" value={pmpm} set={setPmpm} hint="Risk Engine default" />
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">HCCs not yet recaptured</p>
            <p className="text-xl font-black text-slate-900">{Math.round(uncaptured).toLocaleString()}</p>
            <p className="text-[11px] text-slate-500">of {Math.round(priorYearHccs).toLocaleString()} carried last year</p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">RAF missing per patient</p>
            <p className="text-xl font-black text-slate-900">{rafGapPerPatient.toFixed(3)}</p>
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600">Annual benchmark not reflected</p>
            <p className="text-xl font-black text-rose-700">{usd(annualDollars)}</p>
            <p className="text-[11px] text-rose-600">missed RAF × PMPM × 12 — the budget gap if these stay undocumented</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          Starting values are placeholders. Replace them with your own attribution and claims counts.
        </p>
      </section>

      {/* STEP 2 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Step 2</p>
        <h3 className="text-base font-black text-slate-900 mb-2">Coding education: Vermont&apos;s three most common gaps</h3>
        <p className="text-sm text-slate-600 mb-3">
          Chapter 9 §9.5 names the three documentation opportunities that matter most in Vermont primary care. Teach them as
          clinical documentation, not billing: the record must show the condition was monitored, evaluated, assessed or
          treated at the encounter (the &quot;MEAT&quot; convention auditors use).
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {DOC_OPPORTUNITIES.map((d) => (
            <div key={d.title} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{d.title}</p>
              <p className="text-xs text-slate-600 mt-1">{d.why}</p>
              <p className="text-xs text-slate-500 mt-2"><strong>Codes:</strong> {d.codes}</p>
              <p className="text-xs text-slate-700 mt-2"><strong>At the visit:</strong> {d.action}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEP 3 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Step 3</p>
        <h3 className="text-base font-black text-slate-900 mb-2">Annual Wellness Visit completion program</h3>
        <p className="text-sm text-slate-600 mb-3">
          The Medicare Annual Wellness Visit (HCPCS G0438 initial, G0439 subsequent; once every 12 months, no Part B cost
          sharing) is the natural place to close gaps: it is scheduled, comprehensive, and already requires height, weight and
          BMI.
        </p>
        <ul className="list-disc ml-5 space-y-1 text-sm text-slate-700">
          <li><strong>Outreach list:</strong> attributed Medicare patients with no AWV in the last 12 months, highest open-gap count first.</li>
          <li><strong>Pre-visit planning:</strong> attach each patient&apos;s Step 1 gap and suspect list to the appointment, with the latest eGFR and BMI.</li>
          <li><strong>Structured capture:</strong> make measured BMI and CKD stage required fields so the diagnosis lands in coded data, not free text.</li>
          <li><strong>Close the loop:</strong> track AWV completion and recapture rate monthly by practice; re-run Step 1 each quarter.</li>
          <li><strong>Specialist feedback:</strong> request that complication diagnoses from nephrology, neurology and ophthalmology notes come back as coded problems.</li>
        </ul>
      </section>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        Sources: the book, Chapter 1 Key Concepts, Chapter 3 §3.9 and Chapter 9 §9.5; CMS, 2024 Medicare Advantage Rate
        Announcement (CMS-HCC model V28, phased in 2024–2026); CMS Medicare Learning Network, &quot;Medicare Wellness
        Visits&quot;; CDC/NCHS ICD-10-CM code set. Educational methodology, not coding or compliance advice.
      </p>
    </div>
  );
}
