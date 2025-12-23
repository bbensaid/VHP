import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function WebinarsPage() {
  return (
    <StaticPageLayout
      title="Webinars & Events"
      subtitle="Live briefings on breaking news and policy updates."
      content={
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-bold text-indigo-600">
                  UPCOMING: Dec 20, 2:00 PM EST
                </span>
                <h3 className="text-xl font-bold mt-1">
                  The 2026 Fee Schedule Explained
                </h3>
                <p className="text-gray-600 mt-2">
                  What the new CMS cuts mean for your bottom line.
                </p>
              </div>
              <button className="text-indigo-600 font-bold border border-indigo-200 px-3 py-1 rounded bg-white">
                Register
              </button>
            </div>
          </div>

          <h3 className="font-bold text-lg mt-8 mb-4">Past Recordings</h3>
          <div className="grid gap-4">
            <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <h4 className="font-bold">AI Liability Frameworks</h4>
              <span className="text-xs text-gray-500">
                Aired Nov 12 • 45 mins
              </span>
            </div>
            <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <h4 className="font-bold">Rural Hospital Solvency</h4>
              <span className="text-xs text-gray-500">
                Aired Oct 05 • 60 mins
              </span>
            </div>
          </div>
        </div>
      }
    />
  );
}
