"use client";

import { useMemo, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronRight } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
// Every provision resolves to one of three states. "na" removes it from the
// denominator — a carve-out clause is irrelevant in a contract with no carve-outs,
// and scoring it as an open gap would understate readiness.
type Status = "ok" | "gap" | "na";

type Severity = "critical" | "high" | "standard";

interface Provision {
  id: string;
  label: string;
  desc: string;
  severity: Severity;
  vermont?: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  barColor: string;
  summary: string;
  provisions: Provision[];
}

// ─── THE 65 PROVISIONS, IN EIGHT CATEGORIES ───────────────────────────────────
// Categories 1–6 are Chapter 7's Figure 7.3 ("APM contract review framework").
// Categories 7–8 complete the eight the chapter cites: data-sharing/reporting
// obligations and termination/renewal/governance terms.
const CATEGORIES: Category[] = [
  {
    id: "benchmark",
    label: "Benchmark Methodology",
    icon: "🎯",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    barColor: "bg-emerald-500",
    summary:
      "How the target spend is set. Chapter 7 calls benchmark methodology the most consequential financial design choice in APM contract entry — every other term is measured against this number.",
    provisions: [
      {
        id: "b1",
        label: "Benchmark construction method is named explicitly",
        desc: "The contract states whether the benchmark is historical (the organization's own baseline), regional/administrative (a market or state-set target), or blended — and if blended, the exact weighting and the years over which it shifts.",
        severity: "critical",
      },
      {
        id: "b2",
        label: "Base period years and claims runout are specified",
        desc: "Which performance years form the baseline, how many months of claims runout are allowed before the baseline is frozen, and whether the baseline is restated if late claims arrive.",
        severity: "high",
      },
      {
        id: "b3",
        label: "Trend factor source and update cadence are defined",
        desc: "Whether trend is national, regional, or actual-experience-based; which published index it derives from; and whether it is set prospectively before the year or retrospectively after it.",
        severity: "critical",
      },
      {
        id: "b4",
        label: "Risk adjustment model and version are named",
        desc: "The exact HCC model version (or commercial equivalent), whether it is concurrent or prospective, and which year's coding it scores.",
        severity: "critical",
      },
      {
        id: "b5",
        label: "Risk score growth caps are quantified",
        desc: "Any cap on year-over-year risk score growth, the coding intensity adjustment applied, and whether the cap is symmetric — a cap on upward movement with no floor on downward movement transfers documentation risk entirely to the provider.",
        severity: "high",
      },
      {
        id: "b6",
        label: "Rebasing schedule and ratchet protection are stated",
        desc: "When the benchmark is rebased, and whether the organization's own prior savings are absorbed into the new baseline. An unprotected rebase means every dollar saved lowers next cycle's target.",
        severity: "critical",
      },
      {
        id: "b7",
        label: "Regional or efficiency adjustment treatment is disclosed",
        desc: "Whether an efficiency or regional-comparison factor is applied, and in which direction it moves an already-low-cost organization.",
        severity: "high",
        vermont:
          "Vermont's historically lower-spending hospitals can be penalized by baselines struck from their own efficient history — a low historical benchmark leaves no headroom to generate savings against.",
      },
      {
        id: "b8",
        label: "Small-population credibility adjustment is addressed",
        desc: "For populations small enough that random variation dominates, whether the benchmark is credibility-weighted or blended toward a larger reference pool, and at what attributed-life threshold that applies.",
        severity: "high",
        vermont:
          "Most Vermont hospitals attribute populations well below the size at which annual TCOC variation is statistically stable.",
      },
      {
        id: "b9",
        label: "Benchmark dispute and recalculation rights exist",
        desc: "A defined process to challenge a benchmark the organization believes was computed in error, with a stated window, an evidentiary standard, and a remedy other than 'the payer's determination is final.'",
        severity: "standard",
      },
    ],
  },
  {
    id: "attribution",
    label: "Attribution Methodology",
    icon: "👥",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    barColor: "bg-sky-500",
    summary:
      "Who counts as your patient. Attribution determines both the denominator of every quality measure and the population whose total cost the organization is financially accountable for.",
    provisions: [
      {
        id: "a1",
        label: "Prospective vs. retrospective attribution is specified",
        desc: "Whether the attributed list is fixed before the performance year (manageable) or assigned after it (unmanageable), and if retrospective, whether a prospective preliminary list is supplied for care management.",
        severity: "critical",
      },
      {
        id: "a2",
        label: "The attribution algorithm is reproducible from the contract",
        desc: "Plurality-of-visits, majority-of-visits, or assignment-based; the qualifying service code set; and the lookback period — specified in enough detail that the organization can run the same algorithm on its own claims and land on the same list.",
        severity: "critical",
      },
      {
        id: "a3",
        label: "Specialist and non-primary-care visits are ranked",
        desc: "Whether specialist encounters can drive attribution, and the tiebreak order when primary care and specialty claims conflict.",
        severity: "high",
      },
      {
        id: "a4",
        label: "Attributed list refresh frequency is stated",
        desc: "How often the attributed roster is delivered — monthly is workable, annually is not — and the lag between the data period and delivery.",
        severity: "high",
      },
      {
        id: "a5",
        label: "Minimum enrollment and continuous-coverage rules are defined",
        desc: "Months of continuous coverage required for inclusion, handling of mid-year enrollees and disenrollees, and whether partial-year members are cost-annualized or excluded.",
        severity: "standard",
      },
      {
        id: "a6",
        label: "Leakage and out-of-network treatment is explicit",
        desc: "Whether care an attributed member receives outside the network still counts against total cost of care, and whether the organization has any tool — network design, referral management, benefit differential — to influence it.",
        severity: "high",
      },
      {
        id: "a7",
        label: "Attribution dispute and removal process is defined",
        desc: "How to contest a member attributed in error (deceased, relocated, never seen), the evidence required, and the deadline after which the roster is locked.",
        severity: "standard",
      },
      {
        id: "a8",
        label: "Dual-eligible and multi-payer overlap is resolved",
        desc: "How members attributed under more than one risk arrangement are treated, so the same life is not counted — and the same savings not claimed — in two contracts at once.",
        severity: "high",
        vermont:
          "Vermont providers commonly hold overlapping Medicare, Medicaid ACO and commercial VBC arrangements over a small shared population.",
      },
    ],
  },
  {
    id: "quality",
    label: "Quality Withhold and Measurement",
    icon: "📋",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    barColor: "bg-indigo-500",
    summary:
      "The portion of earned savings held back against quality performance — and the measurement machinery that decides whether it is released.",
    provisions: [
      {
        id: "q1",
        label: "Withhold percentage and the base it applies to are stated",
        desc: "The exact withhold rate and whether it is taken from shared savings, from total payment, or from the benchmark — three very different amounts of money.",
        severity: "critical",
      },
      {
        id: "q2",
        label: "The measure set is enumerated and version-locked",
        desc: "Every measure listed by steward and specification version (HEDIS MY, CMS eCQM, or state measure set), not incorporated by reference to a document the payer can revise unilaterally.",
        severity: "critical",
      },
      {
        id: "q3",
        label: "Performance thresholds and the benchmark population are fixed",
        desc: "Whether scoring is against absolute targets or a percentile of a peer distribution, which peer group, and whether the target can move after the performance year begins.",
        severity: "critical",
      },
      {
        id: "q4",
        label: "Improvement scoring is available alongside attainment",
        desc: "Credit for year-over-year improvement, so an organization starting below the threshold has a reachable path to releasing the withhold in year one.",
        severity: "high",
      },
      {
        id: "q5",
        label: "Measure denominators are small-population-aware",
        desc: "Minimum denominator size for a measure to score at all, and what happens to the withhold attached to measures that do not meet it — excluded, or scored as a failure.",
        severity: "high",
        vermont:
          "Small Vermont panels routinely fall below reportable denominators, so the default treatment of unscorable measures is financially material here.",
      },
      {
        id: "q6",
        label: "Data source and submission mechanics are specified",
        desc: "Claims-only, hybrid chart review, registry, or EHR extract; who bears the abstraction cost; and the submission deadline past which a measure scores as zero.",
        severity: "standard",
      },
      {
        id: "q7",
        label: "Equity stratification requirements are defined",
        desc: "Whether measures must be stratified by race, ethnicity, language, disability or rurality, which data source supplies those fields, and whether stratified performance carries its own payment consequence.",
        severity: "standard",
      },
      {
        id: "q8",
        label: "Patient-experience and survey measures are scoped",
        desc: "Which survey instrument, who fields and pays for it, the sample frame, and whether a low response rate is scored as poor performance.",
        severity: "standard",
      },
    ],
  },
  {
    id: "risk",
    label: "Risk Corridors and Stop-Loss",
    icon: "🛡️",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    barColor: "bg-rose-500",
    summary:
      "The bounds on downside exposure. These provisions decide the worst plausible year, which is the number the balance sheet actually has to survive.",
    provisions: [
      {
        id: "r1",
        label: "Minimum savings rate and minimum loss rate are both stated",
        desc: "The MSR that must be cleared before savings are earned and the MLR that must be crossed before losses are owed, and whether the two are symmetric.",
        severity: "critical",
      },
      {
        id: "r2",
        label: "Sharing rate is stated for both directions",
        desc: "The percentage of savings earned and the percentage of losses owed, with the asymmetry — if any — made explicit rather than buried in separate exhibits.",
        severity: "critical",
      },
      {
        id: "r3",
        label: "First-dollar vs. excess-only settlement is clear",
        desc: "Whether clearing the MSR pays from the first dollar of savings or only on the amount above the corridor — a difference that can halve the settlement on an identical performance year.",
        severity: "high",
      },
      {
        id: "r4",
        label: "Aggregate loss cap is quantified as a hard dollar figure",
        desc: "The maximum possible loss expressed in dollars, not only as a percentage of benchmark or revenue, and modeled against a bad year before signature.",
        severity: "critical",
      },
      {
        id: "r5",
        label: "Individual-member stop-loss threshold and basis are defined",
        desc: "The per-member attachment point, whether it applies per year or per episode, whether costs above it are truncated from the benchmark as well as from performance, and who carries the reinsurance.",
        severity: "critical",
      },
      {
        id: "r6",
        label: "Catastrophic and outlier claim treatment is specified",
        desc: "Handling of transplants, gene and cell therapies, NICU stays and other low-frequency catastrophic costs that a small attributed population cannot absorb.",
        severity: "high",
      },
      {
        id: "r7",
        label: "Financial guarantee and repayment mechanism is sized",
        desc: "Whether a letter of credit, escrow, surety bond or payment withhold is required, at what amount, and how that collateral affects days-cash-on-hand and existing debt covenants.",
        severity: "critical",
      },
      {
        id: "r8",
        label: "Extraordinary-circumstance relief is available",
        desc: "A defined adjustment for public health emergencies, natural disaster, or a documented payer data failure — the pandemic-era clause that determines whether an uncontrollable year is shared or absorbed alone.",
        severity: "standard",
      },
    ],
  },
  {
    id: "carveouts",
    label: "Carve-Outs and Exclusions",
    icon: "✂️",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    barColor: "bg-amber-500",
    summary:
      "What sits outside the risk pool. A carve-out that removes cost from performance but leaves it in the benchmark — or the reverse — silently rewrites the economics.",
    provisions: [
      {
        id: "c1",
        label: "Every carve-out is listed with its defining code set",
        desc: "Each excluded service, drug class or population identified by the exact codes that define it, not by category name alone.",
        severity: "critical",
      },
      {
        id: "c2",
        label: "Carve-outs are applied symmetrically to benchmark and performance",
        desc: "Confirmation that any cost excluded from performance-year spend was also excluded from the baseline used to build the benchmark.",
        severity: "critical",
      },
      {
        id: "c3",
        label: "Pharmacy scope is unambiguous",
        desc: "Whether Part D or the pharmacy benefit is in or out; treatment of provider-administered drugs; and whether rebates are netted before costs are counted against the benchmark.",
        severity: "critical",
      },
      {
        id: "c4",
        label: "Behavioral health and SUD services are explicitly scoped",
        desc: "Whether BH and SUD spend is inside the risk pool, and if carved out to a separate vendor, how integrated-care savings are credited to the at-risk organization that produced them.",
        severity: "high",
        vermont:
          "Vermont's designated agency and hub-and-spoke SUD system sits partly outside commercial networks, so BH scope has to be checked against how those services are actually paid here.",
      },
      {
        id: "c5",
        label: "Long-term care, hospice and post-acute boundaries are drawn",
        desc: "Which post-acute settings count, and the point at which a member in long-term custodial care or on hospice exits the attributed population.",
        severity: "high",
      },
      {
        id: "c6",
        label: "New-technology and new-drug entry is addressed",
        desc: "How a high-cost therapy approved after the benchmark was struck is handled — benchmark adjustment, carve-out, or full provider exposure.",
        severity: "high",
      },
      {
        id: "c7",
        label: "Supplemental and non-claims payment streams are reconciled",
        desc: "Whether DSH, GME, supplemental payments, grant funding or state directed payments count as revenue, as cost offsets, or not at all.",
        severity: "standard",
        vermont:
          "Critical access hospital cost-based reimbursement and state directed payments both sit awkwardly against commercial TCOC definitions.",
      },
      {
        id: "c8",
        label: "Out-of-area and emergency out-of-network costs are treated",
        desc: "Cost incurred outside the service area or in an emergency the organization could not have steered — counted, capped, or excluded.",
        severity: "standard",
      },
    ],
  },
  {
    id: "reconciliation",
    label: "Reconciliation Timing and Settlement",
    icon: "🗓️",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    barColor: "bg-violet-500",
    summary:
      "When money actually moves. Every provision here is a cash-flow provision: a contract can be economically sound and still be unaffordable on its settlement schedule.",
    provisions: [
      {
        id: "s1",
        label: "Settlement date is fixed relative to year-end",
        desc: "A named number of months after the close of the performance year, not 'as soon as practicable' or a date at the payer's discretion.",
        severity: "critical",
      },
      {
        id: "s2",
        label: "Claims runout period used at settlement is stated",
        desc: "The months of runout included and the completion factor applied to claims still incurred-but-not-reported at the cut-off.",
        severity: "high",
      },
      {
        id: "s3",
        label: "Interim reporting cadence supports mid-year management",
        desc: "Quarterly or monthly performance estimates delivered early enough to change the outcome, not a single reconciliation report after the year is closed.",
        severity: "high",
      },
      {
        id: "s4",
        label: "Re-opening and restatement rights are bounded",
        desc: "How long after settlement the payer may reopen a completed reconciliation, on what grounds, and whether the organization has reciprocal rights.",
        severity: "critical",
      },
      {
        id: "s5",
        label: "Payment timing after settlement is defined",
        desc: "Days from settlement determination to actual payment or invoice, and whether interest accrues on late payment in either direction.",
        severity: "standard",
      },
      {
        id: "s6",
        label: "Loss repayment schedule is negotiated, not lump-sum",
        desc: "Whether owed losses are due in a single payment or amortized, and whether they may be offset against future FFS remittance rather than paid from cash.",
        severity: "high",
      },
      {
        id: "s7",
        label: "Audit rights are mutual and time-bounded",
        desc: "The organization's right to audit the payer's calculation — with access to member-level detail — not only the payer's right to audit the organization.",
        severity: "high",
      },
      {
        id: "s8",
        label: "Dispute resolution path is specified end to end",
        desc: "Named escalation steps, timelines, the forum and governing law, and whether performance continues during a dispute.",
        severity: "standard",
      },
    ],
  },
  {
    id: "data",
    label: "Data Sharing and Reporting Obligations",
    icon: "🗄️",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    barColor: "bg-teal-500",
    summary:
      "The operational half of the contract. Chapter 7 names data and analytics capability as the binding constraint on Vermont VBC readiness — these provisions determine whether the payer supplies what the constraint requires.",
    provisions: [
      {
        id: "d1",
        label: "Member-level claims files are contractually guaranteed",
        desc: "Delivery of complete member-level claim and encounter detail — not summary reports — with named file layout, frequency and delivery method.",
        severity: "critical",
      },
      {
        id: "d2",
        label: "Data delivery lag is capped with a remedy",
        desc: "A maximum lag from incurred date to file delivery, and a stated consequence — benchmark relief, settlement adjustment, or termination right — when the payer misses it.",
        severity: "critical",
      },
      {
        id: "d3",
        label: "Calculation transparency is contractual",
        desc: "The right to receive the full settlement calculation workbook with the inputs and intermediate steps, sufficient to independently reproduce the result.",
        severity: "critical",
      },
      {
        id: "d4",
        label: "Admission, discharge and transfer notifications are covered",
        desc: "Real-time or near-real-time ADT feeds for attributed members, including out-of-network events, since post-discharge follow-up is unachievable without them.",
        severity: "high",
        vermont:
          "VITL and the state HIE are the practical delivery path for ADT in Vermont; name the source rather than leaving the mechanism unstated.",
      },
      {
        id: "d5",
        label: "Permitted uses of the data are broad enough to act on",
        desc: "Explicit permission to use the data for care management, risk stratification, quality improvement and internal financial modeling — not analytics-for-reporting-only.",
        severity: "high",
      },
      {
        id: "d6",
        label: "Behavioral health and 42 CFR Part 2 handling is resolved",
        desc: "How consent-restricted SUD records are shared or suppressed, and whether costs invisible to the organization still count against its benchmark.",
        severity: "high",
      },
      {
        id: "d7",
        label: "Provider reporting burden is enumerated and costed",
        desc: "Every report, attestation and data submission the organization owes, with its frequency, so the administrative cost can be priced into the deal.",
        severity: "standard",
      },
      {
        id: "d8",
        label: "Data rights survive termination",
        desc: "Continued access to historical data needed to close out final reconciliation and defend a later audit, and the disposition of data already exchanged.",
        severity: "standard",
      },
    ],
  },
  {
    id: "term",
    label: "Termination, Renewal and Governance",
    icon: "⚖️",
    color: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-300",
    barColor: "bg-slate-500",
    summary:
      "The exit and the amendment rights. An otherwise strong contract with a unilateral amendment clause is a contract whose terms the organization does not control.",
    provisions: [
      {
        id: "t1",
        label: "Initial term and renewal mechanics are stated",
        desc: "Length of the initial term, whether renewal is automatic or affirmative, and the notice window for non-renewal.",
        severity: "high",
      },
      {
        id: "t2",
        label: "Termination for convenience is mutual",
        desc: "Whether either party may exit without cause, on equal notice — and if only the payer may, what that asymmetry is worth.",
        severity: "critical",
      },
      {
        id: "t3",
        label: "Mid-year termination settles pro rata",
        desc: "How savings and losses are computed for a partial performance year, and whether an exit forfeits savings already earned.",
        severity: "high",
      },
      {
        id: "t4",
        label: "Unilateral amendment rights are constrained",
        desc: "Whether the payer may change measures, rates, benchmark methodology or policy manuals by notice alone, and whether the organization has a right to terminate on a material amendment.",
        severity: "critical",
      },
      {
        id: "t5",
        label: "Regulatory change triggers renegotiation",
        desc: "A clause reopening financial terms when state or federal law materially changes the economics of the arrangement mid-term.",
        severity: "high",
        vermont:
          "Act 68 reference-based pricing and GMCB global budget requirements phase in on their own schedule, independent of any commercial contract term.",
      },
      {
        id: "t6",
        label: "Joint governance body has defined authority",
        desc: "A standing joint operating committee with named membership, meeting cadence, and actual decision rights — not an advisory forum.",
        severity: "standard",
      },
      {
        id: "t7",
        label: "Network and product changes require notice or consent",
        desc: "Whether the payer may add products, benefit designs or populations into the arrangement mid-term, which changes the risk profile without changing the price.",
        severity: "high",
      },
      {
        id: "t8",
        label: "Anti-assignment and change-of-control terms are acceptable",
        desc: "What happens to the agreement on merger, affiliation or sale of either party, including whether the payer may assign the risk to a downstream entity.",
        severity: "standard",
      },
    ],
  },
];

