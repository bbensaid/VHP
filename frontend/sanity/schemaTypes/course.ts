import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
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
        list: ['Policy', 'Economics', 'Technology', 'Operations'],
      },
    }),
    defineField({
      name: 'type',
      title: 'Format Type',
      type: 'string',
      options: {
        list: ['CERTIFICATION', 'COURSE', 'WEBINAR', 'MASTERCLASS'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'meta',
      title: 'Meta Details',
      type: 'string', // e.g. "8 Weeks • Online Cohort"
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string', // e.g. "$2,995"
    }),
    // Relation to the Instructor schema above
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instructor' }] }],
    }),
    // Ordered list of modules that make up this course
    defineField({
      name: 'modules',
      title: 'Course Modules',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'academyModule' }] }],
      description: 'Link the academyModule documents for this course in order',
    }),
    // The full syllabus content for the [slug] page
    defineField({
      name: 'overview',
      title: 'Full Overview / Syllabus',
      type: 'blockContent',
    }),
  ],
})