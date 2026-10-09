// Phase 8b — apply a JSON spec of exact string pairs via applyEverywhere (Sanity fields + Supabase cols + local files),
// for corrections that live outside a single Sanity block (quiz rows, fallback rows, repeated sentences).
// Usage: node scripts/_phase8b_everywhere.mjs <spec.json> [--commit]
// spec: { pairs:[{old,new,claim,verdict,src,note}], sanityIds:[], supa:[{table,col,ids}], files:[], residue:[] }
import fs from 'fs';
import { applyEverywhere } from './_phase8b_lib.mjs';
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
await applyEverywhere(spec);
