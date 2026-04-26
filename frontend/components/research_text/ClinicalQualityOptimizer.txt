"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Star,
  TrendingUp,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  AlertCircle,
  BarChart2,
  Award,
  Target,
  Zap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HedisMeasure {
  id: string;
  name: string;
  code: string;
  p50: number;
  p90: number;
  weight: number;
  strategies: string[];
}

interface StarMeasure {
  id: string;
  name: string;
  domainId: number;
  weight: number;
  cutPoints: [number, number, number, number]; // 2★,3★,4★,5★ lower bounds
}

interface ImprovementActivity {
  id: string;
  name: string;
  points: number;
  category: string;
}

interface P4PMeasure {
  id: string;
  name: string;
  baseBonus: number; // $ per 1% improvement per 1000 members
}

// ─── Data ────────────────────────────────────────────────────────────────────

const HEDIS_MEASURES: HedisMeasure[] = [
  {
    id: "hba1c",
    name: "Diabetes Care – HbA1c Control (<8%)",
    code: "CDC",
    p50: 64,
    p90: 76,
    weight: 1.5,
    strategies: [
      "Proactive HbA1c outreach & reminder calls",
      "Pharmacist-led medication therapy management",
      "Continuous glucose monitoring program",
      "Culturally tailored diabetes education",
    ],
  },
  {
    id: "crc",
    name: "Colorectal Cancer Screening",
    code: "COL",
    p50: 69,
    p90: 80,
    weight: 1.3,
    strategies: [
      "Mailed FIT kit program with follow-up calls",
      "EHR-based point-of-care reminders",
      "Navigation support for colonoscopy scheduling",
      "Community health worker outreach",
    ],
  },
  {
    id: "bcs",
    name: "Breast Cancer Screening",
    code: "BCS",
    p50: 68,
    p90: 79,
    weight: 1.3,
    strategies: [
      "Automated mammography reminder letters/texts",
      "Co-located mammography services",
      "Patient navigator program",
      "OBGYN–PCP coordination protocols",
    ],
  },
  {
    id: "cbp",
    name: "Controlling High Blood Pressure",
    code: "CBP",
    p50: 61,
    p90: 73,
    weight: 1.4,
    strategies: [
      "Remote blood pressure monitoring program",
      "Team-based care with pharmacist co-management",
      "Hypertension registry with gap closure workflows",
      "Patient education on DASH diet & lifestyle",
    ],
  },
  {
    id: "wcc",
    name: "Child/Adolescent BMI Assessment",
    code: "WCC",
    p50: 71,
    p90: 85,
    weight: 1.0,
    strategies: [
      "EHR-embedded BMI calculation & documentation prompts",
      "Pediatric obesity management protocols",
      "Referral pathways to nutrition/exercise programs",
      "Staff training on sensitive BMI counseling",
    ],
  },
  {
    id: "dsf",
    name: "Depression Screening",
    code: "DSF",
    p50: 67,
    p90: 82,
    weight: 1.1,
    strategies: [
      "Universal PHQ-2/PHQ-9 screening at annual visits",
      "Integrated behavioral health in primary care",
      "EHR-based screening workflow automation",
      "Warm handoffs to behavioral health staff",
    ],
  },
  {
    id: "pnc",
    name: "Prenatal Care",
    code: "PNC",
    p50: 83,
    p90: 92,
    weight: 1.2,
    strategies: [
      "Early prenatal care outreach for high-risk members",
      "OB navigator program",
      "Telehealth prenatal visits for access barriers",
      "Doula integration programs",
    ],
  },
  {
    id: "mah",
    name: "Medication Adherence – Diabetes",
    code: "MAH",
    p50: 80,
    p90: 87,
    weight: 1.2,
    strategies: [
      "Medication synchronization programs",
      "Adherence outreach for non-refill gaps",
      "Pill pack/blister packaging interventions",
      "Financial assistance for insulin costs",
    ],
  },
  {
    id: "fuh",
    name: "Follow-up after Hospitalization – Mental Illness (7 day)",
    code: "FUH",
    p50: 39,
    p90: 55,
    weight: 1.4,
    strategies: [
      "Hospital transition care coordinator program",
      "Real-time inpatient notification system",
      "Peer support specialist follow-up calls",
      "Behavioral health appointment scheduling at discharge",
    ],
  },
  {
    id: "amm",
    name: "Antidepressant Medication Management",
    code: "AMM",
    p50: 58,
    p90: 70,
    weight: 1.1,
    strategies: [
      "Pharmacy care management for antidepressant adherence",
      "Depression registry with outreach protocols",
      "Collaborative care model with PCP/psychiatry",
      "Patient education on medication continuation",
    ],
  },
  {
    id: "w34",
    name: "Well-Child Visits",
    code: "W34",
    p50: 70,
    p90: 83,
    weight: 1.0,
    strategies: [
      "Automated well-child reminder calls/texts",
      "Same-day/next-day appointment access",
      "Community health worker home visit programs",
      "School-based health center partnerships",
    ],
  },
  {
    id: "ima",
    name: "Immunizations – Adolescents",
    code: "IMA",
    p50: 37,
    p90: 52,
    weight: 1.0,
    strategies: [
      "Immunization registry integration with EHR",
      "School immunization campaigns",
      "Reminder-recall systems (phone/text/mail)",
      "Standing orders for nurse-administered vaccines",
    ],
  },
  {
    id: "snp",
    name: "Care Plan",
    code: "SNP",
    p50: 63,
    p90: 76,
    weight: 0.9,
    strategies: [
      "Standardized care plan template in EHR",
      "Annual care plan review workflow",
      "Care coordinator training program",
      "Patient-facing care plan portal access",
    ],
  },
  {
    id: "aap",
    name: "Access to Preventive/Ambulatory Services",
    code: "AAP",
    p50: 88,
    p90: 95,
    weight: 0.8,
    strategies: [
      "Expanded evening/weekend hours",
      "Telehealth for routine access needs",
      "Care gap outreach for non-utilizers",
      "Transportation assistance programs",
    ],
  },
  {
    id: "mhu",
    name: "Mental Health Utilization",
    code: "MHU",
    p50: 55,
    p90: 68,
    weight: 1.0,
    strategies: [
      "Integrated BH screening in primary care",
      "BH provider network adequacy improvements",
      "Telehealth mental health access",
      "Stigma reduction member education",
    ],
  },
];

