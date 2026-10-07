// Phase 3b: mirror phase-3 Sanity corrections into the Supabase content_blocks fallback
// for the five-pillars rows whose wording did not match exactly in phase 3.
// Usage: node scripts/academy-phase3b-fallback-fix.mjs <pairs.json> [--commit]
// pairs.json: {ids:[lessonId...], pairs:[{old,new,entry,sources,type}]}
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { ids, pairs } = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const COMMIT = process.argv.includes('--commit');
const BK = new URL('../../sanity-backups/academy-phase3-2026-10-07/', import.meta.url);
const LOG = new URL('../../docs/audits/academy_phase3b_2026-10.jsonl', import.meta.url);
function walk(x, fn, path = '') {
  if (typeof x === 'string') return fn(x, path);
  if (Array.isArray(x)) return x.map((v, i) => walk(v, fn, `${path}[${i}]`));
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v, fn, `${path}.${k}`)]));
  return x;
}
for (const id of ids) {
  const { data: row, error } = await db.from('lessons').select('*').eq('id', id).single();
  if (error) throw error;
  const hits = [];
  const cb = walk(row.content_blocks, (s, p) => {
    for (const pr of pairs) {
      if (s.includes(pr.old) && !(pr.new.startsWith(pr.old) && s.includes(pr.new))) {
        s = s.split(pr.old).join(pr.new); hits.push({ ...pr, path: 'content_blocks' + p });
      }
    }
    return s;
  });
  console.log(id, row.slug, hits.length, hits.map(h => `${h.entry}@${h.path}`).join(' '));
  if (!COMMIT || !hits.length) continue;
  const bf = new URL(`supabase-lesson-${id}.phase3b.json`, BK);
  if (fs.existsSync(bf)) throw new Error('backup exists: ' + bf.pathname);
  fs.writeFileSync(bf, JSON.stringify(row, null, 2));
  const { error: ue } = await db.from('lessons').update({ content_blocks: cb }).eq('id', id);
  if (ue) throw ue;
  const { data: after } = await db.from('lessons').select('content_blocks').eq('id', id).single();
  const txt = JSON.stringify(after.content_blocks);
  for (const h of hits) {
    const ok = txt.includes(JSON.stringify(h.new).slice(1, -1)) && !txt.includes(JSON.stringify(h.old).slice(1, -1));
    console.log('  verify', h.entry, ok ? 'OK' : 'FAIL');
    fs.appendFileSync(LOG, JSON.stringify({ file_or_doc: `supabase lessons ${id} (${row.slug}) ${h.path}`, old: h.old, new: h.new, sources: h.sources, status: ok ? 'FIXED' : 'LEFT', note: `Unrendered content_blocks fallback mirror of phase-3 entry #${h.entry} (${h.type}); backup ${bf.pathname.split('/').slice(-2).join('/')}; re-fetched and ${ok ? 'verified' : 'VERIFY FAILED'}.` }) + '\n');
  }
}
