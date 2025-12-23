import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function ConsultingPage() {
  return (
    <StaticPageLayout
      title="Strategic Consulting"
      subtitle="Bespoke guidance for health systems navigating value-based care transitions."
      content={
        <div className="space-y-8">
          <p>
            HTR Advisory partners directly with C-Suite executives to design
            resilient operational frameworks. We move beyond theory to implement
            actionable strategies that protect margins and improve clinical
            outcomes.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-indigo-900">
                Operational Efficiency
              </h3>
              <p className="text-sm">
                Lean six sigma application in clinical workflows to reduce
                administrative burden.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-indigo-900">
                Payer Negotiation
              </h3>
              <p className="text-sm">
                Data-backed strategies for maximizing reimbursement rates in VBC
                contracts.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-indigo-900">
                M&A Integration
              </h3>
              <p className="text-sm">
                Cultural and technical roadmap design for hospital system
                consolidation.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-indigo-900">
                Risk Adjustment
              </h3>
              <p className="text-sm">
                Optimizing coding accuracy and documentation to reflect true
                patient acuity.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
