'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const TAB_LABELS: Record<string, string> = {
  // Academy
  personalized: "Personalized Learning",
  tracks: "Learning Tracks",
  courses: "Executive Masterclasses",
  faculty: "Faculty & Experts",
  webinars: "Webinars & Events",
  glossary: "Glossary",
  "case-studies": "Case Study Library",
  casestudies: "Case Study Library",
  // Advisory
  vbc: "Value-Based Care Models",
  workforce: "Clinical Workforce Gaps",
  telehealth: "Telehealth Reimbursement",
  consulting: "Strategic Consulting",
  research: "Custom Research Projects",
  reports: "Annual Impact Reports",
  contact: "Hire an Expert",
  // Multimedia
  podcasts: "HTR Podcast Network",
  videos: "Video Briefings",
  library: "Full Multimedia Library",
  // Dashboard
  index: "Performance Index",
  program: "RHT Program",
  hospitals: "Hospital View",
  // Connect
  cohorts: "Peer Cohorts",
  "office-hours": "Office Hours",
  toolkits: "Toolkits",
  grants: "Grant Finder",
  forums: "Pillar Circles",
  ask: "Ask HTR",
};

// Segments that should read as acronyms rather than title case ("hie" -> "HIE").
const ACRONYMS = new Set([
  "hie", "htr", "ai", "vbc", "apm", "ehr", "emr", "sdoh", "fhir", "cmmi", "hti",
  "aco", "ahs", "gmcb", "faq", "rht", "pmi", "hcc", "rbp", "api", "vt", "us",
]);

// The bar sits on one line next to the ticker. Deep paths keep Home, the
// parent and the current page, and fold everything between into "…".
const MAX_VISIBLE_SEGMENTS = 2;

function formatSegment(segment: string): string {
  return decodeURIComponent(segment)
    .split("-")
    .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

const Separator = () => <span className="mx-1 text-slate-300 shrink-0">/</span>;

// The ?tab= crumb needs useSearchParams, which suspends during static
// rendering. Keeping it in its own boundary means the path crumbs always
// render server-side instead of the whole bar flashing in after hydration.
function TabCrumb() {
  const activeTab = useSearchParams().get("tab");
  if (!activeTab) return null;
  return (
    <li className="flex items-center min-w-0">
      <Separator />
      <span className="font-semibold text-slate-900 dark:text-slate-100 truncate" aria-current="page">
        {TAB_LABELS[activeTab] || formatSegment(activeTab)}
      </span>
    </li>
  );
}

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";

  // Don't show on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const hiddenCount = Math.max(0, segments.length - MAX_VISIBLE_SEGMENTS);
  const hiddenLabel = segments.slice(0, hiddenCount).map(formatSegment).join(" / ");

  return (
    <nav aria-label="Breadcrumb" className="flex items-center h-full min-w-0">
      <ol className="flex items-center min-w-0 whitespace-nowrap text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
        <li className="shrink-0">
          <Link href="/" className="hover:text-slate-900 transition-colors flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
        </li>

        {hiddenCount > 0 && (
          <li className="flex items-center shrink-0">
            <Separator />
            <span className="text-slate-400 cursor-default" title={hiddenLabel}>…</span>
          </li>
        )}

        {segments.map((segment, index) => {
          if (index < hiddenCount) return null;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <li key={href} className={`flex items-center ${isLast ? "min-w-0" : "shrink-0"}`}>
              <Separator />
              {isLast ? (
                <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-56" title={label} aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors truncate max-w-40" title={label}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}

        <Suspense fallback={null}>
          <TabCrumb />
        </Suspense>
      </ol>
    </nav>
  );
}