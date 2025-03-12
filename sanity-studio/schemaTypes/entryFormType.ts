import { defineField, defineType, defineArrayMember } from 'sanity'
import { hasRole } from '../lib/auth'
/*
per ogni campo...
label: string
required: boolean 
placeholder: string
*/
const fields = [
  {name: 'visible', type: 'boolean', title: 'Attivo'},
  {name: 'required', type: 'boolean', title: 'Obbligatorio'},
  {name: 'label', type: 'string', title: 'Label'},
  {name: 'placeholder', type: 'string', title: 'Placeholder'},
]

export const entryFormType = defineType({
  name: 'entry_form',
  title: 'Form di Iscrizione',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nome',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'first_name',
      title: 'Nome',
      type: 'object',
      fields,
    }),
    defineField({
      name: 'last_name',
      title: 'Cognome',
      type: 'object',
      fields,
    }),
  ],
  /*preview: {
    select: {
      title: 'name',
      date: 'date',
      media: 'summary_image'
    },
    prepare({title, date, media}) {
      const formatter = new Intl.DateTimeFormat('it', { month: 'long' });
      const subtitle = date ? formatter.format(new Date(date)) + ' ' + new Date(date).getFullYear().toString() : '';

      return {
        title: title,
        subtitle: subtitle,
        media: media
      }
    }
  }*/
})
