"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useTicker } from "@/components/TickerContext";

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

const companyItems = [
  { href: "/about", label: "About Us" },
  { href: "/mission", label: "Mission & Vision" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

// --- 2. MAIN COMPONENT ---
const Header = () => {
  const [dateString, setDateString] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isHeaderVisible, setHeaderVisible, isStripVisible, setStripVisible } =
    useTicker();

  const [headlines, setHeadlines] = useState<{ text: string; url: string }[]>([
    { text: "Loading Intelligence...", url: "#" },
  ]);

  useEffect(() => {
    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );

    async function fetchTicker() {
      try {
        const res = await fetch("/api/ticker");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        if (
          data.headlines &&
          Array.isArray(data.headlines) &&
          data.headlines.length > 0
        ) {
          setHeadlines(data.headlines);
        }
      } catch (error) {
        setHeadlines([
          {
            text: "INSOLVENCY ALERT: NVRH projects $75M Deficit",
            url: "/dashboard/vermont/nvrh",
          },
          {
            text: "MARKET MOVER: Medicare Advantage Denials Rise 12%",
            url: "/economics/market",
          },
          {
            text: "STATE PROFILE: Vermont Rated CRITICAL (42/100)",
            url: "/dashboard/vermont",
          },
        ]);
      }
    }
    fetchTicker();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex flex-col font-sans shadow-md">
      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-bold tracking-wider uppercase py-2 border-b border-slate-800 w-full relative z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center h-full gap-6 lg:gap-8">
          <div className="hidden lg:block opacity-80 whitespace-nowrap">
            <span>{dateString}</span>
          </div>
          <div className="flex-1 flex items-center overflow-hidden min-w-0">
            <div className="flex items-center gap-2 pr-3 z-10 bg-slate-900 flex-shrink-0">
              <input
                type="checkbox"
                checked={isHeaderVisible}
                onChange={() => setHeaderVisible(!isHeaderVisible)}
                className="w-3 h-3 cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                title="Toggle News Feed"
              />
              <span
                className="text-white font-bold whitespace-nowrap cursor-pointer"
                onClick={() => setHeaderVisible(!isHeaderVisible)}
              >
                DAILY INSIGHT
              </span>
              <span className="text-slate-600">|</span>
            </div>
            {isHeaderVisible ? (
              <div className="relative overflow-hidden flex-1 h-5 mask-linear-fade animate-in fade-in zoom-in duration-300">
                <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex items-center gap-8 w-max">
                  {headlines.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
                    >
                      <span className="text-white group-hover:text-indigo-400 transition-colors">
                        {item.text}
                      </span>
                      <span className="text-slate-700">///</span>
                    </Link>
                  ))}
                  {headlines.map((item, index) => (
                    <Link
                      key={`dup-${index}`}
                      href={item.url}
                      className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
                    >
                      <span className="text-white group-hover:text-indigo-400 transition-colors">
                        {item.text}
                      </span>
                      <span className="text-slate-700">///</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <span className="text-slate-500 text-[10px] font-medium uppercase tracking-wider ml-2">
                Feed Paused
              </span>
            )}
          </div>
          <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
            <NavDropdown
              label="COMPANY"
              items={companyItems}
              buttonClassName="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase hover:text-white transition-colors text-slate-300"
            />
            <div className="h-4 w-px bg-slate-700"></div>
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

      {/* 2. MAIN NAV BAR */}
      <div className="bg-white py-2 border-b border-slate-200 w-full relative z-40">
        <div className="container mx-auto pl-0 pr-0 flex items-center justify-between gap-2 xl:gap-16">
          <div className="flex items-center gap-6 xl:gap-8 flex-shrink-0">
            <Link href="/" className="z-50 relative">
              <Logo />
            </Link>

            {/* UPDATED NAV ORDER */}
            <nav className="hidden xl:flex items-center gap-10 ml-20 h-8">
              <NavDropdown label="POLICY" items={policyItems} />
              <NavDropdown label="ECONOMICS" items={economicsItems} />
              <NavDropdown label="TECHNOLOGY" items={technologyItems} />
            </nav>
          </div>

          <div className="hidden md:flex flex-1 pr-4 md:pr-8 xl:pr-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Intelligence Platform..."
                className="w-full px-4 py-2 pl-10 border border-ui-border rounded-full text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-ui-primary focus:bg-white transition-all shadow-sm"
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

          <div className="flex items-center gap-4 flex-shrink-0 xl:hidden pr-4 md:pr-8">
            <button
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-4 xl:hidden flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                POLICY
              </div>
              {policyItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block pl-4 text-sm text-slate-600 py-1"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            {/* ... rest of mobile menu items ... */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
