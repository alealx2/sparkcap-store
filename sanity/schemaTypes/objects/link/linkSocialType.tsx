import {UsersIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const linkSocialType = defineField({
  title: 'Social network',
  name: 'linkSocial',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Social network logo',
      type: 'image',
    }),  
    defineField({
      name: 'url',
      title: 'Social network url',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
