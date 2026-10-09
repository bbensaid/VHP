// Phase 8a — remove empty media placeholder blocks (no asset / url / src) from Sanity docs, and the identical
// placeholder objects (matched by _type + _key + caption) from Supabase lessons.content_blocks and local source JSON.
// Usage: node scripts/_phase8a_media.mjs [--commit] <docId>:<blockKey> ...
// Guards: the Sanity block must be a media type with no asset/url/src; body must stay >= 20 blocks; backup before write;
// re-fetch verifies the key is gone. One ledger line per target.
import fs from 'fs';
import { db, getDoc, mutate, bkSafe, append, same, detectFmt, emit, ROOT, COMMIT } from './_phase8a_lib.mjs';
const MEDIA = new Set(['image', 'video', 'videoEmbed', 'audio', 'audioBlock', 'media', 'embed', 'youtube', 'podcast']);
const empty = b => !b.asset && !b.url && !b.src && !b.videoId && !b.file;
const targets = process.argv.slice(2).filter(a => !a.startsWith('--')).map(a => { const i = a.lastIndexOf(':'); return { id: a.slice(0, i), key: a.slice(i + 1) }; });
const removed = []; // {_type,_key,caption}
for (const { id, key } of targets) {
  const doc = await getDoc(id); if (!doc) { console.log('MISSING', id); continue; }
  const b = doc.body?.find(x => x._key === key);
  if (!b) { console.log('already removed', id, key); continue; }
  if (!MEDIA.has(b._type) || !empty(b)) { console.log('GUARD: not an empty media block', id, key, b._type); continue; }
  removed.push({ _type: b._type, _key: key, caption: b.caption ?? null });
  const n = doc.body.length - 1;
  console.log('SANITY', id, key, b._type, 'blocks after', n, n < 20 ? 'WARNING <20' : '');
  if (!COMMIT || n < 20) continue;
  const bk = bkSafe(`sanity-${id}.json`, JSON.stringify(doc, null, 2));
  await mutate([{ patch: { id, ifRevisionID: doc._rev, unset: [`body[_key=="${key}"]`] } }]);
  const back = await getDoc(id); const ok = !back.body.some(x => x._key === key) && back.body.length === n;
  console.log('  verify', ok, bk);
  append({ doc: `sanity ${doc._type} ${id}`, block_key: key, claim: `empty ${b._type} placeholder (no asset): "${String(b.alt || b.caption || '').slice(0, 200)}"`, verdict: 'EMPTY_MEDIA', action: 'block removed', sources: 'Sanity doc: block has no asset/url/src; renderer shows nothing or a broken frame', status: ok ? 'FIXED' : 'LEFT', note: `body ${doc.body.length} -> ${back.body.length} blocks; backup ${bk}; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}`, part: '8a' });
}
// mirrors
const isTarget = v => v && typeof v === 'object' && !Array.isArray(v) && removed.some(r => v._type === r._type && v._key === r._key && (v.caption ?? null) === r.caption) && empty(v);
const strip = (v, c) => Array.isArray(v) ? v.filter(x => !(isTarget(x) && ++c.n)).map(x => strip(x, c)) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, strip(x, c)])) : v;
if (removed.length) {
  const all = async (t, sel) => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
  for (const row of await all('lessons', 'id,slug,content_blocks')) {
    const c = { n: 0 }; const nv = strip(row.content_blocks, c); if (!c.n) continue;
    console.log('SUPABASE lessons', row.id, row.slug, c.n);
    if (!COMMIT) continue;
    const { data: full } = await db.from('lessons').select('*').eq('id', row.id).single();
    const bk = bkSafe(`supabase-lessons-${row.id}.json`, JSON.stringify(full, null, 2));
    const { error } = await db.from('lessons').update({ content_blocks: nv }).eq('id', row.id); if (error) throw error;
    const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single(); const ok = same(r2.content_blocks, nv);
    append({ doc: `supabase lessons ${row.id} ${row.slug} content_blocks`, block_key: 'mirror', claim: 'empty image placeholder(s) mirrored in fallback content', verdict: 'EMPTY_MEDIA', action: `removed ${c.n} placeholder object(s)`, sources: 'see Sanity lines above', status: ok ? 'FIXED' : 'LEFT', note: `backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}`, part: '8a' });
  }
  const files = []; const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (p.endsWith('.json')) files.push(p); } };
  ['frontend/content', 'frontend/sanity'].forEach(scan);
  for (const f of files) {
    const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); let parsed; try { parsed = JSON.parse(t); } catch { continue; }
    const c = { n: 0 }; const want = strip(parsed, c); if (!c.n) continue;
    const fmt = detectFmt(t); let nt = fmt ? emit(want, fmt) : null;
    if (!nt) { // raw: cut each matching object literal (plus one adjoining comma) and prove the result equals the structural edit
      nt = t;
      for (const r of removed) for (const enc of [s => JSON.stringify(s).slice(1, -1), s => JSON.stringify(s).slice(1, -1).replace(/[\u0080-￿]/g, ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'))]) {
        for (;;) {
          const at = nt.indexOf(enc(r.caption)); if (at < 0) break;
          const a = nt.lastIndexOf('{', at), b = nt.indexOf('}', at) + 1; let s0 = a, e0 = b;
          const before = nt.slice(0, s0).match(/,\s*$/); if (before) s0 -= before[0].length; else { const after = nt.slice(e0).match(/^\s*,/); if (after) e0 += after[0].length; }
          nt = nt.slice(0, s0) + nt.slice(e0);
        }
      }
      let got; try { got = JSON.parse(nt); } catch { got = null; }
      if (!got || !same(got, want)) { console.log('LOCAL raw edit mismatch, NOT written', f); continue; }
    }
    console.log('LOCAL', f, c.n);
    if (!COMMIT) continue;
    const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
    fs.writeFileSync(new URL(f, ROOT), nt);
    let ok = true; try { ok = same(JSON.parse(fs.readFileSync(new URL(f, ROOT), 'utf8')), want); } catch { ok = false; }
    append({ doc: `local ${f}`, block_key: 'mirror', claim: 'empty image placeholder(s) in local source', verdict: 'EMPTY_MEDIA', action: `removed ${c.n} placeholder object(s)`, sources: 'see Sanity lines above', status: ok ? 'FIXED' : 'LEFT', note: `backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}`, part: '8a' });
  }
}
