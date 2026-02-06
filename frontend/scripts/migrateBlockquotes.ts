import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// List of document types and their Portable Text field names to check
const TYPES_TO_CHECK = [
  { type: 'post', field: 'body' },
  { type: 'policyAnalysis', field: 'body' },
  { type: 'caseStudy', field: 'body' },
  { type: 'course', field: 'overview' },
  { type: 'analystNote', field: 'content' },
  { type: 'author', field: 'bio' },
]

async function migrate() {
  console.log('Starting migration: blockquote -> quote...')

  for (const { type, field } of TYPES_TO_CHECK) {
    // Fetch all documents of this type that have the field defined
    const docs = await client.fetch(`*[_type == $type && defined(${field})]`, { type })
    
    for (const doc of docs) {
      const blocks = doc[field]
      if (!Array.isArray(blocks)) continue

      let hasChanges = false
      const newBlocks = blocks.map((block: any) => {
        // Check if it's a block and has the style 'blockquote'
        if (block._type === 'block' && block.style === 'blockquote') {
          console.log(`Found blockquote in document: ${doc._id} (${type})`)
          hasChanges = true
          return { ...block, style: 'quote' }
        }
        return block
      })

      if (hasChanges) {
        console.log(`Patching ${doc._id}...`)
        try {
          await client
            .patch(doc._id)
            .set({ [field]: newBlocks })
            .commit()
          console.log(`Successfully patched ${doc._id}`)
        } catch (err) {
          console.error(`Failed to patch ${doc._id}:`, err)
        }
      }
    }
  }
  console.log('Migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})