// app/dashboard/page.tsx

import React from "react";
import Link from "next/link";

const DashboardPage: React.FC = () => {
  // Mock User Data
  const user = {
    name: "Dr. Alex Mercer",
    role: "Chief Strategy Officer",
    organization: "Mercy Health System",
    plan: "Strategist Tier",
  };

  // Mock Progress Data
  const activeCourses = [
    {
      title: "AI Governance for CMOs",
      progress: 65, // Percentage
      nextModule: "Module 4: Liability Frameworks",
      link: "/education/courses",
    },
    {
      title: "Value-Based Contracting 101",
      progress: 30,
      nextModule: "Module 2: Risk Adjustment",
      link: "/education/courses",
    },
  ];

  // Mock Saved Content
  const savedItems = [
    {
      type: "Report",
      title: "2025 Policy Forecast: The AI Act",
      date: "Oct 24",
      link: "/advisory/reports",
    },
    {
      type: "Article",
      title: "Hospital Global Budgets: The Maryland Model",
      date: "Oct 20",
      link: "/economics/value",
    },
    {
      type: "Tool",
      title: "TCOC Simulator v2.0",
      date: "Oct 15",
      link: "/economics/value",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-ui-border pb-8 gap-6">
        <div>
          <span className="text-xs font-bold text-ui-primary uppercase tracking-wider mb-1 block">
            {user.organization} • {user.plan}
          </span>
          <h1 className="text-4xl font-extrabold text-text-heading">
            Welcome back, {user.name}
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-ui-border rounded-lg text-text-body font-bold hover:bg-surface-muted transition">
            Manage Subscription
          </button>
          <button className="px-6 py-2 bg-ui-primary text-ui-text-on-primary font-bold rounded-lg hover:opacity-90 transition shadow-sm">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. LEFT COLUMN: LEARNING CENTER (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Courses Card */}
          <div className="bg-surface border border-ui-border rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-text-heading">
                My Learning
              </h3>
              <Link
                href="/education/courses"
                className="text-sm font-bold text-ui-primary hover:underline"
              >
                View Catalog &rarr;
              </Link>
            </div>

            <div className="space-y-6">
              {activeCourses.map((course, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-text-heading group-hover:text-ui-primary transition">
                      {course.title}
                    </span>
                    <span className="text-sm font-bold text-text-body">
                      {course.progress}%
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-surface-muted rounded-full h-3 mb-2">
                    <div
                      className="bg-ui-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-body">
                      Up Next: {course.nextModule}
                    </span>
                    <Link
                      href={course.link}
                      className="text-xs font-bold text-ui-primary hover:underline"
                    >
                      Resume &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-ui-bg-light border border-ui-primary/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-text-heading mb-4">
              Recommended Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface p-4 rounded-lg border border-ui-primary/20 hover:shadow-md transition cursor-pointer">
                <span className="block text-2xl mb-2">📩</span>
                <h4 className="font-bold text-text-heading">
                  Schedule Analyst Call
                </h4>
                <p className="text-xs text-text-body mt-1">
                  You have 2 credits remaining this quarter.
                </p>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-ui-primary/20 hover:shadow-md transition cursor-pointer">
                <span className="block text-2xl mb-2">📥</span>
                <h4 className="font-bold text-text-heading">
                  Download Q3 Report
                </h4>
                <p className="text-xs text-text-body mt-1">
                  New Policy Forecast available.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: LIBRARY & TOOLS (1/3 width) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Saved Intelligence */}
          <div className="bg-surface border border-ui-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-heading mb-4 border-b border-ui-border pb-2">
              Saved Intelligence
            </h3>
            <ul className="space-y-4">
              {savedItems.map((item, i) => (
                <li key={i} className="group cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-ui-primary bg-ui-bg-light px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-xs text-text-body">{item.date}</span>
                  </div>
                  <Link
                    href={item.link}
                    className="text-sm font-medium text-text-heading group-hover:text-ui-primary transition leading-tight block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-2 border border-ui-border text-sm font-bold text-text-body rounded hover:bg-surface-muted transition">
              View All Bookmarks
            </button>
          </div>

          {/* Account Status */}
          <div className="bg-surface-muted border border-ui-border rounded-xl p-6">
            <h3 className="text-sm font-bold text-text-heading uppercase tracking-widest mb-4">
              Account Status
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-body">Plan Renewal</span>
              <span className="text-sm font-bold text-text-heading">
                Nov 12, 2024
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-body">Payment Method</span>
              <span className="text-sm font-bold text-text-heading">
                •••• 4242
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
