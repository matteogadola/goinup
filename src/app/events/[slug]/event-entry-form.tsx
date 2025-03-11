'use client'
import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import { Autocomplete, Button, Checkbox, ComboboxItem, Group, MantineProvider, Modal, OptionsFilter, Select, TextInput } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { DateInput, DateInputProps, DatesProvider } from '@mantine/dates';
import { createFormActions, isNotEmpty, useForm } from '@mantine/form';
import { getClubs } from "@utils/sanity/queries";
import { useState } from "react";
//import { useForm, SubmitHandler } from 'react-hook-form'
import { createClient } from '@utils/supabase/client';
import EventEntryTinForm from "./event-entry-tin-form";
import { useCartStore } from "@store/cart";
import { EntryForm } from "@d/entries";
import { useRouter } from "next/navigation";
import { capitalize } from "@utils/text";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { subscribeWithSelector } from 'zustand/middleware'
import { isTinValid, verifyTin } from "@utils/tin";

/**
 * questa è la parte in cui in una sorta di card vengono mostrati:
 * - nel caso sia solo 1 (e sia un 'race'): nome del prodotto e prezzo
 * - nel caso siano più di 1 (e non sia 'race'): nome del prodotto con selezione quantità
 * 
 * form (nome, cognome, sesso, anno di nascita, società, email)
 * 
 * totale
 * 
 * due pulsanti (aggiungi altra persona e vai al pagamento)
 * vai al pagamento cambia solo questo componente
 * 
 * @param param0 questa 
 * @returns 
 */

const clubs = getClubs()

export default function EventEntryForm({ event, product }: { event: any, product: any }) {
  const supabase = createClient()
  const router = useRouter()
  const [isTinModalOpened, { open: openTinModal, close: closeTinModal }] = useDisclosure(false)
  const modalSize = useMediaQuery('(max-width: 50em)') ? '95%' : '60%';
  //const [cart, setCart] = useState<any>([])
  const { items, addItem } = useCartStore()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      first_name: '',
      last_name: '',
      tin: '',
      gender: '',
      birth_date: '',
      birth_place: '',
      club: '',
      email: '',
      phone_number: '',
    },
    validate: {
      first_name: isNotEmpty('Inserisci il nome'),
      last_name: isNotEmpty('Inserisci il cognome'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Indirizzo mail non valido'),
      tin: (value) => isTinValid(value)
    },
    /*transformValues: (values) => ({
      first_name: capitalize(values.first_name),
      last_name: capitalize(values.last_name),
      tin: values.tin.toUpperCase(),
      email: values.email.toLowerCase(),
      description: capitalize(`${values.first_name} ${values.last_name}`),
      //age: Number(values.age) || 0,
    }),*/
  });

  const entryExist = async (event_id: string, tin: string) => {
    // da server...
    const { data, error } = await supabase.rpc('entry_exist', {
      _event_id: '94134137-72eb-4824-9144-e3ccefda50cb',//event._id,
      _tin: tin,
      //_first_name: entry.first_name,
      //_last_name: entry.last_name,
      //_birth_year: dt(entry.birth_date).year()
    })

    if (error instanceof FunctionsHttpError) {
      const { message } = await error.context.json()
      throw new Error(message)
    } else if (error) {
      throw new Error(error.message)
    }

    return data
  }

  const save = async (data: any) => {
    if (form.validate().hasErrors) return;

    const { data: { user }, error } = await supabase.auth.getUser()

    // ATTENZIONE PERCHE NON SEMPRE C'è TIN eh
    if (items.find(item => item.entry?.tin === data.tin)) {
      form.setFieldError('tin', 'Codice fiscale già presente in carrello');
      return
    }

    try {
      verifyTin(data.tin, data.first_name, data.last_name)
    } catch(e: any) {
      form.setFieldError('tin', e.message);
      return
    }

    try {
      if (await entryExist(event.id, data.tin)) {
        // anche in questo caso meglio mostra errore generale?
        form.setFieldError('tin', 'Codice fiscale già iscritto alla gara');
        return
      }
    } catch(e: any) {
      console.log(e.message)
      // mostra errore
    }

    addItem({
      product_id: product._id,
      product_name: product.name,
      description: capitalize(`${data.first_name} ${data.last_name}`),
      price: product.price,
      quantity: 1,
      payment_methods: product.payment_methods,
      event_id: event._id,
      entry: {
        ...data,
        first_name: capitalize(data.first_name),
        last_name: capitalize(data.last_name),
        tin: data.tin.toUpperCase(),
        email: data.email.toLowerCase(),
      },
    })

    form.reset()
    return true
  }

  const onSave = async () => {
    const data = form.getValues()

    await save(data)
    /*const items = useCartStore.getState().items

    if (items.length) {
      console.log('dentro')
      if (items.every((v: any) => v.entry.email && v.entry.email === data.email)) {
        form.setFieldValue('email', data.email)
      }
      if (items.every((v: any) => v.entry.phone_number && v.entry.phone_number === data.phone_number)) {
        form.setFieldValue('phone_number', data.phone_number)
      }
    }*/
  }

  // da rivedere
  const onSubmit = async () => {
    const data = form.getValues()

    if (await save(data)) {
      router.push('/checkout')
    } else if (!form.isDirty()) {
      form.clearErrors()
      router.push('/checkout')
    }
  }

  return (
    <>
      <MantineProvider>
        <form className="py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

            <TextInput
              withAsterisk
              label="Nome"
              className="col-span-2"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />

            <TextInput
              withAsterisk
              label="Cognome"
              className="col-span-2"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />


            <TextInput
              withAsterisk
              label="Codice fiscale"
              description={<span>Non lo ricordi? <button type="button" onClick={openTinModal} className="link">Calcolalo</button></span>}
              className="col-span-2"
              inputWrapperOrder={['label', 'input', 'description', 'error']}
              key={form.key('tin')}
              {...form.getInputProps('tin')}
            />

            <Autocomplete
              label="Società"
              placeholder="Opzionale"
              className="col-span-2"
              limit={5}
              key={form.key('club')}
              {...form.getInputProps('club')}
              data={clubs}
            />

            <TextInput
              withAsterisk
              label="Email"
              placeholder=""
              className="col-span-2"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <TextInput
              label="Telefono"
              placeholder="Opzionale"
              className="col-span-2"
              key={form.key('phone_number')}
              {...form.getInputProps('phone_number')}
            />

          </div>
        
          <p className="mt-6">
            <span className="block text-xs text-gray-600 dark:text-gray-500">
              Completando l&apos;iscrizione accetti i <a href="/legal/terms" target="_blank" className="link" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="link" rel="noopener noreferrer">informativa sulla privacy</a>
            </span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Button onClick={onSave} variant="outline" classNames={{label: 'light'}}>Iscrivi altro partecipante</Button>
            <Button onClick={onSubmit} variant="filled" classNames={{label: 'light'}}>Vai al pagamento</Button>
          </div>

        </form>
      
        <Modal opened={isTinModalOpened} onClose={closeTinModal} title="Calcolo codice fiscale" withCloseButton={false} size={modalSize}>
          <EventEntryTinForm form={form} onClose={closeTinModal} />
        </Modal>
      </MantineProvider>
    </>
  )
}
