// Phase 6 task 3: platform-wide sweep (all published Sanity docs + Supabase quiz tables) for ended-model-as-current
// and the four settled facts. Targeted string replacements per document / per row; backups + re-fetch verify.
// Usage: node scripts/_phase6_task3_sweep.mjs [--commit]
import { applyEverywhere } from './_phase6_lib.mjs';

import { groups, R, S_VT, S_SP, S_OBBBA } from './_phase6_task3_pairs.mjs';

for (const g of groups) await applyEverywhere({ pairs: g.pairs, sanityIds: g.ids, sanityFields: ['body', 'summary', 'title', 'description'] });

// ---- Supabase quiz rows
const Q = (table, col, id, old, nw, src, note) => ({ table, col, id, p: R(old, nw, src, note) });
const quiz = [
  Q('quiz_questions', 'question', '4579583c-9dfa-4b52-9cd9-4bf35fb0539f', 'support Vermont\'s AHEAD Model?', 'support Vermont\'s hospital global budgets?', S_VT, 'Vermont withdrew from AHEAD in July 2026.'),
  Q('quiz_questions', 'explanation', '4579583c-9dfa-4b52-9cd9-4bf35fb0539f', 'The AHEAD Model\'s global budget requires proactive population health management', 'Hospital global budgets — mandated under Act 68 of 2025 after Vermont withdrew from AHEAD in July 2026 — require proactive population health management', S_VT, 'Vermont withdrew from AHEAD.'),
  Q('quiz_options', 'text', '8d186594', 'enable OneCare Vermont to identify high-risk patients, coordinate care, and manage its global budget population', 'let providers identify high-risk patients, coordinate care, and manage a fixed-budget population, as OneCare Vermont did until it wound down at the end of 2025', S_VT, 'OneCare ended 2025.'),
  Q('quiz_options', 'text', 'a9f7c21c', 'VITL processes all insurance claims for OneCare Vermont', 'VITL processes all insurance claims for Vermont payers', S_VT, 'Distractor named the defunct ACO.'),
  Q('quiz_options', 'text', 'ab6f3901', 'VITL provides behavioral health services to AHEAD Model beneficiaries', 'VITL provides behavioral health services to Vermont Medicaid members', S_VT, 'Distractor implied Vermont has AHEAD beneficiaries.'),
  Q('quiz_options', 'explanation', 'ce422797', 'December 2028 Strategic Plan deadline', 'January 15, 2028 Strategic Plan deadline', S_SP, 'Act 68: Strategic Plan due by January 15, 2028.'),
  Q('quiz_options', 'explanation', '7f83bd28', '(as with Vermont\'s AHEAD Model)', '(as Vermont\'s AHEAD State Agreement would have provided before Vermont withdrew in July 2026)', S_VT, 'Presented Vermont\'s AHEAD agreement as in force.'),
  Q('quiz_options', 'explanation', 'e2d1bd49', 'Vermont\'s RBP, global budgets, and AHEAD all involve both design and management regardless of payer.', 'Vermont\'s RBP and global budgets, like Maryland\'s AHEAD participation, all involve both design and management regardless of payer.', S_VT, 'Listed AHEAD as a current Vermont program.'),
  Q('quiz_questions', 'explanation', '082684dd-8595-432d-8f23-9484740727fc', 'They remain legally and politically contested, with different CMS administrations taking opposing positions.', 'They stayed legally and politically contested, with different CMS administrations taking opposing positions, until the One Big Beautiful Bill Act (July 2025) wrote community engagement requirements for the ACA expansion population into federal law, effective January 1, 2027.', S_OBBBA, '"Remain contested" is stale: federal law now mandates them from 2027-01-01.'),
  Q('quiz_options', 'text', '08491538', 'Struck down in some states (Arkansas, Kentucky) and remain legally contested', 'Struck down in some states (Arkansas, Kentucky) and contested until Congress wrote them into federal law (effective January 1, 2027)', S_OBBBA, 'Correct answer was stale after OBBBA.'),
];
const { db } = await import('./_phase6_lib.mjs');
let allOpts = [];
for (let f = 0; ; f += 1000) { const { data } = await db.from('quiz_options').select('id').range(f, f + 999); allOpts = allOpts.concat(data); if (data.length < 1000) break; }
for (const q of quiz) {
  const id = q.id.length === 36 ? q.id : allOpts.find(o => o.id.startsWith(q.id))?.id;
  if (!id) { console.log('NO ROW', q.id); continue; }
  await applyEverywhere({ pairs: [q.p], supa: [{ table: q.table, col: q.col, ids: [id] }] });
}
