exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_m4a_common.py').read())

# Track 6 — Vermont's Hospitals Under a Single Payer
# All hospital figures are outputs of frontend/lib/m4a/modeler.ts (npm run test:m4a: inputs asserted against GMCB FY27
# orders, GMCB FY27 staff overview pp. 27/31/77, CMS cost report 2024), run 2026-11-21. Statewide FY27 figures:
# frontend/lib/data/gmcb-fy27-budget-orders.ts (GMCB press release Sept 15, 2026). RAND 283% / systems 148-321%:
# rand_vt_2024-08. VSEA/VEHI 289% and Oliver Wyman 200%: GMCB RBP report Dec 2024. S.1506 §§ 611, 615.
# Vermont global-budget history: book-audit/deep/VERIFIED_FACTS.md; GMCB FY27 staff overview p. 68.

for k in ('rand', 'gmcborders', 'gmcbfy27', 'modeler'):
    assert k in SRC
SRC['rbp'] = "GMCB, Reference-Based Pricing Data Analysis Report, Dec 16, 2024 — https://gmcboard.vermont.gov/sites/gmcb/files/documents/GMCB_RBP_Report_Draft_12_16_24_PDFA.pdf"
SRC['cmscr'] = "CMS, Hospital Provider Cost Report, 2024 release (Vermont hospitals) — https://data.cms.gov/provider-compliance/cost-reports/hospital-provider-cost-report"

