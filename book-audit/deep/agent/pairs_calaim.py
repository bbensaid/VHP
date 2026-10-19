C = 'frontend/app/california-calaim/page.tsx'
CS = 'frontend/app/california-calaim/simulator/CalAIMSimulatorClient.tsx'

# ── page.tsx: hero links ──────────────────────────────────────────────────
add(C, lines(C, 111, 113),
    '          <ExternalLink href="https://www.dhcs.ca.gov/providers-partners/calaim-1115-demonstration-1915b-waiver/">\n'
    '            CalAIM Waiver Documents (DHCS)\n'
    '          </ExternalLink>')
add(C, 'href="https://www.medicaid.gov/medicaid/section-1115-demonstration/downloads/ca-medi-cal-2020-ca.pdf"',
       'href="https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/ca-calaim-ca1.pdf"')

# ── stat boxes ────────────────────────────────────────────────────────────
add(C, '<StatBox value="14M+" label="Medi-Cal Enrollees" sub="~1 in 3 Californians" />',
       '<StatBox value="13.7M" label="Medi-Cal Enrollees" sub="~1 in 3 Californians (June 2026)" />')
add(C, '<StatBox value="14" label="Community Supports" sub="Non-medical services authorized" />',
       '<StatBox value="15" label="Community Supports" sub="Transitional Rent added Jan 2026" />')
add(C, '<StatBox value="~40%" label="Californians on Medi-Cal" sub="Nation\'s largest Medicaid" />',
       '<StatBox value="24" label="Managed Care Plans" sub="Contracting with DHCS" />')
add(C, '<StatBox value="5yr" label="Initial Waiver Term" sub="Extended through 2027" />',
       '<StatBox value="5yr" label="Waiver Term" sub="2022–2026; 2027–2031 renewal pending" />')

# ── Whole Person Care ─────────────────────────────────────────────────────
add(C, "CalAIM builds directly on California's 2016–2022{\" \"}", "CalAIM builds directly on California's 2016–2021{\" \"}")
add(C, "WPC's success across 25 counties gave DHCS and Governor Newsom the evidence base to",
       "WPC's 25 pilots across 26 counties gave DHCS and Governor Newsom the evidence base to")

# ── component cards ───────────────────────────────────────────────────────
add(C, 'detail="14 non-medical services that Medi-Cal managed care plans can now authorize as covered benefits — including housing deposits, housing navigation, short-term post-hospitalization housing, meal delivery, asthma remediation, transportation, and environmental accessibility modifications."',
       'detail="15 non-medical services that Medi-Cal managed care plans can now offer as covered benefits — including housing deposits, housing navigation, short-term post-hospitalization housing, medically tailored meals, asthma remediation, transitional rent, and environmental accessibility adaptations."')
add(C, 'detail="Landmark expansion of Medi-Cal dental benefits — restoring adult dental coverage that had been eliminated during the 2009 recession, adding periodontal care, and establishing population-level oral health quality metrics. Affects 14M Californians who had limited or no dental coverage."',
       'detail="Statewide preventive dental initiatives launched with CalAIM in January 2022 — a Caries Risk Assessment bundle for young children, silver diamine fluoride for young children and high-risk groups, and pay-for-performance payments for preventive services. (Adult dental benefits cut in 2009 were fully restored in 2018, before CalAIM.)"')
add(C, 'Targets over 50,000 individuals annually.',
       'More than 42,000 people were identified as eligible in its first 13 months (Oct 2024–Nov 2025).')

# ── Community Supports list ───────────────────────────────────────────────
add(C, 'All 14 Community Supports — A Historic First', 'All 15 Community Supports')
add(C, 'For the first time in U.S. Medicaid history, California won CMS approval to pay for',
       'Under CalAIM, California won CMS approval to pay for')
