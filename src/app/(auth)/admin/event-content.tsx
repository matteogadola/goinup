'use client';

import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useState, use, useEffect, cache } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { Attachment, Event } from '@/types/events'
//import { useSupabase } from '@/app/components/supabase-provider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase-auth-client'
import EntriesList from './entries-list';
import { Entry } from '@/types/entries';
import { Item } from '@/types/items';
import AttachmentsList from './attachments-list';
import AttachmentDialog from './attachment-dialog';
import EventStatus from './event-status';
import OrdersList from './orders';

type EventForm = Partial<Event>

type Props = {
  event: Event | undefined;
}

interface State {
  items: Item[];
  entries: any[]; // any[]
  isAddEntryDialogOpened: boolean;
}

const supabase = createClient();

const fetchEvent = cache(async (id: string) => {
  const { data } = await supabase
    .from('events')
    .select()
    .eq('id', id)
    .returns<Event[]>()
    .single();
  return data;
});

const fetchEventItems = cache(async (id: string | undefined) => {
  if (id === undefined) return [];

  const { data } = await supabase
    .from('items')
    .select()
    .eq('event_id', id)
    .returns<Item[]>();

  // if event date is today vendi solo on-site
  // in caso contrario solo ticket
  return data ?? [];
});

const fetchEntries = cache(async (event?: Event) => {
  if (!event?.id) return [];

  const { data } = event?.category === 'race-series'
    ? await supabase.from('v_entries_carnet').select().eq('item_id', 1022) // TODO !!!
    : await supabase.from('v_entries').select().eq('event_id', event.id);
  return data ?? [];
});

export default function EventContent({ event }: Props) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm()

  //const [entries, setEntries] = useState<any | undefined>(undefined)
  const [state, setState] = useState<State>({
    entries: [],
    items: [],
    isAddEntryDialogOpened: false,
  });

  useEffect(() => {
    Promise.all([
      fetchEntries(event),
      fetchEventItems(event?.id)
    ]).then((values) => {
      setState(state => ({ ...state, entries: values[0], items: values[1] }));
    }).catch((e) => {
      setState(state => ({ ...state, entries: [], items: [] }));
    });

    setValue('status', event?.status);
  }, [event, setValue]);



  const onSubmit: SubmitHandler<EventForm> = async (data) => {

  }






  return (
    <Suspense fallback={<Spinner />}>
      {event &&
        <section className="space-y-8">

          <h3 className="title">{event.name}</h3>
          <small className="text-gray-600">{dt(event.date).format("dddd DD MMMM - HH:mm")}</small>

          <EventStatus event={event} items={state.items} />

          <AttachmentsList event={event} />

          {
            ['race', 'race-series'].includes(event.category)
              ? <EntriesList entries={state.entries} event={event} items={state.items} />
              : <OrdersList event={event} />
          }

        </section>
      }
    </Suspense>
  )
}
