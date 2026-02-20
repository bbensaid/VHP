import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'audio',
  title: 'Audio',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Audio Clip',
        subtitle: subtitle,
      }
    },
  },
})