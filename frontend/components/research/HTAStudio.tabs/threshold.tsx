"use client";

import { useState } from "react";
import { Calculator, AlertTriangle, CheckCircle } from "lucide-react";
import { fmtUSD, fmtPct } from "../HTAStudio.data";

// TAB 4 — Threshold & Surrogate Endpoint Analysis
// ══════════════════════════════════════════════════════════════════════════════

const SURROGATE_ENDPOINTS = [
  {
    id: "hba1c",
    label: "HbA1c Reduction (%)",
    unit: "% reduction",
    qalyPerUnit: 0.04,
    clinicalFactor: 0.21,
    clinicalEvent: "reduction in diabetes complications",
    validationStrength: "Strong" as const,
    note: "UKPDS meta-analysis: each 1% HbA1c reduction → 0.04 QALY gain",
    studies: [
      "UKPDS 35 (BMJ 2000)",
      "Stratton et al. (BMJ 2000)",
      "ACCORD, ADVANCE trials",
    ],
  },
  {
    id: "ldl",
    label: "LDL Reduction (mmol/L)",
    unit: "mmol/L reduction",
    qalyPerUnit: 0.05,
    clinicalFactor: 0.22,
    clinicalEvent: "reduction in major CV events",
    validationStrength: "Strong" as const,
    note: "CTT Collaboration: each 1 mmol/L LDL reduction → 22% CV event reduction",
    studies: [
      "CTT Collaboration (Lancet 2010)",
      "FOURIER trial",
      "ODYSSEY OUTCOMES",
    ],
  },
  {
    id: "sbp",
    label: "Systolic BP Reduction (mmHg)",
    unit: "mmHg reduction",
    qalyPerUnit: 0.01,
    clinicalFactor: 0.02,
    clinicalEvent: "reduction in stroke risk per 5 mmHg",
    validationStrength: "Strong" as const,
    note: "BPLTTC: 5 mmHg SBP reduction → ~10% stroke risk reduction",
    studies: [
      "BPLTTC (Lancet 2021)",
      "SPRINT trial",
      "HOT trial meta-analysis",
    ],
  },
  {
    id: "pfs",
    label: "Progression-Free Survival (months)",
    unit: "months PFS gain",
    qalyPerUnit: 0.035,
    clinicalFactor: 0.18,
    clinicalEvent: "improvement in OS (uncertain correlation)",
    validationStrength: "Moderate" as const,
    note: "PFS-OS correlation varies by tumor type; modest overall. ~0.035 QALY/month PFS.",
    studies: [
      "Prasad & Gale (JAMA Oncol 2016)",
      "Buyse et al. surrogate analysis",
      "FDA 2021 surrogate endpoint table",
    ],
  },
  {
    id: "tumor_response",
    label: "Tumor Response Rate (%)",
    unit: "% ORR increase",
    qalyPerUnit: 0.003,
    clinicalFactor: 0.12,
    clinicalEvent: "improvement in OS (weak correlation)",
    validationStrength: "Weak" as const,
    note: "ORR-OS correlation weak in most solid tumors. 1% ORR increase ≈ 0.003 QALY.",
    studies: [
      "Kemp et al. (BMJ 2015)",
      "Haslam et al. (JAMA Oncol 2019)",
    ],
  },
  {
    id: "cd4",
    label: "CD4 Count Increase (cells/μL)",
    unit: "cells/μL gain",
    qalyPerUnit: 0.0003,
    clinicalFactor: 0.015,
    clinicalEvent: "reduction in AIDS-defining events",
    validationStrength: "Strong" as const,
    note: "HIV: CD4 increase strongly predicts clinical outcomes. Per 100 cells/μL.",
    studies: [
      "CASCADE Collaboration",
      "START trial",
      "TEMPRANO trial",
    ],
  },
  {
    id: "egfr",
    label: "eGFR Change (mL/min/1.73m²)",
    unit: "mL/min/1.73m² improvement",
    qalyPerUnit: 0.006,
    clinicalFactor: 0.08,
    clinicalEvent: "reduction in kidney failure risk",
    validationStrength: "Moderate" as const,
    note: "CKD: eGFR slope predicts ESRD. Each 1 mL/min improvement ≈ 0.006 QALY.",
    studies: [
      "CREDENCE trial",
      "DAPA-CKD trial",
      "Thompson et al. (CJASN 2019)",
    ],
  },
  {
    id: "bone_density",
    label: "Bone Density (T-score change)",
    unit: "T-score improvement",
    qalyPerUnit: 0.02,
    clinicalFactor: 0.30,
    clinicalEvent: "reduction in fracture risk",
    validationStrength: "Moderate" as const,
    note: "Osteoporosis: 1 SD T-score improvement → ~30% fracture risk reduction.",
    studies: [
      "Kanis et al. (Osteoporosis Int 2008)",
      "FRAX validation studies",
      "HORIZON trial",
    ],
  },
];