# ════════════════════════════════════════════════════════════════════════════
L15_SLUG = 'm4a-vermont-hospitals-rate'
L15_TITLE = "One Rate for Every Patient: Vermont's Fourteen Hospitals"
L15 = [
    blk('intro1', "Arguments about single payer usually stay national. This lesson brings one design down to the level of named hospitals. Using the platform's Single-Payer Modeler, it applies a single payment rate for every patient, the design CBO analyzed, to the FY2027 budgets of Vermont's fourteen hospitals, and asks what happens to each one."),
    blk('intro2', "The results depend on two numbers: what commercial insurers pay today relative to Medicare, and the rate the single payer sets. The lesson explains where both come from, runs three scenarios, and is explicit about what the model does not capture. Every hospital figure here is an output of the Modeler, whose inputs are checked against GMCB and CMS source files by an automated test."),

    h2('s1h1', 'The Starting Point: FY2027 Budgets'),
    blk('s1p1', "On September 15, 2026, the Green Mountain Care Board announced its decisions on Vermont's FY2027 hospital budgets. Statewide net patient revenue was approved at $3,802.6 million, 1.6 percent above FY2026 budgets. Commercial net patient revenue was $1,936.9 million, down 1.2 percent, and commercial reimbursement rates were cut 2.9 percent overall, including a 4.4 percent cut for UVM Medical Center."),
    blk('s1p2', "The hospitals are not starting from strength. GMCB's August 2026 staff overview reports the operating margins hospitals submitted for FY2027. Five of the thirteen it tracks were negative: Central Vermont Medical Center (−1.0%), North Country (−3.1%), Northwestern (−2.9%), Rutland Regional (−2.3%) and UVM Medical Center (−1.7%). The system as a whole submitted −1.0%. Brattleboro Memorial is excluded from those tables. Commercial revenue is about half of most hospitals' net patient revenue, from 25 percent at Grace Cottage to 55 percent at UVM Medical Center."),
    stat_grid('s1sg1', [
        ('$3,802.6M', 'FY27 approved net patient revenue, 14 hospitals', 'GMCB, Sept 15, 2026'),
        ('$1,936.9M', 'Of which commercial', 'GMCB, Sept 15, 2026'),
        ('5 of 13', 'Hospitals submitting negative FY27 margins', 'GMCB FY27 Staff Overview, p. 31'),
        ('25-55%', 'Commercial share of each hospital\'s revenue', 'HTR calculation from GMCB FY27 orders'),
    ]),

    h2('s2h1', 'What Commercial Insurers Pay Today'),
    blk('s2p1', "A single payer that pays every patient's care at one rate changes commercial revenue the most, because commercial insurers pay far more than Medicare. Three published measures put Vermont's commercial prices between about three and four and a half times Medicare. RAND's work for the Green Mountain Care Board, using 2022 claims from fourteen hospitals, put overall inpatient and outpatient facility prices at 283 percent of Medicare, with individual systems ranging from 148 to 321 percent. GMCB's 2024 reference-based pricing study found payments for the state employee and teacher plans averaged 289 percent of Medicare across claims from 2018 through the third quarter of 2023."),
    blk('s2p2', "GMCB's FY2027 staff overview, citing its own price transparency tool, put the 2025 average commercial price across all hospital services at 453 percent of the Medicare-equivalent payment: 503 percent for outpatient and 333 percent for inpatient services. The three measures differ in method, which is why the Modeler offers all three as presets rather than picking one. It applies one statewide figure to every hospital, because hospital-level prices were not available as data."),
    table('s2t1', 'Three measures of Vermont commercial hospital prices', [
        {'Measure': 'RAND (2022 claims, 14 hospitals)', 'Percent of Medicare': '283%', 'Note': 'Systems range 148-321%'},
        {'Measure': 'State employee and teacher plans (2018-Q3 2023)', 'Percent of Medicare': '289%', 'Note': 'GMCB RBP report, Dec 2024'},
        {'Measure': 'GMCB price transparency tool (2025)', 'Percent of Medicare': '453%', 'Note': 'Outpatient 503%, inpatient 333%'},
    ]),

    h2('s3h1', 'How the Model Works'),
    blk('s3p1', "The Modeler's rate-based lens takes each hospital's FY2027 approved commercial revenue and reprices it from today's commercial price (R percent of Medicare) to the single-payer rate (P percent): new commercial revenue equals commercial revenue times P divided by R. It treats each hospital's non-commercial revenue as if it were paid at Medicare rates today, so that revenue scales by P divided by 100. Optionally, it adds the hospital's cost of uncompensated care, charity care and bad debt, from its latest CMS cost report, on the reasoning that everyone would be covered; across the fourteen hospitals that totals about $59 million."),
    blk('s3p2', "It then computes each hospital's FY2027 operating revenue from the expense and margin it submitted (revenue equals expense divided by one minus the margin), adds the change, and recalculates the margin. The test that runs with the Modeler confirms that this reproduces every submitted margin exactly before any change is applied."),
    steps('s3st1', 'The rate-based calculation, per hospital', [
        ('Commercial', 'Commercial revenue × (single-payer rate ÷ today\'s commercial price).'),
        ('Everything else', 'Non-commercial revenue × (single-payer rate ÷ 100), treating it as Medicare-rate today.'),
        ('Uncompensated care', 'Optionally add the hospital\'s cost of charity care and bad debt (CMS cost report).'),
        ('New margin', 'Apply the change to FY27 operating revenue and recompute the operating margin.'),
    ]),

    h2('s4h1', 'Scenario 1: Medicare Rates for Everyone'),
    blk('s4p1', "Using RAND's 283 percent and paying every patient at Medicare rates, with uncompensated care covered, the fourteen hospitals would lose $1,193 million, 31.4 percent of their FY2027 net patient revenue. Every one of the thirteen hospitals with margin data would run an operating loss, against five today. UVM Medical Center alone would lose about $660 million, a third of its revenue, taking its margin to about −38 percent. Even Porter, which submitted the highest margin, 8.6 percent, would fall to about −29 percent."),
    blk('s4p2', "This is the scenario behind the claim that \"Medicare rates would close hospitals\". The arithmetic supports it for a static system: Vermont's hospitals are paid roughly three times Medicare by about half their patients, and removing that difference removes a third of their revenue. With the GMCB tool's 453 percent, the loss would be larger still, about $1.45 billion."),
    stat_grid('s4sg1', [
        ('−$1,193M', 'Statewide revenue change at Medicare rates', 'Modeler: R = 283%, P = 100%, uncompensated care paid'),
        ('−31.4%', 'Of FY27 net patient revenue', 'Same scenario'),
        ('5 → 13', 'Hospitals with an operating loss', 'Of 13 with margin data'),
        ('−$660M', 'UVM Medical Center alone', 'Same scenario'),
    ]),

    h2('s5h1', 'Scenario 2: The Revenue-Neutral Rate'),
    blk('s5p1', "A more useful question is what single rate would leave total hospital revenue unchanged. With RAND's 283 percent, that rate is about 149 percent of Medicare; with the state plans' 289 percent, about 150 percent; with the GMCB tool's 453 percent, about 166 percent. CBO's higher-rate scenario is the national counterpart: rates near the average all payers are projected to pay."),
    blk('s5p2', "Even at a revenue-neutral rate, money moves between hospitals, because a single rate pays commercial patients' care less and everyone else's more. At 149 percent, before uncompensated care, UVM Medical Center, with the highest commercial share (55 percent), would lose about $76 million (4.0 percent of revenue) and Brattleboro Memorial about $3 million. Every other hospital gains: Grace Cottage, with the lowest commercial share (25 percent), by about 25 percent; Mt. Ascutney by about 17 percent; Gifford by about 11 percent. Hospitals with negative margins would fall from five to three."),
    example('s5ex1', 'Who gains and who loses at the revenue-neutral rate (Modeler, R = 283%, P ≈ 149%)', "Loses: UVM Medical Center −$75.9M (−4.0%, margin −1.7% → −4.9%); Brattleboro Memorial −$2.9M (−2.6%).\nGains most, as a share of revenue: Grace Cottage +$7.7M (+25.0%), Mt. Ascutney +$12.4M (+16.7%), Gifford +$7.2M (+10.7%), Springfield +$5.5M (+7.3%). Largest dollar gain: Central Vermont Medical Center +$17.3M (+5.5%).\nThe pattern follows commercial share: the less a hospital relies on commercial payers today, the more a single rate helps it."),

    h2('s6h1', 'Scenario 3, and What the Model Leaves Out'),
    blk('s6p1', "At 200 percent of Medicare, the benchmark Oliver Wyman's Act 167 report recommended for commercial prices (\"ideally at 200% of Medicare or less for PPS hospitals\", Vermont's six prospective-payment hospitals), every hospital gains and statewide revenue rises by about $1.36 billion. That is the point of the comparison: 200 percent is a cap on commercial prices in Vermont's reform debate, but as a single rate for every patient it would raise total spending sharply, because Medicare and Medicaid patients would be paid at double today's Medicare rates."),
    blk('s6p2', "The model's limits matter as much as its results. It is static: volume, costs and patient mix stay at FY2027 levels, while CBO expects demand to rise. It treats all non-commercial revenue as Medicare-rate, so it understates gains for Medicaid-heavy hospitals, because Medicaid pays less than Medicare. It applies one statewide commercial price to every hospital, although RAND found systems ranging from 148 to 321 percent. And it mixes approved revenue with submitted expense and margins, because that is how GMCB publishes them. The Modeler states each limit beside its results."),
    warning('s6w1', 'A model, not a forecast', "The rate-based lens answers one question: how a single payment rate would redistribute FY2027 revenue among Vermont's hospitals. It does not forecast what any hospital would actually receive, which would depend on negotiated budgets, volume changes and federal rules."),
    blk('s6p3', "The equity reading is direct. The hospitals that gain most from a single rate are the small, mostly critical-access hospitals with the lowest commercial shares; the one that loses most is the academic medical center. Whether that is a fair redistribution is a policy judgment. What the model shows is that it is not neutral."),

    takeaway('tw', [
        "Vermont's fourteen hospitals were approved for $3,802.6M of FY2027 net patient revenue, $1,936.9M of it commercial, and five of thirteen submitted negative margins.",
        "Published measures put Vermont's commercial prices at 283% (RAND), 289% (state plans) or 453% (GMCB tool) of Medicare.",
        "The Modeler reprices commercial revenue to the single rate and treats other revenue as Medicare-rate, with uncompensated care optionally paid.",
        "At Medicare rates, revenue falls about $1.19 billion (31.4%) and all thirteen hospitals with data run losses.",
        "The revenue-neutral single rate is about 149% of Medicare (RAND basis), 150% (state plans) or 166% (GMCB tool).",
        "Even at that rate, UVM Medical Center loses about $76 million while low-commercial-share hospitals such as Grace Cottage and Mt. Ascutney gain most.",
        "The model is static, understates Medicaid-heavy hospitals' gains, and uses one statewide price; it shows redistribution, not a forecast.",
    ]),
    quiz('qz', "In the Modeler, why does UVM Medical Center lose revenue even at the revenue-neutral single rate?", [
        ("Because its operating expenses are excluded from the model", False),
        ("Because it has the highest commercial share of revenue, and a single rate pays commercial patients' care less while paying everyone else's more", True),
        ("Because critical-access hospitals receive a special bonus under single payer", False),
        ("Because the model assumes UVM Medical Center loses its Medicare patients", False),
    ], "At a revenue-neutral rate total revenue is unchanged, but commercial revenue falls and non-commercial revenue rises. UVM Medical Center has the highest commercial share (55%), so it loses about $76 million, while hospitals with low commercial shares, such as Grace Cottage (25%), gain the most."),
    *sources(['gmcborders', 'gmcbfy27', 'rand', 'rbp', 'cmscr', 'modeler', 'cbo'], {
        'gmcborders': "FY27 approved net patient revenue and commercial revenue by hospital; statewide changes; UVMMC rate",
        'gmcbfy27': "p. 27 submitted expense, p. 31 submitted operating margins, p. 77 the 453% / 503% / 333% price figures",
        'rand': "283% overall; systems 148-321%; 14 hospitals",
        'rbp': "289% for VSEA/VEHI payments, claims 2018 through Q3 2023; Oliver Wyman's 200% recommendation",
        'cmscr': "cost of uncompensated care by hospital",
        'modeler': "every scenario result in this lesson, with its assumptions",
        'cbo': "higher-rate scenario near the all-payer average; demand rising",
    }),
]

