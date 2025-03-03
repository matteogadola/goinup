import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";

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

  if (dt(event.date).isBefore()) {
    //return 'Se l\'evento è già passato... mostro allegati'
  } else {
    // in caso contrario mostro lo status delle iscrizioni
    // e elenco iscritti
  }

  if (event.status === 'close') {
    return 'Iscrizioni chiuse'
  } else if (event.status === 'open') {
    if (event.closing_date && dt(event.closing_date).isBefore()) {
      return 'Iscrizioni disponibili alla partenza'
    }
    if (event.opening_date && dt(event.opening_date).isAfter()) {
      return 'Iscrizioni disponibili dal ' + dt(event.opening_date).format('ddd DD MMM')
    }

    return 'Iscrizioni aperte fino al ' + dt(event.closing_date).format('ddd DD MMM')
    /*return (
      <div className="flex flex-row items-center space-x-2">
        <span className="text-accent">Iscrizioni aperte</span>
        <span className="text-accent">fino al {dt(event.closing_date).format('ddd DD MMM')}</span>
      </div>
    )*/
  }
}
