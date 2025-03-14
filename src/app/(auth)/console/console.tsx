'use client'

import clsx from 'clsx';
import { Suspense, useEffect, useState } from 'react'
/*import { createClient } from '@/lib/supabase-auth-client'
import { Event, EventStatus } from '@/types/events'
import { Item, ItemStatus } from '@/types/items'
import Spinner from '@/components/spinner'
import classNames from 'classnames'*/
import EventContent from './event-content'

type Props = {
  events: Event[];
}

interface State {
  events: any[];
  event: any | undefined;
}

export default function Console({ events }: Props) {
  const [state, setState] = useState<State>({ events, event: undefined });

  const selectEvent = (event: Event) => {
    setState({ ...state, event })
  }

  return (
    <section className="page">
      {!!state.events.length &&
        <div className="flex">

          <div>
            <ul className="separator">
              {state.events.map((item, index) =>
                <li key={index} className="py-2 whitespace-nowrap">
                  <button onClick={() => selectEvent(item)} className={clsx({ 'font-semibold': state.event?.id === item.id }, "hover:opacity-80")}>{item.name}</button>
                </li>
              )}
            </ul>
          </div>

          <div className="pl-10 pt-1">
            <EventContent event={state.event} />
          </div>

        </div>
      }
    </section>
  )
}
