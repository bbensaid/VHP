"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

interface Props {
  editionId: string;
  userId: string | null;
}

const STEPS = ["Your Profile", "Transformation", "Technology", "Policy & Wrap-up"] as const;

const ROLE_OPTIONS = [
  { value: "hospital_exec",  label: "Hospital / Health System Executive" },
  { value: "state_official", label: "State Government Official" },
  { value: "federal_official", label: "Federal Agency Official" },
  { value: "consultant",    label: "Healthcare Consultant / Advisor" },
  { value: "researcher",    label: "Academic / Policy Researcher" },
  { value: "payer",         label: "Health Plan / Payer" },
  { value: "other",         label: "Other" },
];

const ORG_OPTIONS = [
  { value: "hospital_system", label: "Hospital / Health System" },
  { value: "state_agency",    label: "State Agency" },
  { value: "federal_agency",  label: "Federal Agency" },
  { value: "consulting",      label: "Consulting Firm" },
  { value: "payer",           label: "Health Plan / Payer" },
  { value: "nonprofit",       label: "Nonprofit / Advocacy" },
  { value: "academic",        label: "Academic / Research Institution" },
  { value: "other",           label: "Other" },
];

const BARRIER_OPTIONS = [
  { value: "funding",    label: "Funding & reimbursement" },
  { value: "workforce",  label: "Workforce & capacity" },
  { value: "technology", label: "Technology & interoperability" },
  { value: "policy",     label: "Policy & regulatory environment" },
  { value: "culture",    label: "Organizational culture & change resistance" },
  { value: "data",       label: "Data quality & access" },
  { value: "other",      label: "Other" },
];

const OPPORTUNITY_OPTIONS = [
  { value: "vbc",                label: "Value-based care expansion" },
  { value: "ai_analytics",       label: "AI & advanced analytics" },
  { value: "telehealth",         label: "Telehealth & virtual care" },
  { value: "interoperability",   label: "Interoperability & data sharing" },
  { value: "sdoh",               label: "Social determinants integration" },
  { value: "workforce",          label: "Workforce & care redesign" },
  { value: "other",              label: "Other" },
];

function ScaleInput({ id, label, value, onChange }: {
  id: string; label: string; value: number; onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <div className="flex gap-2" role="group" aria-label={label}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-pressed={value === n}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
              value === n
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {n}
          </button>
        ))}
        <span className="ml-2 self-center text-xs text-slate-400">
          {value === 0 ? "Not rated" : value <= 2 ? "Low" : value === 3 ? "Moderate" : "High"}
        </span>
      </div>
    </div>
  );
}

