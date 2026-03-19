"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROLES = [
  { id: "clinician", label: "Clinician / Provider", desc: "Physician, NP, PA, nurse, therapist" },
  { id: "admin", label: "Health System Leader", desc: "Hospital administrator, CFO, CMO" },
  { id: "policy", label: "Policy Professional", desc: "State/federal government, advocacy" },
  { id: "payer", label: "Payer / Insurance", desc: "Health plan, ACO, MCO staff" },
  { id: "student", label: "Student / Researcher", desc: "Graduate student or academic researcher" },
  { id: "consultant", label: "Consultant / Advisor", desc: "Healthcare consulting, strategy" },
  { id: "other", label: "Other", desc: "Something else entirely" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [orgName, setOrgName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleComplete() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ org_name: orgName }).eq("id", user.id);
    }
    router.push("/account");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        {/* Progress */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2].map((s) => (
            <div key={s} className={`h-1.5 w-16 rounded-full transition-colors ${s <= step ? "bg-indigo-600" : "bg-slate-200"}`} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Welcome! Tell us about yourself.</h1>
              <p className="text-slate-500 mt-2 text-sm">This helps us personalize your experience.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ROLES.map((role) => (
                <button key={role.id} onClick={() => setSelectedRole(role.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedRole === role.id
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="font-bold text-slate-900">{role.label}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{role.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => selectedRole && setStep(2)} disabled={!selectedRole}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Where do you work?</h1>
              <p className="text-slate-500 mt-2 text-sm">Optional — helps us tailor content to your sector.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization name</label>
                <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Hospital, health plan, state agency…" />
              </div>
              <button onClick={handleComplete} disabled={saving}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60">
                {saving ? "Setting up…" : "Go to my account →"}
              </button>
              <button onClick={handleComplete} className="w-full text-sm text-slate-400 hover:text-slate-600 py-2">
                Skip for now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
