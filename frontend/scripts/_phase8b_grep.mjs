// Phase 8b read-only: regex-search the phase-8b lessons' Supabase fallbacks (content_blocks, summary), their quiz
// questions/options, and local source files (frontend/content, frontend/sanity) — to find a claim's other copies.
// Usage: node scripts/_phase8b_grep.mjs <todo.json> <regex> [lessonSlug,...]
import fs from 'fs';
import { db, ROOT } from './_phase8b_lib.mjs';
const [todoF, re, only] = process.argv.slice(2);
const R = new RegExp(re, 'i');
let todo = JSON.parse(fs.readFileSync(todoF)); if (only) todo = todo.filter(o => only.split(',').includes(o.slug) || only.split(',').includes(o.docId));
const ids = todo.map(o => o.lessonId);
const ctx = (s, m) => { const i = s.search(R); return s.slice(Math.max(0, i - 120), i + 200).replace(/\s+/g, ' '); };
const { data: ls } = await db.from('lessons').select('id,slug,summary,content_blocks').in('id', ids);
for (const l of ls) { const s = JSON.stringify([l.summary, l.content_blocks]); if (R.test(s)) console.log('SUPA lesson', l.slug, '::', ctx(s)); }
const { data: qz } = await db.from('quizzes').select('id,lesson_id').in('lesson_id', ids);
const { data: qq } = await db.from('quiz_questions').select('id,quiz_id,question,explanation').in('quiz_id', qz.map(q => q.id));
const { data: qo } = qq.length ? await db.from('quiz_options').select('id,question_id,text,explanation').in('question_id', qq.map(q => q.id)) : { data: [] };
const slugOfQuiz = id => ls.find(l => l.id === qz.find(q => q.id === id)?.lesson_id)?.slug;
for (const q of qq) { const s = JSON.stringify(q); if (R.test(s)) console.log('SUPA question', q.id, slugOfQuiz(q.quiz_id), '::', ctx(s)); }
for (const o of qo) { const s = JSON.stringify(o); if (R.test(s)) console.log('SUPA option', o.id, slugOfQuiz(qq.find(q => q.id === o.question_id)?.quiz_id), '::', ctx(s)); }
const files = []; const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (/\.(json|py|ts|mjs)$/.test(p)) files.push(p); } };
['frontend/content', 'frontend/sanity'].forEach(scan);
for (const f of files) { const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); if (R.test(t)) console.log('LOCAL', f, '::', ctx(t)); }
console.log('quiz questions in scope', qq.length, 'options', qo.length);
