import {MenuIcon} from '@sanity/icons'
import {defineField, defineArrayMember} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export const megaMenuType = defineField({
  name: 'megaMenu',
  title: 'Mega menu',
  type: 'document',
  icon: MenuIcon,
  options: {
    collapsed: false,
    collapsible: true,
  },  
  fields: [
    defineField({
      name: 'title',
      title: 'Main menu text',
      type: 'string',
      description: 'Enter title of the main link',
    }),
    defineField({      
        name: 'mainlink',
        title: 'Main menu link',
        type: 'url',
        description: 'Enter the URL of the main link',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel', '#']
        })      
    }),     
    defineField({
      name: 'collectionLinks',
      title: 'Collection links',
      type: 'array',
      validation: (Rule) => Rule.unique().max(4),
      of: [
        defineArrayMember({
          name: 'collection',
          type: 'reference',
          weak: true,
          to: [{type: 'collection'}],
        }),
      ],
    }),       
    defineField({
      name: 'customLink',
      title: 'Custom menu link',
      type: 'string',
      description: 'Enter title of a custom menu link',
    }),    
    defineField({
      name: 'customUrl',
      title: 'Custom links',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel', '#']
      })       
    }),    
    defineField({
      name: 'images',
      title: 'Menu images',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Upload multiple images',
    })
  ],
  preview: {
    select: {
      title: 'title',
      mainlink: 'mainlink',
      collectionLinks: 'collectionLinks',
      customLink: 'customLink',
      customUrl: 'customUrl',
      images: 'images',
    },
    prepare({title, mainlink, collectionLinks, customLink, customUrl, images}) {
      return {
        title,
        mainlink,
        collectionLinks,   
        customLink, 
        customUrl,        
        images,
      }
    },
  },
})
