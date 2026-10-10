// Phase 9 (2026-10-10): enrich Academy lesson `ehr-business-case-roi` from 14 to ≥20 Sanity blocks.
// Author-approved new content. Inserts new blocks (keys p9e*) after existing anchor keys; never
// rewrites or removes the original 14 blocks. Mirrors the full body into Supabase content_blocks
// (fallback) and into the local course JSONs so a re-seed does not revert it.
// DRY RUN unless --commit. Idempotent: aborts if any p9e* key is already present.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dir, "../..");
const env = fs.readFileSync(path.join(__dir, "../.env.local"), "utf8");
for (const l of env.split("\n")) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const PID = "fxz10xl7", DOC = "ehr-business-case-roi", TOKEN = process.env.SANITY_API_TOKEN;
const COMMIT = process.argv.includes("--commit");
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ── helpers ───────────────────────────────────────────────────────────────────
const span = (k, text, marks = []) => ({ _key: `${k}s`, _type: "span", text, marks });
const p = (k, text) => ({ _key: k, _type: "block", style: "normal", markDefs: [], children: [span(k, text)] });
const h = (k, text, style) => ({ _key: k, _type: "block", style, markDefs: [], children: [span(k, text)] });
const table = (k, title, rows) => ({ _key: k, _type: "code", title, language: "json", code: JSON.stringify(rows, null, 2) });

// ── sources (lesson source format: "[n] Publisher — Title — URL — note") ─────
const SRC = {
  gmcb2018: "[1] Green Mountain Care Board — Statement of Decision and Order, In re: Application of University of Vermont Medical Center, Replacement of Electronic Health Record, Docket GMCB-001-17con (Jan. 5, 2018) — https://gmcboard.vermont.gov/sites/gmcb/files/files/certificate-need/GMCB%20001-17con%20Decision.pdf — Findings ¶15 ($200M legacy alternative), ¶¶26–29 (TCO $151.7M; capital $109,254,817 incl. 9.9% contingency; net opex $42,438,386 after $12.4M legacy and $31.0M staffing offsets; component-by-year table), ¶¶37–38 (Deloitte sensitivity analysis).",
  gmcb2020: "[2] Green Mountain Care Board — Statement of Decision and Order Approving Expansion of EHR System to Alice Hyde Medical Center and Elizabethtown Community Hospital, Docket GMCB-001-17con (Apr. 30, 2020) — https://gmcboard.vermont.gov/sites/gmcb/files/CON/2020.04.30_SOD%20Approving%20Epic%20Expansion.pdf — Wave 1 go-live at UVMMC Nov. 9, 2019 (¶8); ~$30M standalone vs. ~$9.5M (33%) avoided by joining Wave 3 (¶22); combined project cost $171,494,273, or $174,586,254 with $3.1M capitalized interest.",
  fleming2011: "[3] Fleming NS, Culler SD, McCorkle R, Becker ER, Ballard DJ — The financial and nonfinancial costs of implementing electronic health records in primary care practices, Health Affairs 2011;30(3):481–489, doi:10.1377/hlthaff.2010.0768 — https://pubmed.ncbi.nlm.nih.gov/21383367/ — 26 primary care practices (Baylor HealthTexas network): ~$162,000 implementation and $85,500 first-year maintenance for an average five-physician practice; 611 implementation-team hours; 134 end-user hours per physician.",
  fleming2014: "[4] Fleming NS, Becker ER, Culler SD, et al. — The impact of electronic health records on workflow and financial measures in primary care practices, Health Services Research 2014;49(1 Pt 2):405–420 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3925410/ — interrupted time series, same 26 practices: staffing +3% and practice expenses +6% after 12 months; productivity, volume and net income fell initially and recovered to or near pre-implementation levels after 12 months.",
  wang2003: "[5] Wang SJ, Middleton B, Prosser LA, et al. — A cost-benefit analysis of electronic medical records in primary care, American Journal of Medicine 2003;114(5):397–403 — https://pubmed.ncbi.nlm.nih.gov/12714130/ — modeled five-year net benefit of $86,400 per primary care provider; one-way range $8,400–$140,100; five-way range $2,300 net cost to $330,900 net benefit.",
  adler2013: "[6] Adler-Milstein J, Green CE, Bates DW — A survey analysis suggests that electronic health records will yield revenue gains for some practices and losses for many, Health Affairs 2013;32(3):562–570 — https://pubmed.ncbi.nlm.nih.gov/23459736/ — 49 Massachusetts eHealth Collaborative practices: average physician loses $43,743 over five years; 27% positive ROI; +14% more with the $44,000 meaningful-use incentive.",
  ida2022: "[7] Institute for Defense Analyses (Brian Q. Rieksts) — Written testimony, Senate Appropriations Subcommittee on Military Construction and Veterans Affairs, \"VA's Electronic Health Record Modernization: An Update on Rollout, Cost, and Schedule\" (Sept. 21, 2022) — https://www.appropriations.senate.gov/imo/media/doc/IDA%20Written%20Testimony%20for%20Sep%2021%202022.pdf — LCCE $49.8B (FY2022$): $32.7B/13-yr implementation + $17.1B/15-yr sustainment; 20–80% range $46–54B; vs. VA 2019 estimate $16.1B; sustainment and rollout productivity loss excluded by VA; $25.9B of added elements ≈75% of the difference.",
  gao2025: "[8] U.S. Government Accountability Office — GAO-25-106874, Electronic Health Records: VA Making Incremental Improvements in New System but Needs Updated Cost Estimate and Schedule (Mar. 12, 2025) — https://files.gao.gov/reports/GAO-25-106874/index.html — independently restates IDA's $49.8B life-cycle estimate and VA's January 2019 estimate of about $16.1B.",
  lab: "[9] HTR Research Lab — EMR/EHR Lab, Adoption & Cost mode — /research-lab/interoperability?tab=emr&mode=cost — model used for the worked example: per-provider implementation and annual cost anchors by vendor, $2,400/provider/yr training, 25% peak go-live dip with linear recovery, benefit ramping to 4% of clinical revenue by Year 2. Illustrative planning anchors, not vendor quotes.",
};

