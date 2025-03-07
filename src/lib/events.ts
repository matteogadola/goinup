import supabase from './supabase';

import { Event, EventStatus } from '@/types/events';
import { dt } from './date';
import { cache } from 'react';

interface GetEventsProps {
  fromDate: string;
  orderBy: string;
  limit: number;
  status: EventStatus;
  notInternal: boolean;
  promoterId: string;
}

export const getEvents = async (props?: Partial<GetEventsProps>) => {
  const queryBuilder = supabase.from('events').select();

  if (props?.fromDate) {
    queryBuilder.gte('date', props.fromDate);
  }
  if (props?.promoterId) {
    queryBuilder.eq('promoter_id', props.promoterId);
  }
  if (props?.status) {
    queryBuilder.eq('status', props.status);
  }
  if (props?.notInternal) { // a tendere elimina
    queryBuilder.neq('status', 'internal');
  }
  if (props?.status) {
    queryBuilder.eq('status', props.status);
  }
  if (props?.orderBy) {
    queryBuilder.order(props.orderBy, { ascending: true });
  }
  if (props?.limit) {
    queryBuilder.limit(props.limit);
  }

  const { data } = await queryBuilder.returns<Event[]>();
  return data ?? [];
};

export const getEvent = async (id: string) => {
  const { data } = await supabase
    .from('events')
    .select(`
      *,
      promoter:promoters (id, name, stripe_account),
      items (*)`
    )
    .eq('id', id)
    .returns<Event[]>()
    .single();

  return data;
};

export async function createEvent(race: Omit<any, 'id'>) {
  /*  const normalizedName = race.name
    .replace(/[ÀÁÂÃÄÅ]/g,'A')
    .replace(/[ÈÉÊË]/g,'E')
    .replace(/[Î]/g,'I')
    .replace(/[Ô]/g,'O')
    .replace(/[Ù]/g,'U')
    .replace(/[àáâãäå]/g,'a')
    .replace(/[èéêë]/g,'e')
    .replace(/[ìíîï]/g,'i')
    .replace(/[òóôõö]/g,'o')
    .replace(/[ù]/g,'u')
    .replace(/[^a-zA-Z0-9]/g,'-')
    .toLowerCase();

  return await setDoc(doc(db, 'races', `${normalizedName}-${race.edition}`), race);*/
}
