"use client";

import Link from "next/link";
import {
  ArrowLeftIcon, ChartBarIcon, BookOpenIcon, BoltIcon, BanknotesIcon, BuildingLibraryIcon,
  CheckCircleIcon, ClockIcon, ExclamationCircleIcon, ListBulletIcon, ChevronUpIcon, ChevronDownIcon, InformationCircleIcon
} from "@heroicons/react/24/outline";
import { getScoreColor } from "@/lib/utils";
import React, { useState, useMemo } from "react";
import type { PerformanceIndexProfile } from "@/lib/data/performance-index-data";
import type { RHTProfile } from "@/lib/data/rht-program";
import type { Hospital } from "@/lib/data/hospital-data";
import { hospitalData } from "@/lib/data/hospital-data";

// --- CHILD COMPONENTS ---

const MetricDisplay = ({ label, score }: { label: string, score: number }) => (
  <div className="grid grid-cols-2 items-center gap-4 py-3 border-b border-slate-100 last:border-b-0">
    <span className="text-sm text-slate-600 font-medium">{label}</span>
    <div className="flex items-center gap-3">
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className="h-2.5 rounded-full" style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}></div>
      </div>
      <span className="font-bold text-sm w-8 text-right" style={{ color: getScoreColor(score) }}>{score}</span>
    </div>
  </div>
);

const InitiativeCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 h-full shadow-sm">
    <h4 className="font-bold text-slate-800 text-base mb-1">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ProgramMetricCard = ({ label, status, target }: { label: string, status: string, target?: string }) => {
  const statusIcon = status === 'Achieved' ? <CheckCircleIcon className="w-5 h-5 text-emerald-500"/> :
    status === 'In Progress' ? <ClockIcon className="w-5 h-5 text-amber-500"/> :
    <ExclamationCircleIcon className="w-5 h-5 text-red-500"/>;
  return (
    <div className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
      {statusIcon}
      <div>
        <div className="text-sm font-semibold text-slate-700">{label}</div>
        {target && <div className="text-xs text-slate-500">Target: {target}</div>}
      </div>
    </div>
  )
}

interface ClientPageProps {
  indexData: PerformanceIndexProfile | null;
  programData: RHTProfile | null;
  stateSlug: string;
}

