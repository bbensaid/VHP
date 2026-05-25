"use client";

import { usePathname } from "next/navigation";

export default function ScrollShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isCoursePage = pathname.startsWith("/academy/tracks/");
  return (
    <div className={`flex-1 min-h-0 ${isCoursePage ? "overflow-hidden" : "overflow-y-auto"}`}>
      {children}
    </div>
  );
}
