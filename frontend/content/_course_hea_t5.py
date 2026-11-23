exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_hea_common.py').read())

# Track 5 — Interventions, Community and Capstone. Book Ch10 §10.10, §10.14, §10.17, §10.18. Verified 2026-11-23 (search summaries): IMPaCT community health worker program (University of Pennsylvania): Health Affairs
# analysis estimating $2.47 returned to an average Medicaid payer per dollar invested within the fiscal year; trials reported fewer hospital days (about 600 patients; pooled bed days 66% of control); Vermont Blueprint
# 2025 annual report: 36.2 FTE community health workers funded by the mental health integration pilot (Nov 2025) and 1,096 training attendees (read earlier this session). Book-only: five-step closure process time
# ranges, Vermont program list, HEROI weights (existing lesson covers HEROI).

L16_SLUG = 'hea-intervention-portfolio'
L16_TITLE = 'From Findings to Action: Designing and Testing an Intervention Portfolio'
L16 = [
    blk('intro1', "Chapter 10 states that equity work stopping at measurement has characterized most state efforts for two decades. The distinction it draws is between an equity report and an equity program: whether the measurement connects to intervention, whether interventions are designed for the specific cause of each disparity and whether an accountability structure closes the loop between measurement, intervention and outcome. It offers a five-step disparity closure process, from baseline stratification to accountability and iteration, with time estimates and Vermont applications."),
    blk('intro2', "This lesson shows how to carry out the middle steps, selecting interventions, setting equity targets and testing whether they work, using the improvement methods from the course on transformation leadership. The process and time ranges are the book's description of its own platform's methodology and were not verified. The lesson's emphasis is on the logic: each step produces a defined output, and the process is built to learn."),
    blk('intro3', "An intervention portfolio is a set of bets on causes. The job is to place them on purpose, track them and change them when evidence says to."),

    h2('s1h1', 'The Five Steps'),
    blk('s1p1', "The first step is baseline stratification: calculate current performance and identify the largest measured disparities. The second is root cause attribution: for each disparity, estimate the contribution of each cause, using decomposition, surveys of affected people and conversations with the staff who see the barriers. The third is intervention portfolio design: for each major cause, select evidence-based interventions matched to cause and population, and match investment to the size of the cause. The fourth is implementation with an equity lens: execute with explicit equity targets. The fifth is accountability and iteration: report disparity metrics alongside averages, and, if a disparity is widening despite intervention, re-examine the cause attribution and the design."),
    blk('s1p2', "The chapter's time estimates are two to four weeks for baseline stratification with adequate data, four to six weeks for attribution, two to four weeks for portfolio design, and ongoing implementation with a quarterly reporting cycle. Those are the book's planning figures. The real constraint is usually data, as the previous track showed, so the first month often goes to finding and cleaning the information needed for step one."),
    callout('s1c1', "An equity target says who, how much and by when: not increase access, but raise a named group's rate from one value to another within a stated period."),

    h2('s2h1', 'Designing the Portfolio'),
    blk('s2p1', "A portfolio differs from a list of programs in that its parts are chosen to work together and to spread risk. Begin with the largest causes of the largest gaps. For each, choose one or two interventions with a reasonable evidence base. Decide how much to invest in each, in proportion to the expected effect and the cost. Add a small number of exploratory efforts where evidence is thin but need is high, such as a pilot in a community with a unique barrier. And define in advance how each will be evaluated."),
    blk('s2p2', "Evidence matters, but so does fit. An intervention shown to work in an urban setting may need adaptation in a rural one, and one tested in a large health system may not work in a small practice. The previous course on implementation described the factors that determine fit: the setting, the people and the process. Before funding, ask whether the intervention's requirements, such as staff, broadband, transport or language support, match what the target community has."),
    blk('s2p3', "The chapter's Vermont examples show the matching logic. For trust and access to behavioral health, certified community clinics with an open-access policy. For social needs, community health workers drawn from the communities served. For clinical variation, protocols and audits. For coverage, enrollment outreach and a decision on GLP-1 coverage. For trust among LGBTQ+ residents, a program for rural LGBTQ+ Vermonters. These are the book's descriptions and were not verified for this lesson. They are most useful as templates for how to link cause, intervention and population."),
    table('s2t1', 'A portfolio entry (template with an invented example)', [
        {'Field': 'Gap', 'Example': 'Share of Medicaid patients in a rural county with a visit within 14 days of discharge is 20 points below the statewide rate'},
        {'Field': 'Believed causes', 'Example': 'Transport 40 percent; phone access 25 percent; trust 15 percent; unknown 20 percent'},
        {'Field': 'Interventions', 'Example': 'Ride program; community health worker follow-up call; tele-visit with loaner device'},
        {'Field': 'Investment', 'Example': 'Proportional to believed cause share'},
        {'Field': 'Target', 'Example': 'Close half the gap in 12 months without lowering the statewide rate'},
        {'Field': 'Evaluation', 'Example': 'Monthly run chart by county and insurance; qualitative interviews at six months'},
    ]),

    h2('s3h1', 'Testing Before Scaling'),
    blk('s3p1', "Equity interventions are complex and context-dependent, so they should be tested in small steps. The Model for Improvement from the transformation leadership course applies directly: state an aim, define outcome, process and balancing measures and run small cycles of change. The only addition is that every measure should be stratified from the start, so the team can see whether a change helps the group it was meant to help. A change that improves the average and leaves the target group behind is a failed test for equity purposes, however good the average looks."),
    blk('s3p2', "A useful balancing measure in equity work is a look at who is not reached. If an outreach program has a ninety percent contact rate, the missing ten percent may be those with unstable housing or no phone. The team should therefore ask who the program is not reaching and why, and design the next cycle around them. This is how an intervention learns to serve the people it is least likely to serve."),
    blk('s3p3', "Include the community in the test. People in the target group can tell the team whether the change makes sense, whether the timing works and what is missing. Their involvement also builds trust, which is itself an outcome of equity work. Treat their feedback as data, record it and respond to it visibly."),

    h2('s4h1', 'Iteration and Honesty'),
    blk('s4p1', "The fifth step is the one most often skipped. If a gap has not narrowed after a reasonable period, the team should ask in order: was the intervention actually implemented as designed? Did it reach the target group? Was the cause attribution wrong? Is the measure picking up the change? Each question points to a different fix. Implementation failures call for operational support. Reach failures call for design changes. Wrong attribution calls for reanalysis. Measurement failures call for better data."),
    blk('s4p2', "Honesty about null results matters. Programs that do not work are useful information when reported, and harmful when hidden, because other organizations will repeat the investment. An equity program that reports only successes will not learn, and will lose credibility with the communities it serves. A short annual review that lists what was tried, what happened and what will change builds the evidence base for the whole system."),
    blk('s4p3', "Resources are the other constraint. If an intervention is working but is too small to move the population gap, the question becomes one of scale and funding. Use the spread and collaborative methods from the transformation leadership course to move effective practices across sites, and make the case for funding with stratified results."),
    steps('s4st1', 'Diagnosing a gap that did not close', [
        ('Implementation', 'Was the intervention delivered as designed, at the planned dose?'),
        ('Reach', 'Did it reach the target group, and who was missed?'),
        ('Attribution', 'Was the believed cause correct, or did another cause dominate?'),
        ('Measurement', 'Is the indicator sensitive enough and the data complete?'),
        ('Decide', 'Fix delivery, redesign for reach, reanalyze causes or improve data.'),
    ]),

    h2('s5h1', 'Tools and Platform Practice'),
    blk('s5p1', "The platform's Health Equity Studio, named in the chapter's tool table, applies stratification logic to data a user enters or to its example presets, and the chapter says it does not connect to state claims or Blueprint data. It can compute the composite equity score covered in the first track and supports designing an intervention portfolio from a set of measured disparities. Use it to rehearse the steps with your own numbers, then bring the real analysis to your own data systems. The chapter's second tool, a population health modeler, is described as modeling disease progression and intervention return for a defined cohort."),
    blk('s5p2', "A final practical suggestion is to keep a portfolio register: a spreadsheet with one row per intervention, listing the gap, believed cause, investment, owner, target, status and latest result. Review it quarterly with leaders. The register makes the portfolio visible, shows where investments cluster and exposes gaps in coverage. It also records the history, so that a new leader can see what was tried before."),

    takeaway('tw', [
        "Chapter 10 distinguishes an equity report from an equity program by whether measurement connects to cause-matched intervention and accountability.",
        "The five-step process runs from baseline stratification and root cause attribution to portfolio design, implementation with equity targets and iteration; the time ranges are the book's.",
        "A portfolio is chosen to match causes, spread risk and be evaluated; fit with the local setting matters as much as evidence.",
        "Test interventions in small cycles with every measure stratified; an average gain that leaves the target group behind fails the equity test.",
        "Use who is not reached as a balancing measure and involve the community in testing.",
        "If a gap does not close, check implementation, reach, cause attribution and measurement in that order.",
        "Report null results and keep a portfolio register reviewed quarterly.",
    ]),
    quiz('qz',
        "If an equity intervention has been implemented as designed but the gap has not narrowed, what should the team examine next according to this lesson?",
        [
            ("Nothing; the gap will close eventually", False),
            ("Whether it reached the target group, whether the cause attribution was wrong and whether the measure is adequate", True),
            ("Only whether the budget was spent", False),
            ("Only the average performance", False),
        ],
        "After confirming implementation, the team should ask about reach, the cause attribution and the sensitivity and completeness of the measure."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.10 From Identifying Disparities to Eliminating Them; §10.14 Root Cause Analytics (five-step process, Figure 10.9)"),
    blk('src2', "[2] Institute for Healthcare Improvement, Model for Improvement — https://www.ihi.org/resources/how-to-improve"),
    blk('src3', "[3] HTR Research Lab, Health Equity Studio and Population Health Modeler — https://healthtransformationreview.org/research-lab/population-equity?tab=equity — tools named in Chapter 10's platform table"),
    blk('src4', "[4] HTR Academy, Transformation Leadership, Track 2 lesson Testing Before Scaling — /academy/tracks/transformation-leadership/tl-improvement-model-pdsa"),
]

L17_SLUG = 'hea-chw-and-community-trust'
L17_TITLE = 'Community Health Workers, Trust and Partnership'
L17 = [
    blk('intro1', "Chapter 10 returns repeatedly to two ideas. Community health workers deployed from the communities they serve are the main tool for social needs and trust barriers, and trust is not built by policy statements but by consistent, culturally respectful engagement over time. Its implications for Vermont's legislature name community health teams and community health worker programs, funded through the Rural Health Transformation Program, as the targeted investment needed in the communities where gaps are largest. This lesson examines what is known about community health worker programs, what they require to work and how trust-building can be made part of analytics and not only outreach."),
    blk('intro2', "The evidence cited here comes from published evaluations of one well-studied program, as read through summaries from its university sponsor and a health policy journal, and from the Vermont Blueprint's 2025 annual report for local workforce figures. The lesson does not claim that results from that program generalize automatically to Vermont."),
    blk('intro3', "A community health worker program succeeds when it is designed around the work people actually do for one another, and fails when it is bolted onto a system that cannot use it."),

    h2('s1h1', 'What Community Health Workers Do'),
    blk('s1p1', "A community health worker is a frontline health worker who is trusted by, and usually comes from, the community served. Their work includes outreach, helping people navigate the health system, connecting them to housing, food and transportation resources, supporting self-management, accompanying people to appointments and conveying community concerns to the health system. They are not clinicians, and their value comes from relationships, shared experience and time, which clinical staff often lack."),
    blk('s1p2', "Roles vary. Some are employed by health systems, some by community organizations and some by public agencies. Some focus on a condition such as diabetes, others on a population such as people leaving hospital. The more clearly defined the role, the more likely the program will deliver. A worker asked to do everything, with no supervision, no clear patients and no way to document work, will struggle."),
    callout('s1c1', "The worker's relationship with the patient is the intervention. The system's job is to protect the time and trust that make it possible."),

    h2('s2h1', 'What the Evidence Says'),
    blk('s2p1', "The best-known evaluations come from a program developed at the University of Pennsylvania that assigns community health workers to low-income patients with multiple chronic conditions and social needs. According to summaries of its randomized trials, patients assigned to the program had fewer hospital days than controls: in one multicenter trial of about six hundred patients, summaries report 155 hospital days against 345 at six months, and a pooled analysis of three trials found that the total bed days per patient in the program group were about two thirds of those in the control group."),
    blk('s2p2', "A Health Affairs analysis of one trial estimated that the program returned about two dollars and forty-seven cents to an average Medicaid payer for every dollar invested within the fiscal year, based on salaries, supervision and other costs, with Medicaid savings of about one point four million dollars over one year. The lesson did not obtain the original articles and relies on summaries, so exact figures should be checked before use. It is also important to note what this evidence covers: a particular intervention, with defined eligibility, structured supervision and a specific population, in a particular market."),
    blk('s2p3', "The evidence supports a measured conclusion. Well-designed, well-supervised community health worker programs targeted at patients with high needs can reduce hospital use and may save money for the payer, in the settings studied. It does not show that any hiring of community health workers will produce those results. The details of the model, the targeting and the supervision are part of the intervention, and a program that copies the title without the structure may not reproduce the effect."),
    table('s2t1', 'Features associated with the evaluated program model (as summarized)', [
        {'Feature': 'Targeting', 'Description': 'Patients with multiple chronic conditions and social needs'},
        {'Feature': 'Worker profile', 'Description': 'Hired from the community served'},
        {'Feature': 'Supervision', 'Description': 'Structured, with regular case review'},
        {'Feature': 'Goals', 'Description': 'Patient-set goals and health system navigation'},
        {'Feature': 'Measurement', 'Description': 'Hospital days and costs tracked against controls'},
    ]),

    h2('s3h1', 'Workforce in Vermont'),
    blk('s3p1', "The Vermont Blueprint for Health's 2025 annual report offers local figures that this lesson read directly. It records community health workers funded through the state's mental health integration pilot as of November 2025, at about thirty-six full-time equivalents, and attendance of over a thousand people at pilot trainings during 2025, including trainings on community health workers in primary care settings. These numbers show an existing workforce and a training activity. They do not show how many workers are assigned to the highest-need communities, how they are supervised or what outcomes they achieve."),
    blk('s3p2', "That is the analytic gap an equity program should fill. Map the workforce by service area and compare it with the burden: where are the largest gaps, where are the workers and how many patients per worker? Check whether workers are from the communities they serve. Check whether their referral pathways work, that is, whether a worker who identifies a housing need can actually reach a housing resource. And check whether the workers' work is recorded, since what is not recorded cannot be evaluated or funded."),
    blk('s3p3', "The chapter's recommendation that the legislature require annual reporting on equity metrics and explanations when gaps widen would, if adopted, give such mapping a place to land. Without it, community health worker investment can be well intended and invisible."),

    h2('s4h1', 'Making Programs Work'),
    blk('s4p1', "Programs succeed when several conditions hold. Clear eligibility and targeting, so the workers' time goes to those with the most need. Competitive pay, a career path and manageable caseloads, since turnover erodes relationships. Skilled supervision, with a supervisor who knows both clinical systems and community resources. Integration with the care team, including shared records and a seat in huddles, so that workers' observations reach clinicians. Reliable referral partners, so that identified needs have somewhere to go. And a stable funding source, which for many programs is the hardest piece."),
    blk('s4p2', "Payment is a central issue. Some states reimburse community health worker services through Medicaid, others fund programs through grants, and global budget arrangements may allow providers to fund them from fixed revenue. The Vermont chapter proposes the Rural Health Transformation Program as a vehicle, which has a fixed term. A program that depends on temporary funds should have a plan for what happens after, such as transition to a payment stream or integration into a global budget, since turnover and funding cliffs are among the commonest reasons for failure."),
    blk('s4p3', "Evaluation should be built in. Define the target population, the outcomes and the comparison. Even where randomization is not possible, a clear comparison group, a pre-specified measure list and stratified results provide stronger evidence than anecdotes. Share findings with the workers and the community, who are entitled to know what their work achieved."),

    h2('s5h1', 'Trust as an Analytic Concern'),
    blk('s5p1', "Trust is often treated as soft, but it is measurable and influences analytic work. Patient experience surveys stratified by race, ethnicity, language and income show differences in how groups rate their care. Reported discrimination in clinical settings can be asked about directly. Rates of using preventive care despite access can signal distrust. Data sharing depends on trust too: communities that do not trust an agency may decline to participate in surveys, producing the small samples and missing data discussed earlier."),
    blk('s5p2', "Building trust requires consistent behavior over time. Show up. Share results. Give communities a role in deciding what is measured and how it is used. Hire from the community. Admit mistakes. The chapter notes that some Indigenous organizations had not been in contact with the state health department, which indicates that engagement gaps compound measurement gaps. A data partnership with a community organization, with agreed rules on use, is both an ethical practice and a way to improve the data."),
    blk('s5p3', "Measure your own engagement. How many community partners are involved in program design? How often do they meet decision makers? What fraction of their recommendations has been adopted and what happened to the others? These are modest process measures, and they hold the organization to its commitments. Over time they make visible whether the relationship is a partnership or only consultation."),
    steps('s5st1', 'A community partnership checklist', [
        ('Co-design', 'Include community members in defining problems, measures and interventions.'),
        ('Share data', 'Agree rules for use, return results in plain language and honor community priorities.'),
        ('Share power and resources', 'Fund community organizations and hire from the community.'),
        ('Close the loop', 'Report what was done with their input, including what was not adopted and why.'),
        ('Stay', 'Commit to continuity beyond a single grant cycle.'),
    ]),

    takeaway('tw', [
        "Chapter 10 identifies community health workers from the communities served as the main tool for social needs and trust barriers, and trust as built by consistent engagement over time.",
        "Summaries of trials of a University of Pennsylvania program report fewer hospital days and an estimated $2.47 returned per dollar to a Medicaid payer within the fiscal year; check originals before use.",
        "Evidence supports well-designed, supervised, targeted programs in the settings studied; it does not show that any hiring of workers will produce the same results.",
        "Vermont's Blueprint 2025 report records about 36 full-time equivalent community health workers funded by the mental health integration pilot and over 1,000 training attendees; it does not show assignment to the highest-need areas.",
        "Success requires targeting, pay and career path, skilled supervision, care team integration, referral partners and stable funding.",
        "Plan for the end of temporary funding and build evaluation in from the start.",
        "Treat trust as measurable: stratified patient experience, reported discrimination, preventive care use and community partnership measures.",
    ]),
    quiz('qz',
        "What does the evidence on the University of Pennsylvania community health worker program support, according to this lesson?",
        [
            ("That any hiring of community health workers will cut hospital use", False),
            ("That well-designed, supervised, targeted programs can reduce hospital use in the settings studied", True),
            ("That community health workers should replace physicians", False),
            ("That trust cannot be measured", False),
        ],
        "The evidence concerns a specific, structured program for high-need patients. The lesson cautions that the model's targeting and supervision are part of the intervention and results may not transfer to programs that copy only the title."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.3 (trust and engagement), §10.6.2, §10.18 Implications for You"),
    blk('src2', "[2] University of Pennsylvania Leonard Davis Institute, The Evidence on Community Health Workers — https://ldi.upenn.edu/healthpolicysense/evidence-community-health-workers ; Penn Medicine, Community health worker program yields $2.47 for every $1 invested annually by Medicaid — https://pennmedicine.org/news/news-releases/2020/february/penns-community-health-worker-program-yields-247-for-every-1-invested-annually-by-medicaid — read as summarized by search"),
    blk('src3', "[3] Vermont Blueprint for Health, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Blueprint%20for%20Health~2025%20Annual%20Report~1-28-2026.pdf — community health worker FTE and training attendance"),
    blk('src4', "[4] Vermont Department of Health, Health Equity Data, 2025 Annual Report — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Human%20Services/Reports%20and%20Resources/W~Vermont%20Department%20of%20Health~Health%20Equity%20Data,%202025%20Annual%20Report~1-17-2025.pdf — listed by search; not read in full"),
]

L18_SLUG = 'hea-capstone-equity-plan'
L18_TITLE = 'Capstone: An Equity Analytics and Action Plan'
L18 = [
    blk('intro1', "This capstone asks you to draft a three-page equity analytics and action plan for a real or imagined organization or program: a hospital, a practice network, a health plan or an agency. The plan connects the full course. It starts with data and its limits, moves through disparities and causes, sets accountable indicators, audits payment and contract design, selects and tests interventions, builds community partnership and ends with a reporting and review routine. The product is a document that a leadership team could use."),
    blk('intro2', "Each section below describes one part and gives a short, invented example for a small rural health system. The numbers in the example are placeholders to show structure and are not real data. In your own plan, every number should come from a named source with a period and sample size, or be marked as an assumption."),
    blk('intro3', "A good equity plan names the people it is for, the numbers it relies on and the date by which it will know whether it is working."),

    h2('s1h1', 'Part One: Data and Its Limits'),
    blk('s1p1', "Start by listing the data you have, by source, with completeness for each demographic field, the periods covered and the groups too small to report. Run the audit from the data quality lesson and state the completeness figures in the plan. Choose rules for small numbers: the minimum cell size, how you will show uncertainty and what you will do for groups you cannot report. Say how you will improve the data, whether by collecting at the point of care, linking sources or partnering with a community organization."),
    blk('s1p2', "In the example, the system has race and ethnicity recorded for about two thirds of patients, with the lowest completeness at its two smallest clinics, which serve the most rural patients. It marks results for groups with fewer than the minimum number of respondents as not reportable, shows intervals on all rates, and sets as its first data goal a rise in completeness at the two clinics through a registration workflow change and a training session for front-desk staff."),

    h2('s2h1', 'Part Two: Disparities and Causes'),
    blk('s2p1', "Choose two or three outcomes that matter to the organization's mission and contracts, and stratify each by geography, income, race and ethnicity, language, disability and other relevant dimensions. For the largest gaps, write cause hypotheses using the five categories: geographic access, social needs, clinical practice variation, coverage, and trust and engagement. For each, give the evidence, what would change your mind and how large a share of the gap you believe it explains."),
    blk('s2p2', "The example finds a gap in follow-up visits after hospital discharge between patients living more than thirty minutes from the clinic and others, and a smaller gap by insurance. The team believes distance and transport explain about half of the first gap, phone access and scheduling a quarter and trust the remainder, and says it has little evidence on the last. It plans interviews with patients who missed follow-up to test the belief."),
    table('s2t1', 'Worked example: one disparity with cause hypotheses (illustrative)', [
        {'Element': 'Outcome', 'Content': 'Follow-up visit within 14 days of discharge'},
        {'Element': 'Gap', 'Content': 'Patients over 30 minutes from the clinic are well below others (placeholder figures)'},
        {'Element': 'Cause hypotheses', 'Content': 'Transport about half; phone and scheduling about a quarter; trust the rest'},
        {'Element': 'Evidence to gather', 'Content': 'Travel time analysis; call attempt logs; patient interviews'},
        {'Element': 'What would change the view', 'Content': 'Gap persisting among patients living near the clinic'},
    ]),

    h2('s3h1', 'Part Three: Indicators, Contracts and Equity Impact'),
    blk('s3p1', "Write indicator specification sheets for each outcome, with strata, minimum cell size, reference group, target stated as gap and level, owner and paired interventions. Then audit one major contract or payment arrangement using the eight categories, scoring each as met, partly met or not met, and propose two or three fixes. Add an equity impact assessment for the largest decision on the horizon, such as a service change, using the four steps of screen, analyze, mitigate and monitor."),
    blk('s3p2', "In the example, the indicator sheet for follow-up visits has a target of closing half the distance gap within twelve months without lowering the overall rate. The contract audit finds that the shared savings arrangement does not adjust for social risk, that attribution depends on a qualifying primary care visit that distant patients may not have had, and that equity results are not reported publicly. The proposed fixes are a request for a benchmark adjustment, a review of attribution and a commitment to publish stratified results."),

    h2('s4h1', 'Part Four: Interventions and Community'),
    blk('s4p1', "Design a small portfolio matched to the believed causes. For each intervention, state the target group, the expected effect, the investment, the first test, the measures with stratification and the owner. Include one intervention aimed at trust, built with community partners, and state how community members will take part in design and review. Describe how you will test in small cycles, how you will find out who is not being reached and when you will decide to scale, redesign or stop."),
    blk('s4p2', "The example proposes a ride program for the distance gap, a community health worker follow-up call for phone and scheduling barriers and a partnership with a local community organization to hold two listening sessions on experiences after discharge. The ride program is tested first with one clinic for six weeks, with measures of rides requested, rides completed, follow-up visit rate by distance band and rides unfilled. The plan commits to share what is learned with the listening session participants."),
    steps('s4st1', 'The capstone plan in seven parts', [
        ('Data and limits', 'Sources, completeness, small-number rules and data improvement goals.'),
        ('Disparities and causes', 'Stratified outcomes and cause hypotheses with evidence.'),
        ('Indicators', 'Specification sheets with targets as gap and level and owners.'),
        ('Contracts and decisions', 'An eight-category audit and an equity impact assessment.'),
        ('Interventions', 'A matched portfolio with first tests and stratified measures.'),
        ('Community partnership', 'Co-design, data sharing and feedback commitments.'),
        ('Reporting and review', 'Quarterly report, annual review and a list of weakest assumptions.'),
    ]),

    h2('s5h1', 'Part Five: Reporting, Review and Honesty'),
    blk('s5p1', "Close the plan with a reporting routine. Specify what will be reported, to whom and how often: a one-page quarterly summary of stratified indicators with intervals, a list of interventions with status and a note on what was learned and what will change. Name the person responsible and the body that will hold them accountable. Commit to an annual review in which you re-examine your cause hypotheses against the evidence and publish what worked and what did not."),
    blk('s5p2', "Add a short list of the plan's weakest assumptions, such as that data completeness will rise, that transport is the main barrier or that funding for the ride program will continue. Review the list first at each check-in. Most plans that fail do so because one or two such assumptions proved wrong and no one was watching them."),
    blk('s5p3', "Before finalizing, test the plan with a member of the affected community and with someone who knows the data. Ask the first whether the plan describes their experience and would help, and ask the second whether the numbers can bear the weight placed on them. Revise accordingly. A plan that has been read by the people it concerns is more likely to be trusted and used than one that was written in isolation."),
    blk('s5p4', "Keep the plan proportionate to the organization. A small clinic network may need only one outcome, two indicators and a single intervention to begin, and it can add more as data and capacity grow. The discipline matters more than the volume: name the gap, state the believed cause, act on it, measure who benefits and report honestly. A small plan carried out and reviewed teaches more than a large one that is never read again, and it builds the habit of equity work that later plans will rely on."),
    callout('s5c1', "The test of an equity plan is whether the people it is for would recognize their situation in it and see themselves in the follow-through."),

    takeaway('tw', [
        "An equity analytics and action plan has seven parts: data and limits, disparities and causes, indicators, contracts and decisions, interventions, community partnership, and reporting and review.",
        "Start with data completeness and small-number rules, and say how data will improve.",
        "Write cause hypotheses as claims that could be wrong, with evidence and a stated share of the gap.",
        "Specify indicators with strata, targets stated as gap and level, owners and paired interventions.",
        "Audit one contract with the eight categories and run an equity impact assessment on the largest pending decision.",
        "Test interventions in small cycles with stratified measures, find who is not reached and involve the community in design and review.",
        "Report quarterly, review annually, list weakest assumptions and check the plan with the people it concerns.",
    ]),
    quiz('qz',
        "Why does the capstone ask for cause hypotheses written as claims that could be wrong?",
        [
            ("Because hypotheses are never useful", False),
            ("Because stating the evidence, the share of the gap and what would change your mind lets the team test and revise its attribution", True),
            ("Because regulators require hypotheses", False),
            ("Because it guarantees a correct diagnosis", False),
        ],
        "Writing hypotheses as testable claims, with the evidence for and against and what would change the conclusion, helps teams learn and correct their cause attribution."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK10 + " — §10.8 accountability framework; §10.14 five-step closure process; §10.15 VBC equity audit; §10.18 Implications for You"),
    blk('src2', "[2] Vermont Act 68 of 2025 as enacted, Sec. 11b — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf — outcome measures for the five Act 167 goals, including reducing health inequities"),
    blk('src3', "[3] HTR Research Lab, Health Equity Studio — https://healthtransformationreview.org/research-lab/population-equity?tab=equity — stratified analysis practice with example presets"),
    blk('src4', "[4] HTR Academy, Health Equity Analytics, Track 1 — /academy/tracks/health-equity-analytics — measurement, decomposition, stratified quality, SDOH scoring, equity-weighted economics and action"),
]

LESSONS = [(L16_SLUG, L16_TITLE, L16, 16), (L17_SLUG, L17_TITLE, L17, 17), (L18_SLUG, L18_TITLE, L18, 18)]
if __name__ == '__main__':
    run(LESSONS)
