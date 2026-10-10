// Phase 8b read-only — map lesson slugs to Supabase id/sanity_slug and Sanity academyModule _id/block count. Usage: node scripts/_phase8b_ids.mjs <slug>...
import { db, query } from './_phase8b_lib.mjs';
for (const s of process.argv.slice(2)) {
  const { data } = await db.from('lessons').select('id,slug,sanity_slug,title').or(`slug.eq.${s},sanity_slug.eq.${s}`);
  for (const l of data) { const d = await query(`*[_type=="academyModule" && slug.current=="${l.sanity_slug}"]{_id,"n":count(body)}`); console.log(s, l.id, l.sanity_slug, JSON.stringify(d)); }
}