export default function StateDetailClientPage({ indexData, programData, stateSlug }: ClientPageProps) {
  const [activeTab, setActiveTab] = useState(indexData ? 'index' : 'program');
  const [hospitalSort, setHospitalSort] = useState<{key: keyof Hospital, dir: 'asc'|'desc'}>({key: 'qualityScore', dir: 'desc'});

  const stateHospitals = useMemo(() => {
    const hospitals = hospitalData[stateSlug] || [];
    return [...hospitals].sort((a,b) => {
      const valA = a[hospitalSort.key];
      const valB = b[hospitalSort.key];
      if (valA < valB) return hospitalSort.dir === 'asc' ? -1 : 1;
      if (valA > valB) return hospitalSort.dir === 'asc' ? 1 : -1;
      return 0;
    })
  }, [stateSlug, hospitalSort]);

  const handleHospitalSort = (key: keyof Hospital) => {
    setHospitalSort(prev => ({ key, dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc'}));
  }

  const overallScoreColor = getScoreColor(indexData?.performanceScore);

  const TabButton = ({ isActive, onClick, icon, label }: { isActive: boolean, onClick: () => void, icon: React.ReactNode, label: string}) => (
    <button
      onClick={onClick}
      className={`
        py-3 px-4 inline-flex items-center gap-2 font-bold text-sm transition-colors rounded-t-lg
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
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header>
            <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to National Index
            </Link>
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{programData?.stateName || indexData?.stateName}</h1>
                {programData && <p className="text-lg text-slate-500">RHT Award Amount: <span className="font-bold text-indigo-600">{programData.awardAmount}</span></p>}
              </div>
              <div className="flex-shrink-0 mt-4 md:mt-0 text-left md:text-right">
                {indexData && (
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perf. Index Score</div>
                    <div className="text-5xl font-black" style={{ color: overallScoreColor }}>
                      {indexData.performanceScore}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {indexData && (
              <div className="mt-6">
                <Link
                  href={`/about/methodology?from=/dashboard/${stateSlug}`}
                  title="Learn how the HTR Performance Index is calculated."
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-200/60 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-200 hover:border-slate-300 hover:text-slate-700 transition-all"
                >
                  <InformationCircleIcon className="w-4 h-4" />
                  <span>Index Methodology</span>
                </Link>
              </div>
            )}
          </header>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-slate-300">
          <nav className="-mb-px flex space-x-2" aria-label="Tabs">
            {indexData && <TabButton isActive={activeTab === 'index'} onClick={() => setActiveTab('index')} icon={<ChartBarIcon className="w-5 h-5"/>} label="Performance Index" />}
            {programData && <TabButton isActive={activeTab === 'program'} onClick={() => setActiveTab('program')} icon={<ListBulletIcon className="w-5 h-5"/>} label="RHT Program" />}
            {stateHospitals.length > 0 && <TabButton isActive={activeTab === 'hospitals'} onClick={() => setActiveTab('hospitals')} icon={<BuildingLibraryIcon className="w-5 h-5"/>} label="Hospital View" />}
          </nav>
        </div>

        <div className="py-0">
          {activeTab === 'index' && indexData && (
            <div className="animate-in fade-in bg-white p-8 rounded-b-lg border-x border-b border-slate-300 shadow-sm">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{indexData.narrative.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{indexData.narrative.summary}</p>
                  </div>
                  <div className="grid md:grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-4"><div className="bg-brand-orange/10 p-2.5 rounded-xl"><BookOpenIcon className="w-6 h-6 text-brand-orange" /></div><h3 className="text-lg font-bold text-slate-900">Policy Metrics</h3></div>
                      <div className="space-y-1"><MetricDisplay label="VBP Adoption" score={indexData.metrics.policy.vbpAdoption} /><MetricDisplay label="Telehealth Policy" score={indexData.metrics.policy.telehealth} /><MetricDisplay label="Scope of Practice" score={indexData.metrics.policy.scopeOfPractice} /></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4"><div className="bg-brand-green/10 p-2.5 rounded-xl"><BanknotesIcon className="w-6 h-6 text-brand-green" /></div><h3 className="text-lg font-bold text-slate-900">Economics Metrics</h3></div>
                      <div className="space-y-1"><MetricDisplay label="Low Spending" score={indexData.metrics.economics.spendingPerCapita} /><MetricDisplay label="Workforce" score={indexData.metrics.economics.workforceGaps} /><MetricDisplay label="Coverage Rate" score={indexData.metrics.economics.insuranceCoverage} /></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4"><div className="bg-brand-indigo/10 p-2.5 rounded-xl"><BoltIcon className="w-6 h-6 text-brand-indigo" /></div><h3 className="text-lg font-bold text-slate-900">Technology Metrics</h3></div>
                      <div className="space-y-1"><MetricDisplay label="HIE Adoption" score={indexData.metrics.technology.hieAdoption} /><MetricDisplay label="Broadband Access" score={indexData.metrics.technology.broadbandAccess} /><MetricDisplay label="EHR Adoption" score={indexData.metrics.technology.ehrAdoption} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'program' && programData && (
            <div className="animate-in fade-in bg-white p-8 rounded-b-lg border-x border-b border-slate-300 shadow-sm space-y-8">
              <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Program Description</h3><p className="text-base text-slate-700">{programData.description}</p></div>
              <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Strategic Initiatives</h3><div className="grid md:grid-cols-2 gap-6">{programData.initiatives.map(item => <InitiativeCard key={item.title} {...item} />)}</div></div>
              <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Key Metrics</h3><div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{programData.metrics.map(item => <ProgramMetricCard key={item.label} {...item} />)}</div></div>
            </div>
          )}
          {activeTab === 'hospitals' && (
            <div className="animate-in fade-in bg-white rounded-b-lg border-x border-b border-slate-300 shadow-sm overflow-hidden w-full">
              <div className="p-4 border-b border-slate-200"><h3 className="font-bold text-slate-800">Hospital Performance Data</h3></div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm min-w-[800px]">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      {Object.entries({name: "Hospital", city: "City", type: "Type", totalDischarges: "Discharges", avgLengthOfStay: "Avg. Stay", qualityScore: "Quality Score"}).map(([key, label]) => (
                        <th key={key} className="p-3 font-semibold cursor-pointer hover:bg-slate-100" onClick={() => handleHospitalSort(key as keyof Hospital)}>
                          <div className="flex items-center gap-1">{label} {hospitalSort.key === key && (hospitalSort.dir === 'asc' ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stateHospitals.map(h => (
                      <tr key={h.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-700">{h.name}</td>
                        <td className="p-3 text-slate-500">{h.city}</td>
                        <td className="p-3 text-slate-500">{h.type}</td>
                        <td className="p-3 font-mono text-slate-500">{h.totalDischarges.toLocaleString()}</td>
                        <td className="p-3 font-mono text-slate-500">{h.avgLengthOfStay.toFixed(1)} days</td>
                        <td className="p-3 font-bold" style={{color: getScoreColor(h.qualityScore)}}>{h.qualityScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}