"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  DollarSign,
  Database,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EMR/EHR Lab — an INTEGRATED, self-contained simulator.
//
// One choice drives the whole tool: the vendor you select in the Vendor
// Comparison mode flows into the Cost Modeler (cost profile), the Data Quality
// audit (interoperability profile → which USCDI classes come out coded), and the
// Workflow Sim (click-burden multiplier). That linkage is the point — it turns
// four calculators into one decision narrative.
//
// All client-side mock data; no PHI, no backend, no external calls. Figures are
// illustrative planning anchors informed by public sources (KLAS/ONC market
// share, HIMSS implementation surveys, the Annals 2016 EHR time-motion study,
// AMA burnout research) — not vendor quotes or endorsements.
// ─────────────────────────────────────────────────────────────────────────────

type ModeId = "vendors" | "cost" | "quality" | "workflow";

// ── SHARED VENDOR MODEL ───────────────────────────────────────────────────────
// Every mode reads from this. Scores are 0–100 illustrative composites.

type VendorId = "epic" | "oracle" | "meditech" | "athena";

type Vendor = {
  id: VendorId;
  name: string;
  acuteShare: number; // % of U.S. acute-care hospital beds (approx public figures)
  scores: { interoperability: number; usability: number; cost: number; ambulatory: number };
  // Cost anchors used by the Cost Modeler.
  capexPerProvider: number;
  annualPerProvider: number;
  // Usability → workflow burden. 1.0 = baseline; >1 means more clicks/time.
  burdenMultiplier: number;
  // Hosting reality, shown in the modeler.
  defaultHosting: "cloud" | "onprem" | "hybrid";
  note: string;
};

const VENDORS: Vendor[] = [
  {
    id: "epic", name: "Epic", acuteShare: 39,
    scores: { interoperability: 88, usability: 72, cost: 45, ambulatory: 85 },
    capexPerProvider: 31_000, annualPerProvider: 9_800, burdenMultiplier: 1.0,
    defaultHosting: "onprem",
    note: "Dominant in large IDNs; strong Care Everywhere network; high total cost of ownership.",
  },
  {
    id: "oracle", name: "Oracle Health", acuteShare: 22,
    scores: { interoperability: 80, usability: 65, cost: 55, ambulatory: 70 },
    capexPerProvider: 26_000, annualPerProvider: 8_400, burdenMultiplier: 1.15,
    defaultHosting: "hybrid",
    note: "Formerly Cerner; broad acute footprint; mid-stream cloud migration; heavier click load.",
  },
  {
    id: "meditech", name: "MEDITECH", acuteShare: 14,
    scores: { interoperability: 70, usability: 68, cost: 75, ambulatory: 62 },
    capexPerProvider: 18_000, annualPerProvider: 6_200, burdenMultiplier: 1.08,
    defaultHosting: "cloud",
    note: "Strong in community & rural hospitals; lower cost; Expanse web platform.",
  },
  {
    id: "athena", name: "athenahealth", acuteShare: 1,
    scores: { interoperability: 82, usability: 80, cost: 78, ambulatory: 92 },
    capexPerProvider: 14_000, annualPerProvider: 9_000, burdenMultiplier: 0.88,
    defaultHosting: "cloud",
    note: "Cloud-native, ambulatory-first; network-driven interoperability; lighter documentation burden.",
  },
];

const vendorById = (id: VendorId) => VENDORS.find((v) => v.id === id)!;

const fmtUSD = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

const HOSTING_LABEL = { cloud: "Cloud / SaaS", onprem: "On-premise", hybrid: "Hybrid" } as const;

// ─────────────────────────────────────────────────────────────────────────────
// MODE 1 — VENDOR COMPARISON (the driver)
// ─────────────────────────────────────────────────────────────────────────────

const CRITERIA: { key: keyof Vendor["scores"]; label: string }[] = [
  { key: "interoperability", label: "Interoperability" },
  { key: "usability",        label: "Usability" },
  { key: "cost",             label: "Cost (higher = better value)" },
  { key: "ambulatory",       label: "Ambulatory fit" },
];

