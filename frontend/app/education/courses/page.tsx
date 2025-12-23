import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function CoursesPage() {
  return (
    <StaticPageLayout
      title="Executive Masterclasses"
      subtitle="Intensive, certification-ready courses for healthcare leaders."
      content={
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                Next Cohort: Jan 15
              </span>
              <h3 className="text-xl font-bold mt-1">
                AI Governance Certification
              </h3>
              <p className="text-gray-600 text-sm">
                6-week intensive on regulating clinical algorithms.
              </p>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-bold">
              Enroll $2,499
            </button>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-green-600 uppercase tracking-wide">
                Self-Paced
              </span>
              <h3 className="text-xl font-bold mt-1">
                Economics of Value-Based Care
              </h3>
              <p className="text-gray-600 text-sm">
                Master the math behind risk-adjustment and capitation.
              </p>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-bold">
              Enroll $1,299
            </button>
          </div>
        </div>
      }
    />
  );
}
