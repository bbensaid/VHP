import {defineField, defineType} from 'sanity'

export const policyAnalysisType = defineType({
  name: 'policyAnalysis',
  title: 'Policy Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: ['Policy', 'Economics', 'Technology'],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Active', 'Proposed', 'In Committee'],
      },
    }),
    defineField({
      name: 'impactLevel',
      title: 'Impact Level',
      type: 'string',
      options: {
        list: ['Critical', 'High', 'Medium'],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'code', options: {language: 'json'}},
        {type: 'image', options: {hotspot: true}},
        {
          name: 'video',
          title: 'Video',
          type: 'object',
          fields: [
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'caption', type: 'string', title: 'Caption'}
          ]
        },
        {
          name: 'audio',
          title: 'Audio',
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'summary', type: 'string', title: 'Summary'}
          ]
        }
      ]
    }),
  ],
})