# Chapter 15: Delivering Vermont's Reform — The Data Space, the Workstreams, and the People Who Carry Them

> *Written for AHS and GMCB leaders, members of the HIE Steering Committee, hospital executives, Blueprint and designated-agency leaders, legislators on the health committees, VITL, and anyone in another state who has to turn a reform statute into results.*

Oliver Wyman told Vermont what was wrong: nine of fourteen hospitals losing money in 2023, thirteen projected to by 2028, a five-year system deficit of $700 million to $2.4 billion, and premiums up 108% in six years. Act 68 told Vermont what to do about it: price hospitals against Medicare, move them to global budgets, plan the system as a whole, and build the data to see it. This chapter is about what neither document could settle — how the reform is actually carried out, by whom, and where it is most likely to fail.

Its argument is simple. Every part of Act 68 that changes how money moves — reference-based prices, global budgets, the Rural Health Transformation investments, the Strategic Plan's affordability benchmarks — depends on one piece of infrastructure the State does not yet have: an integrated view of what care Vermonters receive, from whom, at what cost, and with what result. The Legislature named that infrastructure the Unified Health Data Space. Whether Vermont builds it in time, governs it well, and opens it to the right uses will decide whether the rest of the reform can be managed or only hoped for. The chapter therefore starts there.

## 15.1 **The Execution Calendar**

| Date | Obligation | Carried by | Source |
|---|---|---|---|
| Hospital FY2026 | Reduce hospital spending by at least 2.5%; report monthly | AHS, with hospitals | Act 68, Sec. 11a |
| Monthly, Aug 2025 – Jan 2027 | Outcome measures, savings per inefficiency, each hospital decision's system impact, transformation spending | AHS | Act 68, Sec. 11b |
| Jan 15, 2026 (delivered) | Report on the advantages and disadvantages of integrating clinical, claims, and social-needs data in the UHDS | AHS | 18 V.S.A. § 9353(d)(1) |
| Jan 1, 2027 (earliest) | UHDS data integration may begin — on a majority vote of all voting members of the HIE Steering Committee, for approved uses only | AHS + HIE Steering Committee | 18 V.S.A. § 9353(b)(4) |
| Jan 15, 2027, then annually | AHS update to the Legislature on UHDS development and implementation | AHS | 18 V.S.A. § 9353(d)(2) |
| Jan 1, 2027 | Medicaid work requirements and six-month redeterminations, reducing coverage and provider revenue | AHS / DVHA | H.R. 1 |
| 2027 | Reference-based pricing methodology set by rule | GMCB | Act 68 |
| Sept 30, 2027 | FY2026 Rural Health Transformation award ($195.1M) must be spent; FY2027 ($190.0M) follows a year later | AHS, Office of Health Care Reform | CMS RHT terms |
| Dec 31, 2027 | Global Commitment to Health demonstration expires | AHS | Chapter 16 |
| Jan 15, 2028 | Statewide Health Care Delivery Strategic Plan due | AHS + Health Care Delivery Advisory Committee | 18 V.S.A. § 9403 |
| Hospital FY2028 | Reference-based prices take effect; first global budgets, resources permitting | GMCB | Act 68 |
| 2028–2029 / 2029–2030 | UHDS adds Medicare and statewide clinical data, then commercial claims (AHS plan) | AHS | AHS UHDS report (Jan. 2026) |

*Figure 15.1 — Vermont's reform execution calendar. Sources: Act 68 of 2025; 18 V.S.A. §§ 9353, 9403; AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026); CMS RHT Program terms; CMS-2454-IFC.*

Read the last two rows together. Vermont will set and enforce commercial hospital prices from FY2028; by AHS's own plan, commercial claims join the integrated data space in 2029–2030. That gap is the central execution problem of Act 68, and Section 15.3 explains where it comes from.

## 15.2 **Who Holds Which Lever**

