// Phase 7 read-only dump: all lesson rows (flagged __published), ALL academyModule docs, the VBC-fundamentals
// policyAnalysis twins + 2 named analyses, quizzes/questions/options. Writes one JSON to the path given (default scratch file).
// Usage: node scripts/_phase7_dump.mjs <out.json>
import fs from 'fs';
import { db, query } from './_phase7b_lib.mjs';
const out = process.argv[2] || '/tmp/phase7_dump.json';
const all = async (t, sel = '*') => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
const courses = await all('courses'), tracks = await all('tracks'), lessons = await all('lessons');
const quizzes = await all('quizzes'), qq = await all('quiz_questions'), qo = await all('quiz_options');
const pubC = new Set(courses.filter(c => c.is_published).map(c => c.id));
const pubT = new Set(tracks.filter(t => t.is_published !== false && pubC.has(t.course_id)).map(t => t.id));
lessons.forEach(l => { l.__published = pubT.has(l.track_id) && l.is_published !== false; });
const pubL = lessons; // all rows: fallbacks of unpublished rows can be republished
const TWINS = ['vbc-fundamentals-module-2-policy-pillar','vbc-fundamentals-module-3-economics-pillar','vbc-fundamentals-module-4-technology-pillar','vbc-fundamentals-module-5-clinical-equity-pillars','ahead-model-year-one-financial-outcomes','capitation-mechanics-rvu-volume'];
const slugs = [...new Set(pubL.map(l => l.sanity_slug).filter(Boolean))];
const mods = await query(`*[_type=="academyModule" && !(_id in path("drafts.**"))]`);
const twins = await query(`*[_type in ["policyAnalysis","article"] && _id in $s]`.replace('$s', JSON.stringify(TWINS)));
const allMods = await query(`*[_type=="academyModule"]{_id,"slug":slug.current}`);
const lid = new Set(pubL.map(l => l.id));
const qz = quizzes.filter(q => lid.has(q.lesson_id)); const qzid = new Set(qz.map(q => q.id));
const qs = qq.filter(q => qzid.has(q.quiz_id)); const qsid = new Set(qs.map(q => q.id));
const os = qo.filter(o => qsid.has(o.question_id));
fs.writeFileSync(out, JSON.stringify({ courses: courses.filter(c => pubC.has(c.id)), tracks: tracks.filter(t => pubT.has(t.id)), lessons: pubL, mods, twins, allMods, quizzes: qz, questions: qs, options: os }));
console.log({ courses: pubC.size, tracks: pubT.size, lessons: pubL.length, slugs: slugs.length, mods: mods.length, twins: twins.length, allMods: allMods.length, quizzes: qz.length, questions: qs.length, options: os.length, missingSlugs: slugs.filter(s => !mods.find(m => m.slug.current === s)) });
