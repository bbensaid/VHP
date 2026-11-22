"""Texas HHSC "Rural Texas Strong" first-round grants (announced Sept 28, 2026): 68 rural hospital districts and authorities.
Names: HHSC open-records file 'RTS Contract Awards.xlsx' (linked from the governor's release; archived as tx_rts_contract_awards.xlsx).
  Governor's release: https://gov.texas.gov/news/post/governor-abbott-announces-51-million-in-funding-for-rural-healthcare ($51 million total)
Per-award amount: the HHSC file lists names only; Fox 26 Houston reports 'will each receive $750,000'
  (https://www.fox26houston.com/news/gov-greg-abbott-announces-51m-grant-program-rural-texas-health-care); 68 x $750,000 = $51,000,000 = the governor's total."""
import json, sys
sys.path.insert(0, 'book-audit/deep/rht')
from xlsx_rows import sheets

names = [r[0].strip() for r in sheets('book-audit/deep/sources/rht_recipients/tx_rts_contract_awards.xlsx')['Sheet1'] if r and r[0]]
assert len(names) == 68 and len(set(names)) == 68
rows = [{'program': 'Rural Texas Strong: prevention, wellness and nutrition (first round)', 'n': i, 'recipient': n, 'county': 'Not stated',
         'amount': 750000.0, 'purpose': ''} for i, n in enumerate(names, 1)]
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.0f}')
assert tot == 51_000_000
json.dump({'state': 'Texas', 'slug': 'texas', 'asOf': '2026-09-28',
           'source': {'label': 'Texas HHSC, "RTS Contract Awards" (first round of Rural Texas Strong awards; names) and Governor Abbott\'s Sept 28, 2026 announcement ($51 million)',
                      'url': 'https://gov.texas.gov/news/post/governor-abbott-announces-51-million-in-funding-for-rural-healthcare'},
           'announcedTotal': 51000000, 'areaLabel': None, 'rows': rows,
           'note': 'Only the first round is itemized: 68 rural hospital districts and authorities for prevention, wellness and nutrition programs. HHSC\'s published file lists the recipients\' names only. The $750,000 per award comes from Fox 26 Houston\'s report of the announcement ("will each receive $750,000"); it is consistent with the governor\'s $51 million total (68 x $750,000) but is not printed in the HHSC file. Texas has announced further rounds (workforce, equipment, infrastructure), and CMS has reported larger Texas totals, that are not itemized here.'},
          open('frontend/lib/data/rht-review/recipients/texas.json', 'w'), indent=1)