| Institution | What the law gives it | What it cannot do alone | Statute |
|---|---|---|---|
| AHS, Office of Health Care Reform | The Director of Health Care Reform coordinates reform across the executive branch and with GMCB; AHS develops the UHDS, writes the Strategic Plan, runs the RHT program, supervises hospital collaboration, reports monthly | Integrate data without a Steering Committee vote; set prices or budgets | 3 V.S.A. § 3027; 18 V.S.A. § 9353; Act 68 |
| HIE Steering Committee | Advises DVHA on the HIT Plan; decides by majority of all voting members which data may be integrated in the UHDS, and for which uses | Fund or build anything | 18 V.S.A. §§ 9351, 9353 |
| DVHA (in AHS) | Runs Medicaid and its data warehouse (MDWAS); owns the statewide Health Information Technology Plan | Compel commercial insurers to send data for the UHDS | 18 V.S.A. § 9351 |
| GMCB | Sets hospital budgets, reference-based prices, and global budgets; runs VHCURES, the all-payer claims database; holds a voting seat on the HIE Steering Committee | Direct AHS's programs | 18 V.S.A. ch. 220; § 9351(a)(3)(D) |
| VITL | Designated operator of "the exclusive statewide health information exchange network" | Set its terms outside the State's contract | 18 V.S.A. § 9352 |
| Blueprint for Health (in AHS) | Runs the PCMH and Community Health Team network; convenes the Steering Committee for Comprehensive Primary Health Care | Secure its own long-term funding | 18 V.S.A. ch. 13; Act 68, Sec. 9 |
| Agency of Digital Services | Approves executive-branch IT activities; independent review of IT projects of $1 million or more; a seat on the HIE Steering Committee | Set health policy | 3 V.S.A. §§ 3301–3303 |
| Health Care Delivery Advisory Committee | Eighteen members, chaired by the Secretary of Human Services; develops the Strategic Plan with AHS | Bind any agency | 18 V.S.A. § 9403a |
| Legislature | Health Reform Oversight and Joint Fiscal Committees receive AHS's monthly reports; the health committees receive the annual UHDS and § 3027 updates | Manage the work | Act 68; § 9353(d) |

*Figure 15.2 — Decision rights in Vermont's reform. Sources: statutes as cited; Act 62 of 2025.*

## 15.3 **The Unified Health Data Space — The Reform's Measurement Engine**

### 15.3.1 **What the law requires**

Act 68, Section 10, added 18 V.S.A. § 9353. It directs AHS to develop the Unified Health Data Space in collaboration with the HIE Steering Committee, "to improve patient and provider access to relevant information, increase efficiencies and decrease administrative burdens on providers, and reduce health care system costs." The development must align with the statewide HIT Plan; protect privacy and the proprietary information of payers and providers; ensure interoperability; identify the resources needed for data linkages for policy, health surveillance, population health management, and research; set a timeline; and ensure rapid access for patients and providers. Once the Strategic Plan exists, AHS must give State agencies and providers access to the data they need to pursue its goals.

Three conditions in the statute govern everything else. Integration of clinical, claims, social-needs, and other data "shall not begin prior to January 1, 2027." It may occur "only upon the favorable vote of a majority of all voting members" of the HIE Steering Committee. And integrated data may be used only "for the specific uses approved" by that vote. AHS must report to the Legislature every January 15 from 2027 on its progress.

### 15.3.2 **What the term means — and how its meaning has moved**

The Unified Health Data Space is not a new idea invented for Act 68. Vermont's 2022 HIE Plan introduced the term to describe the health information exchange itself in its "second generation": the exchange VITL operates, extended beyond sending clinical records into a broader set of data types and services, replacing the older label "Collaborative Services." In AHS's January 2026 report to the Legislature, the UHDS has become something different: a single, secure, identified dataset that links claims, clinical, and social-needs data, built on the State's own Medicaid Data Warehouse and Analytics Solution (MDWAS) and scaled outward from Medicaid.

That shift — from the exchange's ecosystem to a State-run integrated dataset — is the most consequential decision in Vermont's health data strategy, yet it has not been presented as a decision. It answers, in practice, the question the "exclusive" exchange designation raises (Section 15.8): the State's analytic core is moving to infrastructure the State controls, with VITL's exchange as one of its sources. That is, on balance, the right direction. It should be stated, governed, and funded as a deliberate choice rather than discovered in a report's implementation section.

### 15.3.3 **What AHS reported in January 2026**

AHS's report, prepared by its Health Data Officer, made the case for integration and set out a plan:

- **Benefits.** A clearer picture of how Vermonters use the system; the ability to see gaps and which interventions work; more reliable and less costly quality measurement — because health care organizations currently combine clinical and claims data by hand to report quality measures.
- **Phase 1: Medicaid.** AHS began a rolling go-live of linked Medicaid claims, clinical, and social-needs data in MDWAS in November 2025, with full functionality by the end of January 2026, and is adding users. AHS describes it as the pilot for a multi-payer UHDS.
- **Phase 2: multi-payer, 2028–2029.** Medicare claims, statewide clinical data, and other statewide datasets.
- **Phase 3: commercial claims, 2029–2030.**
- **Privacy.** Opt-out consent for general medical information; granular opt-in for substance-use-disorder records protected by 42 CFR Part 2 and other highly sensitive data; role-based access; audit trails. The UHDS will be an identified dataset.
- **Measures.** Match rates, data-quality scores, latency, number of approved uses, user satisfaction, reduction in redundant data pulls and provider reporting burden, and access indicators stratified by geography and social risk — to be reported at least annually.

