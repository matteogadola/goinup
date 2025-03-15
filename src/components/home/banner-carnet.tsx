import { dt } from '@utils/date'
import { urlFor } from '@utils/sanity'
import clsx from 'clsx'
import Link from 'next/link'

export default function BannerCarnet({ serie, className }: { serie: any, className?: string }) {
  if (serie.opening_date && dt(serie.opening_date).isAfter()) {
    //return <></>
  }
  if (serie.closing_date && dt(serie.closing_date).isBefore()) {
    //return <></>
  }

  if (serie === 'close') {
    return
  }

  if (!serie.products?.length) {
    return
  }

  const product = serie.products[0]

  return (
    <section className={clsx("", className)}>
      <Link href={`events/${serie.slug.current}`}>
        <div className="lg:w-4/5 max-w-250 lg:mx-auto relative rounded-lg block md:flex items-center bg-blue-50 shadow-xl hover:shadow-2xl min-h-10">
          <div className="hidden lg:flex relative w-full md:w-2/5 h-full overflow-hidden rounded-l-lg min-h-10">
            <img src={urlFor(serie.summary_image)} className="object-cover object-center" />
            <div className="absolute inset-0 w-full h-full bg-slate-500 opacity-20"></div>
          </div>
          <div className="w-full bg-blue-50 md:w-3/5 h-full flex items-center rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <h1 className="font-unbounded capitalize"><span className="px-1 bg-yellow-200">Prevendita</span></h1>
              <h3 className="font-unbounded text-2xl font-semibold uppercase">Carnet 10 gare</h3>
              <p className="mt-4 text-gray-600">Acquista il carnet per tutte e 10 le gare del circuito GOinUP più la gara amica Mirtillo Vertical.</p>
              <div className="flex items-baseline mt-3">
                <span className="text-button hover:opacity-70">Maggiori informazioni</span>
                <span className="text-xs ml-1">&#x279c;</span>
              </div>
            </div>
            <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-blue-50 -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  )
}
