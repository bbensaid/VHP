"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    category: "Platform & Access",
    icon: "🔑",
    items: [
      {
        q: "Is HTR content free to access?",
        a: "We operate on a freemium model. Core news and public policy briefs are free to all registered users. Deep-dive economic models, Clinical and Equity research, Performance Index sub-metric data, and HTR Academy masterclasses require a Professional (Strategist) or Enterprise membership.",
      },
      {
        q: "Do you offer enterprise licenses for health systems and payer organizations?",
        a: "Yes. Enterprise licenses provide multi-seat access, white-labeled reporting, custom API data feeds, quarterly analyst briefings, and priority advisory support. Contact our team at advisory@htr.com for a customized proposal.",
      },
      {
        q: "Can I access historical Performance Index data?",
        a: "Historical Index data — including year-over-year scoring changes by state and pillar — is available to Strategist and Enterprise subscribers. The full 2021–2026 data archive is accessible via the State Dashboard with subscription authentication.",
      },
      {
        q: "Is there a mobile app?",
        a: "HTR is fully responsive and optimized for mobile browsers. A native app is on our 2026 roadmap. Strategist and Enterprise subscribers receive real-time alert notifications via email when a state's Index status changes.",
      },
    ],
  },
  {
    category: "The Six Pillars",
    icon: "🏛️",
    items: [
      {
        q: "Why did HTR expand from three pillars to six?",
        a: "The original HTR framework covered Policy, Economics, and Technology — the three structural levers most visible in federal and state transformation programs. After five years of implementation data, it became clear that Clinical effectiveness, Equity, and Operations each operate as independent structural variables. A health system can achieve strong policy scores and solid economics while delivering clinically ineffective care in inequitable patterns — or failing entirely at the operational execution layer. Clinical, Equity, and Operations are now first-class pillars with their own sub-metrics, weighting, and dedicated principal analysts.",
      },
      {
        q: "What are the six pillars and their guiding questions?",
        a: "Policy ('Is it permissible?') — Regulation, legislation, and governance. Economics ('Is it sustainable?') — Value-based care, workforce investment, and market dynamics. Technology ('Is it possible?') — AI, digital health, and infrastructure. Clinical ('Is it effective?') — Evidence-based care models and population health. Equity ('Is it just?') — SDOH integration, algorithmic bias, and access disparity. Operations ('Is it executable?') — Revenue cycle, workforce capacity, compliance infrastructure, and supply chain readiness.",
      },
      {
        q: "Does HTR cover all six pillars equally in its content library?",
        a: "Our goal is full coverage across all six pillars. Policy and Economics have the deepest historical archives. Technology coverage expanded significantly in 2024 with AI deployment content. Clinical and Equity pillars launched in 2024 and now have dedicated research pipelines. Operations was added as the sixth pillar in 2026, with coverage focused on revenue cycle, workforce capacity, and administrative infrastructure. As of 2026, all six pillars have dedicated principal analysts and quarterly deep-dive publication schedules.",
      },
      {
        q: "How does the Equity pillar differ from existing diversity reporting?",
        a: "The HTR Equity pillar is analytical, not performative. We do not publish diversity dashboards or benchmark representation statistics. Our Equity coverage focuses on three measurable structural issues: SDOH data integration quality and referral completion rates, algorithmic bias in AI clinical tools deployed in rural settings, and the rural-urban mortality and hospitalization disparity gap. Every metric is tied to a specific intervention category that health system leaders can act on.",
      },
    ],
  },
  {
    category: "The Performance Index",
    icon: "📊",
    items: [
      {
        q: "How often is the Performance Index updated?",
        a: "The composite Index score is updated quarterly for all 50 states. Sub-metrics that draw from real-time data sources — including telehealth policy changes and broadband coverage — are updated as source data is released. Annual recalibration of pillar weights occurs each January based on the prior year's evidence review.",
      },
      {
        q: "Can a state's status tier change mid-year?",
        a: "Yes. Status tier changes — from Improving to Stable, for example — can occur at any quarterly update. When a significant change occurs, the state's Dashboard page is flagged and subscribers receive an alert. We document the specific sub-metric driver of every tier change in the changelog.",
      },
      {
        q: "Why are Policy and Economics weighted at 30% each while Equity is only 10%?",
        a: "Current weighting reflects data quality constraints, not a judgment of relative importance. Equity sub-metrics — particularly the algorithmic disparity index — lack consistent state-level reporting infrastructure in approximately 20% of states, which would distort a higher weight. The Equity weight is formally scheduled for review in the 2027 Index update, with a target of 15% weighting as state data coverage reaches ≥90%. Our methodology page documents the full formula and rationale.",
      },
      {
        q: "How do you handle states with missing data in a sub-metric?",
        a: "When a state lacks data for a specific sub-metric, we apply the national median for that metric as a conservative placeholder and flag the state's Dashboard card with a data quality indicator. Missing data does not exclude a state from the Index; it downgrades the confidence rating for that specific sub-metric score.",
      },
    ],
  },
  {
    category: "Editorial Standards",
    icon: "🛡️",
    items: [
      {
        q: "Is HTR funded by pharmaceutical companies, technology vendors, or health lobbies?",
        a: "No. HTR maintains strict editorial independence. Revenue is derived solely from subscriptions, advisory service retainers, and academy masterclass enrollment. We do not accept sponsored content, vendor-funded research, or affiliate arrangements that could influence our assessments. Our advisory engagements are disclosed when relevant to content.",
      },
      {
        q: "How do you source your data?",
        a: "Primary sources include CMS cost reports and quality payment program data, HRSA Area Health Resources Files, FCC broadband data, ONC Health IT Dashboard, CDC WONDER and BRFSS databases, HHS Office for Civil Rights enforcement records, and state legislative tracking databases. We use proprietary normalization methodology to make data comparable across states. Full source documentation is available on the Methodology page.",
      },
      {
        q: "How does HTR handle disagreements between data sources?",
        a: "When primary sources conflict, we document both values and apply a disclosed adjudication methodology — typically weighting the source with broader geographic coverage or more recent collection date. We publish our adjudication decisions in the Index changelog, which is publicly accessible.",
      },
      {
        q: "Does HTR publish political viewpoints?",
        a: "No. HTR analysis is non-partisan by design. Our editorial standard requires that policy analysis presents the evidence — including evidence that challenges prevailing political positions from any direction — without advocacy. We cover CMS rulemaking, state legislation, and federal appropriations purely through the lens of their measurable impact on the five pillar dimensions.",
      },
    ],
  },
  {
    category: "Advisory Services",
    icon: "🤝",
    items: [
      {
        q: "Can I engage HTR analysts for a custom research project?",
        a: "Yes. Our Advisory practice engages health systems, payer organizations, investment firms, and government agencies on custom research sprints of 4–8 weeks. Typical engagements cover market sizing, policy impact analysis, technology due diligence, and value-based contract modeling. Submit an inquiry at advisory@htr.com or through the Contact page.",
      },
      {
        q: "Do HTR analysts serve as expert witnesses or keynote speakers?",
        a: "Yes to both. Our principal analysts have served as expert witnesses in regulatory proceedings and as keynote speakers at ACHE, HIMSS, and state hospital association events. Availability is managed through our Advisory practice. Typical speaker lead time is 6–8 weeks.",
      },
      {
        q: "Does engaging HTR Advisory affect the editorial independence of Index coverage for my organization's state?",
        a: "No. Advisory clients are not identified in our editorial content, and client engagements have no influence on state Performance Index scores. The Index is produced independently by our research team under a firewall from Advisory operations.",
      },
    ],
  },
  {
    category: "HTR Academy",
    icon: "🎓",
    items: [
      {
        q: "What is HTR Academy?",
        a: "HTR Academy is our executive education platform offering masterclasses, faculty-led webinars, a searchable case study library, and a professional glossary. Masterclasses are designed for C-suite and VP-level healthcare leaders and typically run 4–6 hours across asynchronous modules. Strategist subscribers receive a 20% discount on all Academy enrollment.",
      },
      {
        q: "Do Academy masterclasses include continuing education credits?",
        a: "Selected masterclasses are eligible for ACHE Qualified Education credits and state CME/CNE credits depending on content. Credit eligibility is noted on each course listing. We are expanding CE credit partnerships through 2026.",
      },
      {
        q: "Can my organization sponsor a custom masterclass for our leadership team?",
        a: "Yes. Enterprise subscribers can commission custom Academy content — including white-labeled masterclasses built around their specific state, market, or strategic challenge. Delivery can be asynchronous, live virtual, or in-person. Contact advisory@htr.com for a proposal.",
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
          <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
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
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Frequently Asked<br />
            <span className="text-indigo-400">Questions</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Everything you need to know about our methodology, the five-pillar framework, membership tiers, and how to engage our advisory team.
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
                    { label: "Advisory", href: "/advisory/contact" },
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
                  <h2 className="text-xl font-black text-slate-900">
                    {section.category}
                  </h2>
                  <span className="ml-auto text-xs font-bold text-slate-400 border border-slate-200 bg-white px-2 py-0.5 rounded">
                    {section.items.length} questions
                  </span>
                </div>
                <div className="px-8">
                  {section.items.map((item, j) => (
                    <AccordionItem key={j} q={item.q} a={item.a} />
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
                href="/advisory/contact"
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