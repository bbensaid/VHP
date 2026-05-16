import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont SASH Program | HTR States",
  description: "Support and Services at Home (SASH) — Vermont's nationally recognized, housing-based care coordination program for Medicare seniors and people with disabilities. Operates in 200+ affordable housing communities, serving 13,000+ Vermonters.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-black uppercase tracking-widest text-teal-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

const SASH_OUTCOMES = [
  { metric: "Fewer Falls", detail: "SASH participants have documented lower fall rates compared to non-SASH Medicare peers in affordable housing — a primary driver of hospital admissions in the 65+ population." },
  { metric: "Lower Hospitalization Rates", detail: "Reduced inpatient admissions among SASH participants vs. matched controls, measured through CMS Medicare claims data across multiple study periods." },
  { metric: "Fewer Emergency Room Visits", detail: "Lower ED utilization — particularly for ambulatory care-sensitive conditions — consistent with the program's proactive health coaching and care coordination model." },
  { metric: "Lower Medicare & Medicaid Spend", detail: "Studies published by the Commonwealth Fund and CHCS document reduced per-member-per-year Medicare spending for SASH participants, attributable to avoided hospitalizations and ED visits." },
  { metric: "Aging in Place", detail: "Primary goal: keeping seniors in their homes and affordable housing communities rather than transitioning to nursing facility care. Delayed nursing home placement is a documented outcome." },
];

const SASH_SERVICES = [
  { title: "Health & Wellness Assessment", desc: "Comprehensive individualized assessment of health needs, functional status, and social determinants conducted by the SASH Coordinator and Wellness Nurse on enrollment and annually." },
  { title: "Individualized Care Plan", desc: "A written care plan addressing each participant's specific health goals, care coordination needs, and community resource connections — developed collaboratively with the participant." },
  { title: "One-on-One Nurse Coaching", desc: "Regular one-on-one sessions with the quarter-time Wellness Nurse — medication management, chronic disease self-management support, vital signs monitoring, and care navigation." },
  { title: "Care Coordination", desc: "The full-time SASH Coordinator connects participants to primary care, specialty services, home health, Meals on Wheels, transportation, and other community resources. Also manages care transitions post-hospitalization." },
  { title: "Health & Wellness Group Programs", desc: "Group programs offered within the housing community: Bone Builders (strength/balance for fall prevention), smoking cessation, Tai Chi, and other evidence-based programs." },
  { title: "SDOH Navigation", desc: "Benefits screening and enrollment assistance (SNAP, heating assistance, prescription drug cost programs), housing stability support, and connection to legal aid and financial assistance programs." },
];

