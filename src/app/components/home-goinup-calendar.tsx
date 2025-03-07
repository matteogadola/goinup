import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
import classNames from 'classnames'
import Spinner from '@/components/spinner'

import flyer from 'public/images/flyers/goinup-6.webp'

export default async function HomeGoinupCalendar({ className }: { className?: string }) {
  const showFlyer = true;
  //const events = await getEvents({ fromDate: dt().format(), orderBy: 'date', promoterId: 'goinup' })

  return (
    <>
      {showFlyer &&
        <div className="mt-20 w-full flex justify-center justify-items-center">
          <Image
            src={flyer}
            alt="Locandina"
            width={800}
          />
        </div>}

      {/*(!showFlyer && events.length > 0) &&
        <div>
          <div className="text-center">
            <h3 className="overtitle">Calendario</h3>
            <h1 className="title">Circuito</h1>
          </div>

          <div className="w-full">
            <table className="mt-12 m-auto">
              <tbody>
                {events.map((event, index) =>
                  <tr key={index} className="font-unbounded">
                    <td className="py-4">
                      <span className="font-semibold text-accent text-lg lg:text-xl uppercase">
                        {dt(event.date).format('ddd DD MMM')}
                      </span>
                    </td>
                    <td className="py-4 pl-4 lg:pl-8">
                      <span className="font-semibold text-lg lg:text-xl uppercase">
                        {event.category === 'race' ? `${event.edition}^ ` : ''}{event.name}
                      </span>
                    </td>
                    <td className="py-4 pl-4 lg:pl-8">
                      <span className="font-light text-base lg:text-xl">
                        {event.detail?.location ? event.detail.location :
                          event.detail?.startLine && event.detail?.finishLine ? `${event.detail?.startLine} - ${event.detail?.finishLine}` : ''
                        }
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      */}
    </>
  )
}
