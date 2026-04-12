import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// ── Card components ───────────────────────────────────────────────────────────

function CourseCard({
  title,
  level,
  duration,
  description,
  topics,
  color,
  badge,
}: {
  title: string;
  level: string;
  duration: string;
  description: string;
  topics: string[];
  color: string;
  badge: string;
}) {
  return (
    <div className={`bg-white border-2 ${color} rounded-xl p-5 hover:shadow-md transition-all flex flex-col`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${badge}`}>
          {level}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">{duration}</span>
      </div>
      <h3 className="font-black text-slate-900 text-sm mb-2 leading-snug">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{description}</p>
      <ul className="space-y-1 mb-4">
        {topics.map((t) => (
          <li key={t} className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
            {t}
          </li>
        ))}
      </ul>
      <Link
        href="/chat"
        className="text-xs font-bold text-sky-600 hover:text-sky-800 underline underline-offset-2"
      >
        Explore with AI Analyst →
      </Link>
    </div>
  );
}

function WebinarCard({
  title,
  date,
  presenter,
  description,
  tags,
}: {
  title: string;
  date: string;
  presenter: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-300 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-2.5 py-1 rounded border border-sky-100">
          Webinar
        </span>
        <span className="text-[11px] text-slate-400 font-medium">{date}</span>
      </div>
      <h3 className="font-bold text-slate-900 text-sm mb-1 leading-snug">{title}</h3>
      <p className="text-[11px] text-slate-400 mb-2">{presenter}</p>
      <p className="text-xs text-slate-500 leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({
  title,
  subject,
  summary,
  keyTakeaways,
  color,
}: {
  title: string;
  subject: string;
  summary: string;
  keyTakeaways: string[];
  color: string;
}) {
  return (
    <div className={`bg-white border-2 ${color} rounded-xl p-6`}>
      <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Case Study</span>
      <p className="text-[11px] text-slate-400 font-medium mt-0.5 mb-3">{subject}</p>
      <h3 className="font-black text-slate-900 text-base mb-3 leading-snug">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{summary}</p>
      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">Key Takeaways</h4>
      <ul className="space-y-1.5">
        {keyTakeaways.map((t) => (
          <li key={t} className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-rose-500 mt-0.5 shrink-0 font-bold">→</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function MedicaidLearningCenterPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            Academy · Learn
          </span>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-rose-200">
            Vermont Medicaid
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Medicaid<br />Learning Center
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Everything you need to understand Vermont Medicaid — from foundational concepts to
          advanced enrollment strategy. Courses, webinars, case studies, and a complete glossary
          built specifically for Vermont residents, healthcare navigators, and policy professionals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/medicaid-eligibility-simulator" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
            Check Eligibility →
          </Link>
          <Link href="/academy/medicaid/glossary" className="bg-white hover:bg-sky-50 border border-sky-300 text-sky-700 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
            Medicaid Glossary
          </Link>
          <Link href="/vermont-medicaid" className="bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
            Program Overview
          </Link>
        </div>
      </div>

      {/* ── COURSES ──────────────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600">Courses</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Self-Paced Learning Modules</h2>
          <p className="text-sm text-slate-500 mt-2">
            Structured courses covering Vermont Medicaid from first principles to advanced scenarios.
            Each module includes readings, income calculators, and knowledge checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CourseCard
            title="Vermont Medicaid 101: Programs, Eligibility & Benefits"
            level="Beginner"
            duration="45 min"
            description="A complete introduction to Vermont's Medicaid ecosystem. Understand the difference between Dr. Dynasaur, AABD, Choices for Care, and standard adult Medicaid — and who each program is designed to serve."
            topics={[
              "History of Vermont Medicaid and the role of DVHA",
              "Six main Vermont Medicaid programs explained",
              "How MAGI income rules work",
              "What benefits are covered vs. excluded",
              "Difference between Medicaid and Medicare",
            ]}
            color="border-sky-200 hover:border-sky-400"
            badge="bg-sky-100 text-sky-700"
          />
          <CourseCard
            title="Navigating the HBEE Application Process"
            level="Intermediate"
            duration="60 min"
            description="A step-by-step guide to applying for Vermont Medicaid through the Health Benefits Exchange (HBEE) and Vermont Health Connect. Covers online, phone, and in-person enrollment, document requirements, and common pitfalls to avoid."
            topics={[
              "Vermont Health Connect online application walkthrough",
              "Required documents for each program type",
              "Special enrollment periods and life events",
              "Understanding your Notice of Decision",
              "How to appeal a denial",
            ]}
            color="border-rose-200 hover:border-rose-400"
            badge="bg-rose-100 text-rose-700"
          />
          <CourseCard
            title="Choices for Care: Long-Term Services & Supports"
            level="Intermediate"
            duration="50 min"
            description="Vermont's Choices for Care program allows seniors and people with disabilities to receive long-term care in their homes or communities instead of nursing facilities. This course covers functional eligibility, benefit levels, and the waiver structure."
            topics={[
              "What is nursing-facility level of care (NFLOC)?",
              "Activities of Daily Living (ADL) assessment",
              "Moderate vs. highest needs benefit levels",
              "Home-based vs. residential care options",
              "Financial eligibility and asset test",
            ]}
            color="border-teal-200 hover:border-teal-400"
            badge="bg-teal-100 text-teal-700"
          />
          <CourseCard
            title="Income & Asset Rules: MAGI vs. Non-MAGI Pathways"
            level="Advanced"
            duration="75 min"
            description="An in-depth course on how Vermont calculates Medicaid income and assets. Covers the two major methodological pathways — MAGI-based (ACA) and non-MAGI (traditional) — their differences, allowable deductions, and practical implications for eligibility."
            topics={[
              "MAGI vs. non-MAGI methodology compared",
              "What counts as household income under MAGI",
              "SSI income rules for AABD and Choices for Care",
              "Asset limits and excluded resources",
              "Income disregards and deductions",
            ]}
            color="border-amber-200 hover:border-amber-400"
            badge="bg-amber-100 text-amber-700"
          />
        </div>
      </div>

      {/* ── WEBINARS ─────────────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600">Webinars</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Expert Sessions & Recorded Events</h2>
          <p className="text-sm text-slate-500 mt-2">
            Live and recorded sessions from Vermont Medicaid experts, navigators, and policy specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WebinarCard
            title="2026 Vermont Medicaid Income Limit Updates: What Changed and Why"
            date="January 2026"
            presenter="DVHA Policy Team"
            description="A review of the 2026 Federal Poverty Level adjustments and how they affect eligibility thresholds for each Vermont Medicaid program. Includes updated income charts and a live Q&A segment."
            tags={["Income Limits", "FPL", "2026 Updates", "DVHA"]}
          />
          <WebinarCard
            title="Dual Eligibility in Vermont: Maximizing Medicare & Medicaid Benefits"
            date="February 2026"
            presenter="Vermont Health Care Advocate"
            description="Over 30,000 Vermonters qualify for both Medicare and Medicaid ('dual eligibles'). This session explains how coordination works, which costs Medicaid covers for dual eligibles, and how to apply for Medicare Savings Programs."
            tags={["Medicare", "Dual Eligible", "MSP", "Cost-Sharing"]}
          />
          <WebinarCard
            title="Using VT Health Connect as a Certified Navigator or Assister"
            date="March 2026"
            presenter="Vermont Health Connect Training"
            description="Designed for community health workers, social workers, and certified application counselors. Covers the navigator role, system navigation tools, common enrollment errors, and escalation procedures."
            tags={["Navigator", "Enrollment", "HBEE", "Training"]}
          />
        </div>
      </div>

      {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600">Case Studies</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Real-World Vermont Stories</h2>
          <p className="text-sm text-slate-500 mt-2">
            Anonymized case studies illustrating how Vermont families and individuals navigate the Medicaid system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaseStudyCard
            title="A Family's Journey Through the HBEE Application"
            subject="Household of 4 · Lamoille County · 2025"
            summary="A married couple with two children ages 7 and 14 experienced a sudden job loss. This case study follows their application from an initial eligibility check through enrollment in Dr. Dynasaur for the children and adult Medicaid for the parents — including the documentation challenges and a successful appeal after an initial denial for one parent."
            keyTakeaways={[
              "Self-employment income documentation was the primary denial trigger",
              "The appeal process added 38 days but resulted in full approval",
              "Children enrolled under Dr. Dynasaur within 5 days of application",
              "Retroactive coverage applied to the application date, covering a hospital visit",
            ]}
            color="border-sky-200"
          />
          <CaseStudyCard
            title="Vermont's Postpartum Medicaid Expansion: One Year In"
            subject="Policy Analysis · Statewide · 2023–2024"
            summary="In 2022, Vermont extended postpartum Medicaid coverage from 60 days to a full 12 months. This case study examines the state's implementation, the populations reached, impact on maternal mortality and morbidity outcomes, and lessons for other states considering similar expansions."
            keyTakeaways={[
              "Vermont was among the first 10 states to implement the ARP 12-month postpartum option",
              "Approximately 2,400 Vermonters benefited in the first year of the extension",
              "Mental health and substance use treatment utilization rose 34% in the postpartum period",
              "Vermont Act 167 cross-pillar alignment supported rapid implementation",
            ]}
            color="border-violet-200"
          />
        </div>
      </div>

      {/* ── QUICK-ACCESS TOOLS ───────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600">Tools</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Quick Access</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              emoji: "🎯",
              label: "Eligibility Simulator",
              desc: "Check which programs you qualify for in 5 steps",
              href: "/medicaid-eligibility-simulator",
              color: "hover:border-rose-300",
            },
            {
              emoji: "📖",
              label: "Medicaid Glossary",
              desc: "30+ terms defined — MAGI, FPL, HBEE, and more",
              href: "/academy/medicaid/glossary",
              color: "hover:border-sky-300",
            },
            {
              emoji: "🏛️",
              label: "Program Hub",
              desc: "Full Vermont Medicaid program overview & income tables",
              href: "/vermont-medicaid",
              color: "hover:border-rose-300",
            },
            {
              emoji: "🤖",
              label: "Ask the AI",
              desc: "Get answers to specific Medicaid questions instantly",
              href: "/chat",
              color: "hover:border-indigo-300",
            },
          ].map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className={`bg-white border border-slate-200 ${tool.color} rounded-xl p-4 hover:shadow-sm transition-all`}
            >
              <div className="text-2xl mb-2">{tool.emoji}</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{tool.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── EXTERNAL RESOURCES ───────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-slate-900 mb-4">Official Vermont Medicaid Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Vermont Health Connect — Online Application", url: "https://healthconnect.vermont.gov" },
            { label: "DVHA — Vermont Medicaid Benefits & Eligibility", url: "https://dvha.vermont.gov/members/vermont-medicaid-benefits" },
            { label: "Vermont Legal Aid — Medicaid Appeals Help", url: "https://www.vtlegalaid.org" },
            { label: "VT Office of the Health Care Advocate", url: "https://healthcareadvocate.vermont.gov" },
            { label: "Aging & Disability Resource Connection (ADRC)", url: "https://ahs.vermont.gov/adrc" },
            { label: "Vermont 2-1-1 Health & Human Services Hotline", url: "https://www.211vt.org" },
          ].map((r) => (
            <a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2.5 hover:border-sky-200 transition-colors group"
            >
              <span className="text-xs font-medium text-slate-700 group-hover:text-sky-700 transition-colors">
                {r.label}
              </span>
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
