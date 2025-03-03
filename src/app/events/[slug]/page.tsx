import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link';
import { getEvent, getEvents } from '@utils/sanity/queries';
import { urlFor } from '@utils/sanity';
import { notFound } from 'next/navigation';
import { dt } from '@utils/date';

interface Params {
  slug: string;
}

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60 * 30 // 30 minutes
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const events = await getEvents()
 
  return events.map((event: any) => ({
    slug: event.slug.current,
  }))
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug);

  return {
    title: event.name,
    keywords: ['goinup', 'vertical', ''], // aggiungi città o keywords/tags in schema
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEvent(slug);

  if (event === null || event.status === 'internal') {
    notFound();
  }

  console.log(event)
  //const items = await getItems({ eventId: event.id, status: 'published' })

  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {event.date && <span className="font-unbounded capitalize px-1 bg-yellow-200">{dt(event.date).format('ddd DD MMM')}</span>}
          <h1 className="font-unbounded text-2xl font-semibold uppercase">{event.name}</h1>
          <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? event.summary ?? '' }} />

          <div className="mt-8">
            <Link href={event.regulation ?? "/regulation"}>
              <span className="text-button hover:opacity-80">Consulta il regolamento</span>
            </Link>
          </div>

          {/* se l'evento è futuro mostra items da comprare, se passato mostra link a classifica e foto */}
          <div className="mt-8">
            {(!!event.closing_date && dt().isBefore(dt(event.closing_date))) || event.date === null || dt(event.date).diff(dt(), 'hours') >= 46
              ? <>{/*<ItemsList list={event.items} event={event} />*/}</>
              : dt(event.date).isAfter(dt(), 'hour') && <p>Iscrizione disponibile alla partenza</p>
            }

            {(!!event.items?.length && event.category === 'race') && <div className="mt-8">
              <Link href={{ pathname: `${event?.id}/entries`, query: { q: '' /*base64.encode(event)*/ } }}>
                <span className="text-button">Vedi elenco iscritti</span>
              </Link>
            </div>}
          </div>

        </div>

        <div className="flex lg:justify-end">
          {event.flyer === true &&
            <img
              src={urlFor(event.flyer).url()}
              className="mt-4 lg:mt-0"
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
