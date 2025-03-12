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
    return <>Iscrizioni chiuse</>
  } else if (event.status === 'open') {
    if (event.closing_date && dt(event.closing_date).isBefore()) {
      return <>Iscrizioni disponibili alla partenza</>
    }
    if (event.opening_date && dt(event.opening_date).isAfter()) {
      return <>Iscrizioni disponibili da {dt(event.opening_date).format('ddd DD MMM')}</>
    }

    const defaultClosingDate = dt(event.date).subtract(46, 'hours')
    return <>Iscrizioni aperte fino a {defaultClosingDate.format('dddd D MMMM')} alle {defaultClosingDate.format('HH:mm')}</>
    /*return (
      <div className="flex flex-row items-center space-x-2">
        <span className="text-accent">Iscrizioni aperte</span>
        <span className="text-accent">fino al {dt(event.closing_date).format('ddd DD MMM')}</span>
      </div>
    )*/
  }
  
  return <></>
}
