import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'definition',
  title: 'Glossary Definition',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term / Acronym',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Definition',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pillars',
      title: 'Associated Pillars',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Policy', value: 'Policy' },
          { title: 'Economics', value: 'Economics' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Clinical', value: 'Clinical' },
          { title: 'Equity', value: 'Equity' },
          { title: 'Operations', value: 'Operations' },
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'chapterRef',
      title: 'Book Chapter',
      type: 'string',
      description: 'Book chapter number ("1"–"20") this term ties into. Optional.',
    }),
  ],
})