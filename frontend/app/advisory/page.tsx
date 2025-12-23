// app/advisory/page.tsx

import CommentsSection from "@/components/CommentsSection";

import React from "react";
import Link from "next/link";

const AdvisoryPage: React.FC = () => {
  // Service Offerings Data
  const services = [
    {
      title: "Strategic Consulting",
      description:
        "Navigate regulatory shifts and market volatility with confidence. We partner with health systems and payers to design long-term strategies that align policy compliance with economic growth.",
      link: "/advisory/consulting",
      icon: "🏛️",
    },
    {
      title: "Custom Research Projects",
      description:
        'Commission bespoke analysis on niche topics. From "The Economics of CRISPR in Rural Hospitals" to "State-Level Telehealth Policy Forecasts," we deliver data-backed intelligence tailored to your specific questions.',
      link: "/advisory/research",
      icon: "📊",
    },
    {
      title: "Annual Impact Reports",
      description:
        "Gain access to our flagship annual reviews. These comprehensive documents synthesize thousands of data points to predict the major trends at the convergence of Policy, Economics, and Technology.",
      link: "/advisory/reports",
      icon: "📑",
    },
    {
      title: "Hire an Expert",
      description:
        "Need a keynote speaker, a board advisor, or an expert witness? Access our network of former policymakers, health economists, and CTOs for direct engagement.",
      link: "/advisory/contact",
      icon: "🤝",
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* 1. HERO SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-heading mb-6 tracking-tight">
          Turn Complexity Into Strategy
        </h1>
        <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
          The convergence of Health Policy, Economics, and Technology creates
          noise.
          <span className="font-semibold text-text-heading">
            {" "}
            HTR Advisory{" "}
          </span>
          provides the signal. We equip leadership teams with the rigorous,
          non-partisan intelligence needed to make high-stakes decisions.
        </p>
      </div>
      {/* 2. SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {services.map((service) => (
          <div
            key={service.title}
            className="p-8 bg-surface border border-ui-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold text-text-heading mb-3">
              {service.title}
            </h3>
            <p className="text-text-body mb-6">{service.description}</p>
            <Link
              href={service.link}
              className="text-ui-primary font-semibold hover:underline"
            >
              Learn more &rarr;
            </Link>
          </div>
        ))}
      </div>
      {/* 3. THE HTR ADVANTAGE (Why Us?) */}
      <div className="bg-surface-muted rounded-2xl p-10 md:p-14 mb-20">
        <h2 className="text-3xl font-bold text-text-heading mb-8 border-l-4 border-ui-primary pl-4">
          The HTR Advantage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-xl font-bold text-text-heading mb-2">
              Cross-Disciplinary
            </h4>
            <p className="text-text-body text-sm">
              We don't look at policy in a vacuum. Every recommendation is
              stress-tested against economic realities and technological
              feasibility.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-text-heading mb-2">
              Data-Driven
            </h4>
            <p className="text-text-body text-sm">
              Our advice isn't based on sentiment. It's grounded in proprietary
              modeling, legislative text analysis, and market data.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-text-heading mb-2">
              Non-Partisan
            </h4>
            <p className="text-text-body text-sm">
              We serve the outcome, not the ideology. Our analysis provides the
              objective clarity needed for sustainable transformation.
            </p>
          </div>
        </div>
      </div>
      {/* 4. FINAL CTA */}
      <div className="text-center py-12 border-t border-ui-border">
        <h3 className="text-3xl font-bold text-text-heading mb-4">
          Ready to clear the fog?
        </h3>
        <p className="text-lg text-text-body mb-8">
          Schedule a discovery call with our principal analysts today.
        </p>
        <Link
          href="/advisory/contact"
          className="inline-block px-8 py-4 bg-ui-primary text-text-inverse text-lg font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
        >
          Book a Discovery Call
        </Link>
      </div>
      <CommentsSection />
    </div>
  );
};

export default AdvisoryPage;
