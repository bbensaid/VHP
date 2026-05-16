import { notFound } from "next/navigation";
import Link from "next/link";
import { HOSPITALS } from "@/app/vermont-act-167/simulator/data";
import type { Metadata } from "next";

// ── Static params for all 14 hospitals ───────────────────────────────────────

export function generateStaticParams() {
  return HOSPITALS.map((h) => ({ slug: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = HOSPITALS.find((h) => h.id === slug);
  if (!h) return { title: "Hospital Not Found" };
  return {
    title: `${h.name} | Act 167 Hospital Profile | HTR`,
    description: `Act 167 financial profile, Oliver Wyman recommendations, and community data for ${h.name} in ${h.city}, Vermont.`,
  };
}

// ── Shared UI primitives ──────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "red" | "amber" | "emerald" | "slate";
}) {
  const colors = {
    red:     "text-rose-600",
    amber:   "text-amber-600",
    emerald: "text-emerald-600",
    slate:   "text-slate-900",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</div>
      <div className={`text-2xl font-black ${colors[accent ?? "slate"]}`}>{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

const URGENCY_META: Record<string, { label: string; color: string; border: string; bg: string }> = {
  urgent:      { label: "Urgent",      color: "text-rose-700",   border: "border-rose-200",   bg: "bg-rose-50" },
  major:       { label: "Major",       color: "text-orange-700", border: "border-orange-200", bg: "bg-orange-50" },
  significant: { label: "Significant", color: "text-amber-700",  border: "border-amber-200",  bg: "bg-amber-50" },
  modest:      { label: "Modest",      color: "text-emerald-700",border: "border-emerald-200",bg: "bg-emerald-50" },
};

// ── Oliver Wyman recommendation themes per urgency ────────────────────────────

const WYMAN_RECS: Record<string, { title: string; detail: string; icon: string }[]> = {
  urgent: [
    { icon: "→", title: "Evaluate Conversion to FQHC or REH Status", detail: "At current loss trajectory, conversion to Federally Qualified Health Center or Rural Emergency Hospital may be the only financially sustainable path." },
    { icon: "→", title: "Consolidate to Emergency & Primary Care Only", detail: "Reduce inpatient capacity to flex beds only. Shift all elective and specialty procedures to regional Centers of Excellence." },
    { icon: "→", title: "Pursue Shared Services Aggressively", detail: "Administrative, IT, supply chain, and billing consolidation with UVM Health Network or other regional partners to reduce overhead by 20–30%." },
    { icon: "→", title: "Reassess All Low-Volume Service Lines", detail: "Any service line below volume thresholds set by the Oliver Wyman Report should be closed or transferred to a designated COE facility." },
    { icon: "→", title: "Apply Reference-Based Pricing", detail: "Transition commercial payer contracts to Medicare reference-based pricing model to stabilize revenue." },
  ],
  major: [
    { icon: "→", title: "Consolidate Specialty Services to Regional COEs", detail: "Transfer specialty services (orthopedics, oncology, cardiology) to designated Centers of Excellence while retaining Emergency and primary care." },
    { icon: "→", title: "Administrative Cost Reduction Target: 15–20%", detail: "Hire external consultants to reduce administrative overhead and align physician productivity with national benchmarks." },
    { icon: "→", title: "Expand Telehealth & Remote Monitoring", detail: "Deploy telehealth for specialist consultations and chronic disease management to maintain access without fixed overhead." },
    { icon: "→", title: "Workforce Recruitment & Retention Program", detail: "Address travel-nurse dependency with permanent recruitment pipeline and housing support programs." },
  ],
  significant: [
    { icon: "→", title: "Service Line Rationalization Review", detail: "Conduct detailed volume and margin analysis for all service lines. Eliminate those below clinical quality thresholds." },
    { icon: "→", title: "Value-Based Care Participation", detail: "Accelerate participation in ACO and shared-savings contracts to reduce reliance on fee-for-service revenue." },
    { icon: "→", title: "Community Infrastructure Investment", detail: "Work with AHS and AHEAD Model resources to invest in transportation, housing, and EMS — reducing costly ED utilization." },
    { icon: "→", title: "Capital Plan Review", detail: "Defer all non-essential capital expenditures. Prioritize investments that directly reduce variable costs." },
  ],
  modest: [
    { icon: "→", title: "Academic Program Outcome Review", detail: "Evaluate whether medical education and research programs generate measurable improvements in Vermonter health outcomes." },
    { icon: "→", title: "AHEAD Model Leadership Role", detail: "As Vermont's only financially stable system, UVMMC should lead the AHEAD Model implementation and serve as the anchor for COE designations statewide." },
    { icon: "→", title: "Shared Services Provider", detail: "Expand shared administrative and clinical services to smaller Vermont hospitals to reduce system-wide costs." },
  ],
};

// ── Page component ─────────────────────────────────────────────────────────────

export default async function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = HOSPITALS.find((h) => h.id === slug);
  if (!h) notFound();

  const urgencyMeta = URGENCY_META[h.urgency];
  const recs = WYMAN_RECS[h.urgency] ?? WYMAN_RECS.significant;
  const isAtRisk = h.operatingMarginPct < -10;
  const marginColor = h.operatingMarginPct >= 0 ? "emerald" : h.operatingMarginPct > -5 ? "amber" : "red";
  const lossProjectionGrowth = h.projectedLoss2028M > 0 && h.annualLossM > 0
    ? (((h.projectedLoss2028M / h.annualLossM) - 1) * 100).toFixed(0)
    : null;

  // Neighbor hospitals in same HSA or adjacent — simplified: show 3 hospitals by proximity
  const neighbors = HOSPITALS
    .filter((n) => n.id !== h.id)
    .sort((a, b) => {
      const distA = Math.sqrt((a.lat - h.lat) ** 2 + (a.lng - h.lng) ** 2);
      const distB = Math.sqrt((b.lat - h.lat) ** 2 + (b.lng - h.lng) ** 2);
      return distA - distB;
    })
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs text-slate-500">
        <Link href="/vermont-act-167" className="hover:text-violet-700">Vermont Act 167</Link>
        <span>/</span>
        <Link href="/dashboard/vermont/hospitals" className="hover:text-violet-700">All Hospitals</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{h.shortName}</span>
      </div>

      {/* Hero */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded border ${urgencyMeta.bg} ${urgencyMeta.color} ${urgencyMeta.border}`}>
                Act 167 · {urgencyMeta.label} Risk
              </span>
              {isAtRisk && (
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                  Most At-Risk
                </span>
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-slate-100 text-slate-600">
                {h.affiliation}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-1">{h.name}</h1>
            <p className="text-slate-500">{h.city}, Vermont · {h.hsa} Health Service Area · {h.beds} licensed beds</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link
              href="/vermont-act-167/simulator"
              className="inline-flex items-center gap-2 bg-violet-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Model in Simulator →
            </Link>
            <Link
              href="/dashboard/vermont/hospitals"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Compare Hospitals
            </Link>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Financial Health</h2>
        <h3 className="text-xl font-black text-slate-900 mb-5">Key Financial Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Operating Margin"
            value={`${h.operatingMarginPct > 0 ? "+" : ""}${h.operatingMarginPct.toFixed(1)}%`}
            sub={h.operatingMarginPct >= 0 ? "Profitable" : "Operating at a loss"}
            accent={marginColor}
          />
          <StatCard
            label="Annual Operating Loss"
            value={h.annualLossM === 0 ? "Profitable" : `-$${h.annualLossM.toFixed(1)}M`}
            sub="Current fiscal year"
            accent={h.annualLossM > 0 ? "red" : "emerald"}
          />
          <StatCard
            label="Projected 2028 Loss"
            value={h.projectedLoss2028M === 0 ? "Stable" : `-$${h.projectedLoss2028M.toFixed(1)}M`}
            sub={lossProjectionGrowth ? `↑ ${lossProjectionGrowth}% growth vs today` : "Without reform"}
            accent={h.projectedLoss2028M > 5 ? "red" : h.projectedLoss2028M > 0 ? "amber" : "emerald"}
          />
          <StatCard
            label="Total FTEs"
            value={h.fteCount.toLocaleString()}
            sub="Full-time equivalents"
            accent="slate"
          />
        </div>

        {/* Loss trajectory visual */}
        {h.annualLossM > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Loss Trajectory Without Reform</div>
            <div className="flex items-end gap-4 h-24">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t bg-amber-400"
                  style={{ height: `${Math.min(100, (h.annualLossM / h.projectedLoss2028M) * 100)}%` }}
                />
                <div className="text-[10px] font-bold text-slate-500">Today</div>
                <div className="text-[10px] font-black text-rose-600">-${h.annualLossM.toFixed(1)}M</div>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full rounded-t bg-orange-500" style={{ height: `${Math.min(100, ((h.annualLossM + h.projectedLoss2028M) / 2 / h.projectedLoss2028M) * 100)}%` }} />
                <div className="text-[10px] font-bold text-slate-500">2026</div>
                <div className="text-[10px] font-black text-rose-600">-${((h.annualLossM + h.projectedLoss2028M) / 2).toFixed(1)}M</div>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full rounded-t bg-rose-500 animate-pulse" style={{ height: "100%" }} />
                <div className="text-[10px] font-bold text-slate-500">2028</div>
                <div className="text-[10px] font-black text-rose-700 font-black">-${h.projectedLoss2028M.toFixed(1)}M</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic">
              Projection assumes {h.urgency === "urgent" || h.urgency === "major" ? "5% annual expense growth" : "3–4% annual expense growth"} without structural intervention. Source: Oliver Wyman Report (Sep 2024), synthetic data.
            </p>
          </div>
        )}
      </section>

      {/* Operational Metrics */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Operations</h2>
        <h3 className="text-xl font-black text-slate-900 mb-5">Hospital Operations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Licensed Beds" value={String(h.beds)} sub={`${h.icuBeds} ICU beds`} />
          <StatCard label="Annual Admissions" value={h.annualAdmissions.toLocaleString()} sub="Inpatient" />
          <StatCard label="Annual ED Visits" value={h.annualEDVisits.toLocaleString()} sub="Emergency department" />
          <StatCard
            label="Travel to Next Hospital"
            value={`${h.avgTravelToNextHospitalMin} min`}
            sub="Average drive time"
            accent={h.avgTravelToNextHospitalMin > 50 ? "red" : h.avgTravelToNextHospitalMin > 35 ? "amber" : "slate"}
          />
        </div>
      </section>

      {/* Community & Equity */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Community Context</h2>
        <h3 className="text-xl font-black text-slate-900 mb-5">Population & Equity Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="HSA Population"
            value={h.populationHSA.toLocaleString()}
            sub={`${h.hsa} Health Service Area`}
          />
          <StatCard
            label="Population Over 65"
            value={`${h.popOver65Pct.toFixed(1)}%`}
            sub="High aging = high demand"
            accent={h.popOver65Pct > 28 ? "red" : h.popOver65Pct > 22 ? "amber" : "slate"}
          />
          <StatCard
            label="Low Income (%)"
            value={`${h.lowIncomePct.toFixed(1)}%`}
            sub="Below 200% FPL"
            accent={h.lowIncomePct > 25 ? "red" : "slate"}
          />
          <StatCard
            label="No Vehicle (%)"
            value={`${h.noCarPct.toFixed(1)}%`}
            sub="Transportation barrier"
            accent={h.noCarPct > 15 ? "amber" : "slate"}
          />
        </div>

        {(h.noCarPct > 15 || h.avgTravelToNextHospitalMin > 45) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="font-bold text-amber-900 text-sm mb-2">Geographic Isolation Risk</div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {h.name} serves a population with significant transportation barriers —{" "}
              <strong>{h.noCarPct.toFixed(0)}% of households lack a vehicle</strong> and the nearest
              alternative hospital is <strong>{h.avgTravelToNextHospitalMin} minutes away</strong>.
              Service closures or consolidations carry acute access risk for vulnerable residents.
              The Oliver Wyman Report identifies EMS capacity and transportation as critical pre-conditions
              for any restructuring at this hospital.
            </p>
          </div>
        )}
      </section>

      {/* Services */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Clinical Capabilities</h2>
        <h3 className="text-xl font-black text-slate-900 mb-5">Active Service Lines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Current Services</div>
            <div className="flex flex-wrap gap-2">
              {h.services.map(s => (
                <span key={s} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full font-medium">
                  {s}
                </span>
              ))}
              {h.services.length === 0 && <span className="text-xs text-slate-400">No active specialty services</span>}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Centers of Excellence (COE) Designations
            </div>
            {h.coes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {h.coes.map(c => (
                  <span key={c} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full font-medium">
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                No COE designations assigned. The Oliver Wyman Report recommends that hospitals without
                sufficient volume for COE qualification consolidate services to designated regional COE hospitals.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Oliver Wyman Recommendations */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Act 167 Guidance</h2>
        <h3 className="text-xl font-black text-slate-900 mb-2">Oliver Wyman Recommendations</h3>
        <p className="text-sm text-slate-500 mb-6">
          Based on {h.name}&apos;s urgency classification (<strong>{h.urgency}</strong>), the following
          recommendations from the Oliver Wyman Report apply. These are illustrative based on report categories —
          hospital-specific recommendations require the full 144-page report.
        </p>
        <div className="space-y-4">
          {recs.map((rec) => (
            <div key={rec.title} className="flex gap-3 bg-slate-50 border border-slate-200 rounded-lg p-5">
              <span className="text-violet-500 font-black text-lg shrink-0 leading-none">{rec.icon}</span>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{rec.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{rec.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs text-violet-800 leading-relaxed">
            <strong>Note:</strong> These recommendations reflect the urgency-tier framework from the Oliver Wyman Act 167
            Community Engagement Report (September 2024). Hospital-specific action plans are developed collaboratively
            with the Green Mountain Care Board. Recommendations are presented as options, not mandates.{" "}
            <a
              href="https://gmcboard.vermont.gov/sites/gmcb/files/documents/Act%20167%20Community%20Engagement_OW%20Exec%20Summary%20Report%20-%20revised%2010.21.2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-700 underline"
            >
              Read the full report →
            </a>
          </p>
        </div>
      </section>

      {/* Nearby Hospitals */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Regional Context</h2>
        <h3 className="text-xl font-black text-slate-900 mb-5">Nearest Vermont Hospitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {neighbors.map(n => (
            <Link
              key={n.id}
              href={`/vermont-act-167/hospitals/${n.id}`}
              className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-slate-900 text-sm leading-snug">{n.name}</div>
                <span className={`shrink-0 text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${URGENCY_META[n.urgency].bg} ${URGENCY_META[n.urgency].color} ${URGENCY_META[n.urgency].border}`}>
                  {n.urgency}
                </span>
              </div>
              <div className="text-xs text-slate-500 mb-3">{n.city}, VT</div>
              <div className={`text-sm font-black ${n.operatingMarginPct < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {n.operatingMarginPct > 0 ? "+" : ""}{n.operatingMarginPct.toFixed(1)}% margin
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA: Simulator */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-900 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">Policy Simulation Lab</div>
            <h3 className="text-xl font-black text-white mb-2">
              Model Act 167 Scenarios for {h.shortName}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Use the Act 167 Simulator to model how specific Oliver Wyman recommendations would affect
              {" "}{h.name}&apos;s financial trajectory, service access, and equity outcomes.
            </p>
          </div>
          <Link
            href="/vermont-act-167/simulator"
            className="shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Launch Simulator →
          </Link>
        </div>
      </section>

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
        <Link href="/vermont-act-167" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
          ← Act 167 Overview
        </Link>
        <div className="flex gap-4 flex-wrap">
          <Link href="/dashboard/vermont/hospitals" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            All 14 Hospitals →
          </Link>
          <Link href="/vermont-act-167/simulator" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            Simulation Engine →
          </Link>
          <Link href="/ahead-model" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            AHEAD Model →
          </Link>
        </div>
      </div>

    </div>
  );
}
