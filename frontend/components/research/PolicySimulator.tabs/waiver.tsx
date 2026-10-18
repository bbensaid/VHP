"use client";

// Rebuilt 2026-10-17. The earlier modeler ran on unsourced state figures (Vermont "218,000 enrollees"; CMS reports
// 146,383) and invented coefficients — an 8% work-requirement loss, a 30-cent SDOH return, $2,800 of uncompensated care
// per new enrollee, ER and admission reductions, and a CMS "approval likelihood" that penalised work requirements, which
// H.R. 1 now mandates from 2027. State figures are now sourced; every behavioural effect is a slider the user sets.

import { useMemo, useState } from "react";
import { DollarSign, TrendingDown, Users } from "lucide-react";
import { STATE_DATA, WAIVER_TYPES, fmtM } from "../PolicySimulator.data";
import { SectionTitle, StatCard, SliderRow, SelectRow } from "../PolicySimulator.atoms";

export function WaiverTab() {
  const [waiverType, setWaiverType] = useState("global_commitment");
  const [selectedState, setSelectedState] = useState("Vermont");
  const [coveragePct, setCoveragePct] = useState(10);
  const [costPerEnrollee, setCostPerEnrollee] = useState(7000);
  const [lossPct, setLossPct] = useState(0);

  const s = STATE_DATA[selectedState];
  const waiver = WAIVER_TYPES.find((w) => w.id === waiverType)!;

  const r = useMemo(() => {
    const uninsuredAdults = Math.round((s.uninsuredAdultsPct / 100) * s.population * 0.78); // ~78% of residents are adults (assumption)
    const gain = Math.round(uninsuredAdults * (coveragePct / 100));
    const loss = Math.round(s.enrollees * (lossPct / 100));
    const net = gain - loss;
    const spend = net * costPerEnrollee;
    return { uninsuredAdults, gain, loss, net, spend, federal: spend * (s.fmap / 100), state: spend * (1 - s.fmap / 100) };
  }, [s, coveragePct, costPerEnrollee, lossPct]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectRow label="State" value={selectedState} options={Object.keys(STATE_DATA).map((k) => ({ value: k, label: k }))} onChange={setSelectedState} />
          <SelectRow label="Waiver type" value={waiverType} options={WAIVER_TYPES.map((w) => ({ value: w.id, label: w.label }))} onChange={setWaiverType} />
        </div>
        <p className="text-xs text-slate-500">{waiver.note}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SliderRow label="Share of uninsured adults newly covered (your assumption)" value={coveragePct} min={0} max={50} step={1} onChange={setCoveragePct} format={(v) => `${v}%`} />
          <SliderRow label="Annual cost per enrollee (your assumption)" value={costPerEnrollee} min={3000} max={15000} step={250} onChange={setCostPerEnrollee} format={(v) => `$${v.toLocaleString()}`} />
          <SliderRow label="Enrollees lost to requirements or premiums (your assumption)" value={lossPct} min={0} max={20} step={0.5} onChange={setLossPct} format={(v) => `${v}%`}
            tooltip="Arkansas's 2018 work requirement removed about 18,000 people from coverage in its first months (Sommers et al., NEJM 2019); H.R. 1 applies work requirements to expansion adults nationally from 2027." />
        </div>
      </div>

      <div>
        <SectionTitle>{selectedState} today</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Medicaid & CHIP enrollment" value={s.enrollees.toLocaleString()} sub="CMS, May 2026" icon={<Users size={16} />} />
          <StatCard label="FMAP" value={`${s.fmap}%`} sub="FY2027" />
          <StatCard label="Adults without insurance" value={`${s.uninsuredAdultsPct}%`} sub="CDC BRFSS" />
          <StatCard label="Population" value={s.population.toLocaleString()} sub="Census, 2025" />
        </div>
      </div>

      <div>
        <SectionTitle>Modelled change (annual)</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Newly covered" value={`+${r.gain.toLocaleString()}`} color="green" icon={<Users size={16} />} />
          <StatCard label="Lost coverage" value={`−${r.loss.toLocaleString()}`} color="red" icon={<TrendingDown size={16} />} />
          <StatCard label="Spending change / yr" value={fmtM(r.spend)} icon={<DollarSign size={16} />} />
          <StatCard label="State share / yr" value={fmtM(r.state)} sub={`federal ${fmtM(r.federal)} at ${s.fmap}% FMAP`} />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
        <span className="font-semibold">Sources and method:</span> enrollment — CMS, State Medicaid and CHIP Applications, Eligibility
        Determinations, and Enrollment Data (May 2026, updated); FMAP — Federal Register, November 28, 2025 (FY2027); uninsured adults — CDC
        BRFSS; population — Census Vintage 2025. Uninsured adults are approximated as the BRFSS rate × 78% of the population. The match uses
        the regular FMAP; ACA expansion adults are matched at 90%. Coverage, cost and loss rates are your assumptions — the tool does not
        estimate the chance of CMS approval.
      </div>
    </div>
  );
}
