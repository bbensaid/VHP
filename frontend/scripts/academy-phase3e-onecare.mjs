// Phase 3e: "OneCare's OneCare, operating under the Vermont All-Payer ACO Model" is stale —
// the All-Payer ACO Model ended 2025-12-31 and OneCare wound down (CMS model page; Vermont Public / VTDigger 2025).
// Usage: node scripts/academy-phase3e-onecare.mjs [--commit]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: rows } = await db.from('lessons').select('id,slug,content_blocks');
for (const r of rows) {
  const s = JSON.stringify(r.content_blocks || '');
  let i = s.indexOf('OneCare');
  while (i >= 0) { console.log(r.slug, r.id, '::', s.slice(i, i + 260)); i = s.indexOf('OneCare', i + 1); }
}
