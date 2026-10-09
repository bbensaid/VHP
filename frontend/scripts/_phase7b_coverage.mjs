// Phase 7b — list published non-VBC Academy lessons (published course + track) and whether their Sanity doc appears in the phase-7b log.
import fs from 'fs';
import { db, query } from './_phase7b_lib.mjs';
const VBC = s => !!s && (/vbc-fundamentals-|vbc-social-risk|capitation-mechanics|vbc-bundled-|aco-/.test(s) || /^vbc-/.test(s));
const all = async (t, sel) => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
const courses = await all('courses', '*'); const tracks = await all('tracks', '*'); const lessons = await all('lessons', 'id,slug,title,track_id,sanity_slug,is_published');
const pubC = new Map(courses.filter(c => c.is_published).map(c => [c.id, c]));
const pubT = new Map(tracks.filter(t => t.is_published && pubC.has(t.course_id)).map(t => [t.id, t]));
const log = fs.readFileSync(new URL('../../docs/audits/phase7b_sources_2026-10.jsonl', import.meta.url), 'utf8');
const docs = await query('*[_type=="academyModule"]{_id,"slug":slug.current,"n":count(body)}');
const bySlug = new Map(docs.map(d => [d.slug, d])); const byId = new Map(docs.map(d => [d._id, d]));
const out = [];
for (const l of lessons) { const t = pubT.get(l.track_id); if (!t) continue; if (l.is_published === false) continue;
  const c = pubC.get(t.course_id); const ss = l.sanity_slug; const d = ss ? (bySlug.get(ss) || byId.get(ss)) : null;
  const vbc = VBC(l.slug) || VBC(ss) || VBC(d?._id);
  const inLog = ss && (log.includes(`"${ss}"`) || log.includes(` ${ss}"`) || (d && (log.includes(`"${d._id}"`) || log.includes(` ${d._id}"`))));
  out.push({ course: c.slug, track: t.slug, lesson: l.slug, sanity_slug: ss, docId: d?._id, blocks: d?.n, vbc, inLog: !!inLog }); }
const nonvbc = out.filter(o => !o.vbc);
console.log('published lessons', out.length, 'non-VBC', nonvbc.length, 'no sanity_slug', nonvbc.filter(o => !o.sanity_slug).length, 'slug unresolved', nonvbc.filter(o => o.sanity_slug && !o.docId).length);
const todo = nonvbc.filter(o => o.docId && !o.inLog);
console.log('NOT IN LOG', todo.length); for (const o of todo) console.log(o.course, '|', o.track, '|', o.docId, o.blocks);
console.log('no sanity_slug / unresolved:'); for (const o of nonvbc.filter(o => !o.docId)) console.log('  ', o.course, o.lesson, o.sanity_slug);
