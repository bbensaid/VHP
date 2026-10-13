// 2026-10-12: Chapter 16 primary-source pass, carried into the Academy.
// Act 68 as enacted: global budgets for "one or more" non-CAH hospitals beginning no later than HFY2028 and all
// hospitals by HFY2030, both "to the extent that resources are available". The HSA Coordinator model and AHS
// restructuring are proposals (Oliver Wyman; the book's Ch16), not enacted institutions — AHS's Act 119 review
// (Feb 2026) kept the agency unified. Oliver Wyman's at-risk list is Grace Cottage, Gifford, North Country,
// Springfield; NVRH holds four recommended COEs. CAHs have 25 or fewer beds.
// Findings: book-audit/ch16_findings_2026-10-12.md
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const DRY = process.argv.includes('--dry');
const R = [
  ["global budgets for non-critical-access hospitals by FY2028 and all hospitals by 2030",
   "global budgets for one or more non-critical-access hospitals by FY2028 and all hospitals by 2030, resources permitting"],
  ["requires global hospital budgets for non-critical-access hospitals by FY2028 and for all Vermont hospitals by 2030",
   "requires global hospital budgets for one or more non-critical-access hospitals by FY2028 and for all Vermont hospitals by 2030, to the extent resources are available"],
  ["global budgets for non-CAH hospitals by FY2028, all hospitals by 2030",
   "global budgets for one or more non-CAH hospitals by FY2028, all hospitals by 2030 (resources permitting)"],
  ["requiring non-CAH hospital global budgets by FY2028 and all Vermont hospitals by FY2030",
   "requiring global budgets for one or more non-CAH hospitals by FY2028 and all Vermont hospitals by FY2030, resources permitting"],
  ["the same year non-CAH global budgets are due", "the same year the first non-CAH global budgets are due"],
  ["and hospital global budgets mandatory beginning FY2028.",
   "and hospital global budgets mandatory beginning FY2028 for one or more non-CAH hospitals (all hospitals by FY2030, resources permitting)."],
  ["and hospital global budgets from FY2028. Clinical", "and hospital global budgets beginning FY2028 (all hospitals by FY2030). Clinical"],
  ["RHRC technical assistance, the HSA Coordinator model, and EMS regionalization",
   "RHRC technical assistance, the proposed HSA Coordinator model, and EMS regionalization"],
  ["the Health Care Delivery Advisory Committee, expanded GMCB authority, the AHS HSA-coordinator model --",
   "the Health Care Delivery Advisory Committee, the Steering Committee for Comprehensive Primary Health Care, expanded GMCB authority --"],
  ["the AHS restructuring removes the program-silo obstacle directly",
   "the AHS restructuring proposed in the book's Chapter 16 would remove the program-silo obstacle directly"],
  ["North Country Hospital in Newport and Northeastern Vermont Regional Hospital in St. Johnsbury are among the state's most financially distressed facilities, and both are candidates for Tier 3 designation under the Oliver Wyman regionalization blueprint — meaning they may not be able to sustain full inpatient operations long term.",
   "North Country Hospital in Newport is one of the four hospitals Oliver Wyman judged at risk of being unable to sustain inpatient operations long term; Northeastern Vermont Regional Hospital in St. Johnsbury, its regionalization partner, holds four recommended Centers of Excellence — so the region's access depends on how the two divide the work."],
  ["19-bed critical access hospitals in the Northeast Kingdom", "critical access hospitals of 25 beds or fewer in the Northeast Kingdom"],
];
const js = (s) => JSON.stringify(s).slice(1, -1);
const hits = new Map(R.map(([o]) => [o, 0]));
const fix = (t) => { let n = 0; for (const [o, w] of R) { const c = t.split(js(o)).length - 1; if (c) { t = t.split(js(o)).join(js(w)); n += c; hits.set(o, hits.get(o) + c); } } return [t, n]; };

const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const docs = (await (await fetch(`${API}/query/production?query=${encodeURIComponent('*[_type=="academyModule" && !(_id in path("drafts.**"))]{_id, body}')}`, { headers: H })).json()).result;
for (const doc of docs) {
  const [t, n] = fix(JSON.stringify(doc.body ?? null));
  if (!n) continue;
  console.log('sanity', doc._id, n);
  if (DRY) continue;
  fs.writeFileSync(`../sanity-backups/ch16-${doc._id}-${Date.now()}.json`, JSON.stringify(doc));
  console.log('  ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id: doc._id, set: { body: JSON.parse(t) } } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: ls } = await sb.from('lessons').select('id,slug,content_blocks');
for (const l of ls) {
  const [t, n] = fix(JSON.stringify(l.content_blocks ?? null));
  if (!n) continue;
  console.log('supabase', l.slug, n);
  if (DRY) continue;
  const { error } = await sb.from('lessons').update({ content_blocks: JSON.parse(t) }).eq('id', l.id);
  console.log('  ->', error?.message ?? 'ok');
}
for (const f of fs.readdirSync('content').filter((x) => /\.(json|py)$/.test(x)).map((x) => 'content/' + x)) {
  const src = fs.readFileSync(f, 'utf8');
  let out = src, n = 0;
  for (const [o, w] of R) { for (const [a, b] of [[o, w], [js(o), js(w)]]) { const c = out.split(a).length - 1; if (c) { out = out.split(a).join(b); n += c; } } }
  if (!n) continue;
  console.log('file', f, n);
  if (DRY) continue;
  if (f.endsWith('.json')) JSON.parse(out);
  fs.writeFileSync(f, out);
}
for (const [o, c] of hits) if (!c) console.log('NO SANITY/SUPABASE HIT:', o.slice(0, 80));
