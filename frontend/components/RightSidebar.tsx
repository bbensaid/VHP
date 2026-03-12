"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const SUGGESTED_QUESTIONS = [
  "Summarize the latest RHTP guidelines.",
  "How do global budgets impact rural hospitals?",
  "Explain the workforce gap trends in 2024.",
];

export default function RightSidebar() {
  const router = useRouter();

  const handleQuestionClick = (question: string) => {
    // Store the pre-filled question in sessionStorage so /chat can pick it up
    // without exposing it in the URL.
    sessionStorage.setItem("htr-prefill-question", question);
    router.push("/chat");
  };

  return (
    <aside className="w-full flex flex-col gap-4 pt-4" aria-label="AI Analyst panel">
      {/* ── Ask a question card ─────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <SparklesIcon className="w-4 h-4 text-indigo-500" aria-hidden="true" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">
            AI Analyst
          </h3>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            Ask questions about policy, reimbursement models, or workforce
            trends.
          </p>

          {/* Suggested questions */}
          <div className="flex flex-col gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleQuestionClick(q)}
                className="text-left text-xs text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-lg px-3 py-2.5 transition-all leading-snug"
              >
                {q}
              </button>
            ))}
          </div>

          {/* CTA to full chat page */}
          <Link
            href="/chat"
            className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <SparklesIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Open Full Chat
            <ArrowRightIcon className="w-3 h-3 ml-auto opacity-60" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}