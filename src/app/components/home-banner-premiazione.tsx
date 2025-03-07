import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

import carnet from 'public/images/carnet.jpg'

export default function HomeBanner({ className }: { className?: string }) {
  const eventId = 'cena-goinup-5'

  return (
    <section className={classNames("w-full", className)}>
      <Link href={`events/${eventId}`}>

        <div className="mx-auto w-full md:w-3/5 flex items-center rounded shadow-lg hover:shadow-xl">
          <div className="md:pr-24 md:pl-16">
            <div className="md:p-12">
              <h1 className="overtitle">Ven 13 ottobre</h1>
              <h3 className="title">Serata di beneficenza</h3>
              <p className="mt-4 text-gray-600">Ti aspettiamo per la serata conclusiva del circuito tra piatti di pizzoccheri, premiazioni, lotteria e la consegna delle attrezzature che hai contribuito a donare alle associazioni benefiche del mandamento di Morbegno.</p>
              <div className="flex items-baseline mt-3">
                <span className="text-button hover:opacity-70">Prenotazione obbligatoria entro mercoledì 11 ottobre</span>
                <span className="text-xs ml-1">&#x279c;</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
