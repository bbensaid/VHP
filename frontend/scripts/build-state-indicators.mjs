// Build lib/data/state-indicators.json — sourced, per-state indicators for the fifty-state dashboard.
// Replaces the hand-entered 0–100 "Performance Index" (Sanity statePerformanceIndex, 2026-03-10), whose values had
// no calculation behind them. Every number here comes from a named public source and carries its year.
//
//   node scripts/build-state-indicators.mjs
//
// Sources:
//   CDC BRFSS Prevalence Data (data.cdc.gov dttw-5yxu) — latest year per state, Overall and education breakouts.
//   CMS Care Compare, Hospital General Information (xubh-q36u) — hospital and critical-access counts, star ratings.
//   CMS Rural Health Transformation awards, Dec 29, 2025 (book-audit/deep/sources/cms_rht_fy26_awards.json).
//   KFF, Status of State Medicaid Expansion Decisions (accessed 2026-10-17): 41 incl. DC adopted, 10 not.
//   CMS AHEAD Model participants (Maryland, Connecticut, Hawaii, Rhode Island, New York sub-state region;
//   Vermont signed January 2025 and withdrew July 2026).
import fs from 'fs';

const STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut',
  DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
  MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming',
};
const NOT_EXPANDED = ['AL', 'FL', 'GA', 'KS', 'MS', 'SC', 'TN', 'TX', 'WI', 'WY'];
const AHEAD = { MD: 'Participant', CT: 'Participant', HI: 'Participant', RI: 'Participant', NY: 'Participant (sub-state region)', VT: 'Withdrew July 2026' };
const RHT = JSON.parse(fs.readFileSync('../book-audit/deep/sources/cms_rht_fy26_awards.json', 'utf8'));

const soda = async (where) => {
  const out = [];
  for (let off = 0; ; off += 50000) {
    const u = `https://data.cdc.gov/resource/dttw-5yxu.json?$select=year,locationabbr,question,response,break_out,data_value,sample_size&$where=${encodeURIComponent(where)}&$limit=50000&$offset=${off}`;
    const rows = await (await fetch(u)).json();
    if (!Array.isArray(rows)) throw new Error(JSON.stringify(rows).slice(0, 300));
    out.push(...rows);
    if (rows.length < 50000) return out;
  }
};

// BRFSS questions (exact text prefixes) and the response whose value we keep.
const Q = {
  insured: ['Adults who had some form of health insurance', 'Have some form of health insurance'],
  costBarrier: ['Was there a time in the past 12 months when you needed to see a doctor but could not', 'Yes'],
  checkup: ['About how long has it been since you last visited a doctor for a routine checkup', 'Within the past year'],
};
const PROVIDER_Q = 'Do you have one person (or a group of doctors) that you think of as your personal health c';

const rows = await soda(`year >= '2023' AND class = 'Health Care Access/Coverage' AND break_out in ('Overall','Less than H.S.','College graduate')`);
const by = {};
for (const r of rows) {
  if (!STATES[r.locationabbr] || r.data_value == null) continue;
  const k = `${r.locationabbr}|${r.year}|${r.break_out}`;
  const o = (by[k] ??= {});
  for (const [name, [q, resp]] of Object.entries(Q)) if (r.question.startsWith(q) && r.response === resp) o[name] = +(+r.data_value).toFixed(1);
  if (r.question.startsWith(PROVIDER_Q) && r.response !== 'No') o.providerParts = [...(o.providerParts ?? []), +r.data_value];
}
const brfss = (st) => {
  for (const y of ['2025', '2024', '2023']) {
    const o = by[`${st}|${y}|Overall`];
    if (!o || o.insured == null) continue;
    const prov = (b) => { const p = by[`${st}|${y}|${b}`]?.providerParts; return p?.length === 2 ? +(p[0] + p[1]).toFixed(1) : null; };
    const lo = prov('Less than H.S.'), hi = prov('College graduate');
    return { year: +y, insuredPct: o.insured, costBarrierPct: o.costBarrier ?? null, checkupPct: o.checkup ?? null,
      personalProviderPct: prov('Overall'), providerGapEducation: lo != null && hi != null ? +(hi - lo).toFixed(1) : null };
  }
  return null;
};

// CMS Care Compare: all hospitals, paginated.
const hosp = [];
for (let off = 0; ; off += 1500) {
  const u = `https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0?limit=1500&offset=${off}&keys=true`;
  const j = await (await fetch(u)).json();
  hosp.push(...j.results);
  if (j.results.length < 1500) break;
}
const cms = (st) => {
  const h = hosp.filter((r) => r.state === st);
  const rated = h.map((r) => Number.parseInt(r.hospital_overall_rating, 10)).filter((n) => n >= 1 && n <= 5);
  return { hospitals: h.length, criticalAccess: h.filter((r) => r.hospital_type === 'Critical Access Hospitals').length,
    ratedHospitals: rated.length, meanStarRating: rated.length ? +(rated.reduce((a, b) => a + b, 0) / rated.length).toFixed(2) : null };
};

const out = {
  generated: new Date().toISOString().slice(0, 10),
  sources: {
    brfss: { label: 'CDC BRFSS Prevalence Data', url: 'https://data.cdc.gov/Behavioral-Risk-Factors/Behavioral-Risk-Factor-Surveillance-System-BRFSS-P/dttw-5yxu' },
    cms: { label: 'CMS Care Compare — Hospital General Information', url: 'https://data.cms.gov/provider-data/dataset/xubh-q36u' },
    rht: { label: 'CMS, Rural Health Transformation awards (Dec 29, 2025)', url: 'https://www.cms.gov/newsroom/press-releases/cms-announces-50-billion-awards-strengthen-rural-health-all-50-states' },
    kff: { label: 'KFF, Status of State Medicaid Expansion Decisions', url: 'https://www.kff.org/medicaid/status-of-state-medicaid-expansion-decisions/' },
    ahead: { label: 'CMS AHEAD Model', url: 'https://www.cms.gov/priorities/innovation/innovation-models/ahead' },
  },
  states: Object.fromEntries(Object.entries(STATES).map(([st, name]) => [st, {
    name, medicaidExpansion: !NOT_EXPANDED.includes(st), ahead: AHEAD[st] ?? null, rhtAwardFY26: RHT[name] ?? null,
    brfss: brfss(st), cms: cms(st),
  }])),
};
const miss = Object.entries(out.states).filter(([, s]) => !s.brfss || !s.cms.hospitals || !s.rhtAwardFY26).map(([k]) => k);
fs.writeFileSync('lib/data/state-indicators.json', JSON.stringify(out, null, 1));
console.log('hospitals', hosp.length, 'missing', miss, 'VT', JSON.stringify(out.states.VT));
