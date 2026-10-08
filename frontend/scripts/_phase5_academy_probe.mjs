import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data: c, error: e1 } = await db.from("courses").select("*").in("slug", ["welcome-htr-framework","five-pillars-one-imperative"]);
console.log(e1?.message, JSON.stringify(c?.map(x=>({id:x.id,slug:x.slug,title:x.title,pub:x.is_published,desc:x.description})),null,1));
for (const course of c||[]) {
  const { data: t, error: e2 } = await db.from("tracks").select("id,slug,title,is_published,order").eq("course_id", course.id);
  console.log(course.slug, e2?.message, JSON.stringify(t));
  for (const tr of t||[]) {
    const { data: l, error: e3 } = await db.from("lessons").select("*").eq("track_id", tr.id);
    if (course.slug==="welcome-htr-framework") console.log(e3?.message, JSON.stringify(l,null,1));
    else console.log(tr.slug, (l||[]).length);
  }
}
