"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  FilmIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const academyItems = [
  { href: "/education/courses", label: "Executive Masterclasses" },
  { href: "/education/faculty", label: "Faculty & Experts" },
  { href: "/education/webinars", label: "Webinars & Events" },
  { href: "/education/glossary", label: "Glossary" },
  { href: "/education/case-studies", label: "Case Studies Library" },
];

const advisoryItems = [
  { href: "/advisory/consulting", label: "Strategic Consulting" },
  { href: "/advisory/research", label: "Custom Research Projects" },
  { href: "/advisory/reports", label: "Annual Impact Reports" },
  { href: "/advisory/contact", label: "Hire an Expert" },
];

const mediaItems = [
  { href: "/media/podcasts", label: "HTR Podcast Network" },
  { href: "/media/videos", label: "Video Briefings" },
  { href: "/media/library", label: "Full Multimedia Library" },
];

const ALL_SECTIONS = ["Academy", "Advisory", "Multimedia"];

export default function HomeSidebar() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "user", text: "What is the impact of the new RHTP guidelines?" },
    {
      role: "ai",
      text: "The new guidelines prioritize global budgets over fee-for-service, aiming to stabilize rural hospital revenue.",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleExpandAll = () => {
    setOpenSections(ALL_SECTIONS);
    scrollToTop();
  };

  const handleCollapseAll = () => {
    setOpenSections([]);
    scrollToTop();
  };

  const renderPillar = (
    title: string,
    icon: React.ReactNode,
    items: { href: string; label: string }[]
  ) => {
    const isOpen = openSections.includes(title);

    return (
      <div className="border-b border-slate-100 last:border-0">
        <button
          onClick={() => toggleSection(title)}
          className={`w-full flex items-center justify-between py-3 px-3 my-1 rounded-lg group transition-all duration-200 focus:outline-none border border-slate-200 ${isOpen ? "bg-slate-100 text-slate-900" : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-md transition-colors duration-200 ${isOpen ? "bg-white shadow-sm text-slate-900" : "bg-slate-50 text-slate-400 group-hover:text-slate-600 group-hover:bg-white group-hover:shadow-sm"}`}
            >
              <span className="block w-5 h-5 transition-colors duration-200">
                {icon}
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest transition-colors duration-200">
              {title}
            </span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ease-out text-slate-400 ${isOpen ? "rotate-180 text-slate-600" : "group-hover:text-slate-500"}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-2" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 pl-2 ml-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-full flex flex-col gap-6">
      {/* QUICK ACTIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Quick Actions
          </h3>
          <div className="flex gap-3">
            {openSections.length < ALL_SECTIONS.length && (
              <button
                onClick={handleExpandAll}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
              >
                Expand All
              </button>
            )}
            {openSections.length > 0 && (
              <button
                onClick={handleCollapseAll}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
              >
                Collapse All
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Link
            href="/dashboard"
            title="View the national surveillance map and active state cohorts"
            className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/rhtp-icon.png"
                alt="RHTP Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Rural Health Transformation
            </span>
          </Link>
          <Link
            href="/dashboard/vermont"
            title="Read the detailed case study on Vermont's health reform"
            className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/vermont-icon.svg"
                alt="Vermont Case Study"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Case Study: Vermont
            </span>
          </Link>
        </div>
      </div>

      {/* AI ANALYST (CHATBOX) */}
      <div
        className={`bg-white border border-slate-200 rounded-xl p-5 text-slate-900 shadow-sm relative overflow-hidden group transition-all duration-500 ease-in-out ${isChatOpen ? "h-96" : "h-auto"}`}
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl"></div>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center justify-between w-full mb-3 relative z-10 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">
              AI Analyst
            </h3>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isChatOpen ? "rotate-180" : ""}`}
          />
        </button>

        {!isChatOpen && (
          <p className="text-xs text-slate-500 mb-4 relative z-10 leading-relaxed font-medium animate-in fade-in">
            Ask questions about policy impact, reimbursement models, or
            workforce trends.
          </p>
        )}

        {isChatOpen && (
          <div className="mb-4 h-56 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
            {chatMessages.length > 0 && (
              <button
                onClick={() => setChatMessages([])}
                className="absolute top-0 right-0 z-10 flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
              >
                <TrashIcon className="w-3 h-3" /> Clear
              </button>
            )}
            <div
              ref={chatContainerRef}
              className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pt-6"
            >
              <div className="flex flex-col gap-2">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`self-${msg.role === "user" ? "end" : "start"} ${
                      msg.role === "user"
                        ? "bg-slate-100 text-slate-900 rounded-tr-none"
                        : "bg-slate-100 text-slate-700 border border-slate-200 rounded-tl-none"
                    } rounded-lg py-2 px-3 text-xs max-w-[90%]`}
                  >
                    {msg.text}
                  </div>
                ))}
                {chatMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic mt-10">
                    Chat history cleared
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 mt-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask HTR Intelligence..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all"
              onFocus={() => setIsChatOpen(true)}
            />
            <button className="absolute right-1.5 p-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors shadow-sm">
              <PaperAirplaneIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ACADEMY ACCORDION */}
      <div className="mt-2">
        {renderPillar("Academy", <AcademicCapIcon />, academyItems)}
      </div>

      {/* ADVISORY ACCORDION */}
      <div className="mt-2">
        {renderPillar("Advisory", <BriefcaseIcon />, advisoryItems)}
      </div>

      {/* MULTIMEDIA ACCORDION */}
      <div className="mt-2">
        {renderPillar("Multimedia", <FilmIcon />, mediaItems)}
      </div>

      {/* BOTTOM COLLAPSE ALL */}
      {openSections.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleCollapseAll}
            className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
          >
            Collapse All
          </button>
        </div>
      )}

      {/* BACK TO TOP */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showBackToTop ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-bold uppercase tracking-wider"
        >
          <ChevronUpIcon className="w-3 h-3" />
          Back to Top
        </button>
      </div>
    </aside>
  );
}
