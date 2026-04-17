import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import VermontReformCascade from "@/components/VermontReformCascade";

export const metadata = {
  title: "Vermont Act 68 (2025) | Health Transformation Review",
  description:
    "Vermont Act 68 of 2025 — the most consequential healthcare legislation in Vermont since the Green Mountain Care Board's creation. Mandates reference-based pricing (FY2027), hospital global budgets (FY2028–2030), and a Statewide Health Care Delivery Strategic Plan by December 2028.",
};

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

function MilestoneRow({
  date,
  status,
  title,
  description,
}: {
  date: string;
  status: "completed" | "active" | "upcoming";
  title: string;
  description: string;
}) {
  const statusStyles = {
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    active: "bg-rose-100 text-rose-700 border-rose-200",
    upcoming: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const dotStyles = {
    completed: "bg-emerald-500",
    active: "bg-rose-500 ring-4 ring-rose-100",
    upcoming: "bg-slate-300",
  };
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${dotStyles[status]}`} />
        <div className="w-px flex-1 bg-slate-200 mt-1" />
      </div>
      <div className="pb-8 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs font-bold text-slate-500">{date}</span>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${statusStyles[status]}`}>
            {status === "completed" ? "Done" : status === "active" ? "In Progress" : "Upcoming"}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-rose-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

function PillarTag({ pillar, note }: { pillar: string; color: string; note: string }) {
  const colors: Record<string, string> = {
    Policy: "bg-sky-50 text-sky-700 border-sky-200",
    Economics: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Technology: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Clinical: "bg-red-50 text-red-700 border-red-200",
    Equity: "bg-violet-50 text-violet-700 border-violet-200",
    Operations: "bg-teal-50 text-teal-700 border-teal-200",
  };
  return (
    <div className={`border rounded-xl p-4 ${colors[pillar] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}>
      <div className="text-[10px] font-black uppercase tracking-widest mb-1">{pillar} Pillar</div>
      <p className="text-xs leading-relaxed">{note}</p>
    </div>
  );
}

export default function VermontAct68Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            State Initiative · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Enacted 2025
          </span>
          <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            Most Consequential VT Legislation Since Act 48 (2011)
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Act 68 (2025)
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Vermont's landmark 2025 healthcare reform legislation — mandating reference-based pricing
          for hospitals, statutory hospital global budgets, and a Statewide Health Care Delivery
          Strategic Plan due December 2028. Act 68 converts years of voluntary payment reform
          into mandatory structural change.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://legislature.vermont.gov/bill/status/2026/H.68">
            Act 68 Legislative History
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov">
            Green Mountain Care Board
          </ExternalLink>
          <ExternalLink href="https://humanservices.vermont.gov">
            Vermont Agency of Human Services
          </ExternalLink>
          <Link
            href="/vermont-act-167"
            className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 underline underline-offset-2 transition-colors text-sm"
          >
            ← See Act 167 (2022)
          </Link>
        </div>
      </div>

      {/* ── KEY NUMBERS ───────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="By the Numbers" title="The Scale of Act 68" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox value="FY2027" label="RBP Effective" sub="Reference-based pricing mandatory" />
          <StatBox value="FY2028" label="Global Budgets" sub="Statutory hospital budgets begin" />
          <StatBox value="Dec 2028" label="Strategic Plan Due" sub="AHS Statewide delivery plan" />
          <StatBox value="$2M" label="Transformation Grants" sub="Authorized for hospitals" />
          <StatBox value="14" label="Hospitals Affected" sub="All Vermont non-profit hospitals" />
          <StatBox value="2.5%" label="FY2026 Spending Reduction" sub="Required commercial rate cut" />
          <StatBox value="-1%" label="FY2027 GMCB Guidance" sub="Commercial rate target" />
          <StatBox value="$911B" label="Federal Medicaid Cuts" sub="H.R. 1 backdrop over 10 years" />
        </div>
      </section>

      {/* ── WHAT ACT 68 DOES ──────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Core Provisions" title="What Act 68 Mandates" />
        <div className="space-y-4">
          {[
            {
              number: "01",
              title: "Reference-Based Pricing (RBP) — Mandatory FY2027",
              body: "Requires hospitals to accept payment at a set percentage of Medicare rates for commercial payers — eliminating the ability of dominant hospitals to charge 250–417% of Medicare. The GMCB developed a price transparency dashboard in February 2026 showing hospital prices ranging from 279% to 697% of Medicare, providing the data foundation for RBP implementation. Commercial insurers must pass RBP savings through to consumers in the form of lower premiums.",
              tag: "Economics Pillar",
            },
            {
              number: "02",
              title: "Hospital Global Budgets — Mandatory FY2028–2030",
              body: "Establishes statutory prospective annual global budgets for Vermont hospitals. Unlike AHEAD (which covers Medicare FFS), Act 68 global budgets apply to all payers. Each hospital receives a fixed prospective budget at the beginning of the year — converting the financial incentive from maximizing volume to managing population health. Non-CAH hospitals must have their budget methodology finalized by GMCB by end of FY2027.",
              tag: "Economics Pillar",
            },
            {
              number: "03",
              title: "Statewide Health Care Delivery Strategic Plan — Due December 2028",
              body: "Directs the Vermont Agency of Human Services to produce a comprehensive Statewide Health Care Delivery Strategic Plan by December 2028, to be submitted to the Vermont Legislature. The plan must specify measurable outcomes for affordability, quality, equity, and access across all six transformation pillars. It must address the 14-hospital tiered network design, Centers of Excellence designation, and population health management infrastructure.",
              tag: "Operations Pillar",
            },
            {
              number: "04",
              title: "AHS Restructuring Mandate",
              body: "Requires AHS to restructure from a program-administration agency to a population health system operator — aligning its organizational design with the geographic Hospital Service Areas used for global budget management. Includes authority for a new Division of Planning and Effectiveness and an HSA Coordinator model to manage cross-agency coordination in each of Vermont's 14 hospital service areas.",
              tag: "Operations Pillar",
            },
            {
              number: "05",
              title: "Administrative Simplification Agenda",
              body: "Initiates a study commission on site-neutral payment reform. Requires hospitals to maintain HIE connectivity (Act 68 mandates hospital connection to VITL/VHIE). Establishes prior authorization reform requirements building on the 2024 CMS Interoperability Rule. Authorizes the Green Mountain Care Board to set administrative overhead benchmarks.",
              tag: "Policy Pillar",
            },
            {
              number: "06",
              title: "Transformation Grants — $2M Authorized",
              body: "Authorizes $2M in Act 68 transformation grants for Vermont hospitals developing transformation plans under the RHRC technical assistance process. Grants support the analytical work, organizational redesign, and care delivery transformation planning that the statutory timeline requires — specifically for hospitals without the internal capacity to conduct this work independently.",
              tag: "Operations Pillar",
            },
          ].map((item) => (
            <div key={item.number} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center shrink-0">
                {item.number}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE REFORM CASCADE ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Legislative Context" title="Vermont's Reform Cascade: 2022–2025" />
        <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-3xl">
          Act 68 is the final act in Vermont's legislatively structured reform cascade. Each act
          built on the institutional capacity and political legitimacy created by its predecessor.
          This sequencing was deliberate: voluntary reform first, then enabling authority, then
          mandatory structural change.
        </p>
        <VermontReformCascade />
      </section>

      {/* ── SIX-PILLAR LENS ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Six-Pillar Analysis" title="Act 68 Through the HTR Framework" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          Act 68 is the rare legislation that touches all six pillars simultaneously — confirming
          the six-pillar framework's analytical premise that structural healthcare reform cannot
          be addressed through a single domain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PillarTag
            pillar="Policy"
            color="sky"
            note="Converts voluntary payment reform to statutory mandate. Removes the opt-out provision that allowed high-cost hospitals to remain outside the global budget framework."
          />
          <PillarTag
            pillar="Economics"
            color="emerald"
            note="RBP eliminates 250–417% of Medicare commercial pricing. Global budgets change hospital financial incentives from volume maximization to population health management."
          />
          <PillarTag
            pillar="Technology"
            color="indigo"
            note="Mandates hospital HIE connectivity (VITL/VHIE). Requires the VHCURES data infrastructure that global budget attribution and TCOC measurement demand."
          />
          <PillarTag
            pillar="Clinical"
            color="red"
            note="Global budget incentives reward primary care investment, care coordination, and preventable hospitalization reduction — the Blueprint for Health model at scale."
          />
          <PillarTag
            pillar="Equity"
            color="violet"
            note="RBP and global budget design must protect CAHs serving the Northeast Kingdom. Act 68 accountability metrics explicitly include health equity measures."
          />
          <PillarTag
            pillar="Operations"
            color="teal"
            note="Mandates AHS restructuring. Requires 14-hospital transformation plans. $2M grants fund the organizational capacity that transformation execution demands."
          />
        </div>
      </section>

      {/* ── DISTINCTION FROM ACT 167 ──────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Context" title="How Act 68 Differs from Act 167" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 pr-6 text-xs font-black uppercase tracking-wide text-slate-500">Dimension</th>
                <th className="text-left py-3 pr-6 text-xs font-black uppercase tracking-wide text-sky-600">Act 167 (2022)</th>
                <th className="text-left py-3 text-xs font-black uppercase tracking-wide text-rose-600">Act 68 (2025)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["Nature", "Enabling framework — authorizes, directs, studies", "Mandate — requires specific outcomes by specific dates"],
                ["Payment reform", "Directs GMCB to develop VBP models", "Mandates RBP (FY2027) and global budgets (FY2028)"],
                ["Hospital participation", "Voluntary engagement encouraged", "Mandatory for all non-CAH hospitals"],
                ["AHS role", "Directs AHEAD Model negotiation", "Requires AHS organizational restructuring"],
                ["Accountability", "Community engagement and reporting", "Statutory deadlines with legislative accountability"],
                ["Financial force", "Study recommendations", "GMCB rate-setting authority with enforcement"],
                ["Timeline pressure", "Aspirational 2028 target", "Legally enforceable December 2028 Strategic Plan deadline"],
              ].map(([dim, act167, act68]) => (
                <tr key={dim}>
                  <td className="py-3 pr-6 font-bold text-slate-700 text-xs">{dim}</td>
                  <td className="py-3 pr-6 text-slate-500 text-xs">{act167}</td>
                  <td className="py-3 text-slate-700 text-xs font-medium">{act68}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FEDERAL CONTEXT: H.R. 1 ───────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Federal Context" title="Act 68 in the H.R. 1 Environment" />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <h4 className="font-bold text-amber-900 mb-2">The Medicaid-RHT Tension</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                H.R. 1 (signed July 4, 2025) imposes $911B in federal Medicaid spending cuts over 10 years —
                including work requirements, biannual eligibility redeterminations, and caps on state provider
                taxes. Vermont's hospitals, already financially fragile, absorb these Medicaid revenue reductions
                at the same time they are executing Act 68 transformation plans. Vermont's $195M Rural Health
                Transformation Program award partially offsets this pressure, but the RHT Program is
                time-limited (FY2026–2030) while Medicaid cuts are permanent and back-loaded after 2030.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-3">What H.R. 1 Means for Act 68</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {[
                "Vermont Medicaid covers ~19% of insured population — Medicaid revenue cuts affect every Vermont hospital's financial position",
                "Work requirements beginning late 2026 may reduce Medicaid enrollment, shrinking the insured base global budgets are designed to manage",
                "Biannual eligibility redeterminations increase DVHA administrative burden during the same period AHS is restructuring",
                "Vermont's RHT Program ($195M) must be invested in structural transformation — not operating revenue replacement — to survive post-2030",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-rose-500 shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Vermont's Framing (AHS Secretary Samuelson)</h4>
            <blockquote className="border-l-4 border-rose-300 pl-4 text-xs text-slate-600 italic leading-relaxed mb-3">
              "The RHT funding is a tool for executing reform, not a substitute for reform."
            </blockquote>
            <p className="text-xs text-slate-500 leading-relaxed">
              If Vermont uses RHT capital to reduce structural costs — AI scribes, RPM, broadband, CIN
              shared services — the efficiency gains position Vermont to absorb post-2030 Medicaid
              reductions. If RHT funds are used to sustain unsustainable operations, Vermont faces
              the Medicaid cliff without structural improvements. Act 68's mandatory transformation
              timeline is the mechanism that forces the former path.
            </p>
          </div>
        </div>
      </section>

      {/* ── HTR TOOLS ─────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="HTR Platform" title="Research Lab Tools for Act 68 Analysis" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          The following Research Lab tools implement the analytical frameworks most relevant to Act 68's
          core mandates. Each tool links to the book chapter that develops the underlying methodology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "📈",
              label: "APM Shared Savings Calculator",
              desc: "Model hospital financial outcomes under Act 68 global budgets. Load the Vermont AHEAD preset to see benchmark methodology, break-even scenarios, and shared savings potential for Vermont hospitals.",
              href: "/research-lab/payment-models?tab=apm-calc",
              chapter: "Chapter 7 — Economics in Practice",
            },
            {
              icon: "🏥",
              label: "Hospital Financial Stress Test",
              desc: "Stress-test hospital financials under RBP, global budgets, and concurrent Medicaid cuts. 10-year projection capability with CAH, Rural PPS, and PPS peer benchmarks.",
              href: "/research-lab/policy-quality?tab=scorecard",
              chapter: "Chapter 6 — Economics Pillar",
            },
            {
              icon: "🏛️",
              label: "Policy Simulator",
              desc: "Model the impact of reference-based pricing at different Medicare multiples. Simulate Medicaid coverage changes under H.R. 1 work requirements for Vermont's enrolled population.",
              href: "/research-lab/policy-quality?tab=policy",
              chapter: "Chapter 4 — Policy Pillar",
            },
            {
              icon: "🏗️",
              label: "APM Design Lab",
              desc: "Design the global budget structure Act 68 requires: configure benchmark methodology, quality risk corridors, and CAH protections for Vermont's 14-hospital network.",
              href: "/research-lab/payment-models?tab=apm-design",
              chapter: "Chapter 7 — Economics in Practice",
            },
            {
              icon: "⚖️",
              label: "Health Equity Studio",
              desc: "Analyze whether Act 68's RBP and global budget design adequately protects high-equity-need populations. HEROI scoring for Vermont's Northeast Kingdom hospitals.",
              href: "/research-lab/population-equity?tab=equity",
              chapter: "Chapter 13 — Equity in Practice",
            },
            {
              icon: "📊",
              label: "VBC Transformation Readiness Assessment",
              desc: "30-dimension assessment across all six pillars. Benchmark your organization's readiness to enter Act 68 global budgets. Identify the operational gaps that must be closed before FY2028.",
              href: "/research-lab/knowledge-workspace?tab=readiness",
              chapter: "Chapter 16 — Advisory Infrastructure",
            },
          ].map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-rose-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{tool.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-rose-700 transition-colors">
                    {tool.label}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2">{tool.desc}</p>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                    {tool.chapter} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── KEY CONCEPTS ──────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Glossary" title="Key Terms in Act 68" />
        <div className="space-y-3">
          {[
            {
              term: "Reference-Based Pricing (RBP)",
              def: "A payment mechanism capping hospital commercial reimbursement at a set multiple of Medicare rates. Act 68 requires GMCB to set this benchmark. Vermont hospital commercial prices currently range from 279%–697% of Medicare; RBP will reduce these toward a regulated ceiling.",
            },
            {
              term: "Hospital Global Budget",
              def: "A prospective annual budget set for each hospital at the beginning of the year, covering all-payer revenue. Hospitals receive their budget amount regardless of utilization volume — converting the financial incentive from maximizing services to managing population health. Vermont's global budgets run FY2028–2030 under Act 68.",
            },
            {
              term: "Statewide Health Care Delivery Strategic Plan",
              def: "The comprehensive plan AHS must deliver to the Vermont Legislature by December 2028. Must include measurable commitments for affordability, quality, equity, and access; the 14-hospital tiered network design; Centers of Excellence designations; and population health management infrastructure investments.",
            },
            {
              term: "Rural Health Transformation (RHT) Program",
              def: "The $50B federal program (FY2026–FY2030) included in H.R. 1 to offset the impact of its Medicaid cuts on rural hospitals. Vermont received $195M. RHT capital is for infrastructure investment (technology, broadband, EMS), not operating revenue replacement.",
            },
            {
              term: "Reform Cascade",
              def: "Vermont's legislatively structured reform sequence: Act 167 (2022) → Act 51 (2023) → Act 55 (2024) → Act 68 (2025). Each act builds on the institutional capacity and political legitimacy created by its predecessor, converting voluntary reform into statutory obligation progressively.",
            },
            {
              term: "RHRC (Rural Health Redesign Center)",
              def: "The technical assistance organization providing transformation planning support to Vermont's 14 hospitals under the Act 68 process. RHRC facilitates the hospital transformation plans that AHS reviews and approves, using Act 68 transformation grant funding.",
            },
          ].map(({ term, def }) => (
            <div key={term} className="bg-white border border-slate-100 rounded-xl p-4">
              <dt className="font-bold text-slate-900 text-sm mb-1">{term}</dt>
              <dd className="text-xs text-slate-500 leading-relaxed">{def}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED PAGES ─────────────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Related" title="Continue Your Research" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: "/vermont-act-167", label: "Vermont Act 167", desc: "The enabling framework that started Vermont's reform cascade in 2022.", color: "border-violet-200 hover:border-violet-400" },
            { href: "/ahead-model", label: "AHEAD Model", desc: "Vermont's federal all-payer global budget agreement — the Medicare partner to Act 68's state mandate.", color: "border-sky-200 hover:border-sky-400" },
            { href: "/vermont-medicaid", label: "Vermont Medicaid", desc: "Medicaid program details, H.R. 1 impact analysis, and Vermont's Medicaid transformation agenda.", color: "border-emerald-200 hover:border-emerald-400" },
          ].map((p) => (
            <Link key={p.href} href={p.href} className={`group block bg-white border rounded-xl p-5 transition-all hover:shadow-md ${p.color}`}>
              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-rose-700 transition-colors">{p.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
