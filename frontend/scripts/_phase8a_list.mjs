// Phase 8a read-only: list uncleaned published lessons in the part-1 courses, with Sanity doc id + block count.
// Usage: node scripts/_phase8a_list.mjs [--json]
import fs from 'fs';
import { db, query, ROOT } from './_phase8a_lib.mjs';
const COURSES = ['Five Pillars, One Imperative', 'Genomics & Precision Medicine', 'Health Equity & SDOH: From Awareness to Action',
  'Health Equity Analytics', 'Healthcare Interoperability & Data Exchange', 'HIE & Health Reform', 'Hospital Finance'];
const keys = [];
for (const f of ['docs/audits/phase7a_sources_2026-10.jsonl', 'docs/audits/phase7b_sources_2026-10.jsonl'])
  for (const l of fs.readFileSync(new URL(f, ROOT), 'utf8').split('\n')) { try { keys.push(String(JSON.parse(l).doc || '')); } catch {} }
const cleaned = (...x) => keys.some(k => x.some(v => v && (k === v || k.includes(v))));
const { data: courses } = await db.from('courses').select('id,title,is_published');
const { data: tracks } = await db.from('tracks').select('id,course_id,title,is_published,order');
const { data: lessons } = await db.from('lessons').select('id,track_id,slug,title,sanity_slug,is_published,order');
const mods = await query(`*[_type=="academyModule" && !(_id in path("drafts.**"))]{_id,"slug":slug.current,"n":count(body)}`);
const out = [];
for (const c of courses.filter(c => c.is_published && COURSES.includes(c.title))) {
  const ts = tracks.filter(t => t.course_id === c.id && t.is_published).sort((a, b) => a.order - b.order);
  for (const t of ts) for (const l of lessons.filter(l => l.track_id === t.id && l.is_published !== false).sort((a, b) => a.order - b.order)) {
    if (cleaned(l.sanity_slug, l.slug, l.id)) continue;
    const m = mods.find(m => m.slug === l.sanity_slug);
    out.push({ course: c.title, lesson: l.id, slug: l.slug, sanity_slug: l.sanity_slug, doc: m?._id || null, blocks: m?.n ?? null, title: l.title });
  }
}
if (process.argv.includes('--json')) console.log(JSON.stringify(out));
else for (const o of out) console.log([o.course.slice(0, 18), o.slug, o.sanity_slug, o.doc, o.blocks].join('\t'));
console.log('total', out.length);