// ── new blocks, keyed by the existing block they follow ──────────────────────
const AFTER = {
  // after "Total cost of ownership has four parts..." (cost components)
  emqeliinu10: [
    { _key: "p9e01", _type: "exampleBlock", eyebrow: "Vermont Case Study",
      title: "UVM Health Network's Epic certificate of need: what a $151.7 million TCO is made of",
      content: [
        "In 2017 the University of Vermont Medical Center asked the Green Mountain Care Board for a certificate of need to replace the EHR and related IT systems at four UVM Health Network hospitals — UVM Medical Center, Central Vermont Medical Center, Porter Medical Center and Champlain Valley Physicians Hospital — with a single Epic platform. Because Vermont subjects hospital capital spending above $3 million to CON review, the whole cost model went on the public record.",
        "The applicant estimated a total cost of ownership of about $151.7 million over six years: $109.3 million of capital (including a 9.9% contingency) and $42.4 million of net operating expense. The operating figure is already net of two offsets — $12.4 million for legacy systems Epic would retire and $31.0 million in staffing offsets — which is how a business case shows avoided cost explicitly instead of leaving it implicit.",
        "The comparison the applicant drew was not Epic versus zero: it estimated that updating, maintaining and replacing the existing legacy systems could cost up to $200 million over the same six years. The Board's own consultant, Deloitte, stress-tested the plan with a contingency twice as large as budgeted, volume growth beyond management projections and savings that were not fully realized, and concluded the network could absorb the project while keeping an A credit rating.",
      ].join("\n"),
      outcome: "The Board approved the project on January 5, 2018 (Docket GMCB-001-17con) with conditions including six-month implementation reports carrying detailed financial information. Wave 1 went live at UVM Medical Center on November 9, 2019. A 2020 amendment adding Alice Hyde and Elizabethtown raised the combined project cost to $171.5 million ($174.6 million with capitalized interest); the Board found that folding them into Wave 3 avoided about $9.5 million (33%) against a roughly $30 million standalone implementation.",
      source: "Green Mountain Care Board, Statement of Decision and Order, Docket GMCB-001-17con (Jan. 5, 2018) and Statement of Decision approving the Epic expansion (Apr. 30, 2020) — see Sources [1], [2]." },
    table("p9e02", "UVMHN Epic project — capital cost by component, FY17–FY22 (GMCB-001-17con, Finding ¶28)", [
      { Component: "External staffing (incl. $1.46M pre-implementation)", Capital: "$37,843,280", "Share of pre-contingency capital": "38.1%" },
      { Component: "Epic implementation services & travel", Capital: "$15,241,619", "Share of pre-contingency capital": "15.3%" },
      { Component: "Epic software", Capital: "$14,361,500", "Share of pre-contingency capital": "14.4%" },
      { Component: "UVMHN internal staffing", Capital: "$11,800,641", "Share of pre-contingency capital": "11.9%" },
      { Component: "Epic-related technology (hardware, network, integration, conversion)", Capital: "$11,147,093", "Share of pre-contingency capital": "11.2%" },
      { Component: "Network-related technology", Capital: "$5,159,047", "Share of pre-contingency capital": "5.2%" },
      { Component: "Required third-party software", Capital: "$2,661,746", "Share of pre-contingency capital": "2.7%" },
      { Component: "Facilities, communications & travel", Capital: "$1,215,145", "Share of pre-contingency capital": "1.2%" },
      { Component: "Total before contingency", Capital: "$99,430,071", "Share of pre-contingency capital": "100%" },
      { Component: "Contingency (9.9%)", Capital: "$9,824,746", "Share of pre-contingency capital": "—" },
      { Component: "Grand total capital", Capital: "$109,254,817", "Share of pre-contingency capital": "—" },
    ]),
    p("p9e03", "Read the table for its proportions, not its total. The Epic software line is about one-seventh of capital. People — outside consultants, Epic's own implementation services and UVMHN's internal team — account for about 65% of it ($64.9 million of $99.4 million). The Board called the roughly 10% contingency \"standard and customary for Epic implementation projects of similar size and scope.\" A business case that starts from the vendor's licence quote and adds a margin is therefore starting from the smallest of its big numbers."),
  ],
  // after "During the weeks around go-live..." (productivity dip)
  emqeliinu14: [
    { _key: "p9e04", _type: "statGrid", title: "What practice-level evidence shows about implementation cost and the dip", stats: [
      { _key: "p9e04a", value: "$162,000", label: "Implementation cost, average five-physician practice", context: "Plus $85,500 of maintenance in the first year. 26 primary care practices in the Baylor HealthTexas network. Source: Fleming et al., Health Affairs 2011" },
      { _key: "p9e04b", value: "134 hrs", label: "End-user preparation time per physician", context: "Physicians, clinical and non-clinical staff, before using the EHR in encounters; implementation teams needed another 611 hours on average. Source: Fleming et al., Health Affairs 2011" },
      { _key: "p9e04c", value: "~12 mo", label: "Time for productivity and net income to recover", context: "Productivity, visit volume and net income fell after go-live and returned to or near pre-implementation levels after 12 months. Source: Fleming et al., Health Services Research 2014" },
      { _key: "p9e04d", value: "+6%", label: "Practice expenses 12 months after go-live", context: "Staffing rose 3% and practice expenses 6% relative to before implementation. Source: Fleming et al., Health Services Research 2014" },
    ] },
    p("p9e05", "The ~25% peak-dip figure is a planning convention, not a measured constant. The Baylor data support its shape — a fall followed by recovery to or near baseline within about a year — but not a specific depth. They also add something the dip alone hides: expenses did not fall back. Staffing and practice expenses were still higher 12 months after go-live, so \"recovery\" meant productivity came back, not that the cost base returned to where it was."),
    { _key: "p9e06", _type: "warningBlock", title: "The cost line most business cases leave out",
      message: "In 2022 the Department of Veterans Affairs asked the Institute for Defense Analyses (IDA) for an independent life-cycle cost estimate of its EHR Modernization program. IDA put it at $49.8 billion in constant FY2022 dollars — $32.7 billion over 13 years of implementation plus $17.1 billion over 15 years of sustainment — against VA's 2019 program-office estimate of $16.1 billion. About 75 percent of the gap came from cost elements VA's estimate did not include: sustainment, and productivity loss during rollout, which IDA costed as the supplemental staffing and extra community care needed to cover disrupted facilities, plus the revenue lost to the disruption. IDA called deployment productivity loss \"a cost element with substantial risk.\" At any scale the lesson is the same: a business case that prices the licence and the consultants but not the go-live disruption is not conservative — it is incomplete. (The EHR Market Landscape module covers the VA–Oracle Health contract itself.)" },
  ],
  // after "A defensible model phases the benefit stream..." (5-year ROI)
  emqeliinu18: [
    { _key: "p9e07", _type: "comparisonBlock", title: "Modeled vs. surveyed five-year EHR returns: two landmark studies",
      left: { label: "Modeled — Wang et al., Am J Med 2003", points: [
        "Method: cost-benefit model of an ambulatory EMR in primary care, from the health system's perspective (Partners HealthCare data plus published literature)",
        "Five-year result: estimated net benefit of $86,400 per primary care provider",
        "What drove it: savings on drug spending, better use of radiology tests, better charge capture and fewer billing errors",
        "Spread: most sensitive to the share of capitated patients; the five-way sensitivity range ran from a $2,300 net cost to a $330,900 net benefit",
      ] },
      right: { label: "Surveyed — Adler-Milstein et al., Health Affairs 2013", points: [
        "Method: survey data from 49 community practices in the Massachusetts eHealth Collaborative pilot, projected to five-year ROI",
        "Five-year result: the average physician would lose $43,743",
        "What drove it: practices that came out ahead used the EHR to raise revenue — more patients per day, fewer rejected claims, more accurate coding",
        "Spread: only 27% reached positive ROI; the $44,000 meaningful-use incentive would have pushed just 14% more over the line, and almost half never captured paper savings because they kept paper records",
      ] } },
    p("p9e08", "The gap between the two studies is the gap between a benefit that is available and a benefit that is captured. Wang's model assumes the organization does the things that produce savings; the Massachusetts practices often did not. The EMR/EHR Lab's 4% steady-state benefit is that same kind of capture assumption — treat it as the number you will have to defend, not as a given."),
    h("p9e09", "Worked example: the Lab's default scenario", "h3"),
    p("p9e10", "Open the Adoption & Cost mode with its defaults — Epic selected, 50 provider FTEs, a 12-month go-live window and $550,000 of clinical revenue per provider. The model produces implementation of $1.55 million (50 × $31,000), training of $120,000, annual licence and support of $490,000 (50 × $9,800), and a go-live productivity loss of about $3.44 million: a 25% peak dip recovering linearly averages 12.5% of the year's $27.5 million clinical revenue. Year-one cost is $5.6 million, and the productivity loss alone is 61% of it."),
    table("p9e11", "EMR/EHR Lab defaults — Epic, 50 providers, 12-month go-live, $550K revenue/provider", [
      { Year: "Year 1", Cost: "$5,597,500", "Modeled benefit": "$550,000", "Cumulative net": "−$5,047,500" },
      { Year: "Year 2", Cost: "$490,000", "Modeled benefit": "$1,100,000", "Cumulative net": "−$4,437,500" },
      { Year: "Year 3", Cost: "$490,000", "Modeled benefit": "$1,100,000", "Cumulative net": "−$3,827,500" },
      { Year: "Year 4", Cost: "$490,000", "Modeled benefit": "$1,100,000", "Cumulative net": "−$3,217,500" },
      { Year: "Year 5", Cost: "$490,000", "Modeled benefit": "$1,100,000", "Cumulative net": "−$2,607,500" },
    ]),
    p("p9e12", "On these assumptions the investment does not break even within five years, and the Lab says so. The reason is structural: at steady state the benefit ($1.1 million a year) exceeds licence cost by only $610,000, so recovering a $5.05 million year-one deficit takes more than eight years. Now pull the levers. Cutting the go-live window to 6 months halves the productivity loss to about $1.72 million, yet Epic still ends Year 5 $828,750 short. Switch to athenahealth with the same 6-month window and the model breaks even in Year 5; at 3 months it breaks even in Year 4. These vendor figures are illustrative anchors, not quotes — the point is that the go-live plan moves break-even as much as the vendor's price does."),
    { _key: "p9e13", _type: "stepBlock", title: "Building a defensible EHR business case", steps: [
      { _key: "p9e13a", number: 1, title: "Price the full TCO, not the licence", description: "Include implementation services, internal and external staffing, hardware and network, training and third-party software. In UVM Health Network's filing, Epic software was about 14% of pre-contingency capital; staffing and implementation services were about 65%." },
      { _key: "p9e13b", number: 2, title: "Carry an explicit contingency and a range", description: "The Board found UVMHN's ~9.9% contingency standard for Epic projects of that size. IDA reported a $46–54 billion 20th–80th percentile range around its VA point estimate rather than a single number." },
      { _key: "p9e13c", number: 3, title: "Cost the go-live disruption as a line item", description: "Model the productivity dip, backfill staffing and lost revenue. It was among the elements missing from VA's 2019 estimate, and it is the largest single year-one cost in the Lab's default scenario." },
      { _key: "p9e13d", number: 4, title: "Count only the offsets you will actually realize", description: "Retired legacy systems and staffing changes belong in the model as negative costs — UVMHN booked $12.4 million and $31.0 million — but only if the old systems are actually switched off. Nearly half of the Massachusetts practices kept paper and never realized paper savings." },
      { _key: "p9e13e", number: 5, title: "Name the behaviors that produce each benefit", description: "Revenue-side gains — visit throughput, fewer rejected claims, more accurate coding — separated positive-ROI practices from negative ones. Give each benefit stream an owner and a metric." },
      { _key: "p9e13f", number: 6, title: "Compare against standing still, then stress-test", description: "Benchmark against the do-nothing alternative (UVMHN's estimate of up to $200 million to keep its legacy systems) and run downside cases on contingency, volume and savings shortfall, as the Board's consultant did." },
    ] },
  ],
  // after "The EHR decision is a financial model..." (What to take away)
  emqeliinu1c: [
    { _key: "p9e14", _type: "takeawayBlock", title: "Key Takeaways", points: [
      "Software licences are a minority of EHR cost: in UVM Health Network's public CON filing, Epic software was about 14% of $99.4 million in pre-contingency capital, while implementation services and staffing were about 65%.",
      "Go-live productivity loss is a real, budgetable cost. IDA's independent VA estimate included it, with sustainment; VA's 2019 estimate did not — and those added elements explained about 75% of the gap between $16.1 billion and $49.8 billion.",
      "At practice level, productivity and net income dipped and recovered to or near baseline in about 12 months, but practice expenses stayed about 6% higher (Fleming et al., 2014).",
      "ROI depends on capture, not installation: a modeled $86,400 five-year net benefit per provider (Wang et al., 2003) sits beside an average $43,743 five-year loss and only 27% positive-ROI practices in Massachusetts (Adler-Milstein et al., 2013).",
      "In the EMR/EHR Lab's default scenario the go-live timeline moves break-even as much as vendor price does — test it as a lever, not a given.",
    ] },
    { _key: "p9e15", _type: "knowledgeCheck",
      question: "In the Institute for Defense Analyses' 2022 independent estimate for VA's EHR Modernization program ($49.8 billion), what accounted for about 75% of the difference from VA's 2019 estimate of $16.1 billion?",
      options: [
        { _key: "p9e15a", text: "Higher Oracle Health software licence fees than VA had negotiated", isCorrect: false },
        { _key: "p9e15b", text: "Cost elements VA's estimate left out — chiefly sustainment and productivity loss during rollout", isCorrect: true },
        { _key: "p9e15c", text: "Converting VA's figure from nominal dollars to constant FY2022 dollars", isCorrect: false },
        { _key: "p9e15d", text: "The cost of continuing to run the legacy VistA system in parallel", isCorrect: false },
      ],
      explanation: "IDA's estimate added about $25.9 billion of elements beyond the scope of VA's estimate — sustainment over 15 years and productivity loss during rollout (supplemental staffing, extra community care and lost revenue) — and IDA said these account for about 75% of the difference. Both figures were stated in constant FY2022 dollars, and IDA explicitly excluded the cost of, and savings from, legacy EHR systems." },
    h("p9e16", "Sources", "h2"),
    p("p9e17", SRC.gmcb2018),
    p("p9e18", SRC.gmcb2020),
    p("p9e19", SRC.fleming2011),
    p("p9e20", SRC.fleming2014),
    p("p9e21", SRC.wang2003),
    p("p9e22", SRC.adler2013),
    p("p9e23", SRC.ida2022),
    p("p9e24", SRC.gao2025),
    p("p9e25", SRC.lab),
  ],
};