add(C, lines(C, 247, 260),
    '              "Housing transition navigation services",\n'
    '              "Housing deposits",\n'
    '              "Housing tenancy & sustaining services",\n'
    '              "Short-term post-hospitalization housing",\n'
    '              "Recuperative care (medical respite)",\n'
    '              "Respite services (for caregivers)",\n'
    '              "Day habilitation programs",\n'
    '              "Nursing facility transition / diversion to assisted living",\n'
    '              "Community transition services / nursing facility transition to a home",\n'
    '              "Personal care and homemaker services",\n'
    '              "Environmental accessibility adaptations (home modifications)",\n'
    '              "Medically tailored meals / medically supportive food",\n'
    '              "Sobering centers",\n'
    '              "Asthma remediation",\n'
    '              "Transitional rent (added January 2026)",')

# ── target populations ────────────────────────────────────────────────────
add(C, lines(C, 287, 288),
    '              stat: "45%",\n'
    '              statLabel: "Of Medi-Cal\'s top-5% cost group have SMI",')
add(C, 'Without healthcare coverage at release, formerly incarcerated people face a 12-fold increase in overdose death risk in the first two weeks of freedom.',
       'In the first two weeks after prison release, people face 12.7 times the death risk of other residents, with drug overdose the leading cause (Binswanger et al., NEJM 2007).')
add(C, lines(C, 294, 295),
    '              stat: "42K+",\n'
    '              statLabel: "Identified eligible, Oct 2024–Nov 2025",')
add(C, lines(C, 301, 302),
    '              stat: "38K+",\n'
    '              statLabel: "Children in CA foster care (Sept 2024)",')
add(C, 'stat: "2x",', 'stat: "3.6x",')

# ── timeline (one block, keys kept unique) ────────────────────────────────
add(C, lines(C, 341, 352),
    '                { date: "2016–2017", event: "Whole Person Care authorized under the Medi-Cal 2020 waiver (2016); 25 pilots in 26 counties begin enrolling in 2017 — the proof-of-concept that will become CalAIM" },\n'
    '                { date: "2019–2020", event: "DHCS begins designing CalAIM; extensive stakeholder engagement with counties, plans, providers, and advocates" },\n'
    '                { date: "Jan 2021", event: "DHCS releases its revised CalAIM proposal" },\n'
    '                { date: "Jun 30, 2021", event: "DHCS submits the CalAIM Section 1115 and 1915(b) waiver requests to CMS" },\n'
    '                { date: "Dec 29, 2021", event: "CMS approves the CalAIM 1115 and 1915(b) waivers, effective through Dec 31, 2026" },\n'
    '                { date: "Jan 1, 2022", event: "CalAIM officially launches. Community Supports go live; ECM goes live in former Whole Person Care and Health Homes counties; new preventive dental benefits begin." },\n'
    '                { date: "Jul 2022", event: "ECM goes live in all remaining counties for the adult Populations of Focus (homelessness, avoidable hospital/ED use, SMI/SUD)" },\n'
    '                { date: "Jan 2023", event: "Population Health Management Program begins. On Jan 26, CMS approves California\'s justice-involved reentry amendment — the first in the nation." },\n'
    '                { date: "Jul 2023", event: "ECM goes live for the Children & Youth Populations of Focus, including youth in foster care" },\n'
    '                { date: "2023", event: "Behavioral health integration reforms begin phased implementation; counties and plans negotiate new data-sharing agreements" },\n'
    '                { date: "Jan 2024", event: "Medi-Cal expanded to all income-eligible Californians regardless of immigration status; ECM Birth Equity Population of Focus goes live" },\n'
    '                { date: "Oct 2024", event: "Justice-involved pre-release services launch; correctional facilities phase in through Oct 2026" },\n'
    '                { date: "Jan 2026", event: "Transitional Rent becomes the 15th Community Support" },\n'
    '                { date: "May 2026", event: "DHCS submits a five-year CalAIM 1115 renewal request to CMS for Jan 2027–Dec 2031; the current waiver expires Dec 31, 2026" },')

