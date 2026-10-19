// One-off: dump every published Academy lesson (Supabase structure + Sanity body) to plain text
// for fact-checking. Usage: node scripts/_dump_academy.mjs <out.txt>
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}` };
const nd = await (await fetch(`${API}/export/production`, { headers: H })).text();
const docs = nd.split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((d) => !d._id.startsWith('drafts.'));
const bySlug = new Map(docs.filter((d) => d.slug?.current).map((d) => [d.slug.current, d]));
const SKIP = new Set(['_key', '_type', '_ref', '_id', '_rev', 'style', 'listItem', 'markDefs', 'marks', 'slug', 'url', 'href', 'color', 'icon']);
const strings = (v, out = []) => {
  if (typeof v === 'string') { if (v.trim().length > 2) out.push(v.trim()); }
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!SKIP.has(k)) strings(x, out);
  return out;
};
const all = async (t, sel = '*') => { let out = [], from = 0; for (;;) { const { data, error } = await sb.from(t).select(sel).range(from, from + 999); if (error) throw error; out = out.concat(data); if (data.length < 1000) return out; from += 1000; } };
const courses = (await all('courses')).filter((c) => c.is_published);
const tracks = await all('tracks');
const lessons = await all('lessons');
let txt = '', n = 0;
for (const c of courses) {
  for (const t of tracks.filter((x) => x.course_id === c.id && x.is_published !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    for (const l of lessons.filter((x) => x.track_id === t.id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
      const doc = l.sanity_slug ? bySlug.get(l.sanity_slug) : null;
      const body = doc ? strings({ title: doc.title, body: doc.body, summary: doc.summary, keyTakeaways: doc.keyTakeaways }) : strings(l.content_blocks ?? l.content ?? '');
      txt += `######## ${c.slug} | ${l.sanity_slug ?? l.slug ?? l.id} | ${l.title}\n${body.join('\n')}\n`;
      n++;
    }
  }
}
fs.writeFileSync(process.argv[2], txt);
console.log('courses', courses.length, 'lessons', n, 'bytes', txt.length);
