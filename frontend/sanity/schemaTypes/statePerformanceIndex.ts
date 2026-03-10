import { defineField, defineType } from 'sanity'

const scoreField = (name: string, title: string) =>
  defineField({ name, title, type: 'number', description: '0–100', validation: (R) => R.min(0).max(100) })

export default defineType({
  name: 'statePerformanceIndex',
  title: 'State Performance Index',
  type: 'document',
  fields: [
    defineField({
      name: 'stateId',
      title: 'State ID (slug key)',
      type: 'slug',
      description: 'Lowercase underscore slug, e.g. "new_hampshire"',
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
      name: 'performanceScore',
      title: 'Overall Performance Score',
      type: 'number',
      description: '0–100 composite score',
      validation: (R) => R.required().min(0).max(100),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Leading', value: 'Leading' },
          { title: 'Improving', value: 'Improving' },
          { title: 'Stable', value: 'Stable' },
          { title: 'At Risk', value: 'At Risk' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'policyMetrics',
      title: 'Policy Metrics',
      type: 'object',
      fields: [
        scoreField('vbpAdoption', 'VBP Adoption'),
        scoreField('telehealth', 'Telehealth Policy'),
        scoreField('scopeOfPractice', 'Scope of Practice'),
      ],
    }),
    defineField({
      name: 'economicsMetrics',
      title: 'Economics Metrics',
      type: 'object',
      fields: [
        scoreField('spendingPerCapita', 'Low Spending Per Capita'),
        scoreField('workforceGaps', 'Workforce Adequacy'),
        scoreField('insuranceCoverage', 'Insurance Coverage'),
      ],
    }),
    defineField({
      name: 'technologyMetrics',
      title: 'Technology Metrics',
      type: 'object',
      fields: [
        scoreField('hieAdoption', 'HIE Adoption'),
        scoreField('broadbandAccess', 'Broadband Access'),
        scoreField('ehrAdoption', 'EHR Adoption'),
      ],
    }),
    defineField({
      name: 'clinicalMetrics',
      title: 'Clinical Metrics',
      type: 'object',
      fields: [
        scoreField('preventiveCare', 'Preventive Care'),
        scoreField('readmissionRate', 'Readmission Rate'),
        scoreField('chronicDiseaseControl', 'Chronic Disease Control'),
      ],
    }),
    defineField({
      name: 'equityMetrics',
      title: 'Equity Metrics',
      type: 'object',
      fields: [
        scoreField('racialEquityGap', 'Racial Equity Gap'),
        scoreField('ruralUrbanGap', 'Rural-Urban Gap'),
        scoreField('sdohIntegration', 'SDOH Integration'),
      ],
    }),
    defineField({
      name: 'narrativeTitle',
      title: 'Narrative Title',
      type: 'string',
    }),
    defineField({
      name: 'narrativeSummary',
      title: 'Narrative Summary',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'stateName', subtitle: 'performanceScore' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle != null ? `Score: ${subtitle}` : '' }
    },
  },
  orderings: [
    { title: 'Score High–Low', name: 'scoreDesc', by: [{ field: 'performanceScore', direction: 'desc' }] },
    { title: 'State Name A–Z', name: 'stateNameAsc', by: [{ field: 'stateName', direction: 'asc' }] },
  ],
})
