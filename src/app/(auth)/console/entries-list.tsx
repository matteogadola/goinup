'use client';

import { ChangeEvent, Suspense, useEffect, useState } from 'react'
import { dt } from '@utils/date'

import clsx from 'clsx'
import Spinner from '@components/ui/spinner'
//import DownloadCsv from './download-csv'
import { Event } from '@d/events';
import { PlusIcon } from '@components/icons';
//import EntryDialog from './entry-dialog';
import { PaymentStatus } from '@d/orders';
import { createClient } from '@utils/supabase/client';

const supabase = createClient();

type Props = {
  className?: string;
  entries: any[];
  items: any[];
  event: Event;
}

interface State {
  entries: any[];
  items: any[];
  isDialogOpen: boolean;
  selectedEntry: any | undefined;
}

type FormState = {
  last_name: string;
  payment_status: string;
}

export default function EntriesList({ entries, items, event, className }: Props) {


  const [state, setState] = useState<State>({
    entries,
    items: entries,
    isDialogOpen: false,
    selectedEntry: undefined
  });

  //useEffect(() => setState(state => ({ ...state, entries, items: entries })), [entries]);
  //useEffect(() => reset(), [event, reset]);


  const setPaymentStatus = async (orderId: number, status: string) => {
    const { data, error } = await supabase.from('orders').update({ payment_status: status }).eq('id', orderId);

    if (!error) {
      const updatedItems = state.entries.map(item => {
        if (item.order_id === orderId) {
          return { ...item, payment_status: status }
        }
        return item
      });
      setState({ ...state, entries: updatedItems, items: updatedItems })
      
      /*const index = state.items.findIndex(item => item.order_id === orderId);

      if (index >= 0) {
        const newItems = [...state.items];
        newItems.splice(index, 1, { ...newItems[index], payment_status: status });
        setState({ ...state, entries: newItems, items: newItems })
      }*/
    }
    return data;
  }

  /*const filterEntries = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState({ ...state, items: filtered });
  }*/

  useEffect(() => {
    const subscription = watch((values) => {
      setState(state => ({ ...state, items: filter(state.entries, values) }));
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const filter = (list: any[], values: Partial<FormState>) => {
    let filtered = list;

    if (values.last_name) {
      filtered = filtered.filter(entry => entry.last_name.toLowerCase().includes(values.last_name));
    }

    if (values.payment_status) {
      filtered = filtered.filter(item => item.payment_status === values.payment_status);
    }

    return filtered;
  }
  
  const nItems = (order_id: number) => {
    return state.entries.filter(entry => entry.order_id === order_id).length
  }

  /*const formValues = watch();
  useEffect(() => {
    let filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(formValues.last_name));

    if (formValues.payment_status) {
      filtered = filtered.filter(item => item.payment_status === formValues.payment_status);
    }

    setState({ ...state, items: filtered });
  }, [formValues]);*/

  const onCreate = () => {
    setState({ ...state, isDialogOpen: true, selectedEntry: undefined })
  }

  const closeDialog = () => {
    setState({ ...state, isDialogOpen: false, selectedEntry: undefined })
  }

  // rinomina...
  const addEntry = (entry: any) => {
    // andrebbe aggiunto in ordine?
    const newEntries = [...state.entries];
    newEntries.unshift(entry);

    setState({ ...state, isDialogOpen: false, entries: newEntries, items: newEntries });
  }

  return (
    <Suspense fallback={<Spinner />}>
      {state.isDialogOpen && <EntryDialog event={event} items={items} onEntryCreated={addEntry} onClose={closeDialog} />}

      <section className={classNames(className, "")}>
        <div className="flex items-center space-x-4">
          <h3 className="overtitle">Iscritti <span className="text-gray-600 font-normal">({state.entries?.length})</span></h3>
          {(event.category === 'race-series' || dt().isBefore(event.date)) && <button onClick={onCreate} className="button-icon"><PlusIcon /></button>}
        </div>

        {!!state.entries?.length &&
          <div>
            <DownloadCsv data={state.entries} name={event.id} className="mt-2" />

            <form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:w-1/2 mt-4">

                <div>
                  <label className="label" htmlFor="type">Cognome</label>
                  <input type="text" className="field" {...register("last_name")} />
                </div>

                <div>
                  <label className="label" htmlFor="type">Pagamento</label>
                  <select
                    className="field"
                    {...register("payment_status")}
                  >
                    <option value=''></option>
                    <option value='pending'>Da confermare</option>
                    <option value='paid'>Confermato</option>
                  </select>
                </div>

              </div>
            </form>

            <div className="mt-4">

              <table className="text-sm">
                <thead>
                  <tr>
                    <td className="pr-4 border-b py-2">ORDINE</td>
                    {event.category !== 'race-series' && <td className="pr-4 border-b py-2">ISCRIZIONE</td>}
                    <td className="pr-8 border-b py-2">DATA</td>
                    <td className="pr-4 border-b py-2">METODO</td>
                    <td className="pr-8 border-b py-2">STATO</td>
                    <td className="pr-8 border-b py-2">COGNOME</td>
                    <td className="pr-8 border-b py-2">NOME</td>
                    <td className="pr-4 border-b py-2">ANNO</td>
                    <td className="pr-4 border-b py-2">SESSO</td>
                    <td className="pr-4 border-b py-2">TEAM</td>
                    <td className="border-b py-2"></td>
                  </tr>
                </thead>
                <tbody>
                  {state.items.map((entry, index) =>
                    <tr key={index} className="border-b">
                      {entry.payment_method === 'stripe' && entry.payment_id
                        ? <td className="pr-4 py-2"><a href={"https://dashboard.stripe.com/payments/" + entry.payment_id} className="text-button" target="_blank">{entry.order_id}</a></td>
                        : <td className="pr-4 py-2">{entry.order_id}</td>
                      }
                      {event.category !== 'race-series' && <td className="pr-4 py-2">{entry.category}</td>}
                      <td className="pr-8 py-2 whitespace-nowrap">{dt(entry.date).format('DD-MM-YY')}</td>
                      <td className="pr-4 py-2">{entry.payment_method}</td>
                      <td className="pr-8 py-2">{entry.payment_status}</td>
                      <td className="pr-8 py-2 whitespace-nowrap">{entry.last_name}</td>
                      <td className="pr-8 py-2 whitespace-nowrap">{entry.first_name}</td>
                      <td className="pr-4 py-2">{entry.birth_year}</td>
                      <td className="pr-4 py-2">{entry.gender}</td>
                      <td className="pr-4 py-2">{entry.team}</td>
                      {(
                        ((event.category === 'race-series' && entry.category === 'carnet') ||
                          (event.category !== 'race-series' && entry.category !== 'carnet')) &&
                        ['cash', 'sepa'].includes(entry.payment_method) && entry.payment_status === 'pending') &&
                        <td className="py-2 whitespace-nowrap"><button className="text-button hover:opacity-70" onClick={() => setPaymentStatus(entry.order_id, 'paid')}>CONFERMA PAGAMENTO{nItems(entry.order_id) > 1 && <span> ***</span>}</button></td>
                      }
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }
      </section>
    </Suspense>
  )
}
