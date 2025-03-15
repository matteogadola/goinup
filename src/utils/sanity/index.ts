import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

type Source = string | { asset: { _ref: string } }

export const urlFor = (source: Source) => {
  if (typeof source !== 'string') {
    source = source?.asset?._ref
  }

  return builder.image(source).url()
}

export const urlForDowload = (source: Source, name?: string) => {
  if (typeof source !== 'string') {
    source = source?.asset?._ref
  }

  const [_file, id, extension] = source.split('-');
  const filename = encodeURI(name ?? id)
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}.${extension}?dl=${filename}.${extension}`
}