import {defineField, defineType, defineArrayMember} from 'sanity'
import { hasRole } from '../lib/auth'

export const productType = defineType({
  name: 'product',
  title: 'Prodotto',
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
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Iscrizione', value: 'entry'},
          {title: 'Carnet', value: 'carnet'},
          {title: 'Cena', value: 'closed'},
          {title: 'Maglietta', value: 'sold-out'},
        ]
      },
      initialValue: 'entry',
      title: 'Tipo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Nascosto', value: 'internal'},
          {title: 'Aperto', value: 'open'},
          {title: 'Chiuso', value: 'closed'},
          {title: 'Sold out', value: 'sold-out'},
        ]
      },
      initialValue: 'internal',
      title: 'Stato',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Sommario',
      description: 'Breve descrizione dell\'evento che comparirà in homepage',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Immagini',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Descrizione',
      description: 'Descrizione dettagliata che comparirà nella pagina dedicata all\'evento',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Prezzo',
      description: 'In centesimi di euro (es. 10€ => 1000)',
      validation: Rule => Rule.required().integer().min(100),
    }),
    defineField({
      name: 'stock',
      type: 'number',
      title: 'Quantità disponibile',
      validation: Rule => Rule.integer(),
    }),
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images'
    },
    prepare({title, media}) {

      return {
        title: title,
        //subtitle: subtitle,
        media: media?.[0]
      }
    }
  }
})
