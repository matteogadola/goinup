import Image from 'next/image'
import { getEvent, getEvents } from '@/lib/events'
import { getItem, getItems } from '@/lib/items'
import ItemsList from '@/components/items-list'
import { dt, getReadableDate } from '@/lib/date'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { base64 } from '@/lib/helpers'
import { GetStaticPaths, Metadata, ResolvingMetadata } from 'next/types'
import { getPromoter } from '@/lib/promoters'
import EntryForm from '@/app/(promoters)/[promoter]/events/entry/form'
import EntryCart from '@/app/(promoters)/[promoter]/events/entry/cart'

interface Params {
  event: string;
  item: number;
}

interface Props {
  params: Params;
  //searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EntryPage({ params }: Props) {
  const item = await getItem(params.item);
  if (item === null || item.status !== 'published') notFound();

  return (
    <section className="page">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-3">
          <span className="overtitle">Iscrizione</span>
          <h1 className="title">{item.name}</h1>
          <p className="mt-8" dangerouslySetInnerHTML={{ __html: item.description ?? '' }} />
          <EntryForm item={item} className="mt-8" />
        </div>
        <div className="col-span-1 md:col-span-2 ml-16">
          <EntryCart />
        </div>
      </div>
    </section>
  )
}

export const dynamicParams = false;
export const revalidate = 21600; // 6h

export async function generateStaticParams() {
  const items = await getItems();

  return items.map(item => ({
    event: item.event_id,
    item: item.id.toString()
  }))
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const item = await getItem(params.item);

  return {
    title: item?.name ?? 'Iscrizione',
  }
}

/*export async function generateStaticParams() {
  const events = await getEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}*/
