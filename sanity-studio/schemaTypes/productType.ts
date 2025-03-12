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
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Iscrizione', value: 'entry'},
          {title: 'Carnet', value: 'carnet'},
          //{title: 'Cena', value: 'closed'},
          //{title: 'Maglietta', value: 'sold-out'},
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
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Immagini del prodotto',
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
    defineField({
      name: 'start_sale_date',
      type: 'datetime',
      title: 'Apertura iscrizioni',
      description: 'Data di inizio vendita iscrizioni',
    }),
    defineField({
      name: 'end_sale_date',
      type: 'datetime',
      title: 'Chiusura iscrizioni',
      description: 'Data di chiusura delle iscrizioni',
      //initialValue: ({ document }) => new Date(document?.date ?? '2024-01-01 21:00:00').toISOString(),
    }),
    defineField({
      name: 'entry_form',
      type: 'reference',
      to: [{type: 'entry_form'}],
      title: 'Form di Iscrizione',
      description: 'Modifica i campi nel form di iscrizione (nome, visibilità, obbligatorietà...)',
      hidden: ({document}) => document?.type !== 'entry' && document?.type !== 'carnet',
      readOnly: ({currentUser}) => !hasRole(currentUser, 'owner'),
      options: {
        disableNew: true,
      }
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
      initialValue: ['stripe', 'cash'],
      title: 'Metodi di Pagamento',
      readOnly: ({currentUser}) => !hasRole(currentUser, 'admin')
    }),
    
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'images'
    },
    prepare({title, subtitle, media}) {

      return {
        title: title,
        subtitle: subtitle,
        media: media?.[0]
      }
    }
  }
})
