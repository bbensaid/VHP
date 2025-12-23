import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function CaseStudiesPage() {
  return (
    <StaticPageLayout
      title="Case Studies Library"
      subtitle="Real-world examples of transformation in action."
      content={
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <span className="text-xs font-bold text-green-600 uppercase">
                Turnaround
              </span>
              <h3 className="font-bold text-xl mt-1">Saving Mercy Regional</h3>
              <p className="text-gray-600 text-sm mt-2">
                How a rural Vermont hospital avoided closure through strategic
                service line consolidation.
              </p>
            </div>
          </div>
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <span className="text-xs font-bold text-indigo-600 uppercase">
                Digital Transformation
              </span>
              <h3 className="font-bold text-xl mt-1">AI in the ED</h3>
              <p className="text-gray-600 text-sm mt-2">
                Reducing triage times by 40% using predictive machine learning
                models.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
