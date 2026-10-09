// Phase 8b — delete empty audio placeholder blocks (type "audio_slot", no uploaded audio) from the phase-8b lessons'
// Supabase fallbacks (lessons.content_blocks), their empty audio_slots rows (uploaded_url null), and local source JSON.
// Author order 2026-10-09: empty image/media placeholders are deleted. Usage: node scripts/_phase8b_audio.mjs [--commit]
import fs from 'fs';
import { db, COMMIT, ROOT, bkSafe, append, detectFmt, emit, same } from './_phase8b_lib.mjs';
const LESSONS = { '933671b6-3696-4c5c-9a1d-79820679c1e1': 'medicaid-managed-care-organizations', 'd2b1dd6b-0b0e-4d92-b4a2-345963cd6e25': 'medicaid-quality-measures', 'b598118f-dc2c-4d59-9aea-7659bcdaba6d': 'medicare-star-ratings' };
const { data: slots } = await db.from('audio_slots').select('*').in('lesson_id', Object.keys(LESSONS));
const labels = new Set(); const empty = slots.filter(s => !s.uploaded_url && !s.transcript_url);
if (empty.length !== slots.length) throw new Error('a slot has uploaded audio — refusing');
const isPh = b => b && typeof b === 'object' && !Array.isArray(b) && b.type === 'audio_slot';
const SRC = 'Supabase audio_slots rows for these lessons: uploaded_url null, transcript_url null (checked 2026-10-09); ContentBlockRenderer renders audio_slot as an empty upload placeholder';
for (const [id, slug] of Object.entries(LESSONS)) {
  const { data: row } = await db.from('lessons').select('*').eq('id', id).single();
  const removed = (row.content_blocks || []).filter(isPh); const nv = row.content_blocks.filter(b => !isPh(b));
  removed.forEach(b => labels.add(b.label));
  console.log('SUPABASE', slug, 'remove', removed.map(b => b.label), 'blocks', row.content_blocks.length, '->', nv.length);
  if (!COMMIT || !removed.length) continue;
  const bk = bkSafe(`supabase-lessons-${id}.json`, JSON.stringify(row, null, 2));
  const { error } = await db.from('lessons').update({ content_blocks: nv }).eq('id', id); if (error) throw error;
  const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', id).single();
  const ok = same(r2.content_blocks, nv);
  removed.forEach(b => append({ doc: `supabase lessons ${id} (${slug}) content_blocks`, block_key: 'audio_slot', claim: `empty audio placeholder: "${b.label}"`, verdict: 'EMPTY_MEDIA', action: 'removed audio_slot block', sources: SRC, status: ok ? 'FIXED' : 'LEFT', note: `Backup ${bk}; ${ok ? 're-fetched and verified' : 'VERIFY FAILED'}.` }));
}
for (const s of empty) {
  console.log('AUDIO_SLOTS row', s.id, s.label);
  if (!COMMIT) continue;
  const bk = bkSafe(`supabase-audio_slots-${s.id}.json`, JSON.stringify(s, null, 2));
  const { error } = await db.from('audio_slots').delete().eq('id', s.id); if (error) throw error;
  const { data: r2 } = await db.from('audio_slots').select('id').eq('id', s.id);
  append({ doc: `supabase audio_slots ${s.id} (${LESSONS[s.lesson_id]})`, block_key: 'audio_slot', claim: `empty audio slot row: "${s.label}"`, verdict: 'EMPTY_MEDIA', action: 'deleted empty audio_slots row', sources: SRC, status: r2.length === 0 ? 'FIXED' : 'LEFT', note: `Backup ${bk}; ${r2.length === 0 ? 're-queried, gone' : 'DELETE FAILED'}.` });
}
// local copies: drop audio_slot objects whose label is one of the removed ones
const files = []; const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (p.endsWith('.json')) files.push(p); } };
['frontend/content', 'frontend/sanity'].forEach(scan);
const mine = b => isPh(b) && [...labels, ...empty.map(s => s.label)].includes(b.label);
const strip = (v, n) => Array.isArray(v) ? v.filter(x => mine(x) ? (n.c++, false) : true).map(x => strip(x, n)) : (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, strip(x, n)])) : v;
for (const f of files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); if (!t.includes('audio_slot')) continue;
  let d; try { d = JSON.parse(t); } catch { continue; }
  const n = { c: 0 }; const want = strip(d, n); if (!n.c) continue;
  const fmt = detectFmt(t); let nt;
  if (fmt) nt = emit(want, fmt);
  else { nt = t; for (const l of [...labels]) { const e = JSON.stringify(l).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      nt = nt.replace(new RegExp(`,\\s*\\{[^{}]*"type":\\s*"audio_slot"[^{}]*"label":\\s*"${e}"[^{}]*\\}`, 'g'), '').replace(new RegExp(`,\\s*\\{[^{}]*"label":\\s*"${e}"[^{}]*"type":\\s*"audio_slot"[^{}]*\\}`, 'g'), ''); }
    if (!same(JSON.parse(nt), want)) { console.log('LOCAL text strip mismatch, NOT written', f); continue; } }
  console.log('LOCAL', f, 'remove', n.c);
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  append({ doc: `local ${f}`, block_key: 'audio_slot', claim: `${n.c} empty audio placeholder(s): ${[...labels].join(' | ')}`, verdict: 'EMPTY_MEDIA', action: 'removed audio_slot block(s)', sources: SRC, status: ok ? 'FIXED' : 'LEFT', note: `Backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}.` });
}
