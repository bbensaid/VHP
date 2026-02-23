// frontend/app/academy/AcademyClientPage.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  UserGroupIcon,
  FilmIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

interface AcademyClientPageProps {
  coursesTab: React.ReactNode;
  facultyTab: React.ReactNode;
  webinarsTab: React.ReactNode;
  glossaryTab: React.ReactNode;
  caseStudiesTab: React.ReactNode;
}

export default function AcademyClientPage({
  coursesTab,
  facultyTab,
  webinarsTab,
  glossaryTab,
  caseStudiesTab,
}: AcademyClientPageProps) {
  const [activeTab, setActiveTab] = useState("courses");

  const TabButton = ({ isActive, onClick, icon, label }: { isActive: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors rounded-t-lg
        ${isActive
          ? 'bg-slate-300 text-slate-900 border-slate-400 border-t border-l border-r'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent border-t border-l border-r'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* HEADER (Mimicking Vermont Case Study) */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header>
            <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to Home
            </Link>
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-indigo-200">
                    Education & Intelligence Hub
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">HTR Academy</h1>
                <p className="text-slate-500 mt-2 text-lg">Executive Masterclasses, Faculty, Webinars, Glossary, and Case Studies</p>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* TABS & CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-24">
        <div className="border-b border-slate-300 overflow-x-auto hide-scrollbar">
          <nav className="-mb-px flex space-x-2 min-w-max" aria-label="Tabs">
            <TabButton isActive={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<AcademicCapIcon className="w-5 h-5"/>} label="Executive Masterclasses" />
            <TabButton isActive={activeTab === 'faculty'} onClick={() => setActiveTab('faculty')} icon={<UserGroupIcon className="w-5 h-5"/>} label="Faculty & Experts" />
            <TabButton isActive={activeTab === 'webinars'} onClick={() => setActiveTab('webinars')} icon={<FilmIcon className="w-5 h-5"/>} label="Webinars & Events" />
            <TabButton isActive={activeTab === 'glossary'} onClick={() => setActiveTab('glossary')} icon={<BookOpenIcon className="w-5 h-5"/>} label="Glossary" />
            <TabButton isActive={activeTab === 'casestudies'} onClick={() => setActiveTab('casestudies')} icon={<BuildingLibraryIcon className="w-5 h-5"/>} label="Case Study Library" />
          </nav>
        </div>

        <div className="py-0">
          <div className="animate-in fade-in bg-white rounded-b-lg border-x border-b border-slate-300 shadow-sm overflow-hidden min-h-[500px]">
            {/* The imported pages will render natively inside these tabs */}
            {activeTab === 'courses' && coursesTab}
            {activeTab === 'faculty' && facultyTab}
            {activeTab === 'webinars' && webinarsTab}
            {activeTab === 'glossary' && glossaryTab}
            {activeTab === 'casestudies' && caseStudiesTab}
          </div>
        </div>
      </div>
    </div>
  );
}