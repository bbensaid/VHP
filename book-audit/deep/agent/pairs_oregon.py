P = 'frontend/app/oregon-cco/page.tsx'
S = 'frontend/app/oregon-cco/simulator/OregonCCOSimulatorClient.tsx'
SP = 'frontend/app/oregon-cco/simulator/page.tsx'

# ── page.tsx ──────────────────────────────────────────────────────────────
add(P, "Oregon's third-generation Coordinated Care Organizations model — integrating physical, behavioral, and oral health under global budgets with equity accountability and community advisory boards.",
       "Oregon's Coordinated Care Organizations — integrating physical, behavioral, and oral health under global budgets with equity accountability and community advisory councils.")

add(P, 'CCO 3.0 · 2025–2030', 'CCO 3.0 · next contract round, in planning')

add(P, lines(P, 65, 67),
    "          Oregon&apos;s Coordinated Care Organizations integrate physical, behavioral, and oral health under global budgets,\n"
    "          with community advisory councils and health equity accountability. Today&apos;s CCOs operate under CCO 2.0 contracts\n"
    "          (signed for 2020–2024 and since extended); &ldquo;CCO 3.0&rdquo; is OHA&apos;s name for the next contract round, which it is\n"
    "          still planning. CCOs serve most of Oregon&apos;s 1.4M Oregon Health Plan members.")

add(P, '<StatBox value="16" label="CCOs" sub="coordinated care orgs" />',
       '<StatBox value="15" label="CCOs" sub="since Feb 2026" />')
add(P, '<StatBox value="$3.2B" label="Global Budget" sub="annual spend" />',
       '<StatBox value="$325M" label="2024 Quality Pool" sub="4.25% of CCO capitation" />')

add(P, 'What CCO 3.0 Changes</h2>', 'What CCO 2.0 Requires</h2>')
add(P, lines(P, 93, 94),
    "          CCO 2.0 contracts (2020 onward) were built on four state priorities: behavioral health, value-based payment,\n"
    "          social determinants and health equity, and sustainable cost growth. The next round (CCO 3.0) is still in OHA planning.")

add(P, lines(P, 97, 99),
    '          <InvestCard icon="📊" title="Social Determinants & Health Equity"\n'
    '            desc="CCOs must increase their investment in strategies that address social determinants of health and health equity."\n'
    "            items={['Increased SDOH and health equity investment', 'Stronger engagement with tribes and community advisory councils', 'Expanded use of traditional health workers']} />")
add(P, lines(P, 100, 102),
    '          <InvestCard icon="🧠" title="Behavioral Health Integration"\n'
    '            desc="Under CCO 2.0, CCOs are fully accountable for the behavioral health benefit."\n'
    "            items={['Person-centered mental health and substance use disorder system', 'Remove barriers between behavioral, physical and oral health', 'Expand programs integrating primary care into behavioral health settings']} />")
add(P, lines(P, 103, 105),
    '          <InvestCard icon="🤝" title="Traditional Health Workers"\n'
    '            desc="CCO 2.0 calls for increased use of traditional health workers, a category that includes community health workers."\n'
    "            items={['Traditional health workers include community health workers', 'Supports the SDOH and health equity priority']} />")
add(P, lines(P, 106, 108),
    '          <InvestCard icon="💰" title="Global Budget Methodology"\n'
    '            desc="CCO global budgets may grow no more than 3.4% per member per year, in line with the state cost growth target."\n'
    "            items={['Growth cap: 3.4% per member per year', 'Goal: 70% of CCO provider payments value-based by the end of the contract period', 'Quality Pool bonus on top of capitation: 4.25% of total PMPM ($325M in 2024)']} />")

add(P, lines(P, 42, 51),
    "const CCO_LIST = [\n"
    "  { name: 'Advanced Health', area: 'Coos and Curry counties' },\n"
    "  { name: 'AllCare CCO', area: 'Curry, Josephine, and Jackson counties; part of Douglas' },\n"
    "  { name: 'Cascade Health Alliance', area: 'Part of Klamath County' },\n"
    "  { name: 'Columbia Pacific CCO', area: 'Clatsop, Columbia, and Tillamook counties' },\n"
    "  { name: 'Eastern Oregon CCO', area: 'Baker, Gilliam, Grant, Harney, Lake, Malheur, Morrow, Sherman, Umatilla, Union, Wallowa, and Wheeler counties' },\n"
    "  { name: 'Health Share of Oregon', area: 'Clackamas, Multnomah, and Washington counties' },\n"
    "  { name: 'InterCommunity Health Network CCO', area: 'Benton, Lincoln, and Linn counties' },\n"
    "  { name: 'Jackson Care Connect', area: 'Jackson County' },\n"
    "  { name: 'PacificSource Community Solutions – Central Oregon', area: 'Deschutes, Crook, and Jefferson counties; part of Klamath' },\n"
    "  { name: 'PacificSource Community Solutions – Columbia Gorge', area: 'Hood River and Wasco counties' },\n"
    "  { name: 'PacificSource Community Solutions – Marion/Polk', area: 'Marion and Polk counties' },\n"
    "  { name: 'Trillium Community Health Plan – Southwest', area: 'Lane County; western Linn and Douglas' },\n"
    "  { name: 'Trillium Community Health Plan – Tri-County', area: 'Clackamas, Multnomah, and Washington counties' },\n"
    "  { name: 'Umpqua Health Alliance', area: 'Most of Douglas County' },\n"
    "  { name: 'Yamhill Community Care', area: 'Yamhill County; parts of Polk and Washington' },\n"
    "]")
