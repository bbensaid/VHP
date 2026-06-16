# Feature Guide: Research Lab
**Health Transformation Review (HTR) Platform**

---

## What Is the Research Lab?

The Research Lab is HTR's suite of 24 interactive modeling and analysis tools. Each tool lets you input your own parameters and generate quantitative outputs — financial projections, population models, policy impact analyses, and more.

**Entry point:** `/research-lab`

The Lab is organized into six topic groups, each accessible from the hub page.

---

## Lab Groups & Tools

### 1. Interoperability Lab — `/research-lab/interoperability`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=fhir` | **FHIR Interoperability Lab** | Explore FHIR R4 data exchange, CMS interoperability rule compliance, API design for healthcare |
| `?tab=risk` | **Risk Stratification Engine** | Build and test clinical risk scoring models; explore data requirements and model validation |
| `?tab=emr` | **EMR/EHR Lab** | Compare EHR vendors (Epic, Oracle Health, MEDITECH, athenahealth), model adoption cost and 5-year ROI, audit USCDI data quality, and quantify documentation burden |
| `?tab=statewide-ehr` | **Statewide EHR Deployment Modeler** | The Act 167 feasibility question: a single statewide EHR vs. FHIR interoperability across Vermont's existing platforms — 10-year cost, data timeliness, disruption, lock-in |

**Best for:** Health IT professionals, clinical informaticists, researchers studying interoperability

---

### 2. Payment Models Lab — `/research-lab/payment-models`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=apm-design` | **APM Design Lab** | Design alternative payment model structures: MSSP, bundles, direct contracting, global budgets |
| `?tab=apm-calc` | **Shared Savings Calculator** | Project shared savings/losses under different benchmark methodologies and risk corridors |
| `?tab=cea` | **CEA Calculator** | Cost-effectiveness analysis: calculate ICER, model QALYs, apply standard willingness-to-pay thresholds |
| `?tab=gb-transition` | **Global Budget Transition Modeler** | Model a state's transition from fee-for-service to a global hospital budget |

**Best for:** Health economists, actuaries, hospital finance teams, payment model consultants

---

### 3. Population & Equity Lab — `/research-lab/population-equity`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=population` | **Population Health Modeler** | Build population models: chronic disease burden, risk stratification, preventive care impact, panel management |
| `?tab=equity` | **Health Equity Studio** | Analyze equity gaps by race, income, geography; explore SDOH drivers; model interventions |

**Best for:** Population health managers, equity officers, public health researchers, clinicians

---

### 4. Policy & Quality Lab — `/research-lab/policy-quality`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=policy` | **Policy Simulator** | Model the downstream impact of proposed legislation or rule changes on utilization, cost, and coverage |
| `?tab=quality` | **Clinical Quality Optimizer** | Optimize HEDIS, CMS Star, and VBC quality metrics; model protocol change impact |
| `?tab=scorecard` | **Hospital Financial Stress Test** | Model how policy or payment changes affect hospital margins |
| `?tab=hta` | **HTA Studio** | Health Technology Assessment following ICER, NICE, and HTI-2 methodologies |
| `?tab=actuarial` | **Actuarial Lab** | Capitation rate development, premium modeling, coverage cost projections |
| `?tab=medicaid-wr` | **Work Requirements Calculator** | Model Medicaid enrollment and disenrollment under work requirement policies |
| `?tab=hr1-cliff` | **H.R. 1 Cliff Scenario** | Analyze the financial cliff for states and providers if H.R. 1 Medicaid changes are enacted |

**Best for:** Policy analysts, compliance officers, actuaries, hospital finance, researchers

---

### 5. Technology & AI Lab — `/research-lab/technology-ai`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=ai` | **AI Clinical Governance Lab** | Build AI governance frameworks: FDA SaMD classification, bias testing, clinical validation checklists |
| `?tab=digital` | **Digital Health Lab** | Analyze digital health product pathways: reimbursement, regulatory clearance, ROI modeling |

**Best for:** Health IT professionals, clinical informaticists, product managers, digital health investors

---

### 6. Knowledge Workspace — `/research-lab/knowledge-workspace`

| Tab | Tool | What It Does |
|-----|------|--------------|
| `?tab=scorecard` | **Transformation Scorecard** | Assess organizational transformation readiness across all six pillars |
| `?tab=readiness` | **VBC Readiness Assessment** | Detailed assessment of an organization's value-based care readiness |
| `?tab=evidence` | **Evidence Library** | Curated, searchable library of peer-reviewed research and policy literature |
| `?tab=workforce` | **Workforce Modeler** | Model healthcare workforce supply/demand, training pipelines, labor cost trends |
| `?tab=leaderboard` | **Innovation Leaderboard** | Benchmark innovation leaders across health systems, payers, and states |
| `?tab=workspace` | **Research Workspace** | Multi-tool research environment for extended analysis sessions |
| `?tab=cin` | **CIN & Shared Services Modeler** | Model Vermont's RHT-funded Clinically Integrated Network: shared billing/coding/credentialing/HR/IT and group purchasing across the 14 hospitals vs. the $1,303/discharge admin premium |
| `?tab=ems` | **EMS Transformation Modeler** | Model regionalizing Vermont's 31 EMS agencies and community-paramedicine treat-and-refer ED diversion under global budgets |

**Best for:** All users; the Evidence Library and Research Workspace are useful for every role

---

## How to Use a Research Lab Tool

1. **Navigate** to the lab group URL and click the relevant tab
2. **Read the tool description** at the top — each tool explains its methodology
3. **Enter your parameters** — most tools have a form or input panel on the left
4. **Review outputs** — results appear as charts, tables, or narrative summaries
5. **Ask the AI** — the AI Analyst (right sidebar) can interpret results and answer questions
6. **Bookmark** the tool for future reference

---

## Standalone Tools

Beyond the Research Lab, HTR has several standalone simulation tools:

| Tool | URL | Use Case |
|------|-----|----------|
| HTR Transformation Readiness Simulator | `/htr-simulator` | Flagship org-level readiness assessment |
| Vermont Medicaid Eligibility Simulator | `/medicaid-eligibility-simulator` | Vermont Medicaid eligibility determination |
| Vermont Act 167 Simulator | `/vermont-act-167/simulator` | Act 167 scenario modeling |
| Vermont Act 68 Simulator | `/vermont-act-68/simulator` | Act 68 scenario modeling |
| CalAIM Simulator | `/california-calaim/simulator` | California CalAIM program modeling |
| CMS Rural Health Transformation Simulator | `/dashboard/simulator` | CMS rural health program scenarios |
| Impact Simulation | `/impact-simulation` | General healthcare intervention impact |
| Transformation Friction Index | `/transformation-friction-index` | Organizational friction analysis |

---

## Tips

- **Combine tools** — run the Policy Simulator, then validate financial impact with the Hospital Financial Stress Test
- **Ask the AI** to help you interpret outputs or suggest which tool to use for your question
- **Save results** — bookmark your current tool URL; outputs are session-specific
- **The Evidence Library** is your best starting point when you need research backing for your analysis

---

*Last updated: May 2026 | Health Transformation Review*
