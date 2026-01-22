"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FilmIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ChevronDownIcon,
  ArrowTrendingUpIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const mediaItems = [
  { href: "/media/podcasts", label: "HTR Podcast Network" },
  { href: "/media/videos", label: "Video Briefings" },
  { href: "/media/library", label: "Full Multimedia Library" },
];

const trendingItems = [
  { href: "/topics/value-based-care", label: "Value-Based Care Models" },
  { href: "/topics/workforce", label: "Clinical Workforce Gaps" },
  { href: "/topics/telehealth", label: "Telehealth Reimbursement" },
];

export const ALL_SECTIONS = ["Multimedia", "Trending Topics"];

interface RightSidebarProps {
  openSections: string[];
  onToggleSection: (section: string) => void;
}

export default function RightSidebar({
  openSections,
  onToggleSection,
}: RightSidebarProps) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { role: "user", text: "What is the impact of the new RHTP guidelines?" },
    {
      role: "ai",
      text: "The new guidelines prioritize global budgets over fee-for-service, aiming to stabilize rural hospital revenue.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          onClick={() => onToggleSection(title)}
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
          <div className="relative flex items-end">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInput}
              rows={1}
              placeholder="Ask HTR Intelligence..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all resize-none overflow-hidden min-h-[38px] max-h-32"
              onFocus={() => setIsChatOpen(true)}
            />
            <button className="absolute right-1.5 bottom-1.5 p-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors shadow-sm">
              <PaperAirplaneIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* MULTIMEDIA ACCORDION */}
      <div className="mt-2">
        {renderPillar("Multimedia", <FilmIcon />, mediaItems)}
      </div>

      {/* TRENDING TOPICS ACCORDION */}
      <div className="mt-2">
        {renderPillar(
          "Trending Topics",
          <ArrowTrendingUpIcon />,
          trendingItems
        )}
      </div>
    </aside>
  );
}
