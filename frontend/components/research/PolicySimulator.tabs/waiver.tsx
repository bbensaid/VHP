"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Building2,
  DollarSign,
  Heart,
  TrendingDown,
  Users,
} from "lucide-react";
import { STATE_DATA, WAIVER_TYPES, fmtM, fmtPct } from "../PolicySimulator.data";
import {
  SectionTitle,
  StatCard,
  SliderRow,
  SelectRow,
  ToggleRow,
  ResultBar,
} from "../PolicySimulator.atoms";

export function WaiverTab() {
  const [waiverType, setWaiverType] = useState("global_commitment");
  const [selectedState, setSelectedState] = useState("Vermont");
  const [expansionPct, setExpansionPct] = useState(10);
  const [mcPenetration, setMcPenetration] = useState(60);
  const [sdohSetAside, setSdohSetAside] = useState(2);
  const [communityReq, setCommunityReq] = useState("none");
  const [workReq, setWorkReq] = useState(false);
  const [premiums, setPremiums] = useState(0);
  const [benefitLimit, setBenefitLimit] = useState("none");

  const stateData = STATE_DATA[selectedState];
  const waiverInfo = WAIVER_TYPES.find((w) => w.id === waiverType)!;

  const results = useMemo(() => {
    const baseEnrollees = stateData.enrollees;
    const perCapita = stateData.perCapitaSpending;
    const fmapRate = stateData.fmap / 100;
    const uninsuredPop =
      (stateData.uninsuredRate / 100) * stateData.population;

    // Enrollment changes
    const expansionGain = Math.round(uninsuredPop * (expansionPct / 100));

    // Losses from requirements
    let requirementLoss = 0;
    if (workReq) requirementLoss += baseEnrollees * 0.08;
    if (communityReq === "20h") requirementLoss += baseEnrollees * 0.04;
    if (communityReq === "80h") requirementLoss += baseEnrollees * 0.06;
    if (premiums >= 20) requirementLoss += baseEnrollees * 0.02;
    if (premiums >= 50) requirementLoss += baseEnrollees * 0.03;
    if (premiums >= 80) requirementLoss += baseEnrollees * 0.04;

    const netEnrollmentChange = expansionGain - requirementLoss;
    const newTotalEnrollees = baseEnrollees + netEnrollmentChange;

    // 5-year spending
    const baseSpend = baseEnrollees * perCapita;
    const newSpend = newTotalEnrollees * perCapita * 1.02; // slight per-capita increase for newly eligible
    const totalSpendChange5yr = (newSpend - baseSpend) * 5;

    const federalShare = totalSpendChange5yr * 0.9; // expansion at 90% FMAP
    const stateShare = totalSpendChange5yr * 0.1;

    // SDOH savings (reduces hospitalizations)
    const sdohSavings =
      newSpend * (sdohSetAside / 100) * 0.3 * 5; // 30 cents on dollar returned

    // MC efficiency savings
    const mcSavings = newSpend * ((mcPenetration / 100) * 0.05) * 5; // 5% efficiency at 100% MC

    // Uncompensated care reduction
    const ucReduction = expansionGain * 2800; // avg uncompensated care per newly-insured

    // Hospital financial impact
    const hospitalGain = expansionGain * perCapita * 0.6 * 0.85; // 60% hospital share, 85 Medicaid-to-cost ratio
    const hospitalLoss = requirementLoss * perCapita * 0.6;

    // ER visits change (reduction from better primary care)
    const erReduction = Math.round(expansionGain * 0.18); // 0.18 ER visits/person/year reduction
    const prevHospReduction = Math.round(expansionGain * 0.055);

    // Approval likelihood
    let approvalScore = waiverInfo.approvalBase;
    if (workReq) approvalScore -= 0.25;
    if (communityReq === "80h") approvalScore -= 0.1;
    if (sdohSetAside >= 2) approvalScore += 0.05;
    if (mcPenetration >= 70) approvalScore += 0.04;
    if (premiums >= 50) approvalScore -= 0.08;
    approvalScore = Math.max(0.05, Math.min(0.98, approvalScore));

    return {
      expansionGain: Math.round(expansionGain),
      requirementLoss: Math.round(requirementLoss),
      netEnrollmentChange: Math.round(netEnrollmentChange),
      newTotalEnrollees: Math.round(newTotalEnrollees),
      totalSpendChange5yr,
      federalShare,
      stateShare,
      sdohSavings,
      mcSavings,
      ucReduction,
      hospitalGain,
      hospitalLoss,
      erReduction,
      prevHospReduction,
      approvalScore,
      baseSpend,
    };
    // `waiverInfo` is derived from `waiverType` via WAIVER_TYPES.find. Depending
    // on `waiverType` covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stateData,
    waiverType,
    expansionPct,
    mcPenetration,
    sdohSetAside,
    communityReq,
    workReq,
    premiums,
    benefitLimit,
  ]);

  const approvalColor =
    results.approvalScore >= 0.65
      ? "green"
      : results.approvalScore >= 0.4
        ? "amber"
        : "red";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT PANEL */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Waiver Configuration</SectionTitle>
          <SelectRow
            label="Waiver Type"
            value={waiverType}
            options={WAIVER_TYPES.map((w) => ({ value: w.id, label: w.label }))}
            onChange={setWaiverType}
          />
          <SelectRow
            label="State"
            value={selectedState}
            options={Object.keys(STATE_DATA).map((s) => ({
              value: s,
              label: s,
            }))}
            onChange={setSelectedState}
          />

          <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 mb-4 text-xs text-sky-800 space-y-1">
            <div className="flex justify-between">
              <span>Medicaid Enrollees</span>
              <span className="font-bold">
                {stateData.enrollees.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Per-Capita Spending</span>
              <span className="font-bold">
                ${stateData.perCapitaSpending.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FMAP Rate</span>
              <span className="font-bold">{stateData.fmap}%</span>
            </div>
            <div className="flex justify-between">
              <span>Medicaid % of State Budget</span>
              <span className="font-bold">{stateData.budgetPct}%</span>
            </div>
            <div className="flex justify-between">
              <span>Uninsured Rate</span>
              <span className="font-bold">{stateData.uninsuredRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Waiver Design Parameters</SectionTitle>
          <SliderRow
            label="Coverage Expansion"
            value={expansionPct}
            min={0}
            max={25}
            step={1}
            onChange={setExpansionPct}
            format={(v) => `+${v}% uninsured`}
            tooltip="% of currently uninsured population newly covered"
          />
          <SliderRow
            label="Managed Care Penetration"
            value={mcPenetration}
            min={0}
            max={100}
            step={5}
            onChange={setMcPenetration}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="SDOH Investment Set-Aside"
            value={sdohSetAside}
            min={0}
            max={5}
            step={0.5}
            onChange={setSdohSetAside}
            format={(v) => `${v}%`}
            tooltip="% of total spending directed to social determinants"
          />
          <SliderRow
            label="Premiums (above 138% FPL)"
            value={premiums}
            min={0}
            max={100}
            step={5}
            onChange={setPremiums}
            format={(v) => `$${v}/mo`}
          />

          <SelectRow
            label="Community Engagement Requirement"
            value={communityReq}
            options={[
              { value: "none", label: "None" },
              { value: "20h", label: "20 hrs/week" },
              { value: "80h", label: "80 hrs/month" },
            ]}
            onChange={setCommunityReq}
          />
          <SelectRow
            label="Benefit Limitations"
            value={benefitLimit}
            options={[
              { value: "none", label: "None" },
              { value: "dental", label: "Dental Carve-Out" },
              { value: "vision", label: "Vision Carve-Out" },
              { value: "transport", label: "Non-Emergency Transport" },
            ]}
            onChange={setBenefitLimit}
          />
          <ToggleRow
            label="Work Requirement"
            value={workReq}
            onChange={setWorkReq}
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-2 space-y-5">
        {/* Approval Likelihood Banner */}
        <div
          className={`rounded-xl border p-5 ${approvalColor === "green" ? "bg-emerald-50 border-emerald-200" : approvalColor === "amber" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-1">
                CMS Approval Likelihood
              </p>
              <p
                className={`text-3xl font-bold ${approvalColor === "green" ? "text-emerald-700" : approvalColor === "amber" ? "text-amber-700" : "text-red-700"}`}
              >
                {fmtPct(results.approvalScore * 100)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Based on {waiverInfo.label} — CMS Alignment:{" "}
                <span className="font-semibold">{waiverInfo.cmsAlignment}</span>
                {workReq && (
                  <span className="ml-2 text-red-600">
                    ⚠ Work requirements reduce likelihood
                  </span>
                )}
              </p>
            </div>
            <div
              className={`text-6xl font-black opacity-20 ${approvalColor === "green" ? "text-emerald-700" : approvalColor === "amber" ? "text-amber-700" : "text-red-700"}`}
            >
              {approvalColor === "green"
                ? "✓"
                : approvalColor === "amber"
                  ? "~"
                  : "✗"}
            </div>
          </div>
          <div className="mt-3 w-full bg-white/60 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${approvalColor === "green" ? "bg-emerald-500" : approvalColor === "amber" ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${results.approvalScore * 100}%` }}
            />
          </div>
        </div>

        {/* 5-Year Enrollment Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>5-Year Enrollment Impact</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label="New Enrollees (Expansion)"
              value={`+${results.expansionGain.toLocaleString()}`}
              color="green"
              icon={<Users size={20} />}
            />
            <StatCard
              label="Lost Enrollees (Requirements)"
              value={`-${results.requirementLoss.toLocaleString()}`}
              color={results.requirementLoss > 0 ? "red" : "slate"}
              icon={<TrendingDown size={20} />}
            />
            <StatCard
              label="Net Enrollment Change"
              value={`${results.netEnrollmentChange >= 0 ? "+" : ""}${results.netEnrollmentChange.toLocaleString()}`}
              color={results.netEnrollmentChange >= 0 ? "sky" : "red"}
              icon={<Activity size={20} />}
            />
            <StatCard
              label="Total Enrollees (Yr 5)"
              value={results.newTotalEnrollees.toLocaleString()}
              color="slate"
              icon={<Users size={20} />}
            />
          </div>
        </div>

        {/* Financial Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>5-Year Financial Impact</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="grid grid-cols-1 gap-3">
                <StatCard
                  label="Total Spending Change"
                  value={fmtM(results.totalSpendChange5yr)}
                  sub="5-year cumulative"
                  color={results.totalSpendChange5yr > 0 ? "amber" : "green"}
                  icon={<DollarSign size={20} />}
                />
                <StatCard
                  label="Federal Share (90% FMAP expansion)"
                  value={fmtM(results.federalShare)}
                  color="sky"
                  icon={<Building2 size={20} />}
                />
                <StatCard
                  label="State Net Cost"
                  value={fmtM(results.stateShare)}
                  sub="Before offsets"
                  color="indigo"
                  icon={<DollarSign size={20} />}
                />
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Savings & Offsets
                  </p>
                  <ResultBar
                    label="SDOH Investment Return"
                    value={results.sdohSavings}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="green"
                  />
                  <ResultBar
                    label="Managed Care Efficiency"
                    value={results.mcSavings}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="sky"
                  />
                  <ResultBar
                    label="Uncompensated Care Reduction"
                    value={results.ucReduction}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="indigo"
                  />
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Hospital Financial Impact (Yr 5)
                  </p>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-700">Revenue Gain</span>
                    <span className="font-bold text-emerald-700">
                      {fmtM(results.hospitalGain)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600">Revenue Loss (disenroll)</span>
                    <span className="font-bold text-red-600">
                      -{fmtM(results.hospitalLoss)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between text-sm font-bold">
                    <span>Net Hospital Impact</span>
                    <span
                      className={
                        results.hospitalGain - results.hospitalLoss >= 0
                          ? "text-emerald-700"
                          : "text-red-600"
                      }
                    >
                      {fmtM(results.hospitalGain - results.hospitalLoss)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Population Health Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Population Health Metrics (5-Year)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="ER Visit Reduction"
              value={`-${results.erReduction.toLocaleString()}`}
              sub="visits avoided/year"
              color="green"
              icon={<Activity size={20} />}
            />
            <StatCard
              label="Preventable Hospitalizations"
              value={`-${results.prevHospReduction.toLocaleString()}`}
              sub="avoided/year"
              color="green"
              icon={<Heart size={20} />}
            />
            <StatCard
              label="Estimated Lives Saved"
              value={`~${Math.round(results.netEnrollmentChange > 0 ? results.netEnrollmentChange / 455 : 0)}`}
              sub="~1 per 455 newly insured"
              color="sky"
              icon={<Heart size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
