'use client';

import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { CSVLink } from 'react-csv';

export default function DownloadCsv({ data, name, className }: { data: any[], name: string, className?: string }) {
  return (
    <section className={classNames(className, "")}>
      <CSVLink data={data ?? []} filename={`iscrizioni-${name.toLowerCase()}.csv`} separator={";"} className="text-button">Scarica file</CSVLink>
    </section>
  )
}
