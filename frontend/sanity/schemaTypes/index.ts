import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContent'
import { categoryType } from './category'
import { postType } from './post'
import { authorType } from './author'
import { policyAnalysisType } from './policyAnalysis'
import { hospitalType } from './hospital' // IMPORT ADDED

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType, 
    policyAnalysisType,
    hospitalType // ADDED
  ],
}