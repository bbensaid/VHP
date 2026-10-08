// Phase 6 task 3c: apply the task-3 pairs to Supabase lesson fallback rows that carry the same stale text.
import { applyEverywhere, db } from './_phase6_lib.mjs';
import { groups } from './_phase6_task3_pairs.mjs';
const pairs = groups.flatMap(g => g.pairs);
const { data } = await db.from('lessons').select('id,content_blocks');
const ids = data.filter(r => { const s = JSON.stringify(r.content_blocks || ''); return pairs.some(p => s.includes(p.old) && !(p.new.includes(p.old) && s.includes(p.new))); }).map(r => r.id);
console.log('rows', ids);
await applyEverywhere({ pairs, supa: [{ table: 'lessons', col: 'content_blocks', ids }] });
