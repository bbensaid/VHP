"use client";

// Rebuilt 2026-10-17 on sourced indicators. Removed: the 0–100 "Perf. Index Score", the per-pillar 0–100 metric bars,
// the narrative, and the RHT tab's "status" and "key metrics" (Achieved / In Progress / Pending), none of which had a
// source. The RHT description and initiatives paraphrase CMS's state project abstracts and are labelled as such.

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, ChartBarIcon, ListBulletIcon, BuildingLibraryIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { CMS_HOSPITAL_SOURCE, type CmsHospital } from "@/lib/cms-hospitals";
import { INDICATORS, INDICATOR_SOURCES, STATE_INDICATORS, rankOf } from "@/lib/data/state-indicators";

const RHT_ABSTRACTS_URL = "https://www.cms.gov/files/document/rht-program-state-provided-abstracts.pdf";
const PILLAR_LABEL: Record<string, string> = {
  policy: "Policy", technology: "Technology", economics: "Economics", clinical: "Clinical", operations: "Operations", equity: "Equity Imperative",
};

interface ClientPageProps {
  code: string;
  stateSlug: string;
  rht: { description: string; initiatives: { title: string; description: string }[] } | null;
  hospitals: CmsHospital[];
}

function StateDetailClientPageInner({ code, rht, hospitals }: ClientPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const s = STATE_INDICATORS[code];
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "indicators");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t && t !== activeTab) setActiveTab(t);
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const [hospitalSort, setHospitalSort] = useState<{ key: keyof CmsHospital; dir: "asc" | "desc" }>({ key: "name", dir: "asc" });
  const stateHospitals = useMemo(() => [...hospitals].sort((a, b) => {
    const va = a[hospitalSort.key] ?? -1, vb = b[hospitalSort.key] ?? -1;
    if (va < vb) return hospitalSort.dir === "asc" ? -1 : 1;
    if (va > vb) return hospitalSort.dir === "asc" ? 1 : -1;
    return 0;
  }), [hospitals, hospitalSort]);

  const TabButton = ({ id, icon, label }: { id: string; icon: React.ReactNode; label: string }) => (
    <button onClick={() => handleTabChange(id)}
      className={`relative py-3 px-6 inline-flex items-center gap-2 font-bold text-sm transition-all rounded-t-xl border-t border-l border-r mr-2 ${activeTab === id
        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-black dark:border-slate-500 z-10 -mb-px"
        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 hover:bg-slate-50 border-slate-200 dark:border-slate-700 mt-1.5 shadow-sm"}`}>
      {icon}{label}
    </button>
  );

  return (
    <div className="w-full font-sans text-slate-800 dark:text-slate-100 flex flex-col pb-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-6 shadow-sm">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to the fifty-state dashboard
        </Link>
        <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">{s.name}</h1>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-3 py-1">RHT FY2026 award: ${(s.rhtAwardFY26 / 1e6).toFixed(1)}M</span>
          <span className="bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-3 py-1">Medicaid expansion: {s.medicaidExpansion ? "adopted" : "not adopted"} (KFF)</span>
          {s.ahead && <span className="bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-3 py-1">AHEAD Model: {s.ahead}</span>}
        </div>
      </div>

      <div className="sticky z-30 mb-8" style={{ top: "var(--sidebar-top, var(--sticky-bar-height, 2.5rem))" }}>
        <nav className="flex items-end overflow-x-auto hide-scrollbar border-b border-slate-200 dark:border-slate-700 pl-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm pt-2" aria-label="Tabs">
          <TabButton id="indicators" icon={<ChartBarIcon className="w-5 h-5" />} label="Indicators" />
          {rht && <TabButton id="program" icon={<ListBulletIcon className="w-5 h-5" />} label="RHT Program" />}
          {stateHospitals.length > 0 && <TabButton id="hospitals" icon={<BuildingLibraryIcon className="w-5 h-5" />} label="Hospital View" />}
        </nav>
      </div>

      {activeTab === "indicators" && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-b-lg border-x border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500"><tr><th className="py-2">Indicator</th><th className="py-2">Speaks to</th><th className="py-2">{s.name}</th><th className="py-2">Rank of 50 (highest value = 1)</th><th className="py-2">Source</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {INDICATORS.map((ind) => {
                const v = ind.get(s);
                const r = rankOf(ind, code);
                const src = INDICATOR_SOURCES[ind.source];
                return (
                  <tr key={ind.key}>
                    <td className="py-3 pr-4"><div className="font-semibold text-slate-800 dark:text-slate-100">{ind.label}</div>{ind.note && <div className="text-xs text-slate-500">{ind.note}</div>}</td>
                    <td className="py-3 pr-4 text-xs text-slate-500">{PILLAR_LABEL[ind.pillar]}</td>
                    <td className="py-3 pr-4 font-mono font-bold text-indigo-700">{v == null ? "—" : ind.format(v)}</td>
                    <td className="py-3 pr-4 text-slate-600">{r ? `${r.rank} of ${r.of}` : "—"}</td>
                    <td className="py-3 text-xs"><a className="underline text-slate-500" href={src.url} target="_blank" rel="noopener noreferrer">{src.label}{ind.source === "brfss" && s.brfss ? `, ${s.brfss.year}` : ""}</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-slate-500">
            No sourced fifty-state measure is shown for the Technology pillar yet. Ranks order values only; for some indicators
            (cost barriers, the education gap) a lower value is better, and counts and award sizes are not better or worse.
          </p>
        </div>
      )}

      {activeTab === "program" && rht && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-b-lg border-x border-b border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
          <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Program Description</h3><p className="text-base text-slate-700 dark:text-slate-300">{rht.description}</p></div>
          <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Strategic Initiatives</h3>
            <div className="grid md:grid-cols-2 gap-6">{rht.initiatives.map((i) => (
              <div key={i.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">{i.title}</h4>
                <p className="ty-body text-slate-600 dark:text-slate-400 leading-relaxed">{i.description}</p>
              </div>))}
            </div>
          </div>
          <p className="text-xs text-slate-500">Source: <a className="underline" href={RHT_ABSTRACTS_URL} target="_blank" rel="noopener noreferrer">CMS, RHT Program State Project Abstracts (December 2025)</a>, as the state described its plan; award from <a className="underline" href={INDICATOR_SOURCES.rht.url} target="_blank" rel="noopener noreferrer">CMS</a>.</p>
        </div>
      )}

      {activeTab === "hospitals" && (
        <div className="bg-white dark:bg-slate-900 rounded-b-lg border-x border-b border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden w-full">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700"><h3 className="font-bold text-slate-800 dark:text-slate-100">Hospitals in this state</h3><p className="text-xs text-slate-500 mt-1">Source: <a href={CMS_HOSPITAL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">{CMS_HOSPITAL_SOURCE.label}</a> (refreshed daily). Star rating is CMS&apos;s overall hospital quality rating, 1–5; small hospitals often have too few measures to be rated.</p></div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
                <tr>
                  {Object.entries({ name: "Hospital", city: "City", type: "Type", ownership: "Ownership", emergencyServices: "Emergency services", overallRating: "CMS star rating" }).map(([key, label]) => (
                    <th key={key} className="p-3 font-semibold cursor-pointer hover:bg-slate-100" onClick={() => setHospitalSort((p) => ({ key: key as keyof CmsHospital, dir: p.key === key && p.dir === "desc" ? "asc" : "desc" }))}>
                      <div className="flex items-center gap-1">{label} {hospitalSort.key === key && (hospitalSort.dir === "asc" ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {stateHospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-200">{h.name}</td>
                    <td className="p-3 text-slate-500">{h.city}</td>
                    <td className="p-3 text-slate-500">{h.type}</td>
                    <td className="p-3 text-slate-500">{h.ownership}</td>
                    <td className="p-3 text-slate-500">{h.emergencyServices}</td>
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-200">{h.overallRating == null ? <span className="font-normal text-slate-400">Not rated</span> : "★".repeat(h.overallRating) + " " + h.overallRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StateDetailClientPage(props: ClientPageProps) {
  return (
    <Suspense fallback={null}>
      <StateDetailClientPageInner {...props} />
    </Suspense>
  );
}
