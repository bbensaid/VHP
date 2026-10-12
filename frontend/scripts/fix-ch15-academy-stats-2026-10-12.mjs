// Align lesson transformation-as-portfolio-management's stat grid with the book's corrected Figure 15.1.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const OLD_LABEL_KA = "PMI portfolio-management knowledge areas this book's framework addresses analytically";
const NEW_LABEL_KA = "PMI project-management knowledge areas (PMBOK Guide, 6th ed.) this book's framework addresses analytically";
const NEW_SRC_KA = 'PMBOK Guide, 6th ed. (2017)';
const OLD_LABEL_7 = 'Statutory deadlines inside the portfolio that require active project-management discipline';
const NEW_7 = { value: '10', label: "Scored risks in Vermont's portfolio risk register -- two of them at the maximum score of 20", src: 'HTR portfolio risk register (book Chapter 15, Figure 15.6)' };
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const doc = (await (await fetch(`${API}/query/production?query=${encodeURIComponent('*[slug.current=="transformation-as-portfolio-management" && !(_id in path("drafts.**"))][0]')}`, { headers: H })).json()).result;
fs.writeFileSync(`../sanity-backups/ch15-academy-stats-sanity-${Date.now()}.json`, JSON.stringify(doc));
let n = 0;
const body = doc.body.map(b => b._type !== 'statGrid' ? b : { ...b, stats: b.stats.map(s => {
  if (s.label === OLD_LABEL_KA) { n++; return { ...s, label: NEW_LABEL_KA, context: `Source: ${NEW_SRC_KA}` }; }
  if (s.label === OLD_LABEL_7) { n++; return { ...s, value: NEW_7.value, label: NEW_7.label, context: `Source: ${NEW_7.src}` }; }
  return s; }) });
if (n !== 2) throw new Error('sanity matches ' + n);
const r = await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id: doc._id, set: { body } } }] }) });
console.log('sanity', r.status);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: l } = await sb.from('lessons').select('id,content_blocks').eq('slug', 'transformation-as-portfolio-management').single();
fs.writeFileSync(`../sanity-backups/ch15-academy-stats-supabase-${Date.now()}.json`, JSON.stringify(l));
let m = 0;
const cb = l.content_blocks.map(b => b.type !== 'key_stat' ? b : { ...b, stats: b.stats.map(s => {
  if (s.label === OLD_LABEL_KA) { m++; return { ...s, label: NEW_LABEL_KA, source: NEW_SRC_KA }; }
  if (s.label === OLD_LABEL_7) { m++; return { ...s, value: NEW_7.value, label: NEW_7.label, source: NEW_7.src }; }
  return s; }) });
if (m !== 2) throw new Error('supabase matches ' + m);
const { error } = await sb.from('lessons').update({ content_blocks: cb }).eq('id', l.id);
console.log('supabase', error?.message ?? 'ok');