### 15.3.4 **Five problems the plan does not yet solve**

**1. The commercial data gap.** The version of Section 10 that passed the Senate required health insurers to "provide clinical and claims data to the Agency of Human Services as directed by the Agency." That sentence is not in the enacted law. AHS therefore has no statutory power to require commercial insurers to send it data for the UHDS. Commercial claims exist in Vermont's all-payer claims database, VHCURES, but VHCURES is run by the GMCB under its own statutory use restrictions — which AHS's plan says the UHDS must respect — and it holds only about 60% of commercial claims, because self-insured employer plans cannot be compelled to report (Chapter 4). That is why commercial data comes last in AHS's plan. It is also why Vermont will regulate commercial prices and hospital budgets from FY2028 before its integrated data can see commercial patients.

**2. The money.** Under the federal cost allocation for Vermont's certified exchange, Medicaid development work is funded about 90% federally; work that serves non-Medicaid populations entirely is funded by the State alone. The Medicaid phase therefore rides on federal money. The multi-payer and commercial phases — the phases reform regulation needs — are largely Vermont's to pay for, and no funding source for them has been named. The Rural Health Transformation application does not mention the UHDS.

**3. The rationale for Phase 2 has gone.** AHS's implementation framework justified scaling to Medicare in order to meet the AHEAD model's requirements. Vermont withdrew from AHEAD in July 2026. The phasing should now be re-decided on reform's needs — and those needs point to commercial claims and hospital data first, because that is what reference-based pricing and global budgets regulate.

**4. Who decides.** The committee whose vote unlocks integration was, as of January 2025, chaired by AHS — the agency that proposes the uses — with ten voting members: AHS, Blue Cross Blue Shield of Vermont, the hospital association, Bi-State Primary Care, the Department of Health, Vermont Care Partners, OneCare Vermont, a long-term-care advocate, a person advocate, and a practice-innovation lead. The GMCB, VITL, the Agency of Digital Services, the Health Care Advocate, and the health-equity and privacy experts sat as non-voting members. Legislation in 2025 has since required a GMCB representative to be a voting member (18 V.S.A. § 9351(a)(3)(D)). Two consequences follow. The regulator that most needs integrated data has only just gained a vote, while the largest commercial insurer and the hospitals — whose data would be integrated — have held votes throughout. And OneCare, which wound down at the end of 2025, held a voting seat; how vacancies are filled changes the arithmetic of "a majority of all voting members." The majority-of-all-members rule was itself proposed by AHS, the GMCB, and the Health Care Advocate in consensus testimony on the bill. It is a sound protection. It also means that empty seats count as "no."

**5. What will be integrated first.** Act 68 does not say which uses come first; the committee will. Without a published priority list, the first votes in 2027 will be shaped by whichever proposals are ready, not by which uses the reform most needs.

### 15.3.5 **What the January 2027 report should answer**

The annual reports § 9353 requires are the Legislature's main lever over the UHDS. The first, due January 15, 2027, should answer six questions in plain terms:

1. **Which uses** will be put to the Steering Committee in 2027, in what order, and why — with each use's owner, purpose, privacy assessment, and data-use agreement.
2. **How commercial data will be obtained** — through VHCURES under what agreement with the GMCB, through a restored insurer-reporting requirement, or both — and when.
3. **How the multi-payer and commercial phases will be funded**, given that non-Medicaid work earns no federal match.
4. **What VITL's role is** in the State-run UHDS: source, operator of components, or both — and on what contract terms.
5. **How the Steering Committee's voting membership** now stands, how vacancies will be filled, and how the regulator's and consumers' interests are represented.
6. **The baseline values** of the measures AHS's own report proposed — match rates, data quality, approved uses, provider reporting burden — so that progress can be tracked from a known starting point.

### 15.3.6 **Why this matters beyond Vermont**

Vermont has written into statute an integrated, governed, use-limited dataset joining clinical, claims, and social-needs data, with a public body that approves each use and an annual public report to the Legislature. If the commercial gap is closed and the governance is made transparent, the UHDS can become a working model for any state that wants to regulate prices with the evidence to see what the regulation does.

