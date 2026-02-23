"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

interface TrendingTopicsClientPageProps {
  vbcTab: React.ReactNode;
  workforceTab: React.ReactNode;
  telehealthTab: React.ReactNode;
}

export default function TrendingTopicsClientPage({
  vbcTab,
  workforceTab,
  telehealthTab,
}: TrendingTopicsClientPageProps) {
  const [activeTab, setActiveTab] = useState("vbc");

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
                    Live Market Signals
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">Trending Topics</h1>
                <p className="text-slate-500 mt-2 text-lg">Value-Based Care Models, Clinical Workforce Gaps, and Telehealth Reimbursement</p>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* TABS & CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-24">
        <div className="border-b border-slate-300 overflow-x-auto hide-scrollbar">
          <nav className="-mb-px flex space-x-2 min-w-max" aria-label="Tabs">
            <TabButton isActive={activeTab === 'vbc'} onClick={() => setActiveTab('vbc')} icon={<CurrencyDollarIcon className="w-5 h-5"/>} label="Value-Based Care Models" />
            <TabButton isActive={activeTab === 'workforce'} onClick={() => setActiveTab('workforce')} icon={<UserGroupIcon className="w-5 h-5"/>} label="Clinical Workforce Gaps" />
            <TabButton isActive={activeTab === 'telehealth'} onClick={() => setActiveTab('telehealth')} icon={<SignalIcon className="w-5 h-5"/>} label="Telehealth Reimbursement" />
          </nav>
        </div>

        <div className="py-0">
          <div className="animate-in fade-in bg-white rounded-b-lg border-x border-b border-slate-300 shadow-sm overflow-hidden min-h-[500px]">
            {/* The imported pages will render natively inside these tabs */}
            {activeTab === 'vbc' && vbcTab}
            {activeTab === 'workforce' && workforceTab}
            {activeTab === 'telehealth' && telehealthTab}
          </div>
        </div>
      </div>
    </div>
  );
}