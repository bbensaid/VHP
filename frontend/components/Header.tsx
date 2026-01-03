"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";

// --- 1. CONTENT CONFIGURATION ---

const policyItems = [
  { href: "/policy", label: "Policy Hub (Overview)" },
  { href: "/policy/regulation", label: "Regulation & Legislation" },
  { href: "/policy/mandates", label: "Public Health Mandates" },
  { href: "/policy/global", label: "Global & Comparative Policy" },
  { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
];
const economicsItems = [
  { href: "/economics", label: "Economics Hub (Overview)" },
  { href: "/economics/value", label: "Value-Based Care Models" },
  { href: "/economics/market", label: "Market & Finance" },
  { href: "/economics/cea", label: "Labor & Workforce Strategy" },
  { href: "/economics/investment", label: "Healthcare Investment Trends" },
];
const technologyItems = [
  { href: "/technology", label: "Technology Hub (Overview)" },
  { href: "/technology/ai", label: "AI & Machine Learning" },
  { href: "/technology/digital", label: "Digital Health & Telemedicine" },
  { href: "/technology/security", label: "Data Security & Governance" },
  { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
];

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
  { href: "/education/glossary", label: "Glossary" },
  { href: "/education/case-studies", label: "Case Studies Library" },
];

const GradCapIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
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

  // TICKER DATA (Using Real Links)
  const headlines = [
    { text: "INSOLVENCY ALERT: NVRH projects $75M Deficit", url: "/dashboard/vermont/nvrh" },
    { text: "MARKET MOVER: Medicare Advantage Denials Rise 12%", url: "/economics/market" },
    { text: "STATE PROFILE: Vermont Rated CRITICAL (42/100)", url: "/dashboard/vermont" },
    { text: "NEW REPORT: The End of Fee-for-Service in Rural America", url: "/advisory/reports" }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md flex flex-col">
      
      {/* 1. EYEBROW / NEWS FEED BAR */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-bold tracking-wider uppercase py-2 relative overflow-hidden border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-full">
          
          {/* Left: Date */}
          <span className="hidden lg:inline-block w-1/5 opacity-80 min-h-[1em]">
            {dateString}
          </span>
          
          {/* Center: The SCROLLING News Feed */}
          <div className="flex-grow flex items-center w-full lg:w-3/5 overflow-hidden px-4 relative">
            
            {/* The Static Label */}
            <div className="flex items-center gap-2 pr-4 z-10 bg-slate-900 flex-shrink-0">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
               </span>
               <span className="text-white font-bold whitespace-nowrap">DAILY INSIGHT</span>
               <span className="text-slate-600">|</span>
            </div>

            {/* The Scrolling Marquee */}
            <div className="relative overflow-hidden w-full h-5 mask-linear-fade">
               <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex items-center gap-8 w-max">
                  {headlines.map((item, index) => (
                    <Link key={index} href={item.url} className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                      <span className="text-white group-hover:text-indigo-400 transition-colors">
                        {item.text}
                      </span>
                      <span className="text-slate-700">///</span>
                    </Link>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {headlines.map((item, index) => (
                    <Link key={`dup-${index}`} href={item.url} className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                      <span className="text-white group-hover:text-indigo-400 transition-colors">
                        {item.text}
                      </span>
                      <span className="text-slate-700">///</span>
                    </Link>
                  ))}
               </div>
            </div>

          </div>
          
          {/* Right: Utility Links */}
          <div className="flex items-center justify-end gap-6 w-1/5 z-10 bg-slate-900 pl-4">
            <Link href="/dashboard" className="text-indigo-400 hover:text-white transition-colors hidden xl:inline-block font-black">
              INTELLIGENCE
            </Link>
            <div className="h-4 w-0.5 bg-slate-600 hidden xl:block"></div>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/subscribe" className="bg-white text-slate-900 px-3 py-0.5 rounded-sm hover:bg-slate-200 transition-colors">Subscribe</Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN DECK (Archived Layout) */}
      <div className="bg-white py-1">
        <div className="container mx-auto px-4 md:px-8 flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-16 flex-shrink-0 w-full xl:w-auto justify-between xl:justify-start">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden xl:flex items-center space-x-1">
              <NavDropdown label="POLICY" items={policyItems} colorClass="text-card-policy" />
              <NavDropdown label="ECONOMICS" items={economicsItems} colorClass="text-card-economics" />
              <NavDropdown label="TECHNOLOGY" items={technologyItems} colorClass="text-card-tech" />
            </nav>
          </div>
          
          <div className="hidden md:flex flex-grow justify-center px-4 min-w-0">
            <div className="relative w-full">
              <input type="text" placeholder="Search intelligence..." className="w-full px-4 py-2 pl-10 border border-ui-border rounded-full text-sm bg-surface-muted focus:outline-none focus:ring-2 focus:ring-ui-primary focus:bg-white transition-all shadow-sm" />
              <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0 w-full xl:w-auto justify-end">
            <nav className="hidden md:flex items-center space-x-2">
              <NavDropdown label="HTR ACADEMY" items={academyItems} icon={<GradCapIcon />} colorClass="text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 hover:border-indigo-300" />
              <NavDropdown label="ADVISORY" items={advisoryItems} />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;