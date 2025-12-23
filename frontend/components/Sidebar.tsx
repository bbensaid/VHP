// components/Sidebar.tsx
import React from "react";
import PolicyCalendar from "./sidebar/PolicyCalendar";
import SectorVitals from "./sidebar/SectorVitals";
import AnalystNote from "./sidebar/AnalystNote";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full flex flex-col gap-2">
      {/* 1. Editor's Insight (Top Priority) */}
      <AnalystNote />

      {/* 2. Systemic Health (The Numbers) */}
      <SectorVitals />

      {/* 3. Deadlines (The Utility) */}
      <PolicyCalendar />

      {/* 4. The Only 'Ad' - Premium Subscription */}
      <div className="bg-slate-900 rounded-lg p-6 text-center shadow-lg">
        <h3 className="text-white font-bold text-lg mb-2">
          Unlock Full Intelligence
        </h3>
        <p className="text-slate-400 text-xs mb-4">
          Get unrestricted access to our VBC forecast models and policy impact
          reports.
        </p>
        <Link
          href="/subscribe"
          className="block w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded transition-colors"
        >
          Start Free Trial
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
