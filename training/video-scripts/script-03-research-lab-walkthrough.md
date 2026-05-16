# Video Script: Research Lab Walkthrough (5–6 minutes)
**Health Transformation Review (HTR)**
*For use with Loom, Synthesia, HeyGen, or Camtasia*

---

## Production Notes
- **Duration:** 5–6 minutes
- **Format:** Screen recording with voiceover
- **Audience:** Power users — economists, analysts, compliance officers, consultants
- **Tone:** Technical but accessible — assume the viewer knows healthcare, not necessarily HTR
- **Screen:** Start at `/research-lab`

---

## SCRIPT

---

**[OPENING — 0:00–0:20]**
*(Screen: `/research-lab` hub page)*

**NARRATOR:**
The HTR Research Lab has 21 interactive modeling tools — for payment model design, actuarial analysis, policy impact simulation, health equity analysis, and more.

This video is a walkthrough. I'll show you the six tool groups and demo three of the most commonly used tools.

---

**[LAB OVERVIEW — 0:20–1:00]**
*(Screen: Scroll through the hub page showing the six sections)*

**NARRATOR:**
The Lab is organized into six groups.

**Interoperability** — FHIR standards and risk stratification tools for health IT work.

**Payment Models** — the core toolkit for APM design, shared savings calculations, CEA, and global budget modeling.

**Population & Equity** — population health modeling and a health equity analysis studio.

**Policy & Quality** — the largest group: policy simulation, clinical quality optimization, hospital financial stress testing, actuarial modeling, and Medicaid-specific tools.

**Technology & AI** — AI clinical governance and digital health analysis.

And the **Knowledge Workspace** — which includes the Evidence Library, Transformation Scorecard, VBC Readiness Assessment, and a full research environment.

Let me go through three tools in detail.

---

**[TOOL DEMO 1: HOSPITAL FINANCIAL STRESS TEST — 1:00–2:30]**
*(Screen: Navigate to `/research-lab/policy-quality?tab=scorecard`)*

**NARRATOR:**
First — the Hospital Financial Stress Test. This is one of the most practically useful tools on the platform.

*(Screen: Show the input panel)*

On the left, you enter your hospital's parameters: size, payer mix, current margin, and the policy or payment scenario you want to test.

Let me model the impact of a 5% Medicaid rate cut on a 150-bed community hospital.

*(Enter parameters — narrate while doing so)*

Current margin: 2.3%. Medicaid as percent of revenue: 34%. Apply a 5% Medicaid rate cut.

*(Click run / generate output)*

*(Screen: Show output panel)*

The tool projects the margin impact, break-even volume changes, and identifies which cost categories absorb the shock. In this case, we see a projected margin drop to 0.8% — putting the hospital into financial stress territory.

I can ask the AI Analyst right here in the sidebar: "What strategies have hospitals used to offset Medicaid rate cuts of this magnitude?" — and get a research-backed answer without leaving the tool.

---

**[TOOL DEMO 2: APM DESIGN LAB — 2:30–3:45]**
*(Screen: Navigate to `/research-lab/payment-models?tab=apm-design`)*

**NARRATOR:**
Next — the APM Design Lab. If you're designing or evaluating an alternative payment model, this is your starting point.

*(Screen: Show the interface)*

You select your model type: shared savings, bundled payment, direct contracting, or global budget. Then configure the risk structure — one-sided, two-sided, risk corridors — and the quality metric set.

*(Navigate to `?tab=apm-calc`)*

Once you've designed the model structure, jump over to the Shared Savings Calculator to run the financial projection.

*(Enter parameters — benchmark methodology, baseline spend, improvement rate)*

The calculator projects expected shared savings or losses under your model, with sensitivity analysis on key assumptions. You can adjust the benchmark growth rate and see how it changes the projection.

This is what you use to evaluate whether an APM is financially viable before committing to it.

---

**[TOOL DEMO 3: WORK REQUIREMENTS CALCULATOR — 3:45–4:45]**
*(Screen: Navigate to `/research-lab/policy-quality?tab=medicaid-wr`)*

**NARRATOR:**
Third — the Work Requirements Calculator. Given the current federal policy debate, this one is getting a lot of use.

*(Screen: Show the interface)*

Enter your state's Medicaid population parameters: total enrollment, categorically eligible populations, income levels, and employment status distribution.

*(Enter parameters)*

The tool models how different work requirement structures — hours per week, exemptions, verification burden — translate into projected enrollment changes.

*(Show output)*

The output breaks down projected disenrollment by population group, with a confidence range based on state-level evidence from prior work requirement implementations in Arkansas and Georgia.

You can also toggle to the H.R. 1 Cliff Scenario tab to see the federal context — what happens to state Medicaid financing if the H.R. 1 provisions take effect.

---

**[KNOWLEDGE WORKSPACE — 4:45–5:15]**
*(Screen: Navigate to `/research-lab/knowledge-workspace?tab=evidence`)*

**NARRATOR:**
Before I close — the Evidence Library. This is your research foundation.

*(Screen: Show search and browse interface)*

It's a curated, searchable collection of peer-reviewed research, CMS technical reports, and policy literature — organized by pillar.

When you're modeling something in the Lab and need research backing for your assumptions, start here. The AI Analyst can also surface Evidence Library content when you ask it research questions.

---

**[CLOSING — 5:15–5:35]**
*(Screen: Back to `/research-lab` hub)*

**NARRATOR:**
That's the Research Lab. Explore from the hub page, use the AI Analyst in the sidebar to navigate and interpret, and bookmark the tools you use most.

The next video covers the Academy — HTR's structured education and credentialing system.

---

## Post-Production Notes
- For tool demos: use clean parameter values that tell a clear story (don't use zeros or unrealistic numbers)
- Zoom in on input fields while entering values — legibility is critical
- Consider chapter markers at each tool demo for easy reference
- Export with chapters for YouTube or Vimeo hosting
