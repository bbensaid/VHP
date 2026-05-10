"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = [
  { id: "executive",  label: "Hospital / Health System Executive", icon: "🏥" },
  { id: "policy",     label: "Policy Analyst / Government Official", icon: "🏛️" },
  { id: "clinician",  label: "Clinician (MD, NP, PA)",              icon: "🩺" },
  { id: "economist",  label: "Health Economist / Actuary",           icon: "📊" },
  { id: "tech",       label: "Health Tech Professional",             icon: "💻" },
  { id: "compliance", label: "Medicaid / Compliance Officer",        icon: "📋" },
  { id: "researcher", label: "Student / Researcher",                 icon: "🎓" },
  { id: "investor",   label: "Investor / Consultant",                icon: "💼" },
];

const ROLE_GREETINGS: Record<string, string> = {
  executive:  "Welcome. I see you're a Hospital / Health System Executive. What are you trying to solve today — financial modeling, VBC readiness, workforce planning, regulatory compliance, or something else?",
  policy:     "Welcome. I see you're a Policy Analyst. What are you working on — Medicaid waiver analysis, Vermont legislation, federal mandates, or something else?",
  clinician:  "Welcome. I see you're a Clinician. What are you looking into — hospital-at-home, precision medicine, clinical quality, health equity, or something else?",
  economist:  "Welcome. I see you're a Health Economist. What do you need — cost-effectiveness modeling, APM design, actuarial analysis, or something else?",
  tech:       "Welcome. I see you're a Health Tech Professional. What are you working on — AI governance, FHIR interoperability, digital health ROI, or something else?",
  compliance: "Welcome. I see you're a Medicaid / Compliance Officer. What do you need — Vermont Medicaid eligibility rules, Act 167 compliance, regulatory updates, or something else?",
  researcher: "Welcome. I see you're a Student or Researcher. What are you studying — health policy, economics, technology, clinical outcomes, or something else?",
  investor:   "Welcome. I see you're an Investor or Consultant. What are you analyzing — market trends, M&A activity, financial benchmarks, or something else?",
};

export default function WelcomePage() {
  const router = useRouter();
  const [skipExpanded, setSkipExpanded] = useState(false);

  function goStandardNav() {
    try {
      localStorage.setItem("htr-user-role", "all");
      localStorage.removeItem("htr-chat-greeting");
      localStorage.removeItem("htr-chat-history");
    } catch { /* ignore */ }
    router.push("/");
  }

  function goAIChat() {
    try {
      localStorage.setItem("htr-user-role", "all");
      localStorage.removeItem("htr-chat-greeting");
      localStorage.removeItem("htr-chat-history");
    } catch { /* ignore */ }
    router.push("/chat");
  }

  function pick(roleId: string) {
    try {
      localStorage.setItem("htr-user-role", roleId);
      localStorage.setItem("htr-chat-greeting", ROLE_GREETINGS[roleId]);
      localStorage.removeItem("htr-chat-history");
    } catch { /* ignore */ }
    router.push("/chat");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 flex flex-col items-center justify-center px-4 py-4">

      {/* Logo */}
      <div className="mb-3 text-center">
        <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Health Transformation Review
        </span>
      </div>

      {/* Message */}
      <div className="max-w-xl text-center mb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
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

      {/* Skip section */}
      <div className="w-full max-w-3xl mb-2">
        {!skipExpanded ? (
          /* Collapsed: single "Skip" button */
          <button
            onClick={() => setSkipExpanded(true)}
            className="w-full flex items-center gap-3 px-5 py-4 bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-2 border-teal-300 dark:border-teal-600 hover:border-teal-400 dark:hover:border-teal-500 hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900/50 dark:hover:to-cyan-900/50 rounded-xl text-left transition-all group shadow-sm"
          >
            <span className="text-2xl">🌐</span>
            <div>
              <span className="text-sm font-black text-teal-700 dark:text-teal-300 group-hover:text-teal-800 dark:group-hover:text-teal-200 leading-snug">
                Skip — Show Me Everything
              </span>
              <p className="text-xs text-teal-500 dark:text-teal-400 mt-0.5">Browse the full platform without personalization</p>
            </div>
          </button>
        ) : (
          /* Expanded: choose navigation style */
          <div className="border-2 border-teal-300 dark:border-teal-600 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center gap-3 border-b border-teal-200 dark:border-teal-700">
              <span className="text-xl">🌐</span>
              <span className="text-sm font-black text-teal-700 dark:text-teal-300">
                How would you like to explore?
              </span>
              <button
                onClick={() => setSkipExpanded(false)}
                className="ml-auto text-xs text-teal-400 hover:text-teal-600 dark:hover:text-teal-200 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-teal-100 dark:divide-teal-800 bg-white dark:bg-slate-900">
              {/* Option A: Standard nav */}
              <button
                onClick={goStandardNav}
                className="flex flex-col gap-2 px-6 py-5 text-left hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <span className="text-2xl">🗺️</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-300">
                  Browse with navbar & sidebar
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Navigate the platform the traditional way — use the top navbar and left sidebar to explore pillars, tools, and programs at your own pace.
                </p>
              </button>
              {/* Option B: AI chatbox with full grid */}
              <button
                onClick={goAIChat}
                className="flex flex-col gap-2 px-6 py-5 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group"
              >
                <span className="text-2xl">✨</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                  Explore through the AI chatbox
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Get a full map of every pillar, tool, and topic as clickable cards — then dive in by asking the AI anything about what you find.
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Role grid — selecting a role always uses the AI chatbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-3xl">
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

    </div>
  );
}
