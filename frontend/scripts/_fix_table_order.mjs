// Re-post Academy object-array tables as JSON strings with an explicit column order.
// Input: ../book-audit/deep/academy_tables.json (id, key, order). Backs up every doc first.
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const DRY = process.argv.includes('--dry');
const plan = JSON.parse(fs.readFileSync('../book-audit/deep/academy_tables.json', 'utf8'));
const byDoc = {};
for (const p of plan) (byDoc[p.id] ||= []).push(p);
for (const [id, items] of Object.entries(byDoc)) {
  const doc = (await (await fetch(`${API}/doc/production/${id}`, { headers: H })).json()).documents[0];
  let changed = 0;
  const body = doc.body.map((b) => {
    const it = items.find((x) => x.key === b._key);
    if (!it || !Array.isArray(b.code)) return b;
    const rows = b.code.map((r) => Object.fromEntries(it.order.map((k) => [k, r[k]])));
    // every cell must survive unchanged
    for (let i = 0; i < rows.length; i++) for (const k of it.order) if (rows[i][k] !== b.code[i][k]) throw new Error(`cell mismatch ${id} ${k}`);
    changed++;
    return { ...b, code: JSON.stringify(rows) };
  });
  console.log(id, 'tables', changed);
  if (DRY || !changed) continue;
  fs.writeFileSync(`../sanity-backups/table-order-${id}-${Date.now()}.json`, JSON.stringify(doc));
  const r = await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id, set: { body } } }] }) });
  console.log('  ->', r.status);
}
