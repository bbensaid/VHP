import { getDoc } from './_phase7a_lib.mjs';
const chk = async (id, key, must, mustNot) => { const d = await getDoc(id); const b = key ? d.body.find(x => x._key === key) : d.body; const s = JSON.stringify(b ?? null);
  console.log(id, key, 'present:', !!b, 'has new:', must ? s.includes(must) : '-', 'old gone:', mustNot ? !JSON.stringify(d).includes(mustNot) : '-'); };
await chk('academyModule-vbc-aco-evidence', 'aco-ev-intro', 'covering 10.8 million', 'covering more than 11 million');
await chk('academyModule-vbc-bundled-evidence', 'bev-p5', null, 'Finkelstein, Ji, Mahoney, and Skinner, published in the New England Journal of Medicine in 2018, found that CJR reduced');
await chk('academyModule-vbc-clinical-m5', 'm5st01', '12.9%', 'Roughly 1 in 4 hospital admissions');
await chk('academyModule-vbc-fundamentals-module-2-policy-pillar', null, null, 'HTRAcademy2026M2');
await chk('vbc-fundamentals-module-3-economics-pillar', null, null, 'HTRAcademy2026M3');
await chk('ahead-model-year-one-financial-outcomes', 'ahead-68', 'AHEAD overview, fall 2025', 'up to two additional states to join in July 2026');
