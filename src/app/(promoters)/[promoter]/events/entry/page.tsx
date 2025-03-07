'use client'

import { notFound, useSearchParams } from 'next/navigation'
import { Suspense, use } from 'react'
import { getItem } from '@/lib/items'
import EntryForm from './form'
import EntryCart from './cart'
import { base64 } from '@/lib/helpers'
import { Item } from '@/types/items'

/* Sarebbe carino funzionasse così
export default async function EntryPage() {
  const ticketId = Number(useSearchParams().get('q'))
  const ticket = await getTicket(ticketId)*/

export default function EntryPage() {
  const item = base64.decode<Item>(useSearchParams()?.get('q') ?? '')

  if (item === null) notFound()
  
  //const item = await getItem(Number(itemId))

  //if (item=== null) notFound()

  //const ticket = base64.decode<Ticket>(searchParams.q)

  // verifica se utente loggato...se si mostra campi compilati
  // se no mostra pulsante per accedere (poi la registrazione si potrà selezionare da sign-in)
  
  return (
    <section className="page">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-3">
          <span className="overtitle">Iscrizione</span>
          <h1 className="title">{item.name}</h1>
          <p className="mt-8" dangerouslySetInnerHTML={{ __html: item.description ?? '' }} />
          <EntryForm item={item} className="mt-8" />
        </div>
        <div className="col-span-1 md:col-span-2 md:ml-16">
          <EntryCart />
        </div>
      </div>
    </section>
  )
}
