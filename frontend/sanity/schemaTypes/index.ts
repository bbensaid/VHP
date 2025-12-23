// sanity/schemaTypes/index.ts
import policyAnalysis from './policyAnalysis'
import definition from './definition' // <--- Import new schema

export const schemaTypes = [policyAnalysis, definition] // <--- Add to array
