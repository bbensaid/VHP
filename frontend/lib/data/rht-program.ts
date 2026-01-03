// lib/data/rht-program.ts

export type Initiative = {
  title: string;
  description: string;
};

export type Metric = {
  label: string;
  status: "Pending" | "In Progress" | "Achieved";
  target?: string;
};

export type RHTProfile = {
  id: string;             // Slug (e.g., 'vermont')
  stateName: string;
  awardAmount: string;    // From Spotlight (Actual Award)
  strategicFocus: string; // From Abstract (One-liner)
  initiatives: Initiative[];
  metrics: Metric[];
};

// MASTER DATA: FY26 Rural Health Transformation Cohort
export const rhtProgramData: Record<string, RHTProfile> = {
  vermont: {
    id: "vermont",
    stateName: "Vermont",
    awardAmount: "$195,000,000",
    strategicFocus: "Regionalization & Global Budget Alignment",
    initiatives: [
      {
        title: "Regionalization & Transformation Planning",
        description: "Implementing a statewide hub-and-spoke model to differentiate essential local services from regional specialty hubs."
      },
      {
        title: "Clinically Integrated Network (CIN)",
        description: "Creating a network of shared services across independent providers to produce operational efficiencies."
      },
      {
        title: "Blueprint for Health Enhancement",
        description: "Strengthening primary care foundation with team-based chronic disease care and quality improvement networks."
      },
      {
        title: "Maple Mountain Residency",
        description: "Creation of the new Maple Mountain Family Medicine Residency to address workforce shortages."
      },
      {
        title: "Price Transparency Tools",
        description: "New accountability tools to increase insurance competition and address rising costs."
      }
    ],
    metrics: [
      { label: "Regional Hubs Designated", status: "Pending", target: "3 Hubs" },
      { label: "Residency Fill Rate", status: "In Progress", target: "100%" },
      { label: "Mobile Integrated Health Readmissions", status: "Pending", target: "-15%" }
    ]
  },
  alabama: {
    id: "alabama",
    stateName: "Alabama",
    awardAmount: "$203,000,000",
    strategicFocus: "Maternal Digital Regionalization & Cybersecurity",
    initiatives: [
      {
        title: "Collaborative IT & Cyber Hubs",
        description: "Regional shared-service hubs for EHR integration and cybersecurity."
      },
      {
        title: "Maternal Telerobotics",
        description: "Deploying telerobotic ultrasound units for remote maternal monitoring."
      },
      {
        title: "EMS Treat-in-Place",
        description: "Pilot allowing EMS to treat low-acuity patients on-site without transport."
      }
    ],
    metrics: [
      { label: "Telerobotic Sites Active", status: "Pending", target: "15 Sites" },
      { label: "Cyber Hub Participation", status: "In Progress", target: "45% of Clinics" },
      { label: "EMS Diversion Volume", status: "Pending", target: "500 Encounters" }
    ]
  },
  texas: {
    id: "texas",
    stateName: "Texas",
    awardAmount: "$281,000,000",
    strategicFocus: "AI Specialty Networks & Wellness",
    initiatives: [
      {
        title: "Lone Star Advanced AI Network",
        description: "Unified statewide AI-driven network for specialty telehealth consults."
      },
      {
        title: "Community Wellness Centers",
        description: "Converting underutilized space into centers for screenings and fitness."
      }
    ],
    metrics: [
      { label: "AI Consult Volume", status: "Pending", target: "10,000/yr" },
      { label: "Wellness Centers Opened", status: "Pending", target: "12 Sites" }
    ]
  },
  california: {
    id: "california",
    stateName: "California",
    awardAmount: "$234,000,000",
    strategicFocus: "Hub-and-Spoke Resilience",
    initiatives: [
      {
        title: "Transformative Care Model",
        description: "Formalizing 'Hub and Spoke' networks where rural hospitals serve as hubs for FQHCs."
      },
      {
        title: "Workforce Mapping Tool",
        description: "Live GIS tool to track workforce gaps and direct training resources."
      },
      {
        title: "Infrastructure Hardening",
        description: "Modernizing facility resilience against climate and wildfire risks."
      }
    ],
    metrics: [
      { label: "FQHCs Integrated", status: "Pending", target: "25 Spokes" },
      { label: "Mapping Tool Users", status: "In Progress", target: "100% of Counties" }
    ]
  }
  // ... You can add the remaining 46 states here following this exact pattern.
};