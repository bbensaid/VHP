'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {codeInput} from '@sanity/code-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {schema as _schema} from './sanity/schemaTypes'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {structure as _structure} from './sanity/structure'
// Cast to any to avoid type incompatibilities from dual sanity package installations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schema = _schema as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const structure = _structure as any;
// import {StudioBlock} from './sanity/components/StudioBlock'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    codeInput(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  // form: {
  //   components: {
  //     block: StudioBlock,
  //   },
  // },
})
