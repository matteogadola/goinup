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

      <div className="hidden lg:flex lg:flex-col items-start">
        <div className="shadow-lg ">
          <FadeUpAnimation>
            <img src="/images/homepage/lino.jpg" alt="Header image" className="grayscale-50" width={400} />
          </FadeUpAnimation>
        </div>
        <div className="relative z-10 left-10 -top-7 shadow-lg">
          <FadeUpAnimation>
            <img src="/images/homepage/quattro.webp" alt="Header image" className="grayscale-50" width={500} />
          </FadeUpAnimation>
        </div>
      </div>
      {/*<div className="hidden lg:flex items-start">
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
      </div>*/}
      
    </div>


    {serie.status === 'open' && <BannerCarnet serie={serie} className="mt-16" />}

    {upcomingEvents.length > 0 &&
      <div className="flex flex-col mt-32 justify-center items-center space-y-16">
        <span className="text-3xl">Prossimi eventi</span>

        <UpcomingEvents events={upcomingEvents} />
      </div>
    }
    
    {!!serie?.flyer &&
      <div className="flex mt-32 justify-center items-center">
        <img src={urlFor(serie.flyer).url()} alt="goinup flyer" className="" width={700} />
      </div>
    }

    <Credits className="mt-16" />
    </>
  );
}
