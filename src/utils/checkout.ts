'use server'

//import Stripe from 'stripe';
//import { getStripe } from './stripe';
//import { Order, OrderItem } from '@/types/orders';
import { redirect } from 'next/navigation'
import { createClient } from './supabase/server';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { base64 } from './text';

// https://supabase.github.io/wrappers/stripe/

//type Checkout = Pick<Order, 'user_id' | 'user_email' | 'payment_method' | 'items'> & Partial<Pick<Order, 'customer_first_name' | 'customer_last_name'>>

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
