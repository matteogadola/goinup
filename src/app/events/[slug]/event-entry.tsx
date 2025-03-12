import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntryForm from "./event-entry-form";
import EventEntryStatus from "@components/events/entry-status";

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

export default function EventEntry({ event, product }: { event: any, product: any }) {

  return (
    <div className="px-4 py-2 bg-slate-50 shadow-sm">
      <div className="flex space-x-4 items-baseline">
        <h2 className ="font-unbounded text-xl">{product.name}</h2>
        <span className ="font-unbounded font-light px-1 bg-yellow-200">{product.price / 100}€</span>
      </div>

      <p className="text-gray-600">{product.summary}</p>
      <div className="hidden">
        <EventEntryStatus event={event} />
      </div>
      <EventEntryForm event={event} product={product} />
    </div>
  )
}
