import Link from 'next/link'

import { dt, getDate, getReadableDate, getTime } from '@/lib/date'
import { Event } from '@/types/events'
import { getEvents } from '@/lib/events'
import { Suspense } from 'react'
import Spinner from './spinner'

// queste info andrebbero prese da DB
// close | open | soldOut
// { races }
// <h1 className="text-4xl">Le Gare</h1>

// <button className="mt-2 px-2 py-1 bg-blue-500 text-white text-sm uppercase font-medium rounded hover:bg-blue-400">Informazioni</button>
// <h3>GOinUP è un circuito podistico a scopo benefico della Bassa Valtellina formato da 8 gare only up</h3>

interface Props {
  list: Event[] | Promise<Event[]>;
}

export default async function EventsList ({ list }: Props) {
  const events = await list

  return (
    <Suspense fallback={<Spinner />}>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container mx-auto">
          <div className="divide-y-2 divide-gray-50">

            {
              events.map(event => (
                <div key={event.id}>
                  <Link href={`events/${event.id}`}>
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                      <div className="md:w-32 flex-shrink-0 flex flex-col">
                        <span className="text-violet-500 text-lg uppercase">{getDate(event.date)}</span>
                        <span className="mt-1 text-slate-800 text-sm">{getTime(event.date)}</span>
                      </div>
                      <div className="md:flex-grow">
                        <h2 className="text-2xl text-gray-900 mb-2">{event.edition && <span>{ event.edition }° </span>}{ event.name }</h2>
                        <p className="leading-relaxed">{ event.summary }</p>
                        <button className="text-purple-500 inline-flex items-center mt-2">Informazioni
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </Suspense>
  )
}
