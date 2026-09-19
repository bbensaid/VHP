import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webinar',
  title: 'Webinar / Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapterRef',
      title: 'Book Chapter',
      type: 'string',
      description: 'Book chapter number ("1"–"20") this event ties into. Optional.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime', // Critical for sorting
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. "60 Min")',
      type: 'string',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Event Banner',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
})