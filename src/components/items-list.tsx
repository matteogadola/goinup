import Link from 'next/link'
import { Suspense } from 'react'
import Spinner from './spinner'
import { base64 } from '@/lib/helpers'
import { Item } from '@/types/items'
import { Event } from '@/types/events'

interface Props {
  list: Item[] | undefined;
  event: Event;
}

export default function ItemsList({ list, event }: Props) {
  const items = list?.filter(item => item.status === 'published') ?? []

  return (
    <Suspense fallback={<Spinner />}>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container">
          <div className="divide-y-2 divide-gray-50 lg:pr-24">
            {items.length === 0
              ? <p>Iscrizione non disponibile</p>
              : items.map((item, index) => (
                <div key={index} className="border shadow-md hover:shadow-lg pl-2">
                  <Link href={`/events/${event.id}/${item.id}`}>
                    <div className="py-6 flex flex-wrap md:flex-nowrap hover:opacity-80">
                      <div className="md:flex-grow">
                        <h2 className="text-2xl text-gray-800">{item.name}</h2>
                        <p className="leading-relaxed">{item.summary}</p>
                        {/*<button className="text-button inline-flex items-center mt-2">Iscriviti
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </button>*/}
                      </div>
                      <div className="md:mr-4 items-center flex">
                        <span className="text-gray-800 text-xl uppercase">{item.price / 100}€</span>
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
