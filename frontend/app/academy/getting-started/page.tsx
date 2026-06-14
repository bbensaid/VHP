import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, BeakerIcon, SparklesIcon, MicrophoneIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Getting Started | HTR Academy",
  description: "Everything you need to get productive on the HTR platform in under 30 minutes.",
};

const ROLES = [
  { id: "executive",  label: "Hospital / Health System Executive", icon: "🏥", href: "/academy/getting-started#executive" },
  { id: "policy",     label: "Policy Analyst / Government Official", icon: "🏛️", href: "/academy/getting-started#policy" },
  { id: "clinician",  label: "Clinician (MD, NP, PA)", icon: "🩺", href: "/academy/getting-started#clinician" },
  { id: "economist",  label: "Health Economist / Actuary", icon: "📊", href: "/academy/getting-started#economist" },
  { id: "tech",       label: "Health Tech Professional", icon: "💻", href: "/academy/getting-started#tech" },
  { id: "compliance", label: "Medicaid / Compliance Officer", icon: "📋", href: "/academy/getting-started#compliance" },
  { id: "researcher", label: "Student / Researcher", icon: "🎓", href: "/academy/getting-started#researcher" },
  { id: "investor",   label: "Investor / Consultant", icon: "💼", href: "/academy/getting-started#investor" },
];

const FEATURE_GUIDES = [
  {
    icon: SparklesIcon,
    color: "indigo",
    title: "AI Analyst",
    desc: "How to ask research questions, get platform navigation help, and use voice mode.",
    href: "/academy/getting-started/ai-analyst",
  },
  {
    icon: BeakerIcon,
    color: "sky",
    title: "Research Lab",
    desc: "A guide to all 21 modeling tools — which one to use and when.",
    href: "/academy/getting-started/research-lab",
  },
  {
    icon: MicrophoneIcon,
    color: "violet",
    title: "Voice Interface",
    desc: "Hands-free navigation, AI queries, and platform control.",
    href: "/academy/getting-started/voice",
  },
  {
    icon: AcademicCapIcon,
    color: "emerald",
    title: "HTR Academy",
    desc: "Courses, webinars, case studies, learning tracks, and your credential path.",
    href: "/academy/getting-started/academy",
  },
];

