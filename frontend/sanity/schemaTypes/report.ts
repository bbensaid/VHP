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