export default function VermontSASHPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">State Program · Vermont</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Est. 2011</span>
          <span className="bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Nationally Recognized</span>
          <span className="bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Free to Participants</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont SASH Program
          <span className="block text-xl font-bold text-slate-500 mt-1">Support and Services at Home</span>
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          A nationally recognized, team-based care coordination program operating in 200+ affordable housing communities across all 14 Vermont counties. SASH provides free health coordination, wellness coaching, and SDOH navigation to 13,000+ older Vermonters and people with disabilities on Medicare — with documented reductions in hospitalizations, ED visits, and Medicare spending.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://sashvt.org/">SASH Vermont Website</ExternalLink>
          <ExternalLink href="https://sashvt.org/learn-about-sash">Learn About SASH</ExternalLink>
          <ExternalLink href="https://www.chcs.org/support-and-services-at-home-sash-helping-older-adults-and-people-with-disabilities-in-affordable-housing-age-in-place/">CHCS: SASH Program Overview</ExternalLink>
          <ExternalLink href="https://www.ruralhealthinfo.org/project-examples/932">Rural Health Information Hub: SASH</ExternalLink>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: "200+", label: "Housing Communities", sub: "All 14 Vermont counties" },
          { value: "13,000+", label: "Vermonters Served", sub: "Since 2011 launch" },
          { value: "70+", label: "Partner Organizations", sub: "Housing, health, & community" },
          { value: "2011", label: "Year Launched", sub: "Under Blueprint infrastructure" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-black text-teal-700 mb-1">{s.value}</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{s.label}</div>
            {s.sub && <div className="text-[11px] text-slate-400 mt-1">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="mb-12">
        <SectionHeader label="Program Model" title="How SASH Works" />
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            SASH operates from within affordable housing communities — the care team comes to where participants live, rather than requiring participants to travel to a clinic. Each full SASH panel is staffed by:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="font-black text-teal-800 mb-1">Full-Time SASH Coordinator</p>
              <p className="text-xs text-slate-600 leading-relaxed">Manages all care coordination, SDOH navigation, care transitions, and community resource connections for the full participant panel. The SASH Coordinator is the primary point of contact for participants, family members, and clinical providers.</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="font-black text-teal-800 mb-1">Quarter-Time Wellness Nurse (RN)</p>
              <p className="text-xs text-slate-600 leading-relaxed">Provides one-on-one nursing coaching, medication management support, vital sign monitoring, and clinical judgment on when participants need escalation to their primary care team. Works closely with Blueprint PCMH practices.</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            SASH is free to all participants. Funding comes from a combination of Medicare and Medicaid payments through the Blueprint for Health infrastructure, philanthropic support from Cathedral Square Corporation (the program's administrator), and housing authority contributions.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SASH_SERVICES.map(s => (
            <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="font-black text-slate-900 text-sm mb-1.5">{s.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OUTCOMES */}
      <div className="mb-12">
        <SectionHeader label="Evidence Base" title="Documented Health Outcomes" />
        <div className="space-y-3">
          {SASH_OUTCOMES.map(o => (
            <div key={o.metric} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <div className="w-2 bg-teal-400 rounded-full shrink-0" />
              <div>
                <p className="font-black text-slate-900 text-sm">{o.metric}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{o.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VBC CONNECTION */}
      <div className="mb-12 bg-indigo-50 border border-indigo-200 rounded-2xl p-8">
        <h2 className="text-xl font-black text-slate-900 mb-3">SASH as a Value-Based Care Model</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          SASH is one of the most elegant examples of a VBC-aligned care model in the US. It deploys a low-cost care coordination team ($300–400/participant/year estimated program cost) into the housing setting — where high-risk seniors live — and generates documented Medicare and Medicaid savings through avoided hospitalizations and ED visits. The estimated ROI is 2–5× program cost in avoided utilization spend.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-800 mb-1">SDOH Integration</p>
            <p className="text-slate-600">SASH is embedded in affordable housing — addressing food, housing stability, and transportation as part of every participant's care plan. This is what SDOH integration looks like in practice, not just in policy documents.</p>
          </div>
          <div className="bg-white border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-800 mb-1">AHEAD Model Connection</p>
            <p className="text-slate-600">SASH participants who are Medicare beneficiaries are attributed to Vermont AHEAD ACOs through their primary care practices. SASH's reduced utilization directly improves the ACO's total cost of care performance against its global budget benchmark.</p>
          </div>
          <div className="bg-white border border-indigo-200 rounded-xl p-4">
            <p className="font-bold text-indigo-800 mb-1">National Replication</p>
            <p className="text-slate-600">The SASH model is being adapted in other states. In 2022, a federally funded demonstration extended SASH to multi-generational affordable housing in Brattleboro — the first non-elderly expansion of the model.</p>
          </div>
        </div>
      </div>

      {/* RELATED PROGRAMS */}
      <div className="mb-12">
        <SectionHeader label="Vermont Ecosystem" title="Related Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/vermont-blueprint", label: "Blueprint for Health", desc: "SASH was launched under Blueprint infrastructure. SASH Coordinators connect participants to Blueprint PCMH practices; Wellness Nurses work alongside CHT care coordinators.", color: "border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400", text: "text-emerald-700" },
            { href: "/vermont-rht-program", label: "Vermont VCCI", desc: "High-risk SASH participants who are also Medicaid-enrolled may qualify for VCCI intensive case management. SASH Coordinators and VCCI case managers coordinate for dual-enrolled participants.", color: "border-rose-200 hover:bg-rose-50 hover:border-rose-400", text: "text-rose-700" },
            { href: "/ahead-model", label: "AHEAD Model", desc: "SASH participants' primary care practices participate in AHEAD. Reduced SASH utilization flows directly into AHEAD total cost of care performance, creating financial alignment between housing investment and healthcare savings.", color: "border-sky-200 hover:bg-sky-50 hover:border-sky-400", text: "text-sky-700" },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`block border rounded-xl p-4 transition-all ${item.color}`}>
              <p className={`font-black text-sm mb-1.5 ${item.text}`}>{item.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <SectionHeader label="Resources" title="Reports & Research" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "https://sashvt.org/", label: "SASH Vermont — Official Website", desc: "Program overview, participant stories, coordinator locator, and news" },
            { href: "https://cathedralsquare.org/sash/", label: "Cathedral Square: SASH Program", desc: "Cathedral Square Corporation administers SASH — full program description, annual data, and housing community directory" },
            { href: "https://www.chcs.org/support-and-services-at-home-sash-helping-older-adults-and-people-with-disabilities-in-affordable-housing-age-in-place/", label: "CHCS: SASH — Helping Older Adults Age in Place", desc: "Center for Health Care Strategies analysis of SASH outcomes, program design, and replication potential" },
            { href: "https://shelterforce.org/2018/12/19/vermonts-sash-program-keeps-seniors-in-their-homes/", label: "Shelterforce: Vermont SASH Keeps Seniors in Their Homes", desc: "Narrative feature on SASH program model and participant impact" },
            { href: "https://www.ruralhealthinfo.org/project-examples/932", label: "Rural Health Information Hub: SASH Project Summary", desc: "Rural program summary including funding sources, evidence base, and contact information" },
            { href: "https://ruralhome.org/sash/", label: "Housing Assistance Council: Vermont SASH", desc: "National rural housing organization's summary of the SASH model for rural replication" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-teal-700 text-xs transition-colors">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
