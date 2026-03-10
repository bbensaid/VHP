import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType }    from './blockContent'
import { categoryType }        from './category'
import { postType }            from './post'
import { authorType }          from './author'
import { policyAnalysisType }  from './policyAnalysis'
import { hospitalType }        from './hospital'
import { academyModuleType }   from './academyModule'
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
import rhtState from './rhtState'
import statePerformanceIndex from './statePerformanceIndex'
import subscriber from './subscriber'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    policyAnalysisType,
    hospitalType,
    academyModuleType,
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
    rhtState,
    statePerformanceIndex,
    subscriber,
  ],
}