const STAR_DOMAINS = [
  {
    id: 1,
    name: "Staying Healthy",
    color: "violet",
    weight: 1.0,
    measures: [
      { id: "sh1", name: "Breast Cancer Screening", weight: 1, cutPoints: [50, 62, 72, 82] as [number, number, number, number] },
      { id: "sh2", name: "Colorectal Cancer Screening", weight: 1, cutPoints: [48, 60, 70, 80] as [number, number, number, number] },
      { id: "sh3", name: "Annual Flu Vaccine", weight: 1, cutPoints: [52, 64, 74, 84] as [number, number, number, number] },
      { id: "sh4", name: "Monitoring Physical Activity", weight: 1, cutPoints: [55, 67, 78, 88] as [number, number, number, number] },
      { id: "sh5", name: "Adult BMI Assessment", weight: 1, cutPoints: [62, 74, 84, 93] as [number, number, number, number] },
      { id: "sh6", name: "Reducing Risk of Falling", weight: 1, cutPoints: [40, 52, 64, 76] as [number, number, number, number] },
      { id: "sh7", name: "Improving Bladder Control", weight: 1, cutPoints: [35, 48, 60, 72] as [number, number, number, number] },
      { id: "sh8", name: "Diabetes – HbA1c Testing", weight: 1, cutPoints: [78, 86, 91, 96] as [number, number, number, number] },
    ],
  },
  {
    id: 2,
    name: "Managing Chronic Conditions",
    color: "purple",
    weight: 3.0,
    measures: [
      { id: "mc1", name: "Diabetes Care – Blood Sugar Controlled", weight: 3, cutPoints: [50, 60, 68, 76] as [number, number, number, number] },
      { id: "mc2", name: "Controlling Blood Pressure", weight: 3, cutPoints: [48, 58, 66, 74] as [number, number, number, number] },
      { id: "mc3", name: "Diabetes Care – Kidney Disease Monitoring", weight: 3, cutPoints: [72, 80, 86, 92] as [number, number, number, number] },
      { id: "mc4", name: "Rheumatoid Arthritis Management", weight: 3, cutPoints: [60, 70, 80, 90] as [number, number, number, number] },
      { id: "mc5", name: "Osteoporosis Management", weight: 3, cutPoints: [30, 42, 54, 66] as [number, number, number, number] },
      { id: "mc6", name: "Medication Adherence – Diabetes", weight: 3, cutPoints: [72, 78, 83, 88] as [number, number, number, number] },
      { id: "mc7", name: "Medication Adherence – Hypertension", weight: 3, cutPoints: [74, 80, 85, 90] as [number, number, number, number] },
      { id: "mc8", name: "Medication Adherence – Cholesterol", weight: 3, cutPoints: [68, 75, 81, 87] as [number, number, number, number] },
      { id: "mc9", name: "MTM Completion Rate", weight: 3, cutPoints: [40, 52, 63, 74] as [number, number, number, number] },
    ],
  },
  {
    id: 3,
    name: "Member Experience (CAHPS)",
    color: "fuchsia",
    weight: 4.0,
    measures: [
      { id: "me1", name: "Getting Needed Care", weight: 4, cutPoints: [62, 70, 78, 86] as [number, number, number, number] },
      { id: "me2", name: "Getting Appointments & Care Quickly", weight: 4, cutPoints: [58, 66, 74, 82] as [number, number, number, number] },
      { id: "me3", name: "Customer Service", weight: 4, cutPoints: [60, 68, 76, 84] as [number, number, number, number] },
      { id: "me4", name: "Rating of Health Plan", weight: 4, cutPoints: [55, 64, 73, 82] as [number, number, number, number] },
      { id: "me5", name: "Care Coordination", weight: 4, cutPoints: [56, 65, 74, 83] as [number, number, number, number] },
      { id: "me6", name: "Rating of Drug Plan", weight: 4, cutPoints: [60, 68, 76, 84] as [number, number, number, number] },
    ],
  },
  {
    id: 4,
    name: "Member Complaints & Appeals",
    color: "pink",
    weight: 1.5,
    measures: [
      { id: "ca1", name: "Complaints about Plan (lower is better)", weight: 1.5, cutPoints: [5, 10, 15, 20] as [number, number, number, number] },
      { id: "ca2", name: "Plan Makes Timely Decisions", weight: 1.5, cutPoints: [84, 88, 92, 96] as [number, number, number, number] },
      { id: "ca3", name: "Reviewing Appeals Decisions", weight: 1.5, cutPoints: [30, 45, 60, 75] as [number, number, number, number] },
      { id: "ca4", name: "Call Center – Foreign Language", weight: 1.5, cutPoints: [65, 73, 81, 89] as [number, number, number, number] },
      { id: "ca5", name: "Call Center – TTY/TDD", weight: 1.5, cutPoints: [62, 70, 78, 86] as [number, number, number, number] },
      { id: "ca6", name: "Appeals Auto-Forward Rate", weight: 1.5, cutPoints: [70, 78, 86, 92] as [number, number, number, number] },
    ],
  },
  {
    id: 5,
    name: "Health Plan Administration",
    color: "indigo",
    weight: 1.5,
    measures: [
      { id: "ha1", name: "Improving or Maintaining Physical Health", weight: 1.5, cutPoints: [55, 64, 73, 82] as [number, number, number, number] },
      { id: "ha2", name: "Improving or Maintaining Mental Health", weight: 1.5, cutPoints: [52, 61, 70, 79] as [number, number, number, number] },
      { id: "ha3", name: "Plan All-Cause Readmissions", weight: 1.5, cutPoints: [12, 15, 18, 22] as [number, number, number, number] },
    ],
  },
];

const IMPROVEMENT_ACTIVITIES: ImprovementActivity[] = [
  { id: "ia1", name: "Annual Assessment of Psychosocial Needs", points: 10, category: "Behavioral Health" },
  { id: "ia2", name: "Care Coordination Agreements with Specialists", points: 20, category: "Care Coordination" },
  { id: "ia3", name: "CMS-Approved Diabetes Prevention Program", points: 20, category: "Population Management" },
  { id: "ia4", name: "Comprehensive Management of Type 2 Diabetes", points: 20, category: "Population Management" },
  { id: "ia5", name: "PCMH Certification/Attestation", points: 20, category: "Integrated Care" },
  { id: "ia6", name: "Regular Review of PDMP Data", points: 10, category: "Opioid Management" },
  { id: "ia7", name: "Create & Implement Anti-Racism Plan", points: 20, category: "Population Management" },
  { id: "ia8", name: "Care Management for High-Risk Patients", points: 20, category: "Care Coordination" },
  { id: "ia9", name: "Annual Wellness Visit for High-Risk Medicare", points: 10, category: "Preventive Care" },
  { id: "ia10", name: "Telehealth Services for High-Need Patients", points: 20, category: "Care Delivery" },
  { id: "ia11", name: "Leveraging FHIR & Interoperability Standards", points: 10, category: "HIT" },
  { id: "ia12", name: "Practice Improvements for Underserved Populations", points: 20, category: "Population Management" },
  { id: "ia13", name: "Chronic Care & Preventive Care Management", points: 20, category: "Population Management" },
  { id: "ia14", name: "Implementation of Fall Prevention Program", points: 10, category: "Preventive Care" },
  { id: "ia15", name: "Advance Care Planning", points: 10, category: "Care Coordination" },
  { id: "ia16", name: "Participation in Collaborative Learning Networks", points: 10, category: "Practice Improvement" },
  { id: "ia17", name: "Regular Training on Health Equity", points: 10, category: "Population Management" },
  { id: "ia18", name: "Behavioral Health Integration", points: 20, category: "Behavioral Health" },
  { id: "ia19", name: "HIE Use for Population Health", points: 10, category: "HIT" },
  { id: "ia20", name: "Leadership Engagement in Quality Improvement", points: 20, category: "Practice Improvement" },
];

