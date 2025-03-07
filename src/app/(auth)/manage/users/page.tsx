import type { Metadata, ResolvingMetadata } from 'next'
import { getPromoter } from '@/lib/promoters'

interface Params {
  promoter: string;
}

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ManageUserPage() {
  /*const event = await getEvent(params.id);

  if (event === null || event.status === 'internal') {
    notFound();
  }

  const items = await getItems({ eventId: event.id, status: 'published' })*/

  return (
    <section className="page">
    </section>
  )
}
