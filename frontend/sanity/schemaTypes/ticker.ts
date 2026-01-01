import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ticker',
  title: 'System Vitals (Ticker)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Metric Name',
      type: 'string',
      description: 'e.g., ER Wait Time (Avg)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Current Value',
      type: 'string',
      description: 'e.g., 4.2 Hours',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trend',
      title: 'Trend / Context',
      type: 'string',
      description: 'e.g., +12% YoY or Critical',
    }),
    defineField({
      name: 'status',
      title: 'Status Color',
      type: 'string',
      options: {
        list: [
          { title: 'Good (Green)', value: 'good' },
          { title: 'Warning (Orange)', value: 'warning' },
          { title: 'Critical (Red)', value: 'critical' },
          { title: 'Neutral (Blue)', value: 'neutral' },
        ],
      },
      initialValue: 'neutral'
    }),
  ],
})