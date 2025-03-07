import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

type Source = string | { asset: { _ref: string } }

export const urlFor = (source: Source) => {
  if (typeof source !== 'string') {
    source = source.asset._ref
  }

  return builder.image(source)
}