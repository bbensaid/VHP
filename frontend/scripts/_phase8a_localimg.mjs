// Phase 8a — remove empty image placeholder objects (_type "image", no asset/url/src) from local Sanity import sources
// (frontend/sanity/content, frontend/sanity/temp_holder). Live Sanity already has none (_phase8a_emptyscan.mjs = 0).
// Format-preserving re-emit via detectFmt; refuses a file whose serializer is not reproducible. Backup (no overwrite),
// re-read + JSON.parse verify, one ledger line per removed block. Usage: node scripts/_phase8a_localimg.mjs [--commit]
import fs from 'fs';
import { bkSafe, append, detectFmt, emit, ROOT, COMMIT } from './_phase8a_lib.mjs';
const empty = b => !b.asset && !b.url && !b.src && !b.videoId && !b.file && !b.image_url;
const dirs = ['frontend/sanity/content', 'frontend/sanity/temp_holder'];
for (const d of dirs) for (const name of fs.readdirSync(new URL(d + '/', ROOT)).filter(n => n.endsWith('.json'))) {
  const f = `${d}/${name}`; const t = fs.readFileSync(new URL(f, ROOT), 'utf8');
  let j; try { j = JSON.parse(t); } catch { continue; }
  const removed = [];
  const visit = v => Array.isArray(v) ? v.filter(x => !(x && typeof x === 'object' && x._type === 'image' && empty(x) && removed.push(x))).map(visit)
    : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, visit(x)])) : v;
  const nj = visit(j); if (!removed.length) continue;
  const fmt = detectFmt(t);
  console.log(f, removed.length, 'removed', fmt ? '' : 'FORMAT NOT REPRODUCIBLE - skipped');
  if (!fmt || !COMMIT) continue;
  const nt = emit(nj, fmt); const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  for (const r of removed) append({ part: '8a', doc: `local ${f}`, block_key: r._key || '(no key)', claim: `empty image placeholder (no asset): ${JSON.stringify(r.caption || r.alt || '').slice(0, 200)}`,
    verdict: 'EMPTY_MEDIA', action: 'removed image object from local import source', sources: 'object has no asset/url/src; live Sanity has 0 empty media blocks (_phase8a_emptyscan.mjs)',
    status: ok ? 'FIXED' : 'LEFT', note: `author order (empty image placeholders). backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}` });
}
