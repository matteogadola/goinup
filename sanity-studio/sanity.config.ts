import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
//import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'goinupvertical',
  projectId: '5jqfesyl',
  dataset: 'production',
  plugins: [
    structureTool(), // studia!!! https://www.sanity.io/docs/structure-builder-reference
    // filtra eventi per anno...o meglio, mostra solo anno corrente se user diverso da admin
    // ordina per data evento ASC
    visionTool(),
    /*presentationTool({
      previewUrl: {
        origin: 'https://goinupvertical.it',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),*/
  ],
  schema: {
    types: schemaTypes,
  },
})
