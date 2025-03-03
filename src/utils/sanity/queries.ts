import {client} from './client'

// aggiungi anno
export const getEvents = () => {
  /*return client.fetch(`*[_type == "event"]{
    _id, title, slug
  }`)*/
  return client.fetch(`*[_type == "event"]`)
}

export const getUpcomingEvents = () => {
  const today = new Date().toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && status != "internal" && date >= "${today}"] | order(date) [0...2]`)
}

export const getEvent = (slug: string) => {
  return client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug })
}
