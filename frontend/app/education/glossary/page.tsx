import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function GlossaryPage() {
  return (
    <StaticPageLayout
      title="Policy & Tech Glossary"
      subtitle="Defining the lexicon of health transformation."
      content={
        <div className="grid gap-6">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Accountable Care Organization (ACO)
            </h3>
            <p className="text-gray-600">
              A group of doctors, hospitals, and other health care providers,
              who come together voluntarily to give coordinated high-quality
              care to their Medicare patients.
            </p>
          </div>
          <hr />
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Interoperability
            </h3>
            <p className="text-gray-600">
              The ability of different information systems, devices and
              applications (systems) to access, exchange, integrate and
              cooperatively use data in a coordinated manner.
            </p>
          </div>
          <hr />
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Relative Value Unit (RVU)
            </h3>
            <p className="text-gray-600">
              A measure of value used in the United States Medicare
              reimbursement formula for physician services.
            </p>
          </div>
        </div>
      }
    />
  );
}
