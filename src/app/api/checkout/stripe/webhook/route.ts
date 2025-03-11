import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { getOrder } from '@utils/data/orders';

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
 
  let order_id: number;
  switch (receivedEvent.type) {
    case 'payment_intent.canceled':
    case 'payment_intent.payment_failed':
      const payment = receivedEvent.data.object as Stripe.PaymentIntent;
      order_id = Number(payment.metadata?.order_id);

      console.warn(`Pagamento fallito per ${order_id}`);

      if (payment.id && !isNaN(order_id)) {
        /*await updateOrder(order_id, {
          payment_id: payment.id,
          payment_status: 'failed',
          payment_date: dt.unix(payment.created).utc().format(),
        });*/

        /*await deleteEntries(order_id, {
          payment_id: payment.id,
          payment_status: 'failed',
          payment_date: dt.unix(payment.created).utc().format(),
        });*/
      }
      //await sendPaymentErrorMail();
      break;
    case 'checkout.session.expired':
      const sessionExp = receivedEvent.data.object as Stripe.Checkout.Session;
      order_id = Number(sessionExp.metadata?.order_id);

      console.info(`Checkout expired per ${order_id}`);

      if (sessionExp.payment_intent && !isNaN(order_id)) {
        /*await updateOrder(order_id, {
          payment_id: sessionExp.payment_intent as string,
          payment_status: 'failed',
          payment_date: dt.unix(sessionExp.created).utc().format(),
        });*/
      }
      break;
    case 'checkout.session.completed':
      const session = receivedEvent.data.object as Stripe.Checkout.Session;
      order_id = Number(session.metadata?.order_id);

      console.info(`Checkout completed per ${order_id}`);
      //const items = JSON.parse(base64.encode(session.metadata?.items));
      //const order = JSON.parse(base64.encode(session.metadata?.q)) as Order;

      if (session.payment_intent && !isNaN(order_id)) {
        const order = await getOrder(order_id);

        console.log(order)
        if (order === null) {
          console.error(`Checkout completed in errore durante il recupero dell'ordine: ${JSON.stringify(session)}`);
          return new Response(``, {
            status: 400,
          })
        }

        // verifica che session.payment_status === 'paid' ? 'paid' : 'awaiting',
        /*await updateOrder(order_id, {
          status: 'confirmed',
          payment_id: session.payment_intent as string,
          payment_status: 'paid',
          payment_date: dt.unix(session.created).utc().format(),
        });*/
        //await sendConfirmationMail(order);
      } else {
        console.error(`Checkout completed terminato in errore: ${JSON.stringify(session)}`);
      }
      break;
    default:
      console.debug(`Arrivato evento non gestito: ${receivedEvent.type}`);
      break;
  }
  return new Response('Success!', {
    status: 200,
  })
}