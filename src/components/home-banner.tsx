import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import bannerImage from 'public/images/bg1.jpg'
import { base64 } from '@/lib/helpers'
//import { base64 } from '@/lib/helpers'

const description = `
Il circuito GOinUP ripartirà il 24 maggio 2023 da Regoledo di Cosio
con la Larg-Up giunta alla sua quinta edizione.
Fino al 15 maggio sarà possibile acquistare il carnet dell'intero circuito (11 gare) al costo di 110€
blablabla`

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function HomeBanner() {
  const ticket = await getItem(1001) // più evengante?
  //const ticket_id = 1001 // a tendere sarà così direi...

  return (
    <div className="mx-auto px-16 sm:px-24 lg:px-48">
      <div className="relative rounded-lg block md:flex items-center min-h-10">
        <div className ="hidden md:flex relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-tr-none md:rounded-l-lg min-h-10">
          {/*<img className="absolute inset-0 w-full h-full object-cover object-center" src="images/bg1.jpg" alt="" />*/}
          <Image src={bannerImage} alt="Banner" />
          <div className="absolute inset-0 w-full h-full bg-purple-800 opacity-40">
          </div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
            <span className="text-5xl font-extralight tracking-tighter"></span>
            {/*<svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239 120"><path d="M4.21 86.4V33.31h8.94l4 28.85.86 9.52.87-9.52 4-28.85h9.02V86.4h-5.19V42.83l-.87 7.22-5.19 36.35h-5.19l-5.2-36.93-.57-6.64V86.4zm35.79 0h6V33.31h-6zm114.24 0h6.06V33.31h-6.06zm46.16-24h5.48v-6.01h-5.48v-17h9.23v-6.08h-15.31V86.4h15.29v-6.06h-9.23zm-60-29.14v44.19a2.89 2.89 0 1 1-5.77 0V33.31h-6.34v44.14a9.23 9.23 0 1 0 18.46 0V33.31zm40.11 44.14V42.55a2.9 2.9 0 0 0-2.89-2.89h-2.88v41h2.88a3.68 3.68 0 0 0 2.89-3.18zm-3.21-44.09a9.12 9.12 0 0 1 9.23 9.24v34.9a9.12 9.12 0 0 1-9.23 9.24h-9.23V33.31h9.23m51.64 44.14v-34.9a2.89 2.89 0 0 0-2.88-2.89h-2.89v41h2.89a3.67 3.67 0 0 0 2.88-3.18zm-2.88-44.14a9.06 9.06 0 0 1 8.94 9.24v34.9a9.12 9.12 0 0 1-9.23 9.24h-9.23V33.31h9.52M89.31 57.55c-2.88-2.6-5.19-4.91-5.19-9.23v-5.77A2.89 2.89 0 0 1 87 39.66a3.1 3.1 0 0 1 2.89 2.89v6.05H96v-6.05a9.24 9.24 0 1 0-18.47 0v6.05c.58 6.93 4.62 10.68 7.5 13.56 2.89 2.6 5.2 4.91 5.2 9.24v6a2.89 2.89 0 1 1-5.77 0v-8.89h-6.11v8.94a9.23 9.23 0 1 0 18.46 0v-6c-.57-7.22-4.32-10.68-7.5-13.85m-25.1 0C61.33 55 59 52.64 59 48.32v-5.77a2.89 2.89 0 1 1 5.77 0v6.05h6.06v-6.05a9.24 9.24 0 1 0-18.47 0v6.05c0 6.93 4 10.68 6.93 13.56 2.88 2.6 5.19 4.91 5.19 9.24v6a2.89 2.89 0 0 1-2.88 2.89 3.1 3.1 0 0 1-2.89-2.89v-8.89h-5.46v8.94a9.23 9.23 0 1 0 18.46 0v-6c-.28-7.22-4.32-10.68-7.5-13.85m56.84-9.23v-5.82a9.24 9.24 0 1 0-18.47 0v34.9a9.45 9.45 0 0 0 9 9.24 6.63 6.63 0 0 0 6.34-4l2.89 4V62.45h-9.23v6.06h2.88v8.94a2.73 2.73 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89v-34.9a2.9 2.9 0 0 1 2.89-2.89 3.1 3.1 0 0 1 2.88 2.89v6.05h6.64z"></path></svg>*/}
          </div>
        </div>
        <div className="w-full md:w-3/5 h-full flex items-center rounded-lg">
          <div className="p-8 md:pr-24 md:pl-16 md:py-8">
            <span className="title-accent">Offerta Speciale</span>
            <h3 className="title">Carnet circuito goinup</h3>
            <p className="text-gray-600">{description}</p> {/* dangerouslySetInnerHTML={{__html: description}}*/}
        
            <Link href={{ pathname: 'events/entry', query: { q: base64.encode(ticket) } }} className="flex items-baseline mt-3">
              <span className="text-indigo-600 hover:text-indigo-900 focus:text-indigo-900">Iscriviti</span>
              <span className="text-xs ml-1">&#x279c;</span>
            </Link>
          </div>
          <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-background -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>
    </div>
  )
}
