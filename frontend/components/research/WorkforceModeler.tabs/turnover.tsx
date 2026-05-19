"use client";

import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { fmt, fmtDollars } from "../WorkforceModeler.data";
import { Slider, SectionCard, MetricBox } from "../WorkforceModeler.atoms";

// TAB 3 DATA – TURNOVER ROI
// ─────────────────────────────────────────────────────────────────────────────

interface RoleDefaults {
  salary: number;
  turnoverRate: number;
  recruitCost: number;
  onboardCost: number;
  vacancyDays: number;
  agencyFillPremium: number;
  benchmark: string;
}

const ROLE_DEFAULTS: Record<string, RoleDefaults> = {
  RN: {
    salary: 85000,
    turnoverRate: 22,
    recruitCost: 5000,
    onboardCost: 10000,
    vacancyDays: 75,
    agencyFillPremium: 120,
    benchmark: "~22% national avg",
  },
  Physician: {
    salary: 300000,
    turnoverRate: 6,
    recruitCost: 40000,
    onboardCost: 30000,
    vacancyDays: 120,
    agencyFillPremium: 180,
    benchmark: "~6% national avg",
  },
  "Advanced Practice Provider": {
    salary: 130000,
    turnoverRate: 14,
    recruitCost: 15000,
    onboardCost: 12000,
    vacancyDays: 90,
    agencyFillPremium: 150,
    benchmark: "~14% national avg",
  },
  Technician: {
    salary: 55000,
    turnoverRate: 28,
    recruitCost: 3000,
    onboardCost: 5000,
    vacancyDays: 45,
    agencyFillPremium: 80,
    benchmark: "~28% national avg",
  },
  "Clinical Support": {
    salary: 42000,
    turnoverRate: 32,
    recruitCost: 2500,
    onboardCost: 4000,
    vacancyDays: 30,
    agencyFillPremium: 60,
    benchmark: "~32% national avg",
  },
};

const RETENTION_PROGRAMS: Record<
  string,
  { costPerEmployee: number; turnoverReduction: number }
> = {
  "Loan Repayment": { costPerEmployee: 10000, turnoverReduction: 8 },
  "Sign-on Bonus": { costPerEmployee: 8000, turnoverReduction: 5 },
  "Flexible Scheduling": { costPerEmployee: 1200, turnoverReduction: 12 },
  "Childcare Subsidy": { costPerEmployee: 3600, turnoverReduction: 9 },
  "Mental Health EAP Expansion": { costPerEmployee: 800, turnoverReduction: 6 },
  "Advancement Pathways": { costPerEmployee: 2500, turnoverReduction: 14 },
  "Wage Increase (5%)": { costPerEmployee: 4250, turnoverReduction: 18 },
};

// TAB 3 – WORKFORCE TURNOVER & ROI CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

