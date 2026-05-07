"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/SidebarContext";
import {
  HomeIcon,
  AcademicCapIcon,
  BeakerIcon,
  BriefcaseIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  BeakerIcon as BeakerIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  SparklesIcon as SparklesIconSolid,
} from "@heroicons/react/24/solid";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon, IconActive: HomeIconSolid, matchExact: true },
  { href: "/academy", label: "Academy", Icon: AcademicCapIcon, IconActive: AcademicCapIconSolid, matchExact: false },
  { href: "/research-lab", label: "Tools", Icon: BeakerIcon, IconActive: BeakerIconSolid, matchExact: false },
  { href: "/advisory", label: "Advisory", Icon: BriefcaseIcon, IconActive: BriefcaseIconSolid, matchExact: false },
];

export default function BottomNav() {
  const pathname = usePathname() ?? "";
  const { isRightOpen, setRightOpen } = useSidebar();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[45] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-stretch"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom navigation"
    >
      {NAV_ITEMS.map(({ href, label, Icon, IconActive, matchExact }) => {
        const active = isActive(href, matchExact);
        const ActiveIcon = active ? IconActive : Icon;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[10px] font-bold uppercase tracking-wide transition-colors ${
              active
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <ActiveIcon className="w-5 h-5" aria-hidden="true" />
            {label}
          </Link>
        );
      })}

      {/* AI Ask — centre CTA */}
      <button
        onClick={() => setRightOpen(!isRightOpen)}
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[10px] font-bold uppercase tracking-wide transition-colors ${
          isRightOpen
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        }`}
        aria-label="Toggle AI Analyst"
      >
        {isRightOpen ? (
          <SparklesIconSolid className="w-5 h-5" aria-hidden="true" />
        ) : (
          <SparklesIcon className="w-5 h-5" aria-hidden="true" />
        )}
        Ask AI
      </button>
    </nav>
  );
}
