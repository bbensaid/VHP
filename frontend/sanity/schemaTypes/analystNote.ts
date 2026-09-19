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
      description: 'Book chapter number ("1"–"20") this signal ties into. Optional.',
    }),
  ],
})