const P4P_MEASURES: P4PMeasure[] = [
  { id: "p1", name: "HbA1c Control (<8%)", baseBonus: 850 },
  { id: "p2", name: "Colorectal Cancer Screening", baseBonus: 600 },
  { id: "p3", name: "Breast Cancer Screening", baseBonus: 600 },
  { id: "p4", name: "Controlling High Blood Pressure", baseBonus: 900 },
  { id: "p5", name: "Follow-up after Mental Health Hospitalization", baseBonus: 1100 },
  { id: "p6", name: "Medication Adherence – Diabetes", baseBonus: 700 },
  { id: "p7", name: "Depression Screening", baseBonus: 450 },
  { id: "p8", name: "Well-Child Visits", baseBonus: 400 },
  { id: "p9", name: "Adolescent Immunizations", baseBonus: 500 },
  { id: "p10", name: "Antidepressant Medication Management", baseBonus: 650 },
  { id: "p11", name: "Prenatal Care", baseBonus: 750 },
  { id: "p12", name: "Plan All-Cause Readmissions Reduction", baseBonus: 1400 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function starsFromCutPoints(value: number, cutPoints: [number, number, number, number], invert = false): number {
  if (invert) {
    // Lower is better (e.g., complaints)
    if (value <= cutPoints[0]) return 5;
    if (value <= cutPoints[1]) return 4;
    if (value <= cutPoints[2]) return 3;
    if (value <= cutPoints[3]) return 2;
    return 1;
  }
  if (value >= cutPoints[3]) return 5;
  if (value >= cutPoints[2]) return 4;
  if (value >= cutPoints[1]) return 3;
  if (value >= cutPoints[0]) return 2;
  return 1;
}

function hedisStars(current: number, p50: number, p90: number): number {
  if (current >= p90) return 5;
  if (current >= (p50 + p90) / 2) return 4;
  if (current >= p50) return 3;
  if (current >= p50 * 0.85) return 2;
  return 1;
}

function starColor(stars: number): string {
  if (stars >= 4.5) return "text-green-500";
  if (stars >= 4.0) return "text-emerald-500";
  if (stars >= 3.5) return "text-yellow-500";
  if (stars >= 3.0) return "text-orange-400";
  return "text-red-500";
}

function starBg(stars: number): string {
  if (stars >= 4.5) return "bg-green-100 text-green-700";
  if (stars >= 4.0) return "bg-emerald-100 text-emerald-700";
  if (stars >= 3.5) return "bg-yellow-100 text-yellow-700";
  if (stars >= 3.0) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

function renderStarIcons(stars: number) {
  const full = Math.floor(stars);
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= full ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
        />
      ))}
    </span>
  );
}

// ─── Tab 1: HEDIS Simulator ───────────────────────────────────────────────────

