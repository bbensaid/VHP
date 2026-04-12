import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// ── Helpers ───────────────────────────────────────────────────────────────────

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 underline underline-offset-2 transition-colors"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-black uppercase tracking-widest text-rose-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

// ── Program card ──────────────────────────────────────────────────────────────

function ProgramCard({
  name,
  tagline,
  who,
  incomePct,
  incomeNote,
  color,
  badge,
}: {
  name: string;
  tagline: string;
  who: string;
  incomePct: string;
  incomeNote: string;
  color: string;
  badge: string;
}) {
  return (
    <div className={`bg-white border ${color} rounded-xl p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${badge}`}>
          {name}
        </span>
      </div>
      <p className="font-bold text-slate-900 text-sm mb-1">{tagline}</p>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">{who}</p>
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-800">{incomePct}</span>
          <span className="text-xs text-slate-500">of Federal Poverty Level</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">{incomeNote}</p>
      </div>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-black text-rose-700">{value}</div>
      <div className="text-xs text-slate-500 mt-1 leading-snug max-w-[120px] mx-auto">{label}</div>
    </div>
  );
}

// ── Step card ─────────────────────────────────────────────────────────────────

function StepCard({
  step,
  title,
  description,
  cta,
  ctaHref,
  external,
}: {
  step: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  external?: boolean;
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
      <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center shrink-0">
        {step}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{description}</p>
        <a href={ctaHref} {...linkProps} className="text-xs font-bold text-rose-600 hover:text-rose-800 underline underline-offset-2">
          {cta} {external && <ArrowTopRightOnSquareIcon className="inline w-3 h-3 mb-0.5" />}
        </a>
      </div>
    </div>
  );
}

// ── Income table row ──────────────────────────────────────────────────────────

