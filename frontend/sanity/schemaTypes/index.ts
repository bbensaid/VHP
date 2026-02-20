import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContent'
import { categoryType } from './category'
import { postType } from './post'
import { authorType } from './author'
import { policyAnalysisType } from './policyAnalysis'
import { hospitalType } from './hospital' // IMPORT ADDED
import caseStudy from './caseStudy'
import course from './course'
import webinar from './webinar'
import report from './report'
import ticker from './ticker'
import dailyInsight from './dailyInsight'
import analystNote from './analystNote'
import instructor from './instructor'
import definition from './definition'
import audio from './audio' // Ensure the path to audio.ts is correct

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType, 
    policyAnalysisType,
    hospitalType,
    caseStudy,
    course,
    webinar,
    report,
    ticker,
    dailyInsight,
    analystNote,
    instructor,
    definition,
    audio
  ],
}