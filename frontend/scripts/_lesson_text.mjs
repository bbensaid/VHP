// Dump plain text of Sanity lesson bodies (by Supabase lesson slug list on argv) for fact review.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const strs = (o, out = []) => { if (typeof o === 'string') { if (o.length > 25 && !/^[a-z0-9_-]+$/i.test(o) && !o.startsWith('http')) out.push(o); } else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) if (!k.startsWith('_') || k === '_text') strs(v, out); return out; };
for (const slug of process.argv.slice(2)) {
  const { data: l } = await sb.from('lessons').select('id,title,slug,sanity_slug,content_blocks').eq('slug', slug).single();
  let doc = null;
  if (l?.sanity_slug) {
    const q = encodeURIComponent(`*[_type=="academyModule" && slug.current==$s][0]`);
    doc = (await (await fetch(`https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/production?query=${q}&$s="${l.sanity_slug}"`, { headers: { Authorization: `Bearer ${env.SANITY_API_TOKEN}` } })).json()).result;
  }
  const { data: qs } = await sb.from('quiz_questions').select('question_text,explanation,quiz_options(option_text,is_correct)').eq('lesson_id', l.id);
  console.log(`\n######## ${l.title} (${slug}) sanity=${l.sanity_slug} doc=${doc?._id ?? 'NONE'}`);
  console.log([...new Set(strs(doc ?? l.content_blocks))].join('\n'));
  for (const q of qs ?? []) console.log('Q:', q.question_text, '| A:', (q.quiz_options ?? []).filter((o) => o.is_correct).map((o) => o.option_text).join('; '), '| E:', q.explanation);
}
