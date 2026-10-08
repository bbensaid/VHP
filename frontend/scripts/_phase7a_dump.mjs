import { getDoc } from './_phase7a_lib.mjs';
import fs from 'fs';
const out = process.argv[2];
const ids = process.argv.slice(3);
const strs = (v, acc = []) => { if (typeof v === 'string') acc.push(v); else if (Array.isArray(v)) v.forEach(x => strs(x, acc)); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (['_key','_type','style','listItem','marks','_ref','markDefs'].includes(k)) continue; strs(x, acc); } return acc; };
for (const id of ids) {
  const d = await getDoc(id);
  let t = `# ${id} (${d._type}) ${d.title}\n`;
  for (const k of Object.keys(d)) if (!['body','_id','_type','_rev','_createdAt','_updatedAt','title'].includes(k) && typeof d[k] === 'string' && d[k].length > 30) t += `[${k}] ${d[k]}\n`;
  for (const b of d.body || []) { const ld = (b.markDefs||[]).filter(m=>m.href).map(m=>m.href); t += `[${b._key}|${b._type}${b.style&&b.style!=='normal'?':'+b.style:''}] ${strs(b).join(' ¦ ')}${ld.length?' LINKS:'+ld.join(','):''}\n`; }
  fs.writeFileSync(`${out}/${id}.txt`, t); console.log(id, t.length);
}
