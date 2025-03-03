import { dt } from "@utils/date";
import clsx from "clsx";
import Link from "next/link";

/*
mostra i prossimi eventi (3 - parametrizabile)

metti tag con status iscrizioni (aperte, chiuse, soldout, ecc)
*/
export default async function EventItems({ events }: { events: any[] }) {

  return (
    <>
      <ul role="list" className="grid grid-cols-3 gap-12 justify-center items-center">
        {events.map((event, key) =>
          <Link href={`/events/${event.slug.current}`} key={key}>
            <div className="lg:max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl border-2 border-title hover:opacity-90">
              <div className="relative text-white text-center">
                <div className="h-48">
                  <img src={getSource(event.summary_image?.asset?._ref)} className="w-full h-full object-cover object-top" alt="Image" />
                  <div className="absolute inset-0 w-full h-full bg-slate-800 opacity-40"></div>
                </div>
                <span className={
                  clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-unbounded font-semibold uppercase", {
                    "whitespace-nowrap": event.name.length <= 12
                  })}
                >
                  {event.name}
                </span>

                <div className="absolute bottom-2 font-semibold text-xs w-full px-2 flex flex-row justify-between">
                  <span className="uppercase">{event.promoter_id !== 1 && event.promoter_id}</span> {/* va pigliato e stampato promoter_name */}
                  <div className="space-x-2">
                    {(event.details?.elevation_gain ?? 0) !== 0 && <span className=" bg-accent rounded-md py-0.5 px-1.5 bg-opacity-60">{event.details?.elevation_gain}D+</span>}
                    {(event.details?.distance ?? 0) !== 0 && <span className="bg-button rounded-md py-0.5 px-1.5 bg-opacity-60">{event.details?.distance}km</span>}
                  </div>
                </div>

              </div>
              <div className="px-6 py-4 min-h-[12rem]">
                <span className="font-unbounded font-semibold text-accent text-xl uppercase">{dt(event.date).format('ddd DD MMM')}</span>
                <p className="text-gray-700 text-base mt-2">{event.summary}</p>
                {/*<p className="text-gray-700 text-base mt-2">ISCRIZIONE</p>*/}
              </div>

            </div>
          </Link>
        )}
        {/*events.map((event, key) => (
          <div className="grid grid-rows-subgrid row-span-4 gap-0" key={key}>
            <div>immagine</div>
            <div>descrizione</div>
            <div>data</div>
            <div>immagine</div>
          </div>
        ))*/}
      </ul>

    </>
  )
}

function getSource(imageRef: string) {
  const img = imageRef.replace('-jpg', '.jpg').replace('image-', '')
  return `https://cdn.sanity.io/images/5jqfesyl/production/${img}?w=400`
}