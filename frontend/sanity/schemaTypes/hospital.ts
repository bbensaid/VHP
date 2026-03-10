import { defineField, defineType } from 'sanity'

export const hospitalType = defineType({
  name: 'hospital',
  title: 'Hospital',
  type: 'document',
  preview: {
    select: { title: 'name', subtitle: 'stateSlug' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Hospital Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Primary key for queries — lowercase with underscores (e.g. "vermont", "new_york")
    defineField({
      name: 'stateSlug',
      title: 'State Slug',
      type: 'string',
      description: 'Lowercase with underscores, matches dashboard route (e.g. vermont, new_york)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Hospital Type',
      type: 'string',
      options: {
        list: [
          { title: 'Critical Access', value: 'Critical Access' },
          { title: 'Rural PPS', value: 'Rural PPS' },
          { title: 'Urban', value: 'Urban' },
        ],
        layout: 'radio',
      },
    }),
    // Dashboard table metrics
    defineField({
      name: 'totalDischarges',
      title: 'Total Annual Discharges',
      type: 'number',
    }),
    defineField({
      name: 'avgLengthOfStay',
      title: 'Average Length of Stay (days)',
      type: 'number',
    }),
    defineField({
      name: 'qualityScore',
      title: 'Quality Score (0–100)',
      type: 'number',
    }),
    // Financial / simulation metrics
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
        layout: 'radio',
      },
    }),
  ],
})