const TOTAL_PROVISIONS = CATEGORIES.reduce((a, c) => a + c.provisions.length, 0); // 65

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-rose-100 text-rose-700 border-rose-200",
  high: "bg-amber-100 text-amber-700 border-amber-200",
  standard: "bg-slate-100 text-slate-600 border-slate-200",
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  standard: "Standard",
};

const STATUS_STYLES: Record<Status, string> = {
  ok: "bg-emerald-600 border-emerald-700 text-white",
  gap: "bg-rose-600 border-rose-700 text-white",
  na: "bg-slate-500 border-slate-600 text-white",
};

const STATUS_LABELS: Record<Status, string> = {
  ok: "Confirmed",
  gap: "Gap / Unfavorable",
  na: "Not Applicable",
};

function fmt(n: number, d = 0) {
  return n.toFixed(d);
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function VBCContractReviewChecklist() {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [openCats, setOpenCats] = useState<Set<string>>(new Set([CATEGORIES[0].id]));
  const [showVermont, setShowVermont] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  function setStatus(id: string, status: Status) {
    setStatuses((prev) => {
      const next = { ...prev };
      if (next[id] === status) delete next[id];
      else next[id] = status;
      return next;
    });
  }

  function toggleCat(id: string) {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const results = useMemo(() => {
    const catResults = CATEGORIES.map((category) => {
      const rows = category.provisions.map((p) => ({ p, status: statuses[p.id] ?? null }));
      const applicable = rows.filter((r) => r.status !== "na");
      const reviewed = rows.filter((r) => r.status !== null);
      const confirmed = rows.filter((r) => r.status === "ok");
      const gaps = rows.filter((r) => r.status === "gap");
      const pct = applicable.length > 0 ? (confirmed.length / applicable.length) * 100 : 0;
      return {
        category,
        total: category.provisions.length,
        reviewed: reviewed.length,
        applicable: applicable.length,
        confirmed: confirmed.length,
        gaps: gaps.length,
        pct,
      };
    });

    const reviewed = Object.keys(statuses).length;
    const na = Object.values(statuses).filter((s) => s === "na").length;
    const confirmed = Object.values(statuses).filter((s) => s === "ok").length;
    const gapCount = Object.values(statuses).filter((s) => s === "gap").length;
    const applicable = TOTAL_PROVISIONS - na;
    const readinessPct = applicable > 0 ? (confirmed / applicable) * 100 : 0;
    const completionPct = (reviewed / TOTAL_PROVISIONS) * 100;

    const openGaps = CATEGORIES.flatMap((category) =>
      category.provisions
        .filter((p) => statuses[p.id] === "gap")
        .map((p) => ({ ...p, category }))
    ).sort((a, b) => {
      const order: Record<Severity, number> = { critical: 0, high: 1, standard: 2 };
      return order[a.severity] - order[b.severity];
    });

    const criticalGaps = openGaps.filter((g) => g.severity === "critical").length;
    const criticalTotal = CATEGORIES.flatMap((c) => c.provisions).filter((p) => p.severity === "critical").length;
    const criticalConfirmed = CATEGORIES.flatMap((c) => c.provisions).filter(
      (p) => p.severity === "critical" && statuses[p.id] === "ok"
    ).length;

    return {
      catResults,
      reviewed,
      confirmed,
      gapCount,
      na,
      applicable,
      readinessPct,
      completionPct,
      openGaps,
      criticalGaps,
      criticalTotal,
      criticalConfirmed,
    };
  }, [statuses]);

  // Signing posture. Critical gaps dominate: a contract can score well overall and
  // still be unsignable on one unbounded downside clause.
  const verdict = (() => {
    if (results.reviewed === 0)
      return {
        label: "Not Yet Reviewed",
        color: "text-slate-500",
        bg: "bg-slate-50 border-slate-200",
        icon: XCircle,
        note: "Work through all 65 provisions. Mark each Confirmed, Gap, or Not Applicable.",
      };
    if (results.criticalGaps > 0)
      return {
        label: `Do Not Sign — ${results.criticalGaps} Critical Gap${results.criticalGaps === 1 ? "" : "s"}`,
        color: "text-rose-600",
        bg: "bg-rose-50 border-rose-200",
        icon: XCircle,
        note: "Critical provisions govern unbounded downside, benchmark construction, or data access. Resolve every one before signature.",
      };
    if (results.completionPct < 100)
      return {
        label: `Review In Progress — ${fmt(results.completionPct, 0)}% Complete`,
        color: "text-sky-600",
        bg: "bg-sky-50 border-sky-200",
        icon: AlertTriangle,
        note: "No critical gaps so far. Complete the remaining provisions before forming a signing recommendation.",
      };
    if (results.gapCount > 0)
      return {
        label: `Negotiate — ${results.gapCount} Open Item${results.gapCount === 1 ? "" : "s"}`,
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        icon: AlertTriangle,
        note: "All 65 provisions reviewed with no critical gaps. Take the remaining items into negotiation.",
      };
    return {
      label: "Contract Review Complete — Cleared",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
      icon: CheckCircle,
      note: "All 65 provisions reviewed and confirmed or scoped out. Retain this record with the executed contract.",
    };
  })();

  const VerdictIcon = verdict.icon;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className={`rounded-xl border p-4 ${verdict.bg}`}>
          <div className="flex items-start gap-3">
            <VerdictIcon size={20} className={`shrink-0 mt-0.5 ${verdict.color}`} />
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Signing Posture</p>
              <p className={`text-lg font-black leading-tight ${verdict.color}`}>{verdict.label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{verdict.note}</p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                results.criticalGaps > 0 ? "bg-rose-500" : results.readinessPct >= 90 ? "bg-emerald-500" : results.readinessPct >= 60 ? "bg-sky-500" : "bg-amber-500"
              }`}
              style={{ width: `${results.readinessPct}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">
            {fmt(results.readinessPct, 0)}% of applicable provisions confirmed · {results.reviewed}/{TOTAL_PROVISIONS} reviewed
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Confirmed</p>
            <p className="text-2xl font-black text-emerald-700 leading-tight">{results.confirmed}</p>
            <p className="text-[10px] text-slate-400">of {results.applicable} applicable</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">Open Gaps</p>
            <p className="text-2xl font-black text-rose-700 leading-tight">{results.gapCount}</p>
            <p className="text-[10px] text-slate-400">{results.criticalGaps} critical</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Critical Cleared</p>
            <p className="text-2xl font-black text-slate-700 leading-tight">
              {results.criticalConfirmed}/{results.criticalTotal}
            </p>
            <p className="text-[10px] text-slate-400">deal-breaker provisions</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scoped Out</p>
            <p className="text-2xl font-black text-slate-700 leading-tight">{results.na}</p>
            <p className="text-[10px] text-slate-400">marked not applicable</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setOpenCats(new Set(CATEGORIES.map((c) => c.id)))}
          className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
        >
          Expand All
        </button>
        <button
          onClick={() => setOpenCats(new Set())}
          className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
        >
          Collapse All
        </button>
        <button
          onClick={() => setCriticalOnly((v) => !v)}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            criticalOnly ? "bg-rose-100 text-rose-700 border-rose-300" : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {criticalOnly ? "Showing Critical Only" : "Show Critical Only"}
        </button>
        <button
          onClick={() => setShowVermont((v) => !v)}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            showVermont ? "bg-sky-100 text-sky-700 border-sky-300" : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {showVermont ? "Vermont Notes ON" : "Vermont Notes OFF"}
        </button>
        <button
          onClick={() => setStatuses({})}
          className="text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all ml-auto"
        >
          Reset Review
        </button>
      </div>

      {/* Category progress */}
      {results.reviewed > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {results.catResults.map(({ category, pct, reviewed, total, gaps }) => (
            <div key={category.id} className={`rounded-xl border p-3 ${category.bg} ${category.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span>{category.icon}</span>
                <span className={`text-[11px] font-black leading-tight ${category.color}`}>{category.label}</span>
                <span className={`ml-auto text-xs font-black ${category.color}`}>{fmt(pct, 0)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/70 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${category.barColor}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {reviewed}/{total} reviewed{gaps > 0 ? ` · ${gaps} gap${gaps === 1 ? "" : "s"}` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Open gaps */}
      {results.openGaps.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-rose-700 mb-3">
            Negotiation List — Open Gaps by Severity
          </h4>
          <div className="space-y-2">
            {results.openGaps.map((gap) => (
              <div key={gap.id} className="flex items-start gap-3">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 mt-0.5 ${SEVERITY_STYLES[gap.severity]}`}>
                  {SEVERITY_LABELS[gap.severity]}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800">{gap.label}</p>
                  <p className="text-[10px] text-slate-500">{gap.category.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {CATEGORIES.map((category) => {
          const isOpen = openCats.has(category.id);
          const catResult = results.catResults.find((r) => r.category.id === category.id)!;
          const visible = criticalOnly
            ? category.provisions.filter((p) => p.severity === "critical")
            : category.provisions;

          return (
            <div key={category.id} className={`rounded-xl border ${category.border} overflow-hidden`}>
              <button
                onClick={() => toggleCat(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 ${category.bg} hover:brightness-95 transition-all`}
              >
                <span className="text-lg">{category.icon}</span>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-black ${category.color}`}>{category.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${category.border} ${category.color} bg-white/60`}>
                      {category.provisions.length} provisions
                    </span>
                    {catResult.gaps > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-200 bg-rose-100 text-rose-700">
                        {catResult.gaps} gap{catResult.gaps === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>
                  {catResult.reviewed > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-full bg-white/70 overflow-hidden">
                        <div className={`h-full rounded-full ${category.barColor}`} style={{ width: `${catResult.pct}%` }} />
                      </div>
                      <span className={`text-[10px] font-black ${category.color}`}>{fmt(catResult.pct, 0)}%</span>
                    </div>
                  )}
                </div>
                <span className={`${category.color} shrink-0`}>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {isOpen && (
                <div>
                  <p className="px-4 py-3 text-xs text-slate-500 leading-relaxed bg-white border-b border-slate-100">
                    {category.summary}
                  </p>
                  <div className="divide-y divide-slate-100">
                    {visible.map((p) => {
                      const status = statuses[p.id] ?? null;
                      return (
                        <div key={p.id} className="p-4 bg-white">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-slate-900">{p.label}</p>
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${SEVERITY_STYLES[p.severity]}`}>
                                  {SEVERITY_LABELS[p.severity]}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
                              {showVermont && p.vermont && (
                                <div className="mt-2 flex items-start gap-1.5 bg-sky-50 border border-sky-200 rounded-lg px-2.5 py-1.5">
                                  <span className="text-[10px] font-black text-sky-600 shrink-0 mt-0.5">VT</span>
                                  <p className="text-[11px] text-sky-700 leading-relaxed">{p.vermont}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-1.5 flex-wrap">
                            {(["ok", "gap", "na"] as Status[]).map((s) => (
                              <button
                                key={s}
                                onClick={() => setStatus(p.id, s)}
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                                  status === s
                                    ? STATUS_STYLES[s] + " font-black"
                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400"
                                }`}
                              >
                                {STATUS_LABELS[s]}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {visible.length === 0 && (
                      <p className="p-4 bg-white text-xs text-slate-400">No critical provisions in this category.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Methodology */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Checklist Methodology</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          {TOTAL_PROVISIONS} provisions across eight categories. The first six — benchmark methodology, attribution
          methodology, quality withhold, risk corridors and stop-loss, carve-outs, and reconciliation timing — are the
          financially consequential categories named in Chapter 7&apos;s APM contract review framework (Figure 7.3). The
          final two, data-sharing and reporting obligations and termination, renewal and governance, cover the
          operational and legal terms that determine whether the first six can be managed or enforced in practice. Each
          provision is marked Confirmed, Gap, or Not Applicable; items marked Not Applicable leave the denominator, so a
          contract with no carve-outs is not penalized for carve-out language it does not contain. Readiness is the share
          of applicable provisions confirmed. Critical provisions — unbounded downside, benchmark construction,
          attribution reproducibility, and data access — override the aggregate score: any open critical gap returns a
          Do Not Sign posture regardless of overall percentage. Vermont notes reference Act 68 reference-based pricing,
          GMCB global budgets, the state HIE, and the small-population problem where they genuinely change the analysis.
          This checklist informs legal and actuarial review; it does not replace it.
        </p>
      </div>
    </div>
  );
}
