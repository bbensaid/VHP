import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: ['Policy', 'Economics', 'Technology', 'Clinical', 'Equity'],
      },
    }),
    defineField({
      name: 'clientType',
      title: 'Client Type (e.g. "Rural Hospital", "Payer")',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics (e.g. "40% Reduction")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Full Analysis',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})