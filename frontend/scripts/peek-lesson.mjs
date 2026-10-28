// Print regex matches (with context) in the Supabase lesson row(s) for a sanity_slug. Usage: node scripts/peek-lesson.mjs <sanity_slug> <regex>
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await sb.from('lessons').select('*').eq('sanity_slug', process.argv[2]);
const s = JSON.stringify(data); const re = new RegExp(process.argv[3], 'g'); let m;
while ((m = re.exec(s))) console.log(s.slice(Math.max(0, m.index - 200), m.index + 200), '\n---');
