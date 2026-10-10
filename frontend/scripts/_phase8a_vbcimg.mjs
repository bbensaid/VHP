// Phase 8a — check VBC Modules 2-5 for the empty image placeholder blocks (blk044/blk036/blk039/blk042) and remove any that remain without an asset.
import { query, getDoc, mutate, bkSafe, append, COMMIT } from './_phase8a_lib.mjs';
const KEYS = ['blk044', 'blk036', 'blk039', 'blk042'];
const docs = await query(`*[_type=="academyModule" && (_id match "vbc-fundamentals-module-*" || slug.current match "vbc-fundamentals-module-*")]{_id,title,"n":count(body)}`);
for (const d of docs.sort((a, b) => a._id.localeCompare(b._id))) {
  const doc = await getDoc(d._id);
  const hits = (doc.body || []).filter(b => KEYS.includes(b._key) || b._type === 'image');
  const empty = hits.filter(b => b._type === 'image' && !b.asset?._ref);
  console.log(d._id, '|', d.title, '| blocks', doc.body.length, '| key/image hits', JSON.stringify(hits.map(b => ({ k: b._key, t: b._type, asset: b.asset?._ref || null }))));
  if (!empty.length || !COMMIT) continue;
  if (doc.body.length - empty.length < 20) { console.log('  SKIP: would drop below 20'); continue; }
  const bk = bkSafe(`sanity-${d._id}.json`, JSON.stringify(doc, null, 2));
  await mutate([{ patch: { id: d._id, ifRevisionID: doc._rev, unset: empty.map(b => `body[_key=="${b._key}"]`) } }]);
  const back = await getDoc(d._id); const ok = !back.body.some(b => empty.some(e => e._key === b._key));
  console.log('  removed', empty.map(b => b._key), 'verify', ok);
  append({ doc: `sanity academyModule ${d._id}`, block_key: empty.map(b => b._key).join(','), claim: 'empty image placeholder block (no asset)', verdict: 'FABRICATED', action: 'block removed', sources: 'Sanity body inspected 2026-10-10: _type image with no asset reference', status: ok ? 'FIXED' : 'LEFT', part: '8a', note: `backup ${bk}; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}; blocks ${doc.body.length} -> ${back.body.length}` });
}
