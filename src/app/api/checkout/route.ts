
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Order, OrderItem } from '@d/orders'
import { createClient } from '@utils/supabase/server';

import { dt } from '@utils/date';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { encodeBase64 } from '@utils/encoding';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const payload = await req.text();
  const origin = req.headers.get('origin')

  try {
    console.debug(`[checkout] body: ${JSON.stringify(payload)}`);

    const { data: order, error } = await supabase.functions.invoke('orders', {
      method: 'POST',
      body: payload
    })

    if (error instanceof FunctionsHttpError) {
      const { message } = await error.context.json()
      throw new Error(message)
    } else if (error) {
      throw new Error(error.message)
    }

    console.debug(`[checkout] order: ${JSON.stringify(order)}`);

    const q = encodeBase64(JSON.stringify(order));

    if (['cash', 'sepa'].includes(order.payment_method)) {
      
      const { data, error } = await supabase.functions.invoke('mail-legacy', {
        method: 'POST',
        body: order
      })

      return new Response(
        JSON.stringify({order, checkoutSessionUrl: `${origin}/checkout/confirm?&q=${q}`}), {
        status: 400,
      })
    } else if (order.payment_method === 'stripe') {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        method: 'POST',
        body: { order, origin, q }
      })

      if (error instanceof FunctionsHttpError) {
        const { message } = await error.context.json()
        throw new Error(message)
      } else if (error) {
        throw new Error(error.message)
      }
      
      return new Response(
        JSON.stringify({ ...order, checkoutSessionId: data.id, checkoutSessionUrl: data.url }), {
        status: 400,
      })
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    return new Response(
      JSON.stringify({ error: e.message }), {
      status: 500,
    })
  }
}
