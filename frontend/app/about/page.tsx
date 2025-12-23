// app/about/page.tsx

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      {/* --- Mission & Vision --- */}
      <section className="mb-12 border-b pb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Defining the Future of Health Strategy
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The core mission of **Health Transformation Review (HTR)** is to
              serve as the definitive, non-partisan nexus where the dynamic
              forces of **Policy, Economics, and Technology** converge. We
              provide rigorous, synthesized analysis and forward-looking
              insights necessary for leaders to navigate and drive substantial,
              ethical, and sustainable change across global healthcare systems.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a global healthcare landscape that is universally
              accessible, financially sustainable, and radically
              effective—powered by data-driven technology and guided by
              informed, strategic policy. HTR strives to be the indispensable
              source that accelerates this transformation.
            </p>
          </div>
        </div>
      </section>

      {/* --- The Three Pillars --- */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-gray-400 pl-3">
          The Three Pillars of Review
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Real transformation requires a holistic understanding. HTR’s analysis
          assesses three interconnected dimensions:
        </p>
        <ul className="space-y-4 text-gray-800">
          <li className="font-semibold text-blue-700">
            Policy: Understanding the regulatory, legislative, and ethical
            frameworks.{" "}
            <span className="font-normal italic text-gray-600">
              We ask: Is it permissible?
            </span>
          </li>
          <li className="font-semibold text-green-700">
            Economics: Evaluating the market dynamics, value-based models, and
            investment required for viability.{" "}
            <span className="font-normal italic text-gray-600">
              We ask: Is it affordable and scalable?
            </span>
          </li>
          <li className="font-semibold text-indigo-700">
            Technology: Reviewing the efficacy, security, and integration of
            cutting-edge tools.{" "}
            <span className="font-normal italic text-gray-600">
              We ask: Does it work, and is it secure?
            </span>
          </li>
        </ul>
      </section>

      {/* --- Methodology & Team --- */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-gray-400 pl-3">
          Our Commitment to Rigor
        </h2>

        {/* Methodology */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            HTR Methodology
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              **Non-Partisan Analysis:** Research is strictly free from
              influence by external funders or political mandates.
            </li>
            <li>
              **Data-Driven Synthesis:** We utilize a Three-Dimensional Impact
              Model to synthesize data from regulatory transcripts, economic
              models, and adoption metrics.
            </li>
            <li>
              **Reviewer Expertise:** Content is validated by a diverse network
              of subject matter experts, including health economists, regulatory
              attorneys, and CTOs.
            </li>
          </ol>
        </div>

        {/* Team Placeholder */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Our Team</h3>
          <p className="text-gray-700 leading-relaxed italic border-t pt-4">
            **Expertise at the Nexus.** Our team is comprised of professionals
            who have directly driven change in healthcare systems. Our core
            commitment is to maintaining a reviewer base with proven track
            records in industry and government, ensuring our analysis is
            actionable and grounded in practical experience. (Full team
            directory forthcoming.)
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
