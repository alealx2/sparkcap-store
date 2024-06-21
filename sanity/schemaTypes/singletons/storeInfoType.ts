import {DashboardIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

export const storeInfoType = defineField({
  name: 'storeInfo',
  type: 'document',
  title: 'Store info',
  icon: DashboardIcon,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
    }),        
    defineField({
      title: 'Main logo',
      name: 'mainLogo',
      type: 'image',
    }),
    defineField({
      title: 'Second logo',
      name: 'secondLogo',
      type: 'image',
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: 'string',
    }),    
    defineField({
      title: 'Contact number',
      name: 'phone',
      type: 'string',
    }),   
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),            
    defineField({
      name: 'social',
      type: 'array',
      of: [{type: 'linkSocial'}],
      validation: (Rule) => Rule.max(4),
    }),    
    defineField({
      title: 'Copyright text',
      name: 'copyright',
      type: 'string',
    }),    
  ],
  preview: {
    select: {
      name: 'name',
      description: 'description',
      mainLogo: 'mainLogo',
      secondLogo: 'secondLogo',
      address: 'address',
      phone: 'phone',
      email: 'email',
      social: 'social',
      copyright: 'copyright',
    },
    prepare({name, description, mainLogo, secondLogo, address, phone, email, social, copyright}) {
      return {
        name,
        description,
        mainLogo,
        secondLogo,   
        address, 
        phone,        
        email, 
        social,
        copyright,
      }
    },
  },
})
