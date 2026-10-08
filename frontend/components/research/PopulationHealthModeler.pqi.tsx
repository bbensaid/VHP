"use client";

/**
 * AHRQ Prevention Quality Indicators (PQI) panel for the Population Health
 * Modeler (book Appendix D.5: "AHRQ Prevention Quality Indicators (13 PQI
 * conditions)").
 *
 * RECONCILING "13": AHRQ's current PQI module (v2025) has 10 individual
 * indicators plus 4 composites (PQI 90-93). Older releases carried more
 * individual PQIs — v4.5 (2013) had 14, including PQI 02 perforated appendix,
 * PQI 09 low birth weight, PQI 10 dehydration and PQI 13 angina without
 * procedure — all four of which are gone from the module by v2019. This panel
 * shows the CURRENT AHRQ set rather than reviving retired indicators.
 *
 * SOURCES
 *  National all-payer rates: AHRQ Quality Indicators, "Prevention Quality
 *    Indicators in Inpatient Settings (PQI) Benchmark Data Tables, v2025"
 *    (August 2025), Table 1 — observed rate per 100,000 population, 2022 HCUP
 *    State Inpatient Databases (47 states + DC, Vermont included).
 *    https://qualityindicators.ahrq.gov/Downloads/Modules/PQI/V2025/Version_2025_Benchmark_Tables_PQI.pdf
 *    Denominator population: adults 18+ except PQI 05 (40+) and PQI 15
 *    (18-39), per the AHRQ technical specifications; denominator counts in the
 *    same table (157.0M of 252.7M adults are 40+; 95.7M are 18-39).
 *  Vermont rates: CMS Medicare Geographic Variation Public Use File, 2024
 *    (state level, Original Medicare; data.cms.gov dataset
 *    6219697b-8f6c-4164-bed4-cd9317c58ebc), PQI admission rates per 100,000
 *    beneficiaries for ages 65-74 and 75+, VT vs national. AHRQ publishes no
 *    Vermont all-payer PQI rate, and VDH publishes none in this indicator
 *    form, so Vermont is shown for its Medicare population only. "*" = CMS
 *    cell suppression; "—" = indicator not in the CMS file (PQI 01, 14).
 */

import { useMemo, useState } from "react";

type Denom = "18+" | "40+" | "18-39";

interface PQI {
  id: string;
  name: string;
  domain: "Diabetes" | "Chronic" | "Acute" | "Composite";
  denom: Denom;
  nationalPer100k: number;
  /** Vermont / US Original Medicare, per 100,000 beneficiaries, CMS GV 2024. */
  medicare?: { vt6574: number | null; us6574: number; vt75: number | null; us75: number };
}

export const PQI_SET: PQI[] = [
  { id: "PQI 01", name: "Diabetes short-term complications", domain: "Diabetes", denom: "18+", nationalPer100k: 82.53 },
  { id: "PQI 03", name: "Diabetes long-term complications", domain: "Diabetes", denom: "18+", nationalPer100k: 113.12,
    medicare: { vt6574: 162, us6574: 184, vt75: 143, us75: 194 } },
  { id: "PQI 05", name: "COPD or asthma in older adults", domain: "Chronic", denom: "40+", nationalPer100k: 200.12,
    medicare: { vt6574: 218, us6574: 235, vt75: 253, us75: 349 } },
  { id: "PQI 07", name: "Hypertension", domain: "Chronic", denom: "18+", nationalPer100k: 57.87,
    medicare: { vt6574: 36, us6574: 82, vt75: 92, us75: 198 } },
  { id: "PQI 08", name: "Heart failure", domain: "Chronic", denom: "18+", nationalPer100k: 404.56,
    medicare: { vt6574: 442, us6574: 553, vt75: 1446, us75: 1830 } },
  { id: "PQI 11", name: "Community-acquired pneumonia", domain: "Acute", denom: "18+", nationalPer100k: 122.04,
    medicare: { vt6574: 224, us6574: 230, vt75: 629, us75: 668 } },
  { id: "PQI 12", name: "Urinary tract infection", domain: "Acute", denom: "18+", nationalPer100k: 106.23,
    medicare: { vt6574: 137, us6574: 185, vt75: 448, us75: 767 } },
  { id: "PQI 14", name: "Uncontrolled diabetes", domain: "Diabetes", denom: "18+", nationalPer100k: 35.49 },
  { id: "PQI 15", name: "Asthma in younger adults", domain: "Chronic", denom: "18-39", nationalPer100k: 19.01 },
  { id: "PQI 16", name: "Lower-extremity amputation among patients with diabetes", domain: "Diabetes", denom: "18+", nationalPer100k: 36.11,
    medicare: { vt6574: 54, us6574: 58, vt75: null, us75: 49 } },
];

export const PQI_COMPOSITES: PQI[] = [
  { id: "PQI 90", name: "Overall composite", domain: "Composite", denom: "18+", nationalPer100k: 1069.33 },
  { id: "PQI 91", name: "Acute composite", domain: "Composite", denom: "18+", nationalPer100k: 228.28 },
  { id: "PQI 92", name: "Chronic composite", domain: "Composite", denom: "18+", nationalPer100k: 841.08 },
  { id: "PQI 93", name: "Diabetes composite", domain: "Composite", denom: "18+", nationalPer100k: 247.25 },
];

// AHRQ v2025 Table 1 denominators: share of the 18+ population in each band.
const DENOM_SHARE: Record<Denom, number> = {
  "18+": 1,
  "40+": 157_046_377 / 252_709_953,
  "18-39": 95_663_773 / 252_709_953,
};

