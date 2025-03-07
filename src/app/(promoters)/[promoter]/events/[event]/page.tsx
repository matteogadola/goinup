import Image from 'next/image'
import { getEvent, getEvents } from '@/lib/events'
import { getItems } from '@/lib/items'
import ItemsList from '@/components/items-list'
import { dt, getReadableDate } from '@/lib/date'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { base64 } from '@/lib/helpers'
import { GetStaticPaths, Metadata, ResolvingMetadata } from 'next/types'
import { getPromoter } from '@/lib/promoters'

interface Params {
  promoter: string;
  event: string;
}

interface Props {
  params: Params;
  //searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EventPage({
  params,
}: {
  params: Params
}) {
  const event = await getEvent(params.event);

  if (event === null) notFound()

  //const items = await getItems({ eventId: event.id, status: 'published' })

  return (
    <section className="page">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <span className="overtitle">{event.date ? dt(event.date).format('ddd DD MMM') : 'Evento'}</span>
          <h1 className="title mt-3">{!!event.edition && <span>{event.edition}° </span>}{event.name}</h1>
          <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? event.summary ?? '' }} />

          {event.promoter_id === 1 &&
            <div className="mt-8">
              <Link href={event.regulation ?? "/regulation"}>
                <span className="text-button hover:opacity-80">Consulta il regolamento</span>
              </Link>
            </div>
          }

          {/* se l'evento è futuro mostra items da comprare, se passato mostra link a classifica e foto */}
          <div className="mt-8">
            {(!!event.closing_date && dt().isBefore(dt(event.closing_date))) || event.date === null || dt(event.date).diff(dt(), 'hours') >= 46
              ? <ItemsList list={event.items} event={event} />
              : dt(event.date).isAfter(dt(), 'hour') && <p>Iscrizione disponibile alla partenza</p>
            }

            {(!!event.items?.length && event.category === 'race') && <div className="mt-8">
              <Link href={{ pathname: `${event?.id}/entries`, query: { q: base64.encode(event) } }}>
                <span className="text-button">Vedi elenco iscritti</span>
              </Link>
            </div>}
          </div>

        </div>

        <div className="flex lg:justify-end">
          {
            event.flyer && <Image
              className="mt-4 lg:mt-0"
              src={`/images/flyers/${event.flyer}`}
              alt="Flyer"
              width={500}
              height={500}
            />
          }
        </div>

      </div>
    </section>
  )
}

export const dynamicParams = false;
export const revalidate = 21600; // 6h

export async function generateStaticParams() {
  const events = await getEvents({ notInternal: true });

  return events.map(event => ({
    promoter: event.promoter_id,
    event: event.id
  }))
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const promoter = await getPromoter(params.promoter);
  const event = await getEvent(params.event);

  return {
    title: [event?.name, promoter?.name].filter(Boolean).join(' | '),
  }
}

/*export async function generateStaticParams() {
  const events = await getEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}*/
