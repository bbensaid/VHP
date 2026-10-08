import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
let all=[]; let from=0;
while (true) { const { data, error } = await db.from("lessons").select("id,slug,title,sanity_slug,is_published,track_id,content_blocks").not("sanity_slug","is",null).range(from, from+999); if (error) { console.error(error.message); process.exit(1);} all=all.concat(data); if (data.length<1000) break; from+=1000; }
const q = encodeURIComponent('*[_type=="academyModule"]{_id,"slug":slug.current,"n":count(body),_updatedAt}');
const r = await fetch(`https://fxz10xl7.api.sanity.io/v2023-10-01/data/query/production?query=${q}`).then(r=>r.json());
const bySlug = new Map(r.result.map(d=>[d.slug,d])); const byId = new Map(r.result.map(d=>[d._id,d]));
const { data: tracks } = await db.from("tracks").select("id,slug,is_published,course_id");
const { data: courses } = await db.from("courses").select("id,slug,is_published");
const tmap=new Map(tracks.map(t=>[t.id,t])); const cmap=new Map(courses.map(c=>[c.id,c]));
const out=[];
for (const l of all) {
  if (bySlug.has(l.sanity_slug)) continue;
  const d = byId.get(l.sanity_slug);
  const t=tmap.get(l.track_id); const c=t&&cmap.get(t.course_id);
  const cb = l.content_blocks||[]; const types = cb.map(b=>b.type);
  const pt = cb.find(b=>b.type==="sanity_portable_text");
  out.push({id:l.id, slug:l.slug, sanity_slug:l.sanity_slug, live: !!(l.is_published&&t?.is_published&&c?.is_published), course:c?.slug, track:t?.slug, docSlug:d?.slug??null, docBlocks:d?.n??null, cbTypes:types.join(","), cbPtBlocks: pt?.body?.length ?? null});
}
console.log(JSON.stringify(out,null,1));
fs.writeFileSync(process.argv[2], JSON.stringify(out));
