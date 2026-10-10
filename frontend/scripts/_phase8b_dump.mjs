// Phase 8b read-only — print a Sanity academyModule body as compact keyed text, and flag media/placeholder blocks in
// Sanity and in the Supabase fallback (lessons.content_blocks). Usage: node scripts/_phase8b_dump.mjs <docId> [lessonSlug]
import { db, getDoc } from './_phase8b_lib.mjs';
const [id, slug] = process.argv.slice(2);
const d = await getDoc(id); if (!d) { console.log('MISSING', id); process.exit(1); }
const txt = b => (b.children || []).map(c => c.text).join('');
console.log('#', d.title, '| blocks', d.body.length, '| objectives:', JSON.stringify(d.learningObjectives || []).slice(0, 600));
console.log('summary:', d.summary);
for (const b of d.body) {
  const k = b._key, t = b._type;
  if (t === 'block') console.log(`[${k}] ${b.style !== 'normal' ? b.style + ': ' : ''}${b.listItem ? '- ' : ''}${txt(b)}`);
  else if (t === 'statGrid') console.log(`[${k}] STATGRID ${b.title || ''} :: ` + (b.stats || []).map((s, i) => `(${i}) ${s.value} | ${s.label} | ${s.context || ''}`).join(' || '));
  else if (/image|video|audio|media|embed|figure/i.test(t)) console.log(`[${k}] MEDIA ${t} ${JSON.stringify(b).slice(0, 300)}`);
  else { const { _key, _type, ...r } = b; console.log(`[${k}] ${t.toUpperCase()} ${JSON.stringify(r)}`); }
}
const { data: ls } = await db.from('lessons').select('id,slug,content_blocks').or(`sanity_slug.eq.${d.slug?.current || id},slug.eq.${slug || d.slug?.current || id}`);
for (const l of ls || []) {
  const cb = l.content_blocks || [];
  const media = cb.filter(b => b && /image|video|audio|media|embed|figure|placeholder/i.test(b.type || ''));
  console.log(`SUPA ${l.id} ${l.slug} blocks ${cb.length} types ${[...new Set(cb.map(b => b?.type))].join(',')} media ${JSON.stringify(media).slice(0, 400)}`);
  if (!process.argv.includes('--nofb')) cb.forEach((b, i) => console.log(`  fb${i} ${JSON.stringify(b)}`));
}
for (const l of ls || []) {
  const { data: qz } = await db.from('quizzes').select('id').eq('lesson_id', l.id);
  for (const q of qz || []) {
    const { data: qq } = await db.from('quiz_questions').select('id,question,explanation').eq('quiz_id', q.id);
    for (const x of qq || []) {
      const { data: os } = await db.from('quiz_options').select('id,text,explanation,is_correct').eq('question_id', x.id);
      console.log(`  QUIZ ${x.id} ${x.question} || expl: ${x.explanation} || opts: ${(os || []).map(o => (o.is_correct ? '*' : '') + o.text + (o.explanation ? ' [' + o.explanation + ']' : '')).join(' | ')}`);
    }
  }
}
