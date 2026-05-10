"use client";

import { useRouter } from "next/navigation";

const ROLES = [
  { id: "executive",   label: "Hospital / Health System Executive", icon: "🏥" },
  { id: "policy",      label: "Policy Analyst / Government Official", icon: "🏛️" },
  { id: "clinician",   label: "Clinician (MD, NP, PA)",              icon: "🩺" },
  { id: "economist",   label: "Health Economist / Actuary",           icon: "📊" },
  { id: "tech",        label: "Health Tech Professional",             icon: "💻" },
  { id: "compliance",  label: "Medicaid / Compliance Officer",        icon: "📋" },
  { id: "researcher",  label: "Student / Researcher",                 icon: "🎓" },
  { id: "investor",    label: "Investor / Consultant",                icon: "💼" },
  { id: "other",       label: "Other",                                icon: "🌐" },
];

export default function WelcomePage() {
  const router = useRouter();

  function pick(roleId: string) {
    try { localStorage.setItem("htr-user-role", roleId); } catch { /* ignore */ }
    router.push("/start");
  }

  function skip() {
    try { localStorage.setItem("htr-user-role", "all"); } catch { /* ignore */ }
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Health Transformation Review
        </span>
      </div>

      {/* Message */}
      <div className="max-w-xl text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
          This platform has a lot to offer.<br />
          <span className="text-indigo-600 dark:text-indigo-400">Let's show you what matters most to you.</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          We cover policy, economics, technology, clinical innovation, health equity, and operations —
          across Vermont and the nation. To cut through the noise and surface the content, tools,
          and analysis most relevant to your work, tell us who you are.
          <strong className="text-slate-800 dark:text-slate-200"> This takes 5 seconds and you can change it anytime.</strong>
        </p>
      </div>

      {/* Role grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-3xl mb-8">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => pick(role.id)}
            className="flex items-center gap-3 px-5 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl text-left transition-all group shadow-sm hover:shadow-md"
          >
            <span className="text-2xl">{role.icon}</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 leading-snug">
              {role.label}
            </span>
          </button>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={skip}
        className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors"
      >
        Skip — show me everything
      </button>
    </div>
  );
}
