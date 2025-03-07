import Link from 'next/link'
import Image from 'next/image'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'

export default async function HomeEvents() {
  const events = await getEvents({ fromDate: dt().format(), orderBy: 'date', limit: 3, promoterId: 'goinup', status: 'scheduled' })

  return (
    <>
      {events?.length > 0 &&
        <section>
          <div className="text-center">
            <h3 className="overtitle">Prossimi</h3>
            <h1 className="title">Eventi</h1>
          </div>

          <div className={classNames("mt-10 grid grid-cols-1 gap-20 justify-items-center",
            { "md:grid-cols-2 xl:grid-cols-3": events.length === 3 },
            { "xl:grid-cols-2": events.length === 2 }
          )}>
            {events.map((event, index) =>
              <Link href={`/events/${event.id}`} key={index}>
                <div className="lg:max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl border-2 border-title hover:opacity-90">
                  <div className="relative text-white text-center">
                    <Image src={event.summary_image ? `/images/summaries/${event.summary_image}` : goinup} width={500} height={200} style={{ objectFit: "cover", objectPosition: "center" }} className="h-48" alt="Image" />
                    <div className="absolute inset-0 w-full h-full bg-slate-800 opacity-40"></div>
                    <span className={
                      classNames("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-unbounded font-semibold uppercase", {
                        "whitespace-nowrap": event.name.length <= 12
                      })}
                    >
                      {event.name}
                    </span>

                    <div className="absolute bottom-2 font-semibold text-xs w-full px-2 flex flex-row justify-between">
                      <span className="uppercase">{event.promoter_id !== 1 && event.promoter_id}</span> {/* va pigliato e stampato promoter_name */}
                      <div className="space-x-2">
                        {(event.detail?.elevationGain ?? 0) !== 0 && <span className=" bg-accent rounded-md py-0.5 px-1.5 bg-opacity-60">{event.detail?.elevationGain}D+</span>}
                        {(event.detail?.distance ?? 0) !== 0 && <span className="bg-button rounded-md py-0.5 px-1.5 bg-opacity-60">{event.detail?.distance}km</span>}
                      </div>
                    </div>

                  </div>
                  <div className="px-6 py-4 min-h-[12rem]">
                    <span className="font-unbounded font-semibold text-accent text-xl uppercase">{dt(event.date).format('ddd DD MMM')}</span>
                    <p className="text-gray-700 text-base mt-2">{event.summary}</p>
                  </div>

                </div>
              </Link>
            )}
          </div>
          {/*<div className="flex mt-8 text-white">
          <div className=" w-3/4"></div>
          <button className="link inline-flex items-center mt-2 right-20">Vedi tutti
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>*/}
        </section>
      }
    </>
  )
}
