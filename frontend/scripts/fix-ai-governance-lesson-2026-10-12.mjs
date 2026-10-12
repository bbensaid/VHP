// 2026-10-12: bring the Five Pillars AI-governance lesson current with Chapter 4–5 (sources read 2026-10-12):
// HTI-5 proposed rule (FR 2025-12-29); 45 CFR 92.210 + HHS Notice of Vacatur (FR 2026-06-02, vacated only
// 92.101(a)(2)(iv), 92.206(b)(1), 92.207(b)(3), 92.208); Vermont Acts 101 and 156 of 2026 (enacted texts).
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const ANCHOR = 'How the tool performs on your patients remains yours to measure.';
const P1 = "Two developments since then pull in opposite directions. ASTP/ONC's HTI-5 proposed rule, published December 29, 2025, would remove most of HTI-1's source-attribute and risk-management requirements for predictive decision support; it was not final as of October 2026. Meanwhile a different federal rule reaches the hospital directly: since May 1, 2025, the Section 1557 nondiscrimination rule (45 CFR § 92.210) has required covered health programs to make reasonable efforts to identify patient care decision support tools that use race, color, national origin, sex, age, or disability as inputs, and to mitigate the risk of discrimination from each. That provision was not among those a federal court vacated in October 2025.";
const P2 = "Vermont has begun legislating as well. Act 156 of 2026 makes it unprofessional conduct for a mental health professional to deliver therapy through AI systems alone, and Act 101 of 2026 directs the State's Artificial Intelligence Advisory Council to recommend statutory changes — including on generative AI in the regulated professions and AI in insurance utilization review — by January 15, 2027.";
const APPEND = '\n\n' + P1 + '\n\n' + P2;
const js = (s) => JSON.stringify(s).slice(1, -1);
// Sanity: insert two normal blocks after the anchor paragraph
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const id = 'academyModule-five-pillars-ai-governance-clinical-decision-support';
const doc = (await (await fetch(`${API}/query/production?query=${encodeURIComponent(`*[_id=="${id}"][0]`)}`, { headers: H })).json()).result;
if (JSON.stringify(doc.body).includes('HTI-5')) { console.log('already applied'); process.exit(0); }
fs.writeFileSync(`../sanity-backups/ai-gov-lesson-${Date.now()}.json`, JSON.stringify(doc));
const i = doc.body.findIndex(b => (b.children || []).map(c => c.text).join('').includes(ANCHOR));
if (i < 0) throw new Error('anchor block not found');
const blk = (k, t) => ({ _key: k, _type: 'block', style: 'normal', markDefs: [], children: [{ _key: k + 's', _type: 'span', marks: [], text: t }] });
const body = [...doc.body.slice(0, i + 1), blk('reg2026a', P1), blk('reg2026b', P2), ...doc.body.slice(i + 1)];
console.log('sanity', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id, set: { body } } }] }) })).status);
// Supabase content_blocks + JSON source: append to the same text block's body
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: l } = await sb.from('lessons').select('id,content_blocks').eq('slug', 'ai-governance-clinical-decision-support').single();
let t = JSON.stringify(l.content_blocks); if (t.split(js(ANCHOR)).length - 1 !== 1) throw new Error('supabase anchor');
t = t.replace(js(ANCHOR), js(ANCHOR + APPEND));
const { error } = await sb.from('lessons').update({ content_blocks: JSON.parse(t) }).eq('id', l.id); console.log('supabase', error?.message ?? 'ok');
let j = fs.readFileSync('content/course_five_pillars.json', 'utf8'); if (j.split(js(ANCHOR)).length - 1 !== 1) throw new Error('json anchor');
j = j.replace(js(ANCHOR), js(ANCHOR + APPEND)); JSON.parse(j); fs.writeFileSync('content/course_five_pillars.json', j); console.log('json ok');
fs.writeFileSync('/private/tmp/claude-502/-Users-baba-Vermont-Health-Platform/3d6dba97-d471-4487-bac8-fe21aedf8473/scratchpad/aig_paras.json', JSON.stringify([P1, P2]));