function IncomeRow({
  household,
  fpl100,
  fpl138,
  fpl208,
  fpl317,
}: {
  household: string;
  fpl100: string;
  fpl138: string;
  fpl208: string;
  fpl317: string;
}) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-2.5 px-4 text-sm font-semibold text-slate-700">{household}</td>
      <td className="py-2.5 px-4 text-sm text-slate-600 text-center">{fpl100}</td>
      <td className="py-2.5 px-4 text-sm text-rose-700 font-medium text-center">{fpl138}</td>
      <td className="py-2.5 px-4 text-sm text-amber-700 font-medium text-center">{fpl208}</td>
      <td className="py-2.5 px-4 text-sm text-emerald-700 font-medium text-center">{fpl317}</td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function VermontMedicaidPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-rose-50 to-slate-50 border border-rose-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            State Program · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Updated 2026
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Over 200,000 Vermonters Enrolled
          </span>
        </div>

        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Medicaid & CHIP
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Vermont's publicly funded health coverage programs provide free or low-cost insurance
          to eligible residents — including children, adults, pregnant women, seniors, and people
          with disabilities. Vermont administers Medicaid through the Department of Vermont Health
          Access (DVHA) and enrolls eligible residents through Vermont Health Connect (HBEE).
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/medicaid-eligibility-simulator"
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Check My Eligibility →
          </Link>
          <Link
            href="/academy/medicaid"
            className="bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Learn Center
          </Link>
          <ExternalLink href="https://healthconnect.vermont.gov">
            <span className="text-sm font-bold">Apply at VT Health Connect</span>
          </ExternalLink>
        </div>
      </div>

      {/* ── KEY STATS ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200 rounded-2xl p-8 mb-12">
        <StatPill value="207K+" label="Vermonters enrolled in Medicaid & CHIP" />
        <StatPill value="26%" label="of Vermont's total population covered" />
        <StatPill value="6" label="distinct program categories for different life situations" />
        <StatPill value="317%" label="FPL maximum for children under Dr. Dynasaur" />
      </div>

      {/* ── PROGRAMS ─────────────────────────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeader label="Coverage Programs" title="Vermont Medicaid Programs at a Glance" />
        <p className="text-sm text-slate-500 mb-6 -mt-4">
          Vermont operates several distinct Medicaid categories. Eligibility depends on age, income, household size, disability status, and residency. Most programs use MAGI-based income rules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProgramCard
            name="Medicaid for Adults"
            tagline="Standard coverage for working-age adults"
            who="Adults age 19–64 without Medicare. Covers doctor visits, hospital care, prescriptions, mental health, substance use treatment, dental, and vision."
            incomePct="≤ 138%"
            incomeNote="~$20,780/yr for a single adult (2026 estimate)"
            color="border-rose-200 hover:border-rose-400"
            badge="bg-rose-100 text-rose-700"
          />
          <ProgramCard
            name="Dr. Dynasaur"
            tagline="Comprehensive coverage for children"
            who="Children age 0–18 (and pregnant women). Vermont's flagship children's health program covers preventive care, dental, vision, mental health, and all acute care services."
            incomePct="≤ 317%"
            incomeNote="~$95,400/yr for a family of 4 (2026 estimate)"
            color="border-sky-200 hover:border-sky-400"
            badge="bg-sky-100 text-sky-700"
          />
          <ProgramCard
            name="Pregnant Women"
            tagline="Full coverage through postpartum year"
            who="Pregnant women and those up to 12 months postpartum. Vermont expanded postpartum coverage to a full 12 months in 2022. Covers all prenatal, delivery, and postpartum care."
            incomePct="≤ 208%"
            incomeNote="~$31,200/yr for a single woman (2026 estimate)"
            color="border-violet-200 hover:border-violet-400"
            badge="bg-violet-100 text-violet-700"
          />
          <ProgramCard
            name="Choices for Care"
            tagline="Long-term services & supports (LTSS)"
            who="Adults 65+ or physically disabled adults who need nursing-facility-level care but wish to remain at home or in the community. Covers personal care aides, adult day, and residential care."
            incomePct="Functional"
            incomeNote="Income limit ~300% SSI ($2,742/mo individual, 2026)"
            color="border-teal-200 hover:border-teal-400"
            badge="bg-teal-100 text-teal-700"
          />
          <ProgramCard
            name="AABD Medicaid"
            tagline="Aged, blind & disabled adults"
            who="Vermont residents who are age 65+, blind, or have a qualifying disability and receive SSI or have low income/assets. Covers all standard Medicaid benefits plus long-term care."
            incomePct="≤ 100%"
            incomeNote="~$15,060/yr for an individual (SSI-level, 2026)"
            color="border-amber-200 hover:border-amber-400"
            badge="bg-amber-100 text-amber-700"
          />
          <ProgramCard
            name="Vermont Premium Assistance"
            tagline="Employer insurance cost-sharing"
            who="Individuals who have access to employer-sponsored insurance. Vermont may pay premiums and cost-sharing if employer coverage is cost-effective compared to full Medicaid enrollment."
            incomePct="≤ 300%"
            incomeNote="Available for those with qualifying employer offers"
            color="border-indigo-200 hover:border-indigo-400"
            badge="bg-indigo-100 text-indigo-700"
          />
        </div>
      </div>

      {/* ── 2026 INCOME TABLE ─────────────────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeader label="2026 Income Guidelines" title="Monthly Income Limits by Household Size" />
        <p className="text-xs text-slate-500 mb-4 -mt-4">
          Based on 2026 Federal Poverty Level guidelines. MAGI-based income rules apply to most programs. Asset tests apply only to AABD and Choices for Care.{" "}
          <ExternalLink href="https://dvha.vermont.gov/members/vermont-medicaid-benefits">
            Official DVHA guidelines
          </ExternalLink>
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wide text-slate-500">Household Size</th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wide text-slate-500 text-center">100% FPL<br /><span className="text-[10px] font-normal">(AABD)</span></th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wide text-rose-600 text-center">138% FPL<br /><span className="text-[10px] font-normal">(Adults)</span></th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wide text-amber-600 text-center">208% FPL<br /><span className="text-[10px] font-normal">(Pregnant)</span></th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wide text-emerald-600 text-center">317% FPL<br /><span className="text-[10px] font-normal">(Dr. Dynasaur)</span></th>
              </tr>
            </thead>
            <tbody>
              <IncomeRow household="1 person"   fpl100="$1,255/mo" fpl138="$1,732/mo" fpl208="$2,611/mo" fpl317="$3,979/mo" />
              <IncomeRow household="2 people"   fpl100="$1,703/mo" fpl138="$2,350/mo" fpl208="$3,542/mo" fpl317="$5,399/mo" />
              <IncomeRow household="3 people"   fpl100="$2,152/mo" fpl138="$2,970/mo" fpl208="$4,476/mo" fpl317="$6,821/mo" />
              <IncomeRow household="4 people"   fpl100="$2,601/mo" fpl138="$3,590/mo" fpl208="$5,410/mo" fpl317="$8,245/mo" />
              <IncomeRow household="5 people"   fpl100="$3,050/mo" fpl138="$4,209/mo" fpl208="$6,344/mo" fpl317="$9,669/mo" />
              <IncomeRow household="6 people"   fpl100="$3,498/mo" fpl138="$4,827/mo" fpl208="$7,276/mo" fpl317="$11,090/mo" />
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          * Income figures are estimates based on 2026 FPL guidelines. Actual limits are set annually by CMS and DVHA. Always verify at{" "}
          <ExternalLink href="https://dvha.vermont.gov">dvha.vermont.gov</ExternalLink>.
        </p>
      </div>

      {/* ── HOW TO APPLY ─────────────────────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeader label="Enrollment" title="How to Apply for Vermont Medicaid" />
        <p className="text-sm text-slate-500 mb-6 -mt-4">
          Vermont uses a single, unified application process for all Medicaid programs through the
          Vermont Health Benefits Exchange (HBEE), operated by Vermont Health Connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StepCard
            step="1"
            title="Check your eligibility"
            description="Use our free Medicaid Eligibility Simulator to get an instant preliminary determination based on your household size, income, age, and circumstances."
            cta="Open the Eligibility Simulator"
            ctaHref="/medicaid-eligibility-simulator"
          />
          <StepCard
            step="2"
            title="Gather your documents"
            description="You will need: proof of Vermont residency, Social Security numbers for all household members, proof of income (pay stubs, tax returns), and citizenship/immigration documents."
            cta="Document checklist (DVHA)"
            ctaHref="https://dvha.vermont.gov/members/applying-for-vermont-medicaid"
            external
          />
          <StepCard
            step="3"
            title="Submit your application"
            description="Apply online at Vermont Health Connect (fastest), by phone at 1-855-899-9600, by mail, or in person at any Vermont Department for Children and Families (DCF) office."
            cta="Apply at VT Health Connect"
            ctaHref="https://healthconnect.vermont.gov"
            external
          />
          <StepCard
            step="4"
            title="Receive your determination"
            description="Vermont processes most Medicaid applications within 45 days (90 days for disability-based cases). You will receive a written notice. If approved, coverage may be retroactive to your application date."
            cta="Check application status"
            ctaHref="https://healthconnect.vermont.gov"
            external
          />
        </div>
      </div>

      {/* ── KEY CONTACTS ─────────────────────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeader label="Resources" title="Key Contacts & Resources" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              org: "Vermont Health Connect (HBEE)",
              role: "Online application portal for all Vermont health coverage",
              phone: "1-855-899-9600",
              url: "https://healthconnect.vermont.gov",
            },
            {
              org: "Dept. of Vermont Health Access (DVHA)",
              role: "State agency managing Medicaid policy and benefits",
              phone: "1-800-250-8427",
              url: "https://dvha.vermont.gov",
            },
            {
              org: "VT Legal Aid",
              role: "Free legal help with Medicaid denials and appeals",
              phone: "1-800-889-2047",
              url: "https://www.vtlegalaid.org",
            },
            {
              org: "2-1-1 Vermont",
              role: "Statewide resource hotline for health and human services",
              phone: "Dial 2-1-1",
              url: "https://www.211vt.org",
            },
            {
              org: "Vermont Aging & Disabilities Resource Connection",
              role: "Choices for Care enrollment and LTSS navigation",
              phone: "1-800-642-5119",
              url: "https://ahs.vermont.gov/adrc",
            },
            {
              org: "VT Office of the Health Care Advocate",
              role: "Independent advocate for Vermonters having trouble with health coverage",
              phone: "1-800-917-7787",
              url: "https://healthcareadvocate.vermont.gov",
            },
          ].map((c) => (
            <div key={c.org} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-rose-200 hover:shadow-sm transition-all">
              <p className="text-xs font-black uppercase tracking-wide text-rose-600 mb-1">{c.phone}</p>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{c.org}</h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{c.role}</p>
              <ExternalLink href={c.url}>
                <span className="text-xs">Visit website</span>
              </ExternalLink>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <div className="bg-slate-950 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-black text-sm mb-1">Check Your Eligibility</h3>
            <p className="text-xs text-slate-400 mb-3">Answer a few questions and get an instant preliminary answer.</p>
            <Link href="/medicaid-eligibility-simulator" className="text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-2">
              Open Simulator →
            </Link>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-black text-sm mb-1">Learn About Medicaid</h3>
            <p className="text-xs text-slate-400 mb-3">Courses, webinars, case studies, and a complete Medicaid glossary.</p>
            <Link href="/academy/medicaid" className="text-xs font-bold text-sky-400 hover:text-sky-300 underline underline-offset-2">
              Visit Learning Center →
            </Link>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-black text-sm mb-1">Ask the AI Analyst</h3>
            <p className="text-xs text-slate-400 mb-3">Ask specific questions about your situation — available 24/7.</p>
            <Link href="/chat" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
              Ask AI →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
