"""frontend/lib/data/rht-review/states.json — 50-state review data, CMS documents only."""
import json, re
d = json.load(open('book-audit/deep/rht/rht_states.json'))
ACTION_NAMES = {'B.2': 'Presidential Fitness Test', 'B.3': 'SNAP food-restriction waiver', 'B.4': 'Nutrition in physician CME',
                'C.3': 'Certificate of need', 'D.2': 'Licensure compacts', 'D.3': 'Scope of practice',
                'E.3': 'Short-term, limited-duration insurance', 'F.1': 'Remote care services'}
def slug(s): return s.lower().replace(' ', '-')
def parse_obligated(t, state):
    lines = [l.strip() for l in t.split('\n') if l.strip()]
    out = []; cur = None; buf = None
    skip = re.compile(r'^(State-reported data|' + re.escape(state.upper()) + r'|HAWAI|' + re.escape(state) + r' Total Budget|Total Funds Put to Work)', re.I)
    for l in lines:
        if skip.match(l): continue
        if re.match(r'^(Initiative \d+[A-Za-z]?:|Program Operations)', l):
            cur = {'heading': l, 'groups': []}; out.append(cur); buf = None; continue
        if l.startswith('No information provided'):
            out.append({'heading': l, 'groups': []}); continue
        if cur is None: continue
        if l.startswith('▪'):
            buf = l[1:].strip(); g = cur['groups'][-1] if cur['groups'] else None
            if g is None: g = {'name': None, 'items': []}; cur['groups'].append(g)
            g['items'].append(buf); continue
        if l.startswith('(') and not cur['groups']:
            cur['heading'] += ' ' + l; continue
        if re.search(r'\(\$[\d,]+(\.\d+)?\)$', l) and not l.startswith('▪'):
            cur['groups'].append({'name': l, 'items': []}); buf = None; continue
        # continuation of a wrapped line
        if cur['groups'] and cur['groups'][-1]['items']:
            cur['groups'][-1]['items'][-1] += ' ' + l
        elif cur['groups']:
            cur['groups'][-1]['name'] = (cur['groups'][-1]['name'] or '') + ' ' + l
        else:
            cur['heading'] += ' ' + l
    return out
states = []
for name, v in sorted(d.items()):
    acts = []
    for r in v['policy_actions']:
        acts.append({'code': r['code'], 'name': ACTION_NAMES.get(r['code'], r['code']), 'committed': r['state_committed'],
                     'status': r['status'], 'statusDetail': r['status_detail'] or None, 'year2FundingM': r['year2_funding_m']})
    states.append({
        'state': name, 'slug': slug(name),
        'fy2026': v['fy2026_award'], 'fy2027': v['fy2027_award'],
        'bp1AwardCmsReport': v.get('bp1_award_exact'),
        'putToWork': v.get('put_to_work_2026_07_31'),
        'policyCommitmentsTotal': v.get('policy_commitments_total'),
        'policyActions': acts,
        'obligated': parse_obligated(v.get('obligated_text', ''), name),
    })
out = {'asOf': '2026-11-20',
       'sources': {
         'fy2026': 'https://www.cms.gov/newsroom/press-releases/cms-announces-50-billion-awards-strengthen-rural-health-all-50-states',
         'fy2027': 'https://www.cms.gov/newsroom/press-releases/trump-administration-announces-10-billion-second-year-rural-health-transformation-awards-all-50',
         'factSheet': 'https://www.cms.gov/newsroom/fact-sheets/rural-health-transformation-program-year-2-awards',
         'obligated': 'https://www.medicaid.gov/resources-for-states/rural-health/rhtp-resources/RHTP-Obligated-Funds-20261014.pdf',
         'snapshot': 'https://www.medicaid.gov/resources-for-states/downloads/state-snapshot-BP2.pdf'},
       'states': states}
json.dump(out, open('frontend/lib/data/rht-review/states.json', 'w'), indent=1, ensure_ascii=False)
vt = next(s for s in states if s['state'] == 'Vermont')
print(json.dumps(vt['obligated'], indent=1)[:2500])
print(sum(s['fy2027'] for s in states), len(states))
