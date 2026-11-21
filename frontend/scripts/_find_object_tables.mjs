// Read-only: list Academy code-block tables stored as object arrays (column order = Sanity key order).
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const nd = await (await fetch(`${API}/export/production`, { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } })).text();
const docs = nd.split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((d) => !d._id.startsWith('drafts.'));
const out = [];
for (const d of docs) {
  for (const b of (d.body || [])) {
    if (b._type !== 'code') continue;
    if (Array.isArray(b.code) && b.code.length && typeof b.code[0] === 'object') {
      const keys = Object.keys(b.code[0]).filter((k) => k !== '_key' && k !== '_type');
      const sorted = [...keys].sort((a, c) => a.localeCompare(c));
      out.push({ id: d._id, slug: d.slug?.current, type: d._type, key: b._key, title: b.title, keys, alphabetical: JSON.stringify(keys) === JSON.stringify(sorted) });
    }
  }
}
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.log('object tables', out.length, 'alphabetical', out.filter((x) => x.alphabetical).length, 'docs', new Set(out.map((x) => x.id)).size);
