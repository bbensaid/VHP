import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function ReportsPage() {
  return (
    <StaticPageLayout
      title="Annual Impact Reports"
      subtitle="Comprehensive reviews of the macro-trends shaping the healthcare landscape."
      content={
        <div className="space-y-6">
          <div className="p-8 border border-gray-200 rounded-xl flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow">
            <div className="h-32 w-24 bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-800 font-bold">
              PDF
            </div>
            <div>
              <h3 className="text-xl font-bold">The State of Health AI 2025</h3>
              <p className="text-gray-600 my-2">
                Our flagship report analyzing the adoption rates, ROI, and legal
                challenges of generative AI in clinical settings.
              </p>
              <button className="text-indigo-600 font-bold hover:underline">
                Download Report (Free) &rarr;
              </button>
            </div>
          </div>

          <div className="p-8 border border-gray-200 rounded-xl flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow">
            <div className="h-32 w-24 bg-green-100 flex items-center justify-center flex-shrink-0 text-green-800 font-bold">
              PDF
            </div>
            <div>
              <h3 className="text-xl font-bold">Vermont Health System Audit</h3>
              <p className="text-gray-600 my-2">
                A deep dive into the solvency crisis facing rural hospitals and
                the necessary policy interventions.
              </p>
              <button className="text-indigo-600 font-bold hover:underline">
                Download Report (Client Only) &rarr;
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
