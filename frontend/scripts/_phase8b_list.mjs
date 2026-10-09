// Phase 8b — list uncleaned published lessons in the phase-8b courses (cleaned = sanity_slug/slug/id appears as a
// doc key in phase7a/7b/8b logs, same rule as academy_cleanup_inventory.mjs). Writes JSON to argv[2] if given.
// Usage: node scripts/_phase8b_list.mjs [out.json]
import fs from 'fs';
import { db, query, ROOT } from './_phase8b_lib.mjs';
const COURSES = ['Medicaid 101', 'Medicaid Managed Care Operations', 'Medicare Fundamentals', 'Population Health Management',
  'Revenue Cycle Management', 'Transformation Leadership', 'Value-Based Care: From Fee-for-Service to Outcomes'];
const keys = new Set();
for (const f of ['phase7a', 'phase7b', 'phase8b']) {
  const u = new URL(`docs/audits/${f}_sources_2026-10.jsonl`, ROOT); if (!fs.existsSync(u)) continue;
  for (const l of fs.readFileSync(u, 'utf8').split('\n')) { try { keys.add(String(JSON.parse(l).doc || '')); } catch {} }
}
const isClean = (...ks) => [...keys].some(k => ks.some(x => x && (k === x || k.includes(x))));
const { data: courses } = await db.from('courses').select('id,slug,title,is_published');
const { data: tracks } = await db.from('tracks').select('id,course_id,slug,title,is_published,order');
const { data: lessons } = await db.from('lessons').select('id,track_id,slug,title,sanity_slug,is_published,order');
const docs = await query('*[_type=="academyModule" && !(_id in path("drafts.**"))]{_id,"slug":slug.current,"n":count(body)}');
const out = [];
for (const c of courses.filter(c => c.is_published && COURSES.some(t => c.title.startsWith(t)))) {
  const ts = tracks.filter(t => t.course_id === c.id && t.is_published).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  for (const t of ts) for (const l of lessons.filter(l => l.track_id === t.id && l.is_published !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    const d = docs.find(d => d.slug === l.sanity_slug || d._id === l.sanity_slug);
    out.push({ course: c.title, lessonId: l.id, slug: l.slug, sanity_slug: l.sanity_slug, docId: d?._id, blocks: d?.n, clean: isClean(l.sanity_slug, l.slug, l.id) });
  }
}
const todo = out.filter(o => !o.clean);
for (const c of COURSES) { const a = out.filter(o => o.course.startsWith(c)); console.log(`${a.length - a.filter(o => !o.clean).length}/${a.length}\t${c}`); }
for (const o of todo) console.log(o.course.slice(0, 20), '|', o.slug, '|', o.docId, o.blocks);
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(todo, null, 1));
