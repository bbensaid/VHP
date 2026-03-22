# HTR Advisory Section — Complete Technical & Functional Documentation

**Health Transformation Research (HTR)**
**Version:** 2.0 | **Date:** March 2026 | **Classification:** Internal + Client-Facing

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Advisory Section Architecture](#2-advisory-section-architecture)
3. [Service Lines — Complete Catalog](#3-service-lines)
4. [Client Segmentation Model](#4-client-segmentation-model)
5. [Pricing & Engagement Models](#5-pricing--engagement-models)
6. [Advisory Hub — 10-Tab Interface](#6-advisory-hub--10-tab-interface)
7. [Contact & Intake System](#7-contact--intake-system)
8. [Technical Architecture](#8-technical-architecture)
9. [Navigation & Information Architecture](#9-navigation--information-architecture)
10. [HTR Five-Pillar Methodology](#10-htr-five-pillar-methodology)
11. [Key Performance Indicators](#11-key-performance-indicators)
12. [User Journey Maps](#12-user-journey-maps)

---

## 1. Executive Overview

The HTR Advisory Section is a full-spectrum health policy and transformation consulting practice embedded within the Health Transformation Research platform. It serves as the primary commercial interface between HTR's research capabilities and the organizations seeking to translate evidence into operational change.

### Mission Statement
Transform health system performance through rigorous, evidence-based advisory services that integrate policy intelligence, economic modeling, clinical quality science, and technology strategy into actionable transformation roadmaps.

### Scope of Practice
HTR Advisory operates across five domains of health system transformation:
- **Policy & Regulatory Navigation** — Federal and state health policy interpretation and strategy
- **Economic & Financial Modeling** — Total cost of care analysis, payment reform design, actuarial review
- **Technology Strategy** — Health IT assessments, interoperability roadmaps, digital transformation
- **Clinical Quality Improvement** — HEDIS, Star Ratings, MIPS/QPP, value-based care performance
- **Health Equity & Population Health** — SDOH integration, disparity reduction, community health strategy

### Core Value Proposition
HTR differs from traditional management consulting firms through:
1. **Research-First Methodology:** Every engagement anchored in peer-reviewed evidence and proprietary data
2. **Five-Pillar Framework:** Simultaneous analysis across Policy, Economics, Technology, Clinical, and Equity dimensions
3. **Vermont Expertise:** Deep knowledge of Green Mountain Care Board, ACO regulations, and small-state dynamics
4. **Tool Integration:** Clients access the Research Lab during engagements for live scenario modeling
5. **Implementation Focus:** Deliverables are designed to move directly into project execution

---

## 2. Advisory Section Architecture

### URL Structure
```
/advisory                    → Landing page (overview + service catalog)
/advisory-hub                → 10-tab client portal (deep-dive interface)
/advisory/consulting         → Strategic consulting service line
/advisory/research           → Research & analysis service line
/advisory/it-consulting      → Health IT consulting service line
/advisory/independent-review → Independent quality review service line
/advisory/capability-assessment → Organizational capability assessment
/advisory/financial-audit    → Financial & actuarial audit service line
/advisory/regulatory         → Regulatory & compliance service line
/advisory/training           → Training & workforce development service line
/advisory/approach           → HTR methodology deep-dive
/advisory/contact            → Engagement intake form
```

### Component Hierarchy
```
app/advisory/page.tsx                    (Server Component — landing)
├── app/advisory-hub/page.tsx            (Server Component — hub wrapper)
│   └── app/advisory-hub/AdvisoryClientPage.tsx  (Client Component — 10 tabs)
├── app/advisory/consulting/page.tsx     (Server Component)
├── app/advisory/research/page.tsx       (Server Component)
├── app/advisory/it-consulting/page.tsx  (Server Component)
├── app/advisory/independent-review/page.tsx
├── app/advisory/capability-assessment/page.tsx
├── app/advisory/financial-audit/page.tsx
├── app/advisory/regulatory/page.tsx
├── app/advisory/training/page.tsx
├── app/advisory/approach/page.tsx
└── app/advisory/contact/page.tsx
    └── app/advisory/contact/ContactForm.tsx  (Client Component)
```

### Data Layer
```
frontend/lib/advisory-data.ts
```
Central data file containing all advisory content, interfaces, and constants.

**Exported Interfaces:**
- `EngagementStep` — workflow step definition (title, description, duration, icon)
- `PricingTier` — service tier configuration (name, price, features array, recommended flag)
- `AdvisoryService` — full service definition (id, title, description, features, outcomes, stats)
- `AdvisoryStat` — KPI display card (value, label, description)
- `ClientSegment` — client type definition (name, description, examples, services array)

**Exported Constants:**
- `ADVISORY_STATS` — 8 performance statistics shown on landing page
- `CLIENT_SEGMENTS` — 5 client segment definitions
- `ADVISORY_NAV_ITEMS` — navigation link array
- `ADVISORY_SERVICES` — 8 complete service objects

---

## 3. Service Lines

### 3.1 Strategic Consulting (`/advisory/consulting`)

**Core Purpose:** Transform organizational vision into executable health system strategies.

**Service Offerings:**
- Health system transformation strategy and roadmap development
- Payment model design and alternative payment model (APM) navigation
- Merger, acquisition, and partnership strategy in value-based care
- Market entry and competitive positioning for new service lines
- Board and executive advisory on regulatory and policy matters

**Engagement Formats:**
- Strategy sprint (4–6 weeks) — rapid assessment and roadmap
- Ongoing advisory retainer (monthly or quarterly check-ins)
- Project-based engagements (3–12 months)
- Board advisory and expert witness services

**Typical Deliverables:**
- Strategic roadmap with 3-year implementation milestones
- Competitive landscape assessment
- Financial modeling of strategic scenarios
- Board presentation deck with executive briefing

**Target Clients:** Health system CEOs, CFOs, Boards of Directors, State Medicaid Directors, payer VPs of Value-Based Care

---

### 3.2 Research & Analysis (`/advisory/research`)

**Core Purpose:** Produce rigorous, publication-quality research and policy analysis to support evidence-based decision-making.

**Service Offerings:**
- Policy brief development (state and federal health legislation)
- Systematic literature reviews and evidence syntheses
- Program evaluation design and implementation
- Health economic modeling (cost-effectiveness, budget impact)
- Comparative effectiveness research
- Regulatory comment development for CMS and ONC rulemaking

**Research Methodologies:**
- Systematic and scoping reviews (PRISMA-compliant)
- Cost-effectiveness analysis (CEA) and cost-utility analysis (CUA)
- Budget impact modeling (BIM)
- Health technology assessment (HTA) per ICER and NICE standards
- Qualitative inquiry (interviews, focus groups, ethnographic methods)
- Mixed-methods program evaluation

**Typical Deliverables:**
- Policy briefs (4–12 pages) suitable for legislative audiences
- Full research reports (20–80 pages) with executive summaries
- Peer-reviewed manuscript drafts
- Testimony preparation for legislative committees
- Regulatory comment letters

**Target Clients:** State health agencies, foundations, health systems seeking grant support, payers designing evidence-based benefit structures

---

### 3.3 Health IT Consulting (`/advisory/it-consulting`)

**Core Purpose:** Align health technology investments with clinical and operational transformation goals.

**Service Offerings:**
- EHR selection, optimization, and implementation oversight
- Interoperability strategy (HL7 FHIR, CDA, Direct Trust, TEFCA)
- Health information exchange (HIE) governance and design
- Data governance framework development
- Clinical decision support (CDS) design and validation
- Population health platform assessment and selection
- AI/ML use case identification, governance, and ROI analysis
- ONC certification readiness and compliance

**Technical Competency Areas:**
- **FHIR R4/R5:** Resource profiling, Implementation Guide authoring, SMART on FHIR apps
- **HL7 v2 to FHIR Migration:** ADT, ORM, ORU message transformation
- **Clinical Terminology:** SNOMED CT, LOINC, RxNorm, ICD-10-CM, CPT mapping
- **API Standards:** USCDI, Bulk FHIR (Group/$export), CDS Hooks
- **Privacy & Security:** HIPAA, HITECH, 42 CFR Part 2, OAuth 2.0/SMART
- **Cloud Architecture:** AWS, Azure, GCP health data environments

**Typical Deliverables:**
- Technology assessment and vendor scorecards
- Interoperability roadmap (current-state to future-state)
- Data governance policy framework
- AI governance charter
- FHIR Implementation Guide (profile specifications)
- ONC compliance gap analysis

**Target Clients:** Hospital CIOs/CMIOs, HIE operators, state HIT coordinators, digital health startups, payers building data platforms

---

### 3.4 Independent Quality Review (`/advisory/independent-review`)

**Core Purpose:** Provide objective, external validation of quality programs, measurement systems, and organizational performance claims.

**Service Offerings:**
- HEDIS measure audit and improvement (independent validation)
- CMS Star Ratings analysis and improvement planning
- NCQA accreditation preparation and gap analysis
- TJC readiness assessment
- Quality program design review
- Performance dashboard validation
- Peer review of internal quality reports

**Independence Standards:**
HTR follows URAC, NCQA, and CMS standards for independent review organizations (IROs). All independent reviews are conducted by staff with no financial relationship to the client's operational performance.

**Typical Deliverables:**
- Independent quality audit report
- HEDIS data validation findings
- Accreditation gap analysis with remediation roadmap
- Star Ratings improvement playbook (12-month action plan)

**Target Clients:** Managed care organizations, Medicare Advantage plans, ACOs, hospital quality departments, self-insured employers

---

### 3.5 Capability Assessment (`/advisory/capability-assessment`)

**Core Purpose:** Provide a structured, evidence-based evaluation of an organization's readiness and capacity for health transformation.

**Assessment Dimensions:**
1. **Leadership & Governance** — Board engagement, executive alignment, change management capability
2. **Clinical Quality Infrastructure** — Measurement systems, CDS maturity, provider engagement
3. **Data & Analytics** — Data governance, warehouse maturity, population health analytics capability
4. **Technology Platforms** — EHR optimization, interoperability, digital health tool integration
5. **Financial Resilience** — Revenue cycle performance, alternative payment model exposure, actuarial capacity
6. **Workforce & Culture** — Staff training investment, retention metrics, innovation culture indicators
7. **Community & Equity** — Community health needs assessment (CHNA) integration, SDOH data use, equity measurement

**Assessment Methodology:**
- Structured interviews with 15–30 stakeholders across organizational levels
- Document review (strategic plans, quality reports, financial statements, technology inventories)
- Benchmarking against national and regional peer organizations
- Validated scoring rubrics (1–5 scale per dimension)

**Output:** Capability maturity scorecard, heat map of gaps and strengths, prioritized 18-month improvement roadmap

**Target Clients:** Health systems undergoing strategic planning, ACOs entering new payment arrangements, state agencies evaluating grantee capacity, private equity-backed healthcare platforms

---

### 3.6 Financial & Actuarial Audit (`/advisory/financial-audit`)

**Core Purpose:** Deliver rigorous financial analysis and actuarial modeling to support payment reform, risk contracting, and regulatory compliance.

**Service Offerings:**
- Medical Loss Ratio (MLR) analysis and compliance review
- Risk adjustment validation (HCC v28, HHS-HCC, CDPS)
- Total Cost of Care (TCOC) benchmarking
- IBNR reserve analysis and claims lag modeling
- Actuarial Value (AV) calculation and metallic tier certification
- Premium rate development and rate filing support
- Financial impact modeling for payment model transitions
- Fraud, Waste, and Abuse (FWA) program review

**Actuarial Standards:**
HTR's financial audit practice follows Actuarial Standards of Practice (ASOPs) issued by the Actuarial Standards Board, with consulting actuaries credentialed as FSA, MAAA, or FCAS as appropriate to the engagement.

**Typical Deliverables:**
- Actuarial report (signed by credentialed actuary)
- TCOC benchmark analysis with peer comparisons
- Risk score validation findings and correction recommendations
- Financial projection model (5–10 year horizon)
- Rate filing documentation

**Target Clients:** Insurance commissioners, Medicaid managed care plans, ACOs at financial risk, self-insured employers, state all-payer databases

---

### 3.7 Regulatory & Compliance (`/advisory/regulatory`)

**Core Purpose:** Navigate the complex federal and state regulatory environment to ensure compliance, optimize participation in government programs, and inform rulemaking.

**Regulatory Coverage Areas:**
- **CMS Programs:** Medicare Advantage, Part D, ACO REACH, MSSP, CMMI Innovation Models
- **ACA Regulations:** Essential Health Benefits, MLR, risk corridors, market rules
- **Medicaid:** 42 CFR Part 438 managed care rules, 1115 and 1915(b)/(c) waivers
- **HIPAA/HITECH:** Privacy, security, breach notification, 42 CFR Part 2
- **ONC Regulations:** 21st Century Cures Act, information blocking, certification criteria
- **Vermont-Specific:** Green Mountain Care Board (GMCB), Act 167, ACO regulations, all-payer model

**Service Offerings:**
- Regulatory impact analysis and compliance gap assessment
- CMS comment letter development
- Waiver application development (1115, 1915, Section 332)
- Audit defense and corrective action planning
- Compliance program design and training
- Lobbying support materials and legislative testimony preparation

**Target Clients:** Health plans, hospitals, ACOs, digital health companies, state Medicaid agencies, Congressional offices

---

### 3.8 Training & Workforce Development (`/advisory/training`)

**Core Purpose:** Build organizational capacity through structured education programs that translate complex health policy and technical content into practical skills.

**Training Program Types:**

**Executive Leadership Programs:**
- Health Transformation Leadership Intensive (2-day retreat format)
- Board Governance for Value-Based Care (half-day workshop)
- Policy Literacy for Health Executives (quarterly webinar series)

**Clinical & Quality Staff Training:**
- HEDIS Measure Mastery (3-module certificate program)
- MIPS/QPP Optimization Workshop
- Quality Improvement Methods (IHI Model for Improvement, PDSA, Lean)
- Population Health Analytics Fundamentals

**Technology & Data Training:**
- FHIR for Clinicians and Administrators
- Health Data Governance Essentials
- AI in Healthcare: Governance, Ethics, and Implementation
- EHR Optimization for Quality Reporting

**Policy & Advocacy Training:**
- Health Policy 101 for Clinical Leaders
- Medicaid Managed Care Navigation
- CMS Rulemaking Process and Public Comment Strategies

**Delivery Formats:**
- In-person workshops (half-day to 3-day)
- Virtual instructor-led training (VILT)
- On-demand e-learning modules
- Blended learning paths (self-paced + live coaching)
- Train-the-trainer programs for organizational scale

**Customization:** All programs customized to client's regulatory environment, payer mix, EHR platform, and organizational culture.

**Certifications Offered:**
- HTR Certificate in Health Transformation Leadership
- HTR Certificate in Value-Based Care Analytics
- HTR Certificate in Health IT & Interoperability

---

## 4. Client Segmentation Model

HTR Advisory serves five distinct client segments, each with tailored service packages and engagement approaches:

### Segment 1: Health Systems & Integrated Delivery Networks (IDNs)
**Description:** Hospitals, multi-hospital systems, and physician-hospital organizations navigating the transition from fee-for-service to value-based models.

**Primary Needs:**
- Strategic direction for APM participation
- Quality infrastructure development for Star Ratings and HEDIS
- Technology modernization for interoperability and population health
- Workforce development at scale

**Preferred Engagement Model:** Multi-year strategic partnership with dedicated advisory team. Typically $500K–$3M annually.

**Example Clients:** Regional health systems in New England, rural critical access hospitals, safety net hospitals

---

### Segment 2: Health Plans & Managed Care Organizations
**Description:** Commercial insurers, Medicaid MCOs, Medicare Advantage plans, and CHIP plans operating under CMS and state insurance department oversight.

**Primary Needs:**
- HEDIS performance improvement
- Star Ratings optimization (Medicare Advantage)
- Risk adjustment accuracy and compliance
- Network adequacy and actuarial rate development
- Regulatory compliance (MLR, ACA market rules)

**Preferred Engagement Model:** Annual retainer with project-based add-ons for specific regulatory filings or audits. Typically $300K–$2M annually.

---

### Segment 3: State & Federal Government Agencies
**Description:** State Medicaid agencies, state health departments, HIE operators, and federal program offices.

**Primary Needs:**
- All-payer model design and evaluation
- 1115 waiver strategy and application support
- FHIR/interoperability policy development
- Program evaluation and reporting
- Legislative testimony and policy analysis

**Preferred Engagement Model:** Task order contracts (IDIQ or BPA structure), often through competitive procurement. $50K–$5M per task order.

---

### Segment 4: ACOs & Value-Based Care Organizations
**Description:** MSSP ACOs, ACO REACH participants, direct contracting entities, and other organized delivery systems taking downside risk.

**Primary Needs:**
- TCOC benchmarking and performance analytics
- Risk stratification and care management program design
- Data sharing and interoperability strategy
- Actuarial review of shared savings/losses
- Population health program ROI modeling

**Preferred Engagement Model:** Project-based (6–18 months) with optional ongoing support. Typically $150K–$750K per engagement.

---

### Segment 5: Digital Health Companies & Investors
**Description:** Health technology startups, established HIT vendors, private equity firms, venture capital, and health system innovation labs.

**Primary Needs:**
- Regulatory strategy (FDA, ONC, CMS coverage decisions)
- Clinical validation and evidence generation planning
- Market access strategy (Medicaid coverage, payer contracting)
- Due diligence support for M&A
- AI governance framework development

**Preferred Engagement Model:** Project-based (3–6 months for due diligence, 6–18 months for regulatory strategy). Typically $75K–$500K.

---

## 5. Pricing & Engagement Models

### Tier 1: Essential Advisory
**Price:** $2,500–$7,500/month
**Format:** Retainer-based, limited hours
**Includes:**
- Monthly strategy call (90 minutes)
- Access to HTR Research Lab
- Monthly policy digest and regulatory alert
- Email/Slack advisory Q&A (5 questions/month)
- Annual capability assessment (light version)

**Best for:** Smaller organizations, single-issue advisory needs, organizations piloting HTR relationship

---

### Tier 2: Strategic Partnership
**Price:** $15,000–$45,000/month
**Format:** Deep retainer with dedicated team
**Includes:**
- Weekly strategy sessions with senior advisors
- Unlimited Research Lab access with guided analysis
- Dedicated Slack channel with 24-hour response SLA
- Quarterly board presentations
- Full capability assessment
- Two project engagements per year (up to 40 hours each)
- Regulatory monitoring and alert service (real-time)

**Best for:** Health systems, MCOs, and state agencies seeking an embedded advisory capability

---

### Tier 3: Enterprise Transformation
**Price:** Custom (typically $500K–$3M/year)
**Format:** Full engagement team, multi-year commitment
**Includes:**
- Dedicated multi-disciplinary team (5–12 FTEs equivalent)
- On-site presence as needed
- Full Research Lab white-label access for client staff
- Unlimited project scope within retainer
- C-suite coaching and board advisory
- Priority access to HTR proprietary datasets and models
- Annual strategic planning facilitation (2-day retreat)
- Publication co-authorship on research outputs

**Best for:** Large health systems, major payers, state governments undertaking multi-year transformation programs

---

### Project-Based Pricing
For organizations not on retainer:

| Service | Typical Range |
|---------|--------------|
| Policy brief (single topic) | $8,000–$25,000 |
| Capability assessment | $35,000–$85,000 |
| HEDIS audit and improvement plan | $50,000–$150,000 |
| Technology assessment | $40,000–$120,000 |
| Actuarial review | $25,000–$75,000 |
| 1115 waiver application support | $150,000–$400,000 |
| Full strategic plan | $75,000–$250,000 |
| Training program (custom) | $15,000–$60,000 |
| Research report | $20,000–$100,000 |

---

## 6. Advisory Hub — 10-Tab Interface

Located at `/advisory-hub`, the Advisory Hub (`AdvisoryClientPage.tsx`) provides a comprehensive client portal with 10 functional sections:

### Tab 1: Overview
- Mission statement and value proposition
- Quick-access navigation to all service lines
- Featured case study (rotating)
- Current engagement status (for logged-in clients)

### Tab 2: Services
- Full service catalog with expandable cards
- Service-to-client-segment mapping matrix
- Comparison tool (up to 3 services)
- "Find My Service" diagnostic questionnaire (5 questions → recommended service)

### Tab 3: Methodology
- HTR Five-Pillar Framework explanation
- Engagement workflow diagram (8-step process)
- Quality assurance standards
- Independence and ethics standards
- Certifications and credentials

### Tab 4: Case Studies
- 12+ anonymized case study summaries
- Filterable by: industry segment, service line, geography, outcome type
- Each case study: Challenge, Approach, Results (quantified), Lessons Learned
- PDF download option for each case study

### Tab 5: Research & Insights
- Integration with HTR Research Library
- Policy briefs (downloadable PDFs)
- Regulatory alerts (last 90 days)
- HTR original research publications
- Links to public CMMI model evaluations

### Tab 6: Team
- Advisor profiles with credentials and specialty areas
- Team structure (by practice area)
- Advisory Board member biographies
- Staff credentialing summary

### Tab 7: Tools & Resources
- Research Lab integration (embedded tool links)
- Downloadable templates (assessment frameworks, policy brief templates)
- Regulatory calendar (key CMS/NCQA/TJC dates)
- Glossary of health transformation terms (200+ terms)

### Tab 8: Pricing
- Tier comparison (Essential, Strategic, Enterprise)
- ROI calculator (inputs: organizational size, service line → estimated value delivered)
- Engagement timeline estimator
- "Request a Proposal" CTA

### Tab 9: Client Portal
- (Logged-in clients only) Secure document repository
- Project status dashboard
- Meeting schedule and recordings
- Deliverable tracker
- Invoice history

### Tab 10: Contact
- Embedded intake form (mirrors `/advisory/contact`)
- Calendar booking widget
- Advisor availability display
- Emergency regulatory support request pathway

---

## 7. Contact & Intake System

Located at `/advisory/contact`, the contact system (`ContactForm.tsx`) is a multi-stage intake form designed to qualify leads and route them to the appropriate service team.

### Form Architecture

**Section 1: Organization Profile**
- Organization name (required)
- Organization type (dropdown): Health System, MCO/Health Plan, State Agency, ACO, Digital Health Company, Employer, Foundation, Other
- Annual revenue range (dropdown): <$50M, $50M–$250M, $250M–$1B, $1B–$5B, $5B+
- Geography (multi-select state picker)
- Number of employees (range)

**Section 2: Contact Information**
- First and last name
- Title/Role
- Email address
- Phone number
- Preferred contact method (Email, Phone, Slack, Video call)
- Time zone

**Section 3: Engagement Interest**
- Service line of interest (multi-select from 8 services + "Not sure")
- Engagement urgency: Immediate (within 30 days), Near-term (1–3 months), Planning (3–6 months), Exploring (6+ months)
- Estimated engagement budget range
- Brief project description (free text, 500 char limit)

**Section 4: Training-Specific Fields** (conditionally displayed when Training selected)
- Number of staff to be trained
- Training format preference: In-person, Virtual, Blended, On-demand
- Target role(s) for training (multi-select)
- Scheduling constraints (free text)

**Section 5: How Did You Hear About HTR**
- Source tracking (dropdown + free text)
- Referral name (if applicable)

### Form Logic
- Real-time validation on all required fields
- Conditional sections display based on Service Line selection
- Submission routes to CRM (Salesforce integration) + email notification to relevant practice lead
- Auto-response email sent to submitter within 2 minutes

---

## 8. Technical Architecture

### Frontend Stack
- **Framework:** Next.js 14+ App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (utility-first, no component library)
- **Icons:** lucide-react
- **State Management:** React useState / useReducer (no external state library)
- **Forms:** Controlled components with custom validation (no form library)

### Rendering Strategy
| Route | Rendering | Reason |
|-------|-----------|--------|
| `/advisory` | Server Component | Static content, SEO-critical |
| `/advisory/[service]` | Server Component | Static content, SEO-critical |
| `/advisory-hub` | Server Component (shell) | SEO for route |
| `/advisory-hub/AdvisoryClientPage` | Client Component | Tab state, interactive |
| `/advisory/contact/ContactForm` | Client Component | Form state, validation |

### Data Flow
```
advisory-data.ts (constants/interfaces)
    ↓
Server Components (pages) — import and render static data
    ↓
Client Components — receive data via props, manage UI state
    ↓
Form submissions → API route → CRM integration
```

### Performance Considerations
- All service pages are statically generated at build time (no runtime data fetching)
- Images served via Next.js Image component with WebP optimization
- Advisory Hub uses code splitting per tab (lazy loading of tab content)
- Contact form validation runs client-side to minimize server round-trips

### SEO Configuration
Each advisory page includes:
- Unique `<title>` tag (format: `{Service Name} | HTR Advisory`)
- `<meta name="description">` (150–160 chars)
- Open Graph tags for social sharing
- Structured data (JSON-LD, `Service` and `Organization` schema)
- Canonical URLs

---

## 9. Navigation & Information Architecture

### Primary Navigation (Header)
The `Header.tsx` component includes:
- **Advisory** dropdown with links to all 8 service pages + Advisory Hub + Approach + Contact
- Active state styling for current route
- Mobile-responsive hamburger menu with full advisory submenu

### Advisory Nav Items (from `ADVISORY_NAV_ITEMS`):
1. Advisory Hub → `/advisory-hub`
2. Strategic Consulting → `/advisory/consulting`
3. Research & Analysis → `/advisory/research`
4. Health IT Consulting → `/advisory/it-consulting`
5. Independent Review → `/advisory/independent-review`
6. Capability Assessment → `/advisory/capability-assessment`
7. Financial Audit → `/advisory/financial-audit`
8. Regulatory & Compliance → `/advisory/regulatory`
9. Training & Development → `/advisory/training`
10. Our Approach → `/advisory/approach`
11. Contact Us → `/advisory/contact`

### Internal Linking Strategy
- Every service page links to related services ("You might also need...")
- All service pages link to Advisory Hub and Contact
- Advisory Hub Tab 2 (Services) links to all individual service pages
- Footer includes full advisory sitemap

---

## 10. HTR Five-Pillar Methodology

All HTR Advisory engagements are structured around the proprietary Five-Pillar Framework, ensuring comprehensive, multi-dimensional analysis:

### Pillar 1: Policy
**Focus:** Regulatory environment, legislative landscape, government program requirements
**Tools Used:** Regulatory impact analysis, waiver modeling, legislative tracking, comment letter development
**Questions Answered:** What rules govern this? What is changing? How do we position for regulatory advantage?

### Pillar 2: Economics
**Focus:** Financial sustainability, payment model alignment, total cost of care, actuarial soundness
**Tools Used:** TCOC modeling, APM financial projections, budget impact analysis, premium development
**Questions Answered:** Is this financially viable? Who bears risk? What does the trajectory of costs look like?

### Pillar 3: Technology
**Focus:** Health IT infrastructure, data architecture, interoperability, digital health tools
**Tools Used:** Technology assessment, FHIR readiness review, AI governance framework, EHR optimization analysis
**Questions Answered:** Does the technology support the strategy? Where are the data gaps? What is the build/buy decision?

### Pillar 4: Clinical
**Focus:** Care quality, clinical outcomes, evidence base, provider engagement
**Tools Used:** HEDIS/Star analysis, quality program design, clinical guideline integration, care management ROI
**Questions Answered:** Is care high-quality? What clinical interventions have evidence? How do we engage providers?

### Pillar 5: Equity
**Focus:** Health disparities, social determinants, access, community-centeredness
**Tools Used:** Disparity analysis, SDOH composite scoring, equity-weighted ICER, geographic access gap mapping
**Questions Answered:** Who is being left behind? What structural barriers exist? How do we close disparity gaps?

### Applying the Framework
Every major deliverable includes a Five-Pillar summary table:
- Status assessment for each pillar (Green/Yellow/Red)
- Key finding per pillar (1–2 sentences)
- Priority recommendation per pillar
- Cross-pillar interdependencies highlighted

---

## 11. Key Performance Indicators

### Operational KPIs (displayed on advisory landing page via `ADVISORY_STATS`):

| Metric | Value | Description |
|--------|-------|-------------|
| Engagements Completed | 200+ | Advisory projects delivered since inception |
| States Served | 35+ | Distinct state health system contexts |
| Client Satisfaction | 97% | Net Promoter Score equivalent |
| Avg. ROI Delivered | 4.2x | Client-reported return on advisory investment |
| Policy Briefs Published | 150+ | Original research and policy analysis documents |
| Years of Experience | 15+ | Combined leadership team experience in health transformation |
| Expert Network | 50+ | Network of credentialed advisors and subject matter experts |
| Technology Assessments | 75+ | Health IT systems evaluated |

### Client Outcome Metrics (tracked per engagement):
- TCOC reduction (% and absolute dollars)
- HEDIS measure improvement (percentile movement)
- Star Rating improvement (stars gained)
- Risk-adjusted revenue optimization (RAF score improvement)
- Regulatory compliance gap closure (# findings resolved)
- Time-to-implementation for strategic recommendations

---

## 12. User Journey Maps

### Journey 1: Health System CEO — Strategic Planning
**Entry Point:** Google search for "health system transformation consulting Vermont"
**Path:**
1. Lands on `/advisory` — reads overview, notes Five-Pillar approach
2. Navigates to `/advisory/consulting` — reviews strategic consulting offerings
3. Visits `/advisory-hub` → Tab 4 (Case Studies) — finds relevant health system case
4. Visits `/advisory/approach` — reviews methodology, builds confidence
5. Goes to `/advisory/contact` — fills out intake form (Organization: Health System, Budget: $500K+, Urgency: Planning)
6. Receives auto-response within 2 minutes
7. Practice lead calls within 24 hours
8. Discovery call scheduled → proposal generated → engagement begins

**Time-to-contact:** Typically 20–40 minutes from first page view

---

### Journey 2: State Medicaid Director — Policy Analysis
**Entry Point:** Direct referral from colleague at another state agency
**Path:**
1. Lands directly on `/advisory/research` via shared link
2. Reviews research capabilities and policy brief examples
3. Visits `/advisory/regulatory` — looks for 1115 waiver experience
4. Downloads sample policy brief from Advisory Hub Tab 5
5. Calls main number directly (bypasses online form)
6. Scheduled for expert call within 48 hours

---

### Journey 3: Health Plan VP of Quality — HEDIS Improvement
**Entry Point:** Sees HTR presentation at AHIP conference
**Path:**
1. Visits `/advisory-hub` directly (URL from conference materials)
2. Explores Tab 2 (Services) — identifies Independent Review + Quality Optimization
3. Uses "Find My Service" diagnostic → recommended: Independent Quality Review + Strategic Consulting
4. Visits `/advisory/independent-review` and `/advisory/consulting`
5. Returns to Advisory Hub Tab 8 (Pricing) — reviews Strategic Partnership tier
6. Submits contact form with Training added to service interest
7. Receives proposal for combined engagement within 5 business days

---

*Document prepared by HTR Advisory Practice. For questions contact: advisory@healthtransformationresearch.com*
*Version 2.0 — March 2026*
