import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link';
//import { getEvent, getEvents } from '@utils/supabase/queries';
import { urlFor } from '@utils/sanity';
import { notFound } from 'next/navigation';
import { dt } from '@utils/date';
import { createClient } from '@/utils/supabase/server';
import ConsoleEventEntries from './event-entries';
import { MantineProvider, Tabs } from '@mantine/core';
import ConsoleEventTabs from './event-tabs';

interface Params {
  slug: string;
}

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

//export const revalidate = 1800 // 30 minutes
//export const dynamic = 'force-static';
//export const dynamicParams = false;

export default async function ConsoleEventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEvent(slug);

  const entries = await getEntries({ id: event.id, type: event.type });

  //const items = await getItems({ eventId: event.id, status: 'published' })

  return (
    <div className="">
      <div>
        {event.date && <span className="font-unbounded capitalize px-1 bg-yellow-200">{dt(event.date).format('ddd DD MMM')}</span>}
        <h1 className="font-unbounded text-2xl font-semibold uppercase">{event.name}</h1>
      </div>
      <div className="mt-4">
        <ConsoleEventTabs entries={entries} />
      </div>
      {/*<div>info ecc</div>
      <div>
        <span>Iscrizioni</span>
        <ConsoleEventEntries entries={entries} />
      </div>*/}
    </div>
  )
}


const getEvent = async (slug: string) => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .eq('slug', slug)
    .single()
  
  return data
}

const getEntries = async ({ id, type }: { id: string, type?: string}) => {
  const supabase = await createClient()

  const viewName = type === 'serie' ? 'v_entries_carnet' : 'v_entries'
  //const viewName = 'v_entries'

  const { data } = await supabase
    .from(viewName)
    .select()
    .eq('event_id', id)
    .returns<any[]>();

  return data ?? []
}

