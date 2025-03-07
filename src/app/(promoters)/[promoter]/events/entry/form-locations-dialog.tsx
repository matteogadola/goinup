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
  onClose(e: any): void;
}

export default function EntryFormLocationsDialog({ className, onClose }: Props) {

  return (
    <section className={classNames(className, "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity")}>
      <div className="relative w-auto my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="overtitle">Contanti</h3>
            <h1 className="title">Negozi partner</h1>
          </div>

          <div className="px-8 py-12">
            <table className="w-full">
              <tr>
                <td className="w-1/2">3Passi Patagonia</td>
                <td className="w-1/2 text-end"><a className="link" href="https://goo.gl/maps/sBuFnHupYf4txXnn6" target="_blank" rel="noopener noreferrer">Morbegno</a></td>
              </tr>
            </table>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button onClick={onClose} className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
