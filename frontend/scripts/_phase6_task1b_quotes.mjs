// Phase 6 task 1b: Module 3 pull-quotes attributed to Leemore Dafny (Health Affairs 2025) and Mark McClellan (JAMA 2025)
// cannot be found in any publication — attributions removed (quote blocks kept as unattributed editorial pull-quotes);
// image caption's fabricated "CMMI Care Management ROI Analysis 2024" data source removed.
import { applyEverywhere } from './_phase6_lib.mjs';
const SRC = 'Exact-phrase web searches for both quotes (2026-10-07) returned no source; Health Affairs and JAMA 2025 author listings not checked beyond search. No CMMI publication titled "Care Management ROI Analysis".';
await applyEverywhere({
  pairs: [
    { old: ' — Leemore Dafny, Harvard Business School, Health Affairs, 2025.', new: '', src: SRC, note: 'Quote attributed to a real named economist with no findable source; attribution removed, text kept as unattributed editorial pull-quote.' },
    { old: ' — Mark McClellan, Duke-Margolis Center for Health Policy, JAMA, 2025.', new: '', src: SRC, note: 'Quote attributed to a real named former CMS Administrator with no findable source; attribution removed, text kept as unattributed editorial pull-quote.' },
    { old: ' and CMMI Care Management ROI Analysis 2024', new: '', src: SRC, note: 'Image caption cited a nonexistent CMMI analysis (caption is not currently rendered: no image asset attached).' },
  ],
  sanityIds: ['academyModule-vbc-fundamentals-module-3-economics-pillar', 'vbc-fundamentals-module-3-economics-pillar'],
  supa: [{ table: 'lessons', col: 'content_blocks', ids: ['11ea7c99-2270-4072-b29d-6758f42ba3cd', 'e49bcdcd-dc9f-4204-bebe-3a5d2797c923'] }],
  files: ['frontend/content/courses_tier1.json', 'frontend/content/course_value_based_care.json', 'frontend/sanity/content/academy/vbc_economics.json', 'frontend/sanity/temp_holder/VBC_Economics.json'],
  residue: ['Leemore Dafny, Harvard', 'Mark McClellan, Duke-Margolis Center for Health Policy, JAMA', 'Care Management ROI Analysis'],
});
