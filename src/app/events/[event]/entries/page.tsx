import { notFound, redirect, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, cache, useEffect, useState } from 'react'
import { Props } from '../page'
import { getEntries } from '@/lib/entries'
import { getEvent, getEvents } from '@/lib/events'
import { Metadata, ResolvingMetadata } from 'next'

export default async function EntriesPage({ params }: Props) {
  const event = await getEvent(params.event);
  if (event === null) notFound();

  const entries = await getEntries({ eventId: event.id });

  /*const filterEntries = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState({ ...state, items: filtered });
  }*/

  return (
    <section className="page">
      <div>
        <h3 className="overtitle">Iscritti <span className="text-gray-600 font-normal">({entries?.length})</span></h3>
        {(event?.edition && event?.name) && <h1 className="title mt-3">{event.edition}° {event.name}</h1>}
      </div>

      {!!entries?.length &&
        <div className="mt-8">
          {/*<input type="text" className="appearance-none bg-transparent border-b focus:outline-none" placeholder="Cognome" onChange={(e) => filterEntries(e)} />*/}

          <table className="text-sm">
            <thead>
              <tr>
                <td className="pr-10 border-b py-2">COGNOME</td>
                <td className="pr-10 border-b py-2">NOME</td>
                <td className="pr-10 border-b py-2">ANNO</td>
                <td className="pr-10 border-b py-2">SESSO</td>
                <td className="pr-10 border-b py-2">TEAM</td>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) =>
                <tr key={index} className="border-b">
                  <td className="pr-10 py-2 whitespace-nowrap">{entry.last_name}</td>
                  <td className="pr-10 py-2 whitespace-nowrap">{entry.first_name}</td>
                  <td className="pr-10 py-2">{entry.birth_year}</td>
                  <td className="pr-10 py-2">{entry.gender}</td>
                  <td className="pr-10 py-2">{entry.team}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }


    </section>
  )
}

export const revalidate = 3600; // 1h

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const event = await getEvent(params.event);

  return {
    title: `Iscritti ${event?.name?.toLowerCase()}`,
  }
}