# ════════════════════════════════════════════════════════════════════════════
L16_SLUG = 'm4a-vermont-hospitals-global'
L16_TITLE = "Global Budgets Under S.1506, and Vermont's Own Experience"
L16 = [
    blk('intro1', "S.1506 does not actually pay hospitals a single rate per service. It pays them a quarterly global budget for their operating costs, negotiated with a regional director. That is a different design with different winners and losers from the rate-based model in Lesson 15."),
    blk('intro2', "This lesson explains how S.1506's global budgets work, applies a simplified version to Vermont's hospitals using the Modeler, reads the result against the bill's own negotiating rules, and then sets it beside Vermont's own experience with global budgets, which has been instructive and, in 2026, difficult."),

    h2('s1h1', 'How S.1506 Pays Hospitals'),
    blk('s1p1', "Under § 611, at the start of each fiscal quarter the Secretary pays each institutional provider, including hospitals, skilled nursing facilities and independent dialysis facilities, a lump sum that is \"payment in full for all operating expenses\" for covered items and services, inpatient and outpatient. Clinicians in group practices working at the institution may choose to be paid on salary through its budget. A regional director reviews performance each quarter and may adjust payments."),
    blk('s1p2', "The amount is negotiated before each year between the provider and the regional director, taking into account: three years of historical volume for each item and service; the provider's expenditures in its most recent Medicare cost report, compared with other institutions in the region and with normative payment rates; projected changes in volume and type of services; wages, including what is needed for safe nurse staffing; maximum capacity; education and prevention programs; and adjustments for things like expanding access, reducing disparities in rural and shortage areas, and responding to epidemics."),
    blk('s1p3', "Section 615 adds two rules that shape the incentive. Capital, meaning construction, renovation and major equipment, is funded separately by application, with priority for underserved areas. And no payment may be used for marketing or for \"the profit or net revenue of the provider\"."),
    callout('s1c1', "Under S.1506, a hospital is paid for its operating costs as negotiated, not for each service it bills. Profit is not a permitted use of the payment, and capital is funded separately."),

    h2('s2h1', 'What a Cost-Based Budget Would Mean for Vermont'),
    blk('s2p1', "The Modeler's second lens takes the simplest reading of those rules: each hospital's operating revenue equals its operating expense, so every operating margin becomes zero. It uses each hospital's FY2027 submitted expense and margin, so it covers the thirteen hospitals GMCB reports; Brattleboro Memorial has no figures in those tables. Treat it as an upper bound: the FY2027 expense includes depreciation, which S.1506 funds separately (§ 611(b)(3)), and the bill negotiates against Medicare's prospective payment rates (§ 611(c)), which could pay less."),
    blk('s2p2', "The result is a modest net change statewide, about +$45 million, but a clear redistribution. Hospitals now losing money are made whole: UVM Medical Center gains about $43 million, Rutland Regional about $9 million, Northwestern about $4.5 million, North Country about $3.5 million and Central Vermont about $3.3 million. Hospitals now earning a surplus give it up: Porter, with the highest submitted margin at 8.6 percent, loses about $12.4 million; Copley about $2.6 million; Springfield about $1.1 million."),
    stat_grid('s2sg1', [
        ('+$45M', 'Statewide change, 13 hospitals', 'Modeler, S.1506 global-budget lens'),
        ('5 → 0', 'Hospitals with an operating loss', 'Every margin set to zero'),
        ('+$43M', 'UVM Medical Center', 'From a −1.7% submitted margin'),
        ('−$12.4M', 'Porter Medical Center', 'From an 8.6% submitted margin'),
    ]),

    h2('s3h1', 'What the Simplification Hides'),
    blk('s3p1', "Setting revenue equal to expense is a starting point, not a prediction. The bill's negotiating factors compare each hospital's costs with others in the region and with normative rates. A high-cost hospital could be held below its current expense; a low-cost one could be given room for wages or access. The budget is also forward-looking, built on projected volume and capacity, not only on the past."),
    blk('s3p2', "The bill also allows interim adjustments during the year, on petition, for unanticipated cost increases outside the hospital's control, such as natural disasters, public health emergencies, unexpected repairs, significant rises in drug or device prices, or unanticipated complex patients; for changes in federal or state law; and for reasonable increases in labor costs, including collective bargaining agreements. Those protections are meant to keep a fixed budget from becoming a trap."),
    compare('s3cmp1', 'Two lenses on Vermont\'s hospitals',
        'One rate for every patient (Lesson 15)', ['Redistributes by payer mix', 'High commercial share loses', 'Margins can stay positive or negative', 'Total depends on the rate chosen'],
        'S.1506 cost-based global budget', ['Redistributes by margin', 'Surplus hospitals give it up', 'Operating margins converge on zero', 'Total depends on allowed costs']),

    h2('s4h1', "Vermont's Own Global Budget Experience"),
    blk('s4p1', "Vermont has been moving toward hospital global budgets for years, and its experience shows what can stand in the way. Act 68 of 2025 requires them: beginning no later than hospital fiscal year 2028 for one or more non-critical-access hospitals, and for all hospitals by 2030, in both cases \"to the extent that resources are available\". The budgets are to include Medicare to the extent federal law permits, and they exclude Medicaid."),
    blk('s4p2', "Federal participation has proved the hard part. Vermont's All-Payer ACO Model with CMS ran from 2018 to the end of 2025. The state signed the AHEAD Model agreement in January 2025 and withdrew in July 2026, after CMS's renegotiation cut the expected federal upside from about $138 million to a cap of $10 million. Its Medicaid hospital global budget, launched January 1, 2026, was not approved by CMS under the Global Commitment waiver; payments stopped on July 31, 2026, and the January-to-July payments are being reprocessed as fee-for-service. GMCB's August 2026 staff overview concludes there is no option for a Medicare global budget at this time, and that Medicaid global budgets are no longer an option given the federal position on Vermont's authority."),
    example('s4ex1', 'Vermont\'s global budgets, 2025-2026', "Act 68 (2025): hospital global budgets required from HFY2028 to the extent resources allow, Medicare included where federal law permits, Medicaid excluded.\nJanuary 1, 2026: a Medicaid hospital global budget launches.\nJuly 2026: CMS finds it not approved under the Global Commitment waiver; payments stop July 31; Vermont also withdraws from AHEAD.\nAugust 2026: GMCB staff record no option for Medicare or Medicaid global budgets at this time."),

    h2('s5h1', 'What Federal Authority Would Change'),
    blk('s5p1', "Vermont's global budgets stalled for the reasons Track 3 described: Medicare and Medicaid are federal, and a state can include them only with federal agreement. S.1506 would not need that agreement, because it would be the federal law. Every payer would be the same payer, and the global budget would cover all of a hospital's patients."),
    blk('s5p2', "Analysis: that removes Vermont's biggest obstacle, but not the hardest design question, which is the level at which budgets are set. A cost-based budget rescues deficit hospitals but rewards cost rather than efficiency unless the regional comparison has teeth. A rate-based approach rewards low cost but, as Lesson 15 showed, can push hospitals into loss if the rate is low. S.1506 tries to combine the two by negotiating from costs while comparing them with peers and normative rates; how that balance is struck would decide whether Vermont's small hospitals are stabilized or squeezed."),
    highlight('s5hl1', "A federal single payer removes the federal-permission problem that stalled Vermont's global budgets. It does not settle the level at which each hospital's budget is set."),

    h2('s6h1', 'Run It Yourself'),
    blk('s6p1', "The Single-Payer Modeler lets you test both lenses on Vermont's hospitals. In the rate-based lens, choose a commercial price preset and a single-payer rate, including the revenue-neutral rate it calculates, and see each hospital's revenue and margin change. In the global-budget lens, see the cost-based budget's effect. The national panel shows CBO's ranges, and the assumptions section lists every limit."),
    blk('s6p2', "Equity sits in the same table. The rural, critical-access hospitals are where a single rate helps most. Under a cost-based budget most of them change little, because their margins are already close to zero; Porter, a critical-access hospital with an 8.6% submitted margin, is the exception. The question for any design is whether it leaves them able to keep their doors open and their staff employed, which is the Operations gate from Track 5."),
    steps('s6st1', 'A ten-minute exercise in the Modeler', [
        ('Set the baseline', 'Choose RAND (283%) and Medicare rates (100%), and note the statewide change and the number of hospitals in deficit.'),
        ('Find neutral', 'Click the revenue-neutral preset and note which hospitals still lose.'),
        ('Change the price', 'Switch to the GMCB tool (453%) and see how the neutral rate and the redistribution move.'),
        ('Switch lenses', 'Open S.1506 global budgets and compare which hospitals gain under each design.'),
    ]),

    takeaway('tw', [
        "S.1506 pays institutions a quarterly global budget, payment in full for operating expenses, negotiated with a regional director.",
        "Negotiation uses volume, Medicare cost reports compared with peers and normative rates, projected services, wages and staffing, and capacity.",
        "Capital is funded separately, and no payment may be used for marketing or provider profit.",
        "Modeled as revenue equal to expense, Vermont's thirteen reporting hospitals change by about +$45M: deficit hospitals are made whole and Porter gives up about $12.4M.",
        "Vermont's own global budgets have stalled on federal permission: AHEAD withdrawal and a CMS-stopped Medicaid global budget in 2026.",
        "A federal single payer would remove the permission problem but not the question of the level at which budgets are set.",
        "Most rural critical-access hospitals gain from a single rate and change little under cost-based budgets, because their margins are near zero; Porter, with an 8.6% margin, is the exception.",
    ]),
    quiz('qz', "In the Modeler's S.1506 global-budget lens, why does Porter Medical Center lose revenue?", [
        ("Because Porter has the highest commercial share in Vermont", False),
        ("Because operating revenue is set equal to operating expense, so Porter's 8.6% submitted surplus is removed", True),
        ("Because critical-access hospitals are excluded from S.1506", False),
        ("Because Porter's capital budget is cut to zero", False),
    ], "The lens models § 611's payment for operating expenses, with § 615 barring payments toward profit, as revenue equal to expense. Porter submitted the highest FY2027 operating margin (8.6%), so it gives up about $12.4 million, while hospitals with negative margins are made whole. Capital is funded separately and is outside the comparison."),
    *sources(['s1506', 'modeler', 'gmcbfy27', 'act68', 'bookA', 'cbo'], {
        's1506': "§ 611(a)-(b) quarterly global budgets, negotiation factors, interim adjustments; § 615 capital and profit prohibition",
        'modeler': "global-budget lens results and both lenses' assumptions",
        'gmcbfy27': "pp. 27, 31 submitted expense and margins; p. 68 no Medicare or Medicaid global budget option",
        'act68': "hospital global budgets from HFY2028 to the extent resources allow; Medicare where federal law permits; Medicaid excluded",
        'bookA': "the Board's budget-setting role",
        'cbo': "rate scenarios as the national counterpart",
    }),
]

run([(L15_SLUG, L15_TITLE, L15, 15), (L16_SLUG, L16_TITLE, L16, 16)])
