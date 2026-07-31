import {defineField, defineType} from 'sanity'

export const policyAnalysisType = defineType({
  name: 'policyAnalysis',
  title: 'Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),

    // ── PILLAR — now includes all 5 ──────────────────────────────────────
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Policy',     value: 'Policy'     },
          { title: 'Economics',  value: 'Economics'  },
          { title: 'Technology', value: 'Technology' },
          { title: 'Clinical',   value: 'Clinical'   },
          { title: 'Equity',     value: 'Equity'     },
          { title: 'Operations', value: 'Operations' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('A pillar is required.'),
    }),

    // ── SECONDARY PILLARS — cross-pillar surfacing ───────────────────────
    // `pillar` above stays single-valued: it is the doc's home pillar and
    // drives breadcrumbs, chapterRef, and sort order. This adds the OTHER
    // pillars a piece legitimately belongs to, so e.g. nursing-workforce
    // economics appears on /operations as well as /economics.
    // Pillar pages query `pillar == $p || $p in secondaryPillars`.
    defineField({
      name: 'secondaryPillars',
      title: 'Also relevant to (secondary pillars)',
      description:
        'Optional. Other pillars this piece belongs to. It will appear on those pillar pages too, but its home pillar stays the one selected above.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Policy',     value: 'Policy'     },
          { title: 'Economics',  value: 'Economics'  },
          { title: 'Technology', value: 'Technology' },
          { title: 'Clinical',   value: 'Clinical'   },
          { title: 'Equity',     value: 'Equity'     },
          { title: 'Operations', value: 'Operations' },
        ],
      },
      validation: (Rule) =>
        Rule.unique().custom((vals, ctx) => {
          const home = (ctx.document as { pillar?: string } | undefined)?.pillar;
          if (Array.isArray(vals) && home && vals.includes(home)) {
            return 'Remove the home pillar — it is already set above.';
          }
          return true;
        }),
    }),

    // ── CATEGORY — full list of all 20 subcategories ─────────────────────
    defineField({
      name: 'category',
      title: 'Category (Subcategory)',
      type: 'string',
      options: {
        list: [
          // Policy
          { title: 'Policy — Regulation & Legislation',      value: 'Regulation & Legislation'      },
          { title: 'Policy — Public Health Mandates',        value: 'Public Health Mandates'        },
          { title: 'Policy — Global & Comparative Policy',   value: 'Global & Comparative Policy'   },
          { title: 'Policy — Policy Feasibility Studies',    value: 'Policy Feasibility Studies'    },
          // Economics
          { title: 'Economics — Value-Based Care Models',    value: 'Value-Based Care Models'       },
          { title: 'Economics — Market & Finance',           value: 'Market & Finance'              },
          { title: 'Economics — Labor & Workforce Strategy', value: 'Labor & Workforce Strategy'    },
          { title: 'Economics — Healthcare Investment Trends', value: 'Healthcare Investment Trends' },
          // Technology
          { title: 'Technology — AI & Machine Learning',     value: 'AI & Machine Learning'         },
          { title: 'Technology — Digital Health & Telemedicine', value: 'Digital Health & Telemedicine' },
          { title: 'Technology — Data Security & Governance', value: 'Data Security & Governance'   },
          { title: 'Technology — Tech-Enabled Workflow',     value: 'Tech-Enabled Workflow'         },
          // Clinical
          { title: 'Clinical — Hospital-at-Home',            value: 'Hospital-at-Home'              },
          { title: 'Clinical — Precision Medicine',          value: 'Precision Medicine'            },
          { title: 'Clinical — Virtual Care Models',         value: 'Virtual Care Models'           },
          { title: 'Clinical — Population Health',           value: 'Population Health'             },
          // Equity
          { title: 'Equity — SDOH Integration',              value: 'SDOH Integration'              },
          { title: 'Equity — Algorithmic Bias',              value: 'Algorithmic Bias'              },
          { title: 'Equity — Access Disparity',              value: 'Access Disparity'              },
          { title: 'Equity — Community Engagement',          value: 'Community Engagement'          },
        ],
      },
      validation: (Rule) => Rule.required().error('A category is required.'),
    }),

    // ── BOOK TIE-IN — chapter number from chapters.ts (taxonomy) ─────────
    defineField({
      name: 'chapterRef',
      title: 'Book Chapter',
      type: 'string',
      description: 'Book chapter number ("1"–"20") this analysis ties into. Optional.',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active',       value: 'Active'       },
          { title: 'Proposed',     value: 'Proposed'     },
          { title: 'In Committee', value: 'In Committee' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'impactLevel',
      title: 'Impact Level',
      type: 'string',
      options: {
        list: [
          { title: 'Critical', value: 'Critical' },
          { title: 'High',     value: 'High'     },
          { title: 'Medium',   value: 'Medium'   },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'summary',
      title: 'Summary / Abstract',
      type: 'text',
      rows: 4,
      description: '2–3 sentence executive abstract. Shown on article cards and hub pages.',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  // ── STUDIO PREVIEW ────────────────────────────────────────────────────
  preview: {
    select: {
      title:  'title',
      pillar: 'pillar',
      status: 'status',
      impact: 'impactLevel',
    },
    prepare({ title, pillar, status, impact }) {
      const pillarEmoji: Record<string, string> = {
        Policy:     '📋',
        Economics:  '📊',
        Technology: '🤖',
        Clinical:   '🏥',
        Equity:     '⚖️',
      };
      return {
        title:    title || 'Untitled Article',
        subtitle: `${pillarEmoji[pillar] ?? '•'} ${pillar ?? '—'}  ·  ${status ?? '—'}  ·  ${impact ?? '—'}`,
      };
    },
  },
})