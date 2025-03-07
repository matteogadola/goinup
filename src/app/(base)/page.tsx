import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { GetStaticProps, Metadata } from 'next'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import Link from 'next/link'
import Image from 'next/image'
import headerImage from 'public/images/header.jpg'
import HomeBanner from '../components/home-banner-premiazione'
import HomeCarnet from '../components/home-carnet'

export default async function HomePage() {

  return (
    <>
      <div className="w-full relative -top-12 h-screen bg-black">
        <Image
          className="opacity-60"
          src={headerImage}
          alt="Header image"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="display absolute top-20 left-10 lg:top-40 lg:left-20 w-36 md:w-96 lg:w-auto">
          <h1>GO<span className="text-accent">in</span>UP</h1>
          <h3>Circuito di 11 gare vertical<br /><span className="whitespace-nowrap">in montagna</span></h3>
        </div>
      </div>
      <section className="page relative space-y-32">

        <HomeMission />

        {/*<HomeCarnet />*/}

        <Suspense fallback={<Spinner />}>
          <HomeEvents />
        </Suspense>

        <HomeGoinupCalendar />

        <Credits />
      </section>
    </>
  )
}

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Goinup',
  description: 'Circuito di gare vertical a scopo benefico',
}
