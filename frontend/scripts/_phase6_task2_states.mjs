// Phase 6 task 2: /dashboard/[state] docs (Sanity rhtState + statePerformanceIndex; static TS fallbacks).
// Maryland: TCOC presented as current / RHT "rural global budget pilots" that are not in Maryland's RHT plan.
// Pennsylvania: PA Rural Health Model not marked as ended.
// Usage: node scripts/_phase6_task2_states.mjs [--commit]
import fs from 'fs';
import { COMMIT, getDoc, mutate, bkSafe, append, same, ROOT } from './_phase6_lib.mjs';

const S_MD = 'CMS, "Maryland Total Cost of Care Model" page (2019-01-01 to 2025-12-31; "On March 12, 2025, CMS announced the intention to end the Maryland Total Cost of Care Model as of December 31, 2025 ... the model transitioned to the AHEAD model and began its implementation period in January 2026"); CMS AHEAD Model page (Cohort 1: Maryland; 5 state participants); Maryland Department of Health, "Rural Health Transformation Program Implementation Update" public webinar (2026-04-17): Budget Period 1 award $168,180,837.61; Pillar 1 workforce ($26M), Pillar 2 sustainable access and innovative care ($126M), Pillar 3 Eat for Health ($15M); Expand Access to Primary Care (MHCC, $6.3M); Workforce Pipeline and Provider Training, Recruitment and Retention (MD Dept of Labor, $15M); no global-budget expansion initiative';
const S_PA = 'CMS, "Pennsylvania Rural Health Model" page: model 2017-01-01 to 2024-12-31; all-payer global budgets in performance years 2019-2024';

const MD_DESC = 'Maryland’s RHT plan ($168.2 million in Budget Period 1) is organized in three pillars — transforming the rural health workforce, promoting sustainable access and innovative care, and helping rural Marylanders eat for health — layered on a hospital system already paid under all-payer global budgets, which moved from the Total Cost of Care Model (ended December 31, 2025) into the CMS AHEAD Model in January 2026.';
const MD_FOCUS = 'Rural Workforce, Access & Food for Health';
const MD_INI0 = { title: 'Expand Access to Primary Care', description: 'Maryland Health Care Commission grants ($6.3 million in Budget Period 1) to establish and expand rural primary care and strengthen chronic disease management to reduce avoidable hospital use. Maryland hospitals were already on all-payer global budgets, now under the CMS AHEAD Model.' };
const MD_INI2 = { title: 'Workforce Pipeline & Retention', description: 'Maryland Department of Labor funding ($15 million in Budget Period 1) for workforce pipeline training and for training, recruitment and retention of rural physicians, PAs, dentists and other advanced practice professionals, plus expanded registered apprenticeships.' };
const MD_MET0 = { label: 'Rural Primary Care Access Funding', status: 'In Progress', target: '$6.3M (Budget Period 1)' };
const MD_NTITLE = 'All-Payer Global Budgets, Now Under AHEAD';
const MD_NSUM = 'Maryland’s all-payer hospital global budget system is a national policy benchmark; after the Total Cost of Care Model ended on December 31, 2025, Maryland entered the CMS AHEAD Model as its Cohort 1 state in January 2026. Its RHT program targets the rural workforce, primary care access, mobile health and food access rather than hospital payment reform.';
const PA_OLD = 'Competitive grants building on the PA Rural Health Model.';
const PA_NEW = 'Competitive grants building on the now-ended Pennsylvania Rural Health Model (2017–2024), which paid participating rural hospitals all-payer global budgets.';

const plans = [
  { id: 'rhtState-maryland', src: S_MD, note: 'Maryland RHT profile presented the Total Cost of Care Model as current and listed "Rural Global Budget Pilots" / "New Global Budget Hospitals: 8 Facilities" and "subsidized housing" programs that appear nowhere in Maryland’s CMS-approved RHT plan; TCOC ended 2025-12-31 and Maryland is AHEAD Cohort 1 from January 2026.',
    build: d => ({
      description: MD_DESC, strategicFocus: MD_FOCUS,
      'initiatives[_key=="ini-0"]': { ...d.initiatives.find(i => i._key === 'ini-0'), ...MD_INI0 },
      'initiatives[_key=="ini-2"]': { ...d.initiatives.find(i => i._key === 'ini-2'), ...MD_INI2 },
      'metrics[_key=="metric-0"]': { ...d.metrics.find(m => m._key === 'metric-0'), ...MD_MET0 },
    }) },
  { id: 'perfIndex-maryland', src: S_MD, note: 'Narrative said the RHT program extends global budgets to rural/Eastern Shore hospitals "not yet integrated" (all Maryland acute hospitals were already under global budgets; RHT plan has no such initiative) and omitted the TCOC→AHEAD transition.',
    build: () => ({ narrativeTitle: MD_NTITLE, narrativeSummary: MD_NSUM }) },
  { id: 'rhtState-pennsylvania', src: S_PA, note: 'PA Rural Health Model ended 2024-12-31; clarified as ended.',
    build: d => ({ 'initiatives[_key=="ini-1"]': { ...d.initiatives.find(i => i._key === 'ini-1'), description: PA_NEW } }) },
];

