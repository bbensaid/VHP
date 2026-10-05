/**
 * The 2026 pillar briefings: one per pillar, in the book's execution sequence.
 * They feed the homepage hero (one slide each) and /briefings/[slug].
 *
 * Citations: write {source-id} after the claim it supports; ids resolve against
 * SOURCES and are numbered per briefing in order of first appearance. A figure
 * without a citation fails scripts/check-briefings.ts.
 *
 * Every claim was checked against the cited text on `asOf`. Book claims cite the
 * chapter; the briefing yields to the book, never the reverse.
 */
import type { PillarId } from "@/lib/taxonomy/pillars";

export interface BriefingFact {
  value: string;
  label: string;
  cite: string[];
}

export interface BriefingSection {
  heading: string;
  paragraphs: string[];
}

export interface Briefing {
  pillar: PillarId;
  slug: string;
  /** ISO date the briefing's facts were last verified. Must stay within 120 days. */
  asOf: string;
  headline: string;
  /** Two sentences for the hero slide, with citations. */
  dek: string;
  facts: [BriefingFact, BriefingFact, BriefingFact];
  /** The discreet hero line, shown after "Is it just?". */
  equityLine: string;
  sections: BriefingSection[];
  chapters: string[];
  courses: { slug: string; title: string }[];
  tools: string[];
  platform: { label: string; href: string }[];
  analystPrompts: string[];
}

