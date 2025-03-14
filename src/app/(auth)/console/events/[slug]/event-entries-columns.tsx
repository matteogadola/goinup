"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client"
import { sendConfirmationMail } from "@/utils/mailer"
import { MantineProvider, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import ConsoleEventEntryConfirm from "./event-entry-confirm"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  order_id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  payment_method: string
  payment_id: string
  payment_status: 'pending' | 'processing' | 'success' | 'failed'
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order_id",
    header: "Ordine",
  },
  {
    accessorKey: "product_type",
    header: "Tipo",
  },
  {
    accessorKey: "payment_method",
    header: "Pagamento",
    cell: ({ row }) => {
      const entry = row.original

      if (entry.payment_method === 'stripe' && entry.payment_id) {
        return <a href={"https://dashboard.stripe.com/payments/" + entry.payment_id} target="_blank">{entry.payment_method}</a>
      } else {
        return entry.payment_method
      }
    },

    
  },
  {
    accessorKey: "payment_status",
    header: "Esito",
  },
  {
    accessorKey: "last_name",
    header: "Cognome",
  },
  {
    accessorKey: "first_name",
    header: "Nome",
  },
  {
    accessorKey: "birth_year",
    header: "Anno",
  },
  {
    accessorKey: "gender",
    header: "Sesso",
  },
  {
    accessorKey: "club",
    header: "Club",
  },
  {
    id: "confirm",
    cell: ({ row }) => {
      const entry = row.original

      if (entry.payment_status === 'pending') {
        const [opened, { open, close }] = useDisclosure(false)

        return (
          <>
          <Button variant="outline" onClick={open}>Conferma</Button>
            <MantineProvider>
              <Modal opened={opened} onClose={close} title={"CONFERMA ORDINE " + entry.order_id} withCloseButton={false} size="xl">
                <ConsoleEventEntryConfirm entry={entry} onClose={close} />
              </Modal>
            </MantineProvider>
          </>
        )
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      
 
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.order_id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]

