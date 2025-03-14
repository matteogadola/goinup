'use client'

import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link';
//import { getEvent, getEvents } from '@utils/supabase/queries';
import { urlFor } from '@utils/sanity';
import { notFound } from 'next/navigation';
import { dt } from '@utils/date';
import { createClient } from '@/utils/supabase/server';
import ConsoleEventEntries from './event-entries';
import { MantineProvider, Tabs } from '@mantine/core';
import { DataTable } from './event-entries-table';
import { Payment, columns } from "./event-entries-columns"

export default function ConsoleEventTabs({
  entries,
}: {
  entries: any
}) {

  //const items = await getItems({ eventId: event.id, status: 'published' })

  return (
      <>
      <Tabs defaultValue="entries">
      <Tabs.List>
        <Tabs.Tab value="entries">
          Iscrizioni
        </Tabs.Tab>
        <Tabs.Tab value="stats">
          Statistiche
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="entries" pt="xs">
        <div>
            <span className=" font-unbounded text-xl">Iscrizioni</span>
            {/*<ConsoleEventEntries entries={entries} />*/}
            <DataTable columns={columns} data={entries} />
          </div>
      </Tabs.Panel>

      <Tabs.Panel value="stats" pt="xs">
      <div>
            <span className=" font-unbounded text-xl">Statistiche</span>
          </div>
      </Tabs.Panel>
    </Tabs>
      </>
  )
}
