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
  id: string;
  stateName: string;
  awardAmount: string;
  strategicFocus: string;
  description: string;
  initiatives: Initiative[];
  metrics: Metric[];
};

export const rhtProgramData: Record<string, RHTProfile> = {
  vermont: {
    id: "vermont",
    stateName: "Vermont",
    awardAmount: "$200,000,000",
    strategicFocus: "Regionalization & Innovative Care Strategies",
    description: "The Vermont RHT Program seeks to advance a cohesive suite of health care innovations and reforms that address the State's rural health care access, quality, and affordability challenges. The Program is designed to ensure long-term health care system sustainability in the face of rising costs and population health needs.",
    initiatives: [
      {
        title: "Regionalization & Innovative Care Strategies",
        description: "Implementing a statewide transformation planning initiative to ensure non-duplication of services. The vision is that essential services remain local, while other services move to regional hubs or a single statewide location for complex care."
      },
      {
        title: "Clinically Integrated Network (CIN)",
        description: "Fostering collaboration across independent providers to produce operational efficiencies, facilitate patient choice, and promote patient-facing technologies that deliver care closer to home."
      },
      {
        title: "Strengthening Primary Care",
        description: "Enhancing the 'Blueprint for Health' initiative to improve team-based chronic disease care, deliver workforce training, and create a statewide quality improvement learning network."
      },
      {
        title: "Health Care Workforce Development",
        description: "Strategic investments in workforce programs to strengthen the rural pipeline and address housing shortages, enabling providers to practice at the top of their license."
      },
      {
        title: "Price Transparency & Insurance Competition",
        description: "Investments in new accountability tools and strategies to address rising health care costs and affordability barriers."
      }
    ],
    metrics: [
      { label: "Regional Hubs Designated", status: "Pending", target: "Implementation Phase" },
      { label: "Primary Care Transformation", status: "In Progress", target: "Blueprint Expansion" },
      { label: "Workforce Housing Units", status: "Pending", target: "Pipeline Active" }
    ]
  },
};