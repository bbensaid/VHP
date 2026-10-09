// Phase 7b read-only: find substrings in Supabase lessons/quiz rows (non-VBC) and local content/sanity files.
// Usage: node scripts/_phase7b_grep.mjs "<needle>" ["<needle>" ...]
import fs from 'fs';
import { db, ROOT } from './_phase7b_lib.mjs';
const N = process.argv.slice(2);
const all = async (t, sel) => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
for (const [t, sel] of [['lessons', 'id,slug,summary,content_blocks'], ['quiz_questions', 'id,question,explanation'], ['quiz_options', 'id,text,explanation']]) {
  for (const r of await all(t, sel)) { const s = JSON.stringify(r); for (const n of N) { const i = s.indexOf(n); if (i >= 0) console.log('SUPA', t, r.id, r.slug || '', JSON.stringify(n), '::', s.slice(Math.max(0, i - 100), i + 100)); } }
}
const files = []; const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (/\.(json|py)$/.test(p)) files.push(p); } };
['frontend/content', 'frontend/sanity'].forEach(scan);
for (const f of files) { const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); for (const n of N) { const i = t.indexOf(n); if (i >= 0) console.log('FILE', f, JSON.stringify(n), '::', t.slice(Math.max(0, i - 100), i + 100).replace(/\n/g, ' ')); } }
