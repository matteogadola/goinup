import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { cache } from 'react'
import supabase from '@/lib/supabase'
import { dt } from '@/lib/date'
import { Event } from '@/types/events'

export const revalidate = 3600

export const metadata = {
  title: 'Classifiche | Goinup',
  description: 'Classifiche',
}

const fetchEvents = cache(async () => {
  const { data } = await supabase
    .from('events')
    .select(`id, name, edition, date, category, attachments!inner (*)`)
    .eq('attachments.type', 'result')
    //.gte('date', dt().startOf('year').format())
    //.order('category', { ascending: false })
    .order('date', { ascending: false })
    .returns<Event[]>();

  return data ?? [];
});

export default async function ResultsPage() {
  const events = await fetchEvents();

  return (
    <section className="page">
      <h1 className="overtitle">Allegati</h1>
      <h1 className="title">Classifiche</h1>

      <div className="mt-8 space-y-8">
        {events.map(event =>
          <div key={event.id} className="w-full lg:w-1/3 p-6 shadow">
            <span className="overtitle">{event.edition}° {event.name}</span>
            {event.category === 'race' &&
              <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
            }

            <div className="mt-4">
              <ul className="space-y-4">
                {event.attachments?.map((attachment: any, index: any) =>
                  <li key={index} className="flex space-x-2">
                    <a href={attachment.url} target='_blank' className="text-lg hover:opacity-70">{attachment.name}</a>
                  </li>
                )}
              </ul>
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
