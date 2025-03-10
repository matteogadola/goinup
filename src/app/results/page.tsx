import { dt } from '@utils/date';
import { urlFor, urlForDowload } from '@utils/sanity';
import { getSerieResults } from '@utils/sanity/queries';
import { cache } from 'react'

export const revalidate = 3600

export const metadata = {
  title: 'Goinup | Classifiche',
  description: 'Classifiche',
}

export default async function ResultsPage() {
  const events = await getSerieResults({ year: 2024 });

  return (
    <section className="page">
      <h3><span className="highlighted">2024</span></h3>
      <h1 className="title">Classifiche</h1>

      <div className="mt-4 space-y-8">
        {events.map((event: any, index: any) =>
          <div key={index} className="w-full lg:w-1/2 p-6">
            <h1 className="title">{event.name}</h1>
            {event.type === 'race' &&
              <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
            }
            {/*event.type === 'serie' &&
              <span className="block text-xs text-gray-600">{dt(event.date).format('YYYY')}</span>
            */}

            <div className="mt-4">
              <ul className="space-y-4">
                {event.results?.map((attachment: any, index: any) =>
                  <li key={index} className="flex space-x-2">
                    <a href={urlForDowload(attachment.file, attachment.title)} target='_blank' className="text-lg hover:opacity-70">{attachment.title}</a>
                  </li>
                )}
              </ul>
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
