// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";

// --- PILLARS (Now consolidated to the Trinity) ---
const policyItems = [
  { href: "/policy/regulation", label: "Regulation & Legislation" },
  { href: "/policy/mandates", label: "Public Health Mandates" },
  { href: "/policy/global", label: "Global & Comparative Policy" },
  { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
];
const economicsItems = [
  { href: "/economics/value", label: "Value-Based Care Models" },
  { href: "/economics/market", label: "Market & Finance" },
  { href: "/economics/cea", label: "Labor & Workforce Strategy" }, // Moved from Ops
  { href: "/economics/investment", label: "Healthcare Investment Trends" },
];
const technologyItems = [
  { href: "/technology/ai", label: "AI & Machine Learning" },
  { href: "/technology/digital", label: "Digital Health & Telemedicine" },
  { href: "/technology/security", label: "Data Security & Governance" },
  { href: "/technology/workflow", label: "Tech-Enabled Workflow" }, // Moved from Ops
];

// --- SERVICES ---
const advisoryItems = [
  { href: "/advisory/consulting", label: "Strategic Consulting" },
  { href: "/advisory/research", label: "Custom Research Projects" },
  { href: "/advisory/reports", label: "Annual Impact Reports" },
  { href: "/advisory/contact", label: "Hire an Expert" },
];
const academyItems = [
  { href: "/education/courses", label: "Executive Masterclasses" },
  { href: "/education/faculty", label: "Faculty & Experts" },
  { href: "/education/webinars", label: "Webinars & Events" },
  { href: "/education/glossary", label: "Policy & Tech Glossary" },
  { href: "/education/case-studies", label: "Case Studies Library" },
];

// --- ICONS ---
const GradCapIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    />
  </svg>
);

const Header: React.FC = () => {
  // DATE LOGIC
  const [dateString, setDateString] = useState("");
  useEffect(() => {
    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // TICKER LOGIC
  const [headlines, setHeadlines] = useState<{ text: string; url: string }[]>([
    { text: "Initializing Live Feeds...", url: "#" },
  ]);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    async function fetchTicker() {
      try {
        const res = await fetch("/api/ticker");
        const data = await res.json();
        if (
          data.headlines &&
          Array.isArray(data.headlines) &&
          data.headlines.length > 0
        ) {
          setHeadlines(data.headlines);
        }
      } catch (error) {
        console.error("Failed to fetch live ticker", error);
        setHeadlines([
          { text: "HTR Intelligence: Market Data Unavailable", url: "#" },
        ]);
      }
    }
    fetchTicker();
  }, []);

  useEffect(() => {
    if (headlines.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <header className="sticky top-0 z-50 shadow-md flex flex-col">
      {/* 1. EYEBROW */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-bold tracking-wider uppercase py-2 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-full">
          <span className="hidden lg:inline-block w-1/4 opacity-80 min-h-[1em]">
            {dateString}
          </span>
          <div className="flex-grow flex justify-center items-center w-full lg:w-auto absolute lg:static left-0 right-0 px-4">
            <div className="flex items-center gap-3 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50 transition hover:bg-slate-800">
              <span className="flex items-center gap-1.5 text-white flex-shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span className="text-slate-300 opacity-80 tracking-tight whitespace-nowrap">
                  NEWS FEED
                </span>
              </span>
              <span className="text-slate-600">|</span>
              <a
                key={currentHeadline}
                href={headlines[currentHeadline].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white normal-case font-medium tracking-normal animate-in fade-in slide-in-from-bottom-1 duration-300 truncate max-w-[200px] md:max-w-md hover:text-blue-400 hover:underline decoration-blue-400/50 underline-offset-4 cursor-pointer"
                title="Read Source Article"
              >
                {headlines[currentHeadline].text}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-end gap-6 w-1/4 z-10 bg-slate-900 lg:bg-transparent pl-4">
            <Link
              href="/about"
              className="hover:text-white transition-colors hidden xl:inline-block"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="hover:text-white transition-colors hidden xl:inline-block"
            >
              FAQ
            </Link>
            <div className="h-4 w-0.5 bg-slate-400 hidden xl:block"></div>
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link
              href="/subscribe"
              className="bg-white text-slate-900 px-3 py-0.5 rounded-sm hover:bg-slate-200 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN DECK */}
      <div className="bg-white py-3">
        <div className="container mx-auto px-4 md:px-8 flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* LEFT: Logo + Pillars */}
          <div className="flex items-center gap-16 flex-shrink-0 w-full xl:w-auto justify-between xl:justify-start">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden xl:flex items-center space-x-1">
              {/* TRINITY PILLARS */}
              <NavDropdown
                label="POLICY"
                items={policyItems}
                colorClass="text-card-policy"
              />
              <NavDropdown
                label="ECONOMICS"
                items={economicsItems}
                colorClass="text-card-economics"
              />
              <NavDropdown
                label="TECHNOLOGY"
                items={technologyItems}
                colorClass="text-card-tech"
              />
            </nav>
          </div>

          {/* CENTER: Search */}
          <div className="hidden md:flex flex-grow justify-center px-4 min-w-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search intelligence..."
                className="w-full px-4 py-2 pl-10 border border-ui-border rounded-full text-sm bg-surface-muted focus:outline-none focus:ring-2 focus:ring-ui-primary focus:bg-white transition-all shadow-sm"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: Services */}
          <div className="flex items-center gap-2 flex-shrink-0 w-full xl:w-auto justify-end">
            <nav className="hidden md:flex items-center space-x-2">
              <NavDropdown
                label="HTR ACADEMY"
                items={academyItems}
                icon={<GradCapIcon />}
                colorClass="text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 hover:border-indigo-300"
              />
              <NavDropdown label="ADVISORY" items={advisoryItems} />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
