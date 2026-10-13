// 2026-10-12: VHCURES lag stated as GMCB describes it (quarterly collection, ~6-month claims run-out);
// the "two-year" figure is the age of published measures (AHS Nov 2025 report), not VHCURES itself.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const R = [
  ["a two-year data lag limits how quickly a widening gap can be caught.", "published measures running about two years behind limit how quickly a widening gap can be caught."],
  ["Second, latency. A 12-to-18-month lag is serviceable for retrospective research", "Second, latency. VHCURES is collected quarterly, and analysts allow about six months for late claims to arrive — serviceable for retrospective research"],
];
const js = (s) => JSON.stringify(s).slice(1, -1);
const fix = (t, label) => { let n = 0; for (const [o, w] of R) { const c = t.split(js(o)).length - 1; if (c) { t = t.split(js(o)).join(js(w)); n += c; } } console.log(label, n); return [t, n]; };
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
for (const id of ['academyModule-five-pillars-capstone-apply-the-framework', 'academyModule-five-pillars-data-infrastructure-as-the-gate']) {
  const doc = (await (await fetch(`${API}/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]`)}`, { headers: H })).json()).result;
  fs.writeFileSync(`../sanity-backups/lag-${id}-${Date.now()}.json`, JSON.stringify(doc));
  const [t, n] = fix(JSON.stringify(doc.body), 'sanity ' + id.slice(26));
  if (n) console.log('  ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id, set: { body: JSON.parse(t) } } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const slug of ['capstone-apply-the-framework', 'data-infrastructure-as-the-gate']) {
  const { data: l } = await sb.from('lessons').select('id,content_blocks').eq('slug', slug).single();
  const [t, n] = fix(JSON.stringify(l.content_blocks), 'supabase ' + slug);
  if (n) { const { error } = await sb.from('lessons').update({ content_blocks: JSON.parse(t) }).eq('id', l.id); console.log('  ->', error?.message ?? 'ok'); }
}
const f = 'content/course_five_pillars.json'; const [j, jn] = fix(fs.readFileSync(f, 'utf8'), 'json'); if (jn) { JSON.parse(j); fs.writeFileSync(f, j); }
