/**
 * Every source cited by the homepage hero and the /briefings pages.
 *
 * Rule (author, 2026-10-04): every figure carries a source, always. Each entry
 * below was opened and the cited figure confirmed in the document's own text on
 * the `checked` date — not from a search snippet. Where a primary paper could not
 * be fetched directly, `url` points to the summary that was read and `doi`
 * identifies the paper itself.
 *
 * Book entries link to the chapter anchor on /book. The platform defers to the
 * book: a briefing may cite it, never contradict it.
 */

export interface Source {
  id: string;
  /** Publisher or author, as it should read in a citation line. */
  publisher: string;
  title: string;
  /** Publication date as printed by the source (free text: "29 Dec 2025"). */
  date: string;
  url: string;
  doi?: string;
  /** ISO date the figure was confirmed in the source text. */
  checked: string;
}

export const SOURCES: Record<string, Source> = {
  // ── Policy ────────────────────────────────────────────────────────────────
  "cms-ifr": {
    id: "cms-ifr",
    publisher: "Centers for Medicare & Medicaid Services",
    title: "Medicaid Community Engagement Requirement for Certain Individuals Interim Final Rule with Comment Period (CMS-2454-IFC), fact sheet",
    date: "June 2026",
    url: "https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms",
    checked: "2026-10-04",
  },
  "aha-ifr": {
    id: "aha-ifr",
    publisher: "American Hospital Association",
    title: "CMS issues interim final rule on Medicaid community engagement requirements",
    date: "1 June 2026",
    url: "https://www.aha.org/news/headline/2026-06-01-cms-issues-interim-final-rule-medicaid-community-engagement-requirements",
    checked: "2026-10-04",
  },
  "crs-r48633": {
    id: "crs-r48633",
    publisher: "Congressional Research Service",
    title: "Health Provisions in P.L. 119-21, the FY2025 Reconciliation Law (R48633)",
    date: "2025",
    url: "https://www.everycrsreport.com/reports/R48633.html",
    checked: "2026-10-04",
  },
  "kff-911": {
    id: "kff-911",
    publisher: "KFF",
    title: "Allocating CBO's Estimates of Federal Medicaid Spending Reductions Across the States: Enacted Reconciliation Package",
    date: "23 July 2025",
    url: "https://www.kff.org/medicaid/issue-brief/allocating-cbos-estimates-of-federal-medicaid-spending-reductions-across-the-states-enacted-reconciliation-package/",
    checked: "2026-10-04",
  },
  "ccf-cbo": {
    id: "ccf-cbo",
    publisher: "Georgetown University Center for Children and Families",
    title: "New CBO Health Coverage Estimates of Budget Reconciliation Law",
    date: "14 August 2025",
    url: "https://ccf.georgetown.edu/2025/08/14/new-cbo-health-coverage-estimates-of-budget-reconciliation-law/",
    checked: "2026-10-04",
  },

  "kff-rhtp": {
    id: "kff-rhtp",
    publisher: "KFF",
    title: "A Closer Look at the $50 Billion Rural Health Transformation Program",
    date: "September 2025",
    url: "https://www.kff.org/medicaid/a-closer-look-at-the-50-billion-rural-health-transformation-program/",
    checked: "2026-10-04",
  },

  // ── Technology ────────────────────────────────────────────────────────────
  lukac: {
    id: "lukac",
    publisher: "Lukac PJ, et al. NEJM AI (summary: UCLA Health)",
    title: "Ambient AI Scribes in Clinical Practice: A Randomized Trial",
    date: "26 November 2025",
    url: "https://www.uclahealth.org/news/release/ucla-study-finds-ai-scribes-may-reduce-documentation-time",
    doi: "10.1056/AIoa2501000",
    checked: "2026-10-04",
  },
  afshar: {
    id: "afshar",
    publisher: "Afshar M, Baumann MR, Resnik F, et al. NEJM AI (summary: Consultant360)",
    title: "A pragmatic randomized controlled trial of ambient artificial intelligence to improve health practitioner well-being",
    date: "2025",
    url: "https://www.consultant360.com/exclusive/ambient-ai-scribes-linked-lower-work-exhaustion-multistate-pragmatic-trial",
    doi: "10.1056/AIoa2500945",
    checked: "2026-10-04",
  },
  "cms-hte-press": {
    id: "cms-hte-press",
    publisher: "Centers for Medicare & Medicaid Services",
    title: "White House, tech leaders commit to create patient-centric healthcare ecosystem (press release)",
    date: "30 July 2025",
    url: "https://www.cms.gov/newsroom/press-releases/white-house-tech-leaders-commit-create-patient-centric-healthcare-ecosystem",
    checked: "2026-10-04",
  },
  "cms-interop": {
    id: "cms-interop",
    publisher: "Centers for Medicare & Medicaid Services",
    title: "Health Technology Ecosystem: Interoperability Framework",
    date: "2026",
    url: "https://www.cms.gov/initiatives/health-technology-ecosystem/overview/interoperability-framework",
    checked: "2026-10-04",
  },

  // ── Economics ─────────────────────────────────────────────────────────────
  "cms-rhtp": {
    id: "cms-rhtp",
    publisher: "Centers for Medicare & Medicaid Services",
    title: "CMS Announces $50 Billion in Awards to Strengthen Rural Health in All 50 States (press release)",
    date: "29 December 2025",
    url: "https://cms.gov/newsroom/press-releases/cms-announces-50-billion-awards-strengthen-rural-health-all-50-states",
    checked: "2026-10-04",
  },
  "vtbiz-ahead": {
    id: "vtbiz-ahead",
    publisher: "Vermont Business Magazine",
    title: "Vermont withdraws from AHEAD, commits to rural health transformation",
    date: "24 July 2026",
    url: "https://vermontbiz.com/news/2026/july/24/vermont-withdraws-ahead-commits-rural-health-transformation",
    checked: "2026-10-04",
  },
  "vpr-ahead": {
    id: "vpr-ahead",
    publisher: "Vermont Public",
    title: "Vermont ends yet another healthcare reform experiment",
    date: "28 July 2026",
    url: "https://www.vermontpublic.org/local-news/2026-07-28/vermont-ends-another-healthcare-reform-experiment",
    checked: "2026-10-04",
  },
  "wcax-ahead": {
    id: "wcax-ahead",
    publisher: "WCAX",
    title: "Vermont drops ‘AHEAD’ healthcare model; shifts to $195M rural health fund",
    date: "28 July 2026",
    url: "https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-shifts-195m-rural-health-fund/",
    checked: "2026-10-04",
  },

  // ── Clinical ──────────────────────────────────────────────────────────────
  cochrane: {
    id: "cochrane",
    publisher: "Archer J, Bower P, Gilbody S, et al. Cochrane Database of Systematic Reviews",
    title: "Collaborative care for depression and anxiety problems",
    date: "2012",
    url: "https://pubmed.ncbi.nlm.nih.gov/23076925/",
    doi: "10.1002/14651858.CD006525.pub2",
    checked: "2026-10-04",
  },
  impact: {
    id: "impact",
    publisher: "Unützer J, Katon W, Callahan CM, et al. JAMA",
    title: "Collaborative care management of late-life depression in the primary care setting: a randomized controlled trial (IMPACT)",
    date: "11 December 2002",
    url: "https://pubmed.ncbi.nlm.nih.gov/12472325/",
    doi: "10.1001/jama.288.22.2836",
    checked: "2026-10-04",
  },
  "ahs-blueprint-2026": {
    id: "ahs-blueprint-2026",
    publisher: "Vermont Agency of Human Services",
    title: "2026 Annual Report on the Blueprint for Health",
    date: "26 January 2026",
    url: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Ways%20and%20Means/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~2026%20Annual%20Report%20on%20Blueprint%20for%20Health~1-26-2026.pdf",
    checked: "2026-10-04",
  },

  // ── Operations ────────────────────────────────────────────────────────────
  "ahs-spending-nov2025": {
    id: "ahs-spending-nov2025",
    publisher: "Vermont Agency of Human Services",
    title: "Act 68 Health Care Spending Reduction Report",
    date: "November 2025",
    url: "https://legislature.vermont.gov/assets/Legislative-Reports/Nov-2025_Act-68-AHS-HC-Spending-Report-from-AHS.pdf",
    checked: "2026-10-04",
  },
  "ahs-transform-may2026": {
    id: "ahs-transform-may2026",
    publisher: "Vermont Agency of Human Services, Office of Health Care Reform",
    title: "Health Care System Transformation Report",
    date: "1 May 2026",
    url: "https://legislature.vermont.gov/assets/Legislative-Reports/May-2026_Act-68-HC-System-Transformation-Report-from-AHS.pdf",
    checked: "2026-10-04",
  },
  "vtdigger-plans": {
    id: "vtdigger-plans",
    publisher: "VTDigger (Olivia Gieger)",
    title: "Hospitals need to cut spending drastically. But do their plans deliver?",
    date: "21 May 2026",
    url: "https://vtdigger.org/2026/05/21/hospitals-need-to-cut-spending-drastically-but-do-their-plans-deliver/",
    checked: "2026-10-04",
  },
  "gmcb-act68": {
    id: "gmcb-act68",
    publisher: "Green Mountain Care Board",
    title: "Legislative Update (2025)",
    date: "2025",
    url: "https://gmcboard.vermont.gov/node/1374",
    checked: "2026-10-04",
  },

  // ── The book ──────────────────────────────────────────────────────────────
  "book-intro": { id: "book-intro", publisher: "Transforming Healthcare", title: "Introduction: What Transformation Actually Means", date: "2026", url: "/book#chapter-Introduction", checked: "2026-10-04" },
  "book-ch1": { id: "book-ch1", publisher: "Transforming Healthcare", title: "Chapter 1: The Five-Pillar Framework and the Execution Sequence", date: "2026", url: "/book#chapter-1", checked: "2026-10-04" },
  "book-ch3": { id: "book-ch3", publisher: "Transforming Healthcare", title: "Chapter 3: The Policy Pillar in Practice", date: "2026", url: "/book#chapter-3", checked: "2026-10-04" },
  "book-ch4": { id: "book-ch4", publisher: "Transforming Healthcare", title: "Chapter 4: The Technology Pillar", date: "2026", url: "/book#chapter-4", checked: "2026-10-04" },
  "book-ch8": { id: "book-ch8", publisher: "Transforming Healthcare", title: "Chapter 8: The Clinical Pillar", date: "2026", url: "/book#chapter-8", checked: "2026-10-04" },
  "book-ch11": { id: "book-ch11", publisher: "Transforming Healthcare", title: "Chapter 11: The Operations Pillar", date: "2026", url: "/book#chapter-11", checked: "2026-10-04" },
};
