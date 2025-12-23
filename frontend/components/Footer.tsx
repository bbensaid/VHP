// components/Footer.tsx

import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-muted border-t border-ui-border pt-2 pb-2 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex space-x-4 pt-8">
              <div className="w-8 h-8 bg-ui-bg-light rounded-full flex items-center justify-center text-ui-primary font-bold text-xs cursor-pointer hover:opacity-80">
                LI
              </div>
              <div className="w-8 h-8 bg-ui-bg-light rounded-full flex items-center justify-center text-ui-primary font-bold text-xs cursor-pointer hover:opacity-80">
                X
              </div>
              <div className="w-8 h-8 bg-ui-bg-light rounded-full flex items-center justify-center text-ui-primary font-bold text-xs cursor-pointer hover:opacity-80">
                YT
              </div>
            </div>
          </div>

          {/* Column 2: Pillars (Science Removed) */}
          <div>
            <h4 className="font-bold text-text-heading mb-4 uppercase text-xs tracking-wider">
              Core Pillars
            </h4>
            <ul className="space-y-3 text-sm text-text-body">
              <li>
                <Link
                  href="/policy"
                  className="hover:text-ui-primary transition"
                >
                  Policy & Regulation
                </Link>
              </li>
              <li>
                <Link
                  href="/economics"
                  className="hover:text-ui-primary transition"
                >
                  Health Economics
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="hover:text-ui-primary transition"
                >
                  Technology & AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold text-text-heading mb-4 uppercase text-xs tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-text-body">
              <li>
                <Link
                  href="/about"
                  className="hover:text-ui-primary transition"
                >
                  About HTR
                </Link>
              </li>
              <li>
                <Link
                  href="/advisory/contact"
                  className="hover:text-ui-primary transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/advisory/reports"
                  className="hover:text-ui-primary transition"
                >
                  Annual Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-text-heading mb-4 uppercase text-xs tracking-wider">
              Stay Ahead
            </h4>
            <p className="text-xs text-text-body mb-4">
              Weekly briefings on the metrics that matter. No fluff.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Work Email"
                className="w-full px-3 py-2 text-sm border border-ui-border rounded focus:outline-none focus:ring-1 focus:ring-ui-primary"
              />
              <button className="w-full px-3 py-2 bg-ui-primary text-ui-text-on-primary text-sm font-bold rounded hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ui-border pt-2 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-text-body">
          <p>
            &copy; {new Date().getFullYear()} Health Transformation Review. All
            rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-text-heading">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text-heading">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-text-heading">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
