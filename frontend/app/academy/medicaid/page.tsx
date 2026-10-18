import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Medicaid Learning Center | HTR Academy",
  description: "Dedicated learning hub for Medicaid policy, financing, managed care, 1115 waivers, and state-specific Medicaid transformation — built for Medicaid directors and health plan leaders.",
};

// ── Card components ───────────────────────────────────────────────────────────
// 2026-10-17: the earlier course, webinar and case-study cards described courses that did not exist and
// sessions attributed to DVHA and the Health Care Advocate that never took place. They were removed; the
// courses below are the published Academy courses.

function CourseCard({
  title,
  href,
  description,
  scope,
}: {
  title: string;
  href: string;
  description: string;
  scope: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white border-2 border-sky-200 hover:border-sky-400 rounded-xl p-5 hover:shadow-md transition-all flex flex-col"
    >
      <span className="text-[10px] text-slate-400 font-medium mb-2">{scope}</span>
      <h3 className="font-black text-slate-900 text-sm mb-2 leading-snug">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{description}</p>
      <span className="text-xs font-bold text-sky-600">Open the course →</span>
    </Link>
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
          Academy courses on how Medicaid works, an eligibility simulator, a glossary, and links to the
          state agencies that run Vermont Medicaid.
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
          <h2 className="text-2xl font-black text-slate-900 mt-1">Academy Medicaid Courses</h2>
          <p className="text-sm text-slate-500 mt-2">
            Self-paced Academy courses. Vermont&apos;s own programs and income tables are on the{" "}
            <Link href="/vermont-medicaid" className="text-sky-600 underline underline-offset-2">Vermont Medicaid</Link> page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CourseCard
            title="Medicaid 101: How America's Safety Net Works"
            href="/academy/tracks/medicaid-101"
            scope="6 tracks · 9 lessons"
            description="Origins, who Medicaid covers, MAGI eligibility, the post-COVID unwinding, FMAP financing, managed care, Section 1115 and HCBS waivers, and quality oversight."
          />
          <CourseCard
            title="Medicaid Managed Care Operations"
            href="/academy/tracks/medicaid-managed-care-operations"
            scope="6 tracks · 17 lessons"
            description="Why states move to managed care, 42 CFR Part 438, MCO procurement and oversight, actuarial rate-setting, risk adjustment, MLR, and network adequacy."
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
