"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import {
  Bars3Icon,
  XMarkIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { useTicker } from "@/components/TickerContext";
import TickerStrip from "@/components/TickerStrip";
import { usePathname } from "next/navigation";

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

const clinicalItems = [
  { label: "Clinical Hub (Overview)", href: "/clinical" },
  { label: "Hospital-at-Home", href: "/clinical/hah" },
  { label: "Precision Medicine", href: "/clinical/precision" },
  { label: "Virtual Care Models", href: "/clinical/virtual" },
];

const equityItems = [
  { label: "Equity Hub (Overview)", href: "/equity" },
  { label: "SDOH Integration", href: "/equity/sdoh" },
  { label: "Algorithmic Bias", href: "/equity/bias" },
  { label: "Access Disparity", href: "/equity/access" },
];

const companyItems = [
  { href: "/about", label: "About Us" },
  { href: "/mission", label: "Mission & Vision" },
  { href: "/about/methodology", label: "Our Methodology" },
  { href: "/faq", label: "FAQ" },
  { href: "/advisory/contact", label: "Contact Us" },
];

// --- 2. MAIN COMPONENT ---
const Header = () => {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  const [dateString, setDateString] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isHeaderVisible, setHeaderVisible } = useTicker();

  const [headlines, setHeadlines] = useState<{ text: string; url: string }[]>([
    { text: "Loading Intelligence...", url: "#" },
  ]);

  // HELPER: Sends signal to AppShell.tsx
  const triggerToggle = (side: "left" | "right") => {
    window.dispatchEvent(
      new CustomEvent("sidebar-toggle", { detail: { side } })
    );
  };

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
    <header className="sticky top-0 z-50 flex flex-col font-sans shadow-md bg-white">
      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-bold tracking-wider uppercase py-2 border-b border-slate-800 w-full relative z-50">
        {/* PHASE 1 FIX: Standardized Grid Wrapper */}
        <div className="w-full px-4 flex items-center h-full gap-0">
          <div className="hidden lg:block opacity-80 whitespace-nowrap w-[500px] flex-shrink-0">
            <span>{dateString}</span>
          </div>
          <div className="flex-1 flex items-center overflow-hidden min-w-0 pr-32">
            <TickerStrip 
              tickerData={{ headlines }} 
              isVisible={isHeaderVisible} 
              onToggle={() => setHeaderVisible(!isHeaderVisible)}
              label="DAILY INSIGHT"
              theme="dark"
              transparent={true}
            />
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
        {/* PHASE 1 FIX: Standardized Grid Wrapper */}
        <div className="w-full px-4 flex items-center gap-0">
          
          {/* LEFT GROUP: Toggle + Logo (Fixed Width 500px to align with Date above) */}
          <div className="flex items-center gap-4 w-[500px] flex-shrink-0">
            <div className="w-10 flex-shrink-0">
              {!isStudio && (
                <button
                  onClick={() => triggerToggle("left")}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                  title="Toggle Navigation"
                >
                  <Bars3BottomLeftIcon className="w-6 h-6" />
                </button>
              )}
            </div>
            <Link href="/" className="z-50 relative">
              <Logo />
            </Link>
          </div>

          {/* CENTER: Navigation & Search */}
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-6 xl:gap-8 flex-shrink-0">
              <nav className="hidden xl:flex items-center gap-10 h-8">
                <NavDropdown label="POLICY" items={policyItems} pillar="policy" />
                <NavDropdown label="ECONOMICS" items={economicsItems} pillar="economics" />
                <NavDropdown label="TECHNOLOGY" items={technologyItems} pillar="technology" />
                <NavDropdown label="CLINICAL" items={clinicalItems} pillar="clinical" />
                <NavDropdown label="EQUITY" items={equityItems} pillar="equity" />
              </nav>
            </div>

            <div className="hidden md:flex flex-1 px-8 max-w-2xl ml-auto lg:mr-[350px]">
            <div className="relative w-full">
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", metaKey: true })
                  );
                }}
                className="w-full flex items-center px-4 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all text-left"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                Search Intelligence Platform...
                <span className="absolute right-3 text-xs font-bold bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm hidden sm:block">
                  ⌘K
                </span>
              </button>
            </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR TOGGLE */}
          <div className="w-10 flex-shrink-0 flex justify-end ml-4">
            {!isStudio && (
              <button
                onClick={() => triggerToggle("right")}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                title="Toggle Vitals"
              >
                <Bars3BottomRightIcon className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 xl:hidden">
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
            <div className="space-y-2">
              <div className="font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                ECONOMICS
              </div>
              {economicsItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block pl-4 text-sm text-slate-600 py-1"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                TECHNOLOGY
              </div>
              {technologyItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block pl-4 text-sm text-slate-600 py-1"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                CLINICAL
              </div>
              {clinicalItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block pl-4 text-sm text-slate-600 py-1"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                EQUITY
              </div>
              {equityItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="block pl-4 text-sm text-slate-600 py-1"
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;