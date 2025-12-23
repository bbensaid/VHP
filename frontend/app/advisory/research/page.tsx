import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function ResearchPage() {
  return (
    <StaticPageLayout
      title="Custom Research Projects"
      subtitle="Data-driven intelligence tailored to your specific organizational questions."
      content={
        <div className="space-y-6">
          <p>
            When off-the-shelf market reports fall short, HTR deploys our
            research team to answer your specific strategic questions. We
            combine quantitative data analysis with qualitative expert
            interviews.
          </p>
          <h3 className="text-2xl font-bold mt-8">Methodology</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Survey Deployment:</strong> Access to our panel of 5,000+
              clinicians and administrators.
            </li>
            <li>
              <strong>Claims Data Analysis:</strong> Deep dives into
              de-identified patient data sets.
            </li>
            <li>
              <strong>Competitor Benchmarking:</strong> Blinded analysis of your
              performance relative to regional peers.
            </li>
          </ul>
        </div>
      }
    />
  );
}
