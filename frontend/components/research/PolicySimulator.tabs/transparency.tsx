"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Heart,
  Scale,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
  XCircle,
} from "lucide-react";
import { PROCEDURES, NSA_SPECIALTIES, fmtM, fmtPct } from "../PolicySimulator.data";
import { StatCard, SliderRow, SelectRow } from "../PolicySimulator.atoms";


const PT_REQUIREMENTS = [
  {
    id: "mrf",
    label: "Machine-Readable File (MRF) posted publicly",
    weight: 25,
  },
  {
    id: "consumer",
    label: "Consumer-facing price estimator tool",
    weight: 20,
  },
  {
    id: "300services",
    label: "300 shoppable services with negotiated rates",
    weight: 20,
  },
  {
    id: "cms_format",
    label: "CMS-required file format and naming convention",
    weight: 10,
  },
  {
    id: "update",
    label: "Files updated at least annually (monthly for MRF)",
    weight: 10,
  },
  {
    id: "payer_names",
    label: "All payer and plan names clearly identified",
    weight: 8,
  },
  {
    id: "historical",
    label: "Historical allowed amounts included",
    weight: 7,
  },
];

export function TransparencyTab() {
  const [hospitalName, setHospitalName] = useState("");
  const [ptChecked, setPtChecked] = useState<Record<string, boolean>>({});

  // Site-neutral
  const [selectedProc, setSelectedProc] = useState("echo");
  const [volume, setVolume] = useState(500);
  const [currentSetting, setCurrentSetting] = useState<
    "hopd" | "asc" | "office"
  >("hopd");

  // NSA
  const [nsaSpecialty, setNsaSpecialty] = useState("Emergency Medicine");
  const [nsaVolume, setNsaVolume] = useState(2000);
  const [nsaAvgCharge, setNsaAvgCharge] = useState(8500);
  const [qpaPct, setQpaPct] = useState(40);

  const procData = PROCEDURES.find((p) => p.id === selectedProc)!;

  const ptScore = useMemo(() => {
    let score = 0;
    PT_REQUIREMENTS.forEach((r) => {
      if (ptChecked[r.id]) score += r.weight;
    });
    return score;
  }, [ptChecked]);

  const ptGrade =
    ptScore >= 85
      ? { label: "Compliant", color: "green" }
      : ptScore >= 60
        ? { label: "Partial", color: "amber" }
        : { label: "Non-Compliant", color: "red" };

  const siteNeutral = useMemo(() => {
    const rateMap = {
      hopd: procData.hopdRate,
      asc: procData.ascRate,
      office: procData.officeRate,
    };
    const currentRate = rateMap[currentSetting];
    const neutralRate = procData.officeRate; // site-neutral = lowest rate
    const commercialMultiplier = 1.5;

    const currentMedicareRevenue = currentRate * volume;
    const neutralMedicareRevenue = neutralRate * volume;
    const revenueReduction = currentMedicareRevenue - neutralMedicareRevenue;

    const currentCommercialRevenue = currentRate * commercialMultiplier * volume;
    const neutralCommercialRevenue =
      neutralRate * commercialMultiplier * volume;
    const commercialReduction =
      currentCommercialRevenue - neutralCommercialRevenue;

    return {
      currentRate,
      neutralRate,
      currentMedicareRevenue,
      neutralMedicareRevenue,
      revenueReduction,
      currentCommercialRevenue,
      neutralCommercialRevenue,
      commercialReduction,
      totalReduction: revenueReduction + commercialReduction,
    };
  }, [procData, volume, currentSetting]);

  const nsa = useMemo(() => {
    const qpa = nsaAvgCharge * (qpaPct / 100);
    const revenueBefore = nsaVolume * nsaAvgCharge;
    const revenueAfter = nsaVolume * qpa;
    const revenueReduction = revenueBefore - revenueAfter;
    const patientSavings = revenueReduction * 0.35; // patient portion vs prior billing
    return { qpa, revenueBefore, revenueAfter, revenueReduction, patientSavings };
  }, [nsaVolume, nsaAvgCharge, qpaPct]);

  return (
    <div className="space-y-6">
      {/* SECTION 1: Price Transparency Compliance */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Price Transparency Compliance Checker
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block ty-body text-slate-600 mb-1">
                Hospital / Health System Name
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g., University of Vermont Medical Center"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2">
              {PT_REQUIREMENTS.map((req) => (
                <label
                  key={req.id}
                  className="flex items-start gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={!!ptChecked[req.id]}
                    onChange={(e) =>
                      setPtChecked((prev) => ({
                        ...prev,
                        [req.id]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 accent-sky-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-slate-700 group-hover:text-sky-700">
                      {req.label}
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      ({req.weight} pts)
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {ptChecked[req.id] ? (
                      <CheckCircle size={15} className="text-emerald-500" />
                    ) : (
                      <XCircle size={15} className="text-red-300" />
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div
              className={`rounded-xl border p-5 text-center mb-4 ${ptGrade.color === "green" ? "bg-emerald-50 border-emerald-200" : ptGrade.color === "amber" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}
            >
              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                {hospitalName || "Hospital"} Compliance Score
              </p>
              <p
                className={`text-5xl font-black mb-1 ${ptGrade.color === "green" ? "text-emerald-600" : ptGrade.color === "amber" ? "text-amber-600" : "text-red-600"}`}
              >
                {ptScore}
              </p>
              <p
                className={`text-sm font-bold ${ptGrade.color === "green" ? "text-emerald-600" : ptGrade.color === "amber" ? "text-amber-600" : "text-red-600"}`}
              >
                {ptGrade.label}
              </p>
              <div className="mt-3 w-full bg-white/60 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${ptGrade.color === "green" ? "bg-emerald-500" : ptGrade.color === "amber" ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${ptScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Gap Analysis
              </p>
              {PT_REQUIREMENTS.filter((r) => !ptChecked[r.id]).length === 0 ? (
                <p className="text-sm text-emerald-600 font-semibold">
                  All requirements met. Full compliance achieved.
                </p>
              ) : (
                <ul className="space-y-1">
                  {PT_REQUIREMENTS.filter((r) => !ptChecked[r.id]).map((r) => (
                    <li
                      key={r.id}
                      className="flex items-start gap-1.5 text-xs text-slate-600"
                    >
                      <ArrowRight
                        size={12}
                        className="text-red-400 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        {r.label}{" "}
                        <span className="text-red-500 font-semibold">
                          (-{r.weight} pts)
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 text-xs text-slate-400">
                CMS penalty: up to $300/day for non-compliance ($109,500/year)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Site-Neutral Payment Impact */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Site-Neutral Payment Impact Analyzer
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SelectRow
              label="Procedure"
              value={selectedProc}
              options={PROCEDURES.map((p) => ({
                value: p.id,
                label: p.label,
              }))}
              onChange={setSelectedProc}
            />
            <SliderRow
              label="Annual Procedure Volume"
              value={volume}
              min={50}
              max={10000}
              step={50}
              onChange={setVolume}
              format={(v) => v.toLocaleString()}
            />
            <div className="mb-4">
              <label className="block ty-body text-slate-600 mb-2">
                Current Setting
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "hopd", label: "HOPD" },
                    { id: "asc", label: "ASC" },
                    { id: "office", label: "Office" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSetting(s.id)}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${currentSetting === s.id ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-200 hover:border-sky-400"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rate table */}
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Medicare Rates — {procData.label}
              </p>
              {[
                {
                  label: "Hospital Outpatient (HOPD)",
                  rate: procData.hopdRate,
                  key: "hopd",
                },
                { label: "Ambulatory Surgery Center", rate: procData.ascRate, key: "asc" },
                {
                  label: "Physician Office",
                  rate: procData.officeRate,
                  key: "office",
                },
              ].map((row) => (
                <div
                  key={row.key}
                  className={`flex justify-between items-center py-1.5 border-b border-slate-200 last:border-0 text-sm ${currentSetting === row.key ? "font-bold text-sky-700" : "text-slate-600"}`}
                >
                  <span>{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span>${row.rate.toLocaleString()}</span>
                    {row.key === "office" && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                        Site-Neutral
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Current Medicare Revenue"
                value={fmtM(siteNeutral.currentMedicareRevenue)}
                color="sky"
              />
              <StatCard
                label="Under Site-Neutral"
                value={fmtM(siteNeutral.neutralMedicareRevenue)}
                color="slate"
              />
              <StatCard
                label="Medicare Revenue Reduction"
                value={fmtM(siteNeutral.revenueReduction)}
                color={siteNeutral.revenueReduction > 0 ? "red" : "green"}
                icon={<TrendingDown size={18} />}
              />
              <StatCard
                label="Commercial Impact (150% Medicare)"
                value={fmtM(siteNeutral.commercialReduction)}
                color={siteNeutral.commercialReduction > 0 ? "amber" : "green"}
                icon={<DollarSign size={18} />}
              />
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-xs text-sky-800">
              <span className="font-bold block mb-1">Total Revenue Impact:</span>
              <span className="text-2xl font-black text-sky-700">
                -{fmtM(siteNeutral.totalReduction)}
              </span>
              <span className="block mt-0.5 text-sky-600 text-xs">
                (Medicare + Commercial combined annual impact)
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-2">
                Advocacy Analysis
              </p>
              <p className="mb-2">
                <span className="font-semibold text-red-600">
                  Hospital position:
                </span>{" "}
                HOPD rates reflect higher overhead, regulatory burden (EMTALA,
                24/7 care), and standby capacity that physician offices do not
                bear. Site-neutral payment threatens hospital cross-subsidization
                of money-losing services and could force closures.
              </p>
              <p>
                <span className="font-semibold text-emerald-700">
                  Patient/CMS position:
                </span>{" "}
                Patients pay higher cost-sharing at HOPDs. Site-neutral saves
                Medicare and patients money without evidence of quality
                difference. MedPAC estimates $10B+ annual savings from full
                site-neutrality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: No Surprises Act Impact */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Surprise Billing — No Surprises Act Impact
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SelectRow
              label="Specialty"
              value={nsaSpecialty}
              options={NSA_SPECIALTIES.map((s) => ({ value: s, label: s }))}
              onChange={setNsaSpecialty}
            />
            <SliderRow
              label="Annual Out-of-Network Billing Volume"
              value={nsaVolume}
              min={100}
              max={20000}
              step={100}
              onChange={setNsaVolume}
              format={(v) => v.toLocaleString()}
            />
            <SliderRow
              label="Average Out-of-Network Charge"
              value={nsaAvgCharge}
              min={500}
              max={50000}
              step={500}
              onChange={setNsaAvgCharge}
              format={(v) => `$${v.toLocaleString()}`}
            />
            <SliderRow
              label="QPA as % of Charge"
              value={qpaPct}
              min={15}
              max={80}
              step={1}
              onChange={setQpaPct}
              format={(v) => `${v}%`}
              tooltip="Qualified Payment Amount — typically 50th percentile in-network rate. Enters IDR as starting point."
            />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Revenue Before NSA"
                value={fmtM(nsa.revenueBefore)}
                color="slate"
                icon={<DollarSign size={18} />}
              />
              <StatCard
                label="Revenue After NSA (QPA)"
                value={fmtM(nsa.revenueAfter)}
                color="sky"
                icon={<DollarSign size={18} />}
              />
              <StatCard
                label="Physician Revenue Reduction"
                value={fmtM(nsa.revenueReduction)}
                sub={`${fmtPct(100 - qpaPct)} reduction`}
                color="red"
                icon={<TrendingDown size={18} />}
              />
              <StatCard
                label="Patient Savings"
                value={fmtM(nsa.patientSavings)}
                sub="est. patient portion"
                color="green"
                icon={<Heart size={18} />}
              />
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-1">
                NSA Context — {nsaSpecialty}
              </p>
              <p>
                The QPA (${nsa.qpa.toLocaleString()}) serves as the starting
                offer in Independent Dispute Resolution (IDR). Arbitrators must
                consider QPA as the primary factor, then consider additional
                criteria (training, experience, market share). The NSA caps
                out-of-network patient cost-sharing at in-network amounts,
                eliminating balance billing.
              </p>
              <p className="mt-2 text-sky-700">
                Estimated gross reduction in {nsaSpecialty} out-of-network
                revenue:{" "}
                <span className="font-bold">{fmtM(nsa.revenueReduction)}</span>{" "}
                annually ({fmtPct(100 - qpaPct)} from pre-NSA baseline).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

