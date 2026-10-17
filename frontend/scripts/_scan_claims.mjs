// Scan Sanity (full export), Supabase lesson/quiz text, and platform source for regex patterns given on argv.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const pats = process.argv.slice(2).map((p) => new RegExp(p, 'gi'));
const show = (where, t) => { for (const re of pats) for (const m of t.matchAll(re)) console.log(where, '|', t.slice(Math.max(0, m.index - 110), m.index + 110).replace(/\s+/g, ' ')); };
const nd = await (await fetch(`https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/export/production`, { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } })).text();
for (const l of nd.split('\n').filter(Boolean)) { const d = JSON.parse(l); if (d._id.startsWith('drafts.') || d._type.startsWith('sanity.')) continue; show('SANITY ' + d._id, JSON.stringify(d)); }
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const t of ['lessons', 'quiz_questions', 'quiz_options', 'courses', 'tracks']) { let data = [], from = 0; for (;;) { const r = await sb.from(t).select('*').range(from, from + 999); if (r.error || !r.data) break; data = data.concat(r.data); if (r.data.length < 1000) break; from += 1000; } for (const r of data ?? []) show(`SUPA ${t} ${r.slug ?? r.id}`, JSON.stringify(r)); }
const files = execSync("git ls-files app components lib content ../backend/data | grep -E '\\.(tsx?|json|md|py)$' | grep -v book-html", { encoding: 'utf8' }).split('\n').filter(Boolean);
for (const f of files) show('FILE ' + f, fs.readFileSync(f, 'utf8'));
