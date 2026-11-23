exec(open('CONTENT_TEMPLATE.py').read())
exec(open('frontend/content/_course_cmmi_common.py').read())

# Track 2 — State Models: Global Budgets, AHEAD and Episodes
# Lesson 4 facts verified 2026-11-23 by search of CMS AHEAD overview/FAQ material (fall 2025), RTI and Health Affairs
# summaries of the Maryland All-Payer Model, and HTR book Chapter 3 §3.2-3.5, §3.9.

# ════════════════════════════════════════════════════════════════════════════
L4_SLUG = 'cmmi-global-budgets-maryland-to-ahead'
L4_TITLE = 'Hospital Global Budgets: From Maryland to AHEAD'
L4 = [
    blk('intro1', "A hospital global budget replaces payment per admission or per visit with a predictable annual revenue amount. The hospital keeps what it does not spend by keeping people healthy and out of the hospital, and it absorbs the cost of volume it cannot justify. The idea is simple to state and hard to run, and one state has been running it for more than a decade."),
    blk('intro2', "This lesson follows the idea from Maryland, where it was proven in practice, to AHEAD, where the Innovation Center tries to extend it to other states, and then to Vermont's Act 68, which makes hospital global budgets state law. It explains how the budget works, what the Maryland evidence does and does not show, and what changed in AHEAD's design in 2025."),
    blk('intro3', "Chapter 3 treats Maryland as the clearest example of the first success characteristic, near-mandatory participation, and treats AHEAD as the federal vehicle meant to carry that logic to other states."),

    h2('s1h1', 'How a Global Budget Works'),
    blk('s1p1', "Under fee-for-service payment, a hospital's revenue rises with every admission, test and procedure. A global budget fixes the hospital's expected revenue for the coming year, usually set from historical revenue adjusted for population change, quality, and agreed policy factors, and pays it in regular installments. CMS describes it in the AHEAD material as giving hospitals a predictable amount of revenue for the upcoming year."),
    blk('s1p2', "The incentive flips. A hospital that treats fewer avoidable cases does not lose revenue, so it can invest in prevention, primary care and care coordination. A hospital that grows volume without a justified population reason does not gain revenue. Because the budget is fixed in advance, finance leaders can plan, and because it is set against a defined population, it ties the hospital to the health of the community rather than the throughput of its beds."),
    blk('s1p3', "The design carries its own risks, which later lessons return to. If the budget is set from a base that already embeds inefficiency, the hospital is paid for it. If the risk adjustment misses how sick the attributed population really is, the budget will understate need and the hospital will absorb the difference. Chapter 3 states this directly for Vermont: documentation of the population's risk drives the benchmark, and a hospital with incomplete documentation will be held accountable for costs the benchmark does not reflect."),
    callout('s1c1', "A global budget is a prospective, population-based revenue amount for a hospital. It rewards keeping people well and penalizes unjustified volume, which is why its benchmark and risk adjustment are where the financial stakes sit."),

    h2('s2h1', 'Maryland: The Proof of Concept'),
    blk('s2p1', "Maryland's hospitals have been paid under an all-payer rate-setting system administered by the state's Health Services Cost Review Commission since the 1970s, in which all payers pay the same hospital rates. In 2014 the state and CMS added hospital-specific global budgets on top of that system in the Maryland All-Payer Model. In 2019 the arrangement was extended into the Total Cost of Care Model, which encouraged hospitals to use savings under the global budget to fund incentives for non-hospital providers."),
    blk('s2p2', "The evidence is favorable but not unanimous. RTI's evaluation for CMS found aggregate Medicare hospital savings of $554 million over the first three years of global budgets, 2014 to 2016, and $679 million in total Medicare savings, about 3 percent of baseline spending. A Health Affairs commentary put the savings over the four and a half years to mid-2018 at nearly $1 billion on a risk-adjusted basis. CMS's first report on the Total Cost of Care Model concluded that Maryland reduced total spending relative to national trends by $365 million in 2019. Not every study agrees: one study found no effect of global budgets on use, and the Milbank Memorial Fund reported modest quality effects and mixed results on readmissions."),
    blk('s2p3', "Two readings are both reasonable. Maryland is the strongest case in the country that mandatory, all-payer hospital budgeting can slow spending growth without destabilizing hospitals. It is also a state with a long-established regulatory authority that most other states do not have, which is why its model is hard to copy. Chapter 3 credits the Maryland model with the alignment characteristic precisely because it was built on the state's existing authority."),
    example('s2ex1', 'Maryland All-Payer Model, 2014-2018', "The model replaced fee-for-service hospital payment with hospital-specific global budgets inside Maryland's all-payer system. RTI found $554 million in aggregate Medicare hospital savings over the first three years and $679 million in total Medicare savings.\nIts limits are as instructive as its results: the evidence on utilization and quality is mixed, and Maryland's regulatory authority is unusual, so the lesson for other states is to build on what authority they have rather than assume Maryland's can be copied."),

    h2('s3h1', 'AHEAD: Taking the Idea to Other States'),
    blk('s3p1', "AHEAD asks each participating state to do something Maryland did over decades, on a shorter timetable and with federal participation. CMS's fall 2025 overview of the model describes three linked components for Cohort 2 and 3 states: Medicare fee-for-service hospital global budgets, Primary Care AHEAD, and a state Medicaid advanced primary care program. A new geographic ACO component, Geo AHEAD, is added from 2028 for Medicare beneficiaries in AHEAD regions not aligned with other CMS value-based programs."),
    blk('s3p2', "The state, not the hospital, is the accountable party. Targets apply to the whole state or a defined sub-state region regardless of how many hospitals take part in a global budget, and are written into the State Agreement between the state and CMS. They include Medicare fee-for-service and all-payer total cost of care growth and primary care investment goals. States must also bring Medicaid in as an aligned payer in hospital global budgets and primary care, and from 2029 at least one commercial payer in each state is to implement a commercial hospital global budget methodology."),
    blk('s3p3', "In September 2025 CMS changed the model. It moved the performance period for Cohorts 2 and 3 back a year, to January 1, 2028 through December 31, 2035, to give states more time for planning and for securing the legislative authority they need. It removed the option for states with their own hospital rate-setting authority to design their own Medicare fee-for-service global budget methodology, with Maryland the exception: it keeps its methodology for 2026 and 2027 and moves to the AHEAD methodology in 2028. It also said it would provide cooperative agreement funding for state planning activities."),
    compare('s3cmp1', 'Maryland model versus AHEAD',
        'Maryland (2014 onward)', [
            'Built on an existing, decades-old all-payer rate-setting authority',
            'Hospital global budgets inside a state-run system',
            'Mandatory for Maryland hospitals',
        ],
        'AHEAD (Cohorts 2 and 3, from 2028)', [
            'State negotiates a State Agreement with CMS and builds the authority it needs',
            'CMS-designed Medicare fee-for-service global budget methodology',
            'State accountable for targets whatever the hospital participation level',
        ]),

    h2('s3h2', 'What a State Needs Before It Can Run Global Budgets'),
    blk('s3b1', "Reading the Maryland and AHEAD material side by side suggests a short list of prerequisites. A state needs legal authority over hospital budgets or rates, since a federal model cannot supply what state law does not. It needs a data foundation, ideally an all-payer claims database, to set a credible baseline and to measure total cost of care. It needs a risk adjustment method that its hospitals and regulators accept. It needs payers beyond Medicare to take part, because AHEAD expects Medicaid alignment and, from 2029, at least one commercial payer. And it needs an analytics capability that can show each hospital its budget performance during the year, not after it."),
    blk('s3b2', "Chapter 3's Beyond Vermont box makes the data point explicitly: a state without an all-payer claims database enters the budget-neutrality negotiation with a weaker evidentiary position, not a different negotiation. That is one reason the book places the Technology pillar before the Economics pillar in the five-pillar sequence. Chapter 3 applies the same logic to Vermont's own plan, warning that the global budget timeline must account for the gap between the Act 68 performance start and the deployment of the analytics vendor, which it says should be treated as a critical-path decision with a hard deadline."),
    steps('s3st1', 'Prerequisites checklist for hospital global budgets', [
        ('Authority', 'State law or regulation giving a regulator power over hospital budgets or rates.'),
        ('Data', 'An all-payer claims database and a baseline that CMS and hospitals accept.'),
        ('Risk adjustment', 'A method that reflects the attributed population\'s documented risk.'),
        ('Payer alignment', 'Medicaid in from the start; commercial payers by the model timetable.'),
        ('Analytics', 'In-year reporting so hospitals can manage to the budget before the year ends.'),
    ]),

    h2('s4h1', "Vermont's Act 68: Global Budgets in State Law"),
    blk('s4p1', "Vermont's route is different from AHEAD's, and the difference is the point of Chapter 3's argument about independent authority. Act 68 of 2025 requires prospective hospital global budgets under the Green Mountain Care Board: one or more hospitals from hospital fiscal year 2028 and all by fiscal year 2030, to the extent resources are available. The state's authority does not rest on a federal model."),
    blk('s4p2', "That structure is what let Vermont stay on its path after leaving AHEAD. The signed model gave the state rights to withdraw, and when CMS cut the expected EAST Fund from an estimated $138 million in the first performance year to a cap of about $10 million, Vermont used them in July 2026. The state's global budget law remained."),
    blk('s4p3', "Chapter 3 draws a practical lesson for hospital executives: begin the work that determines the benchmark now. Act 68 does not specify a risk adjustment method, and the Board's methodology is still being designed. If it adjusts for population risk, as most budget models do, the benchmark will reflect the attributed population's documented risk, so Chapter 3 advises starting hierarchical condition category documentation gap closure well before the performance start."),
    warning('s4w1', "State authority and federal permission are different things", "A state can legislate global budgets for its hospitals, but applying them to Medicare and Medicaid payments needs federal approval, through a model such as AHEAD or a waiver. Chapter 3 records that Vermont's Medicaid global budget, launched in January 2026 on state rather than AHEAD authority, drew a July 2026 CMS notice that it had not been approved under the Global Commitment demonstration's terms and that payments should stop. Track 3 returns to this case."),

    takeaway('tw', [
        "A hospital global budget is a prospective annual revenue amount tied to a population, which rewards avoided care and penalizes unjustified volume.",
        "Maryland has used all-payer hospital rate setting since the 1970s, added hospital global budgets in 2014 and extended to the Total Cost of Care Model in 2019.",
        "RTI found $554 million in Medicare hospital savings in Maryland's first three global-budget years and $679 million in total Medicare savings; other studies found weaker or mixed effects on use and quality.",
        "AHEAD makes the state accountable for total cost of care and primary care investment targets across the state or sub-state region, set out in the State Agreement.",
        "In September 2025 CMS moved the Cohort 2 and 3 performance period to January 1, 2028 through December 31, 2035 and removed state-designed Medicare fee-for-service global budget methodologies, except Maryland's through 2027.",
        "Vermont's Act 68 requires hospital global budgets from fiscal year 2028 (one or more hospitals) and for all hospitals by fiscal year 2030, to the extent resources are available.",
        "Because the benchmark reflects documented population risk, hospitals should begin documentation gap closure before the performance period starts.",
    ]),
    quiz('qz',
        "What distinguishes AHEAD's accountability structure from a hospital-only global budget program?",
        [
            ("Only hospitals, not the state, are accountable for total cost of care targets", False),
            ("The state is accountable for total cost of care and primary care investment targets across the state or region, regardless of hospital participation level", True),
            ("Participation is mandatory for every hospital in the country", False),
            ("It applies only to commercial insurance", False),
        ],
        "In AHEAD, targets apply to the entire state or sub-state region and are set in the State Agreement between the state and CMS, whatever the level of hospital participation. That is what separates it from provider-level models, and it is why states need legislative and regulatory authority to deliver it."
    ),
    h2('src', 'Sources'),
    blk('src1', "[1] " + BOOK3 + " — §3.2.2, §3.5.1, §3.9: Maryland, AHEAD, Vermont's Act 68 global budgets and the July 2026 withdrawal and compliance notice"),
    blk('src2', "[2] CMS, AHEAD Model — https://www.cms.gov/priorities/innovation/innovation-models/ahead — cohorts, September 3, 2025 changes"),
    blk('src3', "[3] CMS, AHEAD Overview, fall 2025 slides and transcript — https://www.cms.gov/priorities/innovation/files/ahead-overview-fall2025-slides.pdf — Cohort 2 and 3 components, targets, Medicaid and commercial alignment, Geo AHEAD"),
    blk('src4', "[4] CMS, AHEAD Model Frequently Asked Questions — https://www.cms.gov/priorities/innovation/ahead/faqs"),
    blk('src5', "[5] RTI International, New Hospital Payment Model Reduces Costs for Medicare Beneficiaries in Maryland — https://rti.org/news/new-hospital-payment-model-reduces-costs-medicare-beneficiaries-maryland — $554 million and $679 million findings"),
    blk('src6', "[6] Milbank Memorial Fund, Uniquely Similar: New Results from Maryland's All-Payer Model and Paths Forward for Value-Based Care — https://www.milbank.org/publications/uniquely-similar-new-results-from-marylands-all-payer-model-and-paths-forward-for-value-based-care/"),
    blk('src7', "[7] Health Affairs Forefront, Another Look at the Evidence on Hospital Global Budgets in Maryland — https://www.healthaffairs.org/content/forefront/another-look-evidence-hospital-global-budgets-maryland-have-they-reduced-expenditures"),
]

LESSONS = [(L4_SLUG, L4_TITLE, L4, 4)]
if __name__ == '__main__':
    run(LESSONS)
