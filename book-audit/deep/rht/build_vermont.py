"""Build frontend/lib/data/rht-review/vermont-year1.json from the state's own documents.
Inputs (book-audit/deep/sources/rht_vt): year1_agreements.json (state list, Oct 30 2026 update),
jfo_budget_narrative_2026-01-30.txt (Jan 30 budget), jfc_update_2026-07-29.txt (July status),
plus ../rht/rht_states.json (CMS). Every number in the output comes from those files."""
import json, re
from collections import defaultdict
S = 'book-audit/deep/sources/rht_vt/'
rows = [r for r in json.load(open(S + 'year1_agreements.json')) if r['amount_num'] and not r['initiative'].startswith('*')]
# The state's table leaves the first initiative heading blank; the state's Activity Details
# (July 17, 2026) assigns every one of those activities to Regionalization.
for r in rows:
    if not r['initiative']:
        r['initiative'] = 'Regionalization and Innovative Care Strategies'
    if r['initiative'] == 'Shared Services':
        r['initiative'] = 'Establishing a Clinically Integrated Network of Shared Services'
    if r['initiative'] == 'Primary Care':
        r['initiative'] = 'Strengthening Primary Care'
    if r['initiative'] == 'Workforce Development':
        r['initiative'] = 'Health Care Workforce Development'
    if r['initiative'].startswith('Price Transparency'):
        r['initiative'] = 'Price Transparency and Insurance Competition'
total = round(sum(r['amount_num'] for r in rows), 2)
assert abs(total - 182154948.14) < 0.01, total

# Jan 30 2026 budget narrative: activity -> planned amount (verbatim lines 324-370)
plan_txt = open(S + 'jfo_budget_narrative_2026-01-30.txt').read()
plan = {}
for m in re.finditer(r'#(\d+) (.+?) (Regionalization|Shared Services|Primary Care|Workforce Development|Price Transparency and Insurance Competition|Evaluator) \$([\d,]+)[ .](\d\d)', plan_txt):
    plan[m.group(2).strip()] = float(m.group(4).replace(',', '') + '.' + m.group(5))
# Agreement activity name -> Jan budget activity name (same activity, different wording)
MAP = {
 'Independent evaluator': ['Independent evaluator'],
 'Green Mountain Care Board health care data platform modernization and transparency initiative': ['Statewide health care data platform modernization and transparency project'],
 'Statewide assessment of options to improve health coverage affordability': ['Statewide assessment of options to improve health coverage affordability'],
 'Transformation analytics and support': ['Transformation analytics and support'],
 'Mental Health (MH) and Substance Use Disorder (SUD) urgent care expansion': ['Mental health and substance use urgent care expansion'],
 'Development of a statewide health care delivery strategic plan': ['Development of a statewide health care delivery strategic plan'],
 'Community paramedicine/Mobile Integrated Health model': ['Community paramedicine/Mobile Integrated Health model'],
 'Facility upgrades to support regionalization': ['Facility upgrades to support regionalization'],
 'Transformation, innovation, and regionalization support grants': ['Transformation, innovation, and regionalization support grants'],
 'Mobile units offering medical, dental and integrated Mental Health (MH) and Substance Use Disorder (SUD) services': ['Medical mobile units', 'Dental mobile units'],
 'Incentivizing adoption of a shared Electronic Health Record (EHR)/Electronic Medical Record (EMR) platform': ['Adoption of a shared Electronic Medical Record (EMR) platform'],
 'Grants to providers to adopt Remote Patient Monitoring (RPM) equipment': ['Grants to providers to adopt remote patient monitoring (RPM)'],
 'Grant funds to providers to adopt telehealth technology': ['Grant to providers to adopt telehealth technology'],
 'Grants to providers to adopt Artificial Intelligence (AI) transcription/scribe technology': ['Grants to providers to adopt AI transcription/scribe technology'],
 'Support a statewide closed-loop referral system': ['Statewide closed loop referral system'],
 'Creating a centralized tool to guide interfacility transfers': ['Centralized tool to guide interfacility transfers'],
 'e-Consult expansion and workforce capacity building/VTCPAP': ['Statewide e-consult expansion and workforce capacity building'],
 'Workforce support and system integration development': ['Workforce support and system integration development'],
 'Enhancing Blueprint Transformation Network Capacity': ['Blueprint transformation network capacity'],
 'Providing enhanced capacity for team-based care': ['Enhanced capacity for team-based care'],
 'Mental Health and community support integration into primary care teams': ['Mental health (MH) and community support integration into primary care teams'],
 'Enhancing primary care-focused data and analytics infrastructure': ['Primary care-focused data and analytics infrastructure'],
 'Expanding access to Federally Qualified Health Center (FQHC) primary care services': ['Expand access to Federally Qualified Health Center (FQHC) primary care services'],
 'Expanding access to recovery housing for individuals with Substance Use Disorder (SUD) services': ['Recovery housing for individuals with SUD needs'],
 'Expand access to Licensed Nursing Assistant (LNA) training programs': ['Licensed Nursing Assistant training programs'],
 'Workforce development tuition assistance program': ['Health care workforce development tuition assistance program'],
 'Establish the Maple Mountain Consortium Family Medicine Residency Program': ['Maple Mountain Rural Residency Program'],
 'Expand pharmacists’ scope to include test-to-treat in more scenarios': ['Expand pharmacists’ scope to include test-to-treat in more scenarios'],
 'Health care workforce conditional financial assistance program': ['Health care workforce conditional financial assistance program'],
 'Health care professions mentorship program': ['Health care professions residency program'],
 'Admin costs': [],
 'Improve availability and access to high-acuity services for nursing home residents including dialysis services and ventilators': ['__nursing__'],
}
# The narrative's line 7 wraps: "Improve availability ... ventilators" is split over two lines -> $1,450,000 (line 332)
plan['__nursing__'] = 1450000.00
plan['Maple Mountain Rural Residency Program'] = 985000.00  # printed "$985,000 00" (missing point)
missing = [p for v in MAP.values() for p in v if p not in plan]
assert not missing, missing

