// 2026-10-12: carry the Chapter 4–5 corrections into the Five Pillars Technology-track lessons.
// Sources: AHS Act 68 §10 report (Jan 15 2026) — MDWAS live early Jan 2026, chart-abstraction language;
// 2026 Health IT-Fund Report — 18 V.S.A. § 9352; GMCB-approved UVMHN Epic project. $14M figure: no source found.
// Usage: node scripts/fix-ch04-05-academy-2026-10-12.mjs [--apply]
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const APPLY = process.argv.includes('--apply');
const R = [
  ["VITL, the nonprofit designated by Act 61 of 2009 as the exclusive operator",
   "VITL, the nonprofit that Vermont statute (18 V.S.A. § 9352) designates as the exclusive operator"],
  [" Absent clinical linkage they can only be produced by paying staff to read charts by hand, a burden Vermont's own program materials put at over $14 million annually statewide.",
   " Absent clinical linkage, AHS told the Legislature in January 2026, provider groups and payers \"must resort to manual chart abstraction\" — paying staff to read charts by hand."],
  ["Vermont routes integration primarily through the Medicaid Data Warehouse and Analytics Solution, live since November 2024, rather than through VHCURES. MDWAS refreshes weekly and carries an opt-out consent model compliant with Act 53. VHCURES does not. For research, the lag is tolerable; for management, a weekly refresh on one payer beat an annual refresh on all of them.",
   "Vermont routes integration primarily through the Medicaid Data Warehouse and Analytics Solution, which went live in early January 2026, rather than through VHCURES. MDWAS links Medicaid members' clinical data from the exchange with Medicaid claims inside the State's own system; VHCURES runs on a reporting lag of a year or more. For research, the lag is tolerable; for management, a timely feed on one payer beats a lagging feed on all of them."],
  ["VHCURES: 9-12 month reporting lag → MDWAS: weekly refresh",
   "VHCURES: reporting lag of a year or more → MDWAS: linked Medicaid claims and clinical data in the State's own system"],
  ["Vermont's 14 hospitals run four different EHR platforms — Epic, Oracle Health, TruBridge and Meditech — before accounting for",
   "Vermont's 14 hospitals do not share an EHR — UVM Health Network's hospitals run Epic, the independent hospitals a mix of other vendors' systems — before accounting for"],
  ["MDWAS refreshes weekly with an Act 53-compliant opt-out model but covers Medicaid only; VHCURES covers all payers but lags 9-12 months.",
   "MDWAS links Medicaid claims with exchange clinical data in the State's own system but covers Medicaid only; VHCURES covers all payers but runs on a reporting lag of a year or more."],
];
const js = (s) => JSON.stringify(s).slice(1, -1);
function applyAll(text, label, encode = js) {
  let t = text, n = 0;
  for (const [o, nw] of R) { const c = t.split(encode(o)).length - 1; if (c) { t = t.split(encode(o)).join(encode(nw)); n += c; console.log(`  ${label}: ${c}× ${o.slice(0, 50)}`); } }
  return [t, n];
}
const stamp = Date.now();
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
for (const id of ['academyModule-five-pillars-data-infrastructure-as-the-gate', 'academyModule-five-pillars-fhir-interoperability-compliance-path']) {
  const doc = (await (await fetch(`${API}/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]`)}`, { headers: H })).json()).result;
  fs.writeFileSync(`../sanity-backups/ch04-05-academy-${id}-${stamp}.json`, JSON.stringify(doc));
  const [t, n] = applyAll(JSON.stringify(doc.body), 'sanity ' + id.slice(25));
  if (APPLY && n) console.log('   ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id, set: { body: JSON.parse(t) } } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const slug of ['data-infrastructure-as-the-gate', 'fhir-interoperability-compliance-path']) {
  const { data: l } = await sb.from('lessons').select('id,content_blocks').eq('slug', slug).single();
  fs.writeFileSync(`../sanity-backups/ch04-05-academy-supabase-${slug}-${stamp}.json`, JSON.stringify(l));
  const [t, n] = applyAll(JSON.stringify(l.content_blocks), 'supabase ' + slug);
  if (APPLY && n) { const { error } = await sb.from('lessons').update({ content_blocks: JSON.parse(t) }).eq('id', l.id); console.log('   ->', error?.message ?? 'ok'); }
}
const { data: q } = await sb.from('quiz_questions').select('id,explanation').eq('id', 'ce387236-25d4-40a5-a862-f221733fcdd0').single();
const [qe, qn] = applyAll(q.explanation, 'quiz', (s) => s);
if (APPLY && qn) { const { error } = await sb.from('quiz_questions').update({ explanation: qe }).eq('id', q.id); console.log('   ->', error?.message ?? 'ok'); }
for (const f of ['content/course_five_pillars.json']) {
  const s = fs.readFileSync(f, 'utf8'); const [t, n] = applyAll(s, f);
  if (APPLY && n) { JSON.parse(t); fs.writeFileSync(f, t); }
}
