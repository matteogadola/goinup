import Image from 'next/image'
import classNames from 'classnames'

import lncLife from 'public/images/credits/lnc-life.svg'
import leon from 'public/images/credits/leon.webp'
import officinaFiorelli from 'public/images/credits/officina-fiorelli.png'
import patagonia from 'public/images/credits/patagonia-1.png'
import matFood from 'public/images/credits/mat-food.png'
import birrificioValtellinese from 'public/images/credits/birrificio-valtellinese.png'
import popso from 'public/images/credits/popso.png'
import avis from 'public/images/credits/avis.webp'

const sponsors = [
  {
    name: 'Popso',
    logo: popso,
    height: 50,
    url: 'https://www.popso.it'
  }, {
    name: 'Mat Food',
    logo: matFood,
    height: 90,
    url: 'http//www.mat-food.it',
  }, {
    name: 'Birrificio Valtellinese',
    logo: birrificioValtellinese,
    height: 70,
    url: 'https://www.birrificiovaltellinese.com'
  }, {
    name: 'Lnc Life',
    logo: lncLife,
    height: 40,
    url: 'https://www.lnclife.it'
  }, {
    name: 'Leon',
    logo: leon,
    height: 80,
    url: 'https://www.leonbellessere.com/'
  }, {
    name: 'Officina Fiorelli',
    logo: officinaFiorelli,
    height: 50,
    url: 'https://www.facebook.com/people/Officina-Autorizzata-Ford-di-Fiorelli-Matteo/100066566109924'
  }, {
    name: 'Patagonia',
    logo: patagonia,
    height: 80,
    url: 'https://www.facebook.com/3passipatagonia'
  }, {
    name: 'Avis',
    logo: avis,
    height: 80,
    url: 'https://www.avis.it/it'
  },
]

import alpiniAlbaredo from 'public/images/credits/alpini-albaredo.webp'
import consorzioTraona from 'public/images/credits/consorzio-prati-bioggio.webp'
import teamValtellina from 'public/images/credits/team-valtellina.webp'
import sportRaceValtellina from 'public/images/credits/sport-race-valtellina.webp'
import prolocoGerola from 'public/images/credits/proloco-gerola.png'
import prolocoBema from 'public/images/credits/proloco-bema.jpg'
import insiemePerSacco from 'public/images/credits/insieme-per-sacco.webp'
import k2v from 'public/images/credits/k2v.png'
import tiroAllaFuneValtellina from 'public/images/credits/tiro-alla-fune-valtellina.webp'
import voceDiDaniele from 'public/images/credits/voce-di-daniele.png'
import mobiliRumi from 'public/images/credits/mobili-rumi.webp'
import caurga from 'public/images/credits/caurga.png'

const supporters = [
  {
    name: 'Consorzio Traona',
    logo: consorzioTraona,
    height: 70,
  }, {
    name: 'Team Valtellina',
    logo: teamValtellina,
    height: 80,
    url: 'https://teamvaltellina.com'
  }, {
    name: 'Sport Race Valtellina',
    logo: sportRaceValtellina,
    height: 90,
    url: 'https://www.facebook.com/SportRaceValtellina/',
  }, {
    name: 'Pro Loco Gerola',
    logo: prolocoGerola,
    height: 80,
    url: 'https://www.facebook.com/ProLocoGerola'
  }, {
    name: 'Pro Loco Bema',
    logo: prolocoBema,
    height: 80,
    url: 'https://www.prolocobema.it'
  }, {
    name: 'Insieme per Sacco',
    logo: insiemePerSacco,
    height: 90,
    url: 'https://www.insiemepersacco.it'
  }, {
    name: 'K2 Valtellina',
    logo: k2v,
    height: 90,
    url: 'https://www.k2valtellina.it/'
  }, {
    name: 'Tiro alla Fune Valtellina',
    logo: tiroAllaFuneValtellina,
    height: 100,
    url: 'https://www.facebook.com/tiroallafuneValtellina'
  }, {
    name: 'La voce di Daniele',
    logo: voceDiDaniele,
    height: 70,
  }, {
    name: 'Mobili Rumi',
    logo: mobiliRumi,
    height: 80,
    url: 'https://www.mobilirumi.it'
  }, {
    name: 'Caurga',
    logo: caurga,
    height: 80,
    url: 'https://www.facebook.com/prolocoforcola'
  },
]

import sportDiMontagna from 'public/images/credits/sportdimontagna.webp'
import fotorunValtellina from 'public/images/credits/fotorun-valtellina.png'
import speedtime from 'public/images/credits/speedtime.png'
import radioTsn from 'public/images/credits/radio-tsn.webp'
import centroValle from 'public/images/credits/centro-valle-netweek.webp'
import laProvinciadiSondrio from 'public/images/credits/la-provincia-unica.webp'

const partners = [
  {
    name: 'Sport di Montagna',
    logo: sportDiMontagna,
    height: 80,
    url: 'https://www.sportdimontagna.com',
  }, {
    name: 'Fotorun Valtellina',
    logo: fotorunValtellina,
    height: 100,
    url: 'https://www.facebook.com/FOTORUN.valtellina'
  }, {
    name: 'Radio Tsn',
    logo: radioTsn,
    height: 60,
    url: 'https://radiotsn.tv/'
  }, {
    name: 'Speed Time Production',
    logo: speedtime,
    height: 70,
    url: 'https://www.facebook.com/speedtimeproduction'
  }, {
    name: 'Centrovalle',
    logo: centroValle,
    height: 70,
    url: 'https://netweek.it/testate/giornale-di-sondrio-centro-valle/',
  }, {
    name: 'La Provincia di Sondrio',
    logo: laProvinciadiSondrio,
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
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={classNames({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <Image src={item.logo} height={item.height} alt={item.name} />
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
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={classNames({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <Image src={item.logo} height={item.height} alt={item.name} />
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
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={classNames({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <Image src={item.logo} height={item.height} alt={item.name} />
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
