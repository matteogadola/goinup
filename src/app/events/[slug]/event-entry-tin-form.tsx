/*



            <Select
                          withAsterisk
                          label="Sesso"
                          placeholder="Seleziona"
                          key={form.key('gender')}
                          {...form.getInputProps('gender')}
                          data={[{ value: 'M', label: 'Maschio' }, { value: 'F', label: 'Femmina' }]}
                        />
            */
'use client'

import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntryForm from "./event-entry-form";
import EventEntryStatus from "@components/events/entry-status";
import { Autocomplete, Button, Modal, Select, TextInput, UnstyledButton } from "@mantine/core";
import { getMunicipalities } from "@utils/sanity/queries";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import CodiceFiscale from 'codice-fiscale-js'
import ErrorTexty from "@components/ui/error-text";
import ErrorText from "@components/ui/error-text";

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (/^[0-9]{4}$/.test(input)) {
    return new Date(Number(input), 0, 1);
  }

  return dt(input, ['DD/MM/YYYY', 'D/MM/YYYY', 'DD/M/YYYY', 'D/M/YYYY']).toDate();
};
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

const municipalities = getMunicipalities()

export default function EventEntryTinForm({ form: outerForm, onClose }: { form: any, onClose: any }) {

  const [error, setError] = useState<string | null>(null)
  const values: any = useMemo(() => outerForm.getValues(), [outerForm])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: values,
    validate: {
      birth_place: (value) => (municipalities.includes(value) ? null : "Comune non trovato")
    },
  });

  const handleSave = () => {
    const data = form.getValues()
    const date = new Date(data.birth_date)

    try {
      const { cf: tin } = new CodiceFiscale({
        name: data.first_name,
        surname: data.last_name,
        gender: data.gender,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        birthplace: data.birth_place,
        birthplaceProvincia: ''
      })

      outerForm.setValues({ ...data, tin });
      onClose()
      //onChange({ ...data, tin })
    } catch(e: any) {
      setError(e.message)
    }
  }

  return (
    <>
      <form autoComplete="off">
        <div className="px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <TextInput
              withAsterisk
              label="Nome"
              placeholder=""
              className="col-span-2"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />
                
            <TextInput
              withAsterisk
              label="Cognome"
              placeholder=""
              className="col-span-2"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />

            <Autocomplete
              withAsterisk
              label="Comune di Nascita"
              className="col-span-2"
              limit={5}
              key={form.key('birth_place')}
              {...form.getInputProps('birth_place')}
              data={municipalities}
            />

            <DateInput
              withAsterisk
              label="Data di nascita"
              placeholder="gg/mm/aaaa"
              valueFormat="DD/MM/YYYY"
              dateParser={dateParser}
              key={form.key('birth_date')}
              {...form.getInputProps('birth_date')}
            />

            <Select
              withAsterisk
              label="Sesso"
              placeholder="Seleziona"
              key={form.key('gender')}
              {...form.getInputProps('gender')}
              data={[{ value: 'M', label: 'Maschio' }, { value: 'F', label: 'Femmina' }]}
            />

          </div>
          {!!error && <ErrorText>{error}</ErrorText>}
        </div>
            
        <div className="flex items-center justify-end mt-6 pt-4 px-4 border-t border-solid border-slate-200 rounded-b space-x-6">
          <Button onClick={onClose} variant="subtle" color="gray">Annulla</Button>
          <Button onClick={handleSave} variant="filled" color="teal">Calcola</Button>
        </div>

      </form>
    </>
  )
}
