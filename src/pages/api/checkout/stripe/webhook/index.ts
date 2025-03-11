import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { getOrder, updateOrder } from '@utils/supabase/queries';
import { dt } from '@utils/date';

// https://stripe.com/docs/api/versioning
// Handle the event - https://stripe.com/docs/api/events/types
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const buf = await buffer(req);
  const signature = req.headers['stripe-signature']!;
  let receivedEvent

  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      buf,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (e: any) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if (receivedEvent.livemode !== true) {
    return res.status(200).send('');
  }

  let order_id: number;
  switch (receivedEvent.type) {
    case 'payment_intent.canceled':
    case 'payment_intent.payment_failed':
      // if diverso da paid???
      const payment = receivedEvent.data.object as Stripe.PaymentIntent;
      order_id = Number(payment.metadata?.order_id);

      console.warn(`Pagamento fallito per ${order_id}`);

      if (payment.id && !isNaN(order_id)) {
        await updateOrder(order_id, {
          payment_id: payment.id,
          payment_status: 'failed',
          payment_date: dt.unix(payment.created).utc().format(),
        });

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
        await updateOrder(order_id, {
          payment_id: sessionExp.payment_intent as string,
          payment_status: 'failed',
          payment_date: dt.unix(sessionExp.created).utc().format(),
        });
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

        if (order === null) {
          console.error(`Checkout completed in errore durante il recupero dell'ordine: ${JSON.stringify(session)}`);
          return res.status(500).send('');
        }

        // verifica che session.payment_status === 'paid' ? 'paid' : 'awaiting',
        await updateOrder(order_id, {
          status: 'confirmed',
          payment_id: session.payment_intent as string,
          payment_status: 'paid',
          payment_date: dt.unix(session.created).utc().format(),
        });
        await sendConfirmationMail(order);
      } else {
        console.error(`Checkout completed terminato in errore: ${JSON.stringify(session)}`);
      }
      break;
    default:
      console.debug(`Arrivato evento non gestito: ${event.type}`);
      break;
  }
  res.status(200).send('');
}

/*
SE TUTTO VA BENE (4242 4242 4242 4242)
Arrivato evento: charge.succeeded
Arrivato evento: checkout.session.completed
Arrivato evento: payment_intent.succeeded
Arrivato evento: payment_intent.created

CON SECURE CODE (4000 0000 0000 3220)
Arrivato evento: payment_intent.created
Arrivato evento: payment_intent.requires_action
Arrivato evento: payment_intent.succeeded
Arrivato evento: checkout.session.completed
Arrivato evento: charge.succeeded

SENZA FONDI (4000 0000 0000 9995)
Arrivato evento: payment_intent.created
Arrivato evento: payment_intent.payment_failed
Arrivato evento: charge.failed (ma rimango sulla pagina di pagamento)
poi esco, e dopo 11:05)
*/
