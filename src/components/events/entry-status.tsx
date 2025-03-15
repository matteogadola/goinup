import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import { JSX } from "react";

/*
devo gestire se aperta (mostrare fino a quando)
se non ancora aperta (mostrare da quando)
se chiusa (mostrare possibilità di farlo alla partenza)

ISCRIZIONI: Aperte fino al
ISCRIZIONI: Chiuse
ISCRIZIONI: Disponibili alla partenza

SE date è passato non mostro nulla
*/
export default function EventEntryStatus({ event }: { event: any }) {
  
  if (event.status === 'close') {
    return <span className="">Iscrizioni chiuse</span>
  } else if (event.status === 'open') {
    // per ora no supporta altri modi
    if (event.products?.length === 1) {
      const product = event.products[0]

      // poi supporta sold out ecc
      if (product.status !== 'open') {
        return <span className="">Iscrizioni chiuse</span>
      }

      if (product.closing_date && dt(product.closing_date).isBefore()) {
        return <span className="">Iscrizioni disponibili alla partenza</span>
      }

      if (product.opening_date && dt(product.opening_date).isAfter()) {
        return (
          <div className="flex flex-col space-x-2">
            <span className="">Iscrizioni <span className="highlighted">chiuse</span></span>
            <span className="block text-gray-700 text-sm">disponibili da {product.opening_date.format('dddd D MMMM')} alle {product.opening_date.format('HH:mm')}</span>
          </div>
        )
      }

      const defaultClosingDate = dt(event.date).subtract(46, 'hours')
      return (
        <div className="flex flex-col space-x-2">
          <span className="">Iscrizioni <span className="highlighted">aperte</span></span>
          <span className="block text-gray-700 text-sm">fino a {defaultClosingDate.format('dddd D MMMM')} alle {defaultClosingDate.format('HH:mm')}</span>
        </div>
      )
    }
  }
  
  return <></>
}
