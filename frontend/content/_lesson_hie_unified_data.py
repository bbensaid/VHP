exec(open('CONTENT_TEMPLATE.py').read())
# HIE & Health Reform, Track 2 (Technology & Interoperability), lesson 4 — author-approved 2026-11-25.
# Every fact is from a source opened for book Ch15 §15.8 (book-audit/deep/sources/execution/, statutes/):
# 18 V.S.A. §§ 9352, 9353, 9410 (legislature.vermont.gov); Act 167 of 2022 Sec. 4; AHS Act 68 Sec. 10 report (Jan 14, 2026);
# VITL 2021 Annual Report (Jan 14, 2022); VITL, About VITL and the VHIE (Feb 4, 2025); HIE Strategic Plan 2024 Update;
# Evaluation of Vermont HIT Activities (Jan 2018); Vermont Business Magazine on the State Auditor's VITL report (Oct 3, 2016).
# Run from the repo root:  python3 frontend/content/_lesson_hie_unified_data.py [--commit]
import sys

SLUG = 'hie-unified-health-data-space'
TITLE = 'Unified Data and the Designated Exchange: Vermont’s Unified Health Data Space'
LEG = 'https://legislature.vermont.gov'
SRC = [
    ("Health Transformation Review, Transforming Healthcare (HTR book v42), Chapter 15, §15.8 The Critical-Path Component: The Unified Health Data Space — https://healthtransformationreview.org/read/chapter-15", "the lesson's argument, Figures 15.6 and 15.7"),
    (f"18 V.S.A. § 9353, Unified Health Data Space — {LEG}/statutes/section/18/219/09353", "the January 1, 2027 gate, the majority-of-all-voting-members vote, approved uses only"),
    (f"18 V.S.A. § 9352, designation of VITL — {LEG}/statutes/section/18/219/09352", "“the exclusive statewide health information exchange network”"),
    (f"Agency of Human Services, Act 68 Section 10 — Integration of Health Care Data (Jan 14, 2026) — {LEG}/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Act%2068%20Section%2010%20-%20Integration%20of%20Health%20Care%20Data%20~1-15-2026.pdf", "phases, MDWAS go-live, hybrid measures, the screenings-missing-from-claims study"),
    (f"VITL, 2021 Annual Report (Jan 14, 2022) — {LEG}/Documents/2022/WorkGroups/House%20Health%20Care/Reports%20and%20Resources/W~Vermont%20Information%20Technology%20Leaders~Vermont%20Health%20Information%20Exchange%20Annual%20Report~1-14-2022.pdf", "match rate about 65% to more than 95%"),
    (f"VITL, About VITL and the Vermont Health Information Exchange (Feb 4, 2025) — {LEG}/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Beth%20Anderson~About%20VITL%20and%20the%20Vermont%20Health%20Information%20Exchange~2-4-2025.pdf", "participants table: designated agencies contribute 0, access 12; 98.9% sharing"),
    ("Agency of Human Services, HIE Strategic Plan 2024 Update — https://healthdata.vermont.gov/sites/healthdata/files/documents/HIE%20Strategic%20Plan_2024%20Update.pdf", "FHIR APIs 25% current, 40% outlook, partially on track; “All DA’s contributing production data to VITL”"),
    (f"Evaluation of Vermont Health Information Technology Activities (Jan 2018) — {LEG}/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Information%20Technology%20Leaders--VITL/W~Michael%20Costa~Evaluation%20of%20Vermont%20Information%20Technology%20Activities~1-11-2018.pdf", "stakeholder survey; 19% of records accessible under opt-in"),
    ("Vermont Business Magazine, “Audit: Millions spent on VITL, outcomes unknown” (Oct 3, 2016) — https://vermontbiz.com/node/179095", "State Auditor: more than $38 million paid since 2005; agreements lacked performance targets"),
]