const VALIDATION_COLORS = {
  Strong: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-100 text-amber-700 border-amber-200",
  Weak: "bg-rose-100 text-rose-700 border-rose-200",
};

export function ThresholdTab() {
  // Price-effectiveness threshold
  const [drugName, setDrugName] = useState("Novel SGLT2 Inhibitor");
  const [qalyGain, setQalyGain] = useState(0.15);
  const [wtp, setWtp] = useState(100000);
  const [listPrice, setListPrice] = useState(18000);
  const [comparatorCost, setComparatorCost] = useState(3000);

  // Surrogate endpoint
  const [selectedSurrogate, setSelectedSurrogate] = useState(
    SURROGATE_ENDPOINTS[0].id
  );
  const [surrogateChange, setSurrogateChange] = useState(1.0);

  const endpoint = SURROGATE_ENDPOINTS.find((e) => e.id === selectedSurrogate)!;

  const maxCEPrice = wtp * qalyGain + comparatorCost;
  const discount =
    listPrice > 0
      ? Math.max(0, ((listPrice - maxCEPrice) / listPrice) * 100)
      : 0;
  const isCE = listPrice <= maxCEPrice;

  const estimatedQALY = surrogateChange * endpoint.qalyPerUnit;
  const clinicalBenefit = surrogateChange * endpoint.clinicalFactor;

  return (
    <div className="space-y-6">
      {/* Price-effectiveness threshold */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Price-Effectiveness Threshold Calculator
          </h3>
          <p className="text-xs text-violet-500 mt-0.5">
            Maximum price at which an intervention is cost-effective at a given
            WTP
          </p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Drug / Intervention Name
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                QALY Gain Estimate (from trials)
              </label>
              <input
                type="number"
                step={0.01}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={qalyGain}
                onChange={(e) => setQalyGain(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                WTP Threshold ($/QALY)
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={wtp}
                onChange={(e) => setWtp(Number(e.target.value))}
              >
                {[50000, 100000, 150000, 200000].map((v) => (
                  <option key={v} value={v}>
                    ${v.toLocaleString()}/QALY
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Comparator Cost (annual, $)
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={comparatorCost}
                onChange={(e) => setComparatorCost(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Manufacturer List Price (annual, $)
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={listPrice}
                onChange={(e) => setListPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results */}
          <div
            className={`rounded-xl border-2 p-5 ${isCE ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}
          >
            <div className="flex items-start gap-3 mb-4">
              {isCE ? (
                <CheckCircle
                  className="text-emerald-500 mt-0.5 shrink-0"
                  size={20}
                />
              ) : (
                <AlertTriangle
                  className="text-rose-500 mt-0.5 shrink-0"
                  size={20}
                />
              )}
              <div>
                <p
                  className={`text-base font-semibold ${isCE ? "text-emerald-800" : "text-rose-800"}`}
                >
                  {isCE
                    ? `${drugName} IS cost-effective at ${fmtUSD(wtp)}/QALY WTP`
                    : `${drugName} is NOT cost-effective at ${fmtUSD(wtp)}/QALY WTP`}
                </p>
                <p
                  className={`text-sm mt-1 ${isCE ? "text-emerald-700" : "text-rose-700"}`}
                >
                  At {fmtUSD(wtp)}/QALY WTP with {qalyGain} QALYs gained, this
                  intervention is cost-effective if priced below{" "}
                  <strong>{fmtUSD(maxCEPrice)}</strong> per year.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">CE Price Ceiling</p>
                <p className="text-xl font-bold text-violet-700">
                  {fmtUSD(maxCEPrice)}/yr
                </p>
                <p className="text-xs text-slate-400">
                  = {fmtUSD(wtp)} × {qalyGain} QALYs + {fmtUSD(comparatorCost)}{" "}
                  SoC cost
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">
                  Manufacturer List Price
                </p>
                <p className="text-xl font-bold text-slate-700">
                  {fmtUSD(listPrice)}/yr
                </p>
                <p className="text-xs text-slate-400">
                  {isCE
                    ? `${fmtUSD(maxCEPrice - listPrice)} below CE ceiling`
                    : `${fmtUSD(listPrice - maxCEPrice)} above CE ceiling`}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">
                  Required Discount
                </p>
                <p
                  className={`text-xl font-bold ${isCE ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {isCE ? "None required" : `${discount.toFixed(1)}%`}
                </p>
                <p className="text-xs text-slate-400">
                  {isCE
                    ? "Priced below CE threshold"
                    : `To reach CE ceiling of ${fmtUSD(maxCEPrice)}`}
                </p>
              </div>
            </div>
          </div>

          {/* Multi-WTP summary table */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Summary across WTP thresholds
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    WTP Threshold
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    CE Price Ceiling
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    Required Discount
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    CE?
                  </th>
                </tr>
              </thead>
              <tbody>
                {[50000, 100000, 150000, 200000].map((w) => {
                  const ceiling = w * qalyGain + comparatorCost;
                  const disc = Math.max(
                    0,
                    ((listPrice - ceiling) / listPrice) * 100
                  );
                  const ce = listPrice <= ceiling;
                  return (
                    <tr
                      key={w}
                      className="border-b border-slate-50 hover:bg-violet-50/30"
                    >
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {fmtUSD(w)}/QALY
                      </td>
                      <td className="px-3 py-2 text-violet-700 font-semibold">
                        {fmtUSD(ceiling)}
                      </td>
                      <td className="px-3 py-2">
                        {ce ? (
                          <span className="text-emerald-600 text-xs">
                            None
                          </span>
                        ) : (
                          <span className="text-rose-600 font-medium">
                            {disc.toFixed(1)}%
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {ce ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                            <CheckCircle size={12} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-semibold">
                            <AlertTriangle size={12} /> No
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Surrogate endpoint translation */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Surrogate-to-Clinical Endpoint Translation
          </h3>
          <p className="text-xs text-violet-500 mt-0.5">
            Translation factors from landmark meta-analyses and regulatory
            guidance
          </p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Surrogate Endpoint
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={selectedSurrogate}
                onChange={(e) => setSelectedSurrogate(e.target.value)}
              >
                {SURROGATE_ENDPOINTS.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Observed Change from Trial ({endpoint.unit})
              </label>
              <input
                type="number"
                step={0.1}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={surrogateChange}
                onChange={(e) => setSurrogateChange(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Endpoint card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  {endpoint.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{endpoint.note}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${VALIDATION_COLORS[endpoint.validationStrength]}`}
              >
                {endpoint.validationStrength} Validation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">Surrogate Change</p>
                <p className="text-xl font-bold text-violet-700">
                  {surrogateChange} {endpoint.unit.split(" ")[0]}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">
                  Estimated QALY Gain
                </p>
                <p className="text-xl font-bold text-emerald-700">
                  {estimatedQALY.toFixed(3)} QALYs
                </p>
                <p className="text-xs text-slate-400">
                  × {endpoint.qalyPerUnit} QALY/{endpoint.unit.split(" ")[0]}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">Clinical Benefit</p>
                <p className="text-xl font-bold text-blue-700">
                  {fmtPct(clinicalBenefit * 100)}
                </p>
                <p className="text-xs text-slate-400">
                  {endpoint.clinicalEvent}
                </p>
              </div>
            </div>

            {/* Uncertainty flag */}
            <div
              className={`rounded-lg px-3 py-2 border text-xs ${VALIDATION_COLORS[endpoint.validationStrength]}`}
            >
              <strong>Surrogate Validity Grade: {endpoint.validationStrength}</strong>
              {endpoint.validationStrength === "Strong" &&
                " — Well-validated surrogate with consistent clinical endpoint correlation across multiple RCTs."}
              {endpoint.validationStrength === "Moderate" &&
                " — Moderate evidence of surrogate validity; correlation with clinical endpoints demonstrated but with important uncertainty."}
              {endpoint.validationStrength === "Weak" &&
                " — Weak surrogate validation. Clinical endpoint effect may not follow surrogate change. Use with caution in HTA submissions."}
            </div>

            {/* Published studies */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-600 mb-1">
                Supporting Evidence:
              </p>
              <ul className="space-y-0.5">
                {endpoint.studies.map((study) => (
                  <li key={study} className="text-xs text-slate-500 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                    {study}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All surrogates reference table */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Reference — All Surrogate Translation Factors
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Surrogate
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      QALY/unit
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Clinical Impact
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Validation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SURROGATE_ENDPOINTS.map((ep) => (
                    <tr
                      key={ep.id}
                      className={`border-b border-slate-50 hover:bg-violet-50/30 cursor-pointer ${selectedSurrogate === ep.id ? "bg-violet-50" : ""}`}
                      onClick={() => setSelectedSurrogate(ep.id)}
                    >
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {ep.label}
                      </td>
                      <td className="px-3 py-2 text-violet-700 font-semibold">
                        {ep.qalyPerUnit}
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {fmtPct(ep.clinicalFactor * 100)} {ep.clinicalEvent}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-1.5 py-0.5 rounded border font-semibold ${VALIDATION_COLORS[ep.validationStrength]}`}
                        >
                          {ep.validationStrength}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
