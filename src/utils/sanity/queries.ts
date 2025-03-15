import { client } from './client'
import clubs from '../data/names.json'
import municipalities from '../data/municipalities.json'

export const getSeries = async ({ year }: { year: number }) => {
  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "serie" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}

export const getEvents = async ({ year }: { year?: number } = {}) => {
  /*return client.fetch(`*[_type == "event"]{
    _id, title, slug
  }`)*/
  return client.fetch(`*[_type == "event"]`)

}

export const getUpcomingEvents = async () => {
  const today = new Date().toISOString().split('T')[0]
  //return client.fetch(`*[_type == "event" && type == "race" && status != "internal" && date >= "${today}"] | order(date) [0...2]`)
  return client.fetch(`*[_type == "event" && type == "race" && date >= "${today}"]{
    ...,
    products[]->
  } | order(date) [0...2]`)
}

export const getEvent = async (slug: string) => {
  return client.fetch(`*[_type == "event" && slug.current == $slug]{
  ...,
  products[]->
  }[0]`, { slug })

  //return client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug })
}

export const getSerieResults = async ({ year }: { year: number }) => {
  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "serie" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}

export const getResults = async ({ year }: { year: number }) => {
  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "race" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}

export const getPage = async (slug: string) => {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
}

export const getClubs = (): string[] => {
  return clubs
}

export const getMunicipalities = (): string[] => {
  return municipalities
}


