'use client';

import { ChangeEvent, Suspense, cache, useEffect, useState } from 'react'
import { dt } from '@/lib/date'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import DownloadCsv from './download-csv'
import { createClient } from '@/lib/supabase-auth-client'
import { Event } from '@/types/events';
import { PlusIcon } from '@/app/components/icons';
import EntryDialog from './entry-dialog';
import { PaymentStatus } from '@/types/orders';
import { useForm } from 'react-hook-form';

const supabase = createClient();

type Props = {
  event: Event;
}

interface Order {
  id: number;
  date: string;
  event_id: string;
  name: string;
  description: string;
  quantity: number;
  customer_first_name: string;
  customer_last_name: string;
}

const fetchOrders = cache(async (id: string | undefined) => {
  if (id === undefined) return [];

  const { data } = await supabase.from('v_orders').select().eq('event_id', id);
  return data ?? [];
})

export default function OrdersList({ event }: Props) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders(event?.id)
      .then((orders) => setOrders(orders))
      .catch(() => setOrders([]))
  }, [event]);

  return (
    <Suspense fallback={<Spinner />}>
      <section>
        <div className="flex items-center space-x-4">
          <h3 className="overtitle">
            {
              event.category === 'food'
                ? <span>Coperti </span>
                : <span>Ordini </span>
            }
            <span className="text-gray-600 font-normal">({orders.reduce((a, b) => a + b.quantity, 0)})</span></h3>
        </div>

        {!!orders.length &&
          <div>
            <DownloadCsv data={orders} name={event.id} className="mt-2" />


            <div className="mt-4">

              <table className="text-sm">
                <thead>
                  <tr>
                    <td className="pr-5 border-b py-2">ORDINE</td>
                    <td className="pr-10 border-b py-2">DATA</td>
                    <td className="pr-10 border-b py-2">COGNOME</td>
                    <td className="pr-10 border-b py-2">NOME</td>
                    <td className="pr-10 border-b py-2">ARTICOLO</td>
                    <td className="pr-10 border-b py-2">QUANTITÀ</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    <tr key={index} className="border-b">
                      <td className="pr-5 py-2">{order.id}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{dt(order.date).format('DD-MM-YY')}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{order.customer_last_name}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{order.customer_first_name}</td>
                      <td className="pr-10 py-2">{order.name}</td>
                      <td className="pr-10 py-2">{order.quantity}</td>
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
