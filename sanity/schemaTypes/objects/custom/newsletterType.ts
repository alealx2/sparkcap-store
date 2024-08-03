import {defineField} from 'sanity'

export const newsletterType = defineField({
  title: 'Newsletter',
  name: 'newsletter',
  type: 'object',
  fields: [
    defineField({
        name: 'text',
        title: 'Newsletter section title',
        type: 'string',
      }), 
      defineField({
        name: 'buttontxt',
        title: 'Newsletter button text',
        type: 'string',
      }),
    defineField({
      name: 'image',
      title: 'Newsletter section image',
      type: 'image',
    }), 
  ],
})
