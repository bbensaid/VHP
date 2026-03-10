import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Email Subscriber',
  type: 'document',
  preview: {
    select: { title: 'email', subtitle: 'tier' },
  },
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'tier',
      title: 'Subscription Tier',
      type: 'string',
      initialValue: 'free',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Pro', value: 'pro' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active Subscription',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'digestEnabled',
      title: 'Weekly Digest Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    }),
  ],
})
