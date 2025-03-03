import clsx from 'clsx'

const sponsors = [
  {
    name: 'Popso',
    logo: 'popso.png',
    height: 50,
    url: 'https://www.popso.it'
  }, {
    name: 'Mat Food',
    logo: 'mat-food.png',
    height: 90,
    url: 'http//www.mat-food.it',
  }, {
    name: 'Birrificio Valtellinese',
    logo: 'birrificio-valtellinese.png',
    height: 70,
    url: 'https://www.birrificiovaltellinese.com'
  }, {
    name: 'Lnc Life',
    logo: 'lnc-life.svg',
    height: 40,
    url: 'https://www.lnclife.it'
  }, {
    name: 'Leon',
    logo: 'leon.webp',
    height: 80,
    url: 'https://www.leonbellessere.com/'
  }, {
    name: 'Officina Fiorelli',
    logo: 'officina-fiorelli.png',
    height: 50,
    url: 'https://www.facebook.com/people/Officina-Autorizzata-Ford-di-Fiorelli-Matteo/100066566109924'
  }, {
    name: 'Patagonia',
    logo: 'patagonia-1.png',
    height: 80,
    url: 'https://www.facebook.com/3passipatagonia'
  }, {
    name: 'Avis',
    logo: 'avis.webp',
    height: 80,
    url: 'https://www.avis.it/it'
  },
]

const supporters = [
  {
    name: 'Consorzio Traona',
    logo: '/images/credits/consorzio-prati-bioggio.webp',
    height: 70,
  }, {
    name: 'Team Valtellina',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://teamvaltellina.com'
  }, {
    name: 'Sport Race Valtellina',
    logo: '/images/credits/team-valtellina.webp',
    height: 90,
    url: 'https://www.facebook.com/SportRaceValtellina/',
  }, {
    name: 'Pro Loco Gerola',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://www.facebook.com/ProLocoGerola'
  }, {
    name: 'Pro Loco Bema',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://www.prolocobema.it'
  }, {
    name: 'Insieme per Sacco',
    logo: '/images/credits/team-valtellina.webp',
    height: 90,
    url: 'https://www.insiemepersacco.it'
  }, {
    name: 'K2 Valtellina',
    logo: '/images/credits/team-valtellina.webp',
    height: 90,
    url: 'https://www.k2valtellina.it/'
  }, {
    name: 'Tiro alla Fune Valtellina',
    logo: '/images/credits/team-valtellina.webp',
    height: 100,
    url: 'https://www.facebook.com/tiroallafuneValtellina'
  }, {
    name: 'La voce di Daniele',
    logo: '/images/credits/team-valtellina.webp',
    height: 70,
  }, {
    name: 'Mobili Rumi',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://www.mobilirumi.it'
  }, {
    name: 'Caurga',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://www.facebook.com/prolocoforcola'
  },
]

const partners = [
  {
    name: 'Sport di Montagna',
    logo: '/images/credits/team-valtellina.webp',
    height: 80,
    url: 'https://www.sportdimontagna.com',
  }, {
    name: 'Fotorun Valtellina',
    logo: '/images/credits/team-valtellina.webp',
    height: 100,
    url: 'https://www.facebook.com/FOTORUN.valtellina'
  }, {
    name: 'Radio Tsn',
    logo: '/images/credits/team-valtellina.webp',
    height: 60,
    url: 'https://radiotsn.tv/'
  }, {
    name: 'Speed Time Production',
    logo: '/images/credits/team-valtellina.webp',
    height: 70,
    url: 'https://www.facebook.com/speedtimeproduction'
  }, {
    name: 'Centrovalle',
    logo: '/images/credits/team-valtellina.webp',
    height: 70,
    url: 'https://netweek.it/testate/giornale-di-sondrio-centro-valle/',
  }, {
    name: 'La Provincia di Sondrio',
    logo: '/images/credits/team-valtellina.webp',
    height: 50,
    url: 'https://www.laprovinciadisondrio.it'
  },
]

export default function Credits() {
  return (
    <section className="text-center mx-4 space-y-8">
      <div className="py-4">
        <h3 className="overtitle">Sponsor</h3>
        <div className="flex flex-wrap space-y-8">
          {sponsors.map((item, index) =>
            <div key={index} className="flex flex-grow w-1/2 lg:w-1/3 justify-center items-center">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={`images/credits/${item.logo}`} height={item.height} width={item.height} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Supporter</h3>
        <div className="flex flex-wrap space-y-8">
          {supporters.map((item, index) =>
            <div key={index} className="flex flex-grow w-1/2 lg:w-1/4 justify-center items-center">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={item.logo} height={item.height} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Media partner</h3>
        <div className="flex flex-wrap space-y-8">
          {partners.map((item, index) =>
            <div key={index} className="flex flex-grow w-1/2 lg:w-1/4 justify-center items-center">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={item.logo} height={item.height} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/*<div className="py-4">
      <h3 className="overtitle">Sponsor</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { sponsors.map((item, index) =>
            <a href={item.url} key={index} target="_blank" rel="noopener noreferrer" className={classNames({"col-span-2 lg:col-span-3": index === sponsors.length -1 })}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Supporter</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { supporters.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { supporters2.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Media partner</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { partners.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { media.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>*/}
    </section>
  )
}
