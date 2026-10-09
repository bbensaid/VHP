// Inventory of every published Academy course/track/lesson with its source-cleanup status,
// for the author to pick what gets cleaned (vs deleted). Writes docs/audits/ACADEMY_CLEANUP_LIST.html.
// Status comes from the phase 7a/7b source-integrity logs (docs/audits/phase7*_sources_2026-10.jsonl).
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')
  .filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const ROOT = new URL('../../', import.meta.url);

const logged = new Map(); // key (doc id or slug fragment) -> {fixed, total}
for (const f of ['docs/audits/phase7a_sources_2026-10.jsonl', 'docs/audits/phase7b_sources_2026-10.jsonl']) {
  for (const l of fs.readFileSync(new URL(f, ROOT), 'utf8').split('\n')) {
    if (!l.trim()) continue; let d; try { d = JSON.parse(l); } catch { continue; }
    const k = String(d.doc || ''); const e = logged.get(k) || { fixed: 0, total: 0 };
    e.total++; if (d.status === 'FIXED') e.fixed++; logged.set(k, e);
  }
}
const statusFor = (...keys) => {
  let fixed = 0, total = 0;
  for (const [k, v] of logged) if (keys.some(x => x && (k === x || k.includes(x)))) { fixed += v.fixed; total += v.total; }
  return total ? { s: 'CLEANED', fixed, total } : { s: 'NOT CLEANED', fixed: 0, total: 0 };
};

const { data: courses } = await db.from('courses').select('id,slug,title,is_published,chapter_ref').order('title');
const { data: tracks } = await db.from('tracks').select('id,course_id,slug,title,is_published,order');
const { data: lessons } = await db.from('lessons').select('id,track_id,slug,title,sanity_slug,is_published,order,content_blocks');

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let rows = '', nL = 0, nClean = 0, nNot = 0; const summary = [];
for (const c of courses.filter(c => c.is_published)) {
  const ts = tracks.filter(t => t.course_id === c.id && t.is_published).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const ls = ts.flatMap(t => lessons.filter(l => l.track_id === t.id && l.is_published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(l => ({ ...l, track: t.title })));
  if (!ls.length) continue;
  let cClean = 0;
  const body = ls.map(l => {
    const st = statusFor(l.sanity_slug, l.slug, l.id);
    if (st.s === 'CLEANED') cClean++;
    nL++; st.s === 'CLEANED' ? nClean++ : nNot++;
    return `<tr class="${st.s === 'CLEANED' ? 'done' : 'todo'}"><td><input type="checkbox" class="les" data-course="${esc(c.slug)}" value="${esc(l.slug)}"></td>`
      + `<td>${esc(l.track)}</td><td>${esc(l.title)}<br><small>${esc(l.slug)}</small></td>`
      + `<td>${st.s === 'CLEANED' ? `Cleaned (${st.fixed} fixes)` : 'Not cleaned'}</td></tr>`;
  }).join('');
  summary.push({ course: c.title, lessons: ls.length, cleaned: cClean });
  rows += `<h2><label><input type="checkbox" class="crs" value="${esc(c.slug)}"> ${esc(c.title)}</label></h2>`
    + `<div class="meta">${ls.length} lessons · ${cClean} already cleaned · ${ls.length - cClean} not cleaned${c.chapter_ref ? ` · linked to book: ${esc(c.chapter_ref)}` : ''}</div>`
    + `<table><thead><tr><th></th><th>Track</th><th>Lesson</th><th>Status</th></tr></thead><tbody>${body}</tbody></table>`;
}
const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Academy Cleanup List</title>
<style>:root{--bg:#fff;--ink:#1a2233;--mute:#5b6577;--line:#d9dee7;--done:#e9f6ee}
@media (prefers-color-scheme:dark){:root{--bg:#12161d;--ink:#e6e9ef;--mute:#9aa3b2;--line:#2c3440;--done:#1f3328}}
body{background:var(--bg);color:var(--ink);font:14px/1.45 -apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:16px}
h1{font-size:22px}h2{font-size:16px;margin:24px 0 2px}.meta{color:var(--mute);margin-bottom:6px}
table{width:100%;border-collapse:collapse}td,th{border:1px solid var(--line);padding:5px 8px;text-align:left;vertical-align:top}
tr.done{background:var(--done)}small{color:var(--mute)}#out{width:100%;height:140px}button{padding:6px 12px;margin:12px 0}</style></head><body>
<h1>Academy — published courses and lessons</h1>
<div class="meta">${nL} published lessons · ${nClean} already cleaned (green) · ${nNot} not cleaned.
Tick a course (whole course) or individual lessons you want KEPT and cleaned. Everything unticked is treated as "delete — do not clean".
Then press "Copy selection" and paste it to Claude.</div>
<button onclick="cp()">Copy selection</button>${rows}<button onclick="cp()">Copy selection</button><textarea id="out" readonly></textarea>
<script>
document.querySelectorAll('.crs').forEach(c=>c.addEventListener('change',()=>document.querySelectorAll('.les[data-course="'+c.value+'"]').forEach(l=>l.checked=c.checked)));
function cp(){const keepC=[...document.querySelectorAll('.crs:checked')].map(i=>i.value);
const keepL=[...document.querySelectorAll('.les:checked')].filter(l=>!keepC.includes(l.dataset.course)).map(l=>l.dataset.course+'/'+l.value);
const t='KEEP+CLEAN COURSES: '+(keepC.join(', ')||'none')+'\\nKEEP+CLEAN INDIVIDUAL LESSONS: '+(keepL.join(', ')||'none');
document.getElementById('out').value=t;try{navigator.clipboard.writeText(t)}catch(_){}}
</script></body></html>`;
fs.writeFileSync(new URL('docs/audits/ACADEMY_CLEANUP_LIST.html', ROOT), page);
console.log(JSON.stringify({ lessons: nL, cleaned: nClean, notCleaned: nNot }));
for (const s of summary) console.log(`${s.cleaned}/${s.lessons}\t${s.course}`);