## 15.4 **Hospital Transformation and Finances**

**The finances.** The GMCB's August 2026 staff analysis projected a system operating margin of −1.25% for FY2026 across the thirteen reporting hospitals. For FY2027, the Board cut commercial reimbursement rates 2.9% statewide and commercial net patient revenue 1.2%, with UVM Medical Center's commercial rates falling 4.4% — while UVM Health's CEO told the Board the medical center expects to lose roughly $75 million this year and at least as much next year.

**The plans.** All fourteen hospitals submitted final transformation plans in spring 2026. All thirteen eligible hospitals applied for the $2 million Act 68 grant program; by June 1, 2026, eleven had fully executed agreements. AHS's own summary is that the plans reflect current initiatives and that it expects hospitals to add to them; in May 2026 the agency told VTDigger it could not yet total what they would save.

**The new job.** Act 68 requires AHS to facilitate and supervise hospital collaboration so that it qualifies for state-action immunity under antitrust law, to report each hospital decision's effect on system costs and premiums, and to attribute savings to each inefficiency reduced. Those are the duties of a system manager, and they need data AHS does not yet have — which is the UHDS problem again. Without integrated, multi-payer data, "savings attributable to each inefficiency" can only be estimated hospital by hospital.

**Where execution fails.** Fourteen plans that each make sense for one hospital and add up to no system: duplicated services kept, regional shifts never negotiated, savings that cannot be counted.

## 15.5 **Price and Budget Regulation**

The GMCB's February 2026 report documented commercial prices averaging roughly 250–300% of Medicare against a break-even near 136%, with outpatient imaging reaching 715–944% of Medicare at some hospitals. In FY2026 its regulatory actions removed $230.65 million of commercial revenue: $104.30 million from the Act 55 drug cap, $94.58 million from budget orders, and $31.76 million from enforcement. Reference-based prices take effect in hospital FY2028; global budgets follow as resources allow.

The execution risk sits between two agencies. A hospital that loses price must cut cost, and the cuts it chooses are transformation decisions AHS is supposed to shape. Unless the GMCB's budget orders and AHS's transformation plans are read side by side, hospital by hospital, in the same year, Vermont will regulate price in one building and redesign care in another. Payment reform also depends on federal approval: the Medicaid hospital global budget that began in January 2026 was halted in July 2026 after CMS found it unapproved under the Global Commitment demonstration.

## 15.6 **The Blueprint for Health**

The Blueprint is Vermont's primary care chassis, and its measures — readmissions, avoidable ED visits, follow-up after behavioral-health crises — are exactly what the UHDS should eventually supply from linked data. As of November 15, 2025, 119 practices, 93% of the state's patient-centered medical homes, had signed on for the second year of the Mental Health Integration pilot, and 62.2 FTE of community health workers and mental-health and substance-use staff were providing care with that funding. The Blueprint's evaluations have estimated returns of about $5.80 per $1 (2008–2013 data) and $3.00–$3.80 per $1 (2016).

The execution problem is funding, not evidence. Medicare's share of Blueprint payments ended with OneCare in December 2025; the State proposed $10.8 million in interim Global Commitment funding to cover it for 2026, and Mental Health Integration funding was extended for one year past the pilot. A primary care network financed one year at a time cannot recruit the staff the Strategic Plan will count on. Act 68's Steering Committee for Comprehensive Primary Health Care, convened by the Blueprint, is the forum for fixing that; the Strategic Plan is where the State should commit to a permanent source.

## 15.7 **The Rural Health Transformation Program**

The RHT Program is the capital behind the redesign: $195.1 million for federal FY2026 and $190.0 million for FY2027. By the State's October 30, 2026 list, Vermont had executed 242 grant and contract agreements worth $182.2 million:

| Initiative | Executed agreements | Amount |
|---|---|---|
| Regionalization and Innovative Care Strategies | 103 | $87.5M |
| Clinically Integrated Network of Shared Services | 59 | $33.9M |
| Strengthening Primary Care | 55 | $29.8M |
| Health Care Workforce Development | 21 | $26.7M |
| Price Transparency and Insurance Competition | 2 | $3.1M |

*Figure 15.3 — Vermont RHT Year 1 executed agreements by initiative. Source: State of Vermont RHT recipient list (Oct. 30, 2026); HTR RHT Year 1 Review.*

