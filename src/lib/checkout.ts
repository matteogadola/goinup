import Stripe from 'stripe';
import getStripe from './stripe';
import { Order, OrderItem } from '@/types/orders';
import { redirect } from 'next/navigation'
import { base64 } from './helpers';

// https://supabase.github.io/wrappers/stripe/

type Checkout = Pick<Order, 'user_id' | 'user_email' | 'payment_method' | 'items'> & Partial<Pick<Order, 'customer_first_name' | 'customer_last_name'>>

export async function createCheckout(orderData: Checkout) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
      'content-type': 'application/json',
      'cancel_url': '',
    },
    cache: 'no-cache',
  });
  const body = await response.json();

  if (response.status === 500) {
    throw new Error(body.error);
  }

  if (body.payment_method === 'stripe') {
    const stripe = await getStripe(body.stripeAccount);

    try {
      await stripe!.redirectToCheckout({
        sessionId: body.checkoutSessionId,
      });
    } catch (e: any) {
      console.error(e.message);
    }
  } else {
    return body;
  }
}
