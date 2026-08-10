import Link from "next/link";
import FromTheBook from "@/components/FromTheBook";
import { PILLARS } from "@/lib/taxonomy/pillars";
import { TOOLS, type Tool } from "@/lib/taxonomy/tools";

export const metadata = {
  title: "HTR Research Lab | Health Transformation Review",
  description: `${TOOLS.length} interactive analytical tools organized by the six-pillar framework: Policy, Economics, Technology, Clinical, Equity, and Operations.`,
};

// Presentation-only color classes per pillar (content comes from the taxonomy).
const PILLAR_STYLES: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  policy:     { color: "text-sky-700",     bg: "bg-sky-50",     border: "border-sky-200",     dot: "bg-sky-500" },
  economics:  { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  technology: { color: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-200",  dot: "bg-indigo-500" },
  clinical:   { color: "text-red-700",     bg: "bg-red-50",     border: "border-red-200",     dot: "bg-red-500" },
  equity:     { color: "text-violet-700",  bg: "bg-violet-50",  border: "border-violet-200",  dot: "bg-violet-500" },
  operations: { color: "text-teal-700",    bg: "bg-teal-50",    border: "border-teal-200",    dot: "bg-teal-500" },
};

const CROSS_PILLAR_STYLE = { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" };

// Tools spanning most of the framework are shown in their own cross-pillar
// section; everything else is grouped under its primary (first-listed) pillar.
const isCrossPillar = (t: Tool) => t.pillars.length >= 4;

export default function ResearchLabPage() {
  const sections: { id: string; label: string; style: typeof CROSS_PILLAR_STYLE; intelligenceHref?: string; tools: readonly Tool[] }[] = [
    ...PILLARS.map((p) => ({
      id: p.id,
      label: p.label,
      style: PILLAR_STYLES[p.id],
      intelligenceHref: p.href,
      tools: TOOLS.filter((t) => !isCrossPillar(t) && t.pillars[0] === p.id),
    })),
    {
      id: "cross-pillar",
      label: "Cross-Pillar Simulators & Dashboards",
      style: CROSS_PILLAR_STYLE,
      tools: TOOLS.filter(isCrossPillar),
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-4">HTR Research Lab</span>
          <h1 className="ty-h1-xl font-black tracking-tight mb-5 leading-tight">{TOOLS.length} Analytical Tools — Organized by Domain</h1>
          <p className="ty-hero text-slate-300 max-w-2xl leading-relaxed">
            Every tool is assigned to one of the six pillars. Access tools directly from their pillar section in the sidebar, or browse the full directory below.
          </p>
        </div>
      </div>


      {/* Tools by pillar */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <FromTheBook
          chapter="Chapters 1–16"
          chapterTitle="Every Research Lab Tool Has a Chapter"
          excerpt="The Research Lab is the interactive counterpart to the book. The Policy Simulator maps to Chapters 2–3, the APM Design Lab to Chapters 6–7, and the Risk Stratification Engine to Chapters 4, 8, and 9. Appendix E lists every platform tool, and Appendix G is the reader's guide to working the book on the platform."
          href="/book"
        />

        <h2 className="text-2xl font-black text-slate-900">Tools by Domain</h2>

        {sections.map((section) => (
          <div key={section.id} className={`rounded-2xl border ${section.style.border} ${section.style.bg} p-6`}>
            {/* Section header */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className={`w-3 h-3 rounded-full ${section.style.dot} shrink-0`} />
              <h3 className={`text-base font-black uppercase tracking-widest ${section.style.color}`}>
                {section.label}
              </h3>
              {section.intelligenceHref && (
                <Link
                  href={section.intelligenceHref}
                  className={`ml-auto text-[10px] font-bold uppercase tracking-widest ${section.style.color} hover:underline opacity-70`}
                >
                  {section.label} Intelligence →
                </Link>
              )}
            </div>

            {/* Tool cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {section.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="bg-white rounded-xl border border-white/80 hover:border-slate-200 hover:shadow-sm p-4 transition-all group"
                >
                  <p className={`text-sm font-bold ${section.style.color} mb-1 group-hover:underline`}>{tool.label}</p>
                  {tool.desc && <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Who uses it */}
      <div className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Built for Practitioners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: "Health Economists", desc: "Model cost-effectiveness, shared savings, and actuarial risk with domain-matched tools under the Economics pillar." },
              { role: "Policy Analysts", desc: "Simulate waiver impacts, benchmark HEDIS performance, and stress-test regulatory assumptions under the Policy pillar." },
              { role: "Technology Leaders", desc: "Validate FHIR implementations, govern AI models, and assess digital health readiness under the Technology pillar." },
              { role: "Clinical Quality Managers", desc: "Analyze HEDIS measure gaps, 30-day readmissions, and avoidable ED visits against synthetic Vermont patient panels. Calculate VBC shared savings from quality improvement." },
              { role: "Medicaid Program Staff", desc: "Walk through VCCI risk stratification — CDPS scoring, composite score calculation, SDOH screening, and tier assignment with synthetic Vermont Medicaid member scenarios." },
              { role: "VBC Care Management Directors", desc: "Decompose total cost of care, identify high vs. low value services, manage A1C and blood pressure panels, and apply HCC risk adjustment to ACO performance analysis." },
            ].map((item) => (
              <div key={item.role} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-900 mb-2">{item.role}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
