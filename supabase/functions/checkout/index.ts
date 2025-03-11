import { Hono } from 'jsr:@hono/hono'
//import * as postgres from 'https://deno.land/x/postgres/mod.ts'
import { createClient, FunctionsHttpError } from 'jsr:@supabase/supabase-js@2'

const app = new Hono()

app.post('/checkout', async (c) => {
  const body = await c.req.json()
  const headers = c.req.header()

  console.log(headers)

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    console.debug(`[checkout] body: ${JSON.stringify(body)}`);

    const { data: order, error } = await supabaseClient.functions.invoke('orders', {
      method: 'POST',
      body: body
    })

    if (error instanceof FunctionsHttpError) {
      const { message } = await error.context.json()
      throw new Error(message)
    } else if (error) {
      throw new Error(error.message)
    }

    console.debug(`[checkout] order: ${JSON.stringify(order)}`);

    if (['cash', 'sepa'].includes(order.payment_method)) {
      const { data, error } = await supabaseClient.functions.invoke('mail-legacy', {
        method: 'POST',
        body: order
      })
      //if (['cash', 'sepa', 'on-site'].includes(order.payment_method)) {
      //await sendConfirmationMail(order);
      return c.json(order)
    } else if (order.payment_method === 'stripe') {
      //const stripeAccount = Deno.env.get('SUPABASE_URL')
      //const stripeAccount = (await getPromoter(order.promoter_id!))?.stripe_account ?? undefined;
      const { data, error } = await supabaseClient.functions.invoke('stripe-checkout', {
        method: 'POST',
        body: { headers, order }
      })

      if (error instanceof FunctionsHttpError) {
        const { message } = await error.context.json()
        throw new Error(message)
      } else if (error) {
        throw new Error(error.message)
      }
      //const { id } = await createCheckoutSession(headers, order, stripeAccount);
      return c.json({ ...order, checkoutSessionId: data.id, checkoutSessionUrl: data.url })
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    return c.json({ message: e.message }, { status: 500})
  }
});

Deno.serve(app.fetch);