export const BRIEFINGS: Briefing[] = [
  // ── 1. POLICY ────────────────────────────────────────────────────────────
  {
    pillar: "policy",
    slug: "medicaid-rulebook-2027",
    asOf: "2026-10-04",
    headline: "The Medicaid rulebook changes on January 1, 2027",
    dek: "CMS's interim final rule makes H.R. 1's work requirement a condition of eligibility in 43 states and DC from January 1, 2027.{cms-ifr} Six-month eligibility checks for expansion adults start the same day, so states have under three months to build both systems.{crs-r48633}",
    facts: [
      { value: "Jan 1, 2027", label: "work requirement and six-month eligibility checks begin", cite: ["cms-ifr", "crs-r48633"] },
      { value: "80 hrs/mo", label: "of work, school, training or service, adults 19–64", cite: ["cms-ifr"] },
      { value: "10M", label: "more people uninsured in 2034 (CBO)", cite: ["ccf-cbo", "kff-911"] },
    ],
    equityLine: "Exemptions exist on paper. Paperwork decides who keeps coverage.",
    sections: [
      {
        heading: "What changes, and when",
        paragraphs: [
          "On June 1, 2026, CMS issued an interim final rule implementing the community engagement provisions of H.R. 1, with comments due July 31, 2026.{aha-ifr} Beginning January 1, 2027, or earlier if a state chooses, non-pregnant adults aged 19 to 64 in the expansion population must show 80 hours a month of work, education, job training, volunteer service or similar activity to keep their coverage.{cms-ifr} Forty-three states and the District of Columbia cover this population and must implement the rule.{cms-ifr}",
          "The same day, a second clock starts. Section 71107 of the law moves eligibility redeterminations for expansion adults from once every 12 months to once every six months beginning January 1, 2027.{crs-r48633} A state that cannot stand up the work requirement in time may ask for a good-faith exemption, but those exemptions cannot be renewed and expire no later than December 31, 2028.{crs-r48633}",
        ],
      },
      {
        heading: "Who is exempt, on paper",
        paragraphs: [
          "The statutory exemptions are broad: former foster youth, American Indians and Alaska Natives, parents and caregivers of a child 13 or under or of a disabled person, veterans with a total disability rating, people who are medically frail, people already meeting SNAP or TANF work rules, people in drug or alcohol treatment, and pregnant or postpartum individuals.{cms-ifr}",
          "The book's point about this rule is not the list. It is the gap between a nominal exemption and the coverage people actually keep once the paperwork arrives twice a year.{book-ch3} An exemption only protects someone who can document it on time.",
        ],
      },
      {
        heading: "The money behind the rule",
        paragraphs: [
          "CBO estimates the law reduces federal Medicaid spending by $911 billion over ten years, net of overlap between provisions, and raises the number of uninsured people by 10 million in 2034.{kff-911}{ccf-cbo} About 7.5 million of that increase comes from the Medicaid and CHIP changes.{ccf-cbo} The cuts are back-loaded: KFF finds roughly three-quarters fall in the second half of the ten-year window.{kff-911}",
          "Provider taxes, a common source of the state share, are frozen and then squeezed. For expansion states the safe-harbor limit falls from 5.5% in FY2028 to 3.5% in FY2032 and after.{crs-r48633}",
        ],
      },
      {
        heading: "Why Policy comes first",
        paragraphs: [
          "Chapter 1 sets the order: Policy, then Technology, Economics, Clinical and Operations.{book-ch1} Policy goes first because it issues authority. This rule shows the same logic running in reverse: a federal mandate now dictates what every state's eligibility system, budget and care model must absorb, whatever its own sequence was.",
        ],
      },
      {
        heading: "The Vermont lens",
        paragraphs: [
          "Vermont's Policy gate has been open since June 2025, when Act 68 made reference-based pricing and global budgets mandatory.{book-ch1} H.R. 1 tests that architecture from outside: the state's transformation plan now has to hold while eligibility rules tighten and federal Medicaid dollars shrink on a schedule Vermont did not set.",
        ],
      },
      {
        heading: "Is it just?",
        paragraphs: [
          "The people most likely to lose coverage are not the ones the rule is aimed at. They are people who qualify for an exemption, or who work, but cannot prove it twice a year: seasonal workers, people without stable addresses, people caring for someone informally. Measure the rule by coverage kept among the eligible, not by enrollment reduced.",
        ],
      },
    ],
    chapters: ["2", "3"],
    courses: [
      { slug: "medicaid-101", title: "Medicaid 101: How America's Safety Net Works" },
      { slug: "medicaid-managed-care-operations", title: "Medicaid Managed Care Operations" },
    ],
    tools: ["hr1-cliff", "medicaid-wr-calculator", "medicaid-eligibility-simulator"],
    platform: [],
    analystPrompts: [
      "Which H.R. 1 exemptions are hardest for enrollees to document, and why?",
      "How do six-month redeterminations change Medicaid churn compared with annual renewals?",
      "What does the provider-tax phase-down mean for an expansion state's budget after FY2028?",
    ],
  },

  // ── 2. TECHNOLOGY ────────────────────────────────────────────────────────
  {
    pillar: "technology",
    slug: "ai-and-the-data-layer",
    asOf: "2026-10-04",
    headline: "AI is arriving faster than the data it runs on",
    dek: "Two randomized trials of ambient AI scribes found real but modest gains.{lukac}{afshar} Everything after scribes, from risk models to automated prior authorization, depends on records that move between systems, and CMS is now pushing networks to make that happen.{cms-interop}",
    facts: [
      { value: "9.5%", label: "less time per note with the better of two scribes; the other showed no significant change", cite: ["lukac"] },
      { value: "0.36 hrs", label: "of note time saved per clinician per day over 24 weeks", cite: ["afshar"] },
      { value: "21", label: "data networks pledged to become CMS Aligned Networks", cite: ["cms-hte-press"] },
    ],
    equityLine: "Who is missing from the records these models learn from?",
    sections: [
      {
        heading: "What the trials actually found",
        paragraphs: [
          "UCLA randomized 238 physicians across 14 specialties to one of two commercial scribes or usual practice, covering about 72,000 encounters from November 2024 to January 2025.{lukac} Physicians using Nabla cut average time per note from 4 minutes 30 seconds to 3 minutes 49 seconds, a 9.5% reduction; the DAX arm's smaller decrease was not statistically significant.{lukac} Both arms showed modest improvements in burnout measures, and physicians reported that AI notes occasionally contained clinically significant inaccuracies.{lukac}",
          "A stepped-wedge trial of 66 practitioners across two states found 0.36 fewer hours a day on notes and a meaningful drop in work exhaustion, but no meaningful gain in professional fulfillment.{afshar} The honest summary: scribes relieve the worst of documentation, and they still need a clinician to check every note.",
        ],
      },
      {
        heading: "From scribes to everything else",
        paragraphs: [
          "Scribes work inside one visit and one record. The uses that change cost and outcomes, such as risk stratification, care-gap closure and prior authorization, need data from many records that today sit in separate systems. That is the book's case for putting Technology before Economics: payment reform layered onto data infrastructure that does not yet exist produces unmeasurable risk, unmanageable contracts and, eventually, collapse.{book-ch1}",
        ],
      },
      {
        heading: "The federal push on the plumbing",
        paragraphs: [
          "In July 2025 more than 60 companies pledged to deliver results in the first quarter of 2026, including 21 networks that committed to meet CMS's Interoperability Framework and seven EHR vendors pledging to replace paper intake forms with digital check-in.{cms-hte-press} The framework asks networks to provide data through FHIR APIs, accept approved digital credentials for patients and providers, and publish their participants and endpoints in the CMS National Provider Directory.{cms-interop}",
        ],
      },
      {
        heading: "The Vermont lens",
        paragraphs: [
          "Vermont's version of this problem is the Unified Health Data Space, which Chapter 4 treats as the vehicle for the state's data-integration mandate.{book-ch4} The chapter's recommendation is blunt: build a second, state-controlled ingestion path so the core data pipeline of a federally matched program does not depend on a single outside intermediary.{book-ch4} The build is partly funded by the Rural Health Transformation Program, which is why Chapter 1 describes Policy as funding and authorizing it.{book-ch1}",
        ],
      },
      {
        heading: "Is it just?",
        paragraphs: [
          "A model can only learn from the people whose care was recorded. Patients who move between systems, who are uninsured for stretches, or who get care where the records never reach an exchange are the ones a model sees least clearly. Before deploying AI on a population, ask who is thinly recorded in it, and check performance for them separately.",
        ],
      },
    ],
    chapters: ["4", "5"],
    courses: [
      { slug: "ai-machine-learning-healthcare", title: "AI & Machine Learning in Healthcare" },
      { slug: "interoperability-data-exchange", title: "Healthcare Interoperability & Data Exchange" },
    ],
    tools: ["ai-governance-lab", "statewide-ehr-lab", "fhir-lab"],
    platform: [{ label: "Vermont's Unified Health Data Space", href: "/vermont-uhds" }],
    analystPrompts: [
      "What governance should a hospital put in place before rolling out ambient AI scribes?",
      "Why does the book put Technology before Economics in the execution sequence?",
      "What would a CMS Aligned Network change for a small rural practice?",
    ],
  },

  // ── 3. ECONOMICS ─────────────────────────────────────────────────────────
  {
    pillar: "economics",
    slug: "hospital-prices-come-down",
    asOf: "2026-10-05",
    headline: "Vermont starts pulling hospital prices down",
    dek: "On September 14 the Green Mountain Care Board cut commercial hospital rates 2.9% statewide for FY2027 and, for the first time, capped how much commercial revenue each hospital may collect.{gmcb-fy27} It is the bridge to Act 68's reference-based pricing, set by rule in 2027 and in force from hospital FY2028.{gmcb-act68-rbp}",
    facts: [
      { value: "−2.9%", label: "commercial reimbursement rates statewide, FY2027", cite: ["gmcb-fy27"] },
      { value: "−4.4%", label: "UVM Medical Center's commercial rates, the largest cut", cite: ["gmcb-fy27"] },
      { value: "~250–300%", label: "of Medicare: what Vermont hospitals charge commercial insurers on average", cite: ["gmcb-act68-rbp"] },
    ],
    equityLine: "If prices fall faster than costs, which services close first, and where?",
    sections: [
      {
        heading: "What the Board decided",
        paragraphs: [
          "The Green Mountain Care Board completed its FY2027 hospital budget review on September 14, 2026, setting budgets for all 14 community hospitals.{gmcb-fy27} Total net patient revenue was set at about $3.8 billion, 1.6% above FY2026, while commercial reimbursement rates fall 2.9% statewide and commercial net patient revenue falls 1.2%, to $1.937 billion.{gmcb-fy27}",
          "The new step is the second number. Alongside prices, the Board set limits on each hospital's total commercial revenue, guided by a 1% reduction, so a hospital cannot make up a lower price with more volume.{gmcb-fy27} UVM Medical Center's commercial rates fall 4.4%, the largest cut; Gifford's fall 3.7% and Rutland Regional's 2.6%.{gmcb-fy27}",
        ],
      },
      {
        heading: "Why prices, and why now",
        paragraphs: [
          "The Board's own analysis shows Vermont hospitals charging commercial insurers roughly 250–300% of Medicare on average, against a break-even of about 136% for an efficient hospital, with wide variation between hospitals for the same service and no relationship to quality.{gmcb-act68-rbp} Higher hospital prices flow straight into premiums, and the Board says its FY2027 decisions were aligned with the hospital costs assumed in its 2027 insurance rate review.{gmcb-fy27}",
          "Act 68 directs the Board to replace case-by-case budget negotiation with reference-based pricing: a maximum price for each service, set as a percentage of Medicare. The methodology is set by rule in 2027 and takes effect in hospital FY2028; FY2027's benchmarks are the transition.{gmcb-act68-rbp} Global hospital budgets follow under the same law.{book-ch1}",
        ],
      },
      {
        heading: "The pushback",
        paragraphs: [
          "Hospitals argue the cuts land on already thin margins. UVM Health's CEO, Stephen Leffler, said the medical center expects to lose roughly $75 million this year and at least that much next year under the approved budget, and the state hospital association warned the decisions would further destabilize hospital finances.{sevendays-fy27}",
          "Both things can be true. Prices far above cost are an affordability problem for every commercially insured Vermonter, and a hospital that loses price without losing cost will cut something. Which is why the sequence matters.",
        ],
      },
      {
        heading: "Why Economics follows Technology",
        paragraphs: [
          "Chapter 1 places Technology before Economics because payment reform needs data to work: a hospital managing to a price ceiling or a global budget has to see its own costs and its population's use in close to real time.{book-ch1} Reference-based pricing tells a hospital what it may charge. Only analytics tell it where it can save without cutting care.",
        ],
      },
      {
        heading: "The Vermont lens",
        paragraphs: [
          "Vermont's Rural Health Transformation award, $195 million for FY2026, is the money meant to fund that efficiency work, from shared services to data infrastructure.{cms-rhtp} The fund ends in FY2030, while nearly two-thirds of H.R. 1's federal Medicaid reductions come after it does.{kff-rhtp} Lower commercial prices, shrinking Medicaid dollars and a time-limited fund all arrive in the same five years.",
        ],
      },
      {
        heading: "Is it just?",
        paragraphs: [
          "Lower prices help the people who pay premiums, and they are the right target when prices sit far above cost. But a hospital that cannot cut cost fast enough cuts services, and the first services to go tend to be the low-volume ones rural communities rely on. Judge the price cuts by what stays open, not only by what gets cheaper.",
        ],
      },
    ],
    chapters: ["6", "7"],
    courses: [
      { slug: "hospital-finance", title: "Hospital Finance" },
      { slug: "value-based-care", title: "Value-Based Care: From Fee-for-Service to Outcomes" },
    ],
    tools: ["hospital-stress-test", "global-budget-modeler", "apm-design-lab"],
    platform: [
      { label: "Vermont Act 68", href: "/vermont-act-68" },
      { label: "Vermont's Rural Health Transformation award", href: "/vermont-rht-program" },
      { label: "The AHEAD Model", href: "/ahead-model" },
    ],
    analystPrompts: [
      "What would reference-based pricing at 200% of Medicare mean for a Vermont hospital's budget?",
      "Why did the Green Mountain Care Board cap commercial revenue as well as prices for FY2027?",
      "Which Vermont hospitals look most exposed to the FY2027 commercial rate cuts in the stress test?",
    ],
  },

  // ── 4. CLINICAL ──────────────────────────────────────────────────────────
  {
    pillar: "clinical",
    slug: "integrated-behavioral-health",
    asOf: "2026-10-04",
    headline: "The evidence for integrated behavioral health is settled. The funding isn't.",
    dek: "Collaborative care beats usual care for depression and anxiety across dozens of randomized trials.{cochrane}{impact} Vermont's Blueprint for Health has 62.2 FTE of behavioral health and community health staff in primary care on pilot money that keeps being extended a year at a time.{ahs-blueprint-2026}",
    facts: [
      { value: "79 trials", label: "24,308 patients in the Cochrane review of collaborative care", cite: ["cochrane"] },
      { value: "45% vs 19%", label: "patients improving at 12 months, collaborative versus usual care (IMPACT)", cite: ["impact"] },
      { value: "62.2 FTE", label: "pilot-funded staff working in Vermont primary care", cite: ["ahs-blueprint-2026"] },
    ],
    equityLine: "Do small rural practices get the same team as large ones?",
    sections: [
      {
        heading: "How strong the evidence is",
        paragraphs: [
          "The 2012 Cochrane review pooled 79 randomized trials with 24,308 participants and found collaborative care improved depression in the short, medium and long term, and anxiety as well.{cochrane} Its authors called it a useful addition to clinical pathways for adults with depression and anxiety.{cochrane}",
          "The trial that set the template, IMPACT, enrolled 1,801 adults aged 60 and over. At 12 months, 45% of patients in collaborative care had at least halved their depressive symptoms, against 19% in usual care.{impact}",
        ],
      },
      {
        heading: "What the model needs",
        paragraphs: [
          "Chapter 8 describes the Collaborative Care Model as the only integrated behavioral health model with designated Medicare billing codes: a behavioral health care manager and a consulting psychiatrist working inside the primary care practice.{book-ch8} Chapter 1 is blunt about what that implies: a care model is a diagram until it has workforce, credentialing, administrative infrastructure and operational management.{book-ch1}",
        ],
      },
      {
        heading: "The Vermont lens",
        paragraphs: [
          "Vermont's Blueprint for Health added a Mental Health Integration pilot to its community health teams in 2023.{ahs-blueprint-2026} As of November 15, 2025, 62.2 FTE positions were providing care with that funding, including 36.2 FTE of community health workers and 21.6 FTE in mental health or substance use care, and 119 practices, 93% of the state's medical homes, had signed on for the pilot's second year.{ahs-blueprint-2026} The program's own report lists, among its 2025 work, extending MHI funding for another year past the pilot.{ahs-blueprint-2026}",
          "That is the gap this slide names. The evidence says the model works; the funding arrives one year at a time.",
        ],
      },
      {
        heading: "Is it just?",
        paragraphs: [
          "A collaborative care team is easier to staff in a large practice than in a two-clinician rural one, and temporary funding makes recruitment harder still. If integration only survives where practices can carry it, the access gap it was meant to close widens. Track who has a team, not just how many teams exist.",
        ],
      },
    ],
    chapters: ["8", "9"],
    courses: [
      { slug: "behavioral-health-integration", title: "Behavioral Health Integration" },
      { slug: "clinical-quality-measurement", title: "Clinical Quality Measurement" },
    ],
    tools: ["vbc-quality-measures", "high-low-value-care", "risk-stratification-methodology"],
    platform: [],
    analystPrompts: [
      "What does a sustainable collaborative care budget look like for a small primary care practice?",
      "How do the collaborative care billing codes work, and what do they leave unfunded?",
      "What did Vermont's Mental Health Integration pilot change in primary care?",
    ],
  },

  // ── 5. OPERATIONS ────────────────────────────────────────────────────────
  {
    pillar: "operations",
    slug: "fourteen-hospital-plans",
    asOf: "2026-10-04",
    headline: "Fourteen hospital plans. No total yet.",
    dek: "Act 68 moved transformation planning to the Agency of Human Services and required at least 2.5% lower hospital spending for FY2026.{gmcb-act68}{ahs-spending-nov2025} All 14 Vermont hospitals have filed plans, and in May the agency said it could not yet add up what they save.{ahs-transform-may2026}{vtdigger-plans}",
    facts: [
      { value: "≥2.5%", label: "hospital spending reduction required for FY2026", cite: ["ahs-spending-nov2025"] },
      { value: "14", label: "hospitals with individual transformation plans", cite: ["ahs-transform-may2026"] },
      { value: "5 of 13", label: "eligible hospitals with signed transformation grants (May 2026)", cite: ["ahs-transform-may2026"] },
    ],
    equityLine: "When services regionalize, who absorbs the longer drive?",
    sections: [
      {
        heading: "What Act 68 asks for",
        paragraphs: [
          "Act 68 of 2025 moved responsibility for statewide transformation planning and coordination to the Agency of Human Services.{gmcb-act68} It also directed the agency to cut hospital spending for hospital fiscal year 2026 by at least 2.5%.{ahs-spending-nov2025} A $2 million grant program, launched September 22, 2025, helps hospitals build their transformation plans.{ahs-transform-may2026}",
        ],
      },
      {
        heading: "What the plans contain",
        paragraphs: [
          "Every one of Vermont's 14 hospitals has now written an individual transformation plan.{ahs-transform-may2026} The agency reports common themes: shared services and collaborative purchasing, care closer to home through telehealth and repatriated services, EHR and interoperability upgrades, and gaps in mental health, maternity, hospice, oncology and specialty care.{ahs-transform-may2026} All 13 eligible hospitals applied for transformation grants; five had signed agreements by May.{ahs-transform-may2026}",
        ],
      },
      {
        heading: "The execution question",
        paragraphs: [
          "Plans are not savings. \"If you look at the plans, those are not numbers and columns that we could total,\" Katelyn Carrell, who leads care transformation for the Agency of Human Services, told VTDigger in May. \"We really want to be able to say how much we think it will end up saving, but we're just not at a place where we could say those kinds of things concretely.\"{vtdigger-plans} That is the Operations pillar's question in its plainest form: is it executable, and can anyone measure whether it was executed?",
          "Chapter 11 treats regionalization as the operational logic of right-sizing a 14-hospital system.{book-ch11} Regionalization is also where the savings are hardest to count, because they depend on volumes moving between hospitals that each report on their own.",
        ],
      },
      {
        heading: "Why Operations comes last, and still matters most",
        paragraphs: [
          "In the book's sequence Operations is fifth because it executes what the other four pillars set up.{book-ch1} It is also where every upstream decision becomes visible. A mandate, a data build, a payment model and a care model all arrive here as staffing, contracts, schedules and reports.",
        ],
      },
      {
        heading: "Is it just?",
        paragraphs: [
          "Moving a service to a regional hub can lower cost per case and raise quality. It also moves the travel burden onto patients, and the patients least able to absorb it are older, poorer and more rural. A regionalization plan should report travel time for the people who lose a local service, next to the savings.",
        ],
      },
    ],
    chapters: ["11", "16"],
    courses: [{ slug: "transformation-leadership", title: "Transformation Leadership" }],
    tools: ["transformation-scorecard", "workforce-modeler", "cin-shared-services"],
    platform: [{ label: "Vermont Act 68", href: "/vermont-act-68" }],
    analystPrompts: [
      "What would it take to turn Vermont's 14 hospital plans into a measurable savings total?",
      "Which shared services offer the fastest operational savings for small rural hospitals?",
      "How should a regionalization plan account for patient travel time?",
    ],
  },
];

export function getBriefing(slug: string): Briefing | undefined {
  return BRIEFINGS.find((b) => b.slug === slug);
}

/** Source ids in order of first citation (dek, facts, then sections). */
export function citationOrder(b: Briefing): string[] {
  const text = [b.dek, ...b.facts.flatMap((f) => f.cite.map((c) => `{${c}}`)), ...b.sections.flatMap((s) => s.paragraphs)].join(" ");
  const ids: string[] = [];
  for (const m of text.matchAll(/\{([a-z0-9-]+)\}/g)) if (!ids.includes(m[1])) ids.push(m[1]);
  return ids;
}
