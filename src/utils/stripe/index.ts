//import { Stripe, loadStripe } from '@stripe/stripe-js'

//let stripePromise: Promise<Stripe | null>

import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const redirectToCheckout = (options: RedirectToCheckoutOptions) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout-sessions/create', {
      method: 'POST',
    });
    const session = await response.json();
    await stripe!.redirectToCheckout({ sessionId: session.id });
  };
}

//export default getStripe


export default function checkout() {
  
}