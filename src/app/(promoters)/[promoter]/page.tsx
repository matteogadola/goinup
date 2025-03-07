import type { Metadata, ResolvingMetadata } from 'next'
import { getPromoter, getPromoters } from '@/lib/promoters'

interface Params {
  promoter: string;
}

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PromoterPage({ params }: Props) {
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

/*export const getStaticPaths: GetStaticPaths = async () => {
  const promoters = await getPromoters();

  return {
    paths: promoters.map(item => ({ params: { promoter: item.id } })),
    fallback: false,
  }
}*/

export const dynamicParams = false;
export const revalidate = 21600; // 6h

export async function generateStaticParams() {
  const promoters = await getPromoters();

  return promoters.map(promoter => ({
    promoter: promoter.id,
  }))
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const promoter = await getPromoter(params.promoter);

  return {
    title: promoter?.name,
  }
}
