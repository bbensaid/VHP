"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ROLE_CONTENT, type RoleContent } from "@/lib/roleContent";

export default function StartPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleContent | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("htr-user-role") || "other";
    setRole(ROLE_CONTENT[saved] ?? ROLE_CONTENT["other"]);
  }, []);

  function changeRole() {
    localStorage.removeItem("htr-user-role");
    router.push("/welcome");
  }

  function copyPrompt() {
    if (!role) return;
    navigator.clipboard.writeText(role.aiPrompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!role) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">Your Personalized Start</p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {role.headline}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{role.tagline}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={changeRole}
                className="text-xs text-slate-400 hover:text-indigo-600 underline underline-offset-2 transition-colors"
              >
                Change my role
              </button>
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-indigo-600 underline underline-offset-2 transition-colors"
              >
                Show me everything
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Content — takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">

            {/* Start Here */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                Start Here
              </h2>
              <div className="space-y-3">
                {role.content.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
                  >
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Analyst prompt */}
            <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-6">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-4 h-4 text-indigo-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Ask the AI Analyst
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Your AI Analyst is primed for your role. Try this question to get started:
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700 mb-3">
                <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                  "{role.aiPrompt}"
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/chat?prompt=${encodeURIComponent(role.aiPrompt)}`}
                  className="flex-1 text-center text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors"
                >
                  Open in AI Analyst →
                </Link>
                <button
                  onClick={copyPrompt}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 border border-indigo-300 dark:border-indigo-700 rounded-lg px-3 py-2 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Tools — right column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                🔬 Your HTR Lab Tools
              </h2>
              <div className="space-y-3">
                {role.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group"
                  >
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      {tool.title}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {tool.description}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/research-lab"
                className="mt-4 block text-center text-xs text-slate-400 hover:text-indigo-600 underline underline-offset-2 transition-colors"
              >
                View all 35 tools →
              </Link>
            </div>

            {/* Quick links */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                Quick Links
              </h2>
              <div className="space-y-2">
                {[
                  { label: "The Wire — Live News", href: "/the-wire" },
                  { label: "Academy & Learning", href: "/academy" },
                  { label: "Vermont Programs", href: "/vermont-medicaid" },
                  { label: "Advisory Services", href: "/advisory" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    → {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
