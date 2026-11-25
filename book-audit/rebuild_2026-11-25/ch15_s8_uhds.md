## 15.8 **The Critical-Path Component: Unified Health Data**

Run the sequencing test of Section 15.7 on any value-based transformation portfolio, in any state, and one component sits upstream of almost everything else: the ability to see each person's care whole. That means claims (what was paid for), clinical data (what happened), social-determinants data (the conditions that drove it), and behavioral-health data (the care most often missing from the other three), unified for the same person. States call this different things: a health data utility, a linked claims-and-clinical warehouse, an expanded health information exchange. Vermont's statute calls it the Unified Health Data Space (UHDS). The name does not matter. The dependency does: without unified data, value-based care cannot be managed, only paid for.

### 15.8.1 **Why value-based care cannot be managed on claims or clinical data alone**

Every value-based arrangement makes the same promise: pay for outcomes and total cost rather than for units of service. Keeping that promise requires evidence that no single data source holds.

- **Claims** record what was billed and paid, across every setting a payer covers. They are the basis for total cost of care and patient attribution. But a claim records that a blood-pressure check happened, not what the blood pressure was.
- **Clinical data** records the readings, results, and medications. It is the basis for outcome measures. But each record sees only the care delivered inside one organization, and it carries no price.
- **Social-determinants data** (housing, food, transportation) explains why two patients with the same diagnosis have very different costs and outcomes. Without it, risk adjustment penalizes the providers who serve the hardest-pressed communities.
- **Behavioral-health data** covers the conditions that most often drive avoidable emergency visits and readmissions. Much of it is protected by separate consent rules and sits outside both claims and hospital records.

| What a value-based arrangement must do | Claims | Clinical | Social and behavioral | Without unified data |
|---|---|---|---|---|
| Attribute patients and measure total cost of care | Every paid service, every setting | Severity and acuity | Drivers of avoidable cost | Cost is measured, but not what it bought |
| Pay on quality | Defines the eligible population | Supplies the result | Explains gaps in reach | Measures are built by hand from charts, late and incomplete |
| Adjust for risk fairly | Diagnoses over time | Results and severity | Social and behavioral risk | Providers serving sicker, poorer patients look worse than they are |
| Detect stinting under a fixed budget | Care that stopped | Health that declined | Who lost access | A global budget can save money by doing less, and no one can tell |
| Attribute savings to a specific change | Before-and-after cost | Before-and-after outcomes | Whether the right people benefited | Savings are claimed, not demonstrated |

*Figure 15.6 — Why value-based care requires unified claims, clinical, social, and behavioral-health data. Sources: AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026); HTR analysis.*

The gap is measurable. A study cited in Vermont's January 2026 report to its Legislature found that half of Medicaid members' cholesterol, diabetes, and kidney screenings, and their influenza vaccinations, were documented in clinical records but missing from claims. A program paid on claims-based quality measures would have scored those providers as failing at care they had delivered. The reverse is equally true: a program measured on one hospital's records cannot see the emergency visit at another hospital the following week.

The stinting row matters most wherever global budgets are adopted. A fixed budget removes the incentive to over-treat and creates the opposite risk. Claims alone would show that spending fell; clinical records alone would show one organization's patients; neither would show whether the population was worse off. Only unified data can.

### 15.8.2 **Why it sits on the critical path**

In portfolio terms, unified data is a gate. Every Economics component that pays on outcomes or total cost depends on it: price regulation, global budgets, shared savings, quality payment. So does every Clinical component that claims to reduce avoidable use. A component scheduled ahead of that gate is not on time; it is running blind. Its results cannot be measured, and its failures will be discovered late.

Vermont shows how easily this happens even when the dependency is written into law. The Green Mountain Care Board's reference-based prices take effect in hospital fiscal year 2028. Under the Agency of Human Services' own plan, Medicare and statewide clinical data join Vermont's unified data in 2028–2029, and commercial claims in 2029–2030. Vermont will therefore regulate commercial hospital prices for one to two years before its unified data can see a commercially insured patient. That is a downstream component scheduled ahead of its gate, the error the sequencing test exists to catch, and the dependency behind risk R-01 in the portfolio risk register (Figure 15.8). How Vermont's UHDS is being built, from the Medicaid data warehouse outward, is described in Chapter 4 (§§4.3.5–4.3.8).

### 15.8.3 **Seven conditions for unified data**

Whatever a state calls its unified data space, the same seven conditions decide whether it arrives in time to manage value-based care. Figure 15.7 sets them out, with Vermont as the worked case.

| Condition | Why every state needs it | Where Vermont stands (2026) |
|---|---|---|
| 1. A mandate to unify all four sources | Without one, each data holder optimizes its own system | Met. Act 167 of 2022 directed "one health record for each person" across claims, clinical, mental-health and substance-use, and social-determinants data; Act 68 of 2025 wrote the rules into 18 V.S.A. § 9353 |
| 2. The legal and technical ability to match the same person across sources | Unification is impossible without identity | Met. Act 167 repealed 18 V.S.A. § 9410(e), which had kept identities out of the claims database; the exchange's match rate rose from about 65% to more than 95% (Chapter 4, §4.3.6) |
| 3. Access to every payer's claims, including commercial | Price and total-cost regulation is mostly about commercial money | Not met. The Senate version of Act 68 required insurers to provide claims and clinical data; the enacted law dropped it. The all-payer claims database lacks self-insured plans (about 60% of commercial claims, Chapter 4) |
| 4. Funding beyond Medicaid | Federal match pays for Medicaid work only | Not met. Federal match covers roughly 90% of Medicaid data development and nothing for the commercial and Medicare phases; § 9353 names no State source |
| 5. Governance that decides uses promptly, by reform priority | Data that may not be used is not infrastructure | Partly met. Integration needs a majority of all voting members of the HIE Steering Committee (vacant seats count as "no") and may not begin before January 1, 2027; the statute sets no priority among uses |
| 6. Behavioral-health and social-services contributors connected | Whole-person measurement needs the data these providers hold | Not met. In February 2025 the designated mental-health agencies, nursing homes, and EMS agencies contributed no data to the exchange (VITL) |
| 7. An exchange operator that competes on performance and opens its data | The clinical feed is the pipe everything else flows through | Not met. 18 V.S.A. § 9352 makes VITL the "exclusive" operator (Section 15.8.4) |

