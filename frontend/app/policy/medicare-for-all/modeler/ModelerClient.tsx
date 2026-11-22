"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COMMERCIAL_PRICE_PRESETS, SOURCE_LINKS } from "@/lib/m4a/vermont-hospitals";
import {
  runRateBased, runGlobalBudget, totals, revenueNeutralRatePct, CBO_NATIONAL, type HospitalResult,
} from "@/lib/m4a/modeler";

const usdM = (n: number) => {
  if (!Number.isFinite(n)) return "—";
  const m = n / 1e6;
  const sign = m < 0 ? "−" : m > 0 ? "+" : "";
  if (Math.abs(m) >= 1000) return `${sign}$${(Math.abs(m) / 1000).toFixed(2)}B`;
  const s = Math.abs(m) >= 100 ? Math.abs(m).toFixed(0) : Math.abs(m).toFixed(1);
  return `${sign}$${s}M`;
};
const pct = (x: number | null, d = 1) => (x === null ? "—" : !Number.isFinite(x) ? "< −100%" : `${(x * 100).toFixed(d)}%`);

type Lens = "rate" | "global";

function ChangeBar({ value, max }: { value: number; max: number }) {
  if (!Number.isFinite(value) || max === 0) return <div className="h-3" />;
  const w = Math.min(50, (Math.abs(value) / max) * 50);
  return (
    <div className="relative h-3 w-full" title={usdM(value)}>
      <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300" />
      <div
        className={`absolute inset-y-0 ${value >= 0 ? "bg-blue-600 rounded-r" : "bg-red-600 rounded-l"}`}
        style={value >= 0 ? { left: "50%", width: `${w}%` } : { right: "50%", width: `${w}%` }}
      />
    </div>
  );
}