function VendorComparison({
  selected, onSelect, goTo,
}: { selected: VendorId; onSelect: (id: VendorId) => void; goTo: (m: ModeId) => void }) {
  const [weights, setWeights] = useState({ interoperability: 30, usability: 25, cost: 25, ambulatory: 20 });

  const ranked = useMemo(() => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    return VENDORS
      .map((v) => ({
        ...v,
        composite: CRITERIA.reduce((sum, c) => sum + v.scores[c.key] * weights[c.key], 0) / total,
      }))
      .sort((a, b) => b.composite - a.composite);
  }, [weights]);

  return (
    <div className="space-y-5">
      <ModeIntro>
        Weight the criteria for <em>your</em> situation, then <strong>select a vendor</strong> — it
        becomes the basis for the Cost, Data Quality, and Workflow modes.
      </ModeIntro>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CRITERIA.map((c) => (
          <Field key={c.key} label={`${c.label} weight`}>
            <input type="range" min={0} max={50} value={weights[c.key]}
              onChange={(e) => setWeights((w) => ({ ...w, [c.key]: +e.target.value }))}
              className="w-full accent-indigo-600" />
            <span className="text-sm font-bold text-slate-900">{weights[c.key]}</span>
          </Field>
        ))}
      </div>

      <div className="space-y-3">
        {ranked.map((v, i) => {
          const active = v.id === selected;
          return (
            <button key={v.id} onClick={() => onSelect(v.id)}
              className={`w-full text-left rounded-xl border p-4 transition ${
                active ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/40"
                       : "border-slate-200 hover:border-indigo-300"
              }`}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 grid place-items-center rounded-full text-xs font-black ${
                    i === 0 ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-600"
                  }`}>{i + 1}</span>
                  <span className="font-bold text-slate-900">{v.name}</span>
                  <span className="text-xs text-slate-400">{v.acuteShare}% acute beds</span>
                  {active && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-600 text-white">Selected</span>}
                </div>
                <span className="text-lg font-black text-indigo-600">{v.composite.toFixed(0)}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                {CRITERIA.map((c) => (
                  <div key={c.key}>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                      <span>{c.label.split(" ")[0]}</span><span>{v.scores[c.key]}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${v.scores[c.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">{v.note}</p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-indigo-50 text-indigo-800 px-4 py-3 text-sm">
        <ArrowRight className="w-4 h-4 shrink-0" />
        <span>
          <strong>{vendorById(selected).name}</strong> selected. Continue to the{" "}
          <button onClick={() => goTo("cost")} className="underline font-semibold">Cost Modeler</button> to
          see its 5-year financials.
        </span>
      </div>
      <Disclaimer text="Scores are illustrative composites informed by public KLAS/ONC market-share data — for comparing trade-offs, not endorsements or procurement advice." />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 2 — ADOPTION & COST MODELER (reads the selected vendor)
// ─────────────────────────────────────────────────────────────────────────────

function CostModeler({ vendor }: { vendor: Vendor }) {
  const [providers, setProviders] = useState(50);
  const [months, setMonths] = useState(12);
  const [revPerProvider, setRevPerProvider] = useState(550_000);

  const r = useMemo(() => {
    const implementation = providers * vendor.capexPerProvider;
    const annualLicense = providers * vendor.annualPerProvider;
    const training = providers * 2_400 * (months / 12);
    const upfront = implementation + training;

    // Go-live productivity dip: ~25% peak, linear recovery over `months`.
    const monthlyRev = (providers * revPerProvider) / 12;
    const productivityLoss = monthlyRev * months * (0.25 / 2);
    const yearOneTotal = upfront + annualLicense + productivityLoss;

    // 5-year benefit ramps to a 4% steady-state share of clinical revenue.
    const benefitSteady = 0.04;
    const fiveYear: { year: number; cost: number; benefit: number; cumNet: number }[] = [];
    let cumNet = 0;
    for (let y = 1; y <= 5; y++) {
      const cost = y === 1 ? yearOneTotal : annualLicense;
      const benefit = providers * revPerProvider * benefitSteady * Math.min(1, y / 2);
      cumNet += benefit - cost;
      fiveYear.push({ year: y, cost, benefit, cumNet });
    }
    const breakEvenYear = fiveYear.find((f) => f.cumNet >= 0)?.year ?? null;
    return { upfront, annualLicense, productivityLoss, yearOneTotal, fiveYear, breakEvenYear };
  }, [providers, months, revPerProvider, vendor]);

  return (
    <div className="space-y-5">
      <ModeIntro>
        Cost anchors below are <strong>{vendor.name}</strong>&apos;s profile
        ({fmtUSD(vendor.capexPerProvider)}/provider implementation, default {HOSTING_LABEL[vendor.defaultHosting]}).
        Change the vendor in the Vendor Comparison mode to compare financials.
      </ModeIntro>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Providers (FTE)">
          <input type="range" min={5} max={500} step={5} value={providers}
            onChange={(e) => setProviders(+e.target.value)} className="w-full accent-indigo-600" />
          <span className="text-sm font-bold text-slate-900">{providers}</span>
        </Field>
        <Field label="Go-live timeline (months)">
          <input type="range" min={3} max={36} step={1} value={months}
            onChange={(e) => setMonths(+e.target.value)} className="w-full accent-indigo-600" />
          <span className="text-sm font-bold text-slate-900">{months} mo</span>
        </Field>
        <Field label="Clinical revenue / provider / yr">
          <input type="range" min={250_000} max={1_200_000} step={25_000} value={revPerProvider}
            onChange={(e) => setRevPerProvider(+e.target.value)} className="w-full accent-indigo-600" />
          <span className="text-sm font-bold text-slate-900">{fmtUSD(revPerProvider)}</span>
        </Field>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Upfront (impl + training)" value={fmtUSD(r.upfront)} />
        <Stat label="Annual license / support" value={fmtUSD(r.annualLicense)} />
        <Stat label="Go-live productivity loss" value={fmtUSD(r.productivityLoss)} tone="warn" />
        <Stat label="Year-1 total cost" value={fmtUSD(r.yearOneTotal)} tone="warn" />
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">Year</th>
              <th className="text-right px-4 py-2">Cost</th>
              <th className="text-right px-4 py-2">Modeled benefit</th>
              <th className="text-right px-4 py-2">Cumulative net</th>
            </tr>
          </thead>
          <tbody>
            {r.fiveYear.map((f) => (
              <tr key={f.year} className="border-t border-slate-100">
                <td className="px-4 py-2 font-semibold text-slate-700">Year {f.year}</td>
                <td className="px-4 py-2 text-right text-slate-600">{fmtUSD(f.cost)}</td>
                <td className="px-4 py-2 text-right text-emerald-600">{fmtUSD(f.benefit)}</td>
                <td className={`px-4 py-2 text-right font-bold ${f.cumNet >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {f.cumNet < 0 ? "−" : ""}{fmtUSD(Math.abs(f.cumNet))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${
        r.breakEvenYear ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
      }`}>
        <TrendingUp className="w-4 h-4 shrink-0" />
        {r.breakEvenYear
          ? `${vendor.name} breaks even in Year ${r.breakEvenYear} on these assumptions.`
          : `${vendor.name} does not break even within 5 years here — revisit timeline or benefit capture.`}
      </div>
      <Disclaimer text="Illustrative planning model with industry-survey cost anchors — not a vendor quote. Adjust inputs to your context." />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 3 — DATA & INTEROP QUALITY (seeded by the vendor's interop profile)
// ─────────────────────────────────────────────────────────────────────────────

const USCDI_CLASSES: { key: string; label: string; value: string }[] = [
  { key: "patientDemographics", label: "Patient Demographics",     value: "Jane Doe, F, 1971-04-12, English" },
  { key: "problems",            label: "Problems",                 value: "E11.9 Type 2 diabetes; I10 Hypertension" },
  { key: "medications",         label: "Medications",              value: "metformin, lisinopril" },
  { key: "allergies",           label: "Allergies & Intolerances", value: "Penicillin" },
  { key: "labs",                label: "Laboratory",               value: "HbA1c 7.8%" },
  { key: "vitals",              label: "Vital Signs",              value: "BP 138/86, HR 74, BMI 31.2" },
  { key: "smokingStatus",       label: "Smoking Status",           value: "Former smoker" },
  { key: "immunizations",       label: "Immunizations",            value: "Influenza 2024" },
  { key: "procedures",          label: "Procedures",               value: "Colonoscopy 2022" },
  { key: "careTeam",            label: "Care Team Members",        value: "Dr. A. Smith (NPI 1234567890)" },
];

// Higher interoperability score → more classes are present AND coded. We derive
// the audit deterministically from the vendor so the link is visible, then let
// the user toggle to explore "what if".
function deriveRecord(vendor: Vendor): Record<string, { present: boolean; coded: boolean }> {
  const interop = vendor.scores.interoperability; // 0–100
  const out: Record<string, { present: boolean; coded: boolean }> = {};
  USCDI_CLASSES.forEach((c, i) => {
    // Spread classes across a 0–100 "difficulty" scale; a class is present if
    // the vendor clears its difficulty, coded if it clears it comfortably.
    const difficulty = (i / (USCDI_CLASSES.length - 1)) * 100;
    out[c.key] = { present: interop >= difficulty - 15, coded: interop >= difficulty + 10 };
  });
  return out;
}

function DataQualityLab({ vendor, goTo }: { vendor: Vendor; goTo: (m: ModeId) => void }) {
  // Re-seed whenever the vendor changes by keying state off vendor.id.
  const [rec, setRec] = useState(() => deriveRecord(vendor));
  const [seededFor, setSeededFor] = useState(vendor.id);
  if (seededFor !== vendor.id) {
    setRec(deriveRecord(vendor));
    setSeededFor(vendor.id);
  }

  const audit = useMemo(() => {
    const total = USCDI_CLASSES.length;
    const present = USCDI_CLASSES.filter((c) => rec[c.key].present).length;
    const coded = USCDI_CLASSES.filter((c) => rec[c.key].present && rec[c.key].coded).length;
    return {
      total, present, coded,
      completeness: Math.round((present / total) * 100),
      codedRate: present ? Math.round((coded / present) * 100) : 0,
    };
  }, [rec]);

  const toggle = (key: string, field: "present" | "coded") =>
    setRec((r) => ({ ...r, [key]: { ...r[key], [field]: !r[key][field] } }));

  return (
    <div className="space-y-5">
      <ModeIntro>
        This record is seeded from <strong>{vendor.name}</strong>&apos;s interoperability score
        ({vendor.scores.interoperability}/100) — higher-scoring systems export more classes, properly coded.
        Toggle any flag to explore the impact, then validate exports in the <strong>FHIR Lab</strong>.
      </ModeIntro>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Stat label="USCDI class completeness" value={`${audit.completeness}%`}
          tone={audit.completeness >= 80 ? "good" : "warn"} />
        <Stat label="Coded (vs. free-text)" value={`${audit.codedRate}%`}
          tone={audit.codedRate >= 80 ? "good" : "warn"} />
        <Stat label="Classes present" value={`${audit.present} / ${audit.total}`} />
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-2">USCDI data class</th>
              <th className="text-left px-4 py-2">Value</th>
              <th className="text-center px-3 py-2">Present</th>
              <th className="text-center px-3 py-2">Coded</th>
            </tr>
          </thead>
          <tbody>
            {USCDI_CLASSES.map((c) => {
              const f = rec[c.key];
              return (
                <tr key={c.key} className="border-t border-slate-100">
                  <td className="px-4 py-2 font-semibold text-slate-700">{c.label}</td>
                  <td className="px-4 py-2 text-slate-500 text-xs">{f.present ? c.value : "—"}</td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => toggle(c.key, "present")} className="inline-flex" aria-label="toggle present">
                      {f.present ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                                 : <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => toggle(c.key, "coded")} disabled={!f.present}
                      className="inline-flex disabled:opacity-30" aria-label="toggle coded">
                      {f.present && f.coded ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-indigo-50 text-indigo-800 px-4 py-3 text-sm">
        <ArrowRight className="w-4 h-4 shrink-0" />
        <span>
          Free-text (uncoded) classes won&apos;t map cleanly to FHIR R4 on export. See the{" "}
          <button onClick={() => goTo("workflow")} className="underline font-semibold">Workflow Sim</button> for
          how {vendor.name}&apos;s usability affects documentation burden.
        </span>
      </div>
      <Disclaimer text="Mock patient record — no real PHI. Seeded from the vendor's interoperability profile; toggle to explore." />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 4 — CLINICAL WORKFLOW SIMULATOR (rebuilt: panel + levers + vendor + benchmark)
// ─────────────────────────────────────────────────────────────────────────────

// Baseline minutes of EHR interaction per visit type, before vendor/levers.
const VISIT_TYPES = {
  newComplex:   { label: "New / complex",   baseMin: 22 },
  followUp:     { label: "Follow-up",       baseMin: 11 },
  acute:        { label: "Acute / simple",  baseMin: 7 },
} as const;
type VisitKey = keyof typeof VISIT_TYPES;

// Optimization levers: each reduces EHR minutes by a fraction (multiplicative).
const LEVERS = [
  { id: "scribe",   label: "Medical scribe",          reduce: 0.45, note: "Offloads documentation to a scribe." },
  { id: "ambient",  label: "Ambient AI documentation", reduce: 0.30, note: "Auto-drafts the note from the visit conversation." },
  { id: "templates",label: "Template / smartphrase redesign", reduce: 0.12, note: "Cuts clicks on routine documentation." },
  { id: "team",     label: "Team-based / pre-visit planning", reduce: 0.18, note: "Distributes order entry and reconciliation." },
] as const;
type LeverId = typeof LEVERS[number]["id"];

// Published benchmark: clinicians spend ~6 hrs of an 11.4-hr day in the EHR,
// incl. ~1.5 hrs after-hours "pajama time" (Annals of Internal Medicine, 2016;
// AMA digital-health & burnout research). Used only as a reference line.
const BENCHMARK_EHR_MIN_PER_DAY = 360;

function WorkflowSim({ vendor }: { vendor: Vendor }) {
  const [patients, setPatients] = useState(20);
  const [mix, setMix] = useState({ newComplex: 30, followUp: 55, acute: 15 }); // % of panel
  const [levers, setLevers] = useState<Record<LeverId, boolean>>({
    scribe: false, ambient: false, templates: false, team: false,
  });

  const r = useMemo(() => {
    const mixTotal = mix.newComplex + mix.followUp + mix.acute || 1;
    // Weighted base minutes per visit across the configured mix.
    const basePerVisit =
      (VISIT_TYPES.newComplex.baseMin * mix.newComplex +
        VISIT_TYPES.followUp.baseMin * mix.followUp +
        VISIT_TYPES.acute.baseMin * mix.acute) / mixTotal;

    // Vendor usability scales the burden.
    const vendorPerVisit = basePerVisit * vendor.burdenMultiplier;

    // Apply each active lever multiplicatively.
    const leverFactor = LEVERS.reduce((f, l) => (levers[l.id] ? f * (1 - l.reduce) : f), 1);
    const optimizedPerVisit = vendorPerVisit * leverFactor;

    const ehrMinPerDay = optimizedPerVisit * patients;
    const baselineMinPerDay = vendorPerVisit * patients;
    // Assume a clinician has ~6 patient-facing hours; EHR time beyond that spills
    // into after-hours "pajama time".
    const afterHours = Math.max(0, ehrMinPerDay - 360);
    // Annual burnout/turnover cost proxy: after-hours minutes → attrition risk.
    // ~$500k to replace a physician; risk scales with chronic after-hours load.
    const attritionRisk = Math.min(0.35, (afterHours / 120) * 0.18);
    const annualBurnoutCost = attritionRisk * 500_000;

    return { vendorPerVisit, optimizedPerVisit, ehrMinPerDay, baselineMinPerDay, afterHours, attritionRisk, annualBurnoutCost };
  }, [patients, mix, levers, vendor]);

  const pct = Math.min(100, (r.ehrMinPerDay / (BENCHMARK_EHR_MIN_PER_DAY * 1.6)) * 100);
  const benchPct = (BENCHMARK_EHR_MIN_PER_DAY / (BENCHMARK_EHR_MIN_PER_DAY * 1.6)) * 100;

  return (
    <div className="space-y-5">
      <ModeIntro>
        Project a clinician&apos;s daily EHR burden on <strong>{vendor.name}</strong> (usability
        multiplier ×{vendor.burdenMultiplier.toFixed(2)}). Set the panel, then toggle interventions to
        see burden — and burnout cost — fall.
      </ModeIntro>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field label="Patients / day">
          <input type="range" min={8} max={40} value={patients}
            onChange={(e) => setPatients(+e.target.value)} className="w-full accent-indigo-600" />
          <span className="text-sm font-bold text-slate-900">{patients}</span>
        </Field>
        <div className="rounded-xl border border-slate-200 p-3">
          <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Visit mix (%)</span>
          <div className="space-y-2">
            {(Object.keys(VISIT_TYPES) as VisitKey[]).map((k) => (
              <div key={k} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-28">{VISIT_TYPES[k].label}</span>
                <input type="range" min={0} max={100} value={mix[k]}
                  onChange={(e) => setMix((m) => ({ ...m, [k]: +e.target.value }))}
                  className="flex-1 accent-indigo-600" />
                <span className="text-xs font-bold text-slate-900 w-8 text-right">{mix[k]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Optimization levers</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {LEVERS.map((l) => (
            <button key={l.id} onClick={() => setLevers((s) => ({ ...s, [l.id]: !s[l.id] }))}
              className={`flex items-start gap-2 text-left rounded-lg border p-3 transition ${
                levers[l.id] ? "border-emerald-400 bg-emerald-50/50" : "border-slate-200 hover:border-emerald-300"
              }`}>
              <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${levers[l.id] ? "text-emerald-500" : "text-slate-300"}`} />
              <span>
                <span className="block text-sm font-bold text-slate-800">{l.label} <span className="text-emerald-600">−{Math.round(l.reduce * 100)}%</span></span>
                <span className="block text-xs text-slate-500">{l.note}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="EHR time / day" value={`${Math.round(r.ehrMinPerDay)} min`} tone={r.ehrMinPerDay > 360 ? "warn" : "good"} />
        <Stat label="After-hours 'pajama time'" value={`${Math.round(r.afterHours)} min`} tone={r.afterHours > 0 ? "warn" : "good"} />
        <Stat label="Attrition risk" value={`${Math.round(r.attritionRisk * 100)}%`} tone={r.attritionRisk > 0.1 ? "warn" : "good"} />
        <Stat label="Annual burnout cost" value={fmtUSD(r.annualBurnoutCost)} tone={r.annualBurnoutCost > 0 ? "warn" : "good"} />
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Daily EHR time vs. national benchmark</span>
          <span>{Math.round(r.ehrMinPerDay)} min</span>
        </div>
        <div className="relative h-4 rounded-full bg-slate-100 overflow-hidden">
          <div className={`h-full ${r.ehrMinPerDay > 360 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
          <div className="absolute top-0 bottom-0 w-0.5 bg-slate-700" style={{ left: `${benchPct}%` }} title="National benchmark" />
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Marker = ~360 min/day national average (Annals of Internal Medicine, 2016; AMA burnout research).
        </p>
      </div>
      <Disclaimer text="Illustrative model for discussing documentation burden and the ROI of usability interventions — not a time-motion study of any specific system." />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl border border-slate-200 p-3">
      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{label}</span>
      <div className="flex items-center gap-3">{children}</div>
    </label>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "warn" }) {
  const valueCls = tone === "warn" ? "text-amber-600" : tone === "good" ? "text-emerald-600" : "text-slate-900";
  return (
    <div className="rounded-xl border border-slate-200 p-3 bg-white">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{label}</div>
      <div className={`text-xl font-black ${valueCls}`}>{value}</div>
    </div>
  );
}

function ModeIntro({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">{children}</p>;
}

function Disclaimer({ text }: { text: string }) {
  return <p className="text-[11px] text-slate-400 italic leading-relaxed">{text}</p>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHELL — holds the selected vendor that links every mode
// ─────────────────────────────────────────────────────────────────────────────

const MODES: { id: ModeId; icon: React.ReactNode; label: string }[] = [
  { id: "vendors",  icon: <Building2 className="w-4 h-4" />,   label: "1 · Vendor Comparison" },
  { id: "cost",     icon: <DollarSign className="w-4 h-4" />,  label: "2 · Adoption & Cost" },
  { id: "quality",  icon: <Database className="w-4 h-4" />,    label: "3 · Data Quality" },
  { id: "workflow", icon: <Stethoscope className="w-4 h-4" />, label: "4 · Workflow Sim" },
];

const MODE_IDS = MODES.map((m) => m.id);

export default function EMREHRLab() {
  // Deep-link support: ?mode=cost|quality|workflow|vendors opens that mode
  // (used by Academy lesson callouts that point at a specific mode).
  const searchParams = useSearchParams();
  const initialMode = MODE_IDS.includes(searchParams.get("mode") as ModeId)
    ? (searchParams.get("mode") as ModeId)
    : "vendors";
  const [mode, setMode] = useState<ModeId>(initialMode);
  const [vendorId, setVendorId] = useState<VendorId>("epic");
  const vendor = vendorById(vendorId);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition ${
              mode === m.id ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
            }`}>
            {m.icon}{m.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500">
          Active vendor: <strong className="text-indigo-600">{vendor.name}</strong>
        </span>
      </div>

      {mode === "vendors"  && <VendorComparison selected={vendorId} onSelect={setVendorId} goTo={setMode} />}
      {mode === "cost"     && <CostModeler vendor={vendor} />}
      {mode === "quality"  && <DataQualityLab vendor={vendor} goTo={setMode} />}
      {mode === "workflow" && <WorkflowSim vendor={vendor} />}
    </div>
  );
}