# ── stakeholders / national significance ──────────────────────────────────
add(C, '"California Medi-Cal managed care plans (22 plans)",', '"California Medi-Cal managed care plans (24 plans)",')
add(C, 'California accounts for roughly <strong>1 in 7 Medicaid enrollees nationwide</strong>.',
       'California accounts for roughly <strong>1 in 5 Medicaid and CHIP enrollees nationwide</strong>.')
add(C, 'has already influenced waiver negotiations in Oregon, Washington, and New York.',
       'sits alongside similar health-related social needs approvals in Oregon, Washington, and New York.')
add(C, "Since California's approval in 2022, CMS has opened", "Since California's approval in January 2023, CMS has opened")
add(C, 'The Community Supports framework is being\n                replicated in Oregon, Washington, and beyond.',
       'Oregon, Washington, and New York\n                hold their own approvals for health-related social needs services.')

# ── press cards: 8 fabricated -> 2 verified ───────────────────────────────
add(C, lines(C, 529, 584),
    '          <PressCard\n'
    '            publication="Associated Press (via CBS Sacramento)"\n'
    '            date="Dec 29, 2021"\n'
    '            title="Overhaul Of California\'s Medicaid Approved By US Government"\n'
    '            summary="Wire coverage of the federal approval of CalAIM, which lets Medi-Cal money be spent on housing-related services."\n'
    '            href="https://www.cbsnews.com/sacramento/news/overhaul-of-californias-medicaid-approved-by-us-government/"\n'
    '          />\n'
    '          <PressCard\n'
    '            publication="CalMatters"\n'
    '            date="Feb 14, 2022"\n'
    '            title="California launches ambitious effort to transform Medi-Cal"\n'
    '            summary="CalMatters on the CalAIM launch: care coordination, Community Supports, and the social needs the program targets."\n'
    '            href="https://calmatters.org/health/2022/02/california-medi-cal-reform/"\n'
    '          />')
add(C, lines(C, 598, 598) + '\n', '')

# ── simulator ─────────────────────────────────────────────────────────────
add(CS, 'plans and 58 counties serving 14.2M beneficiaries.',
        'plans and 58 counties serving about 13.7M members. Initiative costs, savings, timelines and plan figures\n'
        '            are illustrative model assumptions, not DHCS estimates.')
add(CS, "[['24', 'Managed Care Plans'], ['14.2M', 'Beneficiaries'], ['58', 'Counties'], ['2022–26', 'Waiver term']]",
        "[['24', 'Managed Care Plans'], ['13.7M', 'Members'], ['58', 'Counties'], ['2022–26', 'Waiver term']]")
add(CS, "region: 'Northern CA', enrollees: 620000, counties: 14,", "region: 'Northern CA', enrollees: 620000, counties: 24,")
add(CS, "region: 'Statewide', enrollees: 1900000, counties: 22,", "region: 'Southern CA + Sacramento', enrollees: 1200000, counties: 5,")
add(CS, "region: 'Central CA', enrollees: 380000, counties: 3,", "region: 'Central CA', enrollees: 380000, counties: 5,")
add(CS, "const planImpactM = plan ? (netM * plan.medicaidRevM) / 98000 : 0 // scale by plan size vs CA total",
        "const planImpactM = plan ? (netM * plan.enrollees) / 12969979 : 0 // share of Medi-Cal managed care enrollment (12,969,979, DHCS June 2026)")
add(CS, "by this plan&apos;s share of statewide Medi-Cal revenue.", "by this plan&apos;s share of statewide Medi-Cal managed care enrollment.")
add(CS, '<p className="text-sm text-slate-500">{plan.region} · {plan.counties} {plan.counties === 1 ? \'county\' : \'counties\'}</p>',
        '<p className="text-sm text-slate-500">{plan.region} · {plan.counties} {plan.counties === 1 ? \'county\' : \'counties\'}</p>\n'
        '                  <p className="text-[11px] text-amber-700 mt-1">Enrollment, revenue, margin, ECM readiness and SDOH scores are illustrative model inputs, not DHCS-reported figures.</p>')
