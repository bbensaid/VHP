// components/academy/AcademyCard.tsx
import Link from "next/link";

interface AcademyCardProps {
  type: "CERTIFICATION" | "COURSE" | "WEBINAR";
  pillar: "Policy" | "Economics" | "Technology" | "General";
  title: string;
  description: string;
  meta: string; // e.g., "6 Weeks • Online" or "Oct 25 • 2:00 PM EST"
  price?: string;
  instructors?: string[];
  href: string;
  imageColor?: string; // Optional override for gradient/bg
}

const PILLAR_STYLES = {
  Policy: { badge: "bg-blue-100 text-blue-800", border: "border-l-blue-500" },
  Economics: { badge: "bg-emerald-100 text-emerald-800", border: "border-l-emerald-500" },
  Technology: { badge: "bg-indigo-100 text-indigo-800", border: "border-l-indigo-500" },
  General: { badge: "bg-slate-100 text-slate-800", border: "border-l-slate-500" },
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
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
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
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-indigo-50 transition-colors">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-indigo-700">
          View Curriculum
        </span>
        <span className="text-indigo-600 text-lg group-hover:translate-x-1 transition-transform">
          &rarr;
        </span>
      </div>
    </Link>
  );
}