import { db } from './_phase8a_lib.mjs';
const { data: qz } = await db.from('quizzes').select('id').eq('lesson_id', '8ced148e-689a-4eff-b4bc-0e1f87e752c9');
for (const q of qz) { const { data } = await db.from('quiz_questions').select('id,question,explanation,quiz_options(id,text,is_correct,explanation)').eq('quiz_id', q.id); for (const x of data) if (/SOGI|social determinants/i.test(x.question)) console.log(JSON.stringify(x, null, 1)); }
