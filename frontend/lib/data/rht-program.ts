import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  BuildingOffice2Icon 
} from '@heroicons/react/24/outline';

// --- DATA TYPES ---
export interface RHTInitiative {
  title: string;
  description: string;
  status: 'Active' | 'Planned' | 'Completed';
}

export interface RHTMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  status: 'On Track' | 'Pending' | 'At Risk';
}

export interface RHTProfile {
  id: string;
  stateName: string;
  awardAmount: string;
  strategicFocus: string;
  metrics: RHTMetric[];
  initiatives: RHTInitiative[];
}

// --- LIVE RHT PROGRAM DATA (FY2026 AWARDS - 50 STATES) ---
export const rhtProgramData: Record<string, RHTProfile> = {
  
  // --- NORTHEAST ---
  'vermont': {
    id: 'vermont',
    stateName: 'Vermont',
    awardAmount: '$195M', 
    strategicFocus: 'Primary Care, Long-Term Support & Workforce',
    metrics: [
      { label: 'MH Follow-up (30d)', value: '78%', trend: 'up', status: 'On Track' }, 
      { label: 'SUD Follow-up', value: '69%', trend: 'up', status: 'On Track' },
      { label: 'ED Utilization', value: 'Reducing', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Mobile Integrated Health', description: 'Deploying specially trained paramedics/EMTs for home-based post-discharge and primary care follow-up.', status: 'Active' },
      { title: 'Maple Mountain Residency', description: 'Establishing a new Family Medicine Residency Program to address rural physician shortages.', status: 'Planned' },
      { title: 'Primary Care PMPM', description: 'New Per-Member-Per-Month payment model incentivizing practices that meet specific access requirements.', status: 'Active' },
      { title: 'Bed Tracking System', description: 'Real-time data platform to track bed availability and patient transfers across the rural network.', status: 'Active' }
    ]
  },
  'maine': {
    id: 'maine',
    stateName: 'Maine',
    awardAmount: '$190M',
    strategicFocus: 'Rural Ambulance & EMS Stabilization',
    metrics: [
      { label: 'BP Control', value: '+10%', trend: 'up', status: 'On Track' },
      { label: 'Readmissions', value: '-10%', trend: 'down', status: 'On Track' },
      { label: 'Delayed Care', value: '-10%', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Maine Rural AI Hub', description: 'Partnership with Duke University to create an AI innovation hub for rural providers.', status: 'Active' },
      { title: 'Community Paramedicine', description: 'New reimbursement models to sustain EMS involvement in primary care.', status: 'Active' },
      { title: 'School-Based Health', description: 'Expanding centers that offer dental and mental health alongside preventive care.', status: 'Active' }
    ]
  },
  'new_hampshire': {
    id: 'new_hampshire',
    stateName: 'New Hampshire',
    awardAmount: '$204M',
    strategicFocus: 'Behavioral Health & Crisis Networks',
    metrics: [
      { label: 'Preventative Dental', value: '2/yr', trend: 'up', status: 'On Track' },
      { label: 'Rural Nurses', value: '+4%', trend: 'up', status: 'On Track' },
      { label: 'Safety Net Closures', value: '0', trend: 'neutral', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Pharmacy Transformation', description: 'Community lockboxes and AI-driven polypharmacy risk reduction.', status: 'Active' },
      { title: 'Virtual-First Primary Care', description: 'Digital-first model to expand access in remote regions.', status: 'Active' },
      { title: 'Tele-Specialty Hubs', description: 'Coordinated intake for tele-psychiatry, critical care, and obstetrics.', status: 'Active' }
    ]
  },
  'massachusetts': {
    id: 'massachusetts',
    stateName: 'Massachusetts',
    awardAmount: '$162M',
    strategicFocus: 'Community Health & Mobile Integration',
    metrics: [
      { label: 'Hypertension ED', value: '-10k', trend: 'down', status: 'On Track' },
      { label: 'Preventative Visits', value: '+25/1k', trend: 'up', status: 'On Track' },
      { label: 'Food Insecurity', value: '-5%', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Mobile Health Units', description: 'Tech-enabled units with diagnostic equipment and telemedicine support.', status: 'Active' },
      { title: 'Beds Not Buildings', description: 'Live cross-agency platform to track behavioral health bed availability.', status: 'Active' },
      { title: 'Workforce THRIVE', description: 'Targeted recruitment and retention for rural health professionals.', status: 'Active' }
    ]
  },
  'rhode_island': {
    id: 'rhode_island',
    stateName: 'Rhode Island',
    awardAmount: '$156M',
    strategicFocus: 'Technology & Remote Care',
    metrics: [
      { label: 'Well-Care Visits', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'EMS Response', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Home Services', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'EHR Platform', description: 'State-sponsored EHR platform and infrastructure grants for small practices.', status: 'Active' },
      { title: 'Tele-Dentistry', description: 'Remote care services including tele-dentistry triage.', status: 'Active' },
      { title: 'Rural HIT Modernization', description: 'Infrastructure grants for telehealth platforms and remote monitoring.', status: 'Active' }
    ]
  },
  'connecticut': {
    id: 'connecticut',
    stateName: 'Connecticut',
    awardAmount: '$154M',
    strategicFocus: 'Maternal Health & Crisis Stabilization',
    metrics: [
      { label: 'Maternal Service', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ED Utilization', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Licensure', value: '+5%', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Nurse Home Visits', description: 'Universal nurse home-visits across rural regions for maternal/newborn support.', status: 'Active' },
      { title: 'Crisis Stabilization', description: '23-hour crisis-stabilization centers linked to rural hospitals.', status: 'Active' },
      { title: 'Mobile Services', description: 'Mobile services in primary, dental, and behavioral health care.', status: 'Active' }
    ]
  },
  'new_york': {
    id: 'new_york',
    stateName: 'New York',
    awardAmount: '$212M',
    strategicFocus: 'Safety Net Transformation & Primary Care',
    metrics: [
      { label: 'Preventable ER', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Maternal Health', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Workforce Gap', value: 'Dec', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Rural Roots', description: 'Workforce model emphasizing maternal care, lactation counseling, and OB simulation.', status: 'Active' },
      { title: 'eConsult Platform', description: 'Statewide specialist consultation platform to reduce wait times.', status: 'Active' },
      { title: 'Rural Integration', description: 'Formal partnership network across hospitals, FQHCs, and CBOs.', status: 'Active' }
    ]
  },
  'new_jersey': {
    id: 'new_jersey',
    stateName: 'New Jersey',
    awardAmount: '$147M',
    strategicFocus: 'Infrastructure & Telehealth',
    metrics: [
      { label: 'Rural Providers', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Preventative Care', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Hospital Stability', value: 'Stable', trend: 'neutral', status: 'On Track' }
    ],
    initiatives: [
      { title: 'CCBHC Transition', description: 'Supporting CCBHCs to transition from federal to Medicaid funding.', status: 'Active' },
      { title: 'Telehealth Access', description: 'Developing telehealth access points in public areas and clinician training.', status: 'Active' },
      { title: 'Innovation Engine', description: 'Funding for existing Healthcare Innovation Engine for tech innovations.', status: 'Active' }
    ]
  },
  'pennsylvania': {
    id: 'pennsylvania',
    stateName: 'Pennsylvania',
    awardAmount: '$193M',
    strategicFocus: 'Regional Hubs & Workforce',
    metrics: [
      { label: 'Vacancy Rate', value: '-10%', trend: 'down', status: 'On Track' },
      { label: 'SUD Engagement', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Paramedicine', value: 'Adopted', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Regional Hub Model', description: '8 Regional Care Collaboratives sharing technical expertise and services.', status: 'Active' },
      { title: 'Rural Training', description: 'Scholarships and housing for students committing to 5 years of rural service.', status: 'Planned' },
      { title: 'Digital Models', description: 'Scaling app-based care for maternal and behavioral health.', status: 'Active' }
    ]
  },
  'delaware': {
    id: 'delaware',
    stateName: 'Delaware',
    awardAmount: '$157M',
    strategicFocus: 'Workforce & Mobile Access',
    metrics: [
      { label: 'Mobile Reach', value: '1500/yr', trend: 'up', status: 'On Track' },
      { label: 'Residency Retention', value: '50%', trend: 'up', status: 'On Track' },
      { label: 'Primary Care', value: 'Improving', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Medical School', description: 'Establishing first four-year medical school with rural track.', status: 'Planned' },
      { title: 'Hope Centers', description: 'Integrated housing and care centers for unhoused and rural populations.', status: 'Active' },
      { title: 'Mobile Units', description: 'Deploying mobile health units and health pods.', status: 'Active' }
    ]
  },
  'maryland': {
    id: 'maryland',
    stateName: 'Maryland',
    awardAmount: '$168M',
    strategicFocus: 'Aging & Chronic Disease',
    metrics: [
      { label: 'Infrastructure', value: 'Improved', trend: 'up', status: 'On Track' },
      { label: 'Data Sharing', value: 'Active', trend: 'up', status: 'On Track' },
      { label: 'Nutrition Ed', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'SUD Case Mgmt', description: 'Intensive case management programs for older adults with substance use disorders.', status: 'Active' },
      { title: 'Tech Chronic Care', description: 'Deploying tech-enabled chronic disease management (remote monitoring).', status: 'Active' },
      { title: 'Eat for Health', description: 'Post-harvest infrastructure and mobile markets for healthy food access.', status: 'Active' }
    ]
  },
  'virginia': {
    id: 'virginia',
    stateName: 'Virginia',
    awardAmount: '$190M',
    strategicFocus: 'Food as Medicine & Maternal Care',
    metrics: [
      { label: 'Chronic Disease', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Primary Access', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'SUD Rates', value: 'Dec', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Food as Medicine', description: 'Infrastructure for food pharmacy programs and medically tailored meals.', status: 'Active' },
      { title: 'Innovative Maternal', description: 'Expanding rural prenatal services through hubs and mobile units.', status: 'Active' },
      { title: 'CareIQ', description: 'Invest in health tech startups and modernize EHRs.', status: 'Active' }
    ]
  },
  'west_virginia': {
    id: 'west_virginia',
    stateName: 'West Virginia',
    awardAmount: '$199M',
    strategicFocus: 'Workforce & Mobility',
    metrics: [
      { label: 'Workforce Partic.', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Health Outcomes', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Provider Cap', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Rural Health Link', description: 'Health mobility platform to dispatch non-emergency medical transportation.', status: 'Active' },
      { title: 'Mountain State Care', description: 'Attract talent and train/retain rural clinicians via incentives.', status: 'Active' },
      { title: 'Connected Care Grid', description: 'Integrating telehealth, remote monitoring, and local care coordination.', status: 'Active' }
    ]
  },

  // --- SOUTH ---
  'alabama': {
    id: 'alabama',
    stateName: 'Alabama',
    awardAmount: '$203M',
    strategicFocus: 'Maternal Health & Cancer Digital',
    metrics: [
      { label: 'Hubs Est.', value: '5', trend: 'up', status: 'On Track' },
      { label: 'Screenings', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ER Diversions', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Maternal Initiative', description: 'Digital maternity care using telerobotic ultrasound and delivery carts.', status: 'Active' },
      { title: 'Cancer Digital', description: 'Local referral hubs and mobile units for cancer prevention/detection.', status: 'Active' },
      { title: 'Collaborative EHR', description: 'Regional IT hubs supporting EHR integration and cybersecurity.', status: 'Active' }
    ]
  },
  'arkansas': {
    id: 'arkansas',
    stateName: 'Arkansas',
    awardAmount: '$209M',
    strategicFocus: 'Hospital Stabilization & Heart Health',
    metrics: [
      { label: 'Wellness Eng.', value: '12.5k', trend: 'up', status: 'On Track' },
      { label: 'EMS Response', value: '-15%', trend: 'down', status: 'On Track' },
      { label: 'Clinicians Recr.', value: '100', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'SAFE Initiative', description: 'System Acquisition & Facility Enhancement Fund to stabilize vulnerable facilities.', status: 'Active' },
      { title: 'HEART Initiative', description: 'Six-pronged effort to reduce chronic disease (heart disease focus).', status: 'Active' },
      { title: 'THRIVE', description: 'Telehealth and remote monitoring for chronic diseases.', status: 'Active' }
    ]
  },
  'florida': {
    id: 'florida',
    stateName: 'Florida',
    awardAmount: '$210M',
    strategicFocus: 'Regional Collaboratives & Paramedicine',
    metrics: [
      { label: 'Access', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Workforce', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Outcomes', value: 'Tracking', trend: 'neutral', status: 'Pending' }
    ],
    initiatives: [
      { title: 'Regional Collaboratives', description: 'Shared planning to improve efficiency and leverage urban specialty resources.', status: 'Active' },
      { title: 'Community Paramedicine', description: 'Paramedics providing on-site minor illness support and post-discharge care.', status: 'Active' },
      { title: 'Remote Monitoring', description: 'BP, glucose, and weight tracking integrated with mobile health units.', status: 'Active' }
    ]
  },
  'georgia': {
    id: 'georgia',
    stateName: 'Georgia',
    awardAmount: '$219M',
    strategicFocus: 'Maternal Care & AHEAD Adoption',
    metrics: [
      { label: 'Nursing Faculty', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Robotic Proc.', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ED Utilization', value: 'Dec', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Obstetric Carts', description: 'Deploying OB carts to rural EDs without labor & delivery units.', status: 'Active' },
      { title: 'AHEAD Adoption', description: 'Preparing hospitals for the AHEAD global budget model.', status: 'Planned' },
      { title: 'GREAT Health', description: 'Comprehensive program for rural enhancement and transformation.', status: 'Active' }
    ]
  },
  'kentucky': {
    id: 'kentucky',
    stateName: 'Kentucky',
    awardAmount: '$213M',
    strategicFocus: 'Chronic Disease Hubs & Maternal Teams',
    metrics: [
      { label: 'Chronic Disease', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Perinatal Access', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Crisis Care', value: 'Exp', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Chronic Care Hubs', description: 'Coordinated system for interventions across chronic disease continuum (diabetes focus).', status: 'Active' },
      { title: 'PoWERing Maternal', description: 'Community-based teams for pregnancy and post-partum support.', status: 'Active' },
      { title: 'Rooted in Health', description: 'Rural dental access program with mobile services.', status: 'Active' }
    ]
  },
  'louisiana': {
    id: 'louisiana',
    stateName: 'Louisiana',
    awardAmount: '$208M',
    strategicFocus: 'Workforce & Technology Capacity',
    metrics: [
      { label: 'BH Care 30d', value: '+15%', trend: 'up', status: 'On Track' },
      { label: 'Travel Distance', value: '-15%', trend: 'down', status: 'On Track' },
      { label: 'EMS Response', value: '-10%', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Clinician Credit Bank', description: 'Targeted tax-credit incentives for high-need parishes.', status: 'Active' },
      { title: 'Tech Capacity Fund', description: 'Smartphones with health apps and shared IT Help Desk for rural sites.', status: 'Active' },
      { title: 'CRIS Initiative', description: 'Coordinated Regional Integrated Systems for EMS and behavioral health.', status: 'Active' }
    ]
  },
  'mississippi': {
    id: 'mississippi',
    stateName: 'Mississippi',
    awardAmount: '$206M',
    strategicFocus: 'Coordinated Regional Systems',
    metrics: [
      { label: 'Transport', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Retention', value: 'High', trend: 'up', status: 'On Track' },
      { label: 'Telehealth', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'CRIS Initiative', description: 'Creating regional Rural Healthcare Districts to avoid fragmentation.', status: 'Active' },
      { title: 'EMS Treat-in-Place', description: 'Pilot program allowing EMS to treat patients on-site without transport.', status: 'Active' },
      { title: 'AI Decision Support', description: 'Algorithmic support tools for rural clinicians.', status: 'Active' }
    ]
  },
  'north_carolina': {
    id: 'north_carolina',
    stateName: 'North Carolina',
    awardAmount: '$213M',
    strategicFocus: 'Community Care Hubs',
    metrics: [
      { label: 'ROOTS Hubs', value: 'Active', trend: 'up', status: 'On Track' },
      { label: 'SUD Treatment', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'VBP Readiness', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'ROOTS Hubs', description: '6 regional hubs tailored to local needs to coordinate care.', status: 'Active' },
      { title: 'Mobile SUD', description: 'Mobile units delivering medication-assisted treatment.', status: 'Active' },
      { title: 'CCBHC Expansion', description: 'Standardizing and expanding Certified Community Behavioral Health Clinics.', status: 'Active' }
    ]
  },
  'oklahoma': {
    id: 'oklahoma',
    stateName: 'Oklahoma',
    awardAmount: '$223M',
    strategicFocus: 'Upstream Prevention & Wellness',
    metrics: [
      { label: 'Hosp. Visits', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Outcomes', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Access', value: 'Imp', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Moving Upstream', description: 'Community-driven prevention programs using consumer-facing tech.', status: 'Active' },
      { title: 'Wellness Hubs', description: 'Competitive microgrants for local health departments to address unmet wellness demand.', status: 'Active' },
      { title: 'Native Compacts', description: 'New agreements for state-tribal care coordination.', status: 'Active' }
    ]
  },
  'south_carolina': {
    id: 'south_carolina',
    stateName: 'South Carolina',
    awardAmount: '$200M',
    strategicFocus: 'Digital Literacy & Tech Catalyst',
    metrics: [
      { label: 'Chronic Mgmt', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Capacity', value: 'Enh', trend: 'up', status: 'On Track' },
      { label: 'Innovation', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Connections to Care', description: 'Improving digital health literacy to increase telehealth adoption.', status: 'Active' },
      { title: 'Tech Catalyst Fund', description: 'Investment in rural health startups and community innovations.', status: 'Active' },
      { title: 'Wellness Within Reach', description: 'Deploys mobile health units and crisis response teams.', status: 'Active' }
    ]
  },
  'tennessee': {
    id: 'tennessee',
    stateName: 'Tennessee',
    awardAmount: '$207M',
    strategicFocus: 'Dementia Care & NEMT',
    metrics: [
      { label: 'Maternity Desert', value: '0', trend: 'down', status: 'On Track' },
      { label: 'Preventative', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Workforce', value: 'Exp', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Memory Care Network', description: 'Hub-and-spoke model connecting rural Memory Assessment Centers to urban Neuropsychiatry.', status: 'Active' },
      { title: 'Rural NEMT', description: 'Tech-enabled transportation coordination for non-emergency medical travel.', status: 'Active' },
      { title: 'Maternal Health', description: 'Investments to eliminate maternity care deserts statewide.', status: 'Active' }
    ]
  },
  'texas': {
    id: 'texas',
    stateName: 'Texas',
    awardAmount: '$281M',
    strategicFocus: 'Technology, Workforce & AI',
    metrics: [
      { label: 'Dietician Ratio', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'RPM Adoption', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Fax Auto', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Lone Star AI', description: 'Connecting fragmented specialty telehealth into a statewide network.', status: 'Active' },
      { title: 'Wellness Centers', description: 'Local hubs for chronic disease screening, fitness, and nutrition.', status: 'Active' },
      { title: 'After-Hours Clinics', description: 'New primary care access points to reduce non-emergent ED use.', status: 'Active' }
    ]
  },

  // --- MIDWEST ---
  'illinois': {
    id: 'illinois',
    stateName: 'Illinois',
    awardAmount: '$193M',
    strategicFocus: 'Community Infrastructure & EMS',
    metrics: [
      { label: 'Access', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Financial', value: 'Stable', trend: 'neutral', status: 'On Track' },
      { label: 'Provider Ratio', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Community Care', description: 'Funding for staffing/workflows to integrate primary and behavioral health.', status: 'Active' },
      { title: 'EMS Treat-Not-Transport', description: 'Medicaid payment for on-site EMS care to reduce hospitalizations.', status: 'Planned' },
      { title: 'Workforce Expansion', description: 'Training for CHWs, doulas, and lactation consultants.', status: 'Active' }
    ]
  },
  'indiana': {
    id: 'indiana',
    stateName: 'Indiana',
    awardAmount: '$207M',
    strategicFocus: 'Care Coordination & Meds',
    metrics: [
      { label: 'Chronic Disease', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Access', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Interop', value: 'Imp', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Med Ops Center', description: 'Medical Operations Coordination Center for patient transfer/diversion.', status: 'Active' },
      { title: 'Post-Discharge Meds', description: 'Providing patients medications prior to leaving hospital at outpatient prices.', status: 'Active' },
      { title: 'GROW Initiative', description: 'Landmark transformation program expanding Make Indiana Healthy Again.', status: 'Active' }
    ]
  },
  'iowa': {
    id: 'iowa',
    stateName: 'Iowa',
    awardAmount: '$209M',
    strategicFocus: 'Skin Cancer & Digital Literacy',
    metrics: [
      { label: 'ED Visits', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Local Care', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Telehealth', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Dermatoscopes', description: 'Distributing equipment to rural providers for early skin cancer detection.', status: 'Active' },
      { title: 'Connections to Care', description: 'Improving digital health literacy to increase telehealth adoption.', status: 'Active' },
      { title: 'Hometown Connections', description: 'Building formal partnerships to restructure healthcare delivery.', status: 'Active' }
    ]
  },
  'kansas': {
    id: 'kansas',
    stateName: 'Kansas',
    awardAmount: '$222M',
    strategicFocus: 'PACE & Value-Based Care',
    metrics: [
      { label: 'Chronic Disease', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Hospital Margin', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'VBC Partic.', value: '100%', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'PACE Expansion', description: 'Expanding PACE programs in regions with high eligible beneficiaries.', status: 'Active' },
      { title: 'Accountable FIM', description: 'Food is Medicine and CHW Development program.', status: 'Active' },
      { title: 'Shadow VBC', description: 'Program for providers not in MSSP/ACO REACH to transition to VBC.', status: 'Active' }
    ]
  },
  'michigan': {
    id: 'michigan',
    stateName: 'Michigan',
    awardAmount: '$173M',
    strategicFocus: 'Aging & Youth Pipeline',
    metrics: [
      { label: 'EHR Use', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ED Util', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Workforce', value: 'Stab', trend: 'neutral', status: 'Pending' }
    ],
    initiatives: [
      { title: 'HS Pipeline', description: 'Transitioning high school students to health professions in home communities.', status: 'Active' },
      { title: 'Healthy Aging', description: 'Expanding community-based care for older adults in the Upper Peninsula.', status: 'Active' },
      { title: 'Interoperability', description: 'Modernizing health information exchange for rural providers.', status: 'Active' }
    ]
  },
  'minnesota': {
    id: 'minnesota',
    stateName: 'Minnesota',
    awardAmount: '$193M',
    strategicFocus: 'Cardiometabolic & Mental Health',
    metrics: [
      { label: 'Avoidable Hosp', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'VBC Capacity', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Tech Use', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Recruit Talent', description: 'Exposing rural HS students to careers and reducing provider burnout.', status: 'Active' },
      { title: 'Regional Care', description: 'Mental health urgent care centers and tele-specialty connections.', status: 'Active' },
      { title: 'Cardiometabolic', description: 'Improving outcomes for heart disease, diabetes, and kidney disease.', status: 'Active' }
    ]
  },
  'missouri': {
    id: 'missouri',
    stateName: 'Missouri',
    awardAmount: '$216M',
    strategicFocus: 'Hub-and-Spoke & APM',
    metrics: [
      { label: 'Primary Visits', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ED Visits', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Workforce', value: 'High', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'ToRCH Care', description: 'Hub-and-spoke model with 7 regional networks and 30 local hubs.', status: 'Active' },
      { title: 'APM Design', description: 'Alternative payment model incentivizing reductions in ED visits/admissions.', status: 'Planned' },
      { title: 'Digital Backbone', description: 'Rural Health Data Collaborative for interoperability.', status: 'Active' }
    ]
  },
  'nebraska': {
    id: 'nebraska',
    stateName: 'Nebraska',
    awardAmount: '$219M',
    strategicFocus: 'Food as Medicine & Workforce',
    metrics: [
      { label: 'Process', value: 'Focus', trend: 'neutral', status: 'On Track' },
      { label: 'Enrollment', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Obesity', value: 'Dec', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'School Food Lab', description: 'School-farm interconnectivity and partnerships.', status: 'Active' },
      { title: 'SNAP E&T', description: 'Using SNAP E&T to assist eligible individuals in finding healthcare jobs.', status: 'Active' },
      { title: 'VR/AR Training', description: 'VR/AR-based training for rural providers and remote patient monitoring.', status: 'Active' }
    ]
  },
  'north_dakota': {
    id: 'north_dakota',
    stateName: 'North Dakota',
    awardAmount: '$199M',
    strategicFocus: 'Consumer Tech & Workforce',
    metrics: [
      { label: 'Train-in-Place', value: '5', trend: 'up', status: 'On Track' },
      { label: 'Wellness', value: '40', trend: 'up', status: 'On Track' },
      { label: 'Protocol Comp', value: '90%', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Consumer Tech', description: 'Automated pharmacy kiosks, self-collected lab specimens, and drone delivery.', status: 'Active' },
      { title: 'Scrubs Camp', description: 'Immersion experiences for grades 5-12 to build workforce pipeline.', status: 'Active' },
      { title: 'Tribal Residency', description: 'Expansion of residency slots and creation of Tribal residency opportunities.', status: 'Active' }
    ]
  },
  'ohio': {
    id: 'ohio',
    stateName: 'Ohio',
    awardAmount: '$202M',
    strategicFocus: 'Innovation Hubs & Mobile',
    metrics: [
      { label: 'Cost of Care', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'A1C', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Hypertension', value: 'Mgd', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Innovation Hubs', description: 'Integrated networks of hospitals, clinics, pharmacies to improve access.', status: 'Active' },
      { title: 'School-Based', description: 'Clinics in K-12/colleges for primary, dental, and behavioral care.', status: 'Active' },
      { title: 'OH SEE', description: 'Mobile vision, dental, and hearing care network.', status: 'Active' }
    ]
  },
  'south_dakota': {
    id: 'south_dakota',
    stateName: 'South Dakota',
    awardAmount: '$189M',
    strategicFocus: 'Provider Capacity & Maternal Hubs',
    metrics: [
      { label: 'Tech Connect', value: 'High', trend: 'up', status: 'On Track' },
      { label: 'Workforce', value: 'Adv', trend: 'up', status: 'On Track' },
      { label: 'Sustainability', value: 'Trans', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Maternal Hubs', description: 'Regional hubs for maternal/infant care coordination and social support.', status: 'Active' },
      { title: 'Primary Accountable', description: 'Alternative payment model with flexible capitated payments.', status: 'Active' },
      { title: 'Direct Investment', description: 'Prioritizing direct investment in provider capacity over new programs.', status: 'Active' }
    ]
  },
  'wisconsin': {
    id: 'wisconsin',
    stateName: 'Wisconsin',
    awardAmount: '$204M',
    strategicFocus: 'Farmer Wellness & Interoperability',
    metrics: [
      { label: 'Chronic Disease', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'Behavioral ID', value: 'Early', trend: 'up', status: 'On Track' },
      { label: 'Efficiency', value: 'Enh', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Dental Grants', description: 'Funds for efficient cleaning tech and routine dental services.', status: 'Active' },
      { title: 'Farmer Wellness', description: '24-hour helpline, counseling vouchers, and support groups for farmers.', status: 'Active' },
      { title: 'Partnerships', description: 'Competitive grants for coordinated systems of care.', status: 'Active' }
    ]
  },

  // --- WEST ---
  'alaska': {
    id: 'alaska',
    stateName: 'Alaska',
    awardAmount: '$272M',
    strategicFocus: 'Pharmacy & Maternal Tech',
    metrics: [
      { label: 'Mortality Gap', value: 'Close 50%', trend: 'down', status: 'On Track' },
      { label: 'Fresh Start', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'APM Partic.', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Pharmacy Capacity', description: 'Drone delivery, remote dispensing, and portable diagnosis tools.', status: 'Active' },
      { title: 'Maternal Infra', description: 'Remote fetal monitoring and coordinated case management.', status: 'Active' },
      { title: 'Healthy Beginnings', description: 'Strengthening maternal and child health foundations.', status: 'Active' }
    ]
  },
  'arizona': {
    id: 'arizona',
    stateName: 'Arizona',
    awardAmount: '$167M',
    strategicFocus: 'Clinical Rotations & Mobile',
    metrics: [
      { label: 'Recruitment', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Telehealth', value: 'Exp', trend: 'up', status: 'On Track' },
      { label: 'Preventive', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Clinical Rotations', description: 'New residency slots and educational incentives for rural service.', status: 'Active' },
      { title: 'Mobile Clinics', description: 'Deploying mobile/satellite clinics to close access gaps.', status: 'Active' },
      { title: 'Digital Mod.', description: 'Investing in electronic billing capabilities and telehealth equipment.', status: 'Active' }
    ]
  },
  'california': {
    id: 'california',
    stateName: 'California',
    awardAmount: '$234M',
    strategicFocus: 'Maternal Hub-and-Spoke',
    metrics: [
      { label: 'Complications', value: 'Fewer', trend: 'down', status: 'On Track' },
      { label: 'Capacity', value: 'Exp', trend: 'up', status: 'On Track' },
      { label: 'Bypass', value: 'Red', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Hub-and-Spoke', description: 'Statewide network for maternal and primary care.', status: 'Active' },
      { title: 'OB Nest', description: 'Virtual nurse contacts and home monitoring for prenatal care.', status: 'Active' },
      { title: 'Project ECHO', description: 'Telementorship for chronic disease management.', status: 'Active' }
    ]
  },
  'colorado': {
    id: 'colorado',
    stateName: 'Colorado',
    awardAmount: '$200M',
    strategicFocus: 'Telehealth & Prevention',
    metrics: [
      { label: 'Telehealth', value: 'Exp', trend: 'up', status: 'On Track' },
      { label: 'Partnerships', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Stability', value: 'Stab', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Telehealth Integration', description: 'Expansion of mobile health and statewide tech readiness assessment.', status: 'Active' },
      { title: 'Chronic Prevention', description: 'Education and care coordination for high-priority conditions.', status: 'Active' },
      { title: 'Hospital Sustain', description: 'Diversifying revenue streams and operational capacity.', status: 'Active' }
    ]
  },
  'hawaii': {
    id: 'hawaii',
    stateName: 'Hawaii',
    awardAmount: '$189M',
    strategicFocus: 'Digital Backbone & Respite',
    metrics: [
      { label: 'Remote Access', value: 'Enabled', trend: 'up', status: 'On Track' },
      { label: 'Workforce', value: 'Building', trend: 'up', status: 'On Track' },
      { label: 'Emerg. Util', value: 'Red', trend: 'down', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Health Info Net', description: 'Statewide digital backbone connecting rural sites via interoperable EHRs.', status: 'Active' },
      { title: 'Respite Network', description: 'Medical respite model for unhoused patients to reduce hospital use.', status: 'Active' },
      { title: 'AHEAD Readiness', description: 'Financing local value-based innovations.', status: 'Planned' }
    ]
  },
  'idaho': {
    id: 'idaho',
    stateName: 'Idaho',
    awardAmount: '$186M',
    strategicFocus: 'Tech Access & Tribal',
    metrics: [
      { label: 'Care Access', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'ED Visits', value: 'Red', trend: 'down', status: 'On Track' },
      { label: 'Recruitment', value: 'Pos', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Tech Access', description: 'Tele-pharmacy dispensing and AI data analytics tools.', status: 'Active' },
      { title: 'Infrastructure', description: 'Renovations for safety code compliance and facility efficiency.', status: 'Active' },
      { title: 'Tribal Set-Aside', description: '3.5% funding reserved for Tribal nation plans.', status: 'Active' }
    ]
  },
  'montana': {
    id: 'montana',
    stateName: 'Montana',
    awardAmount: '$234M',
    strategicFocus: 'Center of Excellence',
    metrics: [
      { label: 'Clinician Count', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'ED Utilization', value: 'Red', trend: 'down', status: 'On Track' },
      { label: 'HIE Partic.', value: 'Higher', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Rural CoE', description: 'Center of Excellence to oversee restructuring of care availability.', status: 'Active' },
      { title: 'Innovative Payments', description: 'Supporting value-based care and modernizing EMS.', status: 'Active' },
      { title: 'Pharmacist Access', description: 'Extending access to lower-cost care from pharmacists.', status: 'Active' }
    ]
  },
  'nevada': {
    id: 'nevada',
    stateName: 'Nevada',
    awardAmount: '$180M',
    strategicFocus: 'Outcomes Accelerator',
    metrics: [
      { label: 'Provider Count', value: '+25%', trend: 'up', status: 'On Track' },
      { label: 'Suicide Rate', value: 'Dec', trend: 'down', status: 'On Track' },
      { label: 'Telehealth', value: '+25%', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Outcomes Accelerator', description: 'Deploying value-based care and online collaborative care.', status: 'Active' },
      { title: 'Workforce Recruit', description: '$80M investment in incentives for living/serving in rural areas.', status: 'Active' },
      { title: 'Mobile Units', description: 'Ensuring each rural region has at least one additional mobile unit.', status: 'Active' }
    ]
  },
  'new_mexico': {
    id: 'new_mexico',
    stateName: 'New Mexico',
    awardAmount: '$211M',
    strategicFocus: 'Specialty & Workforce',
    metrics: [
      { label: 'Chronic Risk', value: 'Red', trend: 'down', status: 'On Track' },
      { label: 'Capacity', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Margins', value: 'Imp', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Healthy Horizons', description: 'Regional specialty and maternal care networks.', status: 'Active' },
      { title: 'Rooted in NM', description: 'Local workforce recruitment and retention pipeline.', status: 'Active' },
      { title: 'Rural Innovation', description: 'Community-led health initiatives addressing local challenges.', status: 'Active' }
    ]
  },
  'oregon': {
    id: 'oregon',
    stateName: 'Oregon',
    awardAmount: '$197M',
    strategicFocus: 'Provider Exchange',
    metrics: [
      { label: 'Primary Access', value: 'Imp', trend: 'up', status: 'On Track' },
      { label: 'VBP Partic.', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'IT Security', value: 'Secure', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Provider Exchange', description: 'Bringing specialists to rural areas while rural providers get training.', status: 'Active' },
      { title: 'Pharmacy Lockers', description: 'Expanded pharmacy access through lockers and telepharmacy.', status: 'Active' },
      { title: 'Grow-Your-Own', description: 'Workforce initiative focused on local recruitment.', status: 'Active' }
    ]
  },
  'utah': {
    id: 'utah',
    stateName: 'Utah',
    awardAmount: '$196M',
    strategicFocus: 'Wellness & Digital',
    metrics: [
      { label: 'Obesity Rate', value: 'Red', trend: 'down', status: 'On Track' },
      { label: 'Sustainability', value: 'Maint', trend: 'neutral', status: 'On Track' },
      { label: 'Provider Count', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'PATH (Wellness)', description: 'Promoting nutrition, physical activity, and preventative care.', status: 'Active' },
      { title: 'SUPPORT (Digital)', description: 'EHR upgrades, AI deployment, and administrative burden reduction.', status: 'Active' },
      { title: 'LIFT (Telehealth)', description: 'Leveraging innovation for facilitated telehealth.', status: 'Active' }
    ]
  },
  'washington': {
    id: 'washington',
    stateName: 'Washington',
    awardAmount: '$181M',
    strategicFocus: 'Innovation & Native Health',
    metrics: [
      { label: 'VBP Partic.', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'OB Closures', value: '0', trend: 'neutral', status: 'On Track' },
      { label: 'Workforce', value: 'Larger', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Ignite Innovation', description: 'Designing VBP models and sustaining essential service lines.', status: 'Active' },
      { title: 'Native Health', description: 'Reserved funding for Tribes to invest in workforce.', status: 'Active' },
      { title: 'AI Integration', description: 'Adoption of population health management analytic tools.', status: 'Planned' }
    ]
  },
  'wyoming': {
    id: 'wyoming',
    stateName: 'Wyoming',
    awardAmount: '$205M',
    strategicFocus: 'Tech Transformation',
    metrics: [
      { label: 'Specialty Access', value: 'Inc', trend: 'up', status: 'On Track' },
      { label: 'Suicide Rate', value: 'Red', trend: 'down', status: 'On Track' },
      { label: 'Providers', value: 'Inc', trend: 'up', status: 'On Track' }
    ],
    initiatives: [
      { title: 'Tech Transformation', description: 'Telespecialist platform and centralized billing capacity.', status: 'Active' },
      { title: 'CAH Incentive', description: 'Incentivizing essential services while limiting elective ones.', status: 'Active' },
      { title: 'Workforce Pipeline', description: 'Individual education support for nurses and EMTs.', status: 'Active' }
    ]
  }
};

export function getStateStatus(state: RHTProfile): 'critical' | 'watch' | 'stable' {
  const hasPending = state.metrics.some(m => m.status === 'Pending');
  if (hasPending) return 'critical';

  const hasRisk = state.metrics.some(m => m.status === 'At Risk');
  if (hasRisk) return 'watch';

  return 'stable';
}