const getPath = (d, k) => { const m = k.match(/^(\w+)\[_key=="(.+)"\]$/); return m ? d[m[1]].find(x => x._key === m[2]) : d[k]; };
for (const p of plans) {
  const doc = await getDoc(p.id);
  const sets = p.build(doc);
  for (const [k, v] of Object.entries(sets)) console.log(p.id, k, '\n  OLD:', JSON.stringify(getPath(doc, k)), '\n  NEW:', JSON.stringify(v));
  if (!COMMIT) continue;
  const bk = bkSafe(`sanity-${p.id}.json`, JSON.stringify(doc, null, 2));
  await mutate([{ patch: { id: p.id, ifRevisionID: doc._rev, set: sets } }]);
  const back = await getDoc(p.id);
  for (const [k, v] of Object.entries(sets)) {
    const ok = same(getPath(back, k), v);
    console.log('  verify', k, ok);
    append({ target: `sanity ${doc._type} ${p.id} ${k}`, old: getPath(doc, k), new: v, sources: p.src, status: ok ? 'FIXED' : 'LEFT', note: `${p.note} Backup: ${bk}; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` });
  }
}

// Static fallbacks (used only if Sanity and Supabase rht_state_profiles [0 rows] both miss)
const tsEdits = [
  { f: 'frontend/lib/data/rht-program.ts', src: S_MD, pairs: [
    ['strategicFocus: "Global Budget Expansion & Rural Equity",', `strategicFocus: "${MD_FOCUS}",`],
    ['"Building on Maryland\'s unique all-payer global budget model, the RHT program extends its reach to underserved rural communities on the Eastern Shore, pairing financial reform with targeted health equity investments."', JSON.stringify(MD_DESC)],
    ['title: "Rural Global Budget Pilots",\n        description: "Extending the Maryland Total Cost of Care model to smaller rural hospitals not yet participating in global budgets.",', `title: ${JSON.stringify(MD_INI0.title)},\n        description: ${JSON.stringify(MD_INI0.description)},`],
    ['title: "Workforce Housing & Retention",\n        description: "Subsidized housing and loan forgiveness programs to retain clinicians in rural Maryland counties.",', `title: ${JSON.stringify(MD_INI2.title)},\n        description: ${JSON.stringify(MD_INI2.description)},`],
    ['{ label: "New Global Budget Hospitals", status: "Pending", target: "8 Facilities" },', `{ label: ${JSON.stringify(MD_MET0.label)}, status: "In Progress", target: ${JSON.stringify(MD_MET0.target)} },`],
    [`description: "${PA_OLD}"`, `description: ${JSON.stringify(PA_NEW)}`],
  ] },
  { f: 'frontend/lib/data/performance-index-data.ts', src: S_MD, pairs: [
    ['title: "Global Budget Model Expanding to Rural Hospitals",', `title: ${JSON.stringify(MD_NTITLE)},`],
    ['"Maryland\'s unique all-payer global budget system is a national policy benchmark. The RHT program extends this financial reform to rural and Eastern Shore hospitals that have not yet been integrated, pairing it with equity investments."', JSON.stringify(MD_NSUM)],
  ] },
];
for (const { f, src, pairs } of tsEdits) {
  let t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const orig = t;
  for (const [o, n] of pairs) { const k = t.split(o).length - 1; console.log(f, k, o.slice(0, 60)); if (k !== 1) throw new Error('anchor count ' + k); t = t.replace(o, n); }
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), orig);
  fs.writeFileSync(new URL(f, ROOT), t);
  const ok = fs.readFileSync(new URL(f, ROOT), 'utf8') === t;
  for (const [o, n] of pairs) append({ target: `local ${f} (static fallback for /dashboard/[state])`, old: o, new: n, sources: o.includes('PA Rural') ? S_PA : src, status: ok ? 'FIXED' : 'LEFT', note: `Same text as the Sanity doc; fallback only renders if Sanity misses. Backup: ${bk}.` });
}
