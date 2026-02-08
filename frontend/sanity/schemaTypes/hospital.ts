import { defineField, defineType } from 'sanity'

export const hospitalType = defineType({
  name: 'hospital',
  title: 'Hospital',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Hospital Name',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: [
          { title: 'Vermont', value: 'vermont' },
          { title: 'New Hampshire', value: 'new-hampshire' },
          { title: 'Maine', value: 'maine' },
        ],
      },
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'beds',
      title: 'Bed Count',
      type: 'number',
    }),
    defineField({
      name: 'revenue',
      title: 'Annual Revenue (Millions)',
      type: 'number',
      description: 'Enter just the number (e.g., 85 for $85M)',
    }),
    defineField({
      name: 'margin',
      title: 'Operating Margin (%)',
      type: 'number',
    }),
    defineField({
      name: 'staffingStatus',
      title: 'Staffing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Critical', value: 'Critical' },
          { title: 'Strain', value: 'Strain' },
          { title: 'Stable', value: 'Stable' },
        ],
      },
    }),
  ],
})