acts = defaultdict(lambda: {'amount': 0.0, 'n': 0, 'initiative': None, 'recipients': []})
for r in rows:
    a = acts[r['activity']]; a['amount'] += r['amount_num']; a['n'] += 1; a['initiative'] = r['initiative']
    nm = r['legal_name'].rstrip('* ').strip()
    a['recipients'].append({'name': nm, 'dba': r['dba'] or None, 'amount': r['amount_num'], 'outOfStatePartner': r['legal_name'].strip().endswith('*')})
activities = []
for name, a in acts.items():
    assert name in MAP, name
    planned = sum(plan[p] for p in MAP[name]) if MAP[name] else None
    activities.append({'activity': name, 'initiative': a['initiative'], 'agreements': a['n'],
                       'signed': round(a['amount'], 2), 'planned_jan2026': planned,
                       'planned_label': [('Improve availability and access to high-acuity services for nursing home residents' if x == '__nursing__' else x) for x in MAP[name]],
                       'recipients': sorted(a['recipients'], key=lambda x: -x['amount'])})
activities.sort(key=lambda x: -x['signed'])
used = {p for v in MAP.values() for p in v}
unmatched_plan = [{'activity': k, 'planned_jan2026': v} for k, v in plan.items() if k not in used and not k.startswith('__')]

inits = defaultdict(lambda: [0.0, 0])
for r in rows: inits[r['initiative']][0] += r['amount_num']; inits[r['initiative']][1] += 1
recip = defaultdict(lambda: [0.0, 0])
for r in rows:
    nm = r['legal_name'].rstrip('* ').strip(); recip[nm][0] += r['amount_num']; recip[nm][1] += 1

cms = json.load(open('book-audit/deep/rht/rht_states.json'))['Vermont']
out = {
 'asOf': '2026-11-20',
 'award': {'fy2026': 195053740.44, 'fy2027': 189996036, 'fy2027_state_release': 189996036.02},
 'agreements': {'count': len(rows), 'total': total, 'listUpdate': '2026-10-30',
                'outOfStateNote': 'Marked with an asterisk on the state list: RHT funding is specific to services and activities benefiting Vermont patients and, in some cases, includes partnerships with Vermont-based health care providers or other organizations.',
                'note': 'Executed grant and contract agreements only; excludes provider payment methodologies, program administrative costs and a small number of obligated but not yet executed agreements (State of Vermont).'},
 'byInitiative': sorted([{'initiative': k, 'signed': round(v[0], 2), 'agreements': v[1]} for k, v in inits.items()], key=lambda x: -x['signed']),
 'activities': activities,
 'plannedWithoutAgreement': unmatched_plan,
 'topRecipients': sorted([{'name': k, 'signed': round(v[0], 2), 'agreements': v[1]} for k, v in recip.items()], key=lambda x: -x['signed'])[:15],
 'cms': {'putToWork_2026_07_31': cms['put_to_work_2026_07_31'], 'policyActions': cms['policy_actions'], 'bp1_m': cms['bp1_m'], 'bp2_m': cms['bp2_m']},
 'julyStatus': {'closed': 176890170.4, 'obligated': 15347078.0, 'posted': 2900000.0, 'positionsFilled': 18, 'positionsRecruiting': 5},
}
json.dump(out, open('frontend/lib/data/rht-review/vermont-year1.json', 'w'), indent=1, ensure_ascii=False)
print('agreements', len(rows), total)
for i in out['byInitiative']: print(f"{i['signed']:>15,.2f} {i['agreements']:>4} {i['initiative']}")
print('planned, no agreement:', unmatched_plan)
for a in activities: print(f"{a['signed']:>14,.2f} plan {a['planned_jan2026'] or 0:>14,.2f}  {a['activity'][:70]}")
print([ (t['name'],t['signed']) for t in out['topRecipients']])
