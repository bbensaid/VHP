// components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useBrand } from "@/components/BrandContext";

const pillars = [
  {
    label: "Policy",
    href: "/policy",
    color: "hover:text-sky-400",
    sub: [
      { label: "Regulation & Legislation", href: "/policy/regulation" },
      { label: "Public Health Mandates", href: "/policy/mandates" },
      { label: "Global & Comparative Policy", href: "/policy/global" },
      { label: "Policy Feasibility Studies", href: "/policy/feasibility" },
    ],
  },
  {
    label: "Economics",
    href: "/economics",
    color: "hover:text-emerald-400",
    sub: [
      { label: "Value-Based Care Models", href: "/economics/value" },
      { label: "Market & Finance", href: "/economics/market" },
      { label: "Labor & Workforce Strategy", href: "/economics/cea" },
      { label: "Healthcare Investment Trends", href: "/economics/investment" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    color: "hover:text-indigo-400",
    sub: [
      { label: "AI & Machine Learning", href: "/technology/ai" },
      { label: "Digital Health & Telemedicine", href: "/technology/digital" },
      { label: "Data Security & Governance", href: "/technology/security" },
      { label: "Tech-Enabled Workflow", href: "/technology/workflow" },
    ],
  },
  {
    label: "Clinical",
    href: "/clinical",
    color: "hover:text-red-400",
    sub: [
      { label: "Hospital-at-Home", href: "/clinical/hah" },
      { label: "Precision Medicine", href: "/clinical/precision" },
      { label: "Virtual Care Models", href: "/clinical/virtual" },
    ],
  },
  {
    label: "Equity",
    href: "/equity",
    color: "hover:text-violet-400",
    sub: [
      { label: "SDOH Integration", href: "/equity/sdoh" },
      { label: "Algorithmic Bias", href: "/equity/bias" },
      { label: "Access Disparity", href: "/equity/access" },
    ],
  },
  {
    label: "Operations",
    href: "/operations",
    color: "hover:text-teal-400",
    sub: [
      { label: "Revenue Cycle Management", href: "/operations/revenue-cycle" },
      { label: "Workforce & Human Capital", href: "/operations/workforce" },
      { label: "Quality, Compliance & Risk", href: "/operations/compliance" },
      { label: "Supply Chain & Infrastructure", href: "/operations/supply-chain" },
      { label: "Payer & Network Operations", href: "/operations/payer-network" },
    ],
  },
];

const companyLinks = [
  { label: "About HTR", href: "/about" },
  { label: "Mission & Vision", href: "/mission" },
  { label: "Core Values", href: "/values" },
  { label: "Our Framework", href: "/about/framework" },
  { label: "Our Methodology", href: "/about/methodology" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/advisory/contact" },
];

const platformLinks = [
  { label: "State Performance Dashboard", href: "/dashboard" },
  { label: "HTR Academy", href: "/academy" },
  { label: "Advisory Services", href: "/advisory" },
  { label: "Multimedia & Podcasts", href: "/multimedia" },
  { label: "Trending Topics", href: "/trending-topics" },
  { label: "Subscribe", href: "/subscribe" },
];

const Footer: React.FC = () => {
  const { config: brand } = useBrand();
  const visiblePlatformLinks = platformLinks.filter(
    (l) => brand.showAdvisory || l.href !== "/advisory"
  );
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mt-auto">
      
      {/* ── MAIN FOOTER ─────────────────────────────────────────────────── */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">

        {/* Top row: Brand + Newsletter */}
        <div className="grid lg:grid-cols-4 gap-10 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
          
          {/* Brand block */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Logo />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-xs">
              The cross-disciplinary intelligence platform for health system transformation. Six pillars. Fifty states. Zero agenda.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { id: "LI", label: "LinkedIn", href: "#" },
                { id: "𝕏", label: "X / Twitter", href: "#" },
                { id: "YT", label: "YouTube", href: "#" },
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                >
                  {s.id}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 lg:col-start-4">
            <h4 className="text-slate-900 dark:text-slate-100 font-black text-sm uppercase tracking-widest mb-4">
              Stay Ahead
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Weekly briefings on the five metrics that matter most. No fluff. No sponsored content.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Work Email"
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="w-full px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                Subscribe Free
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Join xxx+ healthcare executives. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Six Pillars Grid */}
        <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
          <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
            Intelligence Pillars
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pillars.map((p) => (
              <div key={p.label}>
                <Link
                  href={p.href}
                  className={`block text-sm font-black text-slate-800 dark:text-slate-200 mb-3 transition-colors ${p.color}`}
                >
                  {p.label} →
                </Link>
                <ul className="space-y-2">
                  {p.sub.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors leading-relaxed"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Company + Platform columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {visiblePlatformLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory — hidden on the "review" brand */}
          {brand.showAdvisory && (
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Advisory
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Strategic Consulting", href: "/advisory" },
                { label: "Custom Research", href: "/advisory" },
                { label: "Annual Impact Reports", href: "/advisory/reports" },
                { label: "Hire an Expert", href: "/advisory/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-0.5">
                  General Inquiries
                </p>
                <a href="mailto:hello@htr.com" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  hello@htr.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-0.5">
                  Advisory
                </p>
                <a href="mailto:advisory@htr.com" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  advisory@htr.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-0.5">
                  Media & Press
                </p>
                <a href="mailto:press@htr.com" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  press@htr.com
                </a>
              </div>
              <div className="pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-1.5">
                  Offices
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Burlington, VT — San Francisco, CA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} {brand.displayName}. All rights reserved.</p>
            <span className="hidden md:inline text-slate-400">·</span>
            <p className="hidden md:block text-slate-500 dark:text-slate-400">
              Non-partisan. Independent. Evidence-driven.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Disclaimer
            </Link>
            <Link href="/billing-policy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Billing
            </Link>
            <Link href="/about/methodology" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Methodology
            </Link>
            <Link href="/site-map" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;