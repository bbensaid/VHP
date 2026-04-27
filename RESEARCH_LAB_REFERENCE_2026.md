# Vermont Health Platform: Research Lab & Tools
# Comprehensive Reference Guide (2026 Edition)

## 1. Executive Summary: The Intelligence Layer
The Vermont Health Platform is architected as the cross-disciplinary intelligence layer between raw healthcare data and strategic decision-making. Operating on a **Six-Pillar Framework**, the platform provides a unified environment where Policy, Economics, Technology, Clinical, Equity, and Operations are analyzed as interdependent forces.

The **Research Lab** is the platform’s high-fidelity simulation engine. It allows users to transition from "Intelligence" (passive reading of articles) to "Execution" (active simulation and modeling).

---

## 2. The Six-Pillar Framework

### 2.1 Policy Pillar: "Is it Permissible?"
Focuses on the regulatory gates and legislative trajectories.
*   **Core Intelligence:** Regulation & Legislation, Public Health Mandates, Global & Comparative Policy, Feasibility Studies.
*   **The Gatekeeper Effect:** Policy analysis is the first interrogation point; an intervention that is clinically sound but regulatory prohibited is non-viable.

### 2.2 Economics Pillar: "Is it Sustainable?"
Analyzes financial viability and capital flows.
*   **Core Intelligence:** Value-Based Care Models, Market & Finance, Labor Economics, Healthcare Investment Trends.
*   **The Solvency Lens:** Tracks the "Scissors Effect" of rising fixed costs and falling FFS revenue in rural settings.

### 2.3 Technology Pillar: "Is it Possible?"
Evaluates the digital infrastructure required for scale.
*   **Core Intelligence:** AI & Machine Learning, Digital Health, Data Security, Tech-Enabled Workflow.
*   **Interoperability:** Focuses on FHIR R4 connectivity and technical deflation (reducing data exchange costs).

### 2.4 Clinical Pillar: "Is it Effective?"
Holds the system accountable to evidence-based outcomes.
*   **Core Intelligence:** Hospital-at-Home, Precision Medicine, Virtual Care, Population Health.
*   **Outcome Focus:** Metrics focus on preventable hospitalizations and readmission reduction.

### 2.5 Equity Pillar: "Is it Just?"
Measures the distributional impact of transformation.
*   **Core Intelligence:** SDOH Integration, Algorithmic Bias, Access Disparity, Community Engagement.
*   **Structural Focus:** Treats equity as an independent structural variable, not a derivative outcome.

### 2.6 Operations Pillar: "Is it Executable?"
Determines the organization's capacity to deliver.
*   **Core Intelligence:** Revenue Cycle, Workforce Planning, Compliance & Risk, Supply Chain, Payer Network.
*   **Execution Risk:** Identifies operational drag that prevents strategic intent from becoming reality.

---

## 3. The Research Lab (Pillar-Specific Tool Deep-Dive)
The Research Lab hosts 20 specialized tools designed for high-stakes modeling.

### 3.1 Policy Lab Tools
*   **Policy Simulator:** A sandbox for modeling the legislative trajectory and regulatory feasibility of proposed health reforms.
*   **Innovation Leaderboard:** A comparative index tracking the adoption and success rate of policy-driven health innovations across different jurisdictions.

### 3.2 Economics Lab Tools
*   **APM Design Lab:** An actuarial workspace for designing Alternative Payment Models (APMs), including capitation and shared savings structures.
*   **Shared Savings Calculator:** A tool for modeling the financial distribution between payers and providers under one-sided and two-sided risk tracks.
*   **CEA Calculator:** A Cost-Effectiveness Analysis (CEA) tool utilizing QALY (Quality-Adjusted Life Year) benchmarks to determine the "value" of clinical interventions.
*   **Hospital Financial Stress Test:** A solvency simulator that projects hospital margins and "days cash on hand" under various inflationary and volume scenarios.
*   **HTA Studio:** A Health Technology Assessment module for evaluating the clinical and economic impact of new medical technologies.
*   **Actuarial Lab:** A deep-dive environment for longitudinal cost-of-care modeling and population-level risk assessment.

### 3.3 Technology Lab Tools
*   **FHIR Interoperability Lab:** A technical validation environment for testing data exchange standards and bidirectional HIE connectivity.
*   **AI Clinical Governance Lab:** A structured framework for auditing AI safety, including the **Governance Builder** which assesses readiness across validation, transparency, and oversight.
*   **Digital Health Lab:** A module focused on evaluating the ROI and operational reliability of virtual care and remote patient monitoring (RPM) platforms.

### 3.4 Clinical Lab Tools
*   **Risk Stratification Engine:** A comprehensive clinical modeling tool featuring:
    *   **HCC v28 Calculator:** Calculates CMS Risk Adjustment Factor (RAF) scores.
    *   **Comorbidity Clustering:** Visualizes pairwise co-occurrence using Elixhauser and Charlson Index logic.
    *   **Custom Risk Builder:** Allows clinicians to build weighted composite scores for specific populations.
