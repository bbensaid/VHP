import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'investmentDeal',
  title: 'Investment Deal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Deal Title',
      type: 'string',
      description: 'e.g. "Optum acquires Amedisys for $3.3B"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dealType',
      title: 'Deal Type',
      type: 'string',
      options: {
        list: [
          { title: 'Merger & Acquisition', value: 'ma' },
          { title: 'Venture Capital',       value: 'vc' },
          { title: 'Private Equity',        value: 'pe' },
          { title: 'IPO / Public Offering', value: 'ipo' },
          { title: 'Strategic Partnership', value: 'partnership' },
          { title: 'Debt Financing',        value: 'debt' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Announced',  value: 'announced' },
          { title: 'Pending',    value: 'pending' },
          { title: 'Closed',     value: 'closed' },
          { title: 'Terminated', value: 'terminated' },
        ],
        layout: 'radio',
      },
      initialValue: 'announced',
    }),
    defineField({
      name: 'announcedDate',
      title: 'Announced Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'closedDate',
      title: 'Closed Date',
      type: 'date',
    }),
    defineField({
      name: 'dealValueUsd',
      title: 'Deal Value (USD millions)',
      type: 'number',
      description: 'Enter in millions. Leave blank if undisclosed.',
    }),
    defineField({
      name: 'acquirer',
      title: 'Acquirer / Lead Investor',
      type: 'string',
    }),
    defineField({
      name: 'target',
      title: 'Target / Investee Company',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Healthcare Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Policy',     value: 'Policy'     },
          { title: 'Economics',  value: 'Economics'  },
          { title: 'Technology', value: 'Technology' },
          { title: 'Clinical',   value: 'Clinical'   },
          { title: 'Equity',     value: 'Equity'     },
        ],
      },
    }),
    defineField({
      name: 'sector',
      title: 'Healthcare Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Digital Health / Health Tech', value: 'digital-health' },
          { title: 'Home Health & Hospice',        value: 'home-health' },
          { title: 'Behavioral Health',            value: 'behavioral-health' },
          { title: 'Value-Based Care',             value: 'value-based-care' },
          { title: 'Pharmaceuticals & Biotech',    value: 'pharma-biotech' },
          { title: 'Health Insurance / Payer',     value: 'payer' },
          { title: 'Hospital / Health System',     value: 'hospital' },
          { title: 'Medical Devices',              value: 'devices' },
          { title: 'Revenue Cycle / Admin Tech',   value: 'rcm' },
          { title: 'Primary Care',                 value: 'primary-care' },
          { title: 'Other',                        value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'geography',
      title: 'Geography',
      type: 'string',
      options: {
        list: [
          { title: 'National (US)',  value: 'national' },
          { title: 'Northeast',     value: 'northeast' },
          { title: 'Southeast',     value: 'southeast' },
          { title: 'Midwest',       value: 'midwest' },
          { title: 'Southwest',     value: 'southwest' },
          { title: 'West',          value: 'west' },
          { title: 'International', value: 'international' },
        ],
      },
      initialValue: 'national',
    }),
    defineField({
      name: 'summary',
      title: 'Deal Summary',
      type: 'text',
      rows: 3,
      description: 'One-paragraph plain-text summary for the tracker card.',
    }),
    defineField({
      name: 'analystNote',
      title: 'Analyst Note',
      type: 'text',
      rows: 2,
      description: 'Brief HTR analyst commentary on strategic implications.',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Primary Source URL',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  orderings: [
    {
      title: 'Announced Date, Newest',
      name: 'announcedDateDesc',
      by: [{ field: 'announcedDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      dealType: 'dealType',
      dealValueUsd: 'dealValueUsd',
      announcedDate: 'announcedDate',
    },
    prepare({ title, dealType, dealValueUsd, announcedDate }) {
      const typeLabel: Record<string, string> = {
        ma: 'M&A', vc: 'VC', pe: 'PE', ipo: 'IPO',
        partnership: 'Partnership', debt: 'Debt',
      }
      const value = dealValueUsd ? `$${dealValueUsd >= 1000 ? `${(dealValueUsd / 1000).toFixed(1)}B` : `${dealValueUsd}M`}` : 'Undisclosed'
      return {
        title: title ?? 'Untitled Deal',
        subtitle: `${typeLabel[dealType] ?? dealType} · ${value} · ${announcedDate ?? ''}`,
      }
    },
  },
})
