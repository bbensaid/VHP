// 2026-10-12: Chapter 15 Academy corrections (see book-audit/fix_ch15_2026-10-12*.py).
// Usage: node scripts/fix-ch15-academy-2026-10-12.mjs [--apply]
// Without --apply: backs up both Sanity docs and reports match counts only.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('=')).map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const PID = env.NEXT_PUBLIC_SANITY_PROJECT_ID, DS = env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN = env.SANITY_API_TOKEN;
const API = `https://${PID}.api.sanity.io/v2023-10-01/data`;
const APPLY = process.argv.includes('--apply');

const FIXES = {
  'transformation-as-portfolio-management': [
    ['the Economics components -- RBP implementation, global-budget design, EAST Fund deployment -- cannot be productively worked before the Technology components that make them measurable.',
     'the Economics components -- RBP implementation, global-budget implementation, RHT Program deployment -- cannot be productively worked before the Technology components that make them measurable. Only their design work runs in parallel: specifying what the payment model must measure is what tells the technology build what to deliver.'],
    ['scores only 12, precisely because its formal deadline is comparatively distant -- yet it is exactly',
     'scores only 12 -- a medium probability times a high impact -- yet it is exactly'],
    ['Launched by the National Health Service in 2002 with an initial budget of roughly 6.2 billion pounds, the programme was formally dismantled in September 2011, with cost estimates by then running as high as 12.7 billion pounds against government-acknowledged realized benefits of only about 2.6 billion pounds.',
     'Launched by the National Health Service in 2002, the programme was formally dismantled in September 2011. In 2013 Parliament\'s Public Accounts Committee put its expected cost at 9.8 billion pounds -- a figure that still excluded large outstanding contract liabilities -- against just 3.7 billion pounds of benefits realized to March 2012.'],
    ['smaller in dollar terms than NPfIT\'s roughly twelve billion pounds',
     'smaller in dollar terms than NPfIT\'s roughly ten billion pounds'],
    ['Then run the sequencing test above against your own list.',
     'Then run the sequencing test above against your own list -- the Portfolio Sequencing Test on the platform (/portfolio-sequencing-test) runs it on Vermont\'s nineteen components or on a register you enter.'],
  ],
  'tl-building-the-pmo': [
    ['PMI defines the ten project management knowledge areas',
     'PMI\'s PMBOK Guide (sixth edition, 2017) defines ten project management knowledge areas'],
    ['as the complete set a mature PMO has to address.',
     'as the complete set a mature PMO has to address. The 2025 eighth edition reorganizes the same ground into principles and performance domains, but the ten areas remain the clearest checklist of what a PMO has to run.'],
  ],
};

async function q(groq) {
  const r = await fetch(`${API}/query/${DS}?query=${encodeURIComponent(groq)}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await r.json()).result;
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
for (const [slug, fixes] of Object.entries(FIXES)) {
  const doc = await q(`*[slug.current=="${slug}" && !(_id in path("drafts.**"))][0]`);
  if (!doc) throw new Error('missing ' + slug);
  fs.writeFileSync(`../sanity-backups/ch15-academy-${slug}-${stamp}.json`, JSON.stringify(doc, null, 2));
  let json = JSON.stringify(doc.body);
  for (const [oldT, newT] of fixes) {
    const o = JSON.stringify(oldT).slice(1, -1), n = JSON.stringify(newT).slice(1, -1);
    const c = json.split(o).length - 1;
    console.log(`${slug}: ${c} x ${oldT.slice(0, 60)}`);
    if (c !== 1) { if (APPLY) throw new Error('anchor count ' + c); continue; }
    json = json.split(o).join(n);
  }
  if (APPLY) {
    const r = await fetch(`${API}/mutate/${DS}`, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mutations: [{ patch: { id: doc._id, set: { body: JSON.parse(json) } } }] }) });
    console.log(slug, 'patched:', r.status, (await r.text()).slice(0, 120));
  }
}

// Supabase copies of the same text (legacy content_blocks fallback)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await sb.from('lessons').select('id,title,sanity_slug,content_blocks').in('sanity_slug', Object.keys(FIXES));
for (const l of data) {
  const s = JSON.stringify(l.content_blocks || '');
  console.log('supabase', l.sanity_slug, 'EAST Fund deployment:', s.includes('EAST Fund deployment'), '12.7 billion:', s.includes('12.7 billion'), 'ten project management:', s.includes('ten project management'));
  if (!s.includes('EAST Fund deployment') && !s.includes('12.7 billion')) continue;
  fs.writeFileSync(`../sanity-backups/ch15-academy-supabase-${l.sanity_slug}-${stamp}.json`, JSON.stringify(l, null, 2));
  let t = s, hits = 0;
  for (const [oldT, newT] of FIXES[l.sanity_slug]) {
    const o = JSON.stringify(oldT).slice(1, -1), n = JSON.stringify(newT).slice(1, -1);
    const c = t.split(o).length - 1; hits += c;
    console.log('  supabase match', c, oldT.slice(0, 50));
    t = t.split(o).join(n);
  }
  if (APPLY && hits) {
    const { error } = await sb.from('lessons').update({ content_blocks: JSON.parse(t) }).eq('id', l.id);
    console.log('  supabase updated', error ? error.message : 'ok');
  }
}
