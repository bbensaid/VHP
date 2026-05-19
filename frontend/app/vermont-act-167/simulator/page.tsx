"use client";

/**
 * Act 167 Transformation Simulator — shell.
 *
 * Was 2,248 lines. Now ~110 lines. Each of the nine tabs lives in
 * ./tabs/<id>.tsx. UI atoms in ./atoms.tsx. Data is in ./data.ts (was
 * already external before this refactor).
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HubPageTemplate from "@/components/templates/HubPageTemplate";
import {
  AdjustmentsHorizontalIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ScaleIcon,
  MapIcon,
  CpuChipIcon,
  UsersIcon,
  GlobeAltIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { RECOMMENDATIONS } from "./data";
import { ScenarioBuilder } from "./tabs/scenario";
import { HospitalDeepDive } from "./tabs/hospital";
import { FinancialModeling } from "./tabs/financial";
import { EquityAnalysis } from "./tabs/equity";
import { GeographicMap } from "./tabs/map";
import { TechnologyRoadmap } from "./tabs/technology";
import { WorkforcePlanning } from "./tabs/workforce";
import { StateBenchmarks } from "./tabs/benchmarks";
import { ImplementationRoadmap } from "./tabs/implementation";

function Footer() {
  return (
    <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl">
      <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Data Disclaimer</div>
      <p className="text-xs text-slate-500 leading-relaxed">
        This simulation tool uses a combination of data from the Oliver Wyman &ldquo;Act 167 Community Engagement: Recommendations&rdquo; report (August 2024), publicly available Vermont hospital financial data (GMCB), Vermont Census/ACS data, and <strong>synthetic projections</strong> where actual data is unavailable. Financial projections, population data, and outcome estimates are illustrative and intended for scenario planning purposes only. They should not be used as the sole basis for policy decisions. All dollar amounts are in nominal USD. Hospital-specific data should be validated against actual GMCB filings and hospital financial statements before use in formal analyses.
      </p>
      <div className="mt-3 flex gap-4 flex-wrap text-xs">
        <Link href="/vermont-act-167" className="font-bold text-violet-700 hover:underline">← Back to Act 167 Overview</Link>
        <Link href="/ahead-model" className="font-bold text-violet-700 hover:underline">AHEAD Model →</Link>
        <Link href="/dashboard" className="font-bold text-violet-700 hover:underline">RHT Dashboard →</Link>
      </div>
    </div>
  );
}

export default function Act167SimulatorPage() {
  const router = useRouter();
  const [selectedRecs, setSelectedRecs] = useState<Set<string>>(new Set());

  const toggleRec = useCallback((id: string) => {
    setSelectedRecs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => setSelectedRecs(new Set(RECOMMENDATIONS.map((r) => r.id))), []);
  const clearAll  = useCallback(() => setSelectedRecs(new Set()), []);
  const goRoadmap = useCallback(() => router.push("?tab=roadmap", { scroll: false }), [router]);

  const tabs = [
    {
      id: "scenario",
      label: "Scenario Builder",
      icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />,
      content: (
        <>
          <ScenarioBuilder selected={selectedRecs} onToggle={toggleRec} onSelectAll={selectAll} onClearAll={clearAll} onViewRoadmap={goRoadmap} />
          <Footer />
        </>
      ),
    },
    { id: "hospital",    label: "Hospital Simulator",   icon: <BuildingOffice2Icon className="w-5 h-5" />,        content: <><HospitalDeepDive selectedRecs={selectedRecs} /><Footer /></> },
    { id: "financial",   label: "Financial Modeling",   icon: <CurrencyDollarIcon className="w-5 h-5" />,         content: <><FinancialModeling selectedRecs={selectedRecs} /><Footer /></> },
    { id: "equity",      label: "Equity & Access",      icon: <ScaleIcon className="w-5 h-5" />,                  content: <><EquityAnalysis selectedRecs={selectedRecs} /><Footer /></> },
    { id: "map",         label: "Geographic Map",       icon: <MapIcon className="w-5 h-5" />,                    content: <><GeographicMap selectedRecs={selectedRecs} /><Footer /></> },
    { id: "technology",  label: "Technology Roadmap",   icon: <CpuChipIcon className="w-5 h-5" />,                content: <><TechnologyRoadmap /><Footer /></> },
    { id: "workforce",   label: "Workforce Planning",   icon: <UsersIcon className="w-5 h-5" />,                  content: <><WorkforcePlanning /><Footer /></> },
    { id: "benchmarks",  label: "State Benchmarks",     icon: <GlobeAltIcon className="w-5 h-5" />,               content: <><StateBenchmarks /><Footer /></> },
    { id: "roadmap",     label: "Implementation Plan",  icon: <ClipboardDocumentListIcon className="w-5 h-5" />,  content: <><ImplementationRoadmap selectedRecs={selectedRecs} /><Footer /></> },
  ];

  return (
    <HubPageTemplate
      badgeLabel="Policy Simulation Engine · Beta — Synthetic Data"
      title="Act 167 Transformation Simulator"
      subtitle={`Analyze implementation scenarios for the Oliver Wyman Report's ${RECOMMENDATIONS.length} recommendations. Model the 5-pillar impact — policy, technology, financial, equity, and clinical — for any combination of actions.`}
      tabs={tabs}
      backLink="/vermont-act-167"
      backLabel="Vermont Act 167"
      badgeClass="bg-violet-50 text-violet-700 border border-violet-100"
      backLinkHoverClass="hover:text-violet-600"
      rowBreakAfter={4}
    />
  );
}