function HospitalTable({ rows, showCommercial }: { rows: HospitalResult[]; showCommercial: boolean }) {
  const sorted = [...rows].sort((a, b) => (Number.isFinite(b.revenueChange) ? b.revenueChange : -Infinity) - (Number.isFinite(a.revenueChange) ? a.revenueChange : -Infinity));
  const max = Math.max(...rows.filter((r) => Number.isFinite(r.revenueChange)).map((r) => Math.abs(r.revenueChange)), 1);
  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
      <table className="w-full text-sm min-w-[720px]">
        <caption className="sr-only">Change in revenue and operating margin by Vermont hospital</caption>
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Hospital</th>
            {showCommercial && <th className="text-right p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Commercial share</th>}
            <th className="text-right p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Revenue change</th>
            <th className="p-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[28%]"><span className="sr-only">Bar</span></th>
            <th className="text-right p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Margin FY27</th>
            <th className="text-right p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Margin after</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50">
              <td className="p-3 text-slate-800">
                <span className="font-semibold">{r.short}</span>
                {r.cah && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded px-1.5 py-0.5">CAH</span>}
                {r.note && <span className="ml-1 text-amber-700 font-bold cursor-help" title={r.note} aria-label={r.note}>†</span>}
              </td>
              {showCommercial && <td className="p-3 text-right tabular-nums text-slate-600">{pct(r.commercialShare, 0)}</td>}
              <td className="p-3 text-right tabular-nums text-slate-900 font-semibold">
                {usdM(r.revenueChange)}
                {Number.isFinite(r.changePctOfNpr) && <span className="block text-[11px] font-normal text-slate-500">{pct(r.changePctOfNpr)} of NPR</span>}
              </td>
              <td className="p-3"><ChangeBar value={r.revenueChange} max={max} /></td>
              <td className={`p-3 text-right tabular-nums ${r.marginBefore !== null && r.marginBefore < 0 ? "text-red-700" : "text-slate-700"}`}>{pct(r.marginBefore)}</td>
              <td className={`p-3 text-right tabular-nums font-semibold ${r.marginAfter !== null && r.marginAfter < 0 ? "text-red-700" : "text-slate-900"}`}>{pct(r.marginAfter)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-4 px-3 py-2 border-t border-slate-100 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 bg-blue-600 rounded-sm" /> Revenue gain</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-2 bg-red-600 rounded-sm" /> Revenue loss</span>
        <span>CAH = critical access hospital. † = a data caveat; hover the mark to read it (Northwestern: approved vs submitted basis; Gifford: no charity-care figure). Brattleboro Memorial has no margin figure: GMCB leaves it out of its system tables.</span>
      </div>
    </div>
  );
}

function Tile({ value, label, tone = "slate" }: { value: string; label: string; tone?: "slate" | "red" | "blue" }) {
  const c = tone === "red" ? "text-red-700" : tone === "blue" ? "text-blue-700" : "text-slate-900";
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className={`text-2xl font-black tabular-nums ${c}`}>{value}</div>
      <div className="text-xs text-slate-600 mt-1 leading-snug">{label}</div>
    </div>
  );
}

export default function ModelerClient() {
  const [lens, setLens] = useState<Lens>("rate");
  const [commercialPct, setCommercialPct] = useState(283);
  const [ratePct, setRatePct] = useState(100);
  const [payUncompensated, setPayUncompensated] = useState(true);
  const [cahAtCost, setCahAtCost] = useState(false);
  const [medicaidPct, setMedicaidPct] = useState(100);
  const [excludeDep, setExcludeDep] = useState(false);
  const [cboLower, setCboLower] = useState(false);

  const neutral = useMemo(() => revenueNeutralRatePct(commercialPct, undefined, payUncompensated, medicaidPct), [commercialPct, payUncompensated, medicaidPct]);
  const rows = useMemo(
    () => (lens === "rate" ? runRateBased({ commercialPct, ratePct, payUncompensated, cahAtCost, medicaidPctOfMedicare: medicaidPct }) : runGlobalBudget(undefined, { excludeDepreciation: excludeDep })),
    [lens, commercialPct, ratePct, payUncompensated, cahAtCost, medicaidPct, excludeDep],
  );
  const t = totals(rows);
  const preset = COMMERCIAL_PRICE_PRESETS.find((p) => p.pct === commercialPct);

  return (
    <div className="space-y-12">
      {/* ── LENS ── */}
      <section>
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1" role="tablist" aria-label="Payment design">
          {([["rate", "A · One rate for every patient"], ["global", "B · S.1506 global budgets"]] as [Lens, string][]).map(([k, label]) => (
            <button key={k} role="tab" aria-selected={lens === k} onClick={() => setLens(k)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${lens === k ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          {lens === "rate"
            ? "The design CBO analyzed: every patient's care is paid one rate, set as a percent of Medicare. Commercial revenue falls from today's commercial price to that rate. Medicare and other revenue rise or fall to the same rate."
            : "S.1506 § 611 pays hospitals a quarterly lump sum, \"payment in full for all operating expenses\", negotiated against Medicare's prospective payment rates (§ 611(c)) and excluding capital (§ 611(b)(3)); § 615 bars payments toward \"profit or net revenue\". HTR's simplification sets each hospital's operating revenue equal to its FY2027 operating expense, so every margin becomes zero. Because that expense includes depreciation, which the bill funds separately, and because negotiation against Medicare rates could pay less, treat this lens as an upper bound on what S.1506 would pay, not a prediction."}
        </p>
      </section>

      {/* ── CONTROLS ── */}
      {lens === "rate" && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <label htmlFor="cp" className="block text-sm font-bold text-slate-900">Commercial price today: <span className="tabular-nums">{commercialPct}%</span> of Medicare</label>
            <div className="flex flex-wrap gap-2 mt-3">
              {COMMERCIAL_PRICE_PRESETS.map((p) => (
                <button key={p.id} onClick={() => setCommercialPct(p.pct)}
                  className={`text-xs px-3 py-1.5 rounded-full border ${commercialPct === p.pct ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"}`}>
                  {p.label}: {p.pct}%
                </button>
              ))}
            </div>
            <input id="cp" type="range" min={150} max={500} step={1} value={commercialPct} onChange={(e) => setCommercialPct(Number(e.target.value))} className="w-full mt-4" />
            <p className="text-[11px] text-slate-500 mt-2 leading-snug">
              {preset ? <>Source: <a href={preset.url} target="_blank" rel="noopener noreferrer" className="underline">{preset.source}</a>.</> : "Custom value."} The three published measures use different methods, so the model applies one statewide figure to every hospital. The data shows each hospital&apos;s commercial revenue, but not its own commercial price.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <label htmlFor="rp" className="block text-sm font-bold text-slate-900">Single-payer rate: <span className="tabular-nums">{ratePct.toFixed(0)}%</span> of Medicare</label>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { label: "Medicare rates", v: 100 },
                { label: "Act 167 benchmark", v: 200 },
                { label: `Revenue-neutral (${neutral.toFixed(0)}%)`, v: neutral },
              ].map((b) => (
                <button key={b.label} onClick={() => setRatePct(b.v)}
                  className={`text-xs px-3 py-1.5 rounded-full border ${Math.abs(ratePct - b.v) < 0.5 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"}`}>
                  {b.label}
                </button>
              ))}
            </div>
            <input id="rp" type="range" min={80} max={300} step={1} value={Math.round(ratePct)} onChange={(e) => setRatePct(Number(e.target.value))} className="w-full mt-4" />
            <label className="flex items-center gap-2 mt-3 text-sm text-slate-700">
              <input type="checkbox" checked={payUncompensated} onChange={(e) => setPayUncompensated(e.target.checked)} />
              Everyone is covered, so uncompensated care (charity care and bad debt) is paid
            </label>
            <label className="flex items-center gap-2 mt-2 text-sm text-slate-700">
              <input type="checkbox" checked={cahAtCost} onChange={(e) => setCahAtCost(e.target.checked)} />
              Pay critical access hospitals at cost, as Medicare does today
            </label>
            <label htmlFor="mp" className="block text-sm text-slate-700 mt-3">Medicaid pays today: <span className="font-semibold tabular-nums">{medicaidPct}%</span> of Medicare <span className="text-slate-500">(sensitivity)</span></label>
            <input id="mp" type="range" min={50} max={100} step={1} value={medicaidPct} onChange={(e) => setMedicaidPct(Number(e.target.value))} className="w-full mt-1" />
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              At 100% the model treats all non-commercial revenue as Medicare-rate. Lower values say Medicaid pays less today, so a single rate raises Medicaid-heavy hospitals&apos; revenue more. Each hospital&apos;s Medicaid share of non-commercial revenue is estimated from its Medicaid share of Medicare and Medicaid inpatient days (CMS cost report, FY ending 2024). No published source gives Vermont&apos;s Medicaid hospital rates as a share of Medicare, so this is a range to explore, not a value.
            </p>
            <p className="text-[11px] text-slate-500 mt-2 leading-snug">
              Act 167 benchmark: Oliver Wyman recommended commercial prices &ldquo;ideally at 200% of Medicare or less for PPS hospitals&rdquo; (<a href={SOURCE_LINKS.rbp200.url} target="_blank" rel="noopener noreferrer" className="underline">GMCB, Dec 2024</a>).
              Revenue-neutral is the one rate at which total revenue across the 14 hospitals stays the same, counting the uncompensated-care payment when that box is ticked. Medicare pays critical access hospitals &ldquo;101% of reasonable costs&rdquo; (<a href="https://cms.gov/files/document/mln006400-information-critical-access-hospitals.pdf" target="_blank" rel="noopener noreferrer" className="underline">CMS MLN006400</a>), so a single rate is least realistic for those eight hospitals; the second box pays them at cost instead.
            </p>
          </div>
        </section>
      )}

      {lens === "global" && (
        <section className="bg-white border border-slate-200 rounded-xl p-5">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={excludeDep} onChange={(e) => setExcludeDep(e.target.checked)} />
            Exclude depreciation from the budget (S.1506 funds capital separately, § 611(b)(3))
          </label>
          <p className="text-[11px] text-slate-500 mt-2 leading-snug">
            Depreciation is each hospital&apos;s cost-report figure for the fiscal year ending 2024, the latest available, so it is an approximation of FY2027 capital cost. In both settings, operating revenue includes the hospitals&apos; other operating revenue (about $690M system-wide in FY27 submissions) and expense includes provider tax, so the lens treats provider tax as an allowable cost.
          </p>
        </section>
      )}

      {/* ── SUMMARY ── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tile value={usdM(t.revenueChange)} label={`Statewide change, ${lens === "rate" ? "14 hospitals" : "13 hospitals (BMH has no data)"}`} tone={t.revenueChange < 0 ? "red" : "blue"} />
          <Tile value={pct(t.changePctOfNpr)} label={`Share of FY27 approved net patient revenue ($${(t.totalNpr / 1e9).toFixed(2)}B for the hospitals modeled)`} />
          <Tile value={`${t.inDeficitBefore} → ${t.inDeficitAfter}`} label={`Hospitals with an operating loss, FY27 → after (of ${t.withMargin} with data)`} tone={t.inDeficitAfter > t.inDeficitBefore ? "red" : "slate"} />
          <Tile value={lens === "rate" ? `${neutral.toFixed(0)}%` : "0%"} label={lens === "rate" ? "Revenue-neutral single rate, % of Medicare" : "Operating margin of every hospital under § 611"} />
        </div>
      </section>

      {/* ── TABLE ── */}
      <section>
        <h2 className="text-lg font-black text-slate-900 mb-3">Hospital by hospital</h2>
        <HospitalTable rows={rows} showCommercial={lens === "rate"} />
        {lens === "rate" && (
          <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 leading-relaxed">
            <strong>How to read this.</strong> A single rate moves money between hospitals even when the statewide total does not change.
            At the revenue-neutral rate, hospitals with more commercial revenue lose and hospitals with more Medicare and Medicaid revenue gain,
            because commercial patients now pay less and everyone else pays more. At Medicare rates, every hospital loses.
          </div>
        )}
        {lens === "global" && (
          <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 leading-relaxed">
            <strong>How to read this.</strong> A cost-based global budget rescues hospitals that are losing money and takes the operating surplus from those that are making it.
            Whether that works depends on what counts as an allowable cost. S.1506 has regional directors negotiate it from a hospital&apos;s cost report, volume, wages and staffing (§ 611(b)(2)).
            Vermont&apos;s own Medicaid hospital global budget, launched January 1, 2026, was stopped by CMS in July 2026.
          </div>
        )}
      </section>

      {/* ── NATIONAL ── */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-black text-slate-900 mb-1">National: what CBO estimated</h2>
        <p className="text-sm text-slate-600 mb-4 max-w-3xl">
          CBO analyzed five illustrative single-payer designs, not S.1506 itself. These are the ranges its Director gave the Senate Budget Committee on May 12, 2022, for 2030 compared with current law.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Tile value={`+$${CBO_NATIONAL.federalSubsidies2030.low}–${CBO_NATIONAL.federalSubsidies2030.high}T`} label="Federal subsidies for health care, 2030" />
          <Tile value={`−$0.7T to +$0.3T`} label="National health expenditures, 2030" />
          <Tile value="−1% to −10%" label="GDP by 2030, if paid for with payroll or income taxes" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={cboLower} onChange={(e) => setCboLower(e.target.checked)} />
          Show CBO&apos;s lower-rate scenario compared with its higher-rate scenario
        </label>
        {cboLower && (
          <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
            <li>Payment rates: hospitals {CBO_NATIONAL.lowerVsHigherRate.hospitals}%, physicians {CBO_NATIONAL.lowerVsHigherRate.physicians}%, prescription drugs {CBO_NATIONAL.lowerVsHigherRate.drugs}%</li>
            <li>Federal subsidies {CBO_NATIONAL.lowerVsHigherRate.federalSubsidiesPct}%; national health expenditures {CBO_NATIONAL.lowerVsHigherRate.nationalSpendingPct}%</li>
            <li>Supply of care {CBO_NATIONAL.lowerVsHigherRate.supplyPct}%, so unmet demand rises by {CBO_NATIONAL.lowerVsHigherRate.unmetDemandPts} percentage points</li>
          </ul>
        )}
        <p className="text-[11px] text-slate-500 mt-4">
          In CBO&apos;s higher-rate scenario, average payment rates are &ldquo;close to the average of the rates that the agency projects for all payers in 2030 under current law.&rdquo; That is the national counterpart of the revenue-neutral rate in lens A.
        </p>
      </section>

      {/* ── ASSUMPTIONS ── */}
      <section>
        <h2 className="text-lg font-black text-slate-900 mb-3">What this model assumes, and what it leaves out</h2>
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5 leading-relaxed">
          <li>It is static. Volume, costs and the mix of patients stay at FY2027 levels. CBO expects demand to rise under single payer; this model does not.</li>
          <li>Net patient revenue is GMCB&apos;s definition. It includes fixed prospective payments (about $193M system-wide in FY27 submissions), which the rate lens reprices as if they were fee-for-service. Commercial revenue excludes Medicare Advantage but includes payers such as workers&apos; compensation, Tricare and ChampVA, which a hospital has asked GMCB to carve out.</li>
          <li>Direction of bias. Applying a facility price ratio to all commercial revenue overstates the loss where revenue includes professional services, which RAND found priced lower (226% of Medicare in Vermont). Treating Medicaid as Medicare-rate understates Medicaid-heavy hospitals&apos; gains and overstates the revenue-neutral rate. Treat results as directions and orders of magnitude.</li>
          <li>Basis gaps between approved and submitted figures are not uniform. Northwestern Medical Center&apos;s approved commercial revenue is $17.8M below its submission, so its FY27 margin as shown is optimistic.</li>
          <li>Lens A treats all non-commercial revenue as paid at Medicare rates today. Medicaid pays less, so the model <em>understates</em> the gain for hospitals with many Medicaid patients.</li>
          <li>One statewide commercial price is applied to every hospital. RAND reports prices by health system, not by hospital, and only as unlabelled bar charts (systems range from 148% to 321% of Medicare). Reading values off the bars would be estimation, so the Modeler does not use them.</li>
          <li>Commercial and total net patient revenue are FY2027 <em>approved</em> budgets. Operating expense and margin are FY2027 <em>submitted</em> budgets, because GMCB publishes margins on that basis. Operating revenue is calculated as expense ÷ (1 − margin).</li>
          <li>Uncompensated care is the cost of charity care and bad debt from each hospital&apos;s latest CMS cost report (fiscal years ending in 2024), added at cost, the measure the cost report publishes. Paying it at the single rate instead would need each hospital&apos;s Medicare payment-to-cost ratio, which no source used here publishes. Gifford reports no charity-care cost, so its figure is bad debt only.</li>
          <li>Professional (physician) services billed by a hospital are repriced at the same ratio as facility services. RAND found Vermont professional prices lower than facility prices.</li>
        </ul>
        <p className="text-sm text-slate-600 mt-4">
          For the full argument, see <Link href="/policy/medicare-for-all" className="text-blue-700 underline">Medicare for All: the five-pillar test</Link> and <Link href="/policy/medicare-for-all/vermont-act-48" className="text-blue-700 underline">Vermont&apos;s Act 48 attempt</Link>.
        </p>
      </section>

      {/* ── SOURCES ── */}
      <section className="border-t border-slate-200 pt-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Sources</h2>
        <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-5">
          {[SOURCE_LINKS.orders, SOURCE_LINKS.staff, SOURCE_LINKS.cms, ...COMMERCIAL_PRICE_PRESETS.map((p) => ({ label: p.source, url: p.url })),
            { label: "S.1506, Medicare for All Act, §§ 611, 615 (introduced text)", url: "https://www.govinfo.gov/content/pkg/BILLS-119s1506is/xhtml/BILLS-119s1506is.html" },
            { label: "CBO Director P. Swagel, testimony to the Senate Budget Committee, May 12, 2022 (NLM copy)", url: "https://collections.nlm.nih.gov/txt/nlm:nlmuid-9918471188406676-pdf" },
          ].filter((s, i, a) => a.findIndex((x) => x.url === s.url && x.label === s.label) === i).map((s) => (
            <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{s.label}</a></li>
          ))}
        </ol>
      </section>
    </div>
  );
}
