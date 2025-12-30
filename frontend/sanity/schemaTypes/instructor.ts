import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string', // e.g., "Chair of Technology Pillar"
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Expertise Tags',
      type: 'array',
      of: [{ type: 'string' }], // e.g., ["AI", "Clinical Ops"]
    }),
  ],
})