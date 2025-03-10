import {defineField, defineType, defineArrayMember} from 'sanity'
import { hasRole } from '../lib/auth'

export const pageType = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nome',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Url',
      validation: Rule => Rule.required(),
      readOnly: ({currentUser}) => !hasRole(currentUser, 'owner'),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Sommario',
      description: '',
      hidden: true
    }),
    defineField({
      name: 'summary_image',
      type: 'image',
      title: 'Immagine di copertina',
      description: 'Immagine rappresentativa che comparirà in homepage',
      hidden: true,
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Contenuto',
      description: 'Contenuto della pagina',
    }),
    defineField({
      name: 'html',
      type: 'text',
      title: 'Html',
      description: '',
      readOnly: ({currentUser}) => !hasRole(currentUser, 'owner'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug',
      media: 'summary_image'
    },
    prepare({title, subtitle, media}) {

      return {
        title: title,
        subtitle: subtitle.current,
        media: media
      }
    }
  }
})
