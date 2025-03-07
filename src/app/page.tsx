import FadeUpAnimation from '@components/animations/fade-up';
import Credits from '@components/credits'
import UpcomingEvents from '@components/events/upcoming'
import BannerCarnet from '@components/home/banner-carnet';
import { dt } from '@utils/date';
import { urlFor } from '@utils/sanity';
import { getSeries, getUpcomingEvents } from '@utils/sanity/queries'

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const serie = (await getSeries({ year: 2025 }))?.[0];

  return (
    <>
    <div className="flex justify-center items-center space-x-12 mt-8">
      <div className="flex flex-col lg:w-1/3 space-y-2 lg:-mt-20">
          <h3 className="text-lg text-gray-600">10 gare vertical di montagna</h3>
          <h1 className="mt-2 text-3xl">Circuito a finalità <span className="px-1 bg-yellow-200">benefica</span></h1>
          <h2 className="mt-2 text-xl"><span className="px-1 bg-blue-200">GOinUP</span> è un gruppo di associazioni che coordina e promuove l'omonimo circuito di gare di montagna. Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a diverse associazioni benefiche nel mandamento di Morbegno</h2>
      </div>

      <div className="hidden lg:flex items-start">
        <div className="shadow-lg z-10">
          <FadeUpAnimation>
            <img src="/images/tre.webp" alt="Header image" className="" width={300} />
          </FadeUpAnimation>
        </div>
        <div className="relative -left-10 top-5 shadow-lg">
          <FadeUpAnimation>
            <img src="/images/due.webp" alt="Header image" className="" width={300} />
          </FadeUpAnimation>
        </div>
      </div>
      
      {/*<div className="flex min-h-64 space-x-4 justify-center items-center">
        <div className="bg-blue-500">
          <img src="images/due.webp" alt="Header image" className="" width={300} />
        </div>
        <div className="bg-red-500">
          <img src="images/uno.webp" alt="Header image" className="" width={300} />
        </div>
        <div className="bg-yellow-500">
          <img src="images/tre.webp" alt="Header image" className="" width={300} />
        </div>
      </div>*/}
    </div>

    {serie.status === 'open' && <BannerCarnet serie={serie} />}

    {upcomingEvents.length > 0 &&
      <div className="flex flex-col mt-32 justify-center items-center space-y-16">
        <span className="text-3xl">Iscriviti alle prossime gare</span>

        <UpcomingEvents events={upcomingEvents} />
      </div>
    }
    
    {!!serie?.summary_image &&
      <div className="flex mt-32 justify-center items-center">
        <img src={urlFor(serie.summary_image).url()} alt="goinup flyer" className="" width={700} />
      </div>
    }

    <Credits className="mt-16" />
    </>
  );
}