*   **Clinical Quality Optimizer:** A dashboard for identifying gaps in evidence-based care bundles (e.g., Sepsis SEP-1, Maternal Hemorrhage).
*   **Workforce Modeler:** A labor-economics tool for simulating the impact of staffing ratios and retention strategies on clinical throughput.

### 3.5 Equity Lab Tools
*   **Population Health Modeler:** A geographic and demographic tool for mapping chronic disease prevalence against social determinants of health (SDOH).
*   **Health Equity Studio:** Featuring the **Algorithmic Bias Detector**, which audits ML models for "Demographic Parity," "Equal Opportunity," and "Predictive Parity" across race, gender, and age.

### 3.6 Operations Lab Tools
*   **Transformation Scorecard:** An executive-level progress tracker for organizational shifts from volume to value.
*   **VBC Readiness Assessment:** A structured diagnostic for determining an organization's maturity across the five infrastructure layers required for Value-Based Care.
*   **Research Workspace & Evidence Library:** A centralized repository for managing active simulation data and citing peer-reviewed evidence.

---

## 4. Global Platform Simulators & Signal Monitors
These 10 assets operate across the entire platform ecosystem.

### 4.1 Diagnostic Simulators
*   **HTI Dashboard (Health Transformation Index):** The platform's flagship "Engine" quantifying maturity across six domains:
    1.  **Digital Maturity** (20% weight)
    2.  **Value-Based Care** (15% weight)
    3.  **Social Determinants** (20% weight)
    4.  **Clinical Excellence** (20% weight)
    5.  **Patient Experience** (15% weight)
    6.  **Workforce Wellness** (10% weight)
*   **HTR Simulator:** A macro-level model for simulating the 10-year impact of "Technical Deflation" on state-wide GDP and total health expenditure.
*   **Impact Simulation:** A high-level scenario modeler for predicting the "RPM Dividend"—the avoided cost of acute events through proactive monitoring.
*   **Friction Index:** A metric measuring the "drag" created by administrative complexity, payer-provider misalignment, and clinical workflow inefficiencies.

### 4.2 Signal & Data Monitors
*   **The Wire:** Live industry news feed filtered through the six pillars.
*   **Investment Tracker:** Live monitor of venture capital flows, M&A activity, and capital deployment in health tech.
*   **Trending Topics:** Real-time pulse of high-velocity issues like GLP-1 costs or PBM transparency.
*   **Medicaid Eligibility Simulator:** A caseworker-grade tool for 5-step screening of program eligibility.
*   **Multimedia:** Integrated podcast network and video briefings.
*   **Six-Pillar Map:** The architectural visualizer for the HTR framework.

---

## 5. Core Methodologies & Technical Definitions

### 5.1 AI Performance Metrics
*   **AUC-ROC:** Area Under the Receiver Operating Characteristic curve. Measures a model’s ability to distinguish between classes (e.g., patient likely to be readmitted vs. not).
*   **F1 Score:** The harmonic mean of precision and recall. Essential for "imbalanced" healthcare data where true positives are rare.
*   **NMV (Net Monetary Value):** Proprietary metric calculating: `(Total Savings from True Positives) - (Cost of Intervention + Cost of False Positives)`.

### 5.2 Fairness & Equity Criteria
*   **Demographic Parity:** Ensures the probability of a positive outcome is the same across groups (e.g., race, gender).
*   **Equal Opportunity:** Ensures the True Positive Rate (Sensitivity) is identical across groups.
*   **Predictive Parity:** Ensures the Positive Predictive Value (Precision) is identical across groups.

### 5.3 Clinical Risk Adjustments
*   **HCC v28 (2024):** The latest CMS model focusing on chronic conditions and demographic variables.
*   **Charlson Comorbidity Index:** Validated methodology for predicting 10-year survival.
*   **Elixhauser Index:** Advanced methodology for predicting 30-day readmission risk based on 30 specific comorbidities.

---

## 6. User Persona Mapping

| Persona | Key Lab Tools | Strategic Objective |
| :--- | :--- | :--- |
| **Health System CFO** | Stress Test, Shared Savings Calc | Protect operating margins during VBC transition. |
| **Chief Medical Officer** | Quality Optimizer, Risk Engine | Reduce readmissions and standardize care bundles. |
| **Chief Tech Officer** | FHIR Lab, AI Governance | Enable data liquidity and secure AI deployment. |
| **State Health Official** | Policy Simulator, Pop Health Modeler | Design permissible reforms and close equity gaps. |
| **Strategy Analyst** | HTA Studio, Investment Tracker | Evaluate new tech ROI and track market shifts. |
| **Executive Lead** | Scorecard, HTI Dashboard | Monitor organizational transformation milestones. |

---
*© 2026 Health Transformation Review. All rights reserved. Non-partisan. Independent. Evidence-driven.*
*Last Updated: April 27, 2026*