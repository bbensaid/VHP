"use client";
import { useBrand } from "@/components/BrandContext";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Rewritten 2026-11-23. The earlier FAQ described a "Performance Index" that is not
// computed, subscriber alerts and an index archive that do not exist, ACHE/CME/CNE
// credit that HTR is not accredited to award, and analyst credentials (expert witness,
// ACHE/HIMSS keynotes) with no record behind them. Rule: every answer must be true of
// the platform as it ships, or point to a page where the reader can check it.
const faqs = [
  {
    category: "Platform & Access",
    icon: "🔑",
    items: [
      {
        q: "What is Health Transformation Review?",
        a: "An integrated ecosystem built on one book. The book (16 chapters, readable online, as audio, and as a PDF) sets out the five-pillar framework and applies it to Vermont's reform. The Academy turns it into 25 courses. The Research Lab offers more than thirty interactive tools — calculators, simulators and evidence libraries — tagged to the chapters they support. Around them sit the RHT Program Review, policy briefings, Vermont program pages and the AI Analyst.",
      },
      {
        q: "Who can use the platform today?",
        a: "The platform is in an invitation-only testing phase. Access is by access code; features and content may change while testing continues. To request access, write to {CONTACT}.",
      },
      {
        q: "What does it cost?",
        a: "Plans and prices are listed on the Pricing page.",
      },
      {
        q: "Does the Academy award continuing-education credit?",
        a: "No. HTR is not an accredited provider of CME, CNE or ACHE credit. Academy courses issue an HTR completion certificate, which can be verified online, but it is not a continuing-education credit.",
      },
    ],
  },
  {
    category: "The Five Pillars and the Equity Imperative",
    icon: "🏛️",
    items: [
      {
        q: "Why five pillars?",
        a: "Because health system transformation fails along five distinct structural fault lines. Policy determines what is permissible. Technology determines what is possible. Economics determines what is sustainable. Clinical determines what is effective. Operations determines whether it can be executed at scale. They are load-bearing in that order: the later pillars rest on the ones built before them. Chapter 1 of the book sets out the dependencies and the execution sequence.",
      },
      {
        q: "What are the five pillars, their guiding questions, and the Equity Imperative?",
        a: "Policy ('Is it permissible?') — regulation, legislation and governance. Technology ('Is it possible?') — data infrastructure, interoperability and AI. Economics ('Is it sustainable?') — payment models, budgets and pricing. Clinical ('Is it effective?') — care models, quality and population health. Operations ('Is it executable?') — workforce, revenue cycle, compliance and execution capacity. The Equity Imperative ('Is it just?') is not a sixth pillar: it is the test applied to each of the five.",
      },
      {
        q: "Is HTR a scoring index or a ranking of states?",
        a: "No. HTR does not compute a composite score or rank states. The state dashboards show published indicators, each with its source and year; the Methodology page lists them. Where the platform assesses readiness — for example, Vermont's pillar gates — it shows the evidence for each judgement rather than a number.",
      },
    ],
  },
  {
    category: "Sources and Standards",
    icon: "🛡️",
    items: [
      {
        q: "Where do the numbers come from?",
        a: "From primary and published sources that are named where the number appears — CMS and other federal data, state statutes and agency reports (in Vermont, the Green Mountain Care Board and the Agency of Human Services), peer-reviewed studies, and the Oliver Wyman Act 167 report. Teaching tools that use illustrative inputs say so on the page. The Methodology page describes the state indicators.",
      },
      {
        q: "What happens when a fact changes or is wrong?",
        a: "It is corrected. The platform is reviewed against current sources, and content that cannot be confirmed is removed rather than kept. If you find an error, write to {CONTACT} with the page and the source.",
      },
      {
        q: "Does HTR take political positions?",
        a: "No. As the book's Preface puts it, it is not a policy brief for or against any particular agenda. Analysis presents the evidence — including evidence that cuts against prevailing positions — through the five pillars and the Equity Imperative.",
      },
    ],
  },
  {
    category: "HTR Academy",
    icon: "🎓",
    items: [
      {
        q: "What is the HTR Academy?",
        a: "The learning arm of the platform: 25 self-paced courses organised into tracks and lessons, each tied to the book chapter it teaches. Courses include quizzes and progress tracking, and finishing a course issues a completion certificate.",
      },
      {
        q: "How do Academy courses relate to the book?",
        a: "Each course names its source chapter, and each chapter's 'Work This Chapter on the Platform' section points to the courses and Research Lab tools that apply it.",
      },
    ],
  },
  {
    category: "Working With HTR",
    icon: "🤝",
    items: [
      {
        q: "Can HTR support my organization's transformation work?",
        a: "Yes — write to {CONTACT} with a short description of the question you are working on. The book's chapters and the Research Lab tools are a good way to frame it first.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-700 transition-colors">
          {q}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180 text-indigo-600" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-slate-600 ty-body leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const { contactEmail } = useBrand();
  const contactHref = `mailto:${contactEmail}`;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : faqs;

  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-indigo-700 text-white py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-5 block">
            FAQ
          </span>
          <h1 className="ty-h1-xl font-black tracking-tight mb-6">
            Frequently Asked<br />
            <span className="text-indigo-400">Questions</span>
          </h1>
          <p className="ty-hero text-slate-300 max-w-2xl leading-relaxed">
            What the platform is, where its numbers come from, how the five-pillar framework works, and how to reach us.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── STICKY SIDEBAR ─────────────────────────────────────────── */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-4">
                Browse by Topic
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                    activeCategory === null
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  All Topics
                </button>
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => setActiveCategory(f.category === activeCategory ? null : f.category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                      activeCategory === f.category
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{f.icon}</span>
                    {f.category}
                  </button>
                ))}
              </nav>

              {/* Quick links */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-4">
                  Key Resources
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Methodology", href: "/about/methodology" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Subscribe", href: "/subscribe" },
                    { label: "Contact", href: contactHref },
                  ].map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span className="text-indigo-300">→</span>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── FAQ CONTENT ────────────────────────────────────────────── */}
          <main className="flex-1 space-y-8">
            {filteredFaqs.map((section) => (
              <div
                key={section.category}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="ty-h3 font-black text-slate-900">
                    {section.category}
                  </h2>
                  <span className="ml-auto text-xs font-bold text-slate-400 border border-slate-200 bg-white px-2 py-0.5 rounded">
                    {section.items.length} questions
                  </span>
                </div>
                <div className="px-8">
                  {section.items.map((item, j) => (
                    <AccordionItem key={j} q={item.q} a={item.a.replaceAll("{CONTACT}", contactEmail)} />
                  ))}
                </div>
              </div>
            ))}

            {/* ── STILL HAVE QUESTIONS ─────────────────────────────── */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-xl font-black mb-2">Still have questions?</h3>
              <p className="text-indigo-200 text-sm mb-6 max-w-md mx-auto">
                Our advisory team responds to substantive inquiries within 48 business hours. For urgent research needs, note your timeline in the project details field.
              </p>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3 rounded-lg font-black hover:bg-indigo-50 transition-colors"
              >
                Contact the Team →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}