import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Rural Health Transformation Program | HTR",
  description:
    "Vermont's $195M FY2026 Rural Health Transformation Program award — the federal capital investment enabling Vermont's Act 68 transformation agenda. Investment categories, strategic rationale, the post-2030 Medicaid cliff, and how RHT funds are being deployed across Vermont's 14-hospital network.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-black uppercase tracking-widest text-teal-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-teal-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

function InvestmentCard({
  icon,
  category,
  amount,
  description,
  outcomes,
}: {
  icon: string;
  category: string;
  amount: string;
  description: string;
  outcomes: string[];
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h4 className="font-bold text-slate-900 text-sm">{category}</h4>
            <span className="text-xs font-black text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              {amount}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 pl-1">
        {outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-teal-500 shrink-0 mt-0.5">→</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VermontRHTProgramPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            Federal Program · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Awarded December 2025
          </span>
          <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            FY2026 – FY2030
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Rural Health Transformation Program
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Vermont's $195 million FY2026 award from the federal Rural Health Transformation Program (H.R. 1, 2025),
          with later years' awards set annually through FY2030 —
          the capital investment funding Vermont's Act 68 transformation infrastructure.
          A five-year fund ($10B a year nationally, FY2026–FY2030, arriving before most of the H.R. 1 cuts) for technology, clinical care redesign,
          EMS, and shared services across Vermont's 14-hospital network.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://www.hrsa.gov/rural-health/rht">
            HRSA RHT Program Overview
          </ExternalLink>
          <ExternalLink href="https://humanservices.vermont.gov">
            Vermont AHS (Program Administrator)
          </ExternalLink>
          <Link
            href="/vermont-act-68"
            className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors text-sm"
          >
            See Act 68 (2025) →
          </Link>
        </div>
      </div>

      {/* ── KEY NUMBERS ───────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="The Award" title="Vermont's RHT Program at a Glance" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox value="$195M" label="Vermont FY2026 Award" sub="Announced Dec 29, 2025 · later years set annually" />
          <StatBox value="$50B" label="National Program" sub="$10B/year FY2026–FY2030" />
          <StatBox value="47" label="States Funded" sub="All state applicants received awards" />
          <StatBox value="5 yrs" label="Program Duration" sub="Front-loaded ahead of the cuts; ends FY2030" />
          <StatBox value="15%" label="Provider Payment Cap" sub="Max % of funds to providers" />
          <StatBox value="$911B" label="Medicaid Cuts (H.R. 1)" sub="10-year CBO estimate — the backdrop" />
          <StatBox value="FY2030" label="RHT Expiration" sub="Medicaid cuts backload after this" />
          <StatBox value="14" label="Vermont Hospitals" sub="All non-profit; all benefit" />
        </div>
      </section>

      {/* ── STRATEGIC FRAMING ─────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Strategic Context" title="Infrastructure Fund, Not Revenue Replacement" />
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
          <blockquote className="text-base font-bold text-teal-900 italic leading-relaxed mb-2">
            "It's the tool that lets us put affordability plans into action."
          </blockquote>
          <div className="text-xs text-teal-700 font-medium">— Vermont AHS Secretary Jenney Samuelson, February 2026 (Manchester Journal)</div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          The federal guidance for the RHT Program is explicit: funds are for technology investments,
          new care delivery activities, and structural transformation — not backfilling provider losses
          from the Medicaid cuts that H.R. 1 simultaneously imposes. Georgetown University's Center
          for Children and Families documented that provider payments are capped at 15% of each
          state's award. Vermont's award — $195M for FY2026 — invested wisely in structural efficiency, positions
          Vermont to absorb post-2030 Medicaid revenue reductions through lower structural costs.
          Invested in operating revenue replacement, it leaves Vermont facing the same Medicaid cliff
          without structural improvements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h4 className="font-bold text-emerald-900 text-sm mb-3 flex items-center gap-2">
              <span>✓</span> RHT Used for Structural Transformation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-800">
              {[
                "AI scribes → expand provider capacity without hiring",
                "Remote patient monitoring → prevent hospitalizations, reduce costs",
                "Shared EMR + VHIE interoperability → enable global budget management",
                "EMS regionalization → reduce ED utilization",
                "Telehealth + e-Consult grants → specialist access without the trip",
                "CIN shared services → reduce administrative overhead",
              ].map((i) => <li key={i} className="flex items-start gap-2"><span className="shrink-0">→</span><span>{i}</span></li>)}
            </ul>
            <p className="text-xs text-emerald-700 font-medium mt-3">
              Result: Vermont absorbs post-2030 Medicaid cuts through efficiency gains
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h4 className="font-bold text-red-900 text-sm mb-3 flex items-center gap-2">
              <span>⚠</span> RHT Used for Revenue Replacement
            </h4>
            <ul className="space-y-2 text-xs text-red-800">
              {[
                "Sustaining unsustainable operating models",
                "Covering Medicaid shortfalls without structural change",
                "Delaying transformation decisions until fund expires",
                "Funding positions that don't reduce long-term cost",
                "Capital for buildings, not care delivery redesign",
                "Revenue replacement for hospitals that won't regionalize",
              ].map((i) => <li key={i} className="flex items-start gap-2"><span className="shrink-0">→</span><span>{i}</span></li>)}
            </ul>
            <p className="text-xs text-red-700 font-medium mt-3">
              Result: Vermont faces Medicaid cliff (2030+) with no structural improvement
            </p>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT CATEGORIES ─────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Investment Strategy" title="How Vermont Is Deploying Its Award" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          Vermont's RHT Program application is notable among the 47 state applications for its
          specificity — structured around five investment categories directly linked to identified
          gaps in Vermont's transformation infrastructure.
        </p>
        <div className="space-y-4">
          <InvestmentCard
            icon="🖥️"
            category="AI Scribe & Clinical Documentation Technology"
            amount="$1.03M first-year grants"
            description="Grants to providers — aimed at smaller, rural, and independent practices that cannot afford what larger practices buy — to purchase AI scribe technology that transcribes clinician–patient conversations and drafts clinical notes and follow-up materials. The application's own claim is 'over two hours' of daily administrative work automated; the strongest published evidence is smaller (below)."
            outcomes={[
              "Measured effect: about 16 fewer documentation minutes per 8 scheduled patient hours (JAMA, 2026); a UCLA randomized trial found a 9.5% cut in time-in-note for one product (NEJM AI, 2025)",
              "Targets the access gap between independent practices and large systems that already license scribes",
              "First-year line: $1,030,000 (JFO, Feb 2026); applications were due June 5, 2026, so effects are not yet measurable",
            ]}
          />
          <InvestmentCard
            icon="📡"
            category="Remote Patient Monitoring (RPM) Equipment"
            amount="$0.9M first-year grants"
            description="Grants for RPM equipment in home health, primary care/specialty, and community paramedicine settings. Vermont's aging population — with high CHF, COPD, and diabetes rates among the 65+ cohort — is precisely the population where RPM produces the largest clinical and financial benefit."
            outcomes={[
              "Prevents hospital admissions and readmissions for Vermont's highest-cost chronic disease populations",
              "Under global budgets, every prevented admission improves margin — RPM becomes a direct financial tool",
              "Monitoring happens in the home, so rural patients avoid repeat trips for routine checks",
              "Used in community paramedicine settings alongside home health and primary/specialty care",
            ]}
          />
          <InvestmentCard
            icon="🌐"
            category="Telehealth & e-Consult Technology"
            amount="Technology grants"
            description="Grants to rural independent practices for secure telehealth platforms, connected diagnostic tools, and related infrastructure — the application states the funds will not be used for broadband — plus a statewide e-Consult platform giving primary care an interoperable route to specialists. Access still depends on connectivity: 80% of Vermonters outside Chittenden County have broadband vs. 85% inside it, and 9.9% of locations lack 100/20 Mbps service (Department of Public Service, 2025)."
            outcomes={[
              "Telehealth platforms, connected diagnostic tools, and technical assistance on selection, cybersecurity, and compliance for independent practices",
              "Statewide e-Consult platform: primary care consults specialists without a separate patient trip",
              "Real-time psychiatric consultation, training, and resources for pediatric and perinatal providers managing mild-to-moderate mental health needs",
            ]}
          />
          <InvestmentCard
            icon="🔗"
            category="Vermont Clinically Integrated Network (CIN) & Shared Services"
            amount="Infrastructure + operations"
            description="Creation of a Clinically Integrated Network linking Vermont's 14 hospitals and community providers into a shared clinical and data infrastructure."
            outcomes={[
              "Shared analytics platform for transformation and regionalization planning across all 14 hospitals",
              "Group purchasing for medical supplies and technology — scale economies individual small hospitals cannot achieve",
              "Administrative shared services: billing, coding, credentialing, HR, IT — directly targets Vermont's $1,303/discharge administrative cost premium",
              "Formal referral network for COE specialty services — operationalizes the regionalization blueprint",
              "AI governance committee for all AI deployments across the CIN network",
            ]}
          />
          <InvestmentCard
            icon="🚑"
            category="EMS Transformation & Community Paramedicine"
            amount="EMS grants"
            description="Vermont licenses about 174 ambulance and first-response services across 13 EMS districts (EMS Advisory Committee, 2020) — fragmentation that complicates transfers (one provider told Oliver Wyman a single transfer can mean calling up to 31 of them) and drives unnecessary ED utilization. RHT funds EMS regionalization and community paramedicine programs that enable treat-and-refer capability, keeping patients out of ED for non-emergency conditions."
            outcomes={[
              "EMS regionalization reduces operational fragmentation across Vermont's EMS services and 13 districts",
              "Community paramedicine: paramedics, Advanced EMTs, and EMTs deliver protocol-driven care in patients' homes under physician/NP oversight",
              "Core services: post-discharge and primary-care follow-up, with modules for surgical recovery or substance use",
              "Scope-of-practice and reimbursement changes, including flexibility to \"triage and treat\" in the community",
            ]}
          />
          <InvestmentCard
            icon="🧬"
            category="Shared EMR & Interoperability"
            amount="Shared EMR + interoperability grants"
            description="Two application lines carry interoperability: incentives for voluntary adoption of a shared EMR that complements and keeps contributing data to the Vermont Health Information Exchange (VHIE), and regionalization grants that may buy tools and technical assistance to connect different EMR systems. Neither line names FHIR or specific vendor platforms."
            outcomes={[
              "Shared EMR: seamless data exchange, better image and lab sharing, stronger cybersecurity, and advanced analytics (application text)",
              "Builds on the VHIE's existing statewide infrastructure rather than replacing it",
              "Regionalization grants can fund EMR-to-EMR interoperability tools and technical assistance",
            ]}
          />
        </div>
      </section>

      {/* ── THE POST-2030 CLIFF ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Risk Analysis" title="The Post-2030 Medicaid Cliff" />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-amber-900 mb-3">The Fiscal Arithmetic</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            KFF's analysis is explicit: the RHT Program is temporary and front-loaded — $10B a year
            nationally from FY2026 through FY2030, arriving before most of the cuts — while nearly
            two-thirds (64%) of the federal Medicaid reductions occur after FY2030. Vermont received
            $195M for FY2026, with later awards set annually until FY2030; the Medicaid cuts accelerate after
            2030 with no offsetting capital fund. States that use RHT for structural transformation
            will be able to absorb post-2030 Medicaid revenue reductions. States that use RHT for
            revenue replacement will face the Medicaid cliff without structural improvement.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 pr-4 text-[10px] font-black uppercase tracking-wide text-slate-500">Period</th>
                <th className="text-left py-3 pr-4 text-[10px] font-black uppercase tracking-wide text-teal-600">RHT Program</th>
                <th className="text-left py-3 text-[10px] font-black uppercase tracking-wide text-red-600">Medicaid Cuts (H.R. 1)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["FY2026", "Active — $10B/year nationally; Vermont: $195M (FY2026 award)", "Modest — work requirements and six-month redeterminations begin Jan 1, 2027"],
                ["FY2027", "Active", "Accelerating — first full year of work requirements and six-month redeterminations"],
                ["FY2028", "Active", "Significant — provider tax caps, state-directed payment restrictions"],
                ["FY2029", "Active", "Significant — full H.R. 1 provisions in effect"],
                ["FY2030", "Final year — fund expires", "Significant — near full run rate of cuts"],
                ["FY2031+", "No RHT funds — program expired", "Full $911B cut trajectory — back-loaded acceleration"],
              ].map(([period, rht, cuts]) => (
                <tr key={period}>
                  <td className="py-3 pr-4 font-bold text-slate-700">{period}</td>
                  <td className="py-3 pr-4 text-teal-700">{rht}</td>
                  <td className="py-3 text-red-700">{cuts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── HTR TOOLS ─────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="HTR Platform" title="Analyze Vermont's RHT Investment" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🏥", label: "Hospital Financial Stress Test", desc: "Model Vermont hospital financials under concurrent RHT investment, RBP, global budgets, and H.R. 1 Medicaid cuts. 10-year projection capability.", href: "/research-lab/policy-quality?tab=scorecard" },
            { icon: "📈", label: "APM Shared Savings Calculator", desc: "Model the financial mechanics of Act 68 global budgets. See how RHT-funded care management investments reduce TCOC below benchmark.", href: "/research-lab/payment-models?tab=apm-calc" },
            { icon: "💻", label: "Digital Health Lab", desc: "Calculate RPM ROI for Vermont's CHF/COPD/diabetes population. Model telehealth utilization impact on ED visits and hospitalizations.", href: "/research-lab/technology-ai?tab=digital" },
            { icon: "⚙️", label: "FHIR Interoperability Lab", desc: "Validate FHIR R4 implementation for Vermont CIN use cases. Test Provider Access API for inter-hospital care coordination.", href: "/research-lab/interoperability?tab=fhir" },
            { icon: "🔗", label: "CIN & Shared Services Modeler", desc: "Model the RHT-funded Clinically Integrated Network: shared billing/coding/credentialing/HR/IT and group purchasing across the 14 hospitals against the $1,303/discharge admin premium.", href: "/research-lab/knowledge-workspace?tab=cin" },
            { icon: "🚑", label: "EMS Transformation Modeler", desc: "Model regionalizing Vermont's 31 EMS agencies and community-paramedicine treat-and-refer ED diversion, with the global-budget margin impact of prevented ED visits.", href: "/research-lab/knowledge-workspace?tab=ems" },
            { icon: "🗺️", label: "Statewide EHR Deployment Modeler", desc: "Model the Act 167 feasibility question — a single statewide EHR vs. FHIR interoperability across Vermont's existing platforms — on 10-year cost, data timeliness, disruption, and lock-in.", href: "/research-lab/interoperability?tab=statewide-ehr" },
          ].map((tool) => (
            <Link key={tool.label} href={tool.href} className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{tool.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">{tool.label}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Related" title="Vermont's Transformation Ecosystem" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: "/vermont-act-68", label: "Vermont Act 68 (2025)", desc: "The mandatory transformation framework that RHT capital is designed to execute.", color: "border-rose-200 hover:border-rose-400" },
            { href: "/ahead-model", label: "AHEAD Model", desc: "The federal all-payer model Vermont signed in January 2025 and withdrew from in July 2026 — Act 68's state mandate now proceeds without a Medicare partner.", color: "border-sky-200 hover:border-sky-400" },
            { href: "/vermont-act-167", label: "Vermont Act 167 (2022)", desc: "The enabling framework that initiated Vermont's reform cascade.", color: "border-violet-200 hover:border-violet-400" },
            { href: "/vermont-vcci", label: "Vermont VCCI", desc: "RHT investment directly funds VCCI care management infrastructure — the intensive case management program for Vermont's top 5% highest-cost Medicaid members.", color: "border-teal-200 hover:border-teal-400" },
            { href: "/vermont-blueprint", label: "Blueprint for Health", desc: "RHT capital funds Community Health Team expansion and Mental Health Integration — the Blueprint programs that receive VCCI medium-risk referrals.", color: "border-emerald-200 hover:border-emerald-400" },
            { href: "/vermont-legislative-resources", label: "Legislative Reports Library", desc: "AHS Act 68 monthly transformation reports track RHT investment milestones and performance against transformation benchmarks.", color: "border-indigo-200 hover:border-indigo-400" },
          ].map((p) => (
            <Link key={p.href} href={p.href} className={`group block bg-white border rounded-xl p-5 transition-all hover:shadow-md ${p.color}`}>
              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">{p.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