const FIRST_STEPS = [
  {
    step: "01",
    title: "Set your role",
    body: "Go to the Welcome page and click your role. This personalizes the AI Analyst and surfaces the content most relevant to your work. Takes 10 seconds.",
    href: "/welcome",
    cta: "Go to Welcome page",
  },
  {
    step: "02",
    title: "Ask the AI Analyst your first question",
    body: "The AI Analyst knows the entire platform. Ask it your real question — whatever brought you to HTR. It will answer and guide you to the right tools and pages.",
    href: "/chat",
    cta: "Open AI Analyst",
  },
  {
    step: "03",
    title: "Read your role guide",
    body: "Scroll down on this page and find your role. Each guide gives you the 5 best destinations, 3 key workflows, and a tool reference tailored to your profession.",
    href: "#role-guides",
    cta: "See role guides below",
  },
  {
    step: "04",
    title: "Explore the Research Lab",
    body: "The Research Lab has 22 interactive modeling tools. The hub page gives you an overview — start there and follow the links to the tools most relevant to your work.",
    href: "/research-lab",
    cta: "Open Research Lab",
  },
  {
    step: "05",
    title: "Bookmark your key tools",
    body: "Click the bookmark icon on any page or tool to save it to My Library. Build your personal research center as you explore.",
    href: "/saved",
    cta: "View My Library",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">

      {/* Page header */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 block mb-0.5">HTR Academy</span>
          <h1 className="text-xl font-bold tracking-tight">Getting Started</h1>
          <p className="text-sm text-slate-400 mt-0.5 max-w-2xl">
            Everything you need to get productive on HTR — in under 30 minutes.
          </p>
        </div>
      </div>

      {/* Your first 5 steps */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Your First 5 Steps</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
          Follow these in order and you will be productive on HTR within 30 minutes, regardless of your role.
        </p>
        <div className="space-y-4">
          {FIRST_STEPS.map((item) => (
            <div key={item.step} className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="shrink-0">
                <span className="text-3xl font-black text-slate-200 dark:text-slate-700">{item.step}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-slate-900 dark:text-slate-100 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{item.body}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  {item.cta}
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature guides */}
      <section className="bg-slate-50 dark:bg-slate-800/30 border-y border-slate-100 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Feature Guides</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
            Deep-dive references for the platform's four main features. Read these after your first session.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURE_GUIDES.map((guide) => {
              const Icon = guide.icon;
              const colorMap: Record<string, string> = {
                indigo: "text-indigo-600 bg-indigo-100 dark:bg-indigo-950/40",
                sky:    "text-sky-600 bg-sky-100 dark:bg-sky-950/40",
                violet: "text-violet-600 bg-violet-100 dark:bg-violet-950/40",
                emerald:"text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40",
              };
              return (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[guide.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {guide.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{guide.desc}</p>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role guides */}
      <section id="role-guides" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Role-Specific Quick-Start Guides</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
          Select your role for a tailored guide: your 5 best destinations, 3 key workflows, and a research tool reference.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROLES.map((role) => (
            <Link
              key={role.id}
              href={role.href}
              className="flex items-center gap-3 px-5 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all group"
            >
              <span className="text-xl">{role.icon}</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 leading-snug">
                {role.label}
              </span>
              <ArrowRightIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors ml-auto shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick reference */}
      <section className="bg-slate-50 dark:bg-slate-800/30 border-y border-slate-100 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Quick Reference</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
            The most important URLs on the platform — save these or ask the AI Analyst to navigate you to any of them.
          </p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {[
              { label: "Welcome / Role Selection", url: "/welcome" },
              { label: "AI Analyst (full screen)", url: "/chat" },
              { label: "Research Lab", url: "/research-lab" },
              { label: "HTR Transformation Simulator", url: "/htr-simulator" },
              { label: "50-State Dashboard", url: "/dashboard" },
              { label: "The Wire (live news)", url: "/the-wire" },
              { label: "HTR Academy", url: "/academy" },
              { label: "Personalized Learning", url: "/academy/personalized-learning" },
              { label: "Glossary", url: "/academy/glossary" },
              { label: "My Library (bookmarks)", url: "/saved" },
              { label: "HTR Connect (community)", url: "/connect" },
              { label: "Advisory Hub", url: "/advisory-hub" },
              { label: "Global Search", url: "/search" },
              { label: "Six-Pillar Framework", url: "/about/framework" },
              { label: "Account & Subscription", url: "/account" },
              { label: "FAQ", url: "/faq" },
            ].map(({ label, url }) => (
              <div key={url} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                <Link href={url} className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline">
                  {url}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard shortcuts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Keyboard Shortcuts</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">Power-user shortcuts to navigate the platform faster.</p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 max-w-2xl">
          {[
            { keys: "⌘K", action: "Open command palette (search everything)" },
            { keys: "⌘⇧V", action: "Toggle voice input / AI Analyst voice mode" },
            { keys: "⌘/", action: "Open global search" },
            { keys: "Esc", action: "Close modals and panels" },
            { keys: "Enter", action: "Send AI Analyst message" },
            { keys: "⇧Enter", action: "New line in AI Analyst message" },
          ].map(({ keys, action }) => (
            <div key={keys} className="flex items-center gap-4 py-2 border-b border-slate-100 dark:border-slate-700">
              <kbd className="shrink-0 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-600 min-w-[4rem] text-center">
                {keys}
              </kbd>
              <span className="text-sm text-slate-600 dark:text-slate-400">{action}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <div className="inline-flex items-center gap-2 mb-4 text-sm text-slate-400">
          <BookOpenIcon className="w-4 h-4" />
          <span>Still have questions?</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">Ask the AI Analyst</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          It knows everything on this page and more. Ask it &ldquo;How do I get started on HTR as a [your role]?&rdquo; and it will guide you.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
        >
          <SparklesIcon className="w-4 h-4" />
          Open AI Analyst
        </Link>
      </section>

    </div>
  );
}
