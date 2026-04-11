import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survey Results | State of Healthcare Transformation 2026 | HTR",
  description: "Aggregate findings from HTR's annual State of Healthcare Transformation survey.",
};

export const revalidate = 3600;

interface AggRow {
  year: number;
  title: string;
  total_responses: number;
  avg_readiness: number;
  avg_ai_adoption: number;
  avg_ehr_satisfaction: number;
  avg_interop_readiness: number;
  top_barrier: string;
  top_opportunity: string;
  top_respondent_role: string;
}

const BARRIER_LABELS: Record<string, string> = {
  funding: "Funding & reimbursement",
  workforce: "Workforce & capacity",
  technology: "Technology & interoperability",
  policy: "Policy & regulatory environment",
  culture: "Organizational culture",
  data: "Data quality & access",
  other: "Other",
};

const OPPORTUNITY_LABELS: Record<string, string> = {
  vbc: "Value-based care expansion",
  ai_analytics: "AI & advanced analytics",
  telehealth: "Telehealth & virtual care",
  interoperability: "Interoperability & data sharing",
  sdoh: "Social determinants integration",
  workforce: "Workforce & care redesign",
  other: "Other",
};

const ROLE_LABELS: Record<string, string> = {
  hospital_exec: "Hospital / Health System Executive",
  state_official: "State Government Official",
  federal_official: "Federal Agency Official",
  consultant: "Healthcare Consultant / Advisor",
  researcher: "Academic / Policy Researcher",
  payer: "Health Plan / Payer",
  other: "Other",
};

function ScoreBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-black text-indigo-600">{value?.toFixed(1)} / {max}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5" aria-hidden="true">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function SurveyResultsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: rows } = await supabase
    .from("survey_aggregate")
    .select("*")
    .order("year", { ascending: false });

  const current = rows?.[0] as AggRow | undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-indigo-900 to-indigo-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-3">Annual Research</p>
          <h1 className="ty-h1 font-black mb-3">
            {current?.title ?? "State of Healthcare Transformation"}
          </h1>
          <p className="text-indigo-200 text-lg">
            Aggregate findings from {current?.total_responses ?? "—"} healthcare professionals across the US.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/survey"
              className="bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
            >
              Take the 2026 Survey
            </Link>
            <Link
              href="/developers"
              className="border border-indigo-400 text-indigo-100 hover:bg-indigo-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Access via API →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!current || current.total_responses === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            <p className="text-lg font-semibold text-slate-600 mb-2">Results not yet published</p>
            <p className="text-sm">Aggregate results will appear here once the survey has collected sufficient responses.</p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total responses", value: current.total_responses.toLocaleString() },
                { label: "Top respondent role", value: ROLE_LABELS[current.top_respondent_role] ?? current.top_respondent_role },
                { label: "Top barrier", value: BARRIER_LABELS[current.top_barrier] ?? current.top_barrier },
                { label: "Top opportunity", value: OPPORTUNITY_LABELS[current.top_opportunity] ?? current.top_opportunity },
              ].map(stat => (
                <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <p className="text-2xl font-black text-slate-900 leading-tight">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Score bars */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-lg font-black text-slate-900 mb-6">Average Scores (1–5)</h2>
              <div className="space-y-5">
                <ScoreBar label="Transformation Readiness" value={current.avg_readiness} />
                <ScoreBar label="AI & Analytics Adoption" value={current.avg_ai_adoption} />
                <ScoreBar label="EHR Satisfaction" value={current.avg_ehr_satisfaction} />
                <ScoreBar label="Interoperability Readiness" value={current.avg_interop_readiness} />
              </div>
            </div>

            {/* Methodology note */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-500">
              <p className="font-bold text-slate-700 mb-2">Methodology note</p>
              <p>
                All responses are self-reported and submitted voluntarily. Data is aggregated and anonymised — no individual responses are published. The survey is conducted annually by Health Transformation Review. For data access via API, see the <Link href="/developers" className="text-indigo-600 hover:underline">developer documentation</Link>.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
