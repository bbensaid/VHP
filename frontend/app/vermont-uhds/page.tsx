import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Unified Health Data Space (UHDS) | Health Transformation Review",
  description:
    "Vermont's VHIE-to-UHDS transition — the second-generation health data infrastructure merging clinical, claims, and SDOH data into one longitudinal record, operated as a Health Data Utility. Architecture, privacy model, financing, and the 2025–2030 roadmap.",
};

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-black uppercase tracking-widest text-indigo-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-indigo-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

const LAYERS = [
  {
    n: "Layer 3",
    name: "End-User Services",
    nick: "the light switches",
    body: "What clinicians and state leaders actually touch: the VITLAccess provider portal, real-time ADT event notifications acting as “digital smoke detectors,” and the Advanced Analytics Layer used for regionalization and global-budget modeling.",
    tone: "bg-indigo-50 border-indigo-200",
  },
  {
    n: "Layer 2",
    name: "Exchange Services",
    nick: "the plumbing",
    body: "FHIR APIs and the Clinical Data Repository — a FHIR-based store holding the longitudinal clinical record as a single source of truth — prioritized around the weekly-refreshed MDWAS pipeline rather than the legacy, lagging VHCURES feed.",
    tone: "bg-indigo-100/60 border-indigo-300",
  },
  {
    n: "Layer 1",
    name: "Foundational Services",
    nick: "the concrete",
    body: "The Master Patient Index (Verato) and Terminology Services (Term Atlas), coordinated by the Rhapsody integration engine. Establishes who a patient is and ensures every system speaks the same clinical vocabulary (SNOMED CT, LOINC). Without it, nothing above is trustworthy.",
    tone: "bg-indigo-200/50 border-indigo-400",
  },
];

const BLIND_SPOTS = [
  { t: "Clinical only", d: "No visibility outside the patient's own network — a provider cannot see a test run last week at another hospital." },
  { t: "Claims only", d: "Shows a visit happened and was paid for, but not the blood pressure or the lab result. Substantially underestimates quality, especially for discontinuously insured patients." },
  { t: "SDOH only", d: "Frequently trapped in unstructured text or another agency's records — invisible to the treating clinician at the point of care." },
];

