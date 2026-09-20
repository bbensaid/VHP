#!/usr/bin/env node
// Append the "what earns a place in the matrix" section to Academy Lesson 4,
// so the Academy teaches the same membership rule Chapter 1 §1.4 now states.
//   node scripts/add-matrix-criterion-lesson.mjs           # dry run
//   node scripts/add-matrix-criterion-lesson.mjs --commit
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const P = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_TOKEN;
const ID = 'academyModule-five-pillars-dependency-logic-execution-sequence';
const commit = process.argv.includes('--commit');
const k = () => randomBytes(6).toString('hex');
const b = (text, style = 'normal') => ({
  _key: k(), _type: 'block', style, markDefs: [],
  children: [{ _key: k(), _type: 'span', marks: [], text }],
});

const BLOCKS = [
  b('What earns a place in the matrix', 'h3'),
  b('A dependency matrix is an argument, not an inventory. Without a rule for membership it is just a list of relationships that struck somebody as important, and there is no principled way to answer the question a sceptical reader should ask: why is that cell filled and this one empty?'),
  b('The rule is narrow on purpose. A dependency earns a cell when the downstream pillar cannot produce its intended result until the upstream pillar delivers something specific and nameable. "Cannot" — not "benefits from." The pillar\'s own output — not general goodness. And nameable — you must be able to say what is handed over.'),
  b('Naming it is straightforward, because each pillar issues exactly one kind of thing. Policy issues AUTHORITY: mandate, prohibition, statutory deadline, and the power to appropriate. Technology issues INFORMATION: data that can be trusted, fast enough to act on. Economics issues INCENTIVES: the financial consequence attached to a behaviour. Clinical issues OUTCOMES: care delivered and the measured result. Operations issues CAPACITY: people, credentials, management infrastructure, project discipline.'),
  b('So the test is mechanical. Name what flows, then ask which pillar issues that currency. If it is the upstream pillar, the cell is real. If it is a different pillar, the relationship belongs elsewhere — or it is a cell already in the grid, read backwards.'),
  b('Worked case: why there is no Economics → Technology cell', 'h3'),
  b('The intuition is sound: data infrastructure is expensive, you cannot build an all-payer claims database or a health information exchange without money, and money is surely economics. Trace the money and it comes apart.'),
  b('Vermont\'s technology build is paid for by the Rural Health Transformation Program — $195 million a year for five years — and was to have been supplemented by the EAST Fund under the AHEAD State Agreement, before Vermont withdrew from AHEAD in July 2026. Both are appropriations: sums made available by statute or federal agreement, for named purposes, on a schedule someone else set. An appropriation is an exercise of authority, and authority is issued by Policy. That is why the Policy → Technology relationship is described as funding and authorising the build — the two arrive together because they are the same instrument.'),
  b('What the Economics pillar issues is not money but consequence. Reference-based pricing, global budgets and total-cost-of-care accountability change what an organisation gains or loses by behaving one way rather than another. None of them pays for a server. A state can have a fully articulated incentive architecture and no data infrastructure at all — which is close to what Vermont had under OneCare.'),
  b('This is the distinction between transformation capital and incentive architecture. Bridge funding is time-limited and ends; incentive architecture is permanent and compounds. Vermont\'s AHEAD withdrawal is the demonstration: the EAST Fund was cut from roughly $138 million to a capped $10 million, and Act 68\'s mandates were untouched — because the two were never the same thing.'),
  b('Applied honestly, the rule will sometimes delete a cell you are fond of. That is the point of having one. If you disagree with any of the nine relationships, you now have something specific to argue with: name the currency, and name its issuer.'),
];

const cur = await (await fetch(
  `https://${P}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(`*[_id=="${ID}"][0]{"n":count(body),"has":count(body[style=="h3" && children[0].text match "What earns a place*"])}`)}`
)).json();
console.log(`lesson has ${cur.result?.n} blocks; criterion section present: ${cur.result?.has > 0}`);
if (cur.result?.has > 0) { console.log('already added — nothing to do.'); process.exit(0); }
console.log(`would append ${BLOCKS.length} blocks -> ${cur.result?.n + BLOCKS.length} total`);
if (!commit) { console.log('\ndry run. re-run with --commit'); process.exit(0); }
if (!TOKEN) { console.error('SANITY_API_TOKEN missing'); process.exit(1); }

const res = await fetch(`https://${P}.api.sanity.io/v2021-06-07/data/mutate/production`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations: [{ patch: { id: ID, insert: { after: 'body[-1]', items: BLOCKS } } }] }),
});
const out = await res.json();
if (!res.ok) { console.error('FAILED:', JSON.stringify(out).slice(0, 400)); process.exit(1); }
console.log('appended. transaction:', out.transactionId);
