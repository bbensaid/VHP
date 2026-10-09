// Phase 8a read-only (copy of _phase7b_extract.mjs): write compact per-block text of each listed academyModule doc to <outdir>/<docId>.txt (for claim review).
// Usage: node scripts/_phase7b_extract.mjs <outdir> <docId>...   (or --todo to take the unswept list from _phase7b_coverage logic)
import fs from 'fs';
import { getDoc } from './_phase8a_lib.mjs';
const [outdir, ...ids] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const txt = v => typeof v === 'string' ? v : Array.isArray(v) ? v.map(txt).join(' | ') : v && typeof v === 'object'
  ? (v._type === 'span' ? v.text : Object.entries(v).filter(([k]) => !['_key', '_type', 'marks', 'markDefs', 'style', 'level', 'listItem', '_ref'].includes(k)).map(([k, x]) => (typeof x === 'string' && k !== 'text' ? `${k}=` : '') + txt(x)).join(' ')) : String(v ?? '');
for (const id of ids) {
  const d = await getDoc(id); if (!d) { console.log('MISSING', id); continue; }
  const lines = [`# ${id} | ${d.title} | course=${d.courseTitle} | blocks=${d.body?.length}`, `summary: ${d.summary || ''}`, `objectives: ${(d.learningObjectives || []).join(' | ')}`];
  for (const b of d.body || []) {
    const t = b._type === 'block' ? (b.children || []).map(c => c.text).join('') + ((b.markDefs || []).filter(m => m.href).map(m => ` <${m.href}>`).join('')) : txt(b);
    lines.push(`[${b._key}|${b._type}${b.style && b.style !== 'normal' ? ':' + b.style : ''}${b.listItem ? ':li' : ''}] ${t}`);
  }
  fs.writeFileSync(`${outdir}/${id}.txt`, lines.join('\n') + '\n');
}
console.log('wrote', ids.length);
