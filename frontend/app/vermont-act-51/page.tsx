import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import VermontReformCascade from "@/components/VermontReformCascade";

export const metadata = {
  title: "Vermont Act 51 (2023) | Health Transformation Review",
  description:
    "Vermont Act 51 of 2023 (H.206) — the planning step between Act 167's diagnosis and Act 68's mandate. Authorized AHS transformation planning with up to four hospitals, alongside Medicaid, dental, FQHC, and Blueprint for Health changes.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 underline underline-offset-2 transition-colors"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-black uppercase tracking-widest text-sky-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-sky-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

/** The nine sections of the act as enacted. Sec. 8 is the transformation content. */
const SECTIONS = [
  {
    sec: "Sec. 1",
    cite: "33 V.S.A. § 1992",
    title: "Medicaid coverage for adult dental services",
    detail:
      "Preventive services with no co-payment and excluded from the annual cap; diagnostic, restorative, and endodontic procedures to a maximum of $1,000 per calendar year, with DVHA able to approve more in exceptional medical circumstances. Beneficiaries in the Community Rehabilitation and Treatment and Developmental Disability Services programs, and those pregnant or postpartum, are exempt from the cap.",
    transformation: false,
  },
  {
    sec: "Sec. 2",
    cite: "33 V.S.A. ch. 19, subch. 1",
    title: "Medicaid as payer of last resort; third-party liability",
    detail:
      "Requires insurers to accept the Agency's right of recovery and to treat the Agency's prior authorization as their own. Insurers must respond to Agency claims submitted within three years of service and may not deny them solely on submission date, claim format, point-of-sale documentation, or absence of a separate prior authorization.",
    transformation: false,
  },
  {
    sec: "Sec. 3",
    cite: "18 V.S.A. § 4284",
    title: "Vermont Prescription Monitoring System — access and disclosure",
    detail:
      "Enumerates who may query the VPMS: registered providers and dispensers treating a bona fide current patient, system personnel, the DVHA Medical Director for Medicaid quality assurance and federal monitoring, the Chief Medical Examiner's office, and out-of-state providers treating or investigating the death of a Vermont resident.",
    transformation: false,
  },
  {
    sec: "Sec. 4",
    cite: "Session law",
    title: "FQHC alternative payment methodology; report",
    detail:
      "Directed DVHA to work with Vermont's federally qualified health centers on a mutually agreeable alternative payment methodology paying at least the amount due under the BIPA 2000 prospective payment system, with a final report to the Joint Fiscal Committee and the health committees on or before October 1, 2023.",
    transformation: false,
  },
  {
    sec: "Sec. 5",
    cite: "Session law",
    title: "Blueprint for Health; patient-centered medical home payments; report",
    detail:
      "Directed the Director of Health Care Reform to recommend, on or before January 15, 2024, how much insurers and Medicaid should increase per-person, per-month payments to Blueprint patient-centered medical homes — including a State funding estimate and an evaluation of whether all payers contribute equitably.",
    transformation: false,
  },
  {
    sec: "Sec. 6",
    cite: "Repeal",
    title: "Pharmacy benefit managers and 340B entities",
    detail:
      "Repealed the prospective repeal of 18 V.S.A. § 9473(g), keeping the PBM/340B provision in force.",
    transformation: false,
  },
  {
    sec: "Sec. 7",
    cite: "18 V.S.A. § 2251",
    title: "Hospital liens",
    detail:
      "Converts the hospital lien from automatic to permissive and bars a lien entirely where the patient has health insurance and supplies proof within 90 days of discharge. A hospital may still lien for deductible or coinsurance amounts, and a health plan may not deny payment merely because casualty coverage might apply. Effective January 1, 2024.",
    transformation: false,
  },
  {
    sec: "Sec. 8",
    cite: "adds Sec. 2a to Act 167 of 2022",
    title: "Hospital system transformation; pilot projects; report",
    detail:
      "The transformation provision. Directs AHS to engage in transformation planning with up to four hospitals — or more if alternate funds allow — to reduce inefficiencies, lower costs, improve population health outcomes, reduce health inequities, and increase access to essential services while maintaining sufficient capacity for emergency management. The planning is explicitly informed by the data analysis and community engagement Act 167 required, and the Secretary of Human Services and the GMCB Chair must consult to keep the two workstreams aligned. AHS was to update the legislature's health committees on or before February 15, 2024.",
    transformation: true,
  },
  {
    sec: "Sec. 9",
    cite: "Session law",
    title: "Effective dates",
    detail: "Effective July 1, 2023, except Sec. 7 (hospital liens), effective January 1, 2024.",
    transformation: false,
  },
];

export default function VermontAct51Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            State Initiative · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            Enacted 2023
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">
          Vermont Act 51 of 2023
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          The quiet middle step of Vermont&apos;s reform cascade. Act 167 produced the diagnosis;
          Act 68 imposed the mandate. Act 51 is what happened in between — and it is a far smaller
          statute than its position in the sequence suggests.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatBox value="H.206" label="Bill Number" sub="2023 session" />
          <StatBox value="9" label="Sections" sub="one on transformation" />
          <StatBox value="4" label="Hospitals" sub="planning engagements" />
          <StatBox value="Jul 1, 2023" label="Effective" sub="Sec. 7 on Jan 1, 2024" />
        </div>
      </div>

      {/* ── WHAT IT ACTUALLY IS ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Orientation" title="What Act 51 actually is" />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-700 leading-relaxed">
            Act 51 is titled{" "}
            <em>
              &ldquo;An act relating to miscellaneous changes affecting the duties of the Department
              of Vermont Health Access.&rdquo;
            </em>{" "}
            It is, in the main, a Medicaid and DVHA housekeeping bill: adult dental coverage,
            third-party liability, prescription monitoring, FQHC payment, Blueprint for Health,
            and hospital liens.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-3">
            Its place in the transformation story rests on <strong>a single section</strong> —
            Sec. 8 — which adds a new Sec. 2a to Act 167 of 2022 and authorizes AHS to conduct
            transformation planning with up to four hospitals. That is the whole of the
            transformation content.
          </p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          This matters because Act 51 is frequently summarized as having established Vermont&apos;s
          reform architecture or mandated the restructuring of the Agency of Human Services. Neither
          is in the text. The AHS restructuring mandate and the Statewide Health Care Delivery
          Strategic Plan are <Link href="/vermont-act-68" className="text-sky-700 underline underline-offset-2 hover:text-sky-900">Act 68 of 2025</Link>.
          The six-pillar framework used across this platform is an analytical model, not a
          Vermont statutory scheme.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          What Act 51 did contribute is real but narrower, and worth stating precisely: it moved
          Vermont from <em>studying</em> its hospital system to <em>working with individual
          hospitals</em> — with a statutory instruction that the two efforts stay aligned. That is
          the hinge between diagnosis and mandate.
        </p>
      </section>

      {/* ── SECTION-BY-SECTION ────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="The Statute" title="Section by section, as enacted" />
        <div className="space-y-3">
          {SECTIONS.map((s) => (
            <div
              key={s.sec}
              className={`border rounded-xl p-5 ${
                s.transformation
                  ? "bg-sky-50 border-sky-300 ring-1 ring-sky-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                    s.transformation
                      ? "bg-sky-100 text-sky-700 border-sky-300"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {s.sec}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{s.cite}</span>
                {s.transformation && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-700">
                    ← the transformation provision
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{s.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
          Summarized from the act as enacted. Section headings and citations follow the official
          text; read the statute itself for operative language.
        </p>
      </section>

      {/* ── SEC. 8 IN DETAIL ──────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Sec. 8" title="The four-hospital transformation pilot" />
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Sec. 8 does not stand alone — it is drafted as an amendment that inserts a new Sec. 2a
            into Act 167 of 2022. Reading it without Act 167 open beside it is what produces most
            of the confusion about what Act 51 did.
          </p>
          <div className="space-y-3">
            {[
              {
                h: "Who, and how many",
                d: "AHS engages in transformation planning with up to four hospitals — or a different number if alternate funds make it possible.",
              },
              {
                h: "Toward what ends",
                d: "Reduce inefficiencies, lower costs, improve population health outcomes, reduce health inequities, and increase access to essential services — while maintaining sufficient capacity for emergency management.",
              },
              {
                h: "On what evidence",
                d: "The planning is expressly informed by the data analysis and community engagement required by Sec. 2 of Act 167 — the work that became the Oliver Wyman report.",
              },
              {
                h: "With what coordination",
                d: "The Secretary of Human Services (or designee) and the GMCB Chair and staff must consult with each other to ensure the engagements and the Act 167 analysis stay aligned.",
              },
              {
                h: "Reporting back",
                d: "AHS was to update the Senate Committee on Health and Welfare and the House Committee on Health Care on progress on or before February 15, 2024.",
              },
            ].map((r) => (
              <div key={r.h} className="border-l-2 border-sky-300 pl-4">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">{r.h}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Why the consultation clause matters.</strong>{" "}
            Vermont ran a system-wide diagnostic and hospital-level planning at the same time, and
            wrote into statute that the two had to talk to each other. States that commission a
            consultant study and separately begin provider engagements — with no instruction to
            reconcile them — routinely end up with findings and pilots that do not line up.
          </p>
        </div>
      </section>

      {/* ── PLACE IN THE CASCADE ──────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Sequence" title="Where Act 51 sits in the reform cascade" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              act: "Act 167 (2022)",
              role: "Diagnostic mandate",
              body: "Commissioned the independent system-wide analysis and the community engagement across all 14 hospitals that became the Oliver Wyman report.",
              href: "/vermont-act-167",
              tone: "bg-white border-slate-200",
            },
            {
              act: "Act 51 (2023)",
              role: "Planning mandate",
              body: "Authorized AHS to begin transformation planning with individual hospitals, informed by the Act 167 analysis and coordinated with GMCB.",
              href: null,
              tone: "bg-sky-50 border-sky-300 ring-1 ring-sky-200",
            },
            {
              act: "Act 68 (2025)",
              role: "Operational mandate",
              body: "Mandatory reference-based pricing (FY2027), hospital global budgets (FY2028–FY2030), AHS restructuring, and the Statewide Strategic Plan due December 2028.",
              href: "/vermont-act-68",
              tone: "bg-white border-slate-200",
            },
          ].map((c) => {
            const inner = (
              <>
                <div className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">
                  {c.role}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">{c.act}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{c.body}</p>
              </>
            );
            return c.href ? (
              <Link
                key={c.act}
                href={c.href}
                className={`block border rounded-xl p-5 transition-all hover:shadow-md hover:border-sky-400 ${c.tone}`}
              >
                {inner}
              </Link>
            ) : (
              <div key={c.act} className={`border rounded-xl p-5 ${c.tone}`}>
                {inner}
                <div className="text-[10px] font-black uppercase tracking-widest text-sky-700 mt-2">
                  You are here
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The cascade&apos;s logic is that each act creates the evidence and institutional capacity
          the next one needs. Act 51 is the least conspicuous of the three, and the easiest to
          overstate — but a mandate as prescriptive as Act 68 would have been far harder to pass
          without hospital-level planning already underway.
        </p>
        <div className="mt-8">
          <VermontReformCascade />
        </div>
      </section>

      {/* ── FOR OTHER STATES ──────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Transferability" title="What this step looks like elsewhere" />
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Act 51&apos;s analogue in another state is not a landmark reform statute. It is the
            unglamorous authorizing language that lets an agency start working with individual
            hospitals before anyone is ready to legislate a mandate — often attached to a larger
            Medicaid or agency bill, as it was here.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Two features are worth copying: the pilot is <strong>explicitly informed by</strong> the
            diagnostic work already commissioned, and the statute <strong>names who must consult
            with whom</strong>. Both are one sentence each, and both prevent the diagnosis and the
            pilots from drifting apart.
          </p>
        </div>
      </section>

      {/* ── SOURCES ───────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Primary Sources" title="Read the statute" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              href: "https://legislature.vermont.gov/Documents/2024/Docs/ACTS/ACT051/ACT051%20As%20Enacted.pdf",
              label: "Act 51 of 2023 — As Enacted (PDF)",
              desc: "Official enrolled text, nine sections. Signed by the Governor June 6, 2023.",
            },
            {
              href: "https://legislature.vermont.gov/bill/status/2024/H.206",
              label: "H.206 — Bill Status and History",
              desc: "Committee action, votes, and journal entries for the bill that became Act 51.",
            },
            {
              href: "https://gmcboard.vermont.gov/hospitalsustainability",
              label: "GMCB — Hospital Sustainability and Act 167",
              desc: "The diagnostic workstream Sec. 8 planning was required to be informed by.",
            },
            {
              href: "https://healthcarereform.vermont.gov/health-care-transformation",
              label: "AHS Health Care Transformation Portal",
              desc: "Official AHS Office of Health Care Reform — program summaries and reports.",
            },
          ].map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-300 hover:shadow-sm transition-all group"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-sky-700 text-xs transition-colors leading-snug">
                  {r.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
          Statutory descriptions on this page follow{" "}
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/Docs/ACTS/ACT051/ACT051%20As%20Enacted.pdf">
            the act as enacted
          </ExternalLink>
          . Where secondary summaries of Act 51 differ, the enrolled text governs.
        </p>
      </section>

      {/* ── RELATED PAGES ─────────────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Related" title="Continue Your Research" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              href: "/vermont-act-167",
              label: "Vermont Act 167",
              desc: "The 2022 diagnostic mandate that Sec. 8 of Act 51 amends.",
              color: "border-violet-200 hover:border-violet-400",
            },
            {
              href: "/vermont-act-68",
              label: "Vermont Act 68",
              desc: "The 2025 operational mandate — RBP, global budgets, and the AHS restructuring.",
              color: "border-rose-200 hover:border-rose-400",
            },
            {
              href: "/vermont-medicaid",
              label: "Vermont Medicaid",
              desc: "Program details for the Medicaid provisions that make up most of Act 51.",
              color: "border-emerald-200 hover:border-emerald-400",
            },
          ].map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group block bg-white border rounded-xl p-5 transition-all hover:shadow-md ${p.color}`}
            >
              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-sky-700 transition-colors">
                {p.label}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
