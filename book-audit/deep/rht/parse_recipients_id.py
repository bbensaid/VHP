"""Idaho DHW "list of awardees as of Oct. 16" (xlsx linked from https://healthandwelfare.idaho.gov/providers/rural-health-transformation-program-grant/funding-opportunities-rural-health
and from Gov. Little's release "announces awardees of Year 1 Rural Health Transformation Program funds").
File: https://publicdocuments.dhw.idaho.gov/WebLink/ElectronicFile.aspx?docid=37915&dbid=0&repo=PUBLIC-DOCUMENTS (archived: id_awardees_oct16.xlsx)
Columns: Type | Solicitation Name | Sub Recipient / Contractor / MOA_MOU Holder | Amount. The sheet prints no total; every data row is kept."""
import json, sys
sys.path.insert(0, 'book-audit/deep/rht')
from xlsx_rows import sheets

rows = []
for r in sheets('book-audit/deep/sources/rht_recipients/id_awardees_oct16.xlsx')['Sheet1'][1:]:
    if not r or len(r) < 4 or not isinstance(r[3], float):
        continue
    typ = (r[0] or '').replace('MOA/ MOU', 'Memorandum of agreement').strip()
    rows.append({'program': r[1].strip(), 'n': len(rows) + 1, 'recipient': ' '.join((r[2] or '').split()), 'county': 'Not stated',
                 'amount': round(r[3], 2), 'purpose': typ})
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}')
assert len(rows) == 114
json.dump({'state': 'Idaho', 'slug': 'idaho', 'asOf': '2026-10-16',
           'source': {'label': 'Idaho Department of Health and Welfare, Rural Health Transformation list of awardees as of Oct. 16, 2026 (spreadsheet)',
                      'url': 'https://healthandwelfare.idaho.gov/providers/rural-health-transformation-program-grant/funding-opportunities-rural-health'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'The state\'s list as of October 16, 2026: 100 subrecipients, 12 contractors and 2 memoranda of agreement, by solicitation (the type is shown in the purpose column). The sheet prints no total. Gov. Little announced that Idaho had completed awards of $186 million in Year 1 funding; the listed amounts add up to the figure shown above, and the state does not say what accounts for the difference.'},
          open('frontend/lib/data/rht-review/recipients/idaho.json', 'w'), indent=1)
