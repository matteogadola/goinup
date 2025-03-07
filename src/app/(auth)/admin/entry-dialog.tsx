'use client'

import { FormEvent, useEffect, useState } from 'react'
import { base64 } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import places from 'public/localization/it/places.json'
import teams from 'public/localization/it/teams.json'

import Autocomplete from '@/components/ui/autocomplete'

import classNames from 'classnames'
import { useStore } from '@/store/store'
import Dialog from '@/components/ui/dialog'
import CodiceFiscale from 'codice-fiscale-js'
import { Event } from '@/types/events'
import { Entry } from '@/types/entries'
import { Item } from '@/types/items'
import { createCheckout } from '@/lib/checkout'
//import { useSupabase } from '@/app/components/supabase-provider'
import { createClient } from '@/lib/supabase-auth-client'


//type AddEntryForm = Pick<Entry, 'first_name' | 'last_name' | 'tin' | 'team' | 'email' | 'phone_number'> & {item_id: number };
interface AddEntryForm extends Entry {
  item_id: number;
}

type Props = {
  className?: string;
  event: Event;
  items: Item[];
  onEntryCreated(e: any): void;
  onClose(e: any): void;
}

interface State {
  error: string | undefined;
  isLoading: boolean;
}

const supabase = createClient();

export default function EntryDialog({ className, event, items, onEntryCreated, onClose }: Props) {
  //const { supabase, session } = useSupabase()

  const [state, setState] = useState<State>({ error: undefined, isLoading: false });

  let defaultValues: any = {
    privacy_policy: true,
    country: 'ITA',
  }

  const { register, handleSubmit, control, setValue, setError, reset, formState: { errors } } = useForm<AddEntryForm>({
    mode: 'onTouched',
    defaultValues
  })

  /*const data: FormDialogState | null = null
  useEffect(() => {
  }, [data])*/
  const fetchEntry = async (id: number) => {
    const { data } = await supabase.from('v_entries').select().eq('order_id', id).single();
    return data;
  };

  const onSubmit: SubmitHandler<AddEntryForm> = async data => {
    data.tin = data.tin.toUpperCase();

    const item = items.find(item => item.id === Number(data.item_id));

    if (item === undefined) {
      console.warn('Ticket non valido', data);
      setState({ ...state, error: 'Ticket non valido' });
      return
    }

    try {
      setState({ ...state, isLoading: true });

      const order = await createCheckout({
        user_id: null, //session?.user.id, // TODO PASSALO
        payment_method: 'cash',
        user_email: data.email,
        customer_first_name: data.first_name,
        customer_last_name: data.last_name,
        items: [{
          id: item.id,
          event_id: event.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          description: `${data.first_name} ${data.last_name}`,
          entry: data,
        }]
      })
      //setError(null)

      if (order?.id) {
        console.debug('[add-entry-dialog] Order inserito correttamente', order);
        onEntryCreated(await fetchEntry(order.id));
      }
    } catch (e: any) {
      console.log(JSON.stringify(e.message))
      //setError(e.message)
    } finally {
      setState({ ...state, isLoading: false });
    }


    /*addCartItem({
      id: item.id,
      event_id: item.event_id,
      name: item.name,
      price: item.price,
      quantity: 1,
      description: `${data.first_name} ${data.last_name}`,
      entry: data,
    })*/

    /*if (!places.includes(data.birth_place)) {
      setError('birth_place', { message: 'Seleziona un comune presente in lista' })
      return
    }

    const date = new Date(data.birth_date)

    const tin = new CodiceFiscale({
      name: data.first_name,
      surname: data.last_name,
      gender: data.gender,
      day: date.getDate(),
      month: date.getMonth() +1,
      year: date.getFullYear(),
      birthplace: data.birth_place,
      birthplaceProvincia: ''
    })

    if (!tin.isValid) {
      // setta errore, dati inseriti non validi...
    } else {
      onCalc({
        ...data,
        tin: tin.cf
      })
      reset()
    }*/
  }

  return (
    <section className={classNames(className, "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity")}>
      <div className="relative w-auto my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="overtitle">Iscrizione</h3>
            <h1 className="title">{event.name}</h1>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative p-6 flex-auto">

              <div className="pb-6">
                <select
                  className={classNames("field", { "invalid": errors.item_id })}
                  {...register("item_id")}
                >
                  {items.map((item, index) =>
                    <option key={index} value={item.id}>{item.name}</option>
                  )}
                </select>
                {errors.item_id && <small className="field-error">{errors.item_id.message}</small>}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div>
                  <label className="label" htmlFor="first_name">Nome</label>
                  <input
                    type="text"
                    className={classNames("field", { "invalid": errors.first_name })}
                    {...register("first_name", { required: 'Campo obbligatorio' })}
                  />
                  {errors.first_name && <small className="field-error">{errors.first_name.message}</small>}
                </div>

                <div>
                  <label className="label" htmlFor="last_name">Cognome</label>
                  <input
                    type="text"
                    className={classNames("field", { "invalid": errors.last_name })}
                    {...register("last_name", { required: 'Campo obbligatorio' })}
                  />
                  {errors.last_name && <small className="field-error">{errors.last_name.message}</small>}
                </div>

                <div>
                  <label className="label" htmlFor="tin">Codice Fiscale</label>
                  <input
                    type="text"
                    className={classNames("field uppercase", { "invalid": errors.tin })}
                    {...register("tin", {
                      required: 'Campo obbligatorio',
                      pattern: {
                        value: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i,
                        message: "Codice fiscale non valido"
                      },
                    })}
                  />
                  {errors.tin && <small className="field-error block">{errors.tin.message}</small>}
                </div>

                <div className="">
                  <Controller
                    name="team"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <label className="label" htmlFor={field.name}>Società</label>
                        <Autocomplete name={field.name} value={field.value} items={teams} placeholder="Opzionale" onChange={e => field.onChange(e.target.value.toUpperCase())} />
                        {fieldState.error?.message && <small className="field-error">{fieldState.error?.message}</small>}
                      </>
                    )}
                  />
                </div>

                <div className="">
                  <label className="label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: 'Campo obbligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Indirizzo mail non valido"
                      },
                    })}
                    className="field"
                  />
                  {errors.email && <small className="field-error">{errors.email.message}</small>}
                </div>

                <div className="">
                  <label className="label" htmlFor="phone_number">Telefono</label>
                  <input
                    type="text"
                    aria-invalid={errors.phone_number ? "true" : "false"}
                    {...register("phone_number", {
                      required: 'Campo obbligatorio',
                      pattern: {
                        value: /^((00|\+)39)??(3\d{2}|0\d{1,3})\d{6,7}$/,
                        message: "Numero di telefono non valido"
                      },
                    })}
                    className="field"
                  />
                  {errors.phone_number && <small className="field-error">{errors.phone_number.message}</small>}
                </div>

              </div>









            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button onClick={onClose} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                Annulla
              </button>

              <button
                type="submit"
                disabled={state.isLoading}
                className="rounded-md bg-button px-6 py-3 text-base font-medium text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {state.isLoading &&
                  <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                  </svg>
                }
                Conferma
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
