import { defineField, defineType, defineArrayMember } from 'sanity'
import { hasRole } from '../lib/auth'

export const eventType = defineType({
  name: 'event',
  title: 'Evento',
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
      name: 'date',
      type: 'datetime',
      title: 'Data',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Gara', value: 'race'},
          {title: 'Circuito', value: 'serie'},
          {title: 'Cena', value: 'dining'},
          {title: 'Premiazione', value: 'award'},
        ]
      },
      title: 'Tipo',
      validation: Rule => Rule.required(),
      readOnly: ({currentUser}) => !hasRole(currentUser, 'owner')
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Nascosto', value: 'internal'},
          {title: 'Visibile', value: 'open'},
          //{title: 'Chiuso', value: 'closed'},
          //{title: 'Sold out', value: 'sold-out'},
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
      title: 'Immagine di copertina',
      description: 'Immagine rappresentativa che comparirà in homepage',
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
      title: 'Locandina',
      description: 'Locandina con i dettagli dell\'evento',
    }),
    defineField({
      title: 'Dettagli gara',
      name: 'details',
      type: 'object',
      fields: [
        {name: 'distance', type: 'number', title: 'Distanza'},
        {name: 'elevation_gain', type: 'number', title: 'Dislivello'},
        {name: 'start_line', type: 'string', title: 'Luogo di Partenza'},
        {name: 'finish_line', type: 'string', title: 'Luogo di Arrivo'},
      ],
      hidden: ({document}) => document?.type !== 'race',
    }),
    defineField({
      name: 'products',
      type: 'array',
      title: 'Prodotti',
      of: [{
        type: 'reference',
        to: [{type: 'product'}],
        options: {
          disableNew: true,
        }
      }],
      readOnly: ({currentUser}) => !hasRole(currentUser, 'owner'),
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
      date: 'date',
      flyer: 'flyer',
      summary: 'summary_image'
    },
    prepare({title, date, flyer, summary}) {
      const formatter = new Intl.DateTimeFormat('it', { day: 'numeric', month: 'long', year: 'numeric' });
      const subtitle = date ? formatter.format(new Date(date)) : '';

      return {
        title: title,
        subtitle: subtitle,
        media: flyer ?? summary
      }
    }
  },
  orderings: [
    {
      title: 'Date',
      name: 'date',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
  ],
})
