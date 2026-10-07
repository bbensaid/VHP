"use client";

/**
 * The three-imperatives test — "more funding, same structure" vs. structural reform.
 *
 * Chapter 2 §2.10 sends readers to the Policy Simulator to "compare a 'more funding, same
 * structure' path against a structural-reform path — the Oliver Wyman three-imperatives
 * test", and to stress-test "mandatory vs. voluntary participation". Appendix H Stage 1 asks
 * whether "a binding mandate exists that prevents the highest-revenue actors from staying
 * outside the model."
 *
 * What is quantified, and what is not:
 *  - Quantified: only the budget arithmetic, using the Global Budget Designer's own inputs
 *    (base spend, growth cap, unconstrained trend). Added funding enters the existing base and
 *    grows at the unconstrained trend (Oliver Wyman: money poured into the existing structure
 *    "would drive up prices without improving access"). The cap binds only on the share of
 *    spending that participates — under a voluntary model, the opted-out share keeps growing
 *    at trend (the OneCare flaw, Chapter 1 §1.2).
 *  - Not quantified: the upstream-drivers and locus-of-care imperatives. No sourced effect
 *    size exists for them here, so they are a pass/fail checklist, not a number.
 */

import { useMemo, useState } from "react";
import { fmtM } from "../PolicySimulator.data";
import { SectionTitle, SliderRow, ToggleRow } from "../PolicySimulator.atoms";

const YEARS = 10;

export function StructuralReformTest({
  baseSpend,
  growthCap,
  projectedTrend,
}: {
  /** $M, from the Global Budget Designer */
  baseSpend: number;
  growthCap: number;
  projectedTrend: number;
}) {
  const [mandatory, setMandatory] = useState(true);
  const [optOutPct, setOptOutPct] = useState(25);
  const [addedFunding, setAddedFunding] = useState(100); // $M per year, path A
  const [upstream, setUpstream] = useState(false);
  const [priceBudget, setPriceBudget] = useState(true);
  const [locus, setLocus] = useState(false);

  const participating = mandatory ? 1 : 1 - optOutPct / 100;

  const paths = useMemo(() => {
    const base = baseSpend * 1e6;
    const add = addedFunding * 1e6;
    let baseline = 0;
    let fundingOnly = 0;
    let structural = 0;
    for (let t = 1; t <= YEARS; t++) {
      const trendF = Math.pow(1 + projectedTrend / 100, t);
      const capF = Math.pow(1 + growthCap / 100, t);
      baseline += base * trendF;
      fundingOnly += (base + add) * trendF;
      structural += priceBudget
        ? base * participating * capF + base * (1 - participating) * trendF
        : base * trendF;
    }
    return { baseline, fundingOnly, structural };
  }, [baseSpend, addedFunding, projectedTrend, growthCap, participating, priceBudget]);

  const met = [upstream, priceBudget, locus].filter(Boolean).length;
  const verdict =
    met === 3 && mandatory
      ? { label: "Structural reform — passes the three-imperatives test", cls: "bg-emerald-50 border-emerald-300 text-emerald-800" }
      : !priceBudget
        ? { label: "Additive — more funding, same structure", cls: "bg-rose-50 border-rose-300 text-rose-800" }
        : { label: `Partial — ${met} of 3 imperatives${mandatory ? "" : ", voluntary participation"}`, cls: "bg-amber-50 border-amber-300 text-amber-800" };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5" data-testid="structural-reform-test">
      <SectionTitle>Three-Imperatives Test: More Funding vs. Structural Reform</SectionTitle>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Oliver Wyman&apos;s Act 167 finding for Vermont: more funding without structural change drives prices up without
        improving access. Configure a reform path below and compare it with simply adding money to the existing structure.
        Uses the base spend, growth cap and trend set above.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Path A — more funding, same structure</p>
          <SliderRow
            label="Added funding per year"
            value={addedFunding}
            min={0}
            max={1000}
            step={10}
            onChange={setAddedFunding}
            format={(v) => `$${v}M`}
            tooltip="New money entering the existing system each year"
          />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 mt-4">Path B — structural reform</p>
          <ToggleRow label="1. Fix the upstream drivers (housing, transportation)" value={upstream} onChange={setUpstream} />
          <ToggleRow label="2. Fix price & budget architecture (RBP + global budget cap)" value={priceBudget} onChange={setPriceBudget} />
          <ToggleRow label="3. Shift the locus of care out of hospitals" value={locus} onChange={setLocus} />
          <ToggleRow label="Participation is mandatory (no opt-out)" value={mandatory} onChange={setMandatory} />
          {!mandatory && (
            <SliderRow
              label="Spending held by providers who opt out"
              value={optOutPct}
              min={0}
              max={80}
              step={5}
              onChange={setOptOutPct}
              format={(v) => `${v}%`}
              tooltip="Your assumption: the share of spending outside the model when participation is voluntary"
            />
          )}
        </div>

        <div className="space-y-3">
          <div className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${verdict.cls}`}>{verdict.label}</div>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-500">{YEARS}-year spend, no change</p>
              <p className="text-lg font-black text-slate-800">{fmtM(paths.baseline)}</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-3">
              <p className="text-rose-700">Path A — more funding, same structure</p>
              <p className="text-lg font-black text-rose-800">{fmtM(paths.fundingOnly)}</p>
              <p className="text-[10px] text-rose-700">
                {fmtM(paths.fundingOnly - paths.baseline)} more, still growing at the {projectedTrend.toFixed(1)}% trend — the gap
                between trend and cap is untouched.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-emerald-700">Path B — structural reform as configured</p>
              <p className="text-lg font-black text-emerald-800">{fmtM(paths.structural)}</p>
              <p className="text-[10px] text-emerald-700">
                {priceBudget
                  ? `${fmtM(paths.baseline - paths.structural)} below no-change. The ${growthCap.toFixed(1)}% cap binds on ${Math.round(participating * 100)}% of spending.`
                  : "Without a price & budget architecture there is no cap — spend follows trend."}
              </p>
            </div>
          </div>
          {!mandatory && priceBudget && (
            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
              Voluntary participation leaves {optOutPct}% of spending growing at trend outside the cap. If the opt-outs are the
              highest-cost providers, that is the structural flaw Chapter 1 traces in OneCare: the model never reaches the spending
              it was built to constrain.
            </p>
          )}
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Only the budget arithmetic is modeled. Imperatives 1 and 3 are pass/fail tests here — the platform has no sourced effect
            size for them, so it does not invent one.
          </p>
        </div>
      </div>
    </div>
  );
}