body = [
    blk('intro1', "Every value-based reform makes the same promise: pay for outcomes and total cost, not for units of service. Vermont's Act 68 of 2025 adds reference-based hospital prices and global budgets to that promise. None of it can be managed unless the State can see, for the same person, what was paid for and what actually happened. This lesson explains why that requires unified data — claims, clinical, social-determinants, and behavioral-health data joined at the level of the individual — and why the way Vermont has organized its health information exchange makes that unification harder than it needs to be."),
    blk('intro2', "The lesson follows Chapter 15, §15.8 of the HTR book, which treats the Unified Health Data Space (UHDS) as the critical-path component of Vermont's transformation portfolio: the one piece almost everything else waits on."),

    h2('s1h1', 'Four Sources, Four Different Questions'),
    blk('s1p1', "Claims record what was billed and paid: who was seen, where, for what diagnosis, and at what price, across every setting a payer covers. They are the basis for total cost of care and patient attribution. But a claim records that a blood-pressure check happened, not what the blood pressure was."),
    blk('s1p2', "Clinical data from electronic health records, laboratories, and registries records the readings, results, and medications. It is the basis for outcome measures. But each record sees only the care delivered inside one organization, and it carries no price."),
    blk('s1p3', "Social-determinants data — housing, food security, transportation — explains why two patients with the same diagnosis have very different costs and outcomes. Behavioral-health data from designated agencies and substance-use treatment covers the conditions that most often drive avoidable emergency visits and readmissions, and much of it is protected by separate consent rules and sits outside both claims and hospital records."),
    callout('s1c1', "Unified data means all four sources joined for the same person: claims (what was paid), clinical (what happened), social determinants (why it happened), and behavioral health (the care most likely to be missing from the other three). No single source can show whether a value-based reform is working."),
    analogy('s1an1', "Judging a global budget on claims alone is like judging a restaurant by its till receipts: you can see that it sold fewer meals, but not whether customers left hungry.", 'Why claims cannot detect under-service under a fixed budget'),

    h2('s2h1', 'What Value-Based Care Needs From Each Source'),
    blk('s2p1', "The HTR book sets out five tasks every value-based arrangement must perform and shows that each one needs more than one source (Figure 15.6). The table below summarises it."),
    table('s2t1', 'Why value-based care needs unified data (HTR book, Figure 15.6)', [
        {'Task': 'Attribute patients, measure total cost of care', 'Claims': 'Every paid service', 'Clinical': 'Severity and acuity', 'Social and behavioral': 'Drivers of avoidable cost', 'Without unified data': 'Cost is measured, not what it bought'},
        {'Task': 'Pay on quality', 'Claims': 'Defines the eligible population', 'Clinical': 'Supplies the result', 'Social and behavioral': 'Explains gaps in reach', 'Without unified data': 'Measures built by hand from charts'},
        {'Task': 'Adjust for risk fairly', 'Claims': 'Diagnoses over time', 'Clinical': 'Results and severity', 'Social and behavioral': 'Social and behavioral risk', 'Without unified data': 'Providers of sicker, poorer patients look worse'},
        {'Task': 'Detect stinting under a fixed budget', 'Claims': 'Care that stopped', 'Clinical': 'Health that declined', 'Social and behavioral': 'Who lost access', 'Without unified data': 'Savings from doing less go unseen'},
        {'Task': 'Attribute savings to a change', 'Claims': 'Before-and-after cost', 'Clinical': 'Before-and-after outcomes', 'Social and behavioral': 'Whether the right people benefited', 'Without unified data': 'Savings claimed, not demonstrated'},
    ]),
    blk('s2p2', "The gap is measurable. A study cited in AHS's January 2026 report found that half of Medicaid members' cholesterol, diabetes, and kidney screenings, and their influenza vaccinations, were documented in clinical records but missing from claims. A program paying on claims-based quality measures would have scored those providers as failing at care they had delivered. AHS's report also notes that organizations reporting “hybrid” quality measures, which need claims and clinical data together, combine them today by manual chart abstraction."),
    highlight('s2hl1', "Global budgets remove the incentive to over-treat and create the opposite risk: doing less. Only unified data, seen quickly and across every setting, can show whether access and outcomes held up after the budget was set."),

    h2('s3h1', 'What Vermont Has Built — and When the Pieces Arrive'),
    blk('s3p1', "The mandate for unified data is older than Act 68. Act 167 of 2022 directed the HIE Steering Committee to “create one health record for each person” integrating claims, clinical, mental-health and substance-use, and social-determinants data. The same act repealed 18 V.S.A. § 9410(e), which had required confidential health information to be filed in the all-payer claims database without disclosing the person's identity — a barrier to matching a person's claims with that person's clinical record."),
    blk('s3p2', "Act 68 then wrote the rules into 18 V.S.A. § 9353. AHS develops the UHDS with the HIE Steering Committee; integration may not begin before January 1, 2027; it requires the favorable vote of a majority of all voting members of the committee; and integrated data may be used only for the uses that vote approves."),
    stat_grid('s3sg1', [
        ('98.9%', 'Vermonters sharing data', 'Through the exchange under opt-out consent (VITL, Feb 2025)'),
        ('65% → 95%+', 'Patient-match rate', 'After the exchange installed its matching tool (VITL 2021 Annual Report)'),
        ('Jan 2026', 'First unified slice', 'Linked Medicaid claims, clinical, and social-needs data in MDWAS (AHS, Jan 2026)'),
        ('2029–2030', 'Commercial claims', 'AHS plan — after reference-based prices take effect in FY2028'),
    ]),
    warning('s3w1', 'The calendar problem', "AHS's plan adds Medicare and statewide clinical data in 2028–2029 and commercial claims in 2029–2030, but the GMCB's reference-based prices take effect in hospital FY2028. Vermont will regulate commercial hospital prices for one to two years before its unified data can see a commercially insured patient."),

    h2('s4h1', 'Where the Law Stands in the Way'),
    blk('s4p1', "Three features of the statute itself slow unification. First, the version of Act 68's data section that passed the Senate required health insurers to provide clinical and claims data to AHS as directed; the enacted law dropped that sentence, so AHS cannot require commercial claims and must negotiate access to the GMCB's all-payer database, which captures only part of commercial claims because self-insured employer plans cannot be compelled to report."),
    blk('s4p2', "Second, federal match pays roughly 90% of Medicaid data development but nothing for work serving commercial and Medicare populations, and § 9353 names no State source for it — so the phases that turn a Medicaid dataset into unified data for the whole state are unfunded by design. Third, requiring a majority of all voting members is a sound privacy protection, but it means every vacant or absent seat counts as “no,” and the statute sets no priority among uses."),

    h2('s5h1', 'The Designated Monopoly'),
    blk('s5p1', "Section 9352 requires that VITL “be designated in the Health Information Technology Plan to operate the exclusive statewide health information exchange network for this State.” Vermont did not procure its exchange operator; it legislated one. Every attempt to unify clinical data with claims, social, and behavioral-health data runs through that franchise."),
    blk('s5p2', "The public record shows what a statutory monopoly produces. In 2016 the State Auditor reported that Vermont had paid VITL more than $38 million since 2005 under agreements that lacked performance targets, so the State could not assess its performance. The evaluation ordered in 2017 found that only 19% of stakeholders thought the exchange met Vermont's needs, and only 21% thought it critical that VITL manage it going forward. The HIE Strategic Plan update of November 2024 put “Implement FHIR APIs” — the open interfaces modern applications are built on — at 25% complete, projected to reach 40% by year-end, and rated it only partially on track. The same update listed “All DA's contributing production data to VITL” among the year's accomplishments; VITL's own February 2025 figures show the designated mental-health and specialized service agencies contributing no data, with twelve accessing it."),
    compare('s5cmp1', 'Two ways to run a state health data exchange',
        'Statutory exclusive operator (Vermont today)', ['Operator named in law, not procured', 'No competitor to benchmark price or performance', 'Weak leverage at contract renewal', 'Operator also gatekeeps who builds on the data'],
        'State-owned utility, competitively operated', ['State owns the patient index, consent registry, and repository', 'Operation contracted on fixed terms at each renewal', 'Published performance targets with consequences', 'Open FHIR access so applications compete on one foundation']),
    steps('s5st1', 'Fixing the designation without replacing the exchange (HTR book, Figure 15.7)', [
        ('Own the core assets', 'Amend § 9352 so the State owns the patient index, consent registry, and clinical repository, and contracts for their operation competitively.'),
        ('Publish performance', 'Completeness, timeliness, and matching-accuracy targets by provider type, published quarterly, with financial consequences.'),
        ('Open the data layer', 'Standards-based FHIR access for any certified application, so e-Consult, referral, analytics, and patient tools compete on one unified foundation.'),
        ('Fund the missing feeds', 'Contributor connections for designated agencies and nursing homes, within 42 CFR Part 2 consent rules.'),
        ('Guarantee portability', 'Data, patient index, and consent records transfer to any successor operator; a second, State-controlled ingestion path removes the single point of failure.'),
    ]),

    h2('s6h1', 'Applying It: Your Own Unified-Data Test'),
    blk('s6p1', "The same test works in any state or health system. For each value-based arrangement you run or regulate, list the five tasks in the table above and ask which of the four sources you can actually join, for the same person, today. Where a task depends on a source you cannot reach, the arrangement is scheduled ahead of the data it depends on."),
    example('s6ex1', 'Vermont, read through the test', "Total cost of care for commercial patients needs commercial claims; in Vermont's plan those join in 2029–2030, after commercial prices are regulated from FY2028. Whole-person risk adjustment needs behavioral-health data; the designated agencies that hold much of it contributed no feeds to the exchange in February 2025.\nThe test does not say Vermont's reform is wrong. It says which data must arrive first for the reform to be managed rather than hoped for."),
    quote('s6q1', "“No one source can show whether a reform is working; only unified data can.” — HTR book, Chapter 15, §15.8"),

    takeaway('tk1', [
        "Value-based care needs unified data: claims, clinical, social-determinants, and behavioral-health data joined for the same person.",
        "Claims show what was paid but not the result; clinical records show the result but only inside one organization and without a price.",
        "Under global budgets the key risk is stinting, and only unified data can show whether access and outcomes held up.",
        "Act 167 of 2022 already mandated one health record per person; Act 68 set the § 9353 rules: no integration before January 1, 2027, a majority of all voting members, approved uses only.",
        "Vermont's commercial claims join the unified data in 2029–2030 under AHS's plan, after reference-based prices take effect in FY2028.",
        "The enacted law dropped the Senate's insurer-reporting requirement and funds no non-Medicaid phase.",
        "Section 9352 makes VITL the exclusive exchange operator; the public record shows the costs of a statutory monopoly.",
        "The fix is structural: State-owned core assets, competitive operation, published performance, open FHIR access, and funded behavioral-health feeds.",
    ]),
    quiz('qz1', "Under a hospital global budget, why can claims data alone not tell regulators whether the budget is working?",
        [("Claims show spending fell but not whether patients' health or access declined — that requires clinical, social, and behavioral-health data for the same people.", True),
         ("Claims are not collected once a hospital is on a global budget.", False),
         ("Global budgets are measured only through patient surveys.", False),
         ("Claims include clinical results such as blood-pressure readings, so they are sufficient.", False)],
        "A global budget pays a fixed sum regardless of volume, so its main risk is doing less. Claims can show that care and spending dropped, but only clinical outcomes and social and behavioral-health data, joined for the same people, can show whether that drop harmed anyone."),
]
body += [h2('src', 'Sources')] + [blk(f'src{n}', f"[{n}] {s} — {w}") for n, (s, w) in enumerate(SRC, 1)]

words = sum(len(b['children'][0]['text'].split()) for b in body if b.get('_type') == 'block' and b.get('style') != 'h2')
keys = [b['_key'] for b in body]
h2s = sum(1 for b in body if b.get('style') == 'h2') - 1
qz = [b for b in body if b.get('_type') == 'knowledgeCheck'][0]
tw = [b for b in body if b.get('_type') == 'takeawayBlock'][0]
print(f"blocks={len(body)} sections={h2s} words={words} sources={len(SRC)} takeaways={len(tw['points'])} "
      f"quiz_ok={sum(o['isCorrect'] for o in qz['options']) == 1} dup_keys={len(keys) != len(set(keys))}")
assert len(body) >= 20 and h2s >= 5 and len(SRC) >= 4 and 6 <= len(tw['points']) <= 8 and words >= 1200 and len(keys) == len(set(keys))
if '--commit' in sys.argv:
    post(SLUG, TITLE, body, course_slug='hie-health-reform-onboarding', order=8)