function n0(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
function n1(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export function PQIPanel() {
  const [adults, setAdults] = useState(100_000);
  const [reductionPct, setReductionPct] = useState(10);
  const [rateOverrides, setRateOverrides] = useState<Record<string, string>>({});

  const rows = useMemo(
    () =>
      PQI_SET.map((p) => {
        const override = parseFloat(rateOverrides[p.id] ?? "");
        const rate = Number.isFinite(override) && override >= 0 ? override : p.nationalPer100k;
        const denom = adults * DENOM_SHARE[p.denom];
        const expected = (denom * rate) / 100_000;
        return { ...p, rate, usingOwn: Number.isFinite(override), denom, expected, avoided: expected * (reductionPct / 100) };
      }),
    [adults, reductionPct, rateOverrides],
  );
  const totalExpected = rows.reduce((a, r) => a + r.expected, 0);
  const totalAvoided = rows.reduce((a, r) => a + r.avoided, 0);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 mt-6" data-testid="pqi-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
          AHRQ Prevention Quality Indicators — current set ({PQI_SET.length} conditions + {PQI_COMPOSITES.length} composites)
        </div>
        <div className="text-[10px] text-slate-500">AHRQ QI v2025 · 2022 HCUP SID · per 100,000 adults</div>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
        Admissions for these conditions are considered avoidable with good outpatient care. Expected
        admissions use AHRQ&apos;s national all-payer rate unless you enter your own population&apos;s rate.
        AHRQ&apos;s current module has 10 individual PQIs; older releases counted more (v4.5 had 14 —
        perforated appendix, low birth weight, dehydration and angina without procedure have since been retired).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="text-xs text-slate-400">
          Adult population (18+)
          <input
            type="number"
            min={0}
            step={1000}
            value={adults}
            onChange={(e) => setAdults(Math.max(0, +e.target.value || 0))}
            aria-label="PQI adult population"
            className="mt-1 w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-slate-200 font-mono"
          />
        </label>
        <label className="text-xs text-slate-400">
          Target reduction in PQI admissions: <span className="text-cyan-300 font-bold font-mono">{reductionPct}%</span>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={reductionPct}
            onChange={(e) => setReductionPct(+e.target.value)}
            className="mt-2 w-full accent-teal-400"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-slate-500 text-left border-b border-slate-700">
              <th className="py-1.5 pr-2 font-semibold">Indicator</th>
              <th className="py-1.5 pr-2 font-semibold">Ages</th>
              <th className="py-1.5 pr-2 font-semibold text-right">US rate</th>
              <th className="py-1.5 pr-2 font-semibold text-right">Your rate</th>
              <th className="py-1.5 pr-2 font-semibold text-right">Expected / yr</th>
              <th className="py-1.5 pr-2 font-semibold text-right">Avoided / yr</th>
              <th className="py-1.5 font-semibold text-right">VT vs US Medicare 65-74 · 75+</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-800 text-slate-300">
                <td className="py-1.5 pr-2">
                  <span className="font-mono text-teal-300">{r.id}</span> {r.name}
                </td>
                <td className="py-1.5 pr-2 text-slate-500">{r.denom}</td>
                <td className="py-1.5 pr-2 text-right font-mono">{n1(r.nationalPer100k)}</td>
                <td className="py-1.5 pr-2 text-right">
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    placeholder="—"
                    aria-label={`${r.id} your rate per 100,000`}
                    value={rateOverrides[r.id] ?? ""}
                    onChange={(e) => setRateOverrides((o) => ({ ...o, [r.id]: e.target.value }))}
                    className="w-16 bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-right font-mono text-slate-200"
                  />
                </td>
                <td className="py-1.5 pr-2 text-right font-mono">{n0(r.expected)}</td>
                <td className="py-1.5 pr-2 text-right font-mono text-emerald-400">{n0(r.avoided)}</td>
                <td className="py-1.5 text-right font-mono text-slate-400">
                  {r.medicare
                    ? `${r.medicare.vt6574 ?? "*"} / ${r.medicare.us6574} · ${r.medicare.vt75 ?? "*"} / ${r.medicare.us75}`
                    : "—"}
                </td>
              </tr>
            ))}
            <tr className="text-slate-200 font-semibold">
              <td className="py-2 pr-2" colSpan={4}>Sum of individual PQIs</td>
              <td className="py-2 pr-2 text-right font-mono" data-testid="pqi-expected-total">{n0(totalExpected)}</td>
              <td className="py-2 pr-2 text-right font-mono text-emerald-400" data-testid="pqi-avoided-total">{n0(totalAvoided)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PQI_COMPOSITES.map((c) => (
          <div key={c.id} className="bg-slate-800/60 rounded-lg px-3 py-2">
            <div className="text-[10px] text-slate-500 font-mono">{c.id}</div>
            <div className="text-[11px] text-slate-300">{c.name}</div>
            <div className="text-xs text-cyan-300 font-mono font-bold">{n1(c.nationalPer100k)} / 100k</div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
        US rates: AHRQ QI PQI Benchmark Data Tables v2025, Table 1 (observed, all-payer, 2022 HCUP State Inpatient
        Databases). Vermont column: CMS Medicare Geographic Variation PUF 2024, Original Medicare admissions per
        100,000 beneficiaries (* = suppressed by CMS; — = not reported by CMS). No Vermont all-payer PQI rate is
        published, so enter your own from VHCURES or hospital discharge data in &quot;Your rate&quot;. Composite rates
        are not the sum of the individual indicators (AHRQ removes overlap). Avoided admissions assume the target
        reduction applies uniformly; no cost per admission is assumed.
      </p>
    </div>
  );
}
