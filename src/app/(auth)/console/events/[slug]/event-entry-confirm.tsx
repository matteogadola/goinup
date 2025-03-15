'use client'

import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntryStatus from "@components/events/entry-status";
import { Autocomplete, Button, Modal, Select, TextInput, UnstyledButton } from "@mantine/core";
import { getMunicipalities } from "@utils/sanity/queries";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { use, useEffect, useMemo, useState } from "react";
import ErrorTexty from "@components/ui/error-text";
import ErrorText from "@components/ui/error-text";
import { createClient } from "@/utils/supabase/client";
import { Order } from "@/types/orders";
import dayjs from "dayjs";


export default function EntryConfirmButton({ entry }: { entry: any }) {
  const [opened, { open, close }] = useDisclosure(false)

  // il bottone loading={loading} loaderProps={{ type: 'dots' }}
  return (
    <>
      <Button variant="outline" color="teal" onClick={open}>Conferma</Button>
      <Modal opened={opened} onClose={close} title={"CONFERMA ORDINE " + entry.order_id} withCloseButton={false} size="xl">
        <ConsoleEventEntryConfirm entry={entry} onClose={close} />
      </Modal>
    </>
  )
}

function ConsoleEventEntryConfirm({ entry, onClose }: { entry: any, onClose: any }) {
  const [order, setOrder] = useState<Order>();
  const unpaidItems = useMemo(() => order?.items.filter(i => i.payment_status === 'pending') ?? [], [order])

  useEffect(() => {
    getOrder(entry.order_id)
      .then((order) => setOrder(order))
      .catch((e) => setOrder(undefined))
  }, [entry]);

  if (order === undefined) return <></>

  return (
    <>
    <div>
      <p>Ordine del {dayjs(order.date).format('D MMMM')} per un totale di {order.amount / 100}€ con modalità di pagamento {order.payment_method}</p>
      </div>
      <div className="mt-4">
        <h3 className=" text-lg font-unbounded">Notifica</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <td>{order.customer_email}</td>
              <td>{order.notification_date}</td>
              <td>{order.notification_status}</td>
              <td className="w-22"><Button variant="light" fullWidth>Rinvia</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mt-4" />
      <div className="mt-4">
        <h3 className=" text-lg font-unbounded">Iscrizioni</h3>
        <table className="w-full">
          <tbody className="">
        {order.items.map((item, index) =>
        <tr key={index}><td className="py-4">{item.name}</td><td>{item.description}</td><td>{item.payment_status}</td>
        <td className="w-22">
          {unpaidItems.length > 1
            ? <Button onClick={() => updateOrderItem(item.id)} disabled={item.payment_status !== 'pending'} variant="light" color="teal" fullWidth>
                {item.payment_status === 'pending'
                  ? <span>Conferma<span className="ml-1 text-xs font-light">({item.price / 100}€)</span></span>
                  : <span>Pagato</span>
                }
              </Button>
            : <span>({item.price / 100}€)</span>
          }
        </td>
        </tr>
        )}
        </tbody>
        </table>
        </div>
        <div className="flex items-center justify-end mt-6 pt-4 px-4 border-t border-solid border-slate-200 rounded-b space-x-6">
          <Button onClick={onClose} variant="subtle" color="gray">Annulla</Button>
          <Button onClick={() => updateOrderItems(order.id)} variant="filled" color="teal">{unpaidItems.length > 1 ? 'Conferma tutto' : 'Conferma'}<span className="ml-1 items-center text-xs font-light">({unpaidItems.reduce((a, v) => a + v.price, 0) / 100}€)</span></Button>
        </div>

    </>
  )
}


const getOrder = async (id: string) => {
  const supabase = createClient()

  const { data } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', id)
    .single()
    .returns<any>();

  return data
}

const updateOrderItems = async (id: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('order_items')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      payment_date: dayjs.utc().format(),
    })
    .eq('order_id', id);

  console.log('orders', data)
  console.warn('orders', error)

  return data
}

const updateOrderItem = async (id: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('order_items')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      payment_date: dayjs.utc().format(),
    })
    .eq('id', id);

  return data
}
