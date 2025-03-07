import {defineField, defineType, defineArrayMember} from 'sanity'
import { hasRole } from '../lib/auth'

export const serieType = defineType({
  name: 'serie',
  title: 'Serie',
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
      name: 'start_date',
      type: 'datetime',
      title: 'Data di Inizio',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'end_date',
      type: 'datetime',
      title: 'Data di Fine',
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
      name: 'summary_image',
      type: 'image',
      title: 'Locandina',
      description: 'Locandina del circuito da mostrare in homepage',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Descrizione',
      description: 'Descrizione dettagliata che comparirà nella pagina dedicata all\'evento',
    }),
    defineField({
      name: 'flyer',
      type: 'image',
      title: 'Immagine carnet',
      description: 'Immagine per la sezione di vendita del carnet',
    }),
    defineField({
      name: 'opening_date',
      type: 'datetime',
      title: 'Apertura iscrizioni',
      description: 'Data di inizio vendita iscrizioni',
    }),
    defineField({
      name: 'closing_date',
      type: 'datetime',
      title: 'Chiusura iscrizioni',
      description: 'Data di chiusura delle iscrizioni',
      //initialValue: ({ document }) => new Date(document?.date ?? '2024-01-01 21:00:00').toISOString(),
    }),
    defineField({
      name: 'payment_methods',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Bonifico', value: 'sepa'},
          {title: 'Stripe', value: 'stripe'},
          {title: 'Contanti', value: 'cash'},
        ]
      },
      initialValue: ['stripe', 'sepa'],
      title: 'Metodi di Pagamento',
      readOnly: ({currentUser}) => !hasRole(currentUser, 'admin')
    }),
    defineField({
      name: 'results',
      type: 'array',
      title: 'Classifica',
      of: [
        defineArrayMember({
          name: 'result',
          type: 'object',
          fields: [
            {name: 'title', type: 'string'},
            {name: 'file', type: 'file'},
          ]
        })
      ],
      hidden: ({document}) => document?.date ? new Date(document.date.toString()) > new Date() : true,
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'media',
          type: 'object',
          fields: [
            {name: 'title', type: 'string'},
            {name: 'url', type: 'string'},
          ]
        })
      ],
      hidden: ({document}) => document?.date ? new Date(document.date.toString()) > new Date() : true,
    }),
    
  ],
  preview: {
    select: {
      title: 'name',
      date: 'start_date',
      media: 'summary_image'
    },
    prepare({title, date, media}) {
      const subtitle = date ? new Date(date).getFullYear().toString() : '';

      return {
        title: title,
        subtitle: subtitle,
        media: media
      }
    }
  }
})
