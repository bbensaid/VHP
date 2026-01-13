import { RHTProfile, SimulationProfile } from '@/lib/dashboard-types';

// --- HELPER: Generate Simulation Data for Non-Vermont States ---
const generateSimulatedHospital = (stateName: string): SimulationProfile => ({
  hospitalName: `${stateName} Rural General Hospital`,
  scenarios: {
    statusQuo: {
      label: "Status Quo",
      margin: -0.032,
      revenue: 45000000,
      expenses: 46440000,
      operatingIncome: -1440000
    },
    optimized: {
      label: "RHTP Optimized",
      margin: 0.015,
      revenue: 48500000,
      expenses: 47772500,
      operatingIncome: 727500
    }
  }
});

// --- HELPER: Generate Standard Grant Profile ---
const createStandardProfile = (id: string, name: string, amount: string): RHTProfile => ({
  id,
  stateName: name,
  awardAmount: amount,
  strategicFocus: [
    "Rural workforce development",
    "Telehealth infrastructure expansion"
  ],
  metrics: [
    { label: "Provider Retention", value: "+12%", trend: "up", status: "On Track" },
    { label: "Telehealth Visits", value: "+45%", trend: "up", status: "On Track" },
    { label: "Operating Margin", value: "Stabilized", trend: "neutral", status: "Pending" }
  ],
  initiatives: [
    {
      title: "Rural Health Workforce Pipeline",
      description: "Recruitment and retention incentives for rural primary care providers.",
      status: "Active"
    },
    {
      title: "Telehealth Hubs",
      description: "Establishing regional hubs to connect rural clinics with specialists.",
      status: "Planned"
    }
  ],
  simulation: generateSimulatedHospital(name)
});

