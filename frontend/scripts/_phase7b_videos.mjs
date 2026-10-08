// Phase 7b: remove fabricated YouTube "video" blocks from Academy lesson fallbacks (Supabase lessons.content_blocks)
// and their local source JSON. Each videoId was oEmbed-checked 2026-10-08: 14 return 404 (no such video); 3 resolve
// to unrelated videos whose title/channel contradict the caption (TED/Buolamwini, Simplilearn, vlogbrothers).
// Usage: node scripts/_phase7b_videos.mjs [--commit]
import fs from 'fs';
import { db, COMMIT, ROOT, bkSafe, append, detectFmt, emit } from './_phase7b_lib.mjs';
const BAD = {
  kNQdQjiqv2s: '404', 'aSFP6-mguYU': '404', 'm2O3nb-gKgI': '404', '8q1V9RB-B5I': '404', Z7hGgqm26LE: '404',
  i9e5WzEQQks: '404', nLxuBmUvOEQ: '404', '3cBhsHb4Sp4': '404', d7OdKQwTyKo: '404', LGHlUA0p0kI: '404',
  SExDNF83fvQ: '404', '9RqI7OBH_mk': '404', i2r_g7MDTBY: '404', x2hzI9rJMpg: '404',
  UG_X_7g63rY: 'resolves to "How I\'m fighting bias in algorithms" (Joy Buolamwini, TED), not a STAT News/Harvard explainer',
  ukzFI9rgwfU: 'resolves to a Simplilearn "What Is Machine Learning?" video, not an MIT medicine overview',
  qSjGouBmo0M: 'resolves to vlogbrothers "Why Are American Health Care Costs So High?", not a Vox explainer',
};
const isBad = b => b && typeof b === 'object' && !Array.isArray(b) && BAD[b.videoId];
const strip = (v, removed) => Array.isArray(v) ? v.filter(x => isBad(x) ? (removed.push(x), false) : true).map(x => strip(x, removed))
  : (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, strip(x, removed)])) : v;
const SRC = 'YouTube oEmbed endpoint https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id> checked 2026-10-08';
const logIt = (target, b, ok, bk) => append({ doc: target, block_key: `video ${b.videoId}`, claim: `video block: "${b.caption}" (youtube ${b.videoId})`,
  verdict: 'FABRICATED', action: 'removed video block', sources: SRC, status: ok ? 'FIXED' : 'LEFT',
  note: `Video ${BAD[b.videoId] === '404' ? 'does not exist (oEmbed 404)' : BAD[b.videoId]}. Fallback content only (live lesson renders the Sanity body). Backup: ${bk}; ${ok ? 're-fetched and verified' : 'VERIFY FAILED'}.` });

const { data: rows, error } = await db.from('lessons').select('id,slug,sanity_slug,content_blocks'); if (error) throw error;
for (const row of rows) {
  if (!JSON.stringify(row.content_blocks || '').match(new RegExp(Object.keys(BAD).join('|')))) continue;
  const removed = []; const nv = strip(row.content_blocks, removed);
  console.log('SUPABASE', row.slug, 'remove', removed.map(b => b.videoId));
  if (!COMMIT || !removed.length) continue;
  const bk = bkSafe(`supabase-lessons-${row.id}.json`, JSON.stringify(row, null, 2));
  const { error: ue } = await db.from('lessons').update({ content_blocks: nv }).eq('id', row.id); if (ue) throw ue;
  const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
  const ok = !Object.keys(BAD).some(id => JSON.stringify(r2.content_blocks).includes(id)) && r2.content_blocks.length === nv.length;
  removed.forEach(b => logIt(`supabase lessons ${row.id} (${row.slug}) content_blocks`, b, ok, bk));
}
const FILES = ['course_seed.json', 'courses_tier1.json', 'course_medicaid_101.json', 'course_health_equity.json', 'course_value_based_care.json', 'course_ai_healthcare.json', 'expand_equity.json'].map(f => 'frontend/content/' + f);
for (const f of FILES) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const fmt = detectFmt(t);
  const removed = []; const want = strip(JSON.parse(t), removed); let nt;
  if (fmt) nt = emit(want, fmt);
  else { // mixed-escape file: remove the object text in place, then prove the result equals the structural strip
    nt = t; for (const id of Object.keys(BAD)) { const e = id.replace(/[-]/g, '\\-');
      nt = nt.replace(new RegExp(`,\\s*\\{[^{}]*"videoId":\\s*"${e}"[^{}]*\\}`, 'g'), '').replace(new RegExp(`\\{[^{}]*"videoId":\\s*"${e}"[^{}]*\\}\\s*,`, 'g'), ''); }
    if (JSON.stringify(JSON.parse(nt)) !== JSON.stringify(want)) throw new Error('text strip mismatch ' + f);
  }
  console.log('LOCAL', f, 'remove', removed.map(b => b.videoId));
  if (!COMMIT || !removed.length) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  removed.forEach(b => logIt(`local ${f}`, b, ok, bk));
}
