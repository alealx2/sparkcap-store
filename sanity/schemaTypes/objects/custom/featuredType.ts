import {defineField} from 'sanity'

export const featuredType = defineField({
  title: 'Featured block',
  name: 'featured',
  type: 'object',
  fields: [
    defineField({
        name: 'title',
        title: 'Featued block title',
        type: 'string',
      }), 
      defineField({
        name: 'text',
        title: 'Featued block text',
        type: 'string',
      }),
    defineField({
      name: 'image',
      title: 'Featued block icon',
      type: 'image',
    }), 
  ],
})