export default function VermontUHDSPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            Technology Pillar · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            In transition · 2025–2030
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">
          Vermont&apos;s Unified Health Data Space
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          Vermont&apos;s solvency crisis is, in the Legislature&apos;s reading, a data problem.
          The state&apos;s answer is to convert its Health Information Exchange into a{" "}
          <strong>Unified Health Data Space</strong> — clinical, claims, and social data merged
          into one longitudinal record, run as public infrastructure.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatBox value="$3.1B" label="Projected deficit" sub="by 2028, vs 3% margin" />
          <StatBox value="13 of 14" label="Hospitals in loss" sub="projected 2028" />
          <StatBox value="3" label="Data types merged" sub="clinical · claims · SDOH" />
          <StatBox value="2030" label="Full multi-payer" sub="commercial claims + SDOH" />
        </div>
      </div>

      {/* ── WHAT IT IS ────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Vocabulary" title="HIE, UHDS, and Health Data Utility" />
        <div className="space-y-3">
          {[
            { t: "Health Information Exchange (HIE)", d: "A secure digital network letting providers share patient records electronically. Vermont's VHIE is the first-generation, centralized statewide exchange." },
            { t: "Unified Health Data Space (UHDS)", d: "The second-generation evolution. Same centralized model, extended past clinical query: it merges clinical, claims, and Social Drivers of Health data into one consolidated source of truth." },
            { t: "Health Data Utility (HDU)", d: "Not a technology — a governing philosophy. Health data infrastructure treated as essential public service, like the electric grid or water system: publicly funded, stably managed, run for public good rather than as a private siloed asset." },
            { t: "Longitudinal record", d: "A patient's complete history over time and across every setting — as opposed to the fragmented single-encounter view most clinicians see today." },
          ].map((x) => (
            <div key={x.t} className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-900 text-sm mb-1">{x.t}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY INTEGRATION ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="The Core Argument" title="Why integration is load-bearing" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          No single data type is sufficient. Claims are complete for utilization but clinically
          shallow; clinical data is rich but blind outside its own network; SDOH explains root
          cause but is usually trapped in another agency&apos;s silo. Each has a blind spot the
          others close.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {BLIND_SPOTS.map((b) => (
            <div key={b.t} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Blind spot
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{b.t}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[
            { h: "Hybrid quality measures become possible", d: "Metrics combining a claims-identified population with a clinical result — CMS 167 (hypertension control), CMS 204 (diabetes/HbA1c) — need both data types in one place. Without integration they can only be produced by manual chart abstraction, which program materials put at over $14 million in avoidable annual burden statewide." },
            { h: "Risk prediction measurably improves", d: "Combining EHR and claims data identifies meaningfully more high-risk patients than claims alone — the basis for the earlier, targeted interventions Act 167's cost-reduction strategy depends on." },
            { h: "SDOH closes the loop on root cause", d: "A patient repeatedly readmitted for diabetes complications may, on the clinical record alone, appear to need a different medication. Only the SDOH layer reveals whether the real barrier is transportation to the pharmacy or a food-insecure household — the finding that redirects an expensive clinical intervention into a cheaper social referral." },
          ].map((x) => (
            <div key={x.h} className="border-l-2 border-indigo-300 pl-4">
              <h4 className="font-bold text-slate-900 text-sm mb-1">{x.h}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Architecture" title="Three layers — “the house”" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Each layer depends on the one below it. Read from the bottom up.
        </p>
        <div className="space-y-3">
          {LAYERS.map((l) => (
            <div key={l.n} className={`border rounded-xl p-5 ${l.tone}`}>
              <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                  {l.n}
                </span>
                <span className="font-bold text-slate-900 text-sm">{l.name}</span>
                <span className="text-[11px] italic text-slate-500">“{l.nick}”</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MDWAS PATH ────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Data Path" title="MDWAS first, and why multi-payer is not optional" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left font-bold text-slate-700 p-3">Feature</th>
                <th className="text-left font-bold text-slate-700 p-3">MDWAS (primary)</th>
                <th className="text-left font-bold text-slate-700 p-3">VHCURES (legacy)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Refresh frequency", "Weekly", "9–12+ month lag"],
                ["Clinical utility", "High — timely for intervention", "Low — retrospective only"],
                ["Privacy model", "Integrated opt-out (Act 53)", "No opt-out mechanism"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-slate-200">
                  <td className="p-3 font-semibold text-slate-700">{r[0]}</td>
                  <td className="p-3 text-slate-600">{r[1]}</td>
                  <td className="p-3 text-slate-500">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { y: "2024 — complete", d: "Medicaid clinical and claims data live in MDWAS on a weekly refresh.", pct: "~24% of coverage" },
            { y: "2026–2028", d: "Scale to Medicare data — meeting AHEAD Model reporting requirements and supporting hospital global-budget monitoring.", pct: "~21–25% of coverage" },
            { y: "2029–2030", d: "Full multi-payer integration: commercial claims and standardized SDOH/HRSN data, enabling true Total Cost of Care predictive modeling.", pct: "~45–49% of coverage" },
          ].map((p) => (
            <div key={p.y} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">{p.y}</div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">{p.d}</p>
              <div className="text-[11px] font-bold text-slate-400">{p.pct}</div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Why the phasing matters.</strong> Medicaid is
            roughly a quarter of Vermont&apos;s insured population. A UHDS that stops at Medicaid
            data, however well it performs, is by construction blind to how three-quarters of
            Vermonters actually receive and pay for care. Every argument about global budgets,
            regionalization, and Total Cost of Care modeling assumes multi-payer data.
          </p>
        </div>
      </section>

      {/* ── PRIVACY ───────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Privacy" title="A tiered consent model, not one blanket policy" />
        <div className="space-y-3">
          {[
            { t: "General health data", m: "Opt-out (Act 53)", d: "Data flows by default; patients retain the right to object at any time." },
            { t: "Substance Use Disorder data", m: "Granular opt-in (42 CFR Part 2)", d: "Technically segregated records requiring explicit authorization, enforced through security labeling and Role-Based Access Control limited to personnel with an established treatment relationship." },
            { t: "Public health reporting", m: "Cell-size suppression", d: "Any output group smaller than 10 is suppressed to prevent re-identification." },
            { t: "Payer/provider proprietary data", m: "Price-standardized units", d: "Standardized utilization units rather than raw negotiated rates, protecting competitive financial information." },
          ].map((x) => (
            <div key={x.t} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h4 className="font-bold text-slate-900 text-sm">{x.t}</h4>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {x.m}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Concentration risk.</strong> Consolidating
            Vermont&apos;s health data into one place creates a liability proportional to its
            value. The tiered architecture above is the mitigation, but the risk is inherent to
            the design and is treated as such rather than argued away.
          </p>
        </div>
      </section>

      {/* ── LEGISLATIVE ───────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Statutory Basis" title="Seventeen years of HIE law" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left font-bold text-slate-700 p-3 w-40">Instrument</th>
                <th className="text-left font-bold text-slate-700 p-3">What it requires</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Act 61 (2009)", "Original statutory basis for Vermont's HIE program (18 V.S.A. §§ 9351–9352), designating VITL as the exclusive legislatively designated operator of the statewide exchange."],
                ["HITECH (2009)", "Federal “Meaningful Use” program that seeded Vermont's HIE and EHR-adoption funding — from ~$1.4M in 2009 to well over $100M cumulatively by the late 2010s."],
                ["Act 167 (2022)", "Directed redesign of care delivery — and repealed 18 V.S.A. § 9410(e), so direct patient identifiers could finally be used for accurate record matching."],
                ["Act 62 (2025)", "Transferred the statewide Health IT Plan from GMCB to DVHA, effective July 1, 2025. Annual revisions due November 1; full update every five years."],
                ["Act 68 (2025), §10", "Mandated integration of clinical, claims and SDOH data into a single record, and required AHS to report to the Legislature by January 15, 2026 — delivered on schedule."],
                ["42 CFR Part 2", "Federal enhanced confidentiality for substance use disorder records."],
                ["TEFCA", "Federal framework for nationwide exchange interoperability."],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-slate-200">
                  <td className="p-3 font-semibold text-slate-700 align-top">{r[0]}</td>
                  <td className="p-3 text-slate-600">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mt-4">
          The § 9410(e) repeal deserves emphasis. Accurate record matching across organizations is
          the foundation everything else rests on — and until that repeal, Vermont&apos;s own
          statute prevented it.
        </p>
      </section>

      {/* ── PROVEN UNDER STRESS ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Precedent" title="Tested twice under real emergencies" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 text-sm mb-2">COVID-19 (2020–2022)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Department of Health used the VITLAccess portal to run case investigations
              directly, without repeatedly burdening frontline clinicians with individual records
              requests. New data-delivery relationships supported contact tracing, immunization
              tracking, and testing-data reporting. VITL&apos;s CEO described the pandemic as the
              event that “really shifted the work that we do.”
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              UVM Health Network ransomware (Oct 2020)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A ransomware attack forced six hospitals offline for nearly a month — no EHR, no
              phones, back to paper. Estimated cost <strong>$50–65 million</strong>. A DOJ
              prosecution described the medical center as “unable to provide many critical patient
              services for over two weeks.” Throughout the outage, the VHIE gave providers, EMS,
              and referral hospitals a continuity-of-access channel while UVMMC&apos;s own systems
              were dark.
            </p>
          </div>
        </div>
      </section>

      {/* ── RHT DEPENDENCY ────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Dependency" title="Why RHT runs on the UHDS" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Vermont&apos;s materials tend to describe the{" "}
          <Link href="/vermont-rht-program" className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900">
            Rural Health Transformation Program
          </Link>{" "}
          as a parallel funding stream. That understates the coupling: RHT pays for a portfolio of
          care-redesign shared services, and the UHDS is the substrate nearly every one of them
          runs on. Year 1 (FFY2026) award: <strong>$195,053,740</strong>, with five-year funding
          projected at nearly <strong>$1 billion</strong>.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left font-bold text-slate-700 p-3">RHT-funded project</th>
                <th className="text-left font-bold text-slate-700 p-3 w-32">FY26</th>
                <th className="text-left font-bold text-slate-700 p-3">What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Centralized Transfer Center & Bed Availability", "$2.925M", "Real-time statewide view of bed and service availability, coordinating inter-facility transfers."],
                ["Shared EHR Platform Feasibility Assessment", "$17.85M*", "Evaluates consolidating independent hospitals onto a common EHR platform."],
                ["Statewide e-Consult Expansion", "$920,000", "Secure asynchronous specialist consultations, reducing unnecessary in-person referrals."],
                ["Closed-Loop Referral System", "$460,000", "Digital infrastructure connecting medical, behavioral health, and social services."],
                ["Remote Patient Monitoring support", "IT Advances", "Chronic-care management in the home, enabling earlier intervention."],
                ["Mobile Integrated Health support", "Prevention", "Community paramedics delivering pre- and post-operative care in the home."],
                ["Vendor-Neutral Imaging Archive", "IT Advances", "Statewide standards-based imaging archive shared across independent centers."],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-slate-200">
                  <td className="p-3 font-semibold text-slate-700 align-top">{r[0]}</td>
                  <td className="p-3 text-slate-600 align-top whitespace-nowrap">{r[1]}</td>
                  <td className="p-3 text-slate-600">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mb-4">* allocated pending assessment</p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">The point.</strong> Each project is, on its own, a
            vendor-supplied point solution. What turns it into measurable transformation is the
            UHDS layer beneath: the Centralized Transfer Center only works if bed and capacity data
            ties to a correctly matched patient record across every facility in real time. Strip
            the UHDS out and these become disconnected purchases that cannot be attributed to a
            patient record, linked to cost data, or reported to CMS as evidence the investment
            worked.
          </p>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Roadmap" title="2025 to 2030" />
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4">
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            Governing principle: knowledge continuity first
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The greatest risk to this transition is not technical — it is the loss of institutional
            knowledge during a period when the state is changing both its vendor and its operating
            team. Every phase is built around a <strong>co-delivery model</strong> rather than a
            hard handoff, so operational ownership transfers only after competency is demonstrated,
            not on a calendar alone.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { h: "Completed (2024–2025)", t: "Foundational compliance", d: "MDWAS go-live ✓ · MDAAP closeout ✓ · Act 68 statutory report delivered January 15, 2026 ✓", done: true },
            { h: "Mid-term (2026–2028)", t: "Analytics and scaling", d: "Advanced Analytics Layer procurement · scale to Medicare data for AHEAD Model compliance · Centralized Transfer Center · shared EHR feasibility assessment · Statewide Health Care Delivery Strategic Plan filed (Dec 2028)", done: false },
            { h: "Long-term (2029–2030)", t: "Full multi-payer utility", d: "Commercial claims integration · Total Cost of Care predictive modeling live · “staffing flip” from contracted staff to permanent state-led operations by Year 5", done: false },
          ].map((p) => (
            <div key={p.h} className={`border rounded-xl p-5 ${p.done ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"}`}>
              <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                <span className={`text-[10px] font-black uppercase tracking-widest ${p.done ? "text-emerald-700" : "text-indigo-600"}`}>
                  {p.h}
                </span>
                <span className="font-bold text-slate-900 text-sm">{p.t}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE CASE ──────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Summary" title="Three arguments, one conclusion" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { h: "Financial", d: "A $3.1 billion projected deficit cannot be closed by isolated hospital-level cost cutting. It requires system-level decisions about which services are delivered where — and those cannot be modeled without linked cost and utilization data." },
            { h: "Legal", d: "Act 68 §10 does not ask for clinical, claims, and SDOH integration. It mandates it." },
            { h: "Clinical quality", d: "Hybrid measures, earlier risk identification, and root-cause intervention all require the integrated record. Without it, quality measurement falls back to manual chart abstraction — over $14 million a year in avoidable statewide burden." },
          ].map((x) => (
            <div key={x.h} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">
                {x.h}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-sm text-slate-100 leading-relaxed">
            Regionalization decisions cannot be modeled without linked cost and utilization data.
            Hospital global budgets cannot be monitored without real-time claims and clinical feeds.
            Social Drivers of Health cannot be addressed without a mechanism to surface them at the
            point of care. The UHDS is the common substrate beneath all three.
          </p>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Related" title="Continue Your Research" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: "/vermont-rht-program", label: "Vermont RHT Program", desc: "The $195M/year federal award funding the care-redesign services the UHDS carries.", color: "border-teal-200 hover:border-teal-400" },
            { href: "/vermont-act-68", label: "Vermont Act 68", desc: "§10 mandates the clinical + claims + SDOH integration this page describes.", color: "border-rose-200 hover:border-rose-400" },
            { href: "/technology", label: "Technology Pillar", desc: "VHCURES, FHIR, AI governance, and the rest of Vermont's data infrastructure.", color: "border-indigo-200 hover:border-indigo-400" },
          ].map((p) => (
            <Link key={p.href} href={p.href} className={`group block bg-white border rounded-xl p-5 transition-all hover:shadow-md ${p.color}`}>
              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors">
                {p.label}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-6">
          Technical overview only. Vermont&apos;s UHDS program documentation additionally covers
          governance structure, inter-agency coordination, and delivery organization, which are
          not summarized here.
        </p>
      </section>

    </div>
  );
}
