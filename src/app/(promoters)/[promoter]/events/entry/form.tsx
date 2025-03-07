'use client'

import { FormEvent, useState } from 'react'
import { base64 } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import teams from 'public/localization/it/teams.json'
import countries from 'public/localization/it/countries.json'

import Autocomplete from '@/components/ui/autocomplete'

import classNames from 'classnames'
import { useStore } from '@/store/store'
import EntryFormCfDialog from './form-cf-dialog'
import { Entry } from '@/types/entries'
import { Item } from '@/types/items'
import EntryFormLocationsDialog from './form-locations-dialog'
import Link from 'next/link'

export interface EntryForm extends Entry {
  privacy_policy: boolean;
}

export default function EntryForm({ item, className }: { item: Item, className?: string }) {
  const router = useRouter()

  const cartItems = useStore((state) => state.cartItems)
  const addCartItem = useStore((state) => state.addCartItem)

  let defaultValues: any = {
    privacy_policy: false,
    country: 'ITA',
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<EntryForm>({
    mode: 'onTouched',
    defaultValues
  })

  const onSubmit: SubmitHandler<EntryForm> = async data => {
    data.tin = data.tin.toUpperCase()

    const duplicateIndex = cartItems.findIndex(item => item.entry?.tin === data.tin)

    if (duplicateIndex !== -1) {
      setError('tin', { message: 'Codice fiscale già presente in carrello' })
      return
    }

    addCartItem({
      id: item.id,
      event_id: item.event_id,
      name: item.name,
      price: item.price,
      quantity: 1,
      description: `${data.first_name} ${data.last_name}`,
      entry: data,
    })

    reset()
  }

  const openTinCalculator = () => {
    setState({ ...state, isTinCalculatorOpened: true })
  }

  const closeTinCalculator = () => {
    setState({ ...state, isTinCalculatorOpened: false })
    clearErrors()
  }

  const calcTin = (data: any) => {
    console.debug("Calcolato codice fiscale", data);

    setValue('first_name', data.first_name)
    setValue('last_name', data.last_name)
    setValue('tin', data.tin)
    setValue('birth_place', data.birth_place)
    setValue('birth_date', data.birth_date)
    setValue('gender', data.gender)

    closeTinCalculator()
  }

  const [state, setState] = useState({ team: '', teams, countries, loading: false, error: '', isTinCalculatorOpened: false })

  return (
    <section className={classNames(className)}>
      {state.isTinCalculatorOpened && <EntryFormCfDialog getValues={getValues} onCalc={calcTin} onClose={closeTinCalculator} />}

      <form className="py-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
            <small className="field-helper">Non lo ricordi? <button onClick={() => openTinCalculator()}>Calcolalo</button></small>
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

          {item.options?.isFidalCardRequested && <div className="">
            <label className="label" htmlFor="fidal_card">Tessera Fidal/Runcard (Obbligatoria)</label>
            <input
              type="fidal_card"
              aria-invalid={errors.fidal_card ? "true" : "false"}
              {...register("fidal_card", {
                required: 'Campo obbligatorio',
                /*pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Numero tessera fidal non valida"
                  RRXXXXXX
                },*/
              })}
              className="field"
            />
            {errors.fidal_card && <small className="field-error">{errors.fidal_card?.message}</small>}
          </div>}

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

          <div className="flex items-end">
            <div className="relative flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  aria-invalid={errors.privacy_policy ? "true" : "false"}
                  {...register("privacy_policy", {
                    required: 'Campo obbligatorio',
                  })}
                  className=""
                />
              </div>
              <label htmlFor="hs-checkbox-delete" className="ml-3">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">Privacy Policy</span>
                <span id="hs-checkbox-delete-description" className="block text-xs text-gray-600 dark:text-gray-500">Accetto i <a href="/legal/terms" target="_blank" className="text-button" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="text-button" rel="noopener noreferrer">informativa sulla privacy</a> di Goinup</span>
                {errors.privacy_policy && <small className="field-error">{errors.privacy_policy.message}</small>}
              </label>
            </div>
          </div>


        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/*<Button label="Indietro" className="col-span-3 hover:text-gray-600 py-2" onClick={() => router.back()} />*/}
          <button onClick={() => router.back()} className="hover:text-slate-500 py-2 px-4">
            Indietro
          </button>

          <button type="submit" className="bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded">
            Iscrivi partecipante
          </button>
        </div>
      </form>
    </section>
  )
}
