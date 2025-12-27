import {defineField, defineType} from 'sanity'
import React from 'react'

export default defineType({
  name: 'policyAnalysis',
  title: 'Policy Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          {title: 'Policy', value: 'Policy'},
          {title: 'Economics', value: 'Economics'},
          {title: 'Technology', value: 'Technology'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (Menu Slug)',
      description: 'Must match a folder name (e.g. workflow, ai, market)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Active', 'Proposed', 'In Committee'],
      },
    }),
    defineField({
      name: 'impactLevel',
      title: 'Impact Level',
      type: 'string',
      options: {
        list: ['Critical', 'High', 'Medium'],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),

    // --- THE BODY BLOCK ---
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          // 🚨 HYDRATION FIX: Standard JSX <span>
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {
              title: 'Quote',
              value: 'blockquote',
              component: (props) => (
                <span
                  style={{
                    display: 'block',
                    borderLeft: '4px solid #e2e8f0',
                    paddingLeft: '1rem',
                    color: '#64748b',
                    fontStyle: 'italic',
                  }}
                >
                  {props.children}
                </span>
              ),
            },
          ],
        },

        // IMAGE BLOCK
        {
          type: 'image',
          fields: [
            {name: 'caption', type: 'string', title: 'Caption'},
            {name: 'alt', type: 'string', title: 'Alt Text'},
          ],
        },

        // DATA TABLE BLOCK
        {
          type: 'code',
          title: 'Data Table (JSON)',
          options: {language: 'json'},
        },

        // --- VIDEO BLOCK ---
        {
          name: 'video',
          title: 'Video Player',
          type: 'object',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              description: 'Paste a YouTube link here...',
            },
            {
              name: 'videoFile',
              type: 'file',
              title: 'OR Upload Video File',
              description: 'Drag and drop an MP4 here (overrides URL)',
              options: {accept: 'video/*'},
            },
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'url',
              media: 'videoFile',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Video Block',
                subtitle: subtitle || 'Uploaded Video or YouTube',
                media: media,
              }
            },
          },
        },

        // AUDIO BLOCK
        {
          name: 'audio',
          title: 'Audio Player',
          type: 'object',
          fields: [
            {name: 'file', type: 'file', title: 'Audio File'},
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'summary', type: 'string', title: 'Summary'},
          ],
        },
      ],
    }),
  ],
})
