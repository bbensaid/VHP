// Read-only: dumps Academy courses/tracks/lessons (Supabase) to a JSON file for the
// book promise-delivery audit (docs/audits/promise_delivery_2026-10.jsonl).
// Usage: node scripts/_promise-audit-academy.mjs <out.json>
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
async function all(t, cols) {
  let out = [], from = 0;
  for (;;) {
    const { data, error } = await db.from(t).select(cols).range(from, from + 999);
    if (error) throw new Error(`${t}: ${error.message}`);
    out = out.concat(data);
    if (data.length < 1000) break;
    from += 1000;
  }
  return out;
}
const courses = await all('courses', 'id,slug,title,is_published');
const tracks = await all('tracks', 'id,course_id,slug,title,order,is_published');
const lessons = await all('lessons', '*');
fs.writeFileSync(process.argv[2], JSON.stringify({ courses, tracks, lessons }));
console.log(courses.length, tracks.length, lessons.length, Object.keys(lessons[0] ?? {}).join(','));
