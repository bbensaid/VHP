/**
 * Convert Sanity CMS portable-text modules into course lesson contentBlocks
 * and merge them into the existing course JSON files.
 *
 * Run: node scripts/convert_sanity_to_supabase.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Extract plain text from a Sanity block's children array.
 */
function blockText(block) {
  if (!block.children) return '';
  return block.children
    .map(c => (c.text || '').trim())
    .filter(Boolean)
    .join(' ');
}

/**
 * Convert a Sanity portable-text body array into contentBlocks.
 *
 * Strategy:
 *  - h2 / h3 / h4 headings open a new "text" group
 *  - consecutive "normal" paragraphs accumulate into the current group's body
 *  - blockquote / callout style blocks become { type:"callout" } entries
 *  - other block types (statGrid, stepBlock, etc.) are skipped (rich UI types)
 *  - _type:"image" / "code" / "video" / "audio" are skipped
 */
function convertBody(bodyBlocks) {
  const contentBlocks = [];

  // "current text group" state
  let currentHeading = null;   // string or null (intro paragraphs have no heading)
  let currentParas = [];       // accumulated paragraph strings

  function flushTextGroup() {
    if (currentParas.length === 0) return;
    const block = { type: 'text' };
    if (currentHeading) block.heading = currentHeading;
    block.body = currentParas.join('\n\n');
    contentBlocks.push(block);
    currentParas = [];
    currentHeading = null;
  }

  for (const blk of bodyBlocks) {
    const t = blk._type;
    const style = blk.style || '';
    const text = blockText(blk);

    // --- skip non-text custom types ---
    if (
      t === 'image' ||
      t === 'code' ||
      t === 'video' ||
      t === 'audio' ||
      t === 'statGrid' ||
      t === 'analogyBlock' ||
      t === 'comparisonBlock' ||
      t === 'stepBlock' ||
      t === 'exampleBlock' ||
      t === 'warningBlock' ||
      t === 'takeawayBlock' ||
      t === 'knowledgeCheck' ||
      t === 'highlightBlock' ||
      t === 'quoteBlock'
    ) {
      continue;
    }

    if (t !== 'block') continue;  // unknown custom type

    // --- headings ---
    if (style === 'h2' || style === 'h3' || style === 'h4') {
      flushTextGroup();
      currentHeading = text;
      continue;
    }

    // --- callouts (blockquote / callout style / highlight / quote) ---
    if (
      style === 'callout' ||
      style === 'blockquote' ||
      style === 'highlight' ||
      style === 'quote'
    ) {
      // flush any pending paragraphs first
      flushTextGroup();
      if (text) {
        contentBlocks.push({
          type: 'callout',
          variant: style === 'quote' ? 'quote' : style === 'highlight' ? 'info' : 'tip',
          heading: style === 'callout' ? 'Key Concept' : style === 'blockquote' ? 'Quote' : style === 'highlight' ? 'Note' : 'Quote',
          body: text,
        });
      }
      continue;
    }

    // --- normal paragraphs (including list items - treat as paragraphs) ---
    if (text) {
      currentParas.push(text);
    }
  }

  // flush any trailing group
  flushTextGroup();

  return contentBlocks;
}

/**
 * Build a lesson object from a Sanity module file.
 */
function buildLesson(sanityModule, idSuffix, pillarOverride) {
  const { title, slug, summary, body, pillar, estimatedReadTime, learningObjectives } = sanityModule;
  const slugStr = (slug && slug.current) ? slug.current : idSuffix;

  // Determine pillar
  const resolvedPillar = (pillarOverride || pillar || 'general').toLowerCase();

  // Build contentBlocks
  const contentBlocks = convertBody(body || []);

  // Build objectives
  const objectives = (learningObjectives || []).map((text, i) => ({
    id: `obj_sanity_${idSuffix}_${i + 1}`,
    text,
  }));

  // Summary: use module summary or first paragraph body
  let lessonSummary = summary || '';
  if (!lessonSummary && contentBlocks.length > 0) {
    const first = contentBlocks.find(b => b.type === 'text' && b.body);
    lessonSummary = first ? first.body.substring(0, 300) + '...' : '';
  }

  return {
    id: `lesson_sanity_${idSuffix}`,
    pillar: resolvedPillar,
    order: 99,
    slug: slugStr,
    title,
    summary: lessonSummary,
    estimatedMinutes: estimatedReadTime || 20,
    objectives,
    contentBlocks,
    tags: [],
    relatedLessonIds: [],
    isPublished: true,
  };
}

// ─── pillar → track mapping for VBC course ──────────────────────────────────

const VBC_TRACK_MAP = {
  // pillar value from Sanity → track id in course_value_based_care.json
  'all':         'track_vbc_ffs',        // fundamentals module
  'economics':   'track_vbc_acos',       // economics module
  'policy':      'track_vbc_future',     // policy module goes to future track (closest match)
  'technology':  'track_vbc_future',     // technology
  'clinical':    'track_vbc_quality',    // clinical → quality track
  'equity':      'track_vbc_stars',      // equity
};

// For PM modules, all go into population-health tracks
const PM_TRACK_MAP = {
  'all':         'track-ph-foundations',
  'policy':      'track-ph-vbc',
  'economics':   'track-ph-vbc',
  'technology':  'track-ph-risk',
  'clinical':    'track-ph-chronic',
  'equity':      'track-ph-equity',
};

