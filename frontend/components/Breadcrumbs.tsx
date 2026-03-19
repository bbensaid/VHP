'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const TAB_LABELS: Record<string, string> = {
  courses: "Executive Masterclasses",
  faculty: "Faculty & Experts",
  webinars: "Webinars & Events",
  glossary: "Glossary",
  casestudies: "Case Study Library",
  vbc: "Value-Based Care Models",
  workforce: "Clinical Workforce Gaps",
  telehealth: "Telehealth Reimbursement",
  consulting: "Strategic Consulting",
  research: "Custom Research Projects",
  reports: "Annual Impact Reports",
  contact: "Hire an Expert",
  podcasts: "HTR Podcast Network",
  videos: "Video Briefings",
  library: "Full Multimedia Library",
  index: "Performance Index",
  program: "RHT Program",
  hospitals: "Hospital View",
};

function BreadcrumbsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Don't show on home page
  if (pathname === '/') return null;

  // Split path into segments and remove empty strings
  const segments = pathname.split('/').filter(item => item !== '');
  const activeTab = searchParams.get('tab');

  return (
    <nav aria-label="Breadcrumb" className="flex items-center h-full">
      <ol className="flex items-center space-x-2 text-xs font-medium text-slate-500 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          
          {/* Home Link */}
          <li>
            <Link href="/" className="hover:text-slate-900 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>

          {/* Dynamic Segments */}
          {segments.map((segment, index) => {
            // Build the url for this segment
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1 && !activeTab;

            // Format label: "new-hampshire" -> "New Hampshire"
            const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

            return (
              <li key={href} className="flex items-center">
                <span className="mx-2 text-slate-300">/</span>
                {isLast ? (
                  <span className="font-semibold text-slate-900" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}

          {/* Active Tab Breadcrumb */}
          {activeTab && (
            <li className="flex items-center">
              <span className="mx-2 text-slate-300">/</span>
              <span className="font-semibold text-slate-900" aria-current="page">
                {TAB_LABELS[activeTab] || activeTab.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </li>
          )}
        </ol>
    </nav>
  );
}

export default function Breadcrumbs() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbsInner />
    </Suspense>
  );
}