"""Regenerate frontend/lib/data/rht-review/recipient-coverage.json from recipient_search_ledger.json + recipients/*.json,
and set the row count the e2e test expects. Run from the project root after adding/changing a state:  python3 book-audit/deep/rht/regen_coverage.py"""
import datetime, glob, json, os, re

d = json.load(open('book-audit/deep/rht/recipient_search_ledger.json'))
names = {k: v for k, v in d.items() if not k.startswith('_')}
slug = lambda s: s.lower().replace(' ', '-')
parsed = sorted(os.path.basename(f)[:-5] for f in glob.glob('frontend/lib/data/rht-review/recipients/*.json'))
for k, v in names.items():  # keep the ledger honest: a state with a file is 'parsed'
    if slug(k) in parsed and v['status'] != 'parsed':
        v['status'] = 'parsed'
json.dump(d, open('book-audit/deep/rht/recipient_search_ledger.json', 'w'), indent=1)
cov = {'itemized': sorted(k for k in names if slug(k) in parsed or k == 'Vermont'),
       'namesWithoutAmounts': sorted(k for k, v in names.items() if v['status'] in ('no_per_award_amounts', 'region_level_only')),
       'partial': sorted(k for k, v in names.items() if v['status'] == 'partial'),
       'noneFound': sorted(k for k, v in names.items() if v['status'] == 'none_found'),
       'blocked': sorted(k for k, v in names.items() if v['status'] == 'blocked'),
       'toParse': sorted(k for k, v in names.items() if v['status'] == 'list_found_to_parse' and slug(k) not in parsed),
       'searchedOn': datetime.date.today().isoformat()}
json.dump(cov, open('frontend/lib/data/rht-review/recipient-coverage.json', 'w'), indent=1)
e = 'frontend/e2e/rht-review.spec.ts'
s = open(e).read()
s = re.sub(r'await expect\(nat\)\.toHaveCount\(\d+\);', f'await expect(nat).toHaveCount({len(parsed)});', s)
open(e, 'w').write(s)
print({k: (len(v) if isinstance(v, list) else v) for k, v in cov.items()}, 'e2e rows', len(parsed))
