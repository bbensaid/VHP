"""Ohio: Governor DeWine / ODH releases naming Rural Health Transformation awardees (archived, scripts removed, in book-audit/deep/sources/rht_recipients/):
  oh_92m_release.html  Oct 16, 2026 "$92 Million to Expand Access to Quality Healthcare in Rural Ohio": 22 rural hospitals at $1,377,479 each; 7 Clinically Integrated
                       Network / Innovation Hub awardees and 6 maternal-care awardees with amounts
  oh_ou_release.html   July 2026 first award: Ohio University, $10,000,000 (workforce)
  oh_pharmacy_release.html  Aug 2026: Ohio Pharmacists Association $2 million and State Board of Pharmacy $1.15 million ($3.15M)
Check: hospitals 22 x $1,377,479 = $30.3M as the release states; the CIN and maternal awardee amounts do NOT add to the release's headline buckets ($31.4M / $30.3M) —
the release footnote says Ohio was awarded $92M in each of FY2026 and FY2027 for the CIN initiative and the announcement includes a portion of FY2027 — so the mismatch is reported, not 'fixed'."""
import html as _h
import json, re

A = 'book-audit/deep/sources/rht_recipients/'
def lines(f):
    s = open(A + f, encoding='utf-8', errors='ignore').read()
    s = re.sub(r'(?is)<(script|style|nav|header|footer)[^>]*>.*?</\1>', '', s)
    t = re.sub(r'<[^>]+>', '', _h.unescape(re.sub(r'(?i)<br\s*/?>|</p>|</li>|</tr>|</td>|</h\d>|</div>', '\n', s)))
    return [re.sub(r'\s+', ' ', l).strip() for l in t.split('\n') if l.strip() and not l.startswith('Components')]

L = lines('oh_92m_release.html')
def block(start, end):
    i = next(k for k, l in enumerate(L) if l == start)
    out = []
    for l in L[i + 1:]:
        if l.startswith(end): break
        out.append(l)
    return out
rows = []
add = lambda prog, name, amt, purpose='': rows.append({'program': prog, 'n': len(rows) + 1, 'recipient': name, 'county': 'Not stated', 'amount': float(amt), 'purpose': purpose})
hosp = block('Hospitals receiving awards include:', 'Clinically Integrated Networks (CIN) and Rural Health Innovation Hubs')
assert len(hosp) == 22, len(hosp)
for h in hosp:
    add('Rural hospital one-time quality-improvement investments (Oct 2026)', re.sub(r'\s+in\s+[A-Z].*$', '', h).strip() if ' in ' in h else h, 1377479, h)
mon = re.compile(r'^(.+?) - \$([\d,]+)$')
sec = [('Clinically Integrated Networks and Rural Health Innovation Hubs (Oct 2026)', 'Awardees include:', 'Maternal Care', 7),
       ('Maternal care (Oct 2026)', 'Awardees include:', 'Governor DeWine announced in December 2025', 6)]
idx = [k for k, l in enumerate(L) if l == 'Awardees include:']
assert len(idx) == 2
for (prog, _, __, n), k in zip(sec, idx):
    got = 0
    for l in L[k + 1:]:
        m = mon.match(l.replace('’', "'"))
        if not m: break
        add(prog, m.group(1).replace(' / ', '/').strip(), m.group(2).replace(',', ''))
        got += 1
    assert got == n, (prog, got)
txt_ou = ' '.join(lines('oh_ou_release.html'))
assert re.search(r'award to Ohio University', txt_ou) and '$10,000,000' in txt_ou
add('Rural health workforce (July 2026)', 'Ohio University', 10_000_000)
txt_ph = ' '.join(lines('oh_pharmacy_release.html'))
m1 = re.search(r'Ohio Pharmacists Association \(OPA\) has been awarded \$([\d.]+) million', txt_ph)
m2 = re.search(r'Board of Pharmacy will use \$([\d.]+) million', txt_ph)
assert m1 and m2, (m1, m2)
add('Pharmacy connectivity (Aug 2026)', 'Ohio Pharmacists Association', float(m1.group(1)) * 1e6)
add('Pharmacy connectivity (Aug 2026)', 'State of Ohio Board of Pharmacy', float(m2.group(1)) * 1e6)
cin = sum(r['amount'] for r in rows if r['program'].startswith('Clinically')); mat = sum(r['amount'] for r in rows if r['program'].startswith('Maternal'))
print(len(rows), 'rows; sum', f"{sum(r['amount'] for r in rows):,.0f}", '| CIN', f'{cin:,.0f}', '| maternal', f'{mat:,.0f}', '| hospitals', f"{22*1377479:,}")
json.dump({'state': 'Ohio', 'slug': 'ohio', 'asOf': '2026-10-16',
           'source': {'label': 'Office of Gov. Mike DeWine / Ohio Department of Health, RHT award releases (Oct 16, 2026 $92 million; Ohio University $10 million; pharmacy initiative $3.15 million)',
                      'url': 'https://governor.ohio.gov/wps/portal/gov/governor/media/news-and-media/governor-dewine-announces-92-million-to-expand-access-to-quality-healthcare-in-rural-ohio'},
           'announcedTotal': None, 'areaLabel': None, 'multiYear': True, 'rows': rows,
           'note': f'Awards named in three governor releases (the October release for 22 hospitals, 7 clinically integrated network and innovation-hub awardees and 6 maternal-care awardees; Ohio University; the pharmacy initiative). Amounts are as printed. They do not add up to the October release\'s headline buckets ($31.4 million for networks and hubs, $30.3 million for maternal care): the listed network and hub awards total ${cin:,.0f} and maternal awards ${mat:,.0f}. The release explains that Ohio was awarded $92 million in each of FY2026 and FY2027 for the network and hub initiative and that the announcement includes all of the FY2026 funding and a portion of FY2027, so these amounts span two budget years and the share of the Year 1 award is not computed. The 22 hospitals each received $1,377,479 (the release states the per-hospital amount).'},
          open('frontend/lib/data/rht-review/recipients/ohio.json', 'w'), indent=1)
