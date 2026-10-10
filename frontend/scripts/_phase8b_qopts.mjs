// Phase 8b read-only — print quiz question + option rows (ids, exact text) for a question id. Usage: node scripts/_phase8b_qopts.mjs <questionId>...
import { db } from './_phase8b_lib.mjs';
for (const id of process.argv.slice(2)) {
  const { data: q } = await db.from('quiz_questions').select('*').eq('id', id).single();
  console.log(JSON.stringify(q));
  const { data: os } = await db.from('quiz_options').select('*').eq('question_id', id);
  for (const o of os) console.log('  ', JSON.stringify(o));
}
