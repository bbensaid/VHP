// components/sidebar/PolicyCalendar.tsx
import React from "react";

const PolicyCalendar: React.FC = () => {
  const events = [
    {
      date: "Dec 15",
      title: "ACA Open Enrollment Ends",
      status: "Active",
      color: "text-green-600 bg-green-50",
    },
    {
      date: "Jan 01",
      title: "Price Transparency Fines",
      status: "Imminent",
      color: "text-red-600 bg-red-50",
    },
    {
      date: "Feb 10",
      title: "FDA Advisory: Alzheimer's",
      status: "Pending",
      color: "text-blue-600 bg-blue-50",
    },
    {
      date: "Mar 31",
      title: "VBC Reporting Deadline",
      status: "Future",
      color: "text-slate-500 bg-slate-100",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
        <span className="text-xl">🏛️</span>
        <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
          Regulatory Radar
        </h3>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex gap-3 items-start group cursor-pointer"
          >
            {/* Date Box */}
            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded w-12 h-12 flex-shrink-0">
              <span className="text-[9px] uppercase font-bold text-slate-500">
                {event.date.split(" ")[0]}
              </span>
              <span className="text-lg font-black text-slate-800 leading-none">
                {event.date.split(" ")[1]}
              </span>
            </div>

            {/* Details */}
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                {event.title}
              </p>
              <span
                className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${event.color}`}
              >
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <a
          href="/policy/calendar"
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600"
        >
          View Full Calendar →
        </a>
      </div>
    </div>
  );
};

export default PolicyCalendar;