export default function SurveyForm({ editionId, userId }: Props) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Step 1
  const [respondentRole, setRespondentRole] = useState("");
  const [orgType, setOrgType] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [stateFocus, setStateFocus] = useState("national");

  // Step 2
  const [transformationReadiness, setTransformationReadiness] = useState(0);
  const [biggestBarrier, setBiggestBarrier] = useState("");
  const [biggestOpportunity, setBiggestOpportunity] = useState("");

  // Step 3
  const [aiAdoption, setAiAdoption] = useState(0);
  const [ehrSatisfaction, setEhrSatisfaction] = useState(0);
  const [interopReadiness, setInteropReadiness] = useState(0);

  // Step 4
  const [topFederalPriority, setTopFederalPriority] = useState("");
  const [topStatePriority, setTopStatePriority] = useState("");
  const [openComments, setOpenComments] = useState("");

  const canAdvance = [
    respondentRole && orgType,
    transformationReadiness > 0 && biggestBarrier && biggestOpportunity,
    aiAdoption > 0 && ehrSatisfaction > 0 && interopReadiness > 0,
    true,
  ][step];

  async function submit() {
    setError(null);
    startTransition(async () => {
      const { error: insertError } = await supabase
        .from("survey_responses")
        .insert({
          edition_id:              editionId,
          user_id:                 userId,
          respondent_role:         respondentRole,
          org_type:                orgType,
          org_size:                orgSize || null,
          state_focus:             stateFocus,
          transformation_readiness: transformationReadiness,
          biggest_barrier:         biggestBarrier,
          biggest_opportunity:     biggestOpportunity,
          ai_adoption_score:       aiAdoption,
          ehr_satisfaction:        ehrSatisfaction,
          interop_readiness:       interopReadiness,
          top_federal_priority:    topFederalPriority || null,
          top_state_priority:      topStatePriority || null,
          open_comments:           openComments || null,
          completed:               true,
        });

      if (insertError) {
        setError(insertError.message);
        return;
      }
      router.push("/survey/thank-you");
    });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Progress bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-slate-800" : "text-slate-400"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: Profile */}
        {step === 0 && (
          <>
            <h2 className="text-xl font-black text-slate-900">About You</h2>

            <div>
              <label htmlFor="respondent-role" className="block text-sm font-bold text-slate-700 mb-2">
                Your role
              </label>
              <select
                id="respondent-role"
                value={respondentRole}
                onChange={e => setRespondentRole(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select your role…</option>
                {ROLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="org-type" className="block text-sm font-bold text-slate-700 mb-2">
                Organization type
              </label>
              <select
                id="org-type"
                value={orgType}
                onChange={e => setOrgType(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select type…</option>
                {ORG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="org-size" className="block text-sm font-bold text-slate-700 mb-2">
                Organization size <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <select
                id="org-size"
                value={orgSize}
                onChange={e => setOrgSize(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Prefer not to say</option>
                <option value="under_100">Under 100 employees</option>
                <option value="100_999">100–999</option>
                <option value="1000_4999">1,000–4,999</option>
                <option value="5000_plus">5,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="state-focus" className="block text-sm font-bold text-slate-700 mb-2">
                Primary state focus
              </label>
              <input
                id="state-focus"
                type="text"
                value={stateFocus}
                onChange={e => setStateFocus(e.target.value)}
                placeholder="e.g. VT, CA, or national"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </>
        )}

        {/* Step 2: Transformation */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-black text-slate-900">Transformation Readiness</h2>

            <ScaleInput
              id="readiness"
              label="How would you rate your organization's overall transformation readiness? (1 = Not ready, 5 = Leading)"
              value={transformationReadiness}
              onChange={setTransformationReadiness}
            />

            <div>
              <label htmlFor="barrier" className="block text-sm font-bold text-slate-700 mb-2">
                What is the biggest barrier to transformation at your organization?
              </label>
              <select
                id="barrier"
                value={biggestBarrier}
                onChange={e => setBiggestBarrier(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select…</option>
                {BARRIER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="opportunity" className="block text-sm font-bold text-slate-700 mb-2">
                What is the biggest opportunity in the next 12 months?
              </label>
              <select
                id="opportunity"
                value={biggestOpportunity}
                onChange={e => setBiggestOpportunity(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select…</option>
                {OPPORTUNITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </>
        )}

        {/* Step 3: Technology */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-black text-slate-900">Technology & Digital Health</h2>
            <p className="text-sm text-slate-500">Rate from 1 (very low) to 5 (very high).</p>

            <ScaleInput
              id="ai-adoption"
              label="AI / advanced analytics adoption at your organization"
              value={aiAdoption}
              onChange={setAiAdoption}
            />
            <ScaleInput
              id="ehr-satisfaction"
              label="Overall EHR system satisfaction"
              value={ehrSatisfaction}
              onChange={setEhrSatisfaction}
            />
            <ScaleInput
              id="interop"
              label="Interoperability & data sharing readiness"
              value={interopReadiness}
              onChange={setInteropReadiness}
            />
          </>
        )}

        {/* Step 4: Policy */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-black text-slate-900">Policy Priorities</h2>

            <div>
              <label htmlFor="federal-priority" className="block text-sm font-bold text-slate-700 mb-2">
                Top federal policy priority for healthcare transformation <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="federal-priority"
                type="text"
                value={topFederalPriority}
                onChange={e => setTopFederalPriority(e.target.value)}
                placeholder="e.g. CMS payment model reform, FHIR mandate…"
                maxLength={200}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="state-priority" className="block text-sm font-bold text-slate-700 mb-2">
                Top state-level policy priority <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="state-priority"
                type="text"
                value={topStatePriority}
                onChange={e => setTopStatePriority(e.target.value)}
                placeholder="e.g. All-payer ACO expansion, Medicaid waiver…"
                maxLength={200}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-bold text-slate-700 mb-2">
                Anything else you&apos;d like to share? <span className="font-normal text-slate-400">(optional, max 2000 chars)</span>
              </label>
              <textarea
                id="comments"
                value={openComments}
                onChange={e => setOpenComments(e.target.value)}
                rows={5}
                maxLength={2000}
                placeholder="Open-ended thoughts, concerns, or suggestions…"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-y"
              />
              <p className="text-xs text-slate-400 text-right mt-1">{openComments.length}/2000</p>
            </div>

            {!userId && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-800">
                You&apos;re submitting anonymously. <a href="/signup" className="font-bold underline hover:text-indigo-900">Create an account</a> to track your submission and receive the published report.
              </div>
            )}
          </>
        )}

        {error && (
          <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="text-sm text-slate-500 hover:text-slate-700 font-semibold transition-colors"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance}
              className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={isPending}
              className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Submitting…" : "Submit Survey"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
