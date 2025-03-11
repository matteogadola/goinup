'use server'

import { redirect } from 'next/navigation'
import { createClient } from './supabase/server';
import { FunctionsHttpError } from '@supabase/supabase-js';

export async function createCheckout(orderData: any) {//Checkout) {
  /*const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke('checkout', {
    method: 'POST',
    body: orderData
  })*/
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  //const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/checkout', {
  const response = await fetch('https://goinupvertical-git-v10-shadowf4xs-projects.vercel.app/api/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
      'content-type': 'application/json',
      'cancel_url': '',
    },
    cache: 'no-cache',
  });
  const data = await response.json();

  if (response.status !== 200) {
    console.log(data)
    throw new Error(data.error);
  }

  /*if (error instanceof FunctionsHttpError) {
    const { message } = await error.context.json()
    throw new Error(message)
  } else if (error) {
    throw new Error(error.message)
  }*/

  redirect(data.checkoutSessionUrl)
}
