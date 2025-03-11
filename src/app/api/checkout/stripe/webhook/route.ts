import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const payload = await req.text();
  let receivedEvent;

  try {
    

    receivedEvent = await stripe.webhooks.constructEventAsync(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (e: any) {
    console.error(`Webhook Error: ${e.message}`)
    return new Response(`Webhook error: ${e.message}`, {
      status: 400,
    })
  }

  if (receivedEvent.livemode !== true) {
    console.log('non live')
    //return res.status(200).send('');
  }
 
  return new Response('Success!', {
    status: 200,
  })
}