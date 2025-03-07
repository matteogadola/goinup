import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntry from "./event-entry";

export default async function EventProducts({ event }: { event: any }) {

  if (event.type === 'race') {
    if (!event.products?.length) {
      return <></>
    } else if (event.products?.length === 1) {
      return <EventEntry event={event} product={event.products[0]} />
    } else {
      // son più di uno...per la gara non dovrebbe essere possibile
    }
  }
  return <></>
}
