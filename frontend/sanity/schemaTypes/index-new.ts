import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}



import policyAnalysis from './policyAnalysis'
import definition from './definition'
import course from './course'
import instructor from './instructor'
import webinar from './webinar' // <--- ADD THIS
import caseStudy from './caseStudy'
import report from './report'
import ticker from './ticker' 
import dailyInsight from './dailyInsight'
import analystNote from './analystNote'


export const schemaTypes = [policyAnalysis, definition, course, instructor, webinar, caseStudy, report, ticker, dailyInsight , analystNote]