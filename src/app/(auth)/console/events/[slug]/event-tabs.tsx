'use client'

import { Tabs } from '@mantine/core';
import { DataTable } from './event-entries-table';
import { columns } from "./event-entries-columns"

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
