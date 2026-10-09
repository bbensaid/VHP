// Phase 8b — append ledger lines (one JSON object per line in the given file, or a JSON array) to docs/audits/phase8b_sources_2026-10.jsonl.
// Usage: node scripts/_phase8b_log.mjs <lines.json>
import fs from 'fs';
import { append } from './_phase8b_lib.mjs';
const t = fs.readFileSync(process.argv[2], 'utf8').trim();
const rows = t.startsWith('[') ? JSON.parse(t) : t.split('\n').filter(Boolean).map(l => JSON.parse(l));
for (const r of rows) { for (const k of ['doc', 'claim', 'verdict', 'action', 'status']) if (!r[k]) throw new Error('missing ' + k + ' in ' + JSON.stringify(r)); append(r); }
console.log('appended', rows.length);
