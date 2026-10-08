// dump: node scripts/_phase5_lessons_io.mjs dump <out.json>
// apply: node scripts/_phase5_lessons_io.mjs apply <updates.json>   ({id: {col: value}})
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const [mode, file] = process.argv.slice(2);
if (mode === "dump") {
  let all=[], from=0;
  while (true) { const { data, error } = await db.from("lessons").select("*").range(from, from+499); if (error) throw error; all=all.concat(data); if (data.length<500) break; from+=500; }
  fs.writeFileSync(file, JSON.stringify(all)); console.log("rows", all.length);
} else if (mode === "apply") {
  const upd = JSON.parse(fs.readFileSync(file,"utf8"));
  for (const [id, cols] of Object.entries(upd)) {
    const { error } = await db.from("lessons").update(cols).eq("id", id);
    console.log(id, error ? "ERR "+error.message : "OK");
  }
}
