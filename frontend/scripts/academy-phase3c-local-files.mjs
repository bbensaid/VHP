// Phase 3c: mirror the live Sanity/Supabase corrections into the local Academy source files so a
// re-post or re-seed cannot revert them. Replacement pairs are read from academy-phase3c-fix.mjs
// (single source). Each file is re-serialised only if a no-op round-trip reproduces it byte-for-byte.
// Usage: node scripts/academy-phase3c-local-files.mjs [--commit]
import fs from 'fs';
const COMMIT = process.argv.includes('--commit');
const ROOT = new URL('../../', import.meta.url);
const LOG = new URL('docs/audits/academy_phase3c_2026-10.jsonl', ROOT);
const src = fs.readFileSync(new URL('./academy-phase3c-fix.mjs', import.meta.url), 'utf8');
const slice = src.slice(src.indexOf('const S_POD'), src.indexOf('const ROW_IDS'));
const { TX, EIGHT, ROW_TEXT, S_POD, S_AHEAD } = new Function(slice + '; return { TX, EIGHT, ROW_TEXT, S_POD, S_AHEAD };')();
const PAIRS = [TX, EIGHT, ...Object.values(ROW_TEXT).flat()];
const FILES = ['frontend/sanity/temp_holder/VBC_Equity.json', 'frontend/sanity/temp_holder/VBC_Clinical.json',
  'frontend/sanity/content/Medicaid_Claude_V2.json', /* temp_holder/VBC_Fundamentals.json deleted 2026-10-09 (phase 8a) */
  'frontend/sanity/temp_holder/VBC_Policy.json', 'frontend/sanity/content/academy/vbc_policy.json',
  'frontend/sanity/temp_holder/VBC_Economics.json', 'frontend/sanity/temp_holder/VBC_Technology.json',
  'frontend/sanity/content/academy/vbc_economics.json', 'frontend/sanity/content/academy/vbc_technology.json',
  'frontend/sanity/content/academy/vbc_equity.json', 'frontend/content/courses_tier1.json', 'frontend/content/courses_tier2.json',
  'frontend/content/course_value_based_care.json', 'frontend/content/expand_vbc.json',
  'frontend/content/course_population_health.json', 'frontend/content/course_interoperability.json'];

const asciiEscape = s => s.replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
function serializers(o) {
  const out = [];
  for (const indent of [undefined, 2, 4]) for (const ascii of [false, true]) for (const nl of ['', '\n']) {
    let s = JSON.stringify(o, null, indent);
    if (indent === undefined) { /* compact */ }
    if (ascii) s = asciiEscape(s);
    out.push({ indent, ascii, nl, f: x => { let t = JSON.stringify(x, null, indent); if (ascii) t = asciiEscape(t); return t + nl; }, s: s + nl });
  }
  return out;
}
function deepReplace(o, old, nw) {
  let n = 0;
  const walk = x => {
    if (Array.isArray(x)) x.forEach((v, i) => { if (typeof v === 'string') { if (v.includes(old)) { x[i] = v.split(old).join(nw); n++; } } else walk(v); });
    else if (x && typeof x === 'object') for (const k of Object.keys(x)) { const v = x[k]; if (typeof v === 'string') { if (v.includes(old)) { x[k] = v.split(old).join(nw); n++; } } else walk(v); }
  };
  walk(o); return n;
}
const isFakeAudio = b => b && b._type === 'audio' && String(b.url || '').includes('podcast.htr.com');
function removeAudio(o) {
  const out = [];
  const walk = x => {
    if (Array.isArray(x)) { for (let i = x.length - 1; i >= 0; i--) if (isFakeAudio(x[i])) out.push(...x.splice(i, 1)); x.forEach(walk); }
    else if (x && typeof x === 'object') Object.values(x).forEach(walk);
  };
  walk(o); return out;
}
function fixStat(o, log) {
  const walk = x => {
    if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === 'object') {
      if (x.label === 'Year Vermont signed the AHEAD State Agreement (it withdrew in July 2026)' && x.value === '2024') {
        x.value = '2025'; if (x.source === 'CMS') x.source = 'Vermont GMCB / AHS';
        log.push(['stat value', '2024', '2025', 'Vermont signed the AHEAD State Agreement in January 2025, not 2024.', S_AHEAD]);
      }
      Object.values(x).forEach(walk);
    }
  };
  walk(o);
}
let total = 0;
// hand-formatted files: replace the JSON-escaped old string in the raw text, then confirm it still parses
function textMode(rel, path, text) {
  const log = []; let t = text;
  const esc = x => JSON.stringify(x).slice(1, -1);
  for (const [old, nw, note, s] of PAIRS) { const c = t.split(esc(old)).length - 1; if (c) { t = t.split(esc(old)).join(esc(nw)); log.push([`${c} string(s) (text mode)`, old, nw, note, s]); } }
  const statOld = '{ "value": "2024", "label": "Year Vermont signed the AHEAD State Agreement (it withdrew in July 2026)", "source": "CMS" }';
  if (t.includes(statOld)) { t = t.replace(statOld, '{ "value": "2025", "label": "Year Vermont signed the AHEAD State Agreement (it withdrew in July 2026)", "source": "Vermont GMCB / AHS" }'); log.push(['stat value (text mode)', '2024', '2025', 'Vermont signed the AHEAD State Agreement in January 2025, not 2024.', S_AHEAD]); }
  if (t.includes('podcast.htr.com')) throw new Error('audio block in text-mode file ' + rel);
  console.log(rel, 'changes', log.length, '(text mode)'); for (const l of log) console.log('   ', l[0], '|', String(l[1]).slice(0, 70));
  total += log.length;
  if (!COMMIT || !log.length) return;
  JSON.parse(t);
  fs.writeFileSync(path, t);
  JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [where, old, nw, note, s] of log)
    fs.appendFileSync(LOG, JSON.stringify({ doc_or_file: `${rel} ${where}`, old, new: nw, sources: s, status: 'FIXED', note: `${note} Local source mirror of the live fix; file re-parsed OK.` }) + '\n');
}
for (const rel of FILES) {
  const path = new URL(rel, ROOT), text = fs.readFileSync(path, 'utf8'), o = JSON.parse(text);
  const ser = serializers(o).find(z => z.s === text);
  if (!ser) { textMode(rel, path, text); continue; }
  const log = [];
  for (const [old, nw, note, s] of PAIRS) { const c = deepReplace(o, old, nw); if (c) log.push([`${c} string(s)`, old, nw, note, s]); }
  fixStat(o, log);
  for (const a of removeAudio(o)) log.push([`audio _key ${a._key}`, `url ${a.url}; summary: ${a.summary}`, '(block removed)', `Fabricated podcast episode removed (title "${a.title}").`, S_POD]);
  console.log(rel, 'changes', log.length); for (const l of log) console.log('   ', l[0], '|', String(l[1]).slice(0, 70));
  total += log.length;
  if (!COMMIT || !log.length) continue;
  const out = ser.f(o);
  fs.writeFileSync(path, out);
  const ok = JSON.stringify(JSON.parse(fs.readFileSync(path, 'utf8'))) === JSON.stringify(o);
  for (const [where, old, nw, note, s] of log)
    fs.appendFileSync(LOG, JSON.stringify({ doc_or_file: `${rel} ${where}`, old, new: nw, sources: s, status: ok ? 'FIXED' : 'LEFT', note: `${note} Local source mirror of the live fix; file re-parsed ${ok ? 'OK' : 'FAILED'}.` }) + '\n');
}
console.log('total', total);
