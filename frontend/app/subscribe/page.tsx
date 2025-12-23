// app/subscribe/page.tsx

import React from "react";
import Link from "next/link";

const SubscribePage: React.FC = () => {
  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-heading mb-6 tracking-tight">
          Choose Your Intelligence Level
        </h1>
        <p className="text-xl text-text-body max-w-2xl mx-auto">
          Join 15,000+ healthcare leaders who rely on HTR for non-partisan
          analysis and strategic foresight.
        </p>
      </div>

      {/* Pricing Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* Tier 1: Free */}
        <div className="p-8 bg-surface border border-ui-border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold text-text-heading mb-2">Observer</h3>
          <p className="text-text-body text-sm mb-6">
            Essential news & public policy briefs.
          </p>
          <div className="mb-6">
            <span className="text-4xl font-black text-text-heading">$0</span>
            <span className="text-text-body">/month</span>
          </div>
          <button className="w-full py-3 border-2 border-ui-border font-bold text-text-heading rounded-lg hover:bg-surface-muted transition mb-8">
            Sign Up Free
          </button>
          <ul className="space-y-4 text-sm text-text-body">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Weekly
              "Convergence" Newsletter
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Public Policy
              Tracker
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Limited Podcast
              Access
            </li>
          </ul>
        </div>

        {/* Tier 2: Professional (Highlighted) */}
        <div className="p-8 bg-surface border-2 border-ui-primary rounded-2xl shadow-xl relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ui-primary text-ui-text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Most Popular
          </div>
          <h3 className="text-xl font-bold text-ui-primary mb-2">Strategist</h3>
          <p className="text-text-body text-sm mb-6">
            Deep dives, data models & education.
          </p>
          <div className="mb-6">
            <span className="text-4xl font-black text-text-heading">$49</span>
            <span className="text-text-body">/month</span>
          </div>
          <button className="w-full py-3 bg-ui-primary text-ui-text-on-primary font-bold rounded-lg hover:opacity-90 transition mb-8 shadow-md">
            Start 14-Day Trial
          </button>
          <ul className="space-y-4 text-sm text-text-body font-medium">
            <li className="flex items-center">
              <span className="text-ui-primary mr-2">✓</span>{" "}
              <strong>All Observer features</strong>
            </li>
            <li className="flex items-center">
              <span className="text-ui-primary mr-2">✓</span> Full Economic
              Impact Models
            </li>
            <li className="flex items-center">
              <span className="text-ui-primary mr-2">✓</span> Unrestricted Case
              Study Library
            </li>
            <li className="flex items-center">
              <span className="text-ui-primary mr-2">✓</span> Webinar Archive
              Access
            </li>
            <li className="flex items-center">
              <span className="text-ui-primary mr-2">✓</span> 20% Off
              Masterclasses
            </li>
          </ul>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="p-8 bg-surface-muted border border-ui-border rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-text-heading mb-2">
            Enterprise
          </h3>
          <p className="text-text-body text-sm mb-6">
            For strategy teams & health systems.
          </p>
          <div className="mb-6">
            <span className="text-4xl font-black text-text-heading">
              Custom
            </span>
          </div>
          <Link
            href="/advisory/contact"
            className="block w-full py-3 bg-text-heading text-text-inverse font-bold text-center rounded-lg hover:opacity-90 transition mb-8"
          >
            Contact Sales
          </Link>
          <ul className="space-y-4 text-sm text-text-body">
            <li className="flex items-center">
              <span className="text-text-heading mr-2">✓</span>{" "}
              <strong>Multi-seat Licenses</strong>
            </li>
            <li className="flex items-center">
              <span className="text-text-heading mr-2">✓</span> Custom API
              Access to Data
            </li>
            <li className="flex items-center">
              <span className="text-text-heading mr-2">✓</span> Quarterly
              Analyst Briefings
            </li>
            <li className="flex items-center">
              <span className="text-text-heading mr-2">✓</span> White-labeled
              Reports
            </li>
          </ul>
        </div>
      </div>

      {/* Social Proof with Logo Placeholders */}
      <div className="text-center pt-16 border-t border-ui-border">
        <p className="text-sm font-bold text-text-body uppercase tracking-widest mb-8">
          Trusted by Strategy Teams at
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale items-center">
          {/* NOTE: These are placeholder images. 
            To use real logos, replace the 'src' with the path to your image files 
            (e.g., '/images/cleveland-clinic-logo.svg') and adjust the height (h-10) as needed.
          */}
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Cleveland+Clinic"
            alt="Cleveland Clinic"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Humana"
            alt="Humana"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=McKinsey+%26+Co"
            alt="McKinsey & Co"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Oracle+Health"
            alt="Oracle Health"
            className="h-12 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
