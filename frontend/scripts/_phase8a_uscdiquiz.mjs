// Phase 8a — targeted fix of the USCDI lesson's SDOH/SOGI quiz years (SOGI entered USCDI in v2, July 2021; v3.1 June 2025 removed/revised SO/GI).
// Supabase rows by id + local JSON quizzes by question id. Guards: each target must hold the expected old value or already the new one.
import fs from 'fs';
import { db, bkSafe, append, detectFmt, emit, same, ROOT, COMMIT } from './_phase8a_lib.mjs';
const EXPL = 'SOGI data entered USCDI in v2 (July 2021) as an equity-focused expansion. USCDI v3.1 (June 2025) then removed or revised the sex, sexual orientation, and gender identity elements under Executive Order 14168 — a reminder that USCDI content can contract as well as grow.';
const SRC = 'Particle Health USCDI changelog (v2 July 2021: 3 classes / 22 elements incl. SOGI and SDOH); ISP USCDI v3.1 (June 2025): Sex, Sexual Orientation and Gender Identity elements removed or updated consistent with EO 14168.';
const SUPA = [
  ['quiz_options', '38a42c92-71c4-419c-98aa-3c6334f88de0', 'text', 'USCDI v2 (2022)', 'USCDI v2 (2021)'],
  ['quiz_options', '6165e913-f50e-45b4-a321-310372cd257e', 'text', 'USCDI v3 (2022)', 'USCDI v2 (2021)'],
  ['quiz_options', 'ca2462a5-b5bd-4ef3-a726-ec7a754594b2', 'text', 'USCDI v2 (2022)', 'USCDI v3 (2022)'],
  ['quiz_questions', 'e9f13a72-0070-4702-8436-5ed96e048574', 'question', 'Sexual orientation and gender identity (SOGI) data was added to USCDI as a required data class in which version?', 'Sexual orientation and gender identity (SOGI) data elements were first added to USCDI in which version?'],
  ['quiz_questions', 'e9f13a72-0070-4702-8436-5ed96e048574', 'explanation', 'SOGI data in USCDI v3 represents a significant equity-focused expansion — making it a federal requirement that certified EHRs can capture and exchange these data elements necessary for tracking LGBTQ+ health disparities.', EXPL],
];
for (const [t, id, col, o, n] of SUPA) {
  const { data: row } = await db.from(t).select('*').eq('id', id).single();
  const st = row[col] === n ? 'already' : row[col] === o ? 'apply' : 'MISMATCH';
  console.log(t, id, col, st); if (st !== 'apply' || !COMMIT) continue;
  const bk = bkSafe(`supabase-${t}-${id}.json`, JSON.stringify(row, null, 2));
  await db.from(t).update({ [col]: n }).eq('id', id);
  const { data: r2 } = await db.from(t).select(col).eq('id', id).single(); const ok = r2[col] === n;
  append({ doc: `supabase ${t} ${id} ${col}`, block_key: 'quiz', claim: `USCDI quiz: ${JSON.stringify(o).slice(0, 200)}`, verdict: 'INACCURATE', action: `replaced -> ${JSON.stringify(n).slice(0, 300)}`, sources: SRC, status: ok ? 'FIXED' : 'LEFT', part: '8a', note: `backup ${bk}; re-read ${ok ? 'and verified' : 'VERIFY FAILED'}` });
}
// local: per question id -> {optionId: {text}, prompt, explanation}
const LOC = {
  q_uscdi4: { prompt: SUPA[3][4], explanation: EXPL, opts: { q_uscdi4b: { text: 'USCDI v2 (2021)', explanation: 'SOGI elements (sexual orientation and gender identity) were added in USCDI v2 in July 2021, alongside SDOH elements. USCDI v3.1 (June 2025) later removed or revised them under Executive Order 14168.' }, q_uscdi4c: { text: 'USCDI v3 (2022)', explanation: 'USCDI v3 added Health Insurance Information and Health Status/Assessments; SOGI had already entered in v2.' }, q_uscdi4d: { explanation: 'SOGI elements were added in USCDI v2 (2021); USCDI v3.1 (2025) removed or revised them.' } } },
};
const files = ['frontend/content/course_interoperability.json', 'frontend/content/courses_tier2.json'];
for (const f of files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const fmt = detectFmt(t); const d = JSON.parse(t); let hits = 0;
  const visit = v => { if (Array.isArray(v)) return v.forEach(visit); if (!v || typeof v !== 'object') return;
    if (LOC[v.id] && Array.isArray(v.options)) { const L = LOC[v.id]; const pk = 'prompt' in v ? 'prompt' : 'text'; v[pk] = L.prompt; if ('explanation' in v) v.explanation = L.explanation;
      for (const op of v.options) for (const [k, x] of Object.entries(L.opts[op.id] || {})) if (k in op) op[k] = x; hits++; }
    if (Array.isArray(v.options)) for (const op of v.options) if (op.text === 'USCDI v2 (2022)' && (op.isCorrect === true || v.correctId === op.id)) { op.text = 'USCDI v2 (2021)'; hits++; }
    Object.values(v).forEach(visit); };
  visit(d); const nt = fmt ? emit(d, fmt) : null;
  console.log('LOCAL', f, 'hits', hits, 'fmt', !!fmt, nt === t ? 'no change' : 'change');
  if (!fmt) { console.log('  format not reproducible — NOT written'); continue; }
  if (nt === t || !COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t); fs.writeFileSync(new URL(f, ROOT), nt);
  const ok = same(JSON.parse(fs.readFileSync(new URL(f, ROOT), 'utf8')), d);
  append({ doc: `local ${f}`, block_key: 'quiz q_uscdi2/q_uscdi4', claim: 'USCDI quiz: SOGI attributed to v3 (2022/2023); v2 dated 2022', verdict: 'INACCURATE', action: `SOGI question re-keyed to v2 (2021) with v3.1 note; v2 option year 2021 (${hits} edits)`, sources: SRC, status: ok ? 'FIXED' : 'LEFT', part: '8a', note: `backup ${bk}; re-read ${ok ? 'and verified' : 'VERIFY FAILED'}` });
}
