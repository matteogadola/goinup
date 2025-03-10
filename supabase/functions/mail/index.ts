/**
 * può essere invocata solo da altra funzione tipo order/orders (che crea ordine)
 * 
 * https://developers.brevo.com/docs/send-a-transactional-email
 */

import { Hono } from 'jsr:@hono/hono'

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!

const app = new Hono()

app.post('/mail', async (c) => {
  const body = await c.req.json()

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(body),
    })

    const data = await res.text()

    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  } catch (e: any) {
    console.error(e)
    return c.json({ error: e.message }, 500)
  }
});

Deno.serve(app.fetch);
