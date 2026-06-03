import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";
import FromTheBookForPillar from "@/components/FromTheBookForPillar";
import CoursesInPillar from "@/components/CoursesInPillar";
import { getPillar, type PillarId } from "@/lib/taxonomy";
import { PILLAR_OVERVIEW } from "@/lib/data/pillar-topics";

/**
 * Standard pillar hub page. Renders the eyebrow → title → tagline hero, the
 * From-the-Book callout, the topic-card grid, the tools-and-data grid, the
 * latest hub reports, and the subscribe CTA — all driven by data from
 * lib/taxonomy and lib/data/pillar-topics.
 *
 * A pillar page that needs to inject custom content (e.g. /policy's H.R. 1
 * tracker) passes it as `children`. The children appear between the
 * FromTheBook callout and the topic grid.
 *
 * The Operations pillar uses a non-standard layout (banner header, "Pillar
 * Question" section, dark backgrounds) and intentionally does NOT use this
 * component — see app/operations/page.tsx for its bespoke implementation.
 */

interface Props {
  pillarId: PillarId;
  /** Optional extra content rendered between FromTheBook and the topic grid. */
  children?: React.ReactNode;
}

const XL_GRID: Record<3 | 4 | 5, string> = {
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};

export default function PillarOverview({ pillarId, children }: Props) {
  const pillar = getPillar(pillarId);
  const content = PILLAR_OVERVIEW[pillarId];
  if (!content) {
    throw new Error(`No PillarOverview content for pillar "${pillarId}". Add an entry to lib/data/pillar-topics.ts.`);
  }

  const { eyebrow, title, tagline, topics, tools, topicGridXlCols = 4 } = content;
  const accent = pillar.classes;
  // Convert taxonomy classes (which embed Tailwind families) into the per-pillar
  // hover/border classes used by the topic and tool cards. The headerColor
  // token (e.g. "text-sky-700") is the pillar's primary text color.
  const textColor = accent.headerColor;
  const dotColor = accent.dot;
  const hoverBorder = accent.borderAccent.replace("border-", "hover:border-");
  const hoverBg = accent.hoverBg;
  const cardBg = accent.bgLight;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-12">
        <span className={`text-sm font-bold ${textColor} uppercase tracking-wider`}>
          {eyebrow}
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mt-2 mb-4">{title}</h1>
        <p className="ty-hero text-slate-600 max-w-3xl">{tagline}</p>
      </div>

      {/* From the book — chapter range derived from taxonomy */}
      <FromTheBookForPillar pillarId={pillarId} />

      {/* Optional custom slot (e.g. /policy's H.R. 1 tracker) */}
      {children}

      {/* Topic grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${XL_GRID[topicGridXlCols]} gap-6 mt-8`}>
        {topics.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 ${hoverBorder} ${hoverBg}`}
          >
            <div>
              <h3 className={`font-bold text-slate-900 text-base mb-2 group-hover:${textColor} transition-colors`}>
                {item.label}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Scope Includes
              </h4>
              {item.details.map((detail) => (
                <div key={detail} className="flex items-center gap-2">
                  <span className={`${dotColor.replace("bg-", "text-")} font-bold`}>✓</span>
                  <span className="text-xs font-medium text-slate-600">{detail}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                {item.scope}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tools & Data */}
      <div className="mt-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Tools &amp; Data for {pillar.label}
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group flex flex-col gap-2 p-4 rounded-xl border-2 ${accent.borderAccent.replace("border-", "border-").replace("-400", "-100")} ${hoverBorder.replace("border-", "border-").replace("-400", "-300")} ${cardBg.replace("bg-", "hover:bg-")} transition-all`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className={`text-sm font-bold text-slate-800 group-hover:${textColor} leading-tight`}>
                  {tool.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className={`text-xs font-bold ${textColor} group-hover:opacity-80 mt-auto`}>
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Courses in this pillar (Supabase) */}
      <CoursesInPillar
        pillarId={pillarId}
        colorClass={textColor}
        cardHoverClass={`${hoverBorder} ${hoverBg}`}
        titleHoverClass={`group-hover:${textColor}`}
      />

      {/* Latest reports for this pillar */}
      <LatestHubReports
        pillar={pillar.label}
        colorClass={textColor}
        cardHoverClass={`${hoverBorder} ${hoverBg}`}
        titleHoverClass={`group-hover:${textColor}`}
      />

      {/* Subscribe CTA */}
      <HubSubscribeCTA
        pillar={pillar.label}
        bgClass={cardBg}
        buttonClass={`${accent.headerColor.replace("text-", "bg-").replace("-700", "-600")} ${accent.headerColor.replace("text-", "hover:bg-").replace("-700", "-700")}`}
      />
    </div>
  );
}
