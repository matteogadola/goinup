/*import type { NextApiRequest, NextApiResponse } from 'next';
import { sendConfirmationMail } from '@/lib/mail';
import { createOrder } from '@/lib/orders';
import { createCheckoutSession } from './stripe';
import { getEvent } from '@/lib/events';
import { Promoter } from '@/types/promoters';
import { getPromoter } from '@/lib/promoters';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  if (method !== 'POST') {
    return res.status(405).send('');
  }

  try {
    console.debug(`[checkout] body: ${JSON.stringify(body)}`);
    const order = await createOrder(body);
    console.debug(`[checkout] order: ${JSON.stringify(order)}`);
    if (['cash', 'sepa', 'on-site'].includes(order.payment_method)) {
      await sendConfirmationMail(order);
      return res.json(order);
    } else if (order.payment_method === 'stripe') {
      const stripeAccount = (await getPromoter(order.promoter_id!))?.stripe_account ?? undefined;
      const { id } = await createCheckoutSession(headers, order, stripeAccount);
      return res.json({ ...order, stripeAccount, checkoutSessionId: id });
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
}
*/