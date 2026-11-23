"""Minnesota Department of Health, "Rural Health Transformation Program Funding" awardee sheets (9 one-page PDFs dated 09/17/2026), linked from
https://www.health.state.mn.us/facilities/ruralhealth/ruraltrans/grants.html  (files .../ruraltrans/docs/awardees/<name>.pdf; archived in mn_awardees/).
Each sheet: Organization | City | Amount | Purpose. Together they hold exactly 11 dollar amounts (this script asserts that count against the text).
These are contract/sub-recipient awards (evaluation, technical assistance, EMS pilot, workforce pathways); MDH's hospital and FQHC money
(70% / 5% of the award per its grants page, which lists 94 eligible hospitals and 5 FQHCs) is NOT itemized on these sheets."""
import json, re, pypdf

D = 'book-audit/deep/sources/rht_recipients/mn_awardees/'
text = {}
for n in ['ars', 'chwa', 'freya', 'hfmn', 'mmb', 'mnems', 'perimed', 'stratis', 'tmc']:
    text[n] = re.sub(r'\s+', ' ', '\n'.join((p.extract_text() or '') for p in pypdf.PdfReader(D + n + '.pdf').pages))
# (sheet, program, organization, city, amount string, short purpose from the sheet)
R = [('ars', 'Identifying performance measures for RHTP information technology investments', 'AscendRural/Sourcewell', 'Staples', '$25,000', 'Design and develop a performance measurement framework for Minnesota\'s health information technology investments'),
     ('chwa', 'Earn & Train Pathways', 'Minnesota Community Health Worker Alliance', 'Saint Paul', '$386,146', 'Career pathways for rural workers to become community health workers and representatives'),
     ('freya', 'Medication for Opioid Use Disorder Education Development Council', 'Freya + Co', 'Minnetonka', '$69,000', 'Design and facilitate the MOUD Education Development Council'),
     ('hfmn', 'K-12 Healthcare Career Exposure and Earn & Train Pathways', 'HealthForce MN', 'Winona', '$654,773', 'Scrubs Camps and HOSA chapters introducing rural K-12 students to health careers'),
     ('mmb', 'RHTP Evaluation', 'Minnesota Management and Budget', 'Saint Paul', '$275,945', 'Evaluation design, data collection planning and metrics support'),
     ('mnems', 'Rural Ambulance Treatment in Place', 'Minnesota Office of EMS (staff time)', 'Saint Paul', '$281,000', 'OEMS staff time for the ambulance treatment-in-place pilot'),
     ('mnems', 'Rural Ambulance Treatment in Place', 'Minnesota Office of EMS (grant funds to EMS agencies)', 'Saint Paul', '$9,218,109', 'Funds to rural ambulance services that opt into the treatment-in-place pilot'),
     ('perimed', 'Project ECHO for Maternal and Behavioral Health', 'Minnesota Perinatal Organization', 'Savage', '$165,000', 'Project ECHO series on maternal health, including maternal mental health'),
     ('perimed', 'Project ECHO for Maternal and Behavioral Health', 'Minnesota Medical Association', 'Minneapolis', '$165,007', 'Project ECHO series on mental and behavioral health'),
     ('stratis', 'Technical Assistance for Healthcare Providers on Health Information Technology', 'Stratis Health', 'Bloomington', '$883,371', 'Technical assistance for health care providers on health information technology'),
     ('tmc', 'Health Information Technology Advisory Services', 'Technology Management Corporation', 'Shorewood', '$330,100', 'Technical advisory services to MDH on sub-recipients\' health IT purchases')]
rows = []
for sheet, prog, org, city, amt, why in R:
    assert amt in text[sheet], (sheet, amt)
    assert city in text[sheet], (sheet, city)
    assert re.sub(r'\s*\(.*?\)', '', org).split()[0] in text[sheet], (sheet, org)
    rows.append({'program': prog, 'n': len(rows) + 1, 'recipient': org, 'county': city, 'amount': float(amt.replace('$', '').replace(',', '')), 'purpose': why})
foot = re.compile(r'\$[\d,]+')
found = sum(len([x for x in foot.findall(re.sub(r'financial assistance award totaling \$[\d,.]+', '', t))]) for t in text.values())
print(len(rows), 'rows; $ amounts in the nine sheets (excluding the CMS footer):', found, '; sum', f"{sum(r['amount'] for r in rows):,.0f}")
assert found == len(rows) == 11
json.dump({'state': 'Minnesota', 'slug': 'minnesota', 'asOf': '2026-09-17',
           'source': {'label': 'Minnesota Department of Health, Rural Health Transformation Program Funding awardee sheets (nine documents dated 09/17/2026)',
                      'url': 'https://www.health.state.mn.us/facilities/ruralhealth/ruraltrans/grants.html'},
           'announcedTotal': None, 'areaLabel': 'City', 'rows': rows,
           'note': 'Contract and sub-recipient awards MDH posted as nine one-page sheets: evaluation, technical assistance, an EMS treatment-in-place pilot, workforce pathways and ECHO training. The 11 amounts on the sheets are all included. This is a small part of Minnesota\'s $193 million first-year award: MDH\'s grants page allocates 70% of the award to hospitals and 5% to federally qualified health centers, and those recipients are not itemized on these sheets. The EMS office\'s $9,218,109 is grant money it passes to rural ambulance services that join the pilot.'},
          open('frontend/lib/data/rht-review/recipients/minnesota.json', 'w'), indent=1)
