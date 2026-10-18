"use client";

// Rebuilt 2026-10-17. The earlier calculator claimed "KFF coverage gap estimates" but put Texas alone at 1.2 million
// (KFF's total for all ten states) and added uncompensated-care, economic-multiplier, jobs and lives-saved outputs
// with no traceable source. Inputs are now KFF (coverage gap, 2024 ACS), Census (2025 population) and the
// Federal Register (FY2027 FMAP); everything else is a labelled assumption the user sets.

import { useMemo, useState } from "react";
import { DollarSign, Users } from "lucide-react";
import { NON_EXPANSION_STATES, fmtM } from "../PolicySimulator.data";
import { StatCard, SelectRow, SliderRow } from "../PolicySimulator.atoms";

const EXPANSION_FMAP = 0.9; // ACA expansion adults, 42 U.S.C. § 1396d(y)

export function ExpansionTab() {
  const stateKeys = Object.keys(NON_EXPANSION_STATES);
  const [state, setState] = useState("Texas");
  const [takeUp, setTakeUp] = useState(70);
  const [costPerEnrollee, setCostPerEnrollee] = useState(6000);
  const s = NON_EXPANSION_STATES[state];

  const r = useMemo(() => {
    const newEnrollees = Math.round(s.coverageGap * (takeUp / 100));
    const total = newEnrollees * costPerEnrollee;
    return { newEnrollees, federal: total * EXPANSION_FMAP, state: total * (1 - EXPANSION_FMAP) };
  }, [s, takeUp, costPerEnrollee]);

  const totalGap = Object.values(NON_EXPANSION_STATES).reduce((a, x) => a + x.coverageGap, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SelectRow label="Non-expansion state" value={state} options={stateKeys.map((k) => ({ value: k, label: k }))} onChange={setState} />
          <SliderRow label="Take-up among adults in the gap (your assumption)" value={takeUp} min={20} max={100} step={5} onChange={setTakeUp} format={(v) => `${v}%`} />
          <SliderRow label="Annual cost per new enrollee (your assumption)" value={costPerEnrollee} min={3000} max={10000} step={250} onChange={setCostPerEnrollee} format={(v) => `$${v.toLocaleString()}`} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Adults in the coverage gap" value={s.coverageGap.toLocaleString()} sub="KFF, 2024" icon={<Users size={16} />} />
        <StatCard label="New enrollees (modelled)" value={r.newEnrollees.toLocaleString()} sub={`${takeUp}% take-up`} icon={<Users size={16} />} />
        <StatCard label="Federal cost / yr (90%)" value={fmtM(r.federal)} color="green" icon={<DollarSign size={16} />} />
        <StatCard label="State cost / yr (10%)" value={fmtM(r.state)} color="red" icon={<DollarSign size={16} />} />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 text-sm text-slate-600 space-y-2">
        <p><span className="font-semibold text-slate-800">{state}:</span> population {s.population.toLocaleString()} (Census, 2025); regular FMAP {s.fmap}% in FY2027 against 90% for expansion adults.</p>
        {s.coverageGap === 0 && <p>{state} covers adults up to 100% of poverty through a Section 1115 waiver, so it has no coverage gap; expansion would reach adults from 100% to 138% of poverty, who are not counted here.</p>}
        <p>Across the ten non-expansion states KFF counts {totalGap.toLocaleString()} adults in the gap. Expansion would also make eligible about as many again with incomes of 100–138% of poverty (KFF), not modelled here.</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500">
          <span className="font-semibold">Sources and method:</span> coverage gap — KFF, &quot;Characteristics of Poor Uninsured Adults Ages
          19–64 in the ACA Coverage Gap&quot; (2024 ACS); population — U.S. Census Bureau, Vintage 2025 estimates; FMAP — Federal Register,
          November 28, 2025 (FY2027); expansion match — 90% under the ACA. Take-up and cost per enrollee are your assumptions. H.R. 1 (2025)
          removed the temporary extra match that had been offered to newly expanding states.
        </p>
      </div>
    </div>
  );
}
