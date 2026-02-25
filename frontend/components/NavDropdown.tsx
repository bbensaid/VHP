// components/NavDropdown.tsx
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  pillar?: "policy" | "economics" | "technology" | "clinical" | "equity";
  icon?: React.ReactNode; 
  buttonClassName?: string;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  items,
  pillar,
  icon,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Animate if the current path starts with the pillar's path
  const isActive = pillar && pathname.startsWith(`/${pillar}`);

  const pillarStyles = {
    policy: {
      text: "text-brand-orange",
      hover: "hover:text-brand-orange",
      bg: "bg-brand-orange"
    },
    economics: {
      text: "text-brand-green",
      hover: "hover:text-brand-green",
      bg: "bg-brand-green"
    },
    technology: {
      text: "text-brand-indigo",
      hover: "hover:text-brand-indigo",
      bg: "bg-brand-indigo"
    },
    clinical: {
      text: "text-rose-600",
      hover: "hover:text-rose-600",
      bg: "bg-rose-600"
    },
    equity: {
      text: "text-purple-600",
      hover: "hover:text-purple-600",
      bg: "bg-purple-600"
    },
  };

  const theme = pillar ? pillarStyles[pillar] : null;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* TRIGGER BUTTON */}
      <button
        className={
          buttonClassName ||
          `flex items-center gap-1.5 px-2 py-1.5 text-sm font-extrabold uppercase tracking-wide transition-all duration-200 rounded-md hover:bg-slate-100 ${theme ? theme.text : 'text-text-heading'} ${isActive ? 'bg-slate-100' : ''}`
        }
        aria-expanded={isOpen}
      >
        {icon && <span className="text-lg leading-none">{icon}</span>}
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-200 opacity-60 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-ui-border rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className={`h-1 w-full rounded-t-lg ${theme ? theme.bg : 'bg-current'} opacity-20`}></div>
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 text-sm text-text-body font-medium hover:bg-surface-muted ${theme ? theme.hover : 'hover:text-ui-primary'} transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
