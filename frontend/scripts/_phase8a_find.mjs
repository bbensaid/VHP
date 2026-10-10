// Phase 8a read-only — show every occurrence (with context) of the given phrases in a lesson's Supabase fallback,
// its quiz rows, and local content/sanity files. Usage: node scripts/_phase8a_find.mjs <lessonSlug> <phrase>...
import fs from 'fs';
import { db, ROOT } from './_phase8a_lib.mjs';
const [slug, ...ph] = process.argv.slice(2);
const { data: ls } = await db.from('lessons').select('id,slug,summary,content_blocks').eq('slug', slug);
const show = (where, s) => { for (const p of ph) { let i = -1; while ((i = s.indexOf(p, i + 1)) >= 0) console.log(`${where} | ${p} | …${s.slice(Math.max(0, i - 120), i + 160).replace(/\n/g, ' ')}…`); } };
for (const l of ls) {
  show('SUPA lesson ' + l.id, JSON.stringify(l.content_blocks) + ' ' + (l.summary || ''));
  const { data: qz } = await db.from('quizzes').select('id').eq('lesson_id', l.id);
  for (const q of qz || []) {
    const { data: qq } = await db.from('quiz_questions').select('id,question,explanation').eq('quiz_id', q.id);
    for (const x of qq || []) { show('SUPA qq ' + x.id, JSON.stringify(x));
      const { data: os } = await db.from('quiz_options').select('id,text,explanation').eq('question_id', x.id); for (const o of os || []) show('SUPA qo ' + o.id, JSON.stringify(o)); }
  }
}
const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (/\.(json|py)$/.test(p)) { const t = fs.readFileSync(new URL(p, ROOT), 'utf8'); if (ph.some(x => t.includes(x))) show('LOCAL ' + p, t); } } };
['frontend/content', 'frontend/sanity'].forEach(scan);
