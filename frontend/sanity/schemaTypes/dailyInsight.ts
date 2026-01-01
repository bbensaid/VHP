import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dailyInsight',
  title: 'Daily Insight (Dark Strip)',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
      description: 'The app will always show the most recently updated "Active" insight.'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Quote of the Day', value: 'QUOTE' },
          { title: 'Chart of the Day', value: 'CHART' },
          { title: 'Stat of the Day', value: 'STAT' },
          { title: 'Must Read', value: 'READ' },
          { title: 'Did You Know?', value: 'TRIVIA' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content / Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'link',
      title: 'Link (Optional)',
      type: 'url',
    }),
  ],
})