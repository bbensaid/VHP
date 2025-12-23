// app/education/page.tsx

import React from "react";
import Link from "next/link";

const EducationPage: React.FC = () => {
  const resources = [
    {
      title: "Executive Masterclasses",
      description:
        'Deep-dive video courses designed for healthcare leaders. Topics range from "AI Governance" to "Value-Based Contracting Strategies."',
      link: "/education/courses",
      badge: "Premium",
    },
    {
      title: "Live Webinars & Events",
      description:
        "Join monthly interactive sessions with global policymakers and tech innovators. Participate in Q&A and networking.",
      link: "/education/webinars",
      badge: "Live",
    },
    {
      title: "Policy & Tech Glossary",
      description:
        'The definitive reference for healthcare transformation terminology. Decode complex jargon from "Interoperability" to "Risk Adjustment."',
      link: "/education/glossary",
      badge: "Free Resource",
    },
    {
      title: "Real-World Case Studies",
      description:
        "Practical examples of transformation in action. See how health systems successfully implemented new policies and technologies.",
      link: "/education/case-studies",
      badge: "Library",
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* 1. HERO SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-heading mb-6 tracking-tight">
          The HTR Learning Hub
        </h1>
        <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
          Bridging the knowledge gap. Whether you need a quick definition or a
          comprehensive certification, our education platform provides the
          clarity you need to lead.
        </p>
      </div>

      {/* 2. MAIN RESOURCES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="flex flex-col h-full p-8 bg-surface border border-ui-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              {/* Badge uses consistent Primary/Inverse styling */}
              <span className="inline-block px-3 py-1 text-xs font-bold text-ui-text-on-primary bg-ui-primary rounded-full uppercase tracking-wide">
                {resource.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-text-heading mb-3">
              {resource.title}
            </h3>
            <p className="text-text-body mb-6 flex-grow">
              {resource.description}
            </p>
            <Link
              href={resource.link}
              className="text-ui-primary font-bold hover:underline self-start"
            >
              Explore {resource.title} &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* 3. FEATURED EVENT */}
      <div className="bg-surface border border-ui-border rounded-2xl p-10 md:p-12 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h4 className="text-sm font-bold text-text-body uppercase tracking-widest mb-2">
              Upcoming Live Session
            </h4>
            <h2 className="text-3xl font-bold text-text-heading mb-4">
              The Future of Telehealth Reimbursement
            </h2>
            <p className="text-text-body mb-6">
              Join us on October 25th for a live panel discussion with CMS
              representatives and private payer executives discussing the 2025
              fee schedule.
            </p>
            <div className="flex items-center space-x-4">
              {/* Button matched to Header Subscribe style */}
              <Link
                href="/education/webinars/register"
                className="px-6 py-3 bg-ui-primary text-ui-text-on-primary font-bold rounded-lg hover:opacity-90 transition-all"
              >
                Register for Free
              </Link>
              <span className="text-sm text-text-body font-medium">
                Limited spots available
              </span>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-full h-48 bg-surface-muted rounded-lg flex items-center justify-center border border-ui-border text-text-body">
              [Event Graphic]
            </div>
          </div>
        </div>
      </div>

      {/* 4. NEWSLETTER CTA */}
      <div className="text-center py-12 border-t border-ui-border">
        <h3 className="text-3xl font-bold text-text-heading mb-4">
          Stay Informed
        </h3>
        <p className="text-lg text-text-body mb-8 max-w-2xl mx-auto">
          New courses and case studies are added weekly. Subscribe to our
          Learning Newsletter to get the latest resources delivered to your
          inbox.
        </p>
        {/* Button matched to Header Subscribe style */}
        <Link
          href="/subscribe"
          className="inline-block px-8 py-4 bg-ui-primary text-ui-text-on-primary font-bold rounded-lg hover:opacity-90 transition-all shadow-sm"
        >
          Subscribe to Updates
        </Link>
      </div>
    </div>
  );
};

export default EducationPage;
