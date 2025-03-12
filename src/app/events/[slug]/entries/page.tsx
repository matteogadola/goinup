'use client'

/*import Spinner from '@/components/spinner';
import { base64 } from '@/lib/helpers';
import { createClient } from '@/lib/supabase-auth-client';
import { Event } from '@/types/events';
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, cache, useEffect, useState } from 'react';

interface SearchParams {
  q: string;
}

interface State {
  entries: any[];
  items: any[];
}

const supabase = createClient();

const fetchEntries = cache(async (id: string) => {
  const { data } = await supabase.from('v_entries_public').select().eq('event_id', id);
  return data ?? [];
});*/

export default function EventEntriesPage() {

  return (
    <></>
  )
  /*const event = base64.decode<Event>(useSearchParams()?.get('q') ?? '')

  const routePath = usePathname()?.split('/');
  const event_id = routePath?.[3];

  const [state, setState] = useState<State>({
    entries: [],
    items: [],
  });

  useEffect(() => {
    if (!event_id) redirect('/');

    console.log(event_id);
    fetchEntries(event_id)
      .then(entries => setState(state => ({ ...state, entries, items: entries })))
      .catch(() => {
        setState(state => ({ ...state, entries: [], items: [] }));
        redirect('/');
      });
  }, [event_id]);


  const filterEntries = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState({ ...state, items: filtered });
  }


  return (
    <Suspense fallback={<Spinner />}>

      <section className="page">
        <div>
          <h3 className="overtitle">Iscritti <span className="text-gray-600 font-normal">({state.entries?.length})</span></h3>
          {(event?.edition && event?.name) && <h1 className="title mt-3">{event.edition}° {event.name}</h1>}
        </div>

        {!!state.items?.length &&
          <div className="mt-8">

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
                {state.items.map((entry, index) =>
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

    </Suspense>
  )*/
}