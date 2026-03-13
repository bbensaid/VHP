// components/academy/AcademyCard.tsx
import Link from "next/link";

interface AcademyCardProps {
  type: "CERTIFICATION" | "COURSE" | "WEBINAR";
  pillar: "Policy" | "Economics" | "Technology" | "Clinical" | "Equity" | "General";
  title: string;
  description: string;
  meta: string; // e.g., "6 Weeks • Online" or "Oct 25 • 2:00 PM EST"
  price?: string;
  instructors?: string[];
  href: string;
  imageColor?: string; // Optional override for gradient/bg
}

const PILLAR_STYLES = {
  Policy:     { badge: "bg-sky-100 text-sky-800",     border: "border-l-sky-500",     hoverTitle: "group-hover:text-sky-700",     footerBg: "group-hover:bg-sky-50",     footerText: "group-hover:text-sky-700",     arrow: "text-sky-600" },
  Economics:  { badge: "bg-emerald-100 text-emerald-800", border: "border-l-emerald-500", hoverTitle: "group-hover:text-emerald-700", footerBg: "group-hover:bg-emerald-50", footerText: "group-hover:text-emerald-700", arrow: "text-emerald-600" },
  Technology: { badge: "bg-indigo-100 text-indigo-800", border: "border-l-indigo-500",  hoverTitle: "group-hover:text-indigo-600", footerBg: "group-hover:bg-indigo-50",  footerText: "group-hover:text-indigo-700", arrow: "text-indigo-600" },
  Clinical:   { badge: "bg-rose-100 text-rose-800",    border: "border-l-rose-500",    hoverTitle: "group-hover:text-rose-600",    footerBg: "group-hover:bg-rose-50",    footerText: "group-hover:text-rose-700",    arrow: "text-rose-600" },
  Equity:     { badge: "bg-orange-100 text-orange-800", border: "border-l-orange-500",  hoverTitle: "group-hover:text-orange-600",  footerBg: "group-hover:bg-orange-50",  footerText: "group-hover:text-orange-700",  arrow: "text-orange-600" },
  General:    { badge: "bg-slate-100 text-slate-800",  border: "border-l-slate-500",   hoverTitle: "group-hover:text-slate-700",   footerBg: "group-hover:bg-slate-50",   footerText: "group-hover:text-slate-700",   arrow: "text-slate-500" },
};

export default function AcademyCard({
  type,
  pillar,
  title,
  description,
  meta,
  price,
  instructors,
  href,
}: AcademyCardProps) {
  const styles = PILLAR_STYLES[pillar] || PILLAR_STYLES.General;

  return (
    <Link 
      href={href}
      className={`group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 ${styles.border}`}
    >
      {/* Card Header */}
      <div className="p-6 pb-4 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}>
            {pillar} • {type}
          </span>
          {price && <span className="text-sm font-bold text-gray-900">{price}</span>}
        </div>
        
        <h3 className={`text-xl font-bold text-gray-900 mb-3 ${styles.hoverTitle} transition-colors`}>
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Meta Info Row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium border-t border-gray-100 pt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {meta}
          </span>
          {instructors && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {instructors.length > 0 ? instructors[0] + (instructors.length > 1 ? ` +${instructors.length - 1}` : "") : "Expert Faculty"}
            </span>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className={`bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center ${styles.footerBg} transition-colors`}>
        <span className={`text-xs font-bold text-gray-500 uppercase tracking-widest ${styles.footerText}`}>
          View Curriculum
        </span>
        <span className={`${styles.arrow} text-lg group-hover:translate-x-1 transition-transform`}>
          &rarr;
        </span>
      </div>
    </Link>
  );
}