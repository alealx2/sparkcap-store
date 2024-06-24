import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'
import { GROUPS } from '../../constants'

const TITLE = 'Home'

export const homeType = defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hero',
      type: 'array',
      of: [{type: 'hero'}],
      group: 'editorial',
    }),
    defineField({
      name: 'productHotspot',
      type: 'array',
      of: [{type: 'imageWithProductHotspots'}],
      group: 'editorial',
    }),  
    defineField({
      name: 'featured',
      type: 'array',
      of: [{type: 'featured'}],
      group: 'editorial',
    }),      
    defineField({
      title: 'Want to add newsletter?',
      name: 'showNewsletter',
      type: 'boolean',
      initialValue: false,
      group: 'editorial',
    }),
    defineField({
      name: 'newsletter',
      type: 'newsletter',
      hidden: ({parent}) => !parent.showNewsletter,
      group: 'editorial',
    }),    
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        media: HomeIcon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
