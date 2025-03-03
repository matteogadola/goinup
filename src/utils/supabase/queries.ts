import { createClient } from './server'

export const getUpcomingEvents = async () => {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('events')
    .select(`
      *,
      promoter:promoters (id, name, stripe_account),
      items (*)`
    )
    .neq('status', 'internal')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(3)
    .returns<Event[]>()

  return data ?? [];

  //return client.fetch(`*[_type == "event" && status != "internal" && date >= "${today}"] | order(date) [0...2]`)
}
