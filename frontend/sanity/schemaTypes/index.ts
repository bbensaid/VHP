// frontend/sanity/schemaTypes/index.ts
// ADD these two lines to your existing index.ts — do not replace the whole file.
// 1. Add import at the top with the other imports:
//      import { academyModuleType } from './academyModule'
// 2. Add academyModuleType to the types array:
//      academyModuleType,
//
// The complete updated file is shown below for reference.

import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType }    from './blockContent'
import { categoryType }        from './category'
import { postType }            from './post'
import { authorType }          from './author'
import { policyAnalysisType }  from './policyAnalysis'
import { hospitalType }        from './hospital'
import { academyModuleType }   from './academyModule'   // ← NEW
import caseStudy   from './caseStudy'
import course      from './course'
import webinar     from './webinar'
import report      from './report'
import ticker      from './ticker'
import dailyInsight from './dailyInsight'
import analystNote from './analystNote'
import instructor  from './instructor'
import definition  from './definition'
import audio       from './audio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    policyAnalysisType,
    hospitalType,
    academyModuleType,   // ← NEW
    caseStudy,
    course,
    webinar,
    report,
    ticker,
    dailyInsight,
    analystNote,
    instructor,
    definition,
    audio,
  ],
}