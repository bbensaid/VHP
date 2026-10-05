// 2026-10-04: correct every remaining "six pillars" reference in Academy data
// (Supabase) to the five pillars + the Equity Imperative. Backs up first.
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const read = (f) => Object.fromEntries(fs.readFileSync(f, "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }));
const env = read(".env.local");
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const APPLY = process.argv.includes("--apply");
const get = async (t, id) => (await sb.from(t).select("*").eq("id", id).single()).data;

const rows = {
  c_hie: ["courses", "0dec507b-079f-41e7-ad2a-d68fdddcc852"],
  c_welcome: ["courses", "44289b0d-2b1e-4438-a0ab-a7b28b9182aa"],
  t_precision: ["tracks", "0bd2c1c9-3680-4077-abf3-affb58a6a23d"],
  l_welcome: ["lessons", "27d44eb8-6369-40ba-94cb-3a500db23497"],
  l_workforce: ["lessons", "d9e658ad-bab0-4eb9-b27c-ebfba936dc66"],
  q: ["quiz_questions", "0260e09c-4c7b-4a21-8943-fd88a7ad13f4"],
  o1: ["quiz_options", "99f29c15-acf8-4f18-8084-ca2673ffeb5c"],
  o2: ["quiz_options", "af6a1099-ed43-4db2-af07-e274941ce92d"],
  o3: ["quiz_options", "886f13ed-039a-48a1-9f50-9eecda4c9860"],
};
const before = {};
for (const [k, [t, id]] of Object.entries(rows)) before[k] = await get(t, id);
const stamp = Date.now();
fs.writeFileSync(`../sanity-backups/supabase-six-pillar-fix-${stamp}.json`, JSON.stringify(before, null, 2));
console.log("backup written");

const sub = (s, a, b) => { if (!s.includes(a)) throw new Error("missing: " + a.slice(0, 60)); return s.split(a).join(b); };
const updates = [];

// Courses
updates.push(["c_hie", {
  subtitle: "Your foundation in the five pillars of health transformation and the Equity Imperative",
  description: sub(before.c_hie.description,
    "Built on the HTR six-pillar framework, this course gives you working fluency in Policy, Technology, Economics, Clinical quality, Health Equity, and Operations.",
    "Built on the HTR five-pillar framework, this course gives you working fluency in Policy, Technology, Economics, Clinical quality and Operations, each held to the Equity Imperative."),
}]);
updates.push(["c_welcome", {
  subtitle: "Your orientation to the five-pillar framework",
  description: sub(before.c_welcome.description, "the HTR six-pillar framework and your role", "the HTR five-pillar framework, the Equity Imperative, and your role"),
}]);
updates.push(["t_precision", { description: sub(before.t_precision.description, "covering the six pillars of precision medicine.", "covering the core domains of precision medicine.") }]);

// Welcome lesson: rebuild the six-card grid as five pillars + the Equity Imperative.
{
  const L = before.l_welcome;
  const blocks = structuredClone(L.content_blocks);
  blocks[1].body = sub(blocks[1].body, "when they understand all six dimensions.", "when they understand all five pillars and the Equity Imperative that tests every one of them.");
  const grid = blocks[2];
  const byTitle = Object.fromEntries(grid.items.map((it) => [it.title, it]));
  grid.heading = "The five pillars, in the order transformation has to happen";
  grid.items = ["Policy", "Technology", "Economics", "Clinical", "Operations"].map((t) => byTitle[t]);
  const equity = { type: "callout", variant: "info", heading: "The Equity Imperative: not a sixth pillar",
    body: "Equity is the test applied to every pillar, at every stage: is it just? " + byTitle["Equity"].body };
  blocks.splice(3, 0, equity);
  blocks[4].body = sub(blocks[4].body, "data completeness across populations (Equity)", "data completeness across populations (the Equity Imperative)");
  updates.push(["l_welcome", {
    summary: "Orientation to the HTR five-pillar framework, the Equity Imperative, and your role in the health reform ecosystem.",
    objectives: L.objectives.map((o) => o.id === "obj_w1" ? { ...o, text: "Understand the HTR five-pillar framework, the Equity Imperative, and how the pillars interconnect" } : o),
    tags: L.tags.map((t) => (t === "six-pillars" ? "five-pillars" : t)),
    content_blocks: blocks,
  }]);
}
// Workforce lesson
{
  const L = before.l_workforce;
  const blocks = structuredClone(L.content_blocks);
  blocks[1].body = sub(blocks[1].body, "broad literacy across all six pillars", "broad literacy across all five pillars and the Equity Imperative");
  updates.push(["l_workforce", {
    summary: sub(L.summary, "across all six pillars.", "across all five pillars and the Equity Imperative."),
    objectives: L.objectives.map((o) => o.id === "obj_o2" ? { ...o, text: "Understand the skills most in demand across the five pillars" } : o),
    content_blocks: blocks,
  }]);
}
// Quiz
updates.push(["q", { question: sub(before.q.question, "the six HTR pillars", "the five HTR pillars") }]);
updates.push(["o1", { text: sub(before.o1.text, "The six pillars", "The five pillars") }]);
updates.push(["o2", { text: sub(before.o2.text, "all six HIE pillars", "all five HTR pillars and the Equity Imperative") }]);
updates.push(["o3", { text: sub(before.o3.text, "all six HTR pillars", "all five HTR pillars and the Equity Imperative") }]);

for (const [k, patch] of updates) {
  const [t, id] = rows[k];
  const left = JSON.stringify(patch).match(/\b(six|6)[\s-]+(?:[A-Za-z]+[\s-]+)?pillars?\b/gi)?.filter((m) => !/not a sixth/i.test(m));
  console.log(k, Object.keys(patch).join(","), left?.length ? "STILL HAS: " + left : "ok");
  if (APPLY) { const { error } = await sb.from(t).update(patch).eq("id", id); if (error) throw new Error(k + ": " + error.message); }
}
console.log(APPLY ? "APPLIED" : "dry run");
