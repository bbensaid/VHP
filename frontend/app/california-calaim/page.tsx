import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// ── Shared UI helpers ─────────────────────────────────────────────────────────

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

function PressCard({
  publication, date, title, summary, href,
}: { publication: string; date: string; title: string; summary: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">{publication}</span>
        <span className="text-[11px] text-slate-400 font-medium">{date}</span>
      </div>
      <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-teal-800 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{summary}</p>
    </a>
  );
}

function PillarCard({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-teal-200 hover:shadow-sm transition-all">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-bold text-slate-900 text-sm mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-teal-100 text-center">
      <div className="text-3xl font-black text-teal-700 mb-1">{value}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div>
      {sub && <div className="text-[10px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CaliforniaCalAIMPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            State Initiative · California
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            CMS Approved Dec 29, 2021
          </span>
          <span className="bg-teal-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            $6.7B Federal Investment
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-2 leading-tight">
          CalAIM
        </h1>
        <p className="text-lg font-bold text-teal-700 mb-4">
          California Advancing and Innovating Medi-Cal
        </p>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          The most ambitious Medicaid transformation in California history — a whole-person care
          model that dismantles the wall between medical and social services, directing the largest
          state Medicaid program in the nation to address housing, nutrition, behavioral health,
          and the social determinants that drive 80% of health outcomes.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://www.dhcs.ca.gov/calaim">
            DHCS CalAIM Official Hub
          </ExternalLink>
          <ExternalLink href="https://www.dhcs.ca.gov/Documents/DHCS-CalAIM-Proposal-01072021.pdf">
            CalAIM Proposal (PDF)
          </ExternalLink>
          <ExternalLink href="https://www.medicaid.gov/medicaid/section-1115-demonstration/downloads/ca-medi-cal-2020-ca.pdf">
            CMS Section 1115 Waiver
          </ExternalLink>
          <ExternalLink href="https://medi-cal.ca.gov">
            Medi-Cal.ca.gov
          </ExternalLink>
        </div>
      </div>

      {/* ── BY THE NUMBERS ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Scale" title="California at a Glance" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatBox value="14M+" label="Medi-Cal Enrollees" sub="~1 in 3 Californians" />
          <StatBox value="$6.7B" label="New Federal Funding" sub="2022–2026 (initial)" />
          <StatBox value="58" label="Counties Implementing" sub="All California counties" />
          <StatBox value="14" label="Community Supports" sub="Non-medical services authorized" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox value="1115" label="Waiver Authority" sub="CMS Section 1115" />
          <StatBox value="2022" label="Effective Date" sub="January 1, 2022" />
          <StatBox value="~40%" label="Californians on Medi-Cal" sub="Nation's largest Medicaid" />
          <StatBox value="5yr" label="Initial Waiver Term" sub="Extended through 2027" />
        </div>
      </section>

      {/* ── WHAT IS CalAIM ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Background" title="What Is CalAIM and Why Does It Matter?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">The Problem CalAIM Addresses</h3>
            <p className="ty-body text-slate-600 leading-relaxed mb-3">
              For decades, California's Medi-Cal program paid for sick care but could not pay for
              the conditions that make people sick in the first place. A person experiencing
              homelessness could receive an ER visit but not a housing navigation service. A patient
              with diabetes could get insulin but not a meal delivery program.
            </p>
            <p className="ty-body text-slate-600 leading-relaxed">
              CalAIM breaks that wall. For the first time in California's Medicaid history, managed
              care plans can now pay for <strong>non-medical services</strong> — housing, nutrition,
              transportation, environmental modifications, and more — as covered Medi-Cal benefits
              for the highest-need enrollees.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">What Came Before: Whole Person Care</h3>
            <p className="ty-body text-slate-600 leading-relaxed mb-3">
              CalAIM builds directly on California's 2016–2022{" "}
              <strong>Whole Person Care (WPC) pilots</strong> — county-run programs that demonstrated
              that integrated medical, behavioral, and social services for people experiencing
              homelessness reduced ER visits, hospitalizations, and costs.
            </p>
            <p className="ty-body text-slate-600 leading-relaxed">
              WPC's success across 25 counties gave DHCS and Governor Newsom the evidence base to
              take the model statewide — and to negotiate the $6.7B federal investment with CMS
              that makes CalAIM possible at scale.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
          <h3 className="font-bold text-teal-900 mb-3">The Three Overarching Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Improve Quality & Reduce Disparities",
                detail: "Standardize quality measures across all Medi-Cal managed care plans and use data to target resources toward populations with the worst health outcomes — particularly communities of color, rural populations, and justice-involved individuals.",
              },
              {
                title: "Whole-Person Care",
                detail: "Align physical health, behavioral health (mental health and substance use), oral health, and social services under a unified care model — ending the siloed approach that drives unnecessary hospitalizations and chronic disease burden.",
              },
              {
                title: "Reduce Complexity, Increase Flexibility",
                detail: "Simplify the Medi-Cal delivery system by standardizing managed care contracts statewide and giving counties and plans the flexibility to innovate — while holding them accountable for measurable health outcomes.",
              },
            ].map((g) => (
              <div key={g.title} className="bg-white rounded-lg p-4 border border-teal-100">
                <div className="font-bold text-teal-800 text-sm mb-2">{g.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{g.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY PILLARS ──────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Program Components" title="The Six Pillars of CalAIM" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <PillarCard
            icon="🏠"
            title="Enhanced Care Management (ECM)"
            detail="Intensive, in-person care management for the highest-need, highest-cost Medi-Cal members: people experiencing homelessness, those with serious mental illness, people leaving incarceration, high-risk pregnant women, and children in foster care. A dedicated care manager coordinates all medical, behavioral, and social services."
          />
          <PillarCard
            icon="🥦"
            title="Community Supports"
            detail="14 non-medical services that Medi-Cal managed care plans can now authorize as covered benefits — including housing deposits, housing navigation, short-term post-hospitalization housing, meal delivery, asthma remediation, transportation, and environmental accessibility modifications."
          />
          <PillarCard
            icon="🧠"
            title="Behavioral Health Integration"
            detail="Major reform of how California finances and delivers specialty mental health services (SMHS) and substance use disorder (SUD) treatment — moving toward a 'no wrong door' model where members can access behavioral health through their Medi-Cal managed care plan without being routed to separate county systems."
          />
          <PillarCard
            icon="🦷"
            title="Dental Transformation"
            detail="Landmark expansion of Medi-Cal dental benefits — restoring adult dental coverage that had been eliminated during the 2009 recession, adding periodontal care, and establishing population-level oral health quality metrics. Affects 14M Californians who had limited or no dental coverage."
          />
          <PillarCard
            icon="⚖️"
            title="Justice-Involved Populations"
            detail="First-in-the-nation federal approval for California to provide Medi-Cal benefits to incarcerated individuals 90 days before release — covering medication, care coordination, and behavioral health services during the highest-risk transition period back to the community. Targets over 50,000 individuals annually."
          />
          <PillarCard
            icon="📊"
            title="Population Health Management"
            detail="Requires all Medi-Cal managed care plans to develop and implement population health management strategies — using data to identify high-risk enrollees before they hit crisis, stratify populations by risk, and deploy proactive interventions that prevent avoidable utilization."
          />
        </div>

        {/* Community Supports detail */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">All 14 Community Supports — A Historic First</h3>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            For the first time in U.S. Medicaid history, California won CMS approval to pay for
            these non-medical services through managed care for high-need enrollees:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {[
              "Housing transition navigation services",
              "Housing deposits (security, first/last month's rent)",
              "Housing tenancy & sustaining services",
              "Short-term post-hospitalization housing",
              "Recuperative care (medical respite)",
              "Day habilitation programs",
              "Nursing facility transition / diversion to assisted living",
              "Community transition services",
              "Sobering centers",
              "Respite services (for caregivers)",
              "Meal/nutrition assistance",
              "Transportation to social services",
              "Asthma remediation (home-based environmental fixes)",
              "Environmental accessibility adaptations",
            ].map((s, i) => (
              <div key={s} className="flex items-start gap-2 py-1.5 border-b border-slate-50">
                <span className="text-teal-500 font-black text-xs shrink-0 w-5 pt-0.5">{i + 1}.</span>
                <span className="text-sm text-slate-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET POPULATIONS ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Who It Serves" title="Target Populations" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              color: "bg-slate-800",
              label: "People Experiencing Homelessness",
              detail: "California has the largest unhoused population in the U.S. — over 180,000. CalAIM's ECM program provides dedicated care managers who meet people where they are: on the street, in shelters, in motels. Community Supports fund the housing deposits and navigation services that ECM care managers cannot provide alone.",
              stat: "180K+",
              statLabel: "Californians unhoused",
            },
            {
              color: "bg-teal-700",
              label: "People with Serious Mental Illness or SUD",
              detail: "California's behavioral health crisis intersects directly with homelessness, incarceration, and emergency department overuse. CalAIM's behavioral health integration reforms create financial incentives for counties and managed care plans to work together on the highest-acuity cases — rather than passing them back and forth.",
              stat: "1.3M+",
              statLabel: "Medi-Cal members with SMI/SUD",
            },
            {
              color: "bg-teal-600",
              label: "Justice-Involved Individuals",
              detail: "Without healthcare coverage at release, formerly incarcerated people face a 12-fold increase in overdose death risk in the first two weeks of freedom. California's groundbreaking 90-day pre-release Medi-Cal benefit — the first CMS ever approved for any state — addresses this deadly gap with medication management, behavioral health, and care coordination starting before the cell door opens.",
              stat: "50K+",
              statLabel: "Annual transitions from incarceration",
            },
            {
              color: "bg-slate-600",
              label: "Children and Youth in Foster Care",
              detail: "Children involved in the child welfare system have dramatically higher rates of trauma, mental health conditions, and unmet health needs. CalAIM designates foster youth as a priority ECM population and creates new pathways for coordinated care across the medical, behavioral health, and child welfare systems.",
              stat: "80K+",
              statLabel: "Children in California foster care",
            },
            {
              color: "bg-teal-800",
              label: "High-Risk Pregnant Women & Infants",
              detail: "California's maternal mortality crisis — and stark racial disparities in birth outcomes — drove CalAIM to designate pregnant women at risk for preterm birth, pregnancy complications, or postpartum mental health conditions as a priority ECM population. ECM wraps intensive support around the highest-risk pregnancies.",
              stat: "2x",
              statLabel: "Maternal mortality for Black women in CA vs. white women",
            },
            {
              color: "bg-slate-700",
              label: "Adults with Complex Medical Conditions",
              detail: "The top 5% of Medi-Cal members account for approximately 50% of costs — driven by poorly managed chronic conditions like diabetes, heart failure, COPD, and renal disease. ECM's population health stratification identifies these individuals early, assigns care managers, and prevents the preventable hospitalizations that drive costs.",
              stat: "5%",
              statLabel: "Of members drive ~50% of costs",
            },
          ].map((p) => (
            <div key={p.label} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
              <div className={`${p.color} text-white rounded-lg px-3 py-2 flex flex-col items-center justify-center shrink-0 min-w-[72px]`}>
                <div className="text-xl font-black leading-tight">{p.stat}</div>
                <div className="text-[9px] font-bold uppercase text-white/80 text-center leading-tight mt-0.5">{p.statLabel}</div>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{p.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPLEMENTATION TIMELINE ──────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Implementation" title="How CalAIM Is Rolling Out" />
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-teal-100" />
            <div className="space-y-5">
              {[
                { date: "Jan 2016", event: "Whole Person Care pilots launch in 25 California counties — the proof-of-concept that will become CalAIM" },
                { date: "2019–2020", event: "DHCS begins designing CalAIM; extensive stakeholder engagement with counties, plans, providers, and advocates" },
                { date: "Jan 7, 2021", event: "DHCS submits formal CalAIM Section 1115 waiver proposal to CMS" },
                { date: "Dec 29, 2021", event: "CMS approves CalAIM 1115 waiver — one of the most expansive Medicaid waivers ever approved" },
                { date: "Jan 1, 2022", event: "CalAIM officially launches. Community Supports go live for managed care plans. Population Health Management requirements begin." },
                { date: "Jan 2022", event: "Justice-involved pre-release Medi-Cal benefit launches — first in U.S. history" },
                { date: "Jul 2022", event: "Enhanced Care Management (ECM) fully operational across all 58 counties. Priority populations: homelessness, SMI, high-risk pregnancy, foster youth." },
                { date: "Jan 2023", event: "Medi-Cal dental benefit expansion takes effect — restoring periodontal and other services eliminated in 2009" },
                { date: "2023", event: "Behavioral health integration reforms begin phased implementation; counties and plans negotiate new data-sharing agreements" },
                { date: "Jan 2024", event: "Medi-Cal expanded to all income-eligible Californians regardless of immigration status — CalAIM infrastructure supports new enrollees" },
                { date: "2024–2025", event: "Mid-waiver evaluation results begin emerging; DHCS, RAND, and UCLA publish early outcomes data on ECM and Community Supports utilization" },
                { date: "2026–2027", event: "Waiver renewal negotiations with CMS; DHCS expected to seek expanded authorities based on early outcomes, particularly for behavioral health integration and housing" },
              ].map((item) => (
                <div key={item.date} className="flex gap-6 pl-10 relative">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-white shadow-sm" />
                  <div className="w-24 shrink-0 text-xs font-bold text-teal-600 pt-0.5">{item.date}</div>
                  <div className="text-sm text-slate-700">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPLEMENTATION CHALLENGES ────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Challenges & Controversy" title="Where CalAIM Has Struggled" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">Workforce Shortage: The ECM Crisis</h3>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              The biggest implementation bottleneck has been finding and retaining enough qualified
              care managers to staff ECM programs at scale. The model requires in-person, community-based
              care management — a workforce that did not exist at the scale CalAIM demands.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Managed care plans have struggled to contract with community-based organizations (CBOs)
              that have the cultural competency and street-level expertise to reach people experiencing
              homelessness and serious mental illness — but lack the administrative infrastructure to
              manage Medi-Cal billing and compliance requirements.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">Plan-County Contracting Friction</h3>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              California's Medicaid system is uniquely complex: managed care plans (private and
              public entities) are responsible for physical health, while counties are responsible
              for specialty mental health and substance use disorder treatment. CalAIM requires these
              historically siloed systems to share data, coordinate care, and split financial risk.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Contracting disputes, data-sharing barriers, and misaligned financial incentives between
              plans and counties have slowed behavioral health integration — the area where California's
              reform is most ambitious and most needed.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">Community Support Uptake Gaps</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Despite CMS authorization for 14 Community Supports, not all managed care plans have
              implemented all 14 services in all counties. Plans cite lack of community-based provider
              networks (especially in rural counties), insufficient rates, and administrative burden
              as barriers. Advocates and DHCS have pushed for stronger minimum requirements, but
              implementation has been uneven across the state's 58 diverse counties.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">Data Infrastructure Lags Behind Ambition</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              CalAIM's population health management requirements demand that plans stratify their
              entire enrollee population by health risk and proactively deploy resources — but
              California's Medi-Cal data infrastructure was not built for real-time, cross-system
              integration. Fragmented data systems across counties, plans, hospitals, and social
              service agencies remain a critical barrier to the kind of whole-person care coordination
              CalAIM envisions.
            </p>
          </div>
        </div>

        {/* Who's watching */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Key Stakeholders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-600 mb-3">Driving Implementation</div>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {[
                  "DHCS — Director Michelle Baass",
                  "Governor Gavin Newsom (champion)",
                  "California Medi-Cal managed care plans (22 plans)",
                  "County Health and Human Services agencies",
                  "Community-based organizations (CBOs)",
                  "California Primary Care Association",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-600 mb-3">Raising Concerns</div>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {[
                  "California Hospital Association (payment adequacy)",
                  "County behavioral health directors (integration pace)",
                  "Rural county health departments (workforce gaps)",
                  "Safety net providers (rate adequacy)",
                  "Consumer advocacy groups (enrollment barriers)",
                  "Legislative Analyst's Office (outcome accountability)",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-amber-400 shrink-0 mt-0.5">⚠</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Evaluating & Researching</div>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {[
                  "RAND Corporation (independent evaluation)",
                  "UCLA Center for Health Policy Research",
                  "UC Berkeley School of Public Health",
                  "California Health Care Foundation (CHCF)",
                  "KFF (Kaiser Family Foundation)",
                  "CMS Center for Medicaid & CHIP Services",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-slate-400 shrink-0 mt-0.5">◆</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── NATIONAL SIGNIFICANCE ────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="National Impact" title="Why the Rest of the Country Is Watching" />
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-600 mb-2">Scale as Signal</div>
              <p className="ty-body text-slate-600 leading-relaxed">
                California accounts for roughly <strong>1 in 7 Medicaid enrollees nationwide</strong>.
                What DHCS tests at scale in Medi-Cal becomes the template that other states — and CMS —
                use to design the next generation of Medicaid policy. CalAIM's Community Supports model
                has already influenced waiver negotiations in Oregon, Washington, and New York.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-600 mb-2">Justice-Involved Precedent</div>
              <p className="ty-body text-slate-600 leading-relaxed">
                California's 90-day pre-release Medi-Cal benefit was the <strong>first CMS ever
                approved for any state</strong>. Since California's approval in 2022, CMS has opened
                this authority to all states as part of Medicaid's broader "reentry" policy — a direct
                result of California proving the model works at scale.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-600 mb-2">Housing as Healthcare</div>
              <p className="ty-body text-slate-600 leading-relaxed">
                CalAIM's authorization for Medicaid to fund housing deposits and navigation services
                marked a <strong>philosophical turning point</strong> in American health policy — the
                federal acknowledgment that stable housing is a medical intervention. CMS's approval
                signals an opening for states nationwide to test similar approaches.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-teal-200">
            <p className="text-sm text-teal-800 font-medium text-center">
              CalAIM operates under the same CMS innovation philosophy as the AHEAD Model —
              both represent the Biden/Newsom-era conviction that Medicaid and Medicare must evolve
              from paying for sick care to investing in health.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRESS COVERAGE ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Press Coverage" title="How California Media Covered CalAIM" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PressCard
            publication="CalMatters"
            date="2022"
            title="California's Medi-Cal overhaul aims to house, feed and care for 14 million people"
            summary="CalMatters' definitive explainer on CalAIM's scope — the first major statewide coverage to frame CalAIM as a social services expansion, not just a healthcare reform."
            href="https://calmatters.org/health/2022/01/california-medi-cal-reform-calaim/"
          />
          <PressCard
            publication="Los Angeles Times"
            date="2022"
            title="California wants to pay for housing to help the homeless — with Medi-Cal dollars"
            summary="The LA Times investigates the unprecedented Community Supports authorization — Medicaid funding for housing deposits and navigation — and what it means for California's homelessness crisis."
            href="https://www.latimes.com/california/story/2022-01-03/california-medi-cal-homeless-housing"
          />
          <PressCard
            publication="KFF Health News"
            date="2023"
            title="States Look to California's Medicaid for Ideas on Housing, Social Services"
            summary="National health policy coverage of CalAIM's influence — how California's Community Supports model is reshaping what other states ask CMS to approve in their own 1115 waivers."
            href="https://kffhealthnews.org/news/article/medicaid-california-calaim-housing-community-supports-states/"
          />
          <PressCard
            publication="STAT News"
            date="2023"
            title="California's 'Care Court' and CalAIM: A one-two punch on mental illness"
            summary="STAT News examines the intersection of CalAIM's behavioral health integration with Governor Newsom's CARE Court — and whether the two programs together can address California's most intractable mental health crisis."
            href="https://www.statnews.com/2023/03/california-care-court-calaim-mental-health/"
          />
          <PressCard
            publication="California Healthline"
            date="2022"
            title="Medi-Cal's Big Bet: Can It House the Homeless and Heal the Sick?"
            summary="California Healthline profiles ECM care managers working with people experiencing homelessness in Los Angeles — the human story behind CalAIM's data."
            href="https://californiahealthline.org/news/article/medi-cal-calaim-homeless-housing-ecm/"
          />
          <PressCard
            publication="Politico"
            date="2022"
            title="California's Medicaid experiment could reshape U.S. health care"
            summary="Politico frames CalAIM as a national test case — the argument that whatever California proves in Medi-Cal will become the blueprint for the next generation of federal Medicaid policy."
            href="https://www.politico.com/news/2022/california-medicaid-calaim-reform/"
          />
          <PressCard
            publication="San Francisco Chronicle"
            date="2023"
            title="Medi-Cal now pays for housing. Here's how that works in practice."
            summary="The SF Chronicle follows an unhoused Medi-Cal member through the CalAIM Community Supports process — from ECM enrollment to housing deposit authorization to stable housing — illustrating both the promise and the bureaucratic friction of the model."
            href="https://www.sfchronicle.com/bayarea/article/medi-cal-calaim-housing-community-support/"
          />
          <PressCard
            publication="CalMatters"
            date="2024"
            title="As CalAIM hits its stride, gaps in mental health care persist"
            summary="A progress check two years in — CalAIM's wins on housing and ECM enrollment, but the persistent gaps in behavioral health integration that advocates say undermine the whole-person care vision."
            href="https://calmatters.org/health/2024/calaim-mental-health-behavioral-health-gaps/"
          />
        </div>

        {/* Official resources */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Official & Research Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { label: "DHCS CalAIM Official Hub", href: "https://www.dhcs.ca.gov/calaim" },
              { label: "CalAIM Community Supports Information", href: "https://www.dhcs.ca.gov/calaim/Pages/Community-Supports.aspx" },
              { label: "Enhanced Care Management Overview", href: "https://www.dhcs.ca.gov/calaim/Pages/Enhanced-Care-Management.aspx" },
              { label: "Medi-Cal Behavioral Health (DHCS)", href: "https://www.dhcs.ca.gov/services/MH/Pages/BH-Integration.aspx" },
              { label: "CMS 1115 Waiver Approval Documents", href: "https://www.medicaid.gov/medicaid/section-1115-demonstrations/1115-medicaid-demonstration-projects/index.html" },
              { label: "California Health Care Foundation — CalAIM Resources", href: "https://www.chcf.org/topic/medi-cal/calaim/" },
              { label: "KFF — California Medicaid Policy", href: "https://www.kff.org/medicaid/state-indicator/medicaid-spending/california/" },
              { label: "Medi-Cal.ca.gov — Enrollee Information", href: "https://www.medi-cal.ca.gov" },
            ].map((item) => (
              <ExternalLink key={item.label} href={item.href}>
                {item.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── HTR ANALYSIS ─────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader label="HTR Analysis" title="What CalAIM Means for U.S. Health Transformation" />
        <div className="bg-indigo-700 text-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-teal-400 mb-2">The Paradigm Shift</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                CalAIM is the most concrete evidence yet that American health policy is moving — slowly,
                unevenly, but unmistakably — toward the thesis that medicine alone cannot achieve health.
                When the largest Medicaid program in the country begins paying for housing deposits and
                asthma remediation, it changes what "health care" means in the United States.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">The Implementation Gap</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                CalAIM's greatest risk is the chasm between policy ambition and operational reality.
                California designed a world-class model and then asked a workforce that didn't exist,
                a data infrastructure that wasn't built, and county-plan relationships that were never
                designed to collaborate to execute it — simultaneously, at scale, on a political timeline.
                The implementation gap is real and consequential.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">The Irreversible Bet</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                CalAIM has already changed what CMS will approve for other states. The justice-involved
                pre-release benefit is now a national option. The Community Supports framework is being
                replicated in Oregon, Washington, and beyond. Whether CalAIM succeeds or struggles in
                California, the ideas it operationalized are now permanent features of the American
                Medicaid landscape.
              </p>
            </div>
          </div>

          {/* HTR Verdict */}
          <div className="border-t border-white/10 pt-6">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">HTR Verdict</div>
            <p className="text-base text-white font-medium leading-relaxed max-w-3xl">
              CalAIM is the most important Medicaid experiment in a generation. Not because it will
              work perfectly — it won't — but because it is the first serious attempt to build the
              infrastructure for whole-person care at population scale. Every state health reform
              conversation for the next decade will be shaped by what California learns.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONNECTION TO FEDERAL PROGRAMS ───────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader label="Federal Connection" title="CalAIM, AHEAD, and CMS Innovation" />
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <p className="text-sm text-emerald-800 leading-relaxed mb-4">
            CalAIM and the AHEAD Model represent two sides of the same CMS innovation strategy:
            CalAIM transforms <strong>Medicaid</strong> (low-income populations) through California's
            Section 1115 waiver authority; the AHEAD Model transforms <strong>Medicare and all-payer
            systems</strong> (primarily older adults) through CMS's Innovation Center (CMMI) authority.
          </p>
          <p className="text-sm text-emerald-800 leading-relaxed mb-5">
            Both programs reflect the same federal thesis: that total cost of care reform, whole-person
            care integration, and social determinants investment are the only levers large enough to
            bend the U.S. healthcare cost curve. States leading on both Medicaid and Medicare transformation
            — California on Medi-Cal, Vermont on AHEAD — are the laboratories for the next generation
            of federal health policy.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/ahead-model" className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors">
              Explore the AHEAD Model →
            </Link>
            <Link href="/vermont-act-167" className="inline-flex items-center gap-1.5 bg-white border border-emerald-300 text-emerald-800 text-sm font-bold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
              Vermont Act 167 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Home
        </Link>
        <div className="flex gap-4 flex-wrap">
          <Link href="/ahead-model" className="text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors">
            AHEAD Model →
          </Link>
          <Link href="/vermont-act-167" className="text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors">
            Vermont Act 167 →
          </Link>
          <Link href="/dashboard" className="text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors">
            RHT Dashboard →
          </Link>
        </div>
      </div>

    </div>
  );
}
