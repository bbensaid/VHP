// Phase 5b: live Five Pillars quiz said UVMMC's court challenge "was decided against UVMMC". False — UVMMC
// dismissed its appeals in an April 4, 2025 GMCB settlement; enforcement order stayed, remaining reductions
// spread over FY26–FY27; no court ruled. Backups: sanity-backups/phase5b-2026-10-07/.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')
  .filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const Q = '6dcd9539-487a-42f5-bb5a-09e0d28688bc';
const qUpd = {
  question: "How did UVMMC's appeal of GMCB's FY23 enforcement action end?",
  explanation: "No court ruled. In April 2025 UVMMC dismissed its appeals under a settlement with GMCB; the FY23 enforcement order stayed in place, amended only to spread the remaining reductions over FY26–FY27.",
};
const opts = {
  '4dcf6358-0133-43f9-a182-61d635d42faf': { text: 'UVMMC dismissed its appeals in an April 2025 settlement that left the enforcement order in place', explanation: null },
  '6fd9cd00-f2d5-4004-9e2f-743dac8278c4': { text: 'The case is still pending in court', explanation: 'It is not pending: UVMMC dismissed its appeals under the April 2025 settlement.' },
  'e3d7e318-f3ae-4a55-95c9-140b5e916bcb': { text: "A court ruled for UVMMC, narrowing GMCB's enforcement authority", explanation: 'No court ruled either way; the appeals were dismissed by settlement and the enforcement order stood.' },
};
let e = (await db.from('quiz_questions').update(qUpd).eq('id', Q)).error; if (e) throw e;
for (const [id, u] of Object.entries(opts)) { e = (await db.from('quiz_options').update(u).eq('id', id)).error; if (e) throw e; }
const { data: q } = await db.from('quiz_questions').select('question,explanation').eq('id', Q).single();
const { data: o } = await db.from('quiz_options').select('id,text,is_correct').eq('question_id', Q).order('order');
console.log(q, o, 'clean:', !/decided against|upheld/.test(JSON.stringify([q, o])));
