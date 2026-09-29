# BUILD — APMCalculator: stop-loss + scenario spread

**File:** `frontend/components/research/APMCalculator.tsx` (only file changed)
**Driver:** Ch7 Fig 7.6 / audit "Table 10" promises "benchmark PMPM, sharing rate, MSR, and
stop-loss" and "the gap between gross and net shared savings once the withhold and cap bite"
via "a pessimistic/base/optimistic spread". Neither the stop-loss nor the spread existed.
Per the standing rule, the tool was extended; the book was not reworded.

## 1. Stop-loss threshold

New `stopLossPct` field on every `APM_MODELS` preset, expressed as a share of **annual
benchmark revenue** — deliberately the same unit as the existing `capGainPct`, so the
downside ceiling mirrors the upside cap.

| Model | stopLossPct | Why |
| :-- | :-- | :-- |
| MSSP Track 1 (one-sided) | `0` | N/A — `lossShare` is 0, there is no downside to cap. `0` is read as "no stop-loss defined" and yields an `Infinity` ceiling, which is moot at zero loss share. |
| MSSP Enhanced (two-sided) | `0.15` | Two-sided MSSP structures a loss ceiling as a percentage of benchmark; 15% matches its `capGainPct` of 15%, keeping upside and downside ceilings symmetric. |
| ACO REACH (global risk) | `0.05` | Global-risk models pair 100% loss share with a tight stop-loss; 5% is the meaningful constraint in a full-risk arrangement. |
| BPCI-Advanced (episode) | `0.20` | Episode models carry the loosest ceiling of the four, consistent with per-episode rather than population-level risk. |
| Custom | `0.10` | Default for the user-defined model; user-adjustable. |

Calculation change (inside `evaluate`):

```
maxLossExposure   = stopLossPct > 0 ? annualBenchmark * stopLossPct : Infinity
lossPaymentBeforeCap = netLoss * lossShare
lossPayment       = min(lossPaymentBeforeCap, maxLossExposure)
stopLossBinding   = lossPaymentBeforeCap > maxLossExposure
```

This is structurally identical to the existing `maxSharedSavings` / `capGainPct` cap on the
upside, as specified.

Also added: `customStopLoss` state (default 10) + a **"Stop-Loss Ceiling (% of benchmark)"**
slider in the Custom Parameters panel (0–30, step 0.5), wired into `effectiveModel`; the
waterfall's "Loss Payment to CMS" row appends "(stop-loss capped at N%)" when binding; a new
rose alert fires when the ceiling actually bites, naming the uncapped figure and the ceiling.

## 2. Pessimistic / base / optimistic spread

The single assumption driving `netSavings`/`netLoss` is **`actualSpendPct`** (actual spend as a
% of benchmark). The results `useMemo` was refactored into a pure `useCallback` **`evaluate(spendPct)`**;
the point estimate is now `evaluate(actualSpendPct)`, so **no existing output changed** — the
banner, waterfall and all alerts are untouched and still driven by the base case.

Band: the *savings margin* (`actualSpendPct − 100`) is flexed **±20%**, with a **1.0 pp floor**
so the band never collapses when the base case sits exactly on benchmark; both ends are clamped
to the slider's own 80–115 range.

New **"Scenario Spread"** card (between the waterfall and the alerts), styled to match the
existing result cards — `bg-white rounded-xl border border-slate-200 p-5`, same
`text-xs font-black uppercase tracking-widest text-slate-400` heading. Three tiles in a
`grid-cols-1 sm:grid-cols-3 gap-3`; base case ringed in sky, the other two emerald/rose by sign.
Each tile shows net position, the spend assumption, and — delivering the book's exact phrase —
**gross shared savings vs. net of withhold & cap**, plus loss payment (flagged "capped" when the
stop-loss binds) and admin costs. A footnote names the gain cap and the stop-loss ceiling in
dollars.

## 3. Verification

`cd frontend && npx tsc --noEmit` — clean, whole project, zero errors.
`HTR_Book_v42.docx` not touched.
