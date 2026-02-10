export type PerformanceIndexProfile = {
  id: string;
  stateName: string;
  performanceScore: number;
  status: "Leading" | "Improving" | "Stable" | "At Risk";
  metrics: {
    policy: {
      vbpAdoption: number; 
      telehealth: number;
      scopeOfPractice: number;
    };
    economics: {
      spendingPerCapita: number;
      workforceGaps: number; 
      insuranceCoverage: number;
    };
    technology: {
      hieAdoption: number;
      broadbandAccess: number;
      ehrAdoption: number;
    };
  };
  narrative: {
    title: string;
    summary: string;
  };
};

export const performanceIndexData: Record<string, PerformanceIndexProfile> = {
  vermont: {
    id: "vermont",
    stateName: "Vermont",
    performanceScore: 82,
    status: "Leading",
    metrics: {
      policy: { vbpAdoption: 90, telehealth: 85, scopeOfPractice: 78 },
      economics: { spendingPerCapita: 75, workforceGaps: 80, insuranceCoverage: 95 },
      technology: { hieAdoption: 88, broadbandAccess: 70, ehrAdoption: 92 },
    },
    narrative: {
      title: "Pioneering State-Wide Value Models",
      summary: "Vermont leads the nation in its aggressive adoption of All-Payer and Value-Based Care models, though rural broadband access remains a key challenge for telehealth expansion."
    }
  },
  texas: {
    id: "texas",
    stateName: "Texas",
    performanceScore: 65,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 55, telehealth: 70, scopeOfPractice: 60 },
      economics: { spendingPerCapita: 68, workforceGaps: 50, insuranceCoverage: 62 },
      technology: { hieAdoption: 75, broadbandAccess: 65, ehrAdoption: 80 },
    },
    narrative: {
      title: "Addressing Scale and Disparity",
      summary: "Texas faces significant challenges in workforce distribution and insurance coverage across its vast rural areas. However, recent investments in telehealth infrastructure show promise."
    }
  },
  california: {
    id: "california",
    stateName: "California",
    performanceScore: 78,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 80, telehealth: 90, scopeOfPractice: 85 },
      economics: { spendingPerCapita: 65, workforceGaps: 70, insuranceCoverage: 88 },
      technology: { hieAdoption: 85, broadbandAccess: 75, ehrAdoption: 90 },
    },
    narrative: {
      title: "Leader in Policy and Tech, Faces Cost Pressures",
      summary: "California's progressive policies on telehealth and scope of practice are a model for the nation, but high healthcare spending per capita puts pressure on system sustainability."
    }
  },
  mississippi: {
    id: "mississippi",
    stateName: "Mississippi",
    performanceScore: 48,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 40, telehealth: 55, scopeOfPractice: 50 },
      economics: { spendingPerCapita: 80, workforceGaps: 35, insuranceCoverage: 58 },
      technology: { hieAdoption: 60, broadbandAccess: 45, ehrAdoption: 70 },
    },
    narrative: {
      title: "Significant Headwinds in Workforce and Access",
      summary: "Mississippi faces critical challenges, particularly in its healthcare workforce supply and low rates of broadband access, which hinder technology-driven transformation efforts."
    }
  },
  illinois: {
    id: "illinois",
    stateName: "Illinois",
    performanceScore: 71,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 72, telehealth: 78, scopeOfPractice: 75 },
      economics: { spendingPerCapita: 70, workforceGaps: 68, insuranceCoverage: 85 },
      technology: { hieAdoption: 80, broadbandAccess: 72, ehrAdoption: 88 },
    },
    narrative: {
        title: "Balanced Progress with Focus on VBC",
        summary: "Illinois demonstrates solid progress in adopting value-based care models and has a stable technology infrastructure, though efforts are ongoing to close remaining workforce gaps in rural areas."
    }
  }
};
