import { defineField, defineType } from 'sanity'

/**
 * academyModule schema
 * Used for HTR Academy course modules — distinct from policyAnalysis articles.
 * Modules have course-specific fields (moduleNumber, courseTitle, learningObjectives,
 * prevModule/nextModule navigation) and share the same blockContent body as articles.
 */
export const academyModuleType = defineType({
  name: 'academyModule',
  title: 'Academy Module',
  type: 'document',

  // Studio preview: show title + module number in the document list
  preview: {
    select: {
      title: 'title',
      moduleNumber: 'moduleNumber',
      courseTitle: 'courseTitle',
    },
    prepare({ title, moduleNumber, courseTitle }) {
      return {
        title: title || 'Untitled Module',
        subtitle: courseTitle
          ? `Module ${moduleNumber ?? '?'} · ${courseTitle}`
          : `Module ${moduleNumber ?? '?'}`,
      }
    },
  },

  fields: [
    // ── Identity ────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Module Title',
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

    // ── Course structure ─────────────────────────────────────────────────────
    defineField({
      name: 'courseTitle',
      title: 'Course Title',
      type: 'string',
      description: 'The parent course this module belongs to (e.g. "Value-Based Care Fundamentals")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'moduleNumber',
      title: 'Module Number',
      type: 'number',
      description: 'Position in the course sequence (1, 2, 3…)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),

    defineField({
      name: 'totalModules',
      title: 'Total Modules in Course',
      type: 'number',
      description: 'Total number of modules in the parent course — used to render progress (e.g. "2 of 5")',
    }),

    // ── Navigation between modules ───────────────────────────────────────────
    defineField({
      name: 'prevModuleSlug',
      title: 'Previous Module Slug',
      type: 'string',
      description: 'Slug of the preceding module (leave blank for Module 1)',
    }),

    defineField({
      name: 'nextModuleSlug',
      title: 'Next Module Slug',
      type: 'string',
      description: 'Slug of the following module (leave blank for final module)',
    }),

    // ── Pillar tag ───────────────────────────────────────────────────────────
    defineField({
      name: 'pillar',
      title: 'Primary Pillar',
      type: 'string',
      description: 'The HTR pillar this module primarily addresses',
      options: {
        list: [
          { title: 'Policy', value: 'Policy' },
          { title: 'Economics', value: 'Economics' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Clinical', value: 'Clinical' },
          { title: 'Equity', value: 'Equity' },
          { title: 'All Pillars', value: 'All' },
        ],
        layout: 'radio',
      },
    }),

    // ── Metadata ─────────────────────────────────────────────────────────────
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Foundational', value: 'Foundational' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      description: 'Approximate time to complete the module',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    // ── Learning objectives ──────────────────────────────────────────────────
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What the learner will be able to do after completing this module (3–5 objectives)',
    }),

    // ── Summary ──────────────────────────────────────────────────────────────
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description: '3–4 sentence abstract for the module listing page and meta description',
      validation: (Rule) => Rule.required(),
    }),

    // ── Body ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Full module content — same block types as policy analysis articles',
    }),
  ],
})