'use client'

import { dt } from "@utils/date";
import { getMunicipalities } from "@utils/sanity/queries";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { use, useEffect, useMemo, useState } from "react";
import CodiceFiscale from 'codice-fiscale-js'
import ErrorTexty from "@components/ui/error-text";
import ErrorText from "@components/ui/error-text";
import { createClient } from "@/utils/supabase/client";
import { Order } from "@/types/orders";
import dayjs from "dayjs";

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (/^[0-9]{4}$/.test(input)) {
    return new Date(Number(input), 0, 1);
  }

  return dt(input, ['DD/MM/YYYY', 'D/MM/YYYY', 'DD/M/YYYY', 'D/M/YYYY']).toDate();
};

import { Button } from "@/components/ui/shadcn/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
// https://stackoverflow.com/questions/78514676/how-can-i-automatically-check-for-a-required-field-in-the-form-and-a-asterisk


export default function ConsoleEventEntryCreate({ onClose }: { onClose: any }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