Specific purchases include AI-scribe grants ($5.2 million), remote patient monitoring ($1.8 million), provider telehealth ($9.7 million), e-Consult ($5.6 million), community paramedicine ($5.2 million), shared electronic health record adoption ($8.0 million), and a $15 million transformation-analytics contract. CMS counted $28.4 million as put to work by July 31, 2026.

Two execution points follow. First, the test is not whether the money is spent but whether each agreement is tied to a transformation-plan goal and measured — and measurement, again, depends on the UHDS. Second, the RHT program is the obvious, time-limited source for the one-time work the UHDS's non-Medicaid phases need and federal Medicaid match will not pay for: connecting the designated agencies, building the commercial-data pipeline, and the analytics to use it. That link has not been made.

## 15.8 **The Health Information Exchange: Living With a Designated Operator**

**What the law says.** Section 9352 requires that VITL "be designated in the Health Information Technology Plan to operate the exclusive statewide health information exchange network for this State," while providing that nothing in the chapter "shall impede local community providers from the exchange of electronic medical data." VITL operates under a sole-source contract administered by AHS. Its State match comes chiefly from the Health IT Fund — 0.199 of 1% of health insurance claims, about $3.5–4 million a year, historically extended one or two years at a time — and since CMS certified the exchange in May 2022, the federal government pays 72% of its maintenance and operations. Since Act 62 of 2025, the GMCB no longer reviews VITL's budget.

**Vermont's turnaround.** In 2016 the State Auditor reported that Vermont had paid VITL more than $38 million since 2005 without being able to assess its performance. The evaluation ordered by Act 73 of 2017 found that only 19% of stakeholders thought the exchange met their needs and, because consent was opt-in, fewer than one in five Vermonters' records were accessible. The State took ownership of the HIT Plan through DVHA and a State-led Steering Committee, and Act 53 of 2019 switched to opt-out from March 2020. By February 2025, VITL reported 98.9% of Vermonters sharing their data and 241 organizations contributing or accessing it.

**Where the risks are.** One designated operator is one point of failure, and the designation limits the State's leverage at renewal. The participation rate also hides gaps: in February 2025 the designated mental-health and specialized service agencies contributed no data feeds (twelve accessed data), nor did nursing homes or commercial payers — precisely the data the UHDS's whole-person uses need.

**What a mature owner does.** Write completeness, timeliness, and matching-accuracy targets into the contract by provider type and publish the results; guarantee that the data and patient index can transfer to a successor; keep the State-controlled ingestion path that MDWAS now provides (Chapter 4); and fund the designated agencies' connections as data contributors within 42 CFR Part 2's consent rules.

## 15.9 **The Pressures Around the Reform**

Three forces outside Act 68 will shape how much of it can be delivered:

- **Insurer solvency.** AHS's January 2026 report opens by noting that Vermont's largest domestic insurer faces financial challenges. Act 49 of 2025 allows the GMCB to reduce hospital rates when an insurer's solvency is threatened, and Act 68 required the Department of Financial Regulation to propose a plan for domestic-insurer sustainability by November 1, 2025. Hospital price cuts and insurer solvency are now one problem.
- **Federal Medicaid reductions.** H.R. 1's work requirements and six-month redeterminations begin January 1, 2027, and most of its Medicaid reductions fall after the RHT program ends.
- **The federal relationship.** With the AHEAD withdrawal in July 2026, the halted Medicaid hospital global budget, and the Global Commitment demonstration expiring December 31, 2027, Vermont's federal terms for payment reform are being renegotiated at the same time the reform is being executed.

## 15.10 **The People Who Carry It**

AHS's Act 119 review — over 325 participants plus about 950 comments and survey responses — described an agency of six departments, roughly 4,000 staff, and a multibillion-dollar budget, and named its own constraints: unclear decision-making authority and accountability; chronic staffing shortages; fragmented technology; and the reality that "only a limited number of issues can reach the executive level at any time." Act 68 added a statewide plan, monthly reporting, antitrust supervision, a grant program, and the UHDS to that agency; the RHT program added 242 agreements to manage. The UHDS report itself took 112 staff hours from an Office of Health Care Reform whose Health Data Officer also chairs the Steering Committee.

Five practices follow, none of which needs new law:

- **One named owner per workstream** — the UHDS, hospital transformation, the Blueprint's financing, and RHT — each with authority to decide.
- **A UHDS program team proportionate to the mandate**: data-governance, privacy, and legal staff to prepare Steering Committee proposals; analysts to use what is approved.
- **A joint AHS–GMCB annual review**, hospital by hospital, of budget orders beside transformation plans, using the same data.
- **Use the regional workforce Vermont already has.** The Blueprint's quality-improvement facilitators and Community Health Team leads already work in every Hospital Service Area.
- **Protect executive attention** with a written rule for which decisions must reach the Secretary, and how fast.

