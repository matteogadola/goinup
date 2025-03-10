'use client'
import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import { Autocomplete, Button, Checkbox, ComboboxItem, Group, MantineProvider, Modal, OptionsFilter, Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  //const [cart, setCart] = useState<any>([])
  const { items, addItem } = useCartStore()

  const form = useForm({
    mode: 'uncontrolled',
    //onSubmitPreventDefault: 'always',
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
      tin: (value) => (/^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i.test(value) ? null : 'Codice fiscale non valido')
    },
    transformValues: (values) => ({
      first_name: capitalize(values.first_name),
      last_name: capitalize(values.last_name),
      tin: values.tin.toUpperCase(),
      email: values.email.toLowerCase(),
      //description: `${values.first_name} ${values.last_name}`,
      //age: Number(values.age) || 0,
    }),
  });
/*
  const preventDuplicate = () => {
    supabase.rpc()


    SELECT *
  FROM entries
  INNER JOIN orders ON entries.order_id = orders.id
  WHERE (orders.payment_status = 'paid' OR (orders.payment_method = 'cash' AND orders.payment_status = 'pending'))
  AND entries.event_id = NEW.event_id AND tin = NEW.tin
  INTO item;
  
  IF FOUND THEN
    IF NEW.gender = 'F' THEN
      gender := 'iscritta';
    ELSE
      gender := 'iscritto';
    END IF;
    RAISE EXCEPTION '% % risulta già %', NEW.first_name, NEW.last_name, gender;
  END IF;
  }
*/

  const entryExist = async (entry: any) => {
    const { data, error } = await supabase.rpc('entry_prevent_duplicate', {
      _tin: entry.tin,
      _first_name: entry.first_name,
      _last_name: entry.last_name,
      _birth_year: dt(entry.birth_date).year()
    })

    if (error) throw new Error(error.message)

    return data
  }

  const onSave = async () => {

    if (form.validate().hasErrors) return;
    console.log("supero")

    const data = form.getValues()
    console.log("save", data)

    const { data: { user }, error } = await supabase.auth.getUser()
    console.log("auth", user?.id)

    // ATTENZIONE PERCHE NON SEMPRE C'è TIN eh
    if (items.find(item => item.entry?.tin === data.tin)) {
      form.setFieldError('tin', 'Codice fiscale già presente in carrello');
      return
    }

    // chiamata a db in cerca

    addItem({
      product_id: product.id,
      product_name: product.name,
      description: `${data.first_name} ${data.last_name}`,
      price: product.price,
      quantity: 1,
      payment_methods: product.payment_methods,
      event_id: event.id,
      entry: data,
    })

    form.reset()

    // questa parte per submit non andrebbe fatta
    if (items.length) {
      if (items.every((v: any) => v.entry.email === data.email)) {
        //form.setFieldValue('email', data.email)
      }
      if (items.every((v: any) => v.entry.phone_number === data.phone_number)) {
        //form.setFieldValue('phone_number', data.phone_number)
      }
    }
  }

  // da rivedere
  const onSubmit = (data: any) => {
    if (items.length === 0 || form.isValid()) {
      console.log('submit è salvo')
      onSave()
    } else {
      if (form.isTouched()) {
        console.log('submit è toccato')
      }
      if (form.isDirty()) {
        console.log('submit è sporco')
      }
    }

    console.log('vado al checkout')
    //if (items.length) {
      //router.push('/checkout')
    //}
    
    /*if (!form.isDirty()) {
      console.log('però non è dirty')
    }
      if (form.isValid())
      form.isDirty();
      if (!form.isValid()) {

      }*/



    /*setCart([...cart, {
      id: product.id,
      event_id: event.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      description: `${data.first_name} ${data.last_name}`,
      entry: data,
    }])*/

    //form.reset()
  }

  return (
    <>
      <MantineProvider>
        <form className="py-4" autoComplete="off">
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
      
        <Modal opened={isTinModalOpened} onClose={closeTinModal} title="Calcolo codice fiscale" withCloseButton={false} size="60%">
          <EventEntryTinForm form={form} onClose={closeTinModal} />
        </Modal>
      </MantineProvider>
    </>
  )
}
