'use client'

import { FormEvent, useEffect, useState } from 'react'
import { base64 } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import places from 'public/localization/it/places.json'

import Autocomplete from '@/components/ui/autocomplete'

import classNames from 'classnames'
import { useStore } from '@/store/store'
import Dialog from '@/components/ui/dialog'
import CodiceFiscale from 'codice-fiscale-js'


export interface FormDialogState {
  first_name: string;
  last_name: string;
  birth_place: string;
  birth_date: string;
  gender: 'M' | 'F';
  //country: string;
}

type Props = {
  className?: string;
  getValues(): any;
  onCalc(e: any): void;
  onClose(e: any): void;
}

export default function EntryFormCfDialog({ className, getValues, onCalc, onClose }: Props) {
  const { register, handleSubmit, control, setValue, setError, reset, formState: { errors } } = useForm<FormDialogState>({
    mode: 'onTouched'
  })

  const data = getValues()
  useEffect(() => {
    setValue("first_name", data.first_name)
    setValue("last_name", data.last_name)
  }, [data, setValue])

  const onSubmit: SubmitHandler<FormDialogState> = async data => {
    if (!places.includes(data.birth_place)) {
      setError('birth_place', { message: 'Seleziona un comune presente in lista' })
      return
    }

    const date = new Date(data.birth_date)

    const tin = new CodiceFiscale({
      name: data.first_name,
      surname: data.last_name,
      gender: data.gender,
      day: date.getDate(),
      month: date.getMonth() + 1,
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
    }
  }

  return (
    <section className={classNames(className, "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity")}>
      <div className="relative w-auto my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="overtitle">Calcolo</h3>
            <h1 className="title">Codice Fiscale</h1>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative p-6 flex-auto">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="">
                  <label className="label" htmlFor="first_name">Nome</label>
                  <input
                    type="text"
                    aria-invalid={errors.first_name ? "true" : "false"}
                    {...register("first_name", { required: 'Campo obbligatorio' })}
                    className="field"
                  />
                  {errors.first_name && <small className="validation-error">{errors.first_name.message}</small>}
                </div>

                <div className="">
                  <label className="label" htmlFor="last_name">Cognome</label>
                  <input
                    type="text"
                    aria-invalid={errors.last_name ? "true" : "false"}
                    {...register("last_name", { required: 'Campo obbligatorio' })}
                    className="field"
                  />
                  {errors.last_name && <small className="validation-error">{errors.last_name.message}</small>}
                </div>

                <div>
                  <Controller
                    name="birth_place"
                    control={control}
                    rules={{ required: 'Campo obbligatorio' }}
                    render={({ field, fieldState }) => (
                      <>
                        <label className="label" htmlFor={field.name}>Comune di Nascita</label>
                        <Autocomplete name={field.name} value={field.value} items={places} onChange={e => field.onChange(e.target.value.toUpperCase())} />
                        {fieldState.error?.message && <small className="validation-error">{fieldState.error?.message}</small>}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="birth_date">Data di Nascita</label>
                  <input
                    type="date"
                    aria-invalid={errors.birth_date ? "true" : "false"}
                    {...register("birth_date", { required: 'Campo obbligatorio' })}
                    className="field"
                  />
                  {errors.birth_date && <small className="validation-error">{errors.birth_date.message}</small>}
                </div>

                <div>
                  <label className="label" htmlFor="gender">Sesso</label>
                  <select
                    aria-invalid={errors.gender ? "true" : "false"}
                    {...register("gender", { required: 'Campo obbligatorio' })}
                    className="field"
                  >
                    <option value="">Seleziona</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                  </select>
                  {errors.gender && <small className="validation-error">{errors.gender.message}</small>}
                </div>

              </div>









            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button onClick={onClose} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                Annulla
              </button>
              <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Calcola
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