## 15.11 **A Vermont Delivery Compact**

HTR proposes a **Vermont Delivery Compact** among AHS, the GMCB, the Blueprint, and VITL, renewed with each Strategic Plan:

1. **One integrated roadmap** showing the dates in Figure 15.1 and the work that serves them.
2. **A published UHDS use catalogue**: every proposed use of integrated data, its owner, purpose, privacy assessment, and the Steering Committee's decision.
3. **A commercial-data agreement** between AHS and the GMCB that makes VHCURES data available to approved UHDS uses, and a recommendation to the Legislature on restoring an insurer-reporting requirement.
4. **One public dashboard** joining hospital finances, transformation-plan progress, RHT spending against results, Blueprint financing, and UHDS measures.
5. **Published exchange performance and portability terms.**

Each item builds on an obligation already in Vermont law. The pattern travels: map decision rights from your own statutes, give your regulator and your transformation agency the same data, and make your data infrastructure's governance a matter of public record.

## 15.12 **Work This Chapter on the Platform**

*(Links to be confirmed against live routes before publication: the Vermont UHDS page, the RHT Year 1 Review, the Act 68 Explorer, the Blueprint page, and the Hospital Financial Stress Test.)*

## 15.13 **Implications for You**

**If you lead at AHS:** Publish the UHDS use priorities for 2027 now, and name one owner for each workstream.

**If you sit on the HIE Steering Committee:** Confirm the voting membership and how vacancies are filled before the first vote, and ask for every proposal in writing with an owner and a privacy assessment.

**If you lead at the GMCB:** Say which integrated-data uses your price and budget regulation needs before 2029, and agree the VHCURES terms that make them possible.

**If you lead a hospital or designated agency:** Tie every RHT dollar to a line in your transformation plan, and ask what it would take to send data to the exchange, not only receive it.

**If you are a legislator:** Use the January 15, 2027 UHDS report to ask the six questions in Section 15.3.5 — and decide whether AHS needs the insurer-reporting authority the Senate once gave it.

## 15.14 **Key Concepts in This Chapter**

**Unified Health Data Space (UHDS).** The integrated clinical, claims, and social-needs dataset Act 68 directs AHS to develop with the HIE Steering Committee (18 V.S.A. § 9353), now being built outward from the Medicaid data warehouse.

**§ 9353 data gate.** Integration may begin no earlier than January 1, 2027, on a majority vote of all voting HIE Steering Committee members, for approved uses only.

**Commercial data gap.** The lag between commercial price regulation (FY2028) and commercial claims in the UHDS (2029–2030), rooted in the absence of an insurer-reporting requirement and of federal match for non-Medicaid work.

**State-action supervision.** AHS's Act 68 duty to supervise hospital collaboration so that it qualifies for antitrust immunity.

**Designated exchange operator.** VITL's statutory status as operator of the exclusive statewide health information exchange network.

**Vermont Delivery Compact.** HTR's proposed AHS–GMCB–Blueprint–VITL agreement joining deadlines, decision rights, data access, and public reporting.

*Sources: Act 68 of 2025; Act 62 of 2025; Act 49 of 2025; Act 73 of 2017; Act 53 of 2019; 3 V.S.A. §§ 3027, 3301–3303; 18 V.S.A. §§ 9351–9353, 9403, 9403a; S.126 as passed by the Senate, and AHS–GMCB–HCA consensus testimony on Sec. 10 (Apr. 24, 2025); AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026); Vermont HIE Plan 2022; HIE Strategic Plan 2024 Update (Nov. 18, 2024); AHS, Health Information Technology Overview (Senate Health and Welfare, Jan. 23, 2025); Oliver Wyman, Act 167 Recommendations (2024–2025); GMCB, Act 68 Update (Feb. 17, 2026); GMCB FY27 hospital budget decisions (Sept. 2026) and staff overview (Aug. 2026); Seven Days (Sept. 2026); AHS Act 68 System Transformation Reports (2025–2026); VTDigger (May 21, 2026); 2026 Annual Report on the Blueprint for Health; State of Vermont RHT recipient list (Oct. 30, 2026); VITL (Feb. 4, 2025); Evaluation of Vermont Health Information Technology Activities (2018); AHS Act 119 Report (Nov. 1, 2025).*
