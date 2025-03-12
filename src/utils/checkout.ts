'use server'

import { redirect } from 'next/navigation'
import { createClient } from './supabase/server';
import { FunctionsHttpError } from '@supabase/supabase-js';

export async function createCheckout(orderData: any) {//Checkout) {
  const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke('checkout', {
    method: 'POST',
    body: orderData
  })

  if (error instanceof FunctionsHttpError) {
    const { message } = await error.context.json()
    throw new Error(message)
  } else if (error) {
    throw new Error(error.message)
  }

  redirect(data.checkoutSessionUrl)
}