add(P, lines(P, 120, 122),
    '                <th className="text-left px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">Service Area</th>')
add(P, lines(P, 129, 131),
    '                  <td className="px-4 py-3 text-slate-500">{cco.area}</td>')
add(P, '<h2 className="text-xl font-black text-slate-900 mb-4">Oregon CCO Directory</h2>',
       '<h2 className="text-xl font-black text-slate-900 mb-4">Oregon CCO Directory</h2>\n'
       '        <p className="text-xs text-slate-500 mb-3">Service areas per Oregon Health Authority, 2026. PacificSource left Lane County on Feb 1, 2026.</p>')

add(P, 'CBO projects Oregon faces $2.1B in Medicaid revenue reduction by 2034. CCO global budgets',
       'KFF&apos;s allocation of CBO&apos;s estimate places Oregon among the four hardest-hit states, with federal Medicaid cuts of 19% or more through 2034. CCO global budgets')

# ── simulator/page.tsx ────────────────────────────────────────────────────
add(SP, "Model the multi-pillar impact of Oregon's third-generation Coordinated Care Organizations — global budgets, equity metrics, behavioral health integration, and CHW infrastructure across 16 CCOs.",
        "Model next-round (CCO 3.0) policy options for Oregon's Coordinated Care Organizations — global budgets, equity metrics, behavioral health integration, and CHW infrastructure across 15 CCOs.")

# ── OregonCCOSimulatorClient.tsx ──────────────────────────────────────────
add(S, "{ id: 'health-share', name: 'Health Share of Oregon', shortName: 'Health Share', region: 'Portland Metro', members: 410000, counties: 9,",
       "{ id: 'health-share', name: 'Health Share of Oregon', shortName: 'Health Share', region: 'Portland Metro', members: 440000, counties: 3,")
add(S, "region: 'Central Oregon', members: 95000, counties: 7,",
       "region: 'Central Oregon', members: 95000, counties: 4,")
add(S, "{ id: 'willamette', name: 'Willamette Valley Community Health', shortName: 'WVCH', region: 'Mid-Willamette', members: 115000, counties: 5,",
       "{ id: 'willamette', name: 'PacificSource Community Solutions – Marion/Polk', shortName: 'PS Marion/Polk', region: 'Marion/Polk', members: 115000, counties: 2,")
add(S, "const ccoImpactM = cco ? (netM * cco.globalBudgetM) / 3200 : 0",
       "const ccoImpactM = cco ? (netM * cco.members) / 1328786 : 0 // share of CCO enrollment (1,328,786 CCO members, OHA via Oregon Legislature, Dec 2024)")
add(S, lines(S, 120, 122),
    "            Model policy options for Oregon&apos;s next CCO contract round (CCO 3.0, still in OHA planning) — integrating physical,\n"
    "            behavioral, and oral health under global budgets with equity accountability and CHW infrastructure\n"
    "            across Oregon&apos;s 15 CCOs serving most of its 1.4M OHP members. Initiative costs, savings, timelines and the\n"
    "            per-CCO figures below are illustrative model assumptions, not OHA estimates.")
add(S, "[['16', 'CCOs'], ['1.4M', 'OHP Members'], ['$3.2B', 'Global Budget'], ['36', 'Counties']]",
       "[['15', 'CCOs'], ['1.4M', 'OHP Members'], ['$325M', '2024 Quality Pool'], ['36', 'Counties']]")
add(S, "title: 'Enhanced Equity Performance Metrics (25 new measures)'", "title: 'Enhanced Equity Performance Metrics'")
add(S, "title: 'GDP+0.5% Global Budget Growth Methodology'", "title: 'Global Budget Growth Methodology (current cap: 3.4%/member/yr)'")
add(S, "title: 'Downside Risk for Large CCOs (≥100K members)'", "title: 'Value-Based Payment Targets (CCO 2.0 goal: 70% of provider payments)'")
add(S, "title: 'Universal SDOH Screening (80% primary care target)'", "title: 'Universal SDOH Screening'")
add(S, '<p className="text-sm text-slate-500">{cco.region} · {cco.counties} {cco.counties === 1 ? \'county\' : \'counties\'} · {cco.ruralPct}% rural members</p>',
       '<p className="text-sm text-slate-500">{cco.region} · {cco.counties} {cco.counties === 1 ? \'county\' : \'counties\'} · {cco.ruralPct}% rural members</p>\n'
       '                  <p className="text-[11px] text-amber-700 mt-1">Members, budget, margin, and BH/equity scores are illustrative model inputs, not OHA-reported figures.</p>')
add(S, 'for full physical-behavioral integration by 2027.', 'for deeper physical-behavioral integration.')
