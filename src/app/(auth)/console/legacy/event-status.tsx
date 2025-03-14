'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-auth-client'
import { Event, EventStatus } from '@/types/events'
import { Item, ItemStatus } from '@/types/items'

type Props = {
  className?: string;
  event: Event;
  items: Item[];
}

interface State {
  status: EventStatus;
  items: Item[];
  error: string | undefined;
  isLoading: boolean;
}

const supabase = createClient();

const updateEvent = async (id: string, event: Partial<Event>) => {
  const { error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id);

  if (error) {
    console.error(error)
    throw new Error(`Errore inatteso: ${error.code}`);
  }
};

const updateItem = async (id: number, item: Partial<Item>) => {
  const { error } = await supabase
    .from('items')
    .update(item)
    .eq('id', id);

  if (error) {
    console.error(error)
    throw new Error(`Errore inatteso: ${error.code}`);
  }
};

export default function EventStatus({ className, event, items }: Props) {
  const [state, setState] = useState<State>({ status: 'internal', items: [], error: '', isLoading: false });
  // quello sopra non funziona, perché?
  const [status, setStatus] = useState<EventStatus>('internal');
  const [itemsStatus, setItemsStatus] = useState<Item[]>([]);

  useEffect(() => {
    setState(state => ({ ...state, status: event.status, items }));
    setStatus(event.status)
    setItemsStatus(items)
  }, [event, items]);

  const onChangeEventStatus = async (status: EventStatus) => {
    try {
      console.log("imposto status", status)
      //setState({ ...state, isLoading: true });

      await updateEvent(event.id, { status });
      //setState(curr => ({ ...curr, status }));
      //setState(state => ({ ...state, status: "internal" }));
      setStatus(status);

    } catch (e: any) {
      console.error(e.message)
      setState({ ...state, error: e.message });
    } finally {
      setState({ ...state, isLoading: false });
    }
  }

  const onChangeItemStatus = async (id: number, status: ItemStatus) => {
    try {
      const index = items.findIndex(item => item.id === id);
      //setState({ ...state, isLoading: true });
      if (index >= 0) {
        await updateItem(id, { status: status as ItemStatus });

        items[index] = { ...items[index], status }
        //setState({ ...state, items });
        setItemsStatus(items)
      }
    } catch (e: any) {
      console.error(e.message)
      setState({ ...state, error: e.message });
    } finally {
      setState({ ...state, isLoading: false });
    }
  }

  return (
    <section>

      <form>
        <ul className="w-80 space-y-4">
          <li>
            <div>
              <label className="label" htmlFor="type">Evento</label>
              <select value={status}
                onChange={(e) => onChangeEventStatus(e.target.value as EventStatus)}
                className="field"
              >
                <option value='internal'>Non visibile</option>
                <option value='published'>Visibile con link</option>
                <option value='scheduled'>Visibile</option>
              </select>
            </div>
          </li>

          {itemsStatus.map((item, index) =>
            <li key={index}>
              <div>
                <label className="label" htmlFor="type">{item.name}</label>
                <select value={item.status}
                  onChange={(e) => onChangeItemStatus(item.id, e.target.value as ItemStatus)}
                  className="field"
                >
                  <option value='internal'>Chiusa</option>
                  <option value='published'>Aperta</option>
                </select>
              </div>
            </li>
          )}

        </ul>
      </form>
    </section>
  )
}