// ─── load source files ───────────────────────────────────────────────────────

function loadSanity(filename) {
  return JSON.parse(readFileSync(path.join(root, 'sanity/content/academy', filename), 'utf8'));
}

const vbcFundamentals = loadSanity('vbc_fundamentals.json');
const vbcEconomics    = loadSanity('vbc_economics.json');
const vbcPolicy       = loadSanity('vbc_policy.json');
const vbcTechnology   = loadSanity('vbc_technology.json');
const vbcClinical     = loadSanity('vbc_clinical.json');
const vbcEquity       = loadSanity('vbc_equity.json');

const pmFundamentals  = loadSanity('pm_m1_fundamentals.json');
const pmPolicy        = loadSanity('pm_m2_policy.json');
const pmEconomics     = loadSanity('pm_m3_economics.json');
const pmTechnology    = loadSanity('pm_m4_technology.json');
const pmClinical      = loadSanity('pm_m5_clinical.json');
const pmEquity        = loadSanity('pm_m6_equity.json');

// ─── load target courses ─────────────────────────────────────────────────────

const vbcCourse = JSON.parse(readFileSync(path.join(root, 'content/course_value_based_care.json'), 'utf8'));
const phCourse  = JSON.parse(readFileSync(path.join(root, 'content/course_population_health.json'), 'utf8'));

// ─── helper: add lesson to course track ──────────────────────────────────────

function addLessonToTrack(course, trackId, lesson) {
  const track = course.tracks.find(t => t.id === trackId);
  if (!track) {
    console.warn(`  ⚠  Track ${trackId} not found in course ${course.id || course.slug}`);
    return;
  }
  if (!track.lessons) track.lessons = [];
  // Avoid duplicate IDs
  if (track.lessons.find(l => l.id === lesson.id)) {
    console.log(`  → Skipping duplicate lesson ${lesson.id}`);
    return;
  }
  track.lessons.push(lesson);
  console.log(`  + Added "${lesson.title}" → track "${track.title}"`);
}

// ─── convert VBC modules ─────────────────────────────────────────────────────

console.log('\n=== Converting VBC modules ===');

const vbcModules = [
  { module: vbcFundamentals, id: 'vbc_fundamentals' },
  { module: vbcEconomics,    id: 'vbc_economics'    },
  { module: vbcPolicy,       id: 'vbc_policy'       },
  { module: vbcTechnology,   id: 'vbc_technology'   },
  { module: vbcClinical,     id: 'vbc_clinical'     },
  { module: vbcEquity,       id: 'vbc_equity'       },
];

for (const { module, id } of vbcModules) {
  const pillar = (module.pillar || 'all').toLowerCase();
  const trackId = VBC_TRACK_MAP[pillar] || 'track_vbc_ffs';
  const lesson = buildLesson(module, id, pillar);
  addLessonToTrack(vbcCourse, trackId, lesson);
}

// ─── convert PM modules ──────────────────────────────────────────────────────

console.log('\n=== Converting PM (Precision Medicine) modules ===');

const pmModules = [
  { module: pmFundamentals, id: 'pm_fundamentals' },
  { module: pmPolicy,       id: 'pm_policy'       },
  { module: pmEconomics,    id: 'pm_economics'    },
  { module: pmTechnology,   id: 'pm_technology'   },
  { module: pmClinical,     id: 'pm_clinical'     },
  { module: pmEquity,       id: 'pm_equity'       },
];

for (const { module, id } of pmModules) {
  const pillar = (module.pillar || 'all').toLowerCase();
  const trackId = PM_TRACK_MAP[pillar] || 'track-ph-foundations';
  const lesson = buildLesson(module, id, pillar);
  addLessonToTrack(phCourse, trackId, lesson);
}

// ─── write output files ───────────────────────────────────────────────────────

writeFileSync(
  path.join(root, 'content/course_value_based_care.json'),
  JSON.stringify(vbcCourse, null, 2),
  'utf8'
);
console.log('\n✓ Wrote course_value_based_care.json');

writeFileSync(
  path.join(root, 'content/course_population_health.json'),
  JSON.stringify(phCourse, null, 2),
  'utf8'
);
console.log('✓ Wrote course_population_health.json');

// ─── stats ───────────────────────────────────────────────────────────────────

console.log('\n=== Stats ===');

function countChars(course) {
  let chars = 0;
  let lessons = 0;
  let blocks = 0;
  for (const track of course.tracks || []) {
    for (const lesson of track.lessons || []) {
      lessons++;
      for (const cb of lesson.contentBlocks || []) {
        blocks++;
        if (cb.body) chars += cb.body.length;
        if (cb.heading) chars += cb.heading.length;
      }
    }
  }
  return { lessons, blocks, chars };
}

const vbcStats = countChars(vbcCourse);
const phStats  = countChars(phCourse);

console.log(`VBC course: ${vbcStats.lessons} lessons, ${vbcStats.blocks} contentBlocks, ${vbcStats.chars.toLocaleString()} body chars`);
console.log(`PH course:  ${phStats.lessons} lessons, ${phStats.blocks} contentBlocks, ${phStats.chars.toLocaleString()} body chars`);
console.log(`Total:      ${vbcStats.lessons + phStats.lessons} lessons, ${(vbcStats.chars + phStats.chars).toLocaleString()} body chars`);
