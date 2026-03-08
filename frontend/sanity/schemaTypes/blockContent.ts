import { defineType, defineArrayMember } from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // ── Standard rich text block ──────────────────────────────────────────────
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal',    value: 'normal'    },
        { title: 'H1',        value: 'h1'        },
        { title: 'H2',        value: 'h2'        },
        { title: 'H3',        value: 'h3'        },
        { title: 'H4',        value: 'h4'        },
        { title: 'Quote',     value: 'quote'     },
        { title: 'Highlight', value: 'highlight' },
        { title: 'Callout',   value: 'callout'   },
      ],
      lists: [
        { title: 'Bullet',   value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong',    value: 'strong'        },
          { title: 'Emphasis',  value: 'em'            },
          { title: 'Underline', value: 'underline'     },
          { title: 'Strike',    value: 'strike-through'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{ title: 'URL', name: 'href', type: 'url' }],
          },
        ],
      },
    }),

    // ── Image ─────────────────────────────────────────────────────────────────
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Caption' },
        { name: 'alt',     type: 'string', title: 'Alternative Text' },
      ],
    }),

    // ── Code / data table ─────────────────────────────────────────────────────
    defineArrayMember({
      type: 'code',
      options: { language: 'json' },
    }),

    // ── Video ─────────────────────────────────────────────────────────────────
    defineArrayMember({
      type: 'object', name: 'video', title: 'Video',
      fields: [
        { name: 'url',     type: 'url',    title: 'URL'     },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
      preview: { select: { title: 'caption', subtitle: 'url' } },
    }),

    // ── Audio ─────────────────────────────────────────────────────────────────
    defineArrayMember({
      type: 'object', name: 'audio', title: 'Audio',
      fields: [
        { name: 'title',   type: 'string', title: 'Title'   },
        { name: 'url',     type: 'url',    title: 'URL'     },
        { name: 'summary', type: 'string', title: 'Summary' },
      ],
      preview: { select: { title: 'title', subtitle: 'summary' } },
    }),

    // ════════════════════════════════════════════════════════════════════════════
    // EDUCATIONAL BLOCK TYPES — Academy / Course modules only
    // ════════════════════════════════════════════════════════════════════════════

    // ── Stat Grid: 2–4 striking statistics displayed as visual cards ──────────
    defineArrayMember({
      type: 'object', name: 'statGrid', title: 'Stat Grid',
      preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `📊 Stat Grid: ${title || ''}` }) },
      fields: [
        { name: 'title', type: 'string', title: 'Title (optional)' },
        {
          name: 'stats', type: 'array', title: 'Statistics',
          of: [{
            type: 'object',
            fields: [
              { name: 'value',   type: 'string', title: 'Value (e.g. "$4.1T", "37th", "26¢")' },
              { name: 'label',   type: 'string', title: 'Short label' },
              { name: 'context', type: 'string', title: 'One-sentence context' },
              {
                name: 'trend', type: 'string', title: 'Trend arrow',
                options: { list: [
                  { title: '↑ Up (good)',    value: 'up'      },
                  { title: '↓ Down (bad)',   value: 'down'    },
                  { title: '→ Neutral',      value: 'neutral' },
                ]},
              },
            ],
          }],
        },
      ],
    }),

    // ── Real-World Example: a named organization, what they did, what happened ─
    defineArrayMember({
      type: 'object', name: 'exampleBlock', title: 'Real-World Example',
      preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `🌍 Example: ${title || ''}` }) },
      fields: [
        { name: 'eyebrow',  type: 'string', title: 'Eyebrow (e.g. "Real-World Example", "Case Study")', initialValue: 'Real-World Example' },
        { name: 'title',    type: 'string', title: 'Title / Organization' },
        { name: 'body',     type: 'text',   title: 'What happened (2–4 sentences)' },
        { name: 'outcome',  type: 'string', title: 'Measurable outcome (1 sentence)' },
        { name: 'source',   type: 'string', title: 'Source attribution' },
      ],
    }),

    // ── Analogy: maps abstract concept to everyday experience ─────────────────
    defineArrayMember({
      type: 'object', name: 'analogyBlock', title: 'Analogy',
      preview: { select: { title: 'concept' }, prepare: ({ title }) => ({ title: `🔗 Analogy: ${title || ''}` }) },
      fields: [
        { name: 'concept',  type: 'string', title: 'Concept being explained' },
        { name: 'analogy',  type: 'text',   title: 'The analogy (plain everyday language)' },
        { name: 'bridge',   type: 'text',   title: 'Bridge back to healthcare (1–2 sentences)' },
      ],
    }),

    // ── Comparison: old vs new, model A vs model B ────────────────────────────
    defineArrayMember({
      type: 'object', name: 'comparisonBlock', title: 'Comparison Table',
      preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `⚖️ Comparison: ${title || ''}` }) },
      fields: [
        { name: 'title',      type: 'string', title: 'Title (optional)' },
        { name: 'leftLabel',  type: 'string', title: 'Left column label (old/bad/FFS)' },
        { name: 'rightLabel', type: 'string', title: 'Right column label (new/good/VBC)' },
        {
          name: 'rows', type: 'array', title: 'Rows',
          of: [{
            type: 'object',
            fields: [
              { name: 'aspect', type: 'string', title: 'Dimension / aspect' },
              { name: 'left',   type: 'string', title: 'Left value' },
              { name: 'right',  type: 'string', title: 'Right value' },
            ],
          }],
        },
      ],
    }),

    // ── Step-by-Step: numbered process flow ───────────────────────────────────
    defineArrayMember({
      type: 'object', name: 'stepBlock', title: 'Step-by-Step Process',
      preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `📋 Steps: ${title || ''}` }) },
      fields: [
        { name: 'title', type: 'string', title: 'Process title' },
        {
          name: 'steps', type: 'array', title: 'Steps',
          of: [{
            type: 'object',
            fields: [
              { name: 'number',      type: 'number', title: 'Step number' },
              { name: 'title',       type: 'string', title: 'Step title' },
              { name: 'description', type: 'text',   title: 'Step description' },
            ],
          }],
        },
      ],
    }),

    // ── Knowledge Check: comprehension prompt with revealed answer ────────────
    defineArrayMember({
      type: 'object', name: 'knowledgeCheck', title: 'Knowledge Check',
      preview: { select: { title: 'question' }, prepare: ({ title }) => ({ title: `❓ Check: ${title?.slice(0, 50) || ''}` }) },
      fields: [
        { name: 'question', type: 'text',   title: 'Question' },
        { name: 'hint',     type: 'string', title: 'Hint (optional)' },
        { name: 'answer',   type: 'text',   title: 'Full answer / explanation' },
      ],
    }),

    // ── Key Takeaways: end-of-section summary bullets ─────────────────────────
    defineArrayMember({
      type: 'object', name: 'takeawayBlock', title: 'Key Takeaways',
      preview: { prepare: () => ({ title: '✅ Key Takeaways' }) },
      fields: [
        { name: 'title',  type: 'string', title: 'Title', initialValue: 'Key Takeaways' },
        { name: 'points', type: 'array',  title: 'Points', of: [{ type: 'string' }] },
      ],
    }),

    // ── Misconception Buster: wrong belief → correct reality ──────────────────
    defineArrayMember({
      type: 'object', name: 'warningBlock', title: 'Common Misconception',
      preview: { select: { title: 'misconception' }, prepare: ({ title }) => ({ title: `⚠️ Myth: ${title?.slice(0, 50) || ''}` }) },
      fields: [
        { name: 'misconception', type: 'text', title: '❌ The misconception (what people wrongly believe)' },
        { name: 'reality',       type: 'text', title: '✅ The reality (the truth)' },
      ],
    }),
  ],
})
