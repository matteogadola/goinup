import Credits from '@components/credits'
import UpcomingEvents from '@components/events/upcoming'
import { getUpcomingEvents } from '@utils/sanity/queries'

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  //getEvents().then((events: any) => console.log("sbrem", JSON.stringify(events)));
  //console.log(upcomingEvents)

  return (
    <>
    <div className="flex justify-center items-center space-x-12 mt-8">
      <div className="flex flex-col lg:w-1/3 space-y-2 lg:-mt-20">
        <p className=" text-lg text-gray-600">10 gare vertical di montagna</p>
        <h1 className="text-3xl">Circuito a finalità <span className="px-1 bg-yellow-200">benefica</span></h1>
        <h2 className="text-xl"><span className="px-1 bg-blue-200">GOinUP</span> ha finalità benefica, con una quota degli introiti dalle iscrizioni e dalle donazioni volontarie, si pone</h2>
      </div>

      <div className="hidden lg:flex items-start">
        <div className="shadow-lg z-10">
          <img src="/images/tre.webp" alt="Header image" className="" width={300} />
        </div>
        <div className="relative -left-10 top-5 shadow-lg">
          <img src="/images/due.webp" alt="Header image" className="" width={300} />
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

    {upcomingEvents.length > 0 &&
      <div className="flex flex-col mt-32 justify-center items-center space-y-16">
        <span className="text-3xl">Iscriviti alle prossime gare</span>

        <UpcomingEvents events={upcomingEvents} />
      </div>
    }
    
    {/* Manifesto */}
    <div className="flex mt-32 justify-center items-center">
      <img src="/images/flyers/goinup-6.webp" alt="Header image" className="" width={600} />
    </div>

    {/*<Credits />*/}
    </>
  );
}