// sources cited per new block, for the ledger
const CITES = { p9e01: ["gmcb2018", "gmcb2020"], p9e02: ["gmcb2018"], p9e03: ["gmcb2018"], p9e04: ["fleming2011", "fleming2014"], p9e05: ["fleming2014", "lab"], p9e06: ["ida2022", "gao2025"], p9e07: ["wang2003", "adler2013"], p9e08: ["wang2003", "adler2013", "lab"], p9e09: ["lab"], p9e10: ["lab"], p9e11: ["lab"], p9e12: ["lab"], p9e13: ["gmcb2018", "ida2022", "adler2013", "lab"], p9e14: ["gmcb2018", "ida2022", "fleming2014", "wang2003", "adler2013", "lab"], p9e15: ["ida2022"] };

// ── Sanity → Supabase fallback conversion (full body) ─────────────────────────
const txt = (b) => (b.children || []).map((c) => c.text).join("");
const mdTable = (rows) => { const hs = Object.keys(rows[0]); return [`| ${hs.join(" | ")} |`, `| ${hs.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${hs.map((k) => r[k]).join(" | ")} |`)].join("\n"); };
function toFallback(body) {
  const out = []; let cur = null;
  const flush = () => { if (cur && cur.parts.length) out.push({ type: "text", ...(cur.heading ? { heading: cur.heading } : {}), body: cur.parts.join("\n\n") }); cur = null; };
  const ensure = () => { if (!cur) cur = { heading: null, parts: [] }; };
  for (const b of body) {
    if (b._type === "block" && b.style === "h2") { flush(); cur = { heading: txt(b), parts: [] }; continue; }
    if (b._type === "block" && b.style === "h3") { ensure(); cur.parts.push(`### ${txt(b)}`); continue; }
    if (b._type === "block") { ensure(); const md = b.markDefs?.find((m) => m._type === "link"); cur.parts.push(md ? `[${txt(b)}](${md.href})` : txt(b)); continue; }
    if (b._type === "code") { ensure(); cur.parts.push(`**${b.title}**\n\n${mdTable(JSON.parse(b.code))}`); continue; }
    flush();
    if (b._type === "statGrid") out.push({ type: "key_stat", heading: b.title, stats: b.stats.map((s) => ({ value: s.value, label: s.label, source: s.context })) });
    else if (b._type === "exampleBlock") out.push({ type: "callout", variant: "info", heading: `${b.eyebrow}: ${b.title}`, body: `${b.content.split("\n").join("\n\n")}\n\n**Outcome:** ${b.outcome}\n\n*Source: ${b.source}*` });
    else if (b._type === "warningBlock") out.push({ type: "callout", variant: "warning", heading: b.title, body: b.message });
    else if (b._type === "comparisonBlock") out.push({ type: "comparison_table", heading: b.title, leftLabel: b.left.label, rightLabel: b.right.label, rows: b.left.points.map((lp, i) => { const [label, l] = lp.split(/:\s(.+)/s); return { label, left: l, right: b.right.points[i].split(/:\s(.+)/s)[1] }; }) });
    else if (b._type === "stepBlock") out.push({ type: "text", heading: b.title, body: b.steps.map((s) => `${s.number}. **${s.title}.** ${s.description}`).join("\n") });
    else if (b._type === "takeawayBlock") out.push({ type: "callout", variant: "success", heading: b.title, body: b.points.map((x) => `- ${x}`).join("\n") });
    else if (b._type === "knowledgeCheck") out.push({ type: "callout", variant: "tip", heading: "Check your understanding", body: `${b.question}\n\n**Answer:** ${b.options.find((o) => o.isCorrect).text}. ${b.explanation}` });
    else throw new Error(`no fallback mapping for ${b._type}`);
  }
  flush();
  return out;
}

