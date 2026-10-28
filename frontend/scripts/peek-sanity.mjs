// Print regex matches (with context) in the live Sanity doc for a slug. Usage: node scripts/peek-sanity.mjs <slug> <regex> [ctx]
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const q = encodeURIComponent(`*[slug.current==$s && !(_id in path("drafts.**"))][0]`);
const r = await (await fetch(`https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/production?query=${q}&$s="${process.argv[2]}"`, { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } })).json();
const s = JSON.stringify(r.result); const re = new RegExp(process.argv[3], 'g'); const c = +(process.argv[4] || 90); let m;
while ((m = re.exec(s))) console.log('…' + s.slice(Math.max(0, m.index - c), m.index + c) + '…');