export function TurnoverROITab() {
  const [role, setRole] = useState("RN");
  const [orgSize, setOrgSize] = useState(500);
  const [roleParams, setRoleParams] = useState(ROLE_DEFAULTS["RN"]);
  const [retentionProgram, setRetentionProgram] = useState("Flexible Scheduling");
  const [programCoverage, setProgramCoverage] = useState(100); // % of workforce covered

  const handleRoleChange = (r: string) => {
    setRole(r);
    setRoleParams(ROLE_DEFAULTS[r]);
  };

  const turnoverResults = useMemo(() => {
    const totalComp =
      roleParams.salary * (1 + roleParams.turnoverRate / 100 / 100); // rough, just use salary
    const benefitsCost = roleParams.salary * 0.3;

    // Daily rate for vacancy calculation
    const dailyRate = roleParams.salary / 260;
    const vacancyLoss = dailyRate * roleParams.vacancyDays * 0.4; // 40% productivity gap
    const agencyFillCost =
      ((roleParams.salary / 260) * (1 + roleParams.agencyFillPremium / 100)) *
      roleParams.vacancyDays;
    const qualityImpact = roleParams.salary * 0.05; // 5% salary equivalent in quality losses

    const costPerTurnover =
      roleParams.recruitCost +
      roleParams.onboardCost +
      vacancyLoss +
      agencyFillCost +
      qualityImpact;

    const annualTurnovers = Math.round(
      orgSize * (roleParams.turnoverRate / 100)
    );
    const totalAnnualCost = annualTurnovers * costPerTurnover;

    return {
      benefitsCost,
      vacancyLoss,
      agencyFillCost,
      qualityImpact,
      costPerTurnover,
      annualTurnovers,
      totalAnnualCost,
    };
  }, [orgSize, roleParams]);

  const roiResults = useMemo(() => {
    const prog = RETENTION_PROGRAMS[retentionProgram];
    const coveredEmployees = Math.round(orgSize * (programCoverage / 100));
    const programCost = coveredEmployees * prog.costPerEmployee;

    const newTurnoverRate =
      roleParams.turnoverRate * (1 - prog.turnoverReduction / 100);
    const turnoversAvoided =
      orgSize * ((roleParams.turnoverRate - newTurnoverRate) / 100);
    const savingsFromPrevention =
      turnoversAvoided * turnoverResults.costPerTurnover;

    const netROI = savingsFromPrevention - programCost;
    const roiPct = programCost > 0 ? (netROI / programCost) * 100 : 0;
    const breakEvenMonths =
      savingsFromPrevention > 0
        ? (programCost / (savingsFromPrevention / 12))
        : 0;

    return {
      programCost,
      turnoversAvoided,
      savingsFromPrevention,
      netROI,
      roiPct,
      breakEvenMonths,
      newTurnoverRate,
      coveredEmployees,
    };
  }, [retentionProgram, programCoverage, orgSize, roleParams, turnoverResults]);

  return (
    <div className="space-y-5">
      {/* Role + Org Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Role Configuration">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">
                Role Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(ROLE_DEFAULTS).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                      role === r
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-slate-600 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Benchmark: {ROLE_DEFAULTS[role].benchmark}
              </p>
            </div>
            <Slider
              label="Organization Workforce Size"
              value={orgSize}
              min={50}
              max={5000}
              step={50}
              unit=" FTE"
              onChange={setOrgSize}
            />
            <Slider
              label="Annual Base Salary"
              value={roleParams.salary}
              min={30000}
              max={500000}
              step={1000}
              unit="$"
              onChange={(v) => setRoleParams((p) => ({ ...p, salary: v }))}
            />
            <Slider
              label="Annual Turnover Rate"
              value={roleParams.turnoverRate}
              min={1}
              max={50}
              step={0.5}
              unit="%"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, turnoverRate: v }))
              }
            />
          </div>
        </SectionCard>

        <SectionCard title="Turnover Cost Factors">
          <div className="space-y-3">
            <Slider
              label="Recruitment / Search Cost"
              value={roleParams.recruitCost}
              min={0}
              max={100000}
              step={500}
              unit="$"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, recruitCost: v }))
              }
            />
            <Slider
              label="Onboarding & Training Cost"
              value={roleParams.onboardCost}
              min={0}
              max={75000}
              step={500}
              unit="$"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, onboardCost: v }))
              }
            />
            <Slider
              label="Vacancy Duration"
              value={roleParams.vacancyDays}
              min={15}
              max={180}
              step={5}
              unit=" days"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, vacancyDays: v }))
              }
            />
            <Slider
              label="Agency / Locum Fill Premium"
              value={roleParams.agencyFillPremium}
              min={0}
              max={250}
              step={5}
              unit="% over base"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, agencyFillPremium: v }))
              }
            />
          </div>
        </SectionCard>
      </div>

      {/* Turnover Cost Breakdown */}
      <SectionCard title="Cost Per Turnover Event — Breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Recruitment", value: roleParams.recruitCost },
            { label: "Onboarding", value: roleParams.onboardCost },
            { label: "Productivity Loss", value: turnoverResults.vacancyLoss },
            { label: "Agency Fill", value: turnoverResults.agencyFillCost },
            { label: "Quality Impact", value: turnoverResults.qualityImpact },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100"
            >
              <p className="text-xs text-orange-600 font-medium">{item.label}</p>
              <p className="text-base font-bold text-orange-800">
                {fmtDollars(item.value)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricBox
          label="Cost Per Turnover"
          value={fmtDollars(turnoverResults.costPerTurnover)}
          sub="Total cost per separation"
          color="red"
          large
        />
        <MetricBox
          label="Annual Turnovers"
          value={fmt(turnoverResults.annualTurnovers)}
          sub={`At ${roleParams.turnoverRate}% rate`}
          color="amber"
          large
        />
        <MetricBox
          label="Total Annual Turnover Cost"
          value={fmtDollars(turnoverResults.totalAnnualCost)}
          sub="Organization-wide burden"
          color="red"
          large
        />
        <MetricBox
          label="Per-FTE Turnover Burden"
          value={fmtDollars(turnoverResults.totalAnnualCost / orgSize)}
          sub="Cost spread across all staff"
          color="amber"
          large
        />
      </div>

      {/* Retention Program ROI */}
      <SectionCard title="Retention Program ROI Analysis" accent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">
              Retention Intervention
            </label>
            <select
              value={retentionProgram}
              onChange={(e) => setRetentionProgram(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {Object.keys(RETENTION_PROGRAMS).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <div className="mt-2 bg-white rounded-lg border border-orange-200 p-2 text-xs text-slate-600">
              <p>
                <span className="font-semibold">Est. cost/employee/yr:</span>{" "}
                {fmtDollars(RETENTION_PROGRAMS[retentionProgram].costPerEmployee)}
              </p>
              <p>
                <span className="font-semibold">Est. turnover reduction:</span>{" "}
                {RETENTION_PROGRAMS[retentionProgram].turnoverReduction}%
              </p>
            </div>
          </div>
          <div>
            <Slider
              label="Program Coverage (% of workforce)"
              value={programCoverage}
              min={10}
              max={100}
              step={5}
              unit="%"
              onChange={setProgramCoverage}
            />
            <p className="text-xs text-slate-500 mt-1">
              Covering {fmt(roiResults.coveredEmployees)} of {fmt(orgSize)} FTE
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricBox
            label="Program Cost"
            value={fmtDollars(roiResults.programCost)}
            sub="Annual investment"
            color="amber"
            large
          />
          <MetricBox
            label="Turnovers Prevented"
            value={fmt(roiResults.turnoversAvoided, 1)}
            sub={`Rate: ${roiResults.newTurnoverRate.toFixed(1)}% → ${roleParams.turnoverRate.toFixed(1)}%`}
            color="green"
            large
          />
          <MetricBox
            label="Savings Generated"
            value={fmtDollars(roiResults.savingsFromPrevention)}
            sub="Turnover cost avoided"
            color="green"
            large
          />
          <MetricBox
            label="Net ROI"
            value={fmtDollars(roiResults.netROI)}
            sub={`${roiResults.roiPct.toFixed(0)}% return on investment`}
            color={roiResults.netROI >= 0 ? "green" : "red"}
            large
          />
        </div>

        <div className="mt-3 flex items-center gap-2 bg-white rounded-lg border border-orange-200 px-4 py-3">
          <RefreshCw size={16} className="text-orange-500" />
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-orange-700">Break-even:</span>{" "}
            {roiResults.breakEvenMonths > 0
              ? `${roiResults.breakEvenMonths.toFixed(1)} months`
              : "Program self-funding immediately"}
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
