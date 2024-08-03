import {MenuIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export const footerMenuType = defineField({
  name: 'footerMenu',
  title: 'Footer menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu title',
      type: 'string',
      description: 'Enter title text to display for menu',
    }),
    defineField({
      title: 'Menu links',
      name: 'menulinks',
      type: 'menuLinks',
      description: 'Add the menu links for the footer',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      menulinks: 'menulinks',
    },
    prepare({title, menulinks}) {
      return {
        title,
        menulinks,        
      }
    },
  },
})