export const rhtAwardsData: Record<string, RHTProfile> = {
  // 1. VERMONT (STRICT DATA)
  'vermont': {
    id: 'vermont',
    stateName: 'Vermont',
    awardAmount: '$195M',
    strategicFocus: [
      "Build robust rural networks",
      "Lower costs while improving quality",
      "Strengthen rural health workforce"
    ],
    metrics: [
      { label: "Mental Illness Follow-up", value: "78%", trend: "up", status: "On Track" },
      { label: "Substance Use Follow-up", value: "69%", trend: "up", status: "On Track" },
      { label: "Avoidable ED Visits", value: "Reduced", trend: "down", status: "On Track" }
    ],
    initiatives: [
      {
        title: "Mobile Integrated Health Model",
        description: "Paramedics delivering protocol-driven care in patient homes.",
        status: "Active"
      },
      {
        title: "Maple Mountain Consortium",
        description: "Family Medicine Residency Program to fix workforce shortages.",
        status: "Active"
      },
      {
        title: "Primary Care PMPM",
        description: "Per-member-per-month payments to incentivize access.",
        status: "Planned"
      }
    ],
    simulation: {
      hospitalName: "Northeastern Vermont Regional Hospital (NVRH)",
      scenarios: {
        statusQuo: {
          label: "Status Quo (Current Trend)",
          margin: -0.045, 
          revenue: 95000000,
          expenses: 99275000,
          operatingIncome: -4275000
        },
        optimized: {
          label: "Wyman Optimized",
          margin: 0.028, 
          revenue: 102000000,
          expenses: 99144000,
          operatingIncome: 2856000
        }
      }
    }
  },
  // 2. TEXAS
  'texas': {
    id: 'texas',
    stateName: 'Texas',
    awardAmount: '$281M',
    strategicFocus: "Lone Star AI & Community Wellness",
    metrics: [
      { label: "Dietician Ratio", value: "+15%", trend: "up", status: "Pending" },
      { label: "Fax Processing", value: "-50%", trend: "down", status: "On Track" }
    ],
    initiatives: [
      { title: "Lone Star AI", description: "Statewide specialty care network.", status: "Active" },
      { title: "Community Wellness Centers", description: "Chronic disease screenings.", status: "Planned" }
    ],
    simulation: generateSimulatedHospital('Texas')
  },
  // 3. CALIFORNIA
  'california': {
    id: 'california',
    stateName: 'California',
    awardAmount: '$234M',
    strategicFocus: "Maternal Care & Workforce",
    metrics: [
      { label: "Maternal Complications", value: "-10%", trend: "down", status: "On Track" },
      { label: "Telehealth Use", value: "+30%", trend: "up", status: "On Track" }
    ],
    initiatives: [
      { title: "Hub-and-Spoke Model", description: "Maternal and primary care networks.", status: "Active" },
      { title: "Project ECHO", description: "Telementorship for chronic disease.", status: "Active" }
    ],
    simulation: generateSimulatedHospital('California')
  },
  // REMAINING STATES
  'alabama': createStandardProfile('alabama', 'Alabama', '$203M'),
  'alaska': createStandardProfile('alaska', 'Alaska', '$272M'),
  'arizona': createStandardProfile('arizona', 'Arizona', '$167M'),
  'arkansas': createStandardProfile('arkansas', 'Arkansas', '$209M'),
  'colorado': createStandardProfile('colorado', 'Colorado', '$200M'),
  'connecticut': createStandardProfile('connecticut', 'Connecticut', '$154M'),
  'delaware': createStandardProfile('delaware', 'Delaware', '$157M'),
  'florida': createStandardProfile('florida', 'Florida', '$210M'),
  'georgia': createStandardProfile('georgia', 'Georgia', '$219M'),
  'hawaii': createStandardProfile('hawaii', 'Hawaii', '$189M'),
  'idaho': createStandardProfile('idaho', 'Idaho', '$186M'),
  'illinois': createStandardProfile('illinois', 'Illinois', '$193M'),
  'indiana': createStandardProfile('indiana', 'Indiana', '$207M'),
  'iowa': createStandardProfile('iowa', 'Iowa', '$209M'),
  'kansas': createStandardProfile('kansas', 'Kansas', '$222M'),
  'kentucky': createStandardProfile('kentucky', 'Kentucky', '$213M'),
  'louisiana': createStandardProfile('louisiana', 'Louisiana', '$208M'),
  'maine': createStandardProfile('maine', 'Maine', '$190M'),
  'maryland': createStandardProfile('maryland', 'Maryland', '$168M'),
  'massachusetts': createStandardProfile('massachusetts', 'Massachusetts', '$162M'),
  'michigan': createStandardProfile('michigan', 'Michigan', '$173M'),
  'minnesota': createStandardProfile('minnesota', 'Minnesota', '$193M'),
  'mississippi': createStandardProfile('mississippi', 'Mississippi', '$206M'),
  'missouri': createStandardProfile('missouri', 'Missouri', '$216M'),
  'montana': createStandardProfile('montana', 'Montana', '$234M'),
  'nebraska': createStandardProfile('nebraska', 'Nebraska', '$219M'),
  'nevada': createStandardProfile('nevada', 'Nevada', '$180M'),
  'new_hampshire': createStandardProfile('new_hampshire', 'New Hampshire', '$204M'),
  'new_jersey': createStandardProfile('new_jersey', 'New Jersey', '$147M'),
  'new_mexico': createStandardProfile('new_mexico', 'New Mexico', '$211M'),
  'new_york': createStandardProfile('new_york', 'New York', '$212M'),
  'north_carolina': createStandardProfile('north_carolina', 'North Carolina', '$213M'),
  'north_dakota': createStandardProfile('north_dakota', 'North Dakota', '$199M'),
  'ohio': createStandardProfile('ohio', 'Ohio', '$202M'),
  'oklahoma': createStandardProfile('oklahoma', 'Oklahoma', '$223M'),
  'oregon': createStandardProfile('oregon', 'Oregon', '$197M'),
  'pennsylvania': createStandardProfile('pennsylvania', 'Pennsylvania', '$193M'),
  'rhode_island': createStandardProfile('rhode_island', 'Rhode Island', '$156M'),
  'south_carolina': createStandardProfile('south_carolina', 'South Carolina', '$200M'),
  'south_dakota': createStandardProfile('south_dakota', 'South Dakota', '$189M'),
  'tennessee': createStandardProfile('tennessee', 'Tennessee', '$207M'),
  'utah': createStandardProfile('utah', 'Utah', '$196M'),
  'virginia': createStandardProfile('virginia', 'Virginia', '$190M'),
  'washington': createStandardProfile('washington', 'Washington', '$181M'),
  'west_virginia': createStandardProfile('west_virginia', 'West Virginia', '$199M'),
  'wisconsin': createStandardProfile('wisconsin', 'Wisconsin', '$204M'),
  'wyoming': createStandardProfile('wyoming', 'Wyoming', '$205M')
};