function HedisTab() {
  const [orgType, setOrgType] = useState<"health_plan" | "provider">("health_plan");
  const [planType, setPlanType] = useState<"commercial" | "medicaid" | "medicare">("commercial");
  const [performances, setPerformances] = useState<Record<string, number>>(() =>
    Object.fromEntries(HEDIS_MEASURES.map((m) => [m.id, m.p50]))
  );
  const [expandedMeasure, setExpandedMeasure] = useState<string | null>(null);

  const setPerf = (id: string, val: number) =>
    setPerformances((p) => ({ ...p, [id]: val }));

  const results = useMemo(() => {
    return HEDIS_MEASURES.map((m) => {
      const cur = performances[m.id] ?? m.p50;
      const gap90 = Math.max(0, m.p90 - cur);
      const stars = hedisStars(cur, m.p50, m.p90);
      const opportunity = gap90 * m.weight;
      return { ...m, cur, gap90, stars, opportunity };
    });
  }, [performances]);

  const composite = useMemo(() => {
    const totalWeight = results.reduce((s, r) => s + r.weight, 0);
    const weighted = results.reduce((s, r) => s + r.cur * r.weight, 0);
    return weighted / totalWeight;
  }, [results]);

  const compositeP50 = useMemo(() => {
    const totalWeight = HEDIS_MEASURES.reduce((s, m) => s + m.weight, 0);
    return HEDIS_MEASURES.reduce((s, m) => s + m.p50 * m.weight, 0) / totalWeight;
  }, []);

  const compositeP90 = useMemo(() => {
    const totalWeight = HEDIS_MEASURES.reduce((s, m) => s + m.weight, 0);
    return HEDIS_MEASURES.reduce((s, m) => s + m.p90 * m.weight, 0) / totalWeight;
  }, []);

  const topOpportunities = useMemo(
    () => [...results].sort((a, b) => b.opportunity - a.opportunity).slice(0, 5),
    [results]
  );

  return (
    <div className="space-y-6">
      {/* Config Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-violet-100 p-4">
          <label className="block text-xs font-semibold text-violet-700 mb-2">Organization Type</label>
          <div className="flex gap-2">
            {(["health_plan", "provider"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrgType(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  orgType === t
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-violet-600 border-violet-300 hover:bg-violet-50"
                }`}
              >
                {t === "health_plan" ? "Health Plan" : "Provider Group"}
              </button>
            ))}
          </div>
        </div>
        {orgType === "health_plan" && (
          <div className="bg-white rounded-xl border border-violet-100 p-4">
            <label className="block text-xs font-semibold text-violet-700 mb-2">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value as typeof planType)}
              className="w-full border border-violet-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <option value="commercial">Commercial</option>
              <option value="medicaid">Medicaid</option>
              <option value="medicare">Medicare Advantage</option>
            </select>
          </div>
        )}
        {/* Composite Score Card */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-4 text-white md:col-span-1">
          <div className="text-xs font-semibold opacity-80 mb-1">Composite HEDIS Score</div>
          <div className="text-3xl font-bold">{composite.toFixed(1)}%</div>
          <div className="flex items-center gap-4 mt-2 text-xs opacity-80">
            <span>50th: {compositeP50.toFixed(1)}%</span>
            <span>90th: {compositeP90.toFixed(1)}%</span>
          </div>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${Math.min(100, (composite / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="bg-white rounded-xl border border-violet-100 p-4">
        <h3 className="text-sm font-bold text-violet-800 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" /> Top Improvement Opportunities (Gap × Weight)
        </h3>
        <div className="flex flex-wrap gap-2">
          {topOpportunities.map((r) => (
            <div key={r.id} className="bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 text-xs">
              <div className="font-semibold text-violet-800">{r.name}</div>
              <div className="text-violet-600 mt-0.5">
                Gap: {r.gap90.toFixed(1)} pp · Score: {r.opportunity.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Measure Table */}
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-violet-100 overflow-hidden">
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-violet-50/50 transition-colors"
              onClick={() => setExpandedMeasure(expandedMeasure === r.id ? null : r.id)}
            >
              {/* Measure info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded">
                    {r.code}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 truncate">{r.name}</span>
                </div>
              </div>
              {/* Stars */}
              <div className="hidden sm:flex items-center gap-1">
                {renderStarIcons(r.stars)}
                <span className={`text-xs font-bold ml-1 ${starColor(r.stars)}`}>{r.stars}★</span>
              </div>
              {/* Benchmarks */}
              <div className="hidden md:flex gap-4 text-xs text-slate-500">
                <span>50th: {r.p50}%</span>
                <span>90th: {r.p90}%</span>
                <span className={`font-semibold ${r.gap90 > 0 ? "text-orange-600" : "text-green-600"}`}>
                  Gap: {r.gap90.toFixed(1)} pp
                </span>
              </div>
              {/* Expand toggle */}
              {expandedMeasure === r.id ? (
                <ChevronUp className="w-4 h-4 text-violet-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-violet-400 flex-shrink-0" />
              )}
            </div>

            {/* Slider row */}
            <div className="px-4 pb-3 border-t border-violet-50">
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-500 w-24 flex-shrink-0">Current: {r.cur}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={r.cur}
                  onChange={(e) => setPerf(r.id, Number(e.target.value))}
                  className="flex-1 accent-violet-600 h-1.5"
                />
                <span className="text-xs text-slate-400 w-16 text-right flex-shrink-0">
                  {r.cur >= r.p90 ? (
                    <span className="text-green-600 font-semibold">Above 90th</span>
                  ) : r.cur >= r.p50 ? (
                    <span className="text-yellow-600 font-semibold">Above 50th</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Below 50th</span>
                  )}
                </span>
              </div>
              {/* Visual benchmark bar */}
              <div className="relative mt-2 h-2 bg-gray-100 rounded-full">
                {/* 50th marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-400"
                  style={{ left: `${r.p50}%` }}
                  title={`50th percentile: ${r.p50}%`}
                />
                {/* 90th marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-green-500"
                  style={{ left: `${r.p90}%` }}
                  title={`90th percentile: ${r.p90}%`}
                />
                {/* Current fill */}
                <div
                  className="h-2 bg-violet-500 rounded-full transition-all"
                  style={{ width: `${r.cur}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0%</span>
                <span className="text-yellow-600">50th: {r.p50}%</span>
                <span className="text-green-600">90th: {r.p90}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Expanded strategies */}
            {expandedMeasure === r.id && (
              <div className="px-4 pb-4 border-t border-violet-100 bg-violet-50/40">
                <div className="text-xs font-bold text-violet-700 mt-3 mb-2 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Evidence-Based Improvement Strategies
                </div>
                <ul className="space-y-1">
                  {r.strategies.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 2: CMS Stars Predictor ───────────────────────────────────────────────

function StarsTab() {
  const [enrollment, setEnrollment] = useState(50000);
  const [performances, setPerformances] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    STAR_DOMAINS.forEach((d) => d.measures.forEach((m) => (init[m.id] = m.cutPoints[1])));
    return init;
  });
  const [expandedDomain, setExpandedDomain] = useState<number | null>(1);

  const setPerf = (id: string, val: number) =>
    setPerformances((p) => ({ ...p, [id]: val }));

  // Invert for complaints domain
  const invertIds = new Set(["ca1", "ha3"]);

  const domainResults = useMemo(() => {
    return STAR_DOMAINS.map((domain) => {
      const measureStars = domain.measures.map((m) => {
        const val = performances[m.id] ?? m.cutPoints[1];
        const stars = starsFromCutPoints(val, m.cutPoints, invertIds.has(m.id));
        return { ...m, val, stars };
      });
      const totalW = measureStars.reduce((s, m) => s + m.weight, 0);
      const domainStars = measureStars.reduce((s, m) => s + m.stars * m.weight, 0) / totalW;
      return { ...domain, measureStars, domainStars };
    });
  }, [performances]);

  const overallStars = useMemo(() => {
    const totalW = domainResults.reduce((s, d) => s + d.weight, 0);
    return domainResults.reduce((s, d) => s + d.domainStars * d.weight, 0) / totalW;
  }, [domainResults]);

  const revenueImpact = useMemo(() => {
    const baseRev = enrollment * 12000; // ~$12k per beneficiary/year baseline
    const scenarios = [3.5, 4.0, 4.5, 5.0];
    return scenarios.map((stars) => {
      const bonus = stars >= 4 ? 0.05 : 0;
      const enrollBonus = stars >= 5 ? 0.15 : stars >= 4.5 ? 0.08 : 0; // growth advantage
      const rev = baseRev * (1 + bonus + enrollBonus);
      return { stars, bonus: (bonus + enrollBonus) * 100, rev };
    });
  }, [enrollment]);

  const currentRevenue = useMemo(() => {
    const baseRev = enrollment * 12000;
    const bonus = overallStars >= 4 ? 0.05 : 0;
    const enrollBonus = overallStars >= 5 ? 0.15 : overallStars >= 4.5 ? 0.08 : 0;
    return baseRev * (1 + bonus + enrollBonus);
  }, [enrollment, overallStars]);

  // Path to 4 stars: find measures that need improvement
  const pathTo4Stars = useMemo(() => {
    if (overallStars >= 4) return [];
    const suggestions: { domain: string; measure: string; current: number; needed: number; currentStars: number }[] = [];
    domainResults.forEach((d) => {
      d.measureStars.forEach((m) => {
        if (m.stars < 4) {
          suggestions.push({
            domain: d.name,
            measure: m.name,
            current: m.val,
            needed: m.cutPoints[2],
            currentStars: m.stars,
          });
        }
      });
    });
    return suggestions.sort((a, b) => (a.needed - a.current) - (b.needed - b.current)).slice(0, 8);
  }, [domainResults, overallStars]);

  const colorMap: Record<string, string> = {
    violet: "bg-violet-600",
    purple: "bg-purple-600",
    fuchsia: "bg-fuchsia-600",
    pink: "bg-pink-600",
    indigo: "bg-indigo-600",
  };
  const borderMap: Record<string, string> = {
    violet: "border-violet-200",
    purple: "border-purple-200",
    fuchsia: "border-fuchsia-200",
    pink: "border-pink-200",
    indigo: "border-indigo-200",
  };
  const bgMap: Record<string, string> = {
    violet: "bg-violet-50",
    purple: "bg-purple-50",
    fuchsia: "bg-fuchsia-50",
    pink: "bg-pink-50",
    indigo: "bg-indigo-50",
  };

  return (
    <div className="space-y-6">
      {/* Overall Stars Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-gradient-to-br from-violet-600 to-purple-800 rounded-xl p-5 text-white">
          <div className="text-xs font-semibold opacity-80 mb-1">Overall CMS Star Rating</div>
          <div className="text-5xl font-black">{overallStars.toFixed(2)}</div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= Math.round(overallStars) ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`}
              />
            ))}
          </div>
          <div className="mt-3 text-xs opacity-70">
            {overallStars >= 4 ? "Quality Bonus Payment Eligible" : overallStars >= 3.5 ? "Near QBP Threshold" : "Below QBP Threshold"}
          </div>
          {overallStars >= 5 && (
            <div className="mt-1 bg-yellow-400/20 text-yellow-200 text-xs font-semibold px-2 py-1 rounded-lg">
              5-Star: Open Enrollment Advantage
            </div>
          )}
        </div>

        {/* Domain Stars Summary */}
        <div className="md:col-span-2 bg-white rounded-xl border border-violet-100 p-4">
          <div className="text-xs font-bold text-violet-700 mb-3">Domain Performance</div>
          <div className="space-y-2">
            {domainResults.map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-44 flex-shrink-0 truncate">{d.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${colorMap[d.color]}`}
                    style={{ width: `${(d.domainStars / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 w-10 text-right">
                  {d.domainStars.toFixed(2)}★
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment & Revenue */}
      <div className="bg-white rounded-xl border border-violet-100 p-5">
        <h3 className="text-sm font-bold text-violet-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> Revenue Impact Calculator
        </h3>
        <div className="mb-4">
          <label className="text-xs font-semibold text-violet-700">
            Medicare Advantage Enrollment: {enrollment.toLocaleString()} beneficiaries
          </label>
          <input
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={enrollment}
            onChange={(e) => setEnrollment(Number(e.target.value))}
            className="w-full mt-1 accent-violet-600"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {revenueImpact.map((s) => (
            <div
              key={s.stars}
              className={`rounded-xl border p-3 text-center ${
                Math.abs(overallStars - s.stars) < 0.25
                  ? "border-violet-400 bg-violet-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="text-xs font-bold text-slate-500 mb-1">{s.stars}★ Stars</div>
              <div className="text-sm font-bold text-slate-800">
                ${(s.rev / 1e6).toFixed(1)}M
              </div>
              <div className="text-xs text-violet-600 font-semibold">+{s.bonus.toFixed(0)}% bonus</div>
              <div className={`text-xs mt-1 font-semibold ${s.rev > currentRevenue ? "text-green-600" : "text-slate-400"}`}>
                {s.rev > currentRevenue
                  ? `+$${((s.rev - currentRevenue) / 1e6).toFixed(1)}M vs current`
                  : "Current tier"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Detail Accordions */}
      <div className="space-y-3">
        {domainResults.map((domain) => (
          <div key={domain.id} className={`rounded-xl border ${borderMap[domain.color]} overflow-hidden`}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 ${bgMap[domain.color]} hover:opacity-90 transition-opacity`}
              onClick={() => setExpandedDomain(expandedDomain === domain.id ? null : domain.id)}
            >
              <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${colorMap[domain.color]}`}>
                Domain {domain.id}
              </span>
              <span className="text-sm font-bold text-slate-800 flex-1 text-left">{domain.name}</span>
              <span className="text-sm font-bold text-slate-700">{domain.domainStars.toFixed(2)}★</span>
              {expandedDomain === domain.id ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
            {expandedDomain === domain.id && (
              <div className="p-4 space-y-3">
                {domain.measureStars.map((m) => (
                  <div key={m.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-700 truncate">{m.name}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {renderStarIcons(m.stars)}
                        <span className="text-xs text-slate-500 ml-1">
                          ({m.stars}★) — Cut points: {m.cutPoints.join(" / ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-500 w-16 text-right">Value: {m.val}</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={m.val}
                        onChange={(e) => setPerf(m.id, Number(e.target.value))}
                        className="w-28 accent-violet-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Path to 4 Stars */}
      {pathTo4Stars.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" /> Path to 4 Stars — Priority Actions
          </h3>
          <div className="space-y-2">
            {pathTo4Stars.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-amber-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-700 truncate">{s.measure}</div>
                  <div className="text-xs text-slate-500">{s.domain}</div>
                </div>
                <div className="text-xs text-right flex-shrink-0">
                  <div className="text-orange-600 font-semibold">Current: {s.current}</div>
                  <div className="text-green-600 font-semibold">Need: {s.needed} (+{s.needed - s.current})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 3: QPP/MIPS Optimizer ────────────────────────────────────────────────

const MIPS_QUALITY_MEASURES = [
  { id: "q1", name: "Diabetes: HbA1c Poor Control (>9%)", specialty: "Primary Care" },
  { id: "q2", name: "Controlling High Blood Pressure", specialty: "Primary Care" },
  { id: "q3", name: "Colorectal Cancer Screening", specialty: "Primary Care" },
  { id: "q4", name: "Preventive Care: BMI Screening & Follow-Up", specialty: "Primary Care" },
  { id: "q5", name: "Depression Remission at 12 Months", specialty: "Behavioral Health" },
  { id: "q6", name: "COPD: Spirometry Evaluation", specialty: "Pulmonology" },
];

const PI_MEASURES = [
  { id: "pi1", name: "e-Prescribing", required: true, baseScore: 10 },
  { id: "pi2", name: "Query of Prescription Drug Monitoring Program (PDMP)", required: false, baseScore: 10 },
  { id: "pi3", name: "Health Information Exchange (Send)", required: true, baseScore: 20 },
  { id: "pi4", name: "Health Information Exchange (Request/Accept)", required: false, baseScore: 20 },
  { id: "pi5", name: "Patient Electronic Access to Health Information", required: true, baseScore: 20 },
  { id: "pi6", name: "Patient-Specific Education Resources", required: false, baseScore: 10 },
  { id: "pi7", name: "Secure Messaging", required: false, baseScore: 10 },
];

function QPPTab() {
  const [track, setTrack] = useState<"mips" | "apm">("mips");
  const [qmRates, setQmRates] = useState<Record<string, number>>({ q1: 55, q2: 60, q3: 65, q4: 70, q5: 45, q6: 75 });
  const [piEnabled, setPiEnabled] = useState<Record<string, boolean>>({ pi1: true, pi3: true, pi5: true });
  const [selectedIA, setSelectedIA] = useState<Set<string>>(new Set(["ia1", "ia3", "ia10"]));
  const [costPercentile, setCostPercentile] = useState(50);
  const [partBVolume, setPartBVolume] = useState(2000000);
  const [apmQP, setApmQP] = useState(false);

  // Quality score: each measure 0-10 based on decile
  const qualityScore = useMemo(() => {
    const measureScores = Object.values(qmRates).map((r) => {
      const decile = Math.min(10, Math.floor(r / 10));
      return decile;
    });
    const avg = measureScores.reduce((a, b) => a + b, 0) / measureScores.length;
    return Math.min(100, (avg / 10) * 100);
  }, [qmRates]);

  const piScore = useMemo(() => {
    const requiredMet = PI_MEASURES.filter((m) => m.required && piEnabled[m.id]).length;
    const allRequired = PI_MEASURES.filter((m) => m.required).length;
    if (requiredMet < allRequired) return 0; // Must meet all required
    const bonusScore = PI_MEASURES.filter((m) => !m.required && piEnabled[m.id]).reduce(
      (s, m) => s + m.baseScore,
      0
    );
    return Math.min(100, 75 + bonusScore);
  }, [piEnabled]);

  const iaScore = useMemo(() => {
    let pts = 0;
    selectedIA.forEach((id) => {
      const act = IMPROVEMENT_ACTIVITIES.find((a) => a.id === id);
      if (act) pts += act.points;
    });
    // Cap at 40 points, scale to 100
    return Math.min(100, (Math.min(40, pts) / 40) * 100);
  }, [selectedIA]);

  const costScore = useMemo(() => {
    // Inverse: lower cost percentile = better score
    return Math.max(0, 100 - costPercentile);
  }, [costPercentile]);

  const compositeScore = useMemo(() => {
    return qualityScore * 0.3 + piScore * 0.25 + iaScore * 0.15 + costScore * 0.3;
  }, [qualityScore, piScore, iaScore, costScore]);

  const paymentAdj = useMemo(() => {
    if (compositeScore >= 75) return 0.09; // exceptional
    if (compositeScore >= 45) return 0.07;
    if (compositeScore >= 30) return 0.0;
    if (compositeScore >= 15) return -0.05;
    return -0.09;
  }, [compositeScore]);

  const dollarImpact = useMemo(() => partBVolume * paymentAdj, [partBVolume, paymentAdj]);

  const toggleIA = (id: string) => {
    setSelectedIA((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (track === "apm") {
    return (
      <div className="space-y-6">
        <div className="flex gap-3">
          {(["mips", "apm"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTrack(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                track === t
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-violet-600 border-violet-300 hover:bg-violet-50"
              }`}
            >
              {t === "mips" ? "MIPS Track" : "APM Track"}
            </button>
          ))}
        </div>
        <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-xl p-6 text-white">
          <div className="text-lg font-bold mb-2">Advanced APM (Alternative Payment Model)</div>
          <div className="text-sm opacity-80 mb-4">
            Qualifying APM Participants (QPs) are exempt from MIPS and receive a 5% APM Incentive Payment.
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={apmQP}
                onChange={(e) => setApmQP(e.target.checked)}
                className="w-4 h-4 accent-violet-400"
              />
              <div>
                <div className="text-sm font-semibold">QP Threshold Met</div>
                <div className="text-xs opacity-70">
                  ≥50% Medicare revenue OR ≥35% Medicare patients via APM entities
                </div>
              </div>
            </label>
          </div>
          {apmQP && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-70">MIPS Status</div>
                <div className="font-bold">EXEMPT</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-70">APM Incentive</div>
                <div className="font-bold">+5% on Part B</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-70">Annual Benefit</div>
                <div className="font-bold">${(partBVolume * 0.05).toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl border border-violet-100 p-4">
          <label className="text-xs font-semibold text-violet-700">
            Medicare Part B Billing Volume: ${partBVolume.toLocaleString()}
          </label>
          <input
            type="range"
            min={100000}
            max={20000000}
            step={100000}
            value={partBVolume}
            onChange={(e) => setPartBVolume(Number(e.target.value))}
            className="w-full mt-2 accent-violet-600"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Track Selector */}
      <div className="flex gap-3">
        {(["mips", "apm"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              track === t
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-violet-600 border-violet-300 hover:bg-violet-50"
            }`}
          >
            {t === "mips" ? "MIPS Track" : "APM Track"}
          </button>
        ))}
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Quality (30%)", score: qualityScore, color: "violet" },
          { label: "Promoting Interop (25%)", score: piScore, color: "purple" },
          { label: "Improvement Activities (15%)", score: iaScore, color: "fuchsia" },
          { label: "Cost (30%)", score: costScore, color: "indigo" },
          { label: "Composite MIPS", score: compositeScore, color: "gradient" },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-3 text-center border ${
              s.color === "gradient"
                ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white border-violet-600"
                : "bg-white border-violet-100"
            }`}
          >
            <div className={`text-xs font-semibold mb-1 ${s.color === "gradient" ? "text-violet-200" : "text-slate-500"}`}>
              {s.label}
            </div>
            <div className={`text-2xl font-black ${s.color === "gradient" ? "text-white" : "text-violet-700"}`}>
              {s.score.toFixed(0)}
            </div>
            <div className={`text-xs ${s.color === "gradient" ? "text-violet-200" : "text-slate-400"}`}>/ 100</div>
            {s.color !== "gradient" && (
              <div className="mt-1 bg-gray-100 rounded-full h-1">
                <div
                  className="bg-violet-500 h-1 rounded-full"
                  style={{ width: `${s.score}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Adjustment */}
      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${
          paymentAdj >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-700">MIPS Payment Adjustment</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {compositeScore >= 75
              ? "Exceptional Performance — eligible for additional bonus"
              : compositeScore >= 45
              ? "Above threshold — positive adjustment"
              : compositeScore >= 30
              ? "Neutral threshold — no adjustment"
              : "Below threshold — negative adjustment"}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-black ${paymentAdj >= 0 ? "text-green-600" : "text-red-600"}`}>
            {paymentAdj >= 0 ? "+" : ""}{(paymentAdj * 100).toFixed(0)}%
          </div>
          <div className={`text-sm font-semibold ${dollarImpact >= 0 ? "text-green-700" : "text-red-700"}`}>
            {dollarImpact >= 0 ? "+" : "−"}${Math.abs(dollarImpact).toLocaleString()}
          </div>
        </div>
        <div className="text-right min-w-[140px]">
          <label className="text-xs font-semibold text-slate-600">
            Part B Volume: ${(partBVolume / 1e6).toFixed(1)}M
          </label>
          <input
            type="range"
            min={100000}
            max={20000000}
            step={100000}
            value={partBVolume}
            onChange={(e) => setPartBVolume(Number(e.target.value))}
            className="w-full mt-1 accent-violet-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Quality Measures */}
        <div className="bg-white rounded-xl border border-violet-100 p-4">
          <h3 className="text-xs font-bold text-violet-700 mb-3">Quality Measures (6 selected)</h3>
          <div className="space-y-3">
            {MIPS_QUALITY_MEASURES.map((m) => (
              <div key={m.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">{m.name}</span>
                  <span className="text-violet-700 font-semibold">{qmRates[m.id]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={qmRates[m.id]}
                  onChange={(e) => setQmRates((p) => ({ ...p, [m.id]: Number(e.target.value) }))}
                  className="w-full accent-violet-600 h-1.5"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Decile {Math.floor(qmRates[m.id] / 10)}</span>
                  <span className="text-slate-400 italic">{m.specialty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PI Measures */}
        <div className="bg-white rounded-xl border border-violet-100 p-4">
          <h3 className="text-xs font-bold text-violet-700 mb-3">
            Promoting Interoperability — Score: {piScore.toFixed(0)}/100
          </h3>
          <div className="space-y-2">
            {PI_MEASURES.map((m) => (
              <label key={m.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!piEnabled[m.id]}
                  onChange={(e) => setPiEnabled((p) => ({ ...p, [m.id]: e.target.checked }))}
                  className="w-3.5 h-3.5 accent-violet-600"
                  disabled={m.required && !!piEnabled[m.id]}
                />
                <span className="text-xs text-slate-700 flex-1">{m.name}</span>
                {m.required && (
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>
                )}
                <span className="text-[10px] text-violet-600 font-semibold">+{m.baseScore}pts</span>
              </label>
            ))}
          </div>
          {/* Cost */}
          <div className="mt-4 border-t border-violet-100 pt-3">
            <div className="text-xs font-bold text-violet-700 mb-2">
              Cost — TPCC Percentile vs Peers: {costPercentile}th
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={costPercentile}
              onChange={(e) => setCostPercentile(Number(e.target.value))}
              className="w-full accent-violet-600 h-1.5"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0th (lowest cost)</span>
              <span>100th (highest cost)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Activities */}
      <div className="bg-white rounded-xl border border-violet-100 p-4">
        <h3 className="text-xs font-bold text-violet-700 mb-1">
          Improvement Activities — Score: {iaScore.toFixed(0)}/100
          <span className="text-slate-400 font-normal ml-2">
            ({[...selectedIA].reduce((s, id) => {
              const a = IMPROVEMENT_ACTIVITIES.find((x) => x.id === id);
              return s + (a?.points || 0);
            }, 0)}/40 pts selected)
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
          {IMPROVEMENT_ACTIVITIES.map((act) => (
            <label key={act.id} className="flex items-center gap-2 cursor-pointer hover:bg-violet-50 rounded px-1 py-0.5">
              <input
                type="checkbox"
                checked={selectedIA.has(act.id)}
                onChange={() => toggleIA(act.id)}
                className="w-3.5 h-3.5 accent-violet-600"
              />
              <span className="text-xs text-slate-700 flex-1">{act.name}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  act.points === 20 ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-slate-600"
                }`}
              >
                {act.points}pts
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 4: P4P ROI Calculator ────────────────────────────────────────────────

function P4PTab() {
  const [programName, setProgramName] = useState("Quality Improvement Initiative 2025");
  const [selectedMeasures, setSelectedMeasures] = useState<Set<string>>(new Set(["p1", "p4", "p5", "p12"]));
  const [memberCount, setMemberCount] = useState(10000);
  const [timeline, setTimeline] = useState(24); // months
  const [currentPerf, setCurrentPerf] = useState<Record<string, number>>(() =>
    Object.fromEntries(P4P_MEASURES.map((m) => [m.id, 55]))
  );
  const [targetPerf, setTargetPerf] = useState<Record<string, number>>(() =>
    Object.fromEntries(P4P_MEASURES.map((m) => [m.id, 70]))
  );

  // Cost inputs
  const [careManagementFTEs, setCareManagementFTEs] = useState(3);
  const [fteSalary, setFteSalary] = useState(75000);
  const [techCost, setTechCost] = useState(150000);
  const [trainingCost, setTrainingCost] = useState(30000);
  const [physicianIncentives, setPhysicianIncentives] = useState(50000);

  // Revenue inputs
  const [vbcBonusRate, setVbcBonusRate] = useState(2500); // $ per 1% improvement per 1000 members
  const [starRevenueLift, setStarRevenueLift] = useState(500000); // from stars tab
  const [readmissionSavings, setReadmissionSavings] = useState(200000);
  const [commercialP4PPool, setCommercialP4PPool] = useState(100000);

  const toggleMeasure = (id: string) => {
    setSelectedMeasures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedMeasuresList = P4P_MEASURES.filter((m) => selectedMeasures.has(m.id));

  const costs = useMemo(() => {
    const years = timeline / 12;
    const laborCost = careManagementFTEs * fteSalary * years;
    const total = laborCost + techCost + trainingCost + physicianIncentives;
    return { laborCost, total, annualized: total / years };
  }, [careManagementFTEs, fteSalary, techCost, trainingCost, physicianIncentives, timeline]);

  const revenue = useMemo(() => {
    const perMeasureRevenue = selectedMeasuresList.reduce((sum, m) => {
      const improvementPct = Math.max(0, (targetPerf[m.id] ?? 70) - (currentPerf[m.id] ?? 55));
      const membersK = memberCount / 1000;
      return sum + improvementPct * membersK * m.baseBonus * (timeline / 12);
    }, 0);
    const years = timeline / 12;
    const totalRevenue =
      perMeasureRevenue +
      starRevenueLift * years +
      readmissionSavings * years +
      commercialP4PPool * years;
    return { perMeasureRevenue, totalRevenue };
  }, [selectedMeasuresList, currentPerf, targetPerf, memberCount, timeline, starRevenueLift, readmissionSavings, commercialP4PPool, vbcBonusRate]);

  const roi = useMemo(() => {
    const net = revenue.totalRevenue - costs.total;
    const roiPct = costs.total > 0 ? (net / costs.total) * 100 : 0;
    const roiPerDollar = costs.total > 0 ? net / costs.total : 0;
    // Break-even: monthly revenue vs monthly cost
    const monthlyRevenue = revenue.totalRevenue / timeline;
    const monthlyInvestment = costs.total / timeline;
    // Simple: startup costs are tech+training+physician upfront, then ongoing labor
    const upfrontCost = techCost + trainingCost + physicianIncentives;
    const monthlyLaborCost = (careManagementFTEs * fteSalary) / 12;
    let breakEvenMonth = 0;
    let cumCost = upfrontCost;
    let cumRev = 0;
    for (let mo = 1; mo <= Math.max(timeline, 60); mo++) {
      cumCost += monthlyLaborCost;
      cumRev += monthlyRevenue;
      if (cumRev >= cumCost) {
        breakEvenMonth = mo;
        break;
      }
    }
    return { net, roiPct, roiPerDollar, breakEvenMonth };
  }, [revenue, costs, timeline, techCost, trainingCost, physicianIncentives, careManagementFTEs, fteSalary]);

  return (
    <div className="space-y-6">
      {/* Program Setup */}
      <div className="bg-white rounded-xl border border-violet-100 p-5">
        <h3 className="text-sm font-bold text-violet-800 mb-4">Program Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-violet-700 block mb-1">Program Name</label>
            <input
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full border border-violet-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-violet-700 block mb-1">
              Member Population: {memberCount.toLocaleString()}
            </label>
            <input
              type="range"
              min={1000}
              max={200000}
              step={1000}
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              className="w-full accent-violet-600 mt-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-violet-700 block mb-1">
              Program Timeline: {timeline} months
            </label>
            <input
              type="range"
              min={6}
              max={36}
              step={6}
              value={timeline}
              onChange={(e) => setTimeline(Number(e.target.value))}
              className="w-full accent-violet-600 mt-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>6mo</span><span>18mo</span><span>36mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Targeted Measures */}
      <div className="bg-white rounded-xl border border-violet-100 p-5">
        <h3 className="text-sm font-bold text-violet-800 mb-3">Targeted Quality Measures</h3>
        <div className="space-y-3">
          {P4P_MEASURES.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg border p-3 transition-all ${
                selectedMeasures.has(m.id)
                  ? "border-violet-300 bg-violet-50"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedMeasures.has(m.id)}
                  onChange={() => toggleMeasure(m.id)}
                  className="w-4 h-4 accent-violet-600"
                />
                <span className="text-xs font-semibold text-slate-800">{m.name}</span>
                <span className="ml-auto text-[10px] text-violet-600 font-semibold">
                  ${m.baseBonus.toLocaleString()}/1% per 1K members
                </span>
              </div>
              {selectedMeasures.has(m.id) && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Current: {currentPerf[m.id]}%</div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={currentPerf[m.id]}
                      onChange={(e) =>
                        setCurrentPerf((p) => ({ ...p, [m.id]: Number(e.target.value) }))
                      }
                      className="w-full accent-orange-400 h-1.5"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Target: {targetPerf[m.id]}%</div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={targetPerf[m.id]}
                      onChange={(e) =>
                        setTargetPerf((p) => ({ ...p, [m.id]: Number(e.target.value) }))
                      }
                      className="w-full accent-green-500 h-1.5"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Investment Inputs */}
        <div className="bg-white rounded-xl border border-red-100 p-5">
          <h3 className="text-sm font-bold text-red-700 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Investment Costs
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Care Management FTEs",
                value: careManagementFTEs,
                set: setCareManagementFTEs,
                min: 0,
                max: 20,
                step: 1,
                format: (v: number) => `${v} FTEs`,
              },
              {
                label: "Average FTE Salary",
                value: fteSalary,
                set: setFteSalary,
                min: 40000,
                max: 150000,
                step: 5000,
                format: (v: number) => `$${v.toLocaleString()}`,
              },
              {
                label: "Technology & Analytics",
                value: techCost,
                set: setTechCost,
                min: 0,
                max: 1000000,
                step: 10000,
                format: (v: number) => `$${v.toLocaleString()}`,
              },
              {
                label: "Training & Workflow Redesign",
                value: trainingCost,
                set: setTrainingCost,
                min: 0,
                max: 200000,
                step: 5000,
                format: (v: number) => `$${v.toLocaleString()}`,
              },
              {
                label: "Physician Incentive Costs",
                value: physicianIncentives,
                set: setPhysicianIncentives,
                min: 0,
                max: 500000,
                step: 10000,
                format: (v: number) => `$${v.toLocaleString()}`,
              },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{f.label}</span>
                  <span className="text-red-600 font-semibold">{f.format(f.value)}</span>
                </div>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={f.value}
                  onChange={(e) => f.set(Number(e.target.value))}
                  className="w-full accent-red-500 h-1.5"
                />
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-red-100 text-xs font-bold text-red-700 flex justify-between">
              <span>Total {timeline}-Month Investment</span>
              <span>${costs.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Revenue Inputs */}
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <h3 className="text-sm font-bold text-green-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Revenue Drivers
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Star Rating Revenue Uplift (annual)",
                value: starRevenueLift,
                set: setStarRevenueLift,
                min: 0,
                max: 10000000,
                step: 50000,
              },
              {
                label: "Readmission Penalty Savings (annual)",
                value: readmissionSavings,
                set: setReadmissionSavings,
                min: 0,
                max: 2000000,
                step: 10000,
              },
              {
                label: "Commercial P4P Bonus Pool (annual)",
                value: commercialP4PPool,
                set: setCommercialP4PPool,
                min: 0,
                max: 2000000,
                step: 10000,
              },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{f.label}</span>
                  <span className="text-green-600 font-semibold">${f.value.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={f.value}
                  onChange={(e) => f.set(Number(e.target.value))}
                  className="w-full accent-green-500 h-1.5"
                />
              </div>
            ))}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
              <div className="text-xs font-bold text-green-700 mb-1">VBC Quality Bonus Revenue</div>
              <div className="text-xs text-green-600 font-semibold">
                ${revenue.perMeasureRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="font-normal text-slate-500 ml-1">
                  from {selectedMeasuresList.length} measures over {timeline} months
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-green-100 text-xs font-bold text-green-700 flex justify-between">
              <span>Total {timeline}-Month Revenue</span>
              <span>${revenue.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div
        className={`rounded-2xl p-6 ${
          roi.net >= 0
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        } text-white`}
      >
        <div className="text-sm font-bold opacity-80 mb-4">{programName} — ROI Summary</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs opacity-70">Net Return</div>
            <div className="text-2xl font-black mt-1">
              {roi.net >= 0 ? "+" : "−"}${Math.abs(roi.net).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs opacity-70">ROI %</div>
            <div className="text-2xl font-black mt-1">
              {roi.roiPct >= 0 ? "+" : ""}{roi.roiPct.toFixed(0)}%
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs opacity-70">Return per $1 Invested</div>
            <div className="text-2xl font-black mt-1">
              ${(1 + roi.roiPerDollar).toFixed(2)}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs opacity-70">Break-Even</div>
            <div className="text-2xl font-black mt-1">
              {roi.breakEvenMonth > 0 ? `Mo. ${roi.breakEvenMonth}` : "N/A"}
            </div>
            <div className="text-xs opacity-70 mt-0.5">
              {roi.breakEvenMonth > 0 && roi.breakEvenMonth <= timeline
                ? "Within program"
                : roi.breakEvenMonth > timeline
                ? "After program end"
                : ""}
            </div>
          </div>
        </div>

        {/* Mini waterfall */}
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="opacity-70">Total Cost</div>
            <div className="font-bold text-base mt-1">${costs.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="opacity-70">Total Revenue</div>
            <div className="font-bold text-base mt-1">${revenue.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
          <div
            className={`rounded-lg p-3 ${roi.net >= 0 ? "bg-white/20" : "bg-white/5"}`}
          >
            <div className="opacity-70">Net</div>
            <div className="font-black text-base mt-1">
              {roi.net >= 0 ? "+" : "−"}${Math.abs(roi.net).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "hedis", label: "HEDIS Simulator", icon: BarChart2, short: "HEDIS" },
  { id: "stars", label: "CMS Stars Predictor", icon: Star, short: "Stars" },
  { id: "qpp", label: "QPP/MIPS Optimizer", icon: Award, short: "QPP/MIPS" },
  { id: "p4p", label: "P4P ROI Calculator", icon: DollarSign, short: "P4P ROI" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ClinicalQualityOptimizer() {
  const [activeTab, setActiveTab] = useState<TabId>("hedis");

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="ty-h2 font-black text-slate-900 leading-tight">
                Clinical Quality & Value Optimizer
              </h1>
              <p className="text-xs text-violet-600 font-medium">
                HEDIS · CMS Stars · QPP/MIPS · P4P ROI — Vermont Health Platform
              </p>
            </div>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 bg-white border border-violet-200 rounded-xl p-1 mb-6 shadow-sm overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap flex-1 justify-center transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow"
                  : "text-violet-600 hover:bg-violet-50"
              }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "hedis" && <HedisTab />}
          {activeTab === "stars" && <StarsTab />}
          {activeTab === "qpp" && <QPPTab />}
          {activeTab === "p4p" && <P4PTab />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-violet-400 border-t border-violet-100 pt-4">
          Clinical Quality & Value Optimizer — For planning and educational use only.
          Benchmark data sourced from NCQA HEDIS 2024, CMS Star Ratings Technical Notes, and QPP documentation.
        </div>
      </div>
    </div>
  );
}
