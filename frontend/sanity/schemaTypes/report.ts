import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'report',
  title: 'Impact Report',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Report Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / One-liner',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        // Five pillars in load-bearing order, then the Equity Imperative.
        // The stored value stays 'Equity' so existing documents keep working;
        // only the editor-facing title says what it actually is.
        list: [
          { title: 'Policy',     value: 'Policy'     },
          { title: 'Technology', value: 'Technology' },
          { title: 'Economics',  value: 'Economics'  },
          { title: 'Clinical',   value: 'Clinical'   },
          { title: 'Operations', value: 'Operations' },
          { title: 'Equity Imperative (cross-cutting)', value: 'Equity' },
        ],
      },
    }),
    defineField({
      name: 'chapterRef',
      title: 'Book Chapter',
      type: 'string',
      description: 'Book chapter number ("1"–"20") this report ties into. Optional.',
    }),
    defineField({
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      options: {
        list: ['Public', 'Client Only', 'Enterprise'],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      title: 'PDF Document',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'topics',
      title: 'Key Topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})