// ── run ───────────────────────────────────────────────────────────────────────
const q = encodeURIComponent(`*[_id=="${DOC}"][0]`);
const doc = (await (await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } })).json()).result;
if (!doc) throw new Error("doc missing");
if (doc.body.some((b) => b._key.startsWith("p9e"))) { console.error("ABORT: p9e blocks already present"); process.exit(1); }
const newBody = [];
for (const b of doc.body) { newBody.push(b); if (AFTER[b._key]) newBody.push(...AFTER[b._key]); }
const added = newBody.length - doc.body.length;
const expectAdded = Object.values(AFTER).flat().length;
if (added !== expectAdded) throw new Error(`anchor missing: added ${added} of ${expectAdded}`);
const keys = newBody.map((b) => b._key); if (new Set(keys).size !== keys.length) throw new Error("duplicate _key");
const orig = doc.body.map((b) => JSON.stringify(b)); const kept = newBody.filter((b) => !b._key.startsWith("p9e")).map((b) => JSON.stringify(b));
if (JSON.stringify(orig) !== JSON.stringify(kept)) throw new Error("original blocks altered");
const fallback = toFallback(newBody);
console.log(`rev ${doc._rev}: ${doc.body.length} → ${newBody.length} blocks (+${added}); fallback content_blocks: ${fallback.length} [${fallback.map((f) => f.type).join(", ")}]`);
if (process.argv.includes("--debug")) console.log(JSON.stringify(fallback, null, 1));