*Figure 15.7 — Seven conditions for unified data, and where Vermont stands. Sources: Act 167 of 2022, Sec. 4; 18 V.S.A. §§ 9352, 9353, 9410; S.126 as passed by the Senate (2025); AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026); VITL 2021 Annual Report (Jan. 14, 2022); VITL (Feb. 4, 2025).*

Read the right-hand column as a sequencing diagnosis. Vermont has met the conditions that cost little: the mandate and the identity rules. It has not yet met the ones that cost money or require confronting an incumbent: commercial access, non-Medicaid funding, behavioral-health connections, and an open exchange. That pattern is common, and it is why unified data so often arrives after the payment reforms that depend on it.

### 15.8.4 **The exclusive-operator problem**

Condition 7 deserves its own treatment, because it is the one states most often create for themselves. A state that grants a single organization an exclusive franchise over its health information exchange removes the forces that normally make a technology vendor improve: no competitor sets a benchmark for price or performance, no alternative exists at contract renewal, and the operator that runs the network also decides how much of the application layer anyone else may build on the data. None of this requires bad faith by anyone. It is what a statutory monopoly produces, however well run.

Vermont legislated exactly this. Section 9352 requires that VITL "be designated in the Health Information Technology Plan to operate the exclusive statewide health information exchange network for this State." Chapter 4 (§4.3) sets out the structural case against that designation and the remedy. The public record adds the evidence:

- **Accountability came late.** In 2016 the State Auditor reported that Vermont had paid VITL more than $38 million since 2005 under agreements without performance targets, leaving the State unable to assess its performance.
- **Stakeholders said so.** The evaluation the Legislature ordered in 2017 found that only 19% of stakeholders thought the exchange met Vermont's needs, and only 21% thought it critical that VITL keep managing it; 53% said it was not. The Legislature put the State in charge of the Health Information Technology Plan and switched to opt-out consent, but it kept the exclusive designation.
- **Modern capability lags.** The HIE Strategic Plan update of November 2024 put "Implement FHIR APIs," the open interfaces modern applications are built on, at 25% complete, projected to reach only 40% by the end of 2024, and rated it only partially on track.
- **Reported coverage overstates what flows.** The same update listed "All DA's contributing production data to VITL" among the year's accomplishments; VITL's own figures for February 2025 show the designated mental-health agencies contributing no data, with twelve accessing it.
- **Oversight has narrowed.** Act 62 of 2025 ended the Green Mountain Care Board's review of VITL's budget, leaving the contracting department as the main check on a sole-source operator.

The remedy applies to any state, and it does not require replacing an exchange that works. The state owns the core data assets (patient index, consent registry, clinical repository) and contracts for their operation competitively. Contracts publish completeness, timeliness, and matching targets by provider type, with consequences. Open, standards-based (FHIR) access lets referral, e-Consult, analytics, and patient tools compete on one shared foundation. Data and consent records are portable to any successor. And a second, state-controlled ingestion path removes the single point of failure.

### 15.8.5 **What it takes to deliver it**

Unified data is permanent infrastructure, not a project with an end date, and the portfolio must treat it that way. It needs one accountable owner with authority over the whole data stack, from the exchange contract and the unified dataset to governance and funding. It needs data stewards responsible for the completeness of each source (claims, clinical, social, behavioral), privacy and legal staff who can bring every proposed use to the governing body in writing with a privacy assessment, and a contract manager with the standing to enforce performance terms on the exchange operator. The specialized build work can be contracted. Ownership cannot be.

### 15.8.6 **What the portfolio should do now**

Applied to unified data, the sequencing test gives four instructions to any state, with Vermont's version in parentheses:

1. **Put commercial data on the critical path**, ahead of the price and budget regulation that depends on it. (Vermont: an AHS–GMCB agreement for approved uses of the all-payer claims database before FY2028, and restoration of the insurer-reporting requirement the Senate passed.)
2. **Fund the phases that make the data unified**, not only the Medicaid phase that federal match pays for, beginning with behavioral-health and social-services contributors. (Vermont: a named State source, and Rural Health Transformation funds for one-time connection work.)
3. **Set the first uses by reform priority**: price and global-budget monitoring, quality payment, behavioral-health integration, outcome measurement. (Vermont: publish them before the first § 9353 vote in 2027.)
4. **Open the exchange**: end exclusive franchises, own the core assets, contract competitively, and publish performance. (Vermont: amend § 9352.)

> **BEYOND VERMONT** — Total cost lives in claims; outcomes live in clinical records; the causes of both live in social and behavioral-health data that neither captures. No single source can show whether a value-based reform is working; only unified data can. Any state can check its own readiness against Figure 15.7 in an afternoon, and the conditions it has not met are its true critical path.
