"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRightIcon, ArrowPathIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Pillar = "Policy" | "Economics" | "Technology" | "Clinical" | "Equity" | "Operations";
type Direction = "positive" | "neutral" | "negative" | "critical";

interface PillarImpact {
  pillar: Pillar;
  score: number;        // -100 to +100
  direction: Direction;
  headline: string;
  details: string[];
  bindingConstraint?: string;
}

interface ScenarioTemplate {
  id: string;
  label: string;
  category: string;
  color: string;
  description: string;
  inputs: InputDef[];
  compute: (inputs: Record<string, number | string>) => PillarImpact[];
}

interface InputDef {
  id: string;
  label: string;
  type: "slider" | "select";
  min?: number;
  max?: number;
  default: number | string;
  unit?: string;
  options?: { value: string; label: string }[];
}

// ─── PILLAR CONFIG ────────────────────────────────────────────────────────────

const PILLAR_COLORS: Record<Pillar, { bg: string; text: string; border: string; bar: string }> = {
  Policy:     { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200",    bar: "bg-sky-500" },
  Economics:  { bg: "bg-emerald-50",text: "text-emerald-700",border: "border-emerald-200",bar: "bg-emerald-500" },
  Technology: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", bar: "bg-indigo-500" },
  Clinical:   { bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200",   bar: "bg-rose-500" },
  Equity:     { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", bar: "bg-violet-500" },
  Operations: { bg: "bg-teal-50",   text: "text-teal-700",   border: "border-teal-200",   bar: "bg-teal-500" },
};

function scoreToDirection(s: number): Direction {
  if (s >= 40)  return "positive";
  if (s >= -10) return "neutral";
  if (s >= -40) return "negative";
  return "critical";
}

function scoreToColor(s: number) {
  if (s >= 40)  return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (s >= -10) return "text-amber-700 bg-amber-50 border-amber-200";
  if (s >= -40) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function scoreLabel(s: number) {
  if (s >= 60)  return "Strong positive";
  if (s >= 20)  return "Positive";
  if (s >= -20) return "Neutral / mixed";
  if (s >= -60) return "Negative";
  return "Critical risk";
}

// ─── SCENARIO DEFINITIONS WITH REAL COMPUTE ENGINES ─────────────────────────

const SCENARIOS: ScenarioTemplate[] = [
  // ─── 1. Vermont Hospital Restructuring ────────────────────────────────────
  {
    id: "vt_restructuring",
    label: "Vermont Hospital Restructuring",
    category: "Vermont / Act 167",
    color: "text-red-700 border-red-200 bg-red-50",
    description: "Model the cross-pillar impact of closing inpatient units at at-risk hospitals (Gifford, Grace Cottage, North Country, Springfield) and redirecting volume to regional specialty centers per the Act 167 Wyman report.",
    inputs: [
      { id: "hospitals_closed", label: "Hospitals converting to REH/CACC", type: "slider", min: 0, max: 4, default: 2, unit: "hospitals" },
      { id: "transport_investment", label: "EMS & transport investment", type: "select", default: "moderate",
        options: [{ value: "none", label: "None" }, { value: "moderate", label: "Moderate ($20M)" }, { value: "full", label: "Full ($50M+)" }] },
      { id: "housing_built", label: "Affordable housing units built", type: "slider", min: 0, max: 2000, default: 500, unit: "units" },
      { id: "timeline_years", label: "Implementation timeline", type: "slider", min: 2, max: 6, default: 4, unit: "years" },
    ],
    compute(inp) {
      const n = inp.hospitals_closed as number;
      const transport = inp.transport_investment as string;
      const housing = inp.housing_built as number;
      const timeline = inp.timeline_years as number;
      const transportBoost = transport === "full" ? 30 : transport === "moderate" ? 15 : 0;
      const housingBoost = Math.min(25, housing / 40);
      const speedBonus = Math.max(0, (6 - timeline) * 5);

      return [
        { pillar: "Policy", score: 45 + speedBonus - n * 2,
          direction: scoreToDirection(45 + speedBonus - n * 2),
          headline: "Regulatory alignment needed for REH/CACC conversions",
          details: [
            "GMCB must approve CON changes for each restructured facility",
            "Legislature needs to pass REH enabling regulation and funding",
            "AHS must convene community stakeholders in each HSA before closure",
            n > 2 ? "High political risk — communities strongly opposed to closures" : "Manageable with proper community engagement",
          ],
          bindingConstraint: n > 3 ? "Legislative approval and community buy-in are binding constraints at this scale" : undefined,
        },
        { pillar: "Economics", score: 50 + n * 8 - (timeline > 4 ? 10 : 0),
          direction: scoreToDirection(50 + n * 8),
          headline: `Projected $${(n * 25 + housingBoost).toFixed(0)}M–$${(n * 45 + housingBoost + 50).toFixed(0)}M in savings over 5 years`,
          details: [
            `Closing ${n} inpatient unit(s): ~$${n * 25}M direct savings`,
            "Administrative cost synergies from shared services: $50M+",
            housingBoost > 10 ? `Housing investment reduces avoidable hospitalizations: ~$${housingBoost.toFixed(0)}M indirect savings` : "Limited indirect savings without housing investment",
            "Reference-based pricing at 200% Medicare adds further savings",
          ],
        },
        { pillar: "Operations", score: 20 + transportBoost - (transport === "none" ? 20 : 0),
          direction: scoreToDirection(20 + transportBoost - (transport === "none" ? 20 : 0)),
          headline: transport === "none" ? "EMS gap is critical — transfers cannot be safely managed" : "Transfer routing manageable with EMS investment",
          details: [
            "Bed Capacity & Transfer tool must be operational before any closure",
            transport === "none" ? "⚠ No EMS investment: patients face 30–60 min longer transport times" : `EMS regionalization: reduces average transfer time by ~${transport === "full" ? "25" : "12"} min`,
            "NVRH absorbs NCH volume; CVMC absorbs Gifford; BMH absorbs Grace Cottage + Springfield",
            "Staff redeployment plan needed 12 months before IP unit closures",
          ],
          bindingConstraint: transport === "none" ? "EMS investment is a prerequisite — proceeding without it risks patient harm" : undefined,
        },
        { pillar: "Clinical", score: 35 + n * 5,
          direction: scoreToDirection(35 + n * 5),
          headline: "Care quality improves at regional COEs; access risk during transition",
          details: [
            "Regional centers of excellence: higher volume → better outcomes for complex surgery, psych, OB",
            "75% of UVMMC physicians below 50th productivity percentile — COE model forces improvement",
            `Transition period: ${Math.max(1, timeline - 1)}-year window of access risk for communities near closed units`,
            "Telehealth and Hospital-at-Home programs must be operational before closures",
          ],
        },
        { pillar: "Equity", score: housingBoost + transportBoost - 10,
          direction: scoreToDirection(housingBoost + transportBoost - 10),
          headline: housing > 800 ? "Equity improves with strong housing + transport package" : "Equity risk without housing and transport investment",
          details: [
            `${housing} housing units: ${housing > 800 ? "significant" : housing > 300 ? "moderate" : "insufficient"} SDOH impact`,
            transport === "full" ? "Full EMS investment: reduces access disparity for rural populations" : "Transport gaps disproportionately affect low-income, elderly, and non-English-speaking populations",
            "Language-accessible telehealth and mobile clinics needed in closed-unit communities",
            "PACE and SASH programs must expand to absorb social care previously handled in-hospital",
          ],
          bindingConstraint: housing < 200 && transport === "none" ? "Without housing + transport, this restructuring increases health inequity for vulnerable populations" : undefined,
        },
        { pillar: "Technology", score: 55,
          direction: "positive",
          headline: "VITL interoperability and EMR integration are prerequisites",
          details: [
            "Statewide EMR coordination (VITL) must be completed before HSA mergers take effect",
            "Bed Capacity & Transfer tool requires real-time data feeds from all 14 hospitals",
            "Telehealth infrastructure needed at all restructured sites (REH/CACC)",
            "Broadband expansion (Starlink/rural) required for remote monitoring in home-based care",
          ],
        },
      ];
    },
  },

  // ─── 2. Global Budget / Reference-Based Pricing ───────────────────────────
  {
    id: "global_budget",
    label: "Global Budget & Reference-Based Pricing",
    category: "Payment Reform",
    color: "text-emerald-700 border-emerald-200 bg-emerald-50",
    description: "Model the six-pillar impact of moving PPS hospitals to reference-based pricing at a target % of Medicare, aligned with the Act 167 recommendation of ≤200% Medicare.",
    inputs: [
      { id: "medicare_pct", label: "Reference price (% of Medicare)", type: "slider", min: 150, max: 300, default: 200, unit: "%" },
      { id: "timeline_months", label: "Phase-in timeline", type: "slider", min: 12, max: 60, default: 36, unit: "months" },
      { id: "payer_scope", label: "Payer scope", type: "select", default: "state_employees",
        options: [
          { value: "state_employees", label: "State employees only" },
          { value: "medicaid", label: "Medicaid only" },
          { value: "all_payer", label: "All-payer (full)" },
        ]},
    ],
    compute(inp) {
      const pct = inp.medicare_pct as number;
      const months = inp.timeline_months as number;
      const scope = inp.payer_scope as string;
      const aggressiveness = Math.max(0, 250 - pct) / 100; // higher if lower price target
      const scopeMultiplier = scope === "all_payer" ? 1.0 : scope === "medicaid" ? 0.5 : 0.25;
      const speedRisk = months < 24 ? -15 : 0;

      return [
        { pillar: "Policy", score: 50 + speedRisk,
          direction: scoreToDirection(50 + speedRisk),
          headline: scope === "all_payer" ? "Requires major legislation — significant political risk" : "Achievable via GMCB regulatory action for limited scope",
          details: [
            scope === "all_payer" ? "All-payer requires Act of Legislature + CMS approval" : "Limited scope achievable via GMCB rulemaking within 12 months",
            `Montana achieved 220-225% inpatient, 230-250% outpatient — Vermont target of ${pct}% is ${pct <= 220 ? "aggressive" : "comparable"}`,
            "GMCB must modify hospital budget review process to align with reference prices",
            months < 24 ? "Rapid phase-in increases legal challenge risk from hospital systems" : "36-month phase-in is standard practice in reference-based pricing implementations",
          ],
        },
        { pillar: "Economics", score: Math.round(40 + aggressiveness * 30 * scopeMultiplier + speedRisk / 2),
          direction: scoreToDirection(40 + aggressiveness * 30 * scopeMultiplier),
          headline: `Estimated annual savings: $${Math.round(aggressiveness * 120 * scopeMultiplier)}M–$${Math.round(aggressiveness * 200 * scopeMultiplier)}M`,
          details: [
            `At ${pct}% of Medicare: ${aggressiveness > 0.5 ? "aggressive" : "moderate"} price compression`,
            scope === "all_payer" ? "Full savings realized — Montana achieved $47.8M with state employees alone" : `Partial savings — ${Math.round(scopeMultiplier * 100)}% of full potential`,
            pct <= 200 ? "Hospitals below 200% Medicare will face revenue shortfall — accelerates restructuring need" : "Hospitals above 220% Medicare are unlikely to face immediate revenue cliff",
            "Savings can be reinvested in community-based care, primary care, and SDOH programs",
          ],
        },
        { pillar: "Operations", score: -20 + (months > 24 ? 15 : 0),
          direction: scoreToDirection(-20 + (months > 24 ? 15 : 0)),
          headline: "Revenue cycle disruption is significant — billing systems must be overhauled",
          details: [
            "All hospitals must adopt consistent accounting methods (GMCB mandate)",
            "Prior authorization processes must be streamlined — currently adds $X/encounter",
            months < 24 ? "Rapid phase-in: insufficient time for revenue cycle adaptation" : "Adequate phase-in: allows billing system upgrades and staff retraining",
            "UVMMC at >400% peer admin costs — reference pricing creates strong administrative efficiency pressure",
          ],
          bindingConstraint: scope === "all_payer" && pct < 175 ? "Prices below 175% Medicare may cause hospital insolvency before structural changes can absorb the shock" : undefined,
        },
        { pillar: "Clinical", score: 30,
          direction: "positive",
          headline: "Pressure on UVMMC productivity improves care access",
          details: [
            "75% of UVMMC physicians below 50th percentile — pricing pressure accelerates productivity improvement",
            "Specialty consolidation at COEs improves clinical quality through volume",
            "Reference pricing creates incentive to shift low-acuity cases to ambulatory settings",
            "No evidence of quality decline in Montana, North Carolina, or Oregon implementations",
          ],
        },
        { pillar: "Equity", score: 20 + Math.round(scopeMultiplier * 15),
          direction: "positive",
          headline: "Bends premium trend — reduces affordability burden on working Vermonters",
          details: [
            "Vermont silver plan premiums up 108% since 2018 — reference pricing directly addresses this",
            scope === "all_payer" ? "All-payer scope: maximum premium reduction benefit for commercially insured Vermonters" : "Limited scope: premium reduction benefit only for covered population",
            "Savings must be reinvested in SDOH, housing, and rural access — otherwise equity gains are lost",
            "Low-income populations benefit most from premium reduction",
          ],
        },
        { pillar: "Technology", score: 15,
          direction: "neutral",
          headline: "Claims data infrastructure and VITL required to manage reference pricing",
          details: [
            "VITL must include pharmacy claims data (currently missing) for accurate TCOC measurement",
            "AHEAD model requires real-time attribution — current EMR connectivity insufficient",
            "Standardized accounting system required across all hospitals (GMCB mandate)",
            "OneCare participation must become mandatory — current voluntary model is insufficient for all-payer",
          ],
        },
      ];
    },
  },

  // ─── 3. Hospital-at-Home Launch ───────────────────────────────────────────
  {
    id: "hospital_at_home",
    label: "Hospital-at-Home Program Launch",
    category: "Care Delivery",
    color: "text-rose-700 border-rose-200 bg-rose-50",
    description: "Model what happens when Vermont launches a Hospital-at-Home program — acute care delivered in the home setting, reducing unnecessary inpatient stays and freeing bed capacity at strained facilities.",
    inputs: [
      { id: "target_patients", label: "Target patients per year", type: "slider", min: 100, max: 2000, default: 500, unit: "patients" },
      { id: "broadband_coverage", label: "Rural broadband coverage", type: "select", default: "partial",
        options: [{ value: "none", label: "Current coverage only" }, { value: "partial", label: "Partial expansion" }, { value: "full", label: "Full rural coverage" }] },
      { id: "lead_hospital", label: "Lead hospital", type: "select", default: "uvmmc",
        options: [
          { value: "uvmmc", label: "UVMMC (Burlington)" },
          { value: "cvmc", label: "CVMC (Barre)" },
          { value: "consortium", label: "Multi-hospital consortium" },
        ]},
    ],
    compute(inp) {
      const pts = inp.target_patients as number;
      const broadband = inp.broadband_coverage as string;
      const lead = inp.lead_hospital as string;
      const broadbandBoost = broadband === "full" ? 25 : broadband === "partial" ? 12 : 0;
      const scaleScore = Math.min(40, pts / 50);
      const consortiumBonus = lead === "consortium" ? 15 : 0;

      return [
        { pillar: "Policy", score: 55,
          direction: "positive",
          headline: "CMS Acute Hospital Care at Home waiver provides federal framework",
          details: [
            "Medicare requires 2 clinician visits per day — Vermont must implement this protocol",
            "State must develop payment model for non-transport EMS participation (community paramedicine)",
            "AHS must approve broadband and electrical infrastructure investment as HaH prerequisites",
            "GMCB must allow hospital budgets to credit HaH activity against inpatient utilization",
          ],
        },
        { pillar: "Economics", score: 30 + scaleScore,
          direction: scoreToDirection(30 + scaleScore),
          headline: `Estimated savings: $${Math.round(pts * 1200 / 1000)}K–$${Math.round(pts * 2000 / 1000)}K annually`,
          details: [
            `${pts} patients/year at average $1,200 savings vs. inpatient stay: ~$${Math.round(pts * 1.2)}K`,
            "Huntsman Cancer Center (Salt Lake City) model: 30% cost reduction for qualifying patients",
            "MGH and Brigham and Women's pilots: equivalent quality outcomes at 40% lower cost",
            lead === "consortium" ? "Multi-hospital consortium: economies of scale in monitoring, pharmacy, and logistics" : "Single-hospital model: higher per-patient cost than consortium",
          ],
        },
        { pillar: "Operations", score: 20 + broadbandBoost - (broadband === "none" ? 15 : 0),
          direction: scoreToDirection(20 + broadbandBoost - (broadband === "none" ? 15 : 0)),
          headline: broadband === "none" ? "Broadband gap severely limits rural reach" : "Operationally viable with proper monitoring infrastructure",
          details: [
            broadband === "none" ? "⚠ Current broadband coverage excludes 12%+ of rural Vermont — significant rural exclusion" : `Broadband expansion covers ${broadband === "full" ? "all" : "most"} rural homes`,
            "Requires central monitoring facility for vital signs, medication adherence, and alerts",
            "EMS/paramedics must be available for rapid home visits (community paramedicine model)",
            "Discharge planning and case management capacity must expand to support transitions",
          ],
          bindingConstraint: broadband === "none" ? "Broadband is a binding prerequisite — rural patients cannot be served without it" : undefined,
        },
        { pillar: "Clinical", score: 50,
          direction: "positive",
          headline: "Clinical evidence strong — equivalent or better outcomes vs. inpatient",
          details: [
            "Multiple RCTs confirm equivalent safety and quality for qualifying conditions (pneumonia, CHF, COPD)",
            "Conditions: pneumonia, CHF, COPD exacerbation, cellulitis, DVT — well-defined eligibility criteria",
            "Reduces hospital-acquired infections, delirium in elderly patients",
            "Requires EHR integration for remote monitoring data to flow into clinical record",
          ],
        },
        { pillar: "Equity", score: 20 + broadbandBoost - 10,
          direction: scoreToDirection(20 + broadbandBoost - 10),
          headline: broadband === "full" ? "Equity-positive with full rural broadband" : "Equity risk if rural populations excluded",
          details: [
            broadband === "none" ? "⚠ Without broadband, HaH benefits accrue primarily to Burlington/Barre — widens rural-urban disparity" : "Broadband investment is the key equity lever for this program",
            "Must include language-accessible telehealth interfaces",
            "Elderly patients (65+, 30%+ of Vermont by 2040) are primary beneficiaries — high alignment",
            "SASH and PACE programs can provide supplemental support for HaH-enrolled patients",
          ],
        },
        { pillar: "Technology", score: 55 + broadbandBoost / 2,
          direction: "positive",
          headline: "Technology infrastructure is the core enabler",
          details: [
            "Remote monitoring devices: EKG, pulse oximeter, blood pressure, weight scale — FDA-cleared",
            "Centralized monitoring platform (Epic-integrated preferred) for clinician oversight",
            "Broadband or LTE fallback required at all patient homes",
            "Tablet-based telehealth for daily clinician video visits (Medicare requirement)",
          ],
        },
      ];
    },
  },

  // ─── 4. EMS Regionalization ───────────────────────────────────────────────
  {
    id: "ems_regionalization",
    label: "EMS Professionalization & Regionalization",
    category: "Vermont / Act 167",
    color: "text-amber-700 border-amber-200 bg-amber-50",
    description: "Model the impact of professionalizing Vermont's EMS system and creating regional coordination centers — a top AHS priority for 2025 that is a prerequisite for any hospital restructuring.",
    inputs: [
      { id: "regional_stations", label: "New regional EMS stations", type: "slider", min: 2, max: 12, default: 6, unit: "stations" },
      { id: "community_paramedicine", label: "Community paramedicine program", type: "select", default: "partial",
        options: [{ value: "none", label: "None" }, { value: "partial", label: "Partial (3 regions)" }, { value: "statewide", label: "Statewide" }] },
      { id: "starlink_emts", label: "Starlink broadband for EMTs", type: "select", default: "yes",
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
    compute(inp) {
      const stations = inp.regional_stations as number;
      const paramedicine = inp.community_paramedicine as string;
      const starlink = inp.starlink_emts as string;
      const starlinkBoost = starlink === "yes" ? 15 : 0;
      const paramedicineBoost = paramedicine === "statewide" ? 30 : paramedicine === "partial" ? 15 : 0;
      const stationScore = Math.min(40, stations * 5);

      return [
        { pillar: "Policy", score: 60 + starlinkBoost / 3,
          direction: "positive",
          headline: "Legislature must approve EMS funding and zoning/environmental changes",
          details: [
            "Vermont Legislature must approve EMS transformation funding (2025 priority per Wyman report)",
            "Expand professional licensure scope for EMTs and paramedics (Act 167 recommendation)",
            "Reimburse non-transport EMS services — currently not funded under Medicare/Medicaid",
            starlink === "yes" ? "Starlink deployment requires FCC coordination and rural infrastructure permits" : "Without broadband, EMTs cannot access patient records or telemedicine support in field",
          ],
        },
        { pillar: "Economics", score: 35 + stationScore / 2,
          direction: scoreToDirection(35 + stationScore / 2),
          headline: `Investment: ~$${Math.round(stations * 1.5)}M setup + $${Math.round(stations * 1.1)}M/year operating`,
          details: [
            `${stations} stations × $1.5M setup = $${Math.round(stations * 1.5)}M one-time cost`,
            `${stations} stations × $1.1M/year = $${Math.round(stations * 1.1)}M annual operating`,
            paramedicineBoost > 0 ? `Community paramedicine: reduces avoidable ED visits — Indiana data shows $7.50 return per $1 invested` : "No community paramedicine: foregoes significant cost savings",
            "EMS regionalization enables hospital closures that unlock $100M+ in system savings",
          ],
        },
        { pillar: "Operations", score: 60 + stationScore + starlinkBoost,
          direction: "positive",
          headline: "Dramatically reduces the 31-agency coordination problem",
          details: [
            "Current system: up to 31 EMS agencies called for a single inter-facility transfer",
            `${stations} regional stations: creates centralized dispatch and coordination`,
            starlink === "yes" ? "Starlink: EMTs access patient records, telemedicine, and bed availability in real time" : "Without Starlink: field teams cannot access VITL or bed capacity tools",
            "Regional EMS is a prerequisite for hospital closures — without it, transfers cannot be managed safely",
          ],
        },
        { pillar: "Clinical", score: 40 + paramedicineBoost / 2,
          direction: scoreToDirection(40 + paramedicineBoost / 2),
          headline: "Faster response times + community paramedicine expands care reach",
          details: [
            "Professional EMS reduces average response time by 8–15 minutes in rural areas",
            paramedicine === "statewide" ? "Statewide community paramedicine: paramedics deliver wound care, medication admin, and care transitions in home" : "",
            paramedicine !== "none" ? "Community paramedicine reduces SNF transfer delays and unnecessary ED visits" : "Missed opportunity: community paramedicine is high-ROI with existing EMS staff",
            "Enables Hospital-at-Home program by providing daily in-home clinical visits",
          ],
        },
        { pillar: "Equity", score: 35 + paramedicineBoost,
          direction: scoreToDirection(35 + paramedicineBoost),
          headline: "Closes rural access gap — the most direct equity intervention available",
          details: [
            "Rural Vermonters currently face 45+ min average EMS response times in some HSAs",
            `${stations} regional stations: reduces maximum response time to ~${Math.max(15, 45 - stations * 3)} min`,
            paramedicine === "statewide" ? "Statewide community paramedicine: migrant workers, homebound elderly, and low-income households all reached" : "",
            "Non-emergent transport for medical appointments: mirrors Missouri HealthTran model ($7.50 return per $1)",
          ],
        },
        { pillar: "Technology", score: 45 + starlinkBoost,
          direction: scoreToDirection(45 + starlinkBoost),
          headline: starlink === "yes" ? "Starlink integration makes field teams data-capable" : "Limited technology benefit without broadband",
          details: [
            starlink === "yes" ? "Starlink: universal roaming plan for first responders — $99/month per unit" : "Without Starlink: field teams remain data-isolated",
            "EMT tablets: access VITL patient records, bed capacity tool, transfer routing in field",
            "Regional dispatch software: integrates with hospital bed capacity feeds",
            "Two-way radio upgrade required for all regional stations (~$8K per station)",
          ],
        },
      ];
    },
  },
];

// ─── PILLAR CARD ──────────────────────────────────────────────────────────────

function PillarCard({ impact }: { impact: PillarImpact }) {
  const [expanded, setExpanded] = useState(false);
  const c = PILLAR_COLORS[impact.pillar];
  const scoreCol = scoreToColor(impact.score);
  const bar = Math.abs(impact.score);
  const isPositive = impact.score >= 0;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>{impact.pillar}</span>
          <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${scoreCol}`}>
            {isPositive ? "+" : ""}{impact.score} · {scoreLabel(impact.score)}
          </span>
        </div>
        {/* Score bar */}
        <div className="w-full h-1.5 bg-white/60 rounded-full mb-3">
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ${isPositive ? c.bar : "bg-red-400"}`}
            style={{ width: `${Math.min(100, bar)}%` }}
          />
        </div>
        <p className="text-sm font-bold text-slate-800 leading-snug mb-2">{impact.headline}</p>
        {impact.bindingConstraint && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">
            <p className="text-xs font-bold text-red-700">⚠ Binding constraint: {impact.bindingConstraint}</p>
          </div>
        )}
        <button onClick={() => setExpanded(!expanded)}
          className={`text-xs font-bold ${c.text} flex items-center gap-1 hover:opacity-70 transition-opacity`}>
          {expanded ? "Hide details" : "Show details"}
          <ChevronRightIcon className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </div>
      {expanded && (
        <div className="border-t border-white/50 bg-white/40 px-4 py-3">
          <ul className="space-y-1.5">
            {impact.details.filter(Boolean).map((d, i) => (
              <li key={i} className="text-xs text-slate-700 flex gap-2">
                <span className={`mt-0.5 shrink-0 ${c.text}`}>•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── SCENARIO INPUT ───────────────────────────────────────────────────────────

function ScenarioInputs({ scenario, values, onChange }: {
  scenario: ScenarioTemplate;
  values: Record<string, number | string>;
  onChange: (id: string, val: number | string) => void;
}) {
  return (
    <div className="space-y-5">
      {scenario.inputs.map((inp) => (
        <div key={inp.id}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-700">{inp.label}</label>
            {inp.type === "slider" && (
              <span className="text-sm font-black text-slate-900">
                {values[inp.id]}{inp.unit ? ` ${inp.unit}` : ""}
              </span>
            )}
          </div>
          {inp.type === "slider" ? (
            <input type="range"
              min={inp.min} max={inp.max}
              value={values[inp.id] as number}
              onChange={(e) => onChange(inp.id, Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          ) : (
            <select
              value={values[inp.id] as string}
              onChange={(e) => onChange(inp.id, e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {inp.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ImpactSimulationPage() {
  const [selectedId, setSelectedId] = useState<string>(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === selectedId)!;

  const defaultValues = useMemo(() => {
    const d: Record<string, number | string> = {};
    for (const inp of scenario.inputs) d[inp.id] = inp.default;
    return d;
    // `scenario.inputs` is fixed by `scenario.id` via SCENARIOS.find.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  const [values, setValues] = useState<Record<string, number | string>>(defaultValues);

  // Reset when scenario changes
  const handleSelectScenario = (id: string) => {
    setSelectedId(id);
    const s = SCENARIOS.find((s) => s.id === id)!;
    const d: Record<string, number | string> = {};
    for (const inp of s.inputs) d[inp.id] = inp.default;
    setValues(d);
  };

  const impacts = useMemo(() => scenario.compute(values), [scenario, values]);

  const overallScore = Math.round(impacts.reduce((s, i) => s + i.score, 0) / impacts.length);
  const bindingConstraints = impacts.filter((i) => i.bindingConstraint);
  const positives = impacts.filter((i) => i.score >= 20).length;
  const negatives = impacts.filter((i) => i.score < -10).length;

  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* Header */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 block mb-1">
            Cross-Pillar Impact Simulation
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">Impact Simulation Engine</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Select a transformation scenario, adjust parameters, and see how it propagates across all six pillars simultaneously.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: scenario selector + inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Select scenario</h2>
              <div className="space-y-2">
                {SCENARIOS.map((s) => (
                  <button key={s.id} onClick={() => handleSelectScenario(s.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedId === s.id
                        ? `${s.color} border-current shadow-sm`
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${selectedId === s.id ? "" : "text-slate-400"}`}>
                      {s.category}
                    </p>
                    <p className={`text-sm font-black ${selectedId === s.id ? "" : "text-slate-700"}`}>{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Parameters</h2>
              <ScenarioInputs scenario={scenario} values={values} onChange={(id, val) => setValues((v) => ({ ...v, [id]: val }))} />
            </div>

            {/* Links */}
            <div className="space-y-2">
              <Link href="/bed-capacity" className="block text-xs font-bold text-indigo-600 hover:underline">
                → Bed Capacity & Transfer Tool
              </Link>
              <Link href="/vermont-act-167/simulator" className="block text-xs font-bold text-indigo-600 hover:underline">
                → Act 167 Hospital Simulator
              </Link>
              <Link href="/vermont-rht-program" className="block text-xs font-bold text-indigo-600 hover:underline">
                → Vermont RHT Program
              </Link>
            </div>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2 space-y-6">

            {/* Scenario description */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{scenario.category}</p>
              <h2 className="text-lg font-black text-slate-900 mb-2">{scenario.label}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{scenario.description}</p>
            </div>

            {/* Summary scores */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`rounded-xl border p-4 text-center ${scoreToColor(overallScore)}`}>
                <p className="text-2xl font-black">{overallScore > 0 ? "+" : ""}{overallScore}</p>
                <p className="text-xs font-bold mt-1">Overall score</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <p className="text-2xl font-black text-emerald-700">{positives}</p>
                <p className="text-xs font-bold text-emerald-700 mt-1">Positive pillars</p>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-2xl font-black text-red-700">{negatives + bindingConstraints.length}</p>
                <p className="text-xs font-bold text-red-700 mt-1">At-risk pillars</p>
              </div>
            </div>

            {/* Binding constraints callout */}
            {bindingConstraints.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-black text-red-800 mb-2">⚠ {bindingConstraints.length} binding constraint{bindingConstraints.length > 1 ? "s" : ""} — resolve before proceeding</p>
                {bindingConstraints.map((b, i) => (
                  <p key={i} className="text-xs text-red-700 mt-1">• {b.pillar}: {b.bindingConstraint}</p>
                ))}
              </div>
            )}

            {/* Pillar cards */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Cross-pillar impact</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {impacts.map((impact) => <PillarCard key={impact.pillar} impact={impact} />)}
              </div>
            </div>

            {/* Score interpretation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Score guide</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { range: "+40 to +100", label: "Strong positive", color: "bg-emerald-100 text-emerald-700" },
                  { range: "-10 to +39", label: "Neutral / mixed", color: "bg-amber-100 text-amber-700" },
                  { range: "-40 to -11", label: "Negative impact", color: "bg-orange-100 text-orange-700" },
                  { range: "-100 to -41", label: "Critical risk", color: "bg-red-100 text-red-700" },
                ].map((g) => (
                  <div key={g.range} className={`rounded-lg px-2 py-1.5 ${g.color}`}>
                    <p className="font-black">{g.range}</p>
                    <p className="font-medium mt-0.5">{g.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
