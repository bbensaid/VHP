// 2026-10-12: insert "Running the Sequencing Test" as Transformation Leadership lesson 4.
// Body lives in Sanity (frontend/content/_lesson_tl_sequencing_test.py). Idempotent: re-running
// detects the existing row and only re-asserts sanity_slug.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const SLUG = 'tl-running-the-sequencing-test';
const { data: anchor } = await sb.from('lessons').select('track_id').eq('slug', 'tl-building-the-pmo').single();
const { data: ls } = await sb.from('lessons').select('id,slug,order').eq('track_id', anchor.track_id).order('order');
fs.writeFileSync(`../sanity-backups/tl-track-orders-${Date.now()}.json`, JSON.stringify(ls));
const existing = ls.find(l => l.slug === SLUG);
if (existing) {
  await sb.from('lessons').update({ sanity_slug: SLUG }).eq('id', existing.id);
  console.log('exists at order', existing.order, '— sanity_slug re-asserted'); process.exit(0);
}
for (const l of [...ls].filter(l => l.order >= 4).sort((a, b) => b.order - a.order)) {
  const { error } = await sb.from('lessons').update({ order: l.order + 1 }).eq('id', l.id);
  if (error) throw error; console.log('moved', l.slug, l.order, '->', l.order + 1);
}
const row = {
  track_id: anchor.track_id, pillar: 'operations', order: 4, slug: SLUG,
  title: 'Running the Sequencing Test: A Portfolio Register Workshop',
  summary: "A hands-on companion to the book's Chapter 15: build a portfolio register, run the Portfolio Manager's four-step sequencing test against it, and read the verdicts alongside the risk register — worked on Vermont's 19 components and contrasted with the HealthCare.gov and Cover Oregon launches.",
  estimated_minutes: 25,
  objectives: [
    'Build a portfolio register with the five fields the sequencing test needs',
    "Apply the four-step sequencing test and name each component's verdict",
    'Explain why design work and stand-alone care-model work do not wait for a gate',
    "Interpret Vermont's Fall 2026 results and identify where schedule pressure belongs",
    'Use the HealthCare.gov and Cover Oregon reviews to argue for a single owner of portfolio sequencing',
  ],
  content_blocks: [{ type: 'text', heading: 'Running the Sequencing Test', body: "This lesson's full content is delivered from the Academy's rich lesson body. Run the Portfolio Sequencing Test at /portfolio-sequencing-test." }],
  tags: ['PMO', 'portfolio-management', 'sequencing', 'hands-on', 'transformation-leadership'],
  related_lesson_ids: [], is_published: true, sanity_slug: SLUG,
};
const { data: ins, error: e1 } = await sb.from('lessons').insert(row).select('id').single();
if (e1) throw e1; console.log('inserted lesson', ins.id);
const { data: qz, error: e2 } = await sb.from('quizzes').insert({ lesson_id: ins.id, passing_score: 75, shuffle_options: true }).select('id').single();
if (e2) throw e2;
const QS = [
  ['In the Vermont, Fall 2026 run of the sequencing test, the statewide AI-governance framework has a FY2028 adoption target, has not started, and its Technology gate is open. What does the test conclude?',
   'The test never uses the calendar target to decide a verdict. A component whose gate is open and that is not running is late by dependency order, however distant its deadline.',
   [['It is late by dependency order, because nothing upstream is holding it', true], ['It is correctly waiting, because its deadline is two years away', false], ['It is running ahead of its gate', false], ['It cannot be assessed until the Economics gate opens', false]]],
  ['While the Technology gate is still closed, Economics payment-model design work is underway. What verdict does the sequencing test give it?',
   "Book Chapter 1's Economics-as-design rule: specifying what the payment model must measure runs in parallel with the Technology stage. Only implementation waits for the gate.",
   [['Design in parallel — allowed and useful', true], ['Running ahead of its gate', false], ['Correctly waiting — it should not have started', false], ['Late by dependency order', false]]],
  ["What did the HHS Office of Inspector General's 2016 case study identify as the most critical misstep in the HealthCare.gov launch?",
   'The OIG found that the absence of clear leadership caused delays in decisionmaking, and that no entity formally served as systems integrator — the gap a portfolio owner exists to close.',
   [['The absence of clear leadership, which delayed decisions', true], ['Insufficient federal appropriations for the website', false], ['A shortage of server hosting capacity alone', false], ['States refusing to share eligibility data', false]]],
];
for (const [i, [question, explanation, opts]] of QS.entries()) {
  const { data: q, error } = await sb.from('quiz_questions').insert({ quiz_id: qz.id, order: i + 1, question_type: 'single_choice', question, explanation, points: 1 }).select('id').single();
  if (error) throw error;
  const { error: eo } = await sb.from('quiz_options').insert(opts.map(([text, is_correct], j) => ({ question_id: q.id, text, is_correct, order: j + 1 })));
  if (eo) throw eo;
}
console.log('quiz created with', QS.length, 'questions');
