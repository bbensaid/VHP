"""Tag each state's CMS RHT project abstract (Dec 2025) with planned themes, keeping the matching sentence as
evidence so every tag can be checked by a reader. Also extracts the abstract's "Total Budget Request".

Source: book-audit/deep/content/rht_abstract_sections.json (CMS RHT state abstracts, Dec 2025;
        book-audit/deep/sources/cms_rht_state_abstracts_2025-12.txt)
Writes: frontend/lib/data/rht-review/themes.json
Run from repo root:  python3 book-audit/deep/rht/extract_themes.py
"""
import json, re

ABS = json.load(open('book-audit/deep/content/rht_abstract_sections.json'))
OUT = 'frontend/lib/data/rht-review/themes.json'

THEMES = [
    ('telehealth', 'Telehealth & remote monitoring', r'\btele(?:health|medicine|psychiatry|-?ICU|consult)|remote (?:patient )?monitoring|\bRPM\b|virtual care'),
    ('data', 'Shared IT, EHR & data', r'\bEHR\b|electronic health record|health information exchange|\bHIE\b|interoperab|cybersecurity|data infrastructure|data (?:and|&) analytics'),
    ('ai', 'Artificial intelligence', r'artificial intelligence|(?-i:\bAI\b)|ambient (?:clinical|listening|documentation)|AI-enabled'),
    ('workforce', 'Workforce pipeline & training', r'graduate medical education|\bGME\b|residenc(?:y|ies)|workforce pipeline|loan repayment|scholarship|apprenticeship|clinical training'),
    ('chw', 'Community health workers & paramedicine', r'community health worker|\bCHWs?\b|community paramedic|promotor'),
    ('bh', 'Behavioral health & substance use', r'behavioral health|mental health|substance use|\bSUD\b|\bCCBHC|opioid|crisis (?:stabiliz|response|line|center|care|services)'),
    ('maternal', 'Maternal & obstetric care', r'maternal|obstetric|\bOB\b|prenatal|perinatal|labor and delivery|pregnan'),
    ('ems', 'EMS & mobile care', r'\bEMS\b|emergency medical services|mobile (?:health|clinic|unit|crisis|integrated)|ambulance'),
    ('chronic', 'Chronic disease & nutrition', r'chronic (?:disease|condition)|diabetes|hypertension|obesity|nutrition|food is medicine|\bMAHA\b|make america healthy'),
    ('hubs', 'Regional hubs, networks & shared services', r'regional (?:hub|network|partnership|collaborative|coordinating)|hub-and-spoke|\bhubs?\b|shared[- ]service|clinically integrated network|regionaliz'),
    ('payment', 'Value-based payment & global budgets', r'value-based|global budget|alternative payment|\bAPMs?\b|capitation|pay for value|payment model|accountable care'),
    ('hospital', 'Hospital transformation & right-sizing', r'rural emergency hospital|\bREH\b|right-siz|service line|hospital transformation|transform(?:ing)? (?:rural )?hospitals|repurpos'),
    ('primary', 'Primary care', r'primary care'),
    ('broadband', 'Broadband & connectivity', r'broadband|connectivity'),
]

def sentences(t):
    t = re.sub(r'\s+', ' ', t)
    return [s.strip() for s in re.split(r'(?<=[.;])\s+|\s•\s|\s▪\s', t) if len(s.strip()) > 20]

out = {}
for state, text in ABS.items():
    sents = sentences(text)
    tags = {}
    for key, label, pat in THEMES:
        rx = re.compile(pat, re.I)
        flat = re.sub(r'\s+', ' ', text)
        m0 = rx.search(flat)
        if m0:
            a, b = max(0, m0.start() - 110), min(len(flat), m0.end() + 110)
            a = flat.rfind(' ', 0, a) + 1 if a > 0 else 0
            b = flat.find(' ', b) if flat.find(' ', b) != -1 else len(flat)
            tags[key] = {'match': m0.group(0), 'evidence': ('…' if a > 0 else '') + flat[a:b].strip() + ('…' if b < len(flat) else '')}
    out[state] = {'themes': tags}

json.dump({'source': 'CMS, Rural Health Transformation Program state project abstracts (Dec 2025)',
           'themes': [{'key': k, 'label': l} for k, l, _ in THEMES], 'states': out}, open(OUT, 'w'), indent=1)
from collections import Counter
c = Counter(k for v in out.values() for k in v['themes'])
print(len(out), 'states'); print({l: c[k] for k, l, _ in THEMES})
# Budget requests are not extracted: abstracts state them inconsistently (per year vs. five-year, often absent).
