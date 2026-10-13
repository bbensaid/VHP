import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: cs } = await sb.from('courses').select('id,slug,title,is_published,chapter_ref').order('title');
for (const c of cs) console.log('COURSE', c.is_published ? 'pub' : 'UNPUB', c.slug, '|', c.title, '| ch', c.chapter_ref);
const fp = cs.find(c => c.slug === 'five-pillars-one-imperative');
const { data: ts } = await sb.from('tracks').select('id,order,slug,title,is_published').eq('course_id', fp.id).order('order');
for (const t of ts) { const { data: ls } = await sb.from('lessons').select('order,title,is_published').eq('track_id', t.id).order('order'); console.log(' TRACK', t.order, t.title, t.is_published ? '' : 'UNPUB'); for (const l of ls) console.log('    L', l.order, l.title, l.is_published === false ? 'UNPUB' : ''); }
