// sanity/schemaTypes/definition.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'definition',
  title: 'Glossary Definition',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term / Acronym',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Definition',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
})
