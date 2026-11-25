import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const q = encodeURIComponent(process.argv[2]);
const r = await (await fetch(`https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } })).json();
console.log(JSON.stringify(r.result, null, 1).slice(0, +process.argv[3] || 4000));