// local JSON lesson record
const { data: row, error: rowErr } = await db.from("lessons").select("*").eq("slug", DOC).single();
if (rowErr) throw rowErr;
const lessonJson = {
  id: "lesson_ehr_business_case_roi", trackId: "track_ehr_integration", pillar: row.pillar, order: row.order, slug: DOC,
  title: row.title, summary: row.summary, estimatedMinutes: row.estimated_minutes, isPublished: true,
  tags: row.tags ?? [], relatedLessonIds: [], createdAt: row.created_at, updatedAt: new Date().toISOString(),
  objectives: row.objectives, contentBlocks: fallback,
};
const jsonFiles = ["content/course_interoperability.json", "content/courses_tier2.json"].map((f) => path.join(__dir, "..", f));
const patchedJson = jsonFiles.map((f) => {
  const data = JSON.parse(fs.readFileSync(f, "utf8"));
  const course = Array.isArray(data) ? data.find((c) => c.slug === "interoperability-data-exchange") : data;
  const track = course.tracks.find((t) => t.slug === "ehr-integration");
  const i = track.lessons.findIndex((l) => l.slug === DOC);
  if (i >= 0) track.lessons[i] = { ...track.lessons[i], ...lessonJson }; else track.lessons.push(lessonJson);
  track.lessons.sort((a, b) => a.order - b.order);
  return [f, data, track.trackId ?? track.id];
});
for (const [f, , tid] of patchedJson) console.log(`  JSON ${path.basename(f)}: ehr-integration track (${tid}) → lesson order ${row.order}`);

