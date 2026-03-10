import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'rhtState',
  title: 'RHT State Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'stateId',
      title: 'State ID (slug key)',
      type: 'slug',
      description: 'Lowercase underscore slug matching the URL, e.g. "new_hampshire"',
      options: { source: 'stateName', maxLength: 64 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'stateName',
      title: 'State Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'awardAmount',
      title: 'Award Amount',
      type: 'string',
      description: 'e.g. "$195,000,000"',
    }),
    defineField({
      name: 'status',
      title: 'Program Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'Active' },
          { title: 'Pending', value: 'Pending' },
          { title: 'At Risk', value: 'At Risk' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'strategicFocus',
      title: 'Strategic Focus',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Program Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'initiatives',
      title: 'Strategic Initiatives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Metric Label', type: 'string', validation: (R) => R.required() }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Pending', value: 'Pending' },
                  { title: 'In Progress', value: 'In Progress' },
                  { title: 'Achieved', value: 'Achieved' },
                ],
              },
            }),
            defineField({ name: 'target', title: 'Target', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'status' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'stateName', subtitle: 'awardAmount' },
  },
  orderings: [
    { title: 'State Name A–Z', name: 'stateNameAsc', by: [{ field: 'stateName', direction: 'asc' }] },
  ],
})
