"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// MAPPING: Convert URL paths to readable specific titles
const routeNameMap: { [key: string]: string } = {
  dashboard: "Intelligence",
  vermont: "Vermont State Profile",
  nvrh: "Northeastern VT Regional (NVRH)",
  about: "About HTR",
  "htr-index": "Methodology",
  // Add other known routes here
};

const Breadcrumbs = () => {
  const pathname = usePathname();

  // 2. Split the path into segments (e.g., ['dashboard', 'vermont', 'nvrh'])
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className="flex items-center space-x-2">
        {/* HOME LINK */}
        <li>
          <Link
            href="/"
            className="text-[10px] font-medium text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors font-mono"
          >
            HOME
          </Link>
        </li>

        {/* DYNAMIC SEGMENTS */}
        {pathSegments.map((segment, index) => {
          // Reconstruct the path for this segment (e.g., /dashboard/vermont)
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

          // Determine if this is the last item (current page)
          const isLast = index === pathSegments.length - 1;

          // Get readable name or fallback to capitalizing the segment
          const displayName =
            routeNameMap[segment] || segment.replace(/-/g, " ").toUpperCase();

          return (
            <React.Fragment key={href}>
              {/* SEPARATOR */}
              <li className="text-slate-300 text-[10px] px-1">/</li>

              {/* BREADCRUMB ITEM */}
              <li>
                {isLast ? (
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider cursor-default font-mono">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-[10px] font-medium text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors font-mono"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
