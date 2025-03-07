import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense } from 'react'
import Spinner from './spinner'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import elevation from 'public/images/icons/altitude-2.svg'
import distance from 'public/images/icons/distance-2.svg'
import ph1 from 'public/images/ph-1.jpg'
import ph2 from 'public/images/ph-2.jpg'
import ph3 from 'public/images/ph-3.jpg'
import classNames from 'classnames'

const images = [ph1, ph2, ph3]

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function EventsList2() {
  const events = await getEvents({ fromDate: dt().format(), orderBy: 'date', limit: 3 })
  
  return (
    <Suspense fallback={<Spinner />}>
      <section className="">
        <div className="text-center">
          <h3 className="subtitle">Prossimi</h3>
          <h1 className="title">Eventi</h1>
        </div>

        <div className={classNames("mt-10 grid grid-cols-1 gap-20 justify-items-center",
          {"md:grid-cols-2 xl:grid-cols-3": events.length === 3},
          {"xl:grid-cols-2": events.length === 2}
        )}>
          { events.map((event, index) => 
            <Link href={`events/${event.id}`} key={index}>
              <div className="lg:max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl border-2 border-title hover:opacity-90">
                <div className="relative text-white text-center">
                  <Image src={images[index]} className="" alt="Image" />
                  <div className="absolute inset-0 w-full h-full bg-primary opacity-30"></div>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl lg:text-4xl font-unbounded uppercase">{event.name}</span>

                  <div className="absolute bottom-1 font-semibold text-xs w-full px-4 flex flex-row justify-between">
                    <span className="uppercase">{ event.promoter_id !== 1 && event.promoter_id}</span> {/* va pigliato e stampato promoter_name */}
                    <div className="space-x-4">
                      <span className="text-green-400 opacity-90 ">{event.detail?.elevationGain}D+</span>
                      <span className="text-yellow-400 opacity-90 ">{event.detail?.distance}km</span>
                    </div>
                  </div>

                </div>
                <div className="px-6 py-4 min-h-[12rem]">
                  <span className="subtitle">{ dt(event.date).format('ddd DD MMM') }</span>
                  <p className="text-gray-700 text-base mt-2">{event.summary}</p>
                </div>

              </div>
            </Link>
          )}
        </div>
        <div className="flex mt-8 text-white">
          <div className=" w-3/4"></div>
          <button className="text-purple-500 inline-flex items-center mt-2 right-20">Vedi tutti
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </section>
    </Suspense>
  )
}
