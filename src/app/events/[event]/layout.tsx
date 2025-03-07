import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getEvent } from '@/lib/events';
import type { Params } from './page';
import { Suspense } from 'react';

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const event = await getEvent(params.event);

  return (
    <>
      <Suspense>
        <Navbar promoter={event?.promoter?.id} />
      </Suspense>
      <main>{children}</main>
      <Suspense>
        <Footer promoter={event?.promoter?.id} />
      </Suspense>
    </>
  )
}