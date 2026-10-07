// Phase 3c: read-only dump of all Supabase lessons (id, slug, title, sanity_slug, content_blocks) to a JSON file.
// Usage: node scripts/academy-phase3c-dump.mjs <outfile>
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const all = [];
for (let from = 0; ; from += 500) {
  const { data, error } = await db.from('lessons').select('*').range(from, from + 499);
  if (error) throw error;
  all.push(...data);
  if (data.length < 500) break;
}
fs.writeFileSync(process.argv[2], JSON.stringify(all));
console.log('lessons', all.length);
