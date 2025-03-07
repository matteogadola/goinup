import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { cache } from 'react'
import supabase from '@/lib/supabase'
import { dt } from '@/lib/date'
import { Event } from '@/types/events'
import { LinkIcon, PhotoIcon, VideoIcon } from '@/app/components/icons'

export const revalidate = 3600

export const metadata = {
  title: 'Foto | Goinup',
  description: 'Foto',
}

const fetchEvents = cache(async () => {
  const { data } = await supabase
    .from('events')
    .select(`id, name, edition, date, category, attachments!inner (*)`)
    .neq('attachments.type', 'result')
    //.gte('date', dt().startOf('year').format())
    .order('date', { ascending: false })
    .returns<Event[]>();
  return data ?? [];
});

export default async function MediaPage() {
  const events = await fetchEvents();

  return (
    <section className="page">
      <h1 className="overtitle">Allegati</h1>
      <h1 className="title">Media</h1>

      <div className="mt-8 space-y-8">
        {events.map(event =>
          <div key={event.id} className="w-full lg:w-1/3 p-6 shadow">
            {event.category === 'race'
              ? <>
                <span className="overtitle">{event.edition}° {event.name}</span>
                <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
              </>
              : <span className="overtitle">{event.name} {dt(event.date).format('YYYY')}</span>
            }

            <div className="mt-4">
              <ul className="space-y-4">
                {event.attachments?.map((attachment: any, index: any) =>
                  <li key={index} className="flex space-x-2">
                    {attachment.type === 'photo'
                      ? <PhotoIcon />
                      : attachment.type === 'video'
                        ? <VideoIcon />
                        : <LinkIcon />
                    }
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
