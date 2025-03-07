import Image from 'next/image'
import { getEvents } from '@/lib/events'
import { dt } from '@/lib/date'
import EventsList from '@/components/events-list'
import { useState } from 'react'
import classNames from 'classnames'

const list = [
  { question: 'Posso selezionare una società non presente in elenco?', answer: 'Osti!' },
  { question: 'Non possiedo il codice fiscale, posso iscrivermi?', answer: 'Certo, scrivici' },
  { question: 'Posso mano massaggiare?', answer: 'Sisisisi' },
]
// https://merakiui.com/components/faq

export default function EntryFaq() {
  const [selected, setSelected] = useState(-1)

  const onClick = (index: number) => {
    setSelected(index === selected ? -1 : index)
  }

  return (
    <div className="container px-6 mx-auto">
      <h1 className="text-lg text-gray-800 lg:text-xl dark:text-white">FAQ</h1>

      <div>
        {list.map((item, index) =>
          <div key={index}>
            <hr className="my-2 border-gray-100" />

            <button className="flex items-center focus:outline-none" onClick={() => onClick(index)}>
              <h1 className="mx-4 text-lg text-gray-700">{item.question}</h1>
            </button>

            <div className={classNames("flex mt-4 md:mx-8", { "hidden": index !== selected })}>
              <span className="border border-purple-300"></span>
              <p className="max-w-3xl text-sm px-4 text-gray-500 dark:text-gray-300">
                {item.answer}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
