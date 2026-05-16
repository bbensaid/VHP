import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Rural Health Transformation Program | HTR",
  description:
    "Vermont's $195M Rural Health Transformation Program award — the federal capital investment enabling Vermont's Act 68 transformation agenda. Investment categories, strategic rationale, the post-2030 Medicaid cliff, and how RHT funds are being deployed across Vermont's 14-hospital network.",
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
          Vermont's $195 million award from the federal Rural Health Transformation Program (H.R. 1, 2025) —
          the capital investment funding Vermont's Act 68 transformation infrastructure.
          Five-year, front-loaded fund (FY2026–FY2030) for technology, clinical care redesign,
          broadband, EMS, and shared services across Vermont's 14-hospital network.
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
          <StatBox value="$195M" label="Vermont Total Award" sub="December 2025" />
          <StatBox value="$50B" label="National Program" sub="$10B/year FY2026–FY2030" />
          <StatBox value="47" label="States Funded" sub="All state applicants received awards" />
          <StatBox value="5 yrs" label="Program Duration" sub="Front-loaded; expires FY2030" />
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
            "The RHT funding is a tool for executing reform, not a substitute for reform."
          </blockquote>
          <div className="text-xs text-teal-700 font-medium">— Vermont AHS Secretary Samuelson</div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          The federal guidance for the RHT Program is explicit: funds are for technology investments,
          new care delivery activities, and structural transformation — not backfilling provider losses
          from the Medicaid cuts that H.R. 1 simultaneously imposes. Georgetown University's Center
          for Children and Families documented that provider payments are capped at 15% of each
          state's total award. Vermont's $195M, invested wisely in structural efficiency, positions
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
                "FHIR infrastructure → enable global budget management",
                "EMS regionalization → reduce ED utilization",
                "Broadband → enable telehealth at scale",
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
        <SectionHeader label="Investment Strategy" title="How Vermont Is Deploying the $195M" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          Vermont's RHT Program application is notable among the 47 state applications for its
          specificity — structured around five investment categories directly linked to identified
          gaps in Vermont's transformation infrastructure.
        </p>
        <div className="space-y-4">
          <InvestmentCard
            icon="🖥️"
            category="AI Scribe & Clinical Documentation Technology"
            amount="Technology grants"
            description="Grants for rural and independent practices to purchase AI scribe technology — systems that listen to clinical encounters and automatically generate structured clinical documentation. Vermont's RHT application cites AI scribes automating over two hours of daily administrative work per clinician."
            outcomes={[
              "Addresses Vermont's projected 370 primary care FTE shortage by 2030 — each AI scribe recovers ~25% of a provider's clinical time",
              "Reduces clinician burnout, a primary driver of provider attrition in rural Vermont",
              "Enables billing process improvement and clinical decision support simultaneously",
              "CIN enterprise contract negotiated for all 14 hospitals — better economics than individual purchases",
            ]}
          />
          <InvestmentCard
            icon="📡"
            category="Remote Patient Monitoring (RPM) Equipment"
            amount="RPM grants"
            description="Grants for RPM equipment in home health, primary care/specialty, and community paramedicine settings. Vermont's aging population — with high CHF, COPD, and diabetes rates among the 65+ cohort — is precisely the population where RPM produces the largest clinical and financial benefit."
            outcomes={[
              "Prevents hospital admissions and readmissions for Vermont's highest-cost chronic disease populations",
              "Under global budgets, every prevented admission improves margin — RPM becomes a direct financial tool",
              "Eliminates 2-hour round trips for rural patients requiring twice-weekly monitoring",
              "Community paramedicine integration enables EMTs to provide extended home care with physician telehealth supervision",
            ]}
          />
          <InvestmentCard
            icon="🌐"
            category="Broadband Infrastructure & Telehealth Expansion"
            amount="Infrastructure grants"
            description="Vermont's broadband penetration is 80% in rural areas vs. 85% non-rural — a gap that makes home-based telehealth inaccessible for 20% of rural Vermonters. RHT funds close this gap and expand specialty telehealth access at rural hospitals, allowing COE specialists to consult remotely."
            outcomes={[
              "Enables home-based telehealth for the 20% of rural Vermonters currently without broadband access",
              "Specialty consultations (neurology, psychiatry, oncology) at rural hospitals via telehealth — no patient transfer required",
              "Tele-ICU support for rural hospitals managing critical patients before stabilization and transfer",
              "Tele-behavioral health for CCBHC and community mental health services — expands capacity without adding clinicians",
            ]}
          />
          <InvestmentCard
            icon="🔗"
            category="Vermont Clinically Integrated Network (CIN) & Shared Services"
            amount="Infrastructure + operations"
            description="Creation of a Clinically Integrated Network linking Vermont's 14 hospitals and community providers into a shared clinical and data infrastructure. Vermont is one of four states (with Arkansas, Nevada, and Oregon) that explicitly included CIN creation in their RHT applications."
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
            description="Vermont has 31 separate EMS agencies — extreme fragmentation that creates care coordination gaps and drives unnecessary ED utilization. RHT funds EMS regionalization and community paramedicine programs that enable treat-and-refer capability, keeping patients out of ED for non-emergency conditions."
            outcomes={[
              "EMS regionalization reduces operational fragmentation across Vermont's 31 separate EMS agencies",
              "Community paramedicine: EMTs provide extended care in patients' homes, reducing 911 calls and ED visits",
              "Treat-and-refer capability for appropriate conditions — major source of preventable ED utilization reduction",
              "Real-time physician supervision via telehealth during community paramedicine encounters",
            ]}
          />
          <InvestmentCard
            icon="🧬"
            category="FHIR Interoperability & Health IT Infrastructure"
            amount="IT advance funds"
            description="RHT IT advance investments specifically target FHIR compliance gaps at smaller community hospitals (TruBridge, Meditech legacy) and community-based providers that lack FHIR-capable systems. Vermont's global budgets require real-time attribution and TCOC tracking that current systems cannot support."
            outcomes={[
              "Upgrades smaller CAHs to FHIR R4 compliance — prerequisite for CIN care coordination use cases",
              "Provider access API implementation: care coordinators at one hospital can query records from another in real time",
              "Attribution accuracy for AHEAD global budgets — FHIR enables more precise patient tracking across providers",
              "Shared technical staff through CIN for facilities without internal IT capacity",
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
            KFF's analysis of H.R. 1 is explicit: the RHT Program is temporary and front-loaded,
            while nearly two-thirds of the Medicaid spending reductions are back-loaded after FY2030.
            Vermont receives $195M over five years ending FY2030; the Medicaid cuts accelerate after
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
                ["FY2026", "Active — $10B/year nationally; Vermont: $39M/year est.", "Modest — work requirements phasing in late 2026"],
                ["FY2027", "Active", "Accelerating — eligibility redeterminations every 6 months"],
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

      {/* ── COMPARISON TO OTHER STATES ────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="National Context" title="Vermont vs. Peer RHT Recipients" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          Vermont is one of four states that explicitly included Clinically Integrated Network
          creation in their RHT applications — reflecting a national trend toward CINs as the
          organizational vehicle for rural health system integration. This approach distinguishes
          Vermont from states using RHT for more dispersed, hospital-by-hospital investments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { state: "Vermont", award: "$195M", approach: "CIN-first, system-level transformation. All 14 hospitals coordinated through RHRC technical assistance. AHS restructuring as system operator. Act 68 transformation mandate provides the mandatory framework.", color: "border-teal-200 bg-teal-50" },
            { state: "Arkansas", award: "Est. comparable", approach: "Also included CIN creation. Rural hospital network integration with shared services focus. Medicaid expansion in place since 2013 — different policy context.", color: "border-slate-200 bg-white" },
            { state: "Nevada", award: "Est. comparable", approach: "CIN creation included. High rural population with significant frontier health challenges. Focus on telehealth and workforce development.", color: "border-slate-200 bg-white" },
            { state: "Oregon", award: "Est. comparable", approach: "CIN creation included. CCO model provides an existing all-payer coordination infrastructure that Vermont's AHEAD Model parallels.", color: "border-slate-200 bg-white" },
          ].map((s) => (
            <div key={s.state} className={`border rounded-xl p-5 ${s.color}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">{s.state}</h4>
                <span className="text-xs font-black text-teal-700">{s.award}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{s.approach}</p>
            </div>
          ))}
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
            { href: "/ahead-model", label: "AHEAD Model", desc: "Vermont's federal all-payer global budget — the Medicare partner to Act 68's state mandate.", color: "border-sky-200 hover:border-sky-400" },
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
