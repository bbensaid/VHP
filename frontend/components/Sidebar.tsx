import React from "react";
import StateMonitor from "@/components/sidebar/StateMonitor"; // <--- FIXED IMPORT
import PolicyCalendar from "@/components/PolicyCalendar"; // Assumed location based on repo
import NewsTicker from "@/components/NewsTicker"; // Assumed location based on repo

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* 1. STATE MONITOR WIDGET */}
      <StateMonitor />

      {/* 2. POLICY CALENDAR WIDGET */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Policy Calendar
          </h3>
        </div>
        <div className="p-4">
          <PolicyCalendar />
        </div>
      </div>

      {/* 3. NEWS TICKER WIDGET */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Trending News
          </h3>
        </div>
        <div>
          <NewsTicker />
        </div>
      </div>
    </aside>
  );
}