if (!COMMIT) { console.log("DRY RUN — re-run with --commit"); process.exit(0); }

const mut = await (await fetch(`https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`, {
  method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations: [{ patch: { id: DOC, ifRevisionID: doc._rev, set: { body: newBody } } }] }),
})).json();
if (!mut.results) { console.error("Sanity ERR", JSON.stringify(mut)); process.exit(1); }
console.log("Sanity patched:", mut.transactionId);

const { error: upErr } = await db.from("lessons").update({ content_blocks: fallback, sanity_slug: DOC, updated_at: new Date().toISOString() }).eq("id", row.id);
if (upErr) { console.error("Supabase ERR", upErr); process.exit(1); }
console.log("Supabase content_blocks updated; sanity_slug =", DOC);

for (const [f, data] of patchedJson) fs.writeFileSync(f, JSON.stringify(data, null, 2) + "\n");
console.log("Local JSON written");

const SUMMARY = { p9e01: "Vermont case study: UVMHN Epic CON — $151.7M TCO, capital/opex split, offsets, $200M do-nothing comparison, Deloitte stress test, approval, Wave 1 go-live, 2020 expansion", p9e02: "Table: UVMHN Epic capital cost by component with share of pre-contingency capital", p9e03: "Interpretation: software ~1/7 of capital, people ~65%; ~10% contingency standard", p9e04: "Stat grid: Fleming 2011 implementation cost/hours; Fleming 2014 recovery ~12 months, expenses +6%", p9e05: "Paragraph: 25% dip is a planning convention; evidence supports shape, expenses stay higher", p9e06: "Warning: VA/IDA estimate — omitted sustainment and rollout productivity loss explain ~75% of $16.1B→$49.8B gap", p9e07: "Comparison: Wang 2003 modeled +$86,400/provider vs Adler-Milstein 2013 surveyed −$43,743, 27% positive ROI", p9e08: "Paragraph: available vs captured benefit; Lab 4% is a capture assumption", p9e09: "h3: Worked example heading", p9e10: "Worked example inputs and year-one cost from Lab defaults (Epic, 50 FTE, 12 mo, $550K)", p9e11: "Table: Lab default five-year cost/benefit/cumulative net", p9e12: "Worked example levers: no break-even; 6-mo Epic; athenahealth 6-mo Y5, 3-mo Y4", p9e13: "Step block: six steps for a defensible EHR business case", p9e14: "Key takeaways (5)", p9e15: "Knowledge check on IDA vs VA estimate gap", p9e16: "Sources heading" };
const ledger = path.join(ROOT, "docs/audits/phase9_ehr_lesson_2026-10.jsonl");
const lines = Object.values(AFTER).flat().map((b) => {
  const k = b._key; const srcKeys = CITES[k] || [];
  const summary = SUMMARY[k] || `Source entry: ${txt(b).slice(0, 90)}`;
  const sources = srcKeys.length ? srcKeys.map((s) => SRC[s].split(" — ").slice(0, 3).join(" — ")) : [txt(b).split(" — ")[2] || ""];
  return JSON.stringify({ phase: "9", date: "2026-10-10", doc: `sanity academyModule ${DOC}`, block_key: k, type: b._type === "block" ? `block/${b.style}` : b._type, summary, sources });
});
fs.appendFileSync(ledger, lines.join("\n") + "\n");
console.log(`Ledger: ${lines.length} lines → ${ledger}`);
