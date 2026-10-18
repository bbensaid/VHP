// Print published course -> track -> lesson tree (titles, slugs, order, sanity_slug presence).
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const all = async (t) => { let d = [], f = 0; for (;;) { const r = await sb.from(t).select('*').range(f, f + 999); if (r.error) throw r.error; d = d.concat(r.data); if (r.data.length < 1000) return d; f += 1000; } };
const [courses, tracks, lessons] = await Promise.all(['courses', 'tracks', 'lessons'].map(all));
const filt = process.argv[2] ? new RegExp(process.argv[2], 'i') : null;
for (const c of courses.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
  if (filt && !filt.test(c.title + c.slug)) continue;
  console.log(`COURSE [${c.is_published ? 'pub' : 'UNPUB'}] ${c.title} (${c.slug})`);
  for (const t of tracks.filter((t) => t.course_id === c.id).sort((a, b) => a.order - b.order)) {
    console.log(`  TRACK ${t.order} [${t.is_published ? 'pub' : 'UNPUB'}] ${t.title} (${t.slug})`);
    for (const l of lessons.filter((l) => l.track_id === t.id).sort((a, b) => a.order - b.order))
      console.log(`    L${l.order} [${l.is_published === false ? 'UNPUB' : 'pub'}] ${l.title} (${l.slug}) ${l.sanity_slug ? 'S' : 'noS'}`);
  }
}
