import supabase from './supabase';

import { Event } from '@/types/events';
import { dt } from './date';
import { Entry, PartialEntry } from '@/types/entries';
import Stripe from 'stripe';
import { cache } from 'react';

interface GetEventsProps {
  eventId: string;
  //orderBy: string;
}

/*export async function getEntries(props?: Partial<GetEventsProps>) {
  const queryBuilder = supabase.from('entries').select()

  if (props?.fromDate) {
    queryBuilder.gte('date', props.fromDate)
  }
  if (props?.orderBy) {
    queryBuilder.order(props.orderBy, { ascending: true })
  }

  const { data } = await queryBuilder.returns<Event[]>()
  return data ?? []
}*/
type CreateEntryParams = Omit<
  Entry,
  | 'id'
  | 'entrant_birth_date'
  | 'entrant_gender'
  | 'entrant_country'
  | 'detail'
  | 'bib_number'
  | 'payment_id'
  | 'payment_status'
>;

interface GetEntriesProps {
  eventId: string;
}

//cache
export const getEntries = async (props?: Partial<GetEntriesProps>) => {
  const queryBuilder = supabase.from('v_entries').select('event_id, first_name, last_name, birth_year, gender, team');

  if (props?.eventId) {
    queryBuilder.eq('event_id', props.eventId);
  }

  const { data } = await queryBuilder.returns<PartialEntry[]>();
  return data ?? [];
};

export const getEntry = async (id: string) => {
  const { data } = await supabase.from('entries').select().eq('id', id).returns<Entry[]>().single();

  return data;
};

export async function updateEntry(id: string, params: Partial<Omit<Entry, 'id' | 'ticket_id'>>) {
  const { data, error } = await supabase.from('entries').update(params).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteEntries(props: Partial<Pick<Entry, 'order_item_id'>>) {
  const queryBuilder = supabase.from('entries').delete();

  if (props?.order_item_id) {
    queryBuilder.eq('order_item_id', props.order_item_id);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
