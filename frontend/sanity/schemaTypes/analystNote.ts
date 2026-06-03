import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'analystNote',
  title: 'The Signal (Sidebar Note)',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
      description: 'If unchecked, this note will be hidden.'
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Topic',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    // CHANGED: From 'text' to 'array' of 'block' (Portable Text)
    defineField({
      name: 'content',
      title: 'The Insight',
      type: 'array',
      of: [{ 
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
          annotations: []
        }
      }], 
      description: 'Keep it short. Use bolding for impact.',
    }),
    defineField({
      name: 'author',
      title: 'Analyst Name',
      type: 'string',
      initialValue: 'Chief Editor',
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: ['Policy', 'Economics', 'Technology', 'Clinical', 'Equity', 'Operations'],
      },
    }),
    defineField({
      name: 'chapterRef',
      title: 'Book Chapter',
      type: 'string',
      description: 'Book chapter number ("1"–"20") this signal ties into. Optional.',
    }),
  ],
})