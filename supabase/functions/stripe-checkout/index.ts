import { Hono } from 'jsr:@hono/hono'
import Stripe from 'https://esm.sh/stripe@16?target=denonext';
//import { Buffer } from 'node:buffer'
import { encodeBase64, decodeBase64 } from "jsr:@std/encoding";


const app = new Hono()

// https://stripe.com/docs/api/versioning
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2022-11-15',
});

app.post('/stripe-checkout', async (c) => {
  const { headers, order } = await c.req.json()
  // const { method, headers, body } = req;
  console.log(order)
  // const { id } = await createCheckoutSession(headers, body);

  try {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (let item of order.items) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item?.description ?? undefined,
            metadata: {
              order_item_id: item.id,
              item_id: item.id,
            },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      });
    }

  //const encodedOrder = new TextEncoder().encode(JSON.stringify(order))
  const q = 'lolle'//encodeBase64(encodedOrder);
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    submit_type: 'pay',
    //payment_method_types: ['card'],
    currency: 'eur',
    customer_email: order.user_email,
    line_items,
    automatic_tax: {
      enabled: false,
    },
    metadata: {
      order_id: order.id,
      event_id: order.items[0].event_id ?? '',
    },
    payment_intent_data: {
      metadata: {
        order_id: order.id,
        event_id: order.items[0].event_id ?? '',
      },
    },
    success_url: `https://goinupvertical.it/checkout/confirm?session_id={CHECKOUT_SESSION_ID}&q=${q}`,
    cancel_url: 'https://goinupvertical.it/checkout',//headers.referer,
  };

  console.log(params)

  return stripe.checkout.sessions.create(params);
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    return c.json({ error: e.message }, 500)
  }
});

Deno.serve(app.fetch);
