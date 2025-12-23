import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function FacultyPage() {
  return (
    <StaticPageLayout
      title="Faculty & Experts"
      subtitle="Learn from the architects of modern health policy."
      content={
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">Dr. Elena Rostova</h3>
            <p className="text-indigo-600 text-sm">Chief Economist</p>
            <p className="text-gray-500 text-sm mt-2">
              Former advisor to the CMS Innovation Center specializing in labor
              markets.
            </p>
          </div>
          <div className="p-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">Marcus Thorne, JD</h3>
            <p className="text-indigo-600 text-sm">Head of Policy</p>
            <p className="text-gray-500 text-sm mt-2">
              Expert in liability frameworks for autonomous medical systems.
            </p>
          </div>
          <div className="p-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">Sarah Jenkins</h3>
            <p className="text-indigo-600 text-sm">Clinical Operations Lead</p>
            <p className="text-gray-500 text-sm mt-2">
              20 years experience optimizing hospital workflows with technology.
            </p>
          </div>
        </div>
      }
    />
  );
}
