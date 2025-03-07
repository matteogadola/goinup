import Image from 'next/image'
import missionImage from 'public/images/mission.webp'

export default function HomeMission() {

  return (
    <section className="flex items-center justify-center gap-32 mt-20 mb-10">

      <div className="hidden lg:flex lg:relative bg-slate-600 opacity-80 shadow-xl rounded-full h-88 w-88 overflow-hidden">
        <Image
          src={missionImage}
          alt="Mission"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="">
        <h3 className="overtitle">Finalità Benefica</h3>
        <h1 className="title">Chi siamo?</h1>
        <p className="mt-8 max-w-md">
          GOinUP è un gruppo di associazioni che coordina e promuove l&apos;omonimo circuito di gare di montagna.
          Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a
          diverse associazioni benefiche nel mandamento di Morbegno.
        </p>
      </div>

    </section>
  )
}
