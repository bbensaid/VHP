// sanity/schemaTypes/index.ts
import policyAnalysis from './policyAnalysis'
import definition from './definition'
import course from './course'       // <--- ADD THIS
import instructor from './instructor' // <--- ADD THIS

export const schemaTypes = [policyAnalysis, definition, course, instructor]