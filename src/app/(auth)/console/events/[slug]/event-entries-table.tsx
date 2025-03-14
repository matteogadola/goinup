"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"

import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { PlusIcon } from "lucide-react"
import { MantineProvider, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import ConsoleEventEntryCreate from "./event-entry-modal"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      //sorting,
      columnFilters,
    },
  })


  const [showPaymentStatusBar, setShowPaymentStatus] = React.useState<Checked>(false)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <div className="grid grid-cols-3 items-center py-4 space-x-8">
        <Input
          placeholder="Cognome..."
          value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("last_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-4 w-min">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Pagamento</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/*<DropdownMenuSeparator />*/}
            <DropdownMenuCheckboxItem
              checked={showPaymentStatusBar}
              onCheckedChange={setShowPaymentStatus}
            >
              Confermato
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              NON Confermato
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <></>
        <Button onClick={open}><PlusIcon />Aggiungi iscrizione</Button>
        <MantineProvider>
          <Modal opened={opened} onClose={close} title={"NUOVA ISCRIZIONE"} withCloseButton={false} size="xl">
            <ConsoleEventEntryCreate onClose={close} />
          </Modal>
        </MantineProvider>
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
