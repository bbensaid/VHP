import { db } from './_phase8a_lib.mjs';
const id = process.argv[2];
const { data: l } = await db.from('lessons').select('summary,content_blocks').eq('id', id).single();
console.log('SUMMARY', l.summary); console.log(JSON.stringify(l.content_blocks).length); console.log(JSON.stringify(l.content_blocks).slice(0, +process.argv[3] || 6000));
const { data: qz } = await db.from('quizzes').select('id').eq('lesson_id', id);
for (const q of qz || []) { const { data: qs } = await db.from('quiz_questions').select('id,question,explanation,quiz_options(text,explanation,is_correct)').eq('quiz_id', q.id); for (const x of qs) console.log('Q', x.question, '|', x.explanation, '|', x.quiz_options.map(o => (o.is_correct ? '*' : '') + o.text + (o.explanation ? ' ~' + o.explanation : '')).join(